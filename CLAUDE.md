# content (`@gainium/content`)

## 📚 Platform knowledge base

A curated, auto-updated AI-agent knowledge base for the **whole Gainium platform** lives in the
private repo **`gainium-0-knowledge`** (`github.com/aressanch/gainium-0-knowledge`).
Local checkouts — Mac: `~/Git/Gainium Local/0-knowledge` · VPS: `/root/git/0-knowledge`.

Consult it before non-trivial work: `ARCHITECTURE.md` (service graph + danger boundaries),
`subsystems/<area>.md` (how each area works & breaks), `bug-patterns/`, `runbooks/`,
`domain/glossary.md`. Query 3.7k historical bugs by symptom:
`python3 <kb>/_raw/scripts/bugs.py find "<terms>"`. It is auto-enriched daily from agent session digests.

Git-backed **content API** for docs / blog / help articles. Port **7570** (`PORT`); prod served at
`content.gainium.io`. No SQL DB — content is a git repo. Map: [`../0-knowledge/ARCHITECTURE.md`](../0-knowledge/ARCHITECTURE.md).

## Run / test
- dev `yarn dev` · build `yarn build` · start `yarn start` · PM2 `yarn pm2:start`

## What it OWNS / EMITS (consumed by main-app + public-frontend)
- REST: `GET /help[/full|/:id]`, `/blog[/full|/:id]`, `/search`, `/metadata`. JSON shape is the contract.
- Consumers: **main-app RAG** (`main-app/src/openai/functions/*` — currently hardcode `https://content.gainium.io`)
  and **public-frontend** (`lib/content-api/client.ts`). Changing endpoint paths or JSON breaks both.

## Rules
- main-app calls the hosted URL even locally; if you need it wired to the local service, that's an open item
  (see [`../0-knowledge/OPEN-QUESTIONS.md`](../0-knowledge/OPEN-QUESTIONS.md) Q18).
