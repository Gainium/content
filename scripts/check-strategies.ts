/**
 * Strategy library checks (main-app spec 061 §5, Invariants).
 *
 *   npm run check:strategies
 *
 * Every docs/strategies/<slug>.md: frontmatter, a recipe beside it, no
 * performance figures in the prose, and — when the engine has run it — a
 * results file that holds to the 061 invariants (src/strategies/resultsCheck.ts).
 *
 * CONTENT_DOCS_DIR overrides the docs directory (default: ./docs).
 */
import path from 'path'
import { checkStrategiesDir } from '../src/strategies/resultsCheck'

const DOCS_DIR =
  process.env.CONTENT_DOCS_DIR ?? path.join(__dirname, '..', 'docs')

checkStrategiesDir(path.join(DOCS_DIR, 'strategies'))
  .then((errors) => {
    if (errors.length) {
      console.error(`✗ ${errors.length} strategy problem(s):`)
      errors.forEach((e) => console.error(`  ${e}`))
      process.exit(1)
    }
    console.log('✓ strategies pass the spec 061 checks')
  })
  .catch((error) => {
    console.error(
      `✗ check:strategies could not run: ${error?.message || error}`,
    )
    process.exit(1)
  })
