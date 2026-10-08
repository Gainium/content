---
id: 1044
name: Single position per pair
slug: single-position-per-pair
description: >-
  Keep one open deal per pair in a DCA bot. New start signals add entries to the
  open position instead of opening more deals, and the take profit follows the
  new average.
createdAt: '2026-10-08T00:00:00.000Z'
updatedAt: '2026-10-08T00:00:00.000Z'
publishedAt: '2026-10-08T00:00:00.000Z'
locale: en
categories:
  - trading-bots
difficulty: intermediate
tags:
  - dca
  - deals
tldr: >-
  Turn on "Single position per pair" in a DCA bot's Deal Start settings. The bot
  then keeps one open deal per pair: every new start signal adds an entry to it,
  and the take profit is re-placed for the whole position at the new average.
  Entries replace safety orders. With ASAP, add a dynamic price filter or a
  cooldown after deal start to space the entries. Open deals on the same pair
  are merged into one when you switch it on.
---

A DCA bot normally opens a new deal for every start signal, so one pair can end up with several deals that each have their own average and take profit. With **Single position per pair**, the bot keeps one open deal per pair and every new start signal adds to it. You can think of it as DCA driven by your start conditions: indicators, webhooks, a timer or ASAP with spacing decide when to buy more.

## Turn it on

Open a DCA bot (new or **Edit**) and go to **Deal Start**. Switch on **Single position per pair**.

![Single position per pair in the Deal Start settings](https://content.gainium.io/images/content/help/single-position__toggle.webp)

- **Max entries per position** limits how many entries one position can take, counting the first buy. Leave it empty for no limit.
- **Max open deals** still applies. On a multi-pair bot it limits how many pairs hold a position at the same time.
- **Max deals per pair** is not used, because it is always one.

The setting is available for DCA bots. Combo, Grid and Hedge bots don't have it.

## How entries work

- When a start condition fires on a pair that already has an open deal, the bot buys one more base order and adds it to that deal. This is an **entry**.
- After each entry the average price is recalculated and the take profit is re-placed for the whole position.
- Entries replace safety orders. Your DCA settings are kept but not used while the setting is on.
- Stop loss and close by timer work on the position as a whole.

The deal card shows how many entries the position has, out of your limit.

![A position with 10 of 10 entries](https://content.gainium.io/images/content/help/single-position__entries.webp)

### Spacing entries with ASAP

With **ASAP**, the start condition is always true, so the bot needs something to space the entries. Add one of these:

- a **dynamic price filter**: the next entry waits until the price has moved by the deviation you set from the **last entry**;
- a **cooldown after deal start**: the next entry waits for the cooldown after the last entry.

The bot can't be saved with ASAP and neither of them. One click on **Enable dynamic price filter** or **Add cooldown** fixes it.

With indicator or webhook start conditions no spacing is required. An indicator that stays true adds an entry on every candle, though, so a cooldown is a good idea there too.

## Turning it on with open deals

If the bot already has more than one open deal on a pair, saving asks you to confirm. Those deals are merged into the **oldest** one, which becomes the position. The other deals are closed, and their open orders are cancelled and replaced by one take profit for the whole position.

![Confirmation when open deals are merged into one position](https://content.gainium.io/images/content/help/single-position__confirm.webp)

A pair with a single open deal keeps it as its position. Its unfilled safety orders are cancelled. This can't be undone.

## Moving a deal into the bot

When you move a terminal deal into a bot that holds a position on the same pair, the deal is added to that position. The bot list shows which bots will merge it, and you see the same confirmation before anything changes.

## Turning it off

Turning the setting off doesn't split a position. The open position runs to its close as one deal, without safety orders. New deals follow your normal settings again, including safety orders.

## Statistics

A position counts as one deal, however many entries it took. Compared with the same strategy without this setting, expect fewer, larger and longer deals. Return on peak capital and profit factor stay comparable. Switching the setting on or off resets the "since last change" statistics.

## Backtesting

Backtests simulate single-position bots. Entries are checked once per candle, so a cooldown or price threshold is applied at candle resolution rather than to the exact second.
