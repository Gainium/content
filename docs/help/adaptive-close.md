---
id: 113
name: Adaptive Close
slug: adaptive-close
description: >-
  Learn how Gainium’s Adaptive Close feature automatically adjusts trades to
  avoid out-of-funds errors, ensuring efficient and smooth deal closures.
createdAt: '2024-10-05T13:00:39.225Z'
updatedAt: '2026-02-24T07:44:20.559Z'
publishedAt: '2024-10-05T13:07:27.210Z'
locale: en
categories:
  - trading-bots
  - combo-bots
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:29.979Z'
tldr: >-
  Adaptive Close is an experimental feature that automatically adjusts position
  closure based on available exchange funds, preventing "out of funds" errors.
  If the balance is less than needed to fully close a deal, the bot uses
  whatever funds are available, avoiding trade disruptions and manual
  intervention.
---

Managing your funds efficiently during automated trading is critical to executing trades without interruptions. One common issue traders face is the dreaded "out of funds" error, which can prevent trades from closing properly. To address this problem, Gainium has introduced the **Adaptive Close** feature. This feature automatically adjusts your position closure based on the available funds on the exchange, ensuring your trades are closed smoothly even if there are unexpected fund variations.

In this article, we’ll explain how the Adaptive Close feature works and why it’s important for your trading strategy. We will also provide an example to illustrate how it can be a game-changer in avoiding "out of funds" errors.

## What Is Adaptive Close?

**Adaptive Close** is an automation feature designed to ensure your trades are closed efficiently, even when the expected amount of funds to close a position is unavailable on the exchange. If the available funds on the exchange are less than the amount needed to close a deal fully, Adaptive Close will adjust and use the available funds to close the position. This prevents incomplete closures that could lead to fund allocation issues or trade disruptions.

### Key Benefits of Adaptive Close:
- **Prevents "Out of Funds" Errors:** Automatically adjusts to use the available funds, avoiding trade errors.
- **Efficient Deal Closure:** Ensures your trade is completed without manually intervening.
- **Handles Unexpected Fund Variations:** Useful when your balance changes unexpectedly, such as after withdrawing funds or using multiple bots on the same exchange.

## How to Use the Adaptive Close Feature in Gainium

### Step 1: Navigate to Your Bot Settings
- Log into Gainium and select the bot you want to enable Adaptive Close for.

### Step 2: Enable Adaptive Close
- Under the **Experimental Features**, you’ll find an option to enable **Adaptive Close**.
- Toggle the feature on. Once activated, Adaptive Close will monitor your available funds whenever the bot attempts to close a position.
![image.png](https://content.gainium.io/images/content/help/image_b56c80c47e-ae856d.png)
*Adaptive close settings*

### Step 3: Let the Bot Manage It
- Once the feature is enabled, you don’t need to worry about running out of funds for a particular trade. The bot will automatically adjust to close the position using the available funds on the exchange.
- In the bot's trade history, trades that closed with less than expected funds will have a warning icon. Hover over the icon to see the expected and actual amount executed.

## Example: How Adaptive Close Works

Let’s walk through an example to demonstrate how Adaptive Close can be beneficial during a trade.

### Scenario

You have a trading bot running on the **BTC/USDT** pair. The bot enters a long position, and everything is running smoothly. However, during the trade, you withdraw some BTC from your exchange account, and the remaining balance is now lower than what the bot originally expected to use for closing the trade.

Here’s what happens next:
- **Expected Close Amount:** The bot expects to close the position with 0.5 BTC.
- **Available Funds:** Due to your withdrawal, only 0.4 BTC is left in your account.
- **Without Adaptive Close:** In a traditional setup, the bot would try to close the position using 0.5 BTC. Since the funds are insufficient, this would trigger an "out of funds" error, and the trade wouldn’t close, potentially leaving you with an open position at a risky time.
- **With Adaptive Close Enabled:** The bot detects that only 0.4 BTC is available and automatically adjusts the closing order to use the available funds. The position is closed efficiently without errors, ensuring you aren’t exposed to additional market risk.

This simple example highlights how Adaptive Close ensures your positions are closed based on real-time available funds, avoiding unnecessary errors and manual intervention.

## Practical Considerations

When using Adaptive Close, here are a few things to keep in mind:

### 1. Monitor Your Funds

Although Adaptive Close helps prevent errors, it is still important to keep track of your available funds on the exchange. If you frequently withdraw funds or run multiple bots, ensure enough liquidity for your trades to execute as expected.

### 2. Bot Performance

Adaptive Close ensures that your bots continue to run smoothly, even in cases where you might accidentally deplete your funds. This feature keeps the workflow automated, reducing your bot’s performance interruptions.

### 3. Multi-Bot Scenarios

If you’re running multiple bots on the same exchange account, Adaptive Close ensures that each bot can still function properly, even if one bot has used more funds than anticipated. This reduces the risk of competition for funds between different bots.

## Conclusion

The **Adaptive Close** feature is a powerful addition to Gainium’s toolset. It gives you greater flexibility and ensures your trades are executed smoothly without running into "out of funds" errors. By automatically adjusting the position closure based on the available funds on the exchange, Adaptive Close reduces the need for manual intervention, providing a more efficient and seamless trading experience.

Whether you're an advanced trader managing multiple bots or just getting started with automated trading, this feature will help you avoid disruptions and manage your trades more effectively.

Enable Adaptive Close today and take control of your trading efficiency.
