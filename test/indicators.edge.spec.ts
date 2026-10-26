import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  type BotCatalog,
  checkEdgeDir,
  checkEdgeFile,
  checkEdgeRecipe,
  loadBotCatalog,
} from '../src/indicators/edgeCheck'
import { CATALOG_MODULE, ENUM_MODULE } from '../src/indicators/describeNative'
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

  describe('regimes (market-regime split, optional)', () => {
    const cell = (over: object = {}) => ({
      entries: 570,
      episodes: 44,
      draws: 438,
      edge: -8.36,
      chance: [-7.04, 5.33],
      verdict: 'worse',
      robustness: { fragile: false },
      ...over,
    })
    const withRegimes = (up: object, down: object) => {
      const data = fixture()
      data.method.regime = { by: 'pair close vs its 200-day SMA', sma: 200 }
      setting(data, '1d', 'rsi14-gt70').regimes = { up, down }
      return data
    }

    it('passes a file without regimes and one with valid regimes', () => {
      expect(check(fixture())).to.deep.equal([])
      expect(
        check(
          withRegimes(
            cell(),
            cell({ entries: 65, episodes: 17, edge: -0.46, verdict: 'few' }),
          ),
        ),
      ).to.deep.equal([])
    })

    it('holds regime cells to the verdict, few and fragile rules, ties included', () => {
      only(
        check(withRegimes(cell({ edge: 0 }), cell())),
        '054.verdict-matches-numbers',
      )
      only(
        check(withRegimes(cell(), cell({ episodes: 17 }))),
        '054.no-verdict-on-few',
      )
      only(
        check(withRegimes(cell({ robustness: { fragile: true } }), cell())),
        '054.no-unflagged-fragile',
      )
      // a rounding tie at the band's bottom is still "worse"
      expect(check(withRegimes(cell({ edge: -7.04 }), cell()))).to.deep.equal(
        [],
      )
    })

    it('fails a malformed split or method.regime', () => {
      const data = withRegimes(cell(), cell())
      delete setting(data, '1d', 'rsi14-gt70').regimes.down
      expect(check(data).join()).to.include('must hold exactly up and down')
      const bad = withRegimes(cell(), cell())
      bad.method.regime.sma = 0
      expect(check(bad).join()).to.include('method.regime')
    })

    it('checks regime numbers against the up / down cell a ref names', () => {
      const data = withRegimes(
        cell(),
        cell({ entries: 65, episodes: 17, edge: -0.46, verdict: 'few' }),
      )
      const note = (scope: string) => {
        const d = structuredClone(data)
        d.notes.push('In uptrends it was 8.36% worse.')
        d.noteRefs.push([{ tf: '1d', setting: 'rsi14-gt70', scope }])
        return check(d)
      }
      expect(note('up')).to.deep.equal([])
      only(note('down'), '054.numbers-in-text-match-data')
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

// A small catalog in the dashboard's shape: the helpers, shared field lists,
// option lists with spreads, optionsWhen / keyWhen, a derive-only control and
// a multi-select, as indicatorCatalog.ts writes them.
const BOT_ENUM_SOURCE = `
export enum IndicatorEnum { rsi = 'RSI', bb = 'BB', ma = 'MA', ath = 'ATH', pp = 'PP', stoch = 'Stoch', session = 'SESSION', div = 'DIV', wip = 'WIP' }
export enum IndicatorStartConditionEnum { cd = 'cd', cu = 'cu', gt = 'gt', lt = 'lt', bw = 'bw' }
export enum MAEnum { sma = 'sma', ema = 'ema', price = 'price' }
export enum ExchangeIntervals { oneH = '1h', fourH = '4h' }
`
const BOT_CATALOG_SOURCE = `
import { IndicatorEnum, IndicatorStartConditionEnum, MAEnum, ExchangeIntervals } from '..';
import { SESSION_PRESETS } from '@/utils/indicators/sessionWindow';
const makeNumberField = (def) => ({ type: 'number', ...def });
const makeSelectField = (def) => ({ type: 'select', ...def });
const makeBooleanField = (def) => ({ type: 'boolean', ...def });
const makeTimeField = (def) => ({ type: 'time', ...def });
const makeIntervalField = (def) => ({ type: 'interval', ...def, options: def.options ?? INTERVAL_OPTIONS });
const INTERVAL_OPTIONS = [{ value: ExchangeIntervals.oneH, label: '1h' }, { value: ExchangeIntervals.fourH, label: '4h' }];
const INDICATOR_CONDITION_OPTIONS = [
  { value: IndicatorStartConditionEnum.cd, label: 'Crossing down' },
  { value: IndicatorStartConditionEnum.cu, label: 'Crossing up' },
  { value: IndicatorStartConditionEnum.gt, label: 'Greater than' },
  { value: IndicatorStartConditionEnum.lt, label: 'Lower than' },
];
const VALUE_CONDITION_OPTIONS = [...INDICATOR_CONDITION_OPTIONS, { value: IndicatorStartConditionEnum.bw, label: 'Between' }];
const MA_TYPE_OPTIONS = [{ value: MAEnum.sma, label: 'SMA' }, { value: MAEnum.ema, label: 'EMA' }];
const percentileFields = [
  makeBooleanField({ key: 'percentile', label: 'Percentile', defaultValue: false }),
  makeNumberField({ key: 'percentilePercentage', label: 'Threshold', defaultValue: 80 }),
];
const conditionField = makeSelectField({
  key: 'indicatorCondition', label: 'Condition', defaultValue: IndicatorStartConditionEnum.cd, options: VALUE_CONDITION_OPTIONS,
  optionsWhen: [{ field: 'percentile', equals: true, options: INDICATOR_CONDITION_OPTIONS }],
});
const BASE_INDICATOR_CATALOG: Record<IndicatorEnum, IndicatorDefinition> = {
  [IndicatorEnum.rsi]: {
    type: IndicatorEnum.rsi,
    fields: [
      ...percentileFields,
      makeNumberField({ key: 'indicatorLength', label: 'Length', defaultValue: 7 }),
      makeIntervalField({ key: 'indicatorInterval', label: 'Interval', defaultValue: ExchangeIntervals.oneH }),
      makeBooleanField({ key: 'smoothingEnabled', label: 'Smoothing', derive: { get: (p) => 'false', set: (v) => ({}) } }),
      conditionField,
      makeNumberField({ key: 'indicatorValue', label: 'Value', defaultValue: 70 }),
      makeNumberField({ key: 'indicatorValue2', label: 'Upper value' }),
    ],
  },
  [IndicatorEnum.bb]: {
    type: IndicatorEnum.bb,
    fields: [
      makeNumberField({ key: 'bbwMult', label: 'Standard Deviations', defaultValue: 2 }),
      makeSelectField({ key: 'indicatorCondition', label: 'Condition', defaultValue: 'cu', options: INDICATOR_CONDITION_OPTIONS }),
      makeSelectField({ key: 'bbCrossingValue', label: 'Value', defaultValue: 'lower', options: [{ value: 'lower', label: 'Lower' }, { value: 'upper', label: 'Upper' }] }),
    ],
  },
  [IndicatorEnum.ma]: {
    type: IndicatorEnum.ma,
    fields: [
      makeSelectField({ key: 'maType', label: 'Moving average', defaultValue: MAEnum.ema, options: MA_TYPE_OPTIONS }),
      makeSelectField({ key: 'indicatorCondition', label: 'Condition', defaultValue: 'cd', options: INDICATOR_CONDITION_OPTIONS }),
      makeSelectField({ key: 'maCrossingValue', label: 'Compared to', defaultValue: MAEnum.price, options: [{ value: MAEnum.price, label: 'Current price' }, ...MA_TYPE_OPTIONS] }),
      makeIntervalField({ key: 'maCrossingInterval', label: 'Comparison interval', defaultValue: ExchangeIntervals.oneH }),
    ],
  },
  [IndicatorEnum.ath]: {
    type: IndicatorEnum.ath,
    fields: [
      makeSelectField({ key: 'indicatorCondition', label: 'Condition', defaultValue: 'cd', options: VALUE_CONDITION_OPTIONS }),
      makeNumberField({ key: 'indicatorValue', label: 'Value', defaultValue: 10 }),
      makeNumberField({ key: 'indicatorValue2', label: 'Upper value' }),
    ],
  },
  [IndicatorEnum.pp]: {
    type: IndicatorEnum.pp,
    fields: [
      makeSelectField({ key: 'ppType', label: 'Type', defaultValue: 'Price Based', options: [{ value: 'Event Based', label: 'Event' }, { value: 'Price Based', label: 'Price' }] }),
      makeSelectField({
        key: 'ppValue', label: 'Value', defaultValue: 'Any Low', options: [{ value: 'Any Low', label: 'Any Low' }],
        optionsWhen: [{ field: 'ppType', equals: 'Event Based', options: [{ value: 'IBullBoS', label: 'Internal Bullish BoS' }] }],
      }),
    ],
  },
  [IndicatorEnum.stoch]: {
    type: IndicatorEnum.stoch,
    fields: [
      makeSelectField({ key: 'rsiValue2', label: 'Second Variable', defaultValue: 'd', options: [{ value: 'd', label: 'D' }, { value: 'custom', label: 'Custom' }] }),
      makeNumberField({ key: 'valueInsteadof', label: 'Enter Value', defaultValue: 1 }),
      makeSelectField({ key: 'indicatorCondition', label: 'Condition', defaultValue: 'cd', options: INDICATOR_CONDITION_OPTIONS }),
      makeNumberField({ key: 'stochLower', label: 'Lower band', defaultValue: '20', keyWhen: ['lower'].map((equals) => ({ field: 'stochRange', equals, key: 'stochUpper', defaultValue: '20' })) }),
    ],
  },
  [IndicatorEnum.session]: {
    type: IndicatorEnum.session,
    fields: [
      makeSelectField({ key: 'sessionPreset', label: 'Session', options: [...SESSION_PRESETS], derive: { get: resolvePreset, set: presetParams } }),
      makeTimeField({ key: 'sessionStart', label: 'Start' }),
      makeSelectField({ key: 'sessionTimezone', label: 'Time zone', defaultValue: 'UTC', options: [...SESSION_PRESETS, { value: 'UTC', label: 'UTC' }] }),
      makeSelectField({ key: 'sessionDays', label: 'Days', multiple: true, defaultValue: [1, 2], options: [{ value: 1, label: 'Mon' }, { value: 2, label: 'Tue' }] }),
    ],
  },
  [IndicatorEnum.div]: {
    type: IndicatorEnum.div,
    fields: [
      makeSelectField({ key: 'divOscillators', label: 'Oscillators', defaultValue: ['RSI'].map((v) => v), options: [{ value: 'RSI', label: 'RSI' }, { value: 'MFI', label: 'MFI' }] }),
    ],
  },
  [IndicatorEnum.wip]: { type: IndicatorEnum.wip, pendingPort: true, fields: [makeNumberField({ key: 'x', label: 'X' })] },
};
`
const botReader = {
  read: async (module: string) => {
    if (module === CATALOG_MODULE) return BOT_CATALOG_SOURCE
    if (module === ENUM_MODULE) return BOT_ENUM_SOURCE
    throw new Error(`not served: ${module}`)
  },
}

describe('indicator edge recipe bot-form configs (spec 054)', () => {
  let catalog: BotCatalog
  before(async () => {
    catalog = await loadBotCatalog(botReader)
  })
  /** One setting: its tested condition and its bot. */
  const one = (condition: unknown, bot: unknown, extra: object = {}) => ({
    indicator: 'x',
    settings: [{ id: 's', condition, bot, ...extra }],
  })
  const errorsOf = (condition: unknown, bot: unknown, extra?: object) =>
    checkEdgeRecipe(one(condition, bot, extra), 'x', catalog)
  const lt30 = { op: 'lt', against: 30 }
  const rsi = (params: object) => ({ type: 'RSI', params })

  it('reads the catalog statically: fields, keyWhen keys, stored controls, static options', () => {
    const rsiType = catalog.get('RSI')
    expect(rsiType?.fields.get('indicatorInterval')?.type).to.equal('interval')
    expect(rsiType?.fields.get('smoothingEnabled')?.stored).to.equal(false)
    expect(rsiType?.fields.get('indicatorCondition')?.options).to.deep.equal([
      'cd',
      'cu',
      'gt',
      'lt',
      'bw',
    ])
    expect(catalog.get('Stoch')?.fields.get('stochUpper')?.key).to.equal(
      'stochUpper',
    )
    // a list spread from an import is not static: not checked
    expect(
      catalog.get('SESSION')?.fields.get('sessionTimezone')?.options,
    ).to.equal(undefined)
    expect(catalog.get('DIV')?.fields.get('divOscillators')?.multiple).to.equal(
      true,
    )
    expect(catalog.get('WIP')?.pendingPort).to.equal(true)
  })

  it('passes the fixture recipe and valid configs of every kind', () => {
    const recipe = JSON.parse(
      fs.readFileSync(path.join(INDICATORS, 'rsi.edge-recipe.json'), 'utf-8'),
    )
    expect(checkEdgeRecipe(recipe, 'rsi', catalog)).to.deep.equal([])
    expect(
      errorsOf(
        lt30,
        rsi({
          indicatorLength: 14,
          indicatorCondition: 'lt',
          indicatorValue: 30,
        }),
      ),
    ).to.deep.equal([])
    expect(
      errorsOf(lt30, null, { botWhyNot: 'two tests in one' }),
    ).to.deep.equal([])
    expect(
      errorsOf(
        { op: 'gt', against: { output: 'percentile' } },
        rsi({
          indicatorCondition: 'gt',
          percentile: true,
          percentilePercentage: 90,
        }),
      ),
    ).to.deep.equal([])
    expect(
      errorsOf(
        { op: 'true' },
        { type: 'PP', params: { ppType: 'Event Based', ppValue: 'IBullBoS' } },
      ),
    ).to.deep.equal([])
    expect(
      errorsOf(
        { op: 'fn', fn: 'x', options: {} },
        {
          type: 'SESSION',
          params: {
            sessionStart: '08:00',
            sessionTimezone: 'Europe/London',
            sessionDays: [1],
          },
        },
      ),
    ).to.deep.equal([])
    expect(
      errorsOf(
        { op: 'gte', against: 1 },
        { type: 'DIV', params: { divOscillators: ['RSI', 'MFI'] } },
      ),
    ).to.deep.equal([])
  })

  it('requires bot on every setting, and a reason with null', () => {
    expect(
      checkEdgeRecipe({ indicator: 'x', settings: [{ id: 's' }] }, 'x').join(),
    ).to.include('bot is required')
    expect(errorsOf(lt30, null).join()).to.include('botWhyNot: required')
    expect(
      errorsOf(lt30, rsi({ indicatorCondition: 'lt', indicatorValue: 30 }), {
        botWhyNot: 'x',
      }).join(),
    ).to.include('only with "bot": null')
    expect(errorsOf(lt30, { type: 'RSI' }).join()).to.include(
      'must be { type, params } or null',
    )
    expect(
      errorsOf(lt30, {
        ...rsi({ indicatorCondition: 'lt', indicatorValue: 30 }),
        tf: '1h',
      }).join(),
    ).to.include('bot.tf: unknown key')
  })

  it('fails a type the catalog does not have or cannot build', () => {
    expect(errorsOf(lt30, { type: 'RSX', params: {} }).join()).to.include(
      '"RSX" is not in the indicator catalog',
    )
    expect(
      errorsOf({ op: 'true' }, { type: 'WIP', params: {} }).join(),
    ).to.include('pendingPort')
  })

  it('fails keys the type does not store: unknown, interval, derive-only', () => {
    const errors = errorsOf(
      lt30,
      rsi({
        indicatorCondition: 'lt',
        indicatorValue: 30,
        macdFast: 12,
        indicatorInterval: '4h',
        smoothingEnabled: true,
      }),
    )
    expect(errors).to.have.length(3)
    expect(errors[0]).to.include('macdFast: not a field of RSI')
    expect(errors[1]).to.include(
      'indicatorInterval: an interval; the dashboard sets it',
    )
    expect(errors[2]).to.include(
      'smoothingEnabled: a control that stores nothing',
    )
    expect(
      errorsOf(
        { op: 'crossUp', against: { indicator: {} } },
        {
          type: 'MA',
          params: {
            indicatorCondition: 'cu',
            maCrossingValue: 'sma',
            maCrossingInterval: '4h',
          },
        },
      ).join(),
    ).to.include('maCrossingInterval: an interval')
  })

  it('fails values of the wrong kind or outside the options', () => {
    const errors = errorsOf(
      lt30,
      rsi({
        indicatorCondition: 'lt',
        indicatorValue: '30',
        percentile: 'no',
        indicatorLength: 14,
      }),
    )
    expect(errors.join('\n')).to.include(
      'indicatorValue: must be a number, got "30"',
    )
    expect(errors.join('\n')).to.include('percentile: must be true or false')
    expect(
      errorsOf(
        lt30,
        rsi({ indicatorCondition: 'below', indicatorValue: 30 }),
      ).join(),
    ).to.include('"below" is not an option (cd, cu, gt, lt, bw)')
    expect(
      errorsOf(
        { op: 'fn', fn: 'x', options: {} },
        { type: 'SESSION', params: { sessionStart: '8:00', sessionDays: 1 } },
      ).join('\n'),
    )
      .to.include('sessionStart: must be a time HH:MM')
      .and.include('sessionDays: must be a list of options')
    expect(
      errorsOf(
        { op: 'gte', against: 1 },
        { type: 'DIV', params: { divOscillators: ['RSI', 'WR'] } },
      ).join(),
    ).to.include('"WR" is not an option')
  })

  it("reads optionsWhen from the params, or the controlling field's default", () => {
    // ppType defaults to price, whose list has no event values
    expect(
      errorsOf(
        { op: 'true' },
        { type: 'PP', params: { ppValue: 'IBullBoS' } },
      ).join(),
    ).to.include('"IBullBoS" is not an option (Any Low)')
    // percentile on: no Between
    expect(
      errorsOf(
        { op: 'between', against: [30, 70] },
        rsi({
          percentile: true,
          indicatorCondition: 'bw',
          indicatorValue: 30,
          indicatorValue2: 70,
        }),
      ).join(),
    ).to.include('"bw" is not an option (cd, cu, gt, lt)')
  })

  it('holds a single comparison to indicatorCondition and indicatorValue', () => {
    expect(
      errorsOf(
        lt30,
        rsi({ indicatorCondition: 'gt', indicatorValue: 30 }),
      ).join(),
    ).to.include('the tested condition is lt, i.e. "lt"')
    expect(
      errorsOf(
        { op: 'crossUp', against: 30 },
        rsi({ indicatorValue: 30 }),
      ).join(),
    ).to.include('indicatorCondition: undefined')
    expect(
      errorsOf(
        lt30,
        rsi({ indicatorCondition: 'lt', indicatorValue: 31 }),
      ).join(),
    ).to.include('indicatorValue: 31, but the tested level is 30')
    expect(
      errorsOf(
        { op: 'between', against: [30, 70] },
        rsi({
          indicatorCondition: 'bw',
          indicatorValue: 70,
          indicatorValue2: 30,
        }),
      ),
    ).to.deep.equal([])
    expect(
      errorsOf(
        { op: 'between', against: [30, 70] },
        rsi({
          indicatorCondition: 'bw',
          indicatorValue: 30,
          indicatorValue2: 60,
        }),
      ).join(),
    ).to.include('the tested range is [30, 70]')
    expect(
      errorsOf(
        { op: 'lt', against: { output: 'percentile' } },
        rsi({ indicatorCondition: 'lt' }),
      ).join(),
    ).to.include('percentile: must be true')
    // a compound is the engine's to describe: not compared
    expect(
      errorsOf(
        { all: [lt30, { op: 'gt', against: 10 }] },
        rsi({ indicatorCondition: 'cu' }),
      ),
    ).to.deep.equal([])
  })

  it("flips a condition against the close to price's side, except for an MA", () => {
    // "the lower band crosses down the close" is "Price crossing up" the band
    const bb = (indicatorCondition: string) => ({
      type: 'BB',
      params: { indicatorCondition, bbCrossingValue: 'lower' },
    })
    expect(
      errorsOf({ op: 'crossDown', against: 'close' }, bb('cu')),
    ).to.deep.equal([])
    expect(
      errorsOf({ op: 'crossDown', against: 'close' }, bb('cd')).join(),
    ).to.include('(crossUp from price\'s side), i.e. "cu"')
    expect(errorsOf({ op: 'gt', against: 'close' }, bb('lt'))).to.deep.equal([])
    const ma = (indicatorCondition: string) => ({
      type: 'MA',
      params: { indicatorCondition, maCrossingValue: 'price' },
    })
    expect(
      errorsOf({ op: 'crossDown', against: 'close' }, ma('cd')),
    ).to.deep.equal([])
    expect(
      errorsOf({ op: 'crossDown', against: 'close' }, ma('cu')).join(),
    ).to.include('i.e. "cd"')
  })

  it('reads the drawdown level as -|Value| and a Stochastic custom line as valueInsteadof', () => {
    const ath = (params: object) => ({ type: 'ATH', params })
    expect(
      errorsOf(
        { op: 'lt', against: -10 },
        ath({ indicatorCondition: 'lt', indicatorValue: 10 }),
      ),
    ).to.deep.equal([])
    expect(
      errorsOf(
        { op: 'between', against: [-20, -10] },
        ath({
          indicatorCondition: 'bw',
          indicatorValue: 10,
          indicatorValue2: 20,
        }),
      ),
    ).to.deep.equal([])
    expect(
      errorsOf(
        { op: 'lt', against: -10 },
        ath({ indicatorCondition: 'lt', indicatorValue: 20 }),
      ).join(),
    ).to.include('-|indicatorValue|')
    const stoch = (valueInsteadof: number) => ({
      type: 'Stoch',
      params: { indicatorCondition: 'lt', rsiValue2: 'custom', valueInsteadof },
    })
    expect(errorsOf({ op: 'lt', against: 20 }, stoch(20))).to.deep.equal([])
    expect(errorsOf({ op: 'lt', against: 20 }, stoch(25)).join()).to.include(
      'valueInsteadof: 25, but the tested level is 20',
    )
  })

  it('holds a library-helper condition to its options.condition', () => {
    expect(
      errorsOf(
        { op: 'fn', fn: 'x', options: { condition: 'cd' } },
        { type: 'BB', params: { indicatorCondition: 'cu' } },
      ).join(),
    ).to.include('the tested condition is "cd"')
  })

  it('fails the directory check on a bot the catalog rejects', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-bot-'))
    fs.writeFileSync(
      path.join(dir, 'rsi.edge-recipe.json'),
      JSON.stringify(
        one(
          lt30,
          rsi({ indicatorCondition: 'lt', indicatorValue: 30, nope: 1 }),
        ),
        null,
        2,
      ).replace('"x"', '"rsi"'),
    )
    const { errors } = await checkEdgeDir(dir, {
      pageSlugs: ['rsi'],
      now: NOW,
      catalog,
    })
    fs.rmSync(dir, { recursive: true })
    expect(errors).to.deep.equal([
      'rsi.edge-recipe.json: settings[0] (s).bot.params.nope: not a field of RSI',
    ])
  })

  it('throws when the catalog cannot be read', async () => {
    let failed: unknown
    await loadBotCatalog({ read: async () => 'const nothing = {}' }).catch(
      (e) => (failed = e),
    )
    expect(String(failed)).to.include(
      'BASE_INDICATOR_CATALOG could not be evaluated',
    )
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
