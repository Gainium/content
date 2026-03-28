---
id: 114
name: Unlimited Trading in Hyperliquid
slug: unlimited-trading-hyperliquid
description: >-
  Learn how Gainium's unlimited trading feature works on Hyperliquid, including
  builder fees, free vs paid user modes, and how to manage your connection
  settings.
createdAt: '2025-11-05T00:00:00.000Z'
updatedAt: '2026-02-24T07:44:20.585Z'
publishedAt: '2025-11-05T00:00:00.000Z'
locale: en
categories:
  - exchanges-apis
  - trading-bots
difficulty: intermediate
tags: []
ingested: false
ingestedAt: '2025-11-05T00:00:00.000Z'
tldr: >-
  Gainium enables unlimited trading on Hyperliquid through builder fees. Free
  users pay builder fees (0.07% spot, 0.045% futures) but don't consume bot
  credits, while paid users pay no builder fees but use plan credits.
---

Gainium offers unlimited trading on Hyperliquid through a flexible fee structure that accommodates both free and paid users. This article explains how the builder fee system works, the differences between free and paid user modes, and how to manage your connection settings.

> **Note**: If you haven't connected Hyperliquid to Gainium yet, check out our guide on [how to connect to Hyperliquid](https://gainium.io/help/connect-to-hyperliquid) first.

![Connect to hyperliquid](https://content.gainium.io/images/content/help/connect-hyperliquid.png)

## Understanding Builder Fees

To enable unlimited trading on Hyperliquid, users need to approve a builder fee. This is a standard practice on Hyperliquid that allows third-party platforms like Gainium to facilitate trading on your behalf and get a small commission from the trade.

### When Builder Fees Apply

Builder fees are added to your trades **only when the fee currency is USDC**. The specific application depends on the market type:

- **Spot Trading**: The builder fee (0.07%) is added to the sell side of the trade
- **Futures Trading**: The builder fee (0.045%) is added to both buy and sell sides

These fees are in addition to Hyperliquid's standard trading fees and are automatically calculated and applied when you execute trades.

## Free vs Paid User Modes

When connecting your Hyperliquid exchange to Gainium, you have the option to choose between two modes based on your subscription status.

### Free User Mode

If you're using Gainium without a paid subscription:

- Builder fees (0.07% for spot, 0.045% for futures) are added to your USDC trades
- Your bots **do not consume bot credits**
- This allows you to trade unlimited volume without credit restrictions
- Ideal for users who want to try Gainium's features without a subscription

### Paid User Mode

If you're subscribed to any of Gainium's paid plans:

- **No builder fees are added** to your trades
- Bots on this exchange **consume bot credits** according to your plan
- You benefit from zero additional fees while using your plan's credit allocation
- Perfect for active traders who want to minimize costs

## Setting Up Your Hyperliquid Connection

### Initial Connection Setup

When you first connect your Hyperliquid exchange to Gainium:

1. Navigate to the **Exchanges** page in your Gainium dashboard
2. Select **Hyperliquid** and enter your connection details
3. Choose your user mode:
   - Select **Free User** if you don't have a Gainium subscription or prefer fee-based trading
   - Select **Paid User** if you have an active subscription and want to use bot credits instead

### Switching Between Modes

It's important to note that **you cannot switch between free and paid modes on an active connection**. If you need to change modes:

1. **Remove** your existing Hyperliquid connection from Gainium
2. **Reconnect** your exchange with the new mode selection
3. Bots that were using the previous connection will be stopped and deals cancelled

> **Important**: Make sure all active bots are stopped before removing your exchange connection to avoid trading interruptions.

## Flexible Credit Usage for Paid Users

Paid users have an additional advantage: **you can choose which exchanges consume credits**.

- If you add Hyperliquid as a **free user** while having a paid plan, bots on Hyperliquid won't consume credits
- Bots on your other exchanges will still count towards your plan's credit allocation
- This gives you flexibility to manage credit usage across multiple exchanges

For example, if you have a paid plan:
- You could connect Binance and Bybit (using credits, no fees)
- Connect Hyperliquid in **free mode** (not using credits, but paying builder fees)
- This allows you to prioritize credit usage for exchanges where you trade most actively

## Best Practices

### For Free Users

- Monitor your USDC trades to understand the builder fee impact
- Consider upgrading to a paid plan if builder fees exceed potential credit costs
- Take advantage of unlimited trading without worrying about credit limits

### For Paid Users

- Calculate whether builder fees or bot credits are more cost-effective for your trading volume
- Use the flexible credit system to optimize costs across multiple exchanges
- Remember to remove and reconnect if you need to change modes

## Conclusion

Gainium's unlimited trading feature on Hyperliquid offers flexibility for traders at all levels. Whether you're a free user benefiting from unlimited volume with builder fees, or a paid user optimizing credit usage across exchanges, the platform adapts to your needs.

Choose the mode that best fits your trading style and subscription level, and enjoy seamless automated trading on Hyperliquid with Gainium.
