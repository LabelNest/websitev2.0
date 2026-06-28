// Run: node scripts/seed.mjs
// 1. Adds missing columns/tables (idempotent — safe to re-run)
// 2. Seeds all website_* tables from lovable-extract/*.csv

import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { parse } from 'csv-parse/sync'

const __dir = dirname(fileURLToPath(import.meta.url))
const root = join(__dir, '..')
const EXTRACT = join(root, 'lovable-extract')

// ── Load .env ────────────────────────────────────────────────────────────────
function loadEnv(path) {
  try {
    const content = readFileSync(path, 'utf8')
    for (const line of content.split('\n')) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const eq = t.indexOf('=')
      if (eq < 0) continue
      const key = t.slice(0, eq).trim()
      const val = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
      if (!process.env[key]) process.env[key] = val
    }
  } catch { /* not found */ }
}
loadEnv(join(root, '.env'))
loadEnv('C:/LabelNest/.env')

const url = process.env.NEON_DATABASE_URL
if (!url) { console.error('NEON_DATABASE_URL not set'); process.exit(1) }
const sql = neon(url)

// ── Helpers ──────────────────────────────────────────────────────────────────
function readCSV(file) {
  const raw = readFileSync(join(EXTRACT, file), 'utf8')
  return parse(raw, { columns: true, skip_empty_lines: true, relax_quotes: true, relax_column_count: true })
}

const s = v => (v !== undefined && v !== '' ? v : null)
const b = v => v === 'true' || v === true
const n = v => (v !== undefined && v !== '' ? parseInt(v) || 0 : 0)

function parseDisplayDate(str) {
  if (!str) return null
  str = str.trim()
  if (!str) return null
  // ISO timestamps from Lovable: convert to "Mon YYYY"
  if (str.match(/^\d{4}-\d{2}-\d{2}T/)) {
    const d = new Date(str)
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
  }
  return str
}

function parseISODate(str) {
  if (!str) return null
  str = str.trim()
  if (!str) return null
  if (str.match(/^\d{4}-\d{2}-\d{2}T/)) return str.slice(0, 10)
  // "May 31, 2026" → "2026-05-31"
  const d = new Date(str)
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10)
  return null
}

// ── Step 1 — Schema migrations ────────────────────────────────────────────────
async function migrate() {
  console.log('\n─── Running schema migrations ───')

  // website_briefings: add missing columns + convert date to TEXT
  await sql`ALTER TABLE website_briefings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()`.catch(() => {})
  await sql`ALTER TABLE website_briefings ADD COLUMN IF NOT EXISTS tags TEXT DEFAULT ''`.catch(() => {})
  await sql`ALTER TABLE website_briefings ADD COLUMN IF NOT EXISTS meta_description TEXT`.catch(() => {})
  await sql`ALTER TABLE website_briefings ADD COLUMN IF NOT EXISTS cta_label TEXT`.catch(() => {})
  await sql`ALTER TABLE website_briefings ADD COLUMN IF NOT EXISTS cta_url TEXT`.catch(() => {})
  await sql`ALTER TABLE website_briefings ADD COLUMN IF NOT EXISTS accent_color TEXT`.catch(() => {})
  // Convert date column from DATE to TEXT (stores "Jun 27, 2026" style)
  await sql`ALTER TABLE website_briefings ALTER COLUMN date TYPE TEXT USING to_char(date, 'Mon DD, YYYY')`.catch(() => {})
  console.log('✓ website_briefings columns updated')

  // website_team_members: add slug, expertise, image_position_y, updated_at
  await sql`ALTER TABLE website_team_members ADD COLUMN IF NOT EXISTS slug TEXT`.catch(() => {})
  await sql`ALTER TABLE website_team_members ADD COLUMN IF NOT EXISTS expertise JSONB`.catch(() => {})
  await sql`ALTER TABLE website_team_members ADD COLUMN IF NOT EXISTS image_position_y INTEGER DEFAULT 50`.catch(() => {})
  await sql`ALTER TABLE website_team_members ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()`.catch(() => {})
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS website_team_members_slug_idx ON website_team_members(slug) WHERE slug IS NOT NULL`.catch(() => {})
  console.log('✓ website_team_members columns updated')

  // website_alumni: add sort_order, updated_at
  await sql`ALTER TABLE website_alumni ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0`.catch(() => {})
  await sql`ALTER TABLE website_alumni ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()`.catch(() => {})
  console.log('✓ website_alumni columns updated')

  // website_legal_documents: add is_published, sort_order, meta_description, updated_at; convert dates to TEXT
  await sql`ALTER TABLE website_legal_documents ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true`.catch(() => {})
  await sql`ALTER TABLE website_legal_documents ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0`.catch(() => {})
  await sql`ALTER TABLE website_legal_documents ADD COLUMN IF NOT EXISTS meta_description TEXT`.catch(() => {})
  await sql`ALTER TABLE website_legal_documents ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()`.catch(() => {})
  await sql`ALTER TABLE website_legal_documents ALTER COLUMN effective_date TYPE TEXT USING to_char(effective_date, 'Mon DD, YYYY')`.catch(() => {})
  await sql`ALTER TABLE website_legal_documents ALTER COLUMN last_updated TYPE TEXT USING to_char(last_updated, 'Mon DD, YYYY')`.catch(() => {})
  console.log('✓ website_legal_documents columns updated')

  // website_newsletter_subscribers: add name, status, tokens, timestamps
  await sql`ALTER TABLE website_newsletter_subscribers ADD COLUMN IF NOT EXISTS name TEXT`.catch(() => {})
  await sql`ALTER TABLE website_newsletter_subscribers ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active'`.catch(() => {})
  await sql`ALTER TABLE website_newsletter_subscribers ADD COLUMN IF NOT EXISTS unsubscribe_token TEXT`.catch(() => {})
  await sql`ALTER TABLE website_newsletter_subscribers ADD COLUMN IF NOT EXISTS brevo_contact_id INTEGER`.catch(() => {})
  await sql`ALTER TABLE website_newsletter_subscribers ADD COLUMN IF NOT EXISTS subscribed_at TIMESTAMPTZ`.catch(() => {})
  await sql`ALTER TABLE website_newsletter_subscribers ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMPTZ`.catch(() => {})
  await sql`ALTER TABLE website_newsletter_subscribers ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()`.catch(() => {})
  console.log('✓ website_newsletter_subscribers columns updated')

  // website_submissions: add phone, metadata, is_read
  await sql`ALTER TABLE website_submissions ADD COLUMN IF NOT EXISTS phone TEXT`.catch(() => {})
  await sql`ALTER TABLE website_submissions ADD COLUMN IF NOT EXISTS metadata JSONB`.catch(() => {})
  await sql`ALTER TABLE website_submissions ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT false`.catch(() => {})
  await sql`ALTER TABLE website_submissions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()`.catch(() => {})
  console.log('✓ website_submissions columns updated')

  // website_fellows: add updated_at
  await sql`ALTER TABLE website_fellows ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()`.catch(() => {})
  console.log('✓ website_fellows updated_at added')

  // website_page_seo: add id column (CSV has uuid, our table uses page_path as PK)
  await sql`ALTER TABLE website_page_seo ADD COLUMN IF NOT EXISTS id UUID DEFAULT gen_random_uuid()`.catch(() => {})
  await sql`ALTER TABLE website_page_seo ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()`.catch(() => {})
  console.log('✓ website_page_seo columns updated')

  // NEW: website_departments
  await sql`
    CREATE TABLE IF NOT EXISTS website_departments (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name       TEXT NOT NULL,
      parent_id  UUID REFERENCES website_departments(id) ON DELETE SET NULL,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
  console.log('✓ website_departments created')

  // NEW: website_newsletter_campaigns
  await sql`
    CREATE TABLE IF NOT EXISTS website_newsletter_campaigns (
      id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      subject          TEXT NOT NULL,
      template_name    TEXT,
      html_content     TEXT,
      recipient_count  INTEGER DEFAULT 0,
      recipient_filter TEXT DEFAULT 'all',
      brevo_message_id TEXT,
      status           TEXT DEFAULT 'sent',
      error_message    TEXT,
      sent_by          TEXT,
      sent_at          TIMESTAMPTZ,
      created_at       TIMESTAMPTZ DEFAULT NOW(),
      updated_at       TIMESTAMPTZ DEFAULT NOW()
    )
  `
  console.log('✓ website_newsletter_campaigns created')

  // NEW: website_newsletter_opens
  await sql`
    CREATE TABLE IF NOT EXISTS website_newsletter_opens (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      campaign_id   UUID REFERENCES website_newsletter_campaigns(id) ON DELETE CASCADE,
      subscriber_id UUID,
      opened_at     TIMESTAMPTZ DEFAULT NOW()
    )
  `
  console.log('✓ website_newsletter_opens created')

  // NEW: website_newsletter_clicks
  await sql`
    CREATE TABLE IF NOT EXISTS website_newsletter_clicks (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      campaign_id   UUID REFERENCES website_newsletter_campaigns(id) ON DELETE CASCADE,
      subscriber_id UUID,
      url           TEXT,
      clicked_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `
  console.log('✓ website_newsletter_clicks created')
}

// ── Step 2 — Seed functions ───────────────────────────────────────────────────
async function seedDepartments() {
  const rows = readCSV('departments.csv')
  console.log(`\nSeeding ${rows.length} departments...`)
  for (const r of rows) {
    await sql`
      INSERT INTO website_departments (id, name, parent_id, sort_order, created_at, updated_at)
      VALUES (
        ${r.id},
        ${r.name},
        ${s(r.parent_id)},
        ${n(r.sort_order)},
        ${r.created_at || 'NOW()'},
        ${r.updated_at || 'NOW()'}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        sort_order = EXCLUDED.sort_order,
        updated_at = NOW()
    `.catch(e => console.warn(`  skip dept ${r.name}: ${e.message}`))
  }
  console.log(`✓ Departments seeded`)
}

async function seedTeamMembers() {
  const rows = readCSV('team_members.csv')
  console.log(`\nSeeding ${rows.length} team members...`)
  for (const r of rows) {
    let expertise = null
    try { expertise = r.expertise ? JSON.parse(r.expertise) : null } catch { expertise = null }
    await sql`
      INSERT INTO website_team_members
        (id, slug, name, role, department, bio, linkedin_url, image_url, expertise, image_position_y, sort_order, is_active, created_at, updated_at)
      VALUES (
        ${r.id},
        ${s(r.slug)},
        ${r.name},
        ${r.role || ''},
        ${r.department || ''},
        ${s(r.bio)},
        ${s(r.linkedin)},
        ${s(r.image_url)},
        ${expertise ? JSON.stringify(expertise) : null},
        ${n(r.image_position_y) || 50},
        ${n(r.sort_order)},
        true,
        ${r.created_at || 'NOW()'},
        ${r.updated_at || 'NOW()'}
      )
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        name = EXCLUDED.name,
        role = EXCLUDED.role,
        department = EXCLUDED.department,
        bio = EXCLUDED.bio,
        linkedin_url = EXCLUDED.linkedin_url,
        image_url = EXCLUDED.image_url,
        expertise = EXCLUDED.expertise,
        image_position_y = EXCLUDED.image_position_y,
        sort_order = EXCLUDED.sort_order,
        updated_at = NOW()
    `.catch(e => console.warn(`  skip member ${r.name}: ${e.message}`))
  }
  console.log(`✓ Team members seeded`)
}

async function seedAlumni() {
  const rows = readCSV('alumni.csv')
  console.log(`\nSeeding ${rows.length} alumni...`)
  for (const r of rows) {
    // CSV: id, name, role, impact, sort_order
    // impact contains "description | cohort info" — use first part as department
    const dept = r.impact ? r.impact.split('|')[0].trim() : ''
    await sql`
      INSERT INTO website_alumni
        (id, name, role, department, sort_order, is_active, created_at, updated_at)
      VALUES (
        ${r.id},
        ${r.name},
        ${r.role || ''},
        ${dept},
        ${n(r.sort_order)},
        true,
        ${r.created_at || 'NOW()'},
        ${r.updated_at || 'NOW()'}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        role = EXCLUDED.role,
        department = EXCLUDED.department,
        sort_order = EXCLUDED.sort_order,
        updated_at = NOW()
    `.catch(e => console.warn(`  skip alumni ${r.name}: ${e.message}`))
  }
  console.log(`✓ Alumni seeded`)
}

async function seedFellows() {
  const rows = readCSV('fellows.csv')
  console.log(`\nSeeding ${rows.length} fellows...`)
  for (const r of rows) {
    // CSV: id, name, department (NestLabs/NestTech), sort_order
    const cohort = r.department === 'NestLabs' ? 'NestLabs · Cohort 1' : 'NestTech · Cohort 1'
    await sql`
      INSERT INTO website_fellows
        (id, name, role, cohort, department, sort_order, is_active, created_at, updated_at)
      VALUES (
        ${r.id},
        ${r.name},
        'Nestling Fellow',
        ${cohort},
        ${s(r.department)},
        ${n(r.sort_order)},
        true,
        ${r.created_at || 'NOW()'},
        ${r.updated_at || 'NOW()'}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        cohort = EXCLUDED.cohort,
        department = EXCLUDED.department,
        sort_order = EXCLUDED.sort_order,
        updated_at = NOW()
    `.catch(e => console.warn(`  skip fellow ${r.name}: ${e.message}`))
  }
  console.log(`✓ Fellows seeded`)
}

async function seedBriefings() {
  const rows = readCSV('briefings.csv')
  console.log(`\nSeeding ${rows.length} briefings...`)
  for (const r of rows) {
    await sql`
      INSERT INTO website_briefings
        (id, slug, title, summary, content, scope, date, read_time,
         author_name, author_role, author_department,
         cover_image, hero_image, is_featured,
         tags, meta_description, cta_label, cta_url, accent_color,
         created_at, updated_at)
      VALUES (
        ${r.id},
        ${r.slug},
        ${r.title},
        ${r.summary || ''},
        ${r.content || ''},
        ${r.scope || ''},
        ${parseDisplayDate(r.date) || r.date || ''},
        ${r.read_time || '5 min'},
        ${r.author_name || 'LabelNest'},
        ${r.author_role || ''},
        ${r.author_department || ''},
        ${s(r.cover_image)},
        ${s(r.hero_image)},
        ${b(r.is_featured)},
        ${r.tags || ''},
        ${s(r.meta_description)},
        ${s(r.cta_label)},
        ${s(r.cta_url)},
        ${s(r.accent_color)},
        ${r.created_at || 'NOW()'},
        ${r.updated_at || 'NOW()'}
      )
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        title = EXCLUDED.title,
        summary = EXCLUDED.summary,
        content = EXCLUDED.content,
        scope = EXCLUDED.scope,
        date = EXCLUDED.date,
        read_time = EXCLUDED.read_time,
        author_name = EXCLUDED.author_name,
        author_role = EXCLUDED.author_role,
        author_department = EXCLUDED.author_department,
        cover_image = EXCLUDED.cover_image,
        hero_image = EXCLUDED.hero_image,
        is_featured = EXCLUDED.is_featured,
        tags = EXCLUDED.tags,
        meta_description = EXCLUDED.meta_description,
        cta_label = EXCLUDED.cta_label,
        cta_url = EXCLUDED.cta_url,
        accent_color = EXCLUDED.accent_color,
        updated_at = NOW()
    `.catch(e => console.warn(`  skip briefing ${r.slug}: ${e.message}`))
  }
  console.log(`✓ Briefings seeded`)
}

async function seedLegalDocuments() {
  const rows = readCSV('legal_documents.csv')
  console.log(`\nSeeding ${rows.length} legal documents...`)
  for (const r of rows) {
    await sql`
      INSERT INTO website_legal_documents
        (id, slug, title, intro, body_markdown, version,
         effective_date, last_updated, is_published, sort_order, meta_description, updated_at)
      VALUES (
        ${r.id},
        ${r.slug},
        ${r.title},
        ${r.intro || ''},
        ${r.body_markdown || ''},
        ${r.version || 'v1.0'},
        ${parseISODate(r.effective_date) || r.effective_date || ''},
        ${parseISODate(r.last_updated) || r.last_updated || ''},
        ${b(r.is_published !== undefined ? r.is_published : 'true')},
        ${n(r.sort_order)},
        ${s(r.meta_description)},
        ${r.updated_at || 'NOW()'}
      )
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        title = EXCLUDED.title,
        intro = EXCLUDED.intro,
        body_markdown = EXCLUDED.body_markdown,
        version = EXCLUDED.version,
        effective_date = EXCLUDED.effective_date,
        last_updated = EXCLUDED.last_updated,
        is_published = EXCLUDED.is_published,
        sort_order = EXCLUDED.sort_order,
        meta_description = EXCLUDED.meta_description,
        updated_at = NOW()
    `.catch(e => console.warn(`  skip legal ${r.slug}: ${e.message}`))
  }
  console.log(`✓ Legal documents seeded`)
}

async function seedJobOpenings() {
  const rows = readCSV('job_openings.csv')
  console.log(`\nSeeding ${rows.length} job openings...`)
  for (const r of rows) {
    await sql`
      INSERT INTO website_job_openings
        (id, title, department, type, location, complexity, apply_url, is_active, created_at)
      VALUES (
        ${r.id},
        ${r.title},
        ${r.department || ''},
        ${r.type || 'Remote'},
        ${r.location || ''},
        ${r.complexity || 'High'},
        ${r.apply_url || ''},
        ${b(r.is_active)},
        ${r.created_at || 'NOW()'}
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        department = EXCLUDED.department,
        type = EXCLUDED.type,
        location = EXCLUDED.location,
        complexity = EXCLUDED.complexity,
        apply_url = EXCLUDED.apply_url,
        is_active = EXCLUDED.is_active
    `.catch(e => console.warn(`  skip job ${r.title}: ${e.message}`))
  }
  console.log(`✓ Job openings seeded`)
}

async function seedNewsletterSubscribers() {
  const rows = readCSV('newsletter_subscribers.csv')
  console.log(`\nSeeding ${rows.length} newsletter subscribers...`)
  for (const r of rows) {
    await sql`
      INSERT INTO website_newsletter_subscribers
        (id, email, name, source, status, unsubscribe_token, brevo_contact_id,
         subscribed_at, unsubscribed_at, updated_at)
      VALUES (
        ${r.id},
        ${r.email},
        ${s(r.name)},
        ${r.source || 'manual'},
        ${r.status || 'active'},
        ${s(r.unsubscribe_token)},
        ${r.brevo_contact_id ? parseInt(r.brevo_contact_id) : null},
        ${s(r.subscribed_at) || s(r.created_at)},
        ${s(r.unsubscribed_at)},
        ${r.updated_at || 'NOW()'}
      )
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        source = EXCLUDED.source,
        status = EXCLUDED.status,
        unsubscribe_token = COALESCE(website_newsletter_subscribers.unsubscribe_token, EXCLUDED.unsubscribe_token),
        brevo_contact_id = EXCLUDED.brevo_contact_id,
        subscribed_at = EXCLUDED.subscribed_at,
        updated_at = NOW()
    `.catch(e => console.warn(`  skip subscriber ${r.email}: ${e.message}`))
  }
  console.log(`✓ Newsletter subscribers seeded`)
}

async function seedNewsletterCampaigns() {
  const rows = readCSV('newsletter_campaigns.csv')
  console.log(`\nSeeding ${rows.length} newsletter campaigns...`)
  for (const r of rows) {
    await sql`
      INSERT INTO website_newsletter_campaigns
        (id, subject, template_name, html_content, recipient_count, recipient_filter,
         brevo_message_id, status, error_message, sent_by, sent_at, created_at, updated_at)
      VALUES (
        ${r.id},
        ${r.subject},
        ${s(r.template_name)},
        ${s(r.html_content)},
        ${n(r.recipient_count)},
        ${r.recipient_filter || 'all'},
        ${s(r.brevo_message_id)},
        ${r.status || 'sent'},
        ${s(r.error_message)},
        ${s(r.sent_by)},
        ${s(r.sent_at)},
        ${r.created_at || 'NOW()'},
        ${r.updated_at || 'NOW()'}
      )
      ON CONFLICT (id) DO UPDATE SET
        subject = EXCLUDED.subject,
        status = EXCLUDED.status,
        recipient_count = EXCLUDED.recipient_count,
        sent_at = EXCLUDED.sent_at,
        updated_at = NOW()
    `.catch(e => console.warn(`  skip campaign ${r.subject?.slice(0,30)}: ${e.message}`))
  }
  console.log(`✓ Newsletter campaigns seeded`)
}

async function seedNewsletterOpens() {
  const rows = readCSV('newsletter_opens.csv')
  console.log(`\nSeeding ${rows.length} newsletter opens...`)
  let ok = 0
  for (const r of rows) {
    await sql`
      INSERT INTO website_newsletter_opens (id, campaign_id, subscriber_id, opened_at)
      VALUES (${r.id}, ${s(r.campaign_id)}, ${s(r.subscriber_id)}, ${r.opened_at || 'NOW()'})
      ON CONFLICT (id) DO NOTHING
    `.then(() => ok++).catch(() => {})
  }
  console.log(`✓ Newsletter opens seeded (${ok}/${rows.length})`)
}

async function seedNewsletterClicks() {
  const rows = readCSV('newsletter_clicks.csv')
  console.log(`\nSeeding ${rows.length} newsletter clicks...`)
  let ok = 0
  for (const r of rows) {
    await sql`
      INSERT INTO website_newsletter_clicks (id, campaign_id, subscriber_id, url, clicked_at)
      VALUES (${r.id}, ${s(r.campaign_id)}, ${s(r.subscriber_id)}, ${s(r.url)}, ${r.clicked_at || 'NOW()'})
      ON CONFLICT (id) DO NOTHING
    `.then(() => ok++).catch(() => {})
  }
  console.log(`✓ Newsletter clicks seeded (${ok}/${rows.length})`)
}

async function seedPageSEO() {
  const rows = readCSV('page_seo.csv')
  console.log(`\nSeeding ${rows.length} page SEO records...`)
  for (const r of rows) {
    // CSV: page_path, keywords, og_image, custom_title, custom_description
    await sql`
      INSERT INTO website_page_seo (page_path, title, description, og_image, keywords)
      VALUES (
        ${r.page_path},
        ${r.custom_title || ''},
        ${r.custom_description || ''},
        ${s(r.og_image)},
        ${s(r.keywords)}
      )
      ON CONFLICT (page_path) DO UPDATE SET
        title = COALESCE(NULLIF(EXCLUDED.title,''), website_page_seo.title),
        description = COALESCE(NULLIF(EXCLUDED.description,''), website_page_seo.description),
        og_image = EXCLUDED.og_image,
        keywords = EXCLUDED.keywords
    `.catch(e => console.warn(`  skip seo ${r.page_path}: ${e.message}`))
  }
  console.log(`✓ Page SEO seeded`)
}

async function seedSubmissions() {
  const rows = readCSV('submissions.csv')
  console.log(`\nSeeding ${rows.length} submissions...`)
  let ok = 0
  for (const r of rows) {
    let metadata = null
    try { metadata = r.metadata ? JSON.parse(r.metadata) : null } catch { metadata = null }
    await sql`
      INSERT INTO website_submissions
        (id, category, name, email, phone, subject, message, metadata, is_read, created_at)
      VALUES (
        ${r.id},
        ${r.category || 'contact'},
        ${r.name || ''},
        ${r.email || ''},
        ${s(r.phone)},
        ${r.subject || ''},
        ${r.message || ''},
        ${metadata ? JSON.stringify(metadata) : null},
        ${b(r.is_read)},
        ${r.created_at || 'NOW()'}
      )
      ON CONFLICT (id) DO NOTHING
    `.then(() => ok++).catch(() => {})
  }
  console.log(`✓ Submissions seeded (${ok}/${rows.length})`)
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('LabelNest website seed script')
  console.log('==============================')

  await migrate()

  console.log('\n─── Seeding tables ───')
  await seedDepartments()
  await seedTeamMembers()
  await seedAlumni()
  await seedFellows()
  await seedBriefings()
  await seedLegalDocuments()
  await seedJobOpenings()
  await seedNewsletterSubscribers()
  await seedNewsletterCampaigns()
  await seedNewsletterOpens()
  await seedNewsletterClicks()
  await seedPageSEO()
  await seedSubmissions()

  console.log('\n==============================')
  console.log('✓ Seed complete')
}

main().catch(e => { console.error('Fatal:', e); process.exit(1) })
