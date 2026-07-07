// Run: node scripts/migrate.mjs
// Creates all website_* tables in Neon (safe to run multiple times — uses IF NOT EXISTS)

import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))

// Load .env manually (no dotenv dep needed)
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

const url = process.env.NEON_DATABASE_URL
if (!url) { console.error('NEON_DATABASE_URL not set'); process.exit(1) }

const sql = neon(url)

async function migrate() {
  console.log('Running website migration...')

  await sql`
    CREATE TABLE IF NOT EXISTS website_admin_users (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email       TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      is_active   BOOLEAN NOT NULL DEFAULT true,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS website_briefings (
      id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug             TEXT NOT NULL UNIQUE,
      title            TEXT NOT NULL,
      summary          TEXT NOT NULL DEFAULT '',
      content          TEXT NOT NULL DEFAULT '',
      scope            TEXT NOT NULL DEFAULT '',
      date             DATE NOT NULL DEFAULT CURRENT_DATE,
      read_time        TEXT NOT NULL DEFAULT '5 min read',
      author_name      TEXT NOT NULL DEFAULT 'LabelNest',
      author_role      TEXT NOT NULL DEFAULT '',
      author_department TEXT NOT NULL DEFAULT '',
      cover_image      TEXT,
      hero_image       TEXT,
      is_featured      BOOLEAN NOT NULL DEFAULT false,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS website_team_members (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name        TEXT NOT NULL,
      role        TEXT NOT NULL,
      department  TEXT NOT NULL DEFAULT '',
      bio         TEXT,
      linkedin_url TEXT,
      image_url   TEXT,
      sort_order  INTEGER NOT NULL DEFAULT 0,
      is_active   BOOLEAN NOT NULL DEFAULT true,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS website_alumni (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name            TEXT NOT NULL,
      role            TEXT NOT NULL,
      department      TEXT NOT NULL DEFAULT '',
      cohort          TEXT,
      image_url       TEXT,
      linkedin_url    TEXT,
      now_at_company  TEXT,
      now_at_role     TEXT,
      now_at_url      TEXT,
      update_token    TEXT UNIQUE DEFAULT gen_random_uuid()::TEXT,
      is_active       BOOLEAN NOT NULL DEFAULT true,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS website_fellows (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name        TEXT NOT NULL,
      role        TEXT NOT NULL,
      cohort      TEXT NOT NULL DEFAULT '',
      department  TEXT,
      image_url   TEXT,
      linkedin_url TEXT,
      is_active   BOOLEAN NOT NULL DEFAULT true,
      sort_order  INTEGER NOT NULL DEFAULT 0,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  // Team member / fellow profile pages (slug, email, expertise tags, quote)
  await sql`ALTER TABLE website_team_members ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE`.catch(()=>{})
  await sql`ALTER TABLE website_team_members ADD COLUMN IF NOT EXISTS email TEXT`.catch(()=>{})
  await sql`ALTER TABLE website_team_members ADD COLUMN IF NOT EXISTS expertise TEXT[]`.catch(()=>{})
  await sql`ALTER TABLE website_team_members ADD COLUMN IF NOT EXISTS quote TEXT`.catch(()=>{})
  await sql`UPDATE website_team_members SET slug = lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g')) WHERE slug IS NULL`

  await sql`ALTER TABLE website_fellows ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE`.catch(()=>{})
  await sql`ALTER TABLE website_fellows ADD COLUMN IF NOT EXISTS bio TEXT`.catch(()=>{})
  await sql`ALTER TABLE website_fellows ADD COLUMN IF NOT EXISTS email TEXT`.catch(()=>{})
  await sql`ALTER TABLE website_fellows ADD COLUMN IF NOT EXISTS expertise TEXT[]`.catch(()=>{})
  await sql`ALTER TABLE website_fellows ADD COLUMN IF NOT EXISTS quote TEXT`.catch(()=>{})
  // 'active' = current cohort member, 'completed' = moved on but stays visible/permanent on /team
  await sql`ALTER TABLE website_fellows ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active'`.catch(()=>{})
  await sql`ALTER TABLE website_fellows ADD CONSTRAINT website_fellows_status_check CHECK (status IN ('active','completed'))`.catch(()=>{})
  await sql`UPDATE website_fellows SET slug = lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g')) WHERE slug IS NULL`

  await sql`
    CREATE TABLE IF NOT EXISTS website_interns (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name        TEXT NOT NULL,
      role        TEXT NOT NULL,
      cohort      TEXT NOT NULL DEFAULT '',
      image_url   TEXT,
      linkedin_url TEXT,
      slug        TEXT UNIQUE,
      is_active   BOOLEAN NOT NULL DEFAULT true,
      sort_order  INTEGER NOT NULL DEFAULT 0,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS website_products (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug        TEXT NOT NULL UNIQUE,
      name        TEXT NOT NULL,
      tagline     TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      status      TEXT NOT NULL DEFAULT 'live',
      url         TEXT,
      sort_order  INTEGER NOT NULL DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS website_job_openings (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title       TEXT NOT NULL,
      department  TEXT NOT NULL DEFAULT '',
      type        TEXT NOT NULL DEFAULT 'Full-time',
      location    TEXT NOT NULL DEFAULT 'Bangalore, India',
      complexity  TEXT NOT NULL DEFAULT 'Mid',
      apply_url   TEXT NOT NULL DEFAULT '',
      is_active   BOOLEAN NOT NULL DEFAULT true,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS website_legal_documents (
      id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug             TEXT NOT NULL UNIQUE,
      title            TEXT NOT NULL,
      intro            TEXT NOT NULL DEFAULT '',
      body_markdown    TEXT NOT NULL DEFAULT '',
      version          TEXT NOT NULL DEFAULT '1.0',
      effective_date   DATE NOT NULL DEFAULT CURRENT_DATE,
      last_updated     DATE NOT NULL DEFAULT CURRENT_DATE
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS website_page_seo (
      page_path   TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      og_image    TEXT,
      keywords    TEXT
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS website_newsletter_subscribers (
      id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email            TEXT NOT NULL UNIQUE,
      name             TEXT,
      source           TEXT NOT NULL DEFAULT 'website',
      status           TEXT NOT NULL DEFAULT 'active',
      subscribed_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      unsubscribed_at  TIMESTAMPTZ,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  // Add missing columns to existing deployments (safe — IF NOT EXISTS)
  await sql`ALTER TABLE website_newsletter_subscribers ADD COLUMN IF NOT EXISTS name TEXT`.catch(()=>{})
  await sql`ALTER TABLE website_newsletter_subscribers ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active'`.catch(()=>{})
  await sql`ALTER TABLE website_newsletter_subscribers ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMPTZ`.catch(()=>{})
  await sql`ALTER TABLE website_newsletter_subscribers ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.catch(()=>{})
  await sql`ALTER TABLE website_newsletter_subscribers ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.catch(()=>{})

  // Add missing columns to website_submissions
  await sql`ALTER TABLE website_submissions ADD COLUMN IF NOT EXISTS phone TEXT`.catch(()=>{})
  await sql`ALTER TABLE website_submissions ADD COLUMN IF NOT EXISTS metadata JSONB`.catch(()=>{})
  await sql`ALTER TABLE website_submissions ADD COLUMN IF NOT EXISTS is_read BOOLEAN NOT NULL DEFAULT false`.catch(()=>{})
  await sql`ALTER TABLE website_submissions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.catch(()=>{})

  await sql`
    CREATE TABLE IF NOT EXISTS website_submissions (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name        TEXT NOT NULL,
      email       TEXT NOT NULL,
      subject     TEXT NOT NULL DEFAULT '',
      message     TEXT NOT NULL,
      category    TEXT NOT NULL DEFAULT 'contact',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  console.log('✓ All website_* tables created (or already existed)')
  console.log('')
  console.log('Next: seed an admin user by running:')
  console.log('  node scripts/seed-admin.mjs your@email.com yourpassword')
}

migrate().catch(e => { console.error(e); process.exit(1) })
