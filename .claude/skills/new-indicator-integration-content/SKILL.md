---
name: new-indicator-integration-content
description: This repo's slice of adding a brand-new indicator to Gainium — the help page the dashboard's indicator catalog links to, and what the in-app AI assistant cites when asked about the indicator. Easy to forget because it lives in a different repo from all the code. Use when scoping or writing new-indicator docs in content.
---

# New indicator integration — content's part

Canonical source: `new-indicator-integration` in Gainium's internal
`skills` repo (private — this file is a scoped copy synced from there; edit
the source, not this copy, if it needs updating).

## Global objective

Gainium's indicator math is written once and consumed across the bot
engine, backtester, market-archive, and the dashboard chart. None of that
helps a user understand what the indicator actually does or how to
configure it — this repo is that explanation, and it's also what the
in-app RAG/help assistant reads from when a user asks about the indicator.

## This repo's part

Add a markdown file: `docs/help/<slug>.md` (e.g.
`docs/help/long-wick-detector.md`). Cover:

- What the indicator measures / what the filter does, in plain terms.
- What each configurable field means (should mirror the dashboard
  catalog's field list — check `main-dash-sh`'s
  `indicatorCatalog.ts` entry for the exact fields, don't guess from the
  math alone).
- How it's typically used in a bot's entry/exit conditions.
- If this indicator's chart visual is an approximation of a more
  elaborate original (Step 0's Pine Script portability check flagged a
  gap) — mention that plainly rather than let the doc imply a 1:1 match
  with some external reference the user might already know.

The dashboard's indicator catalog links to this page by slug — the `content`
API also serves `public-frontend` and feeds main-app's RAG/help, so a
missing page means both a dead help link **and** the AI assistant having
nothing to cite about this indicator when a user asks.

## Sister repos

All public, same repo family as this one:

- **indicators** — the math this doc explains; not code this repo touches.
- **backtester** — unrelated to this repo's docs work.
- **app-sh** — unrelated to this repo's docs work directly, though the
  AI agent it exposes via the v2 API contract is a consumer of what this
  repo publishes.
- **main-dash-sh** — owns the catalog entry whose help-URL slug must match
  what this repo publishes at — confirm the exact slug before or right
  after writing the page.

Gainium's main-app and dashboard services (both ship as part of the
self-hosted bundle too) read from this repo's published content the same
way regardless of deployment — nothing self-hosted-specific to do here.
