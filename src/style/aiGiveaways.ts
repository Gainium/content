import matter from 'gray-matter'
import { normalizeFrontmatter } from '../contentParser'

/**
 * Style lint for article prose (docs/STYLE.md). Two levels:
 *
 *   banned  phrases that mark text as machine-written filler. They fail the
 *           check where the scope says `error`.
 *   soft    patterns that are fine once and bad as a habit. Always warnings.
 *
 * Code (fenced and inline), URLs and HTML comments are not prose and are
 * never checked. Frontmatter prose (description, tldr, faq) is.
 */

export type StyleSeverity = 'banned' | 'soft'

export interface StyleRule {
  id: string
  pattern: RegExp
  /** What to do instead; printed with every hit. */
  advice: string
}

export interface StyleHit {
  rule: string
  severity: StyleSeverity
  /** 1-based line in the file; undefined for frontmatter fields. */
  line?: number
  /** `body` or `frontmatter.<field>`. */
  where: string
  match: string
  advice: string
}

export interface StyleReport {
  hits: StyleHit[]
  words: number
  emDashes: number
}

const w = (source: string) => new RegExp(source, 'gi')

/** Fail. Each one is a phrase an editor would cut on sight. */
export const BANNED_PHRASES: readonly StyleRule[] = [
  // Stock openers
  {
    id: 'opener-world-of',
    pattern: w(
      String.raw`\bin (?:the|today's|this) (?:rapidly[- ]changing|ever[- ]evolving|ever[- ]changing|fast[- ]paced|dynamic|volatile|exciting|modern) (?:world|landscape|realm|space) of\b`,
    ),
    advice: 'Start with what the indicator is.',
  },
  {
    id: 'opener-world-of-trading',
    pattern: w(
      String.raw`\bin the (?:[\w-]+ ){0,2}world of (?:crypto|cryptocurrenc(?:y|ies)|trading|finance|investing|technical analysis)\b`,
    ),
    advice: 'Start with what the indicator is.',
  },
  {
    id: 'opener-today',
    pattern: w(
      String.raw`\bin today's (?:fast[- ]paced|digital|modern|volatile|dynamic|ever[- ]\w+)\b`,
    ),
    advice: 'Start with what the indicator is.',
  },
  {
    id: 'opener-this-article',
    pattern: w(
      String.raw`\b(?:in this (?:article|guide|post|tutorial),? (?:we|you)(?:'ll| will| are going to)?|this (?:article|guide|post) (?:will|explores|covers|walks you through))\b`,
    ),
    advice: 'Cut the announcement; say the thing.',
  },
  // Stock verbs and nouns
  {
    id: 'delve',
    pattern: w(String.raw`\bdelv(?:e|es|ed|ing)\b`),
    advice: 'Say "look at", or just explain it.',
  },
  {
    id: 'navigate-figurative',
    pattern: w(
      String.raw`\bnavigat(?:e|es|ed|ing) (?:the |these |its |their |your )?(?:landscape|complexit(?:y|ies)|intricacies|waters|maze|challenges|ups and downs|uncertaint(?:y|ies)|world|markets?)\b`,
    ),
    advice: 'Name the actual problem (a range, a fakeout, a gap).',
  },
  {
    id: 'unlock-potential',
    pattern: w(
      String.raw`\b(?:unlock|unleash|realize)(?:s|ed|ing)? (?:the |its |your |their )?(?:full )?potential\b`,
    ),
    advice: 'Say what the reader can do, with a number.',
  },
  {
    id: 'unleash',
    pattern: w(String.raw`\bunleash(?:es|ed|ing)?\b`),
    advice: 'Use a plain verb.',
  },
  {
    id: 'game-changer',
    pattern: w(String.raw`\bgame[- ]chang(?:er|ers|ing)\b`),
    advice: 'Show the difference instead.',
  },
  {
    id: 'robust',
    pattern: w(String.raw`\brobust(?:ly|ness)?\b`),
    advice: 'Say what it survives (e.g. "held up in the 2022 bear market").',
  },
  {
    id: 'seamless',
    pattern: w(String.raw`\bseamless(?:ly)?\b`),
    advice: 'Cut it, or name the steps it saves.',
  },
  {
    id: 'leverage-verb',
    pattern: w(
      String.raw`\b(?:leverag(?:e|es|ing) (?:the|this|that|these|those|its|their|your|our|his|her|a|an|it|them|both|all|such|every|each|gainium|tradingview)|by leveraging)\b`,
    ),
    advice: 'Say "use". (Leverage as the futures noun is fine.)',
  },
  {
    id: 'harness',
    pattern: w(String.raw`\bharness(?:es|ed|ing)?\b`),
    advice: 'Say "use".',
  },
  {
    id: 'elevate',
    pattern: w(String.raw`\belevat(?:e|es|ed|ing)\b`),
    advice: 'Say what improves, and by how much.',
  },
  {
    id: 'embark',
    pattern: w(String.raw`\bembark(?:s|ed|ing)?\b`),
    advice: 'Say "start".',
  },
  {
    id: 'testament',
    pattern: w(String.raw`\btestament to\b`),
    advice: 'Give the evidence instead.',
  },
  {
    id: 'tapestry',
    pattern: w(String.raw`\btapestr(?:y|ies)\b`),
    advice: 'Cut it.',
  },
  {
    id: 'realm',
    pattern: w(String.raw`\brealms?\b`),
    advice: 'Cut it, or name the market.',
  },
  {
    id: 'ever-evolving',
    pattern: w(String.raw`\bever[- ](?:evolving|changing)\b`),
    advice: 'Cut it.',
  },
  {
    id: 'cutting-edge',
    pattern: w(String.raw`\b(?:cutting[- ]edge|state[- ]of[- ]the[- ]art)\b`),
    advice: 'Say what is new about it.',
  },
  {
    id: 'revolutionize',
    pattern: w(String.raw`\brevolutioni[sz](?:e|es|ed|ing)\b`),
    advice: 'Show the difference instead.',
  },
  {
    id: 'supercharge',
    pattern: w(String.raw`\bsupercharg(?:e|es|ed|ing)\b`),
    advice: 'Say what improves, and by how much.',
  },
  {
    id: 'empower',
    pattern: w(String.raw`\bempower(?:s|ed|ing)?\b`),
    advice: 'Say "lets you".',
  },
  {
    id: 'invaluable',
    pattern: w(String.raw`\b(?:invaluable|indispensable|unparalleled)\b`),
    advice: 'Show what it does instead.',
  },
  {
    id: 'myriad',
    pattern: w(String.raw`\b(?:a )?(?:myriad|plethora) of\b`),
    advice: 'Give the number.',
  },
  {
    id: 'treasure-trove',
    pattern: w(String.raw`\btreasure trove\b`),
    advice: 'Cut it.',
  },
  {
    id: 'look-no-further',
    pattern: w(String.raw`\blook no further\b`),
    advice: 'Cut it.',
  },
  {
    id: 'next-level',
    pattern: w(String.raw`\b(?:to the next level|next-level)\b`),
    advice: 'Say what improves, and by how much.',
  },
  {
    id: 'maximize-profits',
    pattern: w(
      String.raw`\bmaximi[sz](?:e|es|ing) (?:your )?(?:profits?|returns|gains)\b`,
    ),
    advice: 'No promises. Say what the setup does and when it fails.',
  },
  // Filler and closers
  {
    id: 'important-to-note',
    pattern: w(
      String.raw`\bit(?:'s| is) (?:important|crucial|essential|vital) to (?:note|remember|understand|keep in mind)\b`,
    ),
    advice: 'Cut the lead-in; state the fact.',
  },
  {
    id: 'worth-noting',
    pattern: w(
      String.raw`\b(?:it(?:'s| is) )?worth (?:noting|mentioning|highlighting)\b`,
    ),
    advice: 'Cut the lead-in; state the fact.',
  },
  {
    id: 'in-conclusion',
    pattern: w(
      String.raw`\b(?:in conclusion|in summary|to sum up|to summari[sz]e|in essence)\b`,
    ),
    advice: 'Stop when you are done. No recap.',
  },
  {
    id: 'conclusion-heading',
    pattern:
      /^#{1,6}\s+(?:conclusion|final thoughts|summary|wrapping up|key takeaways)\b.*$/gim,
    advice: 'No closing summary section. End on the last useful fact.',
  },
  {
    id: 'beginner-or-seasoned',
    pattern: w(
      String.raw`\bwhether you(?:'re| are) (?:a |an )?(?:complete )?(?:beginner|novice|newcomer|new trader|seasoned|experienced|veteran)\b`,
    ),
    advice: 'Write for one reader: a trader setting up a bot.',
  },
  {
    id: 'dive-in',
    pattern: w(
      String.raw`\b(?:let's (?:dive|delve|explore|take a (?:closer )?look|break (?:it|this) down)|dive (?:deep(?:er)? )?into|deep[- ]dive)\b`,
    ),
    advice: 'Cut it; start the section with its first fact.',
  },
  {
    id: 'key-role',
    pattern: w(
      String.raw`\b(?:plays? an? (?:key|vital|crucial|pivotal|significant|important|central) role|(?:crucial|pivotal|vital) role)\b`,
    ),
    advice: 'Say what it does.',
  },
  {
    id: 'powerful-tool',
    pattern: w(
      String.raw`\b(?:an? )?(?:powerful|versatile|valuable|essential|invaluable|excellent) tool\b`,
    ),
    advice: 'Say what it measures.',
  },
  {
    id: 'goes-without-saying',
    pattern: w(
      String.raw`\b(?:it goes without saying|needless to say|rest assured)\b`,
    ),
    advice: 'Then do not say it.',
  },
  {
    id: 'not-foolproof',
    pattern: w(
      String.raw`\b(?:no|not an?) (?:single )?(?:indicator|strategy|tool|system|method) is (?:foolproof|perfect|infallible|100% accurate)\b`,
    ),
    advice:
      'Write the "When it fails" line instead: the market condition that breaks this setup.',
  },
  {
    id: 'as-with-any',
    pattern: w(
      String.raw`\bas with (?:any|all) (?:other )?(?:trading )?(?:strategy|strategies|indicator|indicators|tool|tools)\b`,
    ),
    advice: 'Say the risk that is specific to this indicator.',
  },
  {
    id: 'happy-trading',
    pattern: w(String.raw`\bhappy trading\b`),
    advice: 'Cut it.',
  },
  {
    id: 'valuable-insights',
    pattern: w(String.raw`\b(?:valuable|deeper|actionable) insights?\b`),
    advice: 'Name the insight.',
  },
  {
    id: 'informed-decisions',
    pattern: w(
      String.raw`\bmake (?:more )?(?:well-)?informed (?:trading )?decisions\b`,
    ),
    advice: 'Say which decision and what decides it.',
  },
  {
    id: 'gain-an-edge',
    pattern: w(String.raw`\b(?:gain|get|give you) an? (?:competitive )?edge\b`),
    advice: 'Say what the edge is, in numbers.',
  },
]

/** Warn. Fine once; a habit is a giveaway. */
export const SOFT_PATTERNS: readonly StyleRule[] = [
  {
    id: 'stock-transition',
    pattern:
      /(?:^|[.!?:]\s+|^\s*(?:[-*+]|\d+\.|>)\s+)(Additionally|Moreover|Furthermore|In addition|Notably|Ultimately|Overall|Importantly|Remember),/gm,
    advice: 'Drop the connector; the next sentence follows anyway.',
  },
  {
    id: 'when-it-comes-to',
    pattern: w(String.raw`\bwhen it comes to\b`),
    advice: 'Name the subject directly.',
  },
  {
    id: 'not-only-but-also',
    pattern: w(String.raw`\bnot only\b[^.]{1,80}\bbut also\b`),
    advice: 'Two plain sentences.',
  },
  {
    id: 'wide-range',
    pattern: w(
      String.raw`\ba (?:wide|broad|vast) (?:range|array|variety) of\b`,
    ),
    advice: 'Give the number or the list.',
  },
  {
    id: 'landscape',
    pattern: w(String.raw`\b(?:trading|crypto|market|financial) landscape\b`),
    advice: 'Name the market.',
  },
  {
    id: 'powerful',
    pattern: w(String.raw`\bpowerful\b`),
    advice: 'Show it; do not grade it.',
  },
  {
    id: 'crucial',
    pattern: w(String.raw`\b(?:crucial|vital|paramount)\b`),
    advice: 'Say why it matters, or cut it.',
  },
  {
    id: 'comprehensive',
    pattern: w(String.raw`\b(?:comprehensive|ultimate) guide\b`),
    advice: 'Cut it.',
  },
  {
    id: 'generic-backtest-advice',
    pattern: w(
      String.raw`\b(?:always|be sure to|make sure to|remember to) backtest\b`,
    ),
    advice:
      'Say what to backtest (which setting, over which period) or cut it.',
  },
  {
    id: 'journey',
    pattern: w(String.raw`\b(?:trading )?journey\b`),
    advice: 'Cut it.',
  },
  {
    id: 'exclamation',
    pattern: /(?<![!\\[])!(?![[=])/g,
    advice: 'No exclamation marks in reference text.',
  },
]

/** Em dashes per 1,000 words above which the page gets a warning. */
export const EM_DASH_PER_1000_LIMIT = 6

const EM_DASH = /—|\s–\s|\s--\s/g

/**
 * Prose lines of a markdown body, with code, URLs and comments blanked so
 * line numbers stay true.
 */
export function proseLines(body: string): string[] {
  const out: string[] = []
  let fence: string | null = null
  let inComment = false
  for (const raw of body.split('\n')) {
    let line = raw
    const fenceMatch = /^\s*(```|~~~)/.exec(line)
    if (fence) {
      if (fenceMatch && fenceMatch[1] === fence) fence = null
      out.push('')
      continue
    }
    if (fenceMatch) {
      fence = fenceMatch[1]
      out.push('')
      continue
    }
    if (inComment) {
      const end = line.indexOf('-->')
      if (end === -1) {
        out.push('')
        continue
      }
      inComment = false
      line = line.slice(end + 3)
    }
    line = line.replace(/<!--[\s\S]*?-->/g, ' ')
    const open = line.indexOf('<!--')
    if (open !== -1) {
      inComment = true
      line = line.slice(0, open)
    }
    line = line
      .replace(/`[^`]*`/g, ' ')
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, ' $1 ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\bhttps?:\/\/\S+/g, ' ')
    out.push(line)
  }
  return out
}

const normalizeQuotes = (text: string) => text.replace(/[‘’ʼ]/g, "'")

const countWords = (text: string) =>
  (text.match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) ?? []).length

function scan(
  text: string,
  where: string,
  line: number | undefined,
  hits: StyleHit[],
  extraBanned: readonly StyleRule[] = [],
) {
  const normalized = normalizeQuotes(text)
  for (const [severity, rules] of [
    ['banned', [...BANNED_PHRASES, ...extraBanned]],
    ['soft', SOFT_PATTERNS],
  ] as const) {
    for (const rule of rules) {
      rule.pattern.lastIndex = 0
      for (const m of normalized.matchAll(rule.pattern)) {
        hits.push({
          rule: rule.id,
          severity,
          line,
          where,
          match: m[0].trim(),
          advice: rule.advice,
        })
      }
    }
  }
  // Two or more dashes inside one sentence: a chain of asides. Table rows
  // are cells, not sentences.
  if (/^\s*\|/.test(normalized)) return
  for (const sentence of normalized.split(/(?<=[.!?])\s+/)) {
    const dashes = sentence.match(EM_DASH)?.length ?? 0
    if (dashes >= 2) {
      hits.push({
        rule: 'em-dash-chain',
        severity: 'soft',
        line,
        where,
        match: sentence.trim().slice(0, 80),
        advice: 'One aside per sentence at most; split it or use a comma.',
      })
    }
  }
}

export interface LintOptions {
  /**
   * Frontmatter fields not to check, e.g. `description` on a page moved
   * from /help, which is frozen (src/indicators/movedPageMeta.json).
   */
  skipFields?: string[]
  /**
   * Banned rules on top of BANNED_PHRASES, for a path that has its own
   * (src/style/timePeriods.ts `extraBannedFor`, e.g. time periods in
   * docs/indicators).
   */
  extraBanned?: readonly StyleRule[]
}

/** Lint one markdown file (frontmatter + body). */
export function lintMarkdown(
  rawContent: string,
  options: LintOptions = {},
): StyleReport {
  const { content: normalized } = normalizeFrontmatter(rawContent)
  const hits: StyleHit[] = []
  let words = 0
  let emDashes = 0

  let data: Record<string, unknown> = {}
  let body = normalized
  let bodyOffset = 0
  const fm = /^---\n[\s\S]*?\n---\n?/.exec(normalized)
  if (fm) {
    data = matter(normalized).data as Record<string, unknown>
    body = normalized.slice(fm[0].length)
    bodyOffset = fm[0].split('\n').length - 1
  }

  const fields: Array<[string, unknown]> = [
    ['description', data.description],
    ['tldr', data.tldr],
    ['excerpt', data.excerpt],
  ]
  if (Array.isArray(data.faq)) {
    data.faq.forEach((item: any, i: number) => {
      fields.push([`faq[${i}].title`, item?.title])
      fields.push([`faq[${i}].details`, item?.details])
    })
  }
  for (const [field, value] of fields) {
    if (typeof value !== 'string') continue
    if (options.skipFields?.includes(field)) continue
    scan(value, `frontmatter.${field}`, undefined, hits, options.extraBanned)
  }

  proseLines(body).forEach((line, i) => {
    if (!line.trim()) return
    words += countWords(line)
    emDashes += line.match(EM_DASH)?.length ?? 0
    scan(line, 'body', bodyOffset + i + 1, hits, options.extraBanned)
  })

  if (words > 0 && (emDashes * 1000) / words > EM_DASH_PER_1000_LIMIT) {
    hits.push({
      rule: 'em-dash-density',
      severity: 'soft',
      where: 'body',
      match: `${emDashes} em dashes in ${words} words`,
      advice: `At most ${EM_DASH_PER_1000_LIMIT} per 1,000 words; use full stops and commas.`,
    })
  }

  return { hits, words, emDashes }
}
