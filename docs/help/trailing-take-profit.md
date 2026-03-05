---
id: 62
name: Trailing Take Profit
slug: trailing-take-profit
description: >-
  Enhance your trading strategy by mastering trailing take profit with this
  comprehensive guide, including when to use it, when to avoid it, and how to
  enable it in Gainium.
createdAt: '2023-03-30T07:00:22.555Z'
updatedAt: '2026-02-24T07:44:20.584Z'
publishedAt: '2023-04-01T07:10:40.895Z'
locale: en
categories:
  - trading-bots
  - trading-terminal
difficulty: intermediate
tags:
  - profit
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.029Z'
tldr: >-
  Trailing take profit dynamically adjusts the take profit level as price moves
  in your favor, locking in gains while allowing further upside. It works best
  in trending markets; a good rule of thumb is setting deviation at 10-25% of
  the TP target.
---

One essential aspect of a successful trading strategy is knowing when to sell to maximize profits, which as any experienced trading will tell you, it's more of an art than a science. Trailing Take Profit is a popular rule-based technique allowing traders to maximize profits.

## What is Trailing Take Profit?

Simply put, a trailing take profit is a dynamic order type that allows you to lock in profits as the market moves in your favor. It works by automatically adjusting the take profit level as the price of the asset moves in your favor, ensuring that you close the position at an optimal price if the market turns. This strategy helps traders avoid missing out on potential gains while providing protection against sudden market downturns.

## A practical Trailing Take Profit example

To better understand how a trailing take profit works, let's consider a hypothetical example using the BTC/USDT trading pair.

Suppose you purchase 1 Bitcoin (BTC) at $50,000 and set a trailing take profit of 5%. This means that if the price of Bitcoin increases, the take profit level will follow the price, always maintaining a 5% gap. If the price of Bitcoin rises to $60,000, your take profit level adjusts to $57,000. If the market then declines and reaches $57,000, your position will be automatically sold, securing a $7,000 profit.

This strategy allows you to capitalize on the upward price movement while still providing a safety net should the market reverse.

## When to use Trailing Take Profit

Trailing take profit is best used in trending markets, where the price of an asset moves consistently in one direction. It allows traders to capture a significant portion of the trend's gains without prematurely exiting the position.

However, there are also some situations where you may want to avoid it:
- Volatile Assets: Assets with high volatility can experience rapid price movements. A trailing take profit uses a market order, which can result in high slippage during rapid price movements.- Low liquidity: As with high volatility, a low liquidity market may result in your market order being executed at a substantially different price than anticipated.- Range-bound Markets: In range-bound markets, where the price oscillates between a well-defined support and resistance level, a trailing take profit may lead to premature exits due to relatively small price movements.- Tight Trailing Distance: Setting a too tight trailing distance can result in your position being closed too soon, missing out on potential profits. It's crucial to strike a balance between protecting your profits and allowing for price fluctuations.

## Enabling Tailing Take Profit in Gainium

You can enable Trailing Take Profit in Trading Bot and Trading Terminal deals under Take Profit section.&nbsp;
![trailing-take-profit.png](https://gainium.io/images/content/help/trailing_take_profit_f5ddf3d1c4-0f6ea5.png)
**Trading tip**: a good rule of thumb is to set your trailing take profit deviation between 10 to 25% of your take profit target.
