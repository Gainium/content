---
id: 142
name: Sessions Indicator
slug: sessions
description: >-
  Learn how to use the Sessions indicator in Gainium to filter bot trading
  signals by day of the week and time of day, restricting activity to your
  preferred trading sessions.
createdAt: '2026-04-07T12:00:00.000Z'
updatedAt: '2026-04-07T12:00:00.000Z'
publishedAt: '2026-04-07T12:00:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags:
  - indicator
  - filter
ingested: false
ingestedAt: ''
tldr: >-
  The Sessions indicator filters trading signals based on the day of the week
  and time ranges (UTC). Enable or disable individual days, set custom start and
  end times for each, and choose whether the bot should trade inside or outside
  the configured sessions.
---

The **Sessions** indicator is a time-based filter that lets you restrict when your trading bot is allowed to act. Instead of analyzing price data, it checks the current day and time (in UTC) against a schedule you define, and only allows signals through when the market is inside — or outside — your configured trading windows.

Crypto markets run 24/7, but not every hour is equally liquid or volatile. The Sessions indicator gives you precise control over when your strategy is active, so you can target the periods that best suit your edge.

## Why Use a Sessions Filter?

Different times of day and days of the week exhibit different market characteristics. For example, volume and volatility tend to spike when the US or European equity markets open, and can thin out during weekends. By restricting your bot to specific sessions you can avoid low-liquidity periods prone to erratic price action, concentrate activity during high-volume hours where spreads are tighter, align your crypto bot with traditional-market session overlaps (e.g., the London–New York overlap), and keep weekends free if your strategy relies on institutional flow.

## How to Configure the Sessions Indicator in Gainium

### Step 1: Add the Sessions Indicator

Navigate to your bot settings, open the indicator list, and select **Session Selector** from the **Filter** category.

### Step 2: Select Active Days

Use the **Session Days** multi-select field to choose which days of the week the session is active. Days are numbered Sunday (0) through Saturday (6). The default selection is Monday through Friday (1–5), which mirrors traditional market days.

### Step 3: Choose the Session Rule

The **Rule** field determines how the filter behaves:

- **In session** — the indicator condition is **true** only during the selected days (and time windows, if configured). Use this when you want the bot to trade only within the session.
- **Out of session** — the indicator condition is **true** only **outside** the selected days/times. Use this to invert the filter, for example to run a different strategy during off-hours.

### Step 4: Set Time Ranges (Advanced)

Each enabled day can have its own start and end time, specified in **HH:MM UTC** format. This lets you narrow activity to specific hours within a day — for example, only trading Monday between 13:00 and 21:00 UTC to capture the New York session.

The indicator supports **midnight crossover**: setting a start time of 22:00 and an end time of 02:00 correctly spans across midnight.

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
- Enable only **Monday** through **Friday**.
- Set each day's time range to **13:00–17:00 UTC** (the London–New York overlap).
- Combine with a short-interval RSI or Bollinger Bands indicator to catch quick mean-reversion moves during peak volume.

### Strategy 3: Weekend Mean-Reversion

Crypto-specific: use the **Out of session** rule to trade only on weekends, where reduced volume can lead to extended ranges that eventually revert.

#### Implementation in Gainium
- Select Mon–Fri as session days, then set the rule to **Out of session**.
- Pair with a Support & Resistance or Bollinger Bands indicator tuned for wider bands to capture weekend range extremes.

## Practical Considerations

### 1. All Times Are UTC
The Sessions indicator works entirely in UTC. Make sure to convert your local timezone when configuring start and end times.

### 2. Combine with Other Indicators
Sessions is a **filter** — it does not generate buy or sell signals on its own. Always combine it with one or more technical indicators that define your actual entry and exit logic.

### 3. Midnight Crossover
If your session spans midnight (e.g., 22:00–02:00), the indicator handles this correctly. There is no need to split the session into two separate entries.

### 4. Backtest with Sessions Enabled
Time-of-day effects can significantly change backtest results. Always re-run your backtest after adding a Sessions filter to see how restricting the trading window affects performance.

## Conclusion

The **Sessions** indicator is a straightforward but powerful filter for any Gainium trading bot. By defining exactly when your strategy is allowed to act — by day, by hour, or both — you can avoid unfavorable market conditions and focus your bot on the periods where your edge is strongest. Pair it with your favorite technical indicators and backtest thoroughly to find the session windows that work best for your strategy.
