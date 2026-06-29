// node scripts/migrate-team-photos-to-r2.mjs
// Downloads each team member photo from Supabase Storage,
// re-uploads to R2 at team/[slug].[ext], updates image_url in Neon.

import { neon } from '@neondatabase/serverless'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { readFileSync } from 'fs'
import { dirname, join, extname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const root  = join(__dir, '..')

function loadEnv(path) {
  try {
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const eq = t.indexOf('=')
      if (eq < 0) continue
      const k = t.slice(0, eq).trim()
      const v = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
      if (!process.env[k]) process.env[k] = v
    }
  } catch {}
}
loadEnv(join(root, '.env'))
loadEnv('C:/LabelNest/.env')

const sql = neon(process.env.NEON_DATABASE_URL)

const R2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY_ID     ?? '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
  },
})
const BUCKET     = process.env.R2_BUCKET_NAME ?? process.env.R2_BUCKET ?? 'labelnest'
const PUBLIC_URL = process.env.R2_PUBLIC_URL  ?? 'https://assets.labelnest.in'

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function contentType(ext) {
  return { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }[ext] ?? 'image/jpeg'
}

async function fetchImage(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  return buf
}

async function main() {
  console.log('LabelNest — Migrate team photos Supabase → R2')
  console.log('===============================================')

  const members = await sql`
    SELECT id, name, slug, image_url
    FROM website_team_members
    WHERE image_url IS NOT NULL
    ORDER BY sort_order
  `
  console.log(`Found ${members.length} members with images\n`)

  let ok = 0, skipped = 0, failed = 0

  for (const m of members) {
    // Already on R2 — skip
    if (m.image_url?.includes('r2.dev') || m.image_url?.includes('assets.labelnest.in')) {
      console.log(`  skip  ${m.name} (already R2)`)
      skipped++
      continue
    }

    const ext  = extname(new URL(m.image_url).pathname) || '.jpg'
    const key  = `team/${m.slug ?? slugify(m.name)}${ext}`

    try {
      const buf = await fetchImage(m.image_url)

      await R2.send(new PutObjectCommand({
        Bucket:       BUCKET,
        Key:          key,
        Body:         buf,
        ContentType:  contentType(ext),
        CacheControl: 'public, max-age=31536000',
      }))

      const r2Url = `${PUBLIC_URL}/${key}`
      await sql`UPDATE website_team_members SET image_url = ${r2Url}, updated_at = NOW() WHERE id = ${m.id}`
      console.log(`  ✓  ${m.name.padEnd(24)} → ${r2Url}`)
      ok++
    } catch (e) {
      console.error(`  ✗  ${m.name}: ${e.message}`)
      failed++
    }
  }

  console.log(`\n===============================================`)
  console.log(`✓ Migrated: ${ok}  |  Skipped: ${skipped}  |  Failed: ${failed}`)
}

main().catch(e => { console.error('Fatal:', e); process.exit(1) })
