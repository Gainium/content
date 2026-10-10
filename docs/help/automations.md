---
id: 1045
name: Automations
slug: automations
description: >-
  Run actions automatically when market, account or webhook conditions are met:
  start or stop bots, open or close deals, set global variables, send
  notifications or webhooks.
createdAt: '2026-10-10T00:00:00.000Z'
updatedAt: '2026-10-10T00:00:00.000Z'
publishedAt: '2026-10-10T00:00:00.000Z'
locale: en
categories:
  - platform
  - walkthrough-guides
difficulty: intermediate
tags:
  - automation
  - bot
  - notifications
tldr: >-
  An automation runs actions when its conditions become true. Conditions can be
  price, indicators, your Gainium P&L today, the screener, the Fear & Greed
  Index, an incoming webhook or an exchange balance, combined in groups with
  ANY/ALL and AND/OR. Actions start or stop bots, open or close deals, send
  notifications or webhooks, or set global variables. The fire mode (Re-arm,
  Once or Cooldown) decides how often it can run. It costs 10 credits plus 1–2
  per condition and 2 per action (notifications are free), locked only while
  the automation is active. Automations are in alpha on Gainium Cloud and
  enabled for selected accounts.
---

> **Alpha.** Automations are in alpha on Gainium Cloud and are being enabled for selected accounts. If you don't see **Automations** in the sidebar, it isn't enabled for your account yet. Things may change while we collect feedback.

An **automation** is a rule you write once and Gainium keeps watching for you: **When** something happens, **Then** do something. For example:

- When BTC crosses above 70,000, send me a Telegram message.
- When RSI on the 1h chart drops below 30 on any of my three coins and the Fear & Greed Index is under 25, start my DCA bot.
- When my TradingView alert fires, stop my grid bot and close its deals.

Each automation has three parts:

| Part | What it does |
|---|---|
| **When** | One or more conditions, grouped with ANY/ALL and AND/OR |
| **Then** | One or more actions, run in order (up to 3 on Free, 10 on paid plans) |
| **Fire** | How often it may run: Re-arm, Once or Cooldown |

Every automation is either **paper** or **live**. The list follows the dashboard's paper/live mode, and each action that touches a bot also says whether it targets a paper or a live bot.

<!-- Screenshot: automations__list.webp — Automations page: list with name, paper/live chip, state badge, When/Then summaries, last fired, cost, active switch -->

## Creating an automation

1. Open **Automations** in the sidebar and click **New automation**.
2. Give it a name and choose paper or live.
3. Under **When**, add your conditions (see below).
4. Under **Then**, add your actions.
5. Under **Fire**, choose how often it may run.
6. Click **Check now** to see what it would do right now, without running anything.
7. Click **Save** to keep it paused, or **Save & activate** to start it.

Credits are locked when you activate it and released when you pause it. The cost is shown in the builder footer while you edit.

<!-- Screenshot: automations__builder.webp — Builder: When groups with live values per condition, Then actions, Fire selector, cost chip and Check now / Save buttons in the footer -->

## Conditions (When)

Each condition shows its live value next to it, with a dot: **green** when it's true, **grey** when it's false and **amber** when Gainium doesn't know yet (hover the dot to see why). An automation only fires when the whole When section is **true**. If Gainium can't tell — the data is missing or too old — it waits rather than guessing.

### Price

Compare the live price of a pair on an exchange to a value: **greater than**, **less than**, **crosses up** or **crosses down**.

- Prices are live. If no new price has arrived for 5 minutes, the condition becomes unknown until prices flow again.
- Price conditions have no paper/live setting, because paper bots trade on real prices too.

### Indicator

Compare an indicator on one or more coins, using the same indicator editor as your bots. Automations support **the same indicators as bot conditions, with the same options** — percentile, trend filter, keep condition for N bars, moving average versus another moving average, cross oscillator and the rest — and they are evaluated exactly the way your bots evaluate them. When a new indicator becomes available for bots, it is available here too.

Two bot conditions are not available, because they need a running bot: **unrealized P&L** (it reads the bot's open deals) and **trading session**.

- Indicators are checked on **closed candles**, the same way your bots check them, so most conditions need two closed candles before they have a result.
- Add several coins and choose **any** (one coin is enough) or **all** (every coin must match).
- If no new candle arrives for three candle lengths, the condition becomes unknown.
- ADR always uses daily candles, whatever timeframe you choose.

### Gainium P&L today

Compare your **realized** profit for today, in USD, to a value (greater than or less than; it can be negative). Choose paper or live.

- "Today" is the **UTC day**: it starts at 00:00 UTC, whatever your time zone.
- It counts only profit from deals of your **Gainium bots**, not trades you made elsewhere.
- It updates about once a minute, and right after an automation closes a deal.

Example: *When my live P&L today is less than −100, stop all my bots.*

### Screener

Use the [screener](https://gainium.io/help/master-the-screener-for-volatility-volume-and-breakout-trading) as a condition. Add up to 5 numeric filters (price, price change over 1h / 24h / 7d / 30d / 1y, market cap, market cap change over 24h, market cap rank, volume, volume change, distance from all-time high or low, volatility, sentiment, liquidity score). All filters must hold. Then choose:

- **Coin matches** — a specific coin passes all filters;
- **At least N coins match**;
- **At most N coins match**.

Screener results refresh every 5 minutes.

### Fear & Greed Index

Compare the crypto Fear & Greed Index (0 = extreme fear, 100 = extreme greed): greater than, less than, crosses up or crosses down.

- The index is **daily**: there is one new reading a day, so this condition changes at most once a day.
- A cross compares today's reading with the previous day's: it happens when today's value is on the other side of your value from yesterday's.
- If no new daily reading has arrived for about 36 hours, the condition becomes unknown.

### Incoming webhook (paid plans)

Fire an automation from TradingView or any other tool that can send a web request.

- After you save, the condition shows your automation's **webhook URL** with a copy button. Before the first save it says *URL appears after saving*.
- A call to that URL makes the condition true for a **window** you choose: 1 to 1,440 minutes, 15 by default. This lets it combine with slower conditions — for example, "webhook received in the last 15 minutes AND RSI below 30".
- Optional **event name**: the condition only counts calls whose JSON body has `"event"` set to that name. One automation can have several webhook conditions listening for different events on the same URL.
- **The URL is the password.** Anyone who has it can trigger your automation, so don't share it or post it publicly. If it leaks, click **Regenerate**: you get a new URL and the old one stops working immediately.
- Calls are accepted only while the automation is active. Each URL accepts up to 30 calls a minute.

**TradingView example**

1. Create an automation with an incoming webhook condition and the event name `breakout`. Save it and copy the webhook URL.
2. In TradingView, create an alert. On the **Notifications** tab, tick **Webhook URL** and paste the URL.
3. In the alert **Message**, enter:

```json
{"event": "breakout"}
```

4. Activate the automation. When the alert fires, the condition is true for its window.

If you leave the event name empty, any call to the URL counts, whatever the message.

<!-- Screenshot: automations__webhook-condition.webp — Incoming webhook condition after saving: webhook URL with copy button, Regenerate button, window and event name fields -->

### Exchange balance (paid plans)

Compare a balance on one of your exchange connections to a value: choose the asset (for example USDT), **free** or **total** (free plus locked in orders), and greater than or less than. Choose paper or live.

- Automations use the balance Gainium last received from your exchange. They never ask your exchange for a fresh balance.
- **Stale data never triggers.** If the balance is more than 30 minutes old, the condition becomes unknown and the automation waits.
- If an old balance is the only thing stopping your automation from firing, you get a notification (at most once a day) asking you to open **Portfolio**, which refreshes your balances.
- If you don't hold the asset at all and the rest of that connection's balances are fresh, the balance counts as 0.

## Groups: ANY / ALL and AND / OR

Conditions live in **groups**:

- Inside a group, choose **ANY** (at least one condition is true) or **ALL** (every condition is true).
- Between groups, one switch chooses **AND** (every group is true) or **OR** (at least one group is true).

There is one level of grouping: groups can't contain other groups. That still covers most rules. For example, *(BTC above 70,000 **OR** ETH above 4,000) **AND** (Fear & Greed below 80)* is two groups — ANY and ALL — joined with AND.

If a condition is unknown, Gainium only fires when the result is certain anyway. "True OR unknown" is true; "true AND unknown" waits.

## Crosses and webhooks are moments

Most conditions are states — "price is above 70,000" stays true while it's above. **Crosses** and **incoming webhooks** are moments, so each one stays true for a short window to let it combine with other conditions:

| Condition | Stays true for |
|---|---|
| Price cross | 1 minute after the cross |
| Indicator signal | Until one more candle has closed, as in bots (longer with **keep condition for N bars**) |
| Fear & Greed cross | Until the next daily reading replaces it (about a day) |
| Incoming webhook | The window you set (1–1,440 minutes) |

A price cross needs Gainium to see the price on both sides of your value. Right after an automation is activated, the first price doesn't count as a cross.

## Actions (Then)

Actions run one after another, in the order you list them. If one fails, the rest still run, and the result of each is saved in the history.

| Action | What it does |
|---|---|
| **Start bot** | Starts a DCA, Combo or Grid bot |
| **Stop bot** | Stops a bot. Choose what happens to its deals: leave them open (DCA and Combo only), cancel, close by limit or close by market |
| **Start deal** | Opens a deal on a DCA or Combo bot. For a multi-pair bot, choose the pair |
| **Close deal** | Closes all, the oldest or the newest open deal of a DCA or Combo bot, by limit, by market or by cancelling |
| **Notify** | Sends a Telegram and/or email message, with your own text if you like |
| **Outgoing webhook** | Sends a request to a URL of your choice |
| **Set global variable** | Sets one of your [global variables](https://gainium.io/help/global-variables) to a new value. Bots that use it pick up the change |

**Paper or live.** Each bot action says whether it targets a paper or a live bot, and you can only pick bots of that kind. Global variables are shared between paper and live, so setting one affects both.

**Notify.** Messages go to the channels you choose in the action, as long as they're connected to your account (see [Telegram notifications](https://gainium.io/help/telegram-notifications)). There's no separate "automation fired" setting: a Notify action is how you choose to hear about a firing, and it decides its own channels.

**Automation notifications.** Besides Notify actions, Gainium tells you when an automation is paused for you and when an old balance is holding one back. Choose Telegram and/or email for each in **Settings → Notification Preferences**, under **Automations**. Both are on by default.

**Outgoing webhook.** The URL must use `https` on the standard port (443). The body is optional (up to 4 KB): leave it empty to send a JSON summary (automation name and id, time, paper/live and the condition values), or write your own JSON. Calls to private or internal addresses are refused, and so is a URL that points back at an automation webhook, so automations can't loop through each other.

You can use these placeholders in a Notify message or a webhook body: `{{automation.name}}`, `{{automation.id}}`, `{{firedAt}}` (time in UTC) and `{{paper}}` (`true` or `false`).

**Hedge bots** can't be used in actions yet.

## Fire modes

The fire mode decides what happens after an automation fires.

| Mode | Behaviour |
|---|---|
| **Re-arm** (default) | Fires when the conditions become true, then waits until they're false again before it can fire the next time. The badge shows *Waiting to re-arm* in between |
| **Once** | Fires one time, then pauses itself and releases its credits |
| **Cooldown** | Fires whenever the conditions are true, but at most once per cooldown period you set (at least 60 minutes on Free, 1 minute on paid plans). The badge shows *Cooling down* in between |

An "unknown" result never counts as false, so it never re-arms a Re-arm automation.

If the conditions are **already true when you activate** an automation, it fires straight away. That's intentional: you turned it on now. Editing an active automation also starts it fresh, so it can fire again right after you save.

## Check now and history

**Check now** evaluates the automation (or the unsaved draft) right now and shows:

- the live value and result of every condition;
- whether it would fire, and if not, why (not true, waiting to re-arm, cooling down, daily cap reached or paused);
- whether every action's bot or variable is still available to it.

Nothing is executed and nothing is saved. A condition you just added may show *warming up* for a moment while Gainium starts watching its data. You can run up to 10 checks a minute.

**History** (from the automation's menu) lists every firing for the last 90 days: when it fired, the value of each condition at that moment and the result of each action. When a firing was blocked by a daily cap, it's listed once that day as *skipped*.

<!-- Screenshot: automations__check-now.webp — Check now panel: per-condition values and results, would-fire verdict with reason, per-action availability -->

<!-- Screenshot: automations__history.webp — History drawer: one firing with its condition table and action outcomes -->

## Limits

Every paid plan has the same automation limits, including trials.

| | Free | Paid |
|---|---|---|
| Active automations | 2 | 25 |
| Saved automations (active or paused) | 10 | 100 |
| Conditions per automation | 3 | 20 |
| Groups per automation | 2 | 5 |
| Actions per automation | 3 | 10 |
| Coins per indicator condition | 3 | 20 |
| Shortest indicator timeframe | 1h | 5m |
| Shortest cooldown | 60 minutes | 1 minute |
| Firings per day (whole account, UTC day) | 20 | 200 |
| Firings per day (one automation) | 50 | 50 |
| Conditions | Price, indicator, Gainium P&L, screener, Fear & Greed | All, plus incoming webhook and exchange balance |
| Actions | Notify, start bot, stop bot | All, plus start/close deal, outgoing webhook and set global variable |

An indicator condition counts as one condition however many coins it watches.

## Credits

Like bots, automations lock [credits](https://gainium.io/help/bot-credit-system) while they're active and release them when paused. Paper and live automations cost the same.

| | Credits |
|---|---|
| Base, per automation | 10 |
| Price, Gainium P&L, Fear & Greed or incoming webhook condition | 1 each |
| Screener or exchange balance condition | 2 each |
| Indicator condition | 2 per coin |
| Notify action | 0 |
| Any other action | 2 each |

**Example 1 — price alert.** BTC crosses up 70,000 → Telegram message.
10 + 1 (price) + 0 (notify) = **11 credits**.

**Example 2 — buy the dip.** RSI 1h below 30 on 3 coins (any) AND Fear & Greed below 25 → start a DCA bot and notify.
10 + 6 (indicator, 3 coins × 2) + 1 (Fear & Greed) + 2 (start bot) + 0 (notify) = **19 credits**.

**Example 3 — TradingView exit (paid).** Incoming webhook → stop a bot, close its deals and set a global variable.
10 + 1 (webhook) + 2 + 2 + 2 = **17 credits**.

The builder shows the cost as you edit and turns red if your available credits can't cover it.

**When you don't have enough credits:**

- **Activating:** the automation stays paused and you see how many credits are needed and how many are available.
- **Editing an active automation:** the difference is locked when you save. If you can't cover it, the edit isn't saved and the previous version keeps running.
- **Your credits drop** (for example when your plan renews or changes): Gainium pauses automations **before** it stops any bot — paper automations first, then the most recently activated — until your locked credits fit your balance. They show *Paused – credits*.

## When automations pause themselves

An automation never deletes itself, and it never resumes on its own. Once you've fixed the cause, turn it back on with its switch; activating checks your limits and credits again.

| Badge | Why |
|---|---|
| **Paused** | You paused it, or a *Once* automation has fired |
| **Paused – inactive** | Free account with no login for 30 days |
| **Paused – plan limit** | Your plan changed and the automation uses paid-only features or exceeds a limit |
| **Paused – credits** | Its credits couldn't stay locked |
| **Error** | Repeated action failures, the safety limit below, or a bot or variable an action uses is no longer available |

Hover the badge to see the exact reason. You also get a notification when an automation is paused for you.

**Free accounts: 30 days of inactivity.** If you're on the Free plan and haven't logged in for 30 days, your active automations are paused, together with the bots that stop for inactivity. We email you before it happens; logging in keeps everything running.

**Moving to the Free plan.** Automations that use paid-only conditions or actions, or exceed a Free limit, are paused. If you still have more than 2 active, the 2 you activated earliest keep running. Upgrading again doesn't resume them automatically.

## Safety caps

These protect your account from runaway rules, including automations that trigger each other:

- **Daily caps:** see *Firings per day* in the limits table. A capped firing isn't lost — the automation stays armed and fires when the cap resets at 00:00 UTC, if its conditions are still true.
- **Same target, once a minute:** the same bot, deal, variable or webhook URL is acted on at most once every 60 seconds, even if several automations ask for it. Notify actions are exempt.
- **60 actions per hour:** your account runs at most 60 actions an hour across all automations (notifications don't count). If an automation has 3 firings in a row where every action was over this limit, it's paused with *Error*.
- **Failing actions:** if an automation has 5 firings in a row where every action failed, it's paused with *Error*.
- **Missing targets:** if a bot is deleted or a variable removed, the automation pauses the first time an action tries to use it. If the exchange connection of a balance condition is removed, that condition becomes unknown instead.

## FAQ

### Why didn't my automation fire?

Open **Check now** — it usually tells you. The common reasons:

- **A condition is unknown.** Its data is missing or too old: no price for 5 minutes, no new candle, no new daily Fear & Greed reading for about 36 hours, or a balance older than 30 minutes. Gainium waits instead of firing on old data. For balances, open **Portfolio** to refresh them.
- **It's waiting to re-arm.** A *Re-arm* automation fired earlier and its conditions haven't been false since.
- **It's cooling down.** A *Cooldown* automation fired less than one cooldown ago.
- **A daily cap was reached.** Check the history for a *skipped* entry.
- **It's paused.** Check the badge — inactivity, plan limit, credits or an error can pause it.
- **The cross was too quick or too early.** A cross is a moment. If your other conditions weren't true within its window, the whole rule wasn't true. A price cross also needs a price on each side after you activate.
- **Not enough credits.** It couldn't be activated, or it was paused when your credits dropped.

### It fired as soon as I turned it on. Is that a bug?

No. If the conditions are already true when you activate (or save an edit to) an automation, it fires on its first check.

### My webhook call returned an error.

Check the URL is the current one (did you regenerate it?) and that the automation is active — calls to a paused automation are refused. If you set an event name, the message must be JSON with a matching `"event"`; other calls are accepted but don't trigger that condition.

### Can an automation trade on its own?

Only through your bots. Automations start and stop bots and open and close their deals; they don't place orders by themselves.

### Does a paper automation use real credits?

Yes, paper automations lock credits just like paper bots.
