---
id: 1046
name: Reverse a futures bot (Long ↔ Short)
slug: reverse-futures-bot-direction
description: >-
  Switch a futures DCA or Combo bot from Long to Short (or back) in one step.
  Gainium closes the open deal at market, waits for the position to be flat,
  changes the direction and restarts the same bot with the same settings.
createdAt: '2026-10-12T00:00:00.000Z'
updatedAt: '2026-10-12T00:00:00.000Z'
publishedAt: '2026-10-12T00:00:00.000Z'
locale: en
categories:
  - trading-bots
difficulty: beginner
tags:
  - dca
  - combo
  - futures
  - bot
tldr: >-
  Open the bot's ⋮ menu (on the bot card, the table row or the bot page) and
  choose "Reverse to Short" or "Reverse to Long". The confirmation shows the
  deals that will be closed at market with their estimated P&L, and what the
  bot restarts with. Confirm, and Gainium closes the deal, waits until the
  exchange position is flat, switches the direction and restarts the same bot.
  Your order sizes, leverage, take profit, stop loss, name and history stay.
  Indicator conditions are not flipped. If the position does not close, the
  bot stays stopped in its old direction. Futures DCA and Combo bots only.
---

Reverse switches a **futures** DCA or Combo bot from Long to Short, or from Short to Long, **on the same bot**. You don't need to stop, clone and recreate it, and you don't lose your order sizes or leverage.

## Before you start

- Reverse is available for **futures** DCA and Combo bots, single-pair and multi-pair.
- It is **not** available for spot bots. On spot, the direction decides which coin the bot holds (the quote coin for Long, the base coin for Short), so it can't change on an existing bot. Clone the bot instead.
- Grid bots and hedge bots can't be reversed.
- Reverse **closes your open deals at market**. That realizes their profit or loss and can't be undone.

## How to reverse a bot

1. Open the bot's **⋮** menu. It is on the bot card (hover the card), on the table row, and at the top of the bot page. On a phone, tap the bot to open its page, then tap **⋮**.
2. Choose **Reverse to Short** (or **Reverse to Long**).

![The bot card menu with "Reverse to Long" on a futures DCA bot](https://content.gainium.io/images/content/help/reverse-bot__card-menu.webp)

3. Check the confirmation, then press **Reverse to Short** (or **Reverse to Long**).

![The Reverse confirmation: steps, the deal to close with its estimated P&L, and what the bot starts with](https://content.gainium.io/images/content/help/reverse-bot__dialog.webp)

## What the confirmation shows

- **Steps**: what will happen, in order:
  1. Stop the bot
  2. Close the open deals at market
  3. Wait until the position is flat
  4. Switch the direction
  5. Start the bot
- **Closing**: each open deal with its pair, size and entry price, and its **estimated P&L** after fees at the current price. It is the same figure the deals table shows. A market order can fill at a slightly different price, so the final result may differ a little. If the deal already booked profit from partial take profits, that shows as **Already realized**.
- **Starts as Short / Long**: what the bot restarts with:
  - leverage and margin type
  - base order and safety orders
  - take profit and stop loss
  - how the first deal opens

  These settings don't change. Take profit and stop loss keep their percentages and apply to the new side.
- **Indicators unchanged**: shown when the bot uses technical indicators (see below).
- **Start the bot after reversing**: ticked by default. Untick it to leave the bot stopped in the new direction, so you can review it first.

## What stays the same

The bot keeps its name, settings, order sizes, leverage, take profit, stop loss and **full history**. Each past deal remembers the direction it was opened in, so your history and statistics keep both the Long and the Short deals.

## Indicator conditions are not flipped

Indicator conditions are written for one direction. "RSI below 30" or "MOM above 0" are Long entries, and Reverse does **not** mirror them. If your bot starts or closes deals on indicators, the confirmation lists every condition under **Indicators unchanged**. Review them before or right after reversing, otherwise a Short bot will keep opening deals on Long signals.

If your bot starts deals from **webhook signals**, the same "start deal" signal now opens a deal in the new direction.

## If the position doesn't close

Gainium only switches the direction once the exchange confirms the old position is gone. If the deal doesn't close, or the position isn't flat within about a minute, Reverse stops. The bot stays **stopped in its old direction**, and the message says what is still open.

The usual cause is **another bot holding a position on the same pair**. On a one-way futures account, the exchange keeps one combined position per pair, so another bot's open deal keeps the position open. The confirmation warns you about this before you start. Close that bot's deal (or the leftover position on the exchange), then press Reverse again.

If the direction was switched but the bot couldn't start (for example, not enough margin), the message says so. Fix the cause and start the bot normally.

## Hedge-mode accounts

On an account in hedge mode, Long and Short positions can be open at the same time. Reverse only waits for the side the bot is leaving to close; a position on the other side doesn't block it.
