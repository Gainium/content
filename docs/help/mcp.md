---
id: 138
name: Connect Gainium MCP to AI apps
slug: mcp
description: >-
  Connect Gainium to AI apps (Claude, ChatGPT, Perplexity, and other MCP
  clients) via MCP. The directory connector is read-only; add the custom
  connector for full read + write access. Covers authentication, tools, safety,
  and self-hosting.
createdAt: '2026-03-11T00:00:00.000Z'
updatedAt: '2026-06-14T00:00:00.000Z'
publishedAt: '2026-03-11T00:00:00.000Z'
locale: en
categories:
  - platform
difficulty: intermediate
tags:
  - api
faq:
  - title: Do I need an API key to connect my AI app?
    details: >-
      No. When you add Gainium from an AI app's connector directory or via the
      hosted connector URL, you authorize with a one-click sign-in (OAuth). Your
      app gets its own dedicated, scoped, revocable connection with no API key to
      copy. API keys are only needed if you self-host the Gainium MCP server.
  - title: What is the difference between the read-only and read + write connectors?
    details: >-
      The read-only connector (listed in app directories) can view bots, deals,
      balances, exchanges, the screener, backtests, and curated presets — it
      never places or modifies trades. The read + write connector (a custom
      connector you add by URL) can also create, start, stop, and modify bots and
      deals.
  - title: How do I keep an AI app on paper trading or restricted to one bot?
    details: >-
      Use the read-only connector if the app only needs to read. For the read +
      write connector, choose paper-trading-only or a single-bot limit on the
      consent screen, or create an API key with those restrictions. Self-hosters
      can also set GAINIUM_PAPER_ONLY and GAINIUM_ALLOWED_BOT_ID.
  - title: How do I review or revoke a connection?
    details: >-
      Open Gainium, then Settings, then Connected apps to see every authorized
      app and revoke any of them. Revoking immediately deletes that connection's
      access key.
ingested: true
ingestedAt: '2026-06-14T00:00:00.000Z'
tldr: >-
  Gainium MCP lets AI apps connect to your Gainium account. The connector listed
  in app directories is read-only (view bots, deals, the screener, backtests, and
  curated presets); add the custom connector (mcp.gainium.io/mcp) for read +
  write. Connect with a one-click OAuth sign-in — no API key to copy. See the
  per-app guides below for setup.
---

Gainium MCP lets AI apps — Claude, ChatGPT, Perplexity, and other MCP-compatible clients — connect to your Gainium account. They can read your bots, deals, balances, exchanges, backtests, the crypto screener, and curated strategy presets. With the read + write connector, they can also create and manage bots and deals.

This is the general guide. For click-by-click setup, jump to your app below.

You can also follow along with this video walkthrough:

https://www.youtube.com/watch?v=aDLmeQ5AHgo

## Set up in your AI app

Pick your app for step-by-step instructions:

| App | Setup guide |
|---|---|
| **Claude** — claude.ai, Desktop, and Code | [Connect Gainium to Claude →](https://gainium.io/help/mcp-claude) |
| **ChatGPT** | [Connect Gainium to ChatGPT →](https://gainium.io/help/mcp-chatgpt) |
| **Perplexity** | [Connect Gainium to Perplexity →](https://gainium.io/help/mcp-perplexity) |

> **Using another MCP client** (VS Code, Cursor, or your own)? The connector URLs and configuration examples are in **Advanced: run your own server or use another client**, below.

## The two connectors: read-only vs read + write

Gainium offers two connectors. Choose based on whether your AI should only **read** your account or also **manage** it:

| | Read-only | Read + write |
|---|---|---|
| **Connector URL** | `https://mcp.gainium.io/read` | `https://mcp.gainium.io/mcp` |
| **How you add it** | Listed in AI-app connector directories — pick **Gainium** | Add as a **custom connector** by URL |
| **What the AI can do** | View bots, deals, balances, exchanges, the screener, backtests, and curated presets | Everything read-only, **plus** create / start / stop / modify bots and deals |
| **Best for** | Monitoring, screening, and analysis | Hands-off trading and bot management |

> **The connector listed in AI-app directories is read-only.** It performs no trades and moves no funds. Trading (read + write) is a separate connector you add manually by URL — it is not the directory listing.

## Before you start

- A Gainium account with [2FA enabled](https://gainium.io/help/2fa)
- The AI app you want to connect (Claude, ChatGPT, Perplexity, or another MCP client)

You only need a Gainium **API key** if you self-host the MCP server (see Advanced). For the directory and hosted connectors, you authorize with a one-click sign-in — no API key to copy.

## How the connection works

When you add Gainium from an app's connector directory or via a hosted connector URL, the app authorizes with a secure one-click sign-in (**OAuth**):

- You sign in to Gainium (with 2FA) and approve access.
- The app gets its own **dedicated, scoped, revocable** connection. Gainium creates the underlying key automatically — it is separate from any API keys you create manually and will not appear in your API Keys list.
- On the **read + write** connector, the consent screen lets you choose read or trading (write) access, and optionally **paper-trading-only** or a **single-bot** restriction. The **read-only** connector grants view access only.

Manage or revoke any connection anytime under **Gainium → Settings → Connected apps**. Revoking immediately deletes that connection's access key.

## What your AI can do

**Read (both connectors):** list and inspect DCA, Combo, and Grid bots and their deals; check balances and connected exchanges; run the crypto screener; review backtests; and browse curated, backtested strategy presets.

**Write (read + write connector only):** create, clone, start, stop, archive, and modify bots; open, adjust, and close deals; add or reduce deal funds; set take-profit and stop-loss.

## Safety: paper trading and restrictions

- Default to the **read-only** connector unless your AI needs to place or modify trades.
- On the read + write connector, keep **paper trading only** enabled while you test, or pass `paperContext: true` per request.
- You can restrict a connection to a **single bot** on the consent screen (or with an API-key restriction / self-host environment variable).

See [Paper Trading (Forward testing)](https://gainium.io/help/paper-trading-forward-testing) for how paper mode works inside Gainium.

## Example prompts to try

What you can do depends on **which connector you added** — read-only or read + write.

### With the read-only connector

These only read your account and the market — safe to run anytime:

1. **Find opportunities:**

   > Find the 5 most volatile coins on the Gainium screener and summarize their 24-hour price moves and volume.

2. **Evaluate strategies:**

   > Show Gainium's top curated DCA presets for BTC on Binance and compare the short, mid, and long risk tiers by ROI and max drawdown.

3. **Review your portfolio:**

   > Summarize my open bots, deals, and balances with pair, status, take-profit %, and unrealized P&L, and flag any open deal that has no stop-loss set.

### With the read + write connector

These also **create or manage** bots and deals — keep the connection on paper trading while you test:

4. **Build from the screener:**

   > Find the 3 most volatile coins and create a **paper** DCA bot trading them with a 2% take-profit and a 3-order safety ladder.

5. **Apply a curated strategy:**

   > Create a **paper** bot from Gainium's mid-risk long DCA preset for BTC on Binance.

6. **Adjust a deal:**

   > Set a 20% take-profit on my open BNBUSDT **paper** deal.

Prompts 1–3 work on either connector; prompts 4–6 require the **read + write** connector — keep it paper-only (or pass `paperContext: true`) until you are ready to trade for real.

## Advanced: run your own server or use another client

Most users can skip this. Use it if your client is not a directory app — or if you want to run Gainium MCP yourself with your own API key.

You will need a Gainium API key and secret ([create one](https://gainium.io/help/gainium-api-for-developers)). When you create the key you can scope it to read-only and set a trading-mode or single-bot restriction; those limits are enforced server-side.

### Local stdio (recommended for self-hosting)

Your client launches `gainium-mcp` locally; credentials stay on your machine:

```json
{
  "mcpServers": {
    "gainium": {
      "command": "npx",
      "args": ["-y", "gainium-mcp"],
      "env": {
        "GAINIUM_API_KEY": "YOUR_GAINIUM_API_KEY",
        "GAINIUM_API_SECRET": "YOUR_GAINIUM_API_SECRET"
      }
    }
  }
}
```

Add `"GAINIUM_PAPER_ONLY": "true"` and/or `"GAINIUM_ALLOWED_BOT_ID": "<botId>"` to force paper trading or lock the server to a single bot, regardless of the API key's own permissions.

### Hosted HTTP with an API key

For clients that authenticate with headers instead of the OAuth connector:

```json
{
  "mcpServers": {
    "gainium": {
      "transport": "http",
      "url": "https://mcp.gainium.io/mcp",
      "headers": {
        "X-API-Key": "YOUR_GAINIUM_API_KEY",
        "X-API-Secret": "YOUR_GAINIUM_API_SECRET"
      }
    }
  }
}
```

Any trading-mode or bot-ID restriction baked into the API key is enforced here too. (Connecting from Claude, ChatGPT, or Perplexity? Use the one-click connector in your [per-app guide](#set-up-in-your-ai-app) instead — no headers needed.)

### Local HTTP and SSE

Run the server in HTTP mode if your client needs a local HTTP or SSE endpoint:

```bash
export GAINIUM_API_KEY=YOUR_GAINIUM_API_KEY
export GAINIUM_API_SECRET=YOUR_GAINIUM_API_SECRET
export GAINIUM_MCP_TRANSPORT=http
export GAINIUM_MCP_HOST=127.0.0.1
export GAINIUM_MCP_PORT=3000
node dist/server.js
```

Then connect to `http://127.0.0.1:3000/mcp`. Legacy SSE endpoints (`GET /sse`, `POST /messages?sessionId=...`) are also available; prefer `/mcp` when your client supports modern MCP over HTTP.

## Troubleshooting

**The connector won't authorize / sign-in fails.** Make sure you are signed in to Gainium with 2FA, and that pop-ups are allowed for the sign-in window. You can review or remove the connection under Settings → Connected apps and try again.

**A write action is refused.** The read-only connector cannot create or modify anything — add the read + write connector for that. If you are on read + write, check that the connection (or your API key) is not restricted to read, paper-only, or a single bot.

**Self-hosting: "missing credentials."** Set `GAINIUM_API_KEY` and `GAINIUM_API_SECRET` on the server process (local stdio/HTTP), or send `X-API-Key` / `X-API-Secret` headers (hosted HTTP with an API key).

**Your client only supports SSE.** Run the server in local HTTP mode and connect to `/sse` (see Advanced).

## Recommended defaults

- Use the **read-only** connector unless your AI needs to place or modify trades.
- For trading, use the **read + write** connector and keep **paper trading only** on while you test.
- Self-hosting? Prefer **local stdio** with a scoped API key, and set `GAINIUM_PAPER_ONLY` / `GAINIUM_ALLOWED_BOT_ID` if you want server-enforced limits.
