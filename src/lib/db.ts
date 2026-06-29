import { neon } from '@neondatabase/serverless'

// neon() does not connect at import time — error surfaces at first query
export const sql = neon(process.env.NEON_DATABASE_URL!)

// ── Types matching website_ tables ──────────────────────────────────────────

export interface Briefing {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  scope: string
  date: string
  read_time: string
  author_name: string
  author_role: string
  author_department: string
  cover_image: string | null
  hero_image: string | null
  is_featured: boolean
  created_at: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  bio: string | null
  linkedin_url: string | null
  image_url: string | null
  sort_order: number
  is_active: boolean
}

export interface Alumni {
  id: string
  name: string
  role: string
  department: string
  cohort: string | null
  email: string | null
  image_url: string | null
  linkedin_url: string | null
  now_at_type: string | null
  now_at_company: string | null
  now_at_role: string | null
  now_at_url: string | null
  update_token: string | null
  is_active: boolean
}

export interface Fellow {
  id: string
  name: string
  role: string
  cohort: string
  department: string | null
  image_url: string | null
  linkedin_url: string | null
  is_active: boolean
  sort_order: number
}

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  status: string
  url: string | null
  sort_order: number
}

export interface JobOpening {
  id: string
  title: string
  department: string
  type: string
  location: string
  complexity: string
  apply_url: string
  is_active: boolean
}

export interface LegalDocument {
  id: string
  slug: string
  title: string
  intro: string
  body_markdown: string
  version: string
  effective_date: string
  last_updated: string
  r2_url: string | null
}

export interface PageSEO {
  page_path: string
  title: string
  description: string
  og_image: string | null
  keywords: string | null
}

// ── Query helpers ────────────────────────────────────────────────────────────

export async function getBriefings(): Promise<Briefing[]> {
  const rows = await sql`
    SELECT * FROM website_briefings
    ORDER BY date DESC
  `
  return rows as Briefing[]
}

export async function getBriefingBySlug(slug: string): Promise<Briefing | null> {
  const rows = await sql`
    SELECT * FROM website_briefings
    WHERE slug = ${slug}
    LIMIT 1
  `
  return (rows[0] as Briefing) ?? null
}

export async function getFeaturedBriefings(): Promise<Briefing[]> {
  const rows = await sql`
    SELECT * FROM website_briefings
    WHERE is_featured = true
    ORDER BY date DESC
  `
  return rows as Briefing[]
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const rows = await sql`
    SELECT * FROM website_team_members
    WHERE is_active = true
    ORDER BY sort_order ASC
  `
  return rows as TeamMember[]
}

export async function getAlumni(): Promise<Alumni[]> {
  const rows = await sql`
    SELECT * FROM website_alumni
    ORDER BY name ASC
  `
  return rows as Alumni[]
}

export async function getFellows(): Promise<Fellow[]> {
  const rows = await sql`
    SELECT * FROM website_fellows
    WHERE is_active = true
    ORDER BY cohort ASC, sort_order ASC
  `
  return rows as Fellow[]
}

export async function getProducts(): Promise<Product[]> {
  const rows = await sql`
    SELECT * FROM website_products
    ORDER BY sort_order ASC
  `
  return rows as Product[]
}

export async function getActiveJobs(): Promise<JobOpening[]> {
  const rows = await sql`
    SELECT * FROM website_job_openings
    WHERE is_active = true
    ORDER BY created_at DESC
  `
  return rows as JobOpening[]
}

export async function getLegalDocuments(): Promise<LegalDocument[]> {
  const rows = await sql`
    SELECT id, slug, title, intro, version, effective_date, last_updated, r2_url
    FROM website_legal_documents
    ORDER BY slug ASC
  `
  return rows as LegalDocument[]
}

export async function getLegalDocBySlug(slug: string): Promise<LegalDocument | null> {
  const rows = await sql`
    SELECT * FROM website_legal_documents
    WHERE slug = ${slug}
    LIMIT 1
  `
  return (rows[0] as LegalDocument) ?? null
}

export async function getPageSEO(path: string): Promise<PageSEO | null> {
  const rows = await sql`
    SELECT * FROM website_page_seo
    WHERE page_path = ${path}
    LIMIT 1
  `
  return (rows[0] as PageSEO) ?? null
}

export async function getAlumniByToken(token: string): Promise<Alumni | null> {
  const rows = await sql`
    SELECT * FROM website_alumni
    WHERE update_token = ${token}
    LIMIT 1
  `
  return (rows[0] as Alumni) ?? null
}

export async function updateAlumniNowAt(
  id: string,
  company: string,
  role: string,
  url: string | null,
  imageUrl?: string | null,
  nowAtType?: string
): Promise<void> {
  if (imageUrl !== undefined) {
    await sql`
      UPDATE website_alumni
      SET now_at_company = ${company}, now_at_role = ${role}, now_at_url = ${url},
          now_at_type = ${nowAtType ?? 'working'}, image_url = ${imageUrl}, updated_at = NOW()
      WHERE id = ${id}
    `
  } else {
    await sql`
      UPDATE website_alumni
      SET now_at_company = ${company}, now_at_role = ${role}, now_at_url = ${url},
          now_at_type = ${nowAtType ?? 'working'}, updated_at = NOW()
      WHERE id = ${id}
    `
  }
}
