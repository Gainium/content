---
id: 1047
name: Indicator Smoothing
slug: indicator-smoothing
description: >-
  Smooth an oscillator with a moving average before your bot tests it, or
  trade the oscillator crossing its own moving average.
createdAt: '2026-10-12T00:00:00.000Z'
updatedAt: '2026-10-12T00:00:00.000Z'
publishedAt: '2026-10-12T00:00:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
tldr: >-
  Smoothing applies a moving average (SMA, EMA, WMA, DEMA, TEMA, HMA or RMA) to
  an oscillator such as RSI, CCI or MFI. With Compare set to "Smoothed line vs
  value", every condition, including Between and percentile, tests the smoothed
  line, which filters out noise. With "Line vs smoothed line", the condition
  tests the oscillator against its own moving average, a momentum-turn signal.
  Smoothing set to None behaves exactly as before.
---

Oscillators like the RSI react to every candle, so a single spike can trigger a condition that the next candle cancels. **Smoothing** lets you apply a moving average to the oscillator line before your bot tests it, or use the oscillator crossing its own moving average as the signal.

## Which indicators support smoothing

Smoothing is available on the single-line oscillators:

- [Relative Strength Index (RSI)](https://gainium.io/indicators/rsi)
- [Commodity Channel Index (CCI)](https://gainium.io/indicators/cci)
- [Money Flow Index (MFI)](https://gainium.io/indicators/mfi)
- [Williams %R](https://gainium.io/indicators/williams-r)
- [Ultimate Oscillator](https://gainium.io/indicators/ultimate-oscillator)
- [Momentum](https://gainium.io/indicators/momentum)
- [Awesome Oscillator](https://gainium.io/indicators/awesome-oscillator)
- [Average Directional Index (ADX)](https://gainium.io/indicators/adx)
- [Bollinger Bands %B](https://gainium.io/indicators/bollinger-bands-b)
- [Keltner Channel %B](https://gainium.io/indicators/keltner-channel-b)
- [Bollinger Band Width (BBW)](https://gainium.io/indicators/bbw)
- [Volume Oscillator](https://gainium.io/indicators/volume-oscillator)
- [Moving Average Ratio (MAR)](https://gainium.io/indicators/moving-average-ratio)

Indicators that already have their own signal line (MACD, Stochastic, Stochastic RSI) and price-based indicators don't offer it.

It works wherever you use these indicators: deal start, deal close, DCA and take profit conditions in DCA, Combo, Grid and [Hedge bots](https://gainium.io/help/hedge-bots), the backtester, and indicator conditions in [Automations](https://gainium.io/help/automations).

## The settings

Click **Edit** on the indicator to open its settings. You will find three fields right after Length and Interval:

- **Smoothing**: the moving average to apply — **None** (default), SMA, EMA, WMA, DEMA, TEMA, HMA or RMA. VWMA is not offered, because it needs volume and the oscillator has none.
- **Smoothing length**: the number of candles the moving average covers (default **14**).
- **Compare**: what the condition tests. It appears once smoothing is on.

![RSI with EMA 14 smoothing: Smoothing and Smoothing length side by side, Compare set to Smoothed line vs value, and the condition Lower than 80](https://content.gainium.io/images/content/help/rsi__smoothing-vs-value.webp)

With **Smoothing** set to **None**, the indicator works exactly as it did before.

## The two Compare modes

### Smoothed line vs value

The condition tests the **smoothed line** instead of the raw oscillator. Every condition works as usual — Crossing up, Crossing down, Greater than, Lower than and Between — against the Value you enter. This filters out noise: a one-candle spike moves the smoothed line much less, so the condition fires on sustained moves.

For example, the popular rule "EMA of RSI(14) over 14 candles below 80" is: RSI **Length 14**, **Smoothing EMA**, **Smoothing length 14**, Compare **Smoothed line vs value**, Condition **Lower than**, Value **80**.

### Line vs smoothed line

The condition tests the **oscillator against its own moving average**:

- **Crossing up / Crossing down**: the oscillator crosses above or below its moving average.
- **Greater than / Lower than**: the oscillator is above or below its moving average.

There is no Value to enter, so the Value field is hidden, and **Between** is not offered. A short moving average (for example EMA 9–14) turns this into a timing signal: the oscillator crossing up through its average shows momentum turning up, often earlier than a fixed level would.

![RSI compared with its EMA 9: Compare set to Line vs smoothed line and the condition Crossing up, with no Value field](https://content.gainium.io/images/content/help/rsi__smoothing-line-vs-smoothed.webp)

## Smoothing and percentiles

If you turn on **Use percentile**, the percentile is calculated on the smoothed line, and Compare is hidden: percentile mode always compares against a value. See [Indicator Percentiles](https://gainium.io/help/indicator-percentiles).

![RSI with Use percentile on and EMA 14 smoothing: Lookback and Percentile appear, and Compare is hidden](https://content.gainium.io/images/content/help/indicator-percentiles__percentile-with-smoothing.webp)

## On the chart

When smoothing is on, the bot chart draws the smoothed line in **orange** next to the indicator, so you can see both lines the condition works with.

![The RSI pane with the RSI in purple and its EMA 14 smoothing in orange](https://content.gainium.io/images/content/help/rsi__chart-smoothed-line.webp)

## Things to keep in mind

- **Smoothing adds lag.** The longer the smoothing length, the later the signal. DEMA, TEMA and HMA react faster than SMA or EMA of the same length.
- **More history is needed.** The smoothed line only has a value once the indicator and the moving average have enough candles, so the first signals come a little later after a bot starts.
- **Backtest your settings.** Compare the smoothed and unsmoothed versions of your condition in the backtester before going live.
