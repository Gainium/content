---
id: 1043
name: Multi-coin combo bots
slug: multi-coin-combo-bots
description: >-
  Run one combo bot on several pairs at once: each pair gets its own deal and
  minigrids. How to set it up, how deals are limited, and how credits are
  calculated.
createdAt: '2026-10-08T00:00:00.000Z'
updatedAt: '2026-10-08T00:00:00.000Z'
publishedAt: '2026-10-08T00:00:00.000Z'
locale: en
categories:
  - combo-bots
  - walkthrough-guides
difficulty: intermediate
tags:
  - bot
  - combo
tldr: >-
  A multi-coin combo bot trades several pairs with one set of settings. Each
  pair runs its own deal with its own minigrids, exactly like a single-pair
  combo. Max open deals caps how many deals run in total and Max open deals per pair
  caps each pair. It costs one combo (200 credits) for every pair it can trade
  at the same time — the number of pairs, capped by Max open deals — plus the
  usual extra-deal and indicator credits. On Gainium Cloud it is in beta and
  enabled for selected accounts.
---

A combo bot normally trades one pair. A **multi-coin combo bot** trades several pairs with the same settings: every pair runs its own deal, with its own base minigrid and its own DCA minigrids, exactly as a single-pair combo would. It is the combo equivalent of a multi-pair DCA bot.

If you are new to combo bots, read [Understanding the Combo bot](https://gainium.io/help/understanding-combo-bot) first — everything in it applies to each pair of a multi-coin bot.

> **Beta.** On Gainium Cloud, multi-coin combo bots are in beta and are being enabled for selected accounts. If you don't see the **Multiple** switch on a combo bot, it isn't enabled for your account yet. Self-hosted installations have it available.

## Setting it up

1. Create a new combo bot and choose your exchange.
2. In **Trading Pairs**, switch **Single** to **Multiple**.
3. Click **Add pairs** and pick the pairs you want. All pairs must share the same quote currency — the first pair sets it. For example, after adding BTC/USDT you can only add other /USDT pairs.
4. Set the rest of the bot as usual. The order sizes, minigrid settings, take profit and stop loss apply to every pair.
5. Set **Max open deals** and, if you want, **Max open deals per pair** (see below).

You choose single or multiple pairs when you create the bot; the switch is locked when you edit an existing bot.

## How deals are limited

Two settings decide how many deals run at once:

- **Max open deals** — the total for the whole bot, across all pairs.
- **Max open deals per pair** — the most deals one pair can have open at the same time.

For example, with 10 pairs, Max open deals 4 and Max open deals per pair 1, the bot runs at most four deals, each on a different pair. When one closes, the next pair whose start condition is met can open a deal.

With the **ASAP** start condition, the bot opens a deal on each pair straight away until it reaches Max open deals. With indicator, webhook or timer conditions, each pair opens a deal when its own condition is met.

Make sure your balance can fund the deals you allow. Each deal needs its base minigrid and its DCA minigrids funded, just like a single-pair combo, so a bot with five deals open needs roughly five times the funds of one deal.

## Credits

A multi-coin combo costs **one combo (200 credits) for each pair it can trade at the same time**. That is the number of pairs, capped by Max open deals, because no more pairs than that can have a deal open at once. The usual combo extras still apply on top:

- +1 credit per deal above 10 max deals
- +1 credit per indicator per pair

| Pairs | Max open deals | Credits |
|---|---|---|
| 1 | 1 | 200 |
| 1 | 50 | 240 |
| 5 | 5 | 1,000 |
| 20 | 3 | 600 |
| 50 | 50 | 10,040 |

If Max open deals is left unlimited, every pair counts.

As with every bot, the credits are locked when the bot starts. If you add pairs to a running bot, the extra credits are locked when you save, and the change is refused if your balance can't cover it. See [Bot Credit System](https://gainium.io/help/bot-credit-system) for how locking works.

## Changing pairs

You can add or remove pairs on a multi-coin combo at any time from the bot settings.

- **Adding a pair** — the bot can open deals on it from then on.
- **Removing a pair** — no new deals open on it. A deal that is already open on that pair keeps running until it closes.

## Using the API

The v2 API supports multi-coin combo bots:

- When creating a combo bot (`POST /api/v2/bots/combo`), set `useMulti: true`, pass the pairs in `pair`, and optionally `maxDealsPerPair`.
- To change the pairs of a running multi-coin combo, send `pair` to `PUT /api/v2/bots/combo/{botId}`, or use `PUT /api/v2/bots/combo/{botId}/pairs` to add, remove or replace pairs.

A request that isn't allowed — for example because your balance can't cover the extra credits — returns an error that explains why.

## Tips

- **Start small.** Try a few pairs with a low Max open deals before widening the bot.
- **Pick pairs that suit the same settings.** Minigrid height and step are shared by every pair, so pairs with very different volatility may need separate bots.
- **Watch exchange order limits.** Every open deal keeps its own grid orders on the exchange, so many deals at once means many open orders on your account.
