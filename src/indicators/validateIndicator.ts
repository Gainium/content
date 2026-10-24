import { INDICATOR_CATEGORIES, INDICATOR_KINDS } from '../types'

/** Slugs that would collide with fixed `/indicators/*` routes. */
export const RESERVED_INDICATOR_SLUGS = ['manifest', 'full']

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const PUBLISHABLE_ALERTS = ['alertcondition', 'alert()']
const REPAINTS_VALUES = ['yes', 'no', 'unknown']

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isNonEmptyString)

/**
 * Validate an indicator page's frontmatter against its `kind`.
 * Returns a list of human-readable problems; empty means valid.
 * A page with any problem is not served by the API and fails CI.
 */
export function validateIndicatorFrontmatter(
  data: Record<string, unknown>,
): string[] {
  const errors: string[] = []

  for (const field of ['name', 'slug', 'description', 'tldr'] as const) {
    if (!isNonEmptyString(data[field])) {
      errors.push(`"${field}" is required`)
    }
  }

  if (isNonEmptyString(data.slug)) {
    if (!SLUG_PATTERN.test(data.slug)) {
      errors.push(`"slug" must be lowercase-kebab-case, got "${data.slug}"`)
    }
    if (RESERVED_INDICATOR_SLUGS.includes(data.slug)) {
      errors.push(`"slug" "${data.slug}" is reserved by the API`)
    }
  }

  if (!isStringArray(data.aliases)) {
    errors.push('"aliases" must be a list of strings')
  }

  if (!INDICATOR_KINDS.includes(data.kind as never)) {
    errors.push(`"kind" must be one of ${INDICATOR_KINDS.join(' | ')}`)
  }

  if (!INDICATOR_CATEGORIES.includes(data.category as never)) {
    errors.push(`"category" must be one of ${INDICATOR_CATEGORIES.join(' | ')}`)
  }

  for (const field of ['faq', 'related', 'sources'] as const) {
    if (data[field] !== undefined && !Array.isArray(data[field])) {
      errors.push(`"${field}" must be a list`)
    }
  }

  if (data.kind === 'native') {
    if (!isStringArray(data.catalogKeys) || data.catalogKeys.length === 0) {
      errors.push('"catalogKeys" is required for kind native')
    }
  } else if (data.kind === 'builtin' || data.kind === 'community') {
    if (data.catalogKeys !== undefined) {
      errors.push(`"catalogKeys" is only allowed for kind native`)
    }
    if (!PUBLISHABLE_ALERTS.includes(data.alerts as string)) {
      errors.push(
        data.alerts === 'none'
          ? '"alerts: none" means there is no webhook path; this page cannot be published'
          : `"alerts" must be one of ${PUBLISHABLE_ALERTS.join(' | ')}`,
      )
    }
    if (!REPAINTS_VALUES.includes(data.repaints as string)) {
      errors.push(`"repaints" must be one of ${REPAINTS_VALUES.join(' | ')}`)
    }
    if (!Array.isArray(data.sources) || data.sources.length === 0) {
      errors.push(`"sources" is required for kind ${data.kind}`)
    }
  }

  if (data.kind === 'community') {
    if (!isNonEmptyString(data.author)) {
      errors.push('"author" is required for kind community')
    }
    if (
      !isNonEmptyString(data.scriptUrl) ||
      !/^https?:\/\//.test(data.scriptUrl)
    ) {
      errors.push('"scriptUrl" (an http(s) URL) is required for kind community')
    }
    if (typeof data.openSource !== 'boolean') {
      errors.push('"openSource" (true | false) is required for kind community')
    }
    if (!isNonEmptyString(data.license)) {
      errors.push('"license" is required for kind community')
    }
  }

  return errors
}
