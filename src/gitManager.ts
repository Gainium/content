import simpleGit, { SimpleGit } from 'simple-git'
import { GitMetadata } from './types'
import logger from './utils/logger'

class GitManager {
  private git: SimpleGit

  constructor() {
    this.git = simpleGit(process.cwd())
  }

  async getLatestCommitInfo(): Promise<GitMetadata> {
    try {
      const log = await this.git.log({ maxCount: 1 })
      const latest = log.latest

      if (!latest) {
        return {
          commit: 'unknown',
          date: new Date().toISOString(),
          message: 'No commits found',
          author: 'unknown',
        }
      }

      return {
        commit: latest.hash,
        date: latest.date,
        message: latest.message,
        author: latest.author_name,
      }
    } catch (error) {
      logger.error(`Error getting commit info: ${error}`)
      return {
        commit: 'error',
        date: new Date().toISOString(),
        message: 'Error getting commit info',
        author: 'unknown',
      }
    }
  }

  async checkForUpdates(): Promise<boolean> {
    try {
      // Fetch latest changes from remote
      await this.git.fetch()

      // Get local HEAD commit
      const localLog = await this.git.log({ maxCount: 1 })
      const localCommit = localLog.latest?.hash

      // Get remote HEAD commit
      const remoteLog = await this.git.log({
        maxCount: 1,
        '--remotes': 'origin',
      })
      const remoteCommit = remoteLog.latest?.hash

      return localCommit !== remoteCommit
    } catch (error) {
      logger.error(`Error checking for updates: ${error}`)
      return false
    }
  }

  async pullLatest(): Promise<boolean> {
    try {
      logger.info('Pulling latest changes from remote...')
      await this.git.pull('origin', 'main')
      logger.info('Successfully pulled latest changes')
      return true
    } catch (error) {
      logger.error('Error pulling latest changes:', error)
      return false
    }
  }

  async syncAndCheck(): Promise<{
    hasUpdates: boolean
    oldCommit: string
    newCommit: string
  }> {
    const oldCommit = await this.getLatestCommitInfo()
    const hasUpdates = await this.checkForUpdates()

    if (hasUpdates) {
      await this.pullLatest()
    }

    const newCommit = await this.getLatestCommitInfo()

    return {
      hasUpdates: oldCommit.commit !== newCommit.commit,
      oldCommit: oldCommit.commit,
      newCommit: newCommit.commit,
    }
  }
}

const gitManager = new GitManager()

export const getLatestCommitInfo = () => gitManager.getLatestCommitInfo()
export const checkForUpdates = () => gitManager.checkForUpdates()
export const pullLatest = () => gitManager.pullLatest()
export const syncAndCheck = () => gitManager.syncAndCheck()
