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
}

export interface ParsedBlogPost {
  metadata: BlogPostFrontmatter
  content: string
  rawContent: string
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
}

export interface SearchResult {
  source: 'help' | 'blog'
  slug: string
  title: string
  description?: string
  excerpt?: string
  match: string
  relevance: number
}

export interface GitMetadata {
  commit: string
  date: string
  message: string
  author: string
}

export interface CacheData {
  metadata: GitMetadata
  helpDocs: ParsedHelpDoc[]
  blogPosts: ParsedBlogPost[]
  timestamp: number
}
