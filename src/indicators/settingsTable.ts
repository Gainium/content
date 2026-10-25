/**
 * `### Settings and tips` (spec 053 §2.1, docs/STYLE.md): the settings table
 * an indicator page shows is generated from the page's describe JSON
 * (`docs/indicators/<slug>.settings.json`, schema `gainium.indicator-settings/1`),
 * written by claus-dashboard's tv-describe (TradingView scripts) or
 * scripts/describe-native.ts (native indicators). The template check holds the
 * table to that JSON so it cannot drift from the real defaults.
 *
 * The renderer here and claus-dashboard's lib/tv-describe.js produce the same
 * table; both take the Default column from the JSON's `defaultText`, so there
 * is one formatter's output to compare against, not two formatters.
 */

export interface SettingsInput {
  id: string
  label: string
  group: string | null
  type: string
  default: unknown
  defaultText: string
  /** `display` (colours, label sizes) is left out of the table by default. */
  kind: 'logic' | 'display'
  options?: unknown[]
  optionLabels?: string[]
  min?: number
  max?: number
  step?: number
  tooltip?: string
  [extra: string]: unknown
}

export interface IndicatorSettings {
  schema: 'gainium.indicator-settings/1'
  source: 'tradingview' | 'gainium-catalog'
  indicator: {
    kind: string
    title: string
    shortTitle: string | null
    author: string | null
    scriptId: string | null
    version: string | null
    overlay: boolean | null
    openSource: boolean | string | null
  }
  chart: { symbol: string | null; interval: string | null } | null
  inputs: SettingsInput[]
  plots: Array<Record<string, unknown>>
  alertConditions:
    | Array<{ id: string; title: string | null; message: string | null }>
    | string
  notes: string[]
}

/** The Default cell for an input (the same rules as claus-dashboard lib/tv-describe.js defaultText). */
export function defaultText(
  i: Pick<SettingsInput, 'type' | 'default' | 'options' | 'optionLabels'>,
): string {
  const v = i.default
  if (i.type === 'resolution' && (v === '' || v == null)) return 'Chart'
  if (v === undefined || v === null || v === '') return '—'
  if (typeof v === 'boolean') return v ? 'On' : 'Off'
  if (Array.isArray(i.options) && Array.isArray(i.optionLabels)) {
    const k = i.options.findIndex((o) => String(o) === String(v))
    if (k >= 0 && i.optionLabels[k] != null) return String(i.optionLabels[k])
  }
  return String(v)
}

const cell = (s: unknown) =>
  String(s ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\s*\n\s*/g, ' ')
    .trim()

/** The table rows a describe JSON asks for: logic inputs, grouped (ungrouped first). */
export function tableInputs(
  d: IndicatorSettings,
  includeDisplay = false,
): SettingsInput[] {
  const list = d.inputs.filter((i) => includeDisplay || i.kind !== 'display')
  const groups = new Map<string, SettingsInput[]>()
  for (const i of list) {
    const g = i.group || ''
    if (!groups.has(g)) groups.set(g, [])
    groups.get(g)?.push(i)
  }
  const order = [...groups.keys()].sort((a, b) =>
    a === '' ? -1 : b === '' ? 1 : 0,
  )
  return order.flatMap((g) => groups.get(g) ?? [])
}

/** `| Setting | Default | What it does |`, a bold row per input group. */
export function renderSettingsTable(
  d: IndicatorSettings,
  { includeDisplay = false } = {},
): string {
  const rows = ['| Setting | Default | What it does |', '| --- | --- | --- |']
  let group: string | null = null
  for (const i of tableInputs(d, includeDisplay)) {
    const g = i.group || ''
    if (g && g !== group) rows.push(`| **${cell(g)}** | | |`)
    group = g
    rows.push(
      `| ${cell(i.label)} | ${cell(i.defaultText ?? defaultText(i))} | ${cell(i.tooltip ?? '')} |`,
    )
  }
  return `${rows.join('\n')}\n`
}

export interface ParsedRow {
  group: string | null
  setting: string
  defaultCell: string
  what: string
  line: number
}

const splitRow = (line: string) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/(?<!\\)\|$/, '')
    .split(/(?<!\\)\|/)
    .map((c) => c.replace(/\\\|/g, '|').trim())

/** Strip Markdown emphasis/code and compare case-insensitively. */
export const normCell = (s: string) =>
  s.replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim().toLowerCase()

/** The first `| Setting | Default | What it does |` table in a block of Markdown. */
export function parseSettingsTable(markdown: string): {
  found: boolean
  rows: ParsedRow[]
} {
  const lines = markdown.split('\n')
  const start = lines.findIndex(
    (l) =>
      /^\s*\|/.test(l) &&
      splitRow(l).map(normCell).join('|') === 'setting|default|what it does',
  )
  if (start < 0) return { found: false, rows: [] }
  const rows: ParsedRow[] = []
  let group: string | null = null
  for (let k = start + 2; k < lines.length && /^\s*\|/.test(lines[k]); k++) {
    const [setting = '', def = '', what = ''] = splitRow(lines[k])
    const isGroup = /^\*\*.+\*\*$/.test(setting) && !def && !what
    if (isGroup) group = setting.replace(/^\*\*|\*\*$/g, '').trim()
    else
      rows.push({
        group,
        setting: setting.replace(/[*_`]/g, '').trim(),
        defaultCell: def,
        what,
        line: k + 1,
      })
  }
  return { found: true, rows }
}

/**
 * The table against the describe JSON: every row is a real input with the
 * real default, every logic input has a row, and every row says what it does.
 */
export function checkSettingsTable(
  markdown: string,
  d: IndicatorSettings,
): string[] {
  const errors: string[] = []
  const { found, rows } = parseSettingsTable(markdown)
  if (!found)
    return [
      '"Settings and tips" needs the settings table: `| Setting | Default | What it does |`',
    ]
  const key = (group: string | null, label: string) =>
    `${normCell(group ?? '')}\u0000${normCell(label)}`
  // Two inputs can share a label (a catalog's "Level" and its Between-only
  // second "Level"): the table rows with that label are matched to them in
  // order, the first row to the first input, and so on.
  const inputs = new Map<string, SettingsInput[]>()
  for (const i of d.inputs) {
    const k = key(i.group, i.label)
    inputs.set(k, [...(inputs.get(k) ?? []), i])
  }
  const used = new Map<string, number>()
  const seen = new Set<SettingsInput>()
  for (const r of rows) {
    const k = key(r.group, r.setting)
    const n = used.get(k) ?? 0
    used.set(k, n + 1)
    const same = inputs.get(k)
    const input = same?.[n]
    if (!input) {
      if (same) {
        errors.push(
          `settings table: "${r.setting}" appears ${n + 1} times; the describe JSON has ${same.length} input(s) with that label`,
        )
        continue
      }
      errors.push(
        `settings table: "${r.group ? `${r.group} > ` : ''}${r.setting}" is not an input in the describe JSON (a renamed or invented setting?)`,
      )
      continue
    }
    seen.add(input)
    const want = input.defaultText ?? defaultText(input)
    if (normCell(r.defaultCell) !== normCell(want)) {
      errors.push(
        `settings table: "${r.setting}" shows default "${r.defaultCell}", the describe JSON says "${want}"`,
      )
    }
    if (!r.what.replace(/[*_`\s—-]/g, ''))
      errors.push(`settings table: "${r.setting}" needs a "What it does" cell`)
  }
  const missing = tableInputs(d).filter((i) => !seen.has(i))
  if (missing.length > 0) {
    errors.push(
      `settings table: missing setting(s) from the describe JSON: ${missing.map((i) => (i.group ? `${i.group} > ${i.label}` : i.label)).join(', ')}`,
    )
  }
  return errors
}

/** Validate a parsed describe JSON enough to trust it. */
export function validateSettingsJson(raw: unknown): string | null {
  const d = raw as IndicatorSettings
  if (!d || typeof d !== 'object') return 'not an object'
  if (d.schema !== 'gainium.indicator-settings/1')
    return `schema must be "gainium.indicator-settings/1" (got ${JSON.stringify(d.schema)})`
  if (!Array.isArray(d.inputs)) return '"inputs" must be a list'
  for (const i of d.inputs) {
    if (!i || typeof i.label !== 'string' || typeof i.defaultText !== 'string')
      return 'every input needs "label" and "defaultText"'
  }
  return null
}
