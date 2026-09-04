---
id: 1041
name: McGinley Dynamic Indicator
slug: mcginley-dynamic
description: >-
  Use the McGinley Dynamic indicator in Gainium for automated trading — a
  self-adjusting moving average that tracks price more closely than a
  fixed-period moving average, with configuration examples and strategies.
createdAt: '2026-09-04T00:00:00.000Z'
updatedAt: '2026-09-04T00:00:00.000Z'
publishedAt: '2026-09-04T00:00:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: false
ingestedAt: ''
tldr: >-
  The McGinley Dynamic is a moving average that adjusts its own speed to
  market speed — it speeds up when price moves quickly and slows down when
  price is flat, tracking price more closely than a fixed-period moving
  average with less whipsaw. In Gainium, it can be used the same way any
  other trend-following moving average is: as a dynamic support/resistance
  reference or a threshold-crossing trigger for bot conditions.
---

The **McGinley Dynamic** is a technical analysis indicator developed by market technician John R. McGinley as an improvement on traditional moving averages. Unlike a simple moving average (SMA) or exponential moving average (EMA), which use a fixed smoothing factor regardless of market conditions, the McGinley Dynamic automatically adjusts its own responsiveness based on how fast price is moving relative to the indicator's current value.

In this article, we'll define the **McGinley Dynamic**, explain how to configure it in Gainium, and demonstrate how to incorporate it into bot trading with practical examples of strategies, including entry and exit rules.

## What Is the McGinley Dynamic?

The **McGinley Dynamic** was designed to solve a common problem with fixed-period moving averages: they lag too much in fast markets and whipsaw too much in slow ones. The McGinley Dynamic addresses this with a self-adjusting formula — its recursive term speeds the average up when price is moving away from it quickly, and slows it down when price is close to it.

### Key Features:
- **Adaptive Speed**: The indicator's own feedback term (comparing the current price to its previous value) determines how quickly it reacts — no separate parameter is needed to tune this the way a smoothing factor is for other adaptive averages.
- **Tighter Tracking**: Because it speeds up during fast moves, the McGinley Dynamic tends to hug price more closely than a fixed-period EMA of the same length, reducing the lag traders often compensate for by shortening the period (at the cost of more noise).
- **Fewer Whipsaws in Flat Markets**: Conversely, in a ranging market the indicator slows down, producing fewer false crossover signals than a fixed-period average would at the same length.

## How to Configure the McGinley Dynamic Indicator in Gainium

Here's how to configure the **McGinley Dynamic** indicator in Gainium.

### Step 1: Add the McGinley Dynamic Indicator
- **Navigate to Bot Settings**: Log into Gainium, go to your bot, and add **McGinley Dynamic** from the list of available indicators (Trend category).

### Step 2: Configure the Indicator Settings
- **Length (14)**: This setting determines the period used in the indicator's adaptive formula. The default is **14**, a common starting point shared with many moving-average-family indicators. A shorter length makes the average track price even more tightly; a longer length smooths more.
- **Interval (1 hour)**: This determines the timeframe of each candlestick used in the calculation. Adjust this depending on whether you're trading shorter or longer timeframes.
- **Condition (Crossing Down)**: The condition determines when the bot will take action — for example, **Crossing Down** triggers when the indicator's value crosses down through the configured **Value**.
- **Value (0)**: The threshold the bot compares the indicator's value against. Since the McGinley Dynamic tracks price directly (it's a moving average expressed in the asset's own price terms, not a bounded oscillator), most strategies use it as a **crossing-with-price** style signal rather than a fixed numeric threshold — see the strategies below.
- **Keep True (0)**: Controls how long the condition remains true after it's met. A value of **0** means the condition resets immediately after the trigger.

## Using McGinley Dynamic in Bot Trading

Here are two example strategies that incorporate the **McGinley Dynamic** into automated bot trading.

### Strategy 1: Trend-Following Crossover

Use the McGinley Dynamic the way you would any trend-following moving average — as a dynamic reference line.

#### Entry Rules
- **Long Entry (Buy)**: Enter a long position when price is trading above the McGinley Dynamic and the indicator itself is rising, indicating an established uptrend with less lag than a comparable fixed-period average would show.
- **Short Entry (Sell)**: Enter a short position when price is trading below the McGinley Dynamic and the indicator is falling.

#### Exit Rules
- **Long Exit**: Exit when price closes back below the McGinley Dynamic — because the indicator speeds up in fast moves, this tends to happen closer to the actual trend change than with a slower fixed-period average.
- **Short Exit**: Exit when price closes back above the McGinley Dynamic.

#### Implementation in Gainium
- Set **Length** to **14** on a **1h** or **4h** interval for swing trading, or shorten it for more active strategies.
- Combine with a volume or momentum indicator (e.g., RSI) to filter entries to periods of genuine trend strength rather than every crossover.

### Strategy 2: Dual McGinley Dynamic Crossover

Run two McGinley Dynamic indicators at different lengths and trade the crossover between them, similar to a classic dual-moving-average strategy but with less lag on both lines.

#### Entry Rules
- **Long Entry (Buy)**: Enter a long position when the shorter-length McGinley Dynamic crosses above the longer-length one.
- **Short Entry (Sell)**: Enter a short position when the shorter-length McGinley Dynamic crosses below the longer-length one.

#### Exit Rules
- **Long Exit**: Exit when the crossover reverses (short crosses back below long).
- **Short Exit**: Exit when the crossover reverses (short crosses back above long).

#### Implementation in Gainium
- Add two McGinley Dynamic indicators to the same bot — one with a shorter **Length** (e.g., 9) and one with a longer **Length** (e.g., 21) — and use a crossing condition between the two indicator UUIDs.
- Because both lines adapt to market speed, this pairing tends to produce cleaner signals in choppy conditions than two fixed-period moving averages of the same lengths.

## Practical Considerations

When using the **McGinley Dynamic** in your trading strategy, keep the following in mind:

### 1. It's a Price-Scale Indicator
Like an EMA or SMA, the McGinley Dynamic is expressed in the asset's own price units and overlays directly on the price chart — it isn't a bounded oscillator like RSI. Most useful signals come from comparing it to price or to another moving average, not to a fixed numeric threshold.

### 2. Shorter Lengths Amplify the Adaptive Effect
Because the adaptive term reacts to how far price has moved from the indicator's current value, a shorter length makes the indicator both faster and more sensitive to the adaptive speed-up. Very short lengths can start to resemble price itself in fast-moving markets.

### 3. Combine with Trend or Volume Confirmation
Like any moving average, the McGinley Dynamic doesn't distinguish a genuine trend from a temporary spike. Pairing it with a volume or momentum indicator helps filter out low-conviction crossovers.

### 4. Backtest Thoroughly
Always backtest your McGinley Dynamic-based strategies across different market conditions. Gainium's backtesting feature lets you compare different lengths and confirm the adaptive behavior actually improves on a fixed-period moving average for your specific pair and timeframe.

## Conclusion

The **McGinley Dynamic** is a moving average that does the work of tuning its own responsiveness, tracking price more closely in fast markets and reducing whipsaw in flat ones. Whether used as a single trend reference or paired with a second McGinley Dynamic at a different length, it's a drop-in upgrade path for strategies already built around fixed-period moving averages.
