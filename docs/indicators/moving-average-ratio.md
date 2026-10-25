---
id: 112
name: Moving Average Ratio (MAR)
slug: moving-average-ratio
description: >-
  Learn how to use the Moving Average Ratio (MAR) in Gainium for flexible bot
  trading with advanced trend detection and customizable entry/exit rules.
createdAt: '2024-10-05T11:55:03.576Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-05T12:19:52.638Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.017Z'
templateVersion: 2
tldr: >-
  The Moving Average Ratio (MAR) divides the current price, or a fast moving
  average, by a slower moving average. A reading of 1.00 means both are equal,
  0.97 means price is 3% below the average, 1.02 means 2% above. Gainium's
  default is price divided by EMA 20 on 1-hour candles, crossing down 0.99. An
  optional trend filter also requires the ratio to have risen or fallen by a
  set percentage over the last candles. On BTC/USDT, buying when price falls
  3% under its 4-hour EMA 20 fires about a sixth as often as the default
  1-hour condition.
kind: native
catalogKeys:
  - MAR
category: trend
aliases:
  - "MAR"
  - "Moving Average Ratio"
  - "Price to moving average ratio"
faq:
  - title: How is MAR different from a moving average crossover?
    details: >-
      A crossover only tells you when two lines meet, which is MAR crossing
      1.00. MAR also tells you how far apart they are, so you can require
      price to be 2% above the average (1.02) or 3% below it (0.97) before the
      bot acts.
  - title: What Value should I use?
    details: >-
      Read the range of your pair first, because it depends on the interval
      and the length. On BTC/USDT, price divided by EMA 20 stayed between 0.984 and 1.014 on 90% of 1-hour candles, between
      0.966 and 1.027 on 4-hour candles, and price divided by EMA 50 on 4-hour
      candles between 0.943 and 1.042.
  - title: What does the trend filter check?
    details: >-
      It compares the ratio now with the ratio Trend filter lookback candles
      ago. Higher or equal to 2 means it rose by at least 2% of its own value;
      Lower or equal to means it fell by that much; Between values means it
      moved less than that either way. The filter must be true on the same
      candle as the condition.
  - title: Is MAR a TradingView indicator?
    details: >-
      No, it is Gainium's own condition. The bot-form chart draws it in a
      pane under price, with the Value as a dashed line and the trend filter
      as green shading.
related:
  - moving-averages
  - bollinger-bands-b
  - macd
  - rsi
sources:
  - title: StockCharts ChartSchool, Moving Averages, Simple and Exponential
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/moving-averages-simple-and-exponential
  - title: Gainium, Indicator Percentiles
    url: https://gainium.io/help/indicator-percentiles
  - title: Gainium, Indicator Smoothing
    url: https://gainium.io/help/indicator-smoothing
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

The Moving Average Ratio (MAR) divides the current price, or a fast moving average, by a slower moving average, so 1.00 means they are equal and 0.97 means price is 3% below the average. Bots use it to act on distance from an average instead of on a bare cross: buy when price is stretched 3% under its EMA, or only when it is 1% above and rising.

## What is the Moving Average Ratio

MAR is a Gainium condition, not a classic indicator with a published author. The formula:

`MAR = Reference / Relative to`

- **Relative to** is the base moving average, the denominator: a type (EMA by default) and a length (20).
- **Reference** is the numerator: the current close by default, or a second moving average with its own type and length.
- Both averages use closes, except VWMA, which also uses volume. All eight Gainium types are available: SMA, EMA, WMA, DEMA, TEMA, HMA, VWMA and RMA.

How to read it:

- **1.00:** price (or the fast average) equals the base average. MAR crossing 1.00 is the same event as a moving average crossover.
- **Above 1.00:** the reference is above the base, by (MAR − 1) × 100%. 1.02 is 2% above.
- **Below 1.00:** the reference is below the base. 0.97 is 3% below.
- **The range depends on interval and length.** On BTC/USDT, price / EMA 20 stayed between 0.984 and 1.014 on 90% of 1-hour candles, and between 0.966 and 1.027 on 4-hour candles. With EMA 50 on 4-hour candles the range widened to 0.943 to 1.042.

The default Value, 0.99, sits near the 11th percentile of the 1-hour range: BTC closed 1% or more below its 1-hour EMA 20 on 11% of candles.

![Gainium bot-form chart, BTC/USDT perpetual on a Bybit paper account, 4h: the MAR pane shows price divided by EMA 20 moving between about 0.966 and 1.022, with the 0.99 Value as a dashed line](https://content.gainium.io/images/content/indicators/moving-average-ratio__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Use percentile | Off | Off: the condition tests the fixed Value. On: Value hides and MAR is compared with its own Percentile over the last Lookback candles. |
| Lookback | 150 | Candles of the line's own history the percentile is taken from. Percentile mode only. |
| Percentile | 80 | The rank in that history used as the level: 80 is a level that only 20% of readings exceeded. Percentile mode only. |
| Reference | Current price | The numerator: the candle's close, or a moving average of any of the eight types. |
| Comparison MA length | 20 | Length of the Reference average, 1 to 500. Hidden with Current price. |
| Relative to | EMA | The type of the base average, the denominator. |
| Base MA length | 20 | Length of the base average, 1 to 500. |
| Interval | 1 hour | Candle size of both averages, from 1 minute to 1 week. |
| Smoothing | None | A moving average put on the MAR line. With smoothing on, the condition tests the smoothed line. |
| Smoothing length | 14 | Candles in the smoothing average, 1 to 1,000. |
| Compare | Smoothed line vs value | Smoothed line vs value tests the smoothed line against Value. Line vs smoothed line tests the raw line against its own average; Value hides and Between is never true. |
| Condition | Crossing down | Crossing up and Crossing down fire on the one candle where the line passes Value. Greater than and Lower than hold on every candle on that side. Between holds while the line is inside Value and Upper value. |
| Value | 0.99 | The ratio level: 0.99 is 1% below the base average, 1.02 is 2% above it. The arrows step by 0.01; type more decimals, such as 0.985, by hand. |
| Upper value | — | Between only: the second bound. The line must be strictly between the two. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |
| Use Trend Filter | Off | On: the condition also needs MAR to have moved by Value, % over the last Trend filter lookback candles. It works with or without percentile mode. |
| Trend filter lookback | 10 | How many candles back the filter compares MAR with, 1 to 1,000. |
| Operator | Lower or equal to | Lower or equal to: MAR fell by at least Value, %. Higher or equal to: it rose by at least that much. Between values: it moved less than that either way. |
| Value, % | 2 | The move the filter needs, as a percentage of MAR itself. |

**Tip:** The default **Value** of 0.99 with Crossing down on 1 hour fires often on BTC/USDT. For a deeper stretch, use Interval 4 hours with 0.97, which fires about a sixth as often.

**Tip:** **Use Trend Filter** with its defaults (Operator Lower or equal to, Trend filter lookback 10, Value, % set to 2) cuts the default 1-hour condition to about one signal in seven. MAR must also have fallen 2% in 10 candles, so only fast drops through 0.99 count.

**Tip:** **Reference** EMA 20 with **Relative to** EMA 50 turns MAR into an EMA crossover at 1.00. On 4 hours that ratio crosses up through 1.00 about a quarter as often as price divided by EMA 50.

## Trading setups for bots

### Buy a 3% stretch below the average

- **Entry:** MAR, Reference Current price, Relative to EMA, EMA Length 20, Interval 4 hours, Condition **Crossing down**, Value **0.97**.
- **Exit:** a 1.5% take profit, with DCA orders below.
- **Settings:** EMA 20 on 4 hours. On 1-hour candles use about 0.985 for a similar stretch: type it in, because the arrows move in steps of 0.01.
- **Timeframe:** 4 hours. On BTC/USDT it fires about a sixth as often as the default 1-hour condition.
- **When it fails:** in a sell-off, where 3% under the average is only the start. About four entries in five reached a 1.5% gain within 18 bars, against about two in three for a buy on any 4h candle. The stretch helped, but about one entry in five did not recover in 18 bars. The default 1-hour version, crossing down 0.99, was no better than a coin flip: price was higher 24 bars later after about half its signals.

![Annotated Gainium MAR chart, BTC/USDT 4h: MAR drops under the 0.97 line; the bot buys at about 81,040 and the 1.5% take profit fills three bars later](https://content.gainium.io/images/content/indicators/moving-average-ratio__dip-setup.webp)

### Join a move only while it accelerates

Use the trend filter to require that price is above the average and pulling away from it.

- **Entry:** MAR, Reference Current price, Relative to EMA, EMA Length 50, Interval 4 hours, Condition **Greater than**, Value **1.01**. **Use Trend Filter** on, Trend filter lookback 10, Operator **Higher or equal to**, Value 2%.
- **Exit:** a 1.5% take profit, or close the deal when MAR crosses down 1.00.
- **Settings:** EMA 50 on 4 hours, so the ratio measures distance from a 50-candle trend.
- **Timeframe:** 4 hours. On BTC/USDT it switches on almost twice as often as the 3% stretch setup above, and about 70% of its entries reached +1.5% within 18 bars.
- **When it fails:** at the end of a short rally, because the filter is true exactly when the move is most extended. In the example on the chart, it bought 84,540 at the top of the rally; price fell to 79,220 and had not recovered 1.5% by the right edge of the chart. An earlier entry at 86,425 went the same way.

![Annotated Gainium MAR chart with the trend filter, BTC/USDT 4h: the ratio is above 1.01 inside the green trend-filter zone, and the entry at 84,540 is the top of the move](https://content.gainium.io/images/content/indicators/moving-average-ratio__momentum-setup.webp)

## Using Moving Average Ratio in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, click **Edit**, then **Change indicator**, and search for **Ratio**. MAR also works as a DCA condition: the [DCA mode](https://gainium.io/help/dca-mode) Indicators tab lists it.
3. Pick **Moving Average Ratio (MAR)**, set the fields, and click **Done**. The chart draws the ratio in its own pane.

![Gainium indicator picker searched for Ratio, with the Moving Average Ratio (MAR) card ringed](https://content.gainium.io/images/content/indicators/moving-average-ratio__picker.webp)

The fields and their defaults:

- **Use percentile:** off. When on, MAR is compared with its own percentile level over **Lookback** (150 candles) at **Percentile** (80), and Value hides.
- **Reference:** Current price. Or any of the eight average types; a **Length** field (20, from 1 to 500) appears, named after the type.
- **Relative to:** EMA, the base average.
- **EMA Length:** 20, from 1 to 500. The label follows the type you pick.
- **Interval:** 1 hour.
- **Smoothing:** None. An average of the MAR line, with **Smoothing length** 14 and **Compare** (Smoothed line vs value, or Line vs smoothed line). See [indicator smoothing](https://gainium.io/help/indicator-smoothing).
- **Condition:** Crossing down. The options are Crossing down, Crossing up, Greater than, Lower than and Between.
- **Value:** 0.99, in steps of 0.01. With Between, an **Upper value** field appears.
- **Keep true:** 0 extra candles.
- **Use Trend Filter:** off. When on: **Trend filter lookback** 10 candles (1 to 1,000), **Operator** Lower or equal to (or Higher or equal to, or Between values), and **Value, %** 2.

MAR works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller.

Example configuration for the second setup: Reference Current price, Relative to EMA, EMA Length 50, Interval 4 hours, Smoothing None, Condition Greater than, Value 1.01, Keep true 0, Use Trend Filter on, lookback 10, Higher or equal to, 2%.

![Gainium MAR settings card configured with EMA Length 50, Interval 4 hours, Condition Greater than, Value 1.01 and the trend filter on with Higher or equal to 2%](https://content.gainium.io/images/content/indicators/moving-average-ratio__example.webp)

## Related indicators

- [Moving Averages](https://gainium.io/indicators/moving-averages): the plain cross that MAR measures as a distance.
- [Bollinger Bands %B](https://gainium.io/indicators/bollinger-bands-b): distance from a 20-period average in units of volatility instead of percent.
- [MACD](https://gainium.io/indicators/macd): the gap between two EMAs in price units, where MAR gives it as a ratio.
- [RSI](https://gainium.io/indicators/rsi): a bounded momentum reading to pair with a MAR stretch before buying.

## FAQ

### How is MAR different from a moving average crossover?

A crossover only tells you when two lines meet, which is MAR crossing 1.00. MAR also tells you how far apart they are, so you can require price to be 2% above the average (1.02) or 3% below it (0.97) before the bot acts.

### What Value should I use?

Read the range of your pair first, because it depends on the interval and the length. On BTC/USDT, price divided by EMA 20 stayed between 0.984 and 1.014 on 90% of 1-hour candles, between 0.966 and 1.027 on 4-hour candles, and price divided by EMA 50 on 4-hour candles between 0.943 and 1.042.

### What does the trend filter check?

It compares the ratio now with the ratio Trend filter lookback candles ago. Higher or equal to 2 means it rose by at least 2% of its own value; Lower or equal to means it fell by that much; Between values means it moved less than that either way. The filter must be true on the same candle as the condition.

### Is MAR a TradingView indicator?

No, it is Gainium's own condition. The bot-form chart draws it in a pane under price, with the Value as a dashed line and the trend filter as green shading.
