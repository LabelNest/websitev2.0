import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/pitchbook', {
    title: 'LabelNest vs PitchBook — Private Markets Data Comparison',
    description: 'How LabelNest compares to PitchBook on pricing, coverage, India depth, and contract terms. Honest comparison for emerging managers evaluating both.',
  })
}

const DATA: VsPageData = {
  slug: 'pitchbook',
  competitorName: 'PitchBook',
  ourName: 'LabelNest',
  h1: 'LabelNest vs PitchBook: Honest Comparison for Fund Analysts',
  subhead: 'PitchBook is a category leader for venture and PE deal data. LabelNest is what emerging fund analysts and investment associates use when PitchBook is priced out of reach. Direct comparison, no spin.',
  primaryCta: { href: '/nestlens', label: 'Explore NestLens →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When PitchBook is right. When LabelNest is right.',
  tldrLeftLabel: 'Pick PitchBook if',
  tldrLeftPoints: [
    'You are a well-funded fund or corp dev team with $30K+ annual budget',
    'US and European deal flow is your primary focus',
    'You need Morningstar-linked exit and comparable multiples data',
    'Extensive Excel plug-in usage matters to your workflow',
  ],
  tldrRightLabel: 'Pick LabelNest if',
  tldrRightPoints: [
    'You are a boutique fund, angel network, or independent analyst',
    'India, SE Asia, or emerging markets are your focus',
    'You want to buy specific datasets, not lock into full-platform fees',
    'You need contact intelligence with health scores that make sense',
  ],
  tableRows: [
    { feature: 'Pricing', competitor: { text: 'Annual seat contracts, $25K-$50K+', verdict: 'no' }, labelnest: { text: 'Credit-based, no seat penalties', verdict: 'win' } },
    { feature: 'Deal database size', competitor: { text: '3M+ transactions globally', verdict: 'win' }, labelnest: { text: '40,000+ entities (India, SE Asia, Gulf focus)', verdict: 'mid' } },
    { feature: 'US and Europe deal coverage', competitor: { text: 'Deep and comprehensive', verdict: 'win' }, labelnest: { text: 'Partial, expanding', verdict: 'mid' } },
    { feature: 'India deal coverage', competitor: { text: 'Uneven, weak on early-stage', verdict: 'mid' }, labelnest: { text: 'Comprehensive, deep on emerging manager activity', verdict: 'win' } },
    { feature: 'Excel plug-in', competitor: { text: 'Robust, deeply integrated', verdict: 'win' }, labelnest: { text: 'CSV exports, API access, plug-in on roadmap', verdict: 'mid' } },
    { feature: 'Comparable multiples and exits', competitor: { text: 'Morningstar-linked, extensive', verdict: 'win' }, labelnest: { text: 'Limited', verdict: 'no' } },
    { feature: 'Verified contacts', competitor: { text: 'Available, health scores unclear', verdict: 'mid' }, labelnest: { text: '12,000+ with visible health scores', verdict: 'win' } },
    { feature: 'Data marketplace', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'NestLens Exchange with KYC and escrow', verdict: 'win' } },
    { feature: 'Investor data rooms', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, tier scoring', verdict: 'win' } },
    { feature: 'Fundraising tools for founders', competitor: { text: 'No — buyer side only', verdict: 'no' }, labelnest: { text: 'Capital Readiness module built for founders', verdict: 'win' } },
    { feature: 'Free trial', competitor: { text: 'Sales demo required', verdict: 'no' }, labelnest: { text: 'Self-serve free tier', verdict: 'win' } },
    { feature: 'Contract flexibility', competitor: { text: 'Annual, exit friction', verdict: 'no' }, labelnest: { text: 'Month-to-month possible', verdict: 'win' } },
  ],
  calloutTitle: 'What PitchBook does better than us — honestly.',
  calloutBody: 'PitchBook has millions of transactions, Morningstar-linked comparable multiples, and a mature Excel plug-in workflow. If your team runs on Excel and needs global exit data, PitchBook is the right choice. That is not who LabelNest is built for yet.',
  finalTag: 'Try before deciding',
  finalHeading: '40,000+ entities. Free tier available.',
  finalBody: 'Open NestLens and see for yourself. No credit card, no sales call.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Try NestLens Free ↗', external: true },
  finalSecondaryCta: { href: '/vs/preqin', label: 'Also see: vs Preqin →' },
}

export default function VsPitchbookPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/pitchbook' }, { name: 'PitchBook', path: '/vs/pitchbook' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
