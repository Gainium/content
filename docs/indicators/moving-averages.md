---
id: 70
name: Moving Averages (MA)
slug: moving-averages
description: >-
  In this article, we explain what is the Moving Averages (SMA, EMA, HMA, etc.)
  indicators and how they can be used in bot trading.
createdAt: '2023-04-05T15:46:39.260Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2023-04-14T06:55:36.772Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.017Z'
templateVersion: 2
tldr: >-
  A moving average is the average closing price of the last N candles,
  redrawn on every candle. Gainium's Moving Averages condition offers eight
  types (SMA, EMA, WMA, DEMA, TEMA, HMA, VWMA and RMA) and compares one of
  them with the current price or with a second average, on any interval.
  The default is EMA 20 on 1-hour candles crossing down the current price,
  which fires when price closes back above the EMA. The golden cross, the
  50-day SMA crossing above the 200-day SMA, is the rarest signal on this
  page: on BTC/USDT the 1-hour default fires about 600 times for each one.
kind: native
catalogKeys:
  - MA
category: trend
aliases:
  - "MA"
  - "Moving Average"
  - "SMA"
  - "EMA"
  - "WMA"
  - "DEMA"
  - "TEMA"
  - "HMA"
  - "RMA"
  - "VWMA"
faq:
  - title: Which moving average type reacts fastest?
    details: >-
      HMA and TEMA. On BTC/USDT 1h, price crosses up through a 20-period HMA
      or TEMA about 2.3 times as often as through a 20-period RMA. WMA gives
      about 1.7 times as many crosses as RMA, EMA about 1.4 times and SMA
      about 1.3 times. Faster means earlier signals and more false ones.
  - title: How do I set up a golden cross in Gainium?
    details: >-
      Moving average SMA, Length 50, Interval 1 day, Condition Crossing up,
      Compared to SMA, SMA length 200, SMA interval 1 day. The condition fires
      on the daily close where the 50-day average moves above the 200-day.
  - title: Why does Crossing down fire when price goes up?
    details: >-
      The condition reads as "the moving average is crossing down the
      reference". With Compared to set to Current price, the average crossing
      down the price is the same event as price crossing up through the
      average. Use Crossing up for price falling through it.
  - title: Can the two averages use different intervals?
    details: >-
      Yes. The comparison average has its own interval field, so you can
      compare a 1-hour EMA with a 1-day SMA. The bot reads each average from
      its own candles.
related:
  - moving-average-ratio
  - macd
  - supertrend
  - bb
sources:
  - title: StockCharts ChartSchool, Moving Averages, Simple and Exponential
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/moving-averages-simple-and-exponential
  - title: StockCharts ChartSchool, Double Exponential Moving Average (Patrick Mulloy, 1994)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/double-exponential-moving-average-dema
  - title: StockCharts ChartSchool, Triple Exponential Moving Average (Patrick Mulloy)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/triple-exponential-moving-average-tema
  - title: StockCharts ChartSchool, Hull Moving Average (Alan Hull, 2005)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/hull-moving-average-hma
  - title: Binance BTC/USDT 1h and 1d candles, computed with Gainium's indicator engine
---

A moving average is the average closing price of the last N candles, recalculated on every new candle, so it draws a smoothed line under or over price. Bots use it in two ways: price crossing the average as an entry, and one average crossing another, like the 50-day over the 200-day, as a trend switch.

## What is a moving average

No one person invented the moving average; the simple and exponential versions are decades older than charting software. The newer types have named authors, listed below. Gainium offers eight types. For a length *n*:

- **SMA (simple):** the plain average of the last *n* closes. Every candle has the same weight, so the line lags price by about (*n* − 1) / 2 candles.
- **EMA (exponential):** `EMA = close × α + previous EMA × (1 − α)`, with `α = 2 / (n + 1)`. Recent candles weigh more, so it turns sooner than an SMA of the same length.
- **WMA (weighted):** the newest close has weight *n*, the one before *n* − 1, down to 1 for the oldest.
- **DEMA (double exponential):** `2 × EMA − EMA(EMA)`. Patrick Mulloy introduced it in 1994 to cut the EMA's lag.
- **TEMA (triple exponential):** `3 × EMA − 3 × EMA(EMA) + EMA(EMA(EMA))`, also by Mulloy.
- **HMA (Hull):** `WMA(2 × WMA(n/2) − WMA(n), √n)`. Alan Hull published it in 2005 to get a smooth line with very little lag.
- **RMA (Wilder's):** an EMA with `α = 1 / n`, the slowest of the group. RSI and ATR use it internally.
- **VWMA (volume-weighted):** `Σ(close × volume) / Σ volume` over *n* candles. Candles with more volume pull the line harder.

How the type changes behaviour: on BTC/USDT 1h at Length 20, RMA gives the fewest crosses of price. SMA gives about 1.3 times as many, EMA about 1.4 times, WMA about 1.7 times, and TEMA and HMA about 2.3 times as many.

How to read it:

- **Price above a rising average:** up trend at that length. Below a falling one: down trend.
- **The 200-day SMA** is the line most traders watch. Price can stay on one side of it for most of a cycle: on the BTC/USDT daily chart, price closed above it on only about one candle in five.
- **Two averages:** the shorter one above the longer one means the recent trend is up. The 50-day crossing above the 200-day is called a golden cross, the reverse a death cross.

![Moving Average Ribbon (SMA 20, 50, 100 and 200) on BINANCE:BTCUSDT 1D, dark theme: price below all four averages for most of the chart, then above all of them on the right](https://content.gainium.io/images/content/indicators/moving-averages__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Moving average | EMA | The average that is tested: SMA, EMA, WMA, DEMA, TEMA, HMA, VWMA or RMA. HMA and TEMA cross price most often, RMA least. |
| Length | 20 | Candles in the average, 1 to 1,000. |
| Interval | 1 hour | Candle size of the average, from 1 minute to 1 week. It does not follow the chart you are looking at. |
| Condition | Crossing down | How the average is compared with the reference. Crossing down means the average drops below the reference: with Current price, that is price closing back above the average. |
| Compared to | Current price | The reference: the candle's close, or a second average of any of the eight types. |
| Comparison length | 20 | Length of the second average, 1 to 1,000. Hidden with Current price. |
| Comparison interval | 1 hour | Candle size of the second average. It can differ from Interval. Hidden with Current price. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** Condition **Crossing down** with Compared to **Current price** is a buy-side signal: the average drops below the close when price closes back above it. With the defaults, EMA 20 on 1 hour, it fires on BTC/USDT about 1.4 times as often as the same cross of an RMA 20.

**Tip:** The **Moving average** type sets how often the condition fires. At Length 20 on 1 hour, price crosses up through an HMA about 2.3 times as often as through an RMA. Use SMA or RMA when each cross should be rare.

**Tip:** For a golden cross, set **Comparison interval** to 1 day as well as Interval. Both start at 1 hour, so changing only Interval compares a daily SMA 50 with an SMA 200 of hourly candles, which covers less history than the 50 daily candles of the "fast" average.

## Trading setups for bots

### Trade only above the 200-day average

Use the 200-day SMA as an on/off switch for a long bot, and let a faster condition time the entries.

- **Entry:** Moving Averages, SMA, Length 200, Interval 1 day, Condition **Lower than**, Compared to **Current price**. That reads "SMA 200 lower than price", so it is true while price is above the average. Put your entry condition, for example RSI, in the same group with AND logic.
- **Exit:** the bot's take profit. For a full stop, add SMA 200 **Crossing up** Current price as a close condition: the average rises above price when price closes under it.
- **Settings:** SMA 200 on 1 day. An EMA 200 sits closer to price and flips earlier.
- **Timeframe:** 1 day for the filter, any interval for the entry.
- **When it fails:** near the line. In the chart below, BTC closed above and below the 200-day SMA three times in five daily candles, so the filter switched on and off around one level. It then stayed off for most of the chart, until price closed above the average at 69,335.

![Annotated BTC/USDT 1D chart with the 200-day SMA: three crosses of the average in five daily candles, and the later close above it at 69,335](https://content.gainium.io/images/content/indicators/moving-averages__trend-filter.webp)

### Golden cross trend switch

- **Entry:** Moving Averages, SMA, Length 50, Interval 1 day, Condition **Crossing up**, Compared to **SMA**, SMA length 200, SMA interval 1 day.
- **Exit:** the death cross: the same settings with Condition **Crossing down**, as a close condition.
- **Settings:** SMA 50 and SMA 200. EMAs cross less often here: on BTC/USDT daily, the 50-day EMA stayed above the 200-day EMA through three dips that each gave the SMAs a death cross.
- **Timeframe:** 1 day. On 4-hour candles the 50 and 200 cross far more often and stop meaning "trend".
- **When it fails:** at the end of a trend, because both averages lag far behind price. On BTC/USDT daily, one golden cross bought BTC at 111,696 and the death cross after it sold at 94,261, a 15.6% loss. The three golden crosses before it returned 11.2%, 76.7% and 13.2% from cross to cross. In the chart below, the latest one fires at 78,456.

![Annotated BTC/USDT 1D chart: a death cross, then the later golden cross where the 50-day SMA rises above the 200-day SMA at 78,456](https://content.gainium.io/images/content/indicators/moving-averages__golden-cross.webp)

## Using Moving Averages in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, click **Edit**, then **Change indicator**, and search for **Moving**.
3. Pick **Moving Averages**, set the fields, and click **Done**.

![Gainium indicator picker searched for Moving, with the Moving Averages card ringed](https://content.gainium.io/images/content/indicators/moving-averages__picker.webp)

The condition reads left to right: moving average, length, condition, then the reference in Compared to. It tests the first average against the reference, so "EMA 20 crossing down Current price" fires when price closes back above the EMA.

The fields and their defaults:

- **Moving average:** EMA. The options are SMA, EMA, WMA, DEMA, TEMA, HMA, VWMA and RMA.
- **Length:** 20, from 1 to 1,000.
- **Interval:** 1 hour.
- **Condition:** Crossing down. The options are Crossing down, Crossing up, Greater than and Lower than.
- **Compared to:** Current price. Or a second average of any of the eight types.
- **SMA length** (named after the type you compare with): 20, from 1 to 1,000. Shown only when Compared to is an average.
- **SMA interval** (named the same way): 1 hour. The second average's own candles.
- **Keep true:** 0 extra candles.

![Gainium Moving Averages settings card with the defaults: EMA, Length 20, Interval 1 hour, Condition Crossing down, Compared to Current price, Keep true 0](https://content.gainium.io/images/content/indicators/moving-averages__settings.webp)

Moving Averages works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller.

Example configuration for the golden cross: Moving average SMA, Length 50, Interval 1 day, Condition Crossing up, Compared to SMA, SMA length 200, SMA interval 1 day, Keep true 0.

![Gainium Moving Averages settings card configured as a golden cross: SMA 50 on 1 day crossing up SMA 200 on 1 day](https://content.gainium.io/images/content/indicators/moving-averages__example.webp)

## Related indicators

- [Moving Average Ratio (MAR)](https://gainium.io/indicators/moving-average-ratio): the same price-versus-average comparison as a number, so you can require price to be 2% above the average instead of just above it.
- [MACD](https://gainium.io/indicators/macd): the gap between a 12 and a 26 EMA, with its own signal line.
- [Supertrend](https://gainium.io/indicators/supertrend): a trailing line that flips sooner than a long average and gives an exit level.
- [Bollinger Bands](https://gainium.io/indicators/bb): a 20-period SMA with volatility bands around it.

## FAQ

### Which moving average type reacts fastest?

HMA and TEMA. On BTC/USDT 1h, price crosses up through a 20-period HMA or TEMA about 2.3 times as often as through a 20-period RMA. WMA gives about 1.7 times as many crosses as RMA, EMA about 1.4 times and SMA about 1.3 times. Faster means earlier signals and more false ones.

### How do I set up a golden cross in Gainium?

Moving average SMA, Length 50, Interval 1 day, Condition Crossing up, Compared to SMA, SMA length 200, SMA interval 1 day. The condition fires on the daily close where the 50-day average moves above the 200-day.

### Why does Crossing down fire when price goes up?

The condition reads as "the moving average is crossing down the reference". With Compared to set to Current price, the average crossing down the price is the same event as price crossing up through the average. Use Crossing up for price falling through it.

### Can the two averages use different intervals?

Yes. The comparison average has its own interval field, so you can compare a 1-hour EMA with a 1-day SMA. The bot reads each average from its own candles.
