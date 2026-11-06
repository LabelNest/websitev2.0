// One source for every price on the site: NestLens's own public plan catalog
// (the same endpoint the in-app checkout reads). Change a plan in the NestLens admin
// and it reaches this site within minutes. Nothing here is a hand-typed price except
// FALLBACK, which is only shown if NestLens cannot be reached.

export interface ApiPlan {
  name: string
  billing?: string // 'year' | 'month' | 'custom'
  popular?: boolean
  priceINR?: number
  priceUSD?: number | string
  monthlyPriceINR?: number | null
  monthlyPriceUSD?: number | null
  seats?: number
  creditsPerMonth?: number
  exportsPerMonth?: number
  jobPostsIncluded?: number
  applicationsPerMonth?: number
  creditRolloverCap?: number | null
  dataRoomsIncluded?: number
  mentorConnectsIncluded?: number
  readinessAuditsIncluded?: number
  isCustomPricing?: boolean
  tag?: string
}

export interface PlanCatalog {
  intelligence: Record<string, ApiPlan>
  exchange: Record<string, ApiPlan>
  cr: Record<string, ApiPlan>
}

const FALLBACK: PlanCatalog = {
  intelligence: {
    atlas_basic: { name: 'Atlas Basic', billing: 'year', priceINR: 173556, priceUSD: '1800', seats: 1, exportsPerMonth: 1000 },
    atlas_starter: { name: 'Atlas Starter', billing: 'year', priceINR: 694224, priceUSD: '7200', seats: 3, exportsPerMonth: 10000 },
    atlas_growth: { name: 'Atlas Growth', billing: 'year', priceINR: 1388448, priceUSD: '14400', seats: 8, exportsPerMonth: 100000, popular: true },
    atlas_scale: { name: 'Atlas Scale', billing: 'year', priceINR: 2776896, priceUSD: '28800', seats: 15, exportsPerMonth: 999999 },
  },
  exchange: {
    buyer: { name: 'Free', billing: 'year', priceINR: 0, jobPostsIncluded: 5, applicationsPerMonth: 2 },
    priority: { name: 'Seller', billing: 'year', priceINR: 19999, priceUSD: '235', jobPostsIncluded: 5, applicationsPerMonth: 15, popular: true },
  },
  cr: {
    founder_paid_solo: { name: 'Founder Data Room', billing: 'year', priceINR: 24999, priceUSD: '299', dataRoomsIncluded: 1, popular: true },
    fund_bundle: { name: 'Command: India-domiciled fund', billing: 'month', priceINR: 500000, dataRoomsIncluded: 10 },
    fund_bundle_global: { name: 'Command: non-India fund', billing: 'month', priceUSD: '799', dataRoomsIncluded: 10 },
    orbit_launch: { name: 'Orbit Launch', billing: 'year', priceINR: 75000, dataRoomsIncluded: 2 },
    orbit_starter: { name: 'Orbit Starter', billing: 'year', priceINR: 99000, dataRoomsIncluded: 5 },
    orbit_growth: { name: 'Orbit Growth', billing: 'year', priceINR: 125000, dataRoomsIncluded: 10, popular: true },
    orbit_scale: { name: 'Orbit Scale', billing: 'year', priceINR: 250000, dataRoomsIncluded: 25 },
    orbit_enterprise: { name: 'Orbit Enterprise', billing: 'year', priceINR: 1000000, dataRoomsIncluded: 100 },
  },
}

export interface PlansResult {
  plans: PlanCatalog
  live: boolean // false when the fallback is showing
}

export async function getPlans(): Promise<PlansResult> {
  try {
    const res = await fetch('https://nestlens.labelnest.in/api/public/plans', { next: { revalidate: 300 } })
    if (!res.ok) throw new Error(String(res.status))
    const json = (await res.json()) as Partial<PlanCatalog>
    if (!json.cr || !json.intelligence || !json.exchange) throw new Error('shape')
    return { plans: json as PlanCatalog, live: true }
  } catch {
    return { plans: FALLBACK, live: false }
  }
}

export const inr = (n: number): string => `₹${Math.round(n).toLocaleString('en-IN')}`
export const usd = (n: number | string): string => `$${Number(n).toLocaleString('en-US')}`

/** Price as one clear string, or null for custom plans. */
export function priceLabel(p: ApiPlan | undefined, currency: 'INR' | 'USD'): string | null {
  if (!p || p.isCustomPricing || p.billing === 'custom') return null
  if (currency === 'INR') return p.priceINR ? inr(p.priceINR) : null
  const v = Number(p.priceUSD)
  return v > 0 ? usd(v) : null
}

export const unlimited = (n: number | undefined): boolean => (n ?? 0) >= 999999
export const num = (n: number | undefined): string => (unlimited(n) ? 'Unlimited' : (n ?? 0).toLocaleString('en-IN'))

// Headline counts, read live from NestLens (the same source as its own homepage). Floored to the thousand so the
// site never claims more than is there. "Entities" is every entity type NestLens tracks: managers, LPs, service
// providers, portfolio companies, funds and venture studios. If NestLens cannot be reached, the last known round
// figures are shown.
export interface AtlasStats { entities: string; funds: string; companies: string; people: string; live: boolean }

const floorK = (n: number): string => `${Math.floor(n / 1000).toLocaleString('en-US')},000+`

export async function getAtlasStats(): Promise<AtlasStats> {
  try {
    const res = await fetch('https://nestlens.labelnest.in/api/public/stats', { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error(String(res.status))
    const j = (await res.json()) as { gpCount?: number; lpCount?: number; spCount?: number; pcCount?: number; fundCount?: number; vsCount?: number; contactCount?: number }
    if (!j.fundCount || !j.pcCount || !j.contactCount) throw new Error('shape')
    const entities = (j.gpCount ?? 0) + (j.lpCount ?? 0) + (j.spCount ?? 0) + (j.pcCount ?? 0) + (j.fundCount ?? 0) + (j.vsCount ?? 0)
    return { entities: floorK(entities), funds: floorK(j.fundCount), companies: floorK(j.pcCount), people: floorK(j.contactCount), live: true }
  } catch {
    return { entities: '130,000+', funds: '66,000+', companies: '32,000+', people: '120,000+', live: false }
  }
}

/** Replace {{entities}}, {{funds}}, {{companies}} and {{people}} in a piece of text with the live figures. */
export function fillStats(text: string, st: AtlasStats): string {
  return text.replaceAll('{{entities}}', st.entities).replaceAll('{{funds}}', st.funds).replaceAll('{{companies}}', st.companies).replaceAll('{{people}}', st.people)
}

/** The same, through every string in an object or list (used by the comparison pages). */
export function deepFill<T>(value: T, st: AtlasStats): T {
  if (typeof value === 'string') return fillStats(value, st) as unknown as T
  if (Array.isArray(value)) return value.map((v) => deepFill(v, st)) as unknown as T
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, deepFill(v, st)])) as T
  return value
}

/** A plain-text price summary for the Kai assistant, built from the live catalog so it can never disagree with the site. */
export function describePricing(plans: PlanCatalog): string {
  const i = plans.intelligence, e = plans.exchange, c = plans.cr
  const atlas = ['atlas_basic', 'atlas_starter', 'atlas_growth', 'atlas_scale'].filter((k) => i[k]).map((k) => `${i[k].name.replace(/^Atlas\s*/, '')} ${usd(i[k].priceUSD ?? 0)} a year (${inr(i[k].priceINR ?? 0)}, ${i[k].seats} seat${i[k].seats === 1 ? '' : 's'})`).join('; ')
  const orbit = ['orbit_launch', 'orbit_starter', 'orbit_growth', 'orbit_scale', 'orbit_enterprise'].filter((k) => c[k]).map((k) => `${c[k].name.replace(/^Orbit\s*/, '')} ${inr(c[k].priceINR ?? 0)} a year (${c[k].dataRoomsIncluded} Ascent data rooms included)`).join('; ')
  return [
    `   - Atlas, billed yearly: ${atlas}. Enterprise on request.`,
    `   - Exchange: free to browse and post requirements; Seller ${inr(e.priority?.priceINR ?? 0)} a year (${usd(e.priority?.priceUSD ?? 0)}) for an active listing.`,
    `   - Orbit, billed yearly: ${orbit}. Every tier has every feature.`,
    `   - Ascent: every new account gets 30 days of full access, free. Founder Data Room ${inr(c.founder_paid_solo?.priceINR ?? 0)} a year (${usd(c.founder_paid_solo?.priceUSD ?? 0)}). A cohort or group of startups is quoted as one price.`,
    `   - Command: one package per fund per month, ${inr(c.fund_bundle?.priceINR ?? 0)} for India-domiciled funds and ${usd(c.fund_bundle_global?.priceUSD ?? 0)} for funds outside India; every feature included, with ${c.fund_bundle?.dataRoomsIncluded ?? 10} Ascent data rooms for portfolio companies.`,
    `   - Connect: included free with an active Ascent or Command plan; mentors and partners apply free.`,
  ].join('\n')
}
