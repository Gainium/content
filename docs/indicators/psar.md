---
id: 88
name: Parabolic SAR Indicator (PSAR)
slug: psar
description: >-
  In this article, we explain what is the Parabolic SAR Indicator (PSAR)
  indicator and how it can be used in bot trading.
createdAt: '2023-08-09T15:12:27.329Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2023-08-13T17:28:56.645Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:30.022Z'
templateVersion: 2
tldr: >-
  The Parabolic SAR (stop and reverse) plots one dot per candle: under price
  in an up trend, over price in a down trend. The dots speed up toward price
  as the trend extends, so the SAR works as a trailing stop that tightens with
  time. Gainium's Parabolic SAR condition compares the close with the SAR,
  with Start 0.02, Increment 0.02 and Maximum 0.2 on 1-hour candles by
  default. On BTC/USDT the close crosses the SAR nearly four times as often
  on 1-hour candles as on 4-hour, and about six times as often on 4-hour as
  on daily candles.
kind: native
catalogKeys:
  - PSAR
category: trend
aliases:
  - "PSAR"
  - "Parabolic SAR"
  - "Parabolic Stop and Reverse"
  - "SAR"
faq:
  - title: What do Start, Increment and Maximum do?
    details: >-
      They set the acceleration factor. It begins at Start (0.02), grows by
      Increment (0.02) each time the trend makes a new extreme, and stops at
      Maximum (0.2). A higher Start or Increment pulls the dots toward price
      faster, which means earlier exits and more flips.
  - title: Is the Parabolic SAR good for entries?
    details: >-
      Mostly for exits. As an entry, it flips in every range: on BTC/USDT 4h,
      buying each close above the SAR and selling the next close below it won
      a little over a third of the trades and lost 31.8% in total, ignoring fees. As a
      trailing exit for a deal that another condition opened, it locks in
      gains within a few bars of the turn.
  - title: Why does the bot's SAR flip at a different candle than my chart?
    details: >-
      Gainium's condition compares the candle's close with the SAR. Charts
      flip the dots when a candle's high or low touches the SAR, even if it
      closes back on the other side. Use the close-based reading when you
      compare the two.
  - title: Which timeframe suits the Parabolic SAR?
    details: >-
      On BTC/USDT the close crosses the SAR nearly four times as often on
      1-hour candles as on 4-hour candles, and about six times as often on
      4-hour as on daily candles. The median trend lasted 11 to 12 candles on
      every one of those intervals.
related:
  - supertrend
  - adx
  - atr
  - macd
sources:
  - title: J. Welles Wilder Jr., New Concepts in Technical Trading Systems (1978), via StockCharts ChartSchool, Parabolic SAR
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/parabolic-sar
  - title: TradingView Pine Script reference, ta.sar
    url: https://www.tradingview.com/pine-script-reference/v5/
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

The Parabolic SAR (stop and reverse) draws a dot for every candle, under price in an up trend and over price in a down trend. The dots move toward price faster the longer a trend runs, which makes the SAR a trailing stop that tightens with time. Bots use it mainly to exit, and sometimes to enter, when the close crosses the dots.

## What is the Parabolic SAR

J. Welles Wilder Jr. introduced it in 1978, in *New Concepts in Technical Trading Systems*, as the "Parabolic Time/Price System". On each candle:

`SAR(next) = SAR + AF × (EP − SAR)`

- **SAR** is the current stop level.
- **EP** (extreme point) is the highest high of the current up trend, or the lowest low of the current down trend.
- **AF** (acceleration factor) starts at **Start**, rises by **Increment** every time the trend sets a new EP, and is capped at **Maximum**.
- In an up trend the SAR may not rise above the lows of the last two candles; in a down trend it may not fall below their highs.
- When price crosses the SAR, the trend reverses: the new SAR starts at the old EP, and AF resets to Start.

Defaults are **Start 0.02, Increment 0.02, Maximum 0.2**, in Gainium and in TradingView's built-in Parabolic SAR. With those, AF reaches its cap after nine new extremes.

How to read it:

- **Dots under the candles:** up trend. Dots over the candles: down trend.
- **Dots closing in on price:** the trend is old or slowing. The SAR keeps moving toward price even when price goes sideways, so a pause alone can trigger the flip.
- **Trend length:** on BTC/USDT 4h the median trend lasts 12 candles, so the SAR flips about three times as often as Supertrend's default line.

![Parabolic SAR (0.02, 0.02, 0.2) on BINANCE:BTCUSDT 4h, dark theme: blue dots switching above and below price every few candles in a range between 79,000 and 87,000](https://content.gainium.io/images/content/indicators/psar__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Start | 0.02 | The acceleration factor at the start of each trend, in steps of 0.001. A lower Start leaves the first dots further from price. |
| Increment | 0.02 | Added to the factor each time the trend makes a new extreme, in steps of 0.001. |
| Maximum | 0.2 | The cap on the factor, in steps of 0.01. With the defaults it is reached after nine new extremes. |
| Interval | 1 hour | Candle size the SAR is calculated on, from 1 minute to 1 week. |
| Condition | Price crossing down | Compares the candle's close with the SAR. The crossing options fire on the flip candle; Price greater than and Price lower than hold for the whole trend. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** **Increment** does more than Start to slow the SAR down. On BTC/USDT 4h, Increment 0.01 cuts the close's crosses of the SAR by about 30%. Start 0.01 alone cuts them by only about 15%.

**Tip:** **Maximum** only caps the factor late in a trend. At 0.1, which the factor reaches after four new extremes, the 4h crosses fall by only about 10%.

**Tip:** The default Condition, **Price crossing down**, is an exit signal. For a long entry, switch it to Price crossing up. On 1 hour that fires nearly four times as often as on 4 hours.

## Trading setups for bots

### Flip-to-flip trend follower

- **Entry:** Parabolic SAR, Condition **Price crossing up**, Interval 4 hours.
- **Exit:** a Parabolic SAR close condition, **Price crossing down**, same interval.
- **Settings:** Start 0.02, Increment 0.02, Maximum 0.2. A Start of 0.01 leaves more room and flips less.
- **Timeframe:** 4 hours or 1 day. On 1-hour candles the close crosses the SAR nearly four times as often as on 4-hour.
- **When it fails:** in a range, which is most of the time. In the chart below, BTC moved inside a 3,000-dollar range and the SAR flipped five times before the breakout. In the data behind this page, a long bot buying every 4h close above the SAR and selling the next close below won a little over a third of its trades and lost 31.8% in total, ignoring fees, while BTC fell 27%. Its best trade was the breakout in the chart: in at 68,554, out at 77,289, +12.7%.

![Annotated Parabolic SAR chart, BTC/USDT 4h: five flips in a range, then a close above the SAR at 68,554 and a close below it at 77,289 for +12.7%](https://content.gainium.io/images/content/indicators/psar__flip.webp)

### Trailing exit for a deal another condition opened

The SAR is built as a stop. Let a trend or breakout condition open the deal, and let the SAR close it.

- **Entry:** any start condition, for example ADX crossing up 25 with SuperTrend Up trend (see the ADX page).
- **Exit:** Parabolic SAR **Price crossing down**, Interval 4 hours, as the take profit condition (Take profit type: Technical indicators). Keep a fixed stop loss below the entry as well.
- **Settings:** the defaults. AF grows with each new high, so the stop tightens fastest in the strongest part of a move.
- **Timeframe:** the same interval as the entry condition.
- **When it fails:** when the deal opens inside a range. In the chart below, a deal opened at 64,200 was closed at 64,296, two bars before the breakout, because the SAR was still sitting just under the range. A deal opened on the breakout at 68,554 rode the SAR up from 64,166 to 75,885 and closed at 77,289, +12.7%, well before Supertrend's own exit.

![Annotated Parabolic SAR chart, BTC/USDT 4h: deal 1 opened at 64,200 is closed at 64,296 just before the breakout; deal 2 opened at 68,554 trails the rising SAR and closes at 77,289 for +12.7%](https://content.gainium.io/images/content/indicators/psar__trailing.webp)

## Using Parabolic SAR in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, click **Edit**, then **Change indicator**, and search for **Parabolic**. For the trailing exit, set **Take profit type** to **Technical indicators** and add it there instead.
3. Pick **Parabolic SAR**, set the fields, and click **Done**.

![Gainium indicator picker searched for Parabolic, with the Parabolic SAR card ringed](https://content.gainium.io/images/content/indicators/psar__picker.webp)

The fields and their defaults:

- **Start:** 0.02, in steps of 0.001.
- **Increment:** 0.02, in steps of 0.001.
- **Maximum:** 0.2, in steps of 0.01.
- **Interval:** 1 hour.
- **Condition:** Price crossing down. The options are Price crossing down, Price crossing up, Price greater than and Price lower than. "Price" is the candle's close, compared with the SAR.
- **Keep true:** 0 extra candles.

Price greater than is true on every candle of an up trend, so it works as a filter; the crossing options fire once per flip.

Parabolic SAR works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller.

Example configuration for the flip-to-flip setup: Start 0.02, Increment 0.02, Maximum 0.2, Interval 4 hours, Condition Price crossing up, Keep true 0, with the same settings and Price crossing down as the take profit condition.

![Gainium Parabolic SAR settings card with Start 0.02, Increment 0.02, Maximum 0.2, Interval 4 hours and Condition Price crossing up](https://content.gainium.io/images/content/indicators/psar__example.webp)

## Related indicators

- [Supertrend](https://gainium.io/indicators/supertrend): a trailing line set by volatility rather than time; on BTC/USDT 4h it flipped about a third as often as the SAR.
- [Average Directional Index (ADX)](https://gainium.io/indicators/adx): ADX under 20 marks the ranges where SAR entries whipsaw.
- [Average True Range (ATR)](https://gainium.io/indicators/atr): a volatility stop to compare with the SAR's time-based one.
- [MACD](https://gainium.io/indicators/macd): a momentum condition that traders pair with a SAR flip for entries.

## FAQ

### What do Start, Increment and Maximum do?

They set the acceleration factor. It begins at Start (0.02), grows by Increment (0.02) each time the trend makes a new extreme, and stops at Maximum (0.2). A higher Start or Increment pulls the dots toward price faster, which means earlier exits and more flips.

### Is the Parabolic SAR good for entries?

Mostly for exits. As an entry, it flips in every range: on BTC/USDT 4h, buying each close above the SAR and selling the next close below it won a little over a third of the trades and lost 31.8% in total, ignoring fees. As a trailing exit for a deal that another condition opened, it locks in gains within a few bars of the turn.

### Why does the bot's SAR flip at a different candle than my chart?

Gainium's condition compares the candle's close with the SAR. Charts flip the dots when a candle's high or low touches the SAR, even if it closes back on the other side. Use the close-based reading when you compare the two.

### Which timeframe suits the Parabolic SAR?

On BTC/USDT the close crosses the SAR nearly four times as often on 1-hour candles as on 4-hour candles, and about six times as often on 4-hour as on daily candles. The median trend lasted 11 to 12 candles on every one of those intervals.
