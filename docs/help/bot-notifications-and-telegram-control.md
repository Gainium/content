---
id: 1042
name: Bot notifications and Telegram control
slug: bot-notifications-and-telegram-control
description: >-
  Choose which alerts each bot sends, connect your own Telegram bot, and check
  or change your bots and deals from Telegram with confirmation buttons.
createdAt: '2026-10-06T00:00:00.000Z'
updatedAt: '2026-10-06T00:00:00.000Z'
publishedAt: '2026-10-06T00:00:00.000Z'
locale: en
categories:
  - trading-bots
  - platform
difficulty: intermediate
tags:
  - notifications
  - telegram
tldr: >-
  Each DCA, Combo and Grid bot has a Notifications section. Switch it on to
  give that bot its own alerts instead of your account settings. You can send
  a bot's alerts through the Gainium bot or through your own Telegram bot made
  with @BotFather. In Telegram, /menu opens your bots and deals as buttons.
  Changes (TP, SL, funds, close, start/stop, settings) work only after you turn
  on "Allow Telegram commands that change this bot" for that bot, and every
  change asks you to confirm within 60 seconds.
---

Every bot can have its own notification settings, and you can check and manage your bots from Telegram by tapping buttons. You never have to type an id or a bot name.

This article builds on [Telegram notifications](https://gainium.io/help/telegram-notifications), which covers connecting the Gainium bot to your account and the account-wide alert settings.

## Per-bot notifications

Open a DCA, Combo or Grid bot and scroll to the **Notifications** section (the bell in the section list).

![The Notifications section of a bot, with the override switched on](https://content.gainium.io/images/content/help/bot-notifications__section.webp)

### Override the account settings

- **Switch off (default):** the bot follows your account settings in **Settings → Notification Preferences**.
- **Switch on:** only this section decides which alerts this bot sends and where. Your other bots are not affected.

With the switch on, you get a table of events with a **Telegram** and an **Email** column. Tick where each alert should go. An event with neither box ticked is muted for this bot. Press **Save** to keep the changes.

If you switch the override off later, your choices are kept and come back when you switch it on again.

### Events

DCA and Combo bots:

- Deal opened
- Safety order filled (Telegram only)
- Deal partially closed
- Deal closed (take profit, stop loss or closed by hand)
- 80% of DCA used
- 100% of DCA used
- Bot error
- Bot warning
- Started / stopped by controller

Grid bots: Grid closed, Price out of range, Bot error, Bot warning, Started / stopped by controller.

Account-wide alerts such as Daily Profit stay in **Settings → Notification Preferences** and cannot be set per bot.

### Paper bots

Paper bots send no alerts by default, so your account settings, written for live trading, don't flood you with paper alerts. A paper bot sends alerts only when **its own** Notifications override is switched on. Those alerts start with **(paper)**. The one exception is **Price out of range** on paper Grid bots, which is never sent.

## Connect your own Telegram bot (optional)

By default, alerts come from the Gainium bot. You can instead create your own Telegram bot, for example one per strategy, so each bot's messages arrive in a separate chat.

### Create the bot in Telegram

1. In Telegram, open **@BotFather** and send `/newbot`.
2. Choose a name and a username for your bot.
3. BotFather replies with a **token** (it looks like `123456789:ABC...`). Copy it.

### Connect it to Gainium

You can connect a Telegram bot at two levels:

- **For your whole account:** **Settings → Notification Preferences → Own Telegram bot**. Paste the token and press **Connect**.
- **For one bot:** in the bot's **Notifications** section, set **Telegram alerts are sent by** to **This bot's own Telegram bot**. Paste the token and press **Save** next to it, then save the bot so it uses that Telegram bot. On a bot you are still creating, the token is connected when you create the bot.

![Connecting a bot's own Telegram bot in the Notifications section](https://content.gainium.io/images/content/help/bot-notifications__own-bot.webp)

Then link it:

1. Press **Open in Telegram**. Your bot opens in Telegram.
2. Press **Start**. The status in Gainium changes from **Not linked yet** to **Linked**.

The link is single-use and expires after 15 minutes. If it expired, press **Open in Telegram** again for a new one.

In a bot's Notifications section, **Telegram alerts are sent by** offers three choices: **Gainium bot**, **My account's own Telegram bot** and **This bot's own Telegram bot**.

Good to know:

- **One Telegram bot, one place.** A Telegram bot can be connected to one Gainium bot or to one account, not both and not twice. For another place, create another bot with @BotFather.
- **The token is never shown again.** Gainium stores it encrypted and never displays it. To change it, use **Replace** and paste a new one.
- If Telegram stops accepting the token (for example, you revoked it in @BotFather), the status shows **Token no longer valid**. Replace it with a new token.

### Disconnect

- **Account bot:** in Settings, press **Remove** and confirm. Bots that used it go back to the Gainium bot.
- **A bot's own Telegram bot:** in the bot's Notifications section, press **Remove**, then **Save**. The bot goes back to the Gainium bot.

## Telegram commands

These work in the Gainium bot and in your own Telegram bots. Type `/` in the chat to see the menu.

| Command | What it does |
|---|---|
| `/menu` | Your bots as buttons. In a bot's own Telegram bot, it opens that bot directly. |
| `/bots` | Same as `/menu`. |
| `/deals` | Your open deals as buttons. |
| `/pnl [period]` | Realised P&L and your top 5 bots. Periods: `today`, `7d`, `30d`, `all`, also as buttons under the answer. |
| `/status [name]` | One bot as a text summary. |
| `/help` | The command list. |

The Gainium bot and your account's own Telegram bot answer about your whole account, live and paper (paper bots are marked "(paper)"). A bot's own Telegram bot answers about that bot only.

### Navigate by tapping

- **Bot list:** active bots first, 8 per page, each with its status and today's realised P&L. **Stopped bots** shows the others.
- **Bot card:** type and pairs, status, open deals, unrealised and realised P&L, and a settings summary (TP, SL, max deals, base order, DCA order, start condition). It also shows whether **Changes from Telegram** are on or off. Buttons lead to deals, settings, start/stop, reload, new deal and P&L.
- **Deal card:** pair, side, age, average price, size, unrealised P&L, realised P&L, TP and SL with their distance from the price, and DCA orders filled.
- **Chart:** on a deal card, tap **🖼 Chart** to get a chart of the deal. It shows the entry, the average price, TP and SL, the open DCA orders, and markers for every fill (DCA, added or reduced funds, TP).

![Deal chart sent to Telegram, with fill markers](https://content.gainium.io/images/content/help/bot-notifications__deal-chart.webp)

Messages update in place as you tap, so the chat stays short.

## Make changes from Telegram

### Turn it on for each bot

Changes are **off by default**. To allow them, open the bot's **Notifications** section and turn on **Allow Telegram commands that change this bot**. This switch saves immediately and is separate from the notifications override. You can allow changes without customising the bot's alerts.

![The "Allow Telegram commands that change this bot" switch](https://content.gainium.io/images/content/help/bot-notifications__telegram-changes.webp)

While the switch is off, Telegram still shows the bot, its deals and P&L. Tapping a change button tells you changes are off and gives you a link to the bot's settings.

### What you can change

**Bot settings** (DCA and Combo bots, from **⚙️ Settings** on the bot card):

- Take profit: on/off and TP %
- Stop loss: on/off and SL %
- DCA: on/off, DCA order size, and on DCA bots the number of DCA orders and the DCA step
- Max open deals
- Base order size
- Start condition: On or Off. Off means Manual. On means your start indicators if the bot has them, otherwise ASAP. TradingView and Timer start conditions are shown but can't be changed here.

**Bot settings apply to new deals only.** Open deals keep their own levels. To change an open deal, use the deal card.

**A deal** (from the deal card):

- **🎯 Set TP** and **🛑 Set SL**
- **📶 DCA step** and **💵 DCA order** size (DCA deals)
- **➕ Add funds** and **➖ Reduce funds** (DCA deals): +25/50/100% or −25/50/75% of the position, or an amount
- **❌ Close deal**: at market or by limit

**The bot:**

- **▶️ Start bot**
- **⏹ Stop bot**, then choose what happens to its deals: leave them open, close them at market, or cancel orders. For Grid bots: cancel orders or close at market.
- **🔁 Reload bot**: restarts the bot and reloads its settings, orders and deals. Open deals stay open.
- **➕ New deal** (running DCA and Combo bots). On a multi-pair bot, pick the pair or let the bot choose.

Values come as preset buttons, and the current value is always shown. **Custom** lets you reply with any number, for example `2.5` (a comma or a `%` sign works too).

### Every change asks for confirmation

Nothing happens when you tap a change button. First you get a confirmation that shows the bot (and "(paper)" if it is a paper bot), the deal, and the value **before → after**. Then you tap **✅ Confirm** or **✖ Cancel**. Paper bots ask for confirmation too.

- A confirmation is valid for **60 seconds** and works **once**. A second tap, or a tap from another device, does nothing more.
- If it expired, nothing was changed. Start again from the menu.
- Changes to a price level (TP, SL, DCA step, DCA order size) come with the deal chart: the **current** level is a solid line, and the **new** level is a dashed line. For bot-level TP and SL, the chart uses the bot's newest open deal to show what a new deal would get.

![TP change confirmation: current level solid, new level dashed](https://content.gainium.io/images/content/help/bot-notifications__tp-confirm.webp)

Each change goes through the same checks as the dashboard. If a value is refused, Telegram shows the reason.

### Where changes are recorded

Every confirmed change is written to the bot's event log as a **Telegram** entry, for example "Deal BTCUSDT TP 1.50% → 2.00% (from Telegram)", so you can always see what was changed from Telegram and when.

## Limits

- **Hedge DCA and Hedge Combo bots** are read-only in Telegram: card, deals, deal charts and P&L, but no changes. They don't have a Notifications section in the bot form yet.
- **Grid bots:** from Telegram, you can start, stop and reload them. Their settings can't be changed there.
- **Combo deals:** TP, SL and close work. Add/reduce funds and DCA step/size don't, because a Combo deal's DCA is its grid.
- **Editing DCA levels** works only on deals with a percentage DCA ladder. Deals using custom, indicator-based or ATR-based DCA levels, and deals with every DCA order already filled, can't be edited from Telegram.
- **Rate limits:** a chat can send about 40 messages or taps a minute. Beyond that, the bot asks you to wait a minute. You can confirm up to 10 changes every 10 minutes in one chat.
- **Group chats are not supported.** Use a private chat with the bot.

## Security

- Your Telegram bot answers only your linked chat and your Telegram account. Messages and button taps from anyone else are ignored.
- Buttons expire. Menus last 15 minutes, and confirmations last 60 seconds.
- Nothing you can change from Telegram works on a bot until you turn on its switch, and every change still needs your confirmation.

## Troubleshooting

- **Buttons say "Changes from Telegram are off for this bot".** Turn on **Allow Telegram commands that change this bot** in that bot's Notifications section. Use the **⚙️ Open bot settings** button in the message to get there.
- **"This menu expired — send /menu".** Menus last 15 minutes. Send `/menu` to get a fresh one.
- **"This confirmation expired — nothing was changed."** You took longer than 60 seconds. Make the change again.
- **No alerts from a paper bot.** Paper bots only send alerts when their own Notifications override is on. Switch it on and tick the events you want.
- **My own Telegram bot doesn't answer.** Check that its status in Gainium is **Linked**. If it shows **Not linked yet**, press **Open in Telegram**, then **Start**. If it shows **Token no longer valid**, replace the token. Also check you're writing from the Telegram account you linked, in a private chat.
- **The Gainium bot doesn't answer.** Check **Settings → Notification Preferences** shows your Telegram as connected. See [Telegram notifications](https://gainium.io/help/telegram-notifications).
