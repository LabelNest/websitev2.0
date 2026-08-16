import { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/data-marketplace', {
    title: 'Best Data Marketplaces (2026) — Compared',
    description: 'Datarade, AWS Data Exchange, Snowflake Marketplace, Nasdaq Data Link, Dawex, and NestLens Exchange — pricing, focus, and who each is actually built for.',
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
  { name: 'NestLens Exchange', focus: 'Private markets data — companies, funds, deals, LPs, service providers', pricing: 'Free to browse, credit-based per project, sellers pay for listings', bestFor: 'Buying or selling private markets data specifically, with KYC-verified sellers and escrow' },
  { name: 'Datarade', focus: 'General-purpose data marketplace, 2,600+ providers across 560+ categories', pricing: 'Free to browse, each vendor sets its own price', bestFor: 'Sourcing any kind of data — geospatial, consumer, healthcare, web data', vsHref: '/vs/datarade' },
  { name: 'AWS Data Exchange', focus: 'Enterprise cloud data marketplace, delivered into S3/Redshift/API', pricing: 'No standalone fee; pay for datasets plus storage/usage, providers pay ~3% listing fee', bestFor: 'Teams already running on AWS who want datasets delivered natively', vsHref: '/vs/aws-data-exchange' },
  { name: 'Snowflake Marketplace', focus: '3,000+ listings, 700+ providers, live-queried data sharing', pricing: 'Flat-fee or usage-based, billed through Snowflake account', bestFor: 'Teams already on Snowflake who want zero-duplication live data access', vsHref: '/vs/snowflake-marketplace' },
  { name: 'Nasdaq Data Link', focus: '250+ financial and economic datasets, 20M+ data points, API-first', pricing: 'A la carte subscriptions, large free/open dataset collection', bestFor: 'Public-market and macroeconomic research, quant/Python integration', vsHref: '/vs/nasdaq-data-link' },
  { name: 'Dawex', focus: 'White-label infrastructure to build and operate your own data marketplace', pricing: '20% commission on data transactions', bestFor: 'Enterprises or public-sector bodies that want to build their own branded marketplace', vsHref: '/vs/dawex' },
]

const th: React.CSSProperties = { padding: '16px 18px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', textAlign: 'left', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }
const td: React.CSSProperties = { padding: '14px 18px', fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.6, verticalAlign: 'top' }

export default function DataMarketplacePage() {
  const schema = breadcrumbSchema([{ name: 'Data Marketplace', path: '/data-marketplace' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <main style={{ paddingTop: 64 }}>

        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Comparison · Updated August 2026</div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(34px,4.5vw,52px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.06, color: 'var(--text)', marginBottom: 16 }}>
              Best Data Marketplaces in 2026
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.72, color: 'var(--text2)', maxWidth: 720, marginBottom: 24 }}>
              Six platforms, honestly compared — pricing, actual focus, and who each is really
              built for. Not every &ldquo;data marketplace&rdquo; sells the same kind of data —
              general-purpose directories, cloud-native exchanges, and marketplace infrastructure
              are all different categories that happen to share a search term.
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
              feature-by-feature comparison against NestLens Exchange. Looking specifically for
              AI training-data annotation marketplaces? See our{' '}
              <Link href="/ai-data-marketplace" style={{ color: '#E91E8C' }}>AI data marketplace comparison</Link> instead.
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
              <Link href="/vs/datarade" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)', textDecoration: 'none' }}>See vs Datarade →</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
