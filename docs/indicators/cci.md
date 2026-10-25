---
id: 118
name: Commodity Channel Index (CCI)
slug: cci
description: >-
  Learn how to use the Commodity Channel Index (CCI) in Gainium to automate
  trading strategies, detect trends, and identify overbought/oversold
  conditions.
createdAt: '2024-10-06T09:17:03.242Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-06T09:17:05.240Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.000Z'
templateVersion: 2
tldr: >-
  The Commodity Channel Index (CCI) measures how far the typical price is from
  its 20-bar average, in units of the average deviation. It has no fixed
  range: most readings fall between −100 and +100, and moves outside that band
  mark unusual strength or weakness. Bots use it two ways: a long entry when
  CCI climbs back above −100 after a sell-off, and a trend entry when it
  breaks above +100. In Gainium the CCI has Length 20 by default and supports
  smoothing and percentiles.
kind: native
catalogKeys:
  - CCI
category: momentum
aliases:
  - "CCI"
  - "Commodity Channel Index"
  - "CCI indicator"
faq:
  - title: What is a good CCI value to buy?
    details: >-
      There is no fixed one, because CCI is not bounded. The common long entry
      is CCI crossing up through −100, the moment price stops falling away
      from its average. On BTC/USDT 4h a cross back up through −200 is much
      rarer, about a third as often.
  - title: Why does CCI go beyond 200 or −200?
    details: >-
      CCI divides the distance from the average by the mean deviation of the
      last 20 bars. After a quiet stretch the mean deviation is small, so the
      first big candle can push CCI to 300 or more. On BTC/USDT daily it has
      gone past 400.
  - title: Does Gainium's CCI use the close or the typical price?
    details: >-
      The typical price, (high + low + close) / 3, as in Lambert's formula and
      TradingView's default. There is no price source field.
  - title: Should I use CCI for mean reversion or for trends?
    details: >-
      Both work with different levels. Crossing back up through −100 is a
      mean-reversion entry: on BTC/USDT 4h about three in four deals closed
      higher. Crossing up through +100 is a trend entry: on the daily chart
      fewer than half its deals won, but the winners were the largest moves.
related:
  - rsi
  - williams-r
  - bb
sources:
  - title: Donald Lambert, Commodities magazine (1980), via StockCharts ChartSchool, Commodity Channel Index (CCI)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/commodity-channel-index-cci
  - title: TradingView Help Center, Commodity Channel Index (CCI)
    url: https://www.tradingview.com/support/solutions/43000502001-commodity-channel-index-cci/
  - title: Gainium, Indicator Smoothing
    url: https://gainium.io/help/indicator-smoothing
  - title: Gainium, Indicator Percentiles
    url: https://gainium.io/help/indicator-percentiles
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

The Commodity Channel Index (CCI) measures how far price has moved from its recent average, scaled so that most readings fall between −100 and +100. Traders use a cross back above −100 to buy after a sell-off, and a break above +100 to join a new trend. Because the scale is open-ended, the same indicator serves mean-reversion bots and trend bots with different levels.

## What is CCI

Donald Lambert introduced the CCI in *Commodities* magazine in 1980. The formula:

1. **Typical price (TP)** = (high + low + close) / 3 for each bar.
2. **SMA** = the simple moving average of TP over *n* bars, 20 by default.
3. **Mean deviation** = the average of |TP − SMA| over the same *n* bars.
4. **CCI** = (TP − SMA) / (0.015 × mean deviation).

Lambert chose the 0.015 constant so that 70 to 80% of readings would fall between −100 and +100. Crypto moves more: on BTC/USDT 4h, CCI(20) spends about 40% of its bars outside that band, and about 7% beyond ±200. TradingView's default is length 20 on the typical price. Gainium uses the same formula with Length 20.

How to read it:

- **Above +100:** price is unusually far above its average. Lambert read this as the start of a strong move, not as overbought.
- **Below −100:** unusually far below. A cross back up through −100 means the push away from the average has stopped.
- **Zero line:** price at its 20-bar average. Crosses of zero flip the short-term bias.
- **No ceiling:** the daily CCI on BTC/USDT has ranged from about −250 to past +400. Thresholds that suit one pair or timeframe will not suit another; [percentiles](https://gainium.io/help/indicator-percentiles) avoid that.
- **Length:** a 10-bar CCI spends more time outside ±100, a 40-bar CCI less.

![CCI(20) on BINANCE:BTCUSDT 4h, dark theme: the blue CCI line, with TradingView's yellow moving average, swings past the +100 and −100 bands and reaches about +350 in a rally](https://content.gainium.io/images/content/indicators/cci__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Use percentile | Off | Off: the condition tests the fixed Value. On: Value hides and CCI is compared with its own Percentile over the last Lookback candles. |
| Lookback | 150 | Candles of the line's own history the percentile is taken from. Percentile mode only. |
| Percentile | 80 | The rank in that history used as the level: 80 is a level that only 20% of readings exceeded. Percentile mode only. |
| Length | 20 | Candles in the average of the typical price and in its mean deviation, 1 to 200. |
| Interval | 1 hour | Candle size the indicator is calculated on, from 1 minute to 1 week. It does not follow the chart you are looking at. |
| Smoothing | None | A moving average put on the line. With smoothing on, the condition tests the smoothed line. |
| Smoothing length | 14 | Candles in the smoothing average, 1 to 1,000. |
| Compare | Smoothed line vs value | Smoothed line vs value tests the smoothed line against Value. Line vs smoothed line tests the raw line against its own average; Value hides and Between is never true. |
| Condition | Crossing down | Crossing up and Crossing down fire on the one candle where the line passes Value. Greater than and Lower than hold on every candle on that side. Between holds while the line is inside Value and Upper value. |
| Value | 100 | The CCI level, −1,000 to 1,000. Most readings fall between −200 and +200. |
| Upper value | — | Between only: the second bound. The line must be strictly between the two. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** The default, Crossing down through **Value** 100, fires when strength fades, and often: on BTC/USDT 1h about four times as often as the −100 reclaim below fires on 4h. For the dip entry on this page, set Crossing up and Value −100.

**Tip:** **Length** changes the number of signals more than the time spent outside ±100. On BTC/USDT 4h, CCI spends about 40% of its bars outside the band at Length 10, 20 and 40 alike. But Length 10 gives about 1.6× as many crosses up through −100 as Length 20, and Length 40 about 20% fewer.

## Trading setups for bots

### Reclaim of −100 for a long DCA bot

- **Entry:** CCI(20) crossing up through −100.
- **Exit:** CCI crossing up through +100 as the take profit condition, or a fixed take profit of 2 to 3%.
- **Settings:** Length 20, Interval 4 hours, Condition Crossing up, Value −100. For the exit: Condition Crossing up, Value 100.
- **Timeframe:** 4 hours. With one deal at a time and the +100 exit, about three in four deals on BTC/USDT closed higher. In the chart above, one deal bought at 64,435 and closed at 69,038 about six bars later, +7.1%.
- **When it fails:** in a crash, CCI reclaims −100 for one bar and price keeps falling. In the example on the chart, it bought at 77,760; about 24 bars later BTC traded at 60,000, 22.8% lower. The worst deal lost 18.2% before CCI reached +100, so this setup needs a stop loss or DCA orders sized for that depth.

![Annotated BINANCE:BTCUSDT 4h chart with CCI(20): a reclaim of −100 at 77,760 before the crash to 60,000, and a later reclaim at 64,435 that reaches +100 about six bars later](https://content.gainium.io/images/content/indicators/cci__reclaim.webp)

### Trend entry above +100 on the daily chart

- **Entry:** daily CCI(20) crossing up through +100.
- **Exit:** CCI crossing down through 0 as the take profit condition. The deal stays open as long as price holds above its 20-day average.
- **Settings:** Length 20, Interval 1 day, Condition Crossing up, Value 100. Exit: Condition Crossing down, Value 0.
- **Timeframe:** 1 day. With one deal at a time it makes about a sixth as many deals as the 4-hour reclaim above. Fewer than half closed higher: the best bought at 69,335 and closed at 78,306 about 21 bars later, +12.9%.
- **When it fails:** a breakout that reverses within a few bars. In the chart above, one deal bought at 72,667 and closed at 67,263 three bars later, −7.4%. Most deals lose; the result depends on catching a long run like the best one.

![Annotated BINANCE:BTCUSDT daily chart with CCI(20): a break above +100 at 69,335 held until the zero-line exit at 78,306, and a break at 72,667 that exits at 67,263](https://content.gainium.io/images/content/indicators/cci__breakout.webp)

## Using CCI in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**. For the exits above, set the take profit type to **Indicators**.
3. Click **Edit** on the condition, then **Change indicator**, and pick **Commodity Channel Index (CCI)**.

![The Select start indicator dialog in the Gainium bot form, searched for CCI, with Commodity Channel Index (CCI) ringed](https://content.gainium.io/images/content/indicators/cci__picker.webp)

The fields and their defaults:

- **Use percentile:** off. When on, the condition fires at a percentile of the CCI's last **Lookback** bars (default 150) instead of a fixed value; **Percentile** defaults to 80. Useful here, because CCI has no fixed range. See [Indicator Percentiles](https://gainium.io/help/indicator-percentiles).
- **Length:** 20, from 1 to 200.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Smoothing:** None. SMA, EMA, WMA, DEMA, TEMA, HMA or RMA smooth the CCI line; **Smoothing length** defaults to 14. **Compare** chooses between *Smoothed line vs value* (default) and *Line vs smoothed line*, which tests the CCI against its own average. See [Indicator Smoothing](https://gainium.io/help/indicator-smoothing).
- **Condition:** Crossing down. The options are Crossing up, Crossing down, Greater than, Lower than and Between.
- **Value:** 100, from −1,000 to 1,000. With Between, an **Upper value** appears.
- **Keep true:** 0. Extra bars the condition stays true after it fires.

![The CCI settings card in the Gainium bot form with its defaults: Use percentile off, Length 20, Interval 1 hour, Smoothing None, Condition Crossing down, Value 100, Keep true 0](https://content.gainium.io/images/content/indicators/cci__settings.webp)

![The Gainium bot chart on BTC/USDT 1h with the CCI pane below price](https://content.gainium.io/images/content/indicators/cci__bot-chart.webp)

**Example configuration** (the −100 reclaim): Deal start condition Indicators, CCI with Use percentile off, Length 20, Interval 4 hours, Smoothing None, Condition Crossing up, Value −100, Keep true 0. Take profit type Indicators, CCI with Length 20, Interval 4 hours, Condition Crossing up, Value 100. Stop loss 15%.

## Related indicators

- [Relative Strength Index (RSI)](https://gainium.io/indicators/rsi): bounded at 0 and 100, a steadier filter next to the open-ended CCI.
- [Williams %R](https://gainium.io/indicators/williams-r): also measures where price sits against its recent range, on a fixed 0 to −100 scale.
- [Bollinger Bands](https://gainium.io/indicators/bb): bands at a distance from a 20-bar average, the price-chart view of the same stretch CCI measures.
