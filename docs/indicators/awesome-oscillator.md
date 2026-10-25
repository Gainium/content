---
id: 123
name: Awesome Oscillator
slug: awesome-oscillator
description: >-
  Learn how to use the Awesome Oscillator in Gainium for automated trading,
  detecting trend reversals, and capturing market momentum with detailed
  strategy examples.
createdAt: '2024-10-06T13:00:26.149Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-06T13:00:29.057Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:29.993Z'
templateVersion: 2
tldr: >-
  The Awesome Oscillator (AO) is the 5-bar simple moving average of the median
  price minus the 34-bar one, drawn as a histogram around zero. Above zero the
  short-term average is above the long-term one. It is in price units, so its
  size depends on the pair: on BTC/USDT 4h it swings by thousands, so a value
  that fits BTC means nothing on a $1 coin. Bots use the zero-line cross as a trend entry and the AO
  turning up through its own short average as an early dip entry. In Gainium
  the 5 and 34 lengths are fixed; you set the interval, condition and value,
  with optional smoothing and percentiles.
kind: native
catalogKeys:
  - AO
category: momentum
aliases:
  - "AO"
  - "Awesome Oscillator"
  - "Bill Williams AO"
faq:
  - title: Can I change the 5 and 34 lengths of the Awesome Oscillator in Gainium?
    details: >-
      No. Gainium uses Bill Williams' fixed 5 and 34 bars on the median price,
      the same as TradingView's default. You choose the Interval, the
      condition and the value.
  - title: What value should I use for the Awesome Oscillator?
    details: >-
      0 for zero-line crosses, which works on every pair. Any other value is
      in price units, so 500 means something different on BTC and on a $1
      coin. For "unusually strong" or "unusually weak", turn on Use
      percentile instead of picking a number.
  - title: What do the green and red bars mean on TradingView?
    details: >-
      A green bar is higher than the bar before it, a red bar is lower. The
      color shows whether AO is rising or falling, not whether it is above
      zero. Gainium's bot conditions read the AO value, not the bar color.
  - title: Can a Gainium bot trade AO twin peaks or saucers?
    details: >-
      Not as named patterns. Twin peaks are two AO lows under zero with the
      second one higher, which is a divergence between AO and itself. The
      closest automation is the Divergences indicator with Awesome Oscillator
      selected, or the AO turning up through its own 5-bar average while it
      is under zero.
related:
  - macd
  - momentum
  - divergences-indicator
sources:
  - title: TradingView Help Center, Awesome Oscillator (AO), created by Bill Williams
    url: https://www.tradingview.com/support/solutions/43000501826-awesome-oscillator-ao/
  - title: Gainium, Indicator Smoothing
    url: https://gainium.io/help/indicator-smoothing
  - title: Gainium, Indicator Percentiles
    url: https://gainium.io/help/indicator-percentiles
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

The Awesome Oscillator (AO) is the gap between a 5-bar and a 34-bar simple moving average of the median price, drawn as a histogram around zero. Traders read a cross above zero as the short-term trend turning up, and use the bars' slope to time entries. In a bot, the zero-line cross is a trend entry, and AO turning up through its own short average is an earlier entry on dips.

## What is the Awesome Oscillator

Bill Williams created the Awesome Oscillator. The formula:

- **Median price** = (high + low) / 2 for each bar.
- **AO** = SMA(median price, 5) − SMA(median price, 34).

The 5 and 34 are fixed in Williams' definition, in TradingView's default and in Gainium. AO is in the pair's price units: in the BTC/USDT 4h chart below it runs from about −2,500 to +9,300.

How to read it:

- **Above zero:** the 5-bar average is above the 34-bar one, so recent prices are higher than the longer average. **Below zero:** the opposite.
- **Zero-line cross:** the two averages cross. It is the same event as a 5/34 moving average crossover on the median price.
- **Bar colors on TradingView:** green when the bar is higher than the one before, red when lower. A run of green bars under zero means the decline is slowing.
- **Saucer:** above zero, two red bars (the second lower) followed by a green bar is bullish; below zero, the mirror is bearish.
- **Twin peaks:** two lows under zero, the second one higher, followed by a green bar, is bullish. The mirror above zero is bearish.

![Awesome Oscillator on BINANCE:BTCUSDT 4h, dark theme: green and red histogram bars around zero, with the largest bars above 8,000 during a rally](https://content.gainium.io/images/content/indicators/awesome-oscillator__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Use percentile | Off | Off: the condition tests the fixed Value. On: Value hides and AO is compared with its own Percentile over the last Lookback candles, one threshold for any pair. |
| Lookback | 150 | Candles of the line's own history the percentile is taken from. Percentile mode only. |
| Percentile | 80 | The rank in that history used as the level: 80 is a level that only 20% of readings exceeded. Percentile mode only. |
| Interval | 1 hour | Candle size of the 5 and 34-candle averages, from 1 minute to 1 week. There are no length fields. |
| Smoothing | None | A moving average put on the line. With smoothing on, the condition tests the smoothed line. |
| Smoothing length | 14 | Candles in the smoothing average, 1 to 1,000. |
| Compare | Smoothed line vs value | Smoothed line vs value tests the smoothed line against Value. Line vs smoothed line tests the raw line against its own average; Value hides and Between is never true. |
| Condition | Crossing down | Crossing up and Crossing down fire on the one candle where the line passes Value. Greater than and Lower than hold on every candle on that side. Between holds while the line is inside Value and Upper value. |
| Value | 0 | The AO level, in the pair's price units. 0 is the zero-line cross. |
| Upper value | — | Between only: the second bound. The line must be strictly between the two. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** AO has no length fields: 5 and 34 are fixed, so **Interval** is the only way to slow it down. On BTC/USDT, 1 hour gives about four times as many crosses up through 0 as 4 hours, and 4 hours about eight times as many as 1 day.

**Tip:** Any **Value** other than 0 is in price units. For "unusually strong", turn on **Use percentile** with Percentile 90 and Crossing up instead: on BTC/USDT 4h that fires about half as often as the zero-line cross, and the same settings fit any pair.

## Trading setups for bots

### Zero-line cross for trend deals

- **Entry:** AO crossing up through 0.
- **Exit:** AO crossing down through 0 as the take profit condition. The deal rides the trend for as long as the 5-bar average stays above the 34-bar one.
- **Settings:** Interval 4 hours, Condition Crossing up, Value 0. Exit: Condition Crossing down, Value 0.
- **Timeframe:** 4 hours or 1 day. With one deal at a time on BTC/USDT 4h, only about a third of the deals closed higher and the average deal lost 0.5%, ignoring fees, but the best gained 21.3%. On the daily chart it trades about an eighth as often, half the deals closed higher, and the average was +2.0%.
- **When it fails:** sideways markets. AO hovers around zero and crosses it again within a few bars, each cross a small loss. In the first example on the chart it bought at 63,774 and closed about 12 bars later at 61,550, −3.5%.

![Annotated BINANCE:BTCUSDT 4h chart with the Awesome Oscillator: a cross above zero at 63,774 that reverses about 12 bars later for −3.5%, and the next cross at 62,719 that holds about 40 bars and exits at 64,283 for +2.5%](https://content.gainium.io/images/content/indicators/awesome-oscillator__zero-cross.webp)

### AO turning up under zero

- **Entry:** two AO conditions in the same group. The first tests AO against its own 5-bar SMA with **Compare** *Line vs smoothed line*, Condition Crossing up. The second requires AO lower than 0. The deal starts when a decline begins to slow, before the zero cross.
- **Exit:** take profit 1%.
- **Settings:** condition 1: Interval 1 hour, Smoothing SMA, Smoothing length 5, Compare *Line vs smoothed line*, Condition Crossing up. Condition 2: Interval 1 hour, Smoothing None, Condition Lower than, Value 0.
- **Timeframe:** 1 hour. On BTC/USDT it fires nearly twice as often as AO crosses up through 0 on the same interval. Price traded 1% above the entry within 24 bars after just over half the signals.
- **When it fails:** a slowdown that is not a bottom. In the second example on the chart it fired at 81,778, and price fell 2.4% before the next bounce.

![Annotated BINANCE:BTCUSDT 1h chart with the Awesome Oscillator: a turn under zero at 82,149 that is 2.2% higher within 24 bars, and an earlier turn at 81,778 that falls 2.4% first](https://content.gainium.io/images/content/indicators/awesome-oscillator__turn.webp)

## Using the Awesome Oscillator in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**. For the exit above, set the take profit type to **Indicators**.
3. Click **Edit** on the condition, then **Change indicator**, and pick **Awesome Oscillator**.

![The Select start indicator dialog in the Gainium bot form, searched for Awesome, with Awesome Oscillator ringed](https://content.gainium.io/images/content/indicators/awesome-oscillator__picker.webp)

The fields and their defaults:

- **Use percentile:** off. When on, the condition fires at a percentile of AO's last **Lookback** bars (default 150) instead of a fixed value; **Percentile** defaults to 80. This is the way to say "AO unusually high" on any pair. See [Indicator Percentiles](https://gainium.io/help/indicator-percentiles).
- **Interval:** 1 hour, from 1 minute to 1 week. There are no length fields: AO always uses 5 and 34 bars.
- **Smoothing:** None. SMA, EMA, WMA, DEMA, TEMA, HMA or RMA smooth the AO line; **Smoothing length** defaults to 14. **Compare** chooses between *Smoothed line vs value* (default) and *Line vs smoothed line*, which the second setup uses. See [Indicator Smoothing](https://gainium.io/help/indicator-smoothing).
- **Condition:** Crossing down. The options are Crossing up, Crossing down, Greater than, Lower than and Between.
- **Value:** 0, in the pair's price units. With Between, an **Upper value** appears.
- **Keep true:** 0. Extra bars the condition stays true after it fires.

![The Awesome Oscillator settings card in the Gainium bot form with its defaults: Use percentile off, Interval 1 hour, Smoothing None, Condition Crossing down, Value 0, Keep true 0](https://content.gainium.io/images/content/indicators/awesome-oscillator__settings.webp)

![The Gainium bot chart on BTC/USDT 1h with the Awesome Oscillator pane below price](https://content.gainium.io/images/content/indicators/awesome-oscillator__bot-chart.webp)

**Example configuration** (the zero-line cross on the daily chart): Deal start condition Indicators, Awesome Oscillator with Use percentile off, Interval 1 day, Smoothing None, Condition Crossing up, Value 0, Keep true 0. Take profit type Indicators, Awesome Oscillator with Interval 1 day, Condition Crossing down, Value 0. Stop loss 8%.

## Related indicators

- [MACD](https://gainium.io/indicators/macd): the same idea of a fast minus a slow average, on exponential averages of the close, with a signal line.
- [Momentum](https://gainium.io/indicators/momentum): another price-unit oscillator around zero, measured from one bar instead of two averages.
- [Divergences](https://gainium.io/indicators/divergences-indicator): flags divergences between price and AO, the automated cousin of twin peaks.

## FAQ

### Can I change the 5 and 34 lengths of the Awesome Oscillator in Gainium?

No. Gainium uses Bill Williams' fixed 5 and 34 bars on the median price, the same as TradingView's default. You choose the Interval, the condition and the value.

### What value should I use for the Awesome Oscillator?

0 for zero-line crosses, which works on every pair. Any other value is in price units, so 500 means something different on BTC and on a $1 coin. For "unusually strong" or "unusually weak", turn on **Use percentile** instead of picking a number.

### What do the green and red bars mean on TradingView?

A green bar is higher than the bar before it, a red bar is lower. The color shows whether AO is rising or falling, not whether it is above zero. Gainium's bot conditions read the AO value, not the bar color.

### Can a Gainium bot trade AO twin peaks or saucers?

Not as named patterns. Twin peaks are two AO lows under zero with the second one higher, which is a divergence between AO and itself. The closest automation is the [Divergences](https://gainium.io/indicators/divergences-indicator) indicator with Awesome Oscillator selected, or the AO turning up through its own 5-bar average while it is under zero.
