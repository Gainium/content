---
id: 18
name: Take Profit and Stop Loss (Grid Bots)
slug: take-profit-stop-loss-grid
description: >-
  In this article, we'll explore the stop loss and take profit features in grid
  bots, highlighting their significance and providing tips for optimizing your
  trading experience.
createdAt: '2022-08-09T06:18:02.349Z'
updatedAt: '2026-02-24T07:44:20.583Z'
publishedAt: '2022-08-09T06:18:04.029Z'
locale: en
categories:
  - grid-bots
difficulty: advanced
tags:
  - bot
  - grid
  - profit
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.027Z'
tldr: >-
  Grid bot TP and SL can be triggered by a specific price or by a percentage
  change in the bot''s current funds value. When triggered, the bot stops and
  either cancels all orders and sells base at market, or simply cancels all
  pending orders.
---

As the cryptocurrency market continues to evolve, so do the tools and strategies traders employ. Grid bots have emerged as a popular solution for automating trading strategies, and understanding the intricacies of their features is crucial for success. In this article, we'll explore the stop loss and take profit features in grid bots, highlighting their significance and providing tips for optimizing your trading experience.

## Understanding Stop Loss and Take Profit in Grid Bots

**Stop Loss**: A stop loss is an order that automatically closes a position if the market price reaches a specified level, preventing further losses. In the context of grid bots, a stop loss is triggered when the price moves against your trading strategy, mitigating potential losses and protecting your trading capital.

**Take Profit**: Conversely, a take profit is an order that automatically closes a position once the market price reaches a predetermined level, securing profits. Grid bots utilize take profit orders to capitalize on favorable market movements, ensuring that gains are locked in before the market reverses.

## Using Take Profit and Stop Loss Features in Gainium's Grid Bots

These options are in your grid bot's Take Profit or Stop Loss section.

There are two possible triggers for these features:
- When the price is reached: the stop loss or take profit is triggered at a specific price that you specify- When the bot's value reaches a specific % change that you specify (current funds value % in quote currency). Please note that the % change is always measured in quote currency; other system currencies will be ignored.

These two features work in the same way: when the take profit or stop loss trigger condition is met, the bot stops and performs one of two possible actions:
- Cancel and sell base: The bot stops, cancels all pending orders, and sells base at market price.- Cancel orders: The bot stops and cancels all pending orders only, leaving the remainder base on the exchange.

Let's see how they work with some practical examples.

### Example #1

Imagine you have an active bot on BNB/BUSD. The current BNB/BUSD price is 300, and you set the stop loss at 280 BUSD, with the action “Cancel orders.” If the price moves down to 280 BUSD, the bot will stop and cancel all pending orders. The BNB that the bot purchased is accessible in your exchange's balance.

### Example 2

You have an active grid bot on ETH/BTC pair and set the take profit at a value change of 15% with the action “Cancel and sell base.” In this case, when the value of your current funds reaches 15%, the bot will stop, cancel all pending orders and sell all ETH at market price.

## Tips for Optimising Stop Loss and Take Profit Features in Grid Bots
- Define Your Risk Tolerance: Before implementing stop loss and take profit orders, determine your risk tolerance and trading objectives. This will help you set appropriate levels that align with your overall trading strategy.- Regularly Review and Adjust: Periodically review your grid bot's performance and make necessary adjustments to your stop loss and take profit settings. Continuously refining your strategy will ensure it remains effective in changing market conditions.- Combine with Other Strategies: While stop loss and take profit orders are powerful tools, they should not be used in isolation. Implement additional strategies, such as technical analysis or fundamental research, to complement your grid bot's automated trading approach.

## Conclusion

Incorporating stop loss and take profit features into your grid bot trading strategy can be a game-changer, providing a systematic approach to risk management and improving overall trading performance. By understanding the importance of these features and optimizing their implementation, you'll be better equipped to navigate the ever-changing cryptocurrency landscape and maximize your trading success.

The take profit feature allows you to secure your gains, while the stop loss limits the risk you are willing to take.
