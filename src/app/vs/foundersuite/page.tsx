import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/foundersuite', {
    title: 'Foundersuite Alternatives for Startups — NestLens Capital Readiness vs Foundersuite',
    description: 'Looking for a Foundersuite alternative? How NestLens Capital Readiness compares for building a fundraise-ready data room and getting matched to LPs, not just tracking outreach.',
  })
}

const DATA: VsPageData = {
  slug: 'foundersuite',
  category: 'capital-readiness',
  competitorName: 'Foundersuite',
  ourName: 'Capital Readiness',
  h1: 'Foundersuite Alternatives for Startups: Capital Readiness vs Foundersuite',
  subhead: 'Foundersuite is an investor-outreach and pipeline-tracking tool — a 230,000+ investor database, bulk email, and deal tracking. Capital Readiness solves a different, earlier problem: building the fundraise-ready data room and getting matched to the right investors in the first place.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Foundersuite tracks outreach. Capital Readiness builds the readiness.',
  tldrLeftLabel: 'Pick Foundersuite if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You already know who to pitch and need a CRM-style pipeline to track outreach',
    'Access to a 230,000+ investor database (VCs, angels, family offices) is the main draw',
    'Bulk personalized email and pitch-deck hosting fit your fundraising workflow',
    'You need the data room as a paid add-on to an outreach-tracking tool',
  ],
  tldrRightPoints: [
    'You are still building your fundraise story and don\'t have a target list yet',
    'You need investor tier scoring against angel to institutional, not just contact tracking',
    'You want LP-GP matching, not a database to cold-email against',
    'You are an Indian or emerging market founder',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Investor database + outreach/pipeline CRM', verdict: 'win' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room', competitor: { text: 'Add-on feature, additional fee on top tier', verdict: 'mid' }, labelnest: { text: '10 sections, 51 items, structured, built in', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered — you find investors, not get matched', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Investor database', competitor: { text: '230,000+ investors, unlimited access on paid tiers', verdict: 'win' }, labelnest: { text: 'Not a cold-outreach database — matching-based', verdict: 'no' } },
    { feature: 'Bulk email / outreach tools', competitor: { text: 'Personalized bulk email on Gold/Platinum tiers', verdict: 'win' }, labelnest: { text: 'Not offered — not an outreach tool', verdict: 'no' } },
    { feature: 'Pricing', competitor: { text: 'Free (Basic) to Platinum with unlimited pipelines; data room is a paid add-on', verdict: 'mid' }, labelnest: { text: 'Credit-based, INR-friendly, data room included', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
    { feature: 'Grant and competition discovery', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Included', verdict: 'win' } },
  ],
  calloutTitle: 'What Foundersuite does better than us — honestly.',
  calloutBody: 'Foundersuite\'s 230,000+ investor database and pipeline CRM are genuinely useful once you know your target list and are actively cold-emailing investors — that outreach-tracking workflow is not something Capital Readiness tries to replicate. If cold outreach at volume is your fundraising strategy, Foundersuite is built for exactly that.',
  extra: {
    tag: 'Better together?',
    heading: 'Different jobs in the same fundraise.',
    body: 'Use Capital Readiness to build your data room and get matched to investors who fit your stage and sector. If you still need to run broad outreach beyond your matched list, Foundersuite\'s database and CRM handle that. The two aren\'t mutually exclusive — they solve different steps.',
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market founders.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/visible', label: 'Also see: vs Visible →' },
}

export default function VsFoundersuitePage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/foundersuite' }, { name: 'Foundersuite', path: '/vs/foundersuite' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
