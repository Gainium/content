import { describe, it } from 'mocha'
import { expect } from 'chai'
import { validateIndicatorFrontmatter } from '../src/indicators/validateIndicator'
import { parseHelpDocSource, parseIndicatorSource } from '../src/contentParser'
import {
  CATALOG_GAP_ALLOWLIST,
  checkIndicatorPages,
  parseCatalog,
} from '../src/indicators/catalogCheck'

const base = {
  name: 'Example',
  slug: 'example',
  description: 'Example description',
  tldr: 'Example tldr',
  aliases: ['EX'],
  category: 'momentum',
}
const native = { ...base, kind: 'native', catalogKeys: ['RSI'] }
const builtin = {
  ...base,
  kind: 'builtin',
  alerts: 'alertcondition',
  repaints: 'no',
  sources: ['https://example.com'],
}
const community = {
  ...builtin,
  kind: 'community',
  alerts: 'alert()',
  author: 'someone',
  scriptUrl: 'https://example.com/script',
  openSource: true,
  license: 'MPL-2.0',
}

describe('indicator frontmatter validity (spec 053 §2.1, I-6)', () => {
  it('accepts a valid page of each kind', () => {
    expect(validateIndicatorFrontmatter(native)).to.deep.equal([])
    expect(validateIndicatorFrontmatter(builtin)).to.deep.equal([])
    expect(validateIndicatorFrontmatter(community)).to.deep.equal([])
  })

  it('fails builtin and community pages with alerts: none', () => {
    for (const page of [builtin, community]) {
      const errors = validateIndicatorFrontmatter({ ...page, alerts: 'none' })
      expect(errors.join()).to.include('alerts: none')
    }
  })

  it('fails builtin and community pages without alerts or repaints', () => {
    const { alerts: _a, repaints: _r, ...rest } = builtin
    const errors = validateIndicatorFrontmatter(rest)
    expect(errors.join()).to.include('"alerts"')
    expect(errors.join()).to.include('"repaints"')
  })

  it('fails a community page missing author or scriptUrl', () => {
    const { author: _a, ...noAuthor } = community
    expect(validateIndicatorFrontmatter(noAuthor).join()).to.include('"author"')
    const { scriptUrl: _s, ...noUrl } = community
    expect(validateIndicatorFrontmatter(noUrl).join()).to.include('"scriptUrl"')
  })

  it('fails a native page without catalogKeys', () => {
    const { catalogKeys: _c, ...rest } = native
    expect(validateIndicatorFrontmatter(rest).join()).to.include('catalogKeys')
  })

  it('fails an unknown kind or category, and reserved slugs', () => {
    expect(
      validateIndicatorFrontmatter({ ...native, kind: 'other' }).join(),
    ).to.include('"kind"')
    expect(
      validateIndicatorFrontmatter({ ...native, category: 'misc' }).join(),
    ).to.include('"category"')
    expect(
      validateIndicatorFrontmatter({ ...native, slug: 'manifest' }).join(),
    ).to.include('reserved')
  })
})

const ENUM_SOURCE = `
export enum IndicatorEnum {
  rsi = 'RSI',
  stochRSI = 'StochRSI',
  dc = 'DC',
  bbwp = 'BBWP',
  wip = 'WIP',
}
`
const CATALOG_SOURCE = `
export const INDICATOR_DOCUMENTATION_URLS = {
  [IndicatorEnum.rsi]: '/help/rsi',
  [IndicatorEnum.stochRSI]: '/indicators/stochrsi',
} satisfies Partial<Record<IndicatorEnum, string>>;

const BASE_INDICATOR_CATALOG: Record<IndicatorEnum, IndicatorDefinition> = {
  [IndicatorEnum.rsi]: {
    type: IndicatorEnum.rsi,
    fields: [{ key: 'x', options: { pendingPort: true } }],
  },
  [IndicatorEnum.stochRSI]: {
    type: IndicatorEnum.stochRSI,
  },
  [IndicatorEnum.dc]: {
    type: IndicatorEnum.dc,
  },
  [IndicatorEnum.bbwp]: {
    type: IndicatorEnum.bbwp,
  },
  [IndicatorEnum.wip]: {
    type: IndicatorEnum.wip,
    pendingPort: true,
  },
};
`

const page = (slug: string, data: Record<string, unknown>) => ({
  file: `docs/indicators/${slug}.md`,
  data: { ...native, slug, ...data },
})
const okPages = [
  page('rsi', { catalogKeys: ['RSI'] }),
  page('stochrsi', { catalogKeys: ['StochRSI'] }),
]
const check = (pages: ReturnType<typeof page>[], allowlist?: string[]) =>
  checkIndicatorPages(pages, parseCatalog(CATALOG_SOURCE, ENUM_SOURCE), {
    requireMovedSlugs: false,
    allowlist,
  }).errors

describe('catalog consistency (spec 053 §2.2, I-2)', () => {
  it('parses enum values, entries, pendingPort and documentation slugs', () => {
    const parsed = parseCatalog(CATALOG_SOURCE, ENUM_SOURCE)
    expect([...parsed.entries.keys()]).to.deep.equal([
      'RSI',
      'StochRSI',
      'DC',
      'BBWP',
      'WIP',
    ])
    // A nested `pendingPort` in a field is not the entry's flag.
    expect(parsed.entries.get('RSI')?.pendingPort).to.equal(false)
    expect(parsed.entries.get('WIP')?.pendingPort).to.equal(true)
    expect(parsed.documentationSlugs.get('StochRSI')).to.equal('stochrsi')
  })

  it('fails loudly when the catalog structure is not recognised', () => {
    expect(() => parseCatalog('const nothing = {}', ENUM_SOURCE)).to.throw()
  })

  it('passes when pages and catalog agree', () => {
    expect(check(okPages)).to.deep.equal([])
  })

  it('fails a native catalogKey missing from the catalog', () => {
    const errors = check([
      ...okPages,
      page('ghost', { catalogKeys: ['GHOST'] }),
    ])
    expect(errors.join()).to.include('"GHOST" is not in INDICATOR_CATALOG')
  })

  it('hints the enum value when a page uses the enum key', () => {
    const errors = check([
      page('rsi', { catalogKeys: ['RSI'] }),
      page('stochrsi', { catalogKeys: ['stochRSI'] }),
    ])
    expect(errors.join()).to.include('use the IndicatorEnum value "StochRSI"')
  })

  it('fails a native catalogKey that is pendingPort', () => {
    const errors = check([...okPages, page('wip', { catalogKeys: ['WIP'] })])
    expect(errors.join()).to.include('pendingPort')
  })

  it('fails a selectable catalog entry with no native page', () => {
    const errors = check([okPages[0]])
    expect(errors.join()).to.include('IndicatorEnum.stochRSI')
  })

  it('does not count a non-native page as covering a catalog entry', () => {
    const errors = check([
      okPages[0],
      page('stochrsi', { ...builtin, slug: 'stochrsi' }),
    ])
    expect(errors.join()).to.include('IndicatorEnum.stochRSI')
  })

  it('fails an allowlisted entry that now has a page (shrink-only)', () => {
    const errors = check([
      ...okPages,
      page('donchian', { catalogKeys: ['DC'] }),
    ])
    expect(errors.join()).to.include('remove it from CATALOG_GAP_ALLOWLIST')
  })

  it('fails when a documentation URL points at a page that does not document it', () => {
    const errors = check([
      page('rsi', { catalogKeys: ['RSI'] }),
      page('stochrsi', { catalogKeys: ['StochRSI'] }),
      page('other', { catalogKeys: [] }),
    ])
    expect(errors).to.have.length.greaterThan(0)
    const misLinked = check([
      page('rsi', { catalogKeys: ['StochRSI'] }),
      page('stochrsi', { catalogKeys: ['RSI'] }),
    ])
    expect(misLinked.join()).to.include('INDICATOR_DOCUMENTATION_URLS links')
  })

  it('the gap allowlist only ever shrinks', () => {
    for (const key of CATALOG_GAP_ALLOWLIST) {
      expect(['dc', 'bbwp']).to.include(key)
    }
  })

  it('skips the reverse, link and moved-slug checks when there are no pages', () => {
    const result = checkIndicatorPages(
      [],
      parseCatalog(CATALOG_SOURCE, ENUM_SOURCE),
    )
    expect(result.errors).to.deep.equal([])
    expect(result.notices.join()).to.include('absent or empty')
  })

  it('still validates and checks catalogKeys when pages exist without moved slugs', () => {
    const result = checkIndicatorPages(
      [page('ghost', { catalogKeys: ['GHOST'] })],
      parseCatalog(CATALOG_SOURCE, ENUM_SOURCE),
    )
    expect(result.errors.join()).to.include(
      '"GHOST" is not in INDICATOR_CATALOG',
    )
    expect(result.errors.join()).to.include('moved from /help')
  })
})

describe('catalog parser hardening', () => {
  const enumOf = (...members: string[]) =>
    `export enum IndicatorEnum {\n${members.map((m) => `  ${m} = '${m.toUpperCase()}',`).join('\n')}\n}\n`
  const catalogOf = (body: string, extra = '') =>
    `${extra}const BASE_INDICATOR_CATALOG: Record<IndicatorEnum, IndicatorDefinition> = {\n${body}\n};\n`

  it('fails when the parsed entry count differs from the enum', () => {
    expect(() =>
      parseCatalog(
        catalogOf('  [IndicatorEnum.a]: {\n    type: 1,\n  },'),
        enumOf('a', 'b'),
      ),
    ).to.throw(/parsed 1 entries but IndicatorEnum has 2/)
  })

  it('resolves `[IndicatorEnum.x]: SOME_DEF` to its object literal', () => {
    const parsed = parseCatalog(
      catalogOf(
        '  [IndicatorEnum.a]: A_DEF,\n  [IndicatorEnum.b]: {\n    type: 2,\n  },',
        'const A_DEF: IndicatorDefinition = {\n  type: 1,\n  pendingPort: true,\n}\n',
      ),
      enumOf('a', 'b'),
    )
    expect(parsed.entries.get('A')?.pendingPort).to.equal(true)
    expect(parsed.entries.get('B')?.pendingPort).to.equal(false)
  })

  it('fails on an unresolvable reference', () => {
    expect(() =>
      parseCatalog(catalogOf('  [IndicatorEnum.a]: MISSING,'), enumOf('a')),
    ).to.throw(/MISSING/)
  })

  it('fails on a call or other unsupported entry form', () => {
    expect(() =>
      parseCatalog(
        catalogOf('  [IndicatorEnum.a]: makeDef({ type: 1 }),'),
        enumOf('a'),
      ),
    ).to.throw(/unsupported form/)
    expect(() =>
      parseCatalog(catalogOf('  ...OTHER_CATALOG,'), enumOf('a')),
    ).to.throw(/unsupported top-level form/)
  })

  it('fails on `pendingPort: <expr>` and shorthand', () => {
    expect(() =>
      parseCatalog(
        catalogOf('  [IndicatorEnum.a]: {\n    pendingPort: !READY,\n  },'),
        enumOf('a'),
      ),
    ).to.throw(/non-literal/)
    expect(() =>
      parseCatalog(
        catalogOf('  [IndicatorEnum.a]: {\n    pendingPort,\n  },'),
        enumOf('a'),
      ),
    ).to.throw(/non-literal/)
  })

  it('accepts `pendingPort: false` and fails on a spread inside an entry', () => {
    expect(
      parseCatalog(
        catalogOf('  [IndicatorEnum.a]: {\n    pendingPort: false,\n  },'),
        enumOf('a'),
      ).entries.get('A')?.pendingPort,
    ).to.equal(false)
    expect(() =>
      parseCatalog(
        catalogOf('  [IndicatorEnum.a]: {\n    ...BASE,\n  },'),
        enumOf('a'),
      ),
    ).to.throw(/spreads/)
  })
})

describe('shared content parser (server and CI)', () => {
  it('normalises tab-indented frontmatter for indicator pages', () => {
    const tabbed =
      '---\nname: Tabbed\nslug: tabbed\ndescription: d\ntldr: t\nkind: native\ncatalogKeys:\n\t- ADX\ncategory: trend\naliases:\n\t- "TB"\n---\n\nBody.\n'
    const result = parseIndicatorSource(tabbed)
    expect(result.errors).to.deep.equal([])
    expect(result.doc?.metadata.catalogKeys).to.deep.equal(['ADX'])
    expect(result.warnings.join()).to.include('tab-indented')
  })

  it('rejects a help doc that declares kind', () => {
    const helpDoc =
      "---\nid: 1\nname: n\nslug: s\ndescription: d\ncreatedAt: '2026'\nupdatedAt: '2026'\npublishedAt: '2026'\nlocale: en\ncategories:\n  - c\nkind: builtin\n---\n\nBody.\n"
    const result = parseHelpDocSource(helpDoc)
    expect(result.doc).to.equal(undefined)
    expect(result.errors.join()).to.include('"kind"')
    const native = parseHelpDocSource(helpDoc.replace('kind: builtin\n', ''))
    expect(native.doc?.metadata.slug).to.equal('s')
  })
})
