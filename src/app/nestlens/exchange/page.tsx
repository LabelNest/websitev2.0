import { Metadata } from 'next'
import ProductDetail from '@/components/ProductDetail'
import PlanSection from '@/components/PlanSection'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens/exchange', {
    title: 'Exchange — data marketplace for datasets, research and alternative data',
    description: 'Buy and sell structured datasets, research reports, alternative data and AI training data. Verified sellers, escrowed payment and a quality score on every listing.',
  })
}

export default function ExchangePage() {
  return (
    <ProductDetail
      id="exchange" name="Exchange" path="/nestlens/exchange" schemaType="SoftwareApplication"
      primary={{ label: 'Open Exchange', href: 'https://nestlens.labelnest.in', external: true }}
      secondary={{ label: 'See pricing', href: '/nestlens/pricing#exchange' }}
    >
      <PlanSection module="exchange" />
    </ProductDetail>
  )
}
