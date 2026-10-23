---
id: 142
name: Sessions Indicator
slug: sessions
description: >-
  Learn how to use the Sessions indicator in Gainium to filter bot trading
  signals by day of the week and time of day, restricting activity to your
  preferred trading sessions.
createdAt: '2026-04-07T12:00:00.000Z'
updatedAt: '2026-10-23T12:00:00.000Z'
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
  The Sessions indicator filters trading signals by day of the week and,
  optionally, time of day in a time zone you pick. Choose a market session
  (Sydney, Tokyo, London, New York, US stock market) or set your own hours, and
  whether the bot should trade inside or outside the session.
---

The **Sessions** indicator is a time-based filter that lets you restrict when your trading bot is allowed to act. Instead of analyzing price data, it checks the current day and time against a schedule you define, on the clock of the time zone you choose, and only allows signals through when the market is inside — or outside — your configured trading windows.

Crypto markets run 24/7, but not every hour is equally liquid or volatile. The Sessions indicator gives you precise control over when your strategy is active, so you can target the periods that best suit your edge.

## Why Use a Sessions Filter?

Different times of day and days of the week exhibit different market characteristics. For example, volume and volatility tend to spike when the US or European equity markets open, and can thin out during weekends. By restricting your bot to specific sessions you can avoid low-liquidity periods prone to erratic price action, concentrate activity during high-volume hours where spreads are tighter, align your crypto bot with traditional-market session overlaps (e.g., the London–New York overlap), and keep weekends free if your strategy relies on institutional flow.

## How to Configure the Sessions Indicator in Gainium

### Step 1: Add the Sessions Indicator

Navigate to your bot settings, open the indicator list, and select **Session Selector** from the **Filter** category.

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

The **Rule** field determines how the filter behaves:

- **In session** — the indicator condition is **true** only inside the session (selected days, and hours when set). Use this when you want the bot to trade only within the session.
- **Out of session** — the indicator condition is **true** only **outside** the session. Use this to invert the filter, for example to run a different strategy during off-hours.

### On the Chart

The chart shades every candle the session touches, on any timeframe: on a 1-hour chart you see the session's hours, on a daily chart the days it runs.

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

## Practical Considerations

### 1. Times Follow the Chosen Time Zone
Start, End and the session days are read in the selected time zone, including its daylight-saving changes. Choose **UTC** if you want a session that never shifts.

### 2. Combine with Other Indicators
Sessions is a **filter** — it does not generate buy or sell signals on its own. Always combine it with one or more technical indicators that define your actual entry and exit logic.

### 3. Midnight Crossover
If your session spans midnight (e.g., 22:00–02:00), set it as one session with End before Start. There is no need to split it into two.

### 4. Backtest with Sessions Enabled
Time-of-day effects can significantly change backtest results. Always re-run your backtest after adding a Sessions filter to see how restricting the trading window affects performance.

## Conclusion

The **Sessions** indicator is a straightforward but powerful filter for any Gainium trading bot. By defining exactly when your strategy is allowed to act — by day, by hour, or both — you can avoid unfavorable market conditions and focus your bot on the periods where your edge is strongest. Pair it with your favorite technical indicators and backtest thoroughly to find the session windows that work best for your strategy.
