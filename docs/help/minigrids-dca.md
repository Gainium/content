---
id: 133
name: Combo Minigrids DCA
slug: minigrids-dca
description: >-
  Maximize your trading potential with Gainium's DCA Minigrids, combining grid
  and DCA strategies for optimal entries and exits in volatile markets.
createdAt: '2024-10-07T08:00:11.304Z'
updatedAt: '2026-02-24T07:44:20.576Z'
publishedAt: '2024-10-07T08:00:13.395Z'
locale: en
categories:
  - combo-bots
difficulty: advanced
tags:
  - grid
  - dca
ingested: true
ingestedAt: '2025-06-29T10:57:30.016Z'
tldr: >-
  DCA Minigrids in Gainium''s Combo Bot combine grid and DCA strategies by
  placing multiple mini-grid levels within each DCA order range, maximizing
  profit from small price fluctuations. Configure DCA orders, step percentage,
  minigrid levels, and optionally enable Smart Orders.
---

### DCA Minigrids in Gainium's Combo Bot

**DCA Minigrids** in the Combo Bot feature is a hybrid trading strategy combining elements of both Grid and DCA strategies. This tool allows you to set up multiple **mini-grids** within the range of your DCA orders to maximize profits in volatile market conditions. Here’s a detailed breakdown of the settings using the tooltips for reference.

### Key Settings for DCA Minigrids:
- **DCA Orders (5)**:This setting defines the number of DCA orders the bot will place during a deal. In this example, the bot will place 5 DCA orders. More DCA orders can cover a broader price range and provide more opportunities to buy or sell.
- **DCA Order Amount**:The amount allocated to each DCA order. In this case, it’s **3.178095 USDT** per order, which is customizable based on the trader’s risk tolerance and capital.
- **Orders Step (5%)**:This determines the percentage price drop required between each DCA order. Setting it to 5% means the bot will place a new order every time the asset’s price drops by 5%.
- **DCA Minigrid Levels (5)**:This specifies the number of grid levels within each DCA order. Setting it to **5** levels ensures that after each DCA order is triggered, the bot will place 5 grid orders within that price range to maximize profits from smaller price fluctuations.
- **Active Minigrids**:Enabling this option allows the bot to open buy orders below the current price, creating a grid under the base minigrid instead of placing DCA orders.
- **Smart Orders**:If enabled, this allows the bot to only lock funds for **active** orders, freeing up capital for other trades until the remaining orders are activated. This is useful for managing capital efficiently when trading multiple assets.
- **Step Scale**:This setting multiplies the percentage step between each DCA order. A **Step Scale** of 1 means the steps between each order remain constant, while increasing the value progressively widens the gap between each order.
- **Volume Scale**:This multiplier adjusts the amount for each DCA order progressively. A **Volume Scale** of 1 means the order sizes remain the same, but increasing the value will scale up the amount for each subsequent DCA order.

![image.png](https://content.gainium.io/images/content/help/image_1630be8a41-6654a4.webp)
*DCA Minigrids Combo*

### Practical Use and Configuration

The DCA Minigrids feature is particularly useful in volatile markets. Here’s how you might configure it:
- Set **DCA Orders** to 5 to allow the bot to place 5 orders across different price levels.
- Use a **5% Order Step** to ensure orders are spaced far enough apart to capture meaningful price movements.
- Configure **5 Minigrid Levels** to have grid orders within each DCA, ensuring profits even with small price fluctuations within the range.
