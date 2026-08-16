import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/rippling', {
    title: 'Rippling Alternatives for India — NestHR vs Rippling',
    description: 'Looking for a Rippling alternative for your India team? How NestHR compares — INR per-employee-per-year pricing with PlacementOS included vs Rippling\'s USD modular pricing built for global/US-first companies.',
  })
}

const DATA: VsPageData = {
  slug: 'rippling',
  category: 'nesthr',
  competitorName: 'Rippling',
  ourName: 'NestHR',
  h1: 'Rippling Alternatives for India: NestHR vs Rippling',
  subhead: 'Rippling is a powerful global HR, IT, and payroll platform — from $8/employee/month base plus a mandatory platform fee, but most companies pay $25-$50+/employee/month once HR, payroll, and IT modules are added. NestHR is built specifically for India — INR pricing, all modules included, no modular upsells.',
  primaryCta: { href: '/nesthr', label: 'Explore NestHR →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Rippling is a global HR+IT platform. NestHR is built for India.',
  tldrLeftLabel: 'Pick Rippling if',
  tldrRightLabel: 'Pick NestHR if',
  tldrLeftPoints: [
    'You need unified HR, IT device management, and payroll across multiple countries',
    'You have a US or global-first structure and USD pricing isn\'t a friction point',
    'A modular add-on system ($6-10/employee for payroll, $8-12/employee for IT) fits your needs',
    'You need Employer of Record services in multiple countries beyond India',
  ],
  tldrRightPoints: [
    'You are an India-based startup or college that doesn\'t need global IT/payroll infrastructure',
    'You want INR-native pricing without a mandatory platform fee or modular add-ons',
    'You need campus recruitment or startup hiring tools, not global HR+IT',
    'You want every module included at a flat per-employee-per-year price',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: 'From $8/employee/month base + $35-40/month platform fee; most pay $25-$50+/employee/month with modules', verdict: 'no' }, labelnest: { text: '₹799-₹1,299/employee/year (INR), all modules included', verdict: 'win' } },
    { feature: 'Campus / placement hiring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'PlacementOS — learns from every selection/rejection signal', verdict: 'win' } },
    { feature: 'IT device management', competitor: { text: 'Included as a module (adds $8-12/employee)', verdict: 'win' }, labelnest: { text: 'Not offered — HR and hiring focused', verdict: 'no' } },
    { feature: 'Multi-country payroll / EOR', competitor: { text: 'Global EOR from $499-$599/employee/month per country', verdict: 'win' }, labelnest: { text: 'Not offered — India-focused', verdict: 'no' } },
    { feature: 'India-specific compliance', competitor: { text: 'Not a specialization — global platform', verdict: 'no' }, labelnest: { text: 'Native Indian founder and compliance context', verdict: 'win' } },
    { feature: 'Pricing transparency', competitor: { text: 'Base fee published; most module and global pricing is quote-based', verdict: 'mid' }, labelnest: { text: 'Fully published on the pricing page', verdict: 'win' } },
  ],
  calloutTitle: 'What Rippling does better than us — honestly.',
  calloutBody: 'Rippling\'s unified HR, IT, and global payroll platform is genuinely powerful for companies operating across multiple countries with distributed teams and device fleets to manage. If that\'s your actual operating model, Rippling\'s breadth is real — NestHR doesn\'t try to compete on global IT/payroll infrastructure.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Global HR+IT infrastructure vs. India-native HR + placement OS.',
    body: "Rippling's assumption: growing companies need unified HR, IT, and payroll across multiple countries, priced modularly in USD. NestHR's assumption: an India-based startup or college doesn't need global IT infrastructure — it needs HR and campus hiring bundled together, priced simply in INR without forex friction.",
  },
  finalTag: 'Simple. Per employee. No hidden modules.',
  finalHeading: 'All 7 OS modules included. INR pricing.',
  finalBody: 'No forex tax, no per-seat tricks. See what NestHR includes at every tier.',
  finalPrimaryCta: { href: 'https://nesthr.labelnest.in', label: 'Try NestHR ↗', external: true },
  finalSecondaryCta: { href: '/vs/deel', label: 'Also see: vs Deel →' },
}

export default function VsRipplingPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/rippling' }, { name: 'Rippling', path: '/vs/rippling' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
