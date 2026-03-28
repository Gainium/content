---
id: 8
name: Order fixed in Base and Quote (Grid bots)
slug: order-fixed-in-base-and-quote-grid
description: >-
  Learn about fixing your grid bot orders in base or quote and when you should
  use each.
createdAt: '2022-08-09T05:10:34.588Z'
updatedAt: '2026-02-24T07:44:20.577Z'
publishedAt: '2022-08-09T05:10:36.563Z'
locale: en
categories:
  - grid-bots
difficulty: intermediate
tags:
  - bot
  - grid
ingested: true
ingestedAt: '2025-06-29T10:57:30.018Z'
tldr: >-
  Grid bot orders can be fixed in base or quote currency. Fixed in base means
  equal base per grid (higher profits at top of range), while fixed in quote
  means equal quote value per grid (uniform profit across the range).
---

When setting up your grid bot, you must select if you want to fix the orders in base or quote currency. Conversely, trading pairs are usually represented as BASE/QUOTE (for example, BTC/USDT).

When the orders are fixed in base, each grid will have the same fixed amount of base per grid, and when the orders are fixed in quote, each grid will have the same fixed amount of quote value.

When you fix the orders in base, the quote value of the grids at the bottom is less than that of the top. Hence you will be making more significant profits at the top of the range. When you fix the orders in quote, the quote value of the grids is the same across the range; hence the profit between the grids is also the same.

Choosing which one to use comes down to your trading style and preferences.
