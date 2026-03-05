import { Router, Request, Response } from 'express'
import { contentLoader } from '../contentLoader'
import { searchEngine } from '../searchEngine'

const router = Router()

// Helper function to perform search
const performSearch = (req: Request, res: Response, includeFull: boolean) => {
  const query = req.query.q as string

  if (!query || query.trim().length === 0) {
    return res.status(400).json({
      error: 'Query parameter "q" is required',
    })
  }

  const helpDocs = contentLoader.getAllHelpDocs()
  const blogPosts = contentLoader.getAllBlogPosts()

  const allResults = searchEngine.search(query, helpDocs, blogPosts)

  // Pagination
  const page = Math.max(1, parseInt(req.query.page as string) || 1)
  const defaultLimit = includeFull ? 20 : 100
  const limit = Math.max(
    1,
    Math.min(1000, parseInt(req.query.limit as string) || defaultLimit),
  )

  const total = allResults.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedResults = allResults.slice(startIndex, endIndex)

  // If full content requested, enrich results with content
  const results = includeFull
    ? paginatedResults.map((result) => {
        const doc =
          result.source === 'help'
            ? contentLoader.getHelpDocBySlug(result.slug)
            : contentLoader.getBlogPostBySlug(result.slug)

        return {
          ...result,
          content: doc?.content,
        }
      })
    : paginatedResults

  res.json({
    query,
    data: results,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  })
}

// GET /search/full?q=query&page=1&limit=20
router.get('/full', (req: Request, res: Response) => {
  performSearch(req, res, true)
})

// GET /search?q=query&page=1&limit=100
router.get('/', (req: Request, res: Response) => {
  performSearch(req, res, false)
})

export default router
