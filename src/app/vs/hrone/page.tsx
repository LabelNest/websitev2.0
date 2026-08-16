import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/hrone', {
    title: 'HROne Alternatives for Startups — NestHR vs HROne',
    description: 'Looking for an HROne alternative? How NestHR compares on pricing, modules, and campus placement — flat per-employee pricing with PlacementOS included, no 50-user minimum.',
  })
}

const DATA: VsPageData = {
  slug: 'hrone',
  category: 'nesthr',
  competitorName: 'HROne',
  ourName: 'NestHR',
  h1: 'HROne Alternatives for Startups: NestHR vs HROne',
  subhead: 'HROne is built for Indian SMB and mid-market companies (100-5,000 employees) — transparent per-user pricing from ₹85/month (Basic), but with a 50-user minimum. NestHR has no user minimum and bundles PlacementOS for campus and startup hiring into every plan.',
  primaryCta: { href: '/nesthr', label: 'Explore NestHR →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When HROne is right. When NestHR is right.',
  tldrLeftLabel: 'Pick HROne if',
  tldrRightLabel: 'Pick NestHR if',
  tldrLeftPoints: [
    'Your company has 100+ employees (HROne\'s 50-user minimum applies to all plans)',
    'A productivity-led Inbox UI and native Indian compliance depth matter to you',
    'You want transparent per-user pricing (₹85-115/month) with a 10% annual discount',
    'Recruitment depth beyond campus placement is your priority',
  ],
  tldrRightPoints: [
    'You are a smaller startup without 50+ employees yet, so a user minimum doesn\'t fit',
    'You need campus recruitment or placement-specific hiring tools, not just recruitment generally',
    'You want all modules included at every tier from day one',
    'You are a startup or college that needs PlacementOS specifically',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: '₹85-115/user/month, published, but 50-user minimum on every plan', verdict: 'mid' }, labelnest: { text: '₹799-₹1,299/employee/year flat, no minimum team size', verdict: 'win' } },
    { feature: 'Minimum company size', competitor: { text: '50 users minimum on all plans', verdict: 'no' }, labelnest: { text: 'No minimum stated', verdict: 'win' } },
    { feature: 'Campus / placement hiring', competitor: { text: 'Recruitment module present but not campus/placement-specific', verdict: 'no' }, labelnest: { text: 'PlacementOS — learns from every selection/rejection signal', verdict: 'win' } },
    { feature: 'Module access', competitor: { text: 'Tiered — Basic, Professional, Enterprise unlock more features', verdict: 'mid' }, labelnest: { text: 'All 7 OS modules included at every tier', verdict: 'win' } },
    { feature: 'Target company size', competitor: { text: '100-5,000 employees — SMB/mid-market focus', verdict: 'mid' }, labelnest: { text: 'Startups, SMEs, and colleges of any size', verdict: 'win' } },
    { feature: 'Compliance depth', competitor: { text: 'Native Indian compliance built for SMB/mid-market complexity', verdict: 'win' }, labelnest: { text: 'India-native by design, less specialized for mid-market complexity', verdict: 'mid' } },
  ],
  calloutTitle: 'What HROne does better than us — honestly.',
  calloutBody: 'HROne\'s productivity-led Inbox UI and native Indian compliance depth are genuinely built for companies at the 100-5,000 employee range with more complex recruitment needs beyond campus hiring. If you\'re at that scale, HROne\'s focus is real.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'SMB/mid-market HRMS vs. startup-and-college-first HR + placement OS.',
    body: "HROne's assumption: companies with 50+ employees need a productivity-focused HRMS with deep compliance tooling. NestHR's assumption: startups and colleges — regardless of size — need HR and campus hiring bundled together, with no minimum team size. If you're earlier-stage than HROne's 50-user floor, NestHR was built for you.",
  },
  finalTag: 'Simple. Per employee. No hidden modules.',
  finalHeading: 'All 7 OS modules included. INR pricing.',
  finalBody: 'No forex tax, no per-seat tricks. See what NestHR includes at every tier.',
  finalPrimaryCta: { href: 'https://nesthr.labelnest.in', label: 'Try NestHR ↗', external: true },
  finalSecondaryCta: { href: '/vs/pocket-hrms', label: 'Also see: vs Pocket HRMS →' },
}

export default function VsHROnePage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/hrone' }, { name: 'HROne', path: '/vs/hrone' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
