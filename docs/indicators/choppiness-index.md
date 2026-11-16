---
id: 1061
name: Choppiness Index (CHOP)
slug: choppiness-index
description: >-
  Use the Choppiness Index in Gainium bots: a 0 to 100 reading of whether
  price has been ranging or trending over the last 14 candles, as a regime
  filter for grid and trend bots.
createdAt: '2026-11-16T12:00:00.000Z'
updatedAt: '2026-11-16T12:00:00.000Z'
publishedAt: '2026-11-16T12:00:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
  - trend
ingested: false
ingestedAt: ''
templateVersion: 2
tldr: >-
  The Choppiness Index (CHOP) compares the sum of the last 14 candles' true
  ranges with their overall high-low range, on a 0 to 100 scale. Above 61.8
  price has been moving back and forth inside its range; below 38.2 it has
  been travelling. It says nothing about direction. E.W. Dreiss created it. A
  bot can test CHOP against a level: crossing up, crossing down, greater than
  or lower than. The default fires when CHOP crosses down through 61.8 on
  1-hour candles. Use it as a filter next to a condition that picks the side.
kind: native
catalogKeys:
  - CHOP
category: trend
aliases:
  - "CHOP"
  - "Choppiness Index"
  - "Choppiness"
  - "Choppy market indicator"
faq:
  - title: Does a low Choppiness Index mean price will go up?
    details: >-
      No. CHOP has no direction. A reading under 38.2 comes after a strong
      rise and after a strong fall alike. Pair it with a condition that picks
      the side, for example price above its EMA 50.
  - title: Why 61.8 and 38.2?
    details: >-
      They are Fibonacci ratios, the conventional levels for the index. The
      math does not give them any special meaning. On BTC/USDT 4h, CHOP(14) is
      above 61.8 on about 7% of candles and below 38.2 on about 14%.
  - title: Does a high Choppiness Index mean the range will hold?
    details: >-
      Not by itself. CHOP describes the last 14 candles. On BTC/USDT 4h, the
      range over the next 24 candles was about the same size after readings
      above 61.8 as after readings below 38.2, even though the past range was
      about two and a half times narrower.
  - title: Why does Gainium's first Choppiness value come one candle later than TradingView's?
    details: >-
      Every candle in the sum needs a previous close for its true range.
      TradingView's first value uses the opening candle's high minus low
      instead, which depends on where the chart starts. Every later value is
      the same.
related:
  - adx
  - bbw
  - moving-averages
  - atr
sources:
  - title: TradingView Help Center, Choppiness Index (CHOP), created by E.W. Dreiss; formula 100 × log10(Σ ATR(1), n / (highest high − lowest low)) / log10(n)
    url: https://www.tradingview.com/support/solutions/43000501980-choppiness-index-chop/
  - title: Gainium, Bot Controller
    url: https://gainium.io/help/bot-controller
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

The Choppiness Index (CHOP) measures whether price has been ranging or trending over the last 14 candles, on a 0 to 100 scale. Traders use it to switch strategies: high readings suit range trades such as grids, low readings suit trend entries. It has no direction, so in Gainium it works as a filter next to a condition that picks long or short.

## What is the Choppiness Index

The Australian commodity trader E.W. Dreiss created the index. Gainium's line matches TradingView's built-in Choppiness Index.

For *n* candles, 14 by default:

**CHOP = 100 × log10( Σ true range / (highest high − lowest low) ) / log10(*n*)**

- **True range** of a candle is the largest of high − low, high − previous close and previous close − low. The sum adds up how far price travelled candle by candle.
- **Highest high − lowest low** is how far price got overall in the *n* candles.
- When price moves straight in one direction, the two are close and CHOP is low. When price goes back and forth, the candles add up to far more travel than the overall range, and CHOP is high.

How to read it:

- **Above 61.8:** choppy. The conventional level for a ranging market. On BTC/USDT 4h, CHOP(14) is above it on about 7% of candles.
- **Below 38.2:** trending. On BTC/USDT 4h, about 14% of candles.
- **No direction.** A sharp fall drives CHOP as low as a sharp rise.
- **It looks back, not forward.** When CHOP is above 61.8, the last 14 candles' range on BTC/USDT 4h is about two and a half times narrower than when it is below 38.2. The next 24 candles' range is about the same size in both cases. A quiet range is often followed by a breakout.

Two edge cases differ from TradingView. When the 14 candles have no range at all, Gainium returns 100, a market with nothing trending; TradingView shows no value. Gainium's first value comes one candle later than TradingView's, because every candle in the sum needs a previous close. Every value after that is the same.

![Choppiness Index (14) on BINANCE:BTCUSDT 4h, dark theme: the blue CHOP line moves between about 28 and 72, inside dashed bands at 61.8 and 38.2, and drops under 38.2 as price falls on the right](https://content.gainium.io/images/content/indicators/choppiness-index__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Length | 14 | Candles whose true ranges are summed and compared with their overall high-low range, 2 to 1,000. |
| Interval | 1 hour | Candle size CHOP is calculated on, from 1 minute to 1 week. It does not follow the chart you are looking at. |
| Condition | Crossing down | Crossing up and crossing down fire on the candle where CHOP passes Value. Greater than and Lower than hold on every candle on that side. |
| Value | 61.8 | The CHOP level, 0 to 100, in steps of 0.1. 61.8 and 38.2 are the conventional choppy and trending levels. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** **Length** 28 makes the extremes rare. On BTC/USDT 4h, CHOP(28) is above 61.8 on about 4% of candles, against 7% for Length 14, and crosses down 38.2 about 0.4 times as often.

**Tip:** **Length** 7 roughly doubles the crosses down 38.2 compared with Length 14 on BTC/USDT 4h. The line then follows a few large candles, not a regime.

**Tip:** The default, **Condition** Crossing down with **Value** 61.8, fires when a choppy stretch ends. It says the range is breaking, not which way.

## Trading setups for bots

### Start a grid while the market is choppy

A grid earns on price going back and forth. This setup opens a combo bot's grid only when the last 14 candles were choppy.

- **Entry:** a Combo bot with **Deal start condition** Indicators: Choppiness Index, Length **14**, Condition **Greater than**, Value **61.8**, Interval 4 hours.
- **Exit:** the combo deal's take profit, plus a stop loss a few percent under the range the grid covers.
- **Settings:** Value 61.8 on 4 hours. On 1 hour CHOP is above 61.8 on about 9% of candles, a little more often than on 4 hours.
- **Timeframe:** 4 hours.
- **When it fails:** CHOP describes the range that was, not the one that comes. On BTC/USDT 4h, the next 24 candles covered a range about as wide after readings above 61.8 as after readings below 38.2. In the chart below, CHOP sat above 61.8 while price held a 2.3% range, and two days later price fell 3.9% under it. Set the grid's stop loss before you rely on the regime.

![Annotated Choppiness Index chart, BINANCE:BTCUSDT 4h: CHOP above 61.8 while price holds a 2.3% range, then price breaks out and falls 3.9% under the range two days later](https://content.gainium.io/images/content/indicators/choppiness-index__grid.webp)

### A trend entry with a direction filter

A cross down through 38.2 says price started travelling. A second condition picks the side.

- **Entry:** two conditions in the same group with AND. Choppiness Index, Length 14, Condition **Crossing down**, Value **38.2**, Interval 4 hours. And Moving Averages, EMA, Length 50, Interval 4 hours, Condition **Lower than**, Compared to **Current price**, which is true while price is above the EMA 50.
- **Exit:** take profit 2%.
- **Settings:** Value 38.2, Length 14.
- **Timeframe:** 4 hours. On BTC/USDT, after crosses down 38.2 with price above its EMA 50, price reached +2% within 12 candles about 57% of the time, against 53% after any 4-hour candle. With price under its EMA 50, the same cross was followed by a 2% drop about 61% of the time.
- **When it fails:** without the direction filter, the cross fires in sell-offs as often as in rallies. With it, a trend can still end right after the cross: in the chart below, a cross at 80,296 with price above its EMA 50 was followed by a 6.7% drop within 12 candles.

In the chart below, the filter blocked the cross at 68,965, which came during a sell-off with price under its EMA 50.

![Annotated Choppiness Index chart, BINANCE:BTCUSDT 4h: a CHOP cross down 38.2 at 80,296 with price above its EMA 50 passes the filter and is followed by a 6.7% drop; a cross at 68,965 under the EMA 50 is blocked](https://content.gainium.io/images/content/indicators/choppiness-index__trend.webp)

## Using the Choppiness Index in Gainium

1. Create a DCA bot and switch the form to **Manual**. In a Combo bot, the same condition is set under **Deal start condition**.
2. Set **Deal start condition** to **Indicators**, or set the take profit or stop loss type to **Indicators** for an exit.
3. Click **Edit** on the condition, then **Change indicator**, search for **Choppiness** and pick **Choppiness Index (CHOP)** from the Trend category.

![The Select start indicator dialog in the Gainium bot form, searched for Choppiness, with the Choppiness Index (CHOP) card ringed under Trend](https://content.gainium.io/images/content/indicators/choppiness-index__picker.webp)

The fields and their defaults:

- **Length:** 14, from 2 to 1,000.
- **Interval:** 1 hour.
- **Condition:** Crossing down. Or Crossing up, Greater than or Lower than.
- **Value:** 61.8, from 0 to 100.
- **Keep true:** 0 extra candles.

![The Choppiness Index (CHOP) settings card in the Gainium bot form with its defaults: Length 14, Interval 1 hour, Condition Crossing down, Value 61.8, Keep true 0](https://content.gainium.io/images/content/indicators/choppiness-index__settings.webp)

CHOP works as a deal start, DCA, take profit or stop loss condition, and in the [Bot Controller](https://gainium.io/help/bot-controller), which can start a bot when CHOP rises above 61.8 and stop it when CHOP falls below 38.2.

Example configuration for the trend setup: Choppiness Index Length 14, Interval 4 hours, Condition Crossing down, Value 38.2, Keep true 0; Moving Averages EMA, Length 50, Interval 4 hours, Condition Lower than, Compared to Current price; take profit 2%.

## Related indicators

- [ADX](https://gainium.io/indicators/adx): trend strength on a 0 to 100 scale, with DMI mode for the direction CHOP lacks.
- [Bollinger BandWidth](https://gainium.io/indicators/bbw): how wide the bands are, another way to spot a quiet range before a breakout.
- [Moving Averages](https://gainium.io/indicators/moving-averages): the direction filter in the trend setup.
- [Average True Range (ATR)](https://gainium.io/indicators/atr): the candle-by-candle travel that CHOP sums.
