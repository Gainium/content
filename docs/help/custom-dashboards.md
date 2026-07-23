---
id: 1030
name: Custom Dashboards
slug: custom-dashboards
description: >-
  Create multiple custom dashboards with widgets: start from a template, add
  and arrange widgets on a grid, save layouts, and switch dashboards with a
  click or keyboard shortcut.
createdAt: '2026-07-23T09:00:00.000Z'
updatedAt: '2026-07-23T09:00:00.000Z'
publishedAt: '2026-07-23T09:00:00.000Z'
locale: en
categories:
  - platform
difficulty: beginner
tags: []
tldr: >-
  Gainium lets you build any number of custom dashboards, each with its own set
  of widgets arranged on a drag-and-drop grid. Create dashboards from templates
  or from scratch, add widgets from the widget browser, resize and rearrange
  them freely (or let Tidy up do it for you), and lock the grid when you are
  happy. Everything saves automatically and syncs to your account.
---

Everyone monitors their trading differently. Some traders want a wall of charts, others want a minimal profit summary, and others want bots, news, and notes side by side. Custom dashboards let you build exactly the view you need — and as many of them as you want.

A dashboard is a page made of **widgets**: self-contained cards showing your portfolio value, profit, bot stats, charts, watchlists, news, notes, and more. You can add, remove, resize, and rearrange widgets on a grid, save different arrangements, and switch between dashboards instantly.

> **Overview vs. dashboards:** the **Overview** page is a fixed, curated summary that is the same for everyone. Custom dashboards are fully yours — different widgets, different layouts, different purposes.

## Your first dashboards

The first time you use dashboards, Gainium creates three starter dashboards for you:

- **Trading** — chart, watchlist, latest orders, and quick actions.
- **Portfolio** — portfolio value, profit, allocation, and balances.
- **Market** — live chart, watchlist, and a news feed.

These are just starting points. You can rename them, change their widgets, or delete them (as long as at least one dashboard remains).

## Creating a dashboard

You can create a new dashboard from two places:

- **The Dashboards panel** in the navigation sidebar — click the **+** button in the panel header.
- **The Dashboard Manager** — open it from the dashboard page's toolbar and click **New** in the *All Dashboards* section.

Both open the same creation dialog:

1. **Pick a starting point.** Choose **Blank** for an empty dashboard, or pick a template (see below). Each template card shows how many widgets it includes.
2. **Name it.** The name must be unique, between 2 and 50 characters. Picking a template pre-fills its name, but you can type your own at any time.
3. Click **Create Dashboard**. You are taken straight to the new dashboard.

Each dashboard gets its own web address based on its name (for example, a dashboard called "My Bots" lives at `/dashboard/my-bots`), so you can bookmark individual dashboards.

## Dashboard templates

Templates give you a sensible pre-built layout that you can then customize freely:

| Template | What it's for |
| --- | --- |
| **Portfolio Overview** | Big-picture portfolio: value, profit, allocation, and balances at a glance. |
| **Trading Desk** | Active-trading layout with chart, watchlist, latest orders, and quick actions. |
| **Bot Performance** | Monitor running bots, deal allocation, and detailed bot statistics. |
| **Portfolio Deep Dive** | Analytical view: allocation, categories, exchange split, and full balances. |
| **Daily Briefing** | Start-the-day view: portfolio snapshot, market chart, news feed, and notes. |
| **Market Watch** | Lightweight market view: live chart, watchlist, and a news ticker. |
| **Minimal** | A clean starting point — portfolio value, profit, and a watchlist. |
| **Market Pulse** | Whole-market view: treemap, fear & greed sentiment, indicator heatmap, and a screener. |
| **Portfolio Analytics** | Deep portfolio breakdown with treemap, market-cap tiers, and per-asset performance. |
| **Strategy Discovery** | Curated bot presets, market chart, and a watchlist to test ideas. |
| **New Account** | Onboarding-friendly layout: setup checklist, quick actions, watchlist, and presets. |

A template only sets the initial widgets and their arrangement — after creation, the dashboard is fully editable like any other. The available templates can differ slightly between the Gainium cloud and self-hosted editions, since some widgets are cloud-only.

## Switching between dashboards

- **Dashboards panel:** open the *Dashboards* section of the navigation sidebar and click any dashboard. Pin the panel to keep it open while you browse.
- **Dashboard Manager:** click any dashboard in the *All Dashboards* list.
- **Direct link:** every dashboard has its own URL — bookmark the ones you use most.
- **Keyboard shortcut:** each dashboard can have its own shortcut. In the Dashboard Manager, use the shortcut recorder next to a dashboard to record a key combination; pressing it will jump straight to that dashboard from anywhere in the app.

## Managing dashboards

Open the **Dashboard Manager** from the dashboard page toolbar. It has three sections — dashboards, layout, and widgets — so everything is in one place. In the *All Dashboards* list you can:

- **Switch** — click a dashboard to open it.
- **Reorder** — drag dashboards by the grip handle to change their order in lists and panels.
- **Rename** — the new name must still be unique (2–50 characters). The dashboard's URL follows the new name.
- **Clone** — creates a full copy of a dashboard, including all its widgets, their settings, and layout. Handy for experimenting without touching a layout you like.
- **Delete** — permanently removes the dashboard. You cannot delete your only dashboard, and deletion cannot be undone. If you delete the dashboard you are currently viewing, you are moved to another one automatically.

The *Current Dashboard Actions* card offers two save options:

- **Save Dashboard** — stores a named snapshot of the current widget arrangement under the dashboard's own name. You can return to this snapshot later with *Reset to Last Saved* (see Layout tools below).
- **Save as New** — duplicates the current dashboard under a new name, like cloning.

Note that day-to-day changes are saved automatically as you make them — these save actions are for capturing snapshots you may want to come back to.

## Adding and removing widgets

Open the **Widget Manager** (the *Widgets* section of the Dashboard Manager). It lists every widget currently on the dashboard and lets you:

- **Add widgets** — click *Add Widget* to open the widget browser, which groups widgets by category (Portfolio, Analytics, Bots, Trading, Market, News, Utilities). Each entry shows a short description of what the widget does. You can add several widgets in a row without closing the browser, and you can add multiple copies of the same widget — for example, two Coin Charts showing different pairs.
- **Remove widgets** — via the remove button on each list entry, or directly on the widget itself with the **×** button.
- **Reorder widgets** — drag entries in the list to re-flow the grid.
- **Open a widget's settings** — for widgets that have configuration options.

The *Controls always visible* switch decides whether widget controls (settings, menu, remove, drag handle) are shown permanently on every widget or only appear when you hover over one. Hover-only keeps the dashboard cleaner; always-visible is easier on touch devices.

If a dashboard is empty, the page itself shows an **Add Widgets** button that opens the same browser.

## The widget catalog

The exact set of widgets depends on your edition (some are cloud-only), but the core catalog includes:

| Widget | Category | What it shows |
| --- | --- | --- |
| Portfolio Value | Portfolio | Real-time portfolio value chart with time filters. |
| Profit over time | Analytics | Profit analysis with statistics and charts. |
| Accumulated Profit | Analytics | Accumulated profit over time. |
| Portfolio Allocation | Portfolio | Asset distribution of your portfolio. |
| Portfolio Balances | Portfolio | Balances with token amounts and current prices. |
| Categories Analysis | Portfolio | Portfolio split by asset categories (DeFi, Layer 1, etc.). |
| Exchange Distribution | Portfolio | Portfolio value breakdown across exchanges. |
| Status | Bots | Bot & deal status summary. |
| Bot Stats | Bots | Deep stats for selected DCA & Combo bots: realized profit, allocated capital, trades, and profit/equity charts. |
| Latest Orders | Trading | Real-time order history with details. |
| Treemap: Deals | Trading | DCA deal allocation as an interactive treemap. |
| Watchlist | Trading | Real-time price monitoring for your favorite pairs. |
| Coin Chart | Market | Interactive TradingView price chart. |
| News RSS | News | RSS news reader with customizable sources. |
| Notes | Utilities | Markdown notes for your own annotations. |
| Quick Actions | Utilities | One-click access to create trades and bots. |

Cloud users additionally get widgets such as the **Token Screener**, **Fear & Greed Index**, **Market Treemap**, **Portfolio Treemap**, **Indicator Heatmaps** (market and portfolio), **Portfolio Market Cap Breakdown**, **Portfolio Performance**, **Top Strategies**, and the **Onboarding Checklist**.

Widgets with a gear icon have their own settings — for example, which bots the Bot Stats widget tracks, which pair the Coin Chart shows, or which feeds the News widget reads. These settings are saved per widget copy, so two copies of the same widget can be configured differently.

## Arranging widgets on the grid

Dashboards use a 12-column grid. While the grid is **unlocked** (the default) you can:

- **Move** a widget — grab the drag handle (the dotted grip icon in the widget's controls) and drop it anywhere. Other widgets flow around it.
- **Resize** a widget — drag its bottom-right corner. Each widget has a sensible minimum and maximum size so it always stays readable.
- **Collapse** a widget — the chevron in the header shrinks the widget to just its title bar, freeing vertical space without removing it.
- **Rename** a widget — click its title and type a new one. Clear the name to restore the automatic title. Renaming helps when you keep multiple copies of the same widget.

When the arrangement is exactly right, **lock the grid** (see Layout tools) to prevent accidental drags and resizes. Locking also hides the editing controls, giving you a clean monitoring view.

All changes are saved automatically the moment you make them.

## Widget controls and menu

Hovering over a widget (or tapping it on mobile) reveals its controls: filters (on widgets that support them), settings, the widget menu, remove, and the drag handle. The **widget menu** (⋮) offers:

- **Enter fullscreen** — expands the widget to fill the app window (see below).
- **Force Refresh** — re-fetches the widget's data immediately, bypassing any cached values.
- **Reset to default** — clears the widget's custom settings, name, and size, returning it to its out-of-the-box state. This asks for confirmation and cannot be undone.
- **Duplicate** — adds a copy of the widget (with default settings) next to the original.
- **Delete** — removes the widget from the dashboard.

## Fullscreen mode

Any widget can take over the whole window — useful for putting a chart or the bot stats on a second monitor:

- Open it from the widget menu (**Enter fullscreen**), or simply **triple-click** the widget.
- Use the **left/right arrow** buttons (or arrow keys) to flip through the other widgets on the dashboard without leaving fullscreen.
- The fullscreen toolbar also gives you the widget's settings, menu, and a **native fullscreen** toggle that additionally hides the browser chrome.
- Press **Escape** (or triple-click again) to exit.

## Keyboard shortcuts

Click a widget to select it (it gets a highlighted outline), then:

| Action | Selected widget | In fullscreen |
| --- | --- | --- |
| Open settings | Ctrl/Cmd + O | O |
| Duplicate | Ctrl/Cmd + D | D |
| Force refresh | Ctrl/Cmd + U | U |
| Fullscreen | Ctrl/Cmd + F | F (native fullscreen) |
| Delete | Ctrl/Cmd + Backspace | Shift + Delete |
| Previous / next widget | — | ← / → |
| Exit fullscreen | — | Escape |

You can also record per-dashboard shortcuts in the Dashboard Manager, and the manager drawers themselves have shortcuts shown next to their titles.

## Layout tools

The **Layout** section of the Dashboard Manager works on the current dashboard's arrangement:

- **Lock / Unlock** — locks the grid so widgets cannot be dragged or resized. Lock it once your layout is final; unlock to edit again.
- **Tidy up** — automatically re-packs the layout: widgets are reset to their default sizes, arranged compactly left-to-right and top-to-bottom, then stretched to fill leftover horizontal space and close vertical gaps. It is the fastest way to clean up after heavy rearranging.
- **Save** — stores the current arrangement as a named layout. You can keep several named layouts per dashboard (for example "compact" and "detailed") and switch between them at will. Saving under an existing name overwrites that layout.
- **Layout Presets → Default** — restores the built-in default widget set and arrangement for your screen size. This replaces the current widgets, so save first if you want a way back.
- **Saved Layouts** — click a saved layout to load it; the **×** deletes it (with confirmation).
- **Reset to Last Saved** — discards current changes and reloads the layout you most recently saved. If nothing was ever saved, it falls back to the default layout.
- **Export / Import Layout** — downloads the dashboard (widgets, settings, and arrangement) as a file, or restores one from a file. Use this to back up a favorite dashboard or share it between accounts.

## How layouts adapt to screen size

Dashboards are responsive. While a dashboard still uses an untouched default layout, Gainium automatically adjusts widget sizes — and even which default widgets appear — to fit your current screen, so the same dashboard looks right on a laptop and an ultrawide monitor.

As soon as you customize the layout (move, resize, add, or remove a widget), your arrangement is preserved as-is and automatic adjustments stop. Widgets still re-flow gracefully on smaller screens, but your sizes and order are kept. Saved layouts remember the screen size they were created on, which is shown in the Saved Layouts list so you can tell which layout was made for which display.

## Saving and syncing

There is no explicit "save" step for everyday edits: every change — adding a widget, resizing, renaming a dashboard — is stored automatically and synced to your Gainium account, so your dashboards follow you across browsers and devices. The named snapshots (*Save Dashboard*, saved layouts, exports) exist on top of that as restore points you control.
