---
id: 92
name: 'Confidence Grade: Measuring the reliability of the backtesting results'
slug: confidence-grade
description: >-
  Discover Gainium's latest feature, the Backtester Confidence Grade. Dive deep
  into how the number of trades influences backtesting reliability and enhance
  your trading decisions with statistical confidence.
createdAt: '2023-10-20T02:45:00.182Z'
updatedAt: '2026-02-24T07:44:20.567Z'
publishedAt: '2023-10-20T02:45:02.074Z'
locale: en
categories:
  - trading-bots
difficulty: beginner
tags:
  - backtesting
ingested: true
ingestedAt: '2025-06-29T10:57:30.002Z'
tldr: >-
  The Confidence Grade is a letter-based rating (A+ to F) for backtesting
  results, derived from the number of valid trades using Cochran''s Sample Size
  formula. More trades yield higher confidence: A+ requires 385+ trades (95%+
  confidence), helping traders assess the statistical reliability of their
  results.
---

In the fast-paced world of cryptocurrency trading, data-driven decisions can differentiate between success and failure. At Gainium, our relentless pursuit of innovation and improvement has led us to yet another groundbreaking feature: the Confidence Grade for our backtester. I'm thrilled to walk you through this new feature that will give traders unparalleled insights and confidence in their strategies.

## **What is the Confidence Grade?**

The Confidence Grade is a simple yet powerful grading scale that reflects the reliability of backtesting results. This grade is derived from the number of trades contained in the backtesting result, with inaccurate trades – those that open and close on the same candle – excluded.

Using statistical principles and the widely recognized [Cochran's Sample Size formula](https://www.socscistatistics.com/tests/samplesize/default.aspx), the Confidence Grade offers traders a clear and concise measure of how much faith they can put in their backtesting results. The logic is straightforward: the more trades you have, the higher your confidence in the results.

## **How Does It Work?**

Our system assigns a letter grade ranging from A+ to F based on the number of trades:
- **A+**: More than 385 trades, Confidence level above 95%- **A**: More than 273 trades, Confidence level above 90%- **B**: More than 208 trades, Confidence level above 85%- **C**: More than 164 trades, Confidence level above 80%- **D**: More than 133 trades, Confidence level above 75%- **E**: More than 107 trades, Confidence level above 70%- **F**: Less than 107 trades, Confidence level below 70%

## **Why is the Confidence Grade Essential?**

Imagine you have two strategies: one yields a 10% return based on 10 trades, while the other yields an 8% return based on 300 trades. While the first strategy appears more profitable, its results are based on a limited dataset, making it less reliable. The Confidence Grade helps traders quickly discern the reliability of backtest results, giving them more confidence in strategies backed by a larger number of trades.

## **In Conclusion**

Gainium aims to empower traders with the best tools and insights. With the introduction of the Confidence Grade, traders can now better understand the reliability of their backtesting results. Whether you're a seasoned trader or just starting, this feature is set to redefine how you evaluate and refine your trading strategies.

Dive in, explore this new feature, and trade with renewed confidence!
