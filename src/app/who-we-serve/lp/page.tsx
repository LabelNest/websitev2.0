import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { ICP_PAGES } from '@/lib/icpPages'
import IcpPageLayout from '@/components/IcpPageLayout'

const DATA = ICP_PAGES.lp

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/who-we-serve/lp', { title: DATA.metaTitle, description: DATA.metaDesc })
}

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: 'Who We Serve', path: '/who-we-serve' },
  { name: 'LP / Investor', path: '/who-we-serve/lp' },
])

export default function LpIcpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <IcpPageLayout {...DATA} />
    </>
  )
}
