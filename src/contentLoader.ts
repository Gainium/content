import fs from 'fs/promises'
import path from 'path'
import {
  ParsedHelpDoc,
  ParsedBlogPost,
  ParsedIndicator,
  IndicatorManifest,
  CacheData,
  GitMetadata,
} from './types'
import { getLatestCommitInfo } from './gitManager'
import {
  parseBlogPostSource,
  parseHelpDocSource,
  parseIndicatorSource,
  readMarkdownDir,
} from './contentParser'
import { INDICATOR_SLUGS_MOVED_FROM_HELP } from './indicators/movedFromHelp'
import { isIndicatorsHelpCompatOn } from './indicators/helpCompat'
import logger from './utils/logger'

const DOCS_DIR = path.join(process.cwd(), 'docs')
// Bump when the cached shape or the parse rules change, so an old cache is
// never served.
const CACHE_VERSION = 4
const TEMP_DIR = path.join(process.cwd(), 'temp')
const CACHE_FILE = path.join(TEMP_DIR, 'content-cache.json')

interface Collection<T> {
  docs: Map<string, T>
  byCategory: Map<string, string[]>
  byTag: Map<string, string[]>
}

/**
 * Everything the API serves, built in full and then swapped in with one
 * assignment, so a request during a reload sees the old corpus or the new
 * one, never a half-filled mix.
 */
interface ContentSnapshot {
  /** docs/help only. */
  help: Collection<ParsedHelpDoc>
  /** docs/help plus the moved native indicator pages (compat mode). */
  helpCompat: Collection<ParsedHelpDoc>
  /** Moved native indicator pages in the help-doc shape, with `movedTo`. */
  movedHelp: Map<string, ParsedHelpDoc>
  blog: Collection<ParsedBlogPost>
  indicators: Map<string, ParsedIndicator>
}

const bySlug = (a: { metadata: { slug: string } }, b: typeof a) =>
  a.metadata.slug < b.metadata.slug
    ? -1
    : a.metadata.slug > b.metadata.slug
      ? 1
      : 0

function indexBy<T extends { metadata: { slug: string } }>(
  docs: T[],
  keysOf: (doc: T) => string[] | undefined,
): Map<string, string[]> {
  const index = new Map<string, string[]>()
  docs.forEach((doc) => {
    ;(keysOf(doc) ?? []).forEach((key) => {
      if (!index.has(key)) index.set(key, [])
      index.get(key)!.push(doc.metadata.slug)
    })
  })
  return index
}

function helpCollection(docs: ParsedHelpDoc[]): Collection<ParsedHelpDoc> {
  const sorted = [...docs].sort(bySlug)
  return {
    docs: new Map(sorted.map((doc) => [doc.metadata.slug, doc])),
    byCategory: indexBy(sorted, (doc) => doc.metadata.categories),
    byTag: indexBy(sorted, (doc) => doc.metadata.tags),
  }
}

function buildSnapshot(
  helpDocs: ParsedHelpDoc[],
  blogPosts: ParsedBlogPost[],
  indicatorPages: ParsedIndicator[],
): ContentSnapshot {
  const indicators = new Map(
    [...indicatorPages].sort(bySlug).map((doc) => [doc.metadata.slug, doc]),
  )
  const helpSlugs = new Set(helpDocs.map((doc) => doc.metadata.slug))

  const movedHelp = new Map<string, ParsedHelpDoc>()
  for (const slug of INDICATOR_SLUGS_MOVED_FROM_HELP) {
    const page = indicators.get(slug)
    if (!page || page.metadata.kind !== 'native' || helpSlugs.has(slug)) {
      continue
    }
    movedHelp.set(slug, {
      metadata: page.metadata as unknown as ParsedHelpDoc['metadata'],
      content: page.content,
      rawContent: page.rawContent,
      movedTo: `/indicators/${slug}`,
    })
  }

  return {
    help: helpCollection(helpDocs),
    helpCompat: helpCollection([...helpDocs, ...movedHelp.values()]),
    movedHelp,
    blog: {
      docs: new Map(blogPosts.map((post) => [post.metadata.slug, post])),
      byCategory: indexBy(blogPosts, (post) =>
        post.metadata.categories?.map((cat) =>
          typeof cat === 'string' ? cat : cat.slug,
        ),
      ),
      byTag: indexBy(blogPosts, (post) => post.metadata.tags),
    },
    indicators,
  }
}

const countIndex = (index: Map<string, string[]>) =>
  Array.from(index.entries()).map(([slug, docs]) => ({
    slug,
    count: docs.length,
  }))

function lookup<T>(collection: Collection<T>, slugs: string[] | undefined) {
  return (slugs ?? [])
    .map((slug) => collection.docs.get(slug))
    .filter((doc): doc is T => doc !== undefined)
}

export class ContentLoader {
  private snapshot: ContentSnapshot = buildSnapshot([], [], [])
  private currentCommit: GitMetadata | null = null
  private docsDir = DOCS_DIR

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

      // If commits match (and the cache shape is current), use cache
      if (
        cacheData.version === CACHE_VERSION &&
        cacheData.metadata.commit === latestCommit.commit
      ) {
        this.snapshot = buildSnapshot(
          cacheData.helpDocs,
          cacheData.blogPosts,
          cacheData.indicators ?? [],
        )
        this.currentCommit = cacheData.metadata
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

    await this.loadFiles()

    // Get latest commit info
    this.currentCommit = await getLatestCommitInfo()

    // Save to cache
    await this.saveToCache()

    logger.info(
      `Loaded ${this.snapshot.help.docs.size} help docs, ${this.snapshot.blog.docs.size} blog posts and ${this.snapshot.indicators.size} indicator pages`,
    )
  }

  /**
   * Load every content type from `docsDir` without touching git or the
   * on-disk cache. Used by tests to serve fixtures through the real routes.
   */
  async loadFromDirectory(docsDir: string): Promise<void> {
    this.docsDir = docsDir
    await this.loadFiles()
  }

  private async loadFiles(): Promise<void> {
    const helpDocs = await this.loadDir('help', parseHelpDocSource)
    const blogPosts = await this.loadDir('blog', parseBlogPostSource)
    const indicators = await this.loadDir('indicators', parseIndicatorSource)
    await this.attachEdgeData(indicators)

    const helpSlugs = new Set(helpDocs.map((doc) => doc.metadata.slug))
    indicators.forEach(({ metadata }) => {
      if (helpSlugs.has(metadata.slug)) {
        logger.error(
          `Indicator slug "${metadata.slug}" also exists in docs/help; /help serves the help doc, /indicators the indicator page`,
        )
      }
    })

    // Swap in one assignment: no request ever sees a partial corpus
    this.snapshot = buildSnapshot(helpDocs, blogPosts, indicators)
  }

  private async loadDir<T extends { metadata: { slug: string } }>(
    subdir: string,
    parse: (raw: string) => {
      doc?: T
      errors: string[]
      warnings: string[]
    },
  ): Promise<T[]> {
    const dir = path.join(this.docsDir, subdir)
    const docs = new Map<string, T>()
    try {
      const { exists, files } = await readMarkdownDir(dir)
      if (!exists) {
        logger.warn(`Content directory not found: ${dir}`)
        return []
      }
      for (const { filePath, raw } of files) {
        const relativePath = path.relative(process.cwd(), filePath)
        try {
          const { doc, errors, warnings } = parse(raw)
          warnings.forEach((w) => logger.warn(`${relativePath}: ${w}`))
          if (!doc) {
            logger.error(`Skipping ${relativePath}: ${errors.join('; ')}`)
            continue
          }
          if (docs.has(doc.metadata.slug)) {
            logger.error(
              `Skipping duplicate slug "${doc.metadata.slug}" from ${relativePath}`,
            )
            continue
          }
          docs.set(doc.metadata.slug, doc)
        } catch (error) {
          logger.error(`Error parsing ${relativePath}:`, error)
        }
      }
    } catch (error) {
      logger.error(`Error loading ${dir}:`, error)
    }
    return Array.from(docs.values())
  }

  /**
   * Attach each page's `<slug>.edge.json` (spec 054), read beside the page
   * at load time and cached with it. A missing file means no edge section;
   * an unreadable one is logged and left out, never served half-parsed.
   */
  private async attachEdgeData(indicators: ParsedIndicator[]): Promise<void> {
    const dir = path.join(this.docsDir, 'indicators')
    await Promise.all(
      indicators.map(async (doc) => {
        const file = path.join(dir, `${doc.metadata.slug}.edge.json`)
        let raw: string
        try {
          raw = await fs.readFile(file, 'utf-8')
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== 'ENOENT')
            logger.error(`Error reading ${file}:`, error)
          return
        }
        try {
          const edge = JSON.parse(raw)
          if (typeof edge !== 'object' || edge === null || Array.isArray(edge))
            throw new Error('not a JSON object')
          doc.edge = edge
        } catch (error) {
          logger.error(
            `Skipping ${path.relative(process.cwd(), file)}: ${(error as Error).message}`,
          )
        }
      }),
    )
  }

  private async saveToCache(): Promise<void> {
    try {
      const { help, blog, indicators } = this.snapshot
      const cacheData: CacheData = {
        version: CACHE_VERSION,
        metadata: this.currentCommit!,
        helpDocs: Array.from(help.docs.values()),
        blogPosts: Array.from(blog.docs.values()),
        indicators: Array.from(indicators.values()),
        timestamp: Date.now(),
      }

      await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2))
      logger.info('Cache saved successfully')
    } catch (error) {
      logger.error('Error saving cache:', error)
    }
  }

  /** The /help view: plus the moved indicator pages in compat mode. */
  private get helpView(): Collection<ParsedHelpDoc> {
    return isIndicatorsHelpCompatOn()
      ? this.snapshot.helpCompat
      : this.snapshot.help
  }

  // Getters
  getCommitMetadata(): GitMetadata | null {
    return this.currentCommit
  }

  getAllHelpDocs(): ParsedHelpDoc[] {
    return Array.from(this.helpView.docs.values())
  }

  getAllBlogPosts(): ParsedBlogPost[] {
    return Array.from(this.snapshot.blog.docs.values())
  }

  /**
   * A help doc, or — in either mode — a moved native indicator page in the
   * help-doc shape with `movedTo` (spec 053 §2.3 migration alias).
   */
  getHelpDocBySlug(slug: string): ParsedHelpDoc | undefined {
    return (
      this.snapshot.help.docs.get(slug) ?? this.snapshot.movedHelp.get(slug)
    )
  }

  getBlogPostBySlug(slug: string): ParsedBlogPost | undefined {
    return this.snapshot.blog.docs.get(slug)
  }

  /**
   * Indicator pages. Native only unless `includeAll` — a caller that forgets
   * the flag gets less, never more (spec 053 §2.3, invariant I-1).
   */
  getIndicators(includeAll = false): ParsedIndicator[] {
    const all = Array.from(this.snapshot.indicators.values())
    return includeAll
      ? all
      : all.filter((doc) => doc.metadata.kind === 'native')
  }

  getIndicatorBySlug(
    slug: string,
    includeAll = false,
  ): ParsedIndicator | undefined {
    const doc = this.snapshot.indicators.get(slug)
    if (!doc) return undefined
    return includeAll || doc.metadata.kind === 'native' ? doc : undefined
  }

  /**
   * Native indicator pages that /search returns as `source: 'indicator'`.
   * In compat mode the moved ones come back through the help docs instead.
   */
  getSearchableIndicators(): ParsedIndicator[] {
    const native = this.getIndicators()
    if (!isIndicatorsHelpCompatOn()) return native
    return native.filter(
      (doc) => !this.snapshot.movedHelp.has(doc.metadata.slug),
    )
  }

  getIndicatorManifest(): IndicatorManifest {
    const manifest: IndicatorManifest = { native: [], other: [] }
    this.snapshot.indicators.forEach(({ metadata }) => {
      if (metadata.kind === 'native') {
        manifest.native.push({
          slug: metadata.slug,
          name: metadata.name,
          aliases: metadata.aliases,
          catalogKeys: metadata.catalogKeys ?? [],
        })
      } else {
        manifest.other.push({
          slug: metadata.slug,
          name: metadata.name,
          aliases: metadata.aliases,
          kind: metadata.kind,
        })
      }
    })
    return manifest
  }

  getHelpDocsByCategory(category: string): ParsedHelpDoc[] {
    const view = this.helpView
    return lookup(view, view.byCategory.get(category))
  }

  getBlogPostsByCategory(category: string): ParsedBlogPost[] {
    const blog = this.snapshot.blog
    return lookup(blog, blog.byCategory.get(category))
  }

  getHelpDocsByTag(tag: string): ParsedHelpDoc[] {
    const view = this.helpView
    return lookup(view, view.byTag.get(tag))
  }

  getBlogPostsByTag(tag: string): ParsedBlogPost[] {
    const blog = this.snapshot.blog
    return lookup(blog, blog.byTag.get(tag))
  }

  // Get all help categories with count
  getAllHelpCategories(): Array<{ slug: string; count: number }> {
    return countIndex(this.helpView.byCategory)
  }

  // Get all help tags with count
  getAllHelpTags(): Array<{ slug: string; count: number }> {
    return countIndex(this.helpView.byTag)
  }

  // Get all blog categories with count
  getAllBlogCategories(): Array<{ slug: string; count: number }> {
    return countIndex(this.snapshot.blog.byCategory)
  }

  // Get all blog tags with count
  getAllBlogTags(): Array<{ slug: string; count: number }> {
    return countIndex(this.snapshot.blog.byTag)
  }
}

export const contentLoader = new ContentLoader()
