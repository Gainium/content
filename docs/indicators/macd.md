---
id: 73
name: Moving Average Convergence Divergence (MACD)
slug: macd
description: >-
  In this article, we explain what is the Moving Average Convergence Divergence
  (MACD) indicator and how it can be used in bot trading.
createdAt: '2023-04-11T16:19:50.322Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2023-04-12T04:03:57.721Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags: []
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.014Z'
templateVersion: 2
tldr: >-
  MACD is the gap between a 12-period and a 26-period EMA, with a 9-period
  EMA of that gap as its signal line. The histogram is MACD minus the signal
  line. Gainium's MACD condition tests the histogram: crossing up 0 is the
  moment MACD crosses above its signal line. Defaults are 12, 26 and 9 on
  1-hour candles, crossing down 0. On BTC/USDT 4h, buying each cross up and
  selling the next cross down won a little over a third of the trades and
  made 3.9% in total, ignoring fees.
kind: native
catalogKeys:
  - MACD
category: momentum
aliases:
  - "MACD"
  - "Moving Average Convergence Divergence"
  - "MACD histogram"
  - "MACD crossover"
faq:
  - title: Which MACD line does the Gainium condition test?
    details: >-
      The histogram, which is the MACD line minus the signal line. Crossing up
      0 is the same event as the MACD line crossing above the signal line, and
      crossing down 0 is the cross below. The condition does not test the MACD
      line against zero.
  - title: What are the best MACD settings for crypto?
    details: >-
      Most traders keep 12, 26 and 9 with EMA for both averages; TradingView
      uses the same defaults. Change the Interval rather than the lengths: on
      BTC/USDT the histogram crosses up 0 about four times as often on 1-hour
      candles as on 4-hour, and about five times as often on 4-hour as on
      daily candles.
  - title: Can I use a Value other than 0?
    details: >-
      Yes, but the histogram is in price units, so a level that fits BTC
      means nothing for a $0.10 coin. On BTC/USDT 4h the histogram swings
      between about −500 and +830 in the chart on this page. To use one
      threshold across pairs, switch on Use percentile instead.
  - title: How reliable is a MACD crossover on its own?
    details: >-
      No better than a coin flip over six bars. On BTC/USDT 4h, price was
      higher six bars later after about half the cross-ups. A crossover
      system makes money from the few long trends it stays in, not from its
      hit rate.
related:
  - moving-averages
  - divergences-indicator
  - oscillator-crossover
  - rsi
sources:
  - title: StockCharts ChartSchool, MACD (Gerald Appel, late 1970s; formula and defaults)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/macd-moving-average-convergence-divergence-oscillator
  - title: StockCharts ChartSchool, MACD-Histogram (Thomas Aspray)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/macd-histogram
  - title: Gainium, DCA mode
    url: https://gainium.io/help/dca-mode
  - title: Gainium, Indicator Percentiles
    url: https://gainium.io/help/indicator-percentiles
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

MACD (Moving Average Convergence Divergence) measures the gap between a fast and a slow exponential moving average, and compares that gap with its own average. Traders use its crossovers as momentum entries and exits. In Gainium the condition reads the MACD histogram, so "crossing up 0" means the MACD line crossed above its signal line.

## What is MACD

Gerald Appel developed MACD in the late 1970s. Thomas Aspray later added the histogram to show the distance between MACD and its signal line. The three parts:

- **MACD line** = EMA(close, **Fast length**) − EMA(close, **Slow length**). Defaults 12 and 26.
- **Signal line** = EMA of the MACD line over **Signal length**. Default 9.
- **Histogram** = MACD line − signal line.

All three are in price units. On BTC/USDT 4h the histogram ranges from about −500 to +830 in the chart below, while the MACD line peaked near 3,500; on a $1 coin the same chart shows fractions of a cent.

Gainium's defaults match TradingView's built-in MACD: 12, 26, 9, with EMA for both the oscillator and the signal line. Either can be switched to SMA.

How to read it:

- **Histogram crosses above 0:** the MACD line crossed above the signal line. Short-term momentum turned up.
- **Histogram crosses below 0:** the opposite.
- **Histogram shrinking toward 0:** the move is slowing before the cross.
- **MACD line above or below 0:** the fast EMA is above or below the slow EMA. Gainium's condition does not test this line, only the histogram.
- **Divergence:** price makes a lower low while the histogram makes a higher low. Gainium detects that in the separate [Divergences indicator](https://gainium.io/indicators/divergences-indicator), with MACD as one of its oscillators.

On BTC/USDT the 1-hour histogram crosses up through 0 about four times as often as the 4-hour one, and the 4-hour one about five times as often as the daily.

![MACD (12, 26, 9) on BINANCE:BTCUSDT 4h, dark theme: the MACD and signal lines spike during a rally, with the histogram below them](https://content.gainium.io/images/content/indicators/macd__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Use percentile | Off | Off: the condition tests the fixed Value. On: Value hides and the histogram is compared with its own Percentile over the last Lookback candles, one threshold for any pair. |
| Lookback | 150 | Candles of the line's own history the percentile is taken from. Percentile mode only. |
| Percentile | 80 | The rank in that history used as the level: 80 is a level that only 20% of readings exceeded. Percentile mode only. |
| Signal length | 9 | Candles in the signal line, the average of the MACD line, 1 to 200. |
| Fast length | 12 | Candles in the fast average of the close, 1 to 200. |
| Slow length | 26 | Candles in the slow average of the close, 1 to 200. |
| Oscillator MA Type | EMA | Average type for the fast and slow lines: EMA or SMA. |
| Signal Line MA type | EMA | Average type for the signal line: EMA or SMA. |
| Interval | 1 hour | Candle size the indicator is calculated on, from 1 minute to 1 week. It does not follow the chart you are looking at. |
| Condition | Crossing down | Tested on the histogram, MACD line minus signal line. Crossing up and Crossing down fire on the cross candle; Greater than and Lower than hold on every candle on that side. |
| Value | 0 | The histogram level, in the pair's price units. 0 is the signal-line cross. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** **Value** is a histogram level in price units, not a level of the MACD line. Keep it at 0 for signal-line crosses. On BTC/USDT 4h the histogram stays between about −500 and +830 in the chart above, so a Value of 100 means something there and is never reached on a $1 coin.

**Tip:** **Signal length** sets the trade count. On BTC/USDT 4h, Signal length 5 gives about 1.3 times as many crosses up through 0 as 9, and 14 about 10% fewer than 9.

## Trading setups for bots

### Signal-line crossover, in and out

- **Entry:** MACD, Condition **Crossing up**, Value **0**, Interval 4 hours.
- **Exit:** a MACD close condition, **Crossing down** 0 on the same interval.
- **Settings:** 12, 26, 9, EMA and EMA.
- **Timeframe:** 4 hours or 1 day. The 1-hour histogram crosses up 0 about four times as often as the 4-hour one.
- **When it fails:** in flat markets, where the histogram hugs 0. In the chart below it crosses four times in four bars, and each pair of crosses is a small loss plus fees. In the data behind this page, a long bot that bought every 4h cross up and sold the next cross down won a little over a third of its trades. The median trade lost 0.7%, one trade made 22.7%, and the total was +3.9%, ignoring fees, while BTC itself fell 27%.

![Annotated MACD chart, BTC/USDT 4h: the histogram crosses up 0 at 63,075 and down at 77,418 for +22.7%; later it crosses four times in four bars](https://content.gainium.io/images/content/indicators/macd__cross.webp)

### MACD turn as the DCA trigger

A DCA bot normally adds orders at fixed price steps. With the DCA mode set to **Indicators**, each order waits for the condition instead, so the bot adds when momentum turns rather than while price is still falling.

- **Entry:** the deal starts on your usual condition. DCA mode **Indicators**, with MACD **Crossing up** 0 on 4 hours as the DCA condition and a minimum step of 1% between orders.
- **Exit:** the bot's take profit on the averaged entry, for example 2%.
- **Settings:** MACD 12, 26, 9. The minimum step keeps two turns at the same price from filling two orders.
- **Timeframe:** 4 hours for the DCA condition, whatever the start condition uses.
- **When it fails:** in a slow, steady decline. In the chart below, the 4h histogram turned up five times while BTC slid from about 83,900 to 81,500, and each turn would add an order. Cap the number of DCA orders. In the earlier dip on the chart it worked as intended: orders at 77,268 and 76,463, about six bars after the 74,968 low, instead of fixed steps all the way down.

![Annotated MACD chart, BTC/USDT 4h: DCA orders fill on histogram turns at 77,268 and 76,463 in a dip; later the histogram turns up five times in a slow decline](https://content.gainium.io/images/content/indicators/macd__dca.webp)

## Using MACD in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, click **Edit**, then **Change indicator**, and search for **MACD**. For the DCA setup, set the DCA mode to **Indicators** and add MACD there.
3. Pick **Moving Average Convergence Divergence (MACD)**, set the fields, and click **Done**.

![Gainium indicator picker searched for MACD, with the Moving Average Convergence Divergence card ringed](https://content.gainium.io/images/content/indicators/macd__picker.webp)

The fields and their defaults:

- **Use percentile:** off. When on, the histogram is compared with its own percentile level over **Lookback** (150 candles) at **Percentile** (80), and the Value field hides. This is the way to use one threshold across pairs with different prices.
- **Signal length:** 9, from 1 to 200.
- **Fast length:** 12, from 1 to 200.
- **Slow length:** 26, from 1 to 200.
- **Oscillator MA Type:** EMA. SMA is the other option.
- **Signal Line MA type:** EMA. SMA is the other option.
- **Interval:** 1 hour.
- **Condition:** Crossing down. The options are Crossing down, Crossing up, Greater than and Lower than.
- **Value:** 0. The histogram level the condition compares with.
- **Keep true:** 0 extra candles.

MACD works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller.

Example configuration for the crossover setup:

- Deal start: MACD, Use percentile off, 9 / 12 / 26, EMA / EMA, Interval 4 hours, Condition Crossing up, Value 0, Keep true 0.
- Take profit type Technical indicators: MACD with the same settings and Condition Crossing down, Value 0.

![Gainium MACD settings card with Signal length 9, Fast length 12, Slow length 26, Interval 4 hours, Condition Crossing up and Value 0](https://content.gainium.io/images/content/indicators/macd__example.webp)

## Related indicators

- [Moving Averages](https://gainium.io/indicators/moving-averages): MACD is built from two EMAs; an EMA cross condition gives the slower version of the same signal.
- [Divergences](https://gainium.io/indicators/divergences-indicator): detects MACD divergences, which the MACD condition itself cannot test.
- [Oscillator Crossover](https://gainium.io/indicators/oscillator-crossover): crosses between two oscillators, for the same kind of momentum turn on RSI, MFI or CCI.
- [RSI](https://gainium.io/indicators/rsi): a bounded 0 to 100 momentum reading, which avoids MACD's price-unit problem across pairs.
