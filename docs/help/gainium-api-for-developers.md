---
id: 49
name: Gainium API for developers
slug: gainium-api-for-developers
description: >-
  In this article we explain how to access your Gainium account programmatically
  through API keys.
createdAt: '2022-11-29T04:35:21.577Z'
updatedAt: '2026-02-27T12:33:55.461Z'
publishedAt: '2022-11-29T08:17:14.177Z'
locale: en
categories:
  - platform
difficulty: intermediate
tags:
  - api
ingested: true
ingestedAt: '2025-06-29T10:57:30.010Z'
tldr: >-
  Gainium offers two API versions: V1 (legacy) and V2 (recommended). V2 uses
  proper REST methods (GET/POST/PUT/DELETE), resource-oriented URLs, and field
  selection that reduces payload sizes by 70–90%. Authentication requires 2FA
  enabled plus an API key (Read or Write permission) signed with HMAC-SHA256.
  Paper trading uses the paper-context request header in V2. Rate limit is 50
  calls/minute. An OpenAPI spec is available for AI agent integration.
---

This guide is for you if you are a developer looking to access Gainium through API keys. Gainium API keys allow you to access your Gainium account programmatically so you can create apps and scripts.

## Enable 2FA

2FA must be enabled before you can create API keys. If you haven't already, [enable 2FA](https://gainium.io/help/2fa) on your account before proceeding.

## Create API keys

To generate a new API key:
1. Click "New API access token."
2. Give the key a descriptive name so you can remember its purpose later.
3. Choose the permission scope:
  - **Read**: View bots, deals, balances, and other account data.
  - **Write**: Create/update/stop bots and deals (includes write operations).
4. Click "Create".
5. Copy the API key and secret immediately and store them securely.

## API Documentation

Gainium provides two API versions:

- **V2 (recommended):** [https://api.gainium.io/api/docs/v2](https://api.gainium.io/api/docs/v2) — REST-compliant endpoints with proper HTTP methods, resource-oriented URLs, and efficient field selection.
- **V1 (legacy):** [https://api.gainium.io/api/docs/](https://api.gainium.io/api/docs/) — Original endpoints, still supported for backward compatibility.

### OpenAPI Spec for AI Agents

An OpenAPI YAML specification is available for use with AI coding assistants and agent frameworks:

[https://api.gainium.io/api/v2/openapi.yaml?view=true](https://api.gainium.io/api/v2/openapi.yaml?view=true)

If you want to connect Gainium to MCP-compatible clients such as VS Code or Claude Code instead of calling the REST API directly, see [Connect Gainium MCP to AI agents](https://gainium.io/help/mcp).

## V2 API Highlights

**Field Selection** — All V2 GET endpoints accept a `fields` query parameter to limit response data. Use presets (`minimal`, `standard`, `extended`, `full`) or specify custom dot-notation fields (e.g. `fields=_id,uuid,settings.name,profit.total`). The `minimal` and `standard` presets reduce payload size by 70–90%.

**REST-compliant methods** — V2 uses `GET`, `POST`, `PUT`, and `DELETE` with resource-oriented endpoints. Compared to V1 action-style routes, many write operations moved from `POST /api/<action>` to `PUT`/`DELETE` resource paths. For example:
- Get bots: `GET /api/v2/bots/dca`
- Update a bot: `PUT /api/v2/bots/dca/{botId}`
- Archive a bot: `DELETE /api/v2/bots/dca/{botId}`

**Paper trading header** — In V2, pass `paper-context: true` as a request header instead of the `paperContext` query/body parameter used in V1.

## API FAQ

**Should I use V1 or V2?**

Use **V2** for all new integrations. V1 remains available for backward compatibility, but V2 is the actively documented version with field selection and cleaner endpoint design.

**How do I authenticate requests in V2?**

Include these headers on every request:
- `token`: your public API key
- `time`: request timestamp in milliseconds
- `signature`: base64-encoded HMAC-SHA256 of `{body+method+endpoint+timestamp}`

Signature example:
`crypto.createHmac('sha256', secret).update(body + method + endpoint + time).digest('base64')`

**Can I use API keys for paper trading?**

Yes. In V2, send `paper-context: true` header. In V1, use `paperContext=true` in query/body.

**How can I reduce response size and speed up requests?**

Use the `fields` query parameter on V2 GET endpoints:
- Presets: `minimal`, `standard`, `extended`, `full`
- Custom fields: e.g. `fields=_id,uuid,settings.name,profit.total`

**What are the API limits?**

50 calls/minute.

**Can I retrieve exchange deals that were not created through Gainium?**

No. You can only access bots and deals created via your Gainium account.
