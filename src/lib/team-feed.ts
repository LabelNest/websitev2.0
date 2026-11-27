// The public team feed. NestHR is the source of truth for who is on the team page: each person's website
// profile is set in NestHR and approved there by HR/Admin, and only approved people are in the feed.
// The feed carries public fields only (no email, grade or employee code). The website tables
// (website_team_members, website_alumni) are a fallback so /team never goes blank if the feed is down or empty.

import { getAlumni, getTeamMembers } from '@/lib/db'

export interface FeedPerson {
  slug: string
  name: string
  photo_url: string | null
  job_title: string
  business_unit: string
  department: string
  is_leader: boolean
  sort: number
  bio: string | null
  linkedin_url: string | null
  skills: string[]
  status: 'current' | 'alumni'
  joined_year: number | null
  left_year: number | null
}

export interface TeamData {
  people: FeedPerson[]
  source: 'nesthr' | 'fallback'
}

// Default: the NestHR edge function. Override with NESTHR_TEAM_FEED_URL.
const DEFAULT_FEED_URL = 'https://nqwvepnoadbfwrvkcjqh.supabase.co/functions/v1/website-team'

const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '')
const optStr = (v: unknown): string | null => str(v) || null
const optYear = (v: unknown): number | null => (typeof v === 'number' && Number.isInteger(v) && v > 1900 && v < 2200 ? v : null)
const httpsOnly = (v: unknown): string | null => {
  const s = str(v)
  return /^https?:\/\//i.test(s) ? s : null
}

// Reads one person defensively: anything malformed is dropped, never thrown, so a bad row cannot take the page down.
export function parsePerson(raw: unknown): FeedPerson | null {
  if (typeof raw !== 'object' || raw === null) return null
  const r = raw as Record<string, unknown>
  const slug = str(r['slug']).toLowerCase()
  const name = str(r['name'])
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug) || !name) return null
  const status = r['status'] === 'alumni' ? 'alumni' : 'current'
  const skills = Array.isArray(r['skills']) ? r['skills'].map(str).filter(Boolean).slice(0, 12) : []
  return {
    slug,
    name,
    photo_url: httpsOnly(r['photo_url']),
    job_title: str(r['job_title']),
    business_unit: str(r['business_unit']),
    department: str(r['department']),
    is_leader: r['is_leader'] === true,
    sort: typeof r['sort'] === 'number' && Number.isFinite(r['sort']) ? r['sort'] : 999,
    bio: optStr(r['bio'])?.slice(0, 600) ?? null,
    linkedin_url: optStr(r['linkedin_url']),
    skills,
    status,
    joined_year: optYear(r['joined_year']),
    left_year: optYear(r['left_year']),
  }
}

export function parseFeed(body: unknown): FeedPerson[] {
  if (typeof body !== 'object' || body === null) return []
  const list = (body as Record<string, unknown>)['people']
  if (!Array.isArray(list)) return []
  const seen = new Set<string>()
  const out: FeedPerson[] = []
  for (const item of list) {
    const p = parsePerson(item)
    if (!p || seen.has(p.slug)) continue
    seen.add(p.slug)
    out.push(p)
  }
  return out
}

async function loadFeed(): Promise<FeedPerson[]> {
  // Local screenshots only: a fixture instead of the live feed.
  if (process.env['TEAM_FEED_FIXTURE'] === '1') {
    const fx = await import('./team-feed.fixture')
    return parseFeed(fx.FIXTURE)
  }
  const url = process.env['NESTHR_TEAM_FEED_URL'] || DEFAULT_FEED_URL
  try {
    const res = await fetch(url, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(6000) })
    if (!res.ok) return []
    return parseFeed(await res.json())
  } catch {
    return []
  }
}

async function loadFallback(): Promise<FeedPerson[]> {
  const [team, alumni] = await Promise.all([getTeamMembers().catch(() => []), getAlumni().catch(() => [])])
  const current: FeedPerson[] = team.flatMap((m): FeedPerson[] => m.slug ? [{
    slug: m.slug, name: m.name, photo_url: httpsOnly(m.image_url), job_title: m.role, business_unit: '',
    department: m.department, is_leader: m.department === 'Founder', sort: m.sort_order, bio: m.bio,
    linkedin_url: m.linkedin_url, skills: m.expertise ?? [], status: 'current', joined_year: null, left_year: null,
  }] : [])
  void alumni // alumni keep their own grid (with self-serve "Now at") when the feed has none
  return current
}

export async function getTeamData(): Promise<TeamData> {
  const feed = await loadFeed()
  if (feed.some(p => p.status === 'current')) return { people: feed, source: 'nesthr' }
  return { people: await loadFallback(), source: 'fallback' }
}

export async function getPersonBySlug(slug: string): Promise<FeedPerson | null> {
  const { people } = await getTeamData()
  return people.find(p => p.slug === slug) ?? null
}

// ---- Grouping -------------------------------------------------------------------------------------------------

export const MANAGEMENT = 'Management'

export const BU_INFO: Record<string, { blurb: string; accent: string }> = {
  Venture: { blurb: 'Helps founders get ready, get funded and get found: the incubator, the ecosystem and the growth engine behind it.', accent: '#7A5217' },
  'Private Markets': { blurb: 'The data, research and products behind Atlas, Observatory, Intelligence and Command.', accent: '#1F3A5F' },
  Risk: { blurb: 'Sentinel: the methodologies, models and monitoring that put a number on private-markets risk.', accent: '#9A4B1F' },
  'Corporate Operations': { blurb: 'The shared services that keep every unit running: strategy, finance, people, legal, technology and admin.', accent: '#5B3A6B' },
  [MANAGEMENT]: { blurb: 'The founders and leadership of LabelNest.', accent: '#2C6B4B' },
}
const BU_ORDER = ['Venture', 'Private Markets', 'Risk', 'Corporate Operations']
export const UNPLACED = 'The team'

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const byOrder = (a: FeedPerson, b: FeedPerson) => a.sort - b.sort || a.name.localeCompare(b.name)

export interface DeptGroup { department: string; leads: FeedPerson[]; members: FeedPerson[] }
export interface BuGroup { name: string; slug: string; accent: string; blurb: string; departments: DeptGroup[]; count: number }

export function groupTeam(people: FeedPerson[]): { management: FeedPerson[]; units: BuGroup[] } {
  const current = people.filter(p => p.status === 'current').sort(byOrder)
  const management = current.filter(p => p.business_unit === MANAGEMENT)
  const rest = current.filter(p => p.business_unit !== MANAGEMENT)

  const names = [...new Set(rest.map(p => p.business_unit || UNPLACED))]
  names.sort((a, b) => {
    const ia = BU_ORDER.indexOf(a), ib = BU_ORDER.indexOf(b)
    return (ia < 0 ? 50 : ia) - (ib < 0 ? 50 : ib) || a.localeCompare(b)
  })

  const units: BuGroup[] = names.map(name => {
    const inUnit = rest.filter(p => (p.business_unit || UNPLACED) === name)
    const deptNames = [...new Set(inUnit.map(p => p.department || ''))]
    // Departments ordered by their most senior (lowest sort) person; people with no department last.
    deptNames.sort((a, b) => {
      if (!a !== !b) return a ? -1 : 1
      const min = (d: string) => Math.min(...inUnit.filter(p => (p.department || '') === d).map(p => p.sort))
      return min(a) - min(b) || a.localeCompare(b)
    })
    const departments = deptNames.map(d => {
      const inDept = inUnit.filter(p => (p.department || '') === d)
      return { department: d, leads: inDept.filter(p => p.is_leader), members: inDept.filter(p => !p.is_leader) }
    })
    const info = BU_INFO[name]
    return { name, slug: slugify(name), accent: info?.accent ?? '#8985A6', blurb: info?.blurb ?? '', departments, count: inUnit.length }
  })
  return { management, units }
}
