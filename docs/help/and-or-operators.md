---
id: 110
name: Understanding AND/OR operators in indicators
slug: and-or-operators
description: >-
  Learn how to combine multiple indicators in Gainium trading bots with AND/OR,
  inside a group and between groups.
createdAt: '2024-08-14T07:51:12.849Z'
updatedAt: '2026-10-12T00:00:00.000Z'
publishedAt: '2024-08-14T07:51:14.109Z'
locale: en
categories:
  - trading-bots
difficulty: beginner
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:29.986Z'
tldr: >-
  In Gainium bots, indicators sit in groups. Inside a group, all indicators are
  joined with the group's AND or OR. Groups are joined to each other with their
  own AND or OR, so you can build conditions like (RSI and MACD) or SuperTrend.
  AND binds tighter than OR, and the line above the groups shows the whole
  condition.
---

Combining several indicators lets you filter out weak signals or catch more opportunities. In Gainium you combine them with **AND** and **OR**, inside a group and between groups.

## Understanding AND/OR in Gainium

- **AND**: all the indicators must meet their conditions.
- **OR**: at least one of the indicators must meet its condition.

When you set the deal start condition (or the take profit or stop loss type) to **Indicators**, your indicators are shown in a list. Click **+ Indicator** to add another one. Between two indicators you will see an **AND** pill: click it to switch the group to **OR**. A group uses one operator for all its indicators, so switching one pill switches them all.

Once you have two or more indicators, the line above them spells out the whole condition, for example **RSI and MACD**.

![Two indicators in one group, joined with AND, and the condition line RSI and MACD](https://content.gainium.io/images/content/help/image_6adcc3e7eb-c5acdc.webp)

## Combining groups

Click **+ Group** to add another group. Each group is joined to the one before it with its own **AND** or **OR** pill, shown between the groups. A new group starts with **OR**, because a group joined with AND would add nothing over putting the indicator in the first group. Click the pill to switch it.

This lets you mix operators. For example, group 1 holds **RSI AND MACD**, and group 2 holds **SuperTrend**, joined with **OR**. The bot starts a deal when RSI and MACD are both true, or when SuperTrend is true on its own. The condition line shows **(RSI and MACD) or SuperTrend**.

![Two groups: RSI and MACD in group 1, SuperTrend in group 2, joined with OR, and the condition line (RSI and MACD) or SuperTrend](https://content.gainium.io/images/content/help/and-or-operators__add1.webp)

## How the condition is read

**AND binds tighter than OR**, as in most logic. Groups joined with AND are evaluated together first, and OR separates the alternatives. With three groups A, B and C:

- A **AND** B **OR** C reads as (A and B) or C.
- A **OR** B **AND** C reads as A or (B and C).

When in doubt, read the condition line: it adds the brackets for you.

## Practical Tips
- **Start simple.** Decide whether you want every condition to be met (AND) or any of several setups to trigger (OR), then add groups only when you need alternatives.
- **Consider the trade-offs.** More AND conditions usually mean fewer but more selective trades. More OR alternatives mean more trades with a wider range of setups.
- **Mind the limit.** A bot can use up to 20 indicators across all its conditions; the counter shows how many remain.
- **Test and adjust.** Backtest your combinations and compare how they perform before going live.

## Conclusion

Groups and AND/OR pills let you describe almost any combination of indicators, from a simple "all of these" to several alternative setups. Use the condition line to check that the bot will read your rules the way you mean them.
