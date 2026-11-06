import { Metadata } from 'next'
import Link from 'next/link'
import ProductDetail from '@/components/ProductDetail'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nesthr', {
    title: 'NestHR — HR software for startups and campus placement software for colleges',
    description: 'Nine modules in one workspace: people, placements, performance, expenses, learning, analytics, lifecycle, documents and discussion. Campus and corporate hiring in one funnel. Priced in rupees.',
  })
}

const PLANS = [
  { name: 'Placement OS', price: '₹80,000', note: 'Hiring only: campus and corporate, one funnel' },
  { name: 'Starter', price: '₹40,000', note: 'Up to 20 people' },
  { name: 'Growth', price: '₹60,000', note: 'Up to 50 people' },
  { name: 'Scale', price: '₹1,00,000', note: 'Up to 100 people' },
  { name: 'Enterprise', price: 'Custom', note: '100+ people, or a college' },
]

export default function NestHRPage() {
  return (
    <ProductDetail
      id="nesthr" name="NestHR" path="/nesthr" schemaType="SoftwareApplication"
      primary={{ label: 'Open NestHR', href: 'https://nesthr.labelnest.in', external: true }}
      secondary={{ label: 'See pricing', href: '#pricing' }}
    >
      <section id="pricing" className="ln-sec">
        <div className="ln-wrap">
          <p className="ln-eyebrow">Pricing</p>
          <h2 className="ln-h2" style={{ maxWidth: '15em' }}>One flat annual price. Every module included in the suite.</h2>
          <div className="ln-scroll" style={{ marginTop: 36 }}>
            <table className="ln-tbl"><thead><tr><th>Plan</th><th>Price per year</th><th>For</th></tr></thead><tbody>
              {PLANS.map((p) => <tr key={p.name}><td className="nm">{p.name}</td><td className="p">{p.price}</td><td>{p.note}</td></tr>)}
            </tbody></table>
          </div>
          <p className="ln-small" style={{ margin: '18px 0 0' }}>Priced in rupees. No per-employee metering. <Link className="ln-tlink" href="/contact">Ask for an enterprise or college quote</Link>.</p>
        </div>
      </section>
    </ProductDetail>
  )
}
