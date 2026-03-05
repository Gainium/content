---
id: 72
name: Start Price for Grid Bots
slug: start-price-grid-bots
description: >-
  Start price triggers for grid bots offer additional control, allowing traders
  to optimize their strategies and ensure that the bot activates only when the
  desired market conditions are met.
createdAt: '2023-04-11T07:37:19.358Z'
updatedAt: '2026-02-24T07:44:20.581Z'
publishedAt: '2023-04-11T07:37:21.246Z'
locale: en
categories:
  - grid-bots
difficulty: intermediate
tags:
  - bot
  - grid
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.025Z'
tldr: >-
  The start price feature lets you set a specific price trigger at which a grid
  bot activates, ensuring it only begins trading when market conditions match
  your expectations. The bot remains inactive until the specified price is
  reached.
---

Grid bots have become essential for many traders, automating buying low and selling high within a predefined price range. One powerful feature of Gainium's grid bots is the ability to set a price trigger, enabling the bot to activate only when a specific price is reached. In this article, we'll explore the concept of start price for grid bots and provide an example using the BTC-USDT trading pair.

## Understanding Start Price for Grid Bots

A start price is a setting within grid bots that allows traders to define a specific price at which the bot becomes active. This feature provides additional control over the bot's actions, ensuring it begins trading only when the market conditions align with the trader's expectations. Key benefits of using price triggers include:
- Increased control over the grid bot's activation- Tailoring the bot's actions to market conditions- Enhancing the effectiveness of grid bot strategies

The start price option can be found under the Strategy section of the grid bot.

## Example Using a Price Trigger with the BTC-USDT Grid Bot

Let's dive into an example of how a price trigger can work using the BTC-USDT trading pair. For this example, assume the following:
- Current BTC-USDT price: $30,000- Desired price range for grid bot: $30,000 - $40,000- Grid levels: 20- Price trigger: $32,000
![grid-start-price.png](https://gainium.io/images/content/help/grid_start_price_80215bbeb2-311a8b.png)
Here, the trader has set the price trigger to activate the grid bot when the BTC-USDT price reaches $32,000. The bot will not begin trading until the specified price is achieved. The grid bot's trading range is set between $30,000 and $40,000, with 20 grid levels evenly distributed within that range.

Once the price of BTC-USDT reaches $32,000, the grid bot will activate and start placing buy and sell orders within the defined range. If the price moves up, the bot will sell BTC for USDT; if the price drops, it will buy BTC using USDT. By utilizing the price trigger feature, the trader ensures that the grid bot only starts trading when the market conditions meet their predefined expectations.

## Conclusion

Start price triggers for grid bots offer additional control, allowing traders to optimize their strategies and ensure that the bot activates only when the desired market conditions are met.&nbsp;
