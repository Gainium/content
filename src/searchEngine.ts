import { ParsedHelpDoc, ParsedBlogPost, SearchResult } from './types'

export class SearchEngine {
  search(
    query: string,
    helpDocs: ParsedHelpDoc[],
    blogPosts: ParsedBlogPost[],
  ): SearchResult[] {
    const results: SearchResult[] = []
    const normalizedQuery = query.toLowerCase()

    // Search through help docs
    helpDocs.forEach((doc) => {
      const matches = this.searchInDocument(
        normalizedQuery,
        doc.metadata.name,
        doc.metadata.description,
        doc.metadata.tldr,
        doc.content,
      )

      // Only add the highest relevance match for this document
      if (matches.length > 0) {
        const bestMatch = matches[0] // Already sorted by relevance in searchInDocument
        results.push({
          source: 'help',
          slug: doc.metadata.slug,
          title: doc.metadata.name,
          description: doc.metadata.description,
          match: bestMatch.text,
          relevance: bestMatch.relevance,
        })
      }
    })

    // Search through blog posts
    blogPosts.forEach((post) => {
      const matches = this.searchInDocument(
        normalizedQuery,
        post.metadata.title,
        post.metadata.excerpt,
        post.metadata.tldr,
        post.content,
      )

      // Only add the highest relevance match for this document
      if (matches.length > 0) {
        const bestMatch = matches[0] // Already sorted by relevance in searchInDocument
        results.push({
          source: 'blog',
          slug: post.metadata.slug,
          title: post.metadata.title,
          excerpt: post.metadata.excerpt,
          match: bestMatch.text,
          relevance: bestMatch.relevance,
        })
      }
    })

    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance)

    return results
  }

  private searchInDocument(
    query: string,
    title: string,
    description: string | undefined,
    tldr: string | undefined,
    content: string,
  ): Array<{ text: string; relevance: number }> {
    const matches: Array<{ text: string; relevance: number }> = []

    // Search in title (highest relevance)
    if (title.toLowerCase().includes(query)) {
      matches.push({
        text: this.extractMatch(title, query),
        relevance: 100,
      })
    }

    // Search in TLDR
    if (tldr && tldr.toLowerCase().includes(query)) {
      matches.push({
        text: this.extractMatch(tldr, query),
        relevance: 90,
      })
    }

    // Search in description
    if (description && description.toLowerCase().includes(query)) {
      matches.push({
        text: this.extractMatch(description, query),
        relevance: 80,
      })
    }

    // Search in content
    const contentLower = content.toLowerCase()
    const maxContentMatches = 5

    for (
      let index = contentLower.indexOf(query), count = 0;
      index !== -1 && count < maxContentMatches;
      index = contentLower.indexOf(query, index + 1), count++
    ) {
      const matchText = this.extractContext(content, index, query.length)
      matches.push({
        text: matchText,
        relevance: 50,
      })
    }

    return matches.slice(0, 3) // Return top 3 matches per document
  }

  private extractMatch(text: string, query: string): string {
    const index = text.toLowerCase().indexOf(query.toLowerCase())
    if (index === -1) return text

    const start = Math.max(0, index - 50)
    const end = Math.min(text.length, index + query.length + 50)

    let excerpt = text.substring(start, end)
    if (start > 0) excerpt = '...' + excerpt
    if (end < text.length) excerpt = excerpt + '...'

    return excerpt
  }

  private extractContext(
    content: string,
    index: number,
    queryLength: number,
  ): string {
    // Extract a few sentences around the match
    const start = Math.max(0, index - 100)
    const end = Math.min(content.length, index + queryLength + 100)

    let context = content.substring(start, end)

    // Try to find sentence boundaries
    const beforeMatch = context.substring(0, index - start)
    const afterMatch = context.substring(index - start + queryLength)

    const sentenceStart = beforeMatch.lastIndexOf('. ')
    const sentenceEnd = afterMatch.indexOf('. ')

    if (sentenceStart !== -1) {
      context = context.substring(sentenceStart + 2)
    }

    if (sentenceEnd !== -1) {
      context = context.substring(
        0,
        context.length - afterMatch.length + sentenceEnd + 1,
      )
    }

    if (start > 0) context = '...' + context
    if (end < content.length) context = context + '...'

    return context.trim()
  }
}

export const searchEngine = new SearchEngine()
