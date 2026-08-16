import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/darwinbox', {
    title: 'NestHR vs Darwinbox — HR Software Comparison for India',
    description: 'How NestHR compares to Darwinbox — simple, transparent per-employee INR pricing with PlacementOS included vs Darwinbox\'s custom-quoted enterprise HRMS.',
  })
}

const DATA: VsPageData = {
  slug: 'darwinbox',
  category: 'nesthr',
  competitorName: 'Darwinbox',
  ourName: 'NestHR',
  h1: 'NestHR vs Darwinbox: Honest Comparison for Indian HR Teams',
  subhead: "Darwinbox is a large-scale enterprise HRMS — custom-quoted, roughly ₹60-₹450/employee/month depending on tier, with 8-12% annual subscription uplift and implementation costs of $5,000-$50,000. NestHR is transparent, published per-employee-per-year pricing with all 7 modules included, plus PlacementOS for campus and startup hiring.",
  primaryCta: { href: '/nesthr', label: 'Explore NestHR →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When Darwinbox is right. When NestHR is right.',
  tldrLeftLabel: 'Pick Darwinbox if',
  tldrRightLabel: 'Pick NestHR if',
  tldrLeftPoints: [
    'You are a large enterprise needing extensive customization and complex org structures',
    'You have budget for custom implementation ($5,000-$50,000) and annual contract uplift',
    'You need a platform proven at large-scale, multi-entity deployments',
    'Custom-quoted pricing tailored to your specific modules and scope works for your procurement process',
  ],
  tldrRightPoints: [
    'You want published, transparent per-employee pricing, not a custom quote process',
    'You need campus recruitment or startup hiring tools, not just general HR',
    'You want all modules included at every tier, no separate module negotiations',
    'You are a startup, SME, or college that doesn\'t need enterprise-scale customization',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: 'Custom-quoted, roughly ₹60-₹450/employee/month depending on tier, 8-12% annual uplift', verdict: 'no' }, labelnest: { text: '₹799-₹1,299/employee/year flat, published, all modules included', verdict: 'win' } },
    { feature: 'Pricing transparency', competitor: { text: 'Not published — sales-negotiated', verdict: 'no' }, labelnest: { text: 'Published on the pricing page', verdict: 'win' } },
    { feature: 'Campus / placement hiring', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'PlacementOS — learns from every selection/rejection signal', verdict: 'win' } },
    { feature: 'Implementation cost', competitor: { text: '$5,000-$50,000 depending on complexity', verdict: 'no' }, labelnest: { text: 'No stated separate implementation fee', verdict: 'win' } },
    { feature: 'Enterprise scale / customization', competitor: { text: 'Built for large, complex multi-entity organizations', verdict: 'win' }, labelnest: { text: 'Enterprise tier available but not the primary focus', verdict: 'mid' } },
    { feature: 'Market presence', competitor: { text: 'Established enterprise HRMS brand in India', verdict: 'win' }, labelnest: { text: 'Newer to market', verdict: 'no' } },
  ],
  calloutTitle: 'What Darwinbox does better than us — honestly.',
  calloutBody: 'Darwinbox is a genuinely capable enterprise HRMS built for large, complex organizations that need deep customization across multi-entity structures. If you\'re a large enterprise with that level of complexity and budget for custom implementation, Darwinbox\'s scale is real.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Enterprise-custom HRMS vs. transparent HR + placement OS.',
    body: "Darwinbox's assumption: large enterprises need a highly customizable platform with pricing scoped to their specific complexity. NestHR's assumption: most companies — especially startups and colleges — need transparent, predictable pricing and a hiring system that includes campus recruitment, not a custom enterprise quote process. If Darwinbox's scale is more than you need, NestHR was built for you.",
  },
  finalTag: 'Simple. Per employee. No hidden modules.',
  finalHeading: 'All 7 OS modules included. INR pricing.',
  finalBody: 'No forex tax, no per-seat tricks. See what NestHR includes at every tier.',
  finalPrimaryCta: { href: 'https://nesthr.labelnest.in', label: 'Try NestHR ↗', external: true },
  finalSecondaryCta: { href: '/vs/keka', label: 'Also see: vs Keka →' },
}

export default function VsDarwinboxPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/darwinbox' }, { name: 'Darwinbox', path: '/vs/darwinbox' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
