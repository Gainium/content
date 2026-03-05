---
id: 93
name: Strategy vs Random Scatterplot
slug: strategy-vs-random-scatterplot
description: >-
  Discover Gainium's backtester update with our new statistical feature that
  compares your crypto trading strategy against random trades to validate
  trading edge. Learn how it works and refine your trading approach!
createdAt: '2023-11-03T08:08:40.601Z'
updatedAt: '2026-02-24T07:44:20.582Z'
publishedAt: '2023-11-03T09:31:38.519Z'
locale: en
categories:
  - trading-bots
difficulty: intermediate
tags:
  - strategy
ingested: true
ingestedAt: '2025-06-29T10:57:30.026Z'
tldr: >-
  The backtester''s Strategy vs Random scatterplot compares your trading
  strategy''s mean return against 300 simulated random trades using a T-test. A
  T-value close to 0 means no edge over random, while a high T-value indicates a
  genuine trading edge.
---

In our latest update to the backtester, we've introduced an innovative feature designed to gauge the effectiveness of your trading strategy against randomness. This article will walk you through this new functionality and explain how it can benefit your trading approach.

## Purpose of the Random Trade Comparison Test

The new test incorporated into the backtester helps determine the presence of a [trading edge](https://gainium.io/academy/trading-edge) in your trading strategy by comparing your strategy's mean return to that of random trades over the same period. This is conducted through a T-test, a type of inferential statistic used to determine if there is a significant difference between the means of two groups, which are your strategy's trades and random trades. A T-test value close to 0 indicates that the strategy's performance is likely not different from random, casting doubt on its effectiveness.

## How does the test work?

To provide a robust comparison of your strategy vs random trades, we simulate 300 random trades within the backtest period. Each trade is projected 100 bars into the future. For example, in a 5-minute timeframe, a random trade would be automatically closed 500 minutes after opening. This approach ensures that the random trades represent varied market conditions throughout the backtested timeframe.

A scatterplot is generated to illustrate the performance clearly. This plot places returns on the Y-axis against the trade number on the X-axis. All strategy trades are plotted first, appearing on the left side, followed by the random trades on the right. This visual representation allows you to quickly discern the distribution and variance of returns for both sets of trades.

## Interpreting the T-test and Mean Returns

With the scatterplot in place, we calculate the mean return for the strategy trades and the random trades. These figures are then compared using a [T-test](https://www.investopedia.com/terms/t/t-test.asp) to obtain the T-value. The closer this value is to 0, the stronger the indication that the strategy’s returns are statistically indistinguishable from random trades, suggesting no inherent trading edge.
![low_t-value.jpeg](https://gainium.io/images/content/help/low_t_value_04b3b3594e-6ecef2.jpeg)
*Low T-value*
![high_t-value.jpeg](https://gainium.io/images/content/help/high_t_value_7ccdb90c3a-eeb54c.jpeg)
*High T-value*

### The Role of Random as a Benchmark

It’s essential to understand that the random trade benchmark is not about competition; it's about validation. Outperforming the random trades return is a positive indicator, but it isn't the sole measure of a strategy's validity. For instance, a long-only strategy tested during a market upswing might underperform compared to random trades during that period. Therefore, the purpose of this test is to challenge and reject the hypothesis that your strategy's performance is purely a product of chance.

&nbsp;

We hope this guide helps you maximize the backtester’s new capabilities. For further assistance or questions, don't hesitate to contact our supportive community or customer service team. Happy trading!
