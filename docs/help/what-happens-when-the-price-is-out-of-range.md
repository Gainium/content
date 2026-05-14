---
id: 20
name: What happens when the price is out of range?
slug: what-happens-when-the-price-is-out-of-range
description: Learn what you can do when your bot enters 'range' status.
createdAt: '2022-08-09T06:37:43.073Z'
updatedAt: '2026-02-24T07:44:20.586Z'
publishedAt: '2022-08-09T06:37:44.746Z'
locale: en
categories:
  - grid-bots
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.032Z'
tldr: >-
  When the price moves outside a grid bot''s range, the bot enters "range"
  status and waits for the price to return. You can wait, cancel the bot, edit
  the range, or create another bot. Futures traders should monitor out-of-range
  positions closely to avoid liquidation.
---

If the price moves out of the grid, the bot status changes to ‘range’ and waits indefinitely for the price to enter back in.

You have four possible choices:
- You can wait for the price to enter the grid again and do nothing else.
- You can cancel the bot and use the funds for something else.
- You can edit the bot configuration and cover a broader range.
- You can create another bot that covers an additional price range.

**A note for users trading on Futures**: if the price moves above the upper grid level, you will have an active short position on the exchange. Likewise, if the price moves under the lower grid level, you will have an active long position on the exchange. We strongly suggest you monitor these positions closely and close them if necessary to avoid account liquidation.
