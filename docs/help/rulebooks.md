---
id: 1010
name: Rulebooks
slug: rulebooks
description: >-
  Create trading rulebooks with pre-trade checklists, enforce your rules during
  manual backtesting, and track win rate, R:R, and rule adherence per strategy
  to build real trading discipline.
createdAt: '2026-07-23T09:00:00.000Z'
updatedAt: '2026-07-23T09:00:00.000Z'
publishedAt: '2026-07-23T09:00:00.000Z'
locale: en
categories:
  - platform
  - trading
difficulty: intermediate
tags: []
tldr: >-
  Rulebooks turn your trading strategy into a written pre-trade checklist.
  Attach a rulebook to a manual backtesting session and check off each rule
  before entering a trade — required rules must be checked or the entry is
  blocked. Every trade records how many rules you followed, and each rulebook
  accumulates its own win rate, P&L, and risk:reward statistics so you can see
  which strategies (and how much discipline) actually make money.
---

Most traders don't lose because their strategy is bad — they lose because they don't follow it. A strategy that exists only in your head is easy to bend: you skip a confirmation because the move "looks strong," you enter early because you're afraid of missing out, and afterwards you can't even tell whether the loss came from the strategy or from breaking it.

**Rulebooks** solve this by turning your strategy into a written, checkable set of rules. Each rulebook is a named strategy with a description, an optional video reference, and a **pre-trade checklist** organized into sections. When you practice the strategy in a [manual backtesting](https://app.gainium.io/manual-backtesting/sessions) session, the checklist sits next to the chart, and you tick off each rule before entering a trade. Gainium records your adherence on every trade and builds per-rulebook performance statistics, so you always know two things: whether the strategy works, and whether you're actually following it.

## Creating a Rulebook

Go to [**Rulebooks**](https://app.gainium.io/rulebooks) in the dashboard and click **New**. A rulebook has:

- **Rulebook Name** (required) — a short, unique name like "Momentum Breakout" or "Mean Reversion." Names must be unique across your rulebooks.
- **Trading concept** — the chart observation or hypothesis you are testing, e.g. "Bullish engulfing after a 200 EMA retest" or "Breakout and retest of a supply/demand zone." Writing this down forces you to define the edge you think you have — vague concepts produce vague results.
- **YouTube video URL** — optionally link the video that explains the strategy. The video is embedded on the rulebook's detail page and shown as a thumbnail in your library, which is handy when you're testing several strategies from different educators and want to rewatch the source material.

### The pre-trade checklist

The heart of a rulebook is its checklist. It is organized into **sections**, each containing **items**:

- **Sections** group related rules — a common structure is one section for entry conditions, one for exit planning, and one for risk management. Each section has a name and an optional description that appears as a hint during backtesting. You can add as many sections as you need, and later attach them to a session individually, so grouping matters: keep rules that are always checked together in the same section.
- **Items** are the individual rules. Each item has a name (keep it short and verifiable — "Price above 200 EMA," not "Trend looks good"), an optional longer description shown as a tooltip during the session, and a **Required** toggle.

**Required vs. optional items** is the most important distinction:

- **Required** items are hard rules. During a backtesting session, you cannot enter a trade until every required item in your active checklist is checked. This is deliberate friction — it is what makes the rulebook enforce discipline instead of just suggesting it.
- **Optional** items (Required unticked) are confluence factors — nice-to-haves that improve a setup but shouldn't veto it. They still count toward your adherence score, so you can later see whether trades with more boxes ticked perform better.

A good rule of thumb: make the 3–5 conditions that *define* the setup required, and leave extra confirmations optional. If everything is required, you'll never trade; if nothing is, the checklist becomes decoration.

![The Create New Rulebook form with name, concept, video and a checklist section and item](https://content.gainium.io/images/content/help/rulebooks__add2.webp)
*The rulebook editor — name, trading concept and video at the top, then the pre-trade checklist built from sections and items, each item with a Required toggle.*

## Using a Rulebook in Manual Backtesting

Rulebooks come alive inside manual backtesting sessions — chart-replay practice where you place simulated trades bar by bar.

### Attaching a checklist to a session

There are two ways to connect a rulebook to a session:

1. **From the rulebook's detail page**, click **New Session**. The session is created with that rulebook's checklist pre-selected.
2. **Inside any session**, open the **Rulebook** panel next to the trade controls and use **Add sections to checklist**. You can add a *whole rulebook* (all of its sections at once) or pick *individual sections* — even mix sections from different rulebooks if, for example, you keep a shared "Risk Management" rulebook that applies to every strategy.

Added sections appear in the panel grouped under their rulebook's name, each with its items and a running counter of checked vs. total items. Remove a section at any time with its trash icon.

### Checking off rules and entering trades

Before each trade, go through the checklist and tick the items that are true for the current setup. The panel shows two counters:

- **Checked / total** — your overall adherence for this entry.
- **Required checked / required** — progress on the hard rules. While any required item is unchecked, the trade entry buttons are blocked and tell you how many required items remain.

When you enter a trade, Gainium takes a **snapshot** of the checklist at that moment — which items were shown and which were checked. This snapshot is stored with the trade, and the checklist then resets for the next setup. The snapshot is what links a trade to a rulebook: a trade "belongs" to a rulebook if its entry checklist came from it.

### The detachable checklist

If the checklist panel gets in the way of the chart, click **Detach** (or press **Ctrl+D**) to pop it out into a floating window you can drag anywhere on screen. Press Ctrl+D again or use the reattach button to dock it back.

### Avoiding repeated tests on the same data

When you create a new session with a rulebook selected, Gainium warns you if you already have a session testing the **same rulebook on the same pair over an overlapping date range**. Re-running a strategy on data you've already practiced on inflates your results — you remember where price goes. Treat the warning as a nudge to pick a different period, a different pair, or use a random period so each session is a fair test.

## Tracking Performance and Adherence

### The Rulebooks page

![The Rulebooks page: Overall Performance summary and the Rulebook Library](https://content.gainium.io/images/content/help/rulebooks__add1.webp)
*The Rulebooks page — Overall Performance stats above the Rulebook Library, with the New button top-right.*

The [Rulebooks](https://app.gainium.io/rulebooks) page gives you a portfolio view of all your strategies:

- **Overall Performance** — aggregate statistics across every rulebook: total sessions and trades, total P&L (split into profit and loss), overall win rate, and overall risk:reward. The **R:R Graph** tab plots each rulebook as a point on a win rate vs. risk:reward chart — the two numbers that together determine profitability. A strategy with a 40% win rate can be excellent if its R:R is high, and a 70% win rate can lose money if winners are small; this chart shows at a glance which of your strategies sit in profitable territory. The **Stats** tab shows detailed trade statistics across all rulebook trades.
- **Rulebook Library** — a table (or card view) of every rulebook with its sessions, trades, total and per-session P&L, win rate, average R:R, a mini win-rate-vs-R:R chart of its sessions, checklist size, and when it was last used. Sort, filter, and toggle columns to compare strategies side by side.

Only trades entered with a rulebook's checklist count toward that rulebook's statistics — practicing without the checklist attached produces trades that don't attribute to any strategy.

### The rulebook detail page

Click any rulebook to open its detail page:

- **Header** — the description, the embedded strategy video if you added one, and quick actions to edit the rulebook or start a new session with it.
- **Performance Analysis** — the rulebook's own trade count, P&L, win rate, and risk:reward, plus a scatter chart plotting each session that used this rulebook individually alongside the overall result. Watching individual sessions cluster (or scatter) around the overall point tells you how consistent the strategy is across different periods and pairs.
- **Pre-Trade Checklist** — a read-only view of the full checklist so you can review the rules without opening the editor.
- **Associated Trades** — every trade across all sessions that used this rulebook, with its pair, direction, entry and exit times, P&L and ROI, duration, and a **Checklist** column showing how many items were checked at entry (e.g. 5/6). This adherence figure is where discipline becomes measurable: filter your losers and check whether they share low adherence scores. If broken-rule trades lose and full-checklist trades win, the problem is discipline, not the strategy — and vice versa.

From the trades table you can also push any trade into your **trade journal** with one click for deeper review; already-journaled trades are marked as linked.

## Rulebooks and the Trade Journal

The connection works in the live direction too: when you create a trade journal entry, you can optionally attach one of your rulebooks. The entry then shows the full checklist so you can record which rules you followed on the real trade, with required items highlighted. Over time this lets you compare your backtested adherence against your live adherence — most traders discover they are far more disciplined in practice than with real money on the line.

## Managing Rulebooks

- **Edit** — from the detail page, change the name, concept, video, sections, and items at any time. Renaming is safe; past trade statistics stay with the rulebook.
- **Duplicate** — creates a copy of a rulebook with its full checklist. Use this to create variants of a strategy (e.g. the same setup with a stricter entry filter) and test them as separate rulebooks with separate statistics.
- **Delete** — removes the rulebook after confirmation. This cannot be undone, so consider exporting a backup first.
- **Backup and restore** — rulebooks are included in the Saved Data manager, where you can export them to a file and import them later or on another account.

Your rulebooks are saved to your account and sync across your devices.

## Practical Tips

- **Start with one rulebook and few rules.** Three required items you always check beat fifteen you start skipping after a week.
- **Write rules you can verify on the chart in seconds.** "RSI below 30" is checkable; "market feels oversold" is not.
- **Use a shared risk-management section.** Keep position sizing and stop-loss rules in their own rulebook or section and attach it to every session, whatever strategy you're testing.
- **Judge a rulebook by sessions, not trades.** One good session can be luck. When several sessions on different pairs and periods cluster in the profitable zone of the R:R chart, you have evidence of an edge.
- **Review adherence before rewriting rules.** If your results are poor but your adherence scores are low, fix the discipline first — you haven't actually tested the strategy yet.
