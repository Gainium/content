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
[ ] docs/help/<slug>.md   ← the URL the dashboard catalog links to
[ ] field descriptions match the actual catalog fields in main-dash-sh
[ ] note any chart-visual approximation from Step 0's Pine Script check, if applicable
```

## Verify before calling it done

- Slug matches exactly what `main-dash-sh`'s `INDICATOR_DOCUMENTATION_URLS`
  entry points at — a near-miss slug is a dead link with no build-time
  error anywhere.
- Ask the in-app AI assistant a question about the new indicator after
  this page is live and confirm it can actually cite something sensible.
