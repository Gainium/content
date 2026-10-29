---
name: EMA 20/50 Cross with RSI Filter Strategy
slug: ema-20-50-rsi
description: >-
  A classic crossover with a momentum filter: buy when the 20 EMA crosses above
  the 50 EMA while RSI is below 70, with a 2:1 reward to risk. Its rules, how to
  run them in Gainium, and how they do against random entries on eight major coins.
tldr: >-
  On hourly candles, buy when the 20 EMA crosses above the 50 EMA and RSI(14) is
  below 70. Take profit at 2%, stop at 1%, move the stop above the entry once the
  trade is 1% up, and exit on the opposite cross.
publishedAt: '2026-10-29'
updatedAt: '2026-10-29'
sources:
  - title: Classic 20-50-RSI Bot (Gainium community thread)
    url: https://community.gainium.io/t/2442
related:
  - wma-cross
  - keltner-breakout
faq:
  - title: What does the RSI filter do?
    details: >-
      It skips a cross that comes when RSI is already above 70, so the bot does
      not buy a move that is already stretched.
  - title: Why test the hourly version?
    details: >-
      The author runs it on 15-minute and hourly candles. The test's shortest
      interval is one hour, so it uses the hourly version.
  - title: What is the moving stop?
    details: >-
      Once the trade is 1% in profit, the stop moves from 1% below the entry to
      0.5% above it, so a trade that got that far cannot end in a loss.
---

This bot trades the most common moving-average signal there is, the 20 EMA crossing above the 50 EMA, and adds two things to it: a momentum filter on the way in and a fixed 2:1 reward to risk on the way out. A forum member shared it with a long and a short version; spot can only run the long one.

## How the rules work

The cross is the entry, but only while the hourly RSI(14) is below 70. The trade then has three ways out: a 2% take profit, a 1% stop loss, or the 20 EMA crossing back below the 50 EMA. Once the trade is 1% up, the stop moves to 0.5% above the entry. After a trade closes, the bot waits four hours before it can enter that coin again.

With the target twice the stop, the rule needs to win only about a third of its trades to break even before fees.

## Running it in Gainium

Use **Copy to Gainium** on this page, or set it up by hand on a DCA bot:

1. Start condition **Technical indicators**, both required: a **Moving average** (EMA, 50, 1 hour) **crossing down** the EMA 20, and **RSI** (14, 1 hour) **less than** 70.
2. Turn off safety orders.
3. Take profit 2%; stop loss 1% with **Move stop loss**: trigger 1%, move to 0.5%.
4. In stop loss, add a **Technical indicators** close: **Moving average** (EMA, 50, 1 hour) **crossing up** the EMA 20.
5. Set a 4-hour cooldown after a deal closes and allow one deal per pair.

## When it fails

Choppy hours. EMA crosses come often on hourly candles, and in a range most of them reverse before the 2% target, so the stop and the opposite cross take many small losses.
