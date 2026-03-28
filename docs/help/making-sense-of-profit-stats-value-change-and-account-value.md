---
id: 46
name: 'Making sense of profit stats, value change, and account value'
slug: making-sense-of-profit-stats-value-change-and-account-value
description: >-
  In this article we review a topic that often confuse users. Why is my account
  balance not matching the profit stats generated? Here we explore the answers
  and go through an example.
createdAt: '2022-11-19T02:39:12.793Z'
updatedAt: '2026-02-24T07:44:20.575Z'
publishedAt: '2022-11-19T02:39:14.964Z'
locale: en
categories:
  - trading-bots
  - grid-bots
difficulty: intermediate
tags:
  - profit
ingested: true
ingestedAt: '2025-06-29T10:57:30.015Z'
tldr: >-
  Bot profit stats show realized profit from completed trades, but your account
  balance also reflects unrealized profit/loss from assets the bot still holds.
  The "value change" metric combines both realized and unrealized profit for the
  true performance picture.
---

Understanding financial jargon can be a challenging endeavor. It can be confusing to make sense of it all when presented with so many vital financial key metrics.

One misconception users commonly experience is the relationship between the profit generated and the account's value. The question is usually this: “If my account balance was X when I started and the bots generated Y in profit, how come the current balance is not X+Y?”.

To understand how this is possible, let's go over an example.

Jimmy starts with 1000 USDT on his account. He sets up an ETH/USDT grid bot with a 1000 USDT budget. The bot runs for a week and generates 100 USDT in profit. He expects his account value to be around $1100, but to his surprise, it is $990. How is it possible?

The answer is **value change**.

We have to clarify the concept of realized and unrealized profit. When the bot starts, it buys crypto, which will be sold later for a profit. In the case of Jimmy's grid bot, it will gradually sell ETH as the price increases. Every time the bot sells, it **realizes a profit**. The total profit realized, 100 USDT, is what the bot reports in the profit section. This is the value of the crypto profit generated (excluding exchange fees), and it's already added to your account balance. However, the bot still holds ETH, and that ETH might have gone down in value since purchase, which we call the **unrealized profit**.

Therefore, we need another metric to consider the realized and unrealized profit so we can better understand what's going on. This is what value change tells us. Value change takes into account the initial value of the bot at the start (around $1000), the current value, including the ETH it is still holding, and the profit generated.&nbsp;
![value_change.png](https://content.gainium.io/images/content/help/value_change_e3a9795f57-233127.png)
