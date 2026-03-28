---
id: 48
name: Webhooks - Send signals from TradingView and other programs
slug: webhooks
description: >-
  Learn how to send webhooks to your trading bots and use them as entry trigger
  signal for trading.
createdAt: '2022-11-22T13:46:17.530Z'
updatedAt: '2026-02-24T07:44:20.586Z'
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
  payload to a unique bot URL. Multiple actions can be concatenated in a single
  alert by sending an array.
---

This article will guide you through using webhooks to operate Gainium bots, including a special focus on concatenating webhook actions on the same alert by sending an array in the webhook payload.

## **What are Webhooks?**

Webhooks are automated messages sent from apps when something happens. They have a message—or payload—and are sent to a unique URL. They're a simple way your online accounts can communicate and get automated messages when something new happens.

## **Setting Up Webhooks in Gainium**

### **Step 1: Understanding Gainium Bots**

Before diving into webhooks, it's essential to understand the various bots Gainium offers, such as grid, DCA, and combo bots. Each bot has unique triggers and actions that can be automated.

### **Step 2: Create a new bot**

To start, create a new bot. There are several places where the bot can accept webhooks, those include:
- Deal Start- [Add funds](https://gainium.io/help/add-funds-to-deals)
- Take Profit- Stop Loss- Start bot

![webhooks.png](https://content.gainium.io/images/content/help/webhooks_8680099d81-baf1c8.png)

Depending on where do you enable webhooks, you will have access to certain actions to be automated through them. Once you are happy with the bot configuration, click on “Add new bot,” and a new info box will appear with the webhook information.

![webhook config.png](https://content.gainium.io/images/content/help/webhook_config_9e09b29865-39398f.png)

### **Step 3: Configuring Your Webhook alert (TradingView or others)**

Next, head to your webhook provider, in this case we will use TradingView as an example.

On the indicator of your choosing, click on “More” (the three dots at the end of the indicator name), then “Add alert on…”.

![TV-add-alert.png](https://content.gainium.io/images/content/help/TV_add_alert_25a34c4c24-a5f174.png)

You will be presented with the following window. Click on “Webhook URL”.

![tv-alert.png](https://content.gainium.io/images/content/help/tv_alert_33541b208e-5d9fa4.png)

You may input the webhook URL and the message as shown in your bot info. The alert name can be anything you want. Click on Create, and that's it!

There are different types of webhook actions:
- Open deal: will instruct the bot to start a new deal.
- Close all deals: will instruct to close all open deals at market price.
- Close bot- [Add funds](https://gainium.io/help/add-funds-to-deals)

## **Concatenating Webhook Actions on the Same Alert**

### **Understanding Concatenation**

Concatenating actions means executing multiple actions in sequence based on a single alert. In the context of webhooks, this involves sending an array of actions in the webhook payload.

### **Implementing Concatenation**

**Structure the Payload:** When setting up your webhook, structure the payload as an array of actions. Each action should be a distinct object within the array.

Example to start a deal adding funds right away:
[
  { "action": "startDeal", "uuid": "f944e169-2398-482w-4987-10a30eeb477b" },
  { "action": "addFunds", "uuid": "f944e169-2398-482w-4987-10a30eeb477b", "asset": "quote", "qty": "50" }

]
**Test the Webhook:** Before going live, test the webhook with the array payload to ensure all actions are executed as expected.
