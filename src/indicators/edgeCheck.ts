import fs from 'fs/promises'
import path from 'path'
import { lintMarkdown } from '../style/aiGiveaways'
import { extraBannedFor, MONTH } from '../style/timePeriods'
import {
  CATALOG_MODULE,
  CatalogEvaluator,
  type ModuleReader,
} from './describeNative'

/**
 * Indicator edge data (spec 054 §3): `docs/indicators/<slug>.edge.json`, the
 * price behaviour of an indicator's common settings against random entries,
 * and `<slug>.edge-recipe.json`, the settings to test.
 *
 * The data file is checked against its shape and every invariant in the
 * spec's table. Each error names the invariant it breaks:
 *
 *   054.no-verdict-on-few          a verdict on fewer than minEpisodes moves
 *   054.no-unflagged-fragile       edge/worse where robustness said fragile
 *   054.verdict-matches-numbers    a label that contradicts its edge and band
 *   054.numbers-in-text-match-data a number in a commentary text that is not
 *                                  in the cells its refs name (or method)
 *   054.dated                      missing dates, or data more than 45 days old
 *   054.style                      a banned phrase or time-window claim
 *
 * The robustness result is not part of the §3 shape. When a cell carries it
 * (`robustness: { fragile: boolean }`), 054.no-unflagged-fragile is checked
 * here; otherwise the engine's own validator is the only place it can be.
 *
 * The recipe is checked loosely (required keys only): its format belongs to
 * the engine, and unknown keys are accepted. The exception is each setting's
 * `bot`, the bot-form condition the dashboard applies with one click: it is
 * required, and held to the dashboard's indicator catalog (checkRecipeBots).
 */

export const EDGE_VERDICTS = [
  'edge',
  'fragile',
  'none',
  'worse',
  'fragile-worse',
  'few',
] as const
export type EdgeVerdict = (typeof EDGE_VERDICTS)[number]

/** 054.dated: `method.to` may be at most this many days old. */
export const EDGE_MAX_AGE_DAYS = 45

export const EDGE_SUFFIX = '.edge.json'
export const EDGE_RECIPE_SUFFIX = '.edge-recipe.json'

export interface EdgeCheckOptions {
  /** The page slug the file belongs to (its file name). */
  slug: string
  /** "Today" for 054.dated; defaults to the current time. */
  now?: Date
  maxAgeDays?: number
}

type Obj = Record<string, unknown>

const isObj = (v: unknown): v is Obj =>
  typeof v === 'object' && v !== null && !Array.isArray(v)
const isNum = (v: unknown): v is number =>
  typeof v === 'number' && Number.isFinite(v)
const isStr = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0
const isCount = (v: unknown): v is number =>
  Number.isInteger(v) && (v as number) >= 0
const isRange = (v: unknown): v is [number, number] =>
  Array.isArray(v) &&
  v.length === 2 &&
  isNum(v[0]) &&
  isNum(v[1]) &&
  v[0] <= v[1]

const DAY_MS = 86_400_000
/** Milliseconds of a `YYYY-MM-DD` day, or undefined if it is not one. */
function isoDay(v: unknown): number | undefined {
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return undefined
  const ms = Date.parse(`${v}T00:00:00Z`)
  return Number.isNaN(ms) || new Date(ms).toISOString().slice(0, 10) !== v
    ? undefined
    : ms
}

interface Cell {
  entries: number
  episodes: number
  edge: number
  chance: [number, number]
  verdict: EdgeVerdict
  robustness?: { fragile?: unknown }
}

/** Shape errors of one cell (pooled or a coin); none means it is a Cell. */
function cellShape(cell: unknown, where: string): string[] {
  if (!isObj(cell)) return [`${where}: must be an object`]
  const errors: string[] = []
  if (!isCount(cell.entries))
    errors.push(`${where}.entries: must be a whole number ≥ 0`)
  if (!isCount(cell.episodes))
    errors.push(`${where}.episodes: must be a whole number ≥ 0`)
  if (
    isCount(cell.entries) &&
    isCount(cell.episodes) &&
    cell.episodes > cell.entries
  )
    errors.push(`${where}: more episodes than entries`)
  if (!isNum(cell.edge)) errors.push(`${where}.edge: must be a number`)
  if (!isRange(cell.chance))
    errors.push(`${where}.chance: must be [low, high] with low ≤ high`)
  if (!EDGE_VERDICTS.includes(cell.verdict as EdgeVerdict))
    errors.push(`${where}.verdict: must be one of ${EDGE_VERDICTS.join(', ')}`)
  if (cell.robustness !== undefined) {
    if (!isObj(cell.robustness) || typeof cell.robustness.fragile !== 'boolean')
      errors.push(`${where}.robustness: must be an object with boolean fragile`)
  }
  return errors
}

/** Invariant errors of one well-formed cell. */
function cellInvariants(
  cell: Cell,
  where: string,
  minEpisodes: number,
): string[] {
  const errors: string[] = []
  const { edge, verdict } = cell
  const [lo, hi] = cell.chance
  if (cell.episodes < minEpisodes && verdict !== 'few') {
    errors.push(
      `[054.no-verdict-on-few] ${where}: verdict "${verdict}" on ${cell.episodes} episodes (minEpisodes ${minEpisodes}); it must be "few"`,
    )
  }
  if (cell.episodes >= minEpisodes && verdict === 'few') {
    errors.push(
      `[054.no-verdict-on-few] ${where}: "few" with ${cell.episodes} episodes (minEpisodes ${minEpisodes})`,
    )
  }
  const fragile = cell.robustness?.fragile
  if (fragile === true && (verdict === 'edge' || verdict === 'worse')) {
    errors.push(
      `[054.no-unflagged-fragile] ${where}: "${verdict}" but the robustness check said fragile; it must be "${verdict === 'edge' ? 'fragile' : 'fragile-worse'}"`,
    )
  }
  if (
    fragile === false &&
    (verdict === 'fragile' || verdict === 'fragile-worse')
  ) {
    errors.push(
      `[054.no-unflagged-fragile] ${where}: "${verdict}" but the robustness check did not say fragile`,
    )
  }
  const band = `${edge} vs band [${lo}, ${hi}]`
  // The verdict is decided on the unrounded numbers; the file holds them at
  // two decimals. An edge less than 0.005 outside the band rounds to equal its
  // end, so a tie is consistent with any verdict on that side. Strictly
  // outside before rounding implies at-or-outside after it.
  const above = edge > hi
  const below = edge < lo
  if ((verdict === 'edge' || verdict === 'fragile') && edge < hi) {
    errors.push(
      `[054.verdict-matches-numbers] ${where}: "${verdict}" needs an edge at or above the band, got ${band}`,
    )
  }
  if ((verdict === 'worse' || verdict === 'fragile-worse') && edge > lo) {
    errors.push(
      `[054.verdict-matches-numbers] ${where}: "${verdict}" needs an edge at or below the band, got ${band}`,
    )
  }
  if (verdict === 'none' && (above || below)) {
    errors.push(
      `[054.verdict-matches-numbers] ${where}: "none" needs an edge inside the band, got ${band}`,
    )
  }
  return errors
}

// --- 054.numbers-in-text-match-data -----------------------------------------

/**
 * The commentary fields: the prose a reader quotes, and the refs that say
 * which cells each text cites.
 */
const COMMENTARY_KEYS = new Set([
  'summary',
  'verdicts',
  'notes',
  'summaryRefs',
  'verdictRefs',
  'noteRefs',
])

/**
 * A cell a text cites: `{ tf, setting, scope }`, where `tf` and `setting` may
 * be "*" (every timeframe / every setting) and `scope` is "pooled" or a coin
 * of `method.pairs`, or "up" / "down" for the setting's regime cells
 * (`regimes`). Each text carries a list of them: `summaryRefs`,
 * `verdictRefs[i]` (for verdict i's use and text) and `noteRefs[i]`.
 */
interface EdgeRef {
  tf: string
  setting: string
  scope: string
}

/** A referenced cell with the setting it belongs to. */
interface RefCell {
  setting: Obj
  index: number
  scope: string
  cell: Obj
}

interface DataFacts {
  /**
   * The numbers a text may cite, as absolute values: those of `method`, of
   * the cells its refs name (not their chart series, `path` and `band`: at
   * three decimals they would let almost any two-decimal figure through by
   * rounding), the numbers in those settings' labels and ids, list lengths,
   * and the number of coins and timeframes.
   */
  values: number[]
  /** Ratios of two counts of those cells ("about twice as often"). */
  ratios: number[]
  /** The file's timeframes ("1h", "4h", "1d"): read as names, not numbers. */
  timeframes: Set<string>
}

/** The file's timeframes, which a text names freely. */
const timeframesOf = (data: Obj) =>
  new Set(
    (Array.isArray(data.settings) ? data.settings : []).flatMap((s) =>
      isObj(s) && isStr(s.tf) ? [s.tf] : [],
    ),
  )

/** Numbers in a data string: labels ("RSI(14) below 30"), ids, timeframes. */
const numbersIn = (text: string) =>
  (text.replace(/(\d),(?=\d{3}\b)/g, '$1').match(/\d+(?:\.\d+)?/g) ?? []).map(
    Number,
  )

/** The cells a ref list names, and the refs that are malformed or name none. */
function resolveRefs(
  data: Obj,
  refs: unknown,
): { cells: RefCell[]; errors: string[] } {
  if (!Array.isArray(refs))
    return { cells: [], errors: ['must be a list of { tf, setting, scope }'] }
  const method = isObj(data.method) ? data.method : {}
  const scopes = [
    'pooled',
    ...(Array.isArray(method.pairs) ? method.pairs : []).map(
      (p) => String(p).split('/')[0],
    ),
    'up',
    'down',
  ]
  const settings = Array.isArray(data.settings) ? data.settings : []
  const cells: RefCell[] = []
  const errors: string[] = []
  for (const ref of refs as unknown[]) {
    if (
      !isObj(ref) ||
      !isStr(ref.tf) ||
      !isStr(ref.setting) ||
      !scopes.includes(ref.scope as string)
    ) {
      errors.push(
        `ref ${JSON.stringify(ref)} must be { tf, setting, scope: ${scopes.join(' | ')} }`,
      )
      continue
    }
    const { tf, setting: id, scope } = ref as unknown as EdgeRef
    let found = 0
    settings.forEach((setting, index) => {
      if (!isObj(setting)) return
      if (tf !== '*' && setting.tf !== tf) return
      if (id !== '*' && setting.id !== id) return
      const cell =
        scope === 'pooled'
          ? setting.pooled
          : scope === 'up' || scope === 'down'
            ? isObj(setting.regimes)
              ? setting.regimes[scope]
              : undefined
            : isObj(setting.coins)
              ? setting.coins[scope]
              : undefined
      if (!isObj(cell)) return
      found++
      cells.push({ setting, index, scope, cell })
    })
    if (found === 0) errors.push(`ref ${JSON.stringify(ref)} names no cell`)
  }
  return { cells, errors }
}

function collectFacts(data: Obj, cells: RefCell[]): DataFacts {
  const values: number[] = []
  const walk = (node: unknown, key: string) => {
    if (isNum(node)) values.push(Math.abs(node))
    else if (typeof node === 'string') {
      // dates are matched as dates, not as numbers
      if (isoDay(node) === undefined) values.push(...numbersIn(node))
    } else if (Array.isArray(node)) {
      if (!(node.length === 2 && node.every(isNum))) values.push(node.length)
      node.forEach((item) => walk(item, key))
    } else if (isObj(node)) {
      for (const [k, v] of Object.entries(node)) {
        // engine shas are not numbers; the chart series are not quoted
        if (k === 'engine' || k === 'path' || k === 'band') continue
        walk(v, k)
      }
    }
  }
  walk(data.method, 'method')
  for (const { setting, cell } of cells) {
    walk(cell, 'cell')
    walk(setting.label, 'label')
    walk(setting.id, 'id')
  }
  const settings = Array.isArray(data.settings) ? data.settings : []
  values.push(new Set(settings.map((s) => (isObj(s) ? s.tf : ''))).size)

  // A ratio compares two counts of the same kind, scope ("pooled", "BTC", …)
  // and timeframe ("RSI(7) enters about twice as often as RSI(14)"), or the
  // two counts of one cell — among the cells the text cites.
  type Count = {
    group: string
    cell: string
    value: number
  }
  const counts: Count[] = []
  for (const { setting, index, scope, cell } of cells) {
    for (const kind of ['entries', 'episodes']) {
      const value = cell[kind]
      if (isCount(value) && value > 0)
        counts.push({
          group: `${String(setting.tf)}|${scope}|${kind}`,
          cell: `${index}|${scope}`,
          value,
        })
    }
  }
  const ratios: number[] = []
  for (const a of counts) {
    for (const b of counts) {
      if (a === b || (a.group !== b.group && a.cell !== b.cell)) continue
      const r = a.value / b.value
      if (r <= 10) ratios.push(r)
    }
  }
  return { values, ratios, timeframes: timeframesOf(data) }
}

const SMALL_WORDS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
}
// Spelled numbers from ten up are checked; two to nine are left alone, as
// they are ordinary prose far more often than statistics ("all three coins").
const TEENS: Record<string, number> = {
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
}
const TENS: Record<string, number> = {
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
}

const DATE_PATTERNS: RegExp[] = [
  // Nov 7–9, 2022 · Dec 25, 2020 · late Mar 3
  new RegExp(
    String.raw`\b(?:(?:early|mid|late)[- ])?${MONTH}\.? \d{1,2}(?:\s*[–-]\s*\d{1,2})?(?:,? (?:19|20)\d{2})?\b`,
    'g',
  ),
  // 7 November 2022 · 7–9 Nov
  new RegExp(
    String.raw`\b\d{1,2}(?:\s*[–-]\s*\d{1,2})? ${MONTH}\.?(?:,? (?:19|20)\d{2})?\b`,
    'g',
  ),
  // late December 2020 · February 2021
  new RegExp(
    String.raw`\b(?:(?:early|mid|late)[- ])?${MONTH},? (?:19|20)\d{2}\b`,
    'g',
  ),
  /\b(?:19|20)\d{2}-\d{2}-\d{2}\b/g,
]
// A bare year read as a date only after a word that makes it one ("in 2022"),
// so "2048 entries" is still checked as a number.
const BARE_YEAR =
  /\b(in|since|from|to|until|through|during|of|early|mid|late)\s+(?:19|20)\d{2}\b(?!\s*(?:%|[.,]\d))/gi
// A price level is a market fact of a dated episode ("SOL's run from about $4
// to $11 in February 2021"): allowed in a sentence that dates it, never
// elsewhere, since the data file holds no prices.
const CURRENCY = /[$€£]\s?\d[\d.,]*(?:\s?(?:k|m|bn|b)\b)?/gi
const RATIO = new RegExp(
  String.raw`\b(?:(twice)|(half)(?= as\b)|(\d+(?:\.\d+)?|${Object.keys(SMALL_WORDS).join('|')})( and a half)?\s*(?:times\b|×))`,
  'gi',
)
const SPELLED = new RegExp(
  String.raw`\b(?:(${Object.keys(TENS).join('|')})(?:[- ](${Object.keys(SMALL_WORDS).slice(0, 9).join('|')}))?|(${Object.keys(TEENS).join('|')}))\b`,
  'gi',
)
const DIGITS = /(?<![A-Za-z0-9.])\d+(?:\.\d+)?/g
const TIMEFRAME = /\b\d+[mhdwM]\b/g

const near = (a: number, b: number, tol: number) =>
  Math.abs(a - b) <= tol + 1e-9
const roundTo = (v: number, decimals: number) =>
  Math.round(v * 10 ** decimals) / 10 ** decimals

/** Whether a number written with `decimals` places is in the data. */
function inData(n: number, decimals: number, facts: DataFacts): boolean {
  return facts.values.some(
    (v) => near(v, n, 0.01) || near(roundTo(v, decimals), n, 0),
  )
}

/**
 * The numbers of one commentary string that the data does not hold. Dates
 * are not statistics and are skipped (a dated single episode is allowed);
 * "about two and a half times" must be a ratio of two counts.
 */
export function unsupportedNumbers(text: string, facts: DataFacts): string[] {
  const missing: string[] = []
  for (let sentence of text.split(/(?<=[.!?;:])\s+/)) {
    sentence = sentence.replace(/(\d),(?=\d{3}\b)/g, '$1')
    let dated = false
    for (const pattern of DATE_PATTERNS) {
      sentence = sentence.replace(pattern, () => {
        dated = true
        return ' '
      })
    }
    sentence = sentence.replace(BARE_YEAR, (_m, word: string) => {
      dated = true
      return `${word} `
    })
    // The data holds no prices: one counts only in a dated sentence.
    sentence = sentence.replace(CURRENCY, (raw) => {
      if (!dated) missing.push(raw.trim())
      return ' '
    })

    sentence = sentence.replace(
      RATIO,
      (raw, twice?: string, half?: string, n?: string, andHalf?: string) => {
        let value: number
        let tol: number
        if (twice) [value, tol] = [2, 0.5]
        else if (half) [value, tol] = [0.5, 0.25]
        else {
          const word = SMALL_WORDS[n!.toLowerCase()]
          const decimals = word ? 0 : (n!.split('.')[1]?.length ?? 0)
          value = (word ?? Number(n)) + (andHalf ? 0.5 : 0)
          tol = andHalf ? 0.25 : 0.5 * 10 ** -decimals
        }
        const ok =
          facts.ratios.some((r) => near(r, value, tol)) ||
          (!andHalf && inData(value, 0, facts))
        if (!ok) missing.push(raw.trim())
        return ' '
      },
    )

    sentence = sentence.replace(
      SPELLED,
      (raw, tens?: string, unit?: string, teen?: string) => {
        const value = teen
          ? TEENS[teen.toLowerCase()]
          : TENS[tens!.toLowerCase()] +
            (unit ? SMALL_WORDS[unit.toLowerCase()] : 0)
        if (!inData(value, 0, facts)) missing.push(raw)
        return ' '
      },
    )

    // a timeframe of the file is a name ("on 1h"), not the number 1
    sentence = sentence.replace(TIMEFRAME, (raw) =>
      facts.timeframes.has(raw) ? ' ' : raw,
    )
    for (const [raw] of sentence.matchAll(DIGITS)) {
      const decimals = raw.split('.')[1]?.length ?? 0
      if (!inData(Number(raw), decimals, facts)) missing.push(raw)
    }
  }
  return missing
}

/** The commentary strings with where they sit and the refs that cover them. */
function commentary(data: Obj): Array<[string, string, unknown]> {
  const out: Array<[string, string, unknown]> = []
  const at = (list: unknown, i: number) =>
    Array.isArray(list) ? list[i] : undefined
  if (typeof data.summary === 'string')
    out.push(['summary', data.summary, data.summaryRefs])
  if (Array.isArray(data.verdicts)) {
    data.verdicts.forEach((v, i) => {
      if (!isObj(v)) return
      const refs = at(data.verdictRefs, i)
      if (typeof v.use === 'string')
        out.push([`verdicts[${i}].use`, v.use, refs])
      if (typeof v.text === 'string')
        out.push([`verdicts[${i}].text`, v.text, refs])
    })
  }
  if (Array.isArray(data.notes)) {
    data.notes.forEach((n, i) => {
      if (typeof n === 'string')
        out.push([`notes[${i}]`, n, at(data.noteRefs, i)])
    })
  }
  return out
}

// --- the data file ----------------------------------------------------------

/** Every error of one `<slug>.edge.json`, parsed. Empty means it may ship. */
export function checkEdgeFile(
  data: unknown,
  options: EdgeCheckOptions,
): string[] {
  if (!isObj(data)) return ['the file must be a JSON object']
  const errors: string[] = []
  const { slug } = options
  const now = (options.now ?? new Date()).getTime()
  const maxAge = options.maxAgeDays ?? EDGE_MAX_AGE_DAYS

  if (data.indicator !== slug)
    errors.push(`indicator: must be "${slug}" (the file name)`)

  // method
  const method = isObj(data.method) ? data.method : undefined
  let minEpisodes = NaN
  if (!method) errors.push('method: must be an object')
  else {
    for (const key of ['horizon', 'randomDraws', 'minEpisodes']) {
      if (!Number.isInteger(method[key]) || (method[key] as number) <= 0)
        errors.push(`method.${key}: must be a whole number > 0`)
    }
    minEpisodes = Number(method.minEpisodes)
    if (
      !Array.isArray(method.horizons) ||
      method.horizons.length === 0 ||
      !method.horizons.every((h) => Number.isInteger(h) && h > 0)
    )
      errors.push('method.horizons: must be a list of whole numbers > 0')
    else if (!method.horizons.includes(method.horizon))
      errors.push('method.horizons: must include method.horizon')
    if (!isStr(method.source)) errors.push('method.source: must be a string')
    if (
      !Array.isArray(method.pairs) ||
      method.pairs.length === 0 ||
      !method.pairs.every((p) => typeof p === 'string' && /^\w+\/\w+$/.test(p))
    )
      errors.push('method.pairs: must be a list like ["BTC/USDT"]')
    if (
      method.regime !== undefined &&
      (!isObj(method.regime) ||
        !isStr(method.regime.by) ||
        !Number.isInteger(method.regime.sma) ||
        (method.regime.sma as number) <= 0)
    )
      errors.push('method.regime: must be { by, sma } with a whole sma > 0')
    if (
      !isObj(method.engine) ||
      !isStr(method.engine.indicators) ||
      !isStr(method.engine.analysisMath)
    )
      errors.push(
        'method.engine: must name the indicators and analysisMath versions',
      )
  }

  // 054.dated
  const updatedAt = isoDay(data.updatedAt)
  const from = isoDay(method?.from)
  const to = isoDay(method?.to)
  if (updatedAt === undefined)
    errors.push('[054.dated] updatedAt: must be a YYYY-MM-DD date')
  if (from === undefined)
    errors.push('[054.dated] method.from: must be a YYYY-MM-DD date')
  if (to === undefined)
    errors.push('[054.dated] method.to: must be a YYYY-MM-DD date')
  if (from !== undefined && to !== undefined && from >= to)
    errors.push('[054.dated] method.from must be before method.to')
  if (to !== undefined && updatedAt !== undefined && to > updatedAt)
    errors.push('[054.dated] method.to is after updatedAt')
  if (to !== undefined) {
    const age = Math.floor((now - to) / DAY_MS)
    if (age > maxAge)
      errors.push(
        `[054.dated] method.to (${method!.to}) is ${age} days old; at most ${maxAge} may be published`,
      )
    if (age < 0)
      errors.push(`[054.dated] method.to (${method!.to}) is in the future`)
  }

  // settings
  const coinNames = Array.isArray(method?.pairs)
    ? (method.pairs as unknown[]).map((p) => String(p).split('/')[0])
    : []
  const tfs = new Set<string>()
  if (!Array.isArray(data.settings) || data.settings.length === 0)
    errors.push('settings: must be a non-empty list')
  else {
    const seen = new Set<string>()
    data.settings.forEach((setting, i) => {
      if (!isObj(setting)) {
        errors.push(`settings[${i}]: must be an object`)
        return
      }
      const where = `settings[${i}] (${String(setting.id)} ${String(setting.tf)})`
      if (!isStr(setting.id)) errors.push(`${where}.id: must be a string`)
      if (!isStr(setting.tf)) errors.push(`${where}.tf: must be a string`)
      else tfs.add(setting.tf)
      const key = `${String(setting.tf)}|${String(setting.id)}`
      if (seen.has(key)) errors.push(`${where}: duplicate id on this tf`)
      seen.add(key)
      if (!isStr(setting.label)) errors.push(`${where}.label: must be a string`)
      if (setting.side !== 'long' && setting.side !== 'short')
        errors.push(`${where}.side: must be "long" or "short"`)
      if (
        setting.featured !== undefined &&
        typeof setting.featured !== 'boolean'
      )
        errors.push(`${where}.featured: must be true or false`)

      const cells: Array<[string, unknown]> = [
        [`${where}.pooled`, setting.pooled],
      ]
      if (!isObj(setting.coins))
        errors.push(`${where}.coins: must be an object`)
      else {
        const names = Object.keys(setting.coins)
        if (names.sort().join() !== [...coinNames].sort().join())
          errors.push(
            `${where}.coins: must hold exactly ${coinNames.join(', ')} (from method.pairs)`,
          )
        for (const [coin, cell] of Object.entries(setting.coins))
          cells.push([`${where}.coins.${coin}`, cell])
      }
      // the market-regime split (optional): an `up` and a `down` cell, each
      // held to the same rules as a coin cell
      if (setting.regimes !== undefined) {
        if (!isObj(setting.regimes))
          errors.push(`${where}.regimes: must be { up, down }`)
        else {
          const names = Object.keys(setting.regimes).sort().join()
          if (names !== 'down,up')
            errors.push(`${where}.regimes: must hold exactly up and down`)
          for (const regime of ['up', 'down'])
            if (setting.regimes[regime] !== undefined)
              cells.push([
                `${where}.regimes.${regime}`,
                setting.regimes[regime],
              ])
        }
      }

      for (const [cellWhere, cell] of cells) {
        const shape = cellShape(cell, cellWhere)
        errors.push(...shape)
        if (shape.length === 0 && Number.isFinite(minEpisodes))
          errors.push(...cellInvariants(cell as Cell, cellWhere, minEpisodes))
      }

      // The chart beside the table: path and band end at the horizon value
      const pooled = setting.pooled
      if (!isObj(pooled)) return
      const { path: line, band } = pooled
      if (
        !Array.isArray(line) ||
        line.length === 0 ||
        !line.every(isNum) ||
        !Array.isArray(band) ||
        band.length !== line.length ||
        !band.every(isRange)
      ) {
        errors.push(
          `${where}.pooled: path must be numbers and band [low, high] pairs of the same length`,
        )
        return
      }
      if (method && line.length !== method.horizon)
        errors.push(
          `${where}.pooled.path: ${line.length} points, method.horizon is ${String(method.horizon)}`,
        )
      if (isNum(pooled.edge) && !near(pooled.edge, line.at(-1)!, 0.01))
        errors.push(
          `[054.verdict-matches-numbers] ${where}.pooled: edge ${pooled.edge} is not the chart's last value ${line.at(-1)}`,
        )
      const last = band.at(-1) as [number, number]
      if (
        isRange(pooled.chance) &&
        !(
          near(pooled.chance[0], last[0], 0.01) &&
          near(pooled.chance[1], last[1], 0.01)
        )
      )
        errors.push(
          `[054.verdict-matches-numbers] ${where}.pooled: chance [${pooled.chance.join(', ')}] is not the chart band's last value [${last.join(', ')}]`,
        )
    })
  }
  if (!isStr(data.defaultTf) || !tfs.has(data.defaultTf))
    errors.push(
      `defaultTf: must be one of the settings' tf (${[...tfs].join(', ')})`,
    )

  // commentary shape
  if (!isStr(data.summary)) errors.push('summary: must be a string')
  if (!Array.isArray(data.verdicts) || data.verdicts.length === 0)
    errors.push('verdicts: must be a non-empty list')
  else
    data.verdicts.forEach((v, i) => {
      if (
        !isObj(v) ||
        !isStr(v.use) ||
        !isStr(v.text) ||
        !EDGE_VERDICTS.includes(v.verdict as EdgeVerdict)
      )
        errors.push(
          `verdicts[${i}]: must be { use, verdict, text } with a known verdict`,
        )
    })
  if (!Array.isArray(data.notes) || !data.notes.every(isStr))
    errors.push('notes: must be a list of strings')
  if (!Array.isArray(data.summaryRefs))
    errors.push('summaryRefs: must be a list of { tf, setting, scope }')
  if (
    !Array.isArray(data.verdictRefs) ||
    !Array.isArray(data.verdicts) ||
    data.verdictRefs.length !== data.verdicts.length
  )
    errors.push('verdictRefs: must hold one list of refs per verdict')
  if (
    !Array.isArray(data.noteRefs) ||
    !Array.isArray(data.notes) ||
    data.noteRefs.length !== data.notes.length
  )
    errors.push('noteRefs: must hold one list of refs per note')

  // 054.numbers-in-text-match-data (each text against the cells its refs
  // name, plus method) and 054.style
  const extraBanned = extraBannedFor('docs/indicators')
  for (const [where, text, refs] of commentary(data)) {
    const resolved = resolveRefs(data, refs ?? [])
    for (const error of resolved.errors)
      errors.push(`[054.numbers-in-text-match-data] ${where}: ${error}`)
    const cited = resolved.cells.length > 0
    const missing = unsupportedNumbers(
      text,
      cited
        ? collectFacts(data, resolved.cells)
        : { values: [], ratios: [], timeframes: timeframesOf(data) },
    )
    if (missing.length > 0)
      errors.push(
        cited
          ? `[054.numbers-in-text-match-data] ${where}: ${missing.map((m) => `"${m}"`).join(', ')} not in the cells its refs name`
          : `[054.numbers-in-text-match-data] ${where}: cites ${missing.map((m) => `"${m}"`).join(', ')} but its refs name no cells`,
      )
    for (const hit of lintMarkdown(text, { extraBanned }).hits) {
      if (hit.severity !== 'banned') continue
      errors.push(
        `[054.style] ${where}: "${hit.match}" (${hit.rule}) — ${hit.advice}`,
      )
    }
  }
  return errors
}

// --- the recipe -------------------------------------------------------------

/**
 * Required keys of `<slug>.edge-recipe.json` only: `indicator`, and either
 * `skip` (why the indicator cannot be evaluated this way) or a non-empty
 * `settings` list whose items carry an `id` and a `bot`. Anything else is the
 * engine's. With the catalog, each `bot` is also held to it (checkRecipeBots).
 */
export function checkEdgeRecipe(
  data: unknown,
  slug: string,
  catalog?: BotCatalog,
): string[] {
  if (!isObj(data)) return ['the file must be a JSON object']
  const errors: string[] = []
  if (data.indicator !== slug)
    errors.push(`indicator: must be "${slug}" (the file name)`)
  if (data.skip !== undefined) {
    if (!isStr(data.skip)) errors.push('skip: must be the reason, a string')
    return errors
  }
  if (!Array.isArray(data.settings) || data.settings.length === 0) {
    errors.push('settings: must be a non-empty list (or give "skip": reason)')
    return errors
  }
  const ids = new Set<string>()
  data.settings.forEach((setting, i) => {
    if (!isObj(setting) || !isStr(setting.id)) {
      errors.push(`settings[${i}]: must be an object with an id`)
      return
    }
    if (ids.has(setting.id))
      errors.push(`settings[${i}]: duplicate id "${setting.id}"`)
    ids.add(setting.id)
  })
  errors.push(...checkRecipeBots(data.settings, catalog))
  return errors
}

// --- a setting's bot-form config ---------------------------------------------

/**
 * One field of a catalog type, as the bot check reads it (statically, from the
 * dashboard's indicator catalog; see loadBotCatalog).
 */
export interface BotCatalogField {
  key: string
  /** number | select | boolean | interval | string | time */
  type: string
  /** The select's option values; undefined when they are not static. */
  options?: unknown[]
  /** Another option list while another field has a value (first match wins). */
  optionsWhen: Array<{ field: string; equals: unknown; options?: unknown[] }>
  defaultValue?: unknown
  multiple: boolean
  /** False for a control that stores nothing of its own (a `derive` without a default). */
  stored: boolean
}

export interface BotCatalogType {
  pendingPort: boolean
  /** By every key the type stores, including the keys a field switches to (`keyWhen`). */
  fields: Map<string, BotCatalogField>
}

/** Catalog types by IndicatorEnum value. */
export type BotCatalog = Map<string, BotCatalogType>

const optionValues = (raw: unknown): unknown[] | undefined => {
  if (!Array.isArray(raw) || raw.length === 0) return undefined
  const values = raw.map((o) => (isObj(o) ? o.value : undefined))
  return values.every(
    (v) =>
      typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean',
  )
    ? values
    : undefined
}

/**
 * The bot-check view of the dashboard catalog (`BASE_INDICATOR_CATALOG`),
 * evaluated statically by describeNative's evaluator: no dashboard code is
 * imported or run. Option lists the evaluator cannot fold (imported presets,
 * a filter over an imported list) are left undefined, so their values are
 * not checked. Throws when the catalog cannot be read at all.
 */
export async function loadBotCatalog(
  reader: ModuleReader,
): Promise<BotCatalog> {
  const ev = new CatalogEvaluator(reader)
  const raw = await ev.lookup(
    await ev.load(CATALOG_MODULE),
    'BASE_INDICATOR_CATALOG',
  )
  if (!isObj(raw))
    throw new Error(
      'BASE_INDICATOR_CATALOG could not be evaluated for the bot check; update loadBotCatalog',
    )
  const catalog: BotCatalog = new Map()
  for (const [type, def] of Object.entries(raw)) {
    if (!isObj(def)) continue
    const list = [
      ...(Array.isArray(def.fields) ? def.fields : []),
      ...(Array.isArray(def.advancedFields) ? def.advancedFields : []),
    ].filter(
      (f): f is Obj =>
        isObj(f) && typeof f.key === 'string' && typeof f.type === 'string',
    )
    if (list.length === 0)
      throw new Error(
        `BASE_INDICATOR_CATALOG.${type}: no fields could be read; update loadBotCatalog`,
      )
    const fields = new Map<string, BotCatalogField>()
    const aliases: Array<[string, BotCatalogField]> = []
    for (const f of list) {
      const field: BotCatalogField = {
        key: f.key as string,
        type: f.type as string,
        options: optionValues(f.options),
        optionsWhen: (Array.isArray(f.optionsWhen) ? f.optionsWhen : [])
          .filter(isObj)
          .map((w) => ({
            field: String(w.field),
            equals: w.equals,
            options: optionValues(w.options),
          })),
        defaultValue: f.defaultValue,
        // a list default makes a select multi-valued too (Divergence's oscillators)
        multiple: f.multiple === true || Array.isArray(f.defaultValue),
        stored: !(f.derive !== undefined && f.defaultValue === undefined),
      }
      fields.set(field.key, field)
      for (const k of Array.isArray(f.keyWhen) ? f.keyWhen : [])
        if (isObj(k) && typeof k.key === 'string')
          aliases.push([
            k.key,
            { ...field, key: k.key, defaultValue: k.defaultValue },
          ])
    }
    for (const [key, field] of aliases)
      if (!fields.has(key)) fields.set(key, field)
    catalog.set(type, { pendingPort: def.pendingPort === true, fields })
  }
  return catalog
}

/** A recipe leaf's comparison → the form's `indicatorCondition`. */
const FORM_CONDITION: Record<string, string> = {
  lt: 'lt',
  gt: 'gt',
  crossUp: 'cu',
  crossDown: 'cd',
  between: 'bw',
}
const FLIPPED: Record<string, string> = {
  lt: 'gt',
  gt: 'lt',
  crossUp: 'crossDown',
  crossDown: 'crossUp',
}
/**
 * A recipe leaf whose level is the close ("the band crosses down the close")
 * tests the move from the line's side, while the form names it from price's
 * side ("Price crossing up" the band): the condition flips. Except here, where
 * the form reads "<MA> <condition> <Compared to: price>" and the line is its
 * subject too.
 */
const LINE_IS_SUBJECT = new Set(['MA'])
/** Types whose Value the bot reads as a drawdown: it compares with -|Value|. */
const NEGATED_VALUE = new Set(['ATH'])
const TIME = /^(?:|(?:[01]\d|2[0-3]):[0-5]\d)$/

/**
 * Every setting's `bot`: the bot-form condition that reproduces exactly what
 * the engine tested, `{ type, params }` (params merged over the catalog
 * defaults by the dashboard), or `null` with `botWhyNot` where the form
 * cannot express it. With the catalog:
 *   - `type` is a catalog type the form can build (not pendingPort);
 *   - every param key is a field the type stores, never an interval (the
 *     dashboard sets those from the timeframe tab) or a control that stores
 *     nothing;
 *   - numbers are numbers, booleans booleans, times HH:MM, and a select's
 *     value is one of its options (the `optionsWhen` list when the controlling
 *     field, from the params or its default, selects one);
 *   - on a single-comparison condition, `indicatorCondition` is the tested
 *     op (lt/gt/crossUp/crossDown/between ↔ lt/gt/cu/cd/bw, flipped against
 *     the close, see LINE_IS_SUBJECT), a numeric level is `indicatorValue`
 *     (`valueInsteadof` for a Stochastic custom line; -|Value| for ATH), and
 *     a level that is the indicator's own percentile needs `percentile`.
 */
export function checkRecipeBots(
  settings: unknown[],
  catalog?: BotCatalog,
): string[] {
  const errors: string[] = []
  settings.forEach((setting, i) => {
    // a setting without an id is already reported
    if (!isObj(setting) || !isStr(setting.id)) return
    const at = `settings[${i}] (${setting.id})`
    if (!('bot' in setting)) {
      errors.push(
        `${at}: bot is required: the bot-form config { type, params }, or null with botWhyNot`,
      )
      return
    }
    const { bot, botWhyNot } = setting
    if (bot === null) {
      if (!isStr(botWhyNot))
        errors.push(
          `${at}.botWhyNot: required with "bot": null (why the form cannot reproduce it)`,
        )
      return
    }
    if (botWhyNot !== undefined)
      errors.push(`${at}.botWhyNot: only with "bot": null`)
    if (!isObj(bot) || !isStr(bot.type) || !isObj(bot.params)) {
      errors.push(`${at}.bot: must be { type, params } or null`)
      return
    }
    for (const k of Object.keys(bot))
      if (k !== 'type' && k !== 'params')
        errors.push(`${at}.bot.${k}: unknown key`)
    if (!catalog) return
    const entry = catalog.get(bot.type)
    if (!entry) {
      errors.push(
        `${at}.bot.type: "${bot.type}" is not in the indicator catalog`,
      )
      return
    }
    if (entry.pendingPort)
      errors.push(
        `${at}.bot.type: "${bot.type}" is pendingPort, so the form cannot build it`,
      )
    const params = bot.params
    for (const [key, value] of Object.entries(params)) {
      const where = `${at}.bot.params.${key}`
      const field = entry.fields.get(key)
      if (!field) {
        errors.push(`${where}: not a field of ${bot.type}`)
        continue
      }
      if (field.type === 'interval') {
        errors.push(
          `${where}: an interval; the dashboard sets it from the timeframe tab`,
        )
        continue
      }
      if (!field.stored) {
        errors.push(
          `${where}: a control that stores nothing of its own; set the fields it writes`,
        )
        continue
      }
      errors.push(...botValueErrors(where, field, value, entry, params))
    }
    errors.push(
      ...botConditionErrors(
        `${at}.bot.params`,
        setting.condition,
        bot.type,
        entry,
        params,
      ),
    )
  })
  return errors
}

function botValueErrors(
  where: string,
  field: BotCatalogField,
  value: unknown,
  entry: BotCatalogType,
  params: Obj,
): string[] {
  const show = JSON.stringify(value)
  switch (field.type) {
    case 'number':
      return isNum(value) ? [] : [`${where}: must be a number, got ${show}`]
    case 'boolean':
      return typeof value === 'boolean'
        ? []
        : [`${where}: must be true or false, got ${show}`]
    case 'time':
      return typeof value === 'string' && TIME.test(value)
        ? []
        : [`${where}: must be a time HH:MM (or ""), got ${show}`]
    case 'string':
      return typeof value === 'string'
        ? []
        : [`${where}: must be a string, got ${show}`]
    case 'select': {
      let options = field.options
      for (const w of field.optionsWhen) {
        const control =
          w.field in params
            ? params[w.field]
            : entry.fields.get(w.field)?.defaultValue
        if (control === w.equals) {
          options = w.options
          break
        }
      }
      const values = field.multiple ? value : [value]
      if (!Array.isArray(values) || (field.multiple && !Array.isArray(value)))
        return [`${where}: must be a list of options, got ${show}`]
      const bad = values.filter(
        (v) =>
          !(
            typeof v === 'string' ||
            typeof v === 'number' ||
            typeof v === 'boolean'
          ) ||
          (options !== undefined && !options.includes(v)),
      )
      return bad.length
        ? [
            `${where}: ${bad.map((v) => JSON.stringify(v)).join(', ')} is not an option${options ? ` (${options.join(', ')})` : ''}`,
          ]
        : []
    }
    default:
      return []
  }
}

/** The single-comparison consistency rules of checkRecipeBots. */
function botConditionErrors(
  where: string,
  condition: unknown,
  type: string,
  entry: BotCatalogType,
  params: Obj,
): string[] {
  if (!isObj(condition) || 'any' in condition || 'all' in condition) return []
  const errors: string[] = []
  const { op, against } = condition
  const hasCondition = entry.fields.has('indicatorCondition')
  if (op === 'fn') {
    const fnCondition = isObj(condition.options)
      ? condition.options.condition
      : undefined
    if (
      hasCondition &&
      typeof fnCondition === 'string' &&
      params.indicatorCondition !== fnCondition
    )
      errors.push(
        `${where}.indicatorCondition: ${JSON.stringify(params.indicatorCondition)}, but the tested condition is "${fnCondition}"`,
      )
    return errors
  }
  if (typeof op !== 'string' || !(op in FORM_CONDITION)) return errors
  if (hasCondition) {
    const formOp =
      against === 'close' && !LINE_IS_SUBJECT.has(type)
        ? (FLIPPED[op] ?? op)
        : op
    const expected = FORM_CONDITION[formOp]
    if (params.indicatorCondition !== expected)
      errors.push(
        `${where}.indicatorCondition: ${JSON.stringify(params.indicatorCondition)}, but the tested condition is ${op}${formOp !== op ? ` (${formOp} from price's side)` : ''}, i.e. "${expected}"`,
      )
  }
  const valueKey = entry.fields.has('indicatorValue')
    ? 'indicatorValue'
    : params.rsiValue2 === 'custom' && entry.fields.has('valueInsteadof')
      ? 'valueInsteadof'
      : null
  const level = (v: unknown) =>
    isNum(v) ? (NEGATED_VALUE.has(type) ? -Math.abs(v) : v) : NaN
  if (isNum(against) && valueKey) {
    if (level(params[valueKey]) !== against)
      errors.push(
        `${where}.${valueKey}: ${JSON.stringify(params[valueKey])}, but the tested level is ${against}${NEGATED_VALUE.has(type) ? ` (the bot compares with -|${valueKey}|)` : ''}`,
      )
  } else if (
    op === 'between' &&
    isRange(against) &&
    valueKey === 'indicatorValue'
  ) {
    const got = [
      level(params.indicatorValue),
      level(params.indicatorValue2),
    ].sort((a, b) => a - b)
    if (got[0] !== against[0] || got[1] !== against[1])
      errors.push(
        `${where}: indicatorValue / indicatorValue2 ${JSON.stringify([params.indicatorValue, params.indicatorValue2])}, but the tested range is [${against.join(', ')}]`,
      )
  } else if (
    isObj(against) &&
    against.output === 'percentile' &&
    against.indicator === undefined
  ) {
    if (params.percentile !== true)
      errors.push(
        `${where}.percentile: must be true; the tested level is the indicator's own percentile`,
      )
  }
  return errors
}

// --- a docs directory -------------------------------------------------------

export interface EdgeDirResult {
  errors: string[]
  dataFiles: number
  recipes: number
}

/**
 * Check every edge data file and recipe in an indicators directory. Each must
 * sit beside a page (`<slug>.md`); a recipe that skips must have no data.
 */
export async function checkEdgeDir(
  dir: string,
  options: {
    pageSlugs: Iterable<string>
    now?: Date
    /** How a file is named in errors (default: its file name). */
    label?: (file: string) => string
    /** The dashboard catalog the recipes' `bot` configs are held to (loadBotCatalog). */
    catalog?: BotCatalog
  },
): Promise<EdgeDirResult> {
  const names = (await fs.readdir(dir).catch(() => [] as string[])).sort()
  const pages = new Set(options.pageSlugs)
  const label = options.label ?? ((file: string) => file)
  const errors: string[] = []
  const skipped = new Set<string>()
  const dataSlugs: string[] = []
  let dataFiles = 0
  let recipes = 0

  for (const file of names) {
    const suffix = file.endsWith(EDGE_SUFFIX)
      ? EDGE_SUFFIX
      : file.endsWith(EDGE_RECIPE_SUFFIX)
        ? EDGE_RECIPE_SUFFIX
        : undefined
    if (!suffix) continue
    const slug = file.slice(0, -suffix.length)
    const name = label(file)
    if (suffix === EDGE_SUFFIX) {
      dataFiles++
      dataSlugs.push(slug)
    } else recipes++
    if (!pages.has(slug)) errors.push(`${name}: no page ${slug}.md beside it`)
    let data: unknown
    try {
      data = JSON.parse(await fs.readFile(path.join(dir, file), 'utf-8'))
    } catch (error) {
      errors.push(`${name}: not valid JSON (${(error as Error).message})`)
      continue
    }
    const found =
      suffix === EDGE_SUFFIX
        ? checkEdgeFile(data, { slug, now: options.now })
        : checkEdgeRecipe(data, slug, options.catalog)
    errors.push(...found.map((error) => `${name}: ${error}`))
    if (suffix === EDGE_RECIPE_SUFFIX && isObj(data) && data.skip !== undefined)
      skipped.add(slug)
  }
  for (const slug of dataSlugs) {
    if (skipped.has(slug))
      errors.push(
        `${label(`${slug}${EDGE_SUFFIX}`)}: its recipe says skip, so it must not be published`,
      )
  }
  return { errors, dataFiles, recipes }
}
