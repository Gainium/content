import { describe, it } from 'mocha'
import { expect } from 'chai'
import fs from 'fs'
import path from 'path'
import {
  CATALOG_MODULE,
  ENUM_MODULE,
  catalogKeyForSlug,
  describeNative,
  type ModuleReader,
} from '../src/indicators/describeNative'
import {
  checkSettingsTable,
  defaultText,
  parseSettingsTable,
  renderSettingsTable,
  type IndicatorSettings,
} from '../src/indicators/settingsTable'
import {
  checkIndicatorTemplates,
  TemplatePageInput,
} from '../src/indicators/templateCheck'

// ── A miniature dashboard catalog, in the forms the real one uses ──────────

const FIXTURE: Record<string, string> = {
  [ENUM_MODULE]: `
export enum IndicatorEnum {
  rsi = 'RSI',
  st = 'ST',
}
export enum IndicatorStartConditionEnum { cd = 'cd', cu = 'cu', bw = 'bw' }
export enum ExchangeIntervals { oneH = '1h', fourH = '4h' }
export enum STConditionEnum { up = 'up', down = 'down' }
`,
  'utils/indicators/smoothing.ts': `
export const SMOOTHING_TYPES: readonly string[] = ['sma', 'ema'];
export const DEFAULT_SMOOTHING_LENGTH = 14;
`,
  [CATALOG_MODULE]: `
import { IndicatorEnum, IndicatorStartConditionEnum, ExchangeIntervals, STConditionEnum } from '..';
import { DEFAULT_SMOOTHING_LENGTH, SMOOTHING_TYPES } from '@/utils/indicators/smoothing';

const makeNumberField = (def: Omit<IndicatorFieldDefinition, 'type'>): IndicatorFieldDefinition => ({ type: 'number', ...def });
const makeSelectField = (def: Omit<IndicatorFieldDefinition, 'type'>): IndicatorFieldDefinition => ({ type: 'select', ...def });
const makeBooleanField = (def: Omit<IndicatorFieldDefinition, 'type'>): IndicatorFieldDefinition => ({ type: 'boolean', ...def });
const makeIntervalField = (def: Omit<IndicatorFieldDefinition, 'type'>): IndicatorFieldDefinition => ({
  type: 'interval',
  ...def,
  options: def.options ?? INTERVAL_OPTIONS,
});

const INTERVAL_OPTIONS = [
  { value: ExchangeIntervals.oneH, label: '1 hour' },
  { value: ExchangeIntervals.fourH, label: '4 hours' },
];
const MA = [
  { value: 'sma', label: 'SMA' },
  { value: 'ema', label: 'EMA' },
  { value: 'wma', label: 'WMA' },
];
const SMOOTHING_OPTIONS = [
  { value: 'none', label: 'None' },
  ...MA.filter((option) => (SMOOTHING_TYPES as readonly string[]).includes(option.value)),
];
const percentileFields: IndicatorDefinition['fields'] = [
  makeBooleanField({ key: 'percentile', label: 'Use percentile', defaultValue: false, tooltip: 'Enable percentile mode.' }),
];
const keepConditionBarsField = makeNumberField({ key: 'keepConditionBars', label: 'Keep true', defaultValue: 0, min: 0 });

export const INDICATOR_DOCUMENTATION_URLS = {
  [IndicatorEnum.rsi]: '/help/rsi',
  [IndicatorEnum.st]: '/help/supertrend',
};

const BASE_INDICATOR_CATALOG: Record<IndicatorEnum, IndicatorDefinition> = {
  [IndicatorEnum.rsi]: {
    type: IndicatorEnum.rsi,
    label: 'Relative Strength Index (RSI)',
    shortLabel: 'RSI',
    fields: [
      ...percentileFields,
      makeNumberField({ key: 'indicatorLength', label: 'Length', defaultValue: 7, min: 1, max: 1000, step: 1 }),
      makeIntervalField({ key: 'indicatorInterval', label: 'Interval', defaultValue: ExchangeIntervals.oneH }),
      makeSelectField({ key: 'smoothing', label: 'Smoothing', defaultValue: 'none', options: SMOOTHING_OPTIONS, summary: (p) => null }),
      makeNumberField({ key: 'smoothingLength', label: 'Smoothing length', defaultValue: DEFAULT_SMOOTHING_LENGTH }),
      makeSelectField({
        key: 'indicatorCondition',
        label: 'Condition',
        defaultValue: IndicatorStartConditionEnum.cd,
        options: [
          { value: IndicatorStartConditionEnum.cd, label: 'Crossing down' },
          { value: IndicatorStartConditionEnum.cu, label: 'Crossing up' },
        ],
      }),
      makeNumberField({ key: 'indicatorValue2', label: 'Upper value', min: 0, max: 100, shownWhen: [{ field: 'indicatorCondition', equals: IndicatorStartConditionEnum.bw }] }),
      keepConditionBarsField,
    ],
  },
  [IndicatorEnum.st]: {
    type: IndicatorEnum.st,
    label: 'SuperTrend',
    shortLabel: 'SuperTrend',
    fields: [
      makeNumberField({ key: 'factor', label: 'Multiplier', defaultValue: 3, step: 1 }),
      makeNumberField({ key: 'atrLength', label: 'ATR Length', defaultValue: 10, min: 1, max: 200 }),
      makeSelectField({ key: 'stCondition', label: 'Condition', defaultValue: STConditionEnum.up, options: [{ value: STConditionEnum.up, label: 'Up trend' }, { value: STConditionEnum.down, label: 'Down trend' }] }),
    ],
  },
}
`,
}

const fixtureReader: ModuleReader = {
  read: async (rel) => {
    if (!(rel in FIXTURE)) throw new Error(`fixture has no ${rel}`)
    return FIXTURE[rel]
  },
}

describe('describe-native: the catalog → describe JSON (spec 053 §2.1)', () => {
  it('evaluates helpers, spreads, enum members, imported consts and filtered option lists statically', async () => {
    const d = await describeNative(fixtureReader, 'rsi')
    expect(d.schema).to.equal('gainium.indicator-settings/1')
    expect(d.source).to.equal('gainium-catalog')
    expect(d.indicator).to.include({
      kind: 'native',
      title: 'Relative Strength Index (RSI)',
      shortTitle: 'RSI',
      scriptId: 'RSI',
    })
    expect(d.inputs.map((i) => [i.id, i.type, i.defaultText])).to.deep.equal([
      ['percentile', 'boolean', 'Off'],
      ['indicatorLength', 'number', '7'],
      ['indicatorInterval', 'interval', '1 hour'],
      ['smoothing', 'select', 'None'],
      ['smoothingLength', 'number', '14'],
      ['indicatorCondition', 'select', 'Crossing down'],
      ['indicatorValue2', 'number', '—'],
      ['keepConditionBars', 'number', '0'],
    ])
    const smoothing = d.inputs.find((i) => i.id === 'smoothing')
    expect(smoothing?.optionLabels).to.deep.equal(
      ['None', 'SMA', 'EMA'],
      'the filter over SMOOTHING_TYPES was applied',
    )
    expect(
      d.inputs.find((i) => i.id === 'indicatorValue2')?.shownWhen,
    ).to.deep.equal([{ field: 'indicatorCondition', equals: 'bw' }])
    expect(d.inputs.find((i) => i.id === 'indicatorLength')).to.include({
      min: 1,
      max: 1000,
      step: 1,
    })
    expect(d.alertConditions).to.equal('not applicable')
    expect(d.notes).to.deep.equal([])
  })

  it('resolves a page slug through INDICATOR_DOCUMENTATION_URLS, or takes an IndicatorEnum key', async () => {
    expect(await catalogKeyForSlug(fixtureReader, 'supertrend')).to.equal('st')
    expect(await catalogKeyForSlug(fixtureReader, 'rsi')).to.equal('rsi')
    expect(await catalogKeyForSlug(fixtureReader, 'nope')).to.equal(null)
    const st = await describeNative(fixtureReader, 'st')
    expect(st.inputs.map((i) => `${i.label}=${i.defaultText}`)).to.deep.equal([
      'Multiplier=3',
      'ATR Length=10',
      'Condition=Up trend',
    ])
  })

  // Set INDICATOR_CATALOG_SRC to a dashboard core/src checkout to run this.
  const LOCAL = process.env.INDICATOR_CATALOG_SRC || ''
  it('reads the real dashboard catalog when it is on this host', async function () {
    if (!LOCAL || !fs.existsSync(path.join(LOCAL, CATALOG_MODULE))) this.skip()
    const reader: ModuleReader = {
      read: async (rel) => fs.promises.readFile(path.join(LOCAL, rel), 'utf-8'),
    }
    const st = await describeNative(
      reader,
      (await catalogKeyForSlug(reader, 'supertrend')) as string,
    )
    expect(st.inputs.find((i) => i.id === 'factor')?.defaultText).to.equal('3')
    expect(st.notes).to.deep.equal([])
  })
})

// ── The table ─────────────────────────────────────────────────────────────

const SETTINGS: IndicatorSettings = {
  schema: 'gainium.indicator-settings/1',
  source: 'tradingview',
  indicator: {
    kind: 'community',
    title: 'Example',
    shortTitle: null,
    author: 'someone',
    scriptId: 'PUB;x',
    version: '1',
    overlay: true,
    openSource: 'not exposed',
  },
  chart: { symbol: 'BINANCE:BTCUSDT', interval: '240' },
  inputs: [
    {
      id: 'in_0',
      label: 'Length',
      group: null,
      type: 'integer',
      default: 14,
      defaultText: '14',
      kind: 'logic',
      tooltip: 'Bars in the average',
    },
    {
      id: 'in_1',
      label: 'Multiplier',
      group: 'Bands',
      type: 'float',
      default: 2,
      defaultText: '2',
      kind: 'logic',
    },
    {
      id: 'in_2',
      label: 'Show labels',
      group: 'Bands',
      type: 'bool',
      default: true,
      defaultText: 'On',
      kind: 'display',
    },
  ],
  plots: [],
  alertConditions: [],
  notes: [],
}

const TABLE = `| Setting | Default | What it does |
| --- | --- | --- |
| Length | 14 | Bars in the average. |
| **Bands** | | |
| Multiplier | 2 | How many deviations wide the bands are. |
`

describe('settings table vs the describe JSON', () => {
  it('renders logic inputs grouped, Default from defaultText; parses back', () => {
    expect(renderSettingsTable(SETTINGS)).to.equal(
      '| Setting | Default | What it does |\n| --- | --- | --- |\n| Length | 14 | Bars in the average |\n| **Bands** | | |\n| Multiplier | 2 |  |\n',
    )
    const { rows } = parseSettingsTable(TABLE)
    expect(rows.map((r) => [r.group, r.setting, r.defaultCell])).to.deep.equal([
      [null, 'Length', '14'],
      ['Bands', 'Multiplier', '2'],
    ])
    expect(defaultText({ type: 'bool', default: false })).to.equal('Off')
  })

  it('accepts the matching table; refuses a drifted default, an invented setting, a missing one and an empty description', () => {
    expect(checkSettingsTable(TABLE, SETTINGS)).to.deep.equal([])
    expect(
      checkSettingsTable(
        TABLE.replace('| Length | 14 |', '| Length | 20 |'),
        SETTINGS,
      ).join(),
    ).to.include('"Length" shows default "20", the describe JSON says "14"')
    expect(
      checkSettingsTable(`${TABLE}| Smoothing | 3 | x |\n`, SETTINGS).join(),
    ).to.include('"Bands > Smoothing" is not an input')
    expect(
      checkSettingsTable(TABLE.replace(/\| Length.*\n/, ''), SETTINGS).join(),
    ).to.include('missing setting(s) from the describe JSON: Length')
    expect(
      checkSettingsTable(
        TABLE.replace('How many deviations wide the bands are.', ''),
        SETTINGS,
      ).join(),
    ).to.include('needs a "What it does" cell')
    expect(checkSettingsTable('no table', SETTINGS).join()).to.include(
      'needs the settings table',
    )
    expect(
      checkSettingsTable(
        TABLE.replace('| Length | 14 |', '| `Length` | **14** |'),
        SETTINGS,
      ),
    ).to.deep.equal([], 'emphasis is not drift')
  })

  it('matches inputs that share a label to the table rows in order', () => {
    const input = (id: string, def: string) => ({
      id,
      label: 'Level',
      group: null,
      type: 'number',
      default: def === '—' ? null : Number(def),
      defaultText: def,
      kind: 'logic' as const,
    })
    const twoLevels: IndicatorSettings = {
      ...SETTINGS,
      inputs: [input('indicatorValue', '70'), input('indicatorValue2', '—')],
    }
    const table = `| Setting | Default | What it does |
| --- | --- | --- |
| Level | 70 | The lower bound. |
| Level | — | Between only: the upper bound. |
`
    expect(checkSettingsTable(table, twoLevels)).to.deep.equal([])
    expect(
      checkSettingsTable(
        table.replace('| Level | 70 |', '| Level | — |').replace('| Level | — | Between', '| Level | 70 | Between'),
        twoLevels,
      ).join(),
    ).to.include('"Level" shows default "—", the describe JSON says "70"')
    expect(
      checkSettingsTable(table.replace(/\| Level \| — .*\n/, ''), twoLevels).join(),
    ).to.include('missing setting(s) from the describe JSON: Level')
    expect(
      checkSettingsTable(`${table}| Level | — | x |\n`, twoLevels).join(),
    ).to.include('"Level" appears 3 times')
  })
})

// ── The template rule ─────────────────────────────────────────────────────

const IMG = (name: string, alt = `${name} on BINANCE:BTCUSDT 4h`) =>
  `![${alt}](https://content.gainium.io/images/content/indicators/example__${name}.webp)`
const TIP_IMG = (
  setting: string,
  alt = 'Length 14 vs 7 on BINANCE:BTCUSDT 4h: 9 crosses vs 16',
) => IMG(`tip-${setting}`, alt)

const setup = (name: string) => `### ${name}

- **Entry:** crosses up through 30.
- **Exit:** take profit at 2%.
- **Settings:** length 14.
- **Timeframe:** 1h.
- **When it fails:** in a strong downtrend it stays low for days.

${IMG(name.toLowerCase().replace(/\s+/g, '-'))}
`

const SETTINGS_AND_TIPS = (extra = '') => `### Settings and tips

${TABLE}
**Tip:** On 4h bars, Length 7 gives about twice the crosses of 14 — use it for grid entries, not trend filters.

${TIP_IMG('length')}

**Tip:** Raise Multiplier to 2.5 in high volatility: the bands stop being touched every few bars.
${extra}`

const NO_JSON = Symbol('no settings json')
const page = (what: string, json: unknown = SETTINGS) => ({
  file: 'docs/indicators/example.md',
  data: {
    name: 'Example',
    slug: 'example',
    kind: 'community',
    templateVersion: 2,
    faq: [
      { title: 'Q1?', details: 'A.' },
      { title: 'Q2?', details: 'A.' },
      { title: 'Q3?', details: 'A.' },
    ],
    related: ['macd', 'atr'],
  },
  settings: json === NO_JSON ? undefined : json,
  body: [
    'Example measures momentum on a 0–100 scale. Traders use it to buy after a sell-off.',
    `## What is Example\n\nCreated in 1978.\n\n${IMG('chart')}\n\n${what}`,
    `## Trading setups for bots\n\n${setup('Oversold bounce')}\n${setup('Trend pullback')}`,
    `## Using Example in Gainium\n\n1. Add it.\n\n${IMG('bot-form')}\n\n\`\`\`json\n{ "action": "startDeal" }\n\`\`\``,
    '## Related indicators\n\n- [MACD](https://gainium.io/indicators/macd): confirms.\n- [ATR](https://gainium.io/indicators/atr): sizes.',
    '## FAQ\n\n### Q1?\n\nA.\n\n### Q2?\n\nA.\n\n### Q3?\n\nA.',
  ].join('\n\n'),
})

const OTHER: TemplatePageInput[] = ['macd', 'atr'].map((slug) => ({
  file: `docs/indicators/${slug}.md`,
  data: { slug },
  body: '',
}))
const errorsFor = (p: TemplatePageInput) =>
  checkIndicatorTemplates([p, ...OTHER]).errors.join('\n')

describe('template v2: ### Settings and tips', () => {
  it('passes a page with the table, two tips and one comparison image', () => {
    expect(errorsFor(page(SETTINGS_AND_TIPS()))).to.equal('')
  })

  it('is optional; without it a page needs no settings JSON', () => {
    expect(errorsFor(page('', NO_JSON))).to.equal('')
  })

  it('must be the last subsection of "What is"', () => {
    expect(
      errorsFor(page(`${SETTINGS_AND_TIPS()}\n### History\n\nOld.`)),
    ).to.include('must be the last `###` subsection')
  })

  it('needs the describe JSON beside the page, and the table must match it', () => {
    expect(errorsFor(page(SETTINGS_AND_TIPS(), NO_JSON))).to.include(
      'needs the describe JSON docs/indicators/example.settings.json',
    )
    expect(
      errorsFor(page(SETTINGS_AND_TIPS(), { schema: 'x', inputs: [] })),
    ).to.include('schema must be')
    const drifted = {
      ...SETTINGS,
      inputs: SETTINGS.inputs.map((i) =>
        i.id === 'in_0' ? { ...i, default: 21, defaultText: '21' } : i,
      ),
    }
    expect(errorsFor(page(SETTINGS_AND_TIPS(), drifted))).to.include(
      '"Length" shows default "14", the describe JSON says "21"',
    )
  })

  it('needs 2–4 specific tips', () => {
    const one = SETTINGS_AND_TIPS().replace(/\*\*Tip:\*\* Raise.*\n/, '')
    expect(errorsFor(page(one))).to.include('2–4 `**Tip:**` lines (found 1)')
    expect(
      errorsFor(
        page(
          SETTINGS_AND_TIPS('\n**Tip:** Always use good risk management.\n'),
        ),
      ),
    ).to.include('tip 3 is generic')
  })

  it('caps comparison images at 2, only inside the subsection, each alt naming the setting and both values', () => {
    const three = SETTINGS_AND_TIPS(`\n${TIP_IMG('a')}\n\n${TIP_IMG('b')}\n`)
    expect(errorsFor(page(three))).to.include(
      'at most 2 `__tip-` comparison images per page (found 3)',
    )
    const outside = page(SETTINGS_AND_TIPS())
    outside.body = outside.body.replace(
      '## Using Example in Gainium\n\n1. Add it.',
      `## Using Example in Gainium\n\n1. Add it.\n\n${TIP_IMG('multiplier', 'Multiplier 2 vs 3')}`,
    )
    expect(errorsFor(outside)).to.include(
      'comparison image example__tip-multiplier.webp belongs in `### Settings and tips`',
    )
    expect(
      errorsFor(
        page(
          SETTINGS_AND_TIPS().replace('Length 14 vs 7 on', 'Two RSI panels on'),
        ),
      ),
    ).to.include('the alt text names the setting and both values')
    expect(
      errorsFor(page(`${IMG('chart')}\n\n${TIP_IMG('length')}`, NO_JSON)),
    ).to.include('belong in `### Settings and tips`')
  })
})
