import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/bloomberg', {
    title: 'LabelNest vs Bloomberg Terminal — Private Markets Data Comparison',
    description: 'How LabelNest compares to the Bloomberg Terminal for private-market research — a purpose-built, credit-based tool vs a $31,980/year public-markets terminal.',
  })
}

const DATA: VsPageData = {
  slug: 'bloomberg',
  category: 'intelligence',
  competitorName: 'Bloomberg Terminal',
  ourName: 'LabelNest',
  h1: 'LabelNest vs Bloomberg Terminal: Private Markets Tool vs Public Markets Terminal',
  subhead: "The Bloomberg Terminal is the industry standard for real-time market data, fixed income, equities, and news — built for public markets, not private companies or funds. LabelNest is built specifically for private markets in India, SE Asia, and the Gulf, at a fraction of the cost. Here is the direct comparison.",
  primaryCta: { href: '/nestlens', label: 'Explore NestLens →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When Bloomberg is right. When LabelNest is right.',
  tldrLeftLabel: 'Pick Bloomberg if',
  tldrRightLabel: 'Pick LabelNest if',
  tldrLeftPoints: [
    'Real-time public-market data, fixed income, and equities is your primary need',
    'You need the Bloomberg chat/messaging network for institutional deal flow and trading',
    'You have $28,320-$31,980/seat/year budget and a 2-year minimum contract',
    'Private-market data is a nice-to-have alongside a much broader public-markets workflow',
  ],
  tldrRightPoints: [
    'Private markets — companies, funds, deals, LPs — is your primary need, not public markets',
    'India, Southeast Asia, and Gulf coverage matters',
    'You want credit-based access, not a $30K+/seat/year, 2-year-minimum terminal contract',
    'You need a data marketplace and investor data rooms in the same tool',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: '$31,980/seat/year single terminal, $28,320/seat/year on multi-terminal contracts, 2-year typical minimum', verdict: 'no' }, labelnest: { text: 'Credit-based, no seat minimum, pay for what you use', verdict: 'win' } },
    { feature: 'Primary focus', competitor: { text: 'Real-time public markets, fixed income, equities, macro, news', verdict: 'win' }, labelnest: { text: 'Private markets is the entire product — companies, funds, deals, LPs', verdict: 'win' } },
    { feature: 'Private-market depth', competitor: { text: 'Present, but secondary to the terminal\'s public-markets core', verdict: 'no' }, labelnest: { text: 'Deep — companies, funds, deals, LPs, service providers', verdict: 'win' } },
    { feature: 'India private markets depth', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: '40,000+ entities, India, SE Asia, and Gulf focus', verdict: 'win' } },
    { feature: 'Free access', competitor: { text: 'No free tier, no self-serve trial', verdict: 'no' }, labelnest: { text: 'Self-serve free tier, no credit card, no sales call', verdict: 'win' } },
    { feature: 'Real-time market data / news', competitor: { text: 'Industry-standard, real-time across asset classes', verdict: 'win' }, labelnest: { text: 'Not a real-time public-markets feed — by design', verdict: 'no' } },
    { feature: 'Data marketplace', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'NestLens Exchange — buy and sell data with KYC and escrow', verdict: 'win' } },
    { feature: 'Investor data rooms', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, investor tier scoring', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered as a workflow', verdict: 'no' }, labelnest: { text: 'Live matching for emerging managers', verdict: 'win' } },
    { feature: 'Hardware / setup cost', competitor: { text: 'Proprietary keyboard (~$300) plus installation, pushing real first-year cost to $33K-$35K/seat', verdict: 'no' }, labelnest: { text: 'Browser-based, no hardware or installation', verdict: 'win' } },
  ],
  calloutTitle: 'What Bloomberg does better than us — honestly.',
  calloutBody: "The Bloomberg Terminal is the industry standard for a reason — real-time public-market data, fixed income, equities, macro, and the Bloomberg chat network that institutional trading desks run on. If that is what you actually need, nothing else fully replaces it. LabelNest is not trying to be a Bloomberg replacement. It is built for a different job: private markets, not public ones.",
  extra: {
    tag: 'The philosophical difference',
    heading: 'A public-markets terminal vs. a private-markets tool.',
    body: "Bloomberg's assumption: institutional trading and research desks need one real-time terminal spanning every public asset class, priced at $30K+/seat/year with a multi-year commitment. LabelNest's assumption: if your actual job is private markets — companies, funds, deals, LPs in India, SE Asia, and the Gulf — you shouldn't be paying public-markets-terminal prices to get it. If you've never used most of what a Bloomberg seat includes, LabelNest was built for you.",
  },
  finalTag: 'See LabelNest for yourself',
  finalHeading: '40,000+ entities. Credit-based. Free tier available.',
  finalBody: 'Open NestLens, browse the data, and decide for yourself. No credit card, no sales call required.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Try NestLens Free ↗', external: true },
  finalSecondaryCta: { href: '/vs/capital-iq', label: 'Also see: vs S&P Capital IQ →' },
}

export default function VsBloombergPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/bloomberg' }, { name: 'Bloomberg Terminal', path: '/vs/bloomberg' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
