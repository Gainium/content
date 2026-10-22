---
id: 82
name: Add funds to deals
slug: add-funds-to-deals
description: >-
  Gainium's “Add funds” feature allows users to gain more control of their
  trading activities by increasing the volume of existing trading bots or
  terminal deals, lowering the average acquisition cost of the asset in the
  process. But how does it all work? This article explains how.
createdAt: '2023-07-22T12:53:02.670Z'
updatedAt: '2026-10-20T08:00:00.000Z'
publishedAt: '2023-07-23T09:42:14.250Z'
locale: en
categories:
  - trading-bots
  - trading-terminal
difficulty: advanced
tags: []
optimized: false
ingested: true
ingestedAt: '2025-06-29T10:57:29.981Z'
tldr: >-
  The "Add Funds" feature lets you increase the volume of an existing bot deal
  or terminal deal, lowering your average acquisition cost. Funds can be added
  via the web UI (with limit or market orders), webhooks, or API, in either base
  or quote currency. On a Combo deal, adding funds scales every DCA level of the
  deal by the same factor instead of placing one extra order.
---

Gainium's “Add funds” feature allows users to gain more control of their trading activities by increasing the volume of existing trading bots or terminal deals, lowering the average acquisition cost of the asset in the process. But how does it all work? Let's delve into it.

## Using the Add Funds Feature

### Web UI

The "Add Funds" feature works quite straightforwardly. It is supported by any smart or import deal created through the terminal and any deal started by a trading bot. Once the deal is created, you can use this feature to add more funds to it. This option is accessible through the deal menu, which opens a pop-up window allowing you to specify the following parameters:
![Add_funds_webUI.png](https://content.gainium.io/images/content/help/Add_funds_web_UI_02049e1c16-545cce.webp)
*Add Funds through UI*

**Amount Type**: You can specify the amount either as a **Fixed** value or as a **Percentage**:

- **Fixed**: This refers to the *volume* of the order (not the cost). Gainium operates using cost internally, but sends all orders to the exchange as volumes — the exchange then determines the actual cost. For example, at 10x leverage, entering a fixed quantity of 5 means your actual cost would be $0.50 (5 ÷ 10).

- **Percentage**: This is calculated based on the *current cost* of the deal, multiplied by your leverage. For example, if your deal has a current cost of $0.50 (volume of 5 at 10x leverage) and you choose to add 100%, the system calculates `0.50 × 1 × 10 = $5` and sends a $5 order to the exchange.

**Amount**: This is the volume of funds that you want to add to the deal. It's essentially the additional sum you're willing to invest.

**Currency**: Here, you can add the amount reference in either the base or the quote currency. It's important to note that for a long deal, the quote currency is always added, and for a short deal, the base currency is added.

**Order Type**: You can choose between a limit order or a market order. The former allows you to buy or sell an asset at a specific price or better, while the latter executes your order at the current market price.

**Limit Price**: If you chose a Limit Order, you can specify the order price here.

### What the dialog shows before you confirm

Below the amount, the dialog shows what the order will do to the deal: how much is bought now, the position before → after and the average price before → after. If the amount would round below the exchange's minimum order size, the dialog says so and the button stays disabled. If the bot refuses the request after you confirm, the reason appears as a notification.

## Add Funds on Combo deals

A Combo deal is a ladder of DCA levels, and every level that has filled runs its own minigrid. Adding funds to a Combo deal does **not** place one extra buy and does **not** add a new DCA level. It makes **every level of the deal bigger by the same factor**:

- **Filled levels** (the base order and every DCA level that has filled) are topped up **at market now**. Their minigrid orders grow by the same factor, so each grid line buys and sells more from then on.
- **Pending levels** that have not filled yet are resized. They spend more when they fill, and the minigrid they open is sized from the new amount.
- The number of levels stays the same.

The dialog shows the factor as **Every DCA level ×1.3** (for example), together with what is bought now, the change to the pending levels, and the new position and average price.

**How the amount is read on a Combo deal:**

- **Percentage**: the factor. +30% makes every level 1.3× its current size.
- **Fixed amount**: the total you want to add, spread across the whole ladder: what the filled levels cost at today's price plus what the pending levels will spend. The dialog shows the factor this works out to.

**Combo specifics:**

- Combo add funds always uses a **market** order. There is no limit option in the dialog, and a webhook or API request with a `price` is refused for a Combo deal.
- If the order, or any grid line it would resize, would fall below the exchange's minimum order size, the request is refused and nothing changes.
- One change at a time: while an add or reduce is still being processed, a new one is refused with a message. Send it again once the first has filled.
- Hedge Combo deals do not support Add Funds.

### Add funds or add a DCA level?

They do different things:

- **Add funds** makes every existing level bigger. It lowers your average price, and every minigrid trades larger amounts **within its own price range**. It pays off when the price comes back up through your levels.
- **Change DCA levels** (raising the deal's maximum DCA levels) adds a **new** level at the next step of the ladder, sized by your volume scale. If the price has already passed that level, it fills straight away at about the market price. Its minigrid starts at the level's own price, so it only trades once the price returns there. The Change DCA levels dialog lists each new level with its price and size, and marks the ones that will fill now.

### Combo example

A long Combo deal opened at 100 with a base order of 100 USDT and three DCA levels of 100, 200 and 400 USDT at 98, 96 and 94. All levels have filled: the deal holds 8.359 coins for 800 USDT, an average of 95.70. The price is now 90, below the whole ladder.

Adding **50%**:

| Level | Bought now at 90 | Each minigrid line |
|---|---|---|
| Base order | +0.500 | 0.250 → 0.375 |
| DCA 1 | +0.510 | 0.255 → 0.383 |
| DCA 2 | +1.042 | 0.521 → 0.781 |
| DCA 3 | +2.128 | 1.064 → 1.596 |
| **Total** | **+4.180 (≈ 376 USDT)** | |

The average drops from 95.70 to 93.80, so the price needs a smaller bounce to reach [break-even](https://gainium.io/help/current-break-even-and-final-break-even-lines) and your take profit. Each minigrid now trades 1.5× the amount as the price moves back up through its range.

### Webhook

You can also execute the “Add Funds” feature through a webhook, regardless of the deal start condition used in your trading bot.
![Add_funds_webhook.png](https://content.gainium.io/images/content/help/Add_funds_webhook_1504158676-1c3347.webp)
*Add Funds Webhook*

Some considerations when using the Add Funds feature through webhooks:
- For a single coin bot, it will add the specified funds to all open deals. For example, if you have 2 open deals and send a webhook to add 20 USDT, it will add 20 USDT to **each deal**, totaling 40 USDT.
- For multi-coin bots, you will see two options:Add funds to all open deals- Add funds to all open deals of a specific symbol
- On a Combo bot, the webhook scales every DCA level of each open deal as described in [Add Funds on Combo deals](#add-funds-on-combo-deals), always at market.
- Adding funds through webhooks fills at market by default. Send a `price` and the funds are added with a limit order at that price instead; see [Webhooks](https://gainium.io/help/webhooks#adding-or-reducing-funds-with-a-limit-order). The API's add funds endpoints accept the same `price` field.

### API

Check the [Add Funds API documentation](https://api.gainium.io/api/docs/#/Deals/post_api_addFunds) and examples.

## Tips for Using the Add Funds Feature
- Consider Your Risk Tolerance; adding funds to a deal increases your exposure.
- Monitor the Market: Regularly watch the market and use the "Add Funds" feature when you feel the market conditions are favorable.
- Diversify: Don't pour all your funds into one deal. Ensure your investments are diversified.
- Use Limit Orders for Precision: If you're targeting a specific price, use a limit order. This order type provides a greater degree of control over the price you pay or receive.

## An Example Using ETH/USDT

Let's walk through an example using the ETH/USDT pair. Assume you've already initiated a long deal with 1 ETH when the price was at $2000. However, the price has since dropped to $1800. You would like to add 0.5 ETH more to your deal.

Here's how you could use the "Add Funds" feature:
- Click on "Add Funds" and input an amount of 900 USDT or 0.5 ETH (both options will add an additional 900 USDT).
- Choose “Market” if you want the order to execute immediately at the current market price, or choose “Limit” if you want to specify at what price should the order execute.

This move will buy you more ETH at a reduced price, lowering the average acquisition cost. It will also position you to gain more if the price of ETH rises again.

Please remember that trading cryptocurrency always comes with risks, and it's essential to manage your trades carefully. Use the "Add Funds" feature judiciously, and remember to adjust your strategies based on the ever-evolving market conditions.

In conclusion, our new "Add Funds" feature provides a significant advantage by allowing you to capitalize on market fluctuations and lower your average asset acquisition cost. Whether you're a seasoned trader or a newcomer, it's a valuable tool to enhance your trading strategy. Happy trading!
