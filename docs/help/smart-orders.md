---
id: 16
name: Smart Orders
slug: smart-orders
description: >-
  Explore Gainium's 'Smart Orders' feature, designed to enhance liquidity and
  flexibility in automated trading. Dive into its benefits and learn how it
  revolutionizes grid trading with BTC/USDT.
createdAt: '2022-08-09T06:07:13.335Z'
updatedAt: '2026-02-24T07:44:20.581Z'
publishedAt: '2022-08-09T06:07:15.904Z'
locale: en
categories:
  - trading-bots
  - grid-bots
  - combo-bots
difficulty: intermediate
tags:
  - orders
ingested: true
ingestedAt: '2025-06-29T10:57:30.025Z'
tldr: >-
  Smart Orders send only a portion of limit orders to the exchange at a time
  instead of all at once, keeping remaining funds liquid and available. As
  orders execute, the bot places new ones in the next grid level, improving
  liquidity and flexibility.
---

In Gainium's suite of tools, the 'Smart Orders' feature stands out as a strategic game-changer for traders who wish to maintain liquidity while automating trades. This feature is versatile and can be applied across all bot types: DCA, Grid, and Combo. Here, we break down the concept of Smart Orders and provide a practical example for grid trading with BTC/USDT.

## What are Smart Orders?

Smart Orders are a nuanced approach to automated trading. Instead of sending all the orders as limit orders at once — which would tie up and lock all the funds — Smart Orders allow the bots to send only a portion of these orders. The result? More available funds, ensuring that you maintain liquidity and flexibility in your trading activities.
![Smart-Orders-Grid.jpeg](https://gainium.io/images/content/help/Smart_Orders_Grid_11b13d36f6-088ca5.jpeg)
*Smart orders in grid bots*
![Smart-Orders-DCA.jpeg](https://gainium.io/images/content/help/Smart_Orders_DCA_c59c05b22a-ce16b3.jpeg)
*Smart orders in DCA bots*

## Benefits of Smart Orders
- **Improved Liquidity**: Avoid locking up all your funds in limit orders. With Smart Orders, a significant portion of your funds remain free and accessible.- **Flexibility**: You can use the free funds for other trading strategies or to adjust to market conditions swiftly.- **Optimized Trading**: Especially useful during high market volatility, Smart Orders ensure you don't miss out on potentially profitable trades because your funds are tied up.

## Example: Grid Trading BTC/USDT with Smart Orders

Let's dive into a practical example to understand how Smart Orders can make a difference.

**Without Smart Orders**: Suppose you've allocated 10,000 USDT for grid trading BTC/USDT. You set up 100 grids, which means 100 limit buy and sell orders spread between your desired price range. The system would place all 100 orders simultaneously, locking up the entire 10,000 USDT. You wouldn't be able to use any of these funds until an order gets executed or canceled.

**With Smart Orders**: Using the same scenario with the Smart Orders feature activated, instead of placing all 100 orders, the system might only place 10 orders around the current price. As the price of BTC/USDT moves and an order gets executed, the bot will then place a new order in the next grid. This means a significant portion of your 10,000 USDT remains available and isn't locked in unexecuted orders.

## How to Set Up Smart Orders
- Create a New bot- In grid bots, Smart orders are found in the Budget section. In DCA and Combo bots, they are found in the DCA section- Configure the number of active orders, meaning, the number of limit orders to keep in the exchange at any given time- Complete the bot setup and activate it.

## Conclusion

Smart Orders are all about optimizing the automated trading experience. By freeing up funds and offering increased flexibility, Gainium provides traders with a strategic edge, ensuring that they're always ready to capitalize on market opportunities. If you're seeking a more efficient and liquid trading experience, it's time to embrace Smart Orders.
