import { contentLoader } from '../contentLoader'
import { DocMetadata, ParsedBlogPost } from '../types'
import { createContentRouter } from './createContentRouter'

// Helper to convert blog post to metadata
const toMetadata = (post: ParsedBlogPost): DocMetadata => ({
  slug: post.metadata.slug,
  title: post.metadata.title,
  excerpt: post.metadata.excerpt,
  categories: post.metadata.categories,
  tags: post.metadata.tags,
  tldr: post.metadata.tldr,
  updatedAt: post.metadata.updatedAt,
  publishedAt: post.metadata.publishedAt,
})

const router = createContentRouter<ParsedBlogPost>({
  getAllDocs: () => contentLoader.getAllBlogPosts(),
  getDocBySlug: (slug) => contentLoader.getBlogPostBySlug(slug),
  getDocsByCategory: (category) =>
    contentLoader.getBlogPostsByCategory(category),
  getDocsByTag: (tag) => contentLoader.getBlogPostsByTag(tag),
  getAllCategories: () => contentLoader.getAllBlogCategories(),
  getAllTags: () => contentLoader.getAllBlogTags(),
  toMetadata,
})

export default router
