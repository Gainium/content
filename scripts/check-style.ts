/**
 * Style lint for article prose (docs/STYLE.md).
 *
 *   npm run check:style                         # the default scope
 *   npm run check:style -- docs/indicators/rsi.md   # one file, strict
 *   npm run check:style -- --scope docs/help=error  # replace the scope
 *   npm run check:style -- --verbose            # list every hit
 *
 * Scope (src/style/scope.ts): `error` paths fail on banned phrases, `warn`
 * paths only report counts. `--scope` (repeatable) or env STYLE_SCOPE
 * (comma-separated `path=mode`) replaces the default. File arguments are
 * checked in `error` mode.
 *
 * Some paths add banned rules of their own (src/style/timePeriods.ts):
 * docs/indicators bans time periods ("the last 12 months", "15 September").
 *
 * The frozen `description` of a page moved from /help is not checked
 * (src/indicators/movedPageMeta.json): a rewrite may not change it.
 *
 * Exit 1 when an `error`-scope file has a banned phrase.
 */
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { lintMarkdown, StyleHit } from '../src/style/aiGiveaways'
import { extraBannedFor } from '../src/style/timePeriods'
import { MOVED_PAGE_META } from '../src/indicators/templateCheck'
import {
  DEFAULT_STYLE_SCOPE,
  parseScope,
  StyleMode,
  StyleScopeEntry,
} from '../src/style/scope'

const ROOT = path.join(__dirname, '..')

async function markdownFiles(target: string): Promise<string[]> {
  const stat = await fs.stat(target).catch(() => undefined)
  if (!stat) return []
  if (stat.isFile()) return target.endsWith('.md') ? [target] : []
  const entries = await fs.readdir(target, { withFileTypes: true })
  const nested = await Promise.all(
    entries
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((entry) => markdownFiles(path.join(target, entry.name))),
  )
  return nested.flat()
}

function parseArgs(argv: string[]) {
  const scopeSpecs: string[] = []
  const files: string[] = []
  let verbose = false
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--scope') scopeSpecs.push(argv[++i] ?? '')
    else if (arg.startsWith('--scope=')) scopeSpecs.push(arg.slice(8))
    else if (arg === '--verbose' || arg === '-v') verbose = true
    else files.push(arg)
  }
  if (process.env.STYLE_SCOPE) scopeSpecs.push(process.env.STYLE_SCOPE)
  let scope: StyleScopeEntry[]
  if (files.length > 0) {
    scope = files.map((file) => ({ path: file, mode: 'error' as StyleMode }))
  } else if (scopeSpecs.length > 0) {
    scope = parseScope(scopeSpecs)
  } else {
    scope = [...DEFAULT_STYLE_SCOPE]
  }
  return { scope, verbose }
}

function safeData(raw: string): Record<string, unknown> {
  try {
    return matter(raw).data
  } catch {
    return {}
  }
}

const where = (hit: StyleHit) =>
  hit.line !== undefined ? `:${hit.line}` : ` (${hit.where})`

async function main() {
  const { scope, verbose } = parseArgs(process.argv.slice(2))
  let failed = 0

  for (const entry of scope) {
    const target = path.resolve(ROOT, entry.path)
    const files = await markdownFiles(target)
    if (files.length === 0) {
      console.log(`${entry.path} [${entry.mode}]: no markdown files`)
      continue
    }
    let banned = 0
    let soft = 0
    const rows: string[] = []
    for (const file of files) {
      const raw = await fs.readFile(file, 'utf-8')
      // A moved page's description is frozen: the rewrite cannot fix it.
      const slug = String(safeData(raw).slug ?? '')
      const frozen =
        file.includes(`${path.sep}indicators${path.sep}`) &&
        slug in MOVED_PAGE_META
      const report = lintMarkdown(raw, {
        skipFields: frozen ? ['description'] : [],
        extraBanned: extraBannedFor(path.relative(ROOT, file)),
      })
      const b = report.hits.filter((h) => h.severity === 'banned')
      const s = report.hits.filter((h) => h.severity === 'soft')
      banned += b.length
      soft += s.length
      if (b.length === 0 && s.length === 0) continue
      const rel = path.relative(ROOT, file)
      rows.push(`  ${rel}: ${b.length} banned, ${s.length} soft`)
      const shown = entry.mode === 'error' || verbose ? [...b, ...s] : []
      for (const hit of shown) {
        const level = hit.severity === 'banned' ? 'banned' : 'soft  '
        rows.push(
          `    ${level} ${rel}${where(hit)} [${hit.rule}] "${hit.match}" — ${hit.advice}`,
        )
      }
      if (entry.mode === 'error' && b.length > 0) failed += 1
    }
    console.log(
      `${entry.path} [${entry.mode}]: ${files.length} files, ${banned} banned, ${soft} soft`,
    )
    rows.forEach((row) => console.log(row))
  }

  if (failed > 0) {
    console.error(
      `\n✖ ${failed} file(s) use banned phrases (docs/STYLE.md). Rewrite those sentences.`,
    )
    process.exit(1)
  }
  console.log('✔ No banned phrases in error scope')
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
