---
name: WMA 7/25 Crossover Strategy
slug: wma-cross
description: >-
  A moving average crossover: buy when the 7-day weighted moving average crosses
  above the 25-day one and sell when it crosses back below. Its rules, how to run
  them in Gainium, and how they do against random entries on BTC, ETH and SOL.
tldr: >-
  Buy when the fast weighted moving average (7 days) crosses above the slow one
  (25 days), sell when it crosses back below. One position per coin, no stop
  loss and no take profit.
publishedAt: '2026-10-29'
updatedAt: '2026-10-29'
sources:
  - title: The ultimately "set and forget"? (Gainium community thread)
    url: https://community.gainium.io/t/970
related:
  - turtle
  - ema-20-50-rsi
faq:
  - title: What is a moving average crossover strategy?
    details: >-
      A trend-following rule that buys when a fast moving average crosses above a
      slow one, a sign that recent prices are rising faster than the longer
      average, and sells on the opposite cross.
  - title: Why weighted moving averages?
    details: >-
      A weighted average gives recent candles more weight than older ones, so it
      turns sooner than a simple average of the same length. The forum thread that
      proposed this setup used weighted averages of 7 and 25 days.
  - title: Does it need a stop loss?
    details: >-
      The rules have none: the opposite cross is the exit. A sharp fall can take
      several days to produce that cross, which is the cost of the rule.
---

A crossover is the simplest trend-following rule: be in the market while the short-term average is above the long-term one, and out while it is below. A forum member asked whether a bot could run it forever on a 7-day and a 25-day weighted moving average, after seeing how it would have traded SOL.

## How the rules work

Both averages are taken on daily closes. When the 7-day average crosses above the 25-day average the bot buys; when it crosses back below, it sells the whole position. Between those two crosses it holds, with no target and no stop.

Like every crossover, it buys after a move has started and sells after it has turned, so it gives up the first and the last part of each trend in exchange for staying in through the middle.

## Running it in Gainium

Use **Copy to Gainium** on this page, or set it up by hand on a DCA bot on the daily interval:

1. Start condition **Technical indicators**: a **Moving average** (WMA, 25, 1 day) **crossing down** the WMA 7.
2. Turn off safety orders.
3. In take profit, choose **Technical indicators** and add a **Moving average** (WMA, 25, 1 day) **crossing up** the WMA 7.
4. Allow one deal per pair.

The condition is written from the slow average's side: the 25-day line crossing down through the 7-day line is the same event as the 7-day line crossing above it.

## When it fails

A sideways market. The averages cross back and forth, and each pair of crosses buys a little high and sells a little low. The rule pays when a trend runs long enough to cover those losses.
