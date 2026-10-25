---
id: 120
name: Engulfing Candle Indicator
slug: engulfing-candle
description: >-
  Learn how to use the Engulfing Candle indicator in Gainium for automated
  trading, detect bullish and bearish reversals, and configure your strategy for
  maximum effectiveness.
createdAt: '2024-10-06T11:54:40.955Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-06T12:03:06.893Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:30.008Z'
templateVersion: 2
tldr: >-
  An engulfing candle is a two-candle reversal pattern: the second candle's
  body opens beyond the first candle's body and closes past its open. A
  bullish engulfing marks buyers taking over after a down candle; a bearish
  engulfing marks the reverse. Gainium checks every closed candle on the
  interval you pick and fires on the candle that completes the pattern. It
  has no trend filter of its own, so it fires on about one candle in five;
  use it at a level or with a second indicator.
kind: native
catalogKeys:
  - ECD
category: structure
aliases:
  - "Engulfing Candle"
  - "Engulfing Pattern"
  - "Bullish Engulfing"
  - "Bearish Engulfing"
faq:
  - title: What exact rule does Gainium use for a bullish engulfing candle?
    details: >-
      The candle opens at or below the previous candle's close, opens below
      the previous candle's open, and closes above the previous candle's
      open. Only the bodies count; wicks are ignored. A bearish engulfing is
      the mirror: open at or above the previous close, above the previous
      open, and a close below the previous open.
  - title: Does the indicator check the trend before the pattern?
    details: >-
      No. It fires on any candle that matches the rule, in a trend or in a
      range. Add the trend or the level yourself, for example with a support
      level or an RSI condition in the same AND group.
  - title: How often does it fire?
    details: >-
      Often. On BTC/USDT it marks about one candle in five, on 1h and on 4h
      alike, so 1h gives about four times as many signals as 4h over the same
      stretch of chart.
  - title: Can I use it to close a deal?
    details: >-
      Yes. Set the take profit or stop loss type to Indicators and pick
      Engulfing Candle with Trigger candle Bearish for a long bot. It closes
      the deal on the first bearish engulfing candle after the entry.
related:
  - long-wick-detector
  - support-resistance-indicator
  - rsi
sources:
  - title: Steve Nison, Japanese Candlestick Charting Techniques (1991), via Investopedia, Engulfing Pattern
    url: https://www.investopedia.com/terms/e/engulfingpattern.asp
  - title: Fidelity, Technical Indicator Guide, Engulfing Pattern
    url: https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide/engulfing-pattern
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

The Engulfing Candle indicator marks a candle whose body opens beyond the previous candle's body and closes past its open, swallowing it. Traders use a bullish engulfing at a low to start a deal and a bearish engulfing under a high to close one.

## What is an Engulfing Candle

The engulfing pattern is one of the Japanese candlestick reversal patterns that Steve Nison brought to Western traders in 1991. A bullish engulfing is a down candle followed by an up candle whose body covers it; a bearish engulfing is the reverse.

Gainium's rule, checked on each closed candle against the one before it:

- **Bullish engulfing:** open ≤ previous close, open < previous open, and close > previous open.
- **Bearish engulfing:** open ≥ previous close, open > previous open, and close < previous open.

Only the open and close are compared, so wicks and volume play no part. The rule also has no trend check: a bullish engulfing in the middle of a range fires the same as one at a low. The signal is true on the candle that completes the pattern.

On the bot chart, bullish engulfing candles are painted blue and bearish engulfing candles purple.

![Gainium bot chart, BTC/USDT 4h, with the Engulfing candle detector: bullish engulfing candles painted blue and bearish engulfing candles painted purple among the normal green and red candles](https://content.gainium.io/images/content/indicators/engulfing-candle__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Trigger candle | Both | Which pattern fires: Bullish, Bearish or Both. |
| Interval | 1 hour | The candle size the indicator is calculated on, from 1 minute to 1 week. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** Trigger candle Both fires on about one candle in five. On BTC/USDT it is true on about 20% of 1h candles and of 4h candles alike, so use it with a filter, not alone.

**Tip:** pick one side for an entry. Bullish alone fires on about half of those, roughly one 4h candle in ten.

## Trading setups for bots

### Bullish engulfing at a 4h low

- **Entry:** Deal start condition Engulfing Candle, Trigger candle **Bullish**, 4 hours, in an AND group with RSI(14) on 4 hours **Lower than 40** and Keep true 2. The RSI condition keeps the pattern to dips.
- **Exit:** take profit 2%, stop loss under the engulfing candle's low, about 1.5–2% on BTC 4h.
- **Settings:** Engulfing Keep true 0; the RSI's Keep true 2 lets the RSI dip happen up to two bars before the pattern.
- **Timeframe:** 4h. On 1h the pattern prints about four times as often over the same stretch of chart, and most of those mean nothing.
- **When it fails:** in a downtrend. At the second marked candle in the chart below, a bullish engulfing came after a 4% fall, and price traded under the candle's low within about 18 bars.

![Annotated Gainium bot chart, BTC/USDT 4h: a bullish engulfing at the low followed by about 2.5% over the next 18 bars, and a later one with little follow-through](https://content.gainium.io/images/content/indicators/engulfing-candle__bullish-at-low.webp)

### Bearish engulfing as the exit

- **Entry:** any long entry.
- **Exit:** close condition Engulfing Candle, Trigger candle **Bearish**, 1 hour.
- **Settings:** Keep true 0. Leave the take profit at 3% or wider so the pattern does the exit.
- **Timeframe:** 1h exits on a 1h or 4h long.
- **When it fails:** in a steady uptrend. One-bar pullbacks print bearish engulfing candles, and the bot exits early. On 1h bars the pattern is true on about one candle in five.

![Annotated Gainium bot chart, BTC/USDT 1h: a purple bearish engulfing candle under the 84,800 top that closes the long, with many other blue and purple engulfing candles on the same chart](https://content.gainium.io/images/content/indicators/engulfing-candle__bearish-exit.webp)

## Using Engulfing Candle in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or the take profit or stop loss type for an exit.
3. Click **Edit**, then **Change indicator**, and pick **Engulfing Candle** from the Chart category.

![Engulfing Candle settings card in the Gainium bot form with Trigger candle Bullish ringed, Interval 4 hours, Keep true 0](https://content.gainium.io/images/content/indicators/engulfing-candle__settings.webp)

The fields and their defaults:

- **Trigger candle:** Both. Bullish fires only on bullish engulfing candles, Bearish only on bearish ones.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Keep true:** 0 extra bars. Raise it to 1–3 when the pattern shares an AND group with a slower condition.

**Example configuration** (the 4h low above): Deal start condition Indicators, Engulfing Candle with Trigger candle Bullish, Interval 4 hours, Keep true 0, AND RSI with Length 14, Interval 4 hours, Condition Lower than, Value 40, Keep true 2. Take profit 2%, stop loss 2%.

## Related indicators

- [Long Wick Detector](https://gainium.io/indicators/long-wick-detector): the other single-candle rejection signal, measured against ATR.
- [Support and Resistance](https://gainium.io/indicators/support-resistance-indicator): gives the pattern a level to form at.
- [RSI](https://gainium.io/indicators/rsi): keeps bullish engulfing entries to oversold dips.

## FAQ

### What exact rule does Gainium use for a bullish engulfing candle?

The candle opens at or below the previous candle's close, opens below the previous candle's open, and closes above the previous candle's open. Only the bodies count; wicks are ignored. A bearish engulfing is the mirror: open at or above the previous close, above the previous open, and a close below the previous open.

### Does the indicator check the trend before the pattern?

No. It fires on any candle that matches the rule, in a trend or in a range. Add the trend or the level yourself, for example with a support level or an RSI condition in the same AND group.

### How often does it fire?

Often. On BTC/USDT it marks about one candle in five, on 1h and on 4h alike, so 1h gives about four times as many signals as 4h over the same stretch of chart.

### Can I use it to close a deal?

Yes. Set the take profit or stop loss type to Indicators and pick Engulfing Candle with Trigger candle Bearish for a long bot. It closes the deal on the first bearish engulfing candle after the entry.
