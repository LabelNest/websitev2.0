// node scripts/migrate-briefing-images-to-r2.mjs
// Downloads cover_image + hero_image for each briefing from Supabase,
// re-uploads to R2 at briefings/[slug]-cover.[ext] and briefings/[slug]-hero.[ext],
// then updates image_url columns in Neon.

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

function contentType(ext) {
  return { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }[ext] ?? 'image/jpeg'
}

function isR2(url) {
  return url?.includes('r2.dev') || url?.includes('assets.labelnest.in')
}

async function uploadUrl(srcUrl, key) {
  const res = await fetch(srcUrl)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await R2.send(new PutObjectCommand({
    Bucket:       BUCKET,
    Key:          key,
    Body:         buf,
    ContentType:  contentType(extname(key)),
    CacheControl: 'public, max-age=31536000',
  }))
  return `${PUBLIC_URL}/${key}`
}

async function main() {
  console.log('LabelNest — Migrate briefing images Supabase → R2')
  console.log('===================================================')

  const briefings = await sql`
    SELECT id, slug, cover_image, hero_image
    FROM website_briefings
    WHERE cover_image IS NOT NULL OR hero_image IS NOT NULL
    ORDER BY created_at
  `
  console.log(`Found ${briefings.length} briefings with images\n`)

  let ok = 0, skipped = 0, failed = 0

  for (const b of briefings) {
    let newCover = b.cover_image
    let newHero  = b.hero_image
    let changed  = false

    // cover_image
    if (b.cover_image && !isR2(b.cover_image)) {
      try {
        const ext = extname(new URL(b.cover_image).pathname) || '.jpg'
        newCover = await uploadUrl(b.cover_image, `briefings/${b.slug}-cover${ext}`)
        console.log(`  ✓  ${b.slug} cover  → ${newCover}`)
        changed = true
      } catch (e) {
        console.error(`  ✗  ${b.slug} cover: ${e.message}`)
        failed++
      }
    } else if (b.cover_image) {
      console.log(`  skip  ${b.slug} cover (already R2)`)
      skipped++
    }

    // hero_image
    if (b.hero_image && !isR2(b.hero_image)) {
      try {
        const ext = extname(new URL(b.hero_image).pathname) || '.jpg'
        newHero = await uploadUrl(b.hero_image, `briefings/${b.slug}-hero${ext}`)
        console.log(`  ✓  ${b.slug} hero   → ${newHero}`)
        changed = true
      } catch (e) {
        console.error(`  ✗  ${b.slug} hero: ${e.message}`)
        failed++
      }
    } else if (b.hero_image) {
      skipped++
    }

    if (changed) {
      await sql`
        UPDATE website_briefings
        SET cover_image = ${newCover}, hero_image = ${newHero}, updated_at = NOW()
        WHERE id = ${b.id}
      `
      ok++
    }
  }

  console.log(`\n===================================================`)
  console.log(`✓ Migrated: ${ok}  |  Skipped: ${skipped}  |  Failed: ${failed}`)
}

main().catch(e => { console.error('Fatal:', e); process.exit(1) })
