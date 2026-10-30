---
id: 6
name: Sell displacement
slug: sell-displacement
description: >-
  Learn how to sell displacement works and how to take advantage of this
  feature.
createdAt: '2022-08-09T05:01:51.158Z'
updatedAt: '2026-10-30T12:00:00.000Z'
publishedAt: '2022-08-09T05:02:48.697Z'
locale: en
categories:
  - grid-bots
difficulty: beginner
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.024Z'
tldr: >-
  Sell displacement adds an extra price percentage to the grid distance between
  a buy order and its corresponding sell order. Increasing it concentrates buys
  toward the bottom and sells toward the top of a detected price range,
  potentially increasing profits.
---

The sell displacement is an extra price % added to grid distance, which increases the distance between a buy and its corresponding sell order. Note that this does not affect the distance between buy orders and sell orders, only between a buy and its corresponding sell order.

Its main use is to keep exchange fees from eating your grid profit. Every completed buy and sell pays a fee, so one round trip pays two. The setting defaults to 0%, and the bot doesn't enforce a minimum or adjust it for fees. If your grid step alone doesn't clear your round-trip fee, set the displacement so the step plus the displacement does. With a 0.1% fee per order, that means more than 0.2% in total.
![Sell displacement field in the grid bot settings](https://content.gainium.io/images/content/help/sell-displacement__add1.webp)
*The Sell displacement field in the grid bot settings.*

There are, however other cases in which increasing this gap may be helpful. If you have detected a price range, a larger sell displacement concentrates the buy orders towards the bottom and the sell orders towards the top of the range.
![sell-dsplacement.webp](https://content.gainium.io/images/content/help/sell_dsplacement_028be72d95-dcfe0c.webp)
*Sell displacement in a range.*
