import express, { Application, Request, Response, NextFunction } from 'express'
import path from 'path'
import cors from 'cors'
import { contentLoader } from './contentLoader'
import metadataRouter from './routes/metadata'
import helpRouter from './routes/help'
import blogRouter from './routes/blog'
import searchRouter from './routes/search'
import logger from './utils/logger'

const PORT = process.env.PORT || 7570

export function createServer(): Application {
  const app = express()

  // Middleware
  app.use(cors())
  app.use(express.json())

  // Logging middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.path}`)
    next()
  })

  // Health check
  app.get('/', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Gainium Content API',
      version: '1.0.0',
      endpoints: {
        metadata: '/metadata',
        help: '/help',
        blog: '/blog',
        search: '/search',
        images: '/images/content/{help,blog}/<filename>',
      },
    })
  })

  // Static image serving
  const imagesDir = path.join(process.cwd(), 'docs', 'images')
  app.use('/images/content', express.static(imagesDir, {
    maxAge: '7d',
    immutable: true,
  }))

  // Routes
  app.use('/metadata', metadataRouter)
  app.use('/help', helpRouter)
  app.use('/blog', blogRouter)
  app.use('/search', searchRouter)

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: 'Not found',
      path: req.path,
    })
  })

  // Error handler
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error('Error:', err)
    res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    })
  })

  return app
}

export async function startServer(): Promise<void> {
  logger.info('Starting Gainium Content API...')

  // Initialize content loader
  await contentLoader.initialize()

  // Create and start server
  const app = createServer()

  app.listen(PORT, () => {
    logger.info(`✅ Server running on port ${PORT}`)
    logger.info(`📚 API available at http://localhost:${PORT}`)
  })
}
