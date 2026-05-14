---
id: 4
name: Profit in Base and Quote
slug: profit-in-base-and-quote
description: >-
  In this article we explain how bots can actually profit in quote or in base
  and when is it best to use each.
createdAt: '2022-08-08T12:16:21.581Z'
updatedAt: '2026-02-24T07:44:20.579Z'
publishedAt: '2022-08-08T12:16:23.273Z'
locale: en
categories:
  - trading-bots
  - grid-bots
difficulty: intermediate
tags:
  - profit
ingested: true
ingestedAt: '2025-06-29T10:57:30.021Z'
tldr: >-
  Profiting in quote means selling all base for more quote than originally
  spent, while profiting in base means keeping some base as profit. Use base
  profit when you expect the base asset to appreciate, and quote profit when you
  expect it to decline.
---

Profit currency is an essential aspect of your trading setup, but it is often misunderstood. In this article, we explain how a bot can profit in quote or base and in which cases you could use them for maximum profit.

First, let's quickly clarify that trading pairs are usually displayed as **BASE/QUOTE**(for example, BTC/USDT). So when you profit in quote, you accumulate the currency on the right side of the pair (USDT in this example), and when you profit in base, you earn the currency on the left side of the pair (BTC in this case).

Also, it's important to mention that exchange fees [are excluded](https://gainium.io/help/are-exchange-fees-excluded-from-profit-calculation) (accounted for) in profit calculation, so you don't have to worry about that.

## How does the bot profit in base or quote?

Profiting in quote is relatively straightforward; the bot uses the quote to buy the base, and when the base increases in value, it will sell all the base, therefore ending up with more quote than it used to make the original purchase.

However, profiting in base can be a bit confusing. In this case, the bot uses quote to buy the base, and when the base increases in value, it will sell enough base to recover the quote spent for the original purchase, keeping the rest of the base as the profit.

## When should you profit in quote or base?

As a general rule, if you expect the value of the base to appreciate over time, it is best to profit in base. On the other hand, if the base is already in the all-time-high territory and you expect it to decrease in value in the future, it is best to profit in quote.
