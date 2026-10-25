import { describe, it } from 'mocha'
import { expect } from 'chai'
import fs from 'fs'
import path from 'path'
import {
  checkIndicatorTemplates,
  checkMovedPageMeta,
  countSentences,
  MOVED_PAGE_META,
  TemplatePageInput,
} from '../src/indicators/templateCheck'
import { INDICATOR_SLUGS_MOVED_FROM_HELP } from '../src/indicators/movedFromHelp'
import { parseIndicatorSource } from '../src/contentParser'

const IMG = (name: string) =>
  `![${name} on BINANCE:BTCUSDT 4h](https://content.gainium.io/images/content/indicators/example__${name}.webp)`

const setup = (name: string) => `### ${name}

- **Entry:** RSI crosses up through 30.
- **Exit:** take profit at 2%.
- **Settings:** length 7, source close.
- **Timeframe:** 1h.
- **When it fails:** in a strong downtrend RSI stays below 30 for days.

${IMG(name.toLowerCase().replace(/\s+/g, '-'))}
`

const SECTIONS = {
  opening:
    'The Example indicator measures momentum on a 0–100 scale. Traders use it to buy after a sell-off.',
  what: `## What is Example

Created by J. Doe in 1978. It is 100 − 100 / (1 + RS), where RS is the average gain divided by the average loss.

${IMG('chart')}
`,
  setups: `## Trading setups for bots

${setup('Oversold bounce')}
${setup('Trend pullback')}`,
  gainium: `## Using Example in Gainium

1. Open the bot form and add Example.

${IMG('bot-form')}
`,
  related: `## Related indicators

- [MACD](https://gainium.io/indicators/macd): confirms the momentum turn.
- [ATR](https://gainium.io/indicators/atr): sizes the stop.
`,
  faq: `## FAQ

### What is a good length?

Seven on 1h bars.

### Does it repaint?

No.

### Can a bot use it?

Yes.
`,
}

const FAQ = [
  { title: 'What is a good length?', details: 'Seven on 1h bars.' },
  { title: 'Does it repaint?', details: 'No.' },
  { title: 'Can a bot use it?', details: 'Yes.' },
]

const data = (overrides: Record<string, unknown> = {}) => ({
  name: 'Example',
  slug: 'example',
  kind: 'native',
  templateVersion: 2,
  faq: FAQ,
  related: ['macd', 'atr'],
  ...overrides,
})

const body = (parts: Partial<typeof SECTIONS> = {}) => {
  const s = { ...SECTIONS, ...parts }
  return [s.opening, s.what, s.setups, s.gainium, s.related, s.faq]
    .filter(Boolean)
    .join('\n\n')
}

const OTHER: TemplatePageInput[] = ['macd', 'atr'].map((slug) => ({
  file: `docs/indicators/${slug}.md`,
  data: { slug },
  body: '',
}))

const check = (page: Partial<TemplatePageInput>) =>
  checkIndicatorTemplates([
    {
      file: 'docs/indicators/example.md',
      data: data(),
      body: body(),
      ...page,
    },
    ...OTHER,
  ])

const errorsOf = (page: Partial<TemplatePageInput>) =>
  check(page).errors.join('\n')

describe('indicator template v2 (spec 053 §2.1, docs/STYLE.md)', () => {
  it('passes a complete page', () => {
    expect(check({})).to.deep.equal({ errors: [], warnings: [] })
  })

  it('ignores pages without templateVersion', () => {
    const { templateVersion: _t, ...legacy } = data()
    expect(
      check({ data: legacy, body: '## Conclusion\n\nAnything.' }),
    ).to.deep.equal({
      errors: [],
      warnings: [],
    })
  })

  it('rejects an unknown templateVersion', () => {
    expect(errorsOf({ data: data({ templateVersion: 3 }) })).to.include(
      '"templateVersion" must be 2',
    )
  })

  it('requires a 2–3 sentence opening with no heading', () => {
    expect(errorsOf({ body: body({ opening: '' }) })).to.include(
      'must open with',
    )
    expect(
      errorsOf({ body: body({ opening: 'One sentence only.' }) }),
    ).to.include('2–3 sentences (found 1)')
    expect(errorsOf({ body: body({ opening: 'A. B. C. D.' }) })).to.include(
      'found 4',
    )
  })

  it('counts sentences without splitting decimals or e.g.', () => {
    expect(
      countSentences('It reads 0.5 at the midpoint, e.g. on 1h bars. Next.'),
    ).to.equal(2)
  })

  it('requires the five sections in order, and no others', () => {
    const swapped = [
      SECTIONS.opening,
      SECTIONS.setups,
      SECTIONS.what,
      SECTIONS.gainium,
      SECTIONS.related,
      SECTIONS.faq,
    ].join('\n\n')
    expect(errorsOf({ body: swapped })).to.include('must be exactly, in order')
    expect(
      errorsOf({ body: `${body()}\n\n## Conclusion\n\nDone.` }),
    ).to.include('must be exactly, in order')
    expect(errorsOf({ body: body({ related: '' }) })).to.include(
      'must be exactly, in order',
    )
  })

  it('rejects a # title in the body', () => {
    expect(errorsOf({ body: `# Example\n\n${body()}` })).to.include(
      'no `#` heading',
    )
  })

  it('requires an image in "What is"', () => {
    expect(
      errorsOf({ body: body({ what: '## What is Example\n\nNo picture.\n' }) }),
    ).to.include('"What is" needs at least one image')
  })

  it('accepts a screenshot placeholder with a warning', () => {
    const result = check({
      body: body({
        what: '## What is Example\n\nText.\n\n<!-- screenshot: example__chart — the indicator on BTCUSDT -->\n',
      }),
    })
    expect(result.errors).to.deep.equal([])
    expect(result.warnings.join()).to.include('placeholder')
  })

  it('requires 2–4 setups', () => {
    const one = `## Trading setups for bots\n\n${setup('Only one')}`
    expect(errorsOf({ body: body({ setups: one }) })).to.include(
      '2–4 `###` setups (found 1)',
    )
    const five = `## Trading setups for bots\n\n${['A', 'B', 'C', 'D', 'E'].map(setup).join('\n')}`
    expect(errorsOf({ body: body({ setups: five }) })).to.include('(found 5)')
  })

  it('requires each setup label and an image per setup', () => {
    const noFail = setup('No failure').replace(
      /- \*\*When it fails:\*\*.*\n/,
      '',
    )
    const noImage = setup('No image').replace(/!\[.*\n/, '')
    const errors = errorsOf({
      body: body({
        setups: `## Trading setups for bots\n\n${noFail}\n${noImage}`,
      }),
    })
    expect(errors).to.include(
      'setup "No failure" is missing bold label(s): When it fails',
    )
    expect(errors).to.include('setup "No image" needs at least one image')
  })

  it('requires an image in the Gainium section, and a JSON payload for TradingView indicators', () => {
    expect(
      errorsOf({
        body: body({ gainium: '## Using Example in Gainium\n\nSteps.\n' }),
      }),
    ).to.include('"Using … in Gainium" needs at least one image')
    const community = errorsOf({ data: data({ kind: 'community' }) })
    expect(community).to.include('```json block')
    const withPayload = `## Using Example in Gainium\n\n${IMG('webhook')}\n\n\`\`\`json\n{ "action": "startDeal", "uuid": "YOUR-BOT-UUID" }\n\`\`\`\n`
    expect(
      check({
        data: data({ kind: 'community' }),
        body: body({ gainium: withPayload }),
      }).errors,
    ).to.deep.equal([])
  })

  it('requires Related links to resolve to existing /indicators slugs, absolute', () => {
    const rel = (lines: string[]) =>
      errorsOf({
        body: body({
          related: `## Related indicators\n\n${lines.join('\n')}\n`,
        }),
      })
    expect(
      rel([
        '- [MACD](https://gainium.io/indicators/macd): x.',
        '- [Nope](https://gainium.io/indicators/nope): y.',
      ]),
    ).to.include('/indicators/nope is not a page')
    expect(
      rel([
        '- [MACD](https://gainium.io/indicators/macd): x.',
        '- [ATR](/indicators/atr): y.',
      ]),
    ).to.include('must be absolute: https://gainium.io/indicators/atr')
    expect(
      rel(['- [MACD](https://gainium.io/indicators/macd): x.']),
    ).to.include('at least 2 entries')
    expect(
      rel([
        'MACD and ATR pair well.',
        '- [MACD](https://gainium.io/indicators/macd): x.',
        '- [ATR](https://gainium.io/indicators/atr): y.',
      ]),
    ).to.include('one `- ` line per indicator')
  })

  it('requires frontmatter related to match the Related section', () => {
    expect(errorsOf({ data: data({ related: ['macd'] }) })).to.include(
      'body only: atr',
    )
  })

  it('requires 3–5 FAQ questions that match the frontmatter faq', () => {
    const two =
      '## FAQ\n\n### What is a good length?\n\nSeven.\n\n### Does it repaint?\n\nNo.\n'
    const errors = errorsOf({ body: body({ faq: two }) })
    expect(errors).to.include('3–5 `###` questions (found 2)')
    expect(errors).to.include('frontmatter `faq` titles must match')
    const renamed = data({
      faq: [{ ...FAQ[0], title: 'Other?' }, FAQ[1], FAQ[2]],
    })
    expect(errorsOf({ data: renamed })).to.include(
      'frontmatter `faq` titles must match',
    )
    const noDetails = data({ faq: [{ title: FAQ[0].title }, FAQ[1], FAQ[2]] })
    expect(errorsOf({ data: noDetails })).to.include('faq[0] has no "details"')
  })

  it('requires alt text on every image', () => {
    const what =
      '## What is Example\n\n![](https://content.gainium.io/images/content/indicators/x.webp)\n'
    expect(errorsOf({ body: body({ what }) })).to.include('without alt text')
  })
})

describe('moved-page meta guard (spec 053 §3)', () => {
  it('the snapshot covers exactly the 37 moved slugs', () => {
    expect(Object.keys(MOVED_PAGE_META).sort()).to.deep.equal(
      [...INDICATOR_SLUGS_MOVED_FROM_HELP].sort(),
    )
  })

  it('every moved page on disk still matches the snapshot', () => {
    const dir = path.join(__dirname, '..', 'docs', 'indicators')
    const pages = INDICATOR_SLUGS_MOVED_FROM_HELP.map((slug) => ({
      file: `docs/indicators/${slug}.md`,
      data: parseIndicatorSource(
        fs.readFileSync(path.join(dir, `${slug}.md`), 'utf-8'),
      ).data,
    }))
    expect(checkMovedPageMeta(pages)).to.deep.equal([])
  })

  it('fails a changed name or description, and ignores other slugs', () => {
    const frozen = {
      rsi: { name: 'Relative Strength Index (RSI)', description: 'Old.' },
    }
    const errors = checkMovedPageMeta(
      [
        {
          file: 'rsi.md',
          data: { slug: 'rsi', name: 'RSI', description: 'Old.' },
        },
        {
          file: 'new.md',
          data: { slug: 'new', name: 'Anything', description: 'x' },
        },
      ],
      frozen,
    )
    expect(errors).to.have.length(1)
    expect(errors[0]).to.include('"name" of a page moved from /help must stay')
    expect(
      checkMovedPageMeta(
        [
          {
            file: 'rsi.md',
            data: { slug: 'rsi', name: frozen.rsi.name, description: 'New.' },
          },
        ],
        frozen,
      )[0],
    ).to.include('"description"')
  })
})
