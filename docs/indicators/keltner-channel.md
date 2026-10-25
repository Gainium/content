---
id: 125
name: Keltner Channel
slug: keltner-channel
description: >-
  Learn how to use the Keltner Channel in Gainium for automated trading,
  identifying trend reversals and breakouts, with detailed strategy examples and
  configurations.
createdAt: '2024-10-06T13:18:53.879Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-06T13:18:58.559Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.014Z'
tldr: >-
  The Keltner Channel is a 20-period EMA with bands 2 ATRs above and below
  it. Chester Keltner published the first version in 1960; the EMA and ATR
  form most charts use today came later. Bots use a close above the upper band
  as a breakout entry and a close back above the lower band as a dip entry. In
  Gainium a KC condition compares price with the lower, middle or upper band,
  and the range can be ATR, true range or plain high-low range.
templateVersion: 2
kind: native
catalogKeys:
  - KC
category: volatility
aliases:
  - KC
  - Keltner Channel
  - Keltner Channels
  - Keltner bands
faq:
  - title: What is the difference between Keltner Channels and Bollinger Bands?
    details: >-
      Keltner bands are a multiple of ATR from an EMA; Bollinger Bands are a
      multiple of the standard deviation of closes from an SMA. One wide candle
      moves ATR by a fraction, so Keltner bands stay smoother and price closes
      outside them less often.
  - title: What do Range type and Range length do in Gainium?
    details: >-
      Range type picks the distance unit: ATR (Wilder's average of true range
      over Range length, 20 by default), True Range (the current bar's true
      range only) or Range (a smoothed average of high minus low over Length).
      Range length only applies to ATR.
  - title: Which band should I use for a breakout entry?
    details: >-
      Band reference Upper band with Condition Price crossing up. Exit with a
      take profit condition of Price crossing down on the Middle band.
  - title: Are Gainium's defaults the same as TradingView's?
    details: >-
      Almost. EMA 20 and multiplier 2 match, but Gainium's Range length starts
      at 20 and TradingView's ATR length at 10, so set Range length 10 to match
      a TradingView chart. The Gainium interval starts at 1 hour; set it to
      match the chart you tested on.
related:
  - keltner-channel-b
  - bb
  - atr
  - supertrend
sources:
  - title: Chester W. Keltner, How to Make Money in Commodities (1960); Keltner channel overview
    url: https://en.wikipedia.org/wiki/Keltner_channel
  - title: StockCharts ChartSchool, Keltner Channels
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/keltner-channels
  - title: TradingView Help Center, Keltner Channels (KC)
    url: https://www.tradingview.com/support/solutions/43000502266-keltner-channels-kc/
  - title: Gainium, Risk:Reward
    url: https://gainium.io/help/risk-reward
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

The Keltner Channel is an exponential moving average with a band two ATRs above it and another two ATRs below. Bots use a close above the upper band to enter breakouts, and a close back above the lower band to buy dips.

## What is Keltner Channel

Chester Keltner described the first version in *How to Make Money in Commodities* (1960): a 10-bar average of the typical price on daily charts, with bands set by the average daily range. The version most charts use today, with an EMA and ATR, came later and is usually credited to Linda Bradford Raschke. Its formula:

- **Middle line = EMA(close, n)**, an exponential moving average of the last *n* closes.
- **Upper band = middle + m × ATR(r)**
- **Lower band = middle − m × ATR(r)**

**ATR(r)** is Wilder's average true range over *r* bars; see [ATR](https://gainium.io/indicators/atr). **m** is the multiplier. TradingView's defaults are *n* = 20, *m* = 2 and *r* = 10. Gainium starts with *n* = 20 and *m* = 2 but *r* = 20, so set Range length 10 to match a TradingView chart.

How to read it:

- **Inside the channel is normal.** About 90% of BTC/USDT 4h closes land between the bands.
- **A close outside is a strong move.** ATR adds a wide candle to its average a fraction at a time, so a sharp move often closes outside the band before the band catches up.
- **The middle line is the trend.** In an uptrend, pullbacks tend to hold the EMA.
- **The bands are smoother than Bollinger Bands.** Standard deviation jumps after one big close; ATR does not.

![Keltner Channels (EMA 20, ATR 10, multiplier 2) on BINANCE:BTCUSDT 4h, dark theme: price mostly inside the channel, with closes above the upper band during the run from 64,000 to 77,000](https://content.gainium.io/images/content/indicators/keltner-channel__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Length | 20 | The period of the middle line's moving average. With Range type Range, also the period of the range average. |
| MA Type | EMA | The middle line: EMA or SMA. |
| ATR Multiplier | 2 | How far each band sits from the middle line, in multiples of the range. From 0.1 to 10. |
| Band reference | Lower band | The line the close is compared with: Lower band, Upper band or Middle band. |
| Range type | ATR | What sets the band width: ATR over Range length, True Range of the current bar alone, or Range, a smoothed average of high minus low over Length. |
| Range length | 20 | The ATR period. Shown with Range type ATR only. TradingView's Keltner Channels use 10. |
| Condition | Price crossing up | How the close is compared with the band: Price crossing up, Price crossing down, Price greater than or Price lower than. |
| Interval | 1 hour | The candle size the channel is calculated on, from 1 minute to 1 week. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** ATR Multiplier 1.5 brings the bands in enough to change the dip buy completely. On BTC/USDT 4h, price crosses up the lower band about five times as often with 1.5 as with 2, and the upper band about 40% more often.

![Keltner Channel ATR Multiplier 2 vs 1.5 on BINANCE:BTCUSDT 4h: the same candles in both panels; with 1.5 the channel is a quarter narrower and many more candles close outside it](https://content.gainium.io/images/content/indicators/keltner-channel__tip-atr-multiplier.webp)

*ATR Multiplier 2 (top) vs 1.5 (bottom), BTC/USDT 4h: with 1.5 the close crosses back above the lower band about 5× as often.*

**Tip:** Range type True Range makes the bands jump with every candle. On BTC/USDT 4h the channel was 1.5% to 9% of price wide with ATR, and 0.5% to 31% with True Range, and the upper band was crossed about twice as often.

**Tip:** the default Interval of 1 hour fires about four times as often as 4 hours: on BTC/USDT, the upper band gives about four 1h crossings for each 4h one.

**Tip:** Range length 10 matches TradingView's Keltner Channels, and the setups below use it. The default of 20 averages ATR over twice as many bars, so the bands widen more slowly after a wide candle.

## Trading setups for bots

### Breakout: close above the upper band

- **Entry:** price crossing up the upper band.
- **Exit:** price crossing down the middle line.
- **Settings:** KC with Length 20, MA Type EMA, ATR Multiplier 2, Range type ATR, Range length 10, Interval 4 hours, Condition Price crossing up, Band reference Upper band. Take profit type Indicators: KC, same settings, Condition Price crossing down, Band reference Middle band.
- **Timeframe:** 4h or 1 day. On 1h the upper band is crossed about four times as often, mostly by noise.
- **When it fails:** in a range, or at the end of a run. On BTC/USDT 4h about two in three trades lost 1% to 3%, ignoring fees, when price fell back under the EMA. The winners came from strong runs: three in the run in the chart below and one in a later breakout (+4%).

In the chart below, the first close above the upper band came at 64,200. Price did not close below the EMA again until 78,012, 21.5% higher. A bot that allows more than one deal would also have bought twice near the top of the run, and those two deals lost 1.4% and 3.1%.

![Annotated chart of Keltner Channels on BINANCE:BTCUSDT 4h: the close above the upper band at 64,200, the run to 80,000, the exit at 78,012, and two late entries near the top that lost](https://content.gainium.io/images/content/indicators/keltner-channel__breakout.webp)

### Dip buy: close back above the lower band

- **Entry:** price crossing up the lower band.
- **Exit:** price crossing up the middle line.
- **Settings:** KC 20 / EMA / multiplier 2 / ATR 10 on 4 hours, Condition Price crossing up, Band reference Lower band. Take profit type Indicators: KC, Condition Price crossing up, Band reference Middle band. Two DCA orders 1.5% apart.
- **Timeframe:** 4h. It is rare there: on BTC/USDT it fires more than ten times as often on 1h as on 4h.
- **When it fails:** when the sell-off has a second leg. In the chart below, the first reclaim, at 82,999, was followed by a 3.1% drop before price reached the EMA again.

The second reclaim, at 81,776 a few bars later, reached the EMA at 83,049, 1.6% higher.

![Annotated chart of Keltner Channels on BINANCE:BTCUSDT 4h: two closes back above the lower band at 82,999 and 81,776, the 3.1% drop after the first, and the exit at the middle line at 83,049](https://content.gainium.io/images/content/indicators/keltner-channel__lower-bounce.webp)

## Using Keltner Channel in Gainium

A KC condition can start deals, place DCA orders (DCA type Indicators), close deals, set the Risk:Reward stop, and start or stop the bot.

1. Create a DCA bot and switch the form to **Manual**. Quick mode has no indicator conditions.
2. Set **Deal start condition** to **Indicators**. The bot adds an RSI condition. For an exit, set the take profit or stop loss type to **Indicators**.
3. Click **Edit**, then **Change indicator**, and pick **Keltner Channel (KC)**.

The settings card starts with these defaults:

- **Length:** 20. The EMA period of the middle line.
- **MA Type:** EMA, or SMA.
- **ATR Multiplier:** 2, from 0.1 to 10.
- **Band reference:** Lower band. The line price is compared with: Lower band, Upper band or Middle band.
- **Range type:** ATR. **True Range** uses the current bar's true range alone; **Range** uses a smoothed average of high minus low over Length.
- **Range length:** 20. The ATR period, shown only with Range type ATR. TradingView uses 10.
- **Condition:** Price crossing up. The options are Price crossing up, Price crossing down, Price greater than and Price lower than.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Keep true:** 0. The number of extra bars the condition stays true after it fires.

![The Keltner Channel settings card in the Gainium bot form: Length 20, MA Type EMA, ATR Multiplier 2, Band reference Lower band (ringed), Range type ATR, Range length 20, Condition Price crossing up, Interval 1 hour, Keep true 0](https://content.gainium.io/images/content/indicators/keltner-channel__settings.webp)

The defaults are the dip buy above, on 1 hour and with Range length 20 instead of 10. As a Risk:Reward stop, KC places the stop at the band you pick when the deal opens; Lower band on a long. See [Risk:Reward](https://gainium.io/help/risk-reward).

**Example configuration** (the breakout): Deal start condition Indicators, KC with Length 20, MA Type EMA, ATR Multiplier 2, Range type ATR, Range length 10, Interval 4 hours, Condition Price crossing up, Band reference Upper band, Keep true 0. Take profit type Indicators, KC with the same settings, Condition Price crossing down, Band reference Middle band. A 4% stop loss.

## Related indicators

- [Keltner Channel %B](https://gainium.io/indicators/keltner-channel-b): where price sits inside this channel, as one number.
- [Bollinger Bands (BB)](https://gainium.io/indicators/bb): bands from standard deviation; Bollinger Bands inside the Keltner Channel is a common squeeze test.
- [Average True Range (ATR)](https://gainium.io/indicators/atr): the distance unit of the bands.
- [Supertrend](https://gainium.io/indicators/supertrend): another ATR-based line, which flips sides on a close beyond it.
