// Refreshes the saved page titles and descriptions for the redesigned pages, and puts the live-number token
// {{entities}} in place of any old hard-coded "40,000+" in saved SEO text.
//   node scripts/update-seo-redesign.mjs            (dry run: shows what would change)
//   node scripts/update-seo-redesign.mjs --apply    (writes it)
// The site reads these rows first (Admin -> SEO), so without this the old wording keeps showing in search results.
// Tokens {{entities}}, {{funds}}, {{companies}}, {{people}} are filled from NestLens when the page is built.

import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
try {
  for (const line of readFileSync(join(__dir, '..', '.env'), 'utf8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i > 0) process.env[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, '')
  }
} catch { /* use the environment */ }

const sql = neon(process.env.NEON_DATABASE_URL)
const apply = process.argv.includes('--apply')

const PAGES = {
  '/': {
    title: 'LabelNest — Private market data you can trace to its source',
    description: 'LabelNest is a private markets data company in Bengaluru. Reviewed data on funds, companies and people, and the software to run a fund, a programme or a raise on top of it.',
  },
  '/ecosystem': {
    title: 'How the LabelNest products connect — Atlas, Command, Ascent, Orbit, Connect',
    description: 'One record, every product reads it. How Command and Ascent, Orbit and Ascent, and Atlas with Command and Ascent work together, step by step.',
  },
  '/nestlens': {
    title: 'NestLens — Atlas, Exchange, Command, Ascent, Orbit, Connect',
    description: 'NestLens is the LabelNest platform: reviewed private markets data on {{entities}} entities, a data marketplace, a workspace for funds, data rooms for founders, programme management and fund scouting.',
  },
  '/nestlens/pricing': {
    title: 'NestLens pricing — Atlas, Exchange, Command, Ascent, Orbit, Connect',
    description: 'Pricing for every NestLens product in rupees and dollars, read live from the NestLens plan catalog. Enterprise, bundle and group quotes on request.',
  },
  '/who-we-serve/incubator': {
    title: 'For incubators and accelerators — Orbit with Ascent deal flow',
    description: 'Run the programme in Orbit, give every selected startup an Ascent data room, and turn ready rooms into consented introductions. Data rooms are included in every Orbit plan.',
  },
}

const rows = await sql`SELECT id, page_path, title, description FROM website_page_seo ORDER BY page_path`
const byPath = new Map(rows.map((r) => [r.page_path, r]))
console.log(apply ? 'APPLYING' : 'DRY RUN (nothing is written)')

for (const [path, v] of Object.entries(PAGES)) {
  const cur = byPath.get(path)
  console.log(`\n${path}  ${cur ? '(row exists)' : '(no row: the page uses its built-in text, nothing to change)'}`)
  if (!cur) continue
  console.log('  title now :', cur.title)
  console.log('  title new :', v.title)
  console.log('  desc  now :', cur.description)
  console.log('  desc  new :', v.description)
  if (apply) await sql`UPDATE website_page_seo SET title = ${v.title}, description = ${v.description}, updated_at = NOW() WHERE id = ${cur.id}`
}

console.log('\nOther saved SEO text with the old hard-coded figure:')
let n = 0
for (const r of rows) {
  if (PAGES[r.page_path]) continue
  const t = r.title ?? '', d = r.description ?? ''
  if (!/40,000\+/.test(t + d)) continue
  n++
  console.log(`  ${r.page_path}`)
  if (apply) await sql`UPDATE website_page_seo SET title = ${t.replaceAll('40,000+', '{{entities}}')}, description = ${d.replaceAll('40,000+', '{{entities}}')}, updated_at = NOW() WHERE id = ${r.id}`
}
if (!n) console.log('  none')
console.log(apply ? '\nDone.' : '\nRe-run with --apply to write these changes.')
