import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { ICP_PAGES } from '@/lib/icpPages'
import IcpPageLayout from '@/components/IcpPageLayout'

const DATA = ICP_PAGES.founder

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/who-we-serve/founder', { title: DATA.metaTitle, description: DATA.metaDesc })
}

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: 'Who We Serve', path: '/who-we-serve' },
  { name: 'Founder / Startup', path: '/who-we-serve/founder' },
])

export default function FounderIcpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <IcpPageLayout {...DATA} />
    </>
  )
}
