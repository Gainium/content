---
id: 146
name: Connect Gainium to Claude
slug: mcp-claude
description: >-
  Connect Gainium to Claude (claude.ai, Claude Desktop, and Claude Code) with the
  one-click Gainium connector. Use the read-only directory connector, or add the
  custom connector for full read + write access.
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
  In Claude, add Gainium as a connector and authorize with a one-click sign-in
  (OAuth) — no API key to copy. The directory connector is read-only; add the
  custom connector URL https://mcp.gainium.io/mcp for read + write (trading).
---

Gainium connects to Claude through a secure one-click sign-in (OAuth). You do not copy or paste any API keys — you sign in to Gainium, approve access, and Claude gets its own dedicated, scoped, revocable connection.

For what Gainium MCP does, the full tool list, paper-trading and safety controls, and troubleshooting, see [Connect Gainium MCP to AI agents](https://gainium.io/help/mcp).

## Which connector should I add?

| | Read-only (directory) | Read + write (custom) |
|---|---|---|
| **How to add** | Pick **Gainium** from Claude's connector directory | **Add custom connector** → `https://mcp.gainium.io/mcp` |
| **What Claude can do** | View bots, deals, balances, exchanges, the screener, backtests, and curated presets | Everything read-only, **plus** create / start / stop / modify bots and deals |
| **Best for** | Monitoring, screening, and analysis | Hands-off trading and bot management |

## Before you start

- A Gainium account with [2FA enabled](https://gainium.io/help/2fa)
- Claude on claude.ai, Claude Desktop, or Claude Code

## Add the read-only connector (directory)

1. In Claude, open **Settings → Connectors**.
2. Choose **Gainium** from the connector directory.
3. Click **Connect**. Claude opens a Gainium sign-in page in your browser.
4. Sign in (with 2FA) and click **Authorize**. The directory connector is **read-only** — it cannot place or modify trades, so there is nothing extra to configure.

## Add the read + write connector (custom)

If you want Claude to also create and manage bots and deals:

1. In Claude, open **Settings → Connectors → Add custom connector** and enter:

   ```text
   https://mcp.gainium.io/mcp
   ```

2. Click **Connect** and sign in to Gainium (with 2FA).
3. On the consent screen, choose what Claude can do:
   - **Read access** (default): view bots, deals, balances, exchanges, and backtests
   - **Trading (write) access** (optional): create, start, stop, and modify bots and deals
   - **Paper trading only** (optional): restrict the connection to paper trading
   - **Restrict to a single bot** (optional): limit access to one bot ID
4. Click **Authorize**. There is no API key to copy.

Each connection is backed by a dedicated, scoped API key that Gainium creates automatically. It is separate from the API keys you create manually, so it will not appear in your API Keys list.

## Claude Code (CLI)

Add the hosted endpoint and authorize with OAuth on first use:

```bash
# Read-only
claude mcp add --transport http gainium-read https://mcp.gainium.io/read

# Read + write
claude mcp add --transport http gainium https://mcp.gainium.io/mcp
```

The first time you use it, Claude Code opens a Gainium sign-in in your browser. You can also run Gainium MCP locally over stdio with an API key — see [the main guide](https://gainium.io/help/mcp).

## Manage or revoke the connection

Open **Gainium → Settings → Connected apps** to see the apps you have authorized and when each was last used. Click **Revoke** to immediately cut an app's access; this deletes the connection's access key. You can also tighten an active connection later, for example by lowering it from write to read.

Default to the **read-only** connector unless you specifically want Claude to place or modify trades. When using the read + write connector, enable **Paper trading only** while you are testing.
