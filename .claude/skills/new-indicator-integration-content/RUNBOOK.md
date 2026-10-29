# content — new indicator runbook

Canonical source: `new-indicator-integration` (private `skills` repo). This
is a scoped excerpt — see [SKILL.md](SKILL.md) and the global
`new-indicator-integration` skill's `RUNBOOK.md` for the full order.

## Where this sits

**Step 7.** Depends on `main-dash-sh` (step 5, for the exact help-URL slug
and field list) or `app` (step 3b, for a working feature to document) —
either is enough to start writing; land before or alongside the dashboard
PR that references the slug, not long after.

## Checklist

```
[ ] docs/indicators/<slug>.md: templateVersion: 2, kind: native + catalogKeys   ← what the catalog's /help/<slug> resolves to
[ ] frontmatter: all required fields + category, aliases, related, faq (3–5); id = max + 1 across help + indicators; dates quoted
[ ] body: opening + the 4 template sections, no # title, no ## FAQ
[ ] <slug>.settings.json via scripts/describe-native.ts --write; table pasted, "What it does" cells filled
[ ] <slug>.edge-recipe.json (edge.json is generated, never hand-written)
[ ] images → docs/images/indicators/<slug>__*.{png,webp}, embedded as .webp, each opened and checked
[ ] note any chart-visual approximation from Step 0's Pine Script check, if applicable
[ ] npm run check:indicators && npm run check:style && npm run images:check && npm test
```

## Verify before calling it done

- Slug matches exactly what `main-dash-sh`'s `INDICATOR_DOCUMENTATION_URLS`
  entry points at — a near-miss slug is a dead link with no build-time
  error anywhere.
- Ask the in-app AI assistant a question about the new indicator after
  this page is live and confirm it can actually cite something sensible.
