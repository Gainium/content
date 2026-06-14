---
id: 138
name: Connect Gainium MCP to AI agents
slug: mcp
description: >-
  Learn how to connect Gainium MCP to AI agents — including the one-click Claude
  connector (OAuth), VS Code, Claude Code, OpenClaw, and other MCP-compatible
  clients.
createdAt: '2026-03-11T00:00:00.000Z'
updatedAt: '2026-06-13T00:00:00.000Z'
publishedAt: '2026-03-11T00:00:00.000Z'
locale: en
categories:
  - platform
difficulty: intermediate
tags:
  - api
faq:
  - title: Which Gainium API key permission should I use?
    details: >-
      Use a Read key if your agent only needs to inspect bots, deals, balances,
      exchanges, or backtests. Use a Write key only if you want the agent to
      create, edit, start, stop, archive, restore, or clone bots and deals.
  - title: Can I force paper trading or restrict the MCP to one bot from the client config?
    details: >-
			Not from the client config alone. You can enforce trading mode and an
			optional bot ID by creating the API key with those restrictions, which
			also works over hosted HTTP. If you run your own Gainium MCP instance,
			you can also enforce them locally with GAINIUM_PAPER_ONLY and
			GAINIUM_ALLOWED_BOT_ID, even if the API key itself was created without
			those restrictions.
  - title: Which transport should I use?
    details: >-
      Use local stdio when your client supports it because it is the simplest
      and keeps credentials local. Use remote HTTP when you do not want to run
      the server yourself. Use local HTTP or SSE only when your client requires
      them.
  - title: Do I need an API key to connect Claude?
    details: >-
      No. Add the Gainium connector in Claude and authorize with a one-click
      sign-in (OAuth). Claude gets its own dedicated, scoped, revocable
      connection without you copying any API key. You choose read or write
      access and optional paper-only or single-bot limits on the consent screen,
      and you can review or revoke the connection anytime under Settings,
      Connected apps.
ingested: true
ingestedAt: '2026-03-11T00:00:00.000Z'
tldr: >-
  Gainium MCP lets AI agents read and manage your Gainium account through MCP
  tools. Claude users should connect with the one-click Gainium connector
  (OAuth, no API key to copy); other clients use local stdio or hosted HTTP.
	Use a Read key or scope unless write access is required, and use API key
	restrictions or paperContext: true when you need paper-only or single-bot
	safety controls.
---

Gainium MCP lets MCP-compatible agents connect to your Gainium account so they can read bots, deals, balances, exchanges, backtests, and other account data. With the correct API key permission, agents can also create and manage bots and deals.

This guide focuses on the part most users care about: how to connect Gainium MCP to your agent or MCP client.

You can also follow along with this video walkthrough:

https://www.youtube.com/watch?v=aDLmeQ5AHgo

## Example prompts to try

Once Gainium MCP is connected, you can drive your account in plain language. These prompts work in any MCP-compatible agent (Claude, VS Code, Claude Code, or another client). Start with **paper trading** while you get comfortable.

1. **Review your account (read-only):**

   > Connect to my Gainium account and give me a portfolio summary: list my open bots and deals with their pair, status, take-profit %, and unrealized P&L, and flag any open deal that has no stop-loss set.

2. **Build a bot from the most volatile pairs (paper):**

   > Using the Gainium screener, find the 3 most volatile coins by 24-hour price change and create a **paper** DCA bot trading those pairs with a 2% take-profit and a 3-order safety ladder. Show me the bot's settings after it's created.

3. **Try a curated strategy (paper):**

   > Show me Gainium's top curated DCA presets for BTC on Binance, compare the short, mid, and long risk tiers by ROI and max drawdown, then create a **paper** bot from the mid-risk long strategy.

The agent picks the right Gainium tools for each step. Read prompts are always safe; for any prompt that creates or changes a bot or deal, keep the connection on **paper trading only** (or pass `paperContext: true`) until you are ready to trade for real.

## Before you start

Before connecting an agent, make sure you have:

- A Gainium account with [2FA enabled](https://gainium.io/help/2fa)
- A Gainium API key and secret
- An MCP-compatible client such as VS Code, Claude Code, OpenClaw, or another MCP client

When you create the API key, choose the permission scope you need and, if relevant, set the trading mode and bot ID restriction there as well. Those restrictions are enforced server-side, including when you connect through hosted HTTP.

If you have not created an API key yet, follow [Gainium API for developers](https://gainium.io/help/gainium-api-for-developers).

If you want to protect those credentials more carefully, review [Enhancing security of your exchange API keys](https://gainium.io/help/enhancing-security) as well.

## Choose the right connection mode

Gainium MCP supports several transport modes, but most users only need one of these:

- **Claude connector (OAuth)**: in Claude, add Gainium as a connector and authorize with a one-click sign-in — no API key to copy
- **Local stdio**: your MCP client launches `gainium-mcp` as a local process on your computer
- **Hosted remote HTTP**: your MCP client connects to the hosted Gainium MCP endpoint

Use the **Claude connector** when:

- You use Claude on claude.ai or Claude Desktop
- You want the simplest setup with no API keys to copy or store
- You want a connection you can review and revoke from your Gainium settings

Use **local stdio** when:

- Your client supports `stdio`
- You want the simplest setup
- You want your API credentials to stay local on your machine

Use **hosted remote HTTP** when:

- You do not want to run the server locally
- Your client supports MCP over HTTP
- Your client lets you send custom headers

Use **local HTTP** or **SSE** only when your client specifically requires them.

## Connect Claude with the Gainium connector (OAuth)

If you use Claude on claude.ai or Claude Desktop, the easiest way to connect is the **Gainium connector**, which uses a secure one-click sign-in (OAuth). You do not copy or paste any API keys. You sign in to Gainium and approve access, and Claude gets its own dedicated, scoped, revocable connection.

There are two ways to add it, depending on whether you want Claude to **only read** your account or to also **manage bots and deals**:

| | Directory connector (read-only) | Custom connector (read + write) |
|---|---|---|
| **How to add** | Pick **Gainium** from Claude's connector directory | **Add custom connector** → `https://mcp.gainium.io/mcp` |
| **What Claude can do** | View bots, deals, balances, exchanges, backtests, screener, and curated presets | Everything read-only, **plus** create/start/stop/modify bots and deals |
| **Best for** | Monitoring and analysis | Hands-off trading and bot management |

### Add the read-only connector (directory)

1. In Claude, open **Settings → Connectors**.
2. Choose **Gainium** from the connector directory.
3. Click **Connect**. Claude opens a Gainium sign-in page in your browser.
4. Sign in (with 2FA) and click **Authorize**. The directory connector is **read-only** — it cannot place or modify trades, so there is nothing extra to configure.

### Add the read + write connector (custom)

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
4. Click **Authorize**. Claude is connected — there is no API key to copy.

Each connection is backed by a dedicated, scoped API key that Gainium creates automatically. It is separate from the API keys you create manually, so it will not appear in your API Keys list.

### Manage or revoke the connection

Open **Gainium → Settings → Connected apps** to see the apps you have authorized and when each was last used. Click **Revoke** to immediately cut an app's access; this deletes the connection's access key. You can also tighten an active connection later, for example by lowering it from write to read.

Default to the **read-only directory connector** unless you specifically want Claude to place or modify trades. When using the read + write connector, enable **Paper trading only** while you are testing.

## Option 1: Connect with local stdio

This is the recommended setup for most users.

Your MCP client launches Gainium MCP locally with `npx`, and Gainium credentials are passed through environment variables.

Example configuration:

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

In this setup, your client does not need to send `X-API-Key` or `X-API-Secret` headers because the local MCP server already has the credentials.

### Local stdio with a single-bot restriction and forced paper mode

If you run your own local instance, you can lock it down to one bot and force paper trading:

```json
{
	"mcpServers": {
		"gainium": {
			"command": "npx",
			"args": ["-y", "gainium-mcp"],
			"env": {
				"GAINIUM_API_KEY": "YOUR_GAINIUM_API_KEY",
				"GAINIUM_API_SECRET": "YOUR_GAINIUM_API_SECRET",
				"GAINIUM_ALLOWED_BOT_ID": "507f1f77bcf86cd799439011",
				"GAINIUM_PAPER_ONLY": "true"
			}
		}
	}
}
```

These two settings are server-side restrictions:

- `GAINIUM_ALLOWED_BOT_ID` limits the MCP server to a single bot
- `GAINIUM_PAPER_ONLY=true` rejects real-trading calls and defaults requests to paper mode

## Option 2: Connect to the hosted remote HTTP endpoint

If you do not want to run Gainium MCP locally, connect your client to the hosted endpoint:

```text
https://mcp.gainium.io/mcp
```

> **Connecting from Claude?** Use the [Gainium connector (OAuth)](#connect-claude-with-the-gainium-connector-oauth) instead — the hosted endpoint authenticates Claude with a one-click sign-in, not API-key headers. The `X-API-Key` / `X-API-Secret` header method below is for clients that authenticate with a direct API key, such as a self-hosted Gainium MCP instance you run yourself.

Example configuration:

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

In this mode, the MCP client must send your Gainium credentials as request headers on each MCP request.

If the API key itself was created with a restricted trading mode or a specific bot ID, the server will enforce those limits even in hosted HTTP mode. If you run your own local MCP instance, you can also enforce stricter limits there with environment variables, even when the API key itself is more permissive.

### What comes from client config vs server restrictions

From the MCP client config alone, you can set:

- The MCP URL
- Request headers such as `X-API-Key` and `X-API-Secret`

From the MCP client config alone, you cannot make the server behave as if these self-hosted MCP environment variables were set:

- `GAINIUM_ALLOWED_BOT_ID`
- `GAINIUM_PAPER_ONLY`

Those two names are local MCP server environment variables, not hosted HTTP client settings.

If you use hosted HTTP and want server-enforced restrictions, create the API key with the desired trading mode and optional bot ID restriction.

If you run your own local or self-hosted Gainium MCP instance, you can enforce the same limits there with environment variables regardless of whether the API key itself is restricted.

## VS Code setup

VS Code can connect to Gainium MCP either as a local process or over HTTP.

### VS Code with local stdio

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

### VS Code with hosted HTTP

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

## Claude Code setup

Claude Code supports local and remote MCP servers.

### Claude Code with hosted HTTP

Add the hosted endpoint:

```bash
claude mcp add --transport http gainium https://mcp.gainium.io/mcp
```

The first time you use it, Claude Code opens a Gainium sign-in in your browser to authorize the connection (OAuth). You do not need to configure `X-API-Key` headers for the hosted endpoint — see [Connect Claude with the Gainium connector (OAuth)](#connect-claude-with-the-gainium-connector-oauth).

### Claude Code with local stdio

Example CLI pattern:

```bash
claude mcp add gainium -- npx -y gainium-mcp
```

Then make sure the shell environment that launches Claude Code contains:

```bash
export GAINIUM_API_KEY=YOUR_GAINIUM_API_KEY
export GAINIUM_API_SECRET=YOUR_GAINIUM_API_SECRET
```

## Claude Desktop and other desktop MCP clients

For Claude specifically, the simplest option is the [Gainium connector (OAuth)](#connect-claude-with-the-gainium-connector-oauth) described above — add it under Settings → Connectors and authorize with a one-click sign-in, with no API key to copy.

Most desktop MCP clients support one of these patterns:

- Local child process via `command`, `args`, and `env`
- Remote HTTP server via `transport`, `url`, and optional headers

If your client supports local process launch, use the local `stdio` example.

If your client supports remote MCP over HTTP, use the hosted HTTP example.

If your client only supports SSE, see the advanced section below and run a local HTTP instance that exposes `/sse` and `/messages`.

## Generic MCP client examples

### Generic local process client

```json
{
	"gainium": {
		"command": "npx",
		"args": ["-y", "gainium-mcp"],
		"env": {
			"GAINIUM_API_KEY": "YOUR_GAINIUM_API_KEY",
			"GAINIUM_API_SECRET": "YOUR_GAINIUM_API_SECRET"
		}
	}
}
```

### Generic remote HTTP client

```json
{
	"gainium": {
		"transport": "http",
		"url": "https://mcp.gainium.io/mcp",
		"headers": {
			"X-API-Key": "YOUR_GAINIUM_API_KEY",
			"X-API-Secret": "YOUR_GAINIUM_API_SECRET"
		}
	}
}
```

## Paper trading and bot restrictions

These settings are often misunderstood because they are usually not part of the MCP connection block itself.

### Paper mode

For most tool calls, paper trading is controlled per request with `paperContext: true`. If you want a refresher on how paper mode works inside Gainium itself, see [Paper Trading (Forward testing)](https://gainium.io/help/paper-trading-forward-testing).

Example:

```json
{
	"botId": "507f1f77bcf86cd799439011",
	"botType": "dca",
	"paperContext": true
}
```

If you want paper mode to be enforced automatically for every request, you have two server-side options:

- Create the API key with the appropriate trading mode restriction. This works for hosted HTTP as well as local setups.
- Run your own MCP server with:

```bash
export GAINIUM_PAPER_ONLY=true
```

These are independent enforcement layers. For example, a local `stdio` server started with `GAINIUM_PAPER_ONLY=true` will still reject real-trading calls even if the API key itself was created without a paper-only restriction.

### Bot ID restriction

Most write operations take `botId` as part of the tool input. For example:

- `manage_bot` (action `start`, `stop`, `archive`, `restore`, or `changePairs`)
- `clone_bot`
- `update_bot`

Example input:

```json
{
	"botId": "507f1f77bcf86cd799439011",
	"botType": "dca"
}
```

If you want access to be restricted to one bot regardless of client behavior, you have two server-side options:

- Create the API key with that bot ID restriction. This works for hosted HTTP as well as local setups.
- Run your own MCP instance with:

```bash
export GAINIUM_ALLOWED_BOT_ID=507f1f77bcf86cd799439011
```

These are also independent enforcement layers. A local MCP instance with `GAINIUM_ALLOWED_BOT_ID` set will reject other bot IDs even if the API key itself allows broader access.

## Advanced: local HTTP and SSE

Most users can skip this section.

If your MCP client cannot launch local processes but can connect to a local HTTP endpoint, run Gainium MCP manually:

```bash
export GAINIUM_API_KEY=YOUR_GAINIUM_API_KEY
export GAINIUM_API_SECRET=YOUR_GAINIUM_API_SECRET
export GAINIUM_MCP_TRANSPORT=http
export GAINIUM_MCP_HOST=127.0.0.1
export GAINIUM_MCP_PORT=3000
export GAINIUM_MCP_HTTP_PATH=/mcp
node dist/server.js
```

Then connect your client to:

```text
http://127.0.0.1:3000/mcp
```

Legacy SSE endpoints are also available in HTTP mode:

- `GET /sse`
- `POST /messages?sessionId=...`

Prefer `/mcp` whenever your client supports modern MCP over HTTP.

## Troubleshooting

### Missing Gainium credentials

Cause:

- Local mode is missing `GAINIUM_API_KEY` or `GAINIUM_API_SECRET`
- Hosted mode is missing `X-API-Key` or `X-API-Secret`

Fix:

- For local `stdio` or local HTTP, set the environment variables on the MCP server process
- For hosted HTTP, add the two auth headers to the client config

### Tools work locally but fail against the hosted endpoint

Cause:

- Your client may not be sending headers correctly
- The API key may be restricted to paper trading or to a different bot ID
- You may be relying on a local MCP restriction such as `GAINIUM_PAPER_ONLY` or `GAINIUM_ALLOWED_BOT_ID` that is not configured on the current MCP server
- You may need to pass `paperContext: true` explicitly

Fix:

- Verify the URL is `https://mcp.gainium.io/mcp`
- Verify `X-API-Key` and `X-API-Secret`
- Verify the API key's trading mode and bot ID restriction match what you are trying to do
- Pass `paperContext: true` for paper workflows unless your own server is already paper-locked

### Your client does not support HTTP MCP

Fix:

- Use local `stdio` if available
- If your client only supports SSE, run local HTTP mode and connect to `/sse`

## Recommended defaults

For most users:

- Use local `stdio` if your client supports it
- Use the hosted HTTP endpoint if you do not want to run the server locally
- Use a Read API key unless your agent must perform write operations
- If you need hosted HTTP with enforced limits, create a dedicated API key with the right trading mode and optional bot ID restriction
- Pass `paperContext: true` explicitly for paper workflows unless your own server already forces paper mode

If you need server-side safety controls such as one-bot restriction or forced paper trading, either create a restricted API key or run your own Gainium MCP instance instead of relying on client config alone.
