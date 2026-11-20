import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import PartnersClient from './PartnersClient'
import { getPlans } from '@/lib/plans'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/partners', {
    title: 'LabelNest Partner Network — refer customers and earn on every payment',
    description: 'Individuals and institutions who work with startups, funds and investors can partner with LabelNest. Share your link or register a lead, and earn on every invoice your customer pays.',
  })
}

// The calculator multiplies the live NestLens list prices (the same catalog the pricing page reads) by the rewards set in Growth OS.
export const revalidate = 300

export default async function PartnersPage() {
  const { plans } = await getPlans()
  const yearly = (p?: { billing?: string; priceINR?: number }) => (p?.priceINR ? (p.billing === 'month' ? p.priceINR * 12 : p.priceINR) : 0)
  const prices = {
    ascent: { label: 'Ascent', plan: plans.cr.founder_paid_solo?.name ?? 'Founder Data Room', yearly: yearly(plans.cr.founder_paid_solo) },
    atlas: { label: 'Atlas', plan: plans.intelligence.atlas_starter?.name ?? 'Atlas Starter', yearly: yearly(plans.intelligence.atlas_starter) },
    orbit: { label: 'Orbit', plan: plans.cr.orbit_starter?.name ?? 'Orbit Starter', yearly: yearly(plans.cr.orbit_starter) },
    command: { label: 'Command', plan: 'Command (India-domiciled fund)', yearly: yearly(plans.cr.fund_bundle) },
  }
  return <PartnersClient prices={prices} />
}
