---
id: 1054
name: Candle Colour
slug: candle-colour
description: >-
  Use Candle Colour in Gainium bots: start or close a deal on N green or red
  closed candles in a row, read from Heikin Ashi or regular candles, on every
  candle of the run or once on its N-th candle.
createdAt: '2026-10-29T12:00:00.000Z'
updatedAt: '2026-10-29T12:00:00.000Z'
publishedAt: '2026-10-29T12:00:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags:
  - indicator
  - heikin-ashi
  - candles
ingested: false
ingestedAt: ''
templateVersion: 2
tldr: >-
  Candle Colour is true when the last N closed candles are all green (close
  above open) or all red (close below open). It reads Heikin Ashi candles by
  default, or the exchange's regular candles. While in a row is true on every
  candle while the run lasts; Once per run is true only on the N-th candle of
  the run. A candle that closes at its open is neither colour and ends every
  run. Heikin Ashi runs on BTC/USDT last about twice as long as regular ones,
  so the first green Heikin Ashi candle comes about half as often as the
  first green regular candle.
kind: native
catalogKeys:
  - CANDLE
category: trend
aliases:
  - "Candle Colour"
  - "Candle Color"
  - "Heikin Ashi"
  - "Heikin-Ashi"
  - "Heiken Ashi"
  - "Green candles in a row"
  - "Red candles in a row"
faq:
  - title: How does Gainium calculate a Heikin Ashi candle?
    details: >-
      HA close is (open + high + low + close) / 4 of the real candle. HA open is
      the average of the previous HA open and HA close; the first one is (open
      + close) / 2. HA high and low are the real high and low, widened to
      include the HA open and close. It is the formula TradingView's Heikin
      Ashi chart type uses.
  - title: Why is my candle green on the chart but the condition reads red?
    details: >-
      With Candles set to Heikin Ashi the colour comes from the HA candle, not
      from the candle on the exchange chart. A small green candle after a big
      red one is usually still a red HA candle, because HA open is the middle
      of the previous HA body. Switch Candles to Regular to read the exchange
      candles.
  - title: Does the condition wait for the candle to close?
    details: >-
      Yes. Only closed candles count, so the condition never changes inside a
      candle. A run of 3 on 1-hour candles is true at the close of the third
      hour.
  - title: Does a new bot count a run that started before it?
    details: >-
      Yes. The bot reads 81 candles of history when it starts: 30 to settle the
      Heikin Ashi average and enough to count a run of up to 50. A run that is
      already 4 candles long reads 4, so Once per run with In a row 3 waits for
      the next run.
  - title: What happens on a doji?
    details: >-
      A candle that closes exactly at its open is neither green nor red. It
      ends the current run, and the next coloured candle starts a new run at 1.
      On Heikin Ashi candles this almost never happens.
related:
  - engulfing-candle
  - supertrend
  - long-wick-detector
sources:
  - title: Wikipedia, Heikin-Ashi chart (the "average bar" chart attributed to Munehisa Homma, 1700s)
    url: https://en.wikipedia.org/wiki/Heikin-Ashi_chart
  - title: TradingView Help Center, Understanding Heikin Ashi charts (formula)
    url: https://www.tradingview.com/support/solutions/43000619436-heikin-ashi/
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

Candle Colour checks whether the last closed candles are green or red, read from Heikin Ashi or regular candles. Traders use it to enter after a run of green candles has begun, or to buy a dip after a run of red ones. In Gainium a bot can start a deal on N candles of one colour in a row, on every candle of the run or once per run.

## What is Candle Colour

A green candle closes above its open; a red candle closes below it. A candle that closes exactly at its open (a doji) is neither colour and ends every run. Candle Colour counts how many closed candles in a row share the latest colour and compares that run with the number you set.

**Heikin Ashi** ("average bar" in Japanese) is a chart attributed to the 18th-century rice trader Munehisa Homma. Each Heikin Ashi (HA) candle is built from the real candle and the HA candle before it:

**HA close = (open + high + low + close) / 4**

**HA open = (previous HA open + previous HA close) / 2**, and (open + close) / 2 on the first candle

**HA high = max(high, HA open, HA close)**, **HA low = min(low, HA open, HA close)**

- HA close is the average of the whole candle, not its last trade.
- HA open is the middle of the previous HA body, so every HA candle starts inside the one before it.
- The colour is HA close against HA open. One small green candle after a fall is usually still a red HA candle.

How to read it:

- **Heikin Ashi runs are longer.** On BTC/USDT 1h an HA run lasts about 3.9 candles on average, a regular run about 1.9. About 57% of HA runs reach three candles, against 22% of regular runs.
- **The colour is not a forecast.** After the third green HA candle in a row, the next HA candle was green about three times in four. Price 12 candles later was higher only about half the time, on 1h and on 4h alike.
- **Both kinds are green about half the time.** On BTC/USDT 1h, about 52% of HA candles and 51% of regular candles close green.

HA open depends on every candle before it, so a run counted from a short history can differ from the chart. The influence of the first candle halves with each candle, so after 30 candles it no longer changes the colour. A bot loads 81 candles of history before it decides, so the HA colour has settled and a run of up to 50 candles is counted in full. The backtest warms up on at least the same 81 candles before its first decision.

The chart below is a TradingView Heikin Ashi chart of BTC/USDT on 4-hour candles. The long one-colour runs, such as the red run down to the 9th, are what the condition counts.

![BTC/USDT 4h on TradingView with the Heikin Ashi chart type, dark theme: long runs of green and red Heikin Ashi candles, red bars without an upper wick in the falls and green bars without a lower wick in the rises](https://content.gainium.io/images/content/indicators/candle-colour__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Candles | Heikin Ashi | Heikin Ashi averages each candle with the one before, so runs of one colour are longer and less noisy. Regular reads the exchange candles as they are. |
| Interval | 1 hour | Candle size the colour is read on, from 1 minute to 1 week. |
| Colour | Green | Green: close above open. Red: close below open. A candle that closes at its open is neither and breaks every run. |
| In a row | 1 | How many closed candles of that colour in a row. |
| Trigger | While in a row | While in a row: true on every candle while the last N candles are all that colour. Once per run: true only on the N-th candle of the run, once. |
| Keep true | 0 | This condition will remain true for a number of extra bars. Default is 0, which means it will be true only on the bar that triggered the condition. |

**Tip:** **Candles** Heikin Ashi with In a row 1 and Once per run fires on the first green candle of each run. On BTC/USDT 1h it fires about half as often as the same setting on Regular candles, because HA runs are about twice as long.

**Tip:** **Trigger** While in a row with In a row 1 is true on about half of all candles. Use it as a filter beside another start condition. Use Once per run when Candle Colour is the only start condition, or the bot reopens a deal on every candle of the run.

**Tip:** **In a row** 3 on Heikin Ashi fires about 1.2 times as often as 3 on Regular candles on BTC/USDT 1h, and 5 on Heikin Ashi fires about 3.4 times as often as 5 on Regular. Long regular runs are rare: only about one regular run in five reaches 3.

## Trading setups for bots

### Ride a Heikin Ashi run

- **Entry:** Candle Colour, Candles **Heikin Ashi**, Colour **Green**, In a row **3**, Trigger **Once per run**, Interval 4 hours.
- **Exit:** take profit condition Indicators with a second Candle Colour: Heikin Ashi, Colour **Red**, In a row **1**, Once per run. The deal closes on the first red HA candle. Keep a stop loss of 3%.
- **Settings:** In a row 3. After the third green HA candle the run reached five about 55% of the time on 1h and 57% on 4h. With 2, entries come one candle earlier and more of them end at the next candle.
- **Timeframe:** 4 hours. HA runs average about four candles on 1h and on 4h, so 4-hour runs cover a bigger move.
- **When it fails:** in a sideways market. Runs end at three or four candles, and the first red candle closes the deal near where it opened. Price 12 candles after the entry was higher only about half the time, so the colour does not pick the direction.

In the chart below, the histogram is the signed HA run (+3 = three green in a row) on BTC/USDT 1h. The third green HA candle came early in a run that grew past 12.

![Gainium bot chart, BTC/USDT 1h, with the Candle Colour histogram below the candles: the third green Heikin Ashi candle of a run is ringed at +3 and marked with a vertical line, before the run grows past +12](https://content.gainium.io/images/content/indicators/candle-colour__green-run.webp)

### Buy the third red Heikin Ashi candle

- **Entry:** Candle Colour, Candles **Heikin Ashi**, Colour **Red**, In a row **3**, Trigger **Once per run**, Interval 1 hour. Use DCA orders below the entry.
- **Exit:** take profit 1%.
- **Settings:** In a row 3. Three red HA candles mark a fall that has lasted, not a single red bar.
- **Timeframe:** 1 hour. On BTC/USDT 1h, price traded 1% above the entry within 24 candles after about 63% of these entries. On 4h it did after about 84%, but 4h candles also fell 2% under the entry first more often.
- **When it fails:** in a trend down. Price fell another 2% within 24 candles after about 38% of the 1h entries and 66% of the 4h entries. Size the DCA orders for at least a 2% slide. Compared with entries at random times, these entries did slightly worse on BTC, ETH and SOL, so the take profit and the DCA spacing carry this setup, not the colour.

In the chart below, the third red HA candle opened the deal, the run went on to six red candles, and price then rose about 1%.

![Gainium bot chart, BTC/USDT 1h, with the Candle Colour histogram: the third red Heikin Ashi candle is ringed at −3 and marked with a vertical line; the run reaches −6 and price then rises about 1%](https://content.gainium.io/images/content/indicators/candle-colour__red-dip.webp)

## Using Candle Colour in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or the take profit or stop loss type to **Indicators** for an exit.
3. Click **Edit**, then **Change indicator**, search for **Candle** and pick **Candle Colour** from the Chart category.

![The Select start indicator dialog in the Gainium bot form, searched for Candle, with the Candle Colour card ringed in the Chart category](https://content.gainium.io/images/content/indicators/candle-colour__picker.webp)

The fields and their defaults:

- **Candles:** Heikin Ashi. Or Regular.
- **Interval:** 1 hour.
- **Colour:** Green. Or Red.
- **In a row:** 1 candle, from 1 to 50.
- **Trigger:** While in a row. Or Once per run.
- **Keep true:** 0 extra candles.

![The Candle Colour settings card in the Gainium bot form with its defaults: Candles Heikin Ashi, Interval 1 hour, Colour Green, In a row 1, Trigger While in a row, Keep true 0](https://content.gainium.io/images/content/indicators/candle-colour__settings.webp)

The bot-form chart draws the signed run as a histogram under the price: green bars count up through a green run, red bars count down through a red run, and a dashed line marks the run you asked for. The candles above it stay the regular exchange candles.

![The Gainium bot-form chart, BTC/USDT 1h, with the Candle Colour histogram: green bars rising through each green Heikin Ashi run, red bars falling through each red run, and a dashed line at the required run of 1](https://content.gainium.io/images/content/indicators/candle-colour__bot-chart.webp)

Candle Colour works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller. The backtest draws it on every deal chart.

Example configuration for the first setup: Candles Heikin Ashi, Interval 4 hours, Colour Green, In a row 3, Trigger Once per run, Keep true 0.

## Related indicators

- [Engulfing Candle](https://gainium.io/indicators/engulfing-candle): a two-candle reversal pattern, where Candle Colour counts a run of one colour.
- [Supertrend](https://gainium.io/indicators/supertrend): flips with the trend on an ATR band, slower than a run of Heikin Ashi candles.
- [Long Wick Detector](https://gainium.io/indicators/long-wick-detector): reads the wicks a candle's colour ignores.
