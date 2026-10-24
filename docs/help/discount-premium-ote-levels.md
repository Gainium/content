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
updatedAt: '2026-10-24T12:00:00.000Z'
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
tldr: >-
  Discount/Premium OTE Levels finds the latest valid price leg between a swing
  low and a swing high and splits it into Fibonacci retracement levels. Your
  bot can act when the price crosses, or is above or below, one of those
  levels — for example, buy when price falls into the OTE zone (0.705) of an
  up-move.
---

The **Discount/Premium OTE Levels** indicator measures the most recent meaningful price swing — a *leg* — and divides it into Fibonacci retracement levels. It comes from the "smart money" way of reading a chart: after a strong move, price often pulls back before continuing, and traders look to enter during that pullback rather than chasing the move.

Three ideas sit at the core of it:

- **Equilibrium (0.5)** — the midpoint of the leg.
- **Discount and premium** — in an up-move, prices below the midpoint are at a *discount* (a better place to buy), prices above it at a *premium*. In a down-move it is the other way around: the upper half is where sellers get the better price.
- **Optimal trade entry (OTE)** — the deep pullback zone between the **0.618** and **0.79** retracements, with **0.705** as its "sweet spot". Many traders treat this zone as the highest-probability place to join the trend.

The indicator is based on the popular "Discount/Premium OTE Levels" TradingView script and follows its swing and leg logic.

![The indicator picker searched for "OTE": Discount/Premium OTE Levels in the Chart category](https://content.gainium.io/images/content/help/discount-premium-ote-levels__picker.webp)

## How the Indicator Works

### Swings

A **swing high** is a candle whose high is the highest of at least **Swing sensitivity** candles to its left; a **swing low** is the lowest low over the same window. A swing is confirmed one candle after it prints, once the next candle fails to exceed it.

### Legs

A **leg** connects a swing low and a swing high:

- A **bullish leg** runs from a swing low **up** to a later swing high.
- A **bearish leg** runs from a swing high **down** to a later swing low.

Each time a new swing is confirmed, the indicator looks back for the most recent opposite swing that is far enough away — at least **Minimum leg size** percent of the leg's low. If it finds one, that becomes the new leg. Small wiggles that don't reach the minimum size are ignored.

When price later trades **above the high** or **below the low** of the latest leg, that leg is broken. The indicator then rebuilds it from the swings that are still valid, the same way the original script does, so the levels always describe a leg that price has not yet run through.

### Levels

The leg is divided into retracement levels, measured from the **end** of the leg back towards its **origin**:

| Level | Bullish leg (low → high) | Bearish leg (high → low) |
|---|---|---|
| **0** | the swing high (leg end) | the swing low (leg end) |
| **0.5** | the midpoint — equilibrium | the midpoint — equilibrium |
| **0.618 – 0.79** | OTE zone, in the discount half | OTE zone, in the premium half |
| **1** | the swing low (leg origin) | the swing high (leg origin) |

So a level of **0.705** in a bullish leg is the price 70.5% of the way back down the up-move — the classic place to look for a long entry.

## How to Configure the Indicator in Gainium

### Step 1: Add the Indicator

In your bot's settings, open the deal start (or another indicator section), choose **Indicators** as the condition, and pick **Discount/Premium OTE Levels** from the **Chart** category. Searching for "OTE" finds it quickly.

### Step 2: Configure the Settings

![Discount/Premium OTE Levels settings in the bot form: Interval 1 hour, Swing sensitivity 10 bars, Minimum leg size 1 %, Leg Bullish, Level 0.705, Condition Price crossing down](https://content.gainium.io/images/content/help/discount-premium-ote-levels__settings.webp)

- **Interval** — the candle timeframe the legs are built on (default: 1 hour).
- **Swing sensitivity** — how many candles to the left a swing high or low must dominate (default **10**). Higher values find fewer, more significant swings; lower values react to smaller swings.
- **Minimum leg size** — the smallest move, in percent of the leg's low, that counts as a leg (default **1%**). Raise it on higher timeframes or volatile coins so only meaningful moves create levels.
- **Leg** — which leg direction the condition reads: **Bullish**, **Bearish** or **Any** (default Bullish). Only the latest leg is ever used; if it points the other way, the condition stays false.
- **Level** — the retracement level the price is compared with, from 0 (leg end) to 1 (leg origin). Default **0.705**, the OTE sweet spot. Use **0.618** or **0.79** for the edges of the OTE zone, or **0.5** for equilibrium.
- **Condition** — how the price is compared with the level:
  - **Price crossing down** (default) — the candle closes at or below the level after closing above it on the previous candle.
  - **Price crossing up** — the candle closes at or above the level after closing below it.
  - **Price greater than** / **Price lower than** — the close is above / below the level.

  A crossing only counts when both candles belong to the **same leg**. When a new leg forms, every level moves at once, and that jump is not treated as price crossing a level.
- **Keep true** — how many candles the signal stays valid after it fires, like on any other indicator.

## Reading the Indicator on the Chart

![BTC/USDT 1h chart with OTE Levels: horizontal level lines for each leg, discount levels in green, premium levels in red, the 0, 0.5 and 1 levels in grey](https://content.gainium.io/images/content/help/discount-premium-ote-levels__chart.webp)

On the bot's chart, the indicator draws one horizontal line per level of the **latest leg**:

- **Grey** — the leg's ends (**0** and **1**) and the equilibrium (**0.5**).
- **Green** — the discount side: the retracement levels beyond 0.5, where an entry in the direction of the leg gets the better price (the lower half of a bullish leg, the upper half of a bearish one).
- **Red** — the premium side.

The lines start on the candle where the leg is confirmed and continue until a new leg replaces it, with a one-candle gap at each change, so you can see how the levels moved over time. The price scale shows the current leg's levels.

> **How this differs from the TradingView script:** the original draws each leg as a set of lines across the leg itself, with price labels, and can show several legs at once. Gainium's chart draws the levels of the latest leg as continuous lines from the moment it is confirmed — the leg your bot is actually trading against. The **Minimum leg size** is a percentage rather than a number of price points, so one setting works for every pair whatever its price.

## Using the Indicator in Bot Trading

### Strategy 1: Buy the OTE Pullback

Enter long when price retraces into the OTE zone of an up-move.

- **Leg**: Bullish · **Level**: 0.705 · **Condition**: Price crossing down
- Add a trend filter, such as price above a 200-period moving average on a higher timeframe, so the bot only buys pullbacks in an uptrend.
- Use the leg's origin (level **1**) as a natural invalidation point: if price closes below it, the leg is broken.

### Strategy 2: Sell Rallies into Premium

For short bots, enter when price rallies into the OTE zone of a down-move.

- **Leg**: Bearish · **Level**: 0.705 · **Condition**: Price crossing up

### Strategy 3: Only Buy at a Discount

Use the indicator as a filter rather than a trigger: combine it with your usual entry indicator in an **AND** group so the bot only buys when price is in the discount half of the latest up-move.

- **Leg**: Bullish · **Level**: 0.5 · **Condition**: Price lower than

### Strategy 4: Higher-Timeframe Zones, Lower-Timeframe Entries

Set the indicator on the **4h** or **1d** interval with a larger **Minimum leg size** (for example 3–5%) to find major legs, and time the entry with faster indicators — RSI, Stochastic or a moving-average cross — on the **15m** or **1h** interval.

## Practical Considerations

### 1. Tune the Minimum Leg Size to the Market
The right minimum depends on the coin and the timeframe. On a 1-hour BTC chart, 1% picks up most tradable swings; on a daily chart or a volatile altcoin, 3–10% keeps the levels anchored to significant moves. Too small and the leg changes constantly; too large and there may be no valid leg at all.

### 2. Swing Sensitivity Controls the Rhythm
A higher Swing sensitivity means swings need to stand out against more candles, which produces fewer, longer-lived legs. Lower values react faster but replace the leg more often.

### 3. Levels Move When the Leg Changes
The levels belong to one leg. A new swing or a broken leg moves them, which is why crossings are only counted within a leg. Backtest your settings to see how often the leg changes on your pair and timeframe.

### 4. Combine with Confirmation
A retracement level is a place where price *may* react, not a guarantee that it will. Pair the indicator with trend, momentum or [market structure](https://gainium.io/help/market-structure) confirmation, and backtest across trending and ranging periods before going live.

## Conclusion

The **Discount/Premium OTE Levels** indicator turns a classic discretionary technique — waiting for a pullback into the optimal trade entry zone of the latest swing — into a rule your bot can follow. Choose the leg direction, the retracement level and how the price should interact with it, and combine it with a trend filter and sound risk management to trade pullbacks systematically.
