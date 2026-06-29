// node scripts/process-logo.mjs
// Converts LabelNest Logo.jpg → transparent PNG, uploads to R2

import sharp from 'sharp'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const root  = join(__dir, '..')

function loadEnv(p) {
  try {
    for (const line of readFileSync(p, 'utf8').split('\n')) {
      const t = line.trim(); if (!t || t.startsWith('#')) continue
      const eq = t.indexOf('='); if (eq < 0) continue
      const k = t.slice(0, eq).trim()
      const v = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
      if (!process.env[k]) process.env[k] = v
    }
  } catch {}
}
loadEnv(join(root, '.env'))
loadEnv('C:/LabelNest/.env')

const R2 = new S3Client({
  region:   'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY_ID     ?? '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
  },
})
const BUCKET     = process.env.R2_BUCKET_NAME ?? 'labelnest'
const PUBLIC_URL = process.env.R2_PUBLIC_URL  ?? 'https://pub-a36a86a8b72a466f95980705b327476f.r2.dev'

const SRC = 'C:/LabelNest/NestLens/Files/LabelNest Logo.jpg'

async function main() {
  console.log('Processing logo…')

  // 1. Load the JPG, get raw RGBA data
  const img   = sharp(SRC)
  const meta  = await img.metadata()
  console.log(`  Original: ${meta.width}×${meta.height}`)

  // 2. Resize to a sensible nav width (keep aspect, width=480)
  const { data, info } = await sharp(SRC)
    .resize({ width: 480, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  console.log(`  Resized:  ${width}×${height}, channels=${channels}`)

  // 3. Make near-white pixels transparent (threshold 230/255)
  const buf = Buffer.from(data)
  for (let i = 0; i < buf.length; i += 4) {
    const r = buf[i], g = buf[i+1], b = buf[i+2]
    if (r > 230 && g > 230 && b > 230) {
      buf[i+3] = 0 // transparent
    }
  }

  // 4. Re-encode as PNG with transparency
  const pngBuf = await sharp(buf, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toBuffer()

  console.log(`  PNG size: ${(pngBuf.length / 1024).toFixed(1)} KB`)

  // 5. Upload both a 'dark' version (logo as-is, navy) and let CSS handle theming
  const key = 'brand/labelnest-logo.png'
  await R2.send(new PutObjectCommand({
    Bucket:       BUCKET,
    Key:          key,
    Body:         pngBuf,
    ContentType:  'image/png',
    CacheControl: 'public, max-age=31536000',
  }))

  const url = `${PUBLIC_URL}/${key}`
  console.log(`✓ Uploaded → ${url}`)
}

main().catch(e => { console.error(e); process.exit(1) })
