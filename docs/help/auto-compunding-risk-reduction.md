---
id: 109
name: Auto-Compounding and Risk Reduction
slug: auto-compunding-risk-reduction
description: >-
  Discover Gainium’s new Auto-Compounding and Risk Reduction features for
  trading bots. Boost profits and manage risks efficiently.
createdAt: '2024-08-14T07:36:15.796Z'
updatedAt: '2026-02-24T07:44:20.563Z'
publishedAt: '2024-08-14T07:36:18.249Z'
locale: en
categories:
  - trading-bots
difficulty: advanced
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:29.992Z'
tldr: >-
  Auto-Compounding automatically reinvests profits into the next trade''s order
  size, while Risk Reduction scales down the next trade size by subtracting
  losses. Unlike percentage-of-asset trading (which checks actual account
  balances), these features operate internally within the bot''s calculations.
---

We’re excited to announce two new features for our trading bots: Auto-Compounding and Risk Reduction. These tools are designed to make your trading more efficient and adaptive, helping you maximize profits while managing risks more effectively.

## What is Auto-Compounding?

Auto-Compounding takes the profits from a successful trade and automatically adds them to the next trade. It’s like reinvesting your earnings to build up your position gradually. This feature is particularly powerful if you aim for exponential growth over time.

## What is Risk Reduction?

Conversely, Risk Reduction automatically adjusts the size of your next trade by subtracting any losses incurred. This way, if a trade doesn’t go as planned, the bot scales down the risk on subsequent trades, helping to protect your capital.

## How These Features Differ from % of Asset-Based Trading

It is important to understand how Auto-Compounding and Risk Reduction differ from trading with a percentage of your asset. When you use a percentage of your asset, the bot checks your account balances before starting a new deal. This method is ideal if you plan to manually add or withdraw funds, as the bot adjusts based on your actual account balance.
![image.png](https://content.gainium.io/images/content/help/image_6cf31e3562-d8e564.webp)
In contrast, Auto-Compounding and Risk Reduction operate internally within the bot’s calculations. They don’t verify whether the funds are actually available in your account before applying changes. The bot assumes the balance remains consistent, making these features more seamless and requiring careful monitoring to avoid discrepancies.
![image.png](https://content.gainium.io/images/content/help/image_07fdb5ace9-15c294.webp)
## Which Method Should You Use?

The choice between using Auto-Compounding/Risk Reduction or % of asset depends on your trading style and needs:
- **Auto-Compounding/Risk Reduction**: Best for traders who want a set-and-forget approach with automatic adjustments based on trade outcomes. It is also ideal for traders who run multiple bots on the same pair. However, ensure you know your actual account balance to avoid any issues.
- **% of Asset-Based Trading**: This is ideal if you frequently adjust your account balance or want the bot to reflect real-time changes in your funds.

## Final Thoughts

These new features add more flexibility and control to your trading strategy. Whether you’re aiming for growth or looking to manage risk, Auto-Compounding and Risk Reduction offer new ways to enhance your bot’s performance. As always, monitor your trading and adjust your settings to align with your goals.

Happy trading!
