---
id: 60
name: Multiple Stop Loss targets
slug: multiple-stop-loss-targets
description: Learn what multiple stop loss targets are and how to use it for your trading.
createdAt: '2023-03-30T05:12:46.505Z'
updatedAt: '2026-02-24T07:44:20.577Z'
publishedAt: '2023-03-30T05:56:29.679Z'
locale: en
categories:
  - trading-bots
  - trading-terminal
difficulty: beginner
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.018Z'
tldr: >-
  Multiple stop loss targets let you partially exit a deal at different stop
  loss levels, useful for gradually closing a profitable position if the market
  reverses. This feature is incompatible with move stop loss and trailing stop
  loss.
---

Multiple stop loss targets are a feature that allows you to partially exit your deal at different stop loss levels. Although not as popular as [multiple take profit targets](https://gainium.io/help/multiple-take-profit-targets), there are some scenarios for which this feature is worth considering.

One such scenario is, for example, when you create a Smart Sell terminal deal that is already in profit. You would like to hit a take profit target, but at the same time, you would like to gradually exit the position if the market starts moving against you.

## Enabling multiple stop loss targets in Gainium

You can find this option under Stop Loss settings.
![multiple-sl.png](https://content.gainium.io/images/content/help/multiple_sl_7486e936a4-1635c7.webp)
Please keep in mind the following:
- Multiple stop loss targets are incompatible with [move stop loss](https://gainium.io/help/move-stop-loss) and [trailing stop loss](https://gainium.io/help/trailing-stop-loss).
- If DCA Mode is enabled, stop loss targets are calculated from the average position size.
