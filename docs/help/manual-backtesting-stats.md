---
id: 1004
name: 'Manual Backtesting: Statistics and Performance Metrics'
slug: manual-backtesting-stats
description: >-
  Understand every metric Manual Backtesting tracks — winrate, profit factor,
  R:R, equity curve, practice time, and session score — and learn how to use
  them to evaluate your trading.
createdAt: '2026-07-23T09:00:00.000Z'
updatedAt: '2026-07-23T09:00:00.000Z'
publishedAt: '2026-07-23T09:00:00.000Z'
locale: en
categories:
  - backtesting
  - platform
difficulty: intermediate
tags: []
tldr: >-
  Manual Backtesting tracks your results at three levels: a live header strip
  (balance, winrate, profit factor, R:R, time replayed, practice time), a
  bottom panel with trade tables, an equity curve and a stats tab (net/average
  win, loss, P&L, trade duration), and per-session summaries on the sessions
  page. Winrate only means something next to R:R — a 40% winrate with 1:2 R:R
  is profitable; a 60% winrate with poor R:R is not.
---

Manual Backtesting exists to generate honest numbers about your trading. This article explains every metric the feature tracks and how to read them together. For creating sessions see the [Manual Backtesting overview](/help/manual-backtesting); for the trade panel see [placing and managing trades](/help/manual-backtesting-trade-setup).

## The header strip

While a session is open, the header shows a live summary that updates after every trade:

- **Balance** — your current virtual balance.
- **Winrate** — percentage of closed trades with positive profit.
- **Total Profit / Total Loss** — the sums of your winning trades and losing trades, shown separately.
- **Net P&L** — total profit minus total loss; your bottom line for the session.
- **Profit Factor** — total profit divided by total loss. Above 1.0 you are net profitable; 1.5–2.0 is solid; below 1.0 the strategy loses money. Profit factor is more robust than winrate because it accounts for the size of wins and losses, not just their count.
- **R:R** — your *realized* average risk-reward: average winning trade divided by average losing trade. Note this is measured from outcomes, not from your planned targets — if you keep cutting winners early, realized R:R will be worse than planned R:R.
- **Trades** — number of completed trades.
- **Time Replayed** — how much market time you have stepped through in the session.
- **Practice Time** — actual wall-clock time you have spent actively working in the session. The dot next to it is green while the timer is running and red when you are idle. Comparing practice time to time replayed shows how efficiently you are training.

## The trades panel

The bottom panel has five tabs:

### Open Trades

Your currently running position, with entry price, average price (after any position increases), position size, leverage, realized profit from partial take profits and reductions, planned R:R, and live unrealized profit. Position increase/reduce controls live here too. Clicking the row centers the chart on the trade's entry bar.

### Pending Trades

Limit orders waiting to fill, with the limit price and its current distance from the market. Orders can be cancelled from here.

### Closed Trades

The full history of completed trades. Columns include entry and exit price, position size, leverage, realized profit, planned R:R, exit reason, checklist results, notes, tags, fees paid, resulting balance, and trade duration. From this table you can:

- **Show or hide trades on the chart** — trade markers (entry, exit, targets) can be toggled per trade or in bulk to keep the chart readable.
- **Delete trades** — remove entries (individually or in bulk) if you fat-fingered an execution; the session's balance and statistics are recalculated.
- **Export** the table for analysis in a spreadsheet.
- Click a trade to jump the chart to where it happened — the single most useful review habit: revisit every loser and ask whether the entry followed your rules.

### Equity Evolution

Your balance plotted trade by trade. The shape of the curve matters as much as its endpoint:

- A steady upward slope with shallow dips is what you want.
- A jagged curve with deep drawdowns means your position sizing or stop discipline needs work, even if the endpoint is positive.
- One giant winning trade propping up an otherwise flat curve means the result is luck, not edge.

Hover any point to see the trade's symbol, the balance after it, and its P&L.

### Stats

Aggregate performance for the session:

- **Net Win / Avg. Win** — total and average profit of winning trades.
- **Net Loss / Avg. Loss** — total and average loss of losing trades.
- **Net P&L / Avg. P&L** — overall result and per-trade expectancy. Average P&L is your **expectancy** — what one trade of this strategy earns on average. A positive expectancy, sustained over a large sample, is the definition of an edge.
- **Winrate** — winning trades over total trades.
- **Avg. Trade Duration** — how long your trades stay open on average (in market time).

## The trade result dialog

After each trade closes, a summary dialog shows the direction, entry and exit price, exit reason, realized profit, and return on investment. You can set it to close automatically after a countdown if you prefer to keep your flow. In blind mode, prices are hidden so the reveal does not give away where you are in history.

## Session score

Each session carries a score derived from your return on investment weighted by time efficiency — making 5% in ten days of market time scores higher than making 5% in three months. Use it as a quick way to rank sessions, not as a substitute for reading the underlying stats.

## The sessions page

The Manual Backtesting home page aggregates across sessions: total sessions, combined P&L, total trades, overall winrate, average score, and total time replayed. Each session card shows its own equity curve, P&L, winrate, realized R:R, time replayed, and practice time, so you can compare performance across different pairs, periods, and market regimes at a glance.

## How to read the numbers together

- **Winrate means nothing alone.** A 40% winrate with 1:2 realized R:R is comfortably profitable; a 65% winrate with wins half the size of losses is not. Always read winrate and R:R as a pair — profit factor combines them into one number.
- **Demand a sample.** Twenty trades tell you almost nothing; variance dominates. Aim for 50–100 trades per strategy before trusting the stats, which is precisely what replay makes practical.
- **Compare planned vs. realized R:R.** If your planned R:R (visible per trade in the closed trades table) is consistently higher than your realized R:R, you are interfering with your own trades — usually by closing winners early or widening stops.
- **Check exit reasons.** A healthy distribution is mostly take profits and stop losses. Many manual closes suggest impulsive management; liquidations suggest oversized leverage.
- **Watch practice time.** Improvement comes from deliberate volume. The practice timer makes your training effort visible — treat it like a gym log.
