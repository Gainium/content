---
id: 142
name: Sessions Indicator
slug: sessions
description: >-
  Learn how to use the Sessions indicator in Gainium to filter bot trading
  signals by day of the week and time of day, and to trade the previous
  session's high, low, midpoint, open or close with the Price levels rule.
createdAt: '2026-04-07T12:00:00.000Z'
updatedAt: '2026-10-24T12:00:00.000Z'
publishedAt: '2026-04-07T12:00:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags:
  - indicator
  - filter
  - session-levels
ingested: false
ingestedAt: ''
tldr: >-
  The Sessions indicator filters trading signals by day of the week and,
  optionally, time of day in a time zone you pick. Choose a market session
  (Sydney, Tokyo, London, New York, US stock market) or set your own hours.
  The In session and Out of session rules filter by time; the Price levels
  rule compares session prices — for example, buy when price crosses above
  the previous session's high during the New York session.
kind: native
catalogKeys:
  - SESSION
category: structure
aliases:
  - "Sessions"
  - "Session"
  - "Session Selector"
  - "Trading Sessions"
---

The **Sessions** indicator works with the trading sessions of the day. It checks the current day and time against a schedule you define, on the clock of the time zone you choose, and can be used in two ways:

- **As a time filter** — the **In session** and **Out of session** rules only let signals through when the market is inside, or outside, your trading window.
- **As a price signal** — the **Price levels** rule compares prices taken from the sessions themselves, such as the previous session's high or the current session's open, and is true when your condition is met during the session.

Crypto markets run 24/7, but not every hour is equally liquid or volatile. The Sessions indicator gives you precise control over when your strategy is active, and lets it react to the levels each session leaves behind.

## Why Use Sessions?

Different times of day and days of the week exhibit different market characteristics. For example, volume and volatility tend to spike when the US or European equity markets open, and can thin out during weekends. By restricting your bot to specific sessions you can avoid low-liquidity periods prone to erratic price action, concentrate activity during high-volume hours where spreads are tighter, align your crypto bot with traditional-market session overlaps (e.g., the London–New York overlap), and keep weekends free if your strategy relies on institutional flow.

Sessions also leave reference prices that many traders watch: the previous session's high and low (the range it traded in), its midpoint, and where the current session opened. Breakouts above a previous session high, or returns to its midpoint, are common intraday setups — the **Price levels** rule turns them into bot conditions.

## How to Configure the Sessions Indicator in Gainium

### Step 1: Add the Sessions Indicator

Navigate to your bot settings, open the indicator list, and select **Session Selector** from the **Filter** category. Searching for "Session" finds it quickly.

### Step 2: Pick a Session

The **Session** field fills in the hours and time zone of a market session:

| Session | Hours (local) | Time zone |
|---|---|---|
| Sydney | 07:00–16:00 | Australia/Sydney |
| Tokyo | 09:00–18:00 | Asia/Tokyo |
| London | 08:00–17:00 | Europe/London |
| New York | 08:00–17:00 | America/New_York |
| US stock market | 09:30–16:00 | America/New_York |

**All day** clears the hours, so only the selected days matter. **Custom** gives you hours to edit; changing the hours of a preset also makes it custom.

### Step 3: Adjust Start, End and Time Zone

**Start** and **End** are local times in the selected **Time zone**. The session opens at Start and closes at End (End itself is outside the session). Because the times are local, a session follows its market's daylight-saving changes: the New York session opens at 08:00 New York time all year, which is 12:00 UTC in summer and 13:00 UTC in winter.

An End earlier than Start is an **overnight session** (for example 22:00–02:00). The part after midnight belongs to the day the session opened, so a Friday 22:00–02:00 session keeps running into Saturday morning even if Saturday is not selected.

### Step 4: Select Active Days

Use **Session Days** to choose which days of the week the session runs. Days are read in the session's time zone. The default is Monday through Friday.

### Step 5: Choose the Session Rule

The **Rule** field determines how the indicator behaves:

- **In session** — the indicator condition is **true** only inside the session (selected days, and hours when set). Use this when you want the bot to trade only within the session.
- **Out of session** — the indicator condition is **true** only **outside** the session. Use this to invert the filter, for example to run a different strategy during off-hours.
- **Price levels** — compares two session prices with a condition, and is **true** only when the condition is met **during** the session. See the next section.

### On the Chart

With **In session**, the chart shades every candle the session touches (with **Out of session**, the time outside it), on any timeframe: on a 1-hour chart you see the session's hours, on a daily chart the days it runs. With **Price levels**, the shading shows the session — the only time the rule can fire.

## The Price Levels Rule

**Price levels** compares a value **A** (the **Compare** field) with a value **B** (the **With** field) using a **Condition** — for example, *Price* **crossing up** *Previous session high*. When you pick it, four more fields appear under the rule.

![Session Selector settings with the Price levels rule: Session New York 08:00–17:00 in the New York time zone, Interval 15 minutes, Compare Price, Condition Crossing up, With Previous session high, Session Days Monday to Friday](https://content.gainium.io/images/content/help/sessions__price-levels-settings.webp)

### Interval

**Interval** is the candle timeframe the session prices are read from (default **15 minutes**).

A candle belongs to a session when it **opens** inside the session. That is why a smaller interval tracks the edges of a session more exactly. With the **US stock market** session (09:30–16:00 New York), 15-minute candles start exactly at 09:30, so the session's open, high and low include its first half hour. With a 1-hour interval the first candle that opens inside the session is the 10:00 one, so the 09:30–10:00 move is not part of the session's prices. An interval longer than the session itself may leave no candle opening inside it at all, and the rule never fires.

Use 15 minutes or less for sessions with hours, and keep longer intervals for whole-day sessions (**All day**), where each selected day is its own session.

### Compare and With

Both fields offer the same values:

| Value | What it is |
|---|---|
| **Price** | the close of the latest candle |
| **Previous session open** | the open of the first candle of the last completed session |
| **Previous session high** | the highest high of the last completed session |
| **Previous session midpoint** | halfway between the previous session's high and low |
| **Previous session low** | the lowest low of the last completed session |
| **Previous session close** | the close of the last candle of the last completed session |
| **Current session open** | the open of the first candle of the session in progress |
| **Current session midpoint** | halfway between the high and the low of the session in progress so far — it moves whenever the session makes a new high or low |

The defaults are **Compare: Price** and **With: Previous session high**.

A few things decide what "previous" and "current" mean:

- **Previous session = the last completed session.** A session is complete once a candle arrives outside it. During Tuesday's New York session, the previous session is Monday's; on Monday it is Friday's (with Monday–Friday selected). Between sessions, the previous session is the one that just ended.
- **Current session open and Current session midpoint only exist while a session is running.** Outside the session they have no value. The midpoint is built from the session's candles so far, including the latest one, so price crossing it works like crossing a moving average.
- **A session the indicator only saw part of is skipped.** If the candle history starts in the middle of a session, that session never becomes a "previous session" — its high and low would be incomplete. The previous-session values appear once a session seen from its open has ended.
- When either value has no value — no completed session yet, or Current session open outside a session — the condition is **false**. Comparing a value with itself is also always false.

### Condition

- **Crossing up** — Compare was below With on the previous candle and is at or above it on the latest candle.
- **Crossing down** — Compare was above With on the previous candle and is at or below it on the latest candle.
- **Greater than** — Compare is above With on the latest candle.
- **Lower than** — Compare is below With on the latest candle.

**A crossing never counts on the candle where the session values roll over.** When a session ends, every previous-session value jumps to the new session's figures, and when a new session starts, Current session open appears. A crossing only counts when both candles belong to the **same session** and see the **same previous session**, so a level moving because the session changed is never mistaken for price crossing it.

### Only During the Session

The Price levels rule is **true only during the session** you configured. Outside the session window — outside the hours, or on a day that isn't selected — it is false, whatever Compare and With are. The session that provides the levels is also the one in which the rule can fire, so "price crosses above the previous New York high" can only trigger during a New York session.

### Reading Price Levels on the Chart

![BTC/USDT 15-minute chart with the Session indicator on Price levels: the New York session shaded, the Price line in orange following the closes, and the Previous session high in purple stepping to a new level after the session ends](https://content.gainium.io/images/content/help/sessions__price-levels-chart.webp)

On the bot's chart, the indicator draws the two compared values as lines:

- **Orange** — **Compare** (here, Price: it follows the candle closes).
- **Purple** — **With** (here, the Previous session high).

The shaded band is the session. Previous-session lines stay flat while a session runs and step to the new values once it has ended, with a one-candle gap at the change — the same rollover on which crossings are not counted. Current session open and midpoint lines only appear while a session is running; the midpoint line moves as the session makes new highs and lows.

## Using Sessions in Bot Trading

### Strategy 1: Weekday-Only Trading

The simplest use case: enable Monday through Friday and disable Saturday and Sunday. All other indicators in your bot will only receive signals during weekdays, effectively pausing the bot over the weekend.

#### Implementation in Gainium
- Add the Sessions indicator and keep the default days (Mon–Fri).
- Set the rule to **In session**.
- Place it alongside your entry indicators — the bot will only open deals when both the session filter and your technical conditions are met.

### Strategy 2: Session-Specific Scalping

Target a narrow, high-liquidity window for a scalping strategy:

#### Implementation in Gainium
- Keep **Monday** through **Friday**.
- Choose **Custom** and set **08:00–12:00** in the **New York** time zone (roughly the London–New York overlap, kept aligned through daylight saving).
- Combine with a short-interval RSI or Bollinger Bands indicator to catch quick mean-reversion moves during peak volume.

### Strategy 3: Weekend Mean-Reversion

Crypto-specific: use the **Out of session** rule to trade only on weekends, where reduced volume can lead to extended ranges that eventually revert.

#### Implementation in Gainium
- Select Mon–Fri as session days, then set the rule to **Out of session**.
- Pair with a Support & Resistance or Bollinger Bands indicator tuned for wider bands to capture weekend range extremes.

### Strategy 4: New York Breakout Above the Previous Session High

Buy when price breaks above the high of the previous New York session while New York is trading.

#### Implementation in Gainium
- **Session**: New York 08:00–17:00 · **Session Days**: Mon–Fri
- **Rule**: Price levels · **Interval**: 15 minutes
- **Compare**: Price · **Condition**: Crossing up · **With**: Previous session high
- Use it as the **Deal start condition**. The deal opens on the first 15-minute close at or above the previous session's high during the New York session; a break that happens overnight does not trigger it.

### Strategy 5: Mean Reversion to the Previous Session Midpoint

When price falls below the previous session's range, buy and aim for a return to its middle.

#### Implementation in Gainium
- **Deal start condition** — Session indicator: **Session** London 08:00–17:00 · **Rule** Price levels · **Interval** 15 minutes · **Compare** Price · **Condition** Crossing down · **With** Previous session low.
- **Take profit condition** — Indicators, with a second Session indicator using the same session and **Compare** Price · **Condition** Crossing up · **With** Previous session midpoint.
- Keep a stop loss: price that leaves the previous range does not have to come back.

### Strategy 6: Trade With the Session's Direction

Use the current session's open as a bias filter: only buy while the session is trading above where it opened.

#### Implementation in Gainium
- **Session**: US stock market 09:30–16:00 · **Rule**: Price levels · **Interval**: 15 minutes (so the session open is the 09:30 candle)
- **Compare**: Price · **Condition**: Greater than · **With**: Current session open
- Combine it with your entry indicator — for example an RSI pullback — so the bot buys dips only on days when the session is up. Outside the session the filter is false, so no deals open.

### Combining a Time Filter With Price Levels

A bot can have one **In session** or **Out of session** filter and, at the same time, one or more Session indicators on **Price levels** — each with its own session, interval and condition. For example, to take Strategy 4's breakout only in the first two hours of the New York session:

- Session indicator 1: **Custom** 08:00–10:00, **New York** time zone, **Rule** In session.
- Session indicator 2: **New York** 08:00–17:00, **Rule** Price levels, **Compare** Price **Crossing up** Previous session high.

With both in the deal start conditions, a deal opens only when price crosses the previous New York high between 08:00 and 10:00 New York time. The previous session high still comes from the full 08:00–17:00 session of indicator 2.

## Practical Considerations

### 1. Times Follow the Chosen Time Zone
Start, End and the session days are read in the selected time zone, including its daylight-saving changes. Choose **UTC** if you want a session that never shifts.

### 2. In/Out Session Is a Filter, Price Levels Is a Signal
**In session** and **Out of session** do not generate buy or sell signals on their own — combine them with technical indicators that define your actual entry and exit logic. **Price levels** can be an entry or exit signal in its own right, and works well together with other indicators too.

### 3. Midnight Crossover
If your session spans midnight (e.g., 22:00–02:00), set it as one session with End before Start. There is no need to split it into two. For Price levels, the whole overnight session is one session, so its high and low span both sides of midnight.

### 4. Pick the Interval for the Session, Not the Chart
For Price levels, the Interval decides which candles count as part of the session. Keep it small enough that a candle opens at the session's start (15 minutes covers every preset), and remember a short session on a long interval may contain no candles at all.

### 5. Backtest with Sessions Enabled
Time-of-day effects can significantly change backtest results. Always re-run your backtest after adding a Sessions indicator to see how restricting the trading window, or trading session levels, affects performance.

## Conclusion

The **Sessions** indicator is a straightforward but powerful tool for any Gainium trading bot. Use **In session** and **Out of session** to define exactly when your strategy is allowed to act — by day, by hour, or both — and **Price levels** to trade the reference prices each session leaves behind: its high, low, midpoint, open and close. Pair it with your favorite technical indicators and backtest thoroughly to find the session windows and levels that work best for your strategy.
