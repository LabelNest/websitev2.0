import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/dakota', {
    title: 'NestLens Capital Readiness vs Dakota — Fundraise Database Comparison',
    description: 'How NestLens Capital Readiness compares to Dakota Marketplace for reaching LPs — allocator sales intelligence vs fundraise-ready data room and matching.',
  })
}

const DATA: VsPageData = {
  slug: 'dakota',
  category: 'fund-data-room',
  competitorName: 'Dakota',
  ourName: 'Capital Readiness',
  h1: 'Capital Readiness vs Dakota: Finding LPs vs Being Ready for Them',
  subhead: "Dakota Marketplace is a daily-updated database of 250,000+ LP accounts built for investment sales teams who already know how to pitch — it helps you find and reach allocators. Capital Readiness solves the step before that: building a fundraise-ready data room and getting matched to the right LPs and GPs in the first place.",
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Dakota is an LP database. Capital Readiness is a fundraise-ready system.',
  tldrLeftLabel: 'Pick Dakota if',
  tldrLeftPoints: [
    'You are an established investment sales team building call lists across US and global LPs',
    'You need daily-updated, research-verified allocator contact data at scale',
    'You already have your fundraise materials ready and need reach, not readiness',
    'Budget supports $16,500+/year for institutional-grade sales intelligence',
  ],
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrRightPoints: [
    'You are still building your fundraise story and data room',
    'You want LP-GP matching based on your actual stage, sector, and check size — not a raw list',
    'You are an emerging manager or founder, not an established institutional sales team',
    'You want investor tier scoring and grant discovery in the same tool',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Allocator sales intelligence for outbound fundraising teams', verdict: 'mid' }, labelnest: { text: 'Fundraise readiness — data room, scoring, and matching', verdict: 'win' } },
    { feature: 'LP database size', competitor: { text: '250,000+ LP accounts, 386,000+ verified contacts', verdict: 'win' }, labelnest: { text: 'Matched LP set based on your specific criteria, not a bulk database', verdict: 'mid' } },
    { feature: 'Data room / checklist', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, pre-defined', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching by fit', competitor: { text: 'Manual filtering by asset class, geography, AUM', verdict: 'mid' }, labelnest: { text: 'Live matching engine based on stage, sector, check size', verdict: 'win' } },
    { feature: 'Data freshness', competitor: { text: 'Daily updates by an in-house research team', verdict: 'win' }, labelnest: { text: 'Continuously updated, narrower scope', verdict: 'mid' } },
    { feature: 'Grant and competition discovery', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Included in the module', verdict: 'win' } },
    { feature: 'Pricing', competitor: { text: '$16,500/year for the first user, +$1,000/year per additional user', verdict: 'no' }, labelnest: { text: 'Credit-based, self-serve free tier, India pricing available', verdict: 'win' } },
    { feature: 'Built for emerging managers vs institutional sales teams', competitor: { text: 'Built for institutional sales and IR teams', verdict: 'mid' }, labelnest: { text: 'Built for founders and emerging managers first', verdict: 'win' } },
  ],
  calloutTitle: 'What Dakota does better than us — honestly.',
  calloutBody: "Dakota's LP database is genuinely comprehensive — 250,000+ allocator accounts, daily research updates, and complete contact coverage across every institutional channel. If you already know exactly who you're pitching and need the widest possible reach into US and global allocators, Dakota is built for that job at institutional scale. Capital Readiness solves a different, earlier problem: getting your data room and story ready, and getting matched to the LPs who actually fit — not the whole market.",
  extra: {
    tag: 'Better together?',
    heading: 'Different stages of the same fundraise.',
    body: "Use Capital Readiness to build your data room, get investor tier scoring, and get matched to LPs who fit your stage and sector. If you later need to go broad and reach the wider institutional allocator universe at scale, a database like Dakota fills that gap. Most emerging managers need Capital Readiness first — most already know that outbound reach at Dakota's scale isn't the constraint yet.",
  },
  finalTag: 'Start with fit, not volume',
  finalHeading: 'Get matched to LPs who fit your fund. Not a database to cold-call.',
  finalBody: 'Free to start. Investor tier scoring and LP-GP matching included.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/carta', label: 'Also see: vs Carta →' },
}

export default function VsDakotaPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/dakota' }, { name: 'Dakota', path: '/vs/dakota' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
