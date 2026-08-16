import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/ideals', {
    title: 'NestLens Capital Readiness vs iDeals — Virtual Data Room vs Fundraise Readiness',
    description: 'How NestLens Capital Readiness compares to iDeals — a general-purpose virtual data room from $500/month vs a fundraise-ready data room with investor tier scoring and LP-GP matching.',
  })
}

const DATA: VsPageData = {
  slug: 'ideals',
  category: 'fund-data-room',
  competitorName: 'iDeals',
  ourName: 'Capital Readiness',
  h1: 'Capital Readiness vs iDeals: Virtual Data Room vs Fundraise Readiness',
  subhead: 'iDeals is a general-purpose virtual data room — unlimited storage, granular permissions, detailed viewer analytics, starting around $500/month. A typical Series A raise on iDeals runs $2,000-$4,000 for the process. Capital Readiness is purpose-built for the raise itself, not just document hosting.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'iDeals hosts your documents securely. Capital Readiness structures your raise.',
  tldrLeftLabel: 'Pick iDeals if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You need a general-purpose, secure document repository with granular permissions',
    'Detailed analytics on who viewed what matters for your due-diligence process',
    'You want tiered plans (Core, Premier, Enterprise) that scale with deal complexity',
    'You have $500-$5,000+/month budget depending on deal size and duration',
  ],
  tldrRightPoints: [
    'You want a data room structured specifically for fundraising, not generic due diligence',
    'You need investor tier scoring against angel to institutional',
    'You want LP-GP matching, not just document access analytics',
    'You are an Indian or emerging market founder or fund',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'General-purpose secure virtual data room', verdict: 'mid' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room structure', competitor: { text: 'Generic due-diligence structure, not fundraise-specific', verdict: 'mid' }, labelnest: { text: '10 sections, 51 items, purpose-built for fundraising', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Storage and access analytics', competitor: { text: 'Unlimited storage, detailed viewer-level analytics', verdict: 'win' }, labelnest: { text: 'Structured for fundraise diligence tracking', verdict: 'mid' } },
    { feature: 'Pricing', competitor: { text: '$500-$5,000+/month depending on plan and deal size', verdict: 'mid' }, labelnest: { text: 'Credit-based, INR-friendly', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
    { feature: 'Grant and competition discovery', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Included', verdict: 'win' } },
  ],
  calloutTitle: 'What iDeals does better than us — honestly.',
  calloutBody: 'iDeals\' unlimited storage, granular permission controls, and detailed viewer analytics are genuinely useful for any due-diligence process, fundraise or otherwise, and its tiered plans scale from a small raise to a fully customized enterprise deployment. If you just need a secure, general-purpose document repository, iDeals does that well.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Generic document hosting vs. a data room built for the raise.',
    body: 'iDeals\' assumption: any due-diligence process benefits from a secure, feature-rich generic data room, priced by plan tier. Capital Readiness\'s assumption: a fundraise data room should be structured the way investors actually evaluate a company or fund — sections, completeness signals, and investor-fit scoring — not a general-purpose document repository repurposed.',
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market founders and funds.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/intralinks', label: 'Also see: vs Intralinks →' },
}

export default function VsIdealsPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/ideals' }, { name: 'iDeals', path: '/vs/ideals' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
