---
id: 65
name: Mastering the HODL bot
slug: hodl-bot
description: >-
  HODL bots are an increasingly popular method for cryptocurrency investors to
  automate their investments using the Dollar Cost Averaging (DCA) strategy. In
  this article, we will delve into the concept of HODL bots, how they work, and
  illustrate their application with an example.
createdAt: '2023-04-01T14:10:37.351Z'
updatedAt: '2026-02-24T07:44:20.573Z'
publishedAt: '2023-04-01T14:10:42.041Z'
locale: en
categories:
  - trading-bots
difficulty: intermediate
tags:
  - bot
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.012Z'
tldr: >-
  A HODL bot automates Dollar Cost Averaging by buying a fixed amount of crypto
  at regular time intervals, regardless of price, to smooth out volatility over
  time. Set it up in Gainium using "Time-based" deal start and configure the
  period and max open deals.
---

HODL bots are an increasingly popular method for cryptocurrency investors to automate their investments using the Dollar Cost Averaging (DCA) strategy. In this article, we will delve into the concept of HODL bots, how they work, and illustrate their application with an example.

## What is a HODL Bot?

A HODL bot is an automated investment tool that follows the traditional Dollar Cost Averaging strategy (DCA), allowing users to consistently invest in a particular asset over time, regardless of market fluctuations. This approach aims to mitigate the impact of volatility on the investor's portfolio by purchasing the asset at various price points, effectively averaging out the cost basis over time.

## How Does a HODL Bot Work?

HODL bots enable users to choose the specific asset they want to invest in and the frequency of their investments. Investors set the amount they wish to invest, and the bot will automatically execute the investment plan according to the specified schedule. This ensures that the investor buys the asset during highs and lows, resulting in a more balanced and less volatile portfolio performance.

Consider an investor who wants to invest in BTC. They decided to use a HODL bot, such as the one provided by Gainium, to automate their investment strategy. The investor has $1,000 to invest and wants to spread their investment over a 100-day period.

The investor configures the HODL bot to buy $10 worth of BTC using USDT every day. Over the course of the next 100 days, the bot will automatically execute the purchases, regardless of Bitcoin's price. This strategy ensures that the investor buys Bitcoin during its highs and lows, effectively averaging the cost basis over time.

Using a HODL bot to buy BTC allows the investor to avoid the emotional pitfalls and timing challenges often associated with manual investing. This approach allows the investor to focus on their long-term investment goals while mitigating the impact of short-term market volatility.

## Setting up a HODL bot in Gainium

In Gainium, you can easily create a HODL bot by visiting the[ new bot page](https://app.gainium.io/bot/new) and selecting “Time-based” as the deal start condition. You will be presented with the following settings:
![HODL-bot-settings.png](https://content.gainium.io/images/content/help/HODL_bot_settings_c04a7c1ad0-4fb7cd.png)
You can specify the period duration in days, the time of the day (in your timezone), and when should the next deal start. It's essential to notice that the total budget is dictated by the number of open deals the bot is allowed to have. For example, if you would like to invest $100 every week for a total of $1000, you would set the Max open deals to 10. Once the bot has reached the max open deals number, it will not open any more deals.

We have built the HODL bot with flexibility in mind, so you can use all options available for trading bots. That means you can enable DCA on each open deal or even activate Take Profit targets. This will allow you to deploy advanced such as the [double-DCA](https://gainium.io/academy/double-dca-strategy).

Note that each time the bot will open a separate deal. This has the advantage of being able to configure deals separately. However, if you would rather see the total accumulated token as a single deal, you can [merge the deals](https://gainium.io/help/merge-deals) into one.

## Backtesting a HODL bot in Gainium

You can backtest a HODL bot the same way you can backtest any trading bot in Gainium. See [this article](https://gainium.io/help/backtesting-trading-bots) for a detailed guide on how to backtest a trading bot.


