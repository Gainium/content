import { Router, Request, Response } from 'express'
import { contentLoader } from '../contentLoader'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const metadata = contentLoader.getCommitMetadata()

  if (!metadata) {
    return res.status(503).json({
      error: 'Content not loaded yet',
    })
  }

  res.json(metadata)
})

export default router
