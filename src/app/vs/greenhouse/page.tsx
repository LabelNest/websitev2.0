import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/greenhouse', {
    title: 'Greenhouse Alternatives — NestHR vs Greenhouse',
    description: 'Looking for a Greenhouse alternative? How NestHR\'s Talent OS + PlacementOS compares — bundled hiring and HR built for India vs Greenhouse\'s standalone, enterprise-priced US ATS.',
  })
}

const DATA: VsPageData = {
  slug: 'greenhouse',
  category: 'nesthr',
  competitorName: 'Greenhouse',
  ourName: 'NestHR',
  h1: 'Greenhouse Alternatives: NestHR vs Greenhouse',
  subhead: 'Greenhouse is a leading standalone ATS — structured interview kits, DEI analytics, and 500+ integrations, priced from roughly $5,100/year (Core) to $70,000+/year (enterprise Pro), median contract around $12,250/year. NestHR bundles hiring — including campus recruitment via PlacementOS — into a full HR system priced simply per employee in INR.',
  primaryCta: { href: '/nesthr', label: 'Explore NestHR →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Greenhouse is a standalone enterprise ATS. NestHR bundles hiring with HR for India.',
  tldrLeftLabel: 'Pick Greenhouse if',
  tldrRightLabel: 'Pick NestHR if',
  tldrLeftPoints: [
    'You need a dedicated, enterprise-grade ATS with structured interview kits and DEI analytics',
    'You already have a separate HRMS and just need best-in-class recruiting software',
    'A 500+ integration ecosystem and granular add-on modules matter to your stack',
    'You have $5,100-$70,000+/year budget for recruiting software alone',
  ],
  tldrRightPoints: [
    'You want hiring — including campus recruitment — bundled with your whole HR system',
    'You need PlacementOS specifically for campus and startup hiring',
    'You want INR-native, simple per-employee pricing, not USD enterprise ATS pricing',
    'You are a startup or college in India, not a large US-market enterprise',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Standalone, enterprise-grade applicant tracking system', verdict: 'win' }, labelnest: { text: 'Full HR system with Talent OS + PlacementOS bundled in', verdict: 'win' } },
    { feature: 'Campus / placement hiring', competitor: { text: 'Not a specialization — general enterprise recruiting', verdict: 'no' }, labelnest: { text: 'PlacementOS is the flagship module, learns from every signal', verdict: 'win' } },
    { feature: 'Pricing', competitor: { text: '$5,100-$70,000+/year, quote-based, median ~$12,250/year — recruiting software only', verdict: 'no' }, labelnest: { text: '₹799-₹1,299/employee/year — includes all 7 HR modules, not just hiring', verdict: 'win' } },
    { feature: 'Interview structure / DEI analytics', competitor: { text: 'Structured interview kits, bias nudges, inclusion analytics', verdict: 'win' }, labelnest: { text: 'Not the primary focus — signal-based shortlisting instead', verdict: 'mid' } },
    { feature: 'Broader HR functions', competitor: { text: 'Not offered — recruiting only, needs a separate HRMS', verdict: 'no' }, labelnest: { text: 'People OS + Performance OS + Expense OS included alongside hiring', verdict: 'win' } },
    { feature: 'Integration ecosystem', competitor: { text: '500+ partner integrations', verdict: 'win' }, labelnest: { text: 'Fewer integrations — bundled-suite approach instead', verdict: 'no' } },
  ],
  calloutTitle: 'What Greenhouse does better than us — honestly.',
  calloutBody: 'Greenhouse\'s structured interview kits, DEI analytics, and 500+ integrations are genuinely best-in-class for large organizations running high-volume, standardized hiring processes. If you need a dedicated enterprise ATS layered onto an existing HR stack, Greenhouse\'s depth is real.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Standalone enterprise ATS vs. bundled hiring + HR for India.',
    body: "Greenhouse's assumption: recruiting deserves a dedicated, enterprise-priced platform separate from your HRMS. NestHR's assumption: for startups and colleges in India, hiring — especially campus recruitment — should be one module within a bundled, INR-priced HR system, not a separate US-enterprise-priced product. If Greenhouse's scale and price point don't fit your stage, NestHR's Talent OS was built for you.",
  },
  finalTag: 'Simple. Per employee. No hidden modules.',
  finalHeading: 'All 7 OS modules included. INR pricing.',
  finalBody: 'No forex tax, no per-seat tricks. See what NestHR includes at every tier.',
  finalPrimaryCta: { href: 'https://nesthr.labelnest.in', label: 'Try NestHR ↗', external: true },
  finalSecondaryCta: { href: '/vs/ashby', label: 'Also see: vs Ashby →' },
}

export default function VsGreenhousePage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/greenhouse' }, { name: 'Greenhouse', path: '/vs/greenhouse' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
