/**
 * Strategy recipe + results checks (main-app spec 061 §5, Invariants).
 *
 * The engine (claus-dashboard lib/strategy-edge/) runs the same rules before
 * it writes a file (verdict.js checkInvariants); this is the CI copy, so a
 * hand edit or an engine bug cannot reach the site. Keep the two in step.
 */
import fs from 'fs/promises'
import path from 'path'
import { parseStrategySource, readMarkdownDir } from '../contentParser'

export const VERDICTS = ['beats', 'mixed', 'inside', 'worse', 'few'] as const
export type StrategyVerdict = (typeof VERDICTS)[number]
const STATES = ['above', 'inside', 'below', 'few']
/** The out-of-sample start when a recipe names none (engine METHOD.oosFrom). */
export const DEFAULT_OOS_FROM = '2024-01-01'
const DAY = 86_400_000
const MAX_AGE_DAYS = 45

const isDate = (s: unknown): s is string =>
  typeof s === 'string' &&
  /^\d{4}-\d{2}-\d{2}$/.test(s) &&
  !Number.isNaN(Date.parse(s))
const isNum = (x: unknown): x is number =>
  typeof x === 'number' && Number.isFinite(x)
const daysBetween = (from: string, to: string) =>
  Math.round((Date.parse(to) - Date.parse(from)) / DAY) + 1

/** engine verdict.js stateOf */
export function stateOf(p: any, baseline: string, minTrades: number): string {
  const ret = p.strategy.return
  if (baseline === 'hold')
    return ret > p.hold.return
      ? 'above'
      : ret < p.hold.return
        ? 'below'
        : 'inside'
  if (!(p.strategy.trades >= minTrades)) return 'few'
  const [lo, hi] = p.random.band
  return ret > hi ? 'above' : ret < lo ? 'below' : 'inside'
}

/** engine verdict.js verdictOf: out-of-sample decides, in-sample can only confirm */
export function verdictOf(
  inSample: string,
  outOfSample: string,
  oosLongEnough = true,
): StrategyVerdict {
  if (!oosLongEnough || outOfSample === 'few') return 'few'
  if (outOfSample === 'inside') return 'inside'
  if (outOfSample === 'above' && inSample === 'above') return 'beats'
  if (outOfSample === 'below' && inSample === 'below') return 'worse'
  return 'mixed'
}

/** The recipe fields the API and the site read; the engine checks the rest. */
export function checkRecipe(recipe: any, slug: string): string[] {
  const errs: string[] = []
  if (!recipe || typeof recipe !== 'object') return ['recipe is not an object']
  if (recipe.strategy !== slug) errs.push(`recipe.strategy must be "${slug}"`)
  if (!['random', 'hold'].includes(recipe.baseline))
    errs.push('recipe.baseline must be random or hold')
  if (!Array.isArray(recipe.rules) || recipe.rules.length === 0)
    errs.push('recipe.rules must be a non-empty list')
  if (!Array.isArray(recipe.tags)) errs.push('recipe.tags must be a list')
  if (!Array.isArray(recipe.notExpressed))
    errs.push('recipe.notExpressed must be a list')
  if (typeof recipe.tuned !== 'boolean' || !isDate(recipe.rulesFixedAt))
    errs.push('recipe.tuned and recipe.rulesFixedAt are required')
  else if (
    recipe.tuned &&
    !(isDate(recipe.oosFrom) && recipe.oosFrom >= recipe.rulesFixedAt)
  )
    errs.push(
      '061.oos-after-tuning: a tuned recipe needs oosFrom on or after rulesFixedAt',
    )
  return errs
}

/**
 * A `<slug>.results.json` against its recipe and the 061 invariants.
 * Returns the violations; empty = fine.
 */
export function checkResultsFile(
  data: any,
  {
    slug,
    recipe,
    now = Date.now(),
  }: { slug: string; recipe: any; now?: number },
): string[] {
  const errs: string[] = []
  const m = data?.method ?? {}
  if (data?.strategy !== slug) errs.push(`strategy must be "${slug}"`)
  if (!isDate(data?.updatedAt)) errs.push('061.dated: updatedAt missing')
  if (!isDate(m.from) || !isDate(m.oosFrom) || !isDate(m.to)) {
    errs.push('061.dated: method.from/oosFrom/to missing')
  } else if (now - Date.parse(m.to) > MAX_AGE_DAYS * DAY) {
    errs.push(
      `061.dated: method.to ${m.to} is more than ${MAX_AGE_DAYS} days old`,
    )
  }
  if (recipe) {
    if (m.baseline !== recipe.baseline)
      errs.push(
        `method.baseline ${m.baseline} is not the recipe's ${recipe.baseline}`,
      )
    const oosFrom = recipe.oosFrom ?? DEFAULT_OOS_FROM
    if (m.oosFrom !== oosFrom)
      errs.push(`method.oosFrom ${m.oosFrom} is not the recipe's ${oosFrom}`)
  }
  if (!isNum(m.minTrades) || !isNum(m.minOosDays) || !isNum(m.budget))
    errs.push('method.minTrades, minOosDays and budget are required')

  const ins = data?.periods?.inSample
  const oos = data?.periods?.outOfSample
  if (!ins || !oos) {
    errs.push('061.verdict-needs-oos: both periods are required')
    return errs
  }
  if (isDate(m.oosFrom) && (oos.from !== m.oosFrom || !(ins.to < m.oosFrom)))
    errs.push(
      `061.verdict-needs-oos: in-sample must end before ${m.oosFrom} and out-of-sample start on it`,
    )
  for (const [name, p] of [
    ['inSample', ins],
    ['outOfSample', oos],
  ] as const) {
    const s = p?.strategy ?? {}
    if (
      !isNum(s.return) ||
      !isNum(s.maxDrawdown) ||
      !Number.isInteger(s.trades)
    ) {
      errs.push(`${name}: strategy return, maxDrawdown and trades are required`)
      continue
    }
    if (!p.hold || !isNum(p.hold.return)) {
      errs.push(`${name}: hold.return is required`)
      continue
    }
    if (m.baseline === 'random') {
      const band = p.random?.band
      if (
        !Array.isArray(band) ||
        !isNum(band[0]) ||
        !isNum(band[1]) ||
        band[0] > band[1]
      ) {
        errs.push(`${name}: a random baseline needs random.band [lo, hi]`)
        continue
      }
      if (!isNum(p.random.medianReturn))
        errs.push(`${name}: random.medianReturn is required`)
    }
    if (!STATES.includes(p.state)) {
      errs.push(`${name}: unknown state ${p.state}`)
      continue
    }
    const want = stateOf(p, m.baseline, m.minTrades)
    if (p.state !== want)
      errs.push(
        `061.state-matches-numbers: ${name} is ${p.state}, its numbers say ${want}`,
      )
    // engine verdict.js likeForLike: the random bot traded about as often
    if (
      m.baseline === 'random' &&
      s.trades >= m.minTrades &&
      !(
        Math.abs(p.random.medianTrades - s.trades) <=
        Math.max(3, 0.25 * s.trades)
      )
    )
      errs.push(
        `061.random-like-for-like: ${name} random entries trade ${p.random.medianTrades} times, the strategy ${s.trades}`,
      )
  }
  const longEnough =
    isDate(oos.from) &&
    isDate(oos.to) &&
    daysBetween(oos.from, oos.to) >= m.minOosDays
  const want = verdictOf(ins.state, oos.state, longEnough)
  if (!VERDICTS.includes(data.verdict))
    errs.push(`unknown verdict ${data.verdict}`)
  else if (data.verdict !== want)
    errs.push(
      `061.verdict-needs-oos: verdict ${data.verdict}, the periods say ${want}`,
    )
  const ref =
    m.baseline === 'random' ? oos.random?.medianReturn : oos.hold?.return
  if (
    !isNum(data.excess) ||
    (isNum(ref) && Math.abs(data.excess - (oos.strategy.return - ref)) > 0.011)
  )
    errs.push('excess must be the out-of-sample return minus its baseline')
  return errs
}

/**
 * A performance figure written into a strategy page's prose
 * (061.strategy-numbers-from-results): "returned 45%", "a 12% drawdown",
 * "win rate of 60%". Rule parameters ("a 20-day high", "3% below the base",
 * "1% spacing") are fine; results belong to the results file, which the page
 * renders, so a monthly refresh can never leave a stale claim in the text.
 */
// "take profit 3%" is a rule parameter, not a result
const RESULT_WORDS =
  '(?:return(?:s|ed)?|(?<!take[ -])profit(?:s|able)?|gain(?:s|ed)?|drawdown|win(?:ning)? rate|annual(?:ised|ized)?|per year|a year|apy|apr|roi|outperform(?:s|ed)?|beat(?:s)?)'
const PERCENT = String.raw`[-+]?\d+(?:\.\d+)?\s*%`
const RESULT_CLAIM = new RegExp(
  `${PERCENT}\\s+(?:\\w+\\s+){0,2}${RESULT_WORDS}\\b|\\b${RESULT_WORDS}\\b[^.%\\n]{0,30}?${PERCENT}`,
  'i',
)

export function checkStrategyBody(content: string): string[] {
  const errs: string[] = []
  for (const line of content.split('\n')) {
    const hit = RESULT_CLAIM.exec(line)
    if (hit)
      errs.push(
        `061.strategy-numbers-from-results: "${hit[0].trim()}" — results come from the results file, not the prose`,
      )
  }
  return errs
}

/**
 * Every page in docs/strategies: frontmatter, its recipe (required), its
 * results (when present), the prose rule, and `related` slugs that exist.
 */
export async function checkStrategiesDir(
  dir: string,
  now = Date.now(),
): Promise<string[]> {
  const { exists, files } = await readMarkdownDir(dir)
  if (!exists) return []
  const errs: string[] = []
  const slugs = new Set<string>()
  const related: Array<[string, string]> = []
  for (const { file, raw } of files) {
    const { doc, errors } = parseStrategySource(raw)
    if (!doc) {
      errs.push(...errors.map((e) => `${file}: ${e}`))
      continue
    }
    const slug = doc.metadata.slug
    if (`${slug}.md` !== file)
      errs.push(`${file}: slug "${slug}" is not the file name`)
    slugs.add(slug)
    for (const r of doc.metadata.related ?? []) related.push([file, r])
    errs.push(...checkStrategyBody(doc.content).map((e) => `${file}: ${e}`))
    const read = async (name: string) => {
      try {
        return JSON.parse(await fs.readFile(path.join(dir, name), 'utf-8'))
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined
        errs.push(`${name}: ${(error as Error).message}`)
        return null
      }
    }
    const recipe = await read(`${slug}.recipe.json`)
    if (recipe === undefined)
      errs.push(`${file}: ${slug}.recipe.json is required`)
    else if (recipe)
      errs.push(
        ...checkRecipe(recipe, slug).map((e) => `${slug}.recipe.json: ${e}`),
      )
    const results = await read(`${slug}.results.json`)
    if (results)
      errs.push(
        ...checkResultsFile(results, { slug, recipe, now }).map(
          (e) => `${slug}.results.json: ${e}`,
        ),
      )
  }
  for (const [file, r] of related)
    if (!slugs.has(r))
      errs.push(`${file}: related "${r}" is not a strategy page`)
  return errs
}
