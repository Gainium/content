import { Router, Request, Response } from 'express'
import { contentLoader } from '../contentLoader'
import { ParsedStrategy, StrategyListItem } from '../types'
import { rankStrategies } from '../strategies/ranking'

/**
 * Strategy library (main-app spec 061 §5). Every page served has a recipe;
 * `results` appears once the engine has run it. All numbers a page shows come
 * from `results`, never from the prose.
 */
const router = Router()

const toListItem = ({
  metadata,
  recipe,
  results,
}: ParsedStrategy): StrategyListItem => ({
  name: metadata.name,
  slug: metadata.slug,
  description: metadata.description,
  tldr: metadata.tldr,
  tags: ((recipe as any)?.tags as string[]) ?? [],
  rules: (((recipe as any)?.rules as string[]) ?? []).length,
  hasResults: !!results,
  updatedAt: metadata.updatedAt,
})

// GET /strategies/ranking — registered before /:slug so it is never a slug
router.get('/ranking', (req: Request, res: Response) => {
  res.json({ data: rankStrategies(contentLoader.getStrategies()) })
})

// GET /strategies
router.get('/', (req: Request, res: Response) => {
  res.json({ data: contentLoader.getStrategies().map(toListItem) })
})

// GET /strategies/:slug → { metadata, content, recipe, results? }
router.get('/:slug', (req: Request, res: Response) => {
  const doc = contentLoader.getStrategyBySlug(req.params.slug)
  if (!doc) {
    return res.status(404).json({ error: 'Document not found' })
  }
  res.json({
    metadata: doc.metadata,
    content: doc.content,
    recipe: doc.recipe,
    ...(doc.results ? { results: doc.results } : {}),
  })
})

export default router
