import { describe, it, before } from 'mocha'
import { expect } from 'chai'
import { ContentLoader } from '../src/contentLoader'

/**
 * Spec: specs/002.mcginley-dynamic-help-article.md
 *
 * Exercises the real production parsing path (ContentLoader, the same
 * class the running service uses) against the real new file on disk,
 * rather than hand-parsing frontmatter — so this catches the same
 * failure modes the live service would (missing required field, duplicate
 * slug, etc.), not just "the file exists".
 */
describe('McGinley Dynamic help article', () => {
  let loader: ContentLoader

  before(async () => {
    loader = new ContentLoader()
    await loader.initialize()
  })

  it('is loaded and reachable by its slug', () => {
    const doc = loader.getHelpDocBySlug('mcginley-dynamic')
    expect(
      doc,
      'docs/help/mcginley-dynamic.md failed to load — check required frontmatter fields',
    ).to.not.equal(undefined)
  })

  it('matches the slug the dashboard catalog links to', () => {
    const doc = loader.getHelpDocBySlug('mcginley-dynamic')
    expect(doc?.metadata.slug).to.equal('mcginley-dynamic')
    expect(doc?.metadata.categories).to.include('technical-indicators')
  })
})
