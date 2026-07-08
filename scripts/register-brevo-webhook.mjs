// One-off: registers the transactional webhook Brevo needs to call back into
// /api/webhooks/brevo with open/click/delivered/bounce events for newsletter
// sends. Safe to re-run — Brevo webhooks aren't deduped by URL, so check
// `node scripts/register-brevo-webhook.mjs --list` first if unsure whether
// one already exists before creating another.
//
// Requires BREVO_API_KEY to have the "Webhooks" permission scope (separate
// from "Transactional Emails / Send" — see Settings > SMTP & API > API Keys
// in the Brevo dashboard; the same key can lack this scope even if sending
// already works, per the 2026-07-08 scope incident).
//
// Usage:
//   node scripts/register-brevo-webhook.mjs          (create the webhook)
//   node scripts/register-brevo-webhook.mjs --list    (list existing webhooks)

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { randomBytes } from 'crypto'

const __dir = dirname(fileURLToPath(import.meta.url))
const envPath = join(__dir, '..', '.env')
try {
  const envContent = readFileSync(envPath, 'utf8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx < 0) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    process.env[key] = val
  }
} catch { /* .env not found — use existing process.env */ }

const apiKey = process.env.BREVO_API_KEY
if (!apiKey) { console.error('BREVO_API_KEY not set'); process.exit(1) }

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://labelnest.in'
const webhookUrl = `${siteUrl}/api/webhooks/brevo`

if (process.argv.includes('--list')) {
  const res = await fetch('https://api.brevo.com/v3/webhooks', {
    headers: { 'api-key': apiKey, accept: 'application/json' },
  })
  const data = await res.json()
  console.log(JSON.stringify(data, null, 2))
  process.exit(0)
}

const secret = process.env.BREVO_WEBHOOK_SECRET || randomBytes(24).toString('hex')

const res = await fetch('https://api.brevo.com/v3/webhooks', {
  method: 'POST',
  headers: { 'api-key': apiKey, 'Content-Type': 'application/json', accept: 'application/json' },
  body: JSON.stringify({
    url: webhookUrl,
    description: 'Newsletter open/click tracking',
    type: 'transactional',
    events: ['delivered', 'opened', 'uniqueOpened', 'click', 'hardBounce', 'softBounce', 'blocked', 'invalid', 'spam', 'unsubscribed'],
    auth: { type: 'bearer', token: secret },
  }),
})

const data = await res.json().catch(() => ({}))
if (!res.ok) {
  console.error('Failed to create webhook:', res.status, JSON.stringify(data))
  process.exit(1)
}

console.log('Webhook created:', JSON.stringify(data, null, 2))
if (!process.env.BREVO_WEBHOOK_SECRET) {
  console.log('')
  console.log('IMPORTANT — add this to .env (local) and Vercel project env vars (prod), it will not be shown again:')
  console.log(`BREVO_WEBHOOK_SECRET="${secret}"`)
}
