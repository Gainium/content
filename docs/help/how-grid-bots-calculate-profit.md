---
id: 85
name: Understanding how grid bots calculate profit
slug: how-grid-bots-calculate-profit
description: Learn how we calculate grid bot profits at Gainium.
createdAt: '2023-08-03T11:42:05.133Z'
updatedAt: '2026-02-24T07:44:20.573Z'
publishedAt: '2023-08-03T14:13:37.578Z'
locale: en
categories:
  - grid-bots
difficulty: advanced
tags:
  - bot
  - grid
  - profit
ingested: true
ingestedAt: '2025-06-29T10:57:30.012Z'
tldr: >-
  Gainium calculates grid bot profit by counting matched buy/sell order pairs
  plus unmatched orders valued against the token''s initial price, with exchange
  fees included. This comprehensive method accounts for every transaction,
  including open positions.
---

Today, we will address a topic that often puzzles many of our esteemed clients - how our advanced grid bots calculate profits.

At Gainium, we believe that transparency is essential for trust. As such, it's our pleasure to walk you through how our grid bot profits are computed.

When discussing grid trading in the cryptocurrency world, platforms typically use one of two methods to calculate grid bot profits. The first method counts profits only when there is a match for both buy and sell orders, ignoring those without a match. On the other hand, the second method counts profits when there is a match for buy and sell orders, and those unmatched orders are matched to the initial price of the token. The initial price of the token defaults to the token's purchased price (if the bot purchased it) or the token's price when the bot was started (if you used your token's balance).&nbsp;

Whether counting unmatched orders or not, the exchange fees are considered in both cases, so you don't have to worry about that.

At Gainium, we utilize the latter method - not only counting matched buy and sell orders but also including unmatched orders matched to the initial price of the token. This method provides a comprehensive view of the trading situation, ensuring every transaction, matched or unmatched, is accounted for in the profit calculation.

## Example: ETH/USD grid

Assume we set up an ETH/USD grid bot with a budget of $500 and a range of $1,000 to $1,500, with 5 grids each spaced $100 apart. The current price of ETH is $1,000, hence we buy 0.5 ETH (0.1 ETH each grid order). The bot will place 5 sell orders within this range. Each grid, therefore, represents a $100 price change in ETH/USD. Let's ignore exchange fees for the sake of simplicity.

![eth-usd-grid.png](https://content.gainium.io/images/content/help/eth_usd_grid_fe800f2288-b3f489.png)

As you can see from the image above, orange triangles are unmatched sell orders, which we match to the initial price of $1,000. This way, the total profit for this grid is $180.

This approach reflects a comprehensive profit calculation, accounting for the grid's efficiency and unmatched orders that might be overlooked.

It's worth noting that the Gainium grid bot strategy is designed to perform best in a volatile market where the price of a trading pair fluctuates within a specific range. The unmatched order profits help in maximizing gains in these volatile market conditions.

We hope this article provides a clear understanding of how Gainium's grid bot calculates profits. As always, our team is available to answer any queries regarding our trading platform. Happy trading!
