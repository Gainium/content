---
id: 147
name: Connect Gainium to ChatGPT
slug: mcp-chatgpt
description: >-
  Connect Gainium to ChatGPT as an MCP connector. Use the read-only connector for
  screening, backtest review, and portfolio monitoring, or the custom connector
  for full read + write access.
createdAt: '2026-06-14T00:00:00.000Z'
updatedAt: '2026-06-14T00:00:00.000Z'
publishedAt: '2026-06-14T00:00:00.000Z'
locale: en
categories:
  - platform
difficulty: intermediate
tags:
  - api
ingested: true
ingestedAt: '2026-06-14T00:00:00.000Z'
tldr: >-
  Add Gainium to ChatGPT as a connector and authorize with a one-click sign-in
  (OAuth). The directory/read-only endpoint is https://mcp.gainium.io/read; the
  read + write endpoint is https://mcp.gainium.io/mcp.
---

Gainium connects to ChatGPT as a remote MCP connector, authorized with a secure one-click sign-in (OAuth) — no API key to copy.

For what Gainium MCP does, the full tool list, paper-trading and safety controls, and troubleshooting, see [Connect Gainium MCP to AI agents](https://gainium.io/help/mcp).

## Which endpoint should I use?

| | Read-only | Read + write |
|---|---|---|
| **URL** | `https://mcp.gainium.io/read` | `https://mcp.gainium.io/mcp` |
| **What ChatGPT can do** | View bots, deals, balances, the screener, backtests, and curated presets | Everything read-only, **plus** create / start / stop / modify bots and deals |
| **Best for** | Screening, backtest review, portfolio monitoring | Hands-off trading and bot management |

## Before you start

- A Gainium account with [2FA enabled](https://gainium.io/help/2fa)
- A ChatGPT plan that supports connectors / apps, with connector (developer/custom) access enabled in settings

## Add the connector

1. In ChatGPT, open **Settings → Connectors** (you may need to enable custom/developer connectors first).
2. Choose **Add** / **New connector** and enter the MCP server URL:
   - Read-only: `https://mcp.gainium.io/read`
   - Read + write: `https://mcp.gainium.io/mcp`
3. ChatGPT opens a Gainium sign-in page. Sign in (with 2FA) and **Authorize**.
   - The **read-only** endpoint grants view access only — nothing else to configure.
   - The **read + write** endpoint lets you choose read or trading (write) access, and optionally paper-trading-only or a single-bot restriction, on the consent screen.

Once Gainium appears in the connector directory, you can also add it directly from there (read-only) instead of entering the URL.

Each connection is backed by a dedicated, scoped API key Gainium creates automatically; it will not appear in your manual API Keys list.

## Manage or revoke

Open **Gainium → Settings → Connected apps** to review or **Revoke** any authorized app at any time. Default to the **read-only** endpoint unless you specifically want ChatGPT to place or modify trades, and keep **paper trading only** enabled while testing.

> ChatGPT's connector menus change over time — if the exact location differs, look for "Connectors," "Apps," or "MCP servers" in Settings. The Gainium URLs and OAuth flow above stay the same.
