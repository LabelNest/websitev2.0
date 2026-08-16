import { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/ai-data-marketplace', {
    title: 'Best AI Data Marketplaces & Annotation Platforms (2026) — Compared',
    description: 'Scale AI, Appen, Labelbox, and NestLens Exchange — pricing, focus, and which category you actually need: training-data annotation vs finished private-markets datasets.',
  })
}

interface Row {
  name: string
  focus: string
  pricing: string
  bestFor: string
  vsHref?: string
}

const PLATFORMS: Row[] = [
  { name: 'Scale AI', focus: 'Enterprise data labeling, RLHF collection, model evaluation', pricing: 'From $0.02/image self-serve; ~$93K average enterprise contract', bestFor: 'Teams building production AI systems that need raw data labeled at scale', vsHref: '/vs/scale-ai' },
  { name: 'Appen', focus: 'Crowdsourced annotation, 1M+ contractors across 170+ countries', pricing: 'Project-based, roughly $0.01-$0.10 per annotation task', bestFor: 'Multilingual or culturally diverse annotation work at scale', vsHref: '/vs/appen' },
  { name: 'Labelbox', focus: 'Data curation, annotation, and model evaluation platform (Catalog/Annotate/Model)', pricing: 'Free tier (5,000 rows), usage-based from $0.10/LBU, custom enterprise', bestFor: 'ML engineering teams that want annotation tooling with cloud-pipeline integrations', vsHref: '/vs/labelbox' },
  { name: 'NestLens Exchange', focus: 'Private markets data — companies, funds, deals, LPs, service providers', pricing: 'Free to browse, credit-based per project, sellers pay for listings', bestFor: 'Buying or selling already-structured private markets datasets — not raw-data annotation' },
]

const th: React.CSSProperties = { padding: '16px 18px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', textAlign: 'left', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }
const td: React.CSSProperties = { padding: '14px 18px', fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.6, verticalAlign: 'top' }

export default function AiDataMarketplacePage() {
  const schema = breadcrumbSchema([{ name: 'AI Data Marketplace', path: '/ai-data-marketplace' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <main style={{ paddingTop: 64 }}>

        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Comparison · Updated August 2026</div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(34px,4.5vw,52px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.06, color: 'var(--text)', marginBottom: 16 }}>
              Best AI Data Marketplaces in 2026
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.72, color: 'var(--text2)', maxWidth: 720, marginBottom: 24 }}>
              &ldquo;AI data marketplace&rdquo; covers two genuinely different things: platforms
              that <em>label raw data</em> for AI training (Scale AI, Appen, Labelbox), and
              platforms that <em>sell already-structured, finished data</em> (like NestLens
              Exchange). If you need the former, here&apos;s how the three main annotation
              platforms compare. If you need the latter — specifically private markets data —
              that&apos;s a different category, and it&apos;s the one we actually built.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/nestlens/exchange" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E91E8C', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11, textDecoration: 'none' }}>Explore NestLens Exchange →</Link>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)', textDecoration: 'none' }}>Talk to a real person</Link>
            </div>
          </div>
        </section>

        <section style={{ padding: '56px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: 780, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, borderCollapse: 'separate', borderSpacing: 0, overflow: 'hidden' }}>
                <thead>
                  <tr>
                    <th style={th}>Platform</th>
                    <th style={th}>Focus</th>
                    <th style={th}>Pricing</th>
                    <th style={th}>Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {PLATFORMS.map((p, i) => (
                    <tr key={p.name}>
                      <td style={{ ...td, fontWeight: 700, color: p.name.startsWith('NestLens') ? '#E91E8C' : 'var(--text)', borderBottom: i === PLATFORMS.length - 1 ? 'none' : '1px solid var(--border)' }}>
                        {p.vsHref ? <Link href={p.vsHref} style={{ color: 'inherit', textDecoration: 'none' }}>{p.name}</Link> : p.name}
                      </td>
                      <td style={{ ...td, borderBottom: i === PLATFORMS.length - 1 ? 'none' : '1px solid var(--border)' }}>{p.focus}</td>
                      <td style={{ ...td, borderBottom: i === PLATFORMS.length - 1 ? 'none' : '1px solid var(--border)' }}>{p.pricing}</td>
                      <td style={{ ...td, borderBottom: i === PLATFORMS.length - 1 ? 'none' : '1px solid var(--border)' }}>{p.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--text3)', marginTop: 16, lineHeight: 1.6 }}>
              Pricing figures are third-party estimates from public sources, not vendor rate
              cards where pricing is custom-quoted. Click a platform name for a full
              feature-by-feature comparison against NestLens Exchange. Looking for a
              general-purpose data marketplace instead of AI annotation? See our{' '}
              <Link href="/data-marketplace" style={{ color: '#E91E8C' }}>data marketplace comparison</Link>.
            </p>
          </div>
        </section>

        <section style={{ padding: '64px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>See NestLens Exchange for yourself</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', maxWidth: 520, margin: '0 auto 12px' }}>
              Private markets data, KYC-verified, escrow-protected.
            </h2>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', maxWidth: 460, margin: '0 auto 24px', lineHeight: 1.72 }}>
              Browse Exchange listings free. Buy per project with credits — no subscription needed.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E91E8C', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11, textDecoration: 'none' }}>Browse Exchange ↗</a>
              <Link href="/vs/scale-ai" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)', textDecoration: 'none' }}>See vs Scale AI →</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
