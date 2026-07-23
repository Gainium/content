---
id: 1020
name: Trade Journal
slug: trade-journal
description: >-
  Log, review, and analyze your trades with Gainium's Trade Journal. Record
  executions, rate your discipline, tag setups, follow rulebook checklists, and
  track performance on the trading calendar.
createdAt: '2026-07-23T09:00:00.000Z'
updatedAt: '2026-07-23T09:00:00.000Z'
publishedAt: '2026-07-23T09:00:00.000Z'
locale: en
categories:
  - platform
  - trading
difficulty: beginner
tags: []
tldr: >-
  The Trade Journal lets you record every trade with its executions, notes,
  tags, star rating, and rulebook checklist, then review your performance on a
  trading calendar and in a filterable trade list with win rate and profit
  factor stats. Entries can be created manually or saved automatically from
  manual backtesting sessions, and they can feed into your Reports for deeper
  analysis.
---

Most traders lose money not because their strategy is bad, but because they don't follow it consistently — and they can't fix what they don't measure. A trade journal turns your trading history into a feedback loop: it shows you which setups actually make money, which mistakes you keep repeating, and whether your discipline is improving over time. Gainium's **Trade Journal** builds that feedback loop directly into the platform, so every trade you log becomes data you can learn from.

This article covers everything the Trade Journal offers: creating entries, recording executions, using rulebook checklists, ratings, and tags, reading the trading calendar, and analyzing your results.

Prefer to watch? Here is a video walkthrough of the feature:

https://www.youtube.com/watch?v=8BmgsQy0R90

## Why Keep a Trade Journal?

- **Find your edge.** Tagging trades by setup, market condition, or mistake reveals which patterns are profitable and which quietly drain your account.
- **Enforce discipline.** Attaching a rulebook checklist to each entry shows you, in black and white, whether you followed your own plan — and how outcomes differ when you do.
- **Separate process from outcome.** A winning trade can be a bad trade (you got lucky), and a losing trade can be a good one (you followed your plan). Rating each trade helps you judge your execution, not just the result.
- **Spot streaks and tilt.** The calendar view makes it obvious when losses cluster — often a sign of revenge trading or fatigue rather than a broken strategy.

## Getting to the Journal

Open **Trade Journal** from the dashboard navigation. The page has two main areas: the **trading calendar** at the top and the **All Trades** list below it, with your overall stats in the header. Use the **+** button (or **New Entry**) to add a trade manually, and the book icon to jump to your manual backtesting sessions.

## Adding Trades to the Journal

There are two ways to get trades into your journal:

1. **Manual entries** — log any trade you took, on any exchange, using the New Entry form.
2. **Automatic from Manual Backtesting** — when practicing in a manual backtesting session, enable the **Journal** toggle in the trade setup panel. Every trade you complete in that session is saved to the journal automatically, with a link back to the session it came from.

Journaling backtest trades is a great habit: it lets you practice the full routine — plan, execute, review — before real money is on the line, and your practice trades show up in the same calendar and stats as everything else.

## Creating an Entry

Click **New Entry** to open the journal entry form. It sits alongside a live chart and a notes panel, so you can document the trade while looking at exactly what the market did.

### Symbol and Market Type

Pick the trading pair and exchange from the searchable symbol list. The market type (spot or futures) is detected automatically from the exchange you choose:

- **Spot** trades are recorded without leverage.
- **Futures** trades unlock a **Leverage** slider (1x–125x). Set it to the leverage you actually used — it's part of an honest record of the risk you took on.

Once a symbol is selected, the chart loads that market so you can see the price action around your trade.

### Executions

Executions are the individual fills that made up your trade. A simple trade might be one buy and one sell; a scaled entry with partial exits might have many. For each execution you record:

- **Action** — Buy or Sell.
- **Date & time** — when the fill happened. Changing the time re-centers the chart on that moment.
- **Quantity** — the amount filled.
- **Price** — the fill price.
- **Fee** — the fee paid on that fill. Including fees keeps your PnL honest; many "profitable" scalping strategies die by fees alone.

The **cost** of each execution is calculated automatically (quantity × price, adjusted for the fee). Add as many executions as the trade needs with **Add execution**, and remove any you added by mistake.

**Pick from chart:** instead of typing times and prices, click the crosshair icon on an execution, then click the exact spot on the chart where the fill happened. The execution's date, time, and price are filled in from the chart — fast and precise.

### Open and Closed Positions

The journal works out your position from the executions themselves. If your buys and sells balance out, the trade is recorded as closed. If there's a remainder — you bought more than you sold, or vice versa — the entry is saved as an **open position**. Open entries show a live **unrealized PnL** based on the current market price, and you can come back later and add the closing executions when you exit.

The entry direction is taken from your first execution: starting with a buy records a long, starting with a sell records a short.

### The Summary Panel

As you enter executions, the summary updates in real time:

- **Average entry** — volume-weighted average price of your entry fills.
- **Average exit** — volume-weighted average price of your exit fills.
- **Position remainder** — quantity still open (0 for a fully closed trade).
- **Realized PnL** — profit or loss on the closed portion, fees included.
- **Realized ROI** — that profit as a percentage of what you put in.

This is a useful sanity check before saving: if the numbers don't match what your exchange shows, an execution is probably missing or mistyped.

### Rulebook and Strategy Checklist

If you've created rulebooks (your documented trading strategies with entry/exit checklists), you can attach one to the entry. Selecting a rulebook displays its **strategy checklist**, and you tick off each item you actually followed for this trade. Items marked as required are highlighted.

The checklist state is saved with the entry as a snapshot, so even if you revise the rulebook later, each journal entry keeps an accurate record of what you checked at the time. Over weeks of entries, this becomes the single most revealing statistic in your journal: compare the results of trades where you completed the checklist against the ones where you skipped items.

### Trade Rating

Rate the trade from 1 to 5 stars. Click a star to set the rating, and click the same star again to clear it.

Rate your **execution quality**, not the outcome. A trade that followed your plan perfectly but lost money deserves a high rating; an impulsive trade that happened to win deserves a low one. Rated this way, your average rating tracks your discipline — and rising discipline is what turns a good strategy into good results.

### Tags

Tags are free-form labels for categorizing trades: setups ("breakout", "range fade"), conditions ("news day", "low volume"), or mistakes ("chased entry", "moved stop"). Type a tag and press Enter or the **+** button to add it.

As you journal, the tag field suggests tags you've used before, sorted by how often you use them, with a usage count next to each. Reusing suggested tags instead of inventing near-duplicates ("break-out" vs "breakout") keeps your data clean, which matters later when you filter by tag to see how a particular setup performs.

### Notes

The notes panel gives you a dedicated space for the story of the trade, pre-structured with three prompts:

- **What went well**
- **What could be improved**
- **Key lessons learned**

Write the notes while the trade is fresh — the reasoning behind an entry evaporates fast, and "why did I take this?" is the question you'll most want answered when reviewing weeks later. Notes support formatted text, and you can edit them any time from the entry's detail page.

When you're done, hit **Save journal entry**. You can edit any entry later — everything, including executions, tags, rating, and checklist, stays editable.

## Reviewing a Trade

Click any trade in the calendar or the list to open its detail page:

- **Chart with trade markers** — your executions (or entry/exit for imported trades) are plotted on the chart so you can see the trade in its full market context. Click any execution in the details panel to center the chart on that fill.
- **Trade metrics** — PnL, ROI, duration, amounts, and (for open positions) live unrealized PnL.
- **Notes** — read and update your analysis in place.
- **Edit** — reopen the full entry form to change anything.
- **Duplicate** — copy the entry as a starting point for a similar trade, useful when you take the same setup repeatedly.
- **Delete** — permanently remove the entry (with a confirmation step).

Reviewing on the chart is where the learning happens: seeing your entry marker sitting at the top of a spike, or your exit right before the real move, teaches lessons no spreadsheet can.

## The Trading Calendar

The calendar gives you a month-at-a-glance view of your trading:

- **Day cells** show each day's total PnL, number of trades, and win rate. Profitable days are tinted green and losing days red, so streaks and clusters jump out immediately.
- **Hover over a day** to preview its trades — pair, direction, PnL, ROI, time, strategy, and tags — and click through to any of them.
- **Click a day** to open that day's first trade.
- **Weekly stats** in the right-hand column summarize each week: PnL, trade count, win rate, and how many days you traded.
- **Month stats** in the header show the month's PnL, total trades, win rate, and active trading days. Use the arrows to move between months and **This month** to jump back to today.

### Trade Date vs. Session Date

The toggle above the calendar controls how trades are grouped into days:

- **Trade Date** (default) — trades are placed on the day the trade closed in the market. Use this to analyze your performance against real market conditions.
- **Session Date** — trades are placed on the day you actually logged them. This matters for manual backtesting: you might replay a week of last year's price action in one evening. Under Session Date, all of those trades appear on the evening you practiced — perfect for answering "how did my practice session go today?" — while Trade Date scatters them across the historical days they simulate.

## The All Trades List

Below the calendar, every journal entry appears in a full trade table with your headline stats:

- **Total Trades** — how many entries you've journaled.
- **Total P&L** — your cumulative profit and loss across all entries.
- **Win Rate** — the percentage of trades that closed in profit, with the win/loss split.
- **Profit Factor** — total profits divided by total losses. Above 1 means your winners outweigh your losers; most traders consider 1.5–2.0 a healthy range. It's a better health check than win rate alone, because a strategy can win 70% of the time and still lose money if the losers are large.

The table itself supports sorting, per-column filtering, hiding columns you don't need, and pagination. Click any row to open that trade's details. Select multiple rows to delete entries in bulk.

### Deleting Entries Linked to Backtesting Sessions

If an entry was journaled from a manual backtesting session, deleting it asks whether to remove **only the journal entry** (keeping the trade in your backtesting session history) or **both records**. This keeps your journal and your practice history from silently drifting apart.

## Journal Trades in Reports

Your journal doesn't live in isolation: journal entries can be included as a data source in Gainium's **Reports**, alongside your bots and terminal trades. Each journal trade carries its tags, direction, market type, strategy name, and session name into the report, so you can slice performance by any of them — for example, comparing all trades tagged "breakout" against the rest, or filtering a report down to a single strategy.

## Tips for Effective Journaling

1. **Journal every trade, not just the interesting ones.** Skipping the embarrassing trades biases your data exactly where you most need honesty.
2. **Log immediately.** Enable the Journal toggle during backtesting sessions and write live-trade notes the same day. Reconstructed entries lose the details that matter.
3. **Standardize your tags.** A short, consistent tag vocabulary beats a sprawling one. Lean on the suggestions.
4. **Review weekly and monthly.** Use the calendar's weekly stats for a quick end-of-week review, and step through the month asking one question: what would I do differently?
5. **Let the checklist judge you.** After 20–30 entries, compare checklist-complete trades against the rest. For most traders, that one comparison pays for the entire habit.
