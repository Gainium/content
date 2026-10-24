/**
 * Migration compatibility mode for the indicator pages that moved out of
 * `docs/help` (spec 053 §3). Env `INDICATORS_HELP_COMPAT`, default ON; off
 * only when set to `off`, `0` or `false`.
 *
 * ON: the moved native pages still appear in `/help` listings, categories,
 * tags and in `/search` as `source: 'help'`, each carrying `kind: 'native'`
 * and `movedTo: '/indicators/<slug>'`. Non-native pages never appear there
 * in either mode.
 *
 * Turn it off once ALL of these hold: the dashboard release that reads
 * `/indicators` is on cloud and in the self-hosted image; main-app's
 * `get_gainium_indicators` tool is deployed; public-frontend filters items
 * carrying `movedTo` out of its help pages.
 *
 * Read on every call (tests toggle it); on a server, set the env and restart.
 */
export function isIndicatorsHelpCompatOn(): boolean {
  const value = (process.env.INDICATORS_HELP_COMPAT ?? '').trim().toLowerCase()
  return !['off', '0', 'false'].includes(value)
}
