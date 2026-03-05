---
id: 61
name: Trailing Stop Loss
slug: trailing-stop-loss
description: Learn more about trailing stop loss and how to use it in Gainium
createdAt: '2023-03-30T05:14:17.494Z'
updatedAt: '2026-02-24T07:44:20.584Z'
publishedAt: '2023-03-30T06:30:26.901Z'
locale: en
categories:
  - trading-bots
  - trading-terminal
difficulty: intermediate
tags: []
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.029Z'
tldr: >-
  Trailing stop loss automatically moves the stop loss level in the direction of
  your profit, always maintaining a fixed percentage from the best price
  reached. It lets traders ride trends while protecting gains, but is
  incompatible with multiple stop loss targets and move stop loss.
---

## What is a Trailing Stop Loss

Trailing stop loss is a popular trading technique that enables you to follow the trend. The principle behind it is simple: the trailing stop loss moves in the direction of your take profit, and it's always spaced the same percentage from the best price.

The standard stop loss order is used to limit potential losses by automatically selling a cryptocurrency if it drops below a specific price. This can be useful for limiting potential losses but can also result in missing out on potential profits if the cryptocurrency rebounds shortly after the sell order is executed. Trailing stop loss orders allows traders to benefit from upward price movements while limiting potential losses in the event of a sudden downturn.

Let's look at an example. You open a long position, set the stop loss to -10%, and then enable trailing. At the start of trade, the stop loss will be positioned precisely -10% from the price; however, as the price moves up, the stop loss will move upwards, always spaced 10% from the highest price.

## Pros and cons of using Trailing Stop Loss

The benefits of using a trailing stop loss in crypto trading are numerous. It allows traders to take advantage of upward price movements while still limiting potential losses. It also reduces the need for constant monitoring of price movements, as the trailing stop loss order will automatically adjust as the cryptocurrency moves in a favorable direction. Additionally, it can help to remove emotions from trading decisions, as the trader has already predetermined the level of risk they are willing to take.

However, it is essential to note that trailing stop loss orders are not foolproof and can result in losses if the market moves quickly and unexpectedly. In highly volatile markets, the price of a cryptocurrency can fluctuate rapidly, triggering a stop loss order before rebounding in the trader's favor. Additionally, if the market experiences a sudden downturn or crash, a trailing stop loss order may not be executed at the desired price, resulting in larger-than-expected losses.

## Enabling trailing stop loss in Gainium

You can find this option under the Stop Loss section of your trading bot or terminal deal.
![trailing-sl.png](https://gainium.io/images/content/help/trailing_sl_ed28b6b7eb-0a2d3b.png)
There are a few things you should keep in mind when using trailing stop loss:
- Trailing stop loss is incompatible with [multiple stop loss targets](https://gainium.io/help/multiple-stop-loss-targets) and [move stop loss](https://gainium.io/help/move-stop-loss).- If DCA Mode is enabled, the stop loss target is calculated from the average position size.- If the stop loss move over DCA orders, they will be cancelled
