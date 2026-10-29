---
id: 69
name: Bollinger Bands (BB)
slug: bb
description: >-
  In this article, we explain what is the Bollinger Bands indicator and how it
  can be used in bot trading.
createdAt: '2023-04-05T14:51:39.550Z'
updatedAt: '2026-10-29T12:00:00.000Z'
publishedAt: '2023-04-12T06:03:51.322Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:29.996Z'
tldr: >-
  Bollinger Bands are a 20-period moving average with bands 2 standard
  deviations above and below it, published by John Bollinger in the 1980s.
  The bands widen when price swings and narrow when it goes quiet. Bots use
  them two ways: buy when price closes back above the lower band (mean
  reversion), or buy when it closes above the upper band after a squeeze
  (breakout). In Gainium a BB condition compares price with the lower, middle
  or upper band.
templateVersion: 2
kind: native
catalogKeys:
  - BB
category: volatility
aliases:
  - BB
  - Bollinger Bands
  - Bollinger Band
  - BBands
faq:
  - title: What are the default Bollinger Bands settings?
    details: >-
      A 20-period simple moving average of the close and bands 2 standard
      deviations away, on 20 closes. Gainium uses the same defaults: MA type
      SMA, SMA Length 20, Length 20, Standard Deviations 2.
  - title: Is touching the upper band a sell signal?
    details: >-
      Not by itself. In a strong trend price walks along the upper band for
      many bars: in the breakout example on this page, half of the BTC/USDT 4h
      candles closed above it while price rose from 63,400 to 76,300. Wait for
      a close back inside, or use a trend filter.
  - title: What is the difference between SMA Length and Length in Gainium?
    details: >-
      SMA Length is the period of the middle line, the moving average. Length
      is the number of closes the standard deviation is measured over. Both
      start at 20, as in Bollinger's original.
  - title: Can I use Bollinger Bands for a stop loss?
    details: >-
      Yes. Set the stop loss type to Indicators and close the deal when price
      crosses down the lower or middle band. Risk:Reward can also use a band
      as its stop price.
related:
  - bbw
  - bollinger-bands-b
  - keltner-channel
  - rsi
sources:
  - title: John Bollinger, Bollinger Bands, BollingerBands.com
    url: https://www.bollingerbands.com/bollinger-bands
  - title: StockCharts ChartSchool, Bollinger Bands
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/bollinger-bands
  - title: TradingView Help Center, Bollinger Bands (BB)
    url: https://www.tradingview.com/support/solutions/43000501840-bollinger-bands-bb/
  - title: Gainium, Risk:Reward
    url: https://gainium.io/help/risk-reward
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

Bollinger Bands are a moving average with a band two standard deviations above it and another below. Bots use them to buy when price closes back inside the lower band after a drop, or to buy when price breaks above the upper band after a quiet stretch.

## What is Bollinger Bands (BB)

John Bollinger developed the bands in the early 1980s. They have three lines:

- **Middle band = SMA(close, n)**, a simple moving average of the last *n* closes.
- **Upper band = middle + k × σ**
- **Lower band = middle − k × σ**

**σ** is the standard deviation of the last *n* closes: how far, on average, those closes sit from their mean. **k** is the number of standard deviations. Bollinger's defaults are *n* = 20 and *k* = 2, and TradingView and Gainium use the same.

How to read them:

- **Most closes land inside.** About 86% of BTC/USDT 4h closes land between the bands.
- **Width tracks volatility.** The bands widen in a sharp move and pinch in a quiet market. In the chart below they pinch to 1% of price apart on BTC/USDT 4h, the narrowest on the chart, and soon after price breaks out from 64,000 toward 77,000. Bollinger calls the narrow stretch the Squeeze; [Bollinger Band Width](https://gainium.io/indicators/bbw) measures it.
- **A close outside the band is not a reversal signal on its own.** In a trend price walks along the band.

![Bollinger Bands (20, SMA, 2) on BINANCE:BTCUSDT 4h, dark theme: the bands pinch before the breakout, widen sharply during the run from 64,000 to 77,000, and read 83,260 / 81,470 / 79,680 at the end](https://content.gainium.io/images/content/indicators/bb__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| MA type | SMA | The moving average of the middle band: SMA, EMA, WMA, DEMA, TEMA, HMA, VWMA or RMA. |
| SMA Length | 20 | The period of the middle band's moving average. |
| Length | 20 | The number of closes the standard deviation is measured over. |
| Standard Deviations | 2 | How far the upper and lower bands sit from the middle band, in standard deviations, 0.1 to 10 in steps of 0.1. |
| Interval | 1 hour | The candle size the bands are calculated on, from 1 minute to 1 week. |
| Condition | Crossing up | How the close is compared with the band in Value: Crossing up, Crossing down, Greater than or Lower than. |
| Value | Lower | The band the close is compared with: Lower, Upper or Middle. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** Standard Deviations 2.5 keeps only the deeper flushes. On BTC/USDT 4h, the lower-band reclaim fires about a third as often with 2.5 as with 2, and about a third more often with 1.5 than with 2, so 1.5 gives almost four times as many reclaims as 2.5. The field steps by 0.1, from 0.1 to 10.

![Bollinger Bands Standard Deviations 2 vs 2.5 on BINANCE:BTCUSDT 4h: the same candles in both panels; with 2.5 the bands sit wider and far fewer candles close outside the lower band](https://content.gainium.io/images/content/indicators/bb__tip-standard-deviations.webp)

*Standard Deviations 2 (top) vs 2.5 (bottom), BTC/USDT 4h: with 2.5 the close crosses back above the lower band about a third as often.*

**Tip:** SMA Length and Length are separate in Gainium, while TradingView's Bollinger Bands use one length for both. Change both together to match a TradingView chart; SMA Length 50 with Length 20 is a different indicator.

**Tip:** the default Interval of 1 hour fires about four times as often as 4 hours: on BTC/USDT, the lower-band reclaim gives about four 1h signals for each 4h one.

## Trading setups for bots

### Buy the close back above the lower band

A close below the lower band is a stretch. The close that brings price back inside is the entry.

- **Entry:** price crossing up the lower band.
- **Exit:** price crossing up the upper band, or a fixed 1.5% take profit.
- **Settings:** BB with MA type SMA, SMA Length 20, Length 20, Standard Deviations 2, Interval 4 hours, Condition Crossing up, Value Lower. The exit is a second BB condition with Condition Crossing up, Value Upper.
- **Timeframe:** 4h for BTC and other large pairs. On 15m and 1h, a sell-off produces several reclaims in a row; add DCA orders below the entry.
- **When it fails:** in a slide, price reclaims the band and loses it again. On BTC/USDT 4h in the chart below, the first two reclaims, at 79,366 and 78,904, were followed by a drop to 76,700.

In the chart below the condition fires four times. The two in the slide lost. The reclaims at 76,892 and 75,824 reached the upper band at 77,892 (+1.3%) and 77,798 (+2.6%).

![Annotated chart of Bollinger Bands on BINANCE:BTCUSDT 4h: a lower-band reclaim at 78,904 that fell another 2.8%, and the two later reclaims that reached the upper band for +1.3% and +2.6%](https://content.gainium.io/images/content/indicators/bb__mean-reversion.webp)

### Buy the upper-band breakout after a squeeze

After the bands pinch, the first close above the upper band can start a trend.

- **Entry:** price crossing up the upper band.
- **Exit:** price crossing down the middle band.
- **Settings:** BB 20 / 2 on 4 hours, Condition Crossing up, Value Upper, for the start. A take profit condition with Condition Crossing down, Value Middle.
- **Timeframe:** 4h. On 1h the upper band is crossed far more often, mostly by noise.
- **When it fails:** most breakouts don't run. On BTC/USDT 4h about two in three of these trades closed at a loss, mostly 1% to 3% ignoring fees, when price fell back under the middle band. Nearly all the gain came from two trends, one of them in the chart below.

The best of them, in the chart below: a cross at 63,429, with the bands at their narrowest on the chart. Price did not close below the middle band again until 78,012, 23% higher.

![Annotated chart of Bollinger Bands on BINANCE:BTCUSDT 4h: the narrowest bands on the chart, the close above the upper band at 63,429, the walk along the upper band, and the exit when price closed below the middle band at 78,012](https://content.gainium.io/images/content/indicators/bb__breakout.webp)

## Using Bollinger Bands (BB) in Gainium

A BB condition can start deals, place DCA orders (DCA type Indicators), close deals, set the stop for Risk:Reward, and start or stop the bot.

1. Create a DCA bot and switch the form to **Manual**. Quick mode has no indicator conditions.
2. Set **Deal start condition** to **Indicators**. The bot adds an RSI condition. For an exit, set the take profit or stop loss type to **Indicators**.
3. Click **Edit**, then **Change indicator**, and pick **Bollinger Bands (BB)**.

The settings card starts with these defaults:

- **MA type:** SMA. The middle line can also be EMA, WMA, DEMA, TEMA, HMA, VWMA or RMA.
- **SMA Length:** 20. The period of the middle line.
- **Length:** 20. The number of closes the standard deviation is measured over.
- **Standard Deviations:** 2. The *k* of the formula.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Condition:** Crossing up. The options are Crossing up, Crossing down, Greater than and Lower than. Each compares price with the band you pick in Value.
- **Value:** Lower. The band price is compared with: Lower, Upper or Middle.
- **Keep true:** 0. The number of extra bars the condition stays true after it fires.

![The Bollinger Bands settings card in the Gainium bot form with its defaults: MA type SMA, SMA Length 20, Length 20, Standard Deviations 2, Interval 1 hour, Condition Crossing up, Value Lower (ringed), Keep true 0](https://content.gainium.io/images/content/indicators/bb__settings.webp)

The defaults are already the lower-band reclaim from the first setup, on 1 hour. For Risk:Reward, the stop goes at the band you pick in Value at the moment the deal opens; see [Risk:Reward](https://gainium.io/help/risk-reward).

**Example configuration** (the lower-band reclaim): Deal start condition Indicators, BB with MA type SMA, SMA Length 20, Length 20, Standard Deviations 2, Interval 4 hours, Condition Crossing up, Value Lower, Keep true 0. Take profit type Indicators, BB with the same settings, Condition Crossing up, Value Upper. Three DCA orders 1.5% apart.

## Related indicators

- [Bollinger Band Width (BBW)](https://gainium.io/indicators/bbw): the distance between the bands as a ratio, to find the squeeze before a breakout.
- [Bollinger Bands %B](https://gainium.io/indicators/bollinger-bands-b): where price sits inside the bands, as one number.
- [Keltner Channel](https://gainium.io/indicators/keltner-channel): bands built from ATR instead of standard deviation, which react less to a single wide candle.
- [RSI](https://gainium.io/indicators/rsi): a momentum check for lower-band entries, to skip reclaims while RSI is still falling.
