---
id: 30
name: Bankroll
slug: bankroll
description: Learn how to interpret the bankroll graph.
createdAt: '2022-08-23T09:17:48.681Z'
updatedAt: '2026-02-24T07:44:20.565Z'
publishedAt: '2022-09-27T13:07:13.370Z'
locale: en
categories:
  - platform
difficulty: beginner
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:29.995Z'
tldr: >-
  Your bankroll is the total funds allocated for trading, and Gainium''s
  dashboard breaks it down into Used (base held by bots), Limit (quote in
  pending orders), Planned (max quote bots could use), and Free/Over. If the
  "Over" section appears, your account is overextended—meaning bots could
  potentially use more funds than available.
---

Your bankroll is the total sum of money you have allocated for trading. One crucial factor for a trader is to follow basic bankroll and [risk management](https://gainium.io/academy/managing-risk) guidelines. Risk management aims to keep the likelihood of going bankrupt (losing all of your trading money) as low as possible.

The bankroll graph in your dashboard represents the allocation of your bankroll currencies. A bankroll currency is any quote currency your bots are trading. For example, if you have two bots, one grid bot on BTC/**USDT,** one DCA bot on BNB/**BUSD**, and one signal bot on ETH/**BTC;** then USDT, BUSD, and BTC are your bankroll currencies.

![bankroll.webp](https://content.gainium.io/images/content/help/bankroll_268053b8a8-6ccae6.webp)

Having a bird's eye view of your bankroll is important to [avoid overextending](https://gainium.io/academy/manage-overextended-account) your account. The bankroll graph will help you to do just that, let's go over each section:
- Used (=purchased): The dollar value of the base that all bots for this currency hold, including the value for the base of the whole bot (not just active smart orders).
- Limit: Value of quote currently in limit orders to purchase base.
- Planned: Value of quote maximum that the bots could use to purchase base. For a DCA bot, this is maximum remainder DCA orders; for a grid bot, this is all the planned buy orders.
- Free & Over. If the planned amount is less than the available balance, then you would have 'Free' quote that is not part of any bot. If the planned amount is higher than the available balance, then all the available balance could potentially be used plus more; this is the 'Over'.

If you can see 'Over' section in the graph, it means that your account is overextended for that bankroll currency. Being overextended doesn't mean that there is an inminent risk, but you should always keep an eye on this value because if the market changes drastically, your bots could end up using all the available currency and run out of funds.
