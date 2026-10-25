import type { StyleRule } from './aiGiveaways'

/**
 * Time periods in indicator articles (docs/STYLE.md "No time periods").
 * Banned in `docs/indicators` only: a page that says "in the last 12 months"
 * is stale the day after it is written, and a count tied to a window tells
 * the reader nothing they can carry to their own pair. Compare settings
 * instead: "RSI(7) gives about three times as many crosses of 30 as RSI(14)".
 *
 * Frontmatter `createdAt` / `updatedAt` / `date` are never scanned (only the
 * prose fields are), and URLs are blanked, so dated image paths are fine.
 */

const MONTH =
  '(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)'
const NUM =
  '(?:\\d+|a few|few|several|a couple of|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|eighteen|twenty|thirty|sixty|ninety|hundred)'
const UNIT = '(?:calendar |trading )?(?:days?|weeks?|months?|quarters?|years?)'
/** Bar-based windows are part of an indicator's definition, not a period. */
const BAR_WINDOW =
  '(?:\\s+[\\w*]+){0,3}?\\s+\\**(?:bars?|candles?|periods?|closes?|values?|swings?|pivots?|readings?)\\b'

const ADVICE =
  'No time periods. Compare settings instead ("RSI(7) gives about three times as many crosses of 30 as RSI(14)"), or say "in the chart above".'

const ci = (source: string) => new RegExp(source, 'gi')
// Month names are matched capitalised only, so "may" the verb is not a month.
const cs = (source: string) => new RegExp(source, 'g')

export const TIME_PERIOD_RULES: readonly StyleRule[] = [
  {
    id: 'time-last-n-units',
    pattern: ci(
      String.raw`\b(?:last|past|previous|prior|recent) ${NUM} ${UNIT}\b`,
    ),
    advice: ADVICE,
  },
  {
    id: 'time-last-unit',
    pattern: ci(
      String.raw`\b(?:last|past|previous|prior) (?:year|month|week|quarter)\b`,
    ),
    advice: ADVICE,
  },
  {
    id: 'time-this-unit',
    pattern: ci(
      String.raw`\b(?:this|so far this) (?:year|month|week|quarter)\b|\byear[- ]to[- ]date\b|\bYTD\b`,
    ),
    advice: ADVICE,
  },
  {
    id: 'time-per-unit',
    pattern: ci(
      String.raw`\bper (?:year|month|week|quarter|annum)\b|\b(?:once|twice|thrice|${NUM} times|\d+(?:\.\d+)?×) (?:a|per|each|every) (?:day|week|month|year)\b|\bevery (?:other |${NUM} )?(?:days|weeks?|months?|years?)\b`,
    ),
    advice: ADVICE,
  },
  {
    id: 'time-units-of-data',
    // not "a quarter of the signals", nor the horizon "within two weeks of"
    pattern: ci(
      String.raw`(?<!\bwithin (?:a )?)\b(?:${NUM}|a|an) (?:calendar |trading )?(?:days?|weeks?|months?|years?) of\b`,
    ),
    advice: ADVICE,
  },
  {
    id: 'time-over-the-last',
    pattern: ci(
      String.raw`\bover the (?:last|past|previous)\b(?!${BAR_WINDOW})|\bover the (?:sample|test window|test period)\b`,
    ),
    advice: `${ADVICE} ("Over the last 14 bars" is fine: that is the indicator's own window.)`,
  },
  {
    id: 'time-since-date',
    pattern: cs(
      String.raw`\b[Ss]ince (?:(?:early|mid|late)[- ])?(?:${MONTH},? )?20\d{2}\b`,
    ),
    advice: ADVICE,
  },
  {
    id: 'time-date-range',
    pattern: cs(
      String.raw`\b(?:\d{1,2} )?${MONTH}\.?(?: \d{1,2},?)?(?: 20\d{2})?\s*(?:–|—|-|to|through|until)\s*(?:\d{1,2} )?${MONTH}\.?(?: \d{1,2},?)? 20\d{2}\b|\b20\d{2}\s*(?:–|—|-|to|through)\s*20\d{2}\b`,
    ),
    advice: ADVICE,
  },
  // A single calendar date is allowed: it anchors one worked example ("on Oct 8
  // the deal opened…"), which Ares said is fine. The rule is against general
  // claims tied to a sample window, not against dated examples.
]

/**
 * Banned rules that apply under one path only, on top of BANNED_PHRASES.
 * Paths are repository-relative with forward slashes.
 */
export const PATH_BANNED_RULES: ReadonlyArray<{
  path: string
  rules: readonly StyleRule[]
}> = [{ path: 'docs/indicators', rules: TIME_PERIOD_RULES }]

/** The extra banned rules for a repository-relative file path. */
export function extraBannedFor(relPath: string): StyleRule[] {
  const rel = relPath.split('\\').join('/').replace(/^\.\//, '')
  return PATH_BANNED_RULES.filter(
    (entry) => rel === entry.path || rel.startsWith(`${entry.path}/`),
  ).flatMap((entry) => [...entry.rules])
}
