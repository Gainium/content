---
id: 122
name: Ultimate Oscillator
slug: ultimate-oscillator
description: >-
  Learn how to use the Ultimate Oscillator in Gainium for automated trading,
  detecting overbought/oversold conditions, and effectively trading momentum
  divergences.
createdAt: '2024-10-06T12:51:51.641Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-06T12:51:54.365Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.029Z'
templateVersion: 2
tldr: >-
  The Ultimate Oscillator (UO) measures buying pressure against the true range
  over 7, 14 and 28 bars and blends the three, weighting the shortest most. It
  runs from 0 to 100, with 30 and 70 as the classic levels. Because it averages
  three lookbacks it rarely reaches them: on BTC/USDT 4h, RSI(14) spends
  about 13 times as long under 30. Larry Williams' buy signal is a bullish
  divergence with its low under 30, confirmed by a break of the high between
  the two lows. In Gainium you combine the Divergences indicator with a UO
  level to automate it.
kind: native
catalogKeys:
  - UO
category: momentum
aliases:
  - "UO"
  - "Ultimate Oscillator"
  - "Williams Ultimate Oscillator"
faq:
  - title: Why does the Ultimate Oscillator rarely reach 30 or 70?
    details: >-
      It averages three lookbacks, and a 28-bar average moves slowly. On
      BTC/USDT 4h it spends well under 1% of its time under 30, and about
      three times as long over 70. Use 35 to 40 and 60 to 65 when you want
      more signals: on 4h, a cross up through 35 fires about five times as
      often as one through 30.
  - title: What are the default Ultimate Oscillator settings?
    details: >-
      7, 14 and 28 bars, with weights of 4, 2 and 1. Gainium's Fast, Middle
      and Slow lengths default to the same 7, 14 and 28. Keep the 1:2:4 ratio
      if you change them, for example 5, 10 and 20.
  - title: Can Gainium detect Ultimate Oscillator divergences?
    details: >-
      Yes, with the Divergences indicator. Select only the Ultimate Oscillator
      under Oscillators, set Type of divergence to Bullish and Min number of
      divergences to 1. On the BTC/USDT daily chart bullish UO divergences
      are rare, so expect few signals per pair.
  - title: Is the Ultimate Oscillator better than RSI?
    details: >-
      It is smoother, because it blends three lookbacks and uses the true
      range, which counts gaps and wicks. That means fewer false extremes and
      fewer signals. On BTC/USDT 4h, RSI(14) spends about 13 times as long
      under 30 as UO does.
related:
  - divergences-indicator
  - rsi
  - williams-r
sources:
  - title: Larry Williams (1976), via StockCharts ChartSchool, Ultimate Oscillator
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/ultimate-oscillator
  - title: TradingView Help Center, Ultimate Oscillator (UO)
    url: https://www.tradingview.com/support/solutions/43000502328-ultimate-oscillator-uo/
  - title: Gainium, Indicator Smoothing
    url: https://gainium.io/help/indicator-smoothing
  - title: Gainium, Indicator Percentiles
    url: https://gainium.io/help/indicator-percentiles
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

The Ultimate Oscillator (UO) measures how much of each bar's true range the buyers took, over 7, 14 and 28 bars, and blends the three into one line from 0 to 100. Traders use it for oversold entries and, as Larry Williams intended, for bullish divergences confirmed by a breakout of the oscillator. It reaches 30 and 70 far less often than RSI, so each signal is rare.

## What is the Ultimate Oscillator

Larry Williams developed the Ultimate Oscillator in 1976. It was published in *Stocks & Commodities* magazine in 1985. The formula, per bar:

1. **Buying pressure (BP)** = close − the lower of (low, previous close).
2. **True range (TR)** = the higher of (high, previous close) − the lower of (low, previous close).
3. **Average7** = sum of BP over 7 bars / sum of TR over 7 bars. **Average14** and **Average28** are the same over 14 and 28 bars.
4. **UO** = 100 × (4 × Average7 + 2 × Average14 + Average28) / 7.

The shortest window gets four times the weight of the longest. TradingView's defaults are 7, 14 and 28; so are Gainium's.

How to read it:

- **Under 30:** sellers held price near the bottom of each bar's range across all three windows. On BTC/USDT 4h that happens on well under 1% of candles; on 1 hour, about two and a half times as often.
- **Over 70:** the opposite, about three times as often as under 30 on 4h.
- **Williams' buy signal**, in three steps: a bullish divergence (lower low in price, higher low in UO), with the first low under 30, then UO rising above the high it made between the two lows.
- **The sell signal** mirrors it: a bearish divergence with the high over 70, then a drop under the low between the two highs.

![Ultimate Oscillator (7, 14, 28) on BINANCE:BTCUSDT 4h, dark theme: the red UO line stays between about 30 and 78, mostly between 40 and 65](https://content.gainium.io/images/content/indicators/ultimate-oscillator__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Use percentile | Off | Off: the condition tests the fixed Level. On: Level hides and UO is compared with its own Percentile over the last Lookback candles. |
| Lookback | 150 | Candles of the line's own history the percentile is taken from. Percentile mode only. |
| Percentile | 80 | The rank in that history used as the level: 80 is a level that only 20% of readings exceeded. Percentile mode only. |
| Fast length | 7 | The shortest window, weighted 4 in the average. |
| Middle length | 14 | The middle window, weighted 2. |
| Slow length | 28 | The longest window, weighted 1. |
| Interval | 1 hour | Candle size the indicator is calculated on, from 1 minute to 1 week. It does not follow the chart you are looking at. |
| Smoothing | None | A moving average put on the line. With smoothing on, the condition tests the smoothed line. |
| Smoothing length | 14 | Candles in the smoothing average, 1 to 1,000. |
| Compare | Smoothed line vs value | Smoothed line vs value tests the smoothed line against Value. Line vs smoothed line tests the raw line against its own average; Value hides and Between is never true. |
| Condition | Crossing down | Crossing up and Crossing down fire on the one candle where UO passes Level. Greater than and Lower than hold on every candle on that side. Between holds while UO is inside Level and Upper value. |
| Level | 70 | The UO level, 0 to 100. With Between, the lower bound. |
| Upper value | — | Between only: the upper bound. UO must stay above Level and below this. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** UO rarely reaches the classic levels. On BTC/USDT 4h, crossing up through **Level** 35 fires about five times as often as 30, and 40 about three times as often as 35.

**Tip:** **Fast length**, **Middle length** and **Slow length** of 4, 8 and 16 make UO reach the extremes far more often: on 4h they give about seven times as many crosses up through 30 as 7, 14 and 28. The weights stay 4, 2 and 1 whatever lengths you set.

**Tip:** With Condition Between, **Level** 40 and **Upper value** 60, the condition holds while UO stays strictly between them, a middle band it sits in most of the time on 4h. **Upper value** appears only with Between.

## Trading setups for bots

### Deep oversold entry on 4 hours

- **Entry:** UO crossing up through 30.
- **Exit:** UO crossing up through 50 as the take profit condition. That is the middle of the scale, reached within 24 bars after every signal on BTC/USDT 4h.
- **Settings:** Fast length 7, Middle length 14, Slow length 28, Interval 4 hours, Condition Crossing up, Level 30. Exit: Condition Crossing up, Level 50.
- **Timeframe:** 4 hours. It is the rarest setup on this page. With one deal at a time most deals closed higher on BTC/USDT, by +5.0% in the example on the chart and by up to +10.0%.
- **When it fails:** a crash that keeps going after the bounce. One deal bought at 71,595 and closed at 62,730, −12.4%. It also misses lows by a few points: at the low on the chart UO stopped at 31.7, so the bot never bought. Raise the level to 35 for about five times as many deals.

![Annotated BINANCE:BTCUSDT 4h chart with the Ultimate Oscillator: a cross up through 30 at 86,550 that exits at 50 about six bars later for +5.0%, and an earlier low where UO bottomed at 31.7 and no signal fired](https://content.gainium.io/images/content/indicators/ultimate-oscillator__oversold.webp)

### Williams' bullish divergence on the daily chart

- **Entry:** two conditions in the same group. The **Divergences** indicator with only Ultimate Oscillator selected, Type of divergence Bullish, Min number of divergences 1, Interval 1 day and Keep true 10. And UO crossing up through 50 on 1 day. The deal starts when UO climbs back over 50 within 10 daily bars of a flagged divergence.
- **Exit:** take profit 6 to 8%, or UO crossing up through 70.
- **Settings:** Divergences: Oscillators Ultimate Oscillator, Type of divergence Bullish, Min number of divergences 1, Interval 1 day, Keep true 10. UO: Fast length 7, Middle length 14, Slow length 28, Interval 1 day, Condition Crossing up, Level 50.
- **Timeframe:** 1 day. Bullish UO divergences are rare on the daily chart. On their own, only about a third were higher 10 bars later on BTC/USDT. With the UO 50 confirmation, about two thirds of entries were higher 20 bars later. In the chart above it bought at 61,560, and price reached 66,956 within 21 bars.
- **When it fails:** the divergence forms halfway down a larger fall. In the other example on the chart both conditions held at 76,752, and price fell 23% within 20 bars. Williams also required the first low to be under 30, which the Divergences indicator does not check, so keep a stop loss.

![Annotated BINANCE:BTCUSDT daily chart with the Ultimate Oscillator: a lower low in price against a higher UO low, the cross over 50 at 61,560 that followed, and an earlier entry at 76,752 that fell 23%](https://content.gainium.io/images/content/indicators/ultimate-oscillator__divergence.webp)

## Using the Ultimate Oscillator in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**. For the exits above, set the take profit type to **Indicators**.
3. Click **Edit** on the condition, then **Change indicator**, and pick **Ultimate Oscillator**.

![The Select start indicator dialog in the Gainium bot form, searched for Ultimate, with Ultimate Oscillator ringed](https://content.gainium.io/images/content/indicators/ultimate-oscillator__picker.webp)

The fields and their defaults:

- **Use percentile:** off. When on, the condition fires at a percentile of UO's last **Lookback** bars (default 150) instead of a fixed level; **Percentile** defaults to 80. Useful here, because UO rarely reaches 30 or 70. See [Indicator Percentiles](https://gainium.io/help/indicator-percentiles).
- **Fast length:** 7. **Middle length:** 14. **Slow length:** 28. The three windows of the formula.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Smoothing:** None. SMA, EMA, WMA, DEMA, TEMA, HMA or RMA smooth the UO line; **Smoothing length** defaults to 14. **Compare** chooses between *Smoothed line vs value* (default) and *Line vs smoothed line*. See [Indicator Smoothing](https://gainium.io/help/indicator-smoothing).
- **Condition:** Crossing down. The options are Crossing up, Crossing down, Greater than, Lower than and Between.
- **Level:** 70. With Between, an **Upper value** field appears for the upper bound, and UO must stay above Level and below it.
- **Keep true:** 0. Extra bars the condition stays true after it fires.

![The Ultimate Oscillator settings card in the Gainium bot form with its defaults: Use percentile off, Fast length 7, Middle length 14, Slow length 28, Interval 1 hour, Smoothing None, Condition Crossing down, Level 70, Keep true 0](https://content.gainium.io/images/content/indicators/ultimate-oscillator__settings.webp)

![The Gainium bot chart on BTC/USDT 1h with the Ultimate Oscillator pane below price](https://content.gainium.io/images/content/indicators/ultimate-oscillator__bot-chart.webp)

**Example configuration** (the oversold setup): Deal start condition Indicators, Ultimate Oscillator with Use percentile off, Fast length 7, Middle length 14, Slow length 28, Interval 4 hours, Smoothing None, Condition Crossing up, Level 30, Keep true 0. Take profit type Indicators, Ultimate Oscillator with the same lengths, Interval 4 hours, Condition Crossing up, Level 50. Stop loss 10%.

## Related indicators

- [Divergences](https://gainium.io/indicators/divergences-indicator): finds the UO divergences Williams built his signals on.
- [Relative Strength Index (RSI)](https://gainium.io/indicators/rsi): one lookback instead of three, reaching 30 and 70 about ten times as often.
- [Williams %R](https://gainium.io/indicators/williams-r): Larry Williams' faster oscillator, one 14-bar window with no averaging.

## FAQ

### Why does the Ultimate Oscillator rarely reach 30 or 70?

It averages three lookbacks, and a 28-bar average moves slowly. On BTC/USDT 4h it spends well under 1% of its time under 30, and about three times as long over 70. Use 35 to 40 and 60 to 65 when you want more signals: on 4h, a cross up through 35 fires about five times as often as one through 30.

### What are the default Ultimate Oscillator settings?

7, 14 and 28 bars, with weights of 4, 2 and 1. Gainium's Fast, Middle and Slow lengths default to the same 7, 14 and 28. Keep the 1:2:4 ratio if you change them, for example 5, 10 and 20.

### Can Gainium detect Ultimate Oscillator divergences?

Yes, with the [Divergences](https://gainium.io/indicators/divergences-indicator) indicator. Select only the Ultimate Oscillator under Oscillators, set Type of divergence to Bullish and Min number of divergences to 1. On the BTC/USDT daily chart bullish UO divergences are rare, so expect few signals per pair.

### Is the Ultimate Oscillator better than RSI?

It is smoother, because it blends three lookbacks and uses the true range, which counts gaps and wicks. That means fewer false extremes and fewer signals. On BTC/USDT 4h, RSI(14) spends about 13 times as long under 30 as UO does.
