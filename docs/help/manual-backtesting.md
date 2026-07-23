---
id: 1002
name: Manual Backtesting
slug: manual-backtesting
description: >-
  Practice trading on real historical data with Gainium's Manual Backtesting.
  Learn how to create sessions, replay the market bar by bar, and train your
  strategy without risking capital.
createdAt: '2026-07-23T09:00:00.000Z'
updatedAt: '2026-07-23T09:00:00.000Z'
publishedAt: '2026-07-23T09:00:00.000Z'
locale: en
categories:
  - backtesting
  - platform
difficulty: beginner
tags: []
tldr: >-
  Manual Backtesting lets you replay historical price data bar by bar and trade
  it as if it were live, complete with fees, slippage, position sizing, and
  performance tracking. Create a session with your pairs, balance, and time
  period (fixed or random), then use the playback controls to step through the
  market and practice your strategy. Blind mode hides dates and prices so you
  can't cheat by remembering what happened.
---

Manual Backtesting is a market replay simulator built into Gainium. It feeds you real historical candles one bar at a time, and you decide when to enter, how much to risk, and when to exit — exactly like live trading, but compressed and risk-free. It is the fastest way to build screen time, test a discretionary strategy, and gather honest statistics about your own decision making.

This article covers creating sessions and controlling the replay. Two companion articles go deeper:

- [Placing and managing trades](/help/manual-backtesting-trade-setup) — order types, position sizing, take profit, stop loss, and templates.
- [Statistics and performance metrics](/help/manual-backtesting-stats) — what every number means and how to read your results.

## Why practice on replay?

A strategy that looks great on a chart in hindsight can fall apart when you only see the left side of the chart. Manual Backtesting removes hindsight: you see exactly what you would have seen in real time, make a decision, and live with the result. Because you can replay months of price action in an evening, you can collect a meaningful sample of trades in days instead of years.

## Creating a session

Open **Manual Backtesting** from the dashboard menu and click **New Session**. Each session is an independent simulation with its own balance, symbols, time period, and trade history.

### Session name

Give the session a recognizable name (for example, "BTC breakouts – Q1 2024"). Use **Generate Name** if you just want a timestamped placeholder.

### Starting balance

The virtual capital you begin with, from $100 to $1,000,000. Pick something close to your real account size — position sizing habits only transfer to live trading if the numbers feel familiar.

### Trading fee

The fee percentage charged on every execution (both entry and exit). It defaults to 0.1%, which matches typical spot market taker fees. When you select a futures pair, the session automatically switches to 0.02% — the usual futures fee — but you can override it. Including realistic fees matters: a strategy that scalps small moves can be profitable before fees and losing after them.

### Slippage for market orders

Real market orders rarely fill at the exact price on your screen. This setting simulates that by worsening your fill price by the given percentage on every market execution — market entries, adding or reducing position size, and manual closes. Limit orders are not affected. The default 0.1% is reasonable for liquid pairs; raise it if you trade thin markets.

### Trading symbols

Add up to 10 trading pairs to a single session. The first pair in the list becomes the active symbol when the session opens; you can switch between them at any time during replay, and each pair remembers which exchange it came from. Multi-symbol sessions also unlock split chart layouts (see below), letting you watch several markets advance together on the same clock.

### Checklist rulebooks

Optionally attach one or more rulebooks — or individual sections of them — to the session. The selected checklists appear in the trade panel so you can verify your entry criteria before each trade. You can mix and match: for example, the "Market structure" section from one rulebook plus a full risk-management rulebook.

### TradingView layout

If you have saved chart layouts (indicators, drawings, color schemes), you can load one automatically when the session starts. Save a layout from any Gainium chart first, then select it here.

### Blind mode

Blind mode hides the time axis and price labels on the chart. Why would you want that? Because if you can see the date, you probably remember what Bitcoin did that month — and your "practice" becomes a memory test. Blind mode forces you to trade the price action itself. Enabling it at session creation also forces a random period (see below) so you genuinely cannot know where you are in history. You can toggle blind mode on or off later from the playback controls.

### Backtest period

Choose which slice of history to replay:

- **Fixed dates** — pick a start and end date. The earliest available date is detected automatically for your selected pairs; when multiple pairs are selected, the most restrictive (latest) launch date applies.
- **Quick ranges** — one-click buttons for the last week, month, 3 months, 6 months, or year.
- **Custom saved periods** — save any date range with a label (for example, "Bull run 2024" or "FTX crash") and reuse it across sessions. Saved periods are handy for testing a strategy across specific market regimes.
- **Random** — enter a duration in days and the platform picks a random start date. Random periods prefer stretches of history you have not yet used with the same pair, so repeated practice keeps landing on fresh data. If little unused history remains, you will see a warning with the number of unused days left and a one-click option to shrink the duration to fit.

If your chosen dates, symbols, and rulebooks overlap with an existing session, a warning lists the conflicting sessions. Overlaps are allowed — the warning just prevents you from accidentally re-testing the same rulebook on data you have already seen.

## The replay interface

Once a session opens, the screen has four areas:

- **Header** — session name, replay progress, and a live statistics strip (balance, winrate, profit factor, and more — see the [statistics article](/help/manual-backtesting-stats)). You can pin the header so it stays visible, or leave it unpinned to maximize chart space.
- **Chart** — a full TradingView chart that advances as you step through time. All the usual drawing tools and indicators are available.
- **Trade panel** — the right-side panel where you configure and execute trades ([full guide](/help/manual-backtesting-trade-setup)).
- **Trades panel** — the bottom panel with open, pending, and closed trades, the equity curve, and session stats.

Both side and bottom panels can be collapsed to give the chart more room.

## Playback controls

A floating control bar drives the replay. Drag it by its handle to any position on screen — it remembers where you left it.

- **Play / Pause** — advance automatically. Playback speed can be set to 1x, 2x, 4x, 8x, or 16x.
- **Next bar / Previous bar** — step one bar at a time. Stepping backward is only available when no trade is open (you cannot un-see the future once you have positioned on it).
- **Playback step size** — the timeframe by which time advances on each step, from 1 minute to 1 week. This is independent of the chart timeframe: you can watch a 4-hour chart while stepping 15 minutes at a time to practice precise entries.
- **Sync timeframes** — the link icon locks the playback step to the chart timeframe, so changing one changes the other. Unlink them to step at a finer resolution than the chart shows. When the playback step is finer than the chart timeframe, the current chart candle updates progressively and shows a "partial" indicator until it completes.
- **Fast forward** — while a trade is open, fast-forward jumps ahead until the trade closes (by take profit, stop loss, or other exit). A stop button lets you interrupt it mid-flight.
- **Current date and time** — displayed on the expanded control bar (hidden in blind mode).
- **Reset** — restarts the session from the beginning of the period, wiping its trade history. Use with care.
- **Blind mode toggle** — hide or reveal the chart's time and price labels at any moment.

If the Next button is disabled, hover it to see why — usually the background data loader is still fetching bars, or you have reached the end of the session period.

## Chart layouts for multi-symbol sessions

Sessions with more than one pair can split the chart:

- **Single chart** — one symbol at a time (switch via the chart's symbol search, which is limited to the session's pairs).
- **Vertical or horizontal split** — two charts side by side or stacked (requires 2+ symbols).
- **Quad layout** — four charts in a grid (requires 3+ symbols).

All charts advance on the same clock, so you can practice monitoring correlated markets — for example, keeping an eye on BTC while trading an altcoin.

## Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| `Space` | Advance one bar |
| `Option/Alt + Space` | Step back one bar |
| `P` | Play / pause |
| `1`, `2`, `4` | Set playback speed |
| `S` | Toggle timeframe sync |
| `Shift + M` | Toggle order type (market / limit) |
| `Cmd/Ctrl + Enter` | Execute the configured trade |
| `Cmd/Ctrl + →` | Fast forward to the end of the open trade |
| `Ctrl + D` | Detach the checklist into a floating window |

Templates can also be assigned their own hotkeys — see the [trade setup article](/help/manual-backtesting-trade-setup).

## Managing sessions

The Manual Backtesting home page lists all your sessions with their equity curve, P&L, winrate, R:R, time replayed, and practice time. From here you can:

- **Resume** any session — progress, balance, and open trades are preserved exactly where you left off.
- **Rename** a session inline.
- **Delete** a session. If some of its trades were saved to your trade journal, you can choose whether to delete those journal entries too or keep them.

The header of the list aggregates stats across all sessions — total P&L, total trades, overall winrate, and total time replayed — so you can watch your practice volume grow.

## Practical tips

- **Use blind mode with random periods** for honest practice. Knowing "this is March 2020" changes how you trade.
- **Set fees and slippage realistically.** The difference between 0% and 0.1% per side is enormous for high-frequency styles.
- **Attach a rulebook checklist** and fill it before every entry. The statistics later tell you whether following your own rules actually pays.
- **Prefer many short sessions over one endless one.** A 30–60 day random period gives you a clean, comparable sample; run several and compare results across market conditions.
