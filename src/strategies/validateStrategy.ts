/** Slugs that would collide with fixed `/strategies/*` routes. */
export const RESERVED_STRATEGY_SLUGS = ['ranking']

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0

/**
 * Validate a strategy page's frontmatter (spec 061 §5). Returns a list of
 * human-readable problems; empty means valid. A page with any problem is not
 * served by the API and fails CI.
 */
export function validateStrategyFrontmatter(
  data: Record<string, unknown>,
): string[] {
  const errors: string[] = []
  for (const field of [
    'name',
    'slug',
    'description',
    'tldr',
    'publishedAt',
    'updatedAt',
  ] as const) {
    if (!isNonEmptyString(data[field]) && !(data[field] instanceof Date)) {
      errors.push(`"${field}" is required`)
    }
  }
  if (isNonEmptyString(data.slug)) {
    if (!SLUG_PATTERN.test(data.slug)) {
      errors.push(`"slug" must be lowercase-kebab-case, got "${data.slug}"`)
    }
    if (RESERVED_STRATEGY_SLUGS.includes(data.slug)) {
      errors.push(`"slug" "${data.slug}" is reserved by the API`)
    }
  }
  if (
    data.sources !== undefined &&
    !(
      Array.isArray(data.sources) &&
      data.sources.every((s) => s && isNonEmptyString((s as any).url))
    )
  ) {
    errors.push('"sources" must be a list of { title?, url }')
  }
  if (
    data.related !== undefined &&
    !(Array.isArray(data.related) && data.related.every(isNonEmptyString))
  ) {
    errors.push('"related" must be a list of strategy slugs')
  }
  return errors
}
