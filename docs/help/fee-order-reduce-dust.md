---
id: 106
name: Fee Orde (Reduce Dust)
slug: fee-order-reduce-dust
description: >-
  Explore the Fee Order feature for bots on Gainium: Efficiently manage trading
  fees, reduce asset dust, and optimize bot performance effortlessly.
createdAt: '2024-03-22T07:51:55.227Z'
updatedAt: '2026-02-24T07:44:20.571Z'
publishedAt: '2024-03-22T10:23:03.581Z'
locale: en
categories:
  - grid-bots
  - combo-bots
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.009Z'
tldr: >-
  The Fee Order feature in combo and grid bots pre-purchases additional assets
  at deal start to cover future trading fees, preventing small fee deductions on
  every order that accumulate as unusable "dust" in your portfolio.
---

Imagine this: you're setting up your bot for a trading spree. You've got everything dialed in—the strategy, the asset, the zeal. But then comes the buzzkill: the trading fees. They're like that one pebble in your shoe on a long hike—small but oh-so-irritating. That's where the "Fee Order" feature comes into play.

At its core, the "Fee Order" feature is about a preemptive strike. It's like buying a bulk pack of tickets for a series of shows you know you'll attend rather than buying a single ticket each time and paying a service fee every time. When you initiate a deal with combo and grid bots, this feature smartly purchases additional assets immediately. These assets are earmarked exclusively for fees.

Why does this matter? Let's break it down. Typically, without this feature, every buy order your bot makes includes a little extra to cover transaction fees. It's like tipping at a cafe, but it's not optional and doesn't make the barista smile. Over time, these tiny additions can accumulate into what's known as "asset dust." It's the digital equivalent of pocket lint, but less useful and more annoying. You end up with fragments of assets that are too small to trade but clutter your portfolio.

The "Fee Order" feature outsmarts this system. By setting aside assets for fees right from the get-go, your bot can operate without the need to tack on extra with every transaction. This means cleaner, more efficient trades and a portfolio that doesn't look like it needs a spring cleaning. Plus, this approach helps keep your trading strategy sharp and focused, without the drag of accumulating dust.

So, next time you set up your bot, give a nod to the "Fee Order" feature. It's your secret weapon against the pesky side effects of trading, ensuring that your focus remains on strategy and performance, not on sweeping up digital dust.

![combo-fee-order.png](https://content.gainium.io/images/content/help/combo_fee_order_ce15a69f7f-cc1242.png)
