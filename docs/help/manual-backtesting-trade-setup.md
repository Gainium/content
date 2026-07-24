---
id: 1003
name: 'Manual Backtesting: Placing and Managing Trades'
slug: manual-backtesting-trade-setup
description: >-
  Master the Manual Backtesting trade panel — market and limit orders, risk-based
  position sizing, multiple take profit targets, trailing stops, leverage, and
  reusable trade templates.
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
  The trade panel in Manual Backtesting supports long/short direction, market
  and limit orders, position sizing by fixed amount or by risk, up to several
  partial take profit targets (by price or R:R), fixed or trailing stop losses,
  leverage with cross/isolated margin on futures pairs, and an auto exit after a
  set number of bars. Setups can be saved as templates with hotkeys, and open
  positions can be updated, scaled in/out, or closed at any time.
---

This article walks through every control in the Manual Backtesting trade panel. If you have not created a session yet, start with the [Manual Backtesting overview](/help/manual-backtesting). For interpreting your results, see [statistics and performance metrics](/help/manual-backtesting-stats).

![The trade panel: direction, order type, position size, leverage, and the take-profit section](https://content.gainium.io/images/content/help/manual-backtesting-trade-setup__add1.webp)

## Direction

Choose **Long** (profit when price rises) or **Short** (profit when price falls). Shorts are simulated even on spot pairs, so you can practice both sides of the market anywhere.

## Order type

- **Market** — the trade executes immediately at the current bar's price, adjusted by the session's slippage setting.
- **Limit** — the order is placed at your chosen price and waits. As you advance the replay, the order fills when price reaches it; until then it sits in the **Pending Trades** tab, where you can cancel it. Quick buttons let you set the limit price a fixed percentage above or below the current price (−0.5%, −0.25%, +0.25%, +0.5%).

Press `Shift + M` to toggle between market and limit quickly.

## Position size

Two sizing modes are available via the **Amount / Risk** switch:

### Amount mode

Enter the position size directly in USDT, or tap a quick button to use 1%, 2%, 3%, 5%, or 10% of your current balance. Simple and fast, but the dollar risk of each trade varies with your stop distance.

### Risk mode

Instead of choosing a position size, you choose **how much you are willing to lose if the stop loss hits**, and the position size is calculated for you:

- **Risk basis %** — risk a percentage of your current balance (e.g., 1% per trade).
- **Risk basis USDT** — risk a fixed dollar amount per trade.

Risk mode requires a valid stop loss — the panel needs to know the distance between entry and stop to work out the size. The calculated position size appears in the (read-only) amount field and updates live as you move the stop. This is the sizing method most professional risk models use: a tight stop automatically gets a bigger position, a wide stop a smaller one, and every loser costs roughly the same.

## Futures settings

When the active pair is a futures market, an extra section appears:

- **Leverage** — set via slider, presets, or exact value. Leverage multiplies both your exposure and the interest of the estimated liquidation price.
- **Margin type** — **Cross** (your whole balance backs the position, liquidation is further away) or **Isolated** (only the position's margin is at risk, liquidation is closer).
- **Estimated liquidation price** — shown live so you can check whether your stop loss sits safely inside it. If price reaches liquidation before your stop, the trade exits as a liquidation.

Futures pairs also auto-apply the 0.02% futures trading fee unless you set a different fee on the session.

![Futures settings: margin type (Cross/Isolated) and the leverage slider with presets](https://content.gainium.io/images/content/help/manual-backtesting-trade-setup__add3.webp)

## Take profit targets

Enable the **Take Profit Targets** switch to define where you take profit. You can add multiple targets to scale out of a position in parts:

- Each target has a **price** (set via the input, the slider, quick buttons, or by picking directly on the chart with the crosshair button) and a **size %** — the share of the position that closes at that target. Size percentages are kept at a total of 100% automatically; removing a target redistributes its share evenly.
- The percentage next to each target shows its distance from your entry price.

The mode selector switches how quick buttons work:

- **Price mode** — buttons place the target 1–10% away from entry. The percentages are fee-adjusted, so "1%" means one percent of profit after fees, not before.
- **R:R mode** — buttons place the target at a multiple of your risk: 1:1, 1:2, up to 1:5. A 1:3 target sits three times as far from entry as your stop loss does. R:R mode requires a valid stop loss, since risk distance is measured from it.

When a partial target hits during replay, that portion of the position closes and the profit is locked in; the rest keeps running.

![Take-profit targets with two partial targets, each with its own size percentage of the position](https://content.gainium.io/images/content/help/manual-backtesting-trade-setup__add2.webp)

## Stop loss

Enable the **Stop Loss** switch and set the exit level the same ways as a take profit: type a price or percentage, drag the slider, use quick buttons (1–10%, fee-adjusted), or pick the level on the chart. The placeholder reminds you which side of entry a valid stop must be on.

- **Price / R:R mode** — in R:R mode the quick buttons express your stop as a ratio of your first take profit target (and the panel shows your current effective R:R).
- **Trailing** — check the trailing box to convert the stop into a trailing stop. The distance between the current price and your stop becomes the trailing distance: as price moves in your favor, the stop follows at that distance and locks in profit; if price reverses by the distance, the trade exits. The stop never moves against you.

A trade without a stop loss can be closed manually, by a take profit, by auto exit, or by the end of the session period — but nothing protects it on the way down. Trading with a stop is strongly recommended; it is also what makes risk-based sizing and R:R statistics meaningful.

## Auto exit

Enable **Auto exit** to close whatever remains of the position after a set number of bars. This suits time-based strategies ("if the breakout hasn't worked in 10 bars, get out") and prevents zombie trades from lingering while you fast-forward.

## Trade info

Before executing, the panel summarizes the plan:

- **Planned $ Profit** — what you make if all take profit targets fill.
- **Planned $ SL** — what you lose if the stop hits.
- **R:R** — the ratio between the two.

If anything is inconsistent (a stop on the wrong side, a target below entry on a long, insufficient balance), validation messages appear and the execute button is disabled until you fix them.

## Executing and updating

Click **Execute Long / Execute Short** (or press `Cmd/Ctrl + Enter`). Market orders open immediately; limit orders go to Pending.

While a trade is open, the same panel becomes the trade editor: adjust the take profit targets or stop loss and click **Update Trade** to apply the changes to the live position. Direction, order type, and size are locked while a trade runs — use position management instead:

- **Increase / Reduce position** — scale in or out by a percentage of the position or a USDT amount, executed at the current market price (slippage applies). Reductions realize profit or loss immediately; increases raise your invested amount and shift your average entry price.
- **End trade (fast forward)** — jump the replay ahead until the trade closes on its own by hitting a target, the stop, or the end of the period. You can stop the fast-forward at any time.
- **Close position** — exit everything instantly at the current price (recorded as a manual close).
- **Cancel Limit Order** — remove a pending limit order that has not filled.

## Exit reasons

Every completed trade records why it ended: **Take Profit**, **Partial Take Profit**, **Stop Loss**, **Liquidation**, **Bar Limit** (auto exit), **Period End** (the session ran out of data), or **Manual Close**. Reviewing exit reasons later tells you a lot — for example, many manual closes on trades that would have hit take profit is a classic sign of cutting winners short.

## Journal and notes

Toggle the **Journal** button before or during a trade to save it to your trade journal when it completes. The **Notes** tab lets you write entry reasoning, screenshots of your thinking, or emotional state while the trade is live — notes travel with the journaled trade, and honest notes are what make later review valuable.

## Trade setup templates

If you trade the same setup repeatedly, save it as a template:

1. Configure direction, sizing, take profit, and stop loss the way you like.
2. Open the **Templates** menu and choose to save the current setup.
3. Give it a name, an optional description, and an optional **hotkey**.

Applying a template restores the whole configuration — sizing mode, risk settings, TP/SL modes, and R:R ratios — recalculated against the current price. Templates can be applied from the trade panel, from the floating control bar, or instantly via their hotkey, which makes single-keystroke entries possible: see your setup, press the key, execute. Templates can be edited or deleted from the same menu.
