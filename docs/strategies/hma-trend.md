---
name: HMA 50/200 Trend Strategy
slug: hma-trend
description: >-
  A trend strategy that buys once the 50 Hull moving average has stayed above the
  200 one, averages down with four safety orders and sells 17% above the average.
  Its rules, how to run them in Gainium, and how they do against random entries on
  BTC, ETH and SOL.
tldr: >-
  On hourly candles, buy when the 50 HMA has been above the 200 HMA for 10 hours,
  add up to four safety orders 5% apart, and sell 17% above the average price or
  at a 10% loss from it.
publishedAt: '2026-10-29'
updatedAt: '2026-10-29'
sources:
  - title: Combo Bot BTC 3x tested within a period of 4 years (Gainium community thread)
    url: https://community.gainium.io/t/4430
related:
  - wma-cross
  - turtle
faq:
  - title: What is a Hull moving average?
    details: >-
      A moving average built from weighted averages to follow price closely with
      little lag. Comparing a short and a long one gives a trend signal that turns
      sooner than simple averages do.
  - title: Why wait 10 hours?
    details: >-
      The condition must hold for 10 hourly candles in a row before the bot enters,
      which skips crosses that reverse straight away.
  - title: Is it the same as the forum bot?
    details: >-
      The forum bot runs on futures with 3x leverage. The test is spot without
      leverage, so its returns are smaller in both directions; the entry, safety
      orders, take profit and stop are the same.
---

A forum member built this bot to run all the time on BTC: enter in an uptrend, give the trade room with safety orders, and take a large profit. The original runs on futures at 3x; this test runs the same rules on spot.

## How the rules work

The trend signal is the 50-hour Hull moving average above the 200-hour one, held for 10 hours. Four safety orders, each a third of the size of the first order, sit 5% apart below the entry. The whole position sells 17% above its average price, or at a 10% loss from it.

The take profit is far away, so trades last long and a few large wins carry the result.

## Running it in Gainium

Use **Copy to Gainium** on this page, or set it up by hand on a DCA bot:

1. Start condition **Technical indicators**: a **Moving average** (HMA, 200, 1 hour) **less than** the HMA 50, kept true for 10 bars.
2. Turn on safety orders: 4 orders, each a third of the base order, deviation 5%, step and volume scale 1.
3. Take profit 17%, stop loss 10%.
4. Allow one deal per pair.

## When it fails

A trend that turns after entry. The safety orders add to the position on the way down, so a 10% stop on the average price is a larger loss than 10% of the first order. Leverage, as in the forum version, multiplies that.
