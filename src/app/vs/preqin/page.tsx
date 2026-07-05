import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/preqin', {
    title: 'LabelNest vs Preqin — Private Markets Data Comparison',
    description: 'How LabelNest compares to Preqin on pricing, coverage, India depth, and lock-in. Honest comparison for emerging managers evaluating both.',
  })
}

const DATA: VsPageData = {
  slug: 'preqin',
  competitorName: 'Preqin',
  ourName: 'LabelNest',
  h1: 'LabelNest vs Preqin: Honest Comparison for Emerging Managers',
  subhead: 'Preqin is the incumbent. LabelNest is what emerging managers, boutique funds, and analysts actually use when the incumbent is out of budget. Here is the direct comparison — no marketing spin.',
  primaryCta: { href: '/nestlens', label: 'Explore NestLens →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When Preqin is right. When LabelNest is right.',
  tldrLeftLabel: 'Pick Preqin if',
  tldrLeftPoints: [
    'You are an institutional LP or fund of funds with a six-figure budget',
    'Deep hedge fund and infrastructure fund coverage matters more than price',
    'You need historical data going back 20+ years',
    'Brand recognition in investor decks is a requirement',
  ],
  tldrRightLabel: 'Pick LabelNest if',
  tldrRightPoints: [
    'You are an emerging manager, boutique fund, or analyst',
    'India, Southeast Asia, and Gulf coverage matters',
    'You want credits-based access, not annual seat contracts',
    'You need a data marketplace and data rooms in the same tool',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: 'Annual seat contracts, $50K+ typical entry', verdict: 'no' }, labelnest: { text: 'Credit-based, no seat penalties, pay for what you use', verdict: 'win' } },
    { feature: 'Total entities tracked', competitor: { text: '300,000+ globally', verdict: 'win' }, labelnest: { text: '40,000+ (India, SE Asia, Gulf focus)', verdict: 'mid' } },
    { feature: 'Historical data depth', competitor: { text: '20+ years of fund performance', verdict: 'win' }, labelnest: { text: 'Building from 2024 forward', verdict: 'no' } },
    { feature: 'India private markets coverage', competitor: { text: 'Partial, weak on early-stage', verdict: 'mid' }, labelnest: { text: 'Deep — companies, funds, deals, LPs, service providers', verdict: 'win' } },
    { feature: 'Verified contacts', competitor: { text: 'Yes, but health scores unclear', verdict: 'mid' }, labelnest: { text: '12,000+ verified with visible health scores and tenure', verdict: 'win' } },
    { feature: 'Human verification', competitor: { text: 'Some, mostly automated', verdict: 'mid' }, labelnest: { text: 'Human review at every low-confidence flag', verdict: 'win' } },
    { feature: 'Data marketplace', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'NestLens Exchange — buy and sell data with KYC and escrow', verdict: 'win' } },
    { feature: 'Investor data rooms', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, investor tier scoring', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered as a workflow', verdict: 'no' }, labelnest: { text: 'Live matching for emerging managers', verdict: 'win' } },
    { feature: 'API access', competitor: { text: 'Full API, well documented', verdict: 'win' }, labelnest: { text: 'API available, expanding', verdict: 'mid' } },
    { feature: 'Support responsiveness', competitor: { text: 'Ticket queue, 24-48h typical', verdict: 'mid' }, labelnest: { text: 'Direct team access, same-day response', verdict: 'win' } },
    { feature: 'Data refresh cadence', competitor: { text: 'Daily to weekly', verdict: 'win' }, labelnest: { text: 'Daily signal feed', verdict: 'win' } },
    { feature: 'Ownership and lock-in', competitor: { text: 'Annual contract, exit friction', verdict: 'no' }, labelnest: { text: 'Month-to-month possible, credits do not expire', verdict: 'win' } },
    { feature: 'Free trial', competitor: { text: 'Sales demo only', verdict: 'no' }, labelnest: { text: 'Self-serve free tier', verdict: 'win' } },
  ],
  calloutTitle: 'What Preqin does better than us — honestly.',
  calloutBody: 'Preqin has 20+ years of historical fund performance data. It has broader global coverage in hedge funds, infrastructure, and natural resources. Its brand carries weight in institutional LP conversations. If those things are what you need, use Preqin. That is not who LabelNest is built for.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Two different assumptions about who the customer is.',
    body: "Preqin's assumption: institutional buyers with dedicated research teams and six-figure data budgets, wide coverage, trust the brand and pay for the breadth. LabelNest's assumption: emerging managers, boutique funds, and analysts who need the intelligence but cannot justify institutional pricing — go deep where they operate, add tools they cannot get elsewhere. Both approaches are valid. If you are in the room when a Preqin quote is unaffordable — LabelNest was built for you.",
  },
  finalTag: 'See LabelNest for yourself',
  finalHeading: '40,000+ entities. Credit-based. Free tier available.',
  finalBody: 'Open NestLens, browse the data, and decide for yourself. No credit card, no sales call required.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Try NestLens Free ↗', external: true },
  finalSecondaryCta: { href: '/vs/pitchbook', label: 'Also see: vs PitchBook →' },
}

export default function VsPreqinPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/preqin' }, { name: 'Preqin', path: '/vs/preqin' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
