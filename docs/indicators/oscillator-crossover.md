---
id: 116
name: Oscillator Crossover
slug: oscillator-crossover
description: >-
  Use Oscillator Crossovers in Gainium to automate trading strategies with RSI,
  MFI, and CCI, across different timeframes for accurate momentum signals.
createdAt: '2024-10-06T07:49:29.870Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-06T08:03:08.923Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.018Z'
templateVersion: 2
tldr: >-
  Oscillator Crossover is a Gainium condition that fires when one oscillator
  crosses another: RSI, MFI, CCI or the Volume Oscillator, each with its own
  length and interval. The default compares RSI 7 with MFI 14 on 1-hour
  candles, crossing down. Because RSI uses only price and MFI adds volume, the
  cross shows when price momentum and money flow disagree. On BTC/USDT 1h,
  RSI 7 crosses above MFI 14 on about one candle in ten, so most bots pair it
  with a level filter.
kind: native
catalogKeys:
  - XO
category: composite
aliases:
  - "Oscillator Crossover"
  - "Oscillator XO"
  - "XO"
  - "RSI MFI crossover"
faq:
  - title: Which oscillators can I compare?
    details: >-
      RSI, MFI, CCI and the Volume Oscillator, in any pair, including the same
      oscillator twice with different lengths or intervals. RSI and MFI share a
      0 to 100 scale, so their cross is meaningful at any level. CCI and the
      Volume Oscillator use other scales, so pair each with itself.
  - title: Can I compare RSI on two timeframes?
    details: >-
      Yes. Pick RSI as both oscillators and give the secondary a longer
      interval, for example RSI 14 on 1 hour crossing up RSI 14 on 4 hours.
      On BTC/USDT that cross fires about two thirds as often as the default
      pair on 1 hour, so it needs a filter just as much as the default does.
  - title: Why does the default fire so often?
    details: >-
      RSI 7 and MFI 14 move around the same middle and cross whenever they
      disagree by a little. On BTC/USDT the pair crosses up on about one
      candle in ten, on 1-hour and 4-hour candles alike, so the 1-hour chart
      gives about four times as many signals. Add an RSI or MFI
      level condition to keep only the crosses near an extreme.
  - title: Does the crossover look at closed candles?
    details: >-
      Yes. Each oscillator is read on the closed candles of its own interval.
      When the secondary uses a longer interval, its value stays fixed until
      its next candle closes.
related:
  - rsi
  - mfi
  - cci
  - volume-oscillator
sources:
  - title: J. Welles Wilder Jr., RSI (1978), via StockCharts ChartSchool
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/relative-strength-index-rsi
  - title: StockCharts ChartSchool, Money Flow Index (MFI)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/money-flow-index-mfi
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

Oscillator Crossover fires when one oscillator crosses another, for example RSI crossing above the Money Flow Index. Bots use it to time momentum turns: the default pair compares price momentum (RSI) with volume-weighted momentum (MFI), and a cross shows the moment the two disagree.

## What is the Oscillator Crossover

It is a Gainium condition that compares two oscillators, each with its own length and interval. The primary oscillator is the one that "crosses"; the secondary is the reference. The four choices:

- **RSI (Relative Strength Index):** average gains against average losses over *n* closes, on a 0 to 100 scale. J. Welles Wilder Jr., 1978.
- **MFI (Money Flow Index):** the same idea as RSI, but each candle's move is weighted by `typical price × volume`, where typical price is `(high + low + close) / 3`. Also 0 to 100.
- **CCI (Commodity Channel Index):** distance of typical price from its average, in units of mean deviation. It has no fixed range; most readings fall between −200 and +200.
- **VO (Volume Oscillator):** the percentage gap between a short and a long average of volume (5 and 10 by default).

How to read it:

- **Crossing up:** the primary moved above the secondary on this candle. With RSI over MFI, price momentum turned up faster than money flow.
- **Crossing down:** the reverse.
- **Greater than / Lower than:** a state, true on every candle where the primary is above or below.
- **Mixed scales:** RSI and MFI share a scale, so their cross means something at any level. CCI and VO do not share it with RSI or MFI; compare each with itself on two lengths or intervals.

The default pair is busy. On BTC/USDT, RSI 7 crosses above MFI 14 on about one candle in ten, so on 1-hour candles it fires about four times as often as on 4-hour candles.

![Gainium bot-form chart, BTC/USDT perpetual on a Bybit paper account, 4h: the Oscillator crossover pane shows RSI 7 in purple and MFI 14 in red, crossing every several candles](https://content.gainium.io/images/content/indicators/oscillator-crossover__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Primary oscillator | Relative Strength Index (RSI) | The line that crosses: RSI, MFI, CCI or the Volume Oscillator. |
| Interval | 1 hour | Candle size of the primary oscillator, from 1 minute to 1 week. |
| Primary length | 7 | Length of the primary oscillator. Hidden for the Volume Oscillator. |
| Volume oscillator short length | 5 | Volume Oscillator as primary only: the short volume average. |
| Volume oscillator long length | 10 | Volume Oscillator as primary only: the long volume average. |
| Condition | Crossing down | Crossing up and Crossing down fire on the candle where the primary passes the secondary. Greater than and Lower than hold on every candle on that side. |
| Secondary oscillator | Money Flow Index (MFI) | The reference line the primary is compared with. |
| Secondary interval | 1 hour | Candle size of the secondary oscillator. It can differ from Interval. |
| Secondary length | 14 | Length of the secondary oscillator. Hidden for the Volume Oscillator. |
| Volume oscillator short length | 5 | Volume Oscillator as secondary only: the short volume average. |
| Volume oscillator long length | 10 | Volume Oscillator as secondary only: the long volume average. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** The default pair crosses often: on BTC/USDT 1h, RSI 7 crosses up through MFI 14 on about one candle in ten. **Primary length** 14 cuts that by about a quarter. Moving both intervals to 4 hours leaves about a quarter as many signals as on 1 hour, and under a fifth with Primary length 14.

**Tip:** With a **Secondary interval** longer than Interval, each primary candle is compared with the secondary's value on its last closed candle, which changes only once per secondary candle. The bot-form chart draws the secondary line the same way, so you see both lines at the primary's interval, as the bot reads them.

**Tip:** CCI and the Volume Oscillator do not share the 0 to 100 scale of RSI and MFI. RSI crossing CCI only says that CCI passed a number between 0 and 100. Cross CCI with CCI on two lengths instead.

## Trading setups for bots

### Oversold turn with volume behind it

- **Entry:** Oscillator Crossover, RSI length 7 crossing up MFI length 14, both on 4 hours. In the same group, AND: RSI (Length 7, 4 hours) Lower than 40, and MFI (Length 14, 4 hours) Lower than 40.
- **Exit:** a 1.5% take profit, with DCA orders below.
- **Settings:** RSI 7 and MFI 14, the defaults. The level conditions keep only the crosses from the lower part of the range.
- **Timeframe:** 4 hours. On BTC/USDT the filtered setup fires about a quarter as often as the unfiltered 4-hour cross.
- **When it fails:** in a steady decline, where the oscillators cross near 30 again and again. About two thirds (67%) of the filtered entries reached +1.5% within 18 bars. A buy on any 4h candle did that 64% of the time, so the filtered cross added only 3 points. In the example on the chart, it bought 81,190 and price fell 2.4% within six bars.

![Annotated Oscillator Crossover chart, BTC/USDT 4h: RSI 34 crosses above MFI 30 below the 40 line and the 1.5% take profit fills on the next bar; a later signal of the same kind is followed by a 2.4% drop](https://content.gainium.io/images/content/indicators/oscillator-crossover__oversold.webp)

### Close when momentum rolls over

Use the opposite cross as the exit of a long deal, but only from the upper part of the range.

- **Entry:** any start condition; the setup is an exit.
- **Exit:** Take profit type Technical indicators: Oscillator Crossover, RSI 7 crossing down MFI 14 on 4 hours, AND RSI (Length 7, 4 hours) Greater than 60.
- **Settings:** the defaults for both oscillators.
- **Timeframe:** 4 hours, the same as the entry.
- **When it fails:** when the two lines run side by side. In the example on the chart, they crossed six times in nine bars around 50, which is why the RSI 60 filter matters. Even with it, the cross is a weak sell signal: price was lower six bars later after only about half the filtered crosses. Set a percentage take profit as well, so the deal does not depend on the cross alone.

![Annotated Oscillator Crossover chart, BTC/USDT 4h: RSI 65 crosses under MFI 69 above the 60 line and closes the deal near 83,670; later the lines cross six times in nine bars](https://content.gainium.io/images/content/indicators/oscillator-crossover__exit.webp)

## Using Oscillator Crossover in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, click **Edit**, then **Change indicator**, and search for **Crossover**.
3. Pick **Oscillator Crossover**, set the fields, and click **Done**. Add the RSI and MFI level conditions to the same group with **+ Indicator**.

![Gainium indicator picker searched for Crossover, with the Oscillator Crossover card ringed](https://content.gainium.io/images/content/indicators/oscillator-crossover__picker.webp)

The fields and their defaults:

- **Primary oscillator:** Relative Strength Index (RSI). Or MFI, CCI, Volume Oscillator (VO).
- **Interval:** 1 hour, for the primary oscillator.
- **Primary length:** 7. With VO, two fields replace it: **Volume oscillator short length** 5 and **long length** 10.
- **Condition:** Crossing down. The options are Crossing down, Crossing up, Greater than and Lower than.
- **Secondary oscillator:** Money Flow Index (MFI).
- **Secondary interval:** 1 hour. It can differ from the primary's interval.
- **Secondary length:** 14, or VO short 5 and long 10.
- **Keep true:** 0 extra candles.

The bot-form chart draws both lines on the primary's interval. With a longer Secondary interval, the secondary line holds each value until its next candle closes, the same value the bot reads.

Oscillator Crossover works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller.

Example configuration for the first setup: Primary oscillator RSI, Interval 4 hours, Primary length 7, Condition Crossing up, Secondary oscillator MFI, Secondary interval 4 hours, Secondary length 14, Keep true 0.

![Gainium Oscillator Crossover settings card with RSI 7 on 4 hours crossing up MFI 14 on 4 hours](https://content.gainium.io/images/content/indicators/oscillator-crossover__example.webp)

## Related indicators

- [RSI](https://gainium.io/indicators/rsi): the default primary oscillator, and the level filter for both setups.
- [Money Flow Index (MFI)](https://gainium.io/indicators/mfi): the default secondary; RSI with volume weighting.
- [Commodity Channel Index (CCI)](https://gainium.io/indicators/cci): an unbounded oscillator to cross with itself on two lengths.
- [Volume Oscillator](https://gainium.io/indicators/volume-oscillator): the only volume-only choice, for crossing short-term volume against a longer window.
