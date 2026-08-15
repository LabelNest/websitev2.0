import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/datasite', {
    title: 'NestLens Capital Readiness vs Datasite — M&A Data Room vs Fundraise & Fund Data Room',
    description: 'How NestLens Capital Readiness compares to Datasite for both startup fundraise data rooms and fund/LP data rooms — Datasite is priced and built for M&A deals, not early-stage raises.',
  })
}

const DATA: VsPageData = {
  slug: 'datasite',
  category: 'fund-data-room',
  competitorName: 'Datasite',
  ourName: 'Capital Readiness',
  h1: 'Capital Readiness vs Datasite: M&A-Grade Data Rooms vs Fundraise-Ready Data Rooms',
  subhead: 'Datasite is the M&A industry-standard virtual data room — legacy per-page pricing (~$0.60/page) that can push a modest 10GB deal past $700,000/year. It is built for M&A due diligence, not early-stage fundraising or fund/LP data rooms. Capital Readiness serves both a startup\'s fundraise data room and a fund\'s investor data room, at credit-based pricing.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Datasite is for M&A deals. Capital Readiness is for raising — startup or fund side.',
  tldrLeftLabel: 'Pick Datasite if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You are running an M&A due-diligence process, not a fundraise',
    'You need enterprise-grade Q&A management, redaction, and OCR across thousands of documents',
    'Your organization can absorb legacy per-page pricing that can reach six figures',
    'A permanent, hosted deal record after project close matters to your workflow',
  ],
  tldrRightPoints: [
    'You are a startup founder building a fundraise data room, or a GP building an investor/LP data room',
    'You need investor tier scoring and LP-GP matching, not M&A-grade Q&A workflows',
    'You want credit-based, transparent pricing, not per-page charges that scale into six figures',
    'You are an Indian or emerging market founder or fund',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'M&A due-diligence virtual data room', verdict: 'win' }, labelnest: { text: 'Fundraise readiness and investor matching, startup and fund side', verdict: 'win' } },
    { feature: 'Pricing model', competitor: { text: 'Legacy per-page (~$0.60/page); a 10GB project can reach ~$720,000/year', verdict: 'no' }, labelnest: { text: 'Credit-based, no per-page charges', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Q&A management, redaction, OCR', competitor: { text: 'Enterprise-grade, purpose-built for M&A diligence', verdict: 'win' }, labelnest: { text: 'Not built for large-scale M&A document review', verdict: 'no' } },
    { feature: 'Deal record retention', competitor: { text: 'Automatic, hosted indefinitely at no extra cost', verdict: 'win' }, labelnest: { text: 'Not an M&A deal-archival tool', verdict: 'no' } },
    { feature: 'Fit for early-stage fundraising', competitor: { text: 'Not designed for early-stage raises — cost and complexity are M&A-scale', verdict: 'no' }, labelnest: { text: 'Purpose-built for startup and fund fundraising', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
    { feature: 'Grant and competition discovery', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Included', verdict: 'win' } },
  ],
  calloutTitle: 'What Datasite does better than us — honestly.',
  calloutBody: 'Datasite is genuinely the enterprise standard for M&A due diligence — Q&A management, redaction, OCR, and audit trails built for deals with thousands of documents and multiple bidding parties. If you\'re running an actual M&A process, that scale and rigor matters, and its per-page pricing reflects real infrastructure most fundraises simply don\'t need.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'M&A infrastructure vs. a fundraise-ready data room for founders and funds.',
    body: "Datasite's assumption: M&A deals need enterprise-grade diligence infrastructure, priced for that scale and complexity. Capital Readiness's assumption: startups and emerging fund managers need a data room built for fundraising specifically — sections, investor-fit scoring, and matching — without M&A-scale pricing or complexity neither audience actually needs.",
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market founders and funds.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/dakota', label: 'Also see: vs Dakota →' },
}

export default function VsDatasitePage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/datasite' }, { name: 'Datasite', path: '/vs/datasite' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
