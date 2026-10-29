---
name: Super Wide-Range Grid Stack
slug: grid-stack
description: >-
  The super wide-range grid stack runs five grid bots across a coin's whole price
  range, with tighter grids where price spends most time. Its rules, how to set it
  up in Gainium, and how it does against holding on BTC, ETH and SOL.
tldr: >-
  Split the coin's two-year range into five zones, run one grid bot per zone with
  its own spacing and budget, take profit in the coin low down and in USDT high
  up, and leave it running.
publishedAt: '2026-10-29'
updatedAt: '2026-10-29'
sources:
  - title: The super wide-range grid stack strategy (Gainium blog)
    url: https://gainium.io/blog/the-super-wide-range-grid-stack-strategy
related:
  - double-dca
  - turtle
faq:
  - title: Why compare the grid stack with holding and not with random entries?
    details: >-
      A grid has no entry signal to randomise: it is in the market from the moment
      it starts. The question a grid stack answers is whether trading the range
      beats simply buying the coin with the same budget and holding it.
  - title: Which coins suit a grid stack?
    details: >-
      Coins you are willing to hold for a long time, with enough price history to
      draw a range. The test uses BTC, ETH and SOL.
---

The super wide-range grid stack covers a coin's whole price range with five grid bots instead of one. Each zone gets its own spacing, budget and profit currency, so the stack buys more of the coin when it is cheap and takes profit in USDT when it is expensive.

It is a hybrid of investing and trading: the stack holds the coin through a fall, and the grids sell part of it on every bounce.

## How the rules work

Take the price range the coin traded in over the last two years and cut it into a bottom, a middle and a top third. Add a zone below the range and a zone above it. Each zone runs one grid bot:

- **Below the range:** wide spacing and a small budget. Price here is outside anything seen recently.
- **Bottom third:** tight spacing and a large budget, taking profit in the coin.
- **Middle third:** medium spacing, taking profit in the coin.
- **Top third:** tight spacing and a large budget, taking profit in USDT.
- **Above the range:** wide spacing, taking profit in USDT.

The tested version sets each zone's edges from the range by rule. The original write-up tunes them to support and resistance by hand.

## Running it in Gainium

Create five grid bots on the same pair, one per zone, each with its zone's low price, high price, grid step and budget from the rules above. Turn on smart orders so only the orders near the price sit on the exchange. That keeps most of the budget free and stays under the exchange's limit on open orders.

## When it fails

A grid makes its money on swings inside its zones. A coin that leaves its whole range and keeps going ends the trading: above the range, the stack holds only USDT and misses the rest of the rally; below it, the stack holds coin bought all the way down. The ranges also go stale. A stack drawn on an old range needs redrawing when price moves far from it.
