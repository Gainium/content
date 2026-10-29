import { describe, it, before, after } from 'mocha'
import { expect } from 'chai'
import fs from 'fs'
import path from 'path'
import { AddressInfo } from 'net'
import { Server } from 'http'
import { contentLoader } from '../src/contentLoader'
import { createServer } from '../src/server'

/**
 * Spec 053 content API. Fixtures hold one page of each kind, an
 * `alerts: none` page that must never be served, a moved native page
 * (`rsi`, in the moved-from-help list) and a native page that never lived
 * in help (`native-extra-oscillator`).
 *
 * Every suite runs in both INDICATORS_HELP_COMPAT modes.
 */
const FIXTURES = path.join(__dirname, 'fixtures', 'docs')
// rsi has an edge file beside it (spec 054); native-extra-oscillator has none
const RSI_EDGE = JSON.parse(
  fs.readFileSync(path.join(FIXTURES, 'indicators', 'rsi.edge.json'), 'utf-8'),
)

// Strings that only occur in the non-native fixtures.
const NON_NATIVE_MARKERS = [
  'fixture-zebra-cloud',
  'fixture-zebra-cipher',
  'fixture-zebra-noalerts',
  'Fixture Zebra',
  'Zebra Cloud',
  'Zebra Cipher',
  'Zebra No Alerts',
  'zebra cloud',
  'zebra cipher',
  'community',
  'builtin',
]

// Every route Max reads, with no `include` parameter (invariant I-1).
const MAX_FACING_ROUTES = [
  '/help',
  '/help/full',
  '/help/categories',
  '/help/tags',
  '/help/category/technical-indicators',
  '/help/category/technical-indicators/full',
  '/help/tag/indicator',
  '/help/tag/indicator/full',
  '/help/zebra-feature',
  '/help/rsi',
  '/help/fixture-zebra-cloud',
  '/help/fixture-zebra-cipher',
  '/search?q=zebra',
  '/search/full?q=zebra',
  '/search?q=cipher',
  '/search?q=cloud',
  '/search?q=webhook',
  '/search/full?q=webhook',
  '/indicators',
  '/indicators/rsi',
  '/indicators/fixture-zebra-cloud',
  '/indicators/fixture-zebra-cipher',
  '/indicators/fixture-zebra-noalerts',
  '/blog',
  '/blog/full',
  '/blog/categories',
  '/blog/tags',
  '/blog/tag/indicator',
  '/blog/zebra-post',
]

const RSI_HELP_ITEM = {
  slug: 'rsi',
  title: 'Relative Strength Index (RSI)',
  description: 'What the RSI is and how a zebra trader uses it.',
  categories: ['technical-indicators'],
  tags: ['indicator'],
  tldr: 'RSI measures momentum.',
  updatedAt: '2026-01-02T00:00:00.000Z',
  publishedAt: '2026-01-01T00:00:00.000Z',
  kind: 'native',
  movedTo: '/indicators/rsi',
}

type Mode = { name: string; env: string | undefined; compat: boolean }
const MODES: Mode[] = [
  { name: 'compat ON (default, env unset)', env: undefined, compat: true },
  { name: 'compat OFF', env: 'off', compat: false },
]

let server: Server
let baseUrl: string
let previousLogLevel: string | undefined
let previousCompat: string | undefined

const get = async (route: string) => {
  const response = await fetch(`${baseUrl}${route}`)
  const text = await response.text()
  return { status: response.status, text, json: JSON.parse(text) }
}
const slugsOf = (json: { data: Array<{ slug: string }> }) =>
  json.data.map((d) => d.slug)

describe('indicator content API (spec 053)', () => {
  before(async () => {
    previousLogLevel = process.env.LOG_LEVEL
    previousCompat = process.env.INDICATORS_HELP_COMPAT
    process.env.LOG_LEVEL = 'error'
    await contentLoader.loadFromDirectory(FIXTURES)
    server = createServer().listen(0)
    await new Promise((resolve) => server.once('listening', resolve))
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`
  })

  after(async () => {
    await new Promise((resolve) => server.close(resolve))
    const restore = (key: string, value: string | undefined) => {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
    restore('LOG_LEVEL', previousLogLevel)
    restore('INDICATORS_HELP_COMPAT', previousCompat)
  })

  for (const mode of MODES) {
    describe(mode.name, () => {
      before(() => {
        if (mode.env === undefined) delete process.env.INDICATORS_HELP_COMPAT
        else process.env.INDICATORS_HELP_COMPAT = mode.env
      })

      describe('I-1: Max-facing routes return no non-native indicator', () => {
        for (const route of MAX_FACING_ROUTES) {
          it(`GET ${route}`, async () => {
            const { text } = await get(route)
            for (const marker of NON_NATIVE_MARKERS) {
              expect(text, `${route} leaked "${marker}"`).not.to.include(marker)
            }
          })
        }
      })

      describe('/help', () => {
        it('lists the moved native pages only in compat mode', async () => {
          const { json } = await get('/help')
          if (mode.compat) {
            expect(slugsOf(json)).to.deep.equal(['rsi', 'zebra-feature'])
            expect(json.data[0]).to.deep.equal(RSI_HELP_ITEM)
            expect(json.data[1]).not.to.have.property('movedTo')
            expect(json.data[1]).not.to.have.property('kind')
            expect(json.pagination).to.include({ total: 2, page: 1 })
          } else {
            expect(slugsOf(json)).to.deep.equal(['zebra-feature'])
          }
        })

        it('paginates the moved pages like any help doc', async () => {
          const { json } = await get('/help?limit=1&page=2')
          if (mode.compat) {
            expect(slugsOf(json)).to.deep.equal(['zebra-feature'])
            expect(json.pagination).to.include({
              total: 2,
              totalPages: 2,
              hasPrev: true,
              hasNext: false,
            })
          } else {
            expect(json.data).to.deep.equal([])
          }
        })

        it('/help/full carries kind + movedTo in the item metadata', async () => {
          const { json } = await get('/help/full')
          const rsi = json.data.find(
            (d: { metadata: { slug: string } }) => d.metadata.slug === 'rsi',
          )
          if (mode.compat) {
            expect(rsi.metadata).to.deep.equal(RSI_HELP_ITEM)
            expect(rsi.content).to.include('The RSI is native.')
          } else {
            expect(rsi).to.equal(undefined)
          }
        })

        it('categories, category and tag views include the moved pages only in compat mode', async () => {
          const count = mode.compat ? 2 : 1
          expect((await get('/help/categories')).json.data).to.deep.equal([
            { slug: 'technical-indicators', count },
          ])
          expect((await get('/help/tags')).json.data).to.deep.equal([
            { slug: 'indicator', count },
          ])
          const category = await get('/help/category/technical-indicators')
          const tag = await get('/help/tag/indicator')
          const expected = mode.compat
            ? ['rsi', 'zebra-feature']
            : ['zebra-feature']
          expect(slugsOf(category.json)).to.deep.equal(expected)
          expect(slugsOf(tag.json)).to.deep.equal(expected)
        })

        it('answers a moved slug in the help-doc shape plus movedTo (both modes)', async () => {
          const { status, json } = await get('/help/rsi')
          expect(status).to.equal(200)
          expect(json.movedTo).to.equal('/indicators/rsi')
          expect(json.metadata).to.include({
            slug: 'rsi',
            id: 9002,
            kind: 'native',
          })
          expect(json.content).to.include('The RSI is native.')
        })

        it('a real help doc has no movedTo', async () => {
          const { json } = await get('/help/zebra-feature')
          expect(json).not.to.have.property('movedTo')
        })

        it('never serves a native page that did not move from help', async () => {
          expect((await get('/help/native-extra-oscillator')).status).to.equal(
            404,
          )
        })
      })

      describe('/search', () => {
        it('returns moved pages as help in compat mode, as indicator otherwise', async () => {
          const { json } = await get('/search?q=zebra')
          const sources = json.data.map(
            (r: { source: string; slug: string }) => `${r.source}:${r.slug}`,
          )
          expect(sources).to.have.members([
            'help:zebra-feature',
            'blog:zebra-post',
            mode.compat ? 'help:rsi' : 'indicator:rsi',
            'indicator:native-extra-oscillator',
          ])
          const rsi = json.data.find((r: { slug: string }) => r.slug === 'rsi')
          if (mode.compat) {
            expect(rsi).to.include({
              source: 'help',
              kind: 'native',
              movedTo: '/indicators/rsi',
            })
          } else {
            expect(rsi).not.to.have.property('movedTo')
          }
        })

        it('/search/full carries the moved page content in both modes', async () => {
          const { json } = await get('/search/full?q=zebra')
          const rsi = json.data.find((r: { slug: string }) => r.slug === 'rsi')
          expect(rsi.content).to.include('The RSI is native.')
          const extra = json.data.find(
            (r: { slug: string }) => r.slug === 'native-extra-oscillator',
          )
          expect(extra.source).to.equal('indicator')
          expect(extra.content).to.include('Native extra body.')
        })

        it('matches native indicator aliases', async () => {
          const { json } = await get('/search?q=nxo')
          expect(json.data.map((r: { slug: string }) => r.slug)).to.include(
            'native-extra-oscillator',
          )
        })
      })

      describe('GET /indicators', () => {
        it('defaults to native only', async () => {
          const { status, json } = await get('/indicators')
          expect(status).to.equal(200)
          expect(slugsOf(json)).to.deep.equal([
            'native-extra-oscillator',
            'rsi',
          ])
          expect(json.pagination).to.include({ total: 2, page: 1 })
          const rsi = json.data.find((d: { slug: string }) => d.slug === 'rsi')
          expect(rsi).to.include({
            name: 'Relative Strength Index (RSI)',
            kind: 'native',
            category: 'momentum',
          })
          expect(rsi.catalogKeys).to.deep.equal(['RSI'])
        })

        it('?include=all adds builtin and community, never an alerts: none page', async () => {
          const { json } = await get('/indicators?include=all')
          expect(slugsOf(json)).to.deep.equal([
            'fixture-zebra-cipher',
            'fixture-zebra-cloud',
            'native-extra-oscillator',
            'rsi',
          ])
          const community = json.data.find(
            (d: { slug: string }) => d.slug === 'fixture-zebra-cipher',
          )
          expect(community).to.include({
            kind: 'community',
            author: 'fixture-author',
            scriptUrl: 'https://example.com/scripts/zebra-cipher',
          })
        })
      })

      describe('GET /indicators/:slug', () => {
        it('returns a native page in the help-doc shape', async () => {
          const { status, json } = await get(
            '/indicators/native-extra-oscillator',
          )
          expect(status).to.equal(200)
          expect(Object.keys(json).sort()).to.deep.equal([
            'content',
            'metadata',
          ])
          expect(json.metadata).to.include({
            slug: 'native-extra-oscillator',
            kind: 'native',
          })
        })

        it('adds edge, the parsed <slug>.edge.json, when the page has one (spec 054)', async () => {
          const { status, json } = await get('/indicators/rsi')
          expect(status).to.equal(200)
          expect(Object.keys(json).sort()).to.deep.equal([
            'content',
            'edge',
            'metadata',
          ])
          expect(json.metadata).to.include({ slug: 'rsi', kind: 'native' })
          expect(json.edge).to.deep.equal(RSI_EDGE)
        })

        it('serves edge data nowhere else (spec 054)', async () => {
          for (const route of [
            '/indicators',
            '/indicators/manifest',
            '/help/rsi',
            '/help/full',
            '/search/full?q=rsi',
          ]) {
            const { text } = await get(route)
            expect(text, route).not.to.include('"edge"')
            expect(text, route).not.to.include('FTX collapse')
          }
          // the edge commentary is not searchable page text
          expect((await get('/search?q=FTX')).json.data).to.deep.equal([])
        })

        it('404s a non-native slug without include=all', async () => {
          for (const slug of ['fixture-zebra-cloud', 'fixture-zebra-cipher']) {
            expect((await get(`/indicators/${slug}`)).status).to.equal(404)
          }
        })

        it('serves a non-native slug with include=all', async () => {
          const { status, json } = await get(
            '/indicators/fixture-zebra-cloud?include=all',
          )
          expect(status).to.equal(200)
          expect(json.metadata).to.include({
            kind: 'builtin',
            alerts: 'alertcondition',
          })
        })

        it('never serves an alerts: none page', async () => {
          expect(
            (await get('/indicators/fixture-zebra-noalerts?include=all'))
              .status,
          ).to.equal(404)
        })
      })

      describe('GET /indicators/edge-ranking (spec 061)', () => {
        it('is not captured by /:slug and ranks pages with edge data only', async () => {
          const { status, json } = await get('/indicators/edge-ranking')
          expect(status).to.equal(200)
          // rsi fixture: 21 settings, none `edge`, 2 fragile, 5 worse
          expect(json).to.deep.equal({
            data: [
              {
                slug: 'rsi',
                judged: 21,
                beat: 0,
                fragile: 2,
                worse: 5,
                few: 0,
                expected: 1.05,
                p: 1,
                tier: 'luck',
                updatedAt: '2026-10-25',
              },
            ],
          })
        })

        it('carries counts, never the edge commentary', async () => {
          const { text } = await get('/indicators/edge-ranking?include=all')
          expect(text).not.to.include('"edge"')
          expect(text).not.to.include('FTX collapse')
        })
      })

      describe('GET /indicators/manifest', () => {
        it('is not captured by /:slug and lists both groups', async () => {
          const { status, json } = await get('/indicators/manifest')
          expect(status).to.equal(200)
          expect(json).to.deep.equal({
            data: {
              native: [
                {
                  slug: 'native-extra-oscillator',
                  name: 'Native Extra Oscillator',
                  aliases: ['NXO'],
                  catalogKeys: ['MACD'],
                },
                {
                  slug: 'rsi',
                  name: 'Relative Strength Index (RSI)',
                  aliases: ['RSI', 'Relative Strength Index'],
                  catalogKeys: ['RSI'],
                },
              ],
              other: [
                {
                  slug: 'fixture-zebra-cipher',
                  name: 'Fixture Zebra Cipher',
                  aliases: ['Zebra Cipher Community'],
                  kind: 'community',
                },
                {
                  slug: 'fixture-zebra-cloud',
                  name: 'Fixture Zebra Cloud',
                  aliases: ['Zebra Cloud Builtin'],
                  kind: 'builtin',
                },
              ],
            },
          })
        })
      })
    })
  }

  describe('compat flag values', () => {
    after(() => delete process.env.INDICATORS_HELP_COMPAT)
    for (const [value, compat] of [
      ['off', false],
      ['0', false],
      ['false', false],
      ['OFF', false],
      ['on', true],
      ['1', true],
      ['', true],
    ] as const) {
      it(`INDICATORS_HELP_COMPAT=${JSON.stringify(value)} → ${compat ? 'on' : 'off'}`, async () => {
        process.env.INDICATORS_HELP_COMPAT = value
        const { json } = await get('/help')
        expect(slugsOf(json).includes('rsi')).to.equal(compat)
      })
    }
  })

  describe('reload', () => {
    it('never serves a partial corpus while reloading', async () => {
      delete process.env.INDICATORS_HELP_COMPAT
      const sizes = () =>
        [
          contentLoader.getAllHelpDocs().length,
          contentLoader.getIndicators(true).length,
          contentLoader.getAllBlogPosts().length,
        ].join(',')
      const expected = sizes()
      let done = false
      const reload = contentLoader
        .loadFromDirectory(FIXTURES)
        .then(() => (done = true))
      const seen = new Set<string>()
      while (!done) {
        seen.add(sizes())
        await new Promise((resolve) => setImmediate(resolve))
      }
      await reload
      seen.add(sizes())
      expect([...seen]).to.deep.equal([expected])
    })
  })
})
