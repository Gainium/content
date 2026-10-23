---
id: 1050
name: 'Starting a spot hedge bot: funding actions'
slug: spot-hedge-bot-start-actions
description: >-
  How to start a Gainium Hedge DCA or Hedge Combo bot on a spot exchange: the
  start action you choose for each leg (use balance, buy or sell the
  difference, buy or sell for all, use opposite balance) and how to read the
  funding preview.
createdAt: '2026-10-23T00:00:00.000Z'
updatedAt: '2026-10-23T00:00:00.000Z'
publishedAt: '2026-10-23T00:00:00.000Z'
locale: en
categories:
  - hedge-bots
  - trading-bots
difficulty: advanced
tags:
  - hedge
  - dca
  - combo
  - spot
  - bot
tldr: >-
  When you start a hedge bot with a spot leg, the Start hedge bot dialog asks
  how each spot leg is funded. Use balance runs the leg on the coin it spends
  (quote for the long leg, base for the short leg). Buy/Sell the difference
  records the entry without a trade and trades only the shortfall the safety
  orders need; Buy/Sell for all trades for everything they need. Use opposite
  balance runs the leg on the other coin of the pair and spends nothing at
  start. The preview shows what the bot will buy or sell at market, how much of
  your balance it uses, and what it sets aside. The choice applies to the first
  deal after each start. Futures legs always start on their balance.
---

A [hedge bot](https://gainium.io/help/hedge-bots) on futures can open a short directly. On **spot** there is nothing to borrow: to sell, the short leg needs coins the account holds, and to buy, the long leg needs the quote currency. So when a hedge bot has a spot leg, Gainium asks how each spot leg should be funded before it starts.

## The Start hedge bot dialog

Start the bot from its card, its table row or its page. If at least one leg is on spot, the **Start hedge bot** dialog opens. It has one block per spot leg, **Long** and **Short**, each with:

- a **start action** to choose from a list;
- a **funding preview** of what that action will do with your balance.

Futures legs aren't listed. They always start on their own balance. So a hedge with a spot long leg and a perpetual short leg, the cash-and-carry setup from our [delta neutral strategies guide](https://gainium.io/blog/delta-neutral-crypto-strategies), only asks about the long leg.

Click **Start** to start both legs. The button is unavailable while the price and the estimate are still loading, and when a leg's balance can't cover its deal.

## Start actions

The labels use the pair's own coins. For BTC/USDT, "Use USDT balance" on the long leg and "Use BTC balance" on the short leg.

| Action | Long leg (buys BTC) | Short leg (sells BTC) |
|---|---|---|
| **Use … balance** | Runs on your USDT. The base order is a real buy. | Runs on your BTC. The base order is a real sell. |
| **Sell the difference** (long) / **Buy the difference** (short) | Records the entry without a trade, backed by BTC you hold. Sells only the BTC needed to cover the USDT the safety orders are missing. | Records the entry without a trade. Buys only the BTC the safety orders are missing, with USDT. |
| **Sell for all** (long) / **Buy for all** (short) | Same as the difference, but sells for **everything** the safety orders need, whatever you already hold. | Same as the difference, but buys **everything** the safety orders need. |
| **Use … balance** (opposite coin) | Runs on your BTC instead. | Runs on your USDT instead. |

### Use balance

The leg runs on the coin it spends: USDT for the long leg, BTC for the short leg. The base order is placed as a normal order at deal start. If the balance doesn't cover the deal, the deal can't open.

### Buy/Sell the difference and Buy/Sell for all

These options appear only when the leg uses DCA orders.

- The **base order is recorded at the current price without a trade**. That amount is kept aside for the take profit and can't be used by other bots.
- The bot then makes sure the **safety orders** are covered:
  - The **short leg** needs BTC to sell on the way up. It buys that BTC with USDT.
  - The **long leg** needs USDT to buy on the way down. It gets that USDT by selling BTC.
- **The difference** uses what you already hold first and trades only the shortfall. If your free balance already covers the safety orders, nothing is traded.
- **For all** trades for the full amount the safety orders need.

The trade is a market order, placed when the deal opens and before the safety orders.

### Use opposite balance

The leg runs on the other coin of the pair. The entry is recorded without a trade and nothing is spent at start. The safety orders are tracked by the bot rather than resting on the exchange as limit orders.

### Which action is selected by default

Gainium picks the default from your free balance:

1. **Use balance**, if it covers the whole deal;
2. otherwise **the difference**, if the leg uses DCA orders;
3. otherwise **Use opposite balance**, if that coin covers the deal;
4. otherwise **Use balance**, and the preview tells you what's missing.

## Reading the funding preview

Under each action the dialog shows what will happen:

- **Bot buys at market / Bot sells at market**: the estimated trade, in base and quote. This is an estimate. The bot plans again when the deal opens, so the final amount can differ slightly. When the amount is below the exchange's minimum order size, it is raised to the minimum.
- **Held used**: how much of the balance you already hold the leg will use.
- **Reserved for entry**: what is set aside for the recorded entry. On the long leg that is base (BTC), on the short leg quote (USDT). It is not available to your other bots.
- **Not enough …**: the balance can't cover this action. Pick another action or add funds.

Both legs trade on the same account, so the estimate covers both of them together. One leg's trade changes what the other leg can use.

## Good to know

- **The action applies to the first deal after each start.** Once that deal's base order is in, the leg's later deals run on its balance as usual. Stopping and starting the bot asks again.
- **Funds set aside for one deal are not counted as free** by your other bots' balance checks, so two bots can't plan with the same coins.
- **Both legs are planned together**, under one lock per account, so the two legs' funding trades don't race each other.
- To trade a hedge on futures instead, where each leg opens its position directly, see [Futures: enable hedge mode on the exchange](https://gainium.io/help/hedge-bots#futures-enable-hedge-mode-on-the-exchange).
- Once the bot runs, a [combined take profit and stop loss](https://gainium.io/help/hedge-bot-combined-take-profit-stop-loss) can close both legs' deals together.

## FAQ

**Why does the short leg buy coins when it starts?**
A spot short sells coins it holds. With *Buy the difference* or *Buy for all*, the leg buys in advance the coins its safety orders will sell as the price rises.

**Why does the long leg sell coins when it starts?**
With *Sell the difference* or *Sell for all*, the long leg's entry is backed by coins you already hold. It sells part of them to get the quote currency its safety orders will spend as the price falls.

**Why is the Start button disabled?**
Either the price and the estimate are still loading, or a leg's balance can't cover its deal with the selected action. Its block then says what is missing.

**Do I see this dialog on futures?**
No. Futures legs start on their balance and aren't listed. If both legs are on futures, the bot starts straight away.
