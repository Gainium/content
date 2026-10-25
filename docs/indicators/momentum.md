---
id: 117
name: Momentum
slug: momentum
description: >-
  Learn how to use Gainium’s Momentum Oscillator for automated trading
  strategies, identifying trend strength, reversals, and overbought/oversold
  conditions.
createdAt: '2024-10-06T08:41:16.093Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-06T08:56:39.887Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.017Z'
templateVersion: 2
tldr: >-
  Momentum (MOM) is the price now minus the price a set number of bars ago,
  10 by default. Positive means price is higher than 10 bars back, negative
  means lower. It has no fixed range: the value is in the pair's price units,
  so on BTC/USDT 1h half of all readings are within ±520 USD.
  Bots use the zero-line cross as a trend entry and, with Gainium's percentile
  option, a jump above the 90th percentile of recent readings as a breakout
  entry that works on any pair. Gainium's default Level is 0, the zero line:
  any other level is in price units and has to be set per pair.
kind: native
catalogKeys:
  - MOM
category: momentum
aliases:
  - "MOM"
  - "Momentum"
  - "Momentum Indicator"
  - "Momentum Oscillator"
faq:
  - title: Is Momentum the same as Rate of Change?
    details: >-
      Almost. Momentum is the difference in price (now minus n bars ago), in
      price units. Rate of Change divides that difference by the old price and
      shows a percentage. Both cross zero on the same bar; only their scale
      differs.
  - title: What Level should I use for Momentum?
    details: >-
      0 for zero-line crosses. Any other level is a price difference, so it
      only fits one pair at one price. On BTC/USDT 1h the median absolute
      reading is about 520 and the 90th percentile about 1,766. For a level
      that adapts, turn on Use percentile.
  - title: Why is the default Level 0?
    details: >-
      Momentum is a price difference in the pair's price units, so the zero
      line is the only level that means the same on every pair: price is
      higher or lower than n bars ago. With the default Condition Crossing
      down, Level 0 fires when the 10-bar change turns negative. Any other
      level is an amount of the quote currency for one pair at one price, so
      set it per pair or turn on Use percentile.
  - title: Which price source should I use?
    details: >-
      Close is the default and matches TradingView. hl2, hlc3 and ohlc4
      average the bar and react less to a single wick on the close. Open,
      high and low are available too.
related:
  - awesome-oscillator
  - macd
  - price-change-indicator
sources:
  - title: StockCharts ChartSchool, Rate of Change (ROC), also referred to as Momentum
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/rate-of-change-roc-and-momentum
  - title: TradingView Pine Script reference, ta.mom
    url: https://www.tradingview.com/pine-script-reference/v6/#fun_ta.mom
  - title: Gainium, Indicator Percentiles
    url: https://gainium.io/help/indicator-percentiles
  - title: Gainium, Indicator Smoothing
    url: https://gainium.io/help/indicator-smoothing
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

Momentum (MOM) is the current price minus the price a fixed number of bars ago. Traders use it to see whether a move is speeding up or fading, and its cross of zero to mark a change of direction. Because it is measured in price units, a bot needs either the zero line or Gainium's percentile option to use it across pairs.

## What is Momentum

Momentum is one of the oldest oscillators and has no single inventor. The formula:

**MOM** = price − price *n* bars ago

- **Price** is the source you choose, the close by default.
- ***n*** is the length, 10 by default in Gainium and on TradingView.

The result is in the pair's quote currency. On BTC/USDT 1h, half of all readings are within ±520 USD and 90% within ±1,766. On 4h the same figures are about twice as wide, ±1,164 and ±3,730.

How to read it:

- **Above zero:** price is higher than *n* bars ago. **Below zero:** lower.
- **Zero-line cross:** the 10-bar change flips sign. It is the earliest trend signal Momentum gives, and the noisiest.
- **Rising toward zero from below:** the decline is slowing, even if price is still falling.
- **Spikes:** the size of a reading only means something against the pair's own history. The 90th percentile of the last 150 bars is a better yardstick than a fixed number.
- **Divergence:** a lower low in price with a higher low in Momentum is bullish, as with other oscillators.

![Momentum (10, close) on BINANCE:BTCUSDT 4h, dark theme: the blue Momentum line spikes to about 10,000 in a rally and swings between −5,000 and +5,000 afterwards](https://content.gainium.io/images/content/indicators/momentum__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Length | 10 | Candles between the two prices compared, 1 to 500. |
| Price source | close | The price used: open, high, low, close, hl2, hlc3 or ohlc4. |
| Interval | 1 hour | Candle size the indicator is calculated on, from 1 minute to 1 week. It does not follow the chart you are looking at. |
| Smoothing | None | A moving average put on the line. With smoothing on, the condition tests the smoothed line. |
| Smoothing length | 14 | Candles in the smoothing average, 1 to 1,000. |
| Compare | Smoothed line vs value | Smoothed line vs value tests the smoothed line against Value. Line vs smoothed line tests the raw line against its own average; Value hides and Between is never true. |
| Condition | Crossing down | Crossing up and Crossing down fire on the one candle where Momentum passes Level. Greater than and Lower than hold on every candle on that side. Between holds while Momentum is inside Level and Upper value. |
| Level | 0 | The Momentum level, in the pair's price units. The default 0 is the zero line, the one level that means the same on every pair. With Between, the lower bound. |
| Upper value | — | Between only: the upper bound, also in price units. Momentum must stay above Level and below this. |
| Use percentile | Off | Off: the condition tests the fixed Level. On: Level hides and Momentum is compared with its own Percentile over the last Lookback candles, one threshold for any pair. |
| Lookback | 150 | Candles of the line's own history the percentile is taken from. Percentile mode only. |
| Percentile | 80 | The rank in that history used as the level: 80 is a level that only 20% of readings exceeded. Percentile mode only. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** The default **Level** 0 is the zero line. Any other Level is in price units: on BTC/USDT 1h, Momentum is more than 70 away from zero on 92% of candles, so a Level of 70 crosses about as often as the zero line and says nothing more. Set a non-zero Level per pair, or turn on Use percentile.

**Tip:** **Price source** hl2 or ohlc4 cuts the whipsaws of the zero line. On BTC/USDT 1h, Momentum(10) on hl2 gives about 15% fewer crosses up through 0 than on close, and on ohlc4 about a quarter fewer.

**Tip:** **Length** 20 instead of 10 cuts the daily zero-line crosses up by about a third.

## Trading setups for bots

### Zero-line cross on the daily chart

- **Entry:** Momentum(10) crossing up through 0.
- **Exit:** Momentum crossing down through 0 as the take profit condition.
- **Settings:** Length 10, Price source close, Interval 1 day, Condition Crossing up, Level 0. Exit: Condition Crossing down, Level 0.
- **Timeframe:** 1 day. With one deal at a time on BTC/USDT, fewer than a quarter of the deals closed higher, and the average deal lost 0.5%, ignoring fees. The few that caught a trend were large: +14.6% and +11.6%, the second one shown on the chart.
- **When it fails:** in ranges, where the 10-day change flips sign within a few bars. In the second example on the chart it bought at 81,270 and closed seven bars later at 76,569, −5.8%. Use it only for deals you want to hold through a trend, and accept many small losses.

![Annotated BINANCE:BTCUSDT daily chart with Momentum(10): a zero cross at 69,335 that exits at 77,340, and a later cross at 81,270 that exits seven bars later at 76,569](https://content.gainium.io/images/content/indicators/momentum__zero-cross.webp)

### Momentum burst with percentiles

- **Entry:** Momentum crossing up through its own 90th percentile over the last 150 bars. That is a 10-bar move larger than 90% of recent ones, whatever the pair's price.
- **Exit:** take profit 1.5%.
- **Settings:** Length 10, Price source close, Interval 1 hour, Condition Crossing up, Use percentile on, Lookback 150, Percentile 90.
- **Timeframe:** 1 hour. On BTC/USDT it fires about nine times as often as the daily zero-line cross above. Price traded 1.5% above the entry within 24 bars after just under half the signals. In the first example on the chart it fired at 77,576, and price rose 5.4% within 24 bars.
- **When it fails:** a burst at the end of a move rather than the start. In the second example it fired at 83,880, and price fell 1.3% within eight bars.

![Annotated BINANCE:BTCUSDT 1h chart with Momentum(10): a burst at 77,576 before a 5.4% rise, and a later burst at 83,880 before a 1.3% drop](https://content.gainium.io/images/content/indicators/momentum__burst.webp)

## Using Momentum in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**. For the exit above, set the take profit type to **Indicators**.
3. Click **Edit** on the condition, then **Change indicator**, and pick **Momentum**.

![The Select start indicator dialog in the Gainium bot form, searched for Momentum, with Momentum ringed among the other momentum indicators](https://content.gainium.io/images/content/indicators/momentum__picker.webp)

The fields and their defaults:

- **Length:** 10. The *n* of the formula, 1 to 500.
- **Price source:** close. The options are open, high, low, close, hl2, hlc3 and ohlc4.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Smoothing:** None. SMA, EMA, WMA, DEMA, TEMA, HMA or RMA smooth the Momentum line; **Smoothing length** defaults to 14. **Compare** chooses between *Smoothed line vs value* (default) and *Line vs smoothed line*. See [Indicator Smoothing](https://gainium.io/help/indicator-smoothing).
- **Condition:** Crossing down. The options are Crossing up, Crossing down, Greater than, Lower than and Between.
- **Level:** 0, the zero line. Any other level is in price units, so set it per pair. With Between, an **Upper value** appears for the upper bound.
- **Use percentile:** off. When on, the Level is hidden and the condition fires at the **Percentile** (default 80) of the last **Lookback** bars (default 150). See [Indicator Percentiles](https://gainium.io/help/indicator-percentiles).
- **Keep true:** 0. Extra bars the condition stays true after it fires.

![The Momentum settings card in the Gainium bot form with its defaults: Length 10, Price source close, Interval 1 hour, Smoothing None, Condition Crossing down, Level 0, Use percentile off, Keep true 0](https://content.gainium.io/images/content/indicators/momentum__settings.webp)

![The Gainium bot chart on BTC/USDT 1h with the Momentum pane below price](https://content.gainium.io/images/content/indicators/momentum__bot-chart.webp)

**Example configuration** (the burst setup): Deal start condition Indicators, Momentum with Length 10, Price source close, Interval 1 hour, Smoothing None, Condition Crossing up, Use percentile on, Lookback 150, Percentile 90, Keep true 0. Take profit 1.5%.

## Related indicators

- [Awesome Oscillator](https://gainium.io/indicators/awesome-oscillator): also in price units around zero, but built from two moving averages, so it whipsaws less.
- [MACD](https://gainium.io/indicators/macd): a smoothed measure of the same speed of price, with a signal line for crosses.
- [Price % Change](https://gainium.io/indicators/price-change-indicator): the candle's price change as a percentage, a threshold that fits any pair without percentiles.
