import { describe, it, before, after } from 'mocha'
import { expect } from 'chai'
import fs from 'fs'
import path from 'path'
import { AddressInfo } from 'net'
import { Server } from 'http'
import { contentLoader } from '../src/contentLoader'
import { createServer } from '../src/server'
import {
  checkRecipe,
  checkResultsFile,
  checkStrategiesDir,
  checkStrategyBody,
  verdictOf,
} from '../src/strategies/resultsCheck'

/**
 * Strategy library (main-app spec 061 §5). Fixtures: `alpha` beats random
 * entries in both periods, `beta` (a hold baseline) trails holding in both,
 * `gamma` has a recipe but no results yet, `delta` has no recipe and must
 * never be served.
 */
const FIXTURES = path.join(__dirname, 'fixtures', 'docs')
const DIR = path.join(FIXTURES, 'strategies')
const readJson = (f: string) =>
  JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf-8'))
const NOW = Date.parse('2026-10-29')
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x))

let server: Server
let baseUrl: string
let previousLogLevel: string | undefined

const get = async (route: string) => {
  const response = await fetch(`${baseUrl}${route}`)
  return { status: response.status, json: (await response.json()) as any }
}

describe('strategy content API (spec 061 §5)', () => {
  before(async () => {
    previousLogLevel = process.env.LOG_LEVEL
    process.env.LOG_LEVEL = 'error'
    await contentLoader.loadFromDirectory(FIXTURES)
    server = createServer().listen(0)
    await new Promise((resolve) => server.once('listening', resolve))
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`
  })

  after(async () => {
    await new Promise((resolve) => server.close(resolve))
    if (previousLogLevel === undefined) delete process.env.LOG_LEVEL
    else process.env.LOG_LEVEL = previousLogLevel
  })

  it('GET /strategies lists the pages with a recipe, never one without', async () => {
    const { status, json } = await get('/strategies')
    expect(status).to.equal(200)
    expect(json.data.map((d: any) => d.slug)).to.deep.equal([
      'alpha',
      'beta',
      'gamma',
    ])
    const beta = json.data.find((d: any) => d.slug === 'beta')
    expect(beta).to.include({ rules: 3, hasResults: true })
    expect(beta.tags).to.deep.equal(['grid'])
    expect(json.data.find((d: any) => d.slug === 'gamma').hasResults).to.equal(
      false,
    )
  })

  it('GET /strategies/ranking ranks by verdict, then the out-of-sample excess', async () => {
    const { json } = await get('/strategies/ranking')
    expect(json.data.map((d: any) => d.slug)).to.deep.equal(['alpha', 'beta'])
    const [alpha, beta] = json.data
    expect(alpha).to.include({
      verdict: 'beats',
      baseline: 'random',
      excess: 40,
      rules: 2,
    })
    expect(alpha.outOfSample).to.deep.include({
      return: 50,
      baselineReturn: 10,
      band: [-5, 30],
      state: 'above',
    })
    expect(beta.outOfSample).to.include({ baselineReturn: 40 })
    expect(beta.outOfSample).not.to.have.property('band')
  })

  it('GET /strategies/:slug serves the page, its recipe and its results', async () => {
    const { status, json } = await get('/strategies/alpha')
    expect(status).to.equal(200)
    expect(json.metadata.name).to.equal('Alpha Breakout')
    expect(json.recipe.rules).to.have.length(2)
    expect(json.results.verdict).to.equal('beats')
    const gamma = await get('/strategies/gamma')
    expect(gamma.json).not.to.have.property('results')
  })

  it('404s a page without a recipe and an unknown slug', async () => {
    expect((await get('/strategies/delta')).status).to.equal(404)
    expect((await get('/strategies/nope')).status).to.equal(404)
  })
})

describe('strategy checks (spec 061 invariants)', () => {
  const alpha = readJson('alpha.results.json')
  const alphaRecipe = readJson('alpha.recipe.json')
  const check = (data: any, recipe = alphaRecipe) =>
    checkResultsFile(data, { slug: 'alpha', recipe, now: NOW })

  it('the fixtures pass', () => {
    expect(check(alpha)).to.deep.equal([])
    expect(
      checkResultsFile(readJson('beta.results.json'), {
        slug: 'beta',
        recipe: readJson('beta.recipe.json'),
        now: NOW,
      }),
    ).to.deep.equal([])
  })

  it('061.verdict-needs-oos: in-sample alone never makes a verdict', () => {
    // above the band in-sample only: mixed at best, never beats
    expect(verdictOf('above', 'inside')).to.equal('inside')
    expect(verdictOf('above', 'few')).to.equal('few')
    expect(verdictOf('inside', 'above')).to.equal('mixed')
    expect(verdictOf('above', 'above', false)).to.equal('few')

    const inSampleOnly = clone(alpha)
    inSampleOnly.periods.outOfSample.strategy.return = 20
    inSampleOnly.periods.outOfSample.state = 'inside'
    inSampleOnly.excess = 10
    expect(check(inSampleOnly).join()).to.include('061.verdict-needs-oos')

    const noOos = clone(alpha)
    delete noOos.periods.outOfSample
    expect(check(noOos).join()).to.include('061.verdict-needs-oos')

    const overlap = clone(alpha)
    overlap.periods.inSample.to = '2024-06-30'
    expect(check(overlap).join()).to.include('061.verdict-needs-oos')

    const short = clone(alpha)
    short.method.minOosDays = 5000
    expect(check(short).join()).to.include('061.verdict-needs-oos')
  })

  it('061.state-matches-numbers: a state that contradicts the band fails', () => {
    const bad = clone(alpha)
    bad.periods.outOfSample.strategy.return = 25 // inside [-5, 30]
    bad.excess = 15
    expect(check(bad).join()).to.include('061.state-matches-numbers')
    const few = clone(alpha)
    few.periods.outOfSample.strategy.trades = 12
    expect(check(few).join()).to.include('061.state-matches-numbers')
  })

  it('061.random-like-for-like: a random bot that trades far less is no baseline', () => {
    const thin = clone(alpha)
    thin.periods.outOfSample.random.medianTrades = 30
    expect(check(thin).join()).to.include('061.random-like-for-like')
    // entering at every chance and still trading less is like for like
    thin.periods.outOfSample.random.saturated = true
    expect(check(thin).join()).not.to.include('061.random-like-for-like')
  })

  it('a recipe’s discussion link must be a forum thread', () => {
    const ok = 'https://community.gainium.io/t/1320'
    expect(
      checkRecipe({ ...alphaRecipe, discussion: ok }, 'alpha'),
    ).to.deep.equal([])
    expect(
      checkRecipe(
        { ...alphaRecipe, discussion: 'https://example.com/t/1' },
        'alpha',
      ).join(),
    ).to.include('discussion')
  })

  it('061.dated: stale data fails', () => {
    expect(
      checkResultsFile(alpha, {
        slug: 'alpha',
        recipe: alphaRecipe,
        now: Date.parse('2027-03-01'),
      }).join(),
    ).to.include('061.dated')
  })

  it('the results must be the recipe’s: baseline and out-of-sample start', () => {
    expect(
      check(alpha, { ...alphaRecipe, baseline: 'hold' }).join(),
    ).to.include('baseline')
    expect(
      check(alpha, { ...alphaRecipe, oosFrom: '2025-01-01' }).join(),
    ).to.include('oosFrom')
  })

  it('061.oos-after-tuning: a tuned recipe tests only after its rules were fixed', () => {
    expect(
      checkRecipe({ ...alphaRecipe, tuned: true }, 'alpha').join(),
    ).to.include('061.oos-after-tuning')
    expect(
      checkRecipe(
        { ...alphaRecipe, tuned: true, oosFrom: '2026-01-01' },
        'alpha',
      ),
    ).to.deep.equal([])
  })

  it('061.strategy-numbers-from-results: results in the prose fail, rule parameters do not', () => {
    for (const bad of [
      'It returned 45% on BTC.',
      'Expect a 12% drawdown.',
      'The win rate was 60 %.',
      'It beat holding by 20%.',
    ])
      expect(checkStrategyBody(bad), bad).to.have.length(1)
    for (const fine of [
      'Buy when price cracks 3% below the base.',
      'Set the take profit to 3%.',
      'The take profit sells the whole position 3% above its average.',
      'Use 1% spacing in the bottom third.',
    ])
      expect(checkStrategyBody(fine), fine).to.deep.equal([])
  })

  it('the fixture directory: a page without a recipe fails CI', async () => {
    const errs = await checkStrategiesDir(DIR, NOW)
    expect(errs).to.deep.equal(['delta.md: delta.recipe.json is required'])
  })
})
