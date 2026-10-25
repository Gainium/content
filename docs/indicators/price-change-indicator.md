---
id: 119
name: Price % Change
slug: price-change-indicator
description: >-
  Learn how to use the Price % Change indicator in Gainium for automated trading
  strategies, detecting breakouts, trends, and reversals using percentage-based
  signals.
createdAt: '2024-10-06T09:26:02.444Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-06T09:32:09.504Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:30.019Z'
tldr: >-
  Price % Change is a Gainium condition that fires when a single candle moves
  more than a set percentage from its open: up to its high for a positive
  value, down to its low for a negative one. The default is 5% on 1-hour
  candles. It reacts to wicks, not closes, so it catches flushes and spikes
  as they print. Bots use a negative value to buy sharp dips and a positive
  value to join momentum candles.
templateVersion: 2
kind: native
catalogKeys:
  - PC
category: momentum
aliases:
  - Price Change
  - Price % Change
  - Price Percent Change
  - Candle percent change
faq:
  - title: Does Price % Change compare the close with the previous close?
    details: >-
      No. It measures one candle from its open to its high (for a positive
      value) or to its low (for a negative value). A candle that drops 3% and
      closes back at its open still counts as a 3% drop.
  - title: How do I detect a drop instead of a rise?
    details: >-
      Type a negative number in % change, such as −2. A positive number
      watches the move up from the open; a negative one watches the move down.
  - title: Is 5% on 1 hour a good default for BTC?
    details: >-
      It is rare. A BTC/USDT 1h candle almost never moves 5% from its open, and
      drops that size are rarer than rises. For BTC 1h, values between 1.5% and
      3% fire about ten times as often or more.
  - title: Can Price % Change stop my bot during a crash?
    details: >-
      Yes. In the Bot Controller, a Price % Change condition with a negative
      value, such as −4 on 1 hour, can stop the bot when a candle falls that
      far.
related:
  - atr
  - adr
  - volume-oscillator
sources:
  - title: Gainium, Bot Controller
    url: https://gainium.io/help/bot-controller
  - title: Gainium, DCA Mode
    url: https://gainium.io/help/dca-mode
  - title: Binance BTC/USDT 15m, 1h and 4h candles, computed with Gainium's indicator engine
---

Price % Change is a Gainium condition that fires when a single candle moves more than a set percentage from its open. Traders use a negative value to buy sharp flushes and a positive one to follow momentum candles.

## What is Price % Change

Price % Change is Gainium's own condition, not a classic charting indicator. It looks at one candle on the chosen interval and measures how far it travelled from its open:

- **Positive value:** fires when **(High − Open) / Open × 100** is greater than the value.
- **Negative value:** fires when **(Open − Low) / Open × 100** is greater than the value without its sign.

**Open**, **High** and **Low** are the candle's prices. The condition reads the latest candle of its interval.

How to read it:

- **It measures the wick, not the close.** In the chart below, one BTC/USDT 1h candle opened at 82,704, dropped to 80,914 and closed at 81,038. That is a 2.2% drop for this condition, whatever the close did.
- **It is not close-to-close.** A 3% move spread over three candles never triggers a 2% condition on 1 hour.
- **Scale it to the interval.** On BTC/USDT 1h, candles that fall more than 1.5% from their open are about two and a half times as common as those that fall more than 2%, and a fall of more than 5% almost never happens.

TradingView has no built-in that measures a candle from its open to its extreme. The chart below marks that flush on the candles, with TradingView's ATR(14) below for scale: the 1,790 drop was almost four times the hourly ATR of about 470 before it.

![BINANCE:BTCUSDT 1h candles, dark theme, with ATR(14) below: one candle is marked from its open at 82,704 to its low at 80,914, a 2.2% drop from the open](https://content.gainium.io/images/content/indicators/price-change-indicator__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| % change | 5 | The move from the candle's open that fires the condition. A positive number measures open to high; a negative number measures open to low. |
| Interval | 1 hour | The candle size the indicator is calculated on, from 1 minute to 1 week. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** the default of 5 almost never fires on BTC, on 1h or on 4h. A value of 2 fires several times as often as 5 on BTC/USDT 1h, and about twice as often again on 4h. −2 fires a little less often than 2.

**Tip:** never leave % change at 0. The engine reads 0 as a drop of more than 0% from the open, which almost every candle has: it was true on about 97% of BTC/USDT 1h candles.

**Tip:** the comparison is strictly greater than. A candle whose low is exactly 2.00% under its open does not fire a −2 setting.

## Trading setups for bots

### Buy a 2% flush on the hourly

A single hourly candle that drops 2% from its open on BTC is a liquidation-style flush. Price usually gives some of it back.

- **Entry:** Price % Change −2 on 1 hour.
- **Exit:** take profit 1% above the average price.
- **Settings:** Price Change with % change −2, Interval 1 hour, Keep true 0. Two DCA orders, 1.5% and 3% below the entry.
- **Timeframe:** 1 hour. On 15 minutes, −1.5 fires about as often as −2 does on 1 hour.
- **When it fails:** flushes come in clusters. In one cluster, a flush at 77,911 was followed by another soon after; both needed a DCA fill before the take profit.

On BTC/USDT 1h, every deal this signal opened reached the 1% take profit, in 5 to 59 bars; half needed one DCA fill. In the chart below, the flush closed at 81,038 and hit the take profit five bars later.

![Annotated chart of BINANCE:BTCUSDT 1h: the candle that dropped 2.2% from its open, the entry at its close of 81,038, and the 1% take profit at 81,848 reached five bars later](https://content.gainium.io/images/content/indicators/price-change-indicator__flush.webp)

### Follow a 2% hourly rally

A 1h candle that rises 2% from its open on BTC often starts a run.

- **Entry:** Price % Change 2 on 1 hour.
- **Exit:** take profit 2%, with a 2% stop loss.
- **Settings:** Price Change with % change 2, Interval 1 hour, Keep true 0. No DCA orders.
- **Timeframe:** 1 hour. On 4 hours, 3 fires about as often as 2 does on 1 hour.
- **When it fails:** at the top of a run. In one run a 4.2% candle closed at 79,258, the high of the move; price was 4% lower about 48 bars later.

On BTC/USDT 1h, three in four candles that rose more than 2% from their open reached a 2% take profit within 12 bars. In the chart below, a 3.2% candle closed at 80,073 and a later 3% candle closed at 83,760. Both reached +2% within 24 bars.

![Annotated chart of BINANCE:BTCUSDT 1h: a candle up 3.2% from its open and a later candle up 3%, each followed by a 2% take profit within 24 bars](https://content.gainium.io/images/content/indicators/price-change-indicator__momentum.webp)

## Using Price % Change in Gainium

Price % Change can start deals, place DCA orders (DCA type Indicators), close deals, and start or stop the bot from the Bot Controller.

1. Create a DCA bot and switch the form to **Manual**. Quick mode has no indicator conditions.
2. Set **Deal start condition** to **Indicators**. The bot adds an RSI condition. For an exit, set the take profit or stop loss type to **Indicators**.
3. Click **Edit**, then **Change indicator**, and pick **Price Change**.

The settings card has three fields:

- **% change:** 5. Positive watches the rise from the candle's open to its high, negative the drop to its low.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Keep true:** 0. The number of extra bars the condition stays true after it fires. Raise it to 2 or 3 when Price % Change shares a group with a slower condition.

![The Price Change settings card in the Gainium bot form with its defaults: % change 5 (ringed), Interval 1 hour, Keep true 0](https://content.gainium.io/images/content/indicators/price-change-indicator__settings.webp)

There is no Condition field. The sign of % change decides the direction, and the condition is true whenever the candle's move exceeds it.

As a safety switch, the Bot Controller can stop a dip-buying bot with Price % Change −4 on 1 hour. A BTC/USDT 1h candle that falls 4% from its open is very rare, so it only fires in a real crash.

**Example configuration** (the flush buy): Deal start condition Indicators, Price Change with % change −2, Interval 1 hour, Keep true 0. Take profit 1%. Two DCA orders at 1.5% and 3% below the entry.

## Related indicators

- [Average True Range (ATR)](https://gainium.io/indicators/atr): the average candle size, to judge what a "big" candle is on your pair.
- [Average Daily Range (ADR)](https://gainium.io/indicators/adr): a normal day's range, to scale the % change on daily candles.
- [Volume Oscillator](https://gainium.io/indicators/volume-oscillator): confirms the flush came on heavy volume.
