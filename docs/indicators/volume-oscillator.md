---
id: 124
name: Volume Oscillator
slug: volume-oscillator
description: >-
  Learn how to use the Volume Oscillator in Gainium for automated trading,
  detecting trend reversals, and confirming market momentum with volume-based
  strategies.
createdAt: '2024-10-06T13:07:57.822Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-06T13:08:01.346Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.032Z'
tldr: >-
  The Volume Oscillator (VO) is the percentage gap between a fast and a slow
  exponential moving average of volume: 5 and 10 bars by default. Above 0,
  recent volume is higher than usual; below 0, lower. It has no price
  direction. Bots use it as a filter: skip breakouts on falling volume, and
  start dip-buying deals when a sell-off comes with a volume spike. Gainium's
  VO supports percentile mode and smoothing.
templateVersion: 2
kind: native
catalogKeys:
  - VO
category: volume
aliases:
  - VO
  - Volume Oscillator
  - Volume Osc
  - PVO
faq:
  - title: What does a negative Volume Oscillator mean?
    details: >-
      The last few bars traded less than the bars before them: the 5-bar volume
      average is below the 10-bar one. It does not say whether price is going
      up or down.
  - title: Does Gainium's Volume Oscillator use SMA or EMA?
    details: >-
      EMA. VO = (EMA of volume over Short length − EMA over Long length) / EMA
      over Long length × 100. TradingView's built-in Percentage Volume
      Oscillator uses the same formula with slower defaults, 12 and 26.
  - title: What is a high reading?
    details: >-
      On BTC/USDT 4h the 90th percentile of VO is about 15, and its biggest
      spikes reach about 45. Readings over 20 are a volume spike there. Other
      pairs and intervals differ, so use percentile mode to skip the guesswork.
  - title: Can I use the Volume Oscillator on its own?
    details: >-
      Not for direction. VO rises as much in a sell-off as in a rally. Combine
      it with a price condition in the same group.
related:
  - bb
  - bollinger-bands-b
  - mfi
  - price-change-indicator
sources:
  - title: StockCharts ChartSchool, Percentage Volume Oscillator (PVO)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/percentage-volume-oscillator-pvo
  - title: TradingView Help Center, Percentage Volume Oscillator (PVO)
    url: https://www.tradingview.com/support/solutions/43000591350-volume-oscillator/
  - title: Gainium, Indicator Percentiles
    url: https://gainium.io/help/indicator-percentiles
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

The Volume Oscillator (VO) is the percentage gap between a fast and a slow moving average of volume. Bots use it to check that a price signal comes with real trading activity: rising volume behind a breakout, or a volume spike at the bottom of a sell-off.

## What is Volume Oscillator

The Volume Oscillator is a percentage form of a fast-minus-slow volume average. It has no single named inventor; StockCharts and TradingView document the same formula as the Percentage Volume Oscillator (PVO), with 12 and 26 as defaults. Gainium computes:

**VO = (EMA(volume, short) − EMA(volume, long)) / EMA(volume, long) × 100**

- **volume** is each candle's traded volume.
- **EMA(volume, short)** is an exponential moving average of volume over the Short length, 5 bars by default.
- **EMA(volume, long)** is the same over the Long length, 10 bars by default.

How to read it:

- **Above 0:** the last few bars traded more than the bars before them.
- **Below 0:** activity is fading.
- **Spikes** come with sharp moves in either direction. On BTC/USDT 4h, VO mostly runs from about −30 to 45, with a middle reading near −3. The highest spike comes on the first big candle of a run from 64,000 to 77,000.
- **No direction.** A spike says something happened, not which way.

![The Gainium bot chart on BTC/USDT 1h (Bybit paper account) with the Volume Oscillator (5, 10) pane below price: VO spikes to about 50% on the sell-off candles near the end and reads about −28% at the end, as volume fades](https://content.gainium.io/images/content/indicators/volume-oscillator__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Use percentile | Off | On: Value is hidden and the condition compares the line with its own percentile level over the last Lookback bars. |
| Lookback | 150 | Bars the percentile level is taken from. Percentile mode only. |
| Percentile | 80 | Which percentile of those bars is the level: 80 is higher than 80% of them, 20 lower than 80% of them. Percentile mode only. |
| Short length | 5 | Bars in the fast EMA of volume. |
| Long length | 10 | Bars in the slow EMA of volume. VO is the fast EMA's gap from it, in percent. |
| Interval | 1 hour | The candle size VO is calculated on, from 1 minute to 1 week. |
| Smoothing | None | Moving average applied to the indicator line. With smoothing on, the condition uses the smoothed line. |
| Smoothing length | 14 | Bars in the smoothing average. Shown when Smoothing is on. |
| Compare | Smoothed line vs value | Smoothed line vs value: the condition tests the smoothed line against Value. Line vs smoothed line: the condition tests the indicator against its own moving average, a momentum-turn signal. Percentile mode always compares against a value. |
| Condition | Crossing down | How VO is compared with Value: Crossing up, Crossing down, Greater than, Lower than, or Between Value and Upper value. Percentile mode drops Between. |
| Value | 0 | The threshold, in percent. |
| Upper value | — | Between: the value must stay above Value and below this. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** the default Crossing down 0 fires all the time. VO's middle reading on BTC/USDT 4h is about −2.7, so 0 sits in the middle of its range, and on 1h the condition fires about three times as often as on 4h.

**Tip:** Long length 20 doubles the spikes. VO crossing up 20 on BTC/USDT 4h fires about twice as often with 5 and 20 as with 5 and 10, and 12 and 26 fire only about a fifth as often as 5 and 10.

![Volume Oscillator Long length 10 vs 20 on BINANCE:BTCUSDT 4h, drawn with TradingView's Percentage Volume Oscillator at Short length 5: the same candles in both panels; with Long length 20 the spikes reach about 100% instead of about 45%](https://content.gainium.io/images/content/indicators/volume-oscillator__tip-long-length.webp)

*Long length 10 (top) vs 20 (bottom), Short length 5, BTC/USDT 4h: with 20, VO crosses up 20 about twice as often.*

**Tip:** Use percentile with Percentile 90 and Crossing up reads "volume well above its recent normal" on any pair. On BTC/USDT it fires about three times as often on 1h as on 4h.

## Trading setups for bots

The charts below show TradingView's Bollinger Bands. The VO values in their labels are Gainium's VO (5, 10), computed from the same Binance BTC/USDT 4h volume; TradingView's own volume oscillator uses 12 and 26.

### Skip breakouts on falling volume

- **Entry:** price crossing up the upper Bollinger Band, AND VO greater than 0.
- **Exit:** price crossing down the middle Bollinger Band.
- **Settings:** VO with Short length 5, Long length 10, Interval 4 hours, Condition Greater than, Value 0. BB with SMA 20, Standard Deviations 2, Interval 4 hours, Condition Crossing up, Value Upper. Both in one group.
- **Timeframe:** 4h, matching the breakout condition.
- **When it fails:** the filter is small. On BTC/USDT 4h, VO was below 0 on only about one upper-band breakout in seven. Those lost 1% to 2%, ignoring fees, but the filter keeps about three in four of the losing trades. A stricter Value cuts winners: in the chart below, the breakout that made 8% started with VO at 2.7.

![Annotated chart of BINANCE:BTCUSDT 4h with Bollinger Bands, each breakout labelled with Gainium's VO (5, 10) reading: two upper-band breakouts with VO above 0 are kept, and two with VO below 0 are skipped](https://content.gainium.io/images/content/indicators/volume-oscillator__breakout.webp)

### Buy the volume spike in a sell-off

A sell-off that ends tends to end on heavy volume. A VO spike while price is near the lower Bollinger Band marks that moment.

- **Entry:** VO crossing up 20, AND BB %B lower than 0.3. Both in one group.
- **Exit:** take profit 1.5% above the average price.
- **Settings:** VO with Short length 5, Long length 10, Interval 4 hours, Condition Crossing up, Value 20. BB %B 20 / 2 on 4 hours, Condition Lower than, Value 0.3. Two DCA orders, 1.5% and 3% below the entry.
- **Timeframe:** 4h. On 1h, VO crosses 20 on routine hourly bursts.
- **When it fails:** the spike can be the first leg, not the last. In the chart below, the signal at 76,512 came just before a flush to 74,968; the deal filled one DCA order and waited about a dozen bars for its take profit. Without DCA orders the deal sits underwater for longer.

On BTC/USDT 4h, every deal this signal opened reached the 1.5% take profit, nearly all within 18 bars; the slowest took about 48.

![Annotated chart of BINANCE:BTCUSDT 4h with Bollinger Bands and the VO (5, 10) readings labelled: entries where VO crosses up 20 with price near the lower band: one at 78,482 that reached its take profit a few bars later, and one at 76,512, which filled a DCA order in the flush that followed and then took profit](https://content.gainium.io/images/content/indicators/volume-oscillator__selloff.webp)

## Using Volume Oscillator in Gainium

VO can start deals, place DCA orders (DCA type Indicators), close deals, and start or stop the bot from the Bot Controller.

1. Create a DCA bot and switch the form to **Manual**. Quick mode has no indicator conditions.
2. Set **Deal start condition** to **Indicators**. The bot adds an RSI condition. For an exit, set the take profit or stop loss type to **Indicators**.
3. Click **Edit**, then **Change indicator**, and pick **Volume Oscillator (VO)**. To add the price condition, click **Indicator** in the same group.

The settings card starts with these defaults:

- **Use percentile:** off. When on, Value is replaced by VO's own percentile level over the last **Lookback** bars (default 150) at the **Percentile** you set (default 80): "VO crossing up its 80th percentile" adapts to any pair. See [Indicator Percentiles](https://gainium.io/help/indicator-percentiles).
- **Short length:** 5 bars.
- **Long length:** 10 bars.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Smoothing:** None. A moving average of the VO line (SMA, EMA, WMA, DEMA, TEMA, HMA or RMA), **Smoothing length** 14, and **Compare**. See [Indicator Smoothing](https://gainium.io/help/indicator-smoothing).
- **Condition:** Crossing down. The options are Crossing up, Crossing down, Greater than, Lower than and Between.
- **Value:** 0, in percent.
- **Keep true:** 0. The number of extra bars the condition stays true after it fires. A spike lasts one or two bars, so Keep true 2 lets the price condition catch up.

![The Volume Oscillator settings card in the Gainium bot form with its defaults: Use percentile off, Short length 5, Long length 10, Interval 1 hour, Smoothing None, Condition Crossing down, Value 0 (ringed), Keep true 0](https://content.gainium.io/images/content/indicators/volume-oscillator__settings.webp)

**Example configuration** (the sell-off spike): Deal start condition Indicators, one group with two conditions. VO: Use percentile off, Short length 5, Long length 10, Interval 4 hours, Smoothing None, Condition Crossing up, Value 20, Keep true 0. BB %B: SMA 20, Standard Deviations 2, Interval 4 hours, Condition Lower than, Value 0.3. Take profit 1.5%. Two DCA orders at 1.5% and 3%.

## Related indicators

- [Bollinger Bands (BB)](https://gainium.io/indicators/bb): the price condition for the breakout filter.
- [Bollinger Bands %B](https://gainium.io/indicators/bollinger-bands-b): tells you price is near the lower band when the volume spike hits.
- [Money Flow Index (MFI)](https://gainium.io/indicators/mfi): volume and price in one oscillator, with a direction.
- [Price % Change](https://gainium.io/indicators/price-change-indicator): reacts to the size of one candle, where VO reacts to its volume.

## FAQ

### What does a negative Volume Oscillator mean?

The last few bars traded less than the bars before them: the 5-bar volume average is below the 10-bar one. It does not say whether price is going up or down.

### Does Gainium's Volume Oscillator use SMA or EMA?

EMA. VO = (EMA of volume over Short length − EMA over Long length) / EMA over Long length × 100. TradingView's built-in Percentage Volume Oscillator uses the same formula with slower defaults, 12 and 26.

### What is a high reading?

On BTC/USDT 4h the 90th percentile of VO is about 15, and its biggest spikes reach about 45. Readings over 20 are a volume spike there. Other pairs and intervals differ, so use percentile mode to skip the guesswork.

### Can I use the Volume Oscillator on its own?

Not for direction. VO rises as much in a sell-off as in a rally. Combine it with a price condition in the same group.
