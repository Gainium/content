---
id: 138
name: Connect Gainium MCP to AI agents
slug: mcp
description: >-
	Learn how to connect Gainium MCP to AI agents such as VS Code, Claude Code,
	OpenClaw, and other MCP-compatible clients.
createdAt: '2026-03-11T00:00:00.000Z'
updatedAt: '2026-03-11T00:00:00.000Z'
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
			No. GAINIUM_PAPER_ONLY and GAINIUM_ALLOWED_BOT_ID are server-side
			environment variables. To enforce them, you must run your own Gainium MCP
			instance with those values set.
	- title: Which transport should I use?
		details: >-
			Use local stdio when your client supports it because it is the simplest
			and keeps credentials local. Use remote HTTP when you do not want to run
			the server yourself. Use local HTTP or SSE only when your client requires
			them.
ingested: true
ingestedAt: '2026-03-11T00:00:00.000Z'
tldr: >-
	Gainium MCP lets AI agents read and manage your Gainium account through MCP
	tools. Most users should connect with local stdio or hosted HTTP, use a Read
	key unless write access is required, and pass paperContext: true in tool calls
	for paper trading unless their own server is already paper-locked.
---

Gainium MCP lets MCP-compatible agents connect to your Gainium account so they can read bots, deals, balances, exchanges, backtests, and other account data. With the correct API key permission, agents can also create and manage bots and deals.

This guide focuses on the part most users care about: how to connect Gainium MCP to your agent or MCP client.

## Before you start

Before connecting an agent, make sure you have:

- A Gainium account with [2FA enabled](https://gainium.io/help/2fa)
- A Gainium API key and secret
- An MCP-compatible client such as VS Code, Claude Code, OpenClaw, or another MCP client

If you have not created an API key yet, follow [Gainium API for developers](https://gainium.io/help/gainium-api-for-developers).

If you want to protect those credentials more carefully, review [Enhancing security of your exchange API keys](https://gainium.io/help/enhancing-security) as well.

## Choose the right connection mode

Gainium MCP supports several transport modes, but most users only need one of these:

- **Local stdio**: your MCP client launches `gainium-mcp` as a local process on your computer
- **Hosted remote HTTP**: your MCP client connects to the hosted Gainium MCP endpoint

Use **local stdio** when:

- Your client supports `stdio`
- You want the simplest setup
- You want your API credentials to stay local on your machine

Use **hosted remote HTTP** when:

- You do not want to run the server locally
- Your client supports MCP over HTTP
- Your client lets you send custom headers

Use **local HTTP** or **SSE** only when your client specifically requires them.

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

### Important limitation in hosted mode

From the client config alone, you can set:

- The MCP URL
- Request headers such as `X-API-Key` and `X-API-Secret`

From the client config alone, you cannot force:

- `GAINIUM_ALLOWED_BOT_ID`
- `GAINIUM_PAPER_ONLY`

Those are server environment variables. If you need those controls, run your own local or self-hosted Gainium MCP instance.

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

Example CLI pattern:

```bash
claude mcp add --transport http gainium https://mcp.gainium.io/mcp
```

If your Claude Code setup supports MCP header configuration, add the same `X-API-Key` and `X-API-Secret` headers shown above.

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

If you want paper mode to be enforced automatically for every request, run your own MCP server with:

```bash
export GAINIUM_PAPER_ONLY=true
```

### Bot ID restriction

Most write operations take `botId` as part of the tool input. For example:

- `start_bot`
- `stop_bot`
- `archive_bot`
- `restore_bot`
- `change_bot_pairs`
- `clone_dca_bot`

Example input:

```json
{
	"botId": "507f1f77bcf86cd799439011",
	"botType": "dca"
}
```

If you want the MCP server itself to reject all other bot IDs, run your own instance with:

```bash
export GAINIUM_ALLOWED_BOT_ID=507f1f77bcf86cd799439011
```

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
- You may be relying on a local server restriction that does not exist on the hosted endpoint
- You may need to pass `paperContext: true` explicitly

Fix:

- Verify the URL is `https://mcp.gainium.io/mcp`
- Verify `X-API-Key` and `X-API-Secret`
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
- Pass `paperContext: true` explicitly for paper workflows unless your own server already forces paper mode

If you need server-side safety controls such as one-bot restriction or forced paper trading, run your own Gainium MCP instance instead of relying on client config alone.
