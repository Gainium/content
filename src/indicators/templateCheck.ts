import movedPageMeta from './movedPageMeta.json'
import {
  checkSettingsTable,
  normCell,
  validateSettingsJson,
  type IndicatorSettings,
} from './settingsTable'

/**
 * Indicator article template v2 (spec 053 §2.1, docs/STYLE.md).
 *
 * A page opts in with `templateVersion: 2` in its frontmatter; pages without
 * it are only checked as before, so the migration can go page by page.
 * The check runs in CI (scripts/check-indicators.ts), not in the server:
 * a template slip fails the build, it never takes a page offline.
 *
 * Body of a v2 page:
 *
 *   (opening, no heading: 2–3 sentences)
 *   ## What is <Name>              ≥1 image; optionally, as its LAST `###`,
 *                                  `### Settings and tips`: the settings table
 *                                  (= the page's <slug>.settings.json) and
 *                                  2–4 `**Tip:**` lines; at most 2 `__tip-`
 *                                  comparison images, only there
 *   ## Trading setups for bots     2–4 `###` setups; each has Entry, Exit,
 *                                  Settings, Timeframe and When it fails
 *                                  labels, and ≥1 image
 *   ## Using <Name> in Gainium     ≥1 image; builtin/community also a JSON
 *                                  webhook payload
 *   ## Related indicators          ≥2 list items, each linking an existing
 *                                  https://gainium.io/indicators/<slug>
 *
 * The FAQ is frontmatter only (`faq`: 3–5 `{title, details}`), the same as
 * /help articles: the site renders it with its FAQ component and FAQPage
 * schema. A `## FAQ` in the body would print the questions as plain headings.
 */

export const TEMPLATE_VERSION = 2

export interface TemplatePageInput {
  file: string
  data: Record<string, unknown>
  /** Markdown body (frontmatter removed). */
  body: string
  /**
   * The page's describe JSON (`docs/indicators/<slug>.settings.json`), parsed;
   * undefined when there is none. Only read when the page has
   * `### Settings and tips`.
   */
  settings?: unknown
}

export interface TemplateCheckResult {
  errors: string[]
  warnings: string[]
}

const SECTIONS = [
  { key: 'what', label: '## What is <Name>', test: /^what is\b.+$/i },
  {
    key: 'setups',
    label: '## Trading setups for bots',
    test: /^trading setups for bots$/i,
  },
  {
    key: 'gainium',
    label: '## Using <Name> in Gainium',
    test: /^using .+ in gainium$/i,
  },
  {
    key: 'related',
    label: '## Related indicators',
    test: /^related indicators$/i,
  },
] as const

const SETUP_LABELS: Array<{ name: string; test: RegExp }> = [
  { name: 'Entry', test: /\bentry\b/i },
  { name: 'Exit', test: /\bexit\b/i },
  { name: 'Settings', test: /\bsettings?\b/i },
  { name: 'Timeframe', test: /\btime ?frames?\b/i },
  { name: 'When it fails', test: /\bwhen it fails\b/i },
]

const SITE = 'https://gainium.io'
const IMAGE = /!\[([^\]]*)\]\(\s*([^)\s]+)[^)]*\)|<img\b[^>]*>/gi
const PLACEHOLDER = /<!--\s*screenshot:[\s\S]*?-->/gi

interface Section {
  heading: string
  body: string
}

/** Blank fenced code so headings and images inside it are not read. */
function withoutCode(markdown: string): string {
  let fence: string | null = null
  return markdown
    .split('\n')
    .map((line) => {
      const m = /^\s*(```|~~~)/.exec(line)
      if (fence) {
        if (m && m[1] === fence) fence = null
        return ''
      }
      if (m) {
        fence = m[1]
        return ''
      }
      return line
    })
    .join('\n')
}

function splitSections(markdown: string, level: number) {
  const marker = new RegExp(`^#{${level}}\\s+(.+?)\\s*#*\\s*$`)
  const sections: Section[] = []
  const lead: string[] = []
  let current: Section | null = null
  for (const line of markdown.split('\n')) {
    const m = marker.exec(line)
    if (m) {
      current = { heading: m[1].trim(), body: '' }
      sections.push(current)
    } else if (current) {
      current.body += `${line}\n`
    } else {
      lead.push(line)
    }
  }
  return { lead: lead.join('\n'), sections }
}

const plain = (text: string) =>
  text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

/** Sentences in a paragraph; decimals and common abbreviations do not split. */
export function countSentences(text: string): number {
  const cleaned = plain(text)
    .replace(/\b(?:e\.g|i\.e|etc|vs|approx|Mr|Dr|St|No)\./gi, (m) =>
      m.replace(/\./g, ''),
    )
    .replace(/(\d)\.(\d)/g, '$1$2')
  return cleaned.split(/[.!?]+(?:\s+|$)/).filter((s) => /\w/.test(s)).length
}

interface ImageCount {
  images: number
  placeholders: number
  emptyAlt: number
}

function countImages(markdown: string): ImageCount {
  let images = 0
  let emptyAlt = 0
  for (const m of markdown.matchAll(IMAGE)) {
    images += 1
    const alt = m[0].startsWith('<')
      ? (/\balt\s*=\s*["']([^"']*)["']/i.exec(m[0])?.[1] ?? '')
      : m[1]
    if (!alt.trim()) emptyAlt += 1
  }
  const placeholders = markdown.match(PLACEHOLDER)?.length ?? 0
  return { images, placeholders, emptyAlt }
}

function requireImage(
  where: string,
  markdown: string,
  err: (msg: string) => void,
  warn: (msg: string) => void,
) {
  const { images, placeholders } = countImages(markdown)
  if (images === 0 && placeholders === 0) {
    err(`${where} needs at least one image`)
  } else if (images === 0) {
    warn(
      `${where} has only a screenshot placeholder; fill it before the page is final`,
    )
  }
}

export const MAX_TIP_IMAGES = 2
const TIP_IMAGE = /__tip-([a-z0-9-]+)\.(?:webp|png|jpe?g)$/i
const TIP_LINE = /^\s*(?:[-*]\s+)?\*\*Tip:\*\*\s*(.*)$/

/** Every image in a block of Markdown: its src and alt. */
function imagesIn(markdown: string): Array<{ src: string; alt: string }> {
  return [...markdown.matchAll(IMAGE)].map((m) =>
    m[0].startsWith('<')
      ? {
          src: /\bsrc\s*=\s*["']([^"']*)["']/i.exec(m[0])?.[1] ?? '',
          alt: /\balt\s*=\s*["']([^"']*)["']/i.exec(m[0])?.[1] ?? '',
        }
      : { src: m[2], alt: m[1] },
  )
}

/**
 * `### Settings and tips` (optional, the LAST subsection of "What is"): the
 * settings table must match the page's describe JSON, 2–4 specific tips, and
 * at most two side-by-side comparison images (`<slug>__tip-<setting>`), only
 * there, each alt naming both settings ("… vs …").
 */
function checkSettingsAndTips(
  page: TemplatePageInput,
  whatBody: string,
  body: string,
  err: (msg: string) => void,
) {
  const slug = String(page.data.slug ?? '')
  const { sections: subs } = splitSections(whatBody, 3)
  const idx = subs.findIndex((s) => /^settings and tips$/i.test(s.heading))
  const tipImages = imagesIn(body).filter((i) => TIP_IMAGE.test(i.src))
  if (idx < 0) {
    if (tipImages.length > 0) {
      err(
        '`__tip-` comparison images belong in `### Settings and tips` (the last subsection of "What is")',
      )
    }
    return
  }
  if (idx !== subs.length - 1) {
    err(
      '`### Settings and tips` must be the last `###` subsection of "What is"',
    )
  }
  const section = subs[idx].body

  // The settings table: generated from the describe JSON, held to it.
  const validity =
    page.settings === undefined
      ? 'missing'
      : validateSettingsJson(page.settings)
  const settings = validity ? null : (page.settings as IndicatorSettings)
  if (validity === 'missing') {
    err(
      `"Settings and tips" needs the describe JSON docs/indicators/${slug}.settings.json beside the page (tv-describe or scripts/describe-native.ts)`,
    )
  } else if (validity) {
    err(`docs/indicators/${slug}.settings.json: ${validity}`)
  } else if (settings) {
    checkSettingsTable(section, settings).forEach(err)
  }

  // Tips: 2–4, each specific (a setting or a value).
  const tips = section
    .split('\n')
    .map((l) => TIP_LINE.exec(l)?.[1])
    .filter((t): t is string => t !== undefined)
  if (tips.length < 2 || tips.length > 4) {
    err(
      `"Settings and tips" needs 2–4 \`**Tip:**\` lines (found ${tips.length})`,
    )
  }
  const labels = (settings?.inputs ?? [])
    .map((i) => normCell(i.label))
    .filter((l) => l.length > 1)
  tips.forEach((tip, i) => {
    const t = normCell(tip)
    if (!/\d/.test(t) && !labels.some((l) => t.includes(l))) {
      err(
        `tip ${i + 1} is generic: name a setting or a value ("${tip.slice(0, 60)}")`,
      )
    }
  })

  // Comparison images: ≤ 2, only here, named for the page, alt "A vs B".
  if (tipImages.length > MAX_TIP_IMAGES) {
    err(
      `at most ${MAX_TIP_IMAGES} \`__tip-\` comparison images per page (found ${tipImages.length})`,
    )
  }
  const inside = new Set(imagesIn(section).map((i) => i.src))
  for (const img of tipImages) {
    const name = img.src.split('/').pop() ?? img.src
    if (!inside.has(img.src))
      err(`comparison image ${name} belongs in \`### Settings and tips\``)
    if (slug && !name.startsWith(`${slug}__tip-`))
      err(`comparison image ${name} must be named ${slug}__tip-<setting>`)
    const alt = normCell(img.alt)
    if (
      !/\b(?:vs\.?|versus)\b/.test(alt) ||
      (labels.length > 0 && !labels.some((l) => alt.includes(l)))
    ) {
      err(
        `comparison image ${name}: the alt text names the setting and both values ("<Setting> <A> vs <B>")`,
      )
    }
  }
}

/** Validate one page's body against template v2. Assumes `templateVersion: 2`. */
export function checkTemplateV2(
  page: TemplatePageInput,
  knownSlugs: ReadonlySet<string>,
): TemplateCheckResult {
  const errors: string[] = []
  const warnings: string[] = []
  const err = (msg: string) => errors.push(`${page.file}: template v2: ${msg}`)
  const warn = (msg: string) =>
    warnings.push(`${page.file}: template v2: ${msg}`)

  const body = withoutCode(page.body)
  const kind = page.data.kind

  if (/^#\s+/m.test(body)) {
    err('no `#` heading in the body; the page title comes from `name`')
  }

  const { lead, sections } = splitSections(body, 2)

  // Opening
  const opening = lead.replace(PLACEHOLDER, '').trim()
  if (!opening) {
    err('the body must open with 2–3 sentences before the first `##`')
  } else {
    if (/^#{3,6}\s/m.test(opening)) err('the opening has no heading')
    if (countImages(opening).images > 0) err('the opening has no image')
    const n = countSentences(opening)
    if (n < 2 || n > 3) err(`the opening must be 2–3 sentences (found ${n})`)
  }

  // Section order: exactly the four, in order
  const headings = sections.map((s) => s.heading)
  const expected = SECTIONS.map((s) => s.label)
  const matches =
    headings.length === SECTIONS.length &&
    SECTIONS.every((s, i) => s.test.test(headings[i]))
  if (!matches) {
    err(
      `the \`##\` sections must be exactly, in order: ${expected.join(' · ')} (found: ${
        headings.length ? headings.map((h) => `## ${h}`).join(' · ') : 'none'
      })`,
    )
  }
  const byKey = new Map<string, Section>()
  for (const spec of SECTIONS) {
    const found = sections.find((s) => spec.test.test(s.heading))
    if (found) byKey.set(spec.key, found)
  }

  // What is
  const what = byKey.get('what')
  if (what) requireImage('"What is"', what.body, err, warn)
  checkSettingsAndTips(page, what?.body ?? '', body, err)

  // Trading setups
  const setups = byKey.get('setups')
  if (setups) {
    const { sections: list } = splitSections(setups.body, 3)
    if (list.length < 2 || list.length > 4) {
      err(
        `"Trading setups for bots" needs 2–4 \`###\` setups (found ${list.length})`,
      )
    }
    for (const setup of list) {
      const where = `setup "${setup.heading}"`
      const labels = [...setup.body.matchAll(/\*\*([^*\n]+)\*\*/g)].map(
        (m) => m[1],
      )
      const missing = SETUP_LABELS.filter(
        (label) => !labels.some((text) => label.test.test(text)),
      ).map((label) => label.name)
      if (missing.length > 0) {
        err(`${where} is missing bold label(s): ${missing.join(', ')}`)
      }
      requireImage(where, setup.body, err, warn)
    }
  }

  // Using in Gainium
  const gainium = byKey.get('gainium')
  if (gainium) {
    requireImage('"Using … in Gainium"', gainium.body, err, warn)
    if (kind === 'builtin' || kind === 'community') {
      const raw = splitSections(page.body, 2).sections.find((s) =>
        /^using .+ in gainium$/i.test(s.heading),
      )
      const payload = /```json\s*\n[\s\S]*?"action"[\s\S]*?```/i.test(
        raw?.body ?? '',
      )
      if (!payload) {
        err(
          '"Using … in Gainium" for a TradingView indicator needs the webhook payload as a ```json block with "action"',
        )
      }
    }
  }

  // Related indicators
  const related = byKey.get('related')
  const ownSlug = String(page.data.slug ?? '')
  if (related) {
    const lines = related.body
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
    const items = lines.filter((l) => /^[-*+]\s+/.test(l))
    if (items.length !== lines.length) {
      err('"Related indicators" is a list: one `- ` line per indicator')
    }
    if (items.length < 2) {
      err(
        `"Related indicators" needs at least 2 entries (found ${items.length})`,
      )
    }
    const bodySlugs: string[] = []
    for (const item of items) {
      const links = [...item.matchAll(/\]\(([^)\s]+)[^)]*\)/g)].map((m) => m[1])
      const slugs = links
        .map((url) =>
          new RegExp(`^${SITE}/indicators/([a-z0-9-]+)/?$`).exec(url),
        )
        .filter((m): m is RegExpExecArray => Boolean(m))
        .map((m) => m[1])
      if (slugs.length === 0) {
        const relative = links.find((url) => url.startsWith('/indicators/'))
        err(
          relative
            ? `related link "${relative}" must be absolute: ${SITE}${relative}`
            : `related entry "${item.slice(0, 60)}" must link ${SITE}/indicators/<slug>`,
        )
        continue
      }
      for (const slug of slugs) {
        if (!knownSlugs.has(slug)) {
          err(
            `related link /indicators/${slug} is not a page in docs/indicators`,
          )
        } else if (slug === ownSlug) {
          err('a page does not list itself as related')
        }
        if (!bodySlugs.includes(slug)) bodySlugs.push(slug)
      }
    }
    const fmRelated = Array.isArray(page.data.related)
      ? (page.data.related as unknown[]).map(String)
      : []
    const missingInBody = fmRelated.filter((s) => !bodySlugs.includes(s))
    const missingInFm = bodySlugs.filter((s) => !fmRelated.includes(s))
    if (missingInBody.length > 0 || missingInFm.length > 0) {
      err(
        `frontmatter \`related\` must list the same slugs as "Related indicators" (body only: ${
          missingInFm.join(', ') || '—'
        }; frontmatter only: ${missingInBody.join(', ') || '—'})`,
      )
    }
  }

  // FAQ: frontmatter only, like /help articles
  if (sections.some((s) => /^faq$/i.test(s.heading))) {
    err('the FAQ goes in frontmatter `faq`, not in a body `## FAQ`')
  }
  const fm = Array.isArray(page.data.faq) ? (page.data.faq as any[]) : []
  if (fm.length < 3 || fm.length > 5) {
    err(`frontmatter \`faq\` needs 3–5 questions (found ${fm.length})`)
  }
  fm.forEach((item, i) => {
    if (!plain(String(item?.title ?? '')))
      err(`frontmatter faq[${i}] has no "title"`)
    if (!plain(String(item?.details ?? ''))) {
      err(`frontmatter faq[${i}] has no "details"`)
    }
  })

  // Every image needs alt text
  const { emptyAlt } = countImages(body)
  if (emptyAlt > 0) err(`${emptyAlt} image(s) without alt text`)

  return { errors, warnings }
}

/**
 * Template checks for every page: pages declaring `templateVersion: 2` get
 * the v2 body check; any other `templateVersion` value is an error.
 */
export function checkIndicatorTemplates(
  pages: TemplatePageInput[],
): TemplateCheckResult {
  const errors: string[] = []
  const warnings: string[] = []
  const knownSlugs = new Set(
    pages.map((p) => String(p.data.slug ?? '')).filter(Boolean),
  )
  for (const page of pages) {
    const version = page.data.templateVersion
    if (version === undefined) continue
    if (version !== TEMPLATE_VERSION) {
      errors.push(
        `${page.file}: "templateVersion" must be ${TEMPLATE_VERSION} (the only template defined), got ${JSON.stringify(version)}`,
      )
      continue
    }
    const result = checkTemplateV2(page, knownSlugs)
    errors.push(...result.errors)
    warnings.push(...result.warnings)
  }
  return { errors, warnings }
}

export type MovedPageMeta = Record<
  string,
  { name: string; description: string }
>

/** Frozen name + description of the pages moved from /help (spec 053 §3). */
export const MOVED_PAGE_META: MovedPageMeta = movedPageMeta

/**
 * The moved pages keep their `name` and `description` while their bodies are
 * rewritten: both carry the ranking the URL already has.
 */
export function checkMovedPageMeta(
  pages: Array<{ file: string; data: Record<string, unknown> }>,
  frozen: MovedPageMeta = MOVED_PAGE_META,
): string[] {
  const errors: string[] = []
  for (const { file, data } of pages) {
    const slug = String(data.slug ?? '')
    const meta = frozen[slug]
    if (!meta) continue
    for (const field of ['name', 'description'] as const) {
      if (data[field] !== meta[field]) {
        errors.push(
          `${file}: "${field}" of a page moved from /help must stay ${JSON.stringify(meta[field])} (src/indicators/movedPageMeta.json)`,
        )
      }
    }
  }
  return errors
}
