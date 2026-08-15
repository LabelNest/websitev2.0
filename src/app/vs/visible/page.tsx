import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/visible', {
    title: 'Visible.vc Alternatives for Startups — NestLens Capital Readiness vs Visible',
    description: 'Looking for a Visible.vc alternative? How NestLens Capital Readiness compares for pre-raise data-room building vs Visible\'s post-raise investor-update and KPI tracking.',
  })
}

const DATA: VsPageData = {
  slug: 'visible',
  category: 'capital-readiness',
  competitorName: 'Visible',
  ourName: 'Capital Readiness',
  h1: 'Visible.vc Alternatives for Startups: Capital Readiness vs Visible',
  subhead: 'Visible is built for founders who already have investors to update — KPI tracking, formatted investor updates, and a fundraising CRM, from $59/month. Capital Readiness is built for the step before that: getting raise-ready and matched to investors in the first place.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Visible is for after you have investors. Capital Readiness is for getting them.',
  tldrLeftLabel: 'Pick Visible if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You already have investors and need to send them formatted, recurring updates',
    'KPI and financial-data tracking with per-slide pitch-deck analytics matters',
    'You\'re a VC firm needing portfolio-monitoring tools, not just a founder',
    'You have $59-$3,000+/month budget depending on team size',
  ],
  tldrRightPoints: [
    'You are still building your fundraise story, not yet reporting to investors',
    'You need investor tier scoring against angel to institutional',
    'You want LP-GP matching, not a CRM to track investors you already know',
    'You are an Indian or emerging market founder',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Post-raise investor updates, KPI tracking, portfolio monitoring', verdict: 'win' }, labelnest: { text: 'Pre-raise fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room', competitor: { text: 'Secure data room sharing included', verdict: 'win' }, labelnest: { text: '10 sections, 51 items, structured', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Investor update automation', competitor: { text: 'Formatted, recurring updates with per-slide analytics', verdict: 'win' }, labelnest: { text: 'Not offered — pre-raise focused', verdict: 'no' } },
    { feature: 'KPI / financial tracking', competitor: { text: 'Built-in KPI and financial dashboards', verdict: 'win' }, labelnest: { text: 'Not a portfolio-monitoring tool', verdict: 'no' } },
    { feature: 'Pricing', competitor: { text: 'Free plan, paid from $59/month, enterprise $2,000-$3,000+/month', verdict: 'mid' }, labelnest: { text: 'Credit-based, INR-friendly', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
    { feature: 'Grant and competition discovery', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Included', verdict: 'win' } },
  ],
  calloutTitle: 'What Visible does better than us — honestly.',
  calloutBody: 'Visible\'s investor-update automation and KPI dashboards are genuinely strong once you have a cap table full of investors expecting regular reporting — that ongoing relationship-management workflow isn\'t what Capital Readiness is built for. If you\'re past your raise and need to keep investors informed, Visible does that well.',
  extra: {
    tag: 'Better together?',
    heading: 'Sequential, not competitive.',
    body: 'Use Capital Readiness to build your raise-ready data room, get matched to LPs, and close your round. Once you have investors to report to, Visible\'s update and KPI tooling picks up where Capital Readiness leaves off.',
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market founders.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/foundersuite', label: 'Also see: vs Foundersuite →' },
}

export default function VsVisiblePage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/visible' }, { name: 'Visible', path: '/vs/visible' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
