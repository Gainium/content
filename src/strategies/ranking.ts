import type { ParsedStrategy } from '../types'
import { VERDICTS, type StrategyVerdict } from './resultsCheck'

/**
 * Strategy ranking (main-app spec 061 §5): verdict first (beats random or
 * holding in both periods, then mixed, inside the luck band, worse, too few
 * trades), then the out-of-sample return over its baseline.
 *
 * Not by raw return: a strategy that rode one coin's rally would top a return
 * ranking without any rule of its own doing the work. The baseline (random
 * entries with the same exits, or holding) takes that rally out.
 */

export interface StrategyPeriodSummary {
  return: number
  maxDrawdown: number
  profitFactor: number | null
  trades: number
  /** Random entries' median return, or holding's return. */
  baselineReturn: number
  /** The luck band (random baseline only). */
  band?: [number, number]
  state: string
}

export interface StrategyRankingItem {
  slug: string
  name: string
  tags: string[]
  /** The recipe's rule count: the beginners view sorts on it. */
  rules: number
  baseline: 'random' | 'hold'
  verdict: StrategyVerdict
  /** Out-of-sample return minus its baseline, percentage points. */
  excess: number
  inSample: StrategyPeriodSummary
  outOfSample: StrategyPeriodSummary
  /** Window: method.from → method.to, out-of-sample from method.oosFrom. */
  from: string
  oosFrom: string
  to: string
  updatedAt: string
}

const summary = (p: any, baseline: string): StrategyPeriodSummary => ({
  return: p.strategy.return,
  maxDrawdown: p.strategy.maxDrawdown,
  profitFactor: p.strategy.profitFactor ?? null,
  trades: p.strategy.trades,
  baselineReturn: baseline === 'random' ? p.random.medianReturn : p.hold.return,
  ...(baseline === 'random' ? { band: p.random.band } : {}),
  state: p.state,
})

/** The ranking row of one page, or null without results. */
export function toRankingItem(doc: ParsedStrategy): StrategyRankingItem | null {
  const r = doc.results as any
  const recipe = doc.recipe as any
  if (!r || !recipe || !r.periods?.inSample || !r.periods?.outOfSample)
    return null
  const baseline = r.method.baseline
  return {
    slug: doc.metadata.slug,
    name: doc.metadata.name,
    tags: recipe.tags ?? [],
    rules: (recipe.rules ?? []).length,
    baseline,
    verdict: r.verdict,
    excess: r.excess,
    inSample: summary(r.periods.inSample, baseline),
    outOfSample: summary(r.periods.outOfSample, baseline),
    from: r.method.from,
    oosFrom: r.method.oosFrom,
    to: r.method.to,
    updatedAt: r.updatedAt,
  }
}

export function rankStrategies(docs: ParsedStrategy[]): StrategyRankingItem[] {
  return docs
    .map(toRankingItem)
    .filter((i): i is StrategyRankingItem => i !== null)
    .sort(
      (a, b) =>
        VERDICTS.indexOf(a.verdict) - VERDICTS.indexOf(b.verdict) ||
        b.excess - a.excess ||
        a.slug.localeCompare(b.slug),
    )
}
