import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/crunchbase', {
    title: 'LabelNest vs Crunchbase — Private Markets Data Comparison',
    description: 'How LabelNest compares to Crunchbase on pricing, depth, and India/SE Asia coverage for investors and analysts researching private companies and funds.',
  })
}

const DATA: VsPageData = {
  slug: 'crunchbase',
  category: 'intelligence',
  competitorName: 'Crunchbase',
  ourName: 'LabelNest',
  h1: 'LabelNest vs Crunchbase: Honest Comparison for Investors and Analysts',
  subhead: 'Crunchbase is the default starting point for company and funding lookups worldwide — broad, self-serve, and well known. LabelNest goes deeper on the funds, LPs, and service-provider side, with a data marketplace and investor data rooms Crunchbase does not offer. Here is the direct comparison.',
  primaryCta: { href: '/nestlens', label: 'Explore NestLens →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When Crunchbase is right. When LabelNest is right.',
  tldrLeftLabel: 'Pick Crunchbase if',
  tldrRightLabel: 'Pick LabelNest if',
  tldrLeftPoints: [
    'You need broad, self-serve company and funding lookups across 4M+ companies globally',
    'A per-seat monthly plan ($49-$99/user/month) fits your budget better than a fund-scale contract',
    'You mainly need company/founder/funding-round data, not fund or LP-side depth',
    'CRM sync and team saved-search workflows are the main use case',
  ],
  tldrRightPoints: [
    'You need fund, LP, GP, and service-provider data, not just company/funding lookups',
    'India, Southeast Asia, and Gulf private-market depth matters',
    'You want credit-based access, not a recurring per-seat subscription',
    'You need a data marketplace and investor data rooms in the same tool',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: '$49/user/month (Starter) to $99/user/month (Pro), Enterprise quoted, billed annually', verdict: 'mid' }, labelnest: { text: 'Credit-based, no per-seat penalty, pay for what you use', verdict: 'win' } },
    { feature: 'Company coverage', competitor: { text: '4M+ companies globally', verdict: 'win' }, labelnest: { text: '40,000+ entities, India, SE Asia, and Gulf focus', verdict: 'mid' } },
    { feature: 'India private markets depth', competitor: { text: 'Present as part of global coverage, thinner on early-stage India deals', verdict: 'mid' }, labelnest: { text: 'Deep — companies, funds, deals, LPs, service providers', verdict: 'win' } },
    { feature: 'Fund and LP data', competitor: { text: 'Limited — Crunchbase is company/founder/funding-round centric', verdict: 'no' }, labelnest: { text: 'Funds, LPs, GPs, and service providers as first-class entities', verdict: 'win' } },
    { feature: 'API access', competitor: { text: 'Enterprise-only, priced by call volume', verdict: 'mid' }, labelnest: { text: 'API available, expanding', verdict: 'mid' } },
    { feature: 'Data marketplace', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'NestLens Exchange — buy and sell data with KYC and escrow', verdict: 'win' } },
    { feature: 'Investor data rooms', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, investor tier scoring', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered as a workflow', verdict: 'no' }, labelnest: { text: 'Live matching for emerging managers', verdict: 'win' } },
    { feature: 'Human verification', competitor: { text: 'Mostly crowd-sourced and automated', verdict: 'mid' }, labelnest: { text: 'Human review at every low-confidence flag', verdict: 'win' } },
    { feature: 'Free tier', competitor: { text: 'Free basic search, full results require Pro', verdict: 'mid' }, labelnest: { text: 'Self-serve free tier, no credit card', verdict: 'win' } },
    { feature: 'CRM sync', competitor: { text: 'Built-in team accounts, shared lists, CRM sync', verdict: 'win' }, labelnest: { text: 'Not a CRM workflow tool — data and marketplace focused', verdict: 'no' } },
  ],
  calloutTitle: 'What Crunchbase does better than us — honestly.',
  calloutBody: 'Crunchbase has broader global company coverage, a much larger user base, and a mature self-serve product with CRM sync and team workflows that make it the default first stop for a quick company or funding-round lookup. If that is your main use case, Crunchbase is the faster, cheaper starting point. LabelNest is not trying to replace that — it goes deeper where Crunchbase does not: funds, LPs, and India/SE Asia depth.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Company lookup tool vs. fund-and-LP intelligence platform.',
    body: "Crunchbase's assumption: broad, self-serve coverage of companies and funding rounds globally, priced per seat, useful the moment you sign up. LabelNest's assumption: investors and analysts who need the fund, LP, and GP side of the market — not just company data — with real depth in India, SE Asia, and the Gulf, plus a marketplace and data rooms Crunchbase doesn't build. If you've hit Crunchbase's ceiling on fund-side data, LabelNest was built for the next step.",
  },
  finalTag: 'See LabelNest for yourself',
  finalHeading: '40,000+ entities. Credit-based. Free tier available.',
  finalBody: 'Open NestLens, browse the data, and decide for yourself. No credit card, no sales call required.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Try NestLens Free ↗', external: true },
  finalSecondaryCta: { href: '/vs/pitchbook', label: 'Also see: vs PitchBook →' },
}

export default function VsCrunchbasePage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/crunchbase' }, { name: 'Crunchbase', path: '/vs/crunchbase' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
