import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import {
  HelpDocFrontmatter,
  BlogPostFrontmatter,
  ParsedHelpDoc,
  ParsedBlogPost,
  CacheData,
  GitMetadata,
} from './types'
import { getLatestCommitInfo } from './gitManager'
import logger from './utils/logger'

const DOCS_DIR = path.join(process.cwd(), 'docs')
const HELP_DIR = path.join(DOCS_DIR, 'help')
const BLOG_DIR = path.join(DOCS_DIR, 'blog')
const TEMP_DIR = path.join(process.cwd(), 'temp')
const CACHE_FILE = path.join(TEMP_DIR, 'content-cache.json')
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

export class ContentLoader {
  private helpDocs: Map<string, ParsedHelpDoc> = new Map()
  private blogPosts: Map<string, ParsedBlogPost> = new Map()
  private helpByCategory: Map<string, string[]> = new Map()
  private blogByCategory: Map<string, string[]> = new Map()
  private helpByTag: Map<string, string[]> = new Map()
  private blogByTag: Map<string, string[]> = new Map()
  private currentCommit: GitMetadata | null = null

  async initialize(): Promise<void> {
    logger.info('Initializing content loader...')

    // Ensure temp directory exists
    await fs.mkdir(TEMP_DIR, { recursive: true })

    // Try to load from cache first
    const cacheLoaded = await this.loadFromCache()

    if (!cacheLoaded) {
      logger.info('No valid cache found, loading from files...')
      await this.loadAllContent()
    } else {
      logger.info('Content loaded from cache')
      // Check if we need to rebuild in background
      const latestCommit = await getLatestCommitInfo()
      if (latestCommit.commit !== this.currentCommit?.commit) {
        logger.info('Commit changed, rebuilding in background...')
        this.loadAllContent().catch((err) =>
          logger.error('Background rebuild failed:', err),
        )
      }
    }
  }

  private async loadFromCache(): Promise<boolean> {
    try {
      const cacheExists = await fs
        .access(CACHE_FILE)
        .then(() => true)
        .catch(() => false)
      if (!cacheExists) {
        return false
      }

      const cacheData: CacheData = JSON.parse(
        await fs.readFile(CACHE_FILE, 'utf-8'),
      )
      const latestCommit = await getLatestCommitInfo()

      // If commits match, use cache
      if (cacheData.metadata.commit === latestCommit.commit) {
        this.currentCommit = cacheData.metadata

        // Rebuild maps from cached data
        cacheData.helpDocs.forEach((doc) => {
          this.helpDocs.set(doc.metadata.slug, doc)
        })

        cacheData.blogPosts.forEach((post) => {
          this.blogPosts.set(post.metadata.slug, post)
        })

        this.rebuildIndexes()
        return true
      }

      return false
    } catch (error) {
      logger.error('Error loading from cache:', error)
      return false
    }
  }

  async loadAllContent(): Promise<void> {
    logger.info('Loading all content from files...')

    // Clear existing data
    this.helpDocs.clear()
    this.blogPosts.clear()

    // Load help docs
    await this.loadHelpDocs()

    // Load blog posts
    await this.loadBlogPosts()

    // Rebuild indexes
    this.rebuildIndexes()

    // Get latest commit info
    this.currentCommit = await getLatestCommitInfo()

    // Save to cache
    await this.saveToCache()

    logger.info(
      `Loaded ${this.helpDocs.size} help docs and ${this.blogPosts.size} blog posts`,
    )
  }

  private normalizeFrontmatter(rawContent: string, filePath: string): string {
    const frontmatterMatch = rawContent.match(/^(---\n)([\s\S]*?)(\n---\n?)/)

    if (!frontmatterMatch || !/^\t+/m.test(frontmatterMatch[2])) {
      return rawContent
    }

    const normalizedFrontmatter = frontmatterMatch[2].replace(
      /^\t+/gm,
      (tabs) => '  '.repeat(tabs.length),
    )

    logger.warn(
      `Normalized tab-indented frontmatter in ${path.relative(process.cwd(), filePath)}`,
    )

    return rawContent.replace(
      frontmatterMatch[0],
      `${frontmatterMatch[1]}${normalizedFrontmatter}${frontmatterMatch[3]}`,
    )
  }

  private validateRequiredFields(
    metadata: Record<string, unknown>,
    requiredFields: readonly string[],
    filePath: string,
  ): boolean {
    const missingFields = requiredFields.filter((field) => {
      const value = metadata[field]

      if (Array.isArray(value)) {
        return value.length === 0
      }

      return value === undefined || value === null || value === ''
    })

    if (missingFields.length > 0) {
      logger.error(
        `Skipping ${path.relative(process.cwd(), filePath)} due to missing frontmatter fields: ${missingFields.join(', ')}`,
      )
      return false
    }

    return true
  }

  private parseHelpDoc(
    rawContent: string,
    filePath: string,
  ): ParsedHelpDoc | undefined {
    const normalizedContent = this.normalizeFrontmatter(rawContent, filePath)
    const { data, content } = matter(normalizedContent)

    if (
      !this.validateRequiredFields(
        data as Record<string, unknown>,
        REQUIRED_HELP_FIELDS,
        filePath,
      )
    ) {
      return undefined
    }

    const metadata = data as HelpDocFrontmatter

    if (this.helpDocs.has(metadata.slug)) {
      logger.error(
        `Skipping duplicate help doc slug "${metadata.slug}" from ${path.relative(process.cwd(), filePath)}`,
      )
      return undefined
    }

    return {
      metadata,
      content: content.trim(),
      rawContent: normalizedContent,
    }
  }

  private parseBlogPost(
    rawContent: string,
    filePath: string,
  ): ParsedBlogPost | undefined {
    const normalizedContent = this.normalizeFrontmatter(rawContent, filePath)
    const { data, content } = matter(normalizedContent)

    if (
      !this.validateRequiredFields(
        data as Record<string, unknown>,
        REQUIRED_BLOG_FIELDS,
        filePath,
      )
    ) {
      return undefined
    }

    const metadata = data as BlogPostFrontmatter

    if (this.blogPosts.has(metadata.slug)) {
      logger.error(
        `Skipping duplicate blog slug "${metadata.slug}" from ${path.relative(process.cwd(), filePath)}`,
      )
      return undefined
    }

    return {
      metadata,
      content: content.trim(),
      rawContent: normalizedContent,
    }
  }

  private async loadHelpDocs(): Promise<void> {
    try {
      const dirExists = await fs
        .access(HELP_DIR)
        .then(() => true)
        .catch(() => false)
      if (!dirExists) {
        logger.warn(`Help directory not found: ${HELP_DIR}`)
        return
      }

      const files = await fs.readdir(HELP_DIR)
      const mdFiles = files.filter((file) => file.endsWith('.md'))

      for (const file of mdFiles) {
        try {
          const filePath = path.join(HELP_DIR, file)
          const rawContent = await fs.readFile(filePath, 'utf-8')
          const parsedDoc = this.parseHelpDoc(rawContent, filePath)

          if (parsedDoc) {
            this.helpDocs.set(parsedDoc.metadata.slug, parsedDoc)
          }
        } catch (error) {
          logger.error(`Error parsing help doc ${file}:`, error)
        }
      }
    } catch (error) {
      logger.error('Error loading help docs:', error)
    }
  }

  private async loadBlogPosts(): Promise<void> {
    try {
      const dirExists = await fs
        .access(BLOG_DIR)
        .then(() => true)
        .catch(() => false)
      if (!dirExists) {
        logger.warn(`Blog directory not found: ${BLOG_DIR}`)
        return
      }

      const files = await fs.readdir(BLOG_DIR)
      const mdFiles = files.filter((file) => file.endsWith('.md'))

      for (const file of mdFiles) {
        try {
          const filePath = path.join(BLOG_DIR, file)
          const rawContent = await fs.readFile(filePath, 'utf-8')
          const parsedPost = this.parseBlogPost(rawContent, filePath)

          if (parsedPost) {
            this.blogPosts.set(parsedPost.metadata.slug, parsedPost)
          }
        } catch (error) {
          logger.error(`Error parsing blog post ${file}:`, error)
        }
      }
    } catch (error) {
      logger.error('Error loading blog posts:', error)
    }
  }

  private rebuildIndexes(): void {
    // Clear indexes
    this.helpByCategory.clear()
    this.blogByCategory.clear()
    this.helpByTag.clear()
    this.blogByTag.clear()

    // Index help docs by category
    this.helpDocs.forEach((doc) => {
      if (doc.metadata.categories) {
        doc.metadata.categories.forEach((cat) => {
          if (!this.helpByCategory.has(cat)) {
            this.helpByCategory.set(cat, [])
          }
          this.helpByCategory.get(cat)!.push(doc.metadata.slug)
        })
      }

      // Index by tag
      if (doc.metadata.tags) {
        doc.metadata.tags.forEach((tag) => {
          if (!this.helpByTag.has(tag)) {
            this.helpByTag.set(tag, [])
          }
          this.helpByTag.get(tag)!.push(doc.metadata.slug)
        })
      }
    })

    // Index blog posts by category
    this.blogPosts.forEach((post) => {
      if (post.metadata.categories) {
        post.metadata.categories.forEach((cat) => {
          const slug = typeof cat === 'string' ? cat : cat.slug
          if (!this.blogByCategory.has(slug)) {
            this.blogByCategory.set(slug, [])
          }
          this.blogByCategory.get(slug)!.push(post.metadata.slug)
        })
      }

      // Index by tag
      if (post.metadata.tags) {
        post.metadata.tags.forEach((tag) => {
          if (!this.blogByTag.has(tag)) {
            this.blogByTag.set(tag, [])
          }
          this.blogByTag.get(tag)!.push(post.metadata.slug)
        })
      }
    })
  }

  private async saveToCache(): Promise<void> {
    try {
      const cacheData: CacheData = {
        metadata: this.currentCommit!,
        helpDocs: Array.from(this.helpDocs.values()),
        blogPosts: Array.from(this.blogPosts.values()),
        timestamp: Date.now(),
      }

      await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2))
      logger.info('Cache saved successfully')
    } catch (error) {
      logger.error('Error saving cache:', error)
    }
  }

  // Getters
  getCommitMetadata(): GitMetadata | null {
    return this.currentCommit
  }

  getAllHelpDocs(): ParsedHelpDoc[] {
    return Array.from(this.helpDocs.values())
  }

  getAllBlogPosts(): ParsedBlogPost[] {
    return Array.from(this.blogPosts.values())
  }

  getHelpDocBySlug(slug: string): ParsedHelpDoc | undefined {
    return this.helpDocs.get(slug)
  }

  getBlogPostBySlug(slug: string): ParsedBlogPost | undefined {
    return this.blogPosts.get(slug)
  }

  getHelpDocsByCategory(category: string): ParsedHelpDoc[] {
    const slugs = this.helpByCategory.get(category) || []
    return slugs
      .map((slug) => this.helpDocs.get(slug))
      .filter((doc): doc is ParsedHelpDoc => doc !== undefined)
  }

  getBlogPostsByCategory(category: string): ParsedBlogPost[] {
    const slugs = this.blogByCategory.get(category) || []
    return slugs
      .map((slug) => this.blogPosts.get(slug))
      .filter((post): post is ParsedBlogPost => post !== undefined)
  }

  getHelpDocsByTag(tag: string): ParsedHelpDoc[] {
    const slugs = this.helpByTag.get(tag) || []
    return slugs
      .map((slug) => this.helpDocs.get(slug))
      .filter((doc): doc is ParsedHelpDoc => doc !== undefined)
  }

  getBlogPostsByTag(tag: string): ParsedBlogPost[] {
    const slugs = this.blogByTag.get(tag) || []
    return slugs
      .map((slug) => this.blogPosts.get(slug))
      .filter((post): post is ParsedBlogPost => post !== undefined)
  }

  // Get all help categories with count
  getAllHelpCategories(): Array<{ slug: string; count: number }> {
    return Array.from(this.helpByCategory.entries()).map(([slug, docs]) => ({
      slug,
      count: docs.length,
    }))
  }

  // Get all help tags with count
  getAllHelpTags(): Array<{ slug: string; count: number }> {
    return Array.from(this.helpByTag.entries()).map(([slug, docs]) => ({
      slug,
      count: docs.length,
    }))
  }

  // Get all blog categories with count
  getAllBlogCategories(): Array<{ slug: string; count: number }> {
    return Array.from(this.blogByCategory.entries()).map(([slug, posts]) => ({
      slug,
      count: posts.length,
    }))
  }

  // Get all blog tags with count
  getAllBlogTags(): Array<{ slug: string; count: number }> {
    return Array.from(this.blogByTag.entries()).map(([slug, posts]) => ({
      slug,
      count: posts.length,
    }))
  }
}

export const contentLoader = new ContentLoader()
