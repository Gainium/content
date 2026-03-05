---
id: 114
name: Bot Credit System
slug: bot-credit-system
description: >-
  Learn about Gainium's new credit-based pricing system that offers fairer and
  more transparent pricing based on actual resource usage.
createdAt: '2025-11-04T00:00:00.000Z'
updatedAt: '2026-02-24T07:44:20.566Z'
publishedAt: '2025-11-04T00:00:00.000Z'
locale: en
categories:
  - walkthrough-guides
difficulty: beginner
tags: []
ingested: false
ingestedAt: ''
tldr: >-
  Gainium''s credit-based pricing system charges based on actual resource usage
  instead of a flat per-bot fee. Each bot type has a base credit cost (DCA: 50,
  Combo: 200, Grid: 250) with additional credits for extra pairs, deals, and
  indicators; credits are locked when a bot runs and released when it stops.
---

We've just launched a new pricing system built to be fairer and more transparent.

Most trading platforms price plans by the number of bots. It's simple, but not fair—some users run light bots with 1 coin, while others run complex bots with 100 coins and multiple indicators, yet both pay the same. This imbalance means everyone ends up covering the cost.

## What's Changing

We're introducing a **credit-based system**.

Each bot type has a base credit cost, and certain features (like more coins, deals, or indicators) add to that cost. When a bot runs, the credits are locked, and once it's stopped, they return to your balance—so you always know what's being used.

### Consumable Credits

Two activities will now use consumable credits that refresh monthly:

- **Server-side backtests**
- **Max Gain AI queries**

**Note:** Client-side backtesting continues to be free and unlimited.

### Paper Trading Bots

Paper bots will now be billed like live bots. They consume more resources than live bots because of simulated trading logic, and this change helps keep the system efficient for everyone.

### Flexible Tiers

We've added more flexible tiers, from the low-cost Mini plan to the VIP levels (previously Enterprise).

## Credit Costs by Bot Type

Each bot type has a base cost in credits per month, with additional costs for extra features.

### DCA Bot
- **Base cost:** 50 credits
- **Includes:** 1 pair, 10 max deals
- **Additional costs:**
  - +0.5 credits per additional pair
  - +1 credit per additional deal
  - +1 credit per indicator per pair

### Combo Bot
- **Base cost:** 200 credits
- **Includes:** 10 max deals
- **Additional costs:**
  - +1 credit per additional deal
  - +1 credit per indicator per pair

### Grid Bot
- **Base cost:** 250 credits (fixed)
- No additional costs

### Smart Trade
- **Base cost:** 10 credits
- **Additional costs:**
  - +1 credit per indicator

## How Credits Work

### Credit Locking

When you start a bot, the required credits are locked from your available balance. This ensures you always know exactly how many credits are being used at any given time.

### Credit Release

Once you stop a bot, the locked credits are released back to your available balance, ready to be used for other bots or features.

**Important:** Credits are only released when the bot has no more active deals. Active deals continue to use resources even when a bot is stopped, so the credits remain locked until all deals are closed.

### Monthly Refresh

Consumable credits (used for backtests and Max Gain AI queries) refresh at the beginning of each billing cycle, giving you a fresh allocation to work with.

## Benefits of the New System

### Fair Pricing

You only pay for what you actually use. Light bots cost less, while resource-intensive bots cost more—ensuring everyone pays their fair share.

### Transparency

With credit locking and release, you can always see exactly how your credits are being allocated across your active bots.

### Flexibility

Start and stop bots as needed without worrying about wasted subscription capacity. Credits are returned to your balance when a bot stops.

### Scalability

The new tier structure makes it easier to find a plan that matches your trading needs, whether you're just starting out or running an advanced trading operation.

## Conclusion

The Bot Credit System represents our commitment to building a fairer, more transparent pricing model that better reflects actual resource usage. By paying for what you use, you get better value while ensuring the platform remains sustainable for all users.

If you have any questions about the new credit system or need help understanding your credit usage, please don't hesitate to [contact our support team](https://gainium.io/contact).
