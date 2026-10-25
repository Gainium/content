# Writing style for Gainium articles

This guide covers every indicator page in `docs/indicators/`. Help articles and blog posts follow it
too, as they get rewritten. Two checks enforce it:

- `npm run check:style` finds banned phrases and soft patterns (`src/style/aiGiveaways.ts`).
- `npm run check:indicators` checks the article template on pages that declare `templateVersion: 2`
  (`src/indicators/templateCheck.ts`).

Run both before you open a pull request. CI runs them too.

## The reader

You are writing for one person: a trader who is setting up a bot and wants to know whether this
indicator fits it, which settings to use, and when it breaks. They have a chart open. They are not
reading for pleasure.

## Rules

1. **Answer first.** The first sentence says what the indicator is. The second says what traders use
   it for. Don't open by announcing the article, and don't describe the market in general.
2. **Second person, active voice.** "Set the length to 14", not "the length can be set to 14".
3. **Short sentences.** Aim for 20 words or fewer. Split anything over 30. One idea per sentence.
4. **Numbers over adjectives.** "Fires about three times as often as RSI(14) on BTC/USDT 4h" beats
   "fires frequently".
   "Lags price by about half its length" beats "lags somewhat". When you have no number, describe
   what the reader will see on the chart.
5. **Every claim is about this indicator.** Test each sentence: could it appear unchanged in an
   article about a different indicator? If yes, make it specific or cut it. "Combine it with other
   indicators" and "always backtest" fail this test.
6. **No "it depends" unless you say on what.** Name the variable and say which way it pushes:
   "On 15m bars, use a length of 21 or more. Shorter lengths fire on every wick."
7. **No hype and no promises.** Don't grade the indicator ("powerful", "robust", "invaluable"). Show
   what it does. Never promise profit.
8. **Say when it fails.** Every setup ends with the market condition that breaks it. That one line
   is worth more than any disclaimer.
9. **No throat-clearing intro, no summary outro.** Stop when the last useful fact is written. There
   is no "Conclusion" section.
10. **Cite what you claim.** Creator, year, formula and defaults each need a `sources` entry.
11. **No time periods.** Compare settings, not windows. See [No time periods](#no-time-periods).

### No time periods

Ares, verbatim: "We cannot say things like the last 12 months, don't focus on time, focus on how much
more signals you can get approx in one vs another without any time periods."

A count tied to a window ("30 times in the last 12 months") is stale the day after it is written,
and the reader cannot carry it to their own pair. A ratio between two settings holds on any window.

- **No sample windows anywhere:** not "last 12 months", "past year", "this year", "in the last N
  days", "per month", "once every N days", "over the sample", "since May 2025" or "August to October
  2026". That covers the body, the frontmatter prose, image alt text, captions and `sources`.
- **A worked example may keep its date.** "On Oct 8 RSI crossed 30 and the take profit filled 12
  hours later" describes one trade, and that is fine (Ares: it is "one specific example"). The rule is
  against general claims tied to a window, not against dated examples or text inside images. The data source entry is "Binance BTC/USDT 1h and 4h candles, computed with
  Gainium's indicator engine", with no date range.
- **Compare instead:** "RSI(7) gives about three times as many crosses up through 30 as RSI(14)", "a
  multiplier of 2 flips about 1.6× as often as 3", "on 1h the same rule fires about five times as
  often as on 4h". Round to what a reader can use: "about twice", "roughly a third".
- **Hit rates are proportions:** "price was higher a day later after about half the signals". No
  sample sizes ("16 of 29"), which imply a window.
- **Chart examples point at the chart:** "in the example on the chart", "in the chart above". A
  caption still says what the image shows, minus the dates: "Length 7 vs 14: about 3× as many
  crosses of 30".
- **Fine:** creator history ("Wilder published it in 1978"), an indicator's own window ("over the
  last 14 bars"), the Interval ("1 minute to 1 week") and a horizon after a signal ("a day later",
  "within 48 hours"). Frontmatter `createdAt` / `updatedAt` are never checked.

> ✗ "On BTC/USDT 4h in the last 12 months, RSI(7) gave 93 crosses up through 30 and RSI(14) gave 30."
>
> ✓ "On BTC/USDT 4h, RSI(7) gives about three times as many crosses up through 30 as RSI(14)."

> ✗ "On 15 October 2026 the rule fired at 81,640, and price fell 2.3% within 12 hours."
>
> ✓ "In the example on the chart, the rule fired at 81,640 and price fell 2.3% within 12 hours."

`check:style` bans these in `docs/indicators/` (`src/style/timePeriods.ts`).

### Rhythm

- **No formulaic triads.** "Fast, reliable, and easy to use" and "learning, testing, and
  adaptation" are padding. If three things matter, give each its own sentence with a fact.
- **No em-dash chains.** Use at most one aside per sentence. Two dashes in one sentence means it
  should be two sentences. The check warns above 6 em dashes per 1,000 words.
- **No stock transitions.** Don't start sentences with "Additionally," "Moreover," "Furthermore,"
  "Notably," "Ultimately," or "Overall,". The next sentence follows without them.
- **No exclamation marks.**

## Banned phrases

`check:style` fails on these in `docs/indicators/`. In `docs/help/` and blog posts it only reports
them for now. Rewrite the sentence; don't swap in a synonym.

| Kind | Phrases |
| --- | --- |
| Stock openers | "In the rapidly changing / ever-evolving / fast-paced / dynamic world of…", "In the world of crypto/trading…", "In today's fast-paced…", "In this article, we'll…", "This guide will…" |
| Stock verbs and nouns | delve, navigate the landscape / complexities / waters, unlock the (full) potential, unleash, game-changer, robust, seamless, leverage (as a verb: "leverage the…", "by leveraging"), harness, elevate, embark, testament to, tapestry, realm, ever-evolving, cutting-edge, state-of-the-art, revolutionize, supercharge, empower, invaluable, indispensable, unparalleled, a myriad / plethora of, treasure trove, look no further, take it to the next level, maximize your profits |
| Filler | "It's important to note that", "It is worth noting", "it's essential to understand", "Whether you're a beginner or a seasoned trader", "Let's dive in", "dive into", "Let's explore", "plays a crucial / pivotal / key role", "a powerful / versatile / valuable tool", "it goes without saying", "needless to say", "valuable insights", "make informed decisions", "gain an edge", "no indicator is foolproof", "as with any strategy" |
| Closers | "In conclusion", "In summary", "To sum up", "In essence", "Happy trading", a `## Conclusion` / `## Final thoughts` / `## Key takeaways` heading |
| Time periods (`docs/indicators/` only) | "last / past N days / weeks / months / years", "last / past year / month", "this year", "per year / month", "twice a week", "once every N days", "N months of data", "over the last / past" (unless it is the indicator's own "last N bars"), "over the sample", "since <Month> <Year>", date ranges ("August to October 2026", "2024–2026"). A single date anchoring one worked example is allowed |

Soft patterns are warnings, not failures: the stock transitions above, "when it comes to",
"not only… but also", "a wide range of", "powerful", "crucial", "always backtest", "journey",
exclamation marks and em-dash chains. One is fine. A habit is a giveaway.

"Leverage" as the futures noun ("10x leverage") is fine. The check only flags the verb.

## Before and after

These fragments are from our own articles.

**Opening**

> ✗ "In the rapidly changing world of cryptocurrency trading, traders are continually seeking
> effective tools…"
>
> ✓ "The Relative Strength Index (RSI) compares the size of recent gains with recent losses on a
> 0–100 scale. Traders use it to buy after a sell-off: a common bot start condition is RSI crossing
> up through 30."

**Announcing the article**

> ✗ "In this article, we'll define the ATR, explain how to configure it in Gainium…"
>
> ✓ Cut the sentence. The section headings already tell the reader what follows.

**Grading instead of showing**

> ✗ "The Average True Range (ATR) is a versatile indicator that provides valuable insights into
> market volatility."
>
> ✓ "ATR is how far price moves in an average bar, in price units. It says nothing about
> direction."

**"It depends" without the variable**

> ✗ "This value must be adjusted according to the asset you're trading."
>
> ✓ "ATR is in price units, so a threshold that fits BTC is meaningless for a $0.10 coin. Read
> ATR(14) on your pair's own chart and set the threshold near the middle of its range."

**Generic advice**

> ✗ "Always backtest your ATR-based strategies to ensure they perform well under different market
> conditions."
>
> ✓ "Backtest the same settings over one trending stretch and one sideways stretch. If the sideways
> one loses, add the trend filter from the second setup."

**Disclaimer instead of a failure mode**

> ✗ "Remember, no indicator is foolproof. Continuous learning, testing, and adaptation are key…"
>
> ✓ "**When it fails:** in a sideways market Supertrend flips every few bars, and each flip is a
> losing deal."

**Filler adjective**

> ✗ "…to create a more robust trading strategy."
>
> ✓ "…so the bot only buys when price is above both the 50 and the 200 EMA."

## The indicator article template (`templateVersion: 2`)

Add `templateVersion: 2` to the frontmatter when a page follows this template. From then on
`check:indicators` holds the page to it. Pages without the field are checked as before.

The `##` sections are exactly these five, in this order. Add no others, and don't put a `#` title in
the body: the title comes from `name`.

```markdown
<Opening: 2–3 sentences, no heading. What the indicator is, and what traders use it for.>

## What is <Name>

Creator and year. The formula, with every variable explained. The default settings. How to read the
values: levels, crosses, divergences.

![<Name> on BINANCE:BTCUSDT 4h, dark theme: …](https://content.gainium.io/images/content/indicators/<slug>__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| **<Input group>** | | |
| <Setting> | <default> | <one line> |

**Tip:** <setting>, <value>, <market condition>: <the effect>.

![<Setting> <A> vs <B> on BINANCE:BTCUSDT 4h](https://content.gainium.io/images/content/indicators/<slug>__tip-<setting>.webp)

**Tip:** …

## Trading setups for bots

### <Setup name>

- **Entry:** …
- **Exit:** …
- **Settings:** …
- **Timeframe:** …
- **When it fails:** …

![Annotated chart of this setup: …](https://content.gainium.io/images/content/indicators/<slug>__<setup>.webp)

### <Setup name>

(2–4 setups in total, each in the same shape.)

## Using <Name> in Gainium

## Related indicators

- [<Indicator>](https://gainium.io/indicators/<slug>): one line on why it pairs with this one.
- [<Indicator>](https://gainium.io/indicators/<slug>): …
```

The FAQ is not a body section. Write it in the frontmatter `faq`, the same format as /help
articles; the site renders it with the FAQ component and its FAQPage schema.

### What the check requires

- **Opening:** 2–3 sentences before the first `##`, with no heading and no image.
- **What is:** at least one image. Use a clean TradingView screenshot: dark theme, BINANCE:BTCUSDT.
- **Settings and tips** (optional; when present, the LAST `###` of "What is"): see below.
- **Trading setups for bots:** 2–4 `###` setups. Each one has the bold labels **Entry**, **Exit**,
  **Settings**, **Timeframe** and **When it fails**, plus at least one image (an annotated
  TradingView screenshot of that setup).
- **Using … in Gainium:** at least one image.
  - `native`: the bot-form steps with V2 dashboard screenshots, each catalog field with its default,
    and one example configuration.
  - `builtin` / `community`: the TradingView alert → Gainium webhook recipe for the indicator's real
    alert conditions, with V2 screenshots of the webhook bot settings. It must include the payload
    as a ` ```json ` block with an `"action"`.
- **Related indicators:** at least 2 list items. Each one links an existing page as an absolute URL,
  `https://gainium.io/indicators/<slug>`, and never the page itself. The frontmatter `related` lists
  the same slugs.
- **FAQ:** frontmatter `faq` only, 3–5 items, each with a `title` (the question) and `details` (the
  answer, plain text: no links or markdown). A body `## FAQ` fails the check.
- **Images:** every image has alt text that says what it shows. A `<!-- screenshot: … -->`
  placeholder holds an image's place with a warning until the capture is filled in.

### Settings and tips

An optional `### Settings and tips` closes "What is". Write it when the indicator has settings a bot
user would change.

- **The table is generated, never typed.** The page's describe JSON,
  `docs/indicators/<slug>.settings.json`, is written once by the describe step: claus-dashboard's
  `scripts/tv-describe.mjs` for a TradingView script (it reads the real inputs, defaults, plots and
  alert conditions from the chart) or `npx tsx scripts/describe-native.ts <slug> --write` for a native
  indicator (from the dashboard catalog). Paste its `.md` table. `check:indicators` holds every row to
  the JSON: a setting that is not an input, a default that differs, or a missing setting fails. You
  write only the "What it does" cells, and none may be empty. Colour and label-size inputs are left
  out.
- **2–4 tips**, each a `**Tip:**` line. A tip is specific: the setting, the value, the market
  condition, and the effect. "Lower RSI Length to 7 on 4h bars for grid entries: it crosses 70
  about twice as often" is a tip. "Adjust the settings to your trading style" is not, and the check
  rejects a tip that names no setting and no number. Every tip is backed by one of two things: a fact
  from the source code or the describe JSON (a default, a range, what an input feeds), or a
  side-by-side capture that shows the effect. No generic advice.
- **Comparison images are discretionary, and rule-bound.**
  - Include one only when the setting changes the signals or the levels a bot acts on (a length, a
    multiplier, a band width, a lookback, a threshold), **and** the difference is visible at article
    width or the signal counts differ by about 30% or more. `tv-tip.mjs --count-signals` measures it.
  - Skip it for a cosmetic setting, for panels that look nearly the same, and when one numbered
    sentence says it as well ("Length 7 gives nearly twice as many crosses of 70 as 14").
  - At most **2** per article. Each sits inside Settings and tips, next to the tip it supports, and is
    named `<slug>__tip-<setting>.webp`. It is made by `tv-tip.mjs`, which takes both panels with
    identical framing so the setting is the only difference.
  - The alt text names the setting and both values ("RSI Length 14 vs 7 on BINANCE:BTCUSDT 4h"). The
    caption states both settings and the measured difference as a ratio, with no dates ("Length 7 vs
    14: about 3× as many crosses of 30").
  - The writer notes on the opportunity why it included or skipped each candidate comparison.

### Pages moved from /help

Those are the 37 slugs in `src/indicators/movedFromHelp.ts`. They keep their `slug`, `name` (the
title) and `description` exactly as they are. `check:indicators` compares `name` and `description`
with `src/indicators/movedPageMeta.json`, a frozen snapshot. A rewrite changes only the body,
`faq` and `related`. Their `description` is not style-checked, because it cannot be changed.
