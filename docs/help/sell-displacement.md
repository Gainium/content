---
id: 6
name: Sell displacement
slug: sell-displacement
description: >-
  Learn how to sell displacement works and how to take advantage of this
  feature.
createdAt: '2022-08-09T05:01:51.158Z'
updatedAt: '2026-02-24T07:44:20.581Z'
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

This is used to avoid users losing money on exchange fees. Hence the minimum setting is double the exchange fee.

There are, however other cases in which increasing this gap may be helpful. If you have detected a price range and would like to maximize your profits, increasing the sell displacement will allow you to concentrate the buy orders towards the bottom and the sell orders towards the top of the range.
![sell-dsplacement.webp](https://content.gainium.io/images/content/help/sell_dsplacement_028be72d95-dcfe0c.webp)
*Sell displacement in a range.*
