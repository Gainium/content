import { describe, it } from 'mocha'
import { expect } from 'chai'
import {
  binomialUpperTail,
  rankByEdge,
  toEdgeRankingItem,
} from '../src/indicators/edgeRanking'
import type { ParsedIndicator } from '../src/types'

const doc = (slug: string, verdicts: string[] | null): ParsedIndicator =>
  ({
    metadata: { slug },
    content: '',
    rawContent: '',
    ...(verdicts
      ? {
          edge: {
            updatedAt: '2026-10-25',
            settings: verdicts.map((verdict) => ({ pooled: { verdict } })),
          },
        }
      : {}),
  }) as unknown as ParsedIndicator

const times = (n: number, v: string) => Array.from({ length: n }, () => v)

describe('edge ranking (spec 061 §3)', () => {
  it('binomial upper tail', () => {
    expect(binomialUpperTail(0, 18, 0.05)).to.equal(1)
    expect(binomialUpperTail(19, 18, 0.05)).to.equal(0)
    // P(X >= 1) = 1 - 0.95^18
    expect(binomialUpperTail(1, 18, 0.05)).to.be.closeTo(1 - 0.95 ** 18, 1e-12)
    expect(binomialUpperTail(18, 18, 0.05)).to.be.closeTo(0.05 ** 18, 1e-30)
  })

  it('one edge in 18 settings is luck, not a ranking win', () => {
    const item = toEdgeRankingItem(
      doc('a', [...times(1, 'edge'), ...times(17, 'none')]),
    )!
    expect(item.tier).to.equal('luck')
    expect(item.p).to.be.greaterThan(0.5)
  })

  it('8 of 18 beats luck', () => {
    const item = toEdgeRankingItem(
      doc('a', [...times(8, 'edge'), ...times(10, 'none')]),
    )!
    expect(item.tier).to.equal('beats-luck')
    expect(item.expected).to.equal(0.9)
    expect(item.p).to.be.greaterThan(0).and.lessThan(1e-5)
  })

  it('few is not judged; worse counts both worse verdicts', () => {
    const item = toEdgeRankingItem(
      doc('a', ['few', 'few', 'worse', 'fragile-worse', 'none']),
    )!
    expect(item).to.include({
      judged: 3,
      few: 2,
      worse: 2,
      beat: 0,
      tier: 'luck',
    })
  })

  it('drops pages without data or with nothing judged', () => {
    expect(toEdgeRankingItem(doc('a', null))).to.equal(null)
    expect(toEdgeRankingItem(doc('a', ['few']))).to.equal(null)
  })

  it('orders by p, then settings beating random, then slug', () => {
    const ranked = rankByEdge([
      doc('luck-b', times(10, 'none')),
      doc('strong', [...times(6, 'edge'), ...times(12, 'none')]),
      doc('luck-a', times(10, 'none')),
      doc('untested', null),
      doc('one', ['edge', ...times(17, 'none')]),
    ])
    expect(ranked.map((r) => r.slug)).to.deep.equal([
      'strong',
      'one',
      'luck-a',
      'luck-b',
    ])
  })
})
