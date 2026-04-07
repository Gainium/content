---
id: 143
name: Long Wick Detector Indicator
slug: long-wick-detector
description: >-
  Learn how to use the Long Wick Detector indicator in Gainium for automated
  trading, identifying candles with unusually long wicks relative to ATR and
  tracking wick levels until mitigation or expiry.
createdAt: '2026-04-07T12:00:00.000Z'
updatedAt: '2026-04-07T12:00:00.000Z'
publishedAt: '2026-04-07T12:00:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
  - smart-money-concepts
ingested: false
ingestedAt: ''
tldr: >-
  The Long Wick Detector identifies candles whose upper or lower wicks exceed a
  multiple of ATR(200), marking those price levels on the chart. Levels persist
  until price mitigates them (candle body closes through the level) or a
  configurable max duration expires, providing actionable support and resistance
  zones.
---

The **Long Wick Detector** is a chart-based indicator that spots candles with unusually large wicks — a sign that price was aggressively rejected at a certain level. A long upper wick suggests strong selling pressure pushed price back down, while a long lower wick indicates buyers stepped in to defend a level. These rejection points often become meaningful support or resistance zones that price revisits later.

The indicator uses the **Average True Range (ATR)** over 200 periods as a volatility baseline, so it automatically adapts to the current market environment. A wick that would be considered "long" in a quiet market may be normal during a high-volatility event — ATR normalization keeps the signals relevant regardless of conditions.

## How the Long Wick Detector Works

### Detection Logic

On each candle, the indicator calculates the top wick (high minus the top of the body) and the bottom wick (bottom of the body minus the low). If either wick is greater than or equal to **ATR(200) × Wick Threshold**, a new level is created at the candle's high (for a top wick) or low (for a bottom wick).

### Level Tracking

Once detected, a wick level stays on the chart as a horizontal line until one of two things happens:

- **Mitigation** — a subsequent candle's body closes through the level. For a top-wick (bullish) level, mitigation occurs when the body top reaches the level. For a bottom-wick (bearish) level, mitigation occurs when the body bottom reaches the level. Once mitigated, the level is removed.
- **Expiry** — the level has been active for more than **Max Duration** candles without being mitigated. It is then removed automatically.

If a new long wick is detected on the same side while a previous level is still active, the new level replaces the old one.

## How to Configure the Long Wick Detector in Gainium

### Step 1: Add the Indicator

Navigate to your bot settings and select **Long Wick Detector** from the **Chart** category in the indicator list.

### Step 2: Configure the Settings

- **Wick Threshold** — the ATR multiplier that defines what counts as a "long" wick. The default is **2**, meaning the wick must be at least 2× the ATR(200) value. Lower values produce more signals; higher values are more selective. Range: 0.25–100.
- **Max Duration** — how many candles a wick level can remain active before it expires. The default is **1000**. Shorter durations remove stale levels sooner; longer durations let levels persist as potential future reference points. Range: 10–10,000.
- **Value** — which wick type to monitor:
  - **Top wick** — only detect rejection from the top (bearish rejection / potential resistance).
  - **Bottom wick** — only detect rejection from the bottom (bullish rejection / potential support).
  - **Any wick** (default) — detect both.
- **Condition** — when to trigger:
  - **On Start** — the indicator condition is true only on the candle where a new long wick is first detected.
  - **During** (default) — the condition remains true as long as an unmitigated wick level is active.
- **Interval** — the candle timeframe to analyze (default: 1 hour).

## Using the Long Wick Detector in Bot Trading

### Strategy 1: Wick-Level Bounce Trading

Use long-wick levels as dynamic support and resistance for mean-reversion entries.

#### Entry Rules
- **Long Entry**: When a bottom-wick level is active (**During** condition) and price approaches the level, enter a long position expecting a bounce.
- **Short Entry**: When a top-wick level is active and price approaches the level, enter a short position expecting rejection.

#### Implementation in Gainium
- Set **Value** to **Any wick** and **Condition** to **During**.
- Combine with an RSI or Stochastic indicator to confirm oversold/overbought conditions near the wick level.
- Use the wick level itself as a reference for stop-loss placement — a stop just beyond the level protects against a failed bounce.

### Strategy 2: Wick-Level Breakout

Trade the mitigation of a wick level as a breakout signal.

#### Entry Rules
- **Long Entry**: When a top-wick (resistance) level is mitigated — price body closes above it — enter long, expecting continuation.
- **Short Entry**: When a bottom-wick (support) level is mitigated — price body closes below it — enter short.

#### Implementation in Gainium
- Set **Condition** to **On Start** combined with a price-action confirmation indicator (e.g., Engulfing Candle or Market Structure).
- Monitor for the moment a wick level disappears (mitigation), which signals that the rejection zone has been overcome.

### Strategy 3: Multi-Timeframe Wick Analysis

Detect long wicks on a higher timeframe and trade them on a lower timeframe for precision entries.

#### Implementation in Gainium
- Add a Long Wick Detector on the **4h** interval with a threshold of **2** to identify significant rejection levels.
- Add your entry indicators (RSI, MACD, etc.) on the **1h** or **15m** interval.
- The higher-timeframe wick level acts as a directional bias, while the lower-timeframe indicators fine-tune the entry.

## Practical Considerations

### 1. Threshold Tuning
The Wick Threshold is the most important parameter. A value of **2** (2× ATR) is a good starting point for most markets. If you are getting too many signals, increase it to 3 or higher. For very volatile assets, a higher threshold filters out noise.

### 2. Max Duration and Relevance
Very old wick levels lose relevance as market conditions change. A Max Duration of **100–500** candles is a reasonable range for most strategies. Setting it too high may leave stale levels on the chart that no longer represent meaningful rejection zones.

### 3. Combine with Other Indicators
The Long Wick Detector provides levels, not directional signals. Always pair it with trend-following or momentum indicators to determine the direction of your trade. Good companions include Moving Averages, Market Structure, RSI, and Bollinger Bands.

### 4. Backtest Across Market Conditions
Long-wick signals behave differently in trending versus ranging markets. Backtest your strategy across multiple market phases to ensure the threshold and duration settings are robust.

## Conclusion

The **Long Wick Detector** is a versatile indicator that automatically identifies and tracks price levels where the market showed strong rejection. By using ATR-based normalization, it adapts to any volatility environment and provides actionable support and resistance zones. Whether you use these levels for bounce entries, breakout confirmations, or multi-timeframe confluence, combining the Long Wick Detector with sound risk management and complementary indicators can add a valuable edge to your automated trading strategy.
