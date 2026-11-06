import { Metadata } from 'next'
import ProductDetail from '@/components/ProductDetail'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/sentinel', {
    title: 'Sentinel — risk monitoring for private markets portfolios and AI systems',
    description: 'Sentinel Risk watches a private markets portfolio for concentration, valuation, exit and liquidity risk. Sentinel AI scores deployed AI systems for hallucination, dependency, compliance and cost. Early access.',
  })
}

export default function SentinelPage() {
  return (
    <ProductDetail
      id="sentinel" name="Sentinel" path="/sentinel" schemaType="SoftwareApplication"
      primary={{ label: 'Join the waitlist', href: 'https://sentinel.labelnest.in', external: true }}
      secondary={{ label: 'Explore NestLens', href: '/nestlens' }}
    />
  )
}
