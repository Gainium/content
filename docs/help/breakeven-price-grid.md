---
id: 13
name: Breakeven Price (Grid & Combo bots)
slug: breakeven-price-grid
description: Learn how the breakeven price is calculated and how it can evolve over time.
createdAt: '2022-08-09T05:24:09.807Z'
updatedAt: '2026-02-24T07:44:20.566Z'
publishedAt: '2022-08-09T05:24:11.900Z'
locale: en
categories:
  - grid-bots
  - combo-bots
difficulty: intermediate
tags:
  - bot
  - grid
ingested: true
ingestedAt: '2025-06-29T10:57:29.999Z'
tldr: >-
  The breakeven price for grid and combo bots is the price at which selling all
  remaining base currency would make your current funds equal your initial
  funds. It dynamically decreases as the bot generates profit but can increase
  if the base value drops significantly.
---

The breakeven price definition is straightforward: the price you would need to sell the base currency that the bot is holding to break even. In other words, it's the price at which your initial value equals the current value of the bot. Now, let's review a few nuances to understand better what's happening behind the scenes and what we could expect in different scenarios.

## How is the breakeven price calculated?

The general formula is

**break-even price** = (initial value in quote - current quote quantity - profit*** value in quote) /&nbsp;current quantity of base

*Exchange fees [are excluded](https://gainium.io/help/are-exchange-fees-excluded-from-profit-calculation) (accounted for) in profit calculation.

And to better understand what this means, let's review an example.

## Example

Let's say you set up a bot for BNB/BUSD. Let's use some easy numbers for the sake of calculation:

Initial funds:

Base = 1 BNBQuote = 100 BUSDInitial BNB price = 300 BUSD

In this case our initial value = 1 * 300 + 100 = 400 BUSD

Then the bot went to work, and after some time, we have the following funds:&nbsp;

Base = 0.5 BNBQuote = 175 BUSDProfit = 100 BUSD

By definition, the breakeven price is the price at which the initial fund's value equals our current fund's value, so we get the formula:

400 BUSD (initial value) = 0.5 BNB * X BUSD/BNB (breakeven price) +175 BUSD (current quote balance) + 100 BUSD (bot profit)

**Breakeven price** = (400 BUSD - 175 BUSD - 100 BUSD) /&nbsp;0.5 BNB = 250 BUSD/BNB

In other words, if you sell the remainder 0.5 BNB at 250 BUSD/BNB, your current funds would equal your initial funds, breaking even. Selling at any price over 250 BUSD/BNB will make you a profit.

## How does the breakeven price change over time?

It's essential to notice that the breakeven price is dynamic. As the bot generates profit, the breakeven price decreases over time. However, that doesn't mean it can only get lower. If the base value falls, the breakeven price can increase, especially at the beginning when there isn't much profit generated.

To follow the previous example, let's say that when we calculated the breakeven price of 250 BUSD/BNB, the current price is 290 BUSD/BNB. If we stopped the bot at that moment and the price dropped to 250 BUSD/BNB, then we could sell and break even. However, if the bot were working during the drop, it would keep adding BNB to the balance as the price dropped, increasing the breakeven price.

The breakeven price can be negative if the current quote balance and profit values are higher than the initial value, so you would make a profit no matter at which price you sell the base. In that case, the breakeven price will show 0 in the price chart.

&nbsp;
