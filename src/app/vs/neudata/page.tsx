import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/neudata', {
    title: 'NestLens vs Neudata — Alternative Data Research vs Data Marketplace',
    description: 'How NestLens compares to Neudata for alternative data discovery — research and vendor vetting vs an actual marketplace you can transact on.',
  })
}

const DATA: VsPageData = {
  slug: 'neudata',
  competitorName: 'Neudata',
  ourName: 'NestLens',
  h1: 'NestLens vs Neudata: Research Tool or Marketplace You Can Actually Transact On?',
  subhead: "Neudata is a research and due-diligence platform — it helps institutional buyers discover and vet alternative data vendors, mostly for quant and investment research use cases. NestLens is different: intelligence, a live marketplace, and capital readiness tools you actually use, not just research about the market.",
  primaryCta: { href: '/nestlens', label: 'Explore NestLens →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Neudata tells you who to buy from. NestLens is somewhere you can buy, sell, and act.',
  tldrLeftLabel: 'Pick Neudata if',
  tldrLeftPoints: [
    'You are an institutional quant or investment team vetting alternative data vendors',
    'You need ongoing compliance and risk monitoring on vendors you already use',
    'Market data pricing intelligence (via Neudata Ranger) is a core need',
    'You want unbiased consultancy, not a place to transact',
  ],
  tldrRightLabel: 'Pick NestLens if',
  tldrRightPoints: [
    'You want to actually browse, buy, or sell data — not just research who sells it',
    'Private markets — funds, deals, companies, verified contacts — is your focus',
    'You also need a data room and investor matching for fundraising',
    'You want India, SE Asia, and Gulf coverage specifically',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Vendor discovery and due diligence research', verdict: 'mid' }, labelnest: { text: 'Intelligence, live marketplace, and capital readiness in one platform', verdict: 'win' } },
    { feature: 'Can you transact on it', competitor: { text: 'No — research and introductions only', verdict: 'no' }, labelnest: { text: 'Yes — NestLens Exchange is a real KYC-verified, escrow-protected marketplace', verdict: 'win' } },
    { feature: 'Vendor compliance and risk monitoring', competitor: { text: 'Core strength — ongoing vendor risk tracking', verdict: 'win' }, labelnest: { text: 'KYC at listing time, not continuous vendor monitoring', verdict: 'mid' } },
    { feature: 'Private markets entity intelligence', competitor: { text: 'Not offered — focused on data vendors, not companies or funds', verdict: 'no' }, labelnest: { text: '40,000+ entities, 12,000+ verified contacts', verdict: 'win' } },
    { feature: 'Alternative data pricing intelligence', competitor: { text: 'Pricing intelligence on 2,000+ data products', verdict: 'win' }, labelnest: { text: 'Not a focus area', verdict: 'no' } },
    { feature: 'Investor data rooms', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Capital Readiness module included', verdict: 'win' } },
    { feature: 'Pricing model', competitor: { text: 'Sales-quoted, institutional contracts', verdict: 'mid' }, labelnest: { text: 'Credit-based, self-serve free tier available', verdict: 'win' } },
    { feature: 'India private markets focus', competitor: { text: 'Global, not India-specific', verdict: 'mid' }, labelnest: { text: 'Deep India, SE Asia, Gulf coverage', verdict: 'win' } },
  ],
  calloutTitle: 'What Neudata does better than us — honestly.',
  calloutBody: "Neudata's specialty is real and narrow: ongoing vendor risk and compliance monitoring for institutional data buyers, plus deep pricing intelligence across thousands of data products. If you're a quant fund that already buys alternative data and needs to know which vendors are compliant and which are losing traction, Neudata does that better than NestLens does — because NestLens isn't built for that job at all.",
  finalTag: 'A platform you actually use, not just research',
  finalHeading: '40,000+ entities. A real marketplace. Self-serve free tier.',
  finalBody: 'Open NestLens and see for yourself. No sales call required to start.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Try NestLens Free ↗', external: true },
  finalSecondaryCta: { href: '/vs/datarade', label: 'Also see: Exchange vs Datarade →' },
}

export default function VsNeudataPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/neudata' }, { name: 'Neudata', path: '/vs/neudata' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
