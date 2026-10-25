import { describe, it } from 'mocha'
import { expect } from 'chai'
import { execFileSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  BANNED_PHRASES,
  lintMarkdown,
  proseLines,
} from '../src/style/aiGiveaways'
import { DEFAULT_STYLE_SCOPE, parseScope } from '../src/style/scope'
import { extraBannedFor, TIME_PERIOD_RULES } from '../src/style/timePeriods'

const page = (body: string, fm = 'name: X\nslug: x\n') =>
  `---\n${fm}---\n\n${body}\n`

const rules = (raw: string, severity?: 'banned' | 'soft') =>
  lintMarkdown(raw)
    .hits.filter((h) => !severity || h.severity === severity)
    .map((h) => h.rule)

describe('style lint: banned phrases (docs/STYLE.md)', () => {
  it('flags a stock opener with its line number', () => {
    const { hits } = lintMarkdown(
      page(
        'First line.\n\nIn the rapidly changing world of cryptocurrency trading, traders look for tools.',
      ),
    )
    const hit = hits.find((h) => h.rule === 'opener-world-of')
    expect(hit?.severity).to.equal('banned')
    expect(hit?.line).to.equal(8)
  })

  it('flags each listed giveaway', () => {
    const samples = [
      "Let's dive in.",
      'We delve into it.',
      'It is worth noting that RSI lags.',
      "It's important to note that ATR is absolute.",
      'In conclusion, it works.',
      'In summary, use it.',
      "Whether you're a beginner or a seasoned trader, it helps.",
      'It plays a pivotal role here.',
      'It is a powerful tool.',
      'A game-changer for bots.',
      'A robust strategy.',
      'A seamless setup.',
      'Leverage the signal to time entries.',
      'Harness momentum.',
      'Elevate your trading.',
      'Embark on a strategy.',
      'A testament to its design.',
      'A tapestry of signals.',
      'The realm of trading.',
      'Unlock the full potential of your bot.',
      'Navigate the complexities of the market.',
      "In today's fast-paced markets, speed matters.",
      'Remember, no indicator is foolproof.',
    ]
    for (const sample of samples) {
      expect(rules(page(sample), 'banned'), sample).to.not.be.empty
    }
  })

  it('flags a Conclusion heading', () => {
    expect(rules(page('Text.\n\n## Conclusion\n\nDone.'))).to.include(
      'conclusion-heading',
    )
  })

  it('does not flag legitimate uses', () => {
    const clean = [
      'Use 10x leverage on futures.',
      'Leveraged tokens are not supported.',
      'Navigate to Bot Settings and add RSI.',
      'RSI crosses up through 30 on the 1h chart.',
    ]
    for (const sample of clean) {
      expect(rules(page(sample), 'banned'), sample).to.deep.equal([])
    }
  })

  it('checks frontmatter prose (tldr, faq) but not code, URLs or comments', () => {
    const raw = page(
      [
        '```json',
        '{ "note": "delve into this robust payload" }',
        '```',
        'Use `robust` as a word in code.',
        'See https://example.com/delve-robust.',
        '<!-- a seamless comment -->',
        '![a chart](https://example.com/game-changer.webp)',
      ].join('\n'),
      'name: X\nslug: x\ntldr: A powerful tool for bots.\nfaq:\n  - title: Is it robust?\n    details: Yes.\n',
    )
    const hits = lintMarkdown(raw).hits.filter((h) => h.severity === 'banned')
    expect(hits.map((h) => h.where).sort()).to.deep.equal([
      'frontmatter.faq[0].title',
      'frontmatter.tldr',
    ])
  })

  it('skips frozen frontmatter fields on request', () => {
    const raw = page(
      'Body.',
      'name: X\ndescription: In this article, we explain RSI.\n',
    )
    expect(rules(raw, 'banned')).to.include('opener-this-article')
    expect(
      lintMarkdown(raw, { skipFields: ['description'] }).hits,
    ).to.deep.equal([])
  })

  it('every banned rule is a global regex (matchAll needs it)', () => {
    for (const rule of BANNED_PHRASES) {
      expect(rule.pattern.flags, rule.id).to.include('g')
    }
  })
})

describe('style lint: soft patterns', () => {
  it('warns on sentence-start Additionally/Moreover/Furthermore', () => {
    const raw = page(
      'RSI is fast. Additionally, it lags.\n\nMoreover, it repaints.\n\n- Furthermore, it is noisy.',
    )
    const soft = lintMarkdown(raw).hits.filter(
      (h) => h.rule === 'stock-transition',
    )
    expect(soft).to.have.length(3)
    expect(soft.every((h) => h.severity === 'soft')).to.equal(true)
    expect(rules(raw, 'banned')).to.deep.equal([])
  })

  it('warns on exclamation marks, not on images', () => {
    expect(rules(page('Buy now!'), 'soft')).to.include('exclamation')
    expect(rules(page('![chart](https://x.io/a.webp)'), 'soft')).to.not.include(
      'exclamation',
    )
  })

  it('warns on em-dash density and on chains in one sentence', () => {
    const dense = page(
      Array.from({ length: 10 }, () => 'Price moves — then stops.').join(' '),
    )
    expect(rules(dense, 'soft')).to.include('em-dash-density')
    const chain = page('RSI — a momentum gauge — reads 0 to 100.')
    expect(rules(chain, 'soft')).to.include('em-dash-chain')
    const table = page('| a — b | c — d |')
    expect(rules(table, 'soft')).to.not.include('em-dash-chain')
  })

  it('keeps line numbers aligned when blanking code', () => {
    const lines = proseLines('a\n```\ncode\n```\nb')
    expect(lines).to.deep.equal(['a', '', '', '', 'b'])
  })
})

describe('style lint: scope', () => {
  it('fails indicators, warns help and blog by default', () => {
    expect(DEFAULT_STYLE_SCOPE).to.deep.include({
      path: 'docs/indicators',
      mode: 'error',
    })
    expect(DEFAULT_STYLE_SCOPE).to.deep.include({
      path: 'docs/help',
      mode: 'warn',
    })
    expect(DEFAULT_STYLE_SCOPE).to.deep.include({
      path: 'docs/blog',
      mode: 'warn',
    })
  })

  it('parses path=mode overrides and rejects unknown modes', () => {
    expect(parseScope(['docs/help=error,docs/blog=warn', 'x'])).to.deep.equal([
      { path: 'docs/help', mode: 'error' },
      { path: 'docs/blog', mode: 'warn' },
      { path: 'x', mode: 'error' },
    ])
    expect(() => parseScope(['docs/help=strict'])).to.throw('mode')
  })

  it('the script exits 1 only for banned phrases in error scope', function () {
    this.timeout(60000)
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'style-'))
    fs.mkdirSync(path.join(dir, 'strict'))
    fs.mkdirSync(path.join(dir, 'lenient'))
    fs.writeFileSync(path.join(dir, 'strict', 'ok.md'), page('Buy now!'))
    fs.writeFileSync(
      path.join(dir, 'lenient', 'bad.md'),
      page("Let's dive in."),
    )
    const run = (scope: string) => {
      try {
        execFileSync(
          'npx',
          ['tsx', 'scripts/check-style.ts', '--scope', scope],
          { cwd: path.join(__dirname, '..'), stdio: 'pipe' },
        )
        return 0
      } catch (error: any) {
        return error.status as number
      }
    }
    // soft only in error scope, banned only in warn scope: passes
    expect(
      run(`${dir}/strict=error,${dir}/lenient=warn`),
      'warn scope never fails',
    ).to.equal(0)
    // the same banned phrase in error scope: fails
    expect(run(`${dir}/lenient=error`)).to.equal(1)
  })
})

describe('style lint: time periods in docs/indicators (docs/STYLE.md)', () => {
  const extraBanned = extraBannedFor('docs/indicators/rsi.md')
  const timeRules = (raw: string) =>
    lintMarkdown(raw, { extraBanned })
      .hits.filter((h) => h.severity === 'banned')
      .map((h) => h.rule)

  it('applies to docs/indicators only', () => {
    expect(extraBanned.map((r) => r.id)).to.deep.equal(
      TIME_PERIOD_RULES.map((r) => r.id),
    )
    expect(extraBannedFor('./docs/indicators/rsi.md')).to.have.length(
      TIME_PERIOD_RULES.length,
    )
    expect(extraBannedFor('docs/help/rsi.md')).to.deep.equal([])
    expect(extraBannedFor('docs/blog/x.md')).to.deep.equal([])
    expect(extraBannedFor('docs/indicators-old/x.md')).to.deep.equal([])
    // without the path's rules, lintMarkdown does not know about them
    expect(
      rules(page('In the last 12 months RSI fired 30 times.')),
    ).to.not.include('time-last-n-units')
  })

  it("flags Ares's example and every listed period form", () => {
    const samples: Array<[string, string]> = [
      [
        'On BTC/USDT 4h in the last 12 months, RSI(7) gave 93 crosses up through 30 and RSI(14) gave 30.',
        'time-last-n-units',
      ],
      ['It fired twice in the past 90 days.', 'time-last-n-units'],
      ['Over the past two years it lagged.', 'time-last-n-units'],
      ['It worked well last year.', 'time-last-unit'],
      ['In the past month it failed.', 'time-last-unit'],
      ['This year it fired 12 times.', 'time-this-unit'],
      ['It fires about 40 times per year.', 'time-per-unit'],
      ['That is roughly 3 signals per month.', 'time-per-unit'],
      ['It fires about twice a week.', 'time-per-unit'],
      ['About once every 12 days.', 'time-per-unit'],
      ['Over the last 12 months, RSI(14) was above 70.', 'time-over-the-last'],
      ['Counted over the sample, it won half.', 'time-over-the-last'],
      ['Six months of 4h candles.', 'time-units-of-data'],
      ['It has worked since May 2025.', 'time-since-date'],
      ['It held since September 2026.', 'time-since-date'],
      ['BTC/USDT 4h, August to October 2026.', 'time-date-range'],
      ['Data: Oct 2025 – Oct 2026.', 'time-date-range'],
      ['From 2024 to 2026 it trended.', 'time-date-range'],
    ]
    for (const [sample, rule] of samples) {
      expect(timeRules(page(sample)), sample).to.include(rule)
    }
  })

  it('allows a single date that anchors one worked example', () => {
    for (const sample of [
      'On 15 September the rule fired and the deal closed two bars later.',
      'MAR under 0.97 on Oct 8: the 1.5% take profit filled 12 hours later.',
      'The cross on 2026-10-24 failed.',
    ]) {
      expect(timeRules(page(sample)), sample).to.deep.equal([])
    }
  })

  it('flags image alt text and frontmatter prose', () => {
    expect(
      timeRules(
        page(
          '![RSI on BINANCE:BTCUSDT 4h, 25 July to 24 October 2026](https://content.gainium.io/images/x.webp)',
        ),
      ),
    ).to.include('time-date-range')
    const raw = page(
      'Body.',
      'name: X\nslug: x\ntldr: It fired 30 times in the last 12 months.\n',
    )
    const hits = lintMarkdown(raw, { extraBanned }).hits
    expect(hits.map((h) => h.where)).to.include('frontmatter.tldr')
  })

  it('does not flag frontmatter dates, URLs, bar windows or comparisons', () => {
    const raw = page(
      [
        'RSI(7) gives about three times as many crosses up through 30 as RSI(14).',
        'A multiplier of 2 flips about 1.6× as often as 3.',
        'On 1h the same rule fires about five times as often as on 4h.',
        'Price was higher a day later after about half the signals.',
        'A 2% take profit was reached within 48 hours about half the time.',
        'It returned within two weeks of the signal, within a few days of the low.',
        'The highest high over the last 14 bars.',
        'Compared with its own percentile over the last **Lookback** bars.',
        'Its own Percentile over the last Lookback candles.',
        'About a quarter of the signals failed.',
        'Wilder published the RSI in 1978.',
        'Interval: from 1 minute to 1 week.',
        'You may 3x the order size. MAR 20 is the default.',
        'In the example on the chart, the rule fired at 81,640.',
        '![RSI Length 14 vs 7 on BINANCE:BTCUSDT 4h](https://content.gainium.io/images/2026-10-24/rsi.webp)',
        'See `2026-10-24` in code.',
      ].join('\n\n'),
      "name: X\nslug: x\ncreatedAt: '2023-04-11T17:49:23.152Z'\nupdatedAt: '2026-10-25T00:00:00.000Z'\npublishedAt: 2023-04-14\n",
    )
    const hits = lintMarkdown(raw, { extraBanned }).hits
    expect(
      hits.map((h) => `${h.rule}: ${h.match}`),
      'no time-period hits',
    ).to.deep.equal([])
  })

  it('every time rule is a global regex (matchAll needs it)', () => {
    for (const rule of TIME_PERIOD_RULES) {
      expect(rule.pattern.flags, rule.id).to.include('g')
    }
  })
})
