---
name: new-exchange-integration-content
description: This repo's slice of adding a brand-new exchange to Gainium — the "how to connect via API keys" guide the dashboard's connect dialog links to. Mandatory, not optional. Use when scoping or writing new-exchange docs in content.
---

# New exchange integration — content's part

Canonical source: `new-exchange-integration` in Gainium's internal `skills`
repo (private — this file is a scoped copy synced from there; edit the
source, not this copy, if it needs updating).

## Global objective

Gainium supports trading on multiple exchanges through a common internal
`Exchange` interface — one adapter per exchange so the rest of the platform
never has to know which exchange it's talking to. None of that matters to a
user if they can't figure out how to get API keys onto the exchange and
into Gainium; this repo is that bridge.

## This repo's part

**Mandatory, not optional.** Every dashboard has a connect dialog for each
exchange, and it links to a guide from this repo — ship the exchange
without one and users hit a dead link the moment they try to add it.

- Write the **"how to connect Gainium to `<exchange>` via API keys"** guide:
  where to generate keys on the exchange's own site, what permissions to
  grant (trade, no withdraw), IP-allowlist notes if the exchange requires
  one, and any exchange-specific gotchas (e.g. separate keys for
  spot vs. futures, a passphrase field, a specific broker/referral step).
- If the exchange has a **non-standard auth model** (Web3 wallet
  connection, OAuth), it likely needs a distinct guide from the standard
  key/secret template — don't force it into the standard shape.
- If the exchange has a referral/affiliate program, note whether the
  guide should point users at Gainium's own referral link (coordinate with
  whoever owns that link).

## Sister repos

All public, same repo family as this one:

- **exchange-connector-sh** — defines what the adapter actually needs from
  a key (permissions, spot vs. futures key split) — the guide should match
  reality here, not assume.
- **websocket-connector-sh** — the streams; not directly relevant to this
  repo's docs work.
- **app-sh** — the account-add/verify flow the guide is walking a user
  through.
- **paper-trading-sh** — paper accounts don't need real keys; mention this
  is optional practice mode if relevant.
- **main-dash-sh** — the connect dialog that links to this guide; confirm
  the link target/slug matches what this repo publishes.
- **backtester** — not relevant to this repo's docs work.
- **docker-sh** — self-hosted users read the same guide; nothing
  self-hosted-specific needed unless the exchange behaves differently
  there.

Gainium's cloud SaaS wires a few more pieces on top of this stack
(paid-plan gating, an internal monitoring/admin layer, marketing pages) —
not part of the self-hosted deployment, not this repo's concern.
