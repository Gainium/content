---
name: QFL Trading Strategy
slug: qfl
description: >-
  The QFL (Quickfingers Luc) strategy buys when price cracks below a base, a
  support level that held before, and sells the bounce. Its rules, how to run them
  as a Gainium DCA bot, and how they do against random entries on eight major coins.
tldr: >-
  Find a base, buy when price cracks a few percent below it, average down with
  safety orders and sell the bounce back. In Gainium, the QFL Base Scanner start
  condition finds the base and the crack for you.
publishedAt: '2026-10-29'
updatedAt: '2026-10-29'
sources:
  - title: Quickfingers Luc (QFL) indicator in the Gainium library
    url: https://gainium.io/indicators/qfl
related:
  - urma-lite
  - turtle
faq:
  - title: What does QFL stand for?
    details: >-
      Quickfingers Luc, the trader who popularised the method of buying panic
      drops below a base and selling the bounce.
  - title: What is a base in QFL?
    details: >-
      A low that price bounced away from. Gainium's scanner takes the lowest low of
      the last 36 candles and confirms it as a base once price has bounced 3% above
      it within 8 candles.
  - title: Is QFL better than buying at random?
    details: >-
      The results table on this page compares the QFL bot with random entries that
      use exactly the same safety orders and take profit, on eight major coins.
---

QFL is a dip-buying strategy: it waits for price to fall through a base, a level it bounced from before, and buys the panic. The idea is that a crack below a base is often a sharp overreaction that snaps back.

The name comes from Quickfingers Luc, who traded it by hand on small altcoins. Gainium's QFL Base Scanner turns the base and the crack into a rule a bot can follow.

## How the rules work

A base is the lowest low of the last 36 candles, confirmed when price bounces 3% above it within 8 candles. When price later falls 3% below that base, the base has cracked and the bot buys.

A crack can keep going. The safety orders buy lower as it does, which pulls the average price down so the bounce needed to reach the take profit gets smaller. The take profit sells the whole position 3% above its average.

## Running it in Gainium

Create a DCA bot on the 1-hour interval:

1. Set the start condition to **Technical indicators** and add **QFL Base Scanner** with its defaults: base periods 36, pump periods 8, pump 3%, base crack 3%.
2. Turn on safety orders: 8 orders, the first 2% lower, step scale 1.15, volume scale 1.5.
3. Set the take profit to 3%.

These are the scanner's defaults and the bot form's Mid-term safety-order preset, so the test uses settings a new user would start from.

## When it fails

QFL buys falling prices, so a crack that turns into a trend down is the case that hurts. The safety orders keep buying, the position grows, and with no stop loss the deal waits for a bounce that may take a long time. Size the ladder for the deepest drop you are willing to hold.
