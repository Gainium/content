---
id: 143
name: Long Wick Detector Indicator
slug: long-wick-detector
description: >-
  Learn how to use the Long Wick Detector indicator in Gainium for automated
  trading, identifying candles with unusually long wicks relative to ATR and
  tracking wick levels until mitigation or expiry.
createdAt: '2026-04-07T12:00:00.000Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2026-04-07T12:00:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
  - smart-money-concepts
ingested: false
ingestedAt: ''
templateVersion: 2
tldr: >-
  The Long Wick Detector marks candles whose upper or lower wick is at least
  Threshold times ATR(200), 2 by default. It keeps a level at that candle's
  high (top wick) or low (bottom wick) until a later candle's body closes
  through it or Max Duration bars pass, 1,000 by default. A bot condition is
  true while a level is active (During the signal) or only on the candle that
  creates one (On signal start). Long lower wicks are rejected sell-offs, a
  common place to start a long deal.
kind: native
catalogKeys:
  - LW
category: structure
aliases:
  - "Long Wick"
  - "Long Wick Detector"
  - "Wick Detector"
faq:
  - title: How long does a wick have to be?
    details: >-
      At least Threshold times the 200-bar Average True Range at that candle.
      With the default Threshold of 2 on BTC/USDT 1h, that is a wick of
      roughly twice the range of an average 1h candle. A wick is measured from the
      body: high minus the top of the body, or the bottom of the body minus
      the low.
  - title: When does a wick level disappear?
    details: >-
      When a later candle's body reaches it: the body top at or above a top-wick
      level, or the body bottom at or below a bottom-wick level. It also
      expires after Max Duration bars (1,000 by default), and a newer long
      wick on the same side replaces it.
  - title: What is the difference between During the signal and On signal start?
    details: >-
      During the signal is true on every candle while a level is active.
      On signal start is true only on the candle that creates a level where
      none was active. A new wick that replaces an active level on the same
      side does not fire On signal start.
  - title: Why does the indicator show nothing on a new pair?
    details: >-
      It needs 200 candles to compute ATR(200) before it can measure a wick.
      The higher the interval, the longer a newly listed pair waits for its
      first level: on a 1-day interval it needs 200 daily candles.
related:
  - engulfing-candle
  - support-resistance-indicator
  - atr
sources:
  - title: J. Welles Wilder Jr., Average True Range, via StockCharts ChartSchool
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr-and-average-true-range-percent-atrp
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

The Long Wick Detector marks candles whose upper or lower wick is at least twice the 200-bar Average True Range, and keeps a level at the wick's tip until price closes through it. Traders read a long lower wick as a rejected sell-off and use it to start a long deal, or use the active level as support while it holds.

## What is the Long Wick Detector

A long wick shows a price that traded and was pushed back within the same candle. The detector measures wicks against volatility, so the same setting works in a quiet market and a volatile one:

- **Top wick:** high minus the top of the body (the higher of open and close).
- **Bottom wick:** the bottom of the body minus the low.
- **Long:** a wick at least **Threshold** × ATR(200), where ATR(200) is the average true range of the last 200 candles. The default Threshold is 2.

A long top wick creates a level at the candle's high; a long bottom wick creates one at its low. Each level stays active until one of three things happens:

- **Mitigation:** a later candle's body reaches it. The body top at or above a top-wick level, or the body bottom at or below a bottom-wick level, removes it.
- **Expiry:** it has been active for more than **Max Duration** candles, 1,000 by default.
- **Replacement:** a newer long wick on the same side moves the level to the new candle.

The first level can appear only after 200 candles, once ATR(200) has a value. On the bot chart, top-wick levels are dotted teal lines and bottom-wick levels dotted red lines.

![Gainium bot chart, BTC/USDT 1h, Long Wick Detector with Threshold 2: one dotted red bottom-wick level near 80,170 across the chart until a candle body closes below it near the right edge](https://content.gainium.io/images/content/indicators/long-wick-detector__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Threshold | 2 | The minimum wick length, in multiples of ATR(200). |
| Max Duration | 1000 | Candles an unmitigated level stays active before it expires. |
| Value | Any wick | Which levels are read: Top wick, Bottom wick or Any wick. |
| Condition | During the signal | During the signal is true while a level is active. On signal start is true on the candle a level appears when none was active on the candle before. |
| Interval | 1 hour | The candle size the indicator is calculated on, from 1 minute to 1 week. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** the detector needs 200 candles before its first signal, because ATR(200) needs them. A newly listed pair therefore waits longest on 4h and 1 day.

**Tip:** Threshold sets the count almost on its own. On BTC/USDT 1h, Bottom wick with On signal start fires about five times as often at Threshold 1 as at 2, about three times as often at 1.5 as at 2, and almost never at 3. On 4h only Threshold 1 fires, about a quarter as often as on 1h.

**Tip:** On signal start does not fire when a new long wick replaces a level that is still active on the same side. A second rejection of the same area is not a new entry with that Condition.

**Tip:** Max Duration 200 halves how much of the chart a bottom-wick level filters. On BTC/USDT 1h a level is active on about half as many candles with 200 as with the default 1,000.

## Trading setups for bots

### Buy the candle that rejects a sell-off

- **Entry:** Deal start condition Long Wick Detector, Value **Bottom wick**, Condition **On signal start**, Threshold **1**, 1 hour. The deal opens on the close of the candle with the long lower wick.
- **Exit:** take profit 1.2%. Stop loss under the wick's low, the level itself.
- **Settings:** Max Duration 1000, Keep true 0. Threshold 1 fires on wicks about one average 1h range long; the default 2 creates only one level in the first chart above.
- **Timeframe:** 1h. ATR(200) then averages a long run of candles, so one spike barely moves the threshold.
- **When it fails:** in a sell-off that keeps going. The wick candle can be the first of several down candles, and the next one closes through the level.

![Annotated Gainium bot chart, BTC/USDT 1h, Long Wick Detector with Threshold 1: the long lower wick to 79,175 at the right edge that fires On signal start, about +1.4% to the next high, and an older level removed when a body closed through it](https://content.gainium.io/images/content/indicators/long-wick-detector__fresh-lower-wick.webp)

### Trade only while a wick level holds

- **Entry:** your usual entry indicator in an AND group with Long Wick Detector, Value **Bottom wick**, Condition **During the signal**, Threshold **2**, 1 hour. The bot only buys while an unbroken bottom-wick level sits under price.
- **Exit:** the bot's normal take profit.
- **Settings:** Max Duration 200 so the level is at most 200 bars old; the default 1,000 keeps levels five times as long.
- **Timeframe:** 1h or 4h.
- **When it fails:** at the break. The filter turns false only after a body closes through the level, so the last deal opened under it can be on the candle before the break.

![Annotated Gainium bot chart, BTC/USDT 1h, Long Wick Detector with Threshold 2: a bottom-wick level near 80,170 that keeps During the signal true, and the candle body that closes below it and removes it](https://content.gainium.io/images/content/indicators/long-wick-detector__level-holds.webp)

## Using Long Wick Detector in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or the take profit or stop loss type for an exit.
3. Click **Edit**, then **Change indicator**, and pick **Long Wick Detector** from the Chart category.

![Long Wick Detector settings card in the Gainium bot form with Threshold 2 and Condition On signal start ringed, Max Duration 1000, Value Bottom wick, Interval 1 hour, Keep true 0](https://content.gainium.io/images/content/indicators/long-wick-detector__settings.webp)

The fields and their defaults:

- **Threshold:** 2. The wick must be at least this many times ATR(200).
- **Max Duration:** 1000 candles before an unmitigated level expires.
- **Value:** Any wick. Top wick or Bottom wick read one side only.
- **Condition:** During the signal. On signal start fires only on the candle that creates a level.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Keep true:** 0 extra bars. With On signal start, raise it to 2–3 to let a slower condition in the same group catch up.

**Example configuration** (the rejection buy above): Deal start condition Indicators, Long Wick Detector with Threshold 1, Max Duration 1000, Value Bottom wick, Condition On signal start, Interval 1 hour, Keep true 0. Take profit 1.2%, stop loss 1.5%.

## Related indicators

- [Engulfing Candle](https://gainium.io/indicators/engulfing-candle): the other one-candle reversal signal, from bodies instead of wicks.
- [Support and Resistance](https://gainium.io/indicators/support-resistance-indicator): pivot levels that last until a newer pivot, where wick levels last until price closes through.
- [ATR](https://gainium.io/indicators/atr): the volatility measure the wick threshold is built on.
