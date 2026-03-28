---
id: 57
name: Using Multiple Take Profit targets
slug: multiple-take-profit-targets
description: >-
  Discover how multiple take profit targets can help boost your crypto trading
  strategy. Explore the benefits and learn how to implement it in Gainium.
createdAt: '2023-03-24T02:30:21.563Z'
updatedAt: '2026-02-24T07:44:20.577Z'
publishedAt: '2023-03-24T03:07:53.805Z'
locale: en
categories:
  - trading-bots
  - trading-terminal
difficulty: intermediate
tags:
  - profit
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.018Z'
tldr: >-
  Multiple take profit targets allow you to partially exit a deal at up to 10
  different profit levels, helping with risk management and profit maximization.
  When the first TP target fills, all pending DCA orders are canceled.
---

Have you ever heard the quote: "Bulls make money, bears make money, but pigs get slaughtered."? This means that it's important to take profits when the market is in your favor rather than being too greedy and risking losing everything.

Multiple Take Profits is a feature that allows you to partially exit your deal at different take profit levels. Having multiple take profit levels can help your trading in several ways:
- **Risk Management**: Multiple TPs allows you to secure partial profits at various stages. This approach helps to mitigate the risk of market fluctuations and ensures you lock in gains along the way.- **Profit Maximization**: This flexible approach enables you to capitalize on short-term price spikes while still leaving room for further growth.- **Control your greed**: Many traders let their winning trades run, but sometimes get too comfortable and do not take profits along the way, ignoring the fact that markets can reverse quicker than anticipated. Using multiple take profit targets can help maintain emotional stability by reducing the stress of deciding when to exit a position entirely. With a predefined plan, you can trade more confidently and avoid making impulsive decisions (or not making any at all).- **Adaptable**: Employing multiple take profit targets allows for greater adaptability to changing market conditions. You can adjust your targets as needed based on your analysis of market trends, technical indicators, or changes in market sentiment.

Imagine this scenario: you have an open deal for a token currently trading at $10. You are very confident that $12 will be reached in the short term, reasonably confident that $14 will be reached in the short to medium term, and hopeful that $18 and beyond will be reached sometime in the next few weeks.

By using multiple take profits, you can exit the position proportionally to the level of confidence you have for each target. An example could be:
- Sell 30% at $12- Sell 20% at $14- Sell 10% at $18- Sell 5% at $22- Sell 5% at $25

Multiple TPs is a great risk-management strategy that helps us avoid making greedy decisions.
![multiple-tp-chart.png](https://content.gainium.io/images/content/help/multiple_tp_chart_ee35d1cba9-571355.png)
## Enabling Multiple TPs in Gainium

To use multiple TP in your terminal in bot deals, enable the option in the Take Profit section. Then add as many targets as you wish and tweak them to your liking.

Here are a few things to keep in mind:
- You can add up to 10 TP targets as long as each target meets the minimum order size as dictated by the exchange- When DCA mode is enabled, TP targets are always calculated from the average order price- Once the first TP target is filled, all pending DCA orders will be canceled. This is to help avoid the situation where you sold part of the deal, then the price came back to fill a DCA order. In this case, the initial profit projection would not have been accurate, so in order to avoid confusion and unexpected results, we decided to cancel pending DCAs.
![multiple-tp.png](https://content.gainium.io/images/content/help/multiple_tp_3fc49eab62-6df13f.png)
