---
id: 1041
name: Telegram notifications
slug: telegram-notifications
description: >-
  Connect your Telegram account to Gainium and choose which bot, deal and
  order alerts are sent to you on Telegram.
createdAt: '2026-09-30T00:00:00.000Z'
updatedAt: '2026-09-30T00:00:00.000Z'
publishedAt: '2026-09-30T00:00:00.000Z'
locale: en
categories:
  - account-management
  - platform
difficulty: beginner
tags:
  - notifications
  - telegram
tldr: >-
  Go to Settings → Notification Preferences and press "Connect Telegram". It
  opens the Gainium bot in Telegram with your account already attached; press
  Start and the bot replies "Welcome to the bot!". No UUID or chat id is
  needed. Then tick the Telegram column for each alert type you want and press
  "Save changes". Each alert's message can be customised with the pencil icon
  in the Template column.
---

Gainium can send your bot, deal and order alerts to Telegram, so you get them on your phone even when the dashboard is closed.

## Connect your Telegram account

1. In Gainium, open **Settings → Notification Preferences**.
2. In the **Telegram** box at the top, press **Connect Telegram**.
3. The Gainium bot opens in Telegram (in the app, or in your browser) with your account already attached. Press **Start**.
4. The bot answers **"Welcome to the bot!"**, which means your account is linked. Back in Gainium, the box now shows **Connected as** followed by your Telegram username.

You don't need a UUID, a chat id or any other code. The **Connect Telegram** button carries everything the bot needs. Opening the bot some other way, for example by searching for it in Telegram, or typing a message instead of pressing **Start**, doesn't link your account. If that happened, go back to Gainium and use the button.

If the bot answers **"That link looks incomplete"**, the link was cut short or edited. Press **Connect Telegram** again from the settings page.

## Choose which alerts go to Telegram

Below the Telegram box is a table with one row per alert type, for example **Deal Started**, **Deal Closed with PnL**, **Buy Order Filled**, **Safety Order Filled**, **Bot Error** and **Daily Profit**. Each row has these columns:

- **Telegram**: send this alert to your Telegram. These checkboxes can only be used once your account is connected.
- **Email**: send this alert by email. Some alert types are Telegram-only.
- **Template**: customise the message (see below).
- **In-App** and **Sound**: notifications inside the dashboard.

Tick the alerts you want and press **Save changes**. Telegram and Email choices are saved to your account and apply on every device. In-App and Sound choices are saved only on the device you're using.

## Customise the message

Press the pencil icon in the **Template** column to edit the text of an alert. You can use the variables listed in the editor, for example the symbol or the deal link, and press **Send test** to see the result in Telegram. To go back to Gainium's default wording, reset the template.

## Disconnect

To stop Telegram notifications, press **Disconnect** in the Telegram box and confirm. You can connect again at any time with **Connect Telegram**.

## Troubleshooting

- **The Telegram checkboxes are greyed out.** Your Telegram account isn't connected yet. Follow the steps above.
- **Connected, but no messages arrive.** Check that the alert type is ticked in the Telegram column and that you pressed **Save changes**. Also make sure you haven't blocked or muted the Gainium bot in Telegram. If you blocked it, unblock it. Your connection is kept, so you don't need to connect again.
- **You changed Telegram accounts.** Press **Disconnect**, then **Connect Telegram** while logged into the new Telegram account.
