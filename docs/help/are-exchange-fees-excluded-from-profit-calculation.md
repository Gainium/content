---
id: 31
name: Are exchange fees excluded from profit calculation?
slug: are-exchange-fees-excluded-from-profit-calculation
description: >-
  Users often wonder if exchange fees are excluded from profit calculation. The
  short answer is yes, read this article to learn more.
createdAt: '2022-08-25T06:13:23.844Z'
updatedAt: '2026-02-24T07:44:20.562Z'
publishedAt: '2022-08-25T06:13:25.751Z'
locale: en
categories:
  - exchanges-apis
  - platform
  - trading-bots
  - grid-bots
difficulty: intermediate
tags:
  - exchange
  - profit
  - fees
ingested: true
ingestedAt: '2025-06-29T10:57:29.986Z'
tldr: >-
  Yes, exchange fees are excluded from (accounted for in) all profit
  calculations for bots and deals. Gainium requests the actual fee from the
  exchange for each pair when a bot starts, including any fee discounts.
---

Exchanges fees are excluded from profit calculation for all bots and deals.

In addition, fee discounts and exceptions are accounted for. When starting a bot, we request the fee directly from the exchange for that particular pair and we discount this fee from all profit calculations.
