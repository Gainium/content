import { contentLoader } from '../contentLoader'
import { DocMetadata, ParsedHelpDoc } from '../types'
import { createContentRouter } from './createContentRouter'

// Helper to convert help doc to metadata
const toMetadata = (doc: ParsedHelpDoc): DocMetadata => ({
  slug: doc.metadata.slug,
  title: doc.metadata.name,
  description: doc.metadata.description,
  categories: doc.metadata.categories,
  tags: doc.metadata.tags,
  tldr: doc.metadata.tldr,
  updatedAt: doc.metadata.updatedAt,
  publishedAt: doc.metadata.publishedAt,
})

const router = createContentRouter<ParsedHelpDoc>({
  getAllDocs: () => contentLoader.getAllHelpDocs(),
  getDocBySlug: (slug) => contentLoader.getHelpDocBySlug(slug),
  getDocsByCategory: (category) =>
    contentLoader.getHelpDocsByCategory(category),
  getDocsByTag: (tag) => contentLoader.getHelpDocsByTag(tag),
  toMetadata,
})

export default router
