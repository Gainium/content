import cron from 'node-cron'
import { syncAndCheck } from './gitManager'
import { contentLoader } from './contentLoader'
import { startServer } from './server'
import logger from './utils/logger'

async function main() {
  try {
    // Start the server
    await startServer()

    // Set up cron job to check for updates every minute
    logger.info('⏰ Setting up auto-update cron job (runs every minute)...')

    cron.schedule('* * * * *', async () => {
      try {
        logger.info('🔄 Checking for content updates...')
        const { hasUpdates, oldCommit, newCommit } = await syncAndCheck()

        if (hasUpdates) {
          logger.info(
            `📥 New commit detected: ${oldCommit.slice(0, 7)} -> ${newCommit.slice(0, 7)}`,
          )
          logger.info('🔄 Reloading content...')
          await contentLoader.loadAllContent()
          logger.info('✅ Content reloaded successfully')
        } else {
          logger.info('✓ Content is up to date')
        }
      } catch (error) {
        logger.error('❌ Error during auto-update:', error)
      }
    })

    logger.info('✅ Auto-update cron job started')
  } catch (error) {
    logger.error('Fatal error starting server:', error)
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...')
  process.exit(0)
})

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully...')
  process.exit(0)
})

main()
