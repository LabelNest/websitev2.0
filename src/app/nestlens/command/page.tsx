import { Metadata } from 'next'
import ProductDetail from '@/components/ProductDetail'
import PlanSection from '@/components/PlanSection'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens/command', {
    title: 'Command — fund management workspace for pipeline, portfolio and LP reporting',
    description: 'Run a fund in one record: deal pipeline, diligence, investment committee, portfolio, cap tables, valuation, LP capital accounts and reports. Ascent data rooms keep portfolio numbers current.',
  })
}

export default function CommandPage() {
  return (
    <ProductDetail
      id="command" name="Command" path="/nestlens/command" schemaType="SoftwareApplication"
      primary={{ label: 'Open Command', href: 'https://command.labelnest.in', external: true }}
      secondary={{ label: 'See pricing', href: '/nestlens/pricing#command' }}
    >
      <PlanSection module="command" />
    </ProductDetail>
  )
}
