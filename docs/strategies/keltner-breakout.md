---
name: Keltner Channel Breakout Strategy
slug: keltner-breakout
description: >-
  A breakout strategy that buys when price closes above the upper Keltner
  channel while it is above a long TEMA trend line. Its rules, how to run them in
  Gainium, and how they do against random entries on eight major coins.
tldr: >-
  On hourly candles, buy when price crosses above the upper Keltner channel (35
  EMA, 3 times the 10-period range) while it is above the 400-period TEMA. Take
  profit at 3%, stop at 1.5%, and move the stop up once the trade is 2% in profit.
publishedAt: '2026-10-29'
updatedAt: '2026-10-29'
sources:
  - title: Range Filter bot (Gainium community thread)
    url: https://community.gainium.io/t/2443
related:
  - turtle
  - ema-20-50-rsi
faq:
  - title: What is a Keltner channel?
    details: >-
      A band around a moving average whose width comes from the recent range of
      the candles. A close above the upper band is a move larger than the recent
      range usually allows.
  - title: What does the TEMA do here?
    details: >-
      It is the trend filter. The bot only buys a breakout while price is above
      the 400-hour triple exponential moving average, about two and a half weeks
      of hourly candles.
  - title: Why is it called Range Filter on the forum?
    details: >-
      The author used a wide Keltner channel the way a range filter indicator is
      used: as a band that price must leave before the bot acts.
---

This bot buys hourly breakouts above a wide Keltner channel, but only in an uptrend. A forum member built it as a range filter: a band wide enough that most candles stay inside it, so a close outside it is a real move.

## How the rules work

The channel's middle line is a 35-hour EMA, and its bands sit three times the 10-hour average range above and below it. A close that crosses above the upper band is the entry, as long as price is also above the 400-hour TEMA. The trade has a 3% take profit and a 1.5% stop; once it is 2% up, the stop moves to 1.5% above the entry.

## Running it in Gainium

Use **Copy to Gainium** on this page, or set it up by hand on a DCA bot:

1. Start condition **Technical indicators**, both required: **Keltner Channel** (35, 1 hour, EMA, range, range length 10, multiplier 3) **crossing up**, value **Upper**; and a **Moving average** (TEMA, 400, 1 hour) **less than** price.
2. Turn off safety orders.
3. Take profit 3%; stop loss 1.5% with **Move stop loss**: trigger 2%, move to 1.5%.
4. Allow one deal per pair.

## When it fails

A breakout that does not follow through. The stop is close, so a spike above the band that falls back loses a small amount, and a run of them adds up. The trend filter cuts the number of trades but does not stop false breakouts inside an uptrend.
