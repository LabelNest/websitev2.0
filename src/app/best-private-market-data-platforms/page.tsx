import { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/best-private-market-data-platforms', {
    title: 'Best Private Market Data Platforms (2026) — Compared',
    description: 'Preqin, PitchBook, CB Insights, Crunchbase, Dealroom, Tracxn, Venture Intelligence, Bloomberg, FactSet, Capital IQ, and LabelNest — pricing, focus, and who each is actually built for.',
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
  { name: 'LabelNest (NestLens)', focus: 'Private markets — companies, funds, GPs, LPs, deals, service providers', pricing: 'Credit-based, free tier, no seat minimum', bestFor: 'Emerging managers, boutique funds, and analysts focused on India, SE Asia, and the Gulf' },
  { name: 'Preqin', focus: 'Institutional LP/fund-of-funds private-markets data, 20+ years of history', pricing: 'Annual seat contracts, $50K+ typical entry', bestFor: 'Institutional LPs with six-figure budgets and deep historical needs', vsHref: '/vs/preqin' },
  { name: 'PitchBook', focus: 'VC/PE deal, fund, and valuation data', pricing: 'Annual contract, quote-based', bestFor: 'Institutional investors and large advisory teams', vsHref: '/vs/pitchbook' },
  { name: 'CB Insights', focus: 'Corporate strategy, M&A, and VC signals with AI research tools', pricing: '$50K-$265K+/year, quote-based', bestFor: 'Enterprise corporate strategy and M&A teams', vsHref: '/vs/cb-insights' },
  { name: 'Crunchbase', focus: 'Broad, self-serve company and funding-round lookups', pricing: '$49-$99/user/month, Enterprise quoted', bestFor: 'Quick company/funding research at a low per-seat cost', vsHref: '/vs/crunchbase' },
  { name: 'Dealroom', focus: 'European VC intelligence for institutional investors and corporates', pricing: '€12,000-€40,000/year, 3-seat minimum', bestFor: 'Institutional teams researching the European VC market', vsHref: '/vs/dealroom' },
  { name: 'Tracxn', focus: 'Global startup/sector tracking, 1.4M+ entities, CRM tools built in', pricing: 'Custom-quoted, no monthly option, premium in India', bestFor: 'Deal-sourcing teams needing global sector breadth with CRM tooling', vsHref: '/vs/tracxn' },
  { name: 'Venture Intelligence', focus: 'India PE-VC and M&A deal history since 2002, league tables', pricing: 'Subscription, not published', bestFor: 'Historical India deal and valuation research', vsHref: '/vs/venture-intelligence' },
  { name: 'SourceScrub', focus: 'Deal sourcing across 16M+ companies, expert-in-the-loop AI', pricing: 'Quote-based, not published', bestFor: 'Investment/M&A teams doing high-volume target sourcing', vsHref: '/vs/sourcescrub' },
  { name: 'Grata', focus: 'SMB account discovery and buying-signal monitoring', pricing: 'Quote-based, median customer ~$155,000/year', bestFor: 'Deal-origination teams building outreach lists', vsHref: '/vs/grata' },
  { name: 'S&P Capital IQ', focus: 'Public-markets screening and comps, private data as one module', pricing: '$14,800-$215,000+/year, quote-based, median ~$53,000/year', bestFor: 'Financial institutions needing one terminal across asset classes', vsHref: '/vs/capital-iq' },
  { name: 'FactSet', focus: 'Modular financial terminal, public-markets analytics', pricing: '$4,000-$50,000+/user/year depending on modules', bestFor: 'Teams that want a scalable terminal from basic to full analytics', vsHref: '/vs/factset' },
  { name: 'Bloomberg Terminal', focus: 'Real-time public markets, fixed income, equities, news, chat network', pricing: '$28,320-$31,980/seat/year, 2-year typical minimum', bestFor: 'Institutional trading and research desks needing real-time public data', vsHref: '/vs/bloomberg' },
]

const th: React.CSSProperties = { padding: '16px 18px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', textAlign: 'left', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }
const td: React.CSSProperties = { padding: '14px 18px', fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.6, verticalAlign: 'top' }

export default function BestPrivateMarketDataPlatformsPage() {
  const schema = breadcrumbSchema([{ name: 'Best Private Market Data Platforms', path: '/best-private-market-data-platforms' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <main style={{ paddingTop: 64 }}>

        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Comparison · Updated August 2026</div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(34px,4.5vw,52px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.06, color: 'var(--text)', marginBottom: 16 }}>
              Best Private Market Data Platforms in 2026
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.72, color: 'var(--text2)', maxWidth: 720, marginBottom: 24 }}>
              Thirteen platforms, honestly compared — pricing, actual focus, and who each one is
              really built for. Most &ldquo;best X&rdquo; lists don&apos;t tell you that Preqin and
              a $150K/year sourcing tool aren&apos;t solving the same problem. This one does.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/nestlens" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E91E8C', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11, textDecoration: 'none' }}>Explore NestLens →</Link>
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
                      <td style={{ ...td, fontWeight: 700, color: p.name.startsWith('LabelNest') ? '#E91E8C' : 'var(--text)', borderBottom: i === PLATFORMS.length - 1 ? 'none' : '1px solid var(--border)' }}>
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
              Pricing figures are third-party estimates from public procurement/review sources, not
              vendor rate cards — most of these platforms use custom, sales-negotiated pricing.
              Click a platform name for a full feature-by-feature comparison against LabelNest.
            </p>
          </div>
        </section>

        <section style={{ padding: '64px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>See LabelNest for yourself</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', maxWidth: 520, margin: '0 auto 12px' }}>
              40,000+ entities. Credit-based. Free tier available.
            </h2>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', maxWidth: 460, margin: '0 auto 24px', lineHeight: 1.72 }}>
              Open NestLens, browse the data, and decide for yourself. No credit card, no sales call required.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E91E8C', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11, textDecoration: 'none' }}>Try NestLens Free ↗</a>
              <Link href="/vs/preqin" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)', textDecoration: 'none' }}>See vs Preqin →</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
