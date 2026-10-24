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
  // A moved indicator page served through /help (spec 053 §2.3)
  ...(doc.movedTo ? { kind: 'native' as const, movedTo: doc.movedTo } : {}),
})

const router = createContentRouter<ParsedHelpDoc>({
  getAllDocs: () => contentLoader.getAllHelpDocs(),
  // Also answers the moved indicator slugs, in either compat mode
  getDocBySlug: (slug) => contentLoader.getHelpDocBySlug(slug),
  getDocsByCategory: (category) =>
    contentLoader.getHelpDocsByCategory(category),
  getDocsByTag: (tag) => contentLoader.getHelpDocsByTag(tag),
  getAllCategories: () => contentLoader.getAllHelpCategories(),
  getAllTags: () => contentLoader.getAllHelpTags(),
  toMetadata,
  getDocResponseExtras: (doc) =>
    doc.movedTo ? { movedTo: doc.movedTo } : undefined,
})

export default router
