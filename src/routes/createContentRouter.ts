import { Router, Request, Response } from 'express'
import { DocMetadata } from '../types'

interface RouterConfig<T> {
  getAllDocs: () => T[]
  getDocBySlug: (slug: string) => T | undefined
  getDocsByCategory: (category: string) => T[]
  getDocsByTag: (tag: string) => T[]
  getAllCategories: () => Array<{ slug: string; count: number }>
  getAllTags: () => Array<{ slug: string; count: number }>
  toMetadata: (doc: T) => DocMetadata
}

type DocWithContent = { metadata: any; content: string; rawContent: string }

interface PaginationParams {
  page: number
  limit: number
}

interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// Helper to determine if full content should be returned
function shouldReturnFullContent(fullParam: string | undefined): boolean {
  return fullParam === 'full'
}

// Helper to parse pagination parameters from request
function getPaginationParams(
  req: Request,
  includeFull: boolean,
): PaginationParams {
  const page = Math.max(1, parseInt(req.query.page as string) || 1)
  const defaultLimit = includeFull ? 20 : 100
  const limit = Math.max(
    1,
    Math.min(defaultLimit, parseInt(req.query.limit as string) || defaultLimit),
  )

  return { page, limit }
}

// Helper to paginate array
function paginateArray<T>(
  items: T[],
  page: number,
  limit: number,
): { data: T[]; pagination: PaginationMeta } {
  const total = items.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const data = items.slice(startIndex, endIndex)

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}

// Helper to send docs response (metadata only or with content)
function sendDocsResponse<T extends DocWithContent>(
  res: Response,
  req: Request,
  docs: T[],
  toMetadata: (doc: T) => DocMetadata,
  includeFull: boolean,
) {
  const { page, limit } = getPaginationParams(req, includeFull)

  if (includeFull) {
    const { data, pagination } = paginateArray(docs, page, limit)
    res.json({
      data: data.map((doc) => ({
        metadata: toMetadata(doc),
        content: doc.content,
      })),
      pagination,
    })
  } else {
    const { data, pagination } = paginateArray(docs, page, limit)
    res.json({
      data: data.map(toMetadata),
      pagination,
    })
  }
}

export function createContentRouter<T extends DocWithContent>(
  config: RouterConfig<T>,
): Router {
  const router = Router()

  // GET /categories - Get all categories with counts
  router.get('/categories', (req: Request, res: Response) => {
    const categories = config.getAllCategories()
    res.json({ data: categories })
  })

  // GET /tags - Get all tags with counts
  router.get('/tags', (req: Request, res: Response) => {
    const tags = config.getAllTags()
    res.json({ data: tags })
  })

  // GET / or /:full - Get all docs metadata (or with content if full)
  router.get('/:full?', (req: Request, res: Response, next) => {
    const { full } = req.params

    // If the param looks like a slug (not 'full', 'category', 'tag'), pass to next handler
    if (full && full !== 'full' && full !== 'category' && full !== 'tag') {
      return next()
    }

    const docs = config.getAllDocs()
    const includeFull = shouldReturnFullContent(full)
    sendDocsResponse(res, req, docs, config.toMetadata, includeFull)
  })

  // GET /category/:id or /category/:id/:full - Get docs by category
  router.get('/category/:id/:full?', (req: Request, res: Response) => {
    const { id, full } = req.params
    const docs = config.getDocsByCategory(id)

    if (docs.length === 0) {
      return res.status(404).json({
        error: 'Category not found',
      })
    }

    const includeFull = shouldReturnFullContent(full)
    sendDocsResponse(res, req, docs, config.toMetadata, includeFull)
  })

  // GET /tag/:id or /tag/:id/:full - Get docs by tag
  router.get('/tag/:id/:full?', (req: Request, res: Response) => {
    const { id, full } = req.params
    const docs = config.getDocsByTag(id)

    if (docs.length === 0) {
      return res.status(404).json({
        error: 'Tag not found',
      })
    }

    const includeFull = shouldReturnFullContent(full)
    sendDocsResponse(res, req, docs, config.toMetadata, includeFull)
  })

  // GET /:id - Get full doc by slug (always returns full content)
  router.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params
    const doc = config.getDocBySlug(id)

    if (!doc) {
      return res.status(404).json({
        error: 'Document not found',
      })
    }

    res.json({
      metadata: doc.metadata,
      content: doc.content,
    })
  })

  return router
}
