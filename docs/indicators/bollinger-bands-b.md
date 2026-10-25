---
id: 115
name: Bollinger Bands %B (BB %B)
slug: bollinger-bands-b
description: >-
  Learn how to use Bollinger Bands %B in Gainium for automated trading,
  capturing overbought/oversold conditions, and building effective bot trading
  strategies.
createdAt: '2024-10-06T07:36:52.543Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-06T07:36:54.333Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:29.999Z'
tldr: >-
  Bollinger Bands %B says where the close sits inside the Bollinger Bands as
  one number: 0 at the lower band, 0.5 at the middle, 1 at the upper band,
  below 0 or above 1 outside them. John Bollinger defined it alongside the
  bands. Bots use it for dip entries near the lower band and exits near the
  upper one. In Gainium the condition defaults to %B crossing down 0.05 and
  supports percentile mode and smoothing.
templateVersion: 2
kind: native
catalogKeys:
  - BBPB
category: momentum
aliases:
  - BB %B
  - BB%B
  - Bollinger Bands %B
  - Bollinger %b
  - Percent B
faq:
  - title: Can %B go below 0 or above 1?
    details: >-
      Yes. Below 0 means the close is under the lower band, above 1 that it is
      over the upper band. In the chart on this page, BTC/USDT 4h reaches −0.37
      and 1.43.
  - title: Is %B the same as RSI?
    details: >-
      No. RSI compares up moves with down moves. %B compares the close with the
      bands, so it also reflects how wide they are. A small move in a quiet
      market can push %B to 1 while RSI barely moves.
  - title: Which value should I use for a buy condition?
    details: >-
      0 to 0.05 for entries at the lower band. Gainium's default is %B crossing
      down 0.05. Use Crossing up 0 to wait for the close back inside the band
      instead.
  - title: Why does my %B condition never fire?
    details: >-
      Check the Value. %B lives around 0 to 1, so a value like 20 or 80 is
      never crossed. If you think in percent, divide by 100.
related:
  - bb
  - bbw
  - keltner-channel-b
  - rsi
sources:
  - title: John Bollinger, Bollinger Bands and %b, BollingerBands.com
    url: https://www.bollingerbands.com/bollinger-bands
  - title: TradingView Help Center, Bollinger Bands %b (%b)
    url: https://www.tradingview.com/support/solutions/43000501971-bollinger-bands-b-b/
  - title: Gainium, Indicator Percentiles
    url: https://gainium.io/help/indicator-percentiles
  - title: Binance BTC/USDT 4h candles, computed with Gainium's indicator engine
---

Bollinger Bands %B says where the close sits inside the Bollinger Bands, as one number from about 0 to 1. Bots use it to buy near the lower band, sell near the upper band, and to compare positions across pairs with one threshold.

## What is Bollinger Bands %B (BB %B)

John Bollinger defined %b as a companion to his bands, which he developed in the 1980s. The formula:

**%B = (Close − Lower band) / (Upper band − Lower band)**

- **Close** is the candle's closing price.
- **Upper and lower bands** are the Bollinger Bands: a 20-period SMA of the close plus and minus 2 standard deviations of the last 20 closes.

How to read it:

- **0** is the lower band, **0.5** the middle band, **1** the upper band.
- **Below 0** means the close is under the lower band. BTC/USDT 4h reaches −0.37 in the chart below.
- **Above 1** means the close is over the upper band. It reaches 1.43 in the first bars of a run from 64,000 to 77,000.
- **It scales with band width.** In a squeeze a small move swings %B from 0 to 1. After a big move the bands are wide and %B moves slowly.

![Bollinger Bands %B (20, 2) on BINANCE:BTCUSDT 4h, dark theme: the %B pane oscillates between about 0 and 1 with its bands at 0 and 1, dipping below 0 and spiking above 1 several times](https://content.gainium.io/images/content/indicators/bollinger-bands-b__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Use percentile | Off | On: Value is hidden and the condition compares the line with its own percentile level over the last Lookback bars. |
| Lookback | 150 | Bars the percentile level is taken from. Percentile mode only. |
| Percentile | 80 | Which percentile of those bars is the level: 80 is higher than 80% of them, 10 lower than 90% of them. Percentile mode only. |
| MA type | SMA | The moving average of the middle band: SMA, EMA, WMA, DEMA, TEMA, HMA, VWMA or RMA. |
| SMA Length | 20 | The period of the middle band's moving average. |
| Length | 20 | The number of closes the standard deviation is measured over. |
| Standard Deviations | 2 | How far each band sits from the middle band. Wider bands keep %B closer to 0.5. |
| Interval | 1 hour | The candle size %B is calculated on, from 1 minute to 1 week. |
| Smoothing | None | Moving average applied to the indicator line. With smoothing on, the condition uses the smoothed line. |
| Smoothing length | 14 | Bars in the smoothing average. Shown when Smoothing is on. |
| Compare | Smoothed line vs value | Smoothed line vs value: the condition tests the smoothed line against Value. Line vs smoothed line: the condition tests the indicator against its own moving average, a momentum-turn signal. Percentile mode always compares against a value. |
| Condition | Crossing down | How %B is compared with Value: Crossing up, Crossing down, Greater than, Lower than, or Between Value and Upper value. Percentile mode drops Between. |
| Value | 0.05 | The threshold on the %B scale, in steps of 0.01: 0 is the lower band, 1 the upper band. |
| Upper value | — | Between: the value must stay above Value and below this. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** Value and Upper value step by 0.01, so each click of the arrows moves the level by a hundredth of the band width. The scale runs from 0 to 1: a Value typed in percent, such as 5 for 5%, sits far above the upper band and is never crossed down.

**Tip:** Standard Deviations sets how often 0.05 is reached. %B crossing down 0.05 on BTC/USDT 4h fires about 40% more often with 1.5 than with 2, and about 40% less often with 2.5, so 1.5 gives a little over twice as many signals as 2.5.

**Tip:** Smoothing EMA with Smoothing length 14 kept %B above 0.08 on BTC/USDT 4h, so crossing down 0.05 never fired. With that smoothing use a Value of 0.2, which fires about a third as often as the unsmoothed 0.05, or a Smoothing length of 3, which keeps 0.05 and fires about three quarters as often.

## Trading setups for bots

### Buy %B under 0.05, sell it over 0.95

This is the lower-band dip buy expressed as one number, so the same settings work on any pair.

- **Entry:** %B crossing down 0.05.
- **Exit:** %B crossing up 0.95, as an indicator take profit.
- **Settings:** BB %B with MA type SMA, SMA Length 20, Length 20, Standard Deviations 2, Interval 4 hours, Condition Crossing down, Value 0.05. Take profit type Indicators: BB %B, Condition Crossing up, Value 0.95. Three DCA orders 1.5% apart.
- **Timeframe:** 4h. On 1h, one sell-off crosses 0.05 several times.
- **When it fails:** %B is relative to the bands, so it fires at the lower band of a falling market too. Without DCA orders, the entry below lost money; it is the averaging that turned it into a win.

Example on BTC/USDT 4h, in the chart below: the condition fired at 84,150. Price fell 4.5% over the next nine bars. Two DCA orders filled at 82,888 and 81,626; the third, at 80,364, missed the 80,394 low by $30. The average was 82,888. %B crossed up 0.95 at 83,909, and the deal closed 1.2% above its average.

![Annotated chart of BINANCE:BTCUSDT 4h with Bollinger Bands and %B below: entry where %B crosses down 0.05 at 84,150, DCA fills at 82,888 and 81,626, and the exit where %B crosses up 0.95 at 83,909](https://content.gainium.io/images/content/indicators/bollinger-bands-b__dip.webp)

### Short the close back under the upper band

A close above the upper band followed by one back inside often marks a short-term top in a range.

- **Entry:** short bot, %B crossing down 1.
- **Exit:** %B crossing down 0.5, the middle band.
- **Settings:** BB %B on 4 hours, SMA 20, Standard Deviations 2, Condition Crossing down, Value 1. Take profit type Indicators: BB %B, Condition Crossing down, Value 0.5. A stop loss of 3%.
- **Timeframe:** 4h.
- **When it fails:** in a trend. On BTC/USDT 4h, about two in three of these shorts reached the middle band first, for 0.6% to 2.2% ignoring fees. Two opened in the middle of the run to 77,000 would have lost 7% to 21% before the middle band came back. The 3% stop loss caps each of those two at −3%.

In the chart below it fires three times. The first short, at 81,136, came six bars into a rally; it reached the middle band only at 83,996, for −3.5%. The next two shorts, at 85,693 and 84,898, covered at 83,996 and 83,339, for +2.0% and +1.8%.

![Annotated chart of BINANCE:BTCUSDT 4h with Bollinger Bands and %B below: the first short at 81,136 that price ran over, covered at 83,996 for −3.5%, and the next two shorts that covered where %B crossed under 0.5, for +2.0% and +1.8%](https://content.gainium.io/images/content/indicators/bollinger-bands-b__fade.webp)

## Using Bollinger Bands %B (BB %B) in Gainium

BB %B can start deals, place DCA orders (DCA type Indicators), close deals, and start or stop the bot from the Bot Controller.

1. Create a DCA bot and switch the form to **Manual**. Quick mode has no indicator conditions.
2. Set **Deal start condition** to **Indicators**. The bot adds an RSI condition. For an exit, set the take profit or stop loss type to **Indicators**.
3. Click **Edit**, then **Change indicator**, and pick **Bollinger Bands %B**.

The settings card starts with these defaults:

- **Use percentile:** off. When on, Value is replaced by %B's own percentile level over the last **Lookback** bars (default 150) at the **Percentile** you set (default 80). See [Indicator Percentiles](https://gainium.io/help/indicator-percentiles).
- **MA type:** SMA, or EMA, WMA, DEMA, TEMA, HMA, VWMA, RMA for the middle band.
- **SMA Length:** 20. The period of the middle band.
- **Length:** 20. The closes the standard deviation is measured over.
- **Standard Deviations:** 2.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Smoothing:** None. A moving average of the %B line (SMA, EMA, WMA, DEMA, TEMA, HMA or RMA), **Smoothing length** 14, and **Compare** to test the smoothed line against Value or the raw line against the smoothed one. See [Indicator Smoothing](https://gainium.io/help/indicator-smoothing).
- **Condition:** Crossing down. The options are Crossing up, Crossing down, Greater than, Lower than and Between.
- **Value:** 0.05, on the 0 to 1 scale, in steps of 0.01.
- **Keep true:** 0. The number of extra bars the condition stays true after it fires.

![The Bollinger Bands %B settings card in the Gainium bot form with its defaults: Use percentile off, MA type SMA, SMA Length 20, Length 20, Standard Deviations 2, Interval 1 hour, Smoothing None, Condition Crossing down, Value 0.05 (ringed), Keep true 0](https://content.gainium.io/images/content/indicators/bollinger-bands-b__settings.webp)

**Example configuration** (the dip buy): Deal start condition Indicators, BB %B with Use percentile off, MA type SMA, SMA Length 20, Length 20, Standard Deviations 2, Interval 4 hours, Smoothing None, Condition Crossing down, Value 0.05, Keep true 0. Take profit type Indicators, BB %B with the same settings, Condition Crossing up, Value 0.95. Three DCA orders 1.5% apart.

## Related indicators

- [Bollinger Bands (BB)](https://gainium.io/indicators/bb): the bands themselves; a BB condition compares price with one band.
- [Bollinger Band Width (BBW)](https://gainium.io/indicators/bbw): how wide the bands are, to tell a squeeze from a wide market.
- [Keltner Channel %B](https://gainium.io/indicators/keltner-channel-b): the same position measure on ATR-based bands.
- [RSI](https://gainium.io/indicators/rsi): a momentum reading to pair with %B dip entries.

## FAQ

### Can %B go below 0 or above 1?

Yes. Below 0 means the close is under the lower band, above 1 that it is over the upper band. In the chart on this page, BTC/USDT 4h reaches −0.37 and 1.43.

### Is %B the same as RSI?

No. RSI compares up moves with down moves. %B compares the close with the bands, so it also reflects how wide they are. A small move in a quiet market can push %B to 1 while RSI barely moves.

### Which value should I use for a buy condition?

0 to 0.05 for entries at the lower band. Gainium's default is %B crossing down 0.05. Use Crossing up 0 to wait for the close back inside the band instead.

### Why does my %B condition never fire?

Check the Value. %B lives around 0 to 1, so a value like 20 or 80 is never crossed. If you think in percent, divide by 100.
