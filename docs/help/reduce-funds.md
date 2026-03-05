---
id: 134
name: Reduce Funds
slug: reduce-funds
description: >-
  Gainium’s Reduce Funds feature allows you to decrease positions in open deals
  via web UI, webhook, or API, with options for market or limit orders.
createdAt: '2024-10-07T08:37:43.506Z'
updatedAt: '2026-02-24T07:44:20.580Z'
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
  deal by a fixed amount or percentage, via the web UI, webhook, or API. Web UI
  supports both market and limit orders, while webhook and API reductions
  execute as market orders.
---

### Reduce Funds Feature in Gainium

The **Reduce Funds** feature allows you to reduce your position size in an active deal by a specific percentage or a fixed amount. This feature can be accessed through the deal menu on the web UI, via webhooks, or through the API. It offers flexibility for traders looking to secure profits, reduce exposure, or free up capital without closing their entire position.

### How to Reduce Funds via Web UI
- **Access the Deal Menu**:Navigate to the active deal you want to modify, and click on the **Reduce Funds** option in the deal menu.
- **Type (Fixed or Percent)**:Choose whether you want to reduce by a **Fixed** amount or a **Percent** of the current position.- **Fixed**: You enter a specific value (e.g., 100 USDT).- **Percent**: You enter the percentage of the current position to reduce (e.g., 20%).
- **Amount**:Input the value or percentage based on the selected type.
- **Order Type**:**Market**: Executes the reduction immediately at the current market price.- **Limit**: The reduction is only executed if the price reaches your target.
- **Confirm**:Click **Confirm** to execute the reduction. The bot will handle the order based on the settings.

![image.png](https://gainium.io/images/content/help/image_eb3da46abf-2f2d7e.png)
*Reduce Funds in Deal Menu*
![image.png](https://gainium.io/images/content/help/image_d64f1bffe5-2be2f6.png)
*Reduce Funds Options*

### Reduce Funds via Webhook

Like the **Add Funds** feature, you can use webhooks to reduce funds in an open deal. Here’s how:
- **Set Up the Webhook**:Configure the webhook with the necessary parameters, including the deal to modify and the amount or percentage to reduce.
- **Options for Single and Multi-Coin Bots**:For single-coin bots, the webhook reduces funds in all open deals.- For multi-coin bots, you can choose to reduce funds across all deals or specify which deal to reduce funds from.
- **Market Order Only**:Reductions via webhook are executed using **Market Orders** only.

### Reduce Funds via API

For more advanced users, the **Reduce Funds** feature is also accessible through the Gainium API. You can find detailed documentation on how to implement it in your bots. Here’s a quick summary of the process:
- **API Call**:Reduce funds in an open deal using the appropriate endpoint. The&nbsp;[API documentation](https://api.gainium.io/api/docs/)&nbsp;provides a reference.
- **Parameters**:Provide details such as the deal ID, reduction amount, or percentage.- Ensure you specify whether the reduction is by a fixed amount or percentage.
- **Market Order**:API calls to reduce funds will typically execute as **market orders**, ensuring instant reduction at the current price.

### Example with ETH/USDT

Let’s say you have a long deal on ETH/USDT with 1 ETH and want to reduce your position by 20%. Through the **Web UI**, you would select the **Percent** option, enter **20%**, and choose **Market** for an instant reduction, resulting in a sale of 0.2 ETH.

Alternatively, if using a **Webhook**, the same 20% reduction would apply across all open deals for that pair, unless you specify a particular deal.

### Conclusion

In conclusion, Gainium's&nbsp;**Reduce Funds**&nbsp;feature offers a flexible way to manage active deals, whether through the web interface, webhook, or API. This feature is ideal for securing partial profits, reducing exposure to a position, or freeing up capital while keeping the deal active.
