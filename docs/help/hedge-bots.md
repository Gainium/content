---
id: 1048
name: 'Hedge Bots: run a long and a short bot as one'
slug: hedge-bots
description: >-
  What a crypto hedge bot is and how Gainium's Hedge DCA and Hedge Combo bots
  work: a long leg and a short leg that start and stop together, a combined
  take profit and stop loss, Quick Setup presets, hedge mode on futures, spot
  hedges, P&L, backtesting and the risks to know first.
createdAt: '2026-10-23T00:00:00.000Z'
updatedAt: '2026-10-23T00:00:00.000Z'
publishedAt: '2026-10-23T00:00:00.000Z'
locale: en
categories:
  - hedge-bots
  - trading-bots
  - walkthrough-guides
difficulty: intermediate
tags:
  - hedge
  - dca
  - combo
  - futures
  - bot
tldr: >-
  A Gainium hedge bot is one bot made of two legs: a long DCA (or Combo) bot and
  a short DCA (or Combo) bot. They start and stop together, and you can close
  both deals on a pair together when their combined PnL reaches a take profit
  or stop loss. Create one from Hedge DCA or Hedge Combo → New. Quick Setup asks
  for each leg's exchange, pairs and investment, then a Conservative, Balanced
  or Aggressive preset. Manual mode gives you the full settings of each leg.
  On futures, when both legs trade the same pair on the same account, the
  account must be in hedge (dual-side) position mode. Spot hedges are
  supported too. A hedge bot profits from price swings in both directions, but
  a strong trend leaves one leg deep in loss, so use a combined stop loss and
  backtest with real fees first.
---

Most trading bots bet on a direction. A long [DCA bot](https://gainium.io/help/dca-bot-set-up-walkthrough) profits when the price recovers, and a short one profits when it falls. A **hedge bot** runs both at once on the same market, so one side's loss is offset by the other side's gain. You stop betting on direction and start profiting from the price moving back and forth.

On Gainium a hedge bot comes in two types:

- **Hedge DCA**: a long DCA bot plus a short DCA bot.
- **Hedge Combo**: a long [Combo bot](https://gainium.io/help/understanding-combo-bot) plus a short Combo bot. Each leg averages in with DCA levels and trades a minigrid inside each deal.

This guide explains how they work, how to set one up, and what to watch out for.

## What is a crypto hedge bot?

A crypto hedge bot holds a long and a short position on the same asset at the same time and manages both automatically. When the price drops, the short leg gains and the long leg averages down. When the price recovers, the long leg gains and the short leg averages up. Each swing gives one of the legs a chance to close a deal at a profit.

Because the legs offset each other, the bot's net exposure to the price is much smaller than either leg's. That is the idea behind [delta neutral strategies](https://gainium.io/blog/delta-neutral-crypto-strategies). It is not a risk-free trade, as the sections below show, but it changes what you are betting on: volatility and mean reversion, instead of direction.

## How Gainium hedge bots work

A hedge bot is a wrapper around two ordinary bots, called **legs**:

- The **long leg** is a full DCA or Combo bot with its strategy set to Long.
- The **short leg** is a full DCA or Combo bot with its strategy set to Short.

Each leg has all the settings of a normal bot: exchange, pairs, order sizes, DCA orders, leverage and margin type on futures, start conditions such as indicators or webhooks, take profit and stop loss. The hedge bot adds three things on top:

1. **One name and one switch.** Starting or stopping the hedge bot starts or stops both legs. The bot shows as stopped only when both legs are stopped and have no open deals.
2. **A combined Take Profit and Stop Loss.** Optionally, the long and short deals on a pair close together when their combined PnL reaches your target or your limit. See [Hedge bot combined Take Profit and Stop Loss](https://gainium.io/help/hedge-bot-combined-take-profit-stop-loss).
3. **Combined reporting.** The bot card and the bot page add both legs' cost, PnL and deals together.

Apart from that, each leg trades on its own. Each one opens deals when its own start condition is met, and nothing forces both legs to open at the same moment. When one leg's deal closes, the other leg's deal is not touched: it keeps running until its own take profit, its own stop loss or the combined close.

The legs normally trade the same pair on the same exchange account, which is what Quick Setup creates. Gainium does not require that, though. In Manual mode a leg can trade a different pair, or sit on another account. For example, a spot long leg against a perpetual short leg makes the classic cash-and-carry hedge described in our guide to [delta neutral crypto strategies](https://gainium.io/blog/delta-neutral-crypto-strategies).

## Create a hedge bot

Open **Hedge DCA** or **Hedge Combo** from the bots menu and click **New**. With [keyboard shortcuts](https://gainium.io/help/keyboard-shortcuts), press **H** or **W** to open the lists, and **Shift + H** or **Shift + W** to start a new one. The form opens in **Quick Setup**. Switch to **Manual** at any time for full control. Your Quick Setup choices carry over.

### Quick Setup

![Quick Setup for a Hedge DCA bot: bot name, then the long leg's exchange, trading pairs and investment](https://content.gainium.io/images/content/help/hedge-bots__quick-setup.webp)

1. **Bot Name.** Gainium suggests one, for example "BTCUSDT Hedge DCA Balanced 2026-10-23". Both legs are saved under this name.
2. **Long leg**: pick the **Exchange**, the **Trading Pairs** and the **Investment**. Use **Copy pairs from short leg** to mirror the other leg.
3. **Short leg**: the same three fields. On a futures account both legs usually trade the same pair. Use **Copy pairs from long leg**.
4. **Preset**: pick a starting point. It configures both legs identically.

![The Preset picker: Conservative, Balanced and Aggressive](https://content.gainium.io/images/content/help/hedge-bots__presets.webp)

Each preset sets these values on both legs:

| Preset | Take Profit (hedge) | Leg TP | DCA orders | Active orders | Step | Step scale | Volume scale | Max open deals |
|---|---|---|---|---|---|---|---|---|
| Conservative | 1.5% | 1.5% | 4 | 1 | 1% | 1.1 | 1.2 | 3 |
| Balanced | 3% | 3% | 8 | 2 | 2% | 1.2 | 1.5 | 5 |
| Aggressive | 6% | 6% | 15 | 3 | 3% | 1.3 | 1.8 | 5 |

All presets allow one deal per pair and leave the combined stop loss off. Picking a preset keeps the investment you entered and spreads it over the preset's order ladder.

The chart shows where the active leg's start order, DCA orders and take profit would sit.

### Manual mode

In Manual mode the form has three tabs:

- **Hedge**: the bot name and the combined **Take Profit (hedge)** and **Stop Loss (hedge)**. On Hedge Combo you also choose **Base take profit on**: *Used DCA* or *Max DCA*.
- **Long leg**: the full settings of the long bot.
- **Short leg**: the full settings of the short bot.

![Manual mode, Long leg tab: the leg's exchange, pairs, order size reference, margin type and leverage](https://content.gainium.io/images/content/help/hedge-bots__leg-tab.webp)

The leg tabs are the same forms you know from DCA and Combo bots, so every setting works as described in those guides: see the [DCA bot walkthrough](https://gainium.io/help/dca-bot-set-up-walkthrough), [trailing take profit](https://gainium.io/help/trailing-take-profit) and [trailing stop loss](https://gainium.io/help/trailing-stop-loss). A few options don't apply to hedge legs and are not offered:

- [single position per pair](https://gainium.io/help/single-position-per-pair);
- "use available balance" (reducing a deal to the free balance);
- adopting existing deals into the bot.

When the settings are ready, click **Create hedge bot**. Both legs are created and saved together. Start the bot from its card, its table row or its page.

## Futures: enable hedge mode on the exchange

A futures account normally holds **one** position per pair (one-way mode). A long and a short on the same pair would cancel each other out. To hold both at once, the account must be in **hedge mode**, also called *dual-side* or *two-way* position mode.

- If both legs trade the **same pair on the same account**, Gainium checks the position mode when the bot starts. If hedge mode is off, the bot does not start and shows **"Cannot start hedge bot when hedge mode not enabled."**
- Turn it on with the **Hedge Mode** switch under **Advanced Settings** when you add or edit the futures exchange in Gainium, or in your exchange's own futures settings (some exchanges call it *Two-way Mode*).
- The mode can't be changed while any bot on that account is running or has open deals. Stop them first.
- If the legs trade different pairs, or sit on different accounts, hedge mode isn't needed.
- **Hyperliquid** perpetuals are one-way per account. Put the second perpetual leg on a [Hyperliquid sub-account](https://gainium.io/help/connect-to-hyperliquid#connecting-a-sub-account-or-vault), or pair a spot long leg with a perpetual short leg. **Kraken Futures** is one-way too.

### Funding fees on a futures hedge

On perpetual futures both legs pay or receive **funding**. Longs and shorts pay each other, so a long and a short of the same size on the same pair roughly cancel out. Your legs are rarely the same size, though. The leg that has averaged in more has the bigger position, and its side of the funding dominates. Over a long-running deal funding can add up to a noticeable part of the PnL, so check the funding rates of the pairs you hedge before you start.

## Spot hedge bots

A hedge bot can also run on **spot**. A spot account can't borrow to short, so the short leg sells coins that the account holds or buys for it. When you start a hedge bot that has a spot leg, a dialog asks how each leg should be funded: from the balance you already hold, by buying or selling the difference, or from the opposite coin of the pair. It also previews the trade the bot will make. See [Starting a spot hedge bot: funding actions](https://gainium.io/help/spot-hedge-bot-start-actions).

## Follow your hedge bot

The bot list shows each hedge bot as one card. The top half is the combined result. Below it each leg has its own block with its status, usage, cost, deals, profit and unrealized PnL.

![The Hedge DCA Bots list: one card per hedge bot, with combined PnL and cost on top and the long and short legs below](https://content.gainium.io/images/content/help/hedge-bots__list.webp)

Click the card to open the bot page. The **Overview** tab starts with a **Combined** section: cost, max cost, unrealized and realized PnL, average daily and annualized return. Below it are each leg's details. **Deals**, **Stats**, **Events**, **Settings** and **Webhook** work as on other bots.

![The hedge bot page: the Combined section, then the long leg's details and profit](https://content.gainium.io/images/content/help/hedge-bots__detail.webp)

### How P&L is counted

The hedge bot's figures are the sum of its two legs: realized and unrealized profit, today's profit, deals and cost. Each leg's profit is counted from its own deals, the same way as a standalone bot. Read the two legs together. A leg that is deep in loss is expected while the other one is in profit. The question is whether the total is positive.

If the legs use different quote currencies, coin totals can't be added up. The USD figures are still combined.

## Backtest before you go live

Click **Backtest** in the form footer to test both legs over a past period. The result shows the long leg, the short leg and the combined result. Saved backtests are listed under **Backtests** below the chart.

Make the test realistic:

- **Use your real exchange fee.** A hedge pays fees on two legs, so it is more fee-sensitive than a single bot. The backtest refuses to run when the pair's fee is unknown, rather than assuming zero.
- **Add slippage** in the backtest settings, especially for combined closes, which are market orders.
- **Test more than one period.** Include a sideways range and a strong trend. Settings that only work in one of them are fitted to that period.

See [Backtesting trading bots](https://gainium.io/help/backtesting-trading-bots) for the general options.

## Risks to understand first

A hedge bot reduces directional risk. It does not remove risk:

- **Strong trends.** In a long one-way move, one leg keeps closing small profits while the other keeps averaging into a growing loss, until its DCA orders run out. The combined PnL can end up negative even though each swing paid out. A **combined stop loss** limits this.
- **Capital.** Both legs need funds, and the losing leg uses more and more of them as it averages in. Size each leg's investment for its full DCA ladder.
- **Leverage and liquidation.** On futures, leverage magnifies the losing leg's position. Keep leverage low enough that the losing leg's liquidation price sits well beyond its last DCA order.
- **Fees and funding.** Two legs, two sets of fees and funding. Small take-profit targets can be eaten up by them.

Try a new setup on a [paper trading](https://gainium.io/help/paper-trading-forward-testing) account first. It runs on live prices with simulated funds.

## What hedge bots don't support yet

- [Add Funds](https://gainium.io/help/add-funds-to-deals) and [Reduce Funds](https://gainium.io/help/reduce-funds) on Hedge Combo deals.
- [Automations](https://gainium.io/help/automations) actions.
- Changes from Telegram: hedge bots are [read-only there](https://gainium.io/help/bot-notifications-and-telegram-control).
- [Reversing the direction](https://gainium.io/help/reverse-futures-bot-direction). A hedge bot already runs both directions.
- `tpPrice` and `slPrice` in [webhook](https://gainium.io/help/webhooks) signals. Send `tpPerc` and `slPerc` instead, since one price would be on the wrong side for one of the legs.

## FAQ

**Are hedge bots profitable?**
They can be, in markets that swing back and forth, because each swing lets one of the legs close a deal at a profit. In a persistent trend one leg carries a growing loss, so profitability depends on your stop loss, your capital and your fees. Backtest across different market conditions, with your real fees, before trusting any setup.

**Do I need to code to run a hedge bot?**
No. Quick Setup creates a working hedge bot from an exchange, a pair, an investment and a preset. Manual mode exposes every setting through the same form as DCA and Combo bots, with no code.

**What is the difference between Hedge DCA and Hedge Combo?**
Hedge DCA legs are DCA bots: each deal averages in with safety orders and closes at a take profit. Hedge Combo legs are Combo bots: each deal also trades a minigrid around its DCA levels, which takes small profits inside the deal. Hedge Combo also lets you base the combined take profit on the DCA used or on the maximum DCA.

**When one leg's deal closes, does the other close too?**
Only if the close came from the combined Take Profit or Stop Loss, which closes both deals on that pair. A leg's own take profit or stop loss closes only that leg's deal.

**Can I use webhooks or indicators with a hedge bot?**
Yes. Each leg has the start conditions and close conditions of a normal bot, including indicators and [webhooks](https://gainium.io/help/webhooks). Each leg is its own bot and has its own webhook.

**Can I edit a hedge bot after it starts?**
Yes. Open the bot and click **Edit**. Changes to a leg apply to that leg's new deals, the same as on standalone bots.
