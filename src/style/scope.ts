/**
 * Where the style lint runs and how strictly (docs/STYLE.md).
 *
 *   error  banned phrases fail the check; soft patterns warn
 *   warn   everything is reported, nothing fails
 *
 * Paths are relative to the repository root. A directory is scanned
 * recursively for `*.md`. Move a directory from `warn` to `error` once its
 * articles have been rewritten.
 */
export type StyleMode = 'error' | 'warn'

export interface StyleScopeEntry {
  path: string
  mode: StyleMode
}

export const DEFAULT_STYLE_SCOPE: readonly StyleScopeEntry[] = [
  { path: 'docs/indicators', mode: 'error' },
  { path: 'docs/help', mode: 'warn' },
  { path: 'docs/blog', mode: 'warn' },
]

/**
 * Parse `path=mode` overrides (CLI `--scope`, env `STYLE_SCOPE` as a
 * comma-separated list). A bare path means `error`.
 */
export function parseScope(specs: string[]): StyleScopeEntry[] {
  return specs
    .flatMap((spec) => spec.split(','))
    .map((spec) => spec.trim())
    .filter(Boolean)
    .map((spec) => {
      const eq = spec.lastIndexOf('=')
      const path = eq === -1 ? spec : spec.slice(0, eq)
      const mode = eq === -1 ? 'error' : spec.slice(eq + 1)
      if (mode !== 'error' && mode !== 'warn') {
        throw new Error(`style scope "${spec}": mode must be error or warn`)
      }
      return { path, mode }
    })
}
