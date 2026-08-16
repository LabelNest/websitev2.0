import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/intralinks', {
    title: 'NestLens Capital Readiness vs Intralinks — M&A Data Room vs Fundraise Readiness',
    description: 'How NestLens Capital Readiness compares to Intralinks — an M&A-grade virtual data room, custom-quoted from $10,000 to $200,000+/year, vs a fundraise-ready data room for founders and funds.',
  })
}

const DATA: VsPageData = {
  slug: 'intralinks',
  category: 'fund-data-room',
  competitorName: 'Intralinks',
  ourName: 'Capital Readiness',
  h1: 'Capital Readiness vs Intralinks: M&A-Grade Data Rooms vs Fundraise Readiness',
  subhead: 'Intralinks is an established M&A-grade virtual data room — custom-quoted, with small implementations starting around $10,000/year and enterprise deployments reaching $200,000+/year. It is built for M&A diligence, not early-stage fundraising. Capital Readiness is purpose-built for a startup or fund\'s fundraise data room.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Intralinks is for M&A deals. Capital Readiness is for raising.',
  tldrLeftLabel: 'Pick Intralinks if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You are running an M&A due-diligence process, not a fundraise',
    'You need AI redaction, automated indexing, and advanced Q&A across many documents',
    'Real-time dashboards and IRM-level permissioning matter to your deal team',
    'You can absorb custom pricing that scales from $10,000 to $200,000+/year',
  ],
  tldrRightPoints: [
    'You are a startup founder or emerging fund manager building a fundraise data room',
    'You need investor tier scoring and LP-GP matching, not M&A-grade Q&A workflows',
    'You want credit-based, transparent pricing, not a custom enterprise quote',
    'You are an Indian or emerging market founder or fund',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'M&A due-diligence virtual data room', verdict: 'win' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Pricing model', competitor: { text: 'Custom-quoted; $10,000/year (small) to $200,000+/year (enterprise)', verdict: 'no' }, labelnest: { text: 'Credit-based, no custom quote needed', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'AI redaction / automated indexing', competitor: { text: 'Integrated AI redaction, automated indexing, advanced Q&A', verdict: 'win' }, labelnest: { text: 'Not built for large-scale M&A document review', verdict: 'no' } },
    { feature: 'Fit for early-stage fundraising', competitor: { text: 'Not designed for early-stage raises — cost and complexity are M&A-scale', verdict: 'no' }, labelnest: { text: 'Purpose-built for startup and fund fundraising', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
    { feature: 'Grant and competition discovery', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Included', verdict: 'win' } },
  ],
  calloutTitle: 'What Intralinks does better than us — honestly.',
  calloutBody: 'Intralinks\' AI redaction, automated indexing, and IRM-level permissioning are genuinely built for high-stakes M&A due diligence with real-time visibility into document and user activity. If you\'re running an actual M&A deal, that infrastructure matters and its pricing reflects real capability most fundraises don\'t need.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'M&A infrastructure vs. a fundraise-ready data room.',
    body: "Intralinks' assumption: M&A deals need enterprise-grade diligence infrastructure, custom-priced for scale and complexity. Capital Readiness's assumption: startups and emerging fund managers need a data room built specifically for fundraising — sections, investor-fit scoring, matching — without M&A-scale pricing neither audience needs.",
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market founders and funds.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/ideals', label: 'Also see: vs iDeals →' },
}

export default function VsIntralinksPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/intralinks' }, { name: 'Intralinks', path: '/vs/intralinks' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
