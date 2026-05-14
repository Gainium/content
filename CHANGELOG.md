# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2026-05-14
### Added
- Set branch

## [1.0.1] - 2026-03-06
### Added
- New endpoints
  - `GET /categories`
  - `GET /tags`

## [1.0.0] - 2026-03-05
### Added
- Initial release of Gainium Content API service
- Express API server running on port 7570
- Content loading system with intelligent caching (stale-while-revalidate)
- Git integration for automatic content synchronization
- Cron job running every minute to check for content updates
- Full-text search across help documentation and blog posts
- Search result deduplication (highest relevance match per document)
- Pagination support for all collection endpoints
  - Default 100 items per page for metadata-only responses
  - Default 20 items per page for full content responses
  - Configurable limits with max of 1000 items per page
- Help documentation endpoints:
  - `GET /help` - List all help docs (metadata only)
  - `GET /help/full` - List all help docs with full content
  - `GET /help/category/:id` - Filter by category
  - `GET /help/tag/:id` - Filter by tag
  - `GET /help/:slug` - Get single document by slug
- Blog post endpoints:
  - `GET /blog` - List all blog posts (metadata only)
  - `GET /blog/full` - List all blog posts with full content
  - `GET /blog/category/:id` - Filter by category
  - `GET /blog/tag/:id` - Filter by tag
  - `GET /blog/:slug` - Get single post by slug
- Search endpoints:
  - `GET /search?q={query}` - Search with metadata and match excerpts
  - `GET /search/full?q={query}` - Search with full document content
- Metadata endpoint:
  - `GET /metadata` - Git commit information
- Standard Gainium logger with configurable log levels
- Memory-efficient indexing (stores slugs instead of full documents)
- TypeScript with strict mode compilation
- ESLint configuration with automatic formatting
- Prettier code formatting (no semicolons, single quotes)
- Husky pre-commit hooks
- PM2 ecosystem configuration for production deployment
- Comprehensive API documentation in README.md
- Image paths converted to full URLs (https://gainium.io/images/...)
