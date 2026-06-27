// Run: node scripts/seed-admin.mjs your@email.com yourpassword
// Creates an admin user in website_admin_users with bcrypt password hash

import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createHash, randomBytes } from 'crypto'

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
} catch { /* ignore */ }

const [,, email, password] = process.argv
if (!email || !password) {
  console.error('Usage: node scripts/seed-admin.mjs email@example.com yourpassword')
  process.exit(1)
}

const url = process.env.NEON_DATABASE_URL
if (!url) { console.error('NEON_DATABASE_URL not set'); process.exit(1) }
const sql = neon(url)

async function seedAdmin() {
  const bcrypt = await import('bcryptjs')
  const hash = await bcrypt.hash(password, 12)
  await sql`
    INSERT INTO website_admin_users (email, password_hash)
    VALUES (${email.toLowerCase()}, ${hash})
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
  `
  console.log(`✓ Admin user created/updated: ${email}`)
}

seedAdmin().catch(e => { console.error(e); process.exit(1) })
