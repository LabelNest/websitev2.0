import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/ashby', {
    title: 'Ashby Alternatives — NestHR vs Ashby',
    description: 'Looking for an Ashby alternative? How NestHR\'s Talent OS + PlacementOS compares — bundled hiring and HR for India vs Ashby\'s standalone, analytics-first ATS for growth-stage teams.',
  })
}

const DATA: VsPageData = {
  slug: 'ashby',
  category: 'nesthr',
  competitorName: 'Ashby',
  ourName: 'NestHR',
  h1: 'Ashby Alternatives: NestHR vs Ashby',
  subhead: 'Ashby is an analytics-first standalone ATS — applicant tracking, candidate CRM, and pipeline analytics bundled together, from $400/month (Foundations, up to 100 employees) with an elevated-seat pricing model for hiring managers. It fits Series A-to-late-growth teams; Ashby itself says it\'s overkill for very early startups. NestHR bundles hiring — including campus recruitment — into a full HR system priced simply per employee in INR.',
  primaryCta: { href: '/nesthr', label: 'Explore NestHR →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Ashby is a standalone growth-stage ATS. NestHR bundles hiring with HR for India.',
  tldrLeftLabel: 'Pick Ashby if',
  tldrRightLabel: 'Pick NestHR if',
  tldrLeftPoints: [
    'You are Series A to late-growth stage with an established recruiting funnel to optimize',
    'Real-time recruiting metrics and pipeline health dashboards are a core need',
    'You already have a separate HRMS and just need best-in-class recruiting analytics',
    'You have $400-$1,500+/month budget for recruiting software alone, with elevated-seat pricing for hiring managers',
  ],
  tldrRightPoints: [
    'You are earlier-stage — Ashby itself says it\'s overkill before you\'ve made your first 20 hires',
    'You want hiring — including campus recruitment — bundled with your whole HR system',
    'You need PlacementOS specifically for campus and startup hiring',
    'You want INR-native, simple per-employee pricing, not USD ATS pricing with seat tiers',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Standalone, analytics-first ATS with candidate CRM', verdict: 'win' }, labelnest: { text: 'Full HR system with Talent OS + PlacementOS bundled in', verdict: 'win' } },
    { feature: 'Campus / placement hiring', competitor: { text: 'Not a specialization — general growth-stage recruiting', verdict: 'no' }, labelnest: { text: 'PlacementOS is the flagship module, learns from every signal', verdict: 'win' } },
    { feature: 'Pricing', competitor: { text: '$400-$1,500+/month, elevated-seat pricing for hiring managers/admins', verdict: 'no' }, labelnest: { text: '₹799-₹1,299/employee/year — includes all 7 HR modules, not just hiring', verdict: 'win' } },
    { feature: 'Recruiting analytics', competitor: { text: 'Real-time pipeline health dashboards, customizable reports, no third-party tools needed', verdict: 'win' }, labelnest: { text: 'Not the primary focus — signal-based shortlisting instead', verdict: 'mid' } },
    { feature: 'Stage fit', competitor: { text: 'Series A to late-growth; explicitly not built for very early startups', verdict: 'mid' }, labelnest: { text: 'Built for startups and colleges of any size, no stage minimum', verdict: 'win' } },
    { feature: 'Broader HR functions', competitor: { text: 'Not offered — recruiting only, needs a separate HRMS', verdict: 'no' }, labelnest: { text: 'People OS + Performance OS + Expense OS included alongside hiring', verdict: 'win' } },
  ],
  calloutTitle: 'What Ashby does better than us — honestly.',
  calloutBody: 'Ashby\'s analytics-first approach — real-time pipeline health dashboards without exporting to a spreadsheet — is genuinely strong for growth-stage teams that have outgrown a basic ATS and need to optimize an established recruiting funnel. By Ashby\'s own positioning, that\'s not early-stage startups, though — which is exactly where NestHR is built to help.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Standalone growth-stage ATS vs. bundled hiring + HR for India.',
    body: "Ashby's assumption: growth-stage companies with an established funnel need dedicated recruiting analytics, priced and seated accordingly. NestHR's assumption: earlier-stage startups and colleges need hiring — especially campus recruitment — bundled into one INR-priced HR system from day one, not a separate recruiting-analytics product meant for later-stage teams.",
  },
  finalTag: 'Simple. Per employee. No hidden modules.',
  finalHeading: 'All 7 OS modules included. INR pricing.',
  finalBody: 'No forex tax, no per-seat tricks. See what NestHR includes at every tier.',
  finalPrimaryCta: { href: 'https://nesthr.labelnest.in', label: 'Try NestHR ↗', external: true },
  finalSecondaryCta: { href: '/vs/greenhouse', label: 'Also see: vs Greenhouse →' },
}

export default function VsAshbyPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/ashby' }, { name: 'Ashby', path: '/vs/ashby' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
