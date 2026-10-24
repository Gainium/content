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

### Indicators
One page per indicator in `docs/indicators/<slug>.md`, with a `kind`:
`native` (runs in Gainium bots), `builtin` or `community` (TradingView
indicators usable through TradingView alerts and a webhook bot).

Every endpoint returns **`native` pages only** unless `?include=all`. This is
a default, not access control: a caller that forgets the parameter gets less,
never more. Pages that fail validation (for example `alerts: none`) are never
served.

- `GET /indicators?page=1&limit=100[&include=all]` - List indicator pages (same pagination envelope as `/help`)
  ```json
  { "data": [{ "name": "Relative Strength Index (RSI)", "slug": "rsi", "kind": "native",
      "aliases": ["RSI", "Relative Strength Index"], "category": "momentum",
      "description": "...", "tldr": "...", "catalogKeys": ["RSI"],
      "updatedAt": "2026-10-12T00:00:00.000Z" }],
    "pagination": { "total": 37, "page": 1, "limit": 100, "totalPages": 1, "hasNext": false, "hasPrev": false } }
  ```
  `author` and `scriptUrl` are present on `community` pages; `catalogKeys` only on `native` ones.
- `GET /indicators/:slug[?include=all]` - One page, same shape as `GET /help/:id` (`{ "metadata": {...frontmatter}, "content": "..." }`). Non-native slugs answer 404 without `include=all`.
- `GET /indicators/manifest` - Slugs, names and aliases of every page, for code (not for display):
  ```json
  { "data": {
      "native": [{ "slug": "rsi", "name": "Relative Strength Index (RSI)", "aliases": ["RSI"], "catalogKeys": ["RSI"] }],
      "other":  [{ "slug": "example-script", "name": "Example Script", "aliases": [], "kind": "community" }] } }
  ```

`/search` includes `native` indicator pages with `"source": "indicator"` and
never returns the other kinds. Indicator pages that moved out of `/help` keep
answering on `GET /help/:slug` (help-doc shape plus `"movedTo": "/indicators/<slug>"`)
in either mode below. Help listings are sorted by slug.

#### Migration compatibility mode: `INDICATORS_HELP_COMPAT`

Default **ON**; off only when set to `off`, `0` or `false` (restart to apply).
It covers the native indicator pages that moved out of `docs/help`, so that
clients deployed before the move keep working:

| | ON (default) | OFF |
|---|---|---|
| `/help`, `/help/full`, `/help/category/*`, `/help/tag/*`, `/help/categories`, `/help/tags` | include the moved pages as normal help items, sorted and paginated with the rest, each with `"kind": "native"` and `"movedTo": "/indicators/<slug>"` | do not include them |
| `/search`, `/search/full` | return the moved pages as `"source": "help"` with `kind` + `movedTo`; other native pages as `"source": "indicator"` | every native page as `"source": "indicator"` |
| `/help/:slug` for a moved slug | the page plus `movedTo` | same |

`builtin` and `community` pages never appear in any of these, in either mode.

**Remove the compatibility mode (set it to `off`, then delete it) once all of these hold:**
the dashboard release that reads `/indicators` is live on cloud and in the
self-hosted image; main-app's `get_gainium_indicators` tool is deployed; and
public-frontend filters items carrying `movedTo` out of its help pages.

Checks: `npm run check:indicators` validates every page against its `kind`
and compares the `native` pages with the dashboard's indicator catalog in
both directions (catalog from `INDICATOR_CATALOG_PATH`, else the public
`main-dash-sh` repo).

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
