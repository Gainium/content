export interface HelpDocFrontmatter {
  id: number
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  categories: string[]
  difficulty?: string
  tags?: string[]
  ingested?: boolean
  ingestedAt?: string
  tldr?: string
}

export interface BlogPostFrontmatter {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  updatedAt: string
  createdAt: string
  locale: string
  author?: string
  categories?: Array<{ name: string; slug: string }>
  tldr?: string
  tags?: string[]
  faq?: Array<{ title: string; details: string }>
}

export interface ParsedHelpDoc {
  metadata: HelpDocFrontmatter
  content: string
  rawContent: string
  /**
   * Set only on an indicator page served through /help during the
   * migration (spec 053 §2.3): `/indicators/<slug>`. Derived, never cached.
   */
  movedTo?: string
}

export interface ParsedBlogPost {
  metadata: BlogPostFrontmatter
  content: string
  rawContent: string
}

export type IndicatorKind = 'native' | 'builtin' | 'community'

export const INDICATOR_KINDS: readonly IndicatorKind[] = [
  'native',
  'builtin',
  'community',
]

export const INDICATOR_CATEGORIES = [
  'trend',
  'momentum',
  'volatility',
  'volume',
  'structure',
  'composite',
] as const

export type IndicatorCategory = (typeof INDICATOR_CATEGORIES)[number]

export type IndicatorAlerts = 'alertcondition' | 'alert()' | 'none'

export type IndicatorRepaints = 'yes' | 'no' | 'unknown'

/**
 * Frontmatter of `docs/indicators/<slug>.md`. Pages moved from `docs/help`
 * keep their original help fields (id, categories, createdAt, ...), which is
 * what lets `/help/:slug` keep answering for them during the migration.
 */
export interface IndicatorFrontmatter {
  name: string
  slug: string
  aliases: string[]
  description: string
  tldr: string
  kind: IndicatorKind
  category: IndicatorCategory
  /** `native` only: the dashboard catalog keys (IndicatorEnum values). */
  catalogKeys?: string[]
  /** `community` only: attribution. */
  author?: string
  scriptUrl?: string
  openSource?: boolean
  license?: string
  /** `builtin` / `community` only. */
  alerts?: IndicatorAlerts
  repaints?: IndicatorRepaints
  faq?: Array<{ title: string; details: string }>
  related?: string[]
  sources?: Array<string | { title?: string; url: string }>
  /** `2`: the body follows the article template (docs/STYLE.md); CI checks it. */
  templateVersion?: 2
  // Fields kept from the help-article format
  id?: number
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  locale?: string
  categories?: string[]
  difficulty?: string
  tags?: string[]
  ingested?: boolean
  ingestedAt?: string
}

export interface ParsedIndicator {
  metadata: IndicatorFrontmatter
  content: string
  rawContent: string
  /**
   * `<slug>.edge.json` beside the page, parsed (spec 054 §3), when it exists.
   * Served as is; its shape and invariants are held by `check:indicators`.
   */
  edge?: Record<string, unknown>
}

/** One item of `GET /indicators`. */
export interface IndicatorListItem {
  name: string
  slug: string
  kind: IndicatorKind
  aliases: string[]
  category: IndicatorCategory
  description: string
  tldr: string
  catalogKeys?: string[]
  author?: string
  scriptUrl?: string
  updatedAt?: string
}

/** `GET /indicators/manifest` → `{ data: IndicatorManifest }`. */
export interface IndicatorManifest {
  native: Array<{
    slug: string
    name: string
    aliases: string[]
    catalogKeys: string[]
  }>
  other: Array<{
    slug: string
    name: string
    aliases: string[]
    kind: IndicatorKind
  }>
}

export interface ContentMetadata {
  helpDocs: HelpDocFrontmatter[]
  blogPosts: BlogPostFrontmatter[]
}

export interface DocMetadata {
  slug: string
  title: string
  description?: string
  excerpt?: string
  categories?: string[] | Array<{ name: string; slug: string }>
  tags?: string[]
  tldr?: string
  updatedAt: string
  publishedAt: string
  /** Moved indicator pages only (migration compatibility mode). */
  kind?: 'native'
  movedTo?: string
}

export interface SearchResult {
  source: 'help' | 'blog' | 'indicator'
  slug: string
  title: string
  description?: string
  excerpt?: string
  match: string
  relevance: number
  /** Moved indicator pages returned as `source: 'help'` (compat mode). */
  kind?: 'native'
  movedTo?: string
}

export interface GitMetadata {
  commit: string
  date: string
  message: string
  author: string
}

export interface CacheData {
  /** Bumped whenever the cached shape changes; a mismatch forces a reload. */
  version?: number
  metadata: GitMetadata
  helpDocs: ParsedHelpDoc[]
  blogPosts: ParsedBlogPost[]
  indicators?: ParsedIndicator[]
  timestamp: number
}

export interface CategoryInfo {
  slug: string
  name?: string
  description?: string
  count: number
}

export interface TagInfo {
  slug: string
  name?: string
  count: number
}
