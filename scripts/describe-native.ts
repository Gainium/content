/**
 * Describe a NATIVE indicator from the dashboard's catalog, in the describe
 * JSON shape (`gainium.indicator-settings/1`) that claus-dashboard's
 * tv-describe writes for TradingView scripts (spec 053 §2.1 "Settings and tips").
 *
 *   npx tsx scripts/describe-native.ts rsi                      # JSON to stdout
 *   npx tsx scripts/describe-native.ts supertrend --write       # docs/indicators/supertrend.settings.json
 *   npx tsx scripts/describe-native.ts rsi --format md          # the settings table
 *   npx tsx scripts/describe-native.ts rsi --out x.json --format both   # x.json + x.md
 *
 * The argument is the page slug (resolved through INDICATOR_DOCUMENTATION_URLS)
 * or an IndicatorEnum key (`st`). Catalog source as scripts/check-indicators.ts:
 * INDICATOR_CATALOG_PATH (a local indicatorCatalog.ts; the dashboard's src/ is
 * found from it), else the public main-dash-sh repo on GitHub. Parsed
 * statically; no dashboard code is imported or run.
 */
import fs from 'fs/promises'
import path from 'path'
import {
  catalogKeyForSlug,
  describeNative,
  type ModuleReader,
} from '../src/indicators/describeNative'
import { renderSettingsTable } from '../src/indicators/settingsTable'

const RAW_SRC =
  'https://raw.githubusercontent.com/Gainium/main-dash-sh/main/src'
const DOCS_DIR =
  process.env.CONTENT_DOCS_DIR ?? path.join(__dirname, '..', 'docs')

/** Keys sorted at every level: the same catalog writes the same bytes. */
export function stableStringify(v: unknown): string {
  const sort = (x: unknown): unknown =>
    Array.isArray(x)
      ? x.map(sort)
      : x && typeof x === 'object'
        ? Object.fromEntries(
            Object.keys(x as object)
              .sort()
              .map((k) => [k, sort((x as Record<string, unknown>)[k])]),
          )
        : x
  return `${JSON.stringify(sort(v), null, 2)}\n`
}

export function moduleReader(): ModuleReader {
  const catalogPath = process.env.INDICATOR_CATALOG_PATH
  if (catalogPath) {
    // .../src/types/indicators/indicatorCatalog.ts → .../src
    const srcDir = path.resolve(path.dirname(catalogPath), '..', '..')
    return { read: (rel) => fs.readFile(path.join(srcDir, rel), 'utf-8') }
  }
  return {
    read: async (rel) => {
      const r = await fetch(`${RAW_SRC}/${rel}`)
      if (!r.ok) throw new Error(`GET ${RAW_SRC}/${rel} → ${r.status}`)
      return r.text()
    },
  }
}

async function main() {
  const args = process.argv.slice(2)
  const target = args.find(
    (a) =>
      !a.startsWith('--') &&
      !['--format', '--out'].includes(args[args.indexOf(a) - 1]),
  )
  const opt = (k: string) => {
    const i = args.indexOf(`--${k}`)
    return i >= 0 ? args[i + 1] : undefined
  }
  if (!target) {
    console.error(
      'usage: describe-native.ts <slug | IndicatorEnum key> [--write | --out <file.json>] [--format json|md|both]',
    )
    process.exit(2)
  }
  const format = opt('format') ?? 'json'
  const reader = moduleReader()
  const key = await catalogKeyForSlug(reader, target)
  if (!key)
    throw new Error(
      `no catalog entry for "${target}" (a page slug in INDICATOR_DOCUMENTATION_URLS, or an IndicatorEnum key)`,
    )
  const d = await describeNative(reader, key)
  const out = args.includes('--write')
    ? path.join(DOCS_DIR, 'indicators', `${target}.settings.json`)
    : opt('out')
  if (!out) {
    process.stdout.write(
      format === 'md' ? renderSettingsTable(d) : stableStringify(d),
    )
    return
  }
  const base = out.replace(/\.json$/i, '')
  if (format !== 'md') await fs.writeFile(`${base}.json`, stableStringify(d))
  if (format !== 'json')
    await fs.writeFile(`${base}.md`, renderSettingsTable(d))
  console.error(
    `✔ ${key}: ${d.inputs.length} settings → ${format === 'md' ? `${base}.md` : format === 'both' ? `${base}.json + .md` : `${base}.json`}${d.notes.length ? ` (notes: ${d.notes.join('; ')})` : ''}`,
  )
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  })
}
