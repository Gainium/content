import type { ParsedIndicator } from '../types'

/**
 * Edge ranking (main-app spec 061 §3): how often an indicator's tested
 * settings beat random entries, against how often luck alone would.
 *
 * The luck band is the 5th–95th percentile of random entries (spec 054), so
 * a setting with no edge still lands above it 5% of the time. Ranking by an
 * indicator's best setting would therefore rank luck: an indicator with 20
 * settings tested is likely to have one "edge" by chance alone. The ranking
 * instead asks how surprising its count of `edge` verdicts is, as the
 * binomial upper tail P(X >= beat | judged, 5%).
 *
 * Settings of one indicator overlap (neighbouring periods, thresholds), so the
 * tail is optimistic; `beats-luck` needs p < 0.01 for that reason.
 */

export const LUCK_RATE = 0.05
export const BEATS_LUCK_P = 0.01

/**
 * `beats-luck`: p < BEATS_LUCK_P. Everything else is `luck`, including one
 * `edge` in 18 settings: that is what chance produces (expected 0.9).
 */
export type EdgeTier = 'beats-luck' | 'luck'

export interface EdgeRankingItem {
  slug: string
  /** Settings with a verdict other than `few`. */
  judged: number
  /** Pooled verdict `edge`: above the luck band and not fragile. */
  beat: number
  fragile: number
  worse: number
  /** Settings with too few independent moves to judge. */
  few: number
  /** judged × 5%, what luck alone would put above the band. */
  expected: number
  /** P(X >= beat) for X ~ Binomial(judged, 5%). */
  p: number
  tier: EdgeTier
  updatedAt: string
}

/** P(X >= k) for X ~ Binomial(n, q). */
export function binomialUpperTail(k: number, n: number, q: number): number {
  if (k <= 0) return 1
  if (k > n) return 0
  // Sum the tail itself, not 1 − the rest: tiny tails would round to 1e-16.
  let term = Math.pow(1 - q, n) // P(X = 0)
  for (let i = 0; i < k; i++) term *= ((n - i) / (i + 1)) * (q / (1 - q))
  let tail = 0
  for (let i = k; i <= n; i++) {
    tail += term
    term *= ((n - i) / (i + 1)) * (q / (1 - q))
  }
  return Math.min(1, tail)
}

/** The ranking row for one page, or null when it has no usable edge data. */
export function toEdgeRankingItem(
  doc: ParsedIndicator,
): EdgeRankingItem | null {
  const edge = doc.edge as any
  if (
    !edge ||
    !Array.isArray(edge.settings) ||
    typeof edge.updatedAt !== 'string'
  ) {
    return null
  }
  const verdicts: string[] = edge.settings.map((s: any) => s?.pooled?.verdict)
  const count = (v: string) => verdicts.filter((x) => x === v).length
  const few = count('few')
  const judged = verdicts.length - few
  if (judged === 0) return null

  const beat = count('edge')
  const expected = judged * LUCK_RATE
  const p = binomialUpperTail(beat, judged, LUCK_RATE)
  const tier: EdgeTier = p < BEATS_LUCK_P ? 'beats-luck' : 'luck'

  return {
    slug: doc.metadata.slug,
    judged,
    beat,
    fragile: count('fragile'),
    worse: count('worse') + count('fragile-worse'),
    few,
    expected: Number(expected.toFixed(2)),
    // Significant figures, not decimals: the strongest tails are ~1e-7.
    p: Number(p.toPrecision(3)),
    tier,
    updatedAt: edge.updatedAt,
  }
}

/** Most surprising first; ties by more settings beating random, then slug. */
export function rankByEdge(docs: ParsedIndicator[]): EdgeRankingItem[] {
  return docs
    .map(toEdgeRankingItem)
    .filter((i): i is EdgeRankingItem => i !== null)
    .sort(
      (a, b) => a.p - b.p || b.beat - a.beat || a.slug.localeCompare(b.slug),
    )
}
