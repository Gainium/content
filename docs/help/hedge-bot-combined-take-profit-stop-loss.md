---
id: 1049
name: Hedge bot combined Take Profit and Stop Loss
slug: hedge-bot-combined-take-profit-stop-loss
description: >-
  How the hedge-level Take Profit and Stop Loss work on Gainium Hedge DCA and
  Hedge Combo bots: they watch the combined PnL of the long and short deals on
  each pair and close both together at market.
createdAt: '2026-10-23T00:00:00.000Z'
updatedAt: '2026-10-23T00:00:00.000Z'
publishedAt: '2026-10-23T00:00:00.000Z'
locale: en
categories:
  - hedge-bots
  - trading-bots
difficulty: intermediate
tags:
  - hedge
  - dca
  - combo
  - futures
  - bot
tldr: >-
  On the Hedge tab of a hedge bot, Take Profit (hedge) and Stop Loss (hedge)
  watch the combined unrealized PnL of the long and short deals on each pair.
  When the combined profit reaches your TP %, or the combined loss reaches your
  SL % (entered as a negative number), both deals on that pair close together at
  market and the bot keeps running. While a hedge-level TP is on, the legs do
  not place their own fixed take-profit orders; while a hedge-level SL is on,
  the legs' own percentage stop losses are not used. On Hedge Combo you choose
  whether the % is measured against the DCA amount used so far or the maximum
  DCA amount.
---

A [hedge bot](https://gainium.io/help/hedge-bots) runs a long bot and a short bot side by side. Most of the time one leg is in profit while the other is in loss, so judging each leg on its own misses the point: what matters is the result of the two together. The **hedge-level Take Profit and Stop Loss** do exactly that. They look at both legs' deals on a pair as one position and close them together.

You find both settings on the **Hedge** tab of the bot form (switch the form to **Manual** to see the tabs).

![The Hedge tab of a Hedge Combo bot: Take Profit (hedge) at 3%, Base take profit on Used DCA or Max DCA, and Stop Loss (hedge)](https://content.gainium.io/images/content/help/hedge-bots__hedge-tab-combo.webp)

## How the combined check works

When at least one of the two settings is on, Gainium checks the bot every 30 seconds:

1. The open deals of both legs are **grouped by pair**. A BTC/USDT long deal and a BTC/USDT short deal form one group. ETH/USDT deals form another.
2. For each pair, Gainium adds up the unrealized PnL of the deals in the group and divides it by the funds those deals use:

   **combined % = (long unrealized PnL + short unrealized PnL) ÷ (long funds used + short funds used) × 100**

3. If the combined % is at or above your **Take Profit (hedge)**, or at or below your **Stop Loss (hedge)**, every open deal of that pair, in both legs, is closed **at market**.
4. Only that pair closes. Other pairs keep running, and so does the bot: each leg opens its next deal on its own start condition, as usual.

Closed deals show **Combined** as the reason they closed, so you can tell them apart from deals that closed on a leg's own settings.

### A pair with only one leg open

If only one leg has an open deal on a pair, for example the short deal closed earlier or the long leg has not started one yet, that pair is judged on the open deal alone.

## Take Profit (hedge)

Turn on **Take Profit (hedge)** and enter the combined profit you want, as a percentage.

**Example.** The long BTC/USDT deal uses $500 and is down $20. The short BTC/USDT deal uses $500 and is up $45. The combined PnL is +$25 on $1,000 used, which is +2.5%. With Take Profit (hedge) at 2.5%, both deals close now: the short at a profit, the long at a loss, and +$25 in total.

On their own, neither leg would have closed. The long leg was in loss, and the short leg's own take profit may not have been reached yet.

### Base take profit on (Hedge Combo only)

On a **Hedge Combo** bot the legs are [Combo bots](https://gainium.io/help/understanding-combo-bot), which commit their DCA budget gradually. So you choose what the percentage is measured against:

- **Used DCA**: the funds the legs have actually used so far. The target grows as the deals average in.
- **Max DCA**: the maximum the legs could use if every DCA level filled. The target stays the same however much is in use. This is the default.

**Example.** With a $1,000 maximum and a 10% take profit:

| Funds in use | Used DCA closes at | Max DCA closes at |
|---|---|---|
| $100 | $10 profit | $100 profit |
| $500 | $50 profit | $100 profit |
| $1,000 | $100 profit | $100 profit |

Hedge DCA bots always measure against the funds used.

## Stop Loss (hedge)

Turn on **Stop Loss (hedge)** and enter the combined loss at which both deals should close. **Enter it as a negative number**, for example `-8` for a stop at an 8% combined loss. A positive value would close the pair as soon as it was in profit.

A hedge-level stop loss is the main protection against the one case a hedge bot handles badly: a strong trend in one direction (see [Risks to understand first](https://gainium.io/help/hedge-bots#risks-to-understand-first)). One leg keeps averaging against the move while the other leg's profit is capped by its take profit. The stop loss closes both before that gap grows too large.

## How it interacts with each leg's own TP and SL

The hedge-level settings **take over** from the legs' fixed settings:

- While **Take Profit (hedge)** is on, the legs do not place their own take-profit orders. Deals close when the combined target is reached.
- While **Stop Loss (hedge)** is on, the legs' own percentage stop losses are not used. Deals close when the combined stop is reached.

Switching a hedge-level setting off on an existing bot gives the legs back their own TP or SL. If you want each leg to take its own profit independently, leave **Take Profit (hedge)** off and set the take profit on the **Long leg** and **Short leg** tabs instead. Those work as in the [DCA bot walkthrough](https://gainium.io/help/dca-bot-set-up-walkthrough#take-profit), including [multiple take profit targets](https://gainium.io/help/multiple-take-profit-targets) and [move stop loss](https://gainium.io/help/move-stop-loss).

## Things to know

- The combined close is always a **market** order, so expect some slippage on illiquid pairs.
- The check runs every 30 seconds, not on every price tick. On a fast move the deals can close a little past your level.
- Closing both legs costs two market orders' worth of fees. Leave room for them in your Take Profit (hedge). [Backtest](https://gainium.io/help/hedge-bots#backtest-before-you-go-live) with your real fee and some slippage before going live.
- The [Quick Setup presets](https://gainium.io/help/hedge-bots#quick-setup) turn on Take Profit (hedge) for you: 1.5% (Conservative), 3% (Balanced) or 6% (Aggressive). None of them turns on Stop Loss (hedge).

## FAQ

**Does a combined take profit close all my pairs at once?**
No. Each pair is judged on its own. Only the pair that reached the target closes.

**Does the bot stop after a combined close?**
No. The bot keeps running and each leg opens new deals according to its own start conditions.

**Can I use a combined take profit together with a trailing take profit on a leg?**
The hedge-level take profit is the one that closes the deals while it is on. If you want trailing behaviour on a leg, leave Take Profit (hedge) off and configure the [trailing take profit](https://gainium.io/help/trailing-take-profit) on that leg.

**Why did my pair close at a loss when I only set a take profit?**
A take profit on the combined PnL can close a losing leg, because the other leg's profit covers it. The total for the pair is what reached your target. Check the closed deals of both legs together.
