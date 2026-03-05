# Gainium Content API

API service for serving Gainium documentation and blog content.

## Features

- 🚀 Fast in-memory content serving
- 🔄 Auto-sync with Git repository
- 🔍 Full-text search across all content
- 💾 Intelligent caching with stale-while-revalidate
- 📝 Markdown parsing with frontmatter support

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The server will start on port 7570 by default.

## Production

Build and start with PM2:

```bash
npm run build
npm run pm2:start
```

## API Endpoints

### Metadata
- `GET /metadata` - Get last commit metadata

### Help Documentation
- `GET /help?page=1&limit=100` - Get all help docs metadata (paginated, max 100 per page, 100 per page by default)
- `GET /help/full?page=1&limit=20` - Get all help docs with content (paginated, maax 20 per page, 20 per page by default)
- `GET /help/category/:id?page=1` - Get help docs by category (metadata only, paginated)
- `GET /help/category/:id/full?page=1` - Get help docs by category with content (paginated)
- `GET /help/tag/:id?page=1` - Get help docs by tag (metadata only, paginated)
- `GET /help/tag/:id/full?page=1` - Get help docs by tag with content (paginated)
- `GET /help/:id` - Get full help doc by slug (always includes content, no pagination)

### Blog Posts
- `GET /blog?page=1&limit=100` - Get all blog posts metadata (paginated, 100 per page by default)
- `GET /blog/full?page=1&limit=20` - Get all blog posts with content (paginated, 20 per page by default)
- `GET /blog/category/:id?page=1` - Get blog posts by category (metadata only, paginated)
- `GET /blog/category/:id/full?page=1` - Get blog posts by category with content (paginated)
- `GET /blog/tag/:id?page=1` - Get blog posts by tag (metadata only, paginated)
- `GET /blog/tag/:id/full?page=1` - Get blog posts by tag with content (paginated)
- `GET /blog/:id` - Get full blog post by slug (always includes content, no pagination)

#### Pagination
All collection endpoints support pagination via query parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 100 for metadata, 20 for full content, max: 1000)

Response format:
```json
{
  "data": [...],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 100,
    "totalPages": 2,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Search
- `GET /search?q={query}&page=1&limit=100` - Search across all content (metadata with match excerpt)
- `GET /search/full?q={query}&page=1&limit=20` - Search with full document content

Query parameters:
- `q` - Search query (required)
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 100 for metadata, 20 for full content)

Response format:
```json
{
  "query": "trading",
  "data": [
    {
      "source": "help",
      "slug": "dca-bot",
      "title": "DCA Bot Guide",
      "description": "...",
      "match": "...matched text excerpt...",
      "relevance": 100,
      "content": "full content only in /search/full"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 100,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

**Note**: Search results are deduplicated - only the highest relevance match per document is returned.

## Configuration

Set the `PORT` environment variable to change the server port (default: 7570).

## Repository

https://github.com/Gainium/content.git
