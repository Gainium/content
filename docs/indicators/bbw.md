---
id: 68
name: Bollinger Band Width (BBW)
slug: bbw
description: >-
  In this article, we explain what is BBW indicator and how it can be used in
  bot trading.
createdAt: '2023-04-05T14:49:25.356Z'
updatedAt: '2026-10-29T12:00:00.000Z'
publishedAt: '2023-04-12T05:15:20.930Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:29.998Z'
tldr: >-
  Bollinger Band Width (BBW) is the distance between the upper and lower
  Bollinger Bands divided by the middle band. A low value is a quiet market
  (the squeeze), a high value a violent one. It has no direction. Bots use it
  as a filter: take breakouts only after a squeeze, or stop a bot when the
  bands blow out. Gainium's BBW is a ratio (0.05 = bands 5% of price apart)
  and supports percentile mode and smoothing.
templateVersion: 2
kind: native
catalogKeys:
  - BBW
category: volatility
aliases:
  - BBW
  - Bollinger Band Width
  - Bollinger Bands Width
  - Bollinger BandWidth
faq:
  - title: Is BBW a percentage?
    details: >-
      In Gainium it is a ratio: 0.05 means the bands are 5% of the middle band
      apart. With the default 2 standard deviations, that is 1.25% of price
      per standard deviation. TradingView's built-in plots it multiplied by 100,
      so Gainium's 0.05 reads 5 there.
  - title: What is a low BBW?
    details: >-
      It depends on the pair and interval. On BTC/USDT 4h, BBW ranges from
      about 0.0097 to 0.27, with a median near 0.034. Switch on Percentile to
      say "low" without picking a number.
  - title: Does a squeeze tell you the breakout direction?
    details: >-
      No. BBW only says the bands are narrow. Pair it with a directional
      condition, such as price crossing the upper or lower band.
  - title: Can BBW stop my bot?
    details: >-
      Yes. In the Bot Controller, a BBW condition can stop or start a DCA or
      combo bot, for example stop when BBW crosses up 0.10 and start again when
      it crosses down 0.05.
related:
  - bb
  - bollinger-bands-b
  - atr
  - keltner-channel
sources:
  - title: John Bollinger, Bollinger on Bollinger Bands (2001), BandWidth and the Squeeze
    url: https://www.bollingerbands.com/bollinger-bands
  - title: StockCharts ChartSchool, Bollinger BandWidth
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/bollinger-bandwidth
  - title: TradingView Help Center, Bollinger BandWidth (BBW)
    url: https://www.tradingview.com/support/solutions/43000501972-bollinger-bands-width-bbw/
  - title: Gainium, Indicator Percentiles
    url: https://gainium.io/help/indicator-percentiles
  - title: Gainium, Bot Controller
    url: https://gainium.io/help/bot-controller
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

Bollinger Band Width (BBW) is the gap between the upper and lower Bollinger Bands, divided by the middle band. Bots use it to find quiet markets before breakouts, and to stop trading when the bands blow wide open.

## What is Bollinger Band Width (BBW)

John Bollinger described BandWidth in *Bollinger on Bollinger Bands* (2001) as the tool for his Squeeze. The formula:

**BBW = (Upper band − Lower band) / Middle band**

- **Middle band** is the moving average of the close, 20 periods by default.
- **Upper and lower bands** sit 2 standard deviations of the last 20 closes above and below it.

Because it divides by the middle band, BBW is a ratio of price and works the same way on any pair. A BBW of 0.05 means the bands are 5% of price apart.

How to read it:

- **Low BBW is a squeeze.** On BTC/USDT 4h in the chart below, BBW falls to 0.0097, its lowest reading on the chart, and soon after price breaks out from 64,000 toward 77,000.
- **High BBW is a market already in motion.** It peaks at 0.27 during that breakout. Readings that high come after the move has started.
- **The median is the baseline.** BTC/USDT 4h's median reading is about 0.034.
- **No direction.** A squeeze can break either way.

![Bollinger BandWidth (20, 2) on BINANCE:BTCUSDT 4h, dark theme. TradingView plots BBW multiplied by 100 and adds its highest and lowest recent values as red and green lines: BBW drops to 0.97 before the breakout, spikes to 26.6 during it, and to about 12 in a later move](https://content.gainium.io/images/content/indicators/bbw__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Percentile | Off | On: Value is hidden and the condition compares the line with its own percentile level over the last Lookback bars. With smoothing on, the smoothed line is ranked. |
| Lookback | 150 | Bars the percentile level is taken from. Percentile mode only. |
| Threshold | 80 | Which percentile of those bars is the level, 0 to 100: 80 is higher than 80% of them, 10 lower than 90% of them. Percentile mode only. |
| MA type | SMA | The moving average of the middle band: SMA, EMA, WMA, DEMA, TEMA, HMA, VWMA or RMA. |
| SMA Length | 20 | The period of the middle band's moving average. |
| Length | 20 | The number of closes the standard deviation is measured over. |
| Standard Deviations | 2 | How far each band sits from the middle band, 0.1 to 10 in steps of 0.1. BBW grows in proportion to it. |
| Interval | 1 hour | The candle size BBW is calculated on, from 1 minute to 1 week. |
| Smoothing | — | Moving average applied to the indicator line. With smoothing on, the condition uses the smoothed line. |
| Average | none | The smoothing average: SMA, EMA, WMA, DEMA, TEMA, HMA or RMA. Shown when Smoothing is on. |
| Length | 14 | Bars in the smoothing average. Shown when Smoothing is on. |
| Compare | Smoothed line vs value | Smoothed line vs value: the condition tests the smoothed line against Value. Line vs smoothed line: the condition tests the indicator against its own moving average, a momentum-turn signal. Percentile mode always compares against a value. |
| Condition | Crossing down | How BBW is compared with Value: Crossing up, Crossing down, Greater than, Lower than, or Between Value and Upper value. Percentile mode drops Between. |
| Value | 0.05 | The threshold as a ratio, in steps of 0.01: 0.05 means the bands are 5% of the middle band apart. |
| Upper value | — | Between: the value must stay above Value and below this. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** the default Value of 0.05 fits 4 hours, not the default 1 hour. On BTC/USDT 1h, about 95% of BBW readings are under 0.05, with a median of 0.017. On 4h, about 81% are, with a median of 0.035.

**Tip:** BBW scales with Standard Deviations. The BTC/USDT 4h median was 0.017 with 1, 0.035 with 2 and 0.052 with 3, so a Lower than 0.02 condition is true about six times as often with 1 as with 2, and about a fifth as often with 3. If you change Standard Deviations, scale Value by the same factor.

**Tip:** **Percentile** on with Threshold 10 and Lower than gives a squeeze test that works on any pair. On BTC/USDT 4h it is true on about one bar in nine, in short separate stretches of seven or eight bars.

## Trading setups for bots

### Take upper-band breakouts only after a squeeze

A close above the upper band on its own loses more often than not. Requiring a squeeze first removes most of the losers.

- **Entry:** BBW Lower than 0.02 with Keep true 6, AND price crossing up the upper Bollinger Band. The breakout must come within six bars of the squeeze.
- **Exit:** price crossing down the middle band.
- **Settings:** BBW with MA type SMA, SMA Length 20, Length 20, Standard Deviations 2, Interval 4 hours, Condition Lower than, Value 0.02, Keep true 6. BB with the same band settings, Condition Crossing up, Value Upper.
- **Timeframe:** 4h. On BTC/USDT 1h, BBW is under 0.02 on about 62% of bars, so the filter stops filtering.
- **When it fails:** the filter drops trends that start from a normal width. On BTC/USDT 4h it keeps about a third of the upper-band breakouts and less than a third of the losing ones, ignoring fees. It kept the trend in the chart below (+23%) but skipped a later breakout (+8%) that started at a width of 0.031.

![Annotated chart of BINANCE:BTCUSDT 4h with Bollinger Bands and BBW below (TradingView's scale, ×100): BBW under 0.02 during the squeeze, and the close above the upper band at 63,429 that started the run to 80,000](https://content.gainium.io/images/content/indicators/bbw__squeeze.webp)

### Pause a bot when the bands blow out

A combo or DCA bot that buys dips loses most in the bars when the bands are widest. The Bot Controller can stop it there and start it when the market calms down.

- **Entry:** Bot Controller start condition: BBW crossing down 0.05.
- **Exit:** Bot Controller stop condition: BBW crossing up 0.10.
- **Settings:** BBW on 4 hours, SMA 20, Standard Deviations 2. Stop: Condition Crossing up, Value 0.10. Start: Condition Crossing down, Value 0.05.
- **Timeframe:** 4h. A 1h BBW crosses 0.10 on single news candles.
- **When it fails:** BBW crosses 0.10 after the move is underway. In the first breakout in the chart below, the stop came at 69,335, 8% above the start of the breakout. A bot that sells in a rally misses the rest of it while stopped.

In the chart below, BBW crosses up 0.10 three times, once in the first breakout and twice in a later move, and crosses back down 0.05 twice, once after each move.

![Annotated chart of Bollinger BandWidth on BINANCE:BTCUSDT 4h (TradingView's ×100 scale) with lines at 0.10 and 0.05: the three stop signals where BBW crosses up 0.10, and the two start signals where it crosses down 0.05](https://content.gainium.io/images/content/indicators/bbw__pause.webp)

## Using Bollinger Band Width (BBW) in Gainium

BBW can start deals, place DCA orders (DCA type Indicators), close deals, and start or stop the bot from the Bot Controller.

1. Create a DCA bot and switch the form to **Manual**. Quick mode has no indicator conditions.
2. Set **Deal start condition** to **Indicators**. The bot adds an RSI condition. For an exit, set the take profit or stop loss type to **Indicators**; for the Bot Controller, set its type to technical indicators.
3. Click **Edit**, then **Change indicator**, and pick **Bollinger Band Width (BBW)**.

The settings card starts with these defaults:

- **Percentile:** off. When on, the condition compares BBW with its own percentile level over the last **Lookback** bars (default 150) at the **Threshold** you set (default 80), and Value is hidden. Threshold 10 means "narrower than 90% of the last 150 bars". See [Indicator Percentiles](https://gainium.io/help/indicator-percentiles).
- **MA type:** SMA, or EMA, WMA, DEMA, TEMA, HMA, VWMA, RMA for the middle band.
- **SMA Length:** 20. The period of the middle band.
- **Length:** 20. The closes the standard deviation is measured over.
- **Standard Deviations:** 2.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Smoothing:** off. When on, a moving average of the BBW line: **Average** SMA, EMA, WMA, DEMA, TEMA, HMA or RMA, and **Length** 14. **Compare** picks whether the condition tests the smoothed line against Value or the raw line against the smoothed one. See [Indicator Smoothing](https://gainium.io/help/indicator-smoothing).
- **Condition:** Crossing down. The options are Crossing up, Crossing down, Greater than, Lower than and Between.
- **Value:** 0.05, in steps of 0.01.
- **Keep true:** 0. The number of extra bars the condition stays true after it fires.

![The BBW settings card in the Gainium bot form with its defaults: Use percentile off (ringed), MA type SMA, SMA Length 20, Length 20, Standard Deviations 2, Interval 1 hour, Smoothing None, Condition Crossing down, Value 0.05, Keep true 0](https://content.gainium.io/images/content/indicators/bbw__settings.webp)

The fixed 0.02 in the first setup fits BTC/USDT 4h only. For a bot that trades many pairs, switch on **Percentile** with Lookback 150, Threshold 10 and Condition Lower than.

**Example configuration** (the squeeze breakout): Deal start condition Indicators, both in one group. BBW: Percentile off, MA type SMA, SMA Length 20, Length 20, Standard Deviations 2, Interval 4 hours, Smoothing off, Condition Lower than, Value 0.02, Keep true 6. BB: same band settings, Interval 4 hours, Condition Crossing up, Value Upper. Take profit type Indicators: BB, Condition Crossing down, Value Middle.

## Related indicators

- [Bollinger Bands (BB)](https://gainium.io/indicators/bb): the bands BBW measures; use them for the breakout trigger.
- [Bollinger Bands %B](https://gainium.io/indicators/bollinger-bands-b): where price sits inside the same bands.
- [Average True Range (ATR)](https://gainium.io/indicators/atr): volatility in price units, for sizing stops and DCA gaps.
- [Keltner Channel](https://gainium.io/indicators/keltner-channel): Bollinger Bands inside a Keltner Channel is the other common squeeze test.
