import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/pulley', {
    title: 'Pulley Alternatives for Startups — NestLens Capital Readiness vs Pulley',
    description: 'Looking for a Pulley alternative? How NestLens Capital Readiness compares for pre-raise fundraise prep vs Pulley\'s post-raise cap table management.',
  })
}

const DATA: VsPageData = {
  slug: 'pulley',
  category: 'capital-readiness',
  competitorName: 'Pulley',
  ourName: 'Capital Readiness',
  h1: 'Pulley Alternatives for Startups: Capital Readiness vs Pulley',
  subhead: 'Pulley manages your cap table after you have raised — $1,200/year for an early-stage cap table, up to $3,500/year as you scale. Capital Readiness helps you build the data room to raise in the first place. Different jobs, different stages.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Pulley is post-raise. Capital Readiness is pre-raise.',
  tldrLeftLabel: 'Pick Pulley if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You have already closed a round and need cap table management',
    'You need 409A valuations, option exercises, or Rule 701 compliance (Growth plan)',
    'A fundraise modeler and interactive offer letters fit your post-raise workflow',
    'You have $1,200-$3,500+/year budget for equity administration',
  ],
  tldrRightPoints: [
    'You are still building your fundraise story',
    'You need investor tier scoring against angel to institutional',
    'You want LP-GP matching, not cap table tracking',
    'You are an Indian or emerging market founder',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Cap table and equity management', verdict: 'mid' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, structured', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Cap table management', competitor: { text: 'Flat-fee pricing, up to 40 stakeholders on Growth plan', verdict: 'win' }, labelnest: { text: 'Not offered', verdict: 'no' } },
    { feature: '409A valuations', competitor: { text: 'Included on Growth plan ($3,500/year)', verdict: 'win' }, labelnest: { text: 'Not offered', verdict: 'no' } },
    { feature: 'Fundraise modeler', competitor: { text: 'Included from the Startup plan', verdict: 'win' }, labelnest: { text: 'Investor matching serves the same underlying goal differently', verdict: 'mid' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
    { feature: 'Grant and competition discovery', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Included', verdict: 'win' } },
    { feature: 'Pricing', competitor: { text: '$1,200/year (Startup) to $3,500/year (Growth), Enterprise custom', verdict: 'mid' }, labelnest: { text: 'Credit-based, INR-friendly', verdict: 'win' } },
  ],
  calloutTitle: 'What Pulley does better than us — honestly.',
  calloutBody: 'Pulley\'s flat-fee cap table pricing and 409A/option-administration tooling are a genuinely strong, more affordable alternative to legacy cap table platforms once you\'ve raised. Capital Readiness doesn\'t manage cap tables at all — if that\'s your need, Pulley is built for it.',
  extra: {
    tag: 'Better together?',
    heading: 'Sequential, not competitive.',
    body: 'Use Capital Readiness to build your raise-ready data room, get matched to LPs, and close your first round. Then use Pulley to manage the cap table that results. Different jobs, different stages of the same journey.',
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market founders.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/carta', label: 'Also see: vs Carta →' },
}

export default function VsPulleyPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/pulley' }, { name: 'Pulley', path: '/vs/pulley' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
