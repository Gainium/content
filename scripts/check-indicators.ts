/**
 * Indicator page checks (spec 053 §2.2, invariants I-2 and I-6).
 *
 *   npm run check:indicators
 *
 * Validates every docs/indicators/*.md against its `kind`, and checks the
 * native pages against the dashboard's indicator catalog in both directions.
 * Pages with `templateVersion: 2` are also checked against the article
 * template (src/indicators/templateCheck.ts), and the pages moved from /help
 * must keep their frozen `name` and `description`.
 *
 * Catalog source, in order:
 *   - INDICATOR_CATALOG_PATH: a local indicatorCatalog.ts. The enum file is
 *     INDICATOR_ENUM_PATH, or `../index.ts` relative to the catalog
 *     (main-dash-sh layout: src/types/indicators/ → src/types/index.ts).
 *   - otherwise the public main-dash-sh repo, raw from GitHub (main).
 *
 * CONTENT_DOCS_DIR overrides the docs directory (default: ./docs).
 *
 * The catalog is parsed statically; no dashboard code is imported or run.
 */
import fs from 'fs/promises'
import path from 'path'
import {
  checkIndicatorPages,
  parseCatalog,
} from '../src/indicators/catalogCheck'
import {
  checkIndicatorTemplates,
  checkMovedPageMeta,
} from '../src/indicators/templateCheck'
import {
  parseHelpDocSource,
  parseIndicatorSource,
  readMarkdownDir,
} from '../src/contentParser'

const RAW_BASE =
  'https://raw.githubusercontent.com/Gainium/main-dash-sh/main/src/types'
// CONTENT_DOCS_DIR: check another docs tree (e.g. a fixture)
const DOCS_DIR =
  process.env.CONTENT_DOCS_DIR ?? path.join(__dirname, '..', 'docs')

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`GET ${url} → ${response.status}`)
  }
  return response.text()
}

async function loadCatalogSources(): Promise<{
  catalog: string
  enumSource: string
  from: string
}> {
  const catalogPath = process.env.INDICATOR_CATALOG_PATH
  if (catalogPath) {
    const enumPath =
      process.env.INDICATOR_ENUM_PATH ??
      path.resolve(path.dirname(catalogPath), '..', 'index.ts')
    return {
      catalog: await fs.readFile(catalogPath, 'utf-8'),
      enumSource: await fs.readFile(enumPath, 'utf-8'),
      from: `${catalogPath} + ${enumPath}`,
    }
  }
  const catalogUrl = `${RAW_BASE}/indicators/indicatorCatalog.ts`
  const enumUrl = `${RAW_BASE}/index.ts`
  return {
    catalog: await fetchText(catalogUrl),
    enumSource: await fetchText(enumUrl),
    from: catalogUrl,
  }
}

async function main() {
  const { catalog, enumSource, from } = await loadCatalogSources()
  const parsed = parseCatalog(catalog, enumSource)

  // Same parse/validate path as the API server (src/contentParser.ts)
  const relative = (file: string, dir: string) =>
    path.relative(process.cwd(), path.join(DOCS_DIR, dir, file))
  const indicatorDir = await readMarkdownDir(path.join(DOCS_DIR, 'indicators'))
  const pages = indicatorDir.files.map(({ file, raw }) => {
    const { data, content } = parseIndicatorSource(raw)
    return {
      file: relative(file, 'indicators'),
      data,
      body: content,
      settings: undefined as unknown,
    }
  })
  // A page's describe JSON (<slug>.settings.json beside it): what its
  // "Settings and tips" table is held to. Unparseable → null (an error there).
  for (const page of pages) {
    const json = path.join(
      DOCS_DIR,
      'indicators',
      path.basename(page.file).replace(/\.md$/, '.settings.json'),
    )
    try {
      page.settings = JSON.parse(await fs.readFile(json, 'utf-8'))
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT')
        page.settings = null
    }
  }
  const helpDir = await readMarkdownDir(path.join(DOCS_DIR, 'help'))
  const helpParsed = helpDir.files.map(({ file, raw }) => ({
    file: relative(file, 'help'),
    ...parseHelpDocSource(raw),
  }))

  const { errors, notices } = checkIndicatorPages(pages, parsed, {
    helpSlugs: helpParsed
      .map(({ doc }) => doc?.metadata.slug)
      .filter((slug): slug is string => Boolean(slug)),
  })
  const template = checkIndicatorTemplates(pages)
  errors.push(...template.errors, ...checkMovedPageMeta(pages))
  template.warnings.forEach((warning) => console.warn(`warning: ${warning}`))
  // A help doc declaring `kind` is never served; fail so it gets moved.
  // Other help-doc problems are reported but are not this check's concern.
  for (const { file, errors: helpErrors } of helpParsed) {
    for (const error of helpErrors) {
      if (error.includes('"kind"')) errors.push(`${file}: ${error}`)
      else console.warn(`warning: ${file}: ${error} (not served)`)
    }
  }

  const counts = pages.reduce<Record<string, number>>((acc, { data }) => {
    const kind = String(data.kind)
    acc[kind] = (acc[kind] ?? 0) + 1
    return acc
  }, {})
  console.log(`Catalog: ${from}`)
  const v2 = pages.filter(({ data }) => data.templateVersion === 2).length
  console.log(
    `Catalog entries: ${parsed.entries.size} · indicator pages: ${pages.length} (${Object.entries(
      counts,
    )
      .map(([kind, n]) => `${kind} ${n}`)
      .join(', ')}) · template v2: ${v2}`,
  )

  notices.forEach((notice) => console.log(`notice: ${notice}`))

  if (errors.length > 0) {
    console.error(`\n✖ ${errors.length} indicator check failure(s):`)
    errors.forEach((error) => console.error(`  - ${error}`))
    process.exit(1)
  }
  console.log('✔ Indicator pages are consistent with the catalog')
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
