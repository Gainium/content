---
id: 131
name: Average Daily Range (ADR)
slug: adr
description: >-
  Use the ADR indicator in Gainium to track daily volatility, set realistic
  price targets, and manage risk with strategies tailored for each asset's
  volatility.
createdAt: '2024-10-07T04:55:32.532Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-07T04:55:34.371Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:29.983Z'
tldr: >-
  The Average Daily Range (ADR) is the average distance between a daily
  candle's high and low over the last 14 daily candles, in price units. Gainium computes it as a
  simple moving average of high minus low on daily candles; the interval is
  fixed at 1 day. Use it to size take profits, stops and DCA spacing to what
  the pair moves in a normal daily candle: with Dynamic ATR/ADR the bot reads ADR when a
  deal opens and places the levels a multiple of it away.
templateVersion: 2
kind: native
catalogKeys:
  - ADR
category: volatility
aliases:
  - ADR
  - Average Daily Range
  - Average Day Range
  - ADR indicator
faq:
  - title: Can I change the ADR interval to 4 hours?
    details: >-
      No. Gainium fixes the ADR interval at 1 day, so the Interval field is
      locked. For a range on 4h or 1h candles, use ATR, which takes any
      interval.
  - title: Why is my ADR Value ignored on a small coin?
    details: >-
      ADR is in price units. A BTC/USDT ADR(14) of 2,161 is 2.7% of price; on a
      $0.10 coin it might be 0.006. Read ADR on your own pair before you type a
      threshold.
  - title: Is ADR the same as ATR on a daily chart?
    details: >-
      Close, not equal. ATR uses the true range, which adds gaps from the
      previous close, and Wilder's smoothing. ADR uses plain high minus low and
      a simple average, so one wild candle drops out of it after 14 daily
      candles.
  - title: Does the ADR-based take profit move during the deal?
    details: >-
      The ADR value is fixed when the deal opens. The take profit is measured
      from the deal's average price, so it moves down when DCA orders fill and
      stays put otherwise.
related:
  - atr
  - bbw
  - price-change-indicator
sources:
  - title: Average true range, Wilder (1978), for the true range ADR leaves out
    url: https://en.wikipedia.org/wiki/Average_true_range
  - title: Gainium, DCA Mode (Scaled DCA on ATR or ADR)
    url: https://gainium.io/help/dca-mode
  - title: Binance BTC/USDT 4h and 1d candles, computed with Gainium's indicator engine
---

The Average Daily Range (ADR) is how far a pair moves between its daily high and low, averaged over the last 14 daily candles. Traders use it to size targets and stops to a normal daily candle: a take profit at half the ADR is a move the pair makes in most of them.

## What is Average Daily Range (ADR)

ADR has no single named inventor. It is a plain average that day traders have long used. Gainium computes it on daily candles:

**ADR = SMA(High − Low, n)**

- **High − Low** is the range of one daily candle, from its high to its low.
- **SMA** is a simple moving average: the sum of the last *n* ranges divided by *n*.
- **n** is the Length, 14 by default.

The interval is always 1 day. Each daily range counts for 14 candles and then drops out at once, so a single wild candle lifts ADR by 1/14 of its size for exactly 14 candles.

How to read it:

- **The number is in price units.** In the chart below, BTC/USDT's ADR(14) at the last close is 2,161, 2.7% of price.
- **Its range in the chart below:** a low of 1,037 on the candle before BTC runs from 64,000 to 77,000, and a high of 3,208 after that run.
- **ADR vs ATR.** ATR adds gaps from the previous close and smooths with Wilder's average. ADR ignores gaps, which barely matter on a market that never closes, and weighs each of the 14 candles equally.

TradingView has no built-in indicator with Gainium's ADR formula. The chart below shows the daily candles ADR is computed from, with three ranges marked, and TradingView's ATR(14) below for comparison. ATR is the closest built-in: at the last close in the chart it reads 2,132, against ADR's 2,161.

![BINANCE:BTCUSDT daily candles, dark theme, with TradingView's ATR(14) below; three daily ranges are marked from high to low and the label gives Gainium's ADR(14) of 2,161 at the last close](https://content.gainium.io/images/content/indicators/adr__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Length | 14 | Daily candles in the simple average of the high-low range. |
| Interval | 1 day | Always 1 day. The field is locked, and the engine reads ADR on daily candles whatever it shows. |
| Condition | Crossing down | How ADR is compared with Value: Crossing up, Crossing down, Greater than, Lower than, or Between Value and Upper value. |
| Value | 0 | The threshold, in the pair's price units. |
| Upper value | — | Between: the value must stay above Value and below this. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** the default Value of 0 never fires. ADR is a range, so it is never below 0; BTC/USDT's ADR(14) in the chart above runs from 1,037 to 3,208, near 2,100 in the middle.

**Tip:** Length 7 reacts to a breakout sooner. On BTC/USDT, ADR spends about one and a half times as many daily candles above 2,800 with Length 7 as with 14, and with Length 28 it never gets there in the chart above, so a Length 28 filter at that level would not have paused the bot.

## Trading setups for bots

### Space DCA orders by the daily range

**Base scaling on ADR** puts each DCA order a fraction of the daily range below the previous one. On BTC that gives wide, swing-sized gaps.

- **Entry:** any start condition. The first DCA order sits ADR × Multiplier below the entry price, each next one the same distance below the last (Step scale 1).
- **Exit:** take profit 1.5% above the average price.
- **Settings:** DCA type Scaled, Base scaling on ADR, ADR Length 14, Multiplier 0.5, three DCA orders, Step scale 1, equal order sizes.
- **Timeframe:** ADR is always daily. It suits swing deals that stay open over several daily candles. For intraday ladders use ATR on 1h.
- **When it fails:** three orders at half an ADR cover 1.5 ADRs of range, 3.5% on BTC. A sell-off that runs two full daily ranges leaves the deal below the last order with no more buying.

Example, in the chart below: a deal opened at 83,322 at a daily open. ADR(14) at the previous close was 1,946, so the orders sat 973 apart: 82,349, 81,376 and 80,403. All three filled within that daily candle; its low was 80,394, so the last one filled with $9 to spare. The average fell to 81,862, and the 1.5% take profit at 83,090 filled on the next daily candle.

![Annotated chart of BINANCE:BTCUSDT 4h, with TradingView's ATR(14) below: entry at 83,322, three DCA orders 973 apart (half of ADR 1,946) at 82,349, 81,376 and 80,403, the average at 81,862 and the take profit at 83,090 filled on the next daily candle](https://content.gainium.io/images/content/indicators/adr__dca-spacing.webp)

### Take profit at half the daily range

With **Dynamic ATR/ADR**, the take profit sits a multiple of ADR above the average price and the stop a multiple below it.

- **Entry:** your entry signal.
- **Exit:** take profit = average price + 0.5 × ADR. Stop loss = average price − 0.75 × ADR.
- **Settings:** Take profit type Dynamic ATR/ADR with ADR, Length 14, Multiplier 0.5. Stop loss type Dynamic ATR/ADR with ADR, Length 14, Multiplier 0.75.
- **Timeframe:** daily ADR, for deals that should close within one or two daily candles.
- **When it fails:** the 2:3 reward to risk needs 60% winners to break even, ignoring fees. A deal opened at every daily open on BTC/USDT reached the take profit before the stop about 62% of the time, just above that line. ADR sizes the exit; it does not pick the direction, so the win rate comes from your entry signal.

In the chart below, a deal from the 83,322 daily open (ADR 1,946) had its stop at 81,863 and hit it within the same daily candle. The deal from the next open, 81,754 (ADR 2,022), had its take profit at 82,765 and reached it within three 4h bars.

![Annotated chart of BINANCE:BTCUSDT 4h, with TradingView's ATR(14) below: the first deal from 83,322 hits its stop at 81,863 (0.75 × ADR below), and the next deal from 81,754 reaches its take profit at 82,765 (0.5 × ADR above)](https://content.gainium.io/images/content/indicators/adr__take-profit.webp)

## Using Average Daily Range (ADR) in Gainium

**As a condition**, ADR can start deals, place DCA orders (DCA type Indicators), close deals, and start or stop the bot. It is not offered as a Risk:Reward stop.

1. Create a DCA bot and switch the form to **Manual**. Quick mode has no indicator conditions.
2. Set **Deal start condition** to **Indicators**. The bot adds an RSI condition. For an exit, set the take profit or stop loss type to **Indicators** instead.
3. Click **Edit**, then **Change indicator**, and pick **Average Daily Range (ADR)**.

The settings card starts with these defaults:

- **Length:** 14 daily candles.
- **Interval:** 1 day, locked.
- **Condition:** Crossing down. The options are Crossing up, Crossing down, Greater than, Lower than and Between.
- **Value:** 0, in price units. Type your own: a condition of ADR lower than 0 is never true. With Between, an **Upper value** appears.
- **Keep true:** 0. The number of extra bars the condition stays true after it fires.

![The ADR settings card in the Gainium bot form with its defaults: Length 14, Interval 1 day (ringed and locked), Condition Crossing down, Value 0, Keep true 0](https://content.gainium.io/images/content/indicators/adr__settings.webp)

A filter example: **ADR Lower than 2,800** on a BTC/USDT bot keeps it from opening deals in the wide-swinging candles after a breakout. On BTC/USDT in the first chart, ADR stays above 2,800 for seven daily candles after the breakout and peaks at 3,208, so the bot sits that stretch out.

**As a Dynamic ATR/ADR exit.** Set **Take profit type** (or the stop loss type) to **Dynamic ATR/ADR**. The bot adds an ATR; click **Edit**, then **Change indicator**, and pick ADR. The card shows Length 14, the locked 1 day interval and **Multiplier** 1. **When indicators trigger close by** picks a limit or a market order.

![The Gainium take profit section set to Dynamic ATR/ADR with an ADR card open: Length 14, Interval 1 day (ringed) and Multiplier 1 (ringed)](https://content.gainium.io/images/content/indicators/adr__dynamic-tp-form.webp)

**As DCA spacing.** Keep DCA type **Scaled** and set **Base scaling on** to **ADR**. The ADR card has Length 14 and Multiplier 1. See [DCA Mode](https://gainium.io/help/dca-mode).

**Example configuration** (the DCA ladder above): DCA type Scaled, Base scaling on ADR, Length 14, Multiplier 0.5, three DCA orders, Step scale 1. Take profit 1.5%.

## Related indicators

- [Average True Range (ATR)](https://gainium.io/indicators/atr): the same idea on any interval, with gaps and Wilder's smoothing.
- [Bollinger Band Width (BBW)](https://gainium.io/indicators/bbw): volatility as a ratio of price, so one threshold works across pairs.
- [Price % Change](https://gainium.io/indicators/price-change-indicator): reacts to a single large candle, where ADR averages 14 daily candles.

## FAQ

### Can I change the ADR interval to 4 hours?

No. Gainium fixes the ADR interval at 1 day, so the Interval field is locked. For a range on 4h or 1h candles, use ATR, which takes any interval.

### Why is my ADR Value ignored on a small coin?

ADR is in price units. A BTC/USDT ADR(14) of 2,161 is 2.7% of price; on a $0.10 coin it might be 0.006. Read ADR on your own pair before you type a threshold.

### Is ADR the same as ATR on a daily chart?

Close, not equal. ATR uses the true range, which adds gaps from the previous close, and Wilder's smoothing. ADR uses plain high minus low and a simple average, so one wild candle drops out of it after 14 daily candles.

### Does the ADR-based take profit move during the deal?

The ADR value is fixed when the deal opens. The take profit is measured from the deal's average price, so it moves down when DCA orders fill and stays put otherwise.
