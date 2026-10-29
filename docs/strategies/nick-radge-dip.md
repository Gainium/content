---
name: Nick Radge Dip Buying Strategy
slug: nick-radge-dip
description: >-
  A dip-buying rule from Nick Radge: buy when price closes below its 10-day
  average while it is above its 200-day average, and sell when it closes back
  above the 10-day. Its rules, how to run them in Gainium, and how they do against
  random entries on BTC, ETH and SOL.
tldr: >-
  Buy a pullback below the 10-day moving average only while price is above the
  200-day one, and sell as soon as it closes back above the 10-day. The forum
  version adds a 10% stop loss.
publishedAt: '2026-10-29'
updatedAt: '2026-10-29'
sources:
  - title: Nick Radge Multi Bot (Gainium community thread)
    url: https://community.gainium.io/t/2026
related:
  - wma-cross
  - turtle
faq:
  - title: What is the Nick Radge dip strategy?
    details: >-
      A mean-reversion rule from the trader and author Nick Radge: in a long-term
      uptrend, a short pullback tends to recover, so buy the pullback and sell the
      recovery.
  - title: What does the 200-day average do?
    details: >-
      It is the trend filter. Below it, a pullback is more often the start of a
      fall than a dip to buy, so the bot does not enter there.
  - title: Is the stop loss part of the original rules?
    details: >-
      No. The forum member who set it up as a Gainium bot added a 10% stop loss,
      and the test uses that version.
---

This rule buys short pullbacks inside a long-term uptrend. It comes from Nick Radge, who wrote about it for stocks, and a forum member set it up as a Gainium bot for crypto.

## How the rules work

Two simple moving averages on daily candles. The 200-day average decides whether the coin is in an uptrend: the bot only buys while the close is above it. The 10-day average marks a pullback: a close below it is the entry, and a close back above it is the exit.

Most trades last a few days. The exit does not wait for a target, so a trade that recovers sells at the first close above the 10-day average, whatever the profit.

## Running it in Gainium

Use **Copy to Gainium** on this page, or set it up by hand on a DCA bot:

1. Start condition **Technical indicators**, two conditions that must both hold: a **Moving average** (SMA, 10, 1 day) **greater than** price, and a **Moving average** (SMA, 200, 1 day) **less than** price.
2. Turn off safety orders.
3. In take profit, choose **Technical indicators** and add a **Moving average** (SMA, 10, 1 day) **less than** price.
4. Set a 10% stop loss and allow one deal per pair.

## When it fails

A pullback that keeps going. The 200-day filter only checks the trend at entry, so a crash that starts above it is bought on the way down and held until the stop loss. On a coin that trends without pulling back below its 10-day average, the bot rarely trades at all.
