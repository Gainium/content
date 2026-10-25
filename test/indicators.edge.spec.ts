import { describe, it } from 'mocha'
import { expect } from 'chai'
import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  checkEdgeDir,
  checkEdgeFile,
  checkEdgeRecipe,
} from '../src/indicators/edgeCheck'
import { readMarkdownDir } from '../src/contentParser'
import { ContentLoader } from '../src/contentLoader'

/**
 * Spec 054 edge data checks. The fixture is the RSI worked example
 * (test/fixtures/docs/indicators/rsi.edge.json); each broken variant below
 * breaks one invariant of the spec's table.
 */
const INDICATORS = path.join(__dirname, 'fixtures', 'docs', 'indicators')
const FIXTURE = JSON.parse(
  fs.readFileSync(path.join(INDICATORS, 'rsi.edge.json'), 'utf-8'),
)
const NOW = new Date('2026-10-25T12:00:00Z')

const fixture = () => structuredClone(FIXTURE)
const check = (data: unknown) => checkEdgeFile(data, { slug: 'rsi', now: NOW })
/** The setting with this id on this timeframe. */
const setting = (data: any, tf: string, id: string) =>
  data.settings.find((s: any) => s.tf === tf && s.id === id)
const only = (errors: string[], id: string) => {
  expect(errors, errors.join('\n')).to.have.length.greaterThan(0)
  for (const error of errors) expect(error).to.include(`[${id}]`)
}

describe('indicator edge data (spec 054)', () => {
  it('passes the RSI worked example', () => {
    expect(check(fixture())).to.deep.equal([])
  })

  describe('shape', () => {
    it('fails a file that is not an object', () => {
      expect(check([])).to.deep.equal(['the file must be a JSON object'])
    })

    it('fails a file for another slug', () => {
      expect(checkEdgeFile(fixture(), { slug: 'macd', now: NOW })).to.include(
        'indicator: must be "macd" (the file name)',
      )
    })

    it('fails missing provenance (method.engine)', () => {
      const data = fixture()
      delete data.method.engine
      expect(check(data).join()).to.include('method.engine')
    })

    it('fails an unknown verdict, a missing coin and a bad defaultTf', () => {
      const data = fixture()
      data.settings[0].pooled.verdict = 'maybe'
      delete data.settings[1].coins.SOL
      data.defaultTf = '15m'
      const errors = check(data).join('\n')
      expect(errors).to.include('settings[0] (rsi7-lt30 1h).pooled.verdict')
      expect(errors).to.include('settings[1] (rsi14-lt30 1h).coins: must hold')
      expect(errors).to.include('defaultTf')
    })

    it('fails a chart whose length is not the horizon', () => {
      const data = fixture()
      data.settings[0].pooled.path.pop()
      data.settings[0].pooled.band.pop()
      expect(check(data).join()).to.include('19 points, method.horizon is 20')
    })

    it('accepts unknown extra keys and robustness on a cell', () => {
      const data = fixture()
      data.settings[0].extra = true
      setting(data, '1h', 'rsi14-gt70').pooled.robustness = { fragile: false }
      expect(check(data)).to.deep.equal([])
    })
  })

  describe('054.no-verdict-on-few', () => {
    it('fails a verdict on fewer than minEpisodes moves', () => {
      const data = fixture()
      setting(data, '1d', 'rsi14-lt30').coins.BTC.verdict = 'none'
      const errors = check(data)
      only(errors, '054.no-verdict-on-few')
      expect(errors[0]).to.include('14 episodes')
    })

    it('fails "few" on enough moves', () => {
      const data = fixture()
      setting(data, '1h', 'rsi7-lt30').pooled.verdict = 'few'
      only(check(data), '054.no-verdict-on-few')
    })
  })

  describe('054.no-unflagged-fragile', () => {
    it('fails edge/worse where robustness said fragile', () => {
      const data = fixture()
      setting(data, '1h', 'rsi14-gt70').pooled.robustness = { fragile: true }
      only(check(data), '054.no-unflagged-fragile')
    })

    it('fails fragile where robustness did not say so', () => {
      const data = fixture()
      setting(data, '4h', 'rsi14-gt50').pooled.robustness = { fragile: false }
      only(check(data), '054.no-unflagged-fragile')
    })
  })

  describe('054.verdict-matches-numbers', () => {
    it('fails "edge" inside the band', () => {
      const data = fixture()
      setting(data, '1h', 'rsi7-lt30').coins.BTC.verdict = 'edge'
      only(check(data), '054.verdict-matches-numbers')
    })

    it('fails "worse" above the low end of the band', () => {
      const data = fixture()
      const cell = setting(data, '1h', 'rsi14-gt70').coins.BTC
      cell.edge = cell.chance[0] + 0.01
      only(check(data), '054.verdict-matches-numbers')
    })

    it('passes a rounding tie: the edge equal to the band end at two decimals', () => {
      // decided unrounded (e.g. -0.304 below -0.302), both print as -0.30
      const data = fixture()
      const worse = setting(data, '1h', 'rsi14-gt70').coins.BTC
      worse.edge = worse.chance[0]
      const fragile = setting(data, '4h', 'rsi14-gt50').pooled
      fragile.chance = [fragile.chance[0], fragile.edge]
      fragile.band[fragile.band.length - 1] = fragile.chance
      expect(check(data)).to.deep.equal([])
    })

    it('fails "none" outside the band', () => {
      const data = fixture()
      setting(data, '1h', 'rsi14-gt70').coins.SOL.verdict = 'none'
      only(check(data), '054.verdict-matches-numbers')
    })

    it('fails a table value that is not where the chart ends', () => {
      const data = fixture()
      setting(data, '1h', 'rsi7-lt30').pooled.edge = 0.1
      only(check(data), '054.verdict-matches-numbers')
    })
  })

  describe('054.numbers-in-text-match-data', () => {
    const ref = (tf: string, setting: string, scope = 'pooled') => ({
      tf,
      setting,
      scope,
    })
    // the cells the notes below cite: RSI(14) and RSI(7) below 30 on 4h, and
    // RSI(14) above 70 on daily
    const CITED = [
      ref('4h', 'rsi14-lt30'),
      ref('4h', 'rsi7-lt30'),
      ref('1d', 'rsi14-gt70'),
    ]
    const withNote = (note: string, refs: unknown = CITED) => {
      const data = fixture()
      data.notes.push(note)
      data.noteRefs.push(refs)
      return check(data)
    }

    it('checks a number against the cells its refs name, not the whole file', () => {
      const note = 'They were 0.26% behind random entries.'
      expect(withNote(note, [ref('4h', 'rsi14-lt30')])).to.deep.equal([])
      // 0.26 is the 4h RSI(14)-below-30 edge; cited from another cell it fails
      const errors = withNote(note, [ref('1d', 'rsi14-gt70')])
      only(errors, '054.numbers-in-text-match-data')
      expect(errors[0]).to.include('not in the cells its refs name')
    })

    it("reads the file's timeframes as names, not numbers", () => {
      expect(
        withNote('On 1h, 4h and 1d it stayed inside the band.', [
          ref('4h', 'rsi14-lt30'),
        ]),
      ).to.deep.equal([])
      only(
        withNote('On 15m it stayed inside the band.', [
          ref('4h', 'rsi14-lt30'),
        ]),
        '054.numbers-in-text-match-data',
      )
    })

    it('fails a text with numbers but no refs, and passes one without numbers', () => {
      const errors = withNote('They were 0.26% behind random entries.', [])
      only(errors, '054.numbers-in-text-match-data')
      expect(errors[0]).to.include('its refs name no cells')
      expect(withNote('Price kept rising after it.', [])).to.deep.equal([])
    })

    it('reads "*" as every timeframe or setting, and counts method numbers', () => {
      expect(
        withNote('They were 0.26% behind random entries.', [
          ref('*', 'rsi14-lt30'),
        ]),
      ).to.deep.equal([])
      expect(
        withNote('It shows at 10, 20, 50 and 100 candles.', [
          ref('1h', 'rsi14-gt70'),
        ]),
      ).to.deep.equal([])
    })

    it('fails refs that are malformed, name no cell, or do not line up', () => {
      only(
        withNote('Price kept rising.', [ref('4h', 'nope')]),
        '054.numbers-in-text-match-data',
      )
      only(
        withNote('Price kept rising.', [ref('4h', 'rsi14-lt30', 'XRP')]),
        '054.numbers-in-text-match-data',
      )
      const data = fixture()
      data.noteRefs.pop()
      expect(check(data)).to.include(
        'noteRefs: must hold one list of refs per note',
      )
    })

    it('fails a number the data does not hold', () => {
      const errors = withNote('They were 12.34% behind random entries.')
      only(errors, '054.numbers-in-text-match-data')
      expect(errors[0]).to.include('"12.34"')
    })

    it('fails a spelled-out number the data does not hold', () => {
      only(
        withNote('Ninety-seven candles later they were behind.'),
        '054.numbers-in-text-match-data',
      )
    })

    it('fails a ratio that no two counts give', () => {
      only(
        withNote('RSI(7) enters 11.5 times as often.'),
        '054.numbers-in-text-match-data',
      )
    })

    it('fails a price outside a dated sentence', () => {
      only(
        withNote('SOL ran from $4 to $11.'),
        '054.numbers-in-text-match-data',
      )
    })

    it('accepts rounding to the stated precision, counts, dates and labels', () => {
      expect(
        withNote(
          'On daily it was 10.4% worse (1,861 entries, 299 moves) on Nov 7–9, 2022, with RSI(14) on 4h.',
        ),
      ).to.deep.equal([])
    })

    it('reads "about two and a half times" as a ratio of two counts', () => {
      expect(
        withNote('RSI(7) enters about two and a half times as often.'),
      ).to.deep.equal([])
      only(
        withNote('RSI(7) enters about 14.5 times as often.'),
        '054.numbers-in-text-match-data',
      )
    })
  })

  describe('054.dated', () => {
    it('fails missing dates', () => {
      const data = fixture()
      delete data.updatedAt
      delete data.method.from
      const errors = check(data)
      only(errors, '054.dated')
      expect(errors).to.have.length(2)
    })

    it('fails data more than 45 days old at publish', () => {
      const errors = checkEdgeFile(fixture(), {
        slug: 'rsi',
        now: new Date('2026-12-09T00:00:00Z'),
      })
      only(errors, '054.dated')
      expect(errors[0]).to.include('46 days old')
      expect(
        checkEdgeFile(fixture(), {
          slug: 'rsi',
          now: new Date('2026-12-08T00:00:00Z'),
        }),
      ).to.deep.equal([])
    })

    it('fails a window that ends after the update', () => {
      const data = fixture()
      data.method.to = '2026-10-26'
      expect(
        checkEdgeFile(data, { slug: 'rsi', now: new Date('2026-10-27') }),
      ).to.deep.equal(['[054.dated] method.to is after updatedAt'])
    })
  })

  describe('054.style', () => {
    it('fails a banned phrase in the commentary', () => {
      const data = fixture()
      data.verdicts[0].text = 'This robust result holds on 1h.'
      only(check(data), '054.style')
    })

    it('fails a general time-window claim', () => {
      const data = fixture()
      data.summary = 'Over the last 12 months RSI did no better than random.'
      // "12" is also not in the cited cells; the style error is what this pins
      expect(check(data).join('\n')).to.include('[054.style] summary')
    })

    it('fails a date range in a summary', () => {
      const data = fixture()
      data.summary = 'From December 2020 to March 2021 momentum paid.'
      only(check(data), '054.style')
    })
  })
})

describe('indicator edge recipe (spec 054)', () => {
  const recipe = JSON.parse(
    fs.readFileSync(path.join(INDICATORS, 'rsi.edge-recipe.json'), 'utf-8'),
  )

  it('passes the fixture recipe and accepts unknown keys', () => {
    expect(checkEdgeRecipe(recipe, 'rsi')).to.deep.equal([])
    expect(
      checkEdgeRecipe({ ...recipe, engineOnly: { x: 1 } }, 'rsi'),
    ).to.deep.equal([])
  })

  it('accepts a skip with a reason', () => {
    expect(
      checkEdgeRecipe({ indicator: 'rsi', skip: 'draws levels only' }, 'rsi'),
    ).to.deep.equal([])
  })

  it('fails missing required keys', () => {
    expect(checkEdgeRecipe({ indicator: 'rsi' }, 'rsi').join()).to.include(
      'settings',
    )
    expect(checkEdgeRecipe({ settings: [{}] }, 'rsi')).to.deep.equal([
      'indicator: must be "rsi" (the file name)',
      'settings[0]: must be an object with an id',
    ])
  })
})

describe('indicator edge files in a docs directory (spec 054)', () => {
  const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'edge-'))

  it('passes the fixture directory', async () => {
    const { files } = await readMarkdownDir(INDICATORS)
    const result = await checkEdgeDir(INDICATORS, {
      pageSlugs: files.map(({ file }) => file.replace(/\.md$/, '')),
      now: NOW,
    })
    expect(result).to.deep.equal({ errors: [], dataFiles: 1, recipes: 1 })
  })

  it('fails data without a page, invalid JSON, and data for a skipped recipe', async () => {
    const dir = tmp()
    fs.writeFileSync(path.join(dir, 'orphan.edge.json'), '{')
    fs.writeFileSync(
      path.join(dir, 'rsi.edge.json'),
      JSON.stringify(FIXTURE, null, 2),
    )
    fs.writeFileSync(
      path.join(dir, 'rsi.edge-recipe.json'),
      JSON.stringify({ indicator: 'rsi', skip: 'not computable' }),
    )
    const { errors } = await checkEdgeDir(dir, { pageSlugs: ['rsi'], now: NOW })
    fs.rmSync(dir, { recursive: true })
    expect(errors).to.have.length(3)
    expect(errors[0]).to.equal('orphan.edge.json: no page orphan.md beside it')
    expect(errors[1]).to.include('orphan.edge.json: not valid JSON')
    expect(errors[2]).to.include('rsi.edge.json: its recipe says skip')
  })
})

describe('edge, recipe and settings JSON are never pages (spec 054)', () => {
  it('readMarkdownDir — what the loader, listings, search and the template check read — returns .md files only', async () => {
    const all = fs.readdirSync(INDICATORS)
    for (const json of [
      'rsi.edge.json',
      'rsi.edge-recipe.json',
      'rsi.settings.json',
    ])
      expect(all).to.include(json)
    const { files } = await readMarkdownDir(INDICATORS)
    expect(files.map(({ file }) => file)).to.deep.equal(
      all.filter((file) => file.endsWith('.md')).sort(),
    )
  })
})

describe('content loader attaches edge data (spec 054)', () => {
  it('attaches a parsed edge file and leaves out one that is not an object', async () => {
    const docs = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-docs-'))
    fs.cpSync(path.join(__dirname, 'fixtures', 'docs'), docs, {
      recursive: true,
    })
    try {
      fs.writeFileSync(
        path.join(docs, 'indicators', 'native-extra-oscillator.edge.json'),
        '[1, 2]',
      )
      const loader = new ContentLoader()
      await loader.loadFromDirectory(docs)
      expect(loader.getIndicatorBySlug('rsi')?.edge).to.deep.equal(FIXTURE)
      const other = loader.getIndicatorBySlug('native-extra-oscillator')
      expect(other).to.not.equal(undefined)
      expect(other).to.not.have.property('edge')
    } finally {
      fs.rmSync(docs, { recursive: true })
    }
  })
})
