import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import { execFileSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
import sharp from 'sharp'
import {
  DEFAULTS,
  inspect,
  MARKER,
  optimizePair,
  pairsFor,
  readMarker,
} from '../scripts/convert-to-webp'

const ROOT = path.join(__dirname, '..')
const SCRIPT = path.join(ROOT, 'scripts', 'convert-to-webp.ts')
const TSX = path.join(ROOT, 'node_modules', '.bin', 'tsx')

/** A chart-like PNG: dark background, coloured stripes, some noise. */
async function makePng(file: string, width: number, height = 200, seed = 1) {
  const data = Buffer.alloc(width * height * 3)
  for (let i = 0; i < width * height; i++) {
    const x = i % width
    const stripe = Math.floor(x / 7) % 3
    const noise = (i * 2654435761 * seed) % 23
    data[i * 3] = stripe === 0 ? 220 : 20 + noise
    data[i * 3 + 1] = stripe === 1 ? 180 : 20 + noise
    data[i * 3 + 2] = 30 + noise
  }
  fs.mkdirSync(path.dirname(file), { recursive: true })
  await sharp(data, { raw: { width, height, channels: 3 } })
    .png({ compressionLevel: 0 })
    .toFile(file)
}

/** What the old converter wrote: quality 80, no marker. */
const legacyWebp = (png: string, webp: string) =>
  sharp(png).webp({ quality: 80 }).toFile(webp)

const width = async (file: string) => (await sharp(file).metadata()).width

function cli(args: string[], cwd: string, env: NodeJS.ProcessEnv = {}) {
  try {
    const out = execFileSync(TSX, [SCRIPT, ...args], {
      cwd,
      stdio: 'pipe',
      env: { ...process.env, ...env },
    }).toString()
    return { code: 0, out }
  } catch (error: any) {
    return {
      code: error.status as number,
      out: `${error.stdout}${error.stderr}`,
    }
  }
}

describe('image optimizer (scripts/convert-to-webp.ts)', function () {
  this.timeout(60000)
  let dir: string
  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'images-'))
  })

  it('pairs a source with its webp, preferring PNG over JPG', async () => {
    await makePng(path.join(dir, 'a.png'), 100)
    await sharp(path.join(dir, 'a.png')).jpeg().toFile(path.join(dir, 'a.jpg'))
    await makePng(path.join(dir, 'b.png'), 100)
    const pairs = pairsFor([path.join(dir, 'a.jpg'), path.join(dir, 'b.png')])
    expect(pairs).to.deep.equal([
      { webp: path.join(dir, 'a.webp'), source: path.join(dir, 'a.png') },
      { webp: path.join(dir, 'b.webp'), source: path.join(dir, 'b.png') },
    ])
  })

  it('flags a webp the optimizer did not write, then skips it once optimized', async () => {
    const png = path.join(dir, 'chart.png')
    const webp = path.join(dir, 'chart.webp')
    await makePng(png, 400)
    await legacyWebp(png, webp)
    const [pair] = pairsFor([png])
    expect(await inspect(pair)).to.deep.equal(['not written by the optimizer'])

    const first = await optimizePair(pair)
    expect(first.written).to.include(webp)
    expect(await readMarker(webp)).to.match(new RegExp(`^${MARKER} src=`))
    expect(await inspect(pair)).to.deep.equal([])

    const bytes = fs.readFileSync(webp)
    const pngBytes = fs.readFileSync(png)
    const second = await optimizePair(pair)
    expect(second.written).to.deep.equal([])
    expect(fs.readFileSync(webp).equals(bytes)).to.equal(true)
    expect(fs.readFileSync(png).equals(pngBytes)).to.equal(true)
  })

  it('re-encodes when the source changed since the webp was written', async () => {
    const png = path.join(dir, 'chart.png')
    await makePng(png, 300)
    const [pair] = pairsFor([png])
    await optimizePair(pair)
    const before = fs.readFileSync(pair.webp)

    await makePng(png, 300, 200, 7)
    expect(await inspect(pair)).to.deep.equal(['stale: source changed'])
    const result = await optimizePair(pair)
    expect(result.written).to.include(pair.webp)
    expect(fs.readFileSync(pair.webp).equals(before)).to.equal(false)
    expect(await inspect(pair)).to.deep.equal([])
  })

  it('creates a missing webp', async () => {
    const png = path.join(dir, 'new.png')
    await makePng(png, 200)
    const [pair] = pairsFor([png])
    expect(await inspect(pair)).to.deep.equal(['no webp'])
    await optimizePair(pair)
    expect(fs.existsSync(pair.webp)).to.equal(true)
  })

  it('caps the width of the webp (and a source it shrinks), never upscales', async () => {
    const wide = path.join(dir, 'wide.png')
    const narrow = path.join(dir, 'narrow.png')
    await makePng(wide, 2400, 300)
    await makePng(narrow, 640, 300)
    const [narrowPair, widePair] = pairsFor([wide, narrow])
    expect(await inspect(widePair)).to.deep.equal(['no webp'])
    await optimizePair(widePair)
    await optimizePair(narrowPair)
    expect(await width(widePair.webp)).to.equal(1600)
    expect(await width(wide)).to.equal(1600)
    expect((await sharp(wide).metadata()).height).to.equal(200)
    expect(await width(narrowPair.webp)).to.equal(640)
    expect(await width(narrow)).to.equal(640)

    const opts = { ...DEFAULTS, maxWidth: 500 }
    expect(await inspect(narrowPair, opts)).to.include('wider than 500px')
    await optimizePair(narrowPair, opts)
    expect(await width(narrowPair.webp)).to.equal(500)
  })

  it('leaves a source alone when capping it would make it larger', async () => {
    // a 4-colour palette PNG: resampling it adds colours and loses the palette
    const png = path.join(dir, 'flat.png')
    const w = 1700
    const data = Buffer.alloc(w * 300 * 3)
    for (let i = 0; i < w * 300; i++)
      data.fill((i % w) % 3 ? 40 : 230, i * 3, i * 3 + 3)
    await sharp(data, { raw: { width: w, height: 300, channels: 3 } })
      .png({ palette: true, compressionLevel: 9 })
      .toFile(png)
    const bytes = fs.readFileSync(png)
    const [pair] = pairsFor([png])
    const result = await optimizePair(pair)
    expect(result.written).to.deep.equal([pair.webp])
    expect(fs.readFileSync(png).equals(bytes)).to.equal(true)
    expect(await width(pair.webp)).to.equal(1600)
    expect(await inspect(pair)).to.deep.equal([])
  })

  it('keeps PNG sources pixel-identical when only recompressing', async () => {
    const png = path.join(dir, 'chart.png')
    await makePng(png, 800)
    const pixels = await sharp(png).raw().toBuffer()
    const size = fs.statSync(png).size
    const [pair] = pairsFor([png])
    const result = await optimizePair(pair)
    expect(result.written).to.include(png)
    expect(fs.statSync(png).size).to.be.lessThan(size)
    expect((await sharp(png).raw().toBuffer()).equals(pixels)).to.equal(true)
  })

  it('--check exits 1 listing unoptimized images, writes nothing, then 0', async () => {
    const png = path.join(dir, 'chart.png')
    await makePng(png, 300)
    await legacyWebp(png, path.join(dir, 'chart.webp'))
    await makePng(path.join(dir, 'other.png'), 300)
    const snapshot = () =>
      fs
        .readdirSync(dir)
        .map((f) => `${f}:${fs.statSync(path.join(dir, f)).size}`)
        .join()
    const before = snapshot()

    const failing = cli(['--check', dir], ROOT)
    expect(failing.code).to.equal(1)
    expect(failing.out).to.contain('chart.webp: not written by the optimizer')
    expect(failing.out).to.contain('other.webp: no webp')
    expect(snapshot()).to.equal(before)

    expect(cli([dir], ROOT).code).to.equal(0)
    const passing = cli(['--check', dir], ROOT)
    expect(passing.code).to.equal(0)
    expect(passing.out).to.contain('0 of 2 images not optimized')
  })

  it('--staged optimizes only staged images and stages the results', async () => {
    const git = (...args: string[]) =>
      execFileSync('git', args, { cwd: dir, stdio: 'pipe' }).toString()
    git('init', '-q')
    git('config', 'user.email', 'test@example.com')
    git('config', 'user.name', 'test')
    const images = path.join(dir, 'docs', 'images', 'help')
    await makePng(path.join(images, 'staged.png'), 2000)
    await makePng(path.join(images, 'unstaged.png'), 2000)
    git('add', 'docs/images/help/staged.png')

    const result = cli(['--staged'], dir)
    expect(result.code, result.out).to.equal(0)
    const staged = git('diff', '--cached', '--name-only').trim().split('\n')
    expect(staged).to.deep.equal([
      'docs/images/help/staged.png',
      'docs/images/help/staged.webp',
    ])
    expect(
      git('status', '--porcelain', 'docs/images/help/staged.png'),
    ).to.equal('A  docs/images/help/staged.png\n')
    expect(await width(path.join(images, 'staged.png'))).to.equal(1600)
    expect(fs.existsSync(path.join(images, 'unstaged.webp'))).to.equal(false)
    expect(await width(path.join(images, 'unstaged.png'))).to.equal(2000)

    // nothing staged: a no-op
    git('commit', '-q', '--no-verify', '-m', 'add')
    expect(cli(['--staged'], dir).code).to.equal(0)
  })

  it('--staged under `git commit -- <paths>` asks to commit again instead of staging', async () => {
    fs.mkdirSync(path.join(dir, 'docs', 'images'), { recursive: true })
    await makePng(path.join(dir, 'docs', 'images', 'x.png'), 300)
    execFileSync('git', ['init', '-q'], { cwd: dir })
    execFileSync('git', ['add', 'docs/images/x.png'], { cwd: dir })
    const result = cli(['--staged'], dir, {
      GIT_INDEX_FILE: path.join(dir, '.git', 'next-index-1.lock'),
    })
    // the temporary index is empty here, so nothing is staged: no-op
    expect(result.code).to.equal(0)

    fs.copyFileSync(
      path.join(dir, '.git', 'index'),
      path.join(dir, '.git', 'next-index-1.lock'),
    )
    const rerun = cli(['--staged'], dir, {
      GIT_INDEX_FILE: path.join(dir, '.git', 'next-index-1.lock'),
    })
    expect(rerun.code).to.equal(1)
    expect(rerun.out).to.contain('Commit again, naming these files too')
    expect(rerun.out).to.contain('docs/images/x.webp')
  })
})
