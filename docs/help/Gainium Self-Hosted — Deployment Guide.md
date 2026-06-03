---
id: 145
name: Gainium Self-Hosted — Deployment Guide
slug: gainium-self-hosted-deployment-guide
description: >-
  A step-by-step guide to running the full open-source Gainium stack on your
  own infrastructure — either via pre-built Docker images or from source.
createdAt: '2026-06-02T00:00:00.000Z'
updatedAt: '2026-06-02T00:00:00.000Z'
publishedAt: '2026-06-02T00:00:00.000Z'
locale: en
categories:
  - platform
difficulty: advanced
tags:
  - self-hosted
  - docker
  - api
faq:
  - title: Do I need Docker to run Gainium self-hosted?
    details: >-
      No. The quick path uses pre-built Docker images and is recommended for
      most users, but contributors can clone every service repo and run each
      Node process from source. You still need MongoDB, Redis, and RabbitMQ,
      which are easiest to run via Docker even on the from-source path.
  - title: Is admin-sh required for a self-hosted install?
    details: >-
      Only for Docker deployments. admin-sh is a container-management API that
      drives docker compose operations (image upgrades, exchange config). If
      you run everything from source there is no Docker stack for it to manage,
      so you can skip it and manage exchanges from the dashboard's regular UI.
  - title: My bots are created but never trade — what's wrong?
    details: >-
      The most common cause on a from-source install is that the cron process
      is not running. Cron populates the MongoDB pairs collection that bots read
      to know what to trade. Start npm run cron in app-sh after the exchange
      connector and paper-trading services are up.
ingested: true
ingestedAt: '2026-06-02T00:00:00.000Z'
tldr: >-
  Run the full open-source Gainium stack yourself two ways: pull pre-built
  Docker images and wire them with docker compose (the supported production
  path, ~5 minutes), or clone every service repo and run each Node process from
  source (the contributor path). The stack spans the frontend, main API, bot
  workers, exchange/paper-trading/websocket connectors, an admin API, and
  MongoDB/Redis/RabbitMQ. Boot order matters, and the cron process is required
  for bots to pick up trading pairs.
---

# Gainium Self-Hosted — Deployment Guide

This guide covers two paths to run the full Gainium self-hosted stack on your
own infrastructure:

- **[Part 1 — Quick Docker Deployment](#part-1--quick-docker-deployment)**
  — pull pre-built images, point them at your own domain, done. This is
  the supported production path for most users.

- **[Part 2 — Full Local Deployment From Source](#part-2--full-local-deployment-from-source)**
  — clone every service repo, install Node deps, run each process
  manually. The contributor / developer path.

If you just want to run Gainium for yourself: stop at the end of Part 1.

---

## Architecture overview

A Gainium SH install runs the following services:

| Service | Repo | Role | Default port |
|---|---|---|---|
| **Frontend** | [`main-dash-sh`](https://github.com/Gainium/main-dash-sh) | React/Vite dashboard, served as static files by nginx (in docker) or `vite dev` (local) | `7500` |
| **Main API** (`api`) | [`app-sh`](https://github.com/Gainium/main-app-sh) | GraphQL endpoint, auth, exchange & user CRUD | `7503` |
| **Stream** | `app-sh` (`npm run stream`) | WebSocket push to the dashboard | `7502` |
| **Bot workers** | `app-sh` (`bots:dca`, `bots:grid`, `bots:combo`, `bots:hedge:dca`, `bots:hedge:combo`) | One process per bot type | internal |
| **Indicators** | `app-sh` (`indicators`) | Streams TA indicators to bots / dashboard | internal |
| **Backtest** | `app-sh` (`backtest`) | Server-side strategy backtests | `7515` |
| **Cron** | `app-sh` (`cron`) | Scheduled snapshots / cleanup / fx rates | internal |
| **Exchange connector** | [`exchange-connector-sh`](https://github.com/Gainium/exchange-connector-sh) | REST adapter to every supported exchange | `7510` (host) / internal in docker |
| **Paper trading** | [`paper-trading-sh`](https://github.com/Gainium/paper-trading-sh) | Simulated exchange used by paper bots | `7506` (host) / internal in docker |
| **User WebSocket connector** | [`websocket-connector-sh`](https://github.com/Gainium/websocket-connector-sh) (`main`) | Exchange user-data WS → Redis/Rabbit fan-out | internal |
| **Price connector** | `websocket-connector-sh` (`price`) | Exchange market-data WS → Redis | internal |
| **Admin API** | [`admin-sh`](https://github.com/Gainium/admin-sh) | Container management + admin-config (versions, enabled exchanges) | `7507` |
| **MongoDB** | — | Primary store | `27017` |
| **Redis** | — | Caches, pub-sub, runtime state | `6379` |
| **RabbitMQ** | — | Inter-service message queue | `5672` |

All TypeScript services target **Node.js ≥ 18**.

---

# Part 1 — Quick Docker Deployment

This is the recommended path. You pull the pre-built images from
`docker.gainium.io`, wire them with `docker compose`, and have the whole
stack running in ~5 minutes.

## 1.1 Prerequisites

- **Docker 20.10+** and **Docker Compose v2** (`docker compose`, not the
  legacy `docker-compose`)
- **≥ 4 GB free RAM** allocated to Docker, **≥ 5 GB disk**
- A domain or reverse proxy is **optional** — the default config exposes
  everything on `localhost`

## 1.2 Clone + configure

```bash
git clone https://github.com/Gainium/docker-sh.git
cd docker-sh
cp .env.sample .env
```

Edit `.env`. The defaults are sane for a single-host localhost install
— you only need to touch:

| Variable | What it is | When to change |
|---|---|---|
| `MONGO_DB_PASSWORD`, `REDIS_PASSWORD`, `RABBIT_PASSWORD`, `JWT_SECRET` | Service credentials | **Always rotate from the defaults** before exposing to anything but localhost |
| `COINBASEKEY`, `COINBASESECRET` | Coinbase Pro API creds | Only if you'll use Coinbase |
| `PRICE_CONNECTOR_EXCHANGES` | Initial enabled exchanges | Leave as default; manage from the dashboard's Admin tab after first boot |
| `PORT`, `GRAPH_QL_PORT`, `WS_PORT`, `BACKTEST_PORT`, `ADMIN_PORT` | Service host-side ports | Only if you've got something else on those ports |
| `NEXT_PUBLIC_SERVER`, `NEXT_PUBLIC_WS`, `VITE_ADMIN_API_URL` | URLs the browser uses to reach the API / WS / admin | **Must change when using a custom domain** — see §1.4 |

## 1.3 Boot

```bash
docker compose up -d
docker compose logs -f --tail=50 api frontend
```

Wait until `api` reports `Server ready on :7503` and `frontend` reports
nginx started. Then open **<http://localhost:7500>** in a browser. You
should land on the login screen.

### First-time user

The first account you register becomes the admin. There is no built-in
admin account; the first `register` graphql mutation seeds an empty user
list.

## 1.4 Custom domain (reverse proxy)

If you're running the stack behind a domain like `gainium.mycompany.io`,
you typically expose three URLs through your reverse proxy (nginx,
Traefik, Caddy, Cloudflare Tunnel, …):

- `https://gainium.mycompany.io` → frontend (port `7500`)
- `https://api.gainium.mycompany.io` → main api (port `7503`)
- `https://ws.gainium.mycompany.io` → stream (port `7502`, WebSocket upgrade)
- `https://admin.gainium.mycompany.io` → admin (port `7507`)

The frontend image bakes runtime placeholders that get replaced by the
entrypoint from your env. **Set these three in `.env` before bringing
the frontend up**:

```bash
# In docker-sh/.env
NEXT_PUBLIC_SERVER=https://api.gainium.mycompany.io
NEXT_PUBLIC_WS=wss://ws.gainium.mycompany.io
VITE_ADMIN_API_URL=https://admin.gainium.mycompany.io

# Also bump CORS_ORIGIN so the API accepts requests from the dashboard:
CORS_ORIGIN=https://gainium.mycompany.io
```

Then restart the frontend so the entrypoint picks up the new values:

```bash
docker compose up -d --force-recreate frontend
```

### Minimal nginx snippet

```nginx
server {
    listen 443 ssl http2;
    server_name gainium.mycompany.io;
    location / {
        proxy_pass http://127.0.0.1:7500;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto https;
    }
}
server {
    listen 443 ssl http2;
    server_name api.gainium.mycompany.io;
    location / {
        proxy_pass http://127.0.0.1:7503;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto https;
    }
}
server {
    listen 443 ssl http2;
    server_name ws.gainium.mycompany.io;
    location / {
        proxy_pass http://127.0.0.1:7502;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400s;
    }
}
server {
    listen 443 ssl http2;
    server_name admin.gainium.mycompany.io;
    location / {
        proxy_pass http://127.0.0.1:7507;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto https;
    }
}
```

(TLS termination, ACL, rate limiting are out of scope here — use your
existing patterns.)

## 1.5 Common operations

```bash
# Stop everything
docker compose down

# Reset (DESTROYS persistent volumes — DBs included)
docker compose down -v

# Tail logs from one service
docker compose logs -f api

# Restart one service after a config change
docker compose up -d --force-recreate api

# Upgrade a pinned image (see Admin → Services in the dashboard for the UI version)
docker compose pull
docker compose up -d
```

Per-service image versions can be pinned via env vars
(`MAIN_APP_VERSION`, `EXCHANGE_CONNECTOR_VERSION`, …). The dashboard's
**Admin → Services** tab also writes these for you when you click
*Upgrade* on a row.

---

# Part 2 — Full Local Deployment From Source

This path is for contributors who want to hack on a specific service.
Each backend repo is a TypeScript Node service; the frontend is a
Vite/React app. You'll clone every repo, install deps, and run each
process by hand.

## 2.1 Prerequisites

- **Node.js ≥ 18** (check `node --version`)
- **npm ≥ 9** (ships with Node 18+)
- **git**
- A way to run MongoDB / Redis / RabbitMQ locally — either:
  - **Docker Compose** (recommended) — only the infra services, see §2.3, **or**
  - Local installs of each (Homebrew on macOS, package manager on Linux)

## 2.2 Clone every repo

The Gainium SH stack is split across these repositories. Put them all
under one parent directory:

```bash
mkdir -p ~/gainium && cd ~/gainium

git clone https://github.com/Gainium/app-sh.git
git clone https://github.com/Gainium/exchange-connector-sh.git
git clone https://github.com/Gainium/paper-trading-sh.git
git clone https://github.com/Gainium/websocket-connector-sh.git
git clone https://github.com/Gainium/main-dash-sh.git
git clone https://github.com/Gainium/admin-sh.git
git clone https://github.com/Gainium/docker-sh.git
```

## 2.3 Boot the infra services (Mongo / Redis / RabbitMQ)

The simplest way to get the databases up is to reuse the docker-sh
compose file but only start the three infra services.

**Important**: the base `docker-compose.yml` does **not** publish
mongo / redis / rabbit ports to the host (production hardening — those
services are reachable only on the internal docker network). For local
dev that wires host-side processes to `localhost:27017` etc., you need
to add port mappings. The repo ships a small override file for exactly
this — apply it alongside the base compose:

```bash
cd ~/gainium/docker-sh
cp .env.sample .env   # if you haven't already

docker compose -f docker-compose.yml -f docker-compose.local.yml \
               up -d mongo redis rabbit
```

Verify:

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml \
               ps mongo redis rabbit
```

You should now be able to `mongosh --port 27017` / `redis-cli` /
`rabbitmqctl` from the host.

> Set `COMPOSE_FILE=docker-compose.yml:docker-compose.local.yml` in
> your shell once and you can drop the `-f` flags for the rest of the
> session.

Note the credentials that your `.env` exposes (`MONGO_DB_PASSWORD`,
`REDIS_PASSWORD`, `RABBIT_PASSWORD`, `JWT_SECRET`) — every service
repo's `.env` will reference these same values.

> **Alternative**: install Mongo / Redis / RabbitMQ natively via
> Homebrew / apt / package manager. The credentials and ports go in
> each service's `.env` the same way — and you don't need the
> `docker-compose.local.yml` override at all in that case.

## 2.4 Install + wire each service

Every repo follows the same shape:

1. `cp .env.sample .env` (or `.env.example` for `main-dash-sh` / `admin-sh`)
2. Fill in DB / Redis / Rabbit credentials matching `docker-sh/.env`
3. `npm install` then `npm run fullInit` (if present)
4. `npm run build`
5. Run the appropriate start script

`fullInit` is required for any repo that has it — it installs the
private `@gainium/*` git-hosted dependencies (`backtester`, `indicators`,
`kucoin-api`) that npm wouldn't pull automatically.

### 2.4.1 `exchange-connector-sh` (port 7510)

```bash
cd ~/gainium/exchange-connector-sh
cp .env.sample .env
# In .env: REDIS_HOST=localhost, REDIS_PORT=6379, REDIS_PASSWORD=<from docker-sh .env>
npm install
npm run fullInit
npm run build
npm run start:prod
```

### 2.4.2 `paper-trading-sh` (port 7506)

```bash
cd ~/gainium/paper-trading-sh
cp .env.sample .env
# In .env: MONGO_DB_* + REDIS_* matching docker-sh .env;
#         EXCHANGE_SERVICE_API_URL=http://localhost:7510
npm install
npm run build
npm run start:prod
```

### 2.4.3 `websocket-connector-sh` (two processes)

```bash
cd ~/gainium/websocket-connector-sh
cp .env.sample .env
# In .env: EXCHANGE_SERVICE_API_URL=http://localhost:7510,
#         PAPER_WS=http://localhost:7506,
#         REDIS_*, RABBIT_* matching docker-sh .env
npm install
npm run fullInit
npm run build
# Process 1 — user data WebSocket
npm run main
# In a second terminal, process 2 — market price WebSocket
PRICEROLE=candle npm run price
```

### 2.4.4 `app-sh` (the main backend — many processes)

```bash
cd ~/gainium/app-sh
cp .env.sample .env
```

Fill `.env` carefully:

```bash
WS_PORT=7502
GRAPH_QL_PORT=7503
BACKTEST_PORT=7515
EXCHANGE_SERVICE_API_URL=http://localhost:7510
PAPER_TRADING_API_URL=http://localhost:7506
SERVER_HOST=http://localhost:7503
MAIN_SERVICE_HOST=localhost
BACKTEST_SERVICE_HOST=localhost

# Match docker-sh/.env:
MONGO_DB_HOST=localhost
MONGO_DB_PORT=27017
MONGO_DB_USERNAME=user
MONGO_DB_PASSWORD=<your password>
MONGO_DB_NAME=gainium

REDIS_PORT=6379
REDIS_PASSWORD=<your password>

RABBIT_HOST=localhost
RABBIT_PORT=5672
RABBIT_USER=gainium
RABBIT_PASSWORD=<your password>

JWT_SECRET=<your secret — must match what the dashboard expects>
```

Then:

```bash
npm install
npm run fullInit       # installs @gainium/indicators + @gainium/backtester
npm run build
```

`app-sh` runs as **9 separate processes**. The repo gives you a
convenience script that boots most of them concurrently:

```bash
npm run all
```

That kicks off: `server`, `stream`, `bots:dca`, `bots:grid`,
`bots:combo`, `bots:hedge:dca`, `bots:hedge:combo`, `indicators`.

**Then start `cron` — it is required, not optional.** Cron populates
the MongoDB `pairs` collection by polling the exchange connector. Bots
read from `pairs` to know what to trade, so without cron running the
collection stays empty and **no bot will ever pick up a symbol**.

```bash
# In a separate terminal (must be AFTER exchange-connector-sh and
# paper-trading-sh are running and reachable):
npm run cron
```

Backtest is optional unless you want server-side strategy backtesting:

```bash
npm run backtest
```

**Boot order matters**: exchange-connector + paper-trading must be up
*before* `cron` starts, otherwise the first poll fails and you wait a
full cron tick for the next attempt. The recommended sequence:

1. Mongo / Redis / RabbitMQ (§ 2.3)
2. `exchange-connector-sh` (§ 2.4.1)
3. `paper-trading-sh` (§ 2.4.2)
4. `websocket-connector-sh` `main` + `price` (§ 2.4.3)
5. `app-sh` `npm run all`
6. `app-sh` `npm run cron`     ← required for pairs to populate
7. `app-sh` `npm run backtest` ← optional
8. `main-dash-sh` `npm run dev` (§ 2.4.5)

In production-scale deployments, each bot type runs as its own process
on its own host. For local dev, one machine is fine.

> **`admin-sh` is not part of the local-dev path.** It's a container-
> management API — its job is to drive `docker compose` operations
> (image upgrades, exchange config) on a docker-deployed stack. If
> you're running everything from source you have no docker stack for
> it to manage, so skip it. The dashboard's *Admin* tab will simply
> report the admin API as unreachable, which is fine — manage
> exchanges via the regular UI.

### 2.4.5 `main-dash-sh` (port 7500)

```bash
cd ~/gainium/main-dash-sh
cp .env.example .env.development
```

Edit `.env.development`:

```bash
VITE_API_ENDPOINT=http://localhost:7503
VITE_WS_URL=ws://localhost:7502
VITE_ADMIN_API_URL=http://localhost:7507
```

Then:

```bash
npm install
npm run fullInit
npm run dev
```

Open <http://localhost:7500> — Vite hot-reloads on save.

For a production-style local build:

```bash
npm run build
npm run preview   # serves the built dist/ on a static port
```

## 2.5 Quick sanity check

With everything up:

- `http://localhost:7500` → frontend login
- `http://localhost:7503/health` → `{ status: "ok" }` (api process)
- `ws://localhost:7502` → upgrades on WS connection from the dashboard
- MongoDB has a `gainium` database with collections created on first
  connect by the api
- The MongoDB `pairs` collection is non-empty after cron has run at
  least one tick (otherwise see § 2.4.4 — `cron` not running)

> Note: only the `api` process exposes `/health` on its public port.
> The other `app-sh` processes (`bots:*`, `stream`, `indicators`,
> `cron`, `backtest`) bind their health endpoint on an internal port
> (`3000`) — meaningful inside docker where compose uses it for
> healthchecks, but not exposed when running natively. Checking that
> `api`'s `/health` answers is sufficient sign that the build was
> wired correctly.

## 2.6 Verifying the wiring

Common signs that something's misconfigured:

| Symptom | Likely cause |
|---|---|
| Dashboard stuck on "Loading…" | `VITE_API_ENDPOINT` / `VITE_WS_URL` wrong; check browser devtools network tab |
| GraphQL 401 from dashboard | `JWT_SECRET` differs between `app-sh` and the dashboard's signed login token (regenerate by logging in fresh) |
| Exchange dropdown empty / "no pairs available" | `cron` is not running, so the MongoDB `pairs` collection is empty. Start `npm run cron` in `app-sh` (after exchange-connector is up). |
| Bots created but never trade | `EXCHANGE_SERVICE_API_URL` not reachable from `app-sh`; check the exchange-connector logs. If pairs are populated but bot still idle, check the bot worker log for the matching strategy (`bots:dca`, `bots:grid`, …) |
| Paper bots stuck `monitoring` | `PAPER_TRADING_API_URL` wrong; paper-trading service down |
| Real-time charts not updating | websocket-connector `main` or `price` process not running; check Redis/Rabbit connectivity |
| Admin tab reports admin API unreachable | Expected on local-source dev — `admin-sh` is docker-only. See note in § 2.4. |
| Host process can't connect to Mongo / Redis / RabbitMQ | The infra ports aren't published. Use `-f docker-compose.local.yml` (see § 2.3). |

---

## Repos at a glance

```
Frontend  →  main-dash-sh       https://github.com/Gainium/main-dash-sh
              (Vite/React)

Backend   →  app-sh             https://github.com/Gainium/main-app-sh
              (Node + GraphQL + bot workers)

           ├─ exchange-connector-sh   https://github.com/Gainium/exchange-connector-sh
           │   (REST → exchange APIs)
           │
           ├─ paper-trading-sh        https://github.com/Gainium/paper-trading-sh
           │   (simulated exchange)
           │
           └─ websocket-connector-sh  https://github.com/Gainium/websocket-connector-sh
               (exchange WS streams)

Admin     →  admin-sh            https://github.com/Gainium/admin-sh
              (container ops + admin-config)

Compose   →  docker-sh           https://github.com/Gainium/docker-sh
              (this repo)
```

## Related help articles

- [Gainium API for developers](https://gainium.io/help/gainium-api-for-developers)
  — authenticate and drive your self-hosted instance programmatically.
- [Connect Gainium MCP to AI agents](https://gainium.io/help/mcp)
  — point Claude Code, VS Code, and other MCP clients at your account.
- [Paper Trading (Forward testing)](https://gainium.io/help/paper-trading-forward-testing)
  — what the `paper-trading-sh` service powers for risk-free bots.
- [Webhooks — send signals from TradingView](https://gainium.io/help/webhooks)
  — trigger bot actions on your own stack from external platforms.
- [Enhancing security of your exchange API keys](https://gainium.io/help/enhancing-security)
  — IP whitelisting and key restrictions worth applying before going live.
  **Self-hosted note:** the IP whitelisting article references Gainium's
  cloud server IPs — on a self-hosted install you must whitelist **your
  own server's outbound IP** (the host running `exchange-connector-sh`),
  not Gainium's.

## Where to put bug reports / questions

- **Per-repo issues**: open at the matching `Gainium/<repo>-sh` GitHub
- **Security-sensitive**: email `security@gainium.io`, do NOT file a
  public issue
