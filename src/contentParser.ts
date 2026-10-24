import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import {
  BlogPostFrontmatter,
  HelpDocFrontmatter,
  IndicatorFrontmatter,
  ParsedBlogPost,
  ParsedHelpDoc,
  ParsedIndicator,
} from './types'
import { validateIndicatorFrontmatter } from './indicators/validateIndicator'

/**
 * The one parse + validate path for content files. The API server
 * (contentLoader) and the CI check (scripts/check-indicators.ts) both go
 * through these functions, so CI sees exactly what the server would serve.
 */

const REQUIRED_HELP_FIELDS = [
  'id',
  'name',
  'slug',
  'description',
  'createdAt',
  'updatedAt',
  'publishedAt',
  'locale',
  'categories',
] as const
const REQUIRED_BLOG_FIELDS = [
  'title',
  'slug',
  'excerpt',
  'createdAt',
  'updatedAt',
  'publishedAt',
  'locale',
] as const

export interface ParseResult<T> {
  /** Undefined when the file must not be served; see `errors`. */
  doc?: T
  errors: string[]
  warnings: string[]
}

export interface MarkdownFile {
  /** File name, e.g. `rsi.md`. */
  file: string
  filePath: string
  raw: string
}

/** Tab-indented frontmatter breaks YAML; convert leading tabs to spaces. */
export function normalizeFrontmatter(rawContent: string): {
  content: string
  normalized: boolean
} {
  const frontmatterMatch = rawContent.match(/^(---\n)([\s\S]*?)(\n---\n?)/)

  if (!frontmatterMatch || !/^\t+/m.test(frontmatterMatch[2])) {
    return { content: rawContent, normalized: false }
  }

  const normalizedFrontmatter = frontmatterMatch[2].replace(/^\t+/gm, (tabs) =>
    '  '.repeat(tabs.length),
  )

  return {
    content: rawContent.replace(
      frontmatterMatch[0],
      `${frontmatterMatch[1]}${normalizedFrontmatter}${frontmatterMatch[3]}`,
    ),
    normalized: true,
  }
}

function parseMarkdown(rawContent: string) {
  const { content: normalizedContent, normalized } =
    normalizeFrontmatter(rawContent)
  const { data, content } = matter(normalizedContent)
  return {
    data: data as Record<string, unknown>,
    content: content.trim(),
    rawContent: normalizedContent,
    warnings: normalized ? ['normalized tab-indented frontmatter'] : [],
  }
}

function missingFields(
  data: Record<string, unknown>,
  required: readonly string[],
): string[] {
  const missing = required.filter((field) => {
    const value = data[field]
    if (Array.isArray(value)) return value.length === 0
    return value === undefined || value === null || value === ''
  })
  return missing.length > 0
    ? [`missing frontmatter fields: ${missing.join(', ')}`]
    : []
}

export function parseHelpDocSource(
  rawContent: string,
): ParseResult<ParsedHelpDoc> {
  const parsed = parseMarkdown(rawContent)
  const errors = missingFields(parsed.data, REQUIRED_HELP_FIELDS)

  // Indicator pages belong in docs/indicators. A non-native one in
  // docs/help would reach every /help consumer (spec 053 invariant I-1).
  if (parsed.data.kind !== undefined) {
    errors.push(
      `help docs cannot declare "kind" (got "${parsed.data.kind}"); indicator pages live in docs/indicators`,
    )
  }

  return {
    doc:
      errors.length === 0
        ? {
            metadata: parsed.data as unknown as HelpDocFrontmatter,
            content: parsed.content,
            rawContent: parsed.rawContent,
          }
        : undefined,
    errors,
    warnings: parsed.warnings,
  }
}

export function parseBlogPostSource(
  rawContent: string,
): ParseResult<ParsedBlogPost> {
  const parsed = parseMarkdown(rawContent)
  const errors = missingFields(parsed.data, REQUIRED_BLOG_FIELDS)
  return {
    doc:
      errors.length === 0
        ? {
            metadata: parsed.data as unknown as BlogPostFrontmatter,
            content: parsed.content,
            rawContent: parsed.rawContent,
          }
        : undefined,
    errors,
    warnings: parsed.warnings,
  }
}

/**
 * An invalid indicator page is never served: e.g. a builtin/community page
 * without a webhook path (`alerts: none`) or without attribution.
 */
export function parseIndicatorSource(
  rawContent: string,
): ParseResult<ParsedIndicator> & { data: Record<string, unknown> } {
  const parsed = parseMarkdown(rawContent)
  const errors = validateIndicatorFrontmatter(parsed.data)
  return {
    data: parsed.data,
    doc:
      errors.length === 0
        ? {
            metadata: parsed.data as unknown as IndicatorFrontmatter,
            content: parsed.content,
            rawContent: parsed.rawContent,
          }
        : undefined,
    errors,
    warnings: parsed.warnings,
  }
}

/** `*.md` files of a directory, sorted by name. `exists: false` if absent. */
export async function readMarkdownDir(
  dir: string,
): Promise<{ exists: boolean; files: MarkdownFile[] }> {
  const names = await fs.readdir(dir).catch(() => undefined)
  if (!names) return { exists: false, files: [] }
  const files = await Promise.all(
    names
      .filter((file) => file.endsWith('.md'))
      .sort()
      .map(async (file) => {
        const filePath = path.join(dir, file)
        return { file, filePath, raw: await fs.readFile(filePath, 'utf-8') }
      }),
  )
  return { exists: true, files }
}
