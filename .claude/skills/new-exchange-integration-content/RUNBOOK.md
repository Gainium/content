# content — new exchange runbook

Canonical source: `new-exchange-integration` (private `skills` repo). This
is a scoped excerpt — see [SKILL.md](SKILL.md) for the narrative version.

## Where this sits

Repo **7 of the public pipeline** (exchange-connector-sh →
websocket-connector-sh → app-sh → paper-trading-sh → backtester →
main-dash-sh → **content** → docker-sh). Write this once the account-add
flow actually works end-to-end (`app-sh` + a connector merged) — otherwise
you're documenting a flow that might still change. `main-dash-sh`'s connect
dialog links to whatever slug/URL this guide publishes at, so land this
before or alongside that dashboard work, not after.

## Checklist

```
[ ] "connect via API keys" guide for the new exchange   ← MANDATORY
[ ] non-standard-auth guide variant, if the exchange needs one (Web3, OAuth, ...)
[ ] confirm the guide's URL/slug matches what the dashboard connect dialog links to
```

## Verify before calling it done

- Follow your own guide from scratch on the real exchange (a test/sub
  account) and confirm the resulting key actually works against
  `exchange-connector-sh`'s `verify<Name>()` check.
- The dashboard's connect dialog link resolves to this guide, not a 404.
