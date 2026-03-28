---
id: 104
name: Active Minigrids
slug: active-minigrids
description: >-
  Unlock trading efficiency with Active Minigrids: Start your combo deal with
  grid buy and sell orders, enhancing your combo bot's performance
createdAt: '2024-03-22T05:52:06.453Z'
updatedAt: '2026-02-24T07:44:20.558Z'
publishedAt: '2024-03-22T09:06:30.048Z'
locale: en
categories:
  - combo-bots
difficulty: intermediate
tags:
  - grid
ingested: true
ingestedAt: '2025-06-29T10:57:29.978Z'
tldr: >-
  The Active Minigrids feature in combo bots allows both buy and sell grid
  orders to be placed immediately when a deal starts, rather than waiting for a
  DCA level to be reached. This provides more trading flexibility from the
  outset by placing buy orders below the current price alongside the default
  sell orders.
---

The combo bot's "Active Minigrids" feature is designed for traders who want to initiate trades with buy orders below the current price without waiting to reach a DCA level. Normally, the combo bot only starts with a minigrid of sell orders, with each DCA adding more sell orders. Enabling "Active Minigrids" allows the bot, in a long position, to place both sell orders from the base minigrid and additional buy orders below the current price, offering more flexibility from the outset.

Let's learn more about how this feature works and how you can use it.

## Example

Let's examine an example of the BTC/USDT pair. As we load the bot default parameters, we can see the minigrid's sell orders in red. The buy orders are greyed out underneath, as these grid lines won't become active until the next DCA order is filled (in green).

![active-minigrids-1.png](https://content.gainium.io/images/content/help/active_minigrids_1_0d3340a5b1-23850d.png)

If we enable the Active Minigrids option, the grid lines under price (buy grid orders) become green. This means these orders will be sent to exchange as limit orders as soon as the deal starts without waiting for the price to hit the DCA order.

![active-minigrids-2.png](https://content.gainium.io/images/content/help/active_minigrids_2_b1e4f3b9b4-482cf9.png)

## Active Minigrids tips
- As with any bot feature, it pays to backtest different options. Sometimes, this option can increase profitability, and sometimes, it is better to leave it off.- To avoid possible errors, ensure that the number of active minigrids is lower than the number of smart orders.

&nbsp;
