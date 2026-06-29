// node scripts/upload-legal-to-r2.mjs
// Reads all legal docs from Neon, uploads each as a styled HTML file to R2,
// then stores the r2_url back in website_legal_documents.

import { neon } from '@neondatabase/serverless'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
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

const sql = neon(process.env.NEON_DATABASE_URL)

const R2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
  },
})
const BUCKET = process.env.R2_BUCKET_NAME ?? process.env.R2_BUCKET ?? 'labelnest'
const PUBLIC_URL = process.env.R2_PUBLIC_URL ?? 'https://assets.labelnest.in'

// Resolve {{token}} placeholders — sourced from legal_settings.csv
const TOKENS = {
  '{{company_name}}':    'LabelNest India Private Limited',
  '{{address}}':         'No. 33, 4th Floor, 1st Main, CBI Main Rd, HMT Layout, Ganganagar, Bengaluru, Karnataka, India 560032',
  '{{support_email}}':   'contact@labelnest.in',
  '{{privacy_email}}':   'privacy@labelnest.in',
  '{{ops_email}}':       'ops@labelnest.in',
  '{{nestlens_email}}':  'nestlens@labelnest.in',
  '{{hr_email}}':        'hr@labelnest.in',
  '{{nesthr_email}}':    'nesthr@labelnest.in',
  '{{legal_email}}':     'contact@labelnest.in',
  '{{governing_law}}':   'Laws of Karnataka, India',
  '{{jurisdiction}}':    'Courts of Bengaluru, Karnataka, India',
  '{{website_url}}':     'https://labelnest.in',
}

function resolveTokens(text) {
  let out = text ?? ''
  for (const [tok, val] of Object.entries(TOKENS)) {
    out = out.replaceAll(tok, val)
  }
  return out
}

// Markdown → HTML (minimal — handles headings, bold, lists, ---  )
function mdToHtml(md) {
  if (!md) return ''
  // If content already looks like HTML, return as-is
  if (md.trim().startsWith('<')) return md

  return md
    .replace(/\r\n/g, '\n')
    .split('\n\n')
    .map(block => {
      const lines = block.trim().split('\n')
      // Heading
      if (lines[0].startsWith('## ')) return `<h2>${lines[0].slice(3)}</h2>${lines.slice(1).map(l => mdLine(l)).join('\n')}`
      if (lines[0].startsWith('### ')) return `<h3>${lines[0].slice(4)}</h3>${lines.slice(1).map(l => mdLine(l)).join('\n')}`
      if (lines[0].startsWith('# ')) return `<h1>${lines[0].slice(2)}</h1>${lines.slice(1).map(l => mdLine(l)).join('\n')}`
      // HR
      if (lines[0].match(/^---+$/)) return '<hr>'
      // Unordered list
      if (lines.every(l => l.startsWith('- ') || l.startsWith('* '))) {
        return `<ul>${lines.map(l => `<li>${mdInline(l.slice(2))}</li>`).join('')}</ul>`
      }
      // Ordered list
      if (lines.every(l => l.match(/^\d+\. /))) {
        return `<ol>${lines.map(l => `<li>${mdInline(l.replace(/^\d+\. /, ''))}</li>`).join('')}</ol>`
      }
      // Paragraph
      return `<p>${lines.map(l => mdInline(l)).join('<br>')}</p>`
    })
    .join('\n')
}

function mdLine(l) {
  if (!l.trim()) return ''
  if (l.startsWith('- ') || l.startsWith('* ')) return `<li>${mdInline(l.slice(2))}</li>`
  return mdInline(l)
}

function mdInline(t) {
  return t
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
}

function buildHtml(doc) {
  const body = resolveTokens(doc.body_markdown ?? '')
  const bodyHtml = mdToHtml(body)
  const intro = resolveTokens(doc.intro ?? '')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${doc.title} — LabelNest</title>
<meta name="description" content="${(doc.meta_description ?? doc.intro ?? '').replace(/"/g, '&quot;').slice(0, 160)}">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0a0a0b; --surface: #111113; --border: rgba(255,255,255,.08);
    --text: #f4f4f5; --text2: #a1a1aa; --text3: #71717a;
    --pink: #E91E8C; --blue: #2563EB; --green: #10B981;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  body { background: var(--bg); color: var(--text); min-height: 100vh; }
  .wrap { max-width: 800px; margin: 0 auto; padding: 48px 24px 96px; }
  header { padding: 16px 0 48px; border-bottom: 1px solid var(--border); margin-bottom: 40px; }
  .brand { font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: 20px; font-weight: 800; color: var(--text); text-decoration: none; letter-spacing: -.02em; }
  .brand span { color: var(--pink); }
  .tag { display: inline-block; font-size: 10px; letter-spacing: .1em; text-transform: uppercase; padding: 3px 9px; border-radius: 4px; background: rgba(233,30,140,.1); color: var(--pink); margin-top: 32px; margin-bottom: 14px; }
  h1.title { font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: clamp(28px, 5vw, 42px); font-weight: 800; letter-spacing: -.04em; line-height: 1.1; margin-bottom: 16px; }
  .meta { display: flex; gap: 24px; flex-wrap: wrap; font-size: 12px; color: var(--text3); font-family: 'JetBrains Mono', monospace; margin-bottom: 28px; }
  .intro { font-size: 16px; line-height: 1.75; color: var(--text2); padding: 20px 24px; background: var(--surface); border: 1px solid var(--border); border-left: 3px solid var(--pink); border-radius: 10px; margin-bottom: 36px; }
  .content h1 { font-size: 26px; font-weight: 800; margin: 36px 0 12px; letter-spacing: -.03em; color: var(--text); }
  .content h2 { font-size: 20px; font-weight: 700; margin: 32px 0 10px; letter-spacing: -.02em; color: var(--text); padding-bottom: 8px; border-bottom: 1px solid var(--border); }
  .content h3 { font-size: 15px; font-weight: 600; margin: 24px 0 8px; color: var(--text); }
  .content p { font-size: 14.5px; line-height: 1.8; color: var(--text2); margin-bottom: 14px; }
  .content ul, .content ol { padding-left: 22px; margin-bottom: 14px; }
  .content li { font-size: 14px; line-height: 1.75; color: var(--text2); margin-bottom: 4px; }
  .content strong { color: var(--text); font-weight: 600; }
  .content a { color: var(--pink); text-decoration: none; }
  .content a:hover { text-decoration: underline; }
  .content code { font-family: 'JetBrains Mono', monospace; font-size: 12px; background: rgba(255,255,255,.06); padding: 2px 6px; border-radius: 4px; color: var(--green); }
  .content hr { border: none; border-top: 1px solid var(--border); margin: 28px 0; }
  footer { margin-top: 64px; padding-top: 24px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
  footer span { font-size: 12px; color: var(--text3); }
  footer a { font-size: 12px; color: var(--text3); text-decoration: none; }
  footer a:hover { color: var(--text); }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <a class="brand" href="https://labelnest.in">Label<span>Nest</span></a>
  </header>
  <div class="tag">Legal</div>
  <h1 class="title">${doc.title}</h1>
  <div class="meta">
    <span>Version ${doc.version ?? 'v1.0'}</span>
    ${doc.effective_date ? `<span>Effective: ${doc.effective_date}</span>` : ''}
    ${doc.last_updated ? `<span>Last updated: ${doc.last_updated}</span>` : ''}
  </div>
  ${intro ? `<div class="intro">${intro}</div>` : ''}
  <div class="content">
    ${bodyHtml}
  </div>
  <footer>
    <span>© 2026 LabelNest Technologies Pvt Ltd</span>
    <a href="https://labelnest.in/legal">All legal documents →</a>
  </footer>
</div>
</body>
</html>`
}

async function main() {
  console.log('LabelNest — Upload legal docs to R2')
  console.log('=====================================')

  // Add r2_url column if missing
  await sql`ALTER TABLE website_legal_documents ADD COLUMN IF NOT EXISTS r2_url TEXT`.catch(() => {})
  console.log('✓ r2_url column ready')

  const docs = await sql`SELECT * FROM website_legal_documents WHERE is_published = true ORDER BY sort_order`
  console.log(`Found ${docs.length} published legal docs\n`)

  for (const doc of docs) {
    const html = buildHtml(doc)
    const key = `legal/${doc.slug}.html`

    try {
      await R2.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: Buffer.from(html, 'utf8'),
        ContentType: 'text/html; charset=utf-8',
        CacheControl: 'public, max-age=86400',
      }))

      const r2_url = `${PUBLIC_URL}/${key}`
      await sql`UPDATE website_legal_documents SET r2_url = ${r2_url}, updated_at = NOW() WHERE id = ${doc.id}`
      console.log(`✓ ${doc.slug.padEnd(30)} → ${r2_url}`)
    } catch (e) {
      console.error(`✗ ${doc.slug}: ${e.message}`)
    }
  }

  console.log('\n=====================================')
  console.log('✓ Done')
}

main().catch(e => { console.error('Fatal:', e); process.exit(1) })
