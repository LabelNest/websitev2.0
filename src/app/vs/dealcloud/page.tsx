import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/dealcloud', {
    title: 'NestLens Capital Readiness vs DealCloud — Deal CRM vs Fundraise Readiness',
    description: 'How NestLens Capital Readiness compares to DealCloud (Intapp) — a premium enterprise deal CRM vs a fundraise-ready data room and LP-GP matching for emerging managers.',
  })
}

const DATA: VsPageData = {
  slug: 'dealcloud',
  category: 'fund-data-room',
  competitorName: 'DealCloud',
  ourName: 'Capital Readiness',
  h1: 'Capital Readiness vs DealCloud: Deal CRM vs Fundraise Readiness',
  subhead: 'DealCloud (part of Intapp) is a premium enterprise CRM for deal sourcing, pipeline management, and relationship tracking — annual pricing commonly in the low-to-high six figures. Capital Readiness is a different tool entirely: a fundraise-ready data room and LP-GP matching for managers who are raising, not running a deal pipeline.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'DealCloud manages your deal pipeline. Capital Readiness gets you funded.',
  tldrLeftLabel: 'Pick DealCloud if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You need enterprise CRM for deal sourcing, pipeline, and relationship management',
    'Real-time dashboards and workflow automation across a large deal team matter',
    'You are a mid-to-large investment bank, PE firm, or consulting practice',
    'You have low-to-high six figures/year budget for a premium enterprise platform',
  ],
  tldrRightPoints: [
    'You are an emerging manager raising a fund, not managing a large deal pipeline',
    'You need investor tier scoring against angel to institutional',
    'You want LP-GP matching, not a CRM to track deal relationships',
    'You are an Indian or emerging market fund manager',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Enterprise deal CRM — sourcing, pipeline, relationship tracking', verdict: 'win' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, structured for the raise', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Deal pipeline / relationship CRM', competitor: { text: 'Purpose-built, comprehensive pipeline and relationship management', verdict: 'win' }, labelnest: { text: 'Not a CRM tool', verdict: 'no' } },
    { feature: 'Reporting and dashboards', competitor: { text: 'Real-time dashboards, powerful reporting engine', verdict: 'win' }, labelnest: { text: 'Not a deal-tracking dashboard tool', verdict: 'no' } },
    { feature: 'Pricing', competitor: { text: 'Custom-quoted; commonly low-to-high six figures/year', verdict: 'no' }, labelnest: { text: 'Credit-based, INR-friendly', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
  ],
  calloutTitle: 'What DealCloud does better than us — honestly.',
  calloutBody: 'DealCloud\'s CRM and pipeline-management tooling is genuinely built for firms tracking hundreds of deals and relationships at once — real-time dashboards, workflow automation, and a reporting engine that scales with a large deal team. Capital Readiness isn\'t a CRM. If deal-flow and relationship tracking at that scale is your need, DealCloud is built for it.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Managing deal relationships vs. getting funded.',
    body: "DealCloud's assumption: investment firms need enterprise CRM to manage deal sourcing and relationships at scale. Capital Readiness's assumption: emerging managers need to get raise-ready and matched to LPs — a narrower, earlier problem that doesn't require enterprise deal-CRM infrastructure. The two solve genuinely different jobs.",
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market fund managers.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/altvia', label: 'Also see: vs Altvia →' },
}

export default function VsDealCloudPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/dealcloud' }, { name: 'DealCloud', path: '/vs/dealcloud' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
