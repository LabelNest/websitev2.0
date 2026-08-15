import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/google-drive', {
    title: 'Google Drive Alternatives for Fundraising — NestLens Capital Readiness vs Google Drive',
    description: 'Looking for a Google Drive alternative for your fundraise data room? How NestLens Capital Readiness compares — a structured, investor-scored data room vs a shared folder.',
  })
}

const DATA: VsPageData = {
  slug: 'google-drive',
  category: 'capital-readiness',
  competitorName: 'Google Drive',
  ourName: 'Capital Readiness',
  h1: 'Google Drive Alternatives for Fundraising: Capital Readiness vs Google Drive',
  subhead: 'Google Workspace ($7-$26.40/user/month) gives you Drive storage and sharing permissions — not a fundraise-specific structure. Capital Readiness is a data room built for fundraising, with investor tier scoring and LP-GP matching a shared Drive folder was never designed to do.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Google Drive is a shared folder. Capital Readiness is a fundraise data room.',
  tldrLeftLabel: 'Pick Google Drive if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You already run on Google Workspace and want to reuse Drive for document sharing',
    'Basic link-sharing and folder permissions are enough for your investor updates',
    'You need Gmail, Docs, Sheets, Slides, and Meet bundled with storage',
    'Cost is a priority — Business Starter runs $7/user/month',
  ],
  tldrRightPoints: [
    'You want a data room structured specifically for fundraising, not a shared folder',
    'You need investor tier scoring against angel to institutional',
    'You want LP-GP matching, not just link-sharing permissions',
    'You are an Indian or emerging market founder',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'General-purpose cloud productivity suite and storage', verdict: 'mid' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room structure', competitor: { text: 'Manual folder organization, no fundraise-specific structure', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, purpose-built for fundraising', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Access tracking / audit trail', competitor: { text: 'Basic activity log, not investor-diligence-grade', verdict: 'mid' }, labelnest: { text: 'Structured for fundraise diligence tracking', verdict: 'win' } },
    { feature: 'Productivity suite', competitor: { text: 'Gmail, Docs, Sheets, Slides, Meet bundled', verdict: 'win' }, labelnest: { text: 'Not a productivity suite — fundraise-document focused', verdict: 'no' } },
    { feature: 'Pricing', competitor: { text: '$7-$26.40/user/month depending on tier', verdict: 'win' }, labelnest: { text: 'Credit-based, INR-friendly', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
    { feature: 'Grant and competition discovery', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Included', verdict: 'win' } },
  ],
  calloutTitle: 'What Google Drive does better than us — honestly.',
  calloutBody: 'Google Drive is cheap, familiar, and bundled with a full productivity suite most teams already use daily. If budget is tight and you just need to share a folder of documents with a handful of investors, it\'s a reasonable stopgap. It just wasn\'t designed for what an investor actually expects to see structured a specific way in a fundraise data room.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'A shared folder vs. a data room built for the raise.',
    body: 'Google Drive\'s assumption: a folder with the right sharing permissions can serve almost any document-sharing need, fundraising included. Capital Readiness\'s assumption: a fundraise data room should be structured the way investors actually evaluate a company — sections, completeness signals, and investor-fit scoring — not an ad hoc folder tree.',
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market founders.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/dropbox', label: 'Also see: vs Dropbox →' },
}

export default function VsGoogleDrivePage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/google-drive' }, { name: 'Google Drive', path: '/vs/google-drive' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
