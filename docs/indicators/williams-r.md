---
id: 121
name: 'Williams Percent Range '
slug: williams-r
description: >-
  Learn how to use the Williams %R indicator in Gainium for automated trading,
  detecting trends, reversals, and overbought/oversold conditions with detailed
  strategy examples.
createdAt: '2024-10-06T12:15:15.080Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-06T12:22:36.175Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.033Z'
templateVersion: 2
tldr: >-
  Williams %R shows where the close sits inside the high-low range of the last
  14 bars, on an inverted scale from 0 (close at the high) to −100 (close at
  the low). Readings above −20 are overbought and below −80 oversold. It is
  the Stochastic's raw %K turned upside down, so it is fast: on BTC/USDT 1h it
  reclaims −80 about twice as often as a 3-bar smoothed %R. Bots use the
  reclaim of −80 for short long deals and the break above −20 as a momentum
  entry. In Gainium the default is Length 14 with a Value of −40, and it
  supports smoothing and percentiles.
kind: native
catalogKeys:
  - WR
category: momentum
aliases:
  - "Williams %R"
  - "Williams R"
  - "Williams Percent Range"
  - "%R"
  - "WPR"
faq:
  - title: Why is Williams %R negative?
    details: >-
      Larry Williams measured how far the close is from the highest high,
      and plotted that distance as a negative number. 0 means the close is at
      the top of the range and −100 at the bottom. Enter negative values in
      Gainium: −80 for oversold, −20 for overbought.
  - title: How is Williams %R different from the Stochastic?
    details: >-
      Williams %R is the Stochastic's %K minus 100, with no smoothing and no
      signal line. The two reach their extremes on the same bars. Use %R when
      you want one line against a level; use the Stochastic when you want K
      and D crosses and the Zone filter.
  - title: Is −20 a sell signal?
    details: >-
      Not on its own. %R spends about a fifth of its time above −20 on
      BTC/USDT 1h, 4h and daily. In a rally it stays there for many candles. On the
      daily chart a cross up through −20 worked better as a buy signal for
      trend deals than as a sell signal.
  - title: What does the default Value of −40 mean?
    details: >-
      It is only a starting value. With the default Condition Crossing down,
      the condition fires when %R falls through −40, which is the middle of
      the range. Change it to −80 or −20 for the setups on this page.
related:
  - stoch
  - rsi
  - cci
sources:
  - title: StockCharts ChartSchool, Williams %R
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/williams-r
  - title: TradingView Help Center, Williams %R (%R)
    url: https://www.tradingview.com/support/solutions/43000501985-williams-r-r/
  - title: Gainium, Indicator Smoothing
    url: https://gainium.io/help/indicator-smoothing
  - title: Gainium, Indicator Percentiles
    url: https://gainium.io/help/indicator-percentiles
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

Williams %R shows where the latest close sits inside the high-low range of the last 14 bars, on an inverted scale from 0 at the high to −100 at the low. Traders buy when it climbs back above −80 after a dip, and some buy strength when it breaks above −20. It reacts on the next bar, so it suits short-term bots that take many small deals.

## What is Williams %R

Larry Williams developed Williams %R. The formula:

**%R** = (Highest high − Close) / (Highest high − Lowest low) × −100

- **Highest high** and **lowest low** are taken over the last *n* bars, including the current one. *n* is 14 by default.
- **Close** is the current bar's close.

The result runs from 0 (the close is the highest high) to −100 (the close is the lowest low). It is the fast Stochastic's %K minus 100, with no smoothing. TradingView's default is length 14 on the close. Gainium's default Length is also 14.

How to read it:

- **Above −20 (overbought):** the close is in the top fifth of the range. **Below −80 (oversold):** in the bottom fifth. On BTC/USDT, %R spends about a fifth of its time above −20 and about as much below −80, on 1h, 4h and daily alike.
- **A cross back through −80 or −20** is the trigger most traders use, rather than the reading itself.
- **Pinned near 0 or −100:** each new bar closes at a new 14-bar extreme. That is a trend.
- **−50** is the middle of the range.

![Williams %R(14) on BINANCE:BTCUSDT 4h, dark theme: the %R line runs between 0 and −100, with dashed bands at −20 and −80](https://content.gainium.io/images/content/indicators/williams-r__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Use percentile | Off | Off: the condition tests the fixed Value. On: Value hides and %R is compared with its own Percentile over the last Lookback candles. |
| Lookback | 150 | Candles of the line's own history the percentile is taken from. Percentile mode only. |
| Percentile | 80 | The rank in that history used as the level: 80 is a level that only 20% of readings exceeded. Percentile mode only. |
| Length | 14 | Candles in the high-low range, including the current one. |
| Interval | 1 hour | Candle size the indicator is calculated on, from 1 minute to 1 week. It does not follow the chart you are looking at. |
| Smoothing | None | A moving average put on the line. With smoothing on, the condition tests the smoothed line. |
| Smoothing length | 14 | Candles in the smoothing average, 1 to 1,000. |
| Compare | Smoothed line vs value | Smoothed line vs value tests the smoothed line against Value. Line vs smoothed line tests the raw line against its own average; Value hides and Between is never true. |
| Condition | Crossing down | Crossing up and Crossing down fire on the one candle where the line passes Value. Greater than and Lower than hold on every candle on that side. Between holds while the line is inside Value and Upper value. |
| Value | -40 | The %R level, from 0 at the top of the range to −100 at the bottom. Enter negative numbers. |
| Upper value | — | Between only: the second bound. The line must be strictly between the two. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** **Value** −40 with Crossing down is the middle of the range, and on BTC/USDT 1h it fires a little more often than the reclaim of −80. Enter −80 or −20 for the setups on this page. A positive Value is never reached.

**Tip:** **Smoothing** SMA with Smoothing length 3 roughly halves the reclaims of −80 on BTC/USDT 1h. The smoothed line is the slow stochastic's %K on the inverted %R scale.

**Tip:** **Length** 7 gives about 1.3× as many 1-hour crosses up through −80 as Length 14, and Length 28 about a quarter fewer.

## Trading setups for bots

### Reclaim of −80 for short long deals

- **Entry:** %R(14) crossing up through −80.
- **Exit:** %R crossing up through −20 as the take profit condition, plus a stop loss.
- **Settings:** Length 14, Interval 1 hour, Condition Crossing up, Value −80. Exit: Condition Crossing up, Value −20.
- **Timeframe:** 1 hour. With one deal at a time it trades about 17 times as often as the daily setup below. About two thirds of the deals closed higher on BTC/USDT, usually by under 1%.
- **When it fails:** in a slide, %R reclaims −80 and price makes new lows before %R ever reaches −20. The average deal was −0.15%, ignoring fees, because the worst lost 13%. In the second example on the chart it bought at 84,333. Price fell to 80,394 (−4.7%) before %R reached −20, and the deal closed at 82,428. Set a stop loss of 2 to 3%, or let small DCA orders handle the slide.

![Annotated BINANCE:BTCUSDT 1h chart with Williams %R(14): a reclaim of −80 at 83,567 that exits at −20 for +1.6%, and a later reclaim at 84,333 that falls 4.7% before %R reaches −20](https://content.gainium.io/images/content/indicators/williams-r__reclaim.webp)

### Daily break above −20 for trend deals

- **Entry:** daily %R(14) crossing up through −20. The close has just reached the top fifth of the 14-day range.
- **Exit:** %R crossing down through −50 as the take profit condition, so the deal holds while price stays in the upper half of the range.
- **Settings:** Length 14, Interval 1 day, Condition Crossing up, Value −20. Exit: Condition Crossing down, Value −50.
- **Timeframe:** 1 day. With one deal at a time it trades rarely, and half the deals closed higher on BTC/USDT. In the chart above, the best bought at 69,335 and closed at 79,112, +14.1%.
- **When it fails:** a spike to the top of the range that reverses within a few bars. In the other example on the chart it bought at 72,667 and closed at 68,114 two bars later, −6.3%. Half the deals lost, the worst 5.4%; the setup depends on catching the occasional long run like the +14.1% one.

![Annotated BINANCE:BTCUSDT daily chart with Williams %R(14): a break above −20 at 69,335 that held to 79,112, and a break at 72,667 that exits at 68,114](https://content.gainium.io/images/content/indicators/williams-r__breakout.webp)

## Using Williams %R in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**. For the exits above, set the take profit type to **Indicators**.
3. Click **Edit** on the condition, then **Change indicator**, and pick **Williams %R**.

![The Select start indicator dialog in the Gainium bot form, searched for Williams, with Williams %R ringed](https://content.gainium.io/images/content/indicators/williams-r__picker.webp)

The fields and their defaults:

- **Use percentile:** off. When on, the condition fires at a percentile of %R's last **Lookback** bars (default 150) instead of a fixed value; **Percentile** defaults to 80. See [Indicator Percentiles](https://gainium.io/help/indicator-percentiles).
- **Length:** 14. The *n* of the formula.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Smoothing:** None. SMA, EMA, WMA, DEMA, TEMA, HMA or RMA smooth the %R line; **Smoothing length** defaults to 14. **Compare** chooses between *Smoothed line vs value* (default) and *Line vs smoothed line*. See [Indicator Smoothing](https://gainium.io/help/indicator-smoothing).
- **Condition:** Crossing down. The options are Crossing up, Crossing down, Greater than, Lower than and Between.
- **Value:** −40. Enter negative numbers: −80 for oversold, −20 for overbought. With Between, an **Upper value** appears.
- **Keep true:** 0. Extra bars the condition stays true after it fires.

![The Williams %R settings card in the Gainium bot form with its defaults: Use percentile off, Length 14, Interval 1 hour, Smoothing None, Condition Crossing down, Value −40, Keep true 0](https://content.gainium.io/images/content/indicators/williams-r__settings.webp)

![The Gainium bot chart on BTC/USDT 1h with the Williams %R pane below price](https://content.gainium.io/images/content/indicators/williams-r__bot-chart.webp)

**Example configuration** (the −80 reclaim): Deal start condition Indicators, Williams %R with Use percentile off, Length 14, Interval 1 hour, Smoothing None, Condition Crossing up, Value −80, Keep true 0. Take profit type Indicators, Williams %R with Length 14, Interval 1 hour, Condition Crossing up, Value −20. Stop loss 3%.

## Related indicators

- [Stochastic](https://gainium.io/indicators/stoch): the same calculation on a 0 to 100 scale, with a signal line and the Zone filter.
- [Relative Strength Index (RSI)](https://gainium.io/indicators/rsi): a slower filter; RSI(14) under 40 in the same group keeps %R entries to real dips.
- [Commodity Channel Index (CCI)](https://gainium.io/indicators/cci): another range-position oscillator, without a fixed floor or ceiling.

## FAQ

### Why is Williams %R negative?

Larry Williams measured how far the close is from the highest high, and plotted that distance as a negative number. 0 means the close is at the top of the range and −100 at the bottom. Enter negative values in Gainium: −80 for oversold, −20 for overbought.

### How is Williams %R different from the Stochastic?

Williams %R is the Stochastic's %K minus 100, with no smoothing and no signal line. The two reach their extremes on the same bars. Use %R when you want one line against a level; use the [Stochastic](https://gainium.io/indicators/stoch) when you want K and D crosses and the Zone filter.

### Is −20 a sell signal?

Not on its own. %R spends about a fifth of its time above −20 on BTC/USDT 1h, 4h and daily. In a rally it stays there for many candles. On the daily chart a cross up through −20 worked better as a buy signal for trend deals than as a sell signal.

### What does the default Value of −40 mean?

It is only a starting value. With the default Condition Crossing down, the condition fires when %R falls through −40, which is the middle of the range. Change it to −80 or −20 for the setups on this page.
