---
id: 134
name: Reduce Funds
slug: reduce-funds
description: >-
  Gainium’s Reduce Funds feature allows you to decrease positions in open deals
  via web UI, webhook, or API, with market or limit orders.
createdAt: '2024-10-07T08:37:43.506Z'
updatedAt: '2026-10-20T08:00:00.000Z'
publishedAt: '2024-10-08T05:14:23.981Z'
locale: en
categories:
  - trading-bots
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.023Z'
tldr: >-
  The Reduce Funds feature lets you decrease your position size in an active
  deal by a fixed amount or percentage, via the web UI, webhook, or API. All
  three support market and limit orders: webhook and API reductions fill at
  market unless you send a price, which places a limit order at that price. On a
  Combo deal, reducing funds shrinks every DCA level of the deal by the same
  factor, at market.
---

### Reduce Funds Feature in Gainium

The **Reduce Funds** feature allows you to reduce your position size in an active deal by a specific percentage or a fixed amount. This feature can be accessed through the deal menu on the web UI, via webhooks, or through the API. It offers flexibility for traders looking to secure profits, reduce exposure, or free up capital without closing their entire position.

### How to Reduce Funds via Web UI
- **Access the Deal Menu**:Navigate to the active deal you want to modify, and click on the **Reduce Funds** option in the deal menu.
- **Type (Fixed or Percent)**:Choose whether you want to reduce by a **Fixed** amount or a **Percent** of the current position.
- **Fixed**: You enter a specific value (e.g., 100 USDT).
- **Percent**: You enter the percentage of the current position to reduce (e.g., 20%).
- **Amount**:Input the value or percentage based on the selected type.
- **Order Type**:**Market**: Executes the reduction immediately at the current market price.
- **Limit**: The reduction is only executed if the price reaches your target.
- **Confirm**:Click **Confirm** to execute the reduction. The bot will handle the order based on the settings.

![image.png](https://content.gainium.io/images/content/help/image_eb3da46abf-2f2d7e.webp)
*Reduce Funds in Deal Menu*
![image.png](https://content.gainium.io/images/content/help/image_d64f1bffe5-2be2f6.webp)
*Reduce Funds Options*

Before you confirm, the dialog shows what the order will do: how much is sold now, the position before → after, the average price (a reduction does not change it) and the profit or loss the sale realizes. A reduction of 100% or more closes the deal, and the dialog says so.

### Reduce Funds on Combo deals

On a Combo deal, reducing funds is the mirror of [adding funds](https://gainium.io/help/add-funds-to-deals#add-funds-on-combo-deals): it makes **every level of the deal smaller by the same factor**.

- **Filled levels**: part of the position is sold **at market now**, and every minigrid's orders shrink by the same factor.
- **Pending levels** that have not filled yet are resized down.
- **Percentage**: −30% makes every level 0.7× its current size. **Fixed amount**: the total to withdraw across the position (at today's price) and the pending levels.
- The sale is booked against the deal's average price, so the profit or loss it realizes is shown before you confirm. The average price itself does not change.
- If any grid line or pending level would fall below the exchange's minimum order size, the request is refused, and the message tells you the largest reduction possible right now.
- A reduction of 100% or more closes the deal.
- Combo reductions always use a **market** order; a webhook or API request with a `price` is refused for a Combo deal. [Hedge Combo](https://gainium.io/help/hedge-bots) deals do not support Reduce Funds.

For example, on the Combo deal from the [Add Funds example](https://gainium.io/help/add-funds-to-deals#combo-example) (8.359 coins at an average of 95.70, price 90), reducing by **25%** sells 2.090 coins at market, realizes a loss of about 11.92 USDT, and shrinks every minigrid line to 0.75× its size.

### Reduce Funds via Webhook

Like the **Add Funds** feature, you can use webhooks to reduce funds in an open deal. Here’s how:
- **Set Up the Webhook**:Configure the webhook with the necessary parameters, including the deal to modify and the amount or percentage to reduce.
- **Options for Single and Multi-Coin Bots**:For single-coin bots, the webhook reduces funds in all open deals.
- For multi-coin bots, you can choose to reduce funds across all deals or specify which deal to reduce funds from.
- On a Combo bot, the webhook shrinks every DCA level of each open deal as described above, always at market.
- **Market or Limit**: Without a `price`, the reduction fills at market. Add a `price` to the webhook and it's placed as a **limit order** at that price instead:

```json
{
  "action": "reduceFunds",
  "uuid": "BOT_UUID",
  "symbol": "BTC_USDT",
  "qty": "25",
  "asset": "quote",
  "price": "{{close}}"
}
```

The price is rounded to the pair's price step. On a bot with more than one pair, a webhook with a `price` must also include `symbol`. Full details are in [Webhooks](https://gainium.io/help/webhooks#adding-or-reducing-funds-with-a-limit-order).

### Reduce Funds via API

For more advanced users, the **Reduce Funds** feature is also accessible through the Gainium API. You can find detailed documentation on how to implement it in your bots. Here’s a quick summary of the process:
- **API Call**:Reduce funds in an open deal using the appropriate endpoint. The [API documentation](https://api.gainium.io/api/docs/) provides a reference.
- **Parameters**:Provide details such as the deal ID, reduction amount, or percentage.
- Ensure you specify whether the reduction is by a fixed amount or percentage.
- **Market or Limit**: API calls fill at market by default. Send the optional `price` field and the reduction is placed as a **limit order** at that price, with the same rules as the webhook.

### Example with ETH/USDT

Let’s say you have a long deal on ETH/USDT with 1 ETH and want to reduce your position by 20%. Through the **Web UI**, you would select the **Percent** option, enter **20%**, and choose **Market** for an instant reduction, resulting in a sale of 0.2 ETH.

Alternatively, if using a **Webhook**, the same 20% reduction would apply across all open deals for that pair, unless you specify a particular deal.

### Conclusion

In conclusion, Gainium's **Reduce Funds** feature offers a flexible way to manage active deals, whether through the web interface, webhook, or API. This feature is ideal for securing partial profits, reducing exposure to a position, or freeing up capital while keeping the deal active.
