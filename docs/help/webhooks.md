---
id: 48
name: Webhooks - Send signals from TradingView and other programs
slug: webhooks
description: >-
  Learn how to send webhooks to your trading bots and use them as entry trigger
  signal for trading.
createdAt: '2022-11-22T13:46:17.530Z'
updatedAt: '2026-08-13T04:00:00.000Z'
publishedAt: '2022-11-22T13:46:20.790Z'
locale: en
categories:
  - trading-bots
difficulty: beginner
tags:
  - trading
  - signals
ingested: true
ingestedAt: '2025-06-29T10:57:30.032Z'
tldr: >-
  Webhooks let you trigger Gainium bot actions (open deal, close deals, add
  funds, close bot) from external platforms like TradingView by sending a JSON
  payload to a unique bot URL. Each action only works if the matching option is
  enabled in the bot's settings first. Multiple actions can be concatenated in a
  single alert by sending an array — which is how you reverse a position.
---

This article will guide you through using webhooks to operate Gainium bots, including a special focus on concatenating webhook actions on the same alert by sending an array in the webhook payload.

## **What are Webhooks?**

Webhooks are automated messages sent from apps when something happens. They have a message—or payload—and are sent to a unique URL. They're a simple way your online accounts can communicate and get automated messages when something new happens.

## **Setting Up Webhooks in Gainium**

### **Step 1: Understanding Gainium Bots**

Before diving into webhooks, it's essential to understand the various bots Gainium offers, such as grid, DCA, and combo bots. Each bot has unique triggers and actions that can be automated.

### **Step 2: Create a new bot**

To start, create a new bot. There are several places where the bot can accept webhooks, those include:
- Deal Start
- [Add funds](https://gainium.io/help/add-funds-to-deals)
- Take Profit
- Stop Loss
- Start bot

![webhooks.png](https://content.gainium.io/images/content/help/webhooks_8680099d81-baf1c8.webp)

Depending on where do you enable webhooks, you will have access to certain actions to be automated through them. Once you are happy with the bot configuration, click on “Add new bot,” and a new info box will appear with the webhook information.

![webhook config.png](https://content.gainium.io/images/content/help/webhook_config_9e09b29865-39398f.webp)

> **This is the step people miss.** An action only works if the matching option is switched on in the bot's settings. A bot that was not configured to *close* by webhook will happily accept a `startDeal` signal and then **silently discard** every `closeDeal` signal you send it — no error, no rejected request, nothing in the response. The most common symptom is "my bot opens trades but never closes them."
>
> The webhook info box only lists the actions your bot has actually enabled. **If an action isn't shown there, it will not work** — go back and enable it in the settings first.

| To use this action | The bot must have |
| --- | --- |
| `startDeal` | **Deal start condition** set to *TradingView / webhook signals* |
| `closeDeal` | **Take profit** enabled, with **condition** set to *Webhook* |
| `closeDealSl` | **Stop loss** enabled, with **condition** set to *Webhook* |
| `changePairs` | **Multi-pair** enabled |
| `startBot`, `stopBot`, `addFunds`, `reduceFunds` | No extra setting |

### **Step 3: Configuring Your Webhook alert (TradingView or others)**

Next, head to your webhook provider, in this case we will use TradingView as an example.

On the indicator of your choosing, click on “More” (the three dots at the end of the indicator name), then “Add alert on…”.

![TV-add-alert.png](https://content.gainium.io/images/content/help/TV_add_alert_25a34c4c24-a5f174.webp)

You will be presented with the following window. Click on “Webhook URL”.

![tv-alert.png](https://content.gainium.io/images/content/help/tv_alert_33541b208e-5d9fa4.webp)

You may input the webhook URL and the message as shown in your bot info. The alert name can be anything you want. Click on Create, and that's it!

## **Webhook Actions Reference**

Every payload is a JSON object with at least an `action` and a `uuid`:

```json
{ "action": "startDeal", "uuid": "f944e169-2398-482b-4987-10a30eeb477b" }
```

The `uuid` is the **bot's UUID shown in the webhook info box** — not the bot id from the browser address bar. A payload carrying the wrong identifier matches no bot and the signal is dropped.

These are all the actions Gainium accepts. **An `action` value that isn't in this list is ignored silently** — the request still returns successfully, so a typo (or an action name suggested by an AI assistant) looks like it worked while doing nothing at all.

| Action | What it does | Extra fields |
| --- | --- | --- |
| `startDeal` | Starts a new deal. | `symbol` *(optional)* — limit the signal to one pair. Omit it and the bot uses its configured pairs. |
| `closeDeal` | Closes open deals at the take-profit close type. | `symbol` *(optional)* — close only that pair. **Omit it and every open deal on the bot is closed.** |
| `closeDealSl` | Same as `closeDeal`, but closes at market and books the result as a stop loss. | `symbol` *(optional)* |
| `startBot` | Starts the bot (equivalent to pressing Start). | — |
| `stopBot` | Stops the bot. | `closeType`: `limit`, `market`, `cancel`, or `leave`. Defaults to `leave` (open deals are left running). |
| `addFunds` | [Adds funds](https://gainium.io/help/add-funds-to-deals) to open deals. | `qty` **(required)**, `asset` **(required)**: `base`, `quote`, `percTotal`, `percFree` or `usd`; `type` *(optional)*: `fixed` or `perc`; `symbol` *(optional)* |
| `reduceFunds` | Reduces funds in open deals. | Same as `addFunds` |
| `changePairs` | Changes the pairs a multi-pair bot trades. | `pairsToSet` **(required)**, an array of pairs; `pairsToSetMode`: `add`, `remove` or `replace` |

`addFunds` and `reduceFunds` do nothing if `qty` or `asset` is missing or empty, and `changePairs` does nothing without `pairsToSet` — again with no error returned.

## **Concatenating Webhook Actions on the Same Alert**

### **Understanding Concatenation**

Concatenating actions means executing multiple actions in sequence based on a single alert. In the context of webhooks, this involves sending an array of actions in the webhook payload.

### **Implementing Concatenation**

**Structure the Payload:** When setting up your webhook, structure the payload as an array of actions. Each action should be a distinct object within the array.

Example to start a deal adding funds right away:

```json
[
  { "action": "startDeal", "uuid": "f944e169-2398-482b-4987-10a30eeb477b" },
  {
    "action": "addFunds",
    "uuid": "f944e169-2398-482b-4987-10a30eeb477b",
    "asset": "quote",
    "qty": "50"
  }
]
```

Replace the `uuid` with your own bot's UUID, shown in the webhook info box after you create the bot.

The actions are dispatched **in the order you list them**, and they do not all have to target the same bot — which is what makes the next section possible.

**Test the Webhook:** Before going live, test the webhook with the array payload to ensure all actions are executed as expected.

### **Reversing a Position (Long → Short and Back)**

Gainium bots are **one-directional**: a bot is either long or short, because the direction is built into its logic and its statistics. So there is no single "reverse" action.

You can still run a strategy that flips, using **two bots and one concatenated alert**. Create a long bot and a short bot on the same pair, then make your reversal signal close one side and open the other in the same payload:

Long entry (closes the short, opens the long):

```json
[
  { "action": "closeDeal", "uuid": "SHORT-BOT-UUID" },
  { "action": "startDeal", "uuid": "LONG-BOT-UUID" }
]
```

Short entry (closes the long, opens the short):

```json
[
  { "action": "closeDeal", "uuid": "LONG-BOT-UUID" },
  { "action": "startDeal", "uuid": "SHORT-BOT-UUID" }
]
```

Exit long, and exit short:

```json
[{ "action": "closeDeal", "uuid": "LONG-BOT-UUID" }]
```

```json
[{ "action": "closeDeal", "uuid": "SHORT-BOT-UUID" }]
```

Both bots need **Deal start condition = TradingView / webhook signals** *and* **Take profit = Webhook**, per the table above. If you only set the start condition — which is easy to do, since that's the part that makes entries work — the bot will open positions and never flip out of them.

If your signal provider has separate message fields for each event (LuxAlgo's backtester, for example, has *Long Entry*, *Exit Long*, *Short Entry* and *Exit Short* message boxes), paste the matching payload into each one and set your TradingView alert message to `{{strategy.order.alert_message}}` so each order sends its own payload.

> **A reversal is two orders, not one.** The actions are sent to the bots in order, but the closing order is not guaranteed to be *filled* before the opening order is placed. On exchanges that net positions, a fast reversal can briefly show an unexpected position size before it settles. This is normal.

Some exchanges — Hyperliquid among them — do not offer a "reverse" endpoint at all, so a reversal has to be executed as a close plus an open no matter which platform you use.

## **Troubleshooting: my webhook does nothing**

The endpoint accepts almost anything and returns success, so a silent no-op is the usual failure. Work through these in order:

1. **Is the action enabled on the bot?** Check the webhook info box — if the action isn't listed there, the setting that enables it is off. This is by far the most common cause, and `closeDeal` is by far the most common victim.
2. **Is the action spelled exactly as in the reference table?** Names are case-sensitive and there are no aliases. `closeAllDeals`, `openDeal`, `exitLong` and similar invented names are not valid actions and are discarded without complaint. To close every deal on a bot, use `closeDeal` **without** a `symbol`.
3. **Is the `uuid` the bot's UUID from the webhook info box?** Not the bot id from the address bar.
4. **Is the bot running?** A stopped bot ignores deal actions. Use `startBot` first, or start it from the dashboard.
5. **Does the `symbol` belong to the bot?** A `startDeal` for a pair that isn't in the bot's settings — or one that fails the bot's volume filter — is rejected.
6. **Check the bot's logs.** Every webhook the bot receives is recorded as a *Webhook* event on the bot, which tells you whether the signal arrived at all. If it arrived and nothing happened, you're almost certainly on point 1 or 2.
