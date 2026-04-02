import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const DOCS_DIR = path.join(process.cwd(), 'docs')
const IMAGES_DIR = path.join(DOCS_DIR, 'images')
const CONVERTIBLE_EXTS = ['.png', '.jpg', '.jpeg']

interface ConversionResult {
  original: string
  webp: string
  originalSize: number
  webpSize: number
}

async function findFiles(dir: string, ext: string[]): Promise<string[]> {
  const files: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await findFiles(fullPath, ext)))
    } else if (ext.includes(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath)
    }
  }
  return files
}

async function convertImages(): Promise<ConversionResult[]> {
  const images = await findFiles(IMAGES_DIR, CONVERTIBLE_EXTS)
  console.log(`Found ${images.length} images to convert\n`)

  const results: ConversionResult[] = []

  for (const imagePath of images) {
    const ext = path.extname(imagePath)
    const webpPath = imagePath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp')

    if (fs.existsSync(webpPath)) {
      console.log(`⏭  Skipping (webp exists): ${path.basename(imagePath)}`)
      continue
    }

    try {
      const originalSize = fs.statSync(imagePath).size
      await sharp(imagePath).webp({ quality: 80 }).toFile(webpPath)
      const webpSize = fs.statSync(webpPath).size

      results.push({
        original: imagePath,
        webp: webpPath,
        originalSize,
        webpSize,
      })

      const savings = ((1 - webpSize / originalSize) * 100).toFixed(1)
      console.log(
        `✅ ${path.basename(imagePath)} → ${path.basename(webpPath)} (${savings}% smaller)`,
      )
    } catch (err) {
      console.error(`❌ Failed: ${path.basename(imagePath)}:`, err)
    }
  }

  return results
}

function updateMarkdownReferences(): number {
  const mdFiles = findMdFiles(DOCS_DIR)
  let totalReplacements = 0

  for (const mdFile of mdFiles) {
    let content = fs.readFileSync(mdFile, 'utf-8')
    const original = content

    // Replace image references: .png, .jpg, .jpeg → .webp
    content = content.replace(
      /(\!\[.*?\]\(.*?)\.(png|jpe?g)(\))/gi,
      '$1.webp$3',
    )

    if (content !== original) {
      fs.writeFileSync(mdFile, content, 'utf-8')
      const count = (original.match(/\.(png|jpe?g)\)/gi) || []).length
      totalReplacements += count
      console.log(`📝 Updated ${path.relative(DOCS_DIR, mdFile)} (${count} references)`)
    }
  }

  return totalReplacements
}

function findMdFiles(dir: string): string[] {
  const files: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory() && entry.name !== 'images') {
      files.push(...findMdFiles(fullPath))
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  return files
}

function removeOriginals(results: ConversionResult[]): void {
  for (const { original } of results) {
    fs.unlinkSync(original)
    console.log(`🗑  Deleted ${path.basename(original)}`)
  }
}

async function main() {
  const args = process.argv.slice(2)
  const deleteOriginals = args.includes('--delete')
  const dryRun = args.includes('--dry-run')

  console.log('🖼  Converting images to WebP...\n')

  if (dryRun) {
    const images = await findFiles(IMAGES_DIR, CONVERTIBLE_EXTS)
    console.log(`Would convert ${images.length} images`)
    images.forEach((img) => console.log(`  ${path.relative(process.cwd(), img)}`))
    return
  }

  // Step 1: Convert images
  const results = await convertImages()

  // Step 2: Update markdown references
  console.log('\n📄 Updating markdown references...\n')
  const refCount = updateMarkdownReferences()

  // Step 3: Delete originals (only with --delete)
  if (deleteOriginals && results.length > 0) {
    console.log('\n🗑  Removing original files...\n')
    removeOriginals(results)
  }

  // Summary
  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0)
  const totalWebp = results.reduce((sum, r) => sum + r.webpSize, 0)
  const savings = totalOriginal > 0 ? ((1 - totalWebp / totalOriginal) * 100).toFixed(1) : '0'

  console.log('\n' + '='.repeat(50))
  console.log(`Images converted: ${results.length}`)
  console.log(`Markdown refs updated: ${refCount}`)
  console.log(
    `Size: ${(totalOriginal / 1024 / 1024).toFixed(1)}MB → ${(totalWebp / 1024 / 1024).toFixed(1)}MB (${savings}% saved)`,
  )
  if (!deleteOriginals) console.log('Original files kept (use --delete to remove)')
  console.log('='.repeat(50))
}

main().catch(console.error)
