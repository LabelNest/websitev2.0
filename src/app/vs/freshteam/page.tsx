import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/freshteam', {
    title: 'Freshteam Alternatives — NestHR vs Freshteam',
    description: 'Looking for a Freshteam alternative? How NestHR\'s Talent OS + PlacementOS compares — full campus and startup hiring depth vs Freshteam\'s lightweight SMB recruiting add-on.',
  })
}

const DATA: VsPageData = {
  slug: 'freshteam',
  category: 'nesthr',
  competitorName: 'Freshteam',
  ourName: 'NestHR',
  h1: 'Freshteam Alternatives: NestHR vs Freshteam',
  subhead: 'Freshteam (by Freshworks) is an affordable, all-in-one HR tool for SMBs — from $1.20/employee/month, with basic applicant tracking and a free plan up to 50 employees. Its recruiting functionality is intentionally lightweight: no CRM, no AI sourcing, limited analytics. NestHR\'s Talent OS + PlacementOS module is built specifically for campus and startup hiring depth.',
  primaryCta: { href: '/nesthr', label: 'Explore NestHR →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When Freshteam is right. When NestHR is right.',
  tldrLeftLabel: 'Pick Freshteam if',
  tldrRightLabel: 'Pick NestHR if',
  tldrLeftPoints: [
    'You want the cheapest possible entry point — free up to 50 employees',
    'Basic applicant tracking alongside general HR tools is enough for your hiring needs',
    'You need India-specific job-board integrations (Naukri RMS, Indeed, LinkedIn)',
    'You don\'t need campus recruitment or a hiring system that learns from selection signals',
  ],
  tldrRightPoints: [
    'You need campus recruitment or startup hiring depth, not basic applicant tracking',
    'You want a hiring system that improves from every selection/rejection signal',
    'You want all 7 modules included at a flat per-employee-per-year price',
    'You are a startup or college that needs PlacementOS specifically',
  ],
  tableRows: [
    { feature: 'Recruiting/ATS depth', competitor: { text: 'Basic applicant tracking, no CRM, no AI sourcing, limited analytics', verdict: 'no' }, labelnest: { text: 'Talent OS + PlacementOS, learns from every selection/rejection signal', verdict: 'win' } },
    { feature: 'Campus / placement hiring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'PlacementOS is the flagship module, built for campus recruitment', verdict: 'win' } },
    { feature: 'Pricing model', competitor: { text: 'Free up to 50 employees; $1.20-$4.80/employee/month paid tiers', verdict: 'win' }, labelnest: { text: '₹799-₹1,299/employee/year, all modules included', verdict: 'win' } },
    { feature: 'India job-board integrations', competitor: { text: 'Naukri RMS, Indeed, LinkedIn, Razorpay payroll', verdict: 'win' }, labelnest: { text: 'India-native by design; specific job-board integrations not the primary pitch', verdict: 'mid' } },
    { feature: 'General HR tools', competitor: { text: 'Employee profiles, onboarding, time off — SMB-focused', verdict: 'win' }, labelnest: { text: 'People OS + Performance OS + Expense OS included', verdict: 'win' } },
    { feature: 'Module access', competitor: { text: 'Tiered — Growth, Pro, Enterprise unlock more features', verdict: 'mid' }, labelnest: { text: 'All 7 OS modules included at every tier', verdict: 'win' } },
  ],
  calloutTitle: 'What Freshteam does better than us — honestly.',
  calloutBody: 'Freshteam\'s free tier and India-specific job-board integrations (Naukri RMS especially) are genuinely useful for a cash-strapped SMB that just needs basic hiring alongside general HR. If cost is your only constraint and you don\'t need campus-specific hiring depth, Freshteam\'s free plan is hard to beat.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Lightweight recruiting add-on vs. a hiring system built for campus and startups.',
    body: "Freshteam's assumption: recruiting is one lightweight feature bolted onto a broader affordable HR tool. NestHR's assumption: hiring — especially campus recruitment — deserves its own dedicated system that learns from every signal, not a basic applicant tracker. If Freshteam's recruiting depth feels thin for your actual hiring needs, NestHR's Talent OS was built for that.",
  },
  finalTag: 'Simple. Per employee. No hidden modules.',
  finalHeading: 'All 7 OS modules included. INR pricing.',
  finalBody: 'No forex tax, no per-seat tricks. See what NestHR includes at every tier.',
  finalPrimaryCta: { href: 'https://nesthr.labelnest.in', label: 'Try NestHR ↗', external: true },
  finalSecondaryCta: { href: '/vs/greenhouse', label: 'Also see: vs Greenhouse →' },
}

export default function VsFreshteamPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/freshteam' }, { name: 'Freshteam', path: '/vs/freshteam' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
