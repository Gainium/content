---
name: Double DCA Strategy
slug: double-dca
description: >-
  The Double DCA strategy opens a deal on a fixed schedule (time DCA) and averages
  each deal down with safety orders (price DCA). Its rules, how to run them as a
  Gainium bot, and how they do against random entries on BTC, ETH and SOL.
tldr: >-
  Open a new deal of the same size every week, let each deal buy more if price
  falls, and sell each one at a take profit above its average. In Gainium it is a
  DCA bot with a time-based start condition.
publishedAt: '2026-10-29'
updatedAt: '2026-10-29'
sources:
  - title: The Double-DCA Strategy (Gainium blog)
    url: https://gainium.io/blog/double-dca-strategy
related:
  - grid-stack
  - qfl
faq:
  - title: What is the difference between time DCA and price DCA?
    details: >-
      Time DCA buys the same amount on a schedule, whatever the price. Price DCA
      buys more when price falls below your entry, to lower the average. Double DCA
      does both: the schedule opens deals and the safety orders average them down.
  - title: Does the weekly schedule beat buying at random times?
    details: >-
      The results table on this page tests exactly that: the same bot, with the
      weekly start replaced by random start times and everything else unchanged.
---

Double DCA combines the two strategies that share the name DCA. Time DCA buys a fixed amount on a schedule, as Benjamin Graham described in 1949. Price DCA, the DCA of trading bots, buys more as price falls so the average entry moves down.

The strategy opens a new deal on a schedule and lets each deal average down with safety orders. Each deal closes on its own take profit.

## How the rules work

Every week the bot opens a deal of the same size. If price falls, the deal's safety orders buy more at set steps below the entry. When price comes back above the deal's average by the take profit, the deal sells and closes.

Several deals can be open at once, each with its own average. A deal that opened before a drop waits for a deeper recovery than one that opened at the bottom.

## Running it in Gainium

Create a DCA bot:

1. Set the start condition to **Time based**, every 7 days.
2. Turn on safety orders: 10 orders, the first 3% lower, step scale 1.1, volume scale 1.5.
3. Set the take profit to 6%.
4. Allow up to 4 deals per pair.

The safety orders are the bot form's Long-term preset, which fits a strategy meant to hold through deep drops.

## When it fails

A long fall fills every deal's ladder. New deals keep opening on schedule until the bot reaches its deal limit, and then the schedule stops buying exactly when prices are lowest. The capital a full ladder needs is far larger than the base order, so check the bot's maximum usage before you start it.
