---
id: 107
name: Price Filters
slug: price-filters
description: >-
  Optimize your crypto trading with Gainium's deal start price filters. Learn to
  use static and dynamic filters to strategically enter the market.
createdAt: '2024-04-01T05:44:16.470Z'
updatedAt: '2026-02-24T07:44:20.578Z'
publishedAt: '2024-04-01T05:44:30.996Z'
locale: en
categories:
  - combo-bots
  - trading-bots
difficulty: intermediate
tags: []
faq:
  - title: What are static price filters?
    details: >-
      Static price filters allow you to set a minimum and/or maximum price for
      entering a trade. If the market price is outside this range, the bot will
      not initiate a deal and will switch to 'range' mode, awaiting optimal
      conditions.
  - title: How do dynamic price filters work?
    details: >-
      Dynamic price filters adjust the acceptable entry price range based on the
      performance of the last deal. You can set a minimum deviation percentage
      from the last deal's price, choosing between the entry price or the
      average price as a reference. This makes the bot's entry conditions
      responsive to market movements and previous deal outcomes.
  - title: >-
      What's the difference between entry price and average price in dynamic
      filters?
    details: >-
      The entry price is the static price at which the last deal was initiated,
      while the average price may change if you're using Dollar Cost Averaging
      (DCA), as it reflects the adjusted average entry price of the last deal,
      making your dynamic filter adaptable to how the previous deal was managed.
  - title: Can I use both static and dynamic price filters together?
    details: >-
      Yes, you can employ both static and dynamic price filters in your trading
      strategy. Static filters set hard boundaries for deal initiation, while
      dynamic filters allow flexibility based on recent trading performance,
      giving you a balanced approach to market entry.
  - title: What happens to the price filters after a deal closes?
    details: >-
      Once a deal closes, whether at a take profit (TP) or stop loss (SL), the
      dynamic price filters reset based on the new market conditions and any new
      deals initiated. This allows your bot to adapt its strategy for each new
      trade, optimizing for the current market environment.
ingested: true
ingestedAt: '2025-06-29T10:57:30.019Z'
tldr: >-
  Deal start price filters control when bots can open new deals. Static filters
  set hard min/max price boundaries, while dynamic filters require a minimum
  percentage deviation from the last deal''s entry price, preventing re-entry
  too close to a previous position.
---

Let's dive into how you can smartly employ deal start price filters to optimize your trading strategies with bots on Gainium. Think of these filters like a savvy gatekeeper, ensuring you only enter the market at moments that align with your game plan. Here's how to wield this tool effectively:

## Static Filters

Static filters are available in single-pair bots. Setting a minimum and/or maximum price ensures your bot only activates within your defined price zone. If the price strays outside these boundaries, your bot switches to "range" mode until the price enters the trading range again.&nbsp;

## Dynamic Filters

Now, let's get dynamic. With dynamic price filters, your bot's allowed price range is based on the most recent concurrently open deal for that pair. Note that this filter is only active when the bot is running multiple deals, and it will reset once all deals on that pair are closed. Here’s the lowdown:
- **Minimum Deviation from Last Deal:** This is the percentage gap you set from the price of the last deal. It's your buffer zone, ensuring you don't jump back in too soon.- **Price Source Options:** You can choose between the entry price and the average price of the last deal. The entry price is static. It's the price point at which your last concurrently open deal started. The average price, however, changes if the previous deal executes a DCA (Dollar Cost Averaging) order. This average price adjusts based on how the market moves and how you've averaged down your entry point on the last deal.

### A Dynamic Price Filter Example

Let's imagine a multipair bot tracking BTC and ETH. Here are the settings:
- Entry: RSI 1H crosses down 20- Exit: 5% TP or 15% SL- Max 10 concurrent deals, and max 5 deals per pair- No DCA- Dynamic price filter of 10% deviation from entry price

Your bot springs into action and receives a signal for BTC, snagging a deal at $50,000. Then, ETH also receives a signal, and without any active ETH deals to restrict it, your bot can enter at any price point—let's say $3,000. Fast-forward and another BTC signal pops up; the price is currently $48,259. Since the deviation must be at least 10% from the previous BTC deal entry price, $50,000, the bot won't be able to open another deal on BTC unless the price is under $45,000.

Time goes by and another signal for BTC comes in, this time at $42,345—more than 10% below your last entry. Your bot, seeing the green light, dives in for another deal. Now you have 2 open deals on BTC, and since the last deal entry price was $42,345, the next deal on BTC can only start under $38,110.5.

What's cool here is the flexibility. Your dynamic filters reset if the market pumps and your deals close at a profit. Your bot is ready to start fresh, looking for the next signal that matches your entry criteria.

## Why This Matters

Using static or dynamic filters, you're setting up a system that knows when to enter the fray and when to wait for the next round. This approach protects your investment and strategically positions you to capitalize on market movements that align with your analysis.
