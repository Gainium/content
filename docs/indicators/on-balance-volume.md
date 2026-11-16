---
id: 1059
name: On-Balance Volume (OBV)
slug: on-balance-volume
description: >-
  Use On-Balance Volume in Gainium bots: a running total of volume signed by
  the close's direction, compared with its own moving average, and its
  divergences from price.
createdAt: '2026-11-16T12:00:00.000Z'
updatedAt: '2026-11-16T12:00:00.000Z'
publishedAt: '2026-11-16T12:00:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
  - volume
ingested: false
ingestedAt: ''
templateVersion: 2
tldr: >-
  On-Balance Volume (OBV) adds a candle's volume to a running total when the
  close is higher than the previous close and subtracts it when the close is
  lower. Joe Granville described it in 1963. The level of the total depends on
  the first candle counted, so Gainium compares OBV only with its own moving
  average: crossing up, crossing down, above or below it. The default is OBV
  crossing up its SMA 20 on 1-hour candles. The Divergences indicator can also
  test OBV divergences from price.
kind: native
catalogKeys:
  - OBV
category: volume
aliases:
  - "OBV"
  - "On-Balance Volume"
  - "On Balance Volume"
  - "Granville OBV"
faq:
  - title: Why can't I set a value for OBV in Gainium?
    details: >-
      OBV is a running total that starts at zero on the first candle the
      indicator sees. A live bot, a backtest and a chart each start counting
      on a different candle, so the same OBV level means something different
      in each. The gap between OBV and its own moving average does not depend
      on the starting candle, so that is the only thing the condition tests.
  - title: Why does Gainium's OBV number differ from TradingView's?
    details: >-
      TradingView starts its total at the first candle loaded on your chart,
      and Gainium at the first candle the bot loads. The two lines differ by a
      constant, so they have the same shape, and every cross of a moving
      average happens on the same candle in both.
  - title: Which average should I compare OBV with?
    details: >-
      The default SMA 20 is a common choice. A longer average gives fewer
      crosses: on BTC/USDT 4h, SMA 50 gives a little over half as many as SMA
      20. KAMA, ALMA and LSMA are offered too. McGinley Dynamic and VWMA are
      not, because OBV can be negative and is already a volume total.
  - title: Can Gainium detect OBV divergences?
    details: >-
      Yes. Add the Divergences indicator, select On-Balance Volume (OBV) under
      Oscillators and pick Bullish or Bearish. OBV is not in the Divergences
      indicator's default set, so you have to add it.
related:
  - chaikin-money-flow
  - mfi
  - divergences-indicator
  - moving-averages
sources:
  - title: StockCharts ChartSchool, On Balance Volume (OBV), Joe Granville, Granville's New Key to Stock Market Profits, 1963
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/on-balance-volume-obv
  - title: TradingView Help Center, On Balance Volume (OBV)
    url: https://www.tradingview.com/support/solutions/43000502593-on-balance-volume-obv/
  - title: Gainium, Divergences indicator
    url: https://gainium.io/indicators/divergences-indicator
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

On-Balance Volume (OBV) is a running total of volume: a candle's volume is added when it closes higher than the candle before and subtracted when it closes lower. Traders use it to check whether volume is behind a move, by watching OBV against its own average or for divergences from price. In Gainium a bot can enter when OBV crosses its moving average.

## What is On-Balance Volume

Joe Granville described OBV in his 1963 book *Granville's New Key to Stock Market Profits*. It was one of the first indicators built from volume. Gainium's line matches TradingView's built-in On-Balance Volume.

For each candle:

- **Close higher than the previous close:** OBV = previous OBV + volume.
- **Close lower than the previous close:** OBV = previous OBV − volume.
- **Close equal:** OBV is unchanged.

The first candle starts the total at 0. Gainium also draws a moving average of the OBV line, SMA 20 by default, and the condition compares OBV with it.

How to read it:

- **OBV above its rising average:** more volume traded on up closes than on down closes over the average's window.
- **The level means nothing on its own.** OBV is whatever volume has added up since the first candle counted. TradingView, a live bot and a backtest each start at a different candle, so their OBV numbers differ by a constant. The gap to the average is the same in all of them, and so is every cross. That is why the bot form has no Value field for OBV.
- **Divergence:** price makes a lower low while OBV makes a higher low (bullish), or price makes a higher high while OBV makes a lower high (bearish).
- **Crosses are frequent.** On BTC/USDT, OBV is above its SMA 20 on about half of all candles, and on 1h it crosses about four times as often as on 4h.

To keep a cross from depending on rounding in a long running total, Gainium treats OBV and its average as equal when the gap between them is under a billionth of their size.

![On-Balance Volume with an SMA 20 on BINANCE:BTCUSDT 4h, dark theme: the blue OBV line and the yellow average move together through a sideways stretch, then OBV drops under the average as price falls](https://content.gainium.io/images/content/indicators/on-balance-volume__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Average | SMA | The moving average of the OBV line: SMA, EMA, WMA, DEMA, TEMA, HMA, RMA, KAMA, ALMA or LSMA. OBV is only ever compared with it. |
| Average length | 20 | Candles in that average, 1 to 1,000. |
| Interval | 1 hour | Candle size OBV and its average are calculated on, from 1 minute to 1 week. It does not follow the chart you are looking at. |
| Condition | Crossing up through its average | Crossing up and crossing down fire on the candle where OBV passes its average. Above and below hold on every candle on that side. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** **Average length** 50 instead of 20 gives a little over half as many crosses on BTC/USDT 4h. After those crosses up, price reached +2% within 12 candles about 57% of the time, against 53% after any 4-hour candle.

**Tip:** **Interval** 1 hour, the default, gives about four times as many crosses as 4 hours. Most of the extra crosses come in flat stretches where OBV and its average run side by side.

**Tip:** **Condition** Above its average is true on about half of all candles. Use it as a filter in the same group as a timing condition, not as the entry on its own.

## Trading setups for bots

### OBV crosses up its average

A cross up says that recent volume came on up closes. This setup buys it and sells on a small gain.

- **Entry:** On-Balance Volume (OBV), Average **SMA**, Average length **20**, Condition **Crossing up through its average**, Interval 4 hours.
- **Exit:** take profit 2%.
- **Settings:** SMA 20. SMA 50 crosses a little over half as often and filters part of the flat-market noise.
- **Timeframe:** 4 hours. On BTC/USDT, price reached +2% within 12 candles after about half the crosses, the same share as after any 4-hour candle. The cross alone does not pick direction: pair it with a trend condition.
- **When it fails:** in a flat market OBV and its average run together and cross again and again. In the chart below, OBV crossed up three times in 16 hours around a flat average. A cross on the last candle of a rally fails too: one at 80,296 was followed by a 6.7% drop within 12 candles.

In the chart below, the cross at 82,138 reached +3.4% within 12 candles.

![Annotated On-Balance Volume chart, BINANCE:BTCUSDT 4h: a cross up through the SMA 20 at 82,138 rises 3.4%; a cross up at 80,296 is followed by a 6.7% drop; three crosses up in 16 hours around a flat average](https://content.gainium.io/images/content/indicators/on-balance-volume__cross.webp)

### Bullish OBV divergence

Price makes a lower low, but less volume traded on the way down, so OBV makes a higher low.

- **Entry:** the **Divergences** indicator with only **On-Balance Volume (OBV)** selected under Oscillators, Type of divergence **Bullish**, Min number of divergences **1**, Interval 1 day.
- **Exit:** take profit 6%, or a stop under the divergence's low.
- **Settings:** the default pivots (3 candles left, 1 right). A pivot is confirmed one candle after it prints, so the signal comes on the candle after the low.
- **Timeframe:** 1 day, as in the chart. On 4 hours the same setup fires about six times as often.
- **When it fails:** most of the time, on its own. On BTC/USDT 1d, price reached +6% within 10 days after about a third of bullish OBV divergences, less often than after any daily candle. On 4h, price reached +2% within 12 candles after 55% of them, against 53% for any candle. Use the divergence as one condition in a group, for example with RSI under 35, not as the whole entry.

In the chart below, the divergence fired on the close at 76,206, and price was 14.7% higher within 10 days.

![Annotated On-Balance Volume chart, BINANCE:BTCUSDT 1D: price makes a lower low while OBV makes a higher low; the bullish divergence fires at 76,206 and price rises 14.7% within 10 days](https://content.gainium.io/images/content/indicators/on-balance-volume__divergence.webp)

## Using On-Balance Volume in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or set the take profit or stop loss type to **Indicators** for an exit.
3. Click **Edit** on the condition, then **Change indicator**, search for **OBV** and pick **On-Balance Volume (OBV)** from the Volume category.

![The Select start indicator dialog in the Gainium bot form, searched for OBV, with the On-Balance Volume (OBV) card ringed under Volume](https://content.gainium.io/images/content/indicators/on-balance-volume__picker.webp)

The fields and their defaults:

- **Average:** SMA. The options are SMA, EMA, WMA, DEMA, TEMA, HMA, RMA, KAMA, ALMA and LSMA.
- **Average length:** 20, from 1 to 1,000.
- **Interval:** 1 hour.
- **Condition:** Crossing up through its average. Or Crossing down through its average, Above its average or Below its average.
- **Keep true:** 0 extra candles.

There is no Value field: the condition never compares OBV with a number. The card's summary reads the condition back, for example "OBV crosses above its SMA 20".

![The On-Balance Volume (OBV) settings card in the Gainium bot form with its defaults: Average SMA, Average length 20, Interval 1 hour, Condition Crossing up through its average, Keep true 0](https://content.gainium.io/images/content/indicators/on-balance-volume__settings.webp)

OBV works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller. For divergences, add the Divergences indicator and select On-Balance Volume (OBV) under Oscillators.

Example configuration for the first setup: Average SMA, Average length 20, Interval 4 hours, Condition Crossing up through its average, Keep true 0, take profit 2%.

## Related indicators

- [Chaikin Money Flow](https://gainium.io/indicators/chaikin-money-flow): weighs each candle's volume by where it closed in its range, instead of by the direction of the close.
- [Money Flow Index (MFI)](https://gainium.io/indicators/mfi): a volume-weighted oscillator on a fixed 0 to 100 scale, so it can be tested against a level.
- [Divergences](https://gainium.io/indicators/divergences-indicator): finds OBV divergences from price when OBV is selected as an oscillator.
- [Moving Averages](https://gainium.io/indicators/moving-averages): a price trend condition to pair with an OBV cross.
