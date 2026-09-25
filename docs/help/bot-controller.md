---
id: 105
name: Bot Controller
slug: bot-controller
description: >-
  Gainium's bot controller feature: Automate your trading with custom start/stop
  conditions using webhooks, indicators, deal limits, win/loss streaks, and
  profit or loss caps.
createdAt: '2024-03-22T07:46:30.903Z'
updatedAt: '2026-02-24T07:44:20.566Z'
publishedAt: '2024-03-22T09:57:41.316Z'
locale: en
categories:
  - combo-bots
  - trading-bots
difficulty: beginner
tags:
  - bot
ingested: true
ingestedAt: '2025-06-29T10:57:29.999Z'
tldr: >-
  The Bot Controller feature lets you automate when trading and combo bots start
  and stop based on webhooks, technical indicators, a number of deals, a run of
  winning or losing deals, or accumulated profit or loss. It removes the need
  for manual intervention in managing bot activity.
---

Have you ever wished you could automate the start and stop of your trading bots based on specific conditions or signals? Well, wish no more. Gainium’s bot controller feature is here to make your life a bit easier. This nifty tool is available for trading and combo bots, letting you fine-tune when these bots kick into action or take a breather.

Let's break down the settings you can tweak.

## Setting Up Your Bot Controller

Configuring your bot controller is a walk in the park. Here's a quick guide:
- **Access the Bot Controller:** Jump into your bot's settings. Look for the "Bot Controller" section at the end of the settings.
- **Choose Your Control Method:** You can choose from manual/webhook or technical indicators. Both options support deal-based stops. Each option has a simple setup process that guides you through the necessary steps.
- **Fine-Tune Your Settings:** You can set up webhooks, select technical indicators, or specify the deal, streak and profit limits that stop the bot.
- **Activate and Relax:** Once set, activate your settings. Your bot now has its marching orders, and you can sit back or focus on other strategies.

### Manual/Webhook

This allows your bot to spring into action or stop based on incoming webhooks.

### Technical Indicators

Enables your bot to start or stop based on specific conditions set by technical indicators.

### Stop After X Deals Opened or Closed

It sets your bot to stop after it has opened or closed a set number of deals.

### Stop After X Winning or Losing Deals

Counts every deal the bot has closed in profit, or every deal it has closed at a loss, and stops the bot when the count reaches your number. The count runs for the life of the bot and never resets, so "stop after 3 losing deals" stops the bot on its third loss whether those losses came one after another or were spread across a hundred deals.

### Stop After X Consecutive Winning or Losing Deals

Counts a **run** instead of a total. The bot stops only when its most recently closed deals are that many wins in a row, or that many losses in a row, with nothing of the other kind in between. A single result of the other kind clears the run and counting starts again from zero.

This is the one to use for the usual risk rules — "stop after 3 losses in a row" to step out of a market that has turned, or "stop after 5 wins in a row" to bank a streak rather than ride it. Two details worth knowing:

- Deals are counted in the order they actually **closed**. A bot trading several pairs finishes deals interleaved, and the run follows that real order, not the order the deals were opened.
- A deal that closes at exactly breakeven counts as a loss, the same way the plain "Stop after X losing deals" count treats it.

You can turn on the streak limits and the total limits together; whichever is reached first stops the bot.

### Stop After X Accumulated Bot Profit or Loss

Stops the bot when its total profit crosses a threshold you set. Pick **Greater than** with a positive value for a profit target — Greater than 500 stops the bot once it is up $500. Pick **Less than** with a **negative** value for a loss cap — Less than -100 stops the bot once it is down $100.

The value is the bot's running total, so a loss cap needs the minus sign; Less than 100 would be true from the moment the bot starts at zero and would stop it immediately.

## Why It Matters

With Gainium's bot controller, you're not just setting up automated trading strategies. You're crafting a personalized trading assistant that operates under your rules. Whether it's responding to market signals, limiting trading activity, or locking in profits, these controls put you in the driver's seat.

So, why not give your trading strategy an upgrade? With a bit of setup, your trading and combo bots can become even more aligned with your trading goals, all while you enjoy some extra free time. Sounds like a win-win to us.
