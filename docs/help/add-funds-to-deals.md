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
updatedAt: '2026-02-24T07:44:20.559Z'
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
  or quote currency.
---

Gainium's “Add funds” feature allows users to gain more control of their trading activities by increasing the volume of existing trading bots or terminal deals, lowering the average acquisition cost of the asset in the process. But how does it all work? Let's delve into it.

## Using the Add Funds Feature

### Web UI

The "Add Funds" feature works quite straightforwardly. It is supported by any smart or import deal created through the terminal and any deal started by a trading bot. Once the deal is created, you can use this feature to add more funds to it. This option is accessible through the deal menu, which opens a pop-up window allowing you to specify the following parameters:
![Add_funds_webUI.png](https://content.gainium.io/images/content/help/Add_funds_web_UI_02049e1c16-545cce.png)
*Add Funds through UI*

**Amount**: This is the volume of funds that you want to add to the deal. It's essentially the additional sum you're willing to invest.

**Currency**: Here, you can add the amount reference in either the base or the quote currency. It's important to note that for a long deal, the quote currency is always added, and for a short deal, the base currency is added.

**Order Type**: You can choose between a limit order or a market order. The former allows you to buy or sell an asset at a specific price or better, while the latter executes your order at the current market price.

**Limit Price**: If you chose a Limit Order, you can specify the order price here.

### Webhook

You can also execute the “Add Funds” feature through a webhook, regardless of the deal start condition used in your trading bot.
![Add_funds_webhook.png](https://content.gainium.io/images/content/help/Add_funds_webhook_1504158676-1c3347.png)
*Add Funds Webhook*

Some considerations when using the Add Funds feature through webhooks:
- For a single coin bot, it will add the specified funds to all open deals. For example, if you have 2 open deals and send a webhook to add 20 USDT, it will add 20 USDT to **each deal**, totaling 40 USDT.
- For multi-coin bots, you will see two options:Add funds to all open deals- Add funds to all open deals of a specific symbol
- Adding funds through webhooks only support market orders

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
