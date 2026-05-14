---
id: 1001
name: Global Variables
slug: global-variables
description: >-
  Use global variables (int, float, text) to sync values across multiple bots.
  Type “/” to insert a variable. Update once, apply everywhere.
createdAt: '2025-04-18T03:04:03.331Z'
updatedAt: '2026-02-24T07:44:20.572Z'
publishedAt: '2025-04-18T03:21:34.035Z'
locale: en
categories:
  - combo-bots
  - trading-bots
difficulty: beginner
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.010Z'
tldr: >-
  Global Variables let you define reusable values (text, integer, or float) that
  can be inserted into bot settings by typing "/"; updating a variable once
  automatically reloads all bots using it. They''re ideal for standardizing
  settings like trade sizes or safety order counts across multiple bots.
---

Global Variables let you define reusable values (**text**, **integer**, or **float**) that can be inserted in your crypto trading bot settings. Instead of updating each bot individually, you can make changes in one place and apply them across multiple bots instantly.

## Supported Types
- **Text**- **Integer** (numbers with decimals)
- **Float** (numbers without decimals)

**Note:** Boolean (true/false) fields are **not supported** at this time.

## How to Use Global Variables
- Go to [**Global Variables**](https://app.gainium.io/global-vars) from your dashboard.
- Create a new variable and choose its type (text, int, or float).
- When editing a bot, type `/` in any supported field to open the variable menu.
- Select your variable to insert it.

**Note:** Once inserted, the variable **replaces the entire field**. You can’t combine it with other values (e.g.,  `name + "test"` is not valid).

## What Happens When a Variable is Changed?
- All bots using it will **reload** to apply the new setting.
- Only **new deals** will reflect the change.
- Existing deals are **not updated automatically** and must be edited manually if needed.

## Example: Using a Global Variable for Safety Orders

Let’s say you want all your bots to use the same number of safety orders—6, for example. Instead of setting this manually for each bot, create a global variable called `safety_orders` and set its value to `6`.
![image.png](https://content.gainium.io/images/content/help/image_c74ffd362d-c590e0.webp)
Now, when editing any bot, go to the "DCA Orders" field, type `/`, and select `safety_orders` from the list. The field will now use that variable instead of a fixed number.
![image.png](https://content.gainium.io/images/content/help/image_45a29f7c1f-e95d39.webp)

![image.png](https://content.gainium.io/images/content/help/image_8795168e53-b5ca71.webp)
If later you decide to change the number to 8, just update the `safety_orders` variable. All bots using it will reload and automatically start using 8 safety orders in new deals.

## Why Use Global Variables?

Global Variables are especially useful for things like trade sizes, number of safety orders, or custom thresholds. They save time, reduce the chance of making errors, and help keep your strategy consistent across bots.
