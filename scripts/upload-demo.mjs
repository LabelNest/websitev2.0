// node scripts/upload-demo.mjs "<video file>" <slug> [poster image]
// Uploads a demo video (and optional poster) to the public R2 bucket under demos/
// and prints the shareable page URL. Never overwrites: the next free version
// (-v1, -v2, ...) is used, so already-shared links keep their exact file.
// If ffmpeg is on PATH the video is re-encoded to web-friendly H.264 first
// (faststart, so playback begins before the whole file downloads); otherwise it is
// uploaded as-is.

import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { readFileSync, existsSync, statSync, mkdtempSync } from 'fs'
import { spawnSync } from 'child_process'
import { tmpdir } from 'os'
import { dirname, join, extname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const root = join(__dir, '..')

function loadEnv(path) {
  try {
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const eq = t.indexOf('=')
      if (eq < 0) continue
      const key = t.slice(0, eq).trim()
      const val = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
      if (!process.env[key]) process.env[key] = val
    }
  } catch {}
}
loadEnv(join(root, '.env'))
loadEnv('C:/LabelNest/.env')

const [file, slug, poster] = process.argv.slice(2)
if (!file || !slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('Usage: node scripts/upload-demo.mjs "<video file>" <slug> [poster image]\n  slug: lowercase letters, digits and hyphens')
  process.exit(1)
}
if (!existsSync(file)) { console.error(`File not found: ${file}`); process.exit(1) }

const BUCKET = process.env.R2_BUCKET_NAME ?? process.env.R2_BUCKET ?? 'labelnest'
const PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? 'https://pub-a36a86a8b72a466f95980705b327476f.r2.dev').replace(/\/$/, '')
const R2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
  },
})

async function exists(key) {
  try { await R2.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key })); return true } catch { return false }
}

let version = 1
while (await exists(`demos/${slug}-v${version}.mp4`)) version++
const videoKey = `demos/${slug}-v${version}.mp4`

let uploadPath = file
const hasFfmpeg = spawnSync('ffmpeg', ['-version']).status === 0
if (hasFfmpeg) {
  const out = join(mkdtempSync(join(tmpdir(), 'demo-')), 'out.mp4')
  console.log('Re-encoding with ffmpeg...')
  const r = spawnSync('ffmpeg', ['-y', '-i', file, '-c:v', 'libx264', '-crf', '23', '-preset', 'slow',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', out], { stdio: 'inherit' })
  if (r.status === 0) uploadPath = out
  else console.warn('ffmpeg failed, uploading the original file.')
} else {
  console.log('ffmpeg not found, uploading the original file as-is.')
}

const IMMUTABLE = 'public, max-age=31536000, immutable'
const mb = (p) => (statSync(p).size / 1048576).toFixed(1)

console.log(`Uploading ${mb(uploadPath)} MB to ${videoKey} ...`)
await R2.send(new PutObjectCommand({
  Bucket: BUCKET, Key: videoKey, Body: readFileSync(uploadPath),
  ContentType: 'video/mp4', CacheControl: IMMUTABLE,
}))

let posterKey = null
if (poster) {
  const ext = extname(poster).toLowerCase()
  const type = ext === '.png' ? 'image/png' : 'image/jpeg'
  posterKey = `demos/${slug}-v${version}-poster${ext === '.png' ? '.png' : '.jpg'}`
  await R2.send(new PutObjectCommand({
    Bucket: BUCKET, Key: posterKey, Body: readFileSync(poster),
    ContentType: type, CacheControl: IMMUTABLE,
  }))
}

console.log('\nDone.')
console.log(`  Raw video : ${PUBLIC_URL}/${videoKey}`)
if (posterKey) console.log(`  Poster    : ${PUBLIC_URL}/${posterKey}`)
console.log(`  Page URL  : https://labelnest.in/demo/${slug}`)
console.log(`\nIn src/lib/demos.ts set  videoKey: '${videoKey}'${posterKey ? `  posterKey: '${posterKey}'` : ''}`)
