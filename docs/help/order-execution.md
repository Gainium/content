---
id: 1058
name: Order execution for base orders, DCA, take profit and stop loss
slug: order-execution
description: >-
  How Gainium places a bot's orders: Market, Limit, Chasing limit and Split
  order, which ones each setting offers, what each option does, and how to
  move a large position on a pair with a thin order book.
createdAt: '2026-11-15T00:00:00.000Z'
updatedAt: '2026-11-15T12:00:00.000Z'
publishedAt: '2026-11-15T00:00:00.000Z'
locale: en
categories:
  - trading-bots
  - combo-bots
difficulty: intermediate
tags:
  - profit
  - stop-loss
tldr: >-
  The base order, DCA orders, take profit and stop loss each have an
  execution setting with the same options. Market fills now. Limit waits at a
  price. Chasing limit follows the price and goes to market after a timeout.
  Split order moves a large position in slices so it doesn't sweep a thin
  order book. Which options you get depends on what triggers the order.
---

The execution setting decides how an order is placed once the bot decides to trade. It sits at the end of the Strategy (base order), DCA, Take Profit and Stop Loss sections, just before More Settings, and works the same way in each.

Under the options, a summary panel says exactly what your choice will do. Read it before you save: the same option behaves differently depending on what triggers the order.

## What triggers the order decides the options

| Setting | Trigger | Options |
|---|---|---|
| Base order | Deal start | Market, Limit, Chasing limit, Split order |
| DCA orders | Scaled or custom levels | Market, Limit |
| DCA orders | Indicators | Market |
| Take profit | Percentage, Dynamic ATR/ADR | Market, Limit, Split order |
| Take profit | Indicators, Webhook | Market, Limit, Chasing limit, Split order |
| Stop loss | Any type | Market, Chasing limit, Split order |

With a price known in advance, a limit order can wait in the order book at that price. It already gets that price, so following the market adds nothing, and Chasing limit isn't offered.

A stop loss sits on the wrong side of the price. A limit sell below the current price fills immediately, so nothing can wait in the order book for a stop. Every stop loss option starts when the stop is reached.

Combo bots offer Market and Chasing limit for take profit and stop loss. A take profit with several targets doesn't offer Split order, and its targets rest without an enter market timeout.

## Market

The order fills immediately at the best prices on the order book. Use it when getting in or out matters more than the price. It is the default for stop loss.

On a pair with a thin order book, a large market order eats through several price levels. The fill can be far from the price that triggered it. Use Split order for that case.

## Limit

When the limit order is placed depends on the trigger:

| Trigger | When the limit order is placed |
|---|---|
| A price known in advance | In advance, at that price. It rests in the order book until price reaches it. |
| A signal | When the signal arrives, at the current price. It stays at that price. |

| Setting | What it does |
|---|---|
| Enter market timeout | If the limit order is still not filled after this many seconds, it is cancelled and the rest is executed at market. For a resting order, the count starts at its first partial fill. 0 keeps the order open until it fills. |

DCA orders have no enter market timeout: a DCA limit order rests at its level until it fills.

A resting order gets maker fees and your exact price. Price can touch it, fill part of it and turn away. Without a timeout the rest waits until price comes back; with one, the rest is executed at market once the timeout has passed since that first partial fill. A take profit with several targets keeps every target resting with no timeout.

## Chasing limit

Only for orders started by a signal, and for stop loss. When the order triggers, a limit order is placed at the top of the order book (a buy at the best bid, a sell at the best ask), so it waits for a fill instead of paying the spread. It is moved with the book until it fills.

| Setting | Default | What it does |
|---|---|---|
| Re-price every | 10 s | How often the order is cancelled and placed again at the current price. |
| Max chase | 1% | The order is never moved further than this from the price at which it triggered. 0 means no cap. |
| Enter market timeout | 35 s | If the order is still not filled after this many seconds, it is cancelled and the rest is executed at market. |

Example: an indicator take profit fires on a long at 100.00 with a max chase of 1%. The bot places a limit sell at the best ask and moves it every 10 s, never below 99.00. After 35 s, whatever is left is executed at market.

On a stop loss the timeout is required (at least 1 s). Price can fall through the max chase faster than the order fills; the timeout makes sure the position still closes.

## Split order

Only for large orders on low-liquidity pairs. It places the order as several smaller orders instead of one. Use it when your order is large compared with what the order book holds near the current price; on a liquid pair it only makes the order slower.

| Setting | Default | What it does |
|---|---|---|
| Slices | 5 | The order is placed in this many equal parts. 5 slices is about 20% each. |
| Pace | One at a time | **One at a time** keeps a single slice in the order book and places the next one after it fills (an iceberg). **On a timer** places a slice every interval, whether or not the previous one filled (TWAP). |
| Pause between slices / Interval | 30 s | The wait between slices. It gives the order book time to refill. |
| Each slice | Depends on the trigger | With a price known in advance: **Limit at the trigger price** or Market. With a signal or a stop loss: Chasing limit or Market. |
| Price floor | 2% | How far price may move against the trigger price while slices are still being placed. 0 means no floor. |
| Past the floor | Pause and wait | **Pause and wait** stops placing slices until price comes back inside the floor. **Execute the rest at market** finishes immediately. |

Nothing rests in the order book before the trigger. With a price known in advance and **Limit at the trigger price**, the bot watches the price, and when it reaches the take-profit price it places the first slice there. Each next slice is placed at the same price after the previous one fills.

Example: a long holds 12,000 XYZ on a pair where about 2,500 XYZ sits near the price. The take profit is at 1.000. With 6 slices, one at a time and a 30 s pause, nothing is in the order book until price reaches 1.000. Then a limit sell for 2,000 XYZ is placed at 1.000. When it fills, the next 2,000 goes up at 1.000 30 s later, and so on. If price falls more than 2% below 1.000, no new slices are placed until it recovers.

The bot places the slices itself, so Split order works the same on every exchange, including paper trading.

Split order is slow by design. On a stop loss, **Past the floor** defaults to **Execute the rest at market**, so a falling market can't keep the position open.

## Bots created before this setting

Bots you set up before this setting existed keep doing exactly what they did:

| Old setting | Shown as |
|---|---|
| Base order type Market | Market |
| Base order type Limit | Chasing limit with no cap, timeout from your Enter Market Timeout (none if it was off) |
| Base order type Limit with repositioning disabled | Limit |
| DCA order type Limit / Market | Limit / Market |
| DCA by indicators | Market |
| Take profit close order type Limit (percentage, ATR) | Limit, enter market timeout 0 |
| Take profit close order type Market | Market |
| "When indicators trigger close by" Limit (indicators, webhook) | Chasing limit |
| Combo deal close type Limit order | Chasing limit, timeout from your Enter Market Timeout (35 s if it was off) |
| Stop loss (percentage, ATR, webhook) | Market |
