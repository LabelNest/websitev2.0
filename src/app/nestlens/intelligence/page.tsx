import { Metadata } from 'next'
import Link from 'next/link'
import ProductDetail from '@/components/ProductDetail'
import PlanSection from '@/components/PlanSection'
import { getAtlasStats } from '@/lib/plans'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens/intelligence', {
    title: 'Atlas — private markets data on funds, managers, companies and people',
    description: 'Atlas holds reviewed data on {{entities}} private market entities: fund managers, AIF and PMS registers, capital providers, companies and people. Every field has a source and a review date. Search, slice by register, export.',
  })
}

export default async function AtlasPage() {
  const s = await getAtlasStats()
  return (
    <ProductDetail
      id="atlas" name="Atlas" path="/nestlens/intelligence" schemaType="SoftwareApplication"
      primary={{ label: 'Open Atlas', href: 'https://atlas.labelnest.in', external: true }}
      secondary={{ label: 'See pricing', href: '/nestlens/pricing#atlas' }}
      stats={[{ label: 'entities', value: s.entities }, { label: 'funds', value: s.funds }, { label: 'companies', value: s.companies }, { label: 'people', value: s.people }]}
    >
      <section className="ln-sec" style={{ paddingBottom: 0 }}>
        <div className="ln-wrap">
          <p className="ln-small" style={{ margin: 0 }}>Part of Atlas: <Link className="ln-tlink" href="/nestlens/intelligence/observatory">Observatory, our published research</Link>. Counts above are read live from the database.</p>
        </div>
      </section>
      <PlanSection module="atlas" />
    </ProductDetail>
  )
}
