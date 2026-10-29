import { Router, Request, Response } from 'express'
import { contentLoader } from '../contentLoader'
import { IndicatorListItem, ParsedIndicator } from '../types'
import { getPaginationParams, paginateArray } from './createContentRouter'
import { rankByEdge } from '../indicators/edgeRanking'

/**
 * Indicator library (spec 053 §2.3).
 *
 * Every route returns `kind: native` pages only unless `?include=all`.
 * That is a default, not access control: a caller that forgets the
 * parameter (main-app, which feeds Max) gets less, never more.
 */
const router = Router()

const includeAll = (req: Request) => req.query.include === 'all'

const toListItem = ({ metadata }: ParsedIndicator): IndicatorListItem => ({
  name: metadata.name,
  slug: metadata.slug,
  kind: metadata.kind,
  aliases: metadata.aliases,
  category: metadata.category,
  description: metadata.description,
  tldr: metadata.tldr,
  catalogKeys: metadata.catalogKeys,
  author: metadata.author,
  scriptUrl: metadata.scriptUrl,
  updatedAt: metadata.updatedAt,
})

// GET /indicators/manifest — for main-app code (never the model).
// Registered before /:slug so "manifest" is never read as a slug.
router.get('/manifest', (req: Request, res: Response) => {
  res.json({ data: contentLoader.getIndicatorManifest() })
})

// GET /indicators/edge-ranking[?include=all] — counts only (spec 061 §3), for
// the site's ranked views; the edge commentary stays on /indicators/:slug.
router.get('/edge-ranking', (req: Request, res: Response) => {
  res.json({ data: rankByEdge(contentLoader.getIndicators(includeAll(req))) })
})

// GET /indicators[?include=all&page=&limit=]
router.get('/', (req: Request, res: Response) => {
  const docs = contentLoader.getIndicators(includeAll(req))
  const { page, limit } = getPaginationParams(req, false)
  const { data, pagination } = paginateArray(docs, page, limit)
  res.json({ data: data.map(toListItem), pagination })
})

// GET /indicators/:slug[?include=all] — same shape as GET /help/:id, plus
// `edge` (spec 054) when the page has a <slug>.edge.json
router.get('/:slug', (req: Request, res: Response) => {
  const doc = contentLoader.getIndicatorBySlug(req.params.slug, includeAll(req))

  if (!doc) {
    return res.status(404).json({
      error: 'Document not found',
    })
  }

  res.json({
    metadata: doc.metadata,
    content: doc.content,
    ...(doc.edge ? { edge: doc.edge } : {}),
  })
})

export default router
