import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import PartnersClient from './PartnersClient'
import { getPlans } from '@/lib/plans'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/partners', {
    title: 'LabelNest Partner Network — refer customers and earn on their payments',
    description: 'Individuals and institutions who work with startups, funds and investors can partner with LabelNest. Share your link or register a lead, and earn a share of what your customer pays for the first 12 months.',
  })
}

// The calculator multiplies the live NestLens list prices (the same catalog the pricing page reads) by the rewards set in Growth OS.
export const revalidate = 300

const APPLY_URL = process.env.NEXT_PUBLIC_PARTNER_APPLY_URL || 'https://growth.labelnest.in/api/partner-network/apply'

// The rewards live in Growth OS. Read here, on the server, and cached with the page: visitors get them in the first paint.
async function getRates() {
  try {
    const res = await fetch(APPLY_URL.replace(/apply$/, 'rates'), { next: { revalidate: 300 } })
    if (!res.ok) return null
    const j = await res.json()
    return typeof j?.ascent === 'number' && typeof j?.self_close_bonus === 'number' ? { ascent: j.ascent, atlas: j.atlas, orbit: j.orbit, command: j.command, self_close_bonus: j.self_close_bonus } : null
  } catch { return null }
}

export default async function PartnersPage() {
  const [{ plans }, rates] = await Promise.all([getPlans(), getRates()])
  const yearly = (p?: { billing?: string; priceINR?: number }) => (p?.priceINR ? (p.billing === 'month' ? p.priceINR * 12 : p.priceINR) : 0)
  const prices = {
    ascent: { label: 'Ascent', plan: plans.cr.founder_paid_solo?.name ?? 'Founder Data Room', yearly: yearly(plans.cr.founder_paid_solo) },
    atlas: { label: 'Atlas', plan: plans.intelligence.atlas_starter?.name ?? 'Atlas Starter', yearly: yearly(plans.intelligence.atlas_starter) },
    orbit: { label: 'Orbit', plan: plans.cr.orbit_starter?.name ?? 'Orbit Starter', yearly: yearly(plans.cr.orbit_starter) },
    command: { label: 'Command', plan: 'Command', yearly: yearly(plans.cr.fund_bundle), from: true },
  }
  return <PartnersClient prices={prices} initialRates={rates} />
}
