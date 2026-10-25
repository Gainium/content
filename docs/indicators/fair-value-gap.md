---
id: 129
name: Fair Value Gap (FVG) Indicator
slug: fair-value-gap
description: >-
  Learn how to use the Fair Value Gap indicator in Gainium for automated
  trading, leveraging Smart Money Concepts to identify institutional price
  imbalances and build effective bot trading strategies.
createdAt: '2025-10-10T12:55:00.000Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2025-10-10T12:55:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
  - smart-money-concepts
ingested: false
ingestedAt: ''
templateVersion: 2
tldr: >-
  A fair value gap (FVG) is a three-candle pattern where the third candle's
  low stays above the first candle's high (bullish) or its high stays below
  the first candle's low (bearish), leaving a price range the middle candle
  crossed without overlap. Gainium only counts a gap when the middle candle's
  body is more than twice the average body of the last 1,000 candles, and it
  keeps each gap active for 10 bars. A bot condition compares the close with
  the gap's high, low or middle; the default is Bullish, Middle, Crossing
  down, on 1-hour candles.
kind: native
catalogKeys:
  - OBFVG
category: structure
aliases:
  - "FVG"
  - "Fair Value Gap"
  - "Fair Value Gaps"
  - "Imbalance"
faq:
  - title: How does Gainium detect a fair value gap?
    details: >-
      On three candles. For a bullish gap, the third candle's low is above the
      first candle's high, the middle candle closed above that high, and the
      middle candle's body is more than twice the average body size of the
      last 1,000 candles. The gap runs from the first candle's high to the
      third candle's low. Bearish gaps are the mirror image.
  - title: How long does a gap stay on the chart?
    details: >-
      10 bars after it forms. After that the gap is cleared whether price
      came back to it or not, and the condition has no level to compare. No
      new gap is recorded while one is active.
  - title: Which value should I trade, high, low or middle?
    details: >-
      Middle for pullback entries: it is reached more often than the far edge
      and less often than the near edge. In a bullish gap, High is the top
      edge (the third candle's low) and Low is the bottom edge (the first
      candle's high).
  - title: Why did my FVG condition never fire?
    details: >-
      Usually because price did not reach the level within the 10 bars the
      gap is active, or because no candle passed the body-size filter. Strong
      trends leave gaps that price never revisits. A lower interval finds more
      gaps but each lasts 10 shorter bars.
related:
  - market-structure
  - discount-premium-ote-levels
  - long-wick-detector
sources:
  - title: Babypips, Fair Value Gaps
    url: https://www.babypips.com/learn/forex/fair-value-gaps
  - title: LuxAlgo, Smart Money Concepts (SMC), TradingView script (fair value gaps with an auto threshold)
    url: https://www.tradingview.com/script/CnB3fSph-Smart-Money-Concepts-SMC-LuxAlgo/
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

A fair value gap (FVG) is the price range a fast candle leaves when the candles on either side of it do not overlap. Traders buy the pullback into a bullish gap and sell the rally into a bearish one, expecting price to react at the gap and continue in the direction that created it.

## What is a Fair Value Gap

The fair value gap comes from smart money concepts (SMC), where it is read as an imbalance: one side traded so hard that the middle candle skipped a range of prices. Gainium reads it on three closed candles:

- **Bullish FVG:** the third candle's low is above the first candle's high, and the middle candle closed above that high. The gap runs from the first candle's high (**Low**) to the third candle's low (**High**).
- **Bearish FVG:** the third candle's high is below the first candle's low, and the middle candle closed below it. The gap runs from the third candle's high (**Low**) to the first candle's low (**High**).
- **Middle:** halfway between High and Low.

Two rules filter the gaps:

- **Size:** the middle candle's body, as a percentage of its open, must be more than twice the average absolute body of the last 1,000 candles. Small gaps in quiet markets do not count.
- **Life:** a gap stays active for 10 bars, then it is cleared. While one gap is active, no new gap is recorded.

On the bot chart a gap is drawn as two solid lines at High and Low and a dotted line at Middle, for its 10 bars. The condition compares the candle close with the chosen line, so it can only fire inside that window.

![Gainium bot chart, BTC/USDT 4h, with Fair Value Gaps: three short purple gap lines, each with a dotted middle line, lasting 10 bars](https://content.gainium.io/images/content/indicators/fair-value-gap__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Interval | 1 hour | The candle size the indicator is calculated on, from 1 minute to 1 week. |
| Condition | Crossing down | How the close is compared with the gap line. A crossing needs the gap active on both candles; Greater than and Lower than read the latest close. |
| Section | Bullish | Which gaps are read: Bullish, Bearish or Any. |
| Value | Middle | The gap line: High (top edge), Middle or Low (bottom edge). |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** there is no size setting. A gap counts only when the middle candle's body is more than twice the average body of the last 1,000 candles, and it stays active for 10 bars. On BTC/USDT, 1h candles find about four times as many gaps as 4h. A little over half of the 1h gaps are bullish, and a little under half of the 4h ones.

**Tip:** Value decides how deep the pullback must go. On BTC/USDT 1h, a bullish gap with Crossing down fires nearly twice as often at High as at Low, with Middle in between.

**Tip:** Greater than and Lower than are false whenever no gap is active. On BTC/USDT 1h a gap is active on about 38% of candles, so as a filter the condition blocks most bars.

## Trading setups for bots

### Buy the dip to the middle of a bullish gap

- **Entry:** Deal start condition Fair Value Gaps (FVG), Section **Bullish**, Value **Middle**, Condition **Crossing down**, 4 hours. The deal opens on the close that dips through the middle of a fresh gap.
- **Exit:** take profit 1.5% and a stop loss of 1%. A close under the gap's Low means the gap failed.
- **Settings:** Keep true 0. Pair it in an AND group with [Market Structure](https://gainium.io/indicators/market-structure) on Market Based, Bullish Market Structure, so it only buys gaps in an uptrend.
- **Timeframe:** 4h. Both intervals keep a gap for 10 bars, so a 4h gap waits four times longer for the pullback than a 1h gap.
- **When it fails:** when the next move is down. At the second gap in the chart below, price closed straight through the middle and kept falling.

![Annotated Gainium bot chart, BTC/USDT 4h: a bullish gap where price dips to the middle and holds, then rises about 1.5%, and a later gap that price closes through](https://content.gainium.io/images/content/indicators/fair-value-gap__middle-retest.webp)

### Above a fresh bullish gap as a trend filter

- **Entry:** your usual entry indicator in an AND group with Fair Value Gaps (FVG), Section **Bullish**, Value **High**, Condition **Greater than**, 1 hour. The filter is true while price holds above the top of a gap that formed in the last 10 bars.
- **Exit:** the bot's normal take profit.
- **Settings:** Keep true 0. Raise Keep true to 2–3 if the other indicator needs a few bars to agree.
- **Timeframe:** 1h, so the filter is a 10-bar window after a strong up-candle.
- **When it fails:** after a blow-off. A strong candle at the end of a rally also makes a bullish gap, and the filter says yes at the top.

![Annotated Gainium bot chart, BTC/USDT 1h: a fresh bullish gap and the candles that close above its High while it is active, where Greater than High is true](https://content.gainium.io/images/content/indicators/fair-value-gap__above-gap.webp)

## Using Fair Value Gap in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or the take profit or stop loss type for an exit.
3. Click **Edit**, then **Change indicator**, and pick **Fair Value Gaps (FVG)** from the Chart category.

![Fair Value Gaps (FVG) settings card in the Gainium bot form with Section Bullish and Value Middle ringed, Interval 1 hour, Condition Crossing down, Keep true 0](https://content.gainium.io/images/content/indicators/fair-value-gap__settings.webp)

The fields and their defaults:

- **Interval:** 1 hour, from 1 minute to 1 week.
- **Condition:** Crossing down. Crossing down fires when the close goes from above the line to at or below it; Crossing up is the reverse. Greater than and Lower than test the latest close only.
- **Section:** Bullish. Bearish reads bearish gaps; Any reads whichever gap is active.
- **Value:** Middle. High is the gap's top edge, Low its bottom edge.
- **Keep true:** 0 extra bars.

To use two timeframes, add two Fair Value Gaps conditions in one AND group, for example a 4h gap with Lower than High (price inside or under the 4h gap) and a 15m gap with Crossing up Middle.

**Example configuration** (the dip-buy above): Deal start condition Indicators, Fair Value Gaps (FVG) with Interval 4 hours, Condition Crossing down, Section Bullish, Value Middle, Keep true 0. Take profit 1.5%, stop loss 1%.

## Related indicators

- [Market Structure](https://gainium.io/indicators/market-structure): a BOS often leaves a gap behind it; the structure says which gaps to trade.
- [Discount/Premium OTE Levels](https://gainium.io/indicators/discount-premium-ote-levels): a gap inside the OTE zone of the leg is a tighter entry.
- [Long Wick Detector](https://gainium.io/indicators/long-wick-detector): another single-candle footprint, from rejection wicks rather than fast bodies.
