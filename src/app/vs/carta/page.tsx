import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/carta', {
    title: 'NestLens Capital Readiness vs Carta — Fundraise Prep Comparison',
    description: 'How NestLens Capital Readiness compares to Carta for startup fundraise preparation — data rooms, investor matching, and pricing.',
  })
}

const DATA: VsPageData = {
  slug: 'carta',
  competitorName: 'Carta',
  ourName: 'Capital Readiness',
  h1: 'Capital Readiness vs Carta: Different Jobs, Different Tools.',
  subhead: 'Carta manages your cap table after you have raised. Capital Readiness helps you build the data room to raise in the first place. They solve very different problems. Here is when to use each.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Carta is post-raise. Capital Readiness is pre-raise.',
  tldrLeftLabel: 'Pick Carta if',
  tldrLeftPoints: [
    'You have already closed a round and need cap table management',
    'You need ESOP administration and 409A valuations',
    'Delaware C-corp or US incorporation is your structure',
    'Fund administration and LP reporting is your requirement',
  ],
  tldrRightLabel: 'Pick Capital Readiness if',
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
    { feature: 'Cap table management', competitor: { text: 'Best in class', verdict: 'win' }, labelnest: { text: 'Not offered', verdict: 'no' } },
    { feature: 'ESOP administration', competitor: { text: 'Full workflow', verdict: 'win' }, labelnest: { text: 'Not offered', verdict: 'no' } },
    { feature: '409A valuations', competitor: { text: 'Included at higher tiers', verdict: 'win' }, labelnest: { text: 'Not offered', verdict: 'no' } },
    { feature: 'Fund admin and LP reporting', competitor: { text: 'Yes (Carta Fund Admin)', verdict: 'win' }, labelnest: { text: 'Not offered', verdict: 'no' } },
    { feature: 'India-specific structures', competitor: { text: 'US-focused, weak on Indian entities', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
    { feature: 'Grant and competition discovery', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Included', verdict: 'win' } },
    { feature: 'Pricing (India)', competitor: { text: 'Sales-quoted, $2K-$20K+ annually', verdict: 'mid' }, labelnest: { text: 'Credit-based, INR-friendly', verdict: 'win' } },
  ],
  calloutTitle: 'What Carta does better than us — honestly.',
  calloutBody: 'Carta is the gold standard for cap table and equity management. If you have already raised and need ESOP administration, 409A valuations, or fund admin — use Carta. Capital Readiness solves what comes before: getting ready to raise in the first place, especially for Indian founders.',
  extra: {
    tag: 'Better together?',
    heading: 'Sequential, not competitive.',
    body: 'Use Capital Readiness to build your raise-ready data room, get matched to LPs, and close your first round. Then use Carta to manage the cap table that results. Different jobs, different stages of the same journey.',
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market founders.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/docsend', label: 'Also see: vs DocSend →' },
}

export default function VsCartaPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/carta' }, { name: 'Carta', path: '/vs/carta' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
