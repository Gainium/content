---
id: 142
name: Sessions Indicator
slug: sessions
description: >-
  Learn how to use the Sessions indicator in Gainium to filter bot trading
  signals by day of the week and time of day, and to trade the previous
  session's high, low, midpoint, open or close with the Price levels rule.
createdAt: '2026-04-07T12:00:00.000Z'
updatedAt: '2026-10-25T00:00:00.000Z'
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
templateVersion: 2
tldr: >-
  The Sessions indicator (Session Selector in the bot form) filters trading
  signals by day of the week and, optionally, time of day in a time zone you
  pick. Choose a market session (Sydney, Tokyo, London, New York, US stock
  market) or set your own hours. The In session and Out of session rules
  filter by time; the Price levels rule compares session prices, for example
  buy when price crosses above the previous session's high during the New
  York session.
kind: native
catalogKeys:
  - SESSION
category: structure
aliases:
  - "Sessions"
  - "Session"
  - "Session Selector"
  - "Trading Sessions"
faq:
  - title: Do sessions follow daylight saving time?
    details: >-
      Yes. Start, End and the session days are read on the clock of the
      selected time zone. The New York session always opens at 08:00 New
      York time, which is 12:00 UTC under daylight saving time and 13:00 UTC
      outside it. Choose UTC for a session that never shifts.
  - title: How do I set an overnight session?
    details: >-
      Set an End earlier than Start, for example 22:00–02:00. The part after
      midnight belongs to the day the session opened, so a Friday 22:00–02:00
      session runs into Saturday morning even if Saturday is not selected.
  - title: What counts as the previous session?
    details: >-
      The last completed session. A session is complete once a candle arrives
      outside it. During Tuesday's New York session the previous session is
      Monday's; on Monday it is Friday's, with Monday to Friday selected. A
      session the indicator only saw part of is skipped.
  - title: Why does my Price levels condition never fire?
    details: >-
      Check three things. The rule is only true during the session. A
      crossing never counts on the candle where the session values roll
      over. An interval longer than the session may leave no candle opening
      inside it, so use 15 minutes or less for sessions with hours.
  - title: Can I use two Session indicators in one bot?
    details: >-
      Yes. A bot can have one In session or Out of session filter and, at the
      same time, one or more Session indicators on Price levels, each with its
      own session, interval and condition.
related:
  - price-change-indicator
  - support-resistance-indicator
  - adr
sources:
  - title: Binance BTC/USDT 15m and 1h candles, computed with Gainium's indicator engine
---

The Sessions indicator checks the current day and time against a schedule you set, on the clock of a time zone you pick. Traders use it two ways: as a time filter that only lets a bot trade inside (or outside) a session, and as a price signal on the levels a session leaves behind, such as the previous session's high.

## What is the Sessions indicator

Crypto trades 24/7, but volume and volatility are not spread evenly. They rise when European and US equity markets open and thin out at weekends. A trading session is a window of the day, like the London session from 08:00 to 17:00 London time, and sessions leave reference prices that intraday traders watch: the previous session's high, low and midpoint, and where the current session opened.

**The schedule.** The **Session** field fills in the hours and time zone of a market session:

| Session | Hours (local) | Time zone |
|---|---|---|
| Sydney | 07:00–16:00 | Australia/Sydney |
| Tokyo | 09:00–18:00 | Asia/Tokyo |
| London | 08:00–17:00 | Europe/London |
| New York | 08:00–17:00 | America/New_York |
| US stock market | 09:30–16:00 | America/New_York |

**All day** clears the hours, so only the selected days matter. **Custom** gives you hours to edit; changing the hours of a preset also makes it custom. Start and End are local times in the selected **Time zone**: the session opens at Start and closes at End, and End itself is outside it. Because the times are local, a session follows its market's daylight-saving changes. An End earlier than Start is an overnight session (22:00–02:00), and the part after midnight belongs to the day it opened. **Session Days** are read in the session's time zone; the default is Monday to Friday.

**The rules:**

- **In session:** true only inside the session (selected days, and hours when set).
- **Out of session:** true only outside it.
- **Price levels:** compares a value **A** (**Compare**) with a value **B** (**With**) using a **Condition**, and is true only when the condition is met during the session.

**Price levels values.** Compare and With offer the same list:

| Value | What it is |
|---|---|
| Price | the close of the latest candle |
| Previous session open | the open of the first candle of the last completed session |
| Previous session high | the highest high of the last completed session |
| Previous session midpoint | halfway between the previous session's high and low |
| Previous session low | the lowest low of the last completed session |
| Previous session close | the close of the last candle of the last completed session |
| Current session open | the open of the first candle of the session in progress |
| Current session midpoint | halfway between the high and low of the session in progress so far |

What decides those values:

- **A candle belongs to a session when it opens inside it.** With the US stock market session (09:30–16:00 New York), 15-minute candles start at 09:30, so the session's open, high and low include its first half hour. With a 1-hour interval the first candle inside is the 10:00 one. An interval longer than the session may leave no candle inside it, and the rule never fires.
- **Previous session = the last completed session.** A session is complete once a candle arrives outside it. Between sessions, the previous session is the one that just ended.
- **Current session values exist only while a session runs.** The current midpoint moves whenever the session makes a new high or low, so price crossing it works like crossing a moving average.
- **A session seen only in part is skipped.** If the candle history starts mid-session, that session never becomes a previous session.
- **No value, no signal.** With no completed session yet, or Current session open outside a session, the condition is false. Comparing a value with itself is always false.

**Crossings.** Crossing up means Compare was below With on the previous candle and is at or above it now; crossing down is the reverse. A crossing never counts on the candle where the session values roll over: both candles must belong to the same session and see the same previous session. A level that jumps because the session changed is never read as price crossing it.

On the bot chart, In session shades every candle the session touches (Out of session shades the time outside it). With Price levels, the shading shows the session, Compare is drawn in orange and With in purple. Previous-session lines stay flat while a session runs and step to the new values once it ends, with a one-candle gap at the change.

![Gainium bot chart, BTC/USDT 1h, Session Selector on London 08:00–17:00 with Price levels: blue shading on each London session Monday to Friday, the orange Price line on the closes and purple Previous session midpoint lines stepping to a new level after each session](https://content.gainium.io/images/content/indicators/sessions__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Session | — | Fills the hours and time zone of a market session on its local clock, so daylight saving moves it with that market. Edit the hours to make it your own. |
| Start | — | Local time the session opens. Leave Start and End empty for the whole day. |
| End | — | Local time the session closes. An End before Start runs overnight and belongs to the day it opens. |
| Time zone | UTC | Session days and hours are read on this clock. |
| Rule | In session | In or out of session filters by time. Price levels compares two session prices and is true only during the session. |
| Interval | 15 minutes | Candles the session prices are read from. |
| Compare | Price | Price is the close of the latest candle. Previous session values come from the last session that has ended. Current session open and midpoint have no value outside a session; the midpoint is halfway between the session high and low so far. |
| Condition | Crossing up | Crossing compares two candles of the same session; a new session moving the levels is not a crossing. Nothing triggers before a whole session has ended. |
| With | Previous session high | The value Compare is tested against. |
| Session Days | 1,2,3,4,5 | Days the session opens, in its time zone: 0 is Sunday, 1 Monday, up to 6 for Saturday. |

**Tip:** keep the Interval at 15 minutes for sessions that open on the half hour. With the US stock market session (09:30 New York), Price crossing up Previous session high fires about three times as often on 15m candles as on 1h, because the first 1h candle inside opens at 10:00.

**Tip:** With Current session midpoint fires far more often than a previous-session level, because the midpoint moves with every new session high or low. On the New York session with 15m candles it fires about three and a half times as often as Previous session high.

## Trading setups for bots

### Weekdays only

- **Entry:** your usual entry indicator in an AND group with Session Selector, Session **All day**, Session Days Monday to Friday, Time zone UTC, Rule **In session**.
- **Exit:** the bot's normal take profit. The filter only blocks new deals; an open deal keeps running through the weekend.
- **Settings:** the defaults (Monday to Friday, UTC, In session) with no hours.
- **Timeframe:** any. The filter reads the clock, not candles.
- **When it fails:** when the move comes at the weekend. The bot skips weekend dips, like the weekend drop to 79,175 in the chart below, and enters Monday at whatever price the weekend left.

![Annotated Gainium bot chart, BTC/USDT 1h, Session Selector on Monday to Friday UTC, In session: the shaded weekdays where deals can open and the line at the end of Friday UTC after which no new deals open](https://content.gainium.io/images/content/indicators/sessions__weekday-filter.webp)

### Buy a break under the previous London low

- **Entry:** Session Selector, Session **London 08:00–17:00**, Rule **Price levels**, Interval 1 hour, Compare **Price**, Condition **Crossing down**, With **Previous session low**.
- **Exit:** take profit condition Indicators with a second Session Selector on the same session: Compare **Price**, Condition **Crossing up**, With **Previous session midpoint**. Keep a stop loss of 1.5–2%: price that leaves the previous range does not have to come back.
- **Settings:** Session Days Monday to Friday. Use 15 minutes for sessions that start on the half hour.
- **Timeframe:** 1h or 15m. The London preset starts on the hour, so 1h candles cover it from 08:00.
- **When it fails:** on a trend day. When London opens below the previous range and keeps selling, the midpoint is never reached and the stop does the exit.

![Annotated Gainium bot chart, BTC/USDT 1h, Session Selector on London with Price levels: the shaded London sessions and the close below the previous London low where the deal starts](https://content.gainium.io/images/content/indicators/sessions__london-low-reversion.webp)

## Using Sessions in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or the take profit or stop loss type for an exit.
3. Click **Edit**, then **Change indicator**, and pick **Session Selector** from the Filter category. Searching for "Session" finds it.

![Session Selector settings card in the Gainium bot form with Session New York 08:00–17:00, Start 08:00, End 17:00, Time zone New York, Rule Price levels ringed, Interval 15 minutes, Compare Price, Condition Crossing up, With Previous session high ringed, Session Days Monday to Friday](https://content.gainium.io/images/content/indicators/sessions__settings.webp)

The fields and their defaults:

- **Session:** All day. Or a preset (Sydney, Tokyo, London, New York, US stock market) or Custom.
- **Start / End:** empty for All day; a preset fills them.
- **Time zone:** UTC. Also New York, Chicago, Los Angeles, São Paulo, London, Frankfurt, Zurich, Dubai, Mumbai, Singapore, Hong Kong, Shanghai, Seoul, Tokyo and Sydney.
- **Rule:** In session. Or Out of session, or Price levels.
- **Interval:** 15 minutes. Price levels only: the candles the session prices are read from.
- **Compare:** Price. Price levels only.
- **Condition:** Crossing up. Price levels only: Crossing down, Crossing up, Greater than, Lower than.
- **With:** Previous session high. Price levels only.
- **Session Days:** Monday to Friday.

Session Selector has no Keep true field, and it cannot drive the Bot Controller.

**Example configuration** (a New York breakout): Deal start condition Indicators, Session Selector with Session New York 08:00–17:00, Session Days Monday to Friday, Rule Price levels, Interval 15 minutes, Compare Price, Condition Crossing up, With Previous session high. The deal opens on the first 15-minute close at or above the previous New York high during the New York session; a break overnight does not count. To take it only between 08:00 and 10:00 New York time, add a second Session Selector: Custom 08:00–10:00, Time zone New York, Rule In session.

## Related indicators

- [Price Change](https://gainium.io/indicators/price-change-indicator): measures the move inside the session window the filter opens.
- [Support and Resistance](https://gainium.io/indicators/support-resistance-indicator): pivot levels for when session highs and lows are too close together.
- [ADR](https://gainium.io/indicators/adr): the average daily range, to judge whether a session's range is large or small.

## FAQ

### Do sessions follow daylight saving time?

Yes. Start, End and the session days are read on the clock of the selected time zone. The New York session always opens at 08:00 New York time, which is 12:00 UTC under daylight saving time and 13:00 UTC outside it. Choose UTC for a session that never shifts.

### How do I set an overnight session?

Set an End earlier than Start, for example 22:00–02:00. The part after midnight belongs to the day the session opened, so a Friday 22:00–02:00 session runs into Saturday morning even if Saturday is not selected.

### What counts as the previous session?

The last completed session. A session is complete once a candle arrives outside it. During Tuesday's New York session the previous session is Monday's; on Monday it is Friday's, with Monday to Friday selected. A session the indicator only saw part of is skipped.

### Why does my Price levels condition never fire?

Check three things. The rule is only true during the session. A crossing never counts on the candle where the session values roll over. An interval longer than the session may leave no candle opening inside it, so use 15 minutes or less for sessions with hours.

### Can I use two Session indicators in one bot?

Yes. A bot can have one In session or Out of session filter and, at the same time, one or more Session indicators on Price levels, each with its own session, interval and condition.
