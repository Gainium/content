import { IndicatorFrontmatter } from '../types'
import { validateIndicatorFrontmatter } from './validateIndicator'
import { INDICATOR_SLUGS_MOVED_FROM_HELP } from './movedFromHelp'

/**
 * Catalog entries (IndicatorEnum KEYS, as written in the dashboard source)
 * that are selectable in the bot form but have no `native` page yet.
 * SHRINK-ONLY: remove an entry when its page lands; never add one.
 */
export const CATALOG_GAP_ALLOWLIST: readonly string[] = ['dc', 'bbwp']

export interface ParsedCatalog {
  /** IndicatorEnum key → string value, e.g. `stochRSI` → `StochRSI`. */
  enumValues: Map<string, string>
  /** Catalog entries by IndicatorEnum VALUE. */
  entries: Map<string, { key: string; pendingPort: boolean }>
  /** IndicatorEnum VALUE → slug from INDICATOR_DOCUMENTATION_URLS. */
  documentationSlugs: Map<string, string>
}

export interface IndicatorPageInput {
  file: string
  data: Record<string, unknown>
}

function sliceBlock(source: string, startPattern: RegExp, label: string) {
  const match = startPattern.exec(source)
  if (!match) {
    throw new Error(`Could not find ${label} in the catalog source`)
  }
  const start = match.index + match[0].length
  // Top-level declarations close with a `}` at column 0.
  const end = source.indexOf('\n}', start)
  if (end === -1) {
    throw new Error(`Could not find the end of ${label}`)
  }
  return source.slice(start, end)
}

/**
 * Parse the dashboard's IndicatorEnum + INDICATOR_CATALOG statically (no
 * import of dashboard code). Throws when the structure is not recognised,
 * so a refactor upstream fails CI loudly instead of passing vacuously.
 */
export function parseCatalog(
  catalogSource: string,
  enumSource: string,
): ParsedCatalog {
  const enumBody = sliceBlock(
    enumSource,
    /export enum IndicatorEnum\s*\{/,
    'export enum IndicatorEnum',
  )
  const enumValues = new Map<string, string>()
  for (const m of enumBody.matchAll(/^\s*(\w+)\s*=\s*['"]([^'"]+)['"]/gm)) {
    enumValues.set(m[1], m[2])
  }
  if (enumValues.size === 0) {
    throw new Error('IndicatorEnum has no members')
  }

  const catalogBody = sliceBlock(
    catalogSource,
    /const BASE_INDICATOR_CATALOG[^=]*=\s*\{/,
    'BASE_INDICATOR_CATALOG',
  )
  // Every top-level line of the catalog object must be an entry we can read.
  const lines = [...catalogBody.matchAll(/^ {2}(?![}\s/*])(.*)$/gm)]
  if (lines.length === 0) {
    throw new Error('BASE_INDICATOR_CATALOG has no recognisable entries')
  }
  const entries = new Map<string, { key: string; pendingPort: boolean }>()
  lines.forEach((line, i) => {
    const m = /^\[IndicatorEnum\.(\w+)\]:\s*(.*)$/.exec(line[1])
    if (!m) {
      throw new Error(
        `BASE_INDICATOR_CATALOG: unsupported top-level form "${line[1].trim()}"; update parseCatalog`,
      )
    }
    const [, key, rest] = m
    const value = enumValues.get(key)
    if (!value) {
      throw new Error(`Catalog entry IndicatorEnum.${key} is not in the enum`)
    }
    if (entries.has(value)) {
      throw new Error(`Catalog entry IndicatorEnum.${key} appears twice`)
    }

    let body: string
    let indent: number
    if (rest.startsWith('{')) {
      // Inline object literal: runs until the next top-level entry
      body = catalogBody.slice(
        line.index ?? 0,
        i + 1 < lines.length ? lines[i + 1].index : undefined,
      )
      indent = 4
    } else {
      // `[IndicatorEnum.x]: SOME_DEF,` → resolve `const SOME_DEF = {...}`
      const ref = /^([A-Za-z_$][\w$]*),?\s*$/.exec(rest)
      if (!ref) {
        throw new Error(
          `Catalog entry IndicatorEnum.${key} uses an unsupported form "${rest.trim()}"; update parseCatalog`,
        )
      }
      const decl = new RegExp(
        `^(?:export\\s+)?const\\s+${ref[1].replace(/\$/g, '\\$')}\\b[^=]*=\\s*\\{`,
        'm',
      )
      if (!decl.test(catalogSource)) {
        throw new Error(
          `Catalog entry IndicatorEnum.${key} references ${ref[1]}, whose object literal was not found in the catalog source`,
        )
      }
      body = sliceBlock(catalogSource, decl, ref[1])
      indent = 2
    }

    const props = new RegExp(
      `^ {${indent}}(\\.\\.\\.|pendingPort\\b)(.*)$`,
      'gm',
    )
    let pendingPort = false
    for (const prop of body.matchAll(props)) {
      if (prop[1] === '...') {
        throw new Error(
          `Catalog entry IndicatorEnum.${key} spreads another object; its pendingPort cannot be read statically`,
        )
      }
      const literal = /^:\s*(true|false)\s*,?\s*(\/\/.*)?$/.exec(prop[2])
      if (!literal) {
        throw new Error(
          `Catalog entry IndicatorEnum.${key} sets pendingPort to a non-literal ("pendingPort${prop[2].trim()}"); use true/false or update parseCatalog`,
        )
      }
      pendingPort = literal[1] === 'true'
    }
    entries.set(value, { key, pendingPort })
  })

  // Record<IndicatorEnum, IndicatorDefinition> guarantees one entry per
  // enum value; anything else means the parser missed something.
  const enumValueCount = new Set(enumValues.values()).size
  if (entries.size !== enumValueCount) {
    throw new Error(
      `BASE_INDICATOR_CATALOG: parsed ${entries.size} entries but IndicatorEnum has ${enumValueCount} values; update parseCatalog`,
    )
  }

  const documentationSlugs = new Map<string, string>()
  const urlsMatch = /export const INDICATOR_DOCUMENTATION_URLS\s*=\s*\{/.exec(
    catalogSource,
  )
  if (urlsMatch) {
    const start = urlsMatch.index + urlsMatch[0].length
    const body = catalogSource.slice(start, catalogSource.indexOf('}', start))
    for (const m of body.matchAll(
      /\[IndicatorEnum\.(\w+)\]:\s*['"]\/(?:help|indicators)\/([a-z0-9-]+)['"]/g,
    )) {
      const value = enumValues.get(m[1])
      if (value) documentationSlugs.set(value, m[2])
    }
  }

  return { enumValues, entries, documentationSlugs }
}

export interface CheckResult {
  /** Failures; empty means the pages are consistent. */
  errors: string[]
  /** Checks skipped, and why. */
  notices: string[]
}

/**
 * The spec 053 §2.2 checks plus invariants I-2 and I-6.
 *
 * With no indicator pages at all (a code-only change before the pages
 * land), the reverse-catalog, documentation-link and moved-slug checks are
 * skipped with a notice; everything else still runs.
 */
export function checkIndicatorPages(
  pages: IndicatorPageInput[],
  catalog: ParsedCatalog,
  options: {
    helpSlugs?: string[]
    allowlist?: readonly string[]
    /** Require the migrated /help slugs to exist (off for small fixtures). */
    requireMovedSlugs?: boolean
  } = {},
): CheckResult {
  const errors: string[] = []
  const notices: string[] = []
  const allowlist = options.allowlist ?? CATALOG_GAP_ALLOWLIST
  const helpSlugs = new Set(options.helpSlugs ?? [])

  const valueByKeyLower = new Map<string, string>()
  catalog.enumValues.forEach((value, key) =>
    valueByKeyLower.set(key.toLowerCase(), value),
  )

  const pagesBySlug = new Map<string, IndicatorFrontmatter>()
  const nativeByKey = new Map<string, string>()

  for (const { file, data } of pages) {
    const problems = validateIndicatorFrontmatter(data)
    problems.forEach((p) => errors.push(`${file}: ${p}`))

    const metadata = data as unknown as IndicatorFrontmatter
    const expectedSlug = file.replace(/^.*\//, '').replace(/\.md$/, '')
    if (metadata.slug && metadata.slug !== expectedSlug) {
      errors.push(
        `${file}: "slug" (${metadata.slug}) must match the file name (${expectedSlug})`,
      )
    }
    if (metadata.slug) {
      if (pagesBySlug.has(metadata.slug)) {
        errors.push(`${file}: duplicate indicator slug "${metadata.slug}"`)
      }
      pagesBySlug.set(metadata.slug, metadata)
      if (helpSlugs.has(metadata.slug)) {
        errors.push(
          `${file}: slug "${metadata.slug}" also exists in docs/help; an indicator page lives in exactly one place`,
        )
      }
    }

    if (metadata.kind !== 'native' || !Array.isArray(metadata.catalogKeys)) {
      continue
    }
    for (const key of metadata.catalogKeys) {
      const entry = catalog.entries.get(key)
      if (!entry) {
        const hint = valueByKeyLower.get(String(key).toLowerCase())
        errors.push(
          `${file}: catalogKey "${key}" is not in INDICATOR_CATALOG${hint ? ` (use the IndicatorEnum value "${hint}")` : ''}`,
        )
        continue
      }
      if (entry.pendingPort) {
        errors.push(
          `${file}: catalogKey "${key}" is pendingPort in the catalog, so it is not native yet`,
        )
      }
      const owner = nativeByKey.get(key)
      if (owner && owner !== metadata.slug) {
        errors.push(
          `${file}: catalogKey "${key}" is already documented by "${owner}"`,
        )
      }
      nativeByKey.set(key, metadata.slug)
    }
  }

  if (pages.length === 0) {
    notices.push(
      'docs/indicators is absent or empty: skipped the reverse-catalog, documentation-link and moved-slug checks',
    )
    return { errors, notices }
  }

  // Reverse direction: every selectable catalog entry has a native page.
  const allowValues = new Set<string>()
  for (const allowed of allowlist) {
    const value = valueByKeyLower.get(allowed.toLowerCase())
    if (!value || !catalog.entries.has(value)) {
      errors.push(
        `allowlist: "${allowed}" is not in INDICATOR_CATALOG any more; remove it from CATALOG_GAP_ALLOWLIST`,
      )
      continue
    }
    allowValues.add(value)
  }
  catalog.entries.forEach((entry, value) => {
    if (entry.pendingPort) return
    const documented = nativeByKey.has(value)
    if (allowValues.has(value)) {
      if (documented) {
        errors.push(
          `allowlist: "${entry.key}" now has a native page (${nativeByKey.get(value)}); remove it from CATALOG_GAP_ALLOWLIST (the list only shrinks)`,
        )
      }
      return
    }
    if (!documented) {
      errors.push(
        `catalog: IndicatorEnum.${entry.key} ("${value}") is selectable in the bot form but has no kind: native page in docs/indicators`,
      )
    }
  })

  // The bot form's help link must land on the page that documents it.
  catalog.documentationSlugs.forEach((slug, value) => {
    const page = pagesBySlug.get(slug)
    if (!page) {
      errors.push(
        `catalog: INDICATOR_DOCUMENTATION_URLS links "${value}" to "${slug}", which is not a page in docs/indicators`,
      )
    } else if (
      page.kind !== 'native' ||
      !(page.catalogKeys ?? []).includes(value)
    ) {
      errors.push(
        `catalog: INDICATOR_DOCUMENTATION_URLS links "${value}" to "${slug}", but that page does not list "${value}" in catalogKeys`,
      )
    }
  })

  // Moved slugs must stay native so the /help alias keeps working.
  const movedSlugs =
    options.requireMovedSlugs === false ? [] : INDICATOR_SLUGS_MOVED_FROM_HELP
  for (const slug of movedSlugs) {
    const page = pagesBySlug.get(slug)
    if (!page || page.kind !== 'native') {
      errors.push(
        `migration: "${slug}" moved from /help and must exist in docs/indicators as kind: native`,
      )
    }
  }

  return { errors, notices }
}
