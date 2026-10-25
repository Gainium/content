/**
 * Image optimizer for docs/images. Pages reference only the `.webp`; a PNG or
 * JPG next to it is its source.
 *
 *   npm run images:webp                         # optimize everything under docs/images
 *   npm run images:webp -- docs/images/help     # only these files or folders
 *   npm run images:check                        # list what is not optimized, exit 1 (no writes)
 *   npm run images:webp:dry                     # list what would be (re)encoded
 *   tsx scripts/convert-to-webp.ts --staged     # the staged images only, re-staged (pre-commit)
 *
 * Options: --max-width=N (env IMAGE_MAX_WIDTH, default 1600), --quality=N
 * (default 80), --no-sources (never rewrite PNG sources), --delete (remove the
 * sources after converting), --verbose.
 *
 * A WebP counts as optimized when it carries this optimizer's marker (an EXIF
 * ImageDescription holding the SHA-256 of the source it was encoded from), the
 * marker matches the source as it is now, and it is no wider than the max
 * width. Everything else is (re)encoded from the source: missing, stale (the
 * source changed since), too wide, or written by another tool. Hashes rather
 * than mtimes, because a git checkout does not preserve mtimes.
 *
 * Encoding: width capped at the max width (fit inside, never upscaled), WebP
 * quality 80 / effort 5 with sharp YUV conversion (keeps thin red and green
 * chart lines from washing out), metadata stripped except the marker, alpha dropped
 * when the image is fully opaque.
 *
 * When a WebP is (re)encoded, its PNG source is also capped to the same width
 * and losslessly recompressed (compression level 9; a palette only when the
 * image has at most 256 colours and decodes back pixel-identical). The new
 * source is kept only when it is smaller than the old one.
 *
 * A WebP with no source is re-encoded from itself once, and only when it is
 * too wide or quality 80 makes it at least 5% smaller.
 */
import { execFileSync } from 'child_process'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

export const MARKER = 'gainium-image-optimizer/1'
export const IMAGES_DIR = path.join('docs', 'images')
const SOURCE_EXTS = ['.png', '.jpg', '.jpeg']

// libvips caches decoded files by path; this script rewrites files it has
// just read, so a cached read would return the old pixels.
sharp.cache(false)
const IMAGE_EXTS = [...SOURCE_EXTS, '.webp']

export interface Options {
  maxWidth: number
  quality: number
  effort: number
  optimizeSources: boolean
}

export const DEFAULTS: Options = {
  maxWidth: Number(process.env.IMAGE_MAX_WIDTH) || 1600,
  quality: 80,
  effort: 5,
  optimizeSources: true,
}

/** A WebP and the source it is encoded from (none for a WebP-only image). */
export interface ImagePair {
  webp: string
  source?: string
}

export interface PairResult {
  pair: ImagePair
  reasons: string[]
  written: string[]
  webpBefore: number
  webpAfter: number
  sourceBefore: number
  sourceAfter: number
}

const isImage = (file: string) =>
  IMAGE_EXTS.includes(path.extname(file).toLowerCase())

const stem = (file: string) => file.slice(0, -path.extname(file).length)

const fileSize = (file: string) =>
  fs.existsSync(file) ? fs.statSync(file).size : 0

function sha256(file: string): string {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  if (fs.statSync(dir).isFile()) return [dir]
  const files: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walk(full))
    else if (isImage(entry.name)) files.push(full)
  }
  return files
}

/**
 * Group image files into WebP/source pairs by file stem. A PNG wins over a JPG
 * when a stem has both. Files of a pair that were not passed in are found on
 * disk, so passing only the PNG (or only the WebP) covers the pair.
 */
export function pairsFor(files: string[]): ImagePair[] {
  const stems = new Map<string, string>()
  for (const file of files.filter(isImage)) stems.set(stem(file), file)
  const pairs: ImagePair[] = []
  for (const [base, sample] of [...stems].sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    const dir = path.dirname(sample)
    const siblings = fs.existsSync(dir) ? fs.readdirSync(dir) : []
    const sibling = (ext: string) => {
      const name = siblings.find(
        (n) =>
          stem(n) === path.basename(base) &&
          path.extname(n).toLowerCase() === ext,
      )
      return name ? path.join(dir, name) : undefined
    }
    const source = SOURCE_EXTS.map(sibling).find(Boolean)
    const webp = sibling('.webp') ?? `${base}.webp`
    if (!source && !fs.existsSync(webp)) continue
    pairs.push({ webp, source })
  }
  return pairs
}

/** The marker string embedded in a WebP, or undefined when it has none. */
export async function readMarker(webp: string): Promise<string | undefined> {
  const { exif } = await sharp(webp).metadata()
  if (!exif) return undefined
  const text = exif.toString('latin1')
  const at = text.indexOf(MARKER)
  if (at < 0) return undefined
  return text.slice(at).split(/\u0000/)[0]
}

const markerFor = (sourceHash: string) => `${MARKER} src=${sourceHash}`

function webpPipeline(input: string | Buffer, opts: Options, opaque: boolean) {
  let img = sharp(input).resize({
    width: opts.maxWidth,
    fit: 'inside',
    withoutEnlargement: true,
  })
  if (opaque) img = img.removeAlpha()
  return img.webp({
    quality: opts.quality,
    effort: opts.effort,
    smartSubsample: true,
  })
}

async function isOpaque(input: string | Buffer): Promise<boolean> {
  const meta = await sharp(input).metadata()
  if (!meta.hasAlpha) return true
  return (await sharp(input).stats()).isOpaque
}

/** Why a pair is not optimized; an empty list means it is. Never writes. */
export async function inspect(
  pair: ImagePair,
  opts: Options = DEFAULTS,
): Promise<string[]> {
  const reasons: string[] = []
  const { webp, source } = pair
  if (!fs.existsSync(webp)) return [...reasons, 'no webp']
  const { width = 0 } = await sharp(webp).metadata()
  if (width > opts.maxWidth) reasons.push(`wider than ${opts.maxWidth}px`)
  const marker = await readMarker(webp)
  if (source) {
    if (!marker) reasons.push('not written by the optimizer')
    else if (marker !== markerFor(sha256(source)))
      reasons.push('stale: source changed')
  } else if (!marker && !reasons.length) {
    const existing = fs.statSync(webp).size
    const opaque = await isOpaque(webp)
    const candidate = await webpPipeline(webp, opts, opaque).toBuffer()
    if (candidate.length < existing * 0.95)
      reasons.push('larger than quality 80 produces')
  }
  return reasons
}

/** Cap and losslessly recompress a PNG source; true when it was rewritten. */
async function optimizePngSource(
  file: string,
  opts: Options,
): Promise<boolean> {
  const original = fs.readFileSync(file)
  const opaque = await isOpaque(original)
  const base = () => {
    let img = sharp(original).resize({
      width: opts.maxWidth,
      fit: 'inside',
      withoutEnlargement: true,
    })
    if (opaque) img = img.removeAlpha()
    return img
  }
  const raw = await base().raw().toBuffer({ resolveWithObject: true })
  const candidates = [
    await base()
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer(),
  ]
  if (countColours(raw.data, raw.info.channels) <= 256) {
    const palette = await base()
      .png({ palette: true, colours: 256, dither: 0, compressionLevel: 9 })
      .toBuffer()
    // Keep the palette only when it decodes back to exactly the same pixels.
    const back = await sharp(palette)
      .raw()
      .toBuffer({ resolveWithObject: true })
    if (back.info.channels === raw.info.channels && back.data.equals(raw.data))
      candidates.push(palette)
  }
  const best = candidates.sort((a, b) => a.length - b.length)[0]
  // A resized or recompressed source is kept only when it is smaller: a
  // palette PNG resampled to a new width can grow several times over.
  if (best.length >= original.length) return false
  fs.writeFileSync(file, best)
  return true
}

function countColours(data: Buffer, channels: number): number {
  const seen = new Set<number>()
  for (let i = 0; i < data.length; i += channels) {
    let key = 0
    for (let c = 0; c < channels; c++) key = key * 256 + data[i + c]
    seen.add(key)
    if (seen.size > 256) break
  }
  return seen.size
}

/** Bring one pair up to date. Writes only when inspect() finds a reason. */
export async function optimizePair(
  pair: ImagePair,
  opts: Options = DEFAULTS,
): Promise<PairResult> {
  const { webp, source } = pair
  const webpBefore = fileSize(webp)
  const sourceBefore = source ? fileSize(source) : 0
  const reasons = await inspect(pair, opts)
  const written: string[] = []
  if (reasons.length) {
    if (source) {
      if (
        opts.optimizeSources &&
        /\.png$/i.test(source) &&
        (await optimizePngSource(source, opts))
      )
        written.push(source)
      const opaque = await isOpaque(source)
      const out = await webpPipeline(source, opts, opaque)
        .withExif({ IFD0: { ImageDescription: markerFor(sha256(source)) } })
        .toBuffer()
      fs.writeFileSync(webp, out)
    } else {
      const input = fs.readFileSync(webp)
      const opaque = await isOpaque(input)
      const out = await webpPipeline(input, opts, opaque)
        .withExif({ IFD0: { ImageDescription: markerFor('self') } })
        .toBuffer()
      fs.writeFileSync(webp, out)
    }
    written.push(webp)
  }
  return {
    pair,
    reasons,
    written,
    webpBefore,
    webpAfter: fileSize(webp),
    sourceBefore,
    sourceAfter: source ? fileSize(source) : 0,
  }
}

async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let next = 0
  const worker = async () => {
    while (next < items.length) {
      const i = next++
      results[i] = await fn(items[i])
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker),
  )
  return results
}

/** Rewrite `![..](x.png)` references in markdown under docs/ to `.webp`. */
function updateMarkdownReferences(docsDir: string): number {
  let total = 0
  const visit = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory() && entry.name !== 'images') visit(full)
      else if (entry.name.endsWith('.md')) {
        const original = fs.readFileSync(full, 'utf-8')
        const updated = original.replace(
          /(!\[.*?\]\(.*?)\.(png|jpe?g)(\))/gi,
          '$1.webp$3',
        )
        if (updated !== original) {
          fs.writeFileSync(full, updated, 'utf-8')
          const count = (original.match(/\.(png|jpe?g)\)/gi) || []).length
          total += count
          console.log(`Updated ${path.relative(docsDir, full)} (${count} refs)`)
        }
      }
    }
  }
  if (fs.existsSync(docsDir)) visit(docsDir)
  return total
}

const git = (args: string[]) =>
  execFileSync('git', args, { encoding: 'utf-8' }).toString()

function stagedImages(): string[] {
  return git([
    'diff',
    '--cached',
    '--name-only',
    '--diff-filter=ACMR',
    '-z',
    '--',
    IMAGES_DIR,
  ])
    .split('\0')
    .filter((f) => f && isImage(f))
}

const kb = (bytes: number) => `${(bytes / 1024).toFixed(0)} KB`

export async function main(argv: string[]): Promise<number> {
  const flag = (name: string) => argv.includes(name)
  const value = (name: string) =>
    argv.find((a) => a.startsWith(`${name}=`))?.split('=')[1]
  const opts: Options = {
    ...DEFAULTS,
    maxWidth: Number(value('--max-width')) || DEFAULTS.maxWidth,
    quality: Number(value('--quality')) || DEFAULTS.quality,
    optimizeSources: !flag('--no-sources'),
  }
  const check = flag('--check')
  const dryRun = flag('--dry-run')
  const staged = flag('--staged')
  const verbose = flag('--verbose')
  const targets = argv.filter((a) => !a.startsWith('--'))

  const files = staged
    ? stagedImages()
    : (targets.length ? targets : [IMAGES_DIR]).flatMap(walk)
  const pairs = pairsFor(files)
  if (!pairs.length) return 0

  if (check || dryRun) {
    const reasons = await mapLimit(pairs, 8, (p) => inspect(p, opts))
    const bad = pairs
      .map((pair, i) => ({ pair, reasons: reasons[i] }))
      .filter((r) => r.reasons.length)
    for (const { pair, reasons } of bad)
      console.log(`${pair.webp}: ${reasons.join(', ')}`)
    console.log(
      `${bad.length} of ${pairs.length} images not optimized` +
        (bad.length && check ? ' (run: npm run images:webp)' : ''),
    )
    return check && bad.length ? 1 : 0
  }

  const results = await mapLimit(pairs, 4, async (p) => {
    try {
      const r = await optimizePair(p, opts)
      if (r.written.length || verbose)
        console.log(
          `${r.written.length ? 'optimized' : 'ok'} ${p.webp}` +
            (r.written.length
              ? `: webp ${kb(r.webpBefore)} -> ${kb(r.webpAfter)}` +
                (r.sourceAfter !== r.sourceBefore
                  ? `, source ${kb(r.sourceBefore)} -> ${kb(r.sourceAfter)}`
                  : '') +
                ` (${r.reasons.join(', ')})`
              : ''),
        )
      return r
    } catch (err) {
      console.error(`failed ${p.webp}:`, err)
      return undefined
    }
  })
  const failed = results.filter((r) => !r).length
  const done = results.filter((r): r is PairResult => !!r)
  const written = done.flatMap((r) => r.written)

  if (!staged && !targets.length) {
    const refs = updateMarkdownReferences(path.dirname(IMAGES_DIR))
    if (refs) console.log(`Markdown refs updated: ${refs}`)
  }
  const changed = done.filter((r) => r.written.length)
  if (flag('--delete')) {
    for (const r of changed)
      if (r.pair.source && fs.existsSync(r.pair.webp)) {
        fs.unlinkSync(r.pair.source)
        console.log(`deleted ${r.pair.source}`)
      }
  }

  const sum = (key: keyof PairResult) =>
    kb(changed.reduce((s, r) => s + (r[key] as number), 0))
  console.log(
    `${changed.length} of ${pairs.length} images optimized` +
      (changed.length
        ? `: webp ${sum('webpBefore')} -> ${sum('webpAfter')},` +
          ` sources ${sum('sourceBefore')} -> ${sum('sourceAfter')}`
        : '') +
      (failed ? `, ${failed} failed` : ''),
  )

  if (staged && written.length) {
    const index = path.basename(process.env.GIT_INDEX_FILE ?? '')
    if (index.startsWith('next-index-')) {
      // `git commit -- <paths>` commits a temporary index; files added to it
      // here would be missing from the real index afterwards.
      console.error(
        'Images were optimized. Commit again, naming these files too:\n  ' +
          written.join('\n  '),
      )
      return 1
    }
    git(['add', '--', ...written])
  }
  return failed ? 1 : 0
}

if (require.main === module) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (err) => {
      console.error(err)
      process.exit(1)
    },
  )
}
