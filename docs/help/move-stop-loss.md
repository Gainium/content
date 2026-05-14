---
id: 59
name: Move Stop Loss
slug: move-stop-loss
description: Learn how to move stop loss option works and use it to your advantage.
createdAt: '2023-03-30T04:54:08.969Z'
updatedAt: '2026-02-24T07:44:20.576Z'
publishedAt: '2023-03-30T04:54:15.529Z'
locale: en
categories:
  - trading-bots
  - trading-terminal
difficulty: beginner
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.017Z'
tldr: >-
  The Move Stop Loss feature automatically moves your stop loss to a profit or
  breakeven level once the trade reaches a specified unrealized profit
  threshold. It locks in gains while keeping the trade open for further upside,
  and is incompatible with multiple stop loss targets and trailing stop loss.
---

A common technique traders use to secure their profits and avoid risk is moving the stop loss to profit or breakeven once the trade has reached a certain unrealized profit. This way, the trade is still open to hit the take profit target, but a certain profit will be guaranteed (or at least avoid a loss) in case of a reversal.

## Using move stop loss option in Gainium

In Gainium, you can use the move stop loss option in trading bots and terminal deals under the Stop Loss section.
![move-sl.png](https://content.gainium.io/images/content/help/move_sl_b578c49465-8b62e6.webp)
In the screenshot above, we have set our stop loss to move to 3% profit when the position's unrealized profit reaches 5% profit.

There are some things to keep in mind when using this option:
- Move stop loss is incompatible with [multiple stop loss targets](https://gainium.io/help/multiple-stop-loss-targets) and [trailing stop loss](https://gainium.io/help/trailing-stop-loss).
- Try not to use an unrealized profit trigger and stop loss value that are too close to each other, or you will very likely hit the new stop loss almost immediately (always aim for more than 1% space between the two)
- If the stop loss move over DCA orders, they will be cancelled
