---
id: 1051
name: Discount/Premium OTE Levels Indicator
slug: discount-premium-ote-levels
description: >-
  Learn how to use the Discount/Premium OTE Levels indicator in Gainium to
  trade Fibonacci retracements of the latest swing leg: the discount and
  premium zones around the 0.5 equilibrium and the optimal trade entry (OTE)
  zone around 0.618–0.79.
createdAt: '2026-10-24T12:00:00.000Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2026-10-24T12:00:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
  - smart-money-concepts
  - fibonacci
ingested: false
ingestedAt: ''
templateVersion: 2
tldr: >-
  Discount/Premium OTE Levels finds the latest valid price leg between a swing
  low and a swing high and splits it into Fibonacci retracement levels: 0 at
  the end of the leg, 0.5 at the midpoint (equilibrium), 1 at its origin, and
  the optimal trade entry (OTE) zone between 0.618 and 0.79. Your bot acts
  when the close crosses, or is above or below, one of those levels. The
  default buys when price falls through 0.705 of a bullish leg on 1-hour
  candles.
kind: native
catalogKeys:
  - OTE
category: structure
aliases:
  - "OTE"
  - "OTE Levels"
  - "Optimal Trade Entry"
  - "Discount/Premium Zones"
faq:
  - title: What is the OTE zone?
    details: >-
      The retracement between 0.618 and 0.79 of the latest leg, with 0.705 at
      its middle. In a bullish leg it is 61.8–79% of the way back down the
      up-move, in the discount half. Gainium's default Level is 0.705.
  - title: Why does a crossing not fire when the leg changes?
    details: >-
      A crossing only counts when both candles belong to the same leg. When a
      new leg forms, every level moves at once, and that jump is not treated
      as price crossing a level.
  - title: What Minimum leg size should I use?
    details: >-
      1% picks up most tradable swings on a 1-hour BTC chart. On a daily
      chart or a volatile altcoin, 3–10% keeps the levels on significant
      moves. Too small and the leg changes constantly; too large and there
      may be no valid leg at all.
  - title: How is it different from the TradingView script?
    details: >-
      The original draws each leg with price labels and can show several
      legs at once. Gainium draws the levels of the latest leg as continuous
      lines from the moment it is confirmed. Minimum leg size is a percentage
      of the leg's low rather than price points, so one setting works for any
      pair.
related:
  - market-structure
  - fair-value-gap
  - support-resistance-indicator
sources:
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

Discount/Premium OTE Levels measures the latest swing leg and splits it into Fibonacci retracement levels, from 0 at the end of the leg to 1 at its origin. Traders use it to buy a pullback into the optimal trade entry (OTE) zone of an up-move, between 0.618 and 0.79, instead of chasing the move.

## What is Discount/Premium OTE Levels

The indicator comes from the smart-money way of reading a chart, and Gainium's version follows the swing and leg logic of the "Discount/Premium OTE Levels" TradingView script. Three ideas sit at its core:

- **Equilibrium (0.5):** the midpoint of the leg.
- **Discount and premium:** in an up-move, prices below the midpoint are at a discount (the better place to buy) and prices above it at a premium. In a down-move it is the other way round: the upper half is where sellers get the better price.
- **Optimal trade entry (OTE):** the deep pullback zone between 0.618 and 0.79, with 0.705 at its middle.

How the leg is built:

- **Swings:** a swing high is a candle whose high is the highest of at least **Swing sensitivity** candles to its left; a swing low is the lowest low over the same window. A swing is confirmed one candle after it prints.
- **Legs:** a bullish leg runs from a swing low up to a later swing high, a bearish leg from a swing high down to a later swing low. Each time a swing is confirmed, the indicator looks back for the most recent opposite swing at least **Minimum leg size** percent of the leg's low away. Smaller wiggles are ignored.
- **Breaks:** when price trades above the high or below the low of the latest leg, that leg is broken and rebuilt from the swings that are still valid.

The levels are measured from the end of the leg back towards its origin:

| Level | Bullish leg (low → high) | Bearish leg (high → low) |
|---|---|---|
| 0 | the swing high (leg end) | the swing low (leg end) |
| 0.5 | the midpoint, equilibrium | the midpoint, equilibrium |
| 0.618–0.79 | OTE zone, in the discount half | OTE zone, in the premium half |
| 1 | the swing low (leg origin) | the swing high (leg origin) |

A level of 0.705 in a bullish leg is the price 70.5% of the way back down the up-move.

On the bot chart the indicator draws one line per level of the latest leg. Grey lines are the ends (0 and 1) and equilibrium (0.5). Green lines are the discount side, where an entry in the direction of the leg gets the better price: the lower half of a bullish leg, the upper half of a bearish one. Red lines are the premium side. The lines start on the candle where the leg is confirmed and run until a new leg replaces it, with a one-candle gap at each change.

![Gainium bot chart, BTC/USDT 4h, OTE Levels with Leg Bearish: grey lines at each leg's 0, 0.5 and 1, green discount and red premium level lines, stepping to a new leg at each change](https://content.gainium.io/images/content/indicators/discount-premium-ote-levels__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Interval | 1 hour | The candles the swings and legs are built on, from 1 minute to 1 week. |
| Swing sensitivity | 10 | A swing high or low must be the highest or lowest point of at least this many bars to its left. It is confirmed one bar after it prints. |
| Minimum leg size | 1 | A move between a swing low and a swing high counts as a leg only when it is at least this many percent of its low. |
| Leg | Bullish | Bullish legs run from a swing low up to a swing high, bearish legs from a swing high down to a swing low. Only the latest leg is read. |
| Condition | Price crossing down | Crossing compares the close with the level on two candles of the same leg; a new leg moving the level is not a crossing. |
| Level | 0.705 | Retracement of the leg the price is compared with: 0 is the end of the leg, 1 its origin, 0.5 the equilibrium. 0.618–0.79 is the OTE zone. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** Swing sensitivity 20 keeps only the larger legs. On BTC/USDT 1h, Price crossing down 0.705 in a bullish leg fires nearly twice as often with 10 as with 20.

**Tip:** Minimum leg size has most effect on short intervals. Raising it from 1% to 3% halves the same signal on BTC/USDT 1h, but cuts it by only about a third on 4h, where most legs are already larger than 3%.

## Trading setups for bots

### Buy the OTE pullback of an up-leg

- **Entry:** Deal start condition OTE Levels, Leg **Bullish**, Level **0.705**, Condition **Price crossing down**, 1 hour. The deal opens on the close that falls through 0.705 after closing above it.
- **Exit:** take profit 2%. From 0.705 the leg's high (level 0) is 70.5% of the leg away, about 2.8% on a 4% leg. Put the stop loss under the leg's origin (level 1): a close below it breaks the leg.
- **Settings:** Swing sensitivity 10, Minimum leg size 1%. Add a trend filter, such as price above a 200-period moving average on 4h, so the bot only buys pullbacks in an uptrend. For short bots, mirror it: Leg Bearish, Price crossing up.
- **Timeframe:** 1h entries. For a 4h or 1d leg, raise Minimum leg size to 3–5%.
- **When it fails:** in a reversal. In the chart below, the close fell through 0.705 and a few bars later kept going under the leg's origin.

![Annotated Gainium bot chart, BTC/USDT 1h: the close below 0.705 of the up-leg where Price crossing down fires, and the close below level 1 a few bars later that breaks the leg](https://content.gainium.io/images/content/indicators/discount-premium-ote-levels__ote-pullback.webp)

### Only buy at a discount

- **Entry:** your usual entry indicator in an AND group with OTE Levels, Leg **Bullish**, Level **0.5**, Condition **Price lower than**. The bot only buys while price sits in the discount half of the latest up-leg.
- **Exit:** the bot's normal take profit.
- **Settings:** Swing sensitivity 10, Minimum leg size 3%, Interval 4 hours, so the leg is a major move.
- **Timeframe:** 4h legs with 15m or 1h entry indicators.
- **When it fails:** when the leg breaks. If the latest leg turns bearish, a Bullish condition stays false and the bot stops buying, even at prices that look cheap.

![Annotated Gainium bot chart, BTC/USDT 4h: the box at the right edge where price is in the discount half of the 79,750 to 84,880 up-leg and Price lower than 0.5 is true](https://content.gainium.io/images/content/indicators/discount-premium-ote-levels__discount-filter.webp)

## Using Discount/Premium OTE Levels in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or another indicator section.
3. Click **Edit**, then **Change indicator**, and pick **Discount/Premium OTE Levels** from the Chart category. Searching for "OTE" finds it.

![Discount/Premium OTE Levels settings card in the Gainium bot form with Minimum leg size 1% and Level 0.705 ringed, Interval 1 hour, Swing sensitivity 10 bars, Leg Bullish, Condition Price crossing down, Keep true 0](https://content.gainium.io/images/content/indicators/discount-premium-ote-levels__settings.webp)

The fields and their defaults:

- **Interval:** 1 hour, the candles the legs are built on.
- **Swing sensitivity:** 10 bars, from 1 to 500. Higher values find fewer, more significant swings.
- **Minimum leg size:** 1%, from 0.01 to 100, as a percentage of the leg's low.
- **Leg:** Bullish. Bearish or Any. Only the latest leg is read; if it points the other way, the condition stays false.
- **Condition:** Price crossing down. Price crossing down fires when the close is at or below the level after closing above it on the previous candle. Price crossing up is the reverse. Price greater than and Price lower than test the latest close. A crossing counts only when both candles belong to the same leg.
- **Level:** 0.705, from 0 (leg end) to 1 (leg origin). Use 0.618 or 0.79 for the edges of the OTE zone, 0.5 for equilibrium.
- **Keep true:** 0 extra bars.

**Example configuration** (the OTE pullback above): Deal start condition Indicators, Discount/Premium OTE Levels with Interval 1 hour, Swing sensitivity 10, Minimum leg size 1%, Leg Bullish, Condition Price crossing down, Level 0.705, Keep true 0. Take profit 2%, stop loss under the leg's origin.

## Related indicators

- [Market Structure](https://gainium.io/indicators/market-structure): a BOS extends the leg these levels are drawn on.
- [Fair Value Gap](https://gainium.io/indicators/fair-value-gap): a gap inside the OTE zone narrows the entry.
- [Support and Resistance](https://gainium.io/indicators/support-resistance-indicator): pivot levels to set the stop under instead of the leg's origin.

## FAQ

### What is the OTE zone?

The retracement between 0.618 and 0.79 of the latest leg, with 0.705 at its middle. In a bullish leg it is 61.8–79% of the way back down the up-move, in the discount half. Gainium's default Level is 0.705.

### Why does a crossing not fire when the leg changes?

A crossing only counts when both candles belong to the same leg. When a new leg forms, every level moves at once, and that jump is not treated as price crossing a level.

### What Minimum leg size should I use?

1% picks up most tradable swings on a 1-hour BTC chart. On a daily chart or a volatile altcoin, 3–10% keeps the levels on significant moves. Too small and the leg changes constantly; too large and there may be no valid leg at all.

### How is it different from the TradingView script?

The original draws each leg with price labels and can show several legs at once. Gainium draws the levels of the latest leg as continuous lines from the moment it is confirmed. Minimum leg size is a percentage of the leg's low rather than price points, so one setting works for any pair.
