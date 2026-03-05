---
id: 5
name: Arithmetic and Geometric grid types
slug: arithmetic-and-geometric-grid-types
description: >-
  In this article we explain the difference between arithmetic and geometric
  grids and in when should you use each grid type. Both of these strategies
  automate the trading process by placing buy and sell orders at predetermined
  intervals, but they differ in how these intervals are set.
createdAt: '2022-08-09T04:50:50.795Z'
updatedAt: '2026-02-24T07:44:20.562Z'
publishedAt: '2022-08-09T04:50:52.547Z'
locale: en
categories:
  - grid-bots
difficulty: advanced
tags:
  - grid
ingested: true
ingestedAt: '2025-06-29T10:57:29.988Z'
tldr: >-
  Arithmetic grids space orders by a fixed quote currency amount (e.g., every
  $20), best for stable markets and shorter-term trading. Geometric grids space
  orders by a fixed percentage (e.g., every 1%), making them adaptive to
  volatility and better suited for longer-term or trending markets.
---

Cryptocurrency trading platforms like Gainium offer a variety of advanced tools, including grid trading bots, to cater to novice and experienced traders. Two common types of grids used in crypto trading are geometric and arithmetic grids. Understanding the difference between these two grid types is crucial for traders looking to optimize their strategies.

## **Arithmetic Grids - Consistent Step Value**

The Arithmetic grid type is characterized by its uniform spacing of buy and sell orders. This method uses a constant step value in terms of the quote currency. Here's what you need to know:

**How Arithmetic Grids Work:**
- **Consistent Spacing:** Each grid level is spaced evenly in the quote currency (e.g., USDT).- **Fixed Interval:** The distance between each buy and sell order is set by a fixed monetary amount, irrespective of the price level.

![Grid Arithmetic.jpg](https://gainium.io/images/content/help/Grid_Arithmetic_cc1293ce3a-cca839.jpg)

**Example: BNB/USDT Pair**
- **Setting the Grid:** If you choose a step value of 20 USDT, and your starting point is at 300 USDT, your orders would be placed at 280, 300, 320 USDT, and so on.- **Trading Mechanics:** Whenever the price of BNB drops to 280 USDT, a buy order is executed. As the price rises to 320 USDT, a sell order is triggered.

**Benefits of Arithmetic Grids:**
- **Simplicity:** Easier to understand and manage.- **Ideal for Stable Markets**: Best suited for markets with less volatility and linear price movements.- **Short to Medium-Term Focus**: More effective for trading over shorter periods.

**Considerations:**
- **Non-Adaptive:** The same step value may not be optimal if the market's volatility changes significantly.- **Risk Management:** Requires careful consideration of how far apart the orders are set, as larger intervals can mean missed opportunities in fast-moving markets.

## **Geometric Grids - Consistent Percentage Difference**

In contrast, the Geometric grids are consistently spaced by the same % difference in price. This means the distance between the orders increases or decreases in a geometric progression. This grid type benefits markets with high volatility or trading over extended periods. It allows for a more flexible response to market changes as the grid adapts to exponential price movements.

Regarding BNB/USDT, we could make a grid with buy/sell orders 1% apart.

**How Geometric Grids Work:**
- **Percentage-Based Spacing:** The distance between grid levels is defined by a fixed percentage.- **Proportional Interval:** The monetary value between orders changes as the price increases or decreases, maintaining a consistent percentage gap.

![Grid Geometric.jpg](https://gainium.io/images/content/help/Grid_Arithmetic_291b6b6c4e-7dd65f.jpg)

**Example: BNB/USDT Pair**
- **Setting the Grid:** If you opt for a 1% grid step, and your base price is 300 USDT, the orders will be placed at prices that are each 1% higher or lower than the last (e.g., 297 USDT, 300 USDT, 303 USDT, etc.).- **Trading Mechanics:** A buy order is executed when the price falls by 1% to 297 USDT, and a sell order is triggered when the price climbs by 1% to 303 USDT.

**Benefits of Geometric Grids:**
- **Adaptive Spacing:** Automatically adjusts to market volatility, maintaining a relative position reflective of price changes.- **Suited for Volatile Markets:** Geometric grids handle sudden price changes more effectively.- **Long-Term Efficiency:** They are more efficient for long-term trades where price can exhibit exponential behavior.

**Considerations:**
- **Complexity:** May require a deeper understanding of market dynamics to set the optimal percentage.- **Volatility Sensitivity:** In highly volatile markets, the percentage difference might need frequent adjustments to avoid significant capital risk.

## When should you use arithmetic or geometric grid types?

It comes down to your preference and trading style, but you should know that geometric grid types are “bottom heavy” while arithmetic grids are evenly spaced across the range. For this reason, there are more buy orders in a geometric grid than in an arithmetic grid.

**Use Arithmetic Grids if:**
- You are targeting a market with relatively stable prices and small fluctuations.- You prefer a straightforward and consistent trading approach.- You are trading a short/medium-term range.

**Use Geometric Grids if:**
- You are trading in a market with variable volatility or trending price movements.- You want to capitalize on proportional gains and understand the implications of percentage-based order spacing.- You are trading a longer-term range.

Both [grid strategies can be backtested](https://gainium.io/help/backtesting-grid-bots) on Gainium's platform, allowing you to refine your approach without risking your capital.

In conclusion, whether you choose Arithmetic or Geometric grids, Gainium's advanced trading platform offers the tools you need to execute these strategies effectively. As always, exercise due diligence and consider engaging with the Gainium community for shared learning and support to enhance your trading experience.
