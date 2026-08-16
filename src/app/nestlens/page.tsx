import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DiyBanner from '@/components/DiyBanner'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import HoverLink from '@/components/HoverLink'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens', {
    title: 'NestLens — Private Markets OS with Intelligence, Exchange, Data Rooms',
    description: 'The private markets OS for emerging managers. Track 40,000+ entities, buy verified data on Exchange, build investor-ready data rooms. Credit-based access, no lock-in.',
  })
}

const SOFTWARE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://labelnest.in/nestlens#software',
  name: 'NestLens',
  operatingSystem: 'Web-based',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Private Markets Intelligence Platform',
  description: 'Private markets OS with Intelligence, Exchange, and Capital Readiness modules. Track 40,000+ entities, buy verified data, build investor data rooms.',
  url: 'https://nestlens.labelnest.in',
  publisher: { '@type': 'Organization', name: 'LabelNest India Private Limited', url: 'https://labelnest.in' },
  brand: { '@type': 'Brand', name: 'LabelNest', url: 'https://labelnest.in' },
  offers: { '@type': 'Offer', priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
  featureList: [
    '40,000+ tracked entities',
    '12,000+ verified contacts',
    'Live market signals',
    'Data marketplace with KYC verified sellers',
    'Investor-ready data room builder',
    'LP-GP matching',
    'Grant and competition discovery',
  ],
}

export default function NestLensPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_SCHEMA) }} />
      <Nav />
      <DiyBanner />
      <NestLensModuleNav />
      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section style={{ padding: '80px 48px 72px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
          <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'rgba(37,99,235,.08)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.03)', padding: '6px 16px', borderRadius: 100, marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB', display: 'inline-block' }} />
              Private Markets OS · nestlens.labelnest.in
            </div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(52px,8vw,88px)', fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1, color: 'var(--text)', marginBottom: 16 }}>NestLens</h1>
            <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(20px,3vw,36px)', fontWeight: 300, color: 'var(--text2)', marginBottom: 24, lineHeight: 1.2 }}>
              Know the market. <strong style={{ color: 'var(--text)', fontWeight: 800 }}>Move the data.</strong> Ready the capital.
            </p>
            <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.72, color: 'var(--text2)', maxWidth: 580, margin: '0 auto 36px' }}>
              Three modules. One platform. Built for analysts, fund managers, and operators who need{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>structured intelligence, a live data marketplace, and a capital readiness system</strong> — all in one place.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563EB', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open NestLens ↗</a>
              <Link href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Request access</Link>
            </div>
          </div>
        </section>

        {/* THREE MODULES */}
        <section style={{ padding: '72px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, textAlign: 'center' }}>Three modules — all live</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 32 }}>

              <HoverLink href="/nestlens/intelligence"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #2563EB', borderRadius: 18, padding: 28, display: 'block', transition: 'transform .2s', textDecoration: 'none' }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>🔭</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(16,185,129,.1)', color: '#10B981', display: 'inline-block', marginBottom: 10 }}>Live</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>Intelligence</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 16 }}>Entity tracking, fund signals, contact intelligence, and live market signals across private markets. 40K+ entities. 12K+ verified contacts.</p>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#2563EB' }}>40K+</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Entities</div></div>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#2563EB' }}>12K+</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Contacts</div></div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2563EB' }}>Explore Intelligence →</div>
              </HoverLink>

              <HoverLink href="/nestlens/exchange"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #E91E8C', borderRadius: 18, padding: 28, display: 'block', transition: 'transform .2s', textDecoration: 'none' }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>⚡</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(16,185,129,.1)', color: '#10B981', display: 'inline-block', marginBottom: 10 }}>Live</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>Exchange</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 16 }}>Buy, sell, and license any structured dataset. KYC verified sellers. Escrow-protected transactions. QC scored. Universal data marketplace.</p>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#E91E8C' }}>10+</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Sellers</div></div>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#E91E8C' }}>KYC</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Verified</div></div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#E91E8C' }}>Explore Exchange →</div>
              </HoverLink>

              <HoverLink href="/nestlens/capital"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #10B981', borderRadius: 18, padding: 28, display: 'block', transition: 'transform .2s', textDecoration: 'none' }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>🏦</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(16,185,129,.1)', color: '#10B981', display: 'inline-block', marginBottom: 10 }}>Live</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>Capital Readiness</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 16 }}>Data room, investor tier scoring, LP-GP matching, SP matching, and grant and competition discovery. 10 sections. 51 items.</p>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#10B981' }}>10</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Sections</div></div>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#10B981' }}>51</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Items</div></div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#10B981' }}>Explore Capital Readiness →</div>
              </HoverLink>

            </div>
          </div>
        </section>

        {/* PRICING */}
        <section style={{ padding: '72px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Pricing</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 14 }}>Three modules, each priced independently.</h2>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'var(--text2)', maxWidth: 560, margin: '0 auto' }}>Subscribe only to what you need. All plans available monthly or annually — annual saves more. Enterprise and Bundle pricing on request.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {[
                {
                  accent: '#2563EB', name: 'Intelligence', tagline: 'Private market data on funds, LPs, GPs, and grants.',
                  from: '₹14,999', unit: '/mo', note: 'Individual · from ₹1,50,000/yr',
                  popular: 'Pro — ₹1,64,999/mo · 5 seats · 400 credits/mo · 2 data rooms',
                },
                {
                  accent: '#E91E8C', name: 'Exchange', tagline: 'Buy and sell private market data and services.',
                  from: 'Free', unit: '', note: 'Free to browse, view briefs, and post per-project',
                  popular: 'Seller — $199/yr · 15 applications/mo · active listing',
                },
                {
                  accent: '#10B981', name: 'Capital Readiness', tagline: 'Data room, legal checklist, investor fit scoring.',
                  from: '₹999', unit: '/mo', note: 'Founder — India · ₹9,999/yr',
                  popular: 'Fund — $45/mo · $500/yr · 1 fund data room included',
                },
              ].map(m => (
                <div key={m.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: m.accent }} />
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 17, color: 'var(--text)', marginBottom: 6 }}>{m.name}</div>
                  <p style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 16, minHeight: 38 }}>{m.tagline}</p>
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, color: m.accent }}>{m.from}</span>
                    <span style={{ fontSize: 13, color: 'var(--text3)' }}>{m.unit}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text3)', marginBottom: 16 }}>{m.note}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text2)', padding: '10px 12px', background: 'rgba(255,255,255,.03)', borderRadius: 8, border: '1px solid rgba(255,255,255,.06)', lineHeight: 1.5 }}>
                    <span style={{ color: m.accent, fontWeight: 600 }}>Most popular: </span>{m.popular}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://nestlens.labelnest.in/pricing" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563EB', color: '#fff', fontSize: 14, fontWeight: 600, padding: '12px 24px', borderRadius: 10 }}>See full pricing ↗</a>
              <a href="https://nestlens.labelnest.in/enterprise-enquiry" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14, fontWeight: 500, padding: '12px 24px', borderRadius: 10, border: '1px solid rgba(255,255,255,.1)' }}>Enquire about Enterprise or Bundle</a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '72px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14, textAlign: 'center' }}>Get started</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-.035em', color: 'var(--text)', marginBottom: 12 }}>Ready to open NestLens?</h2>
            <p style={{ fontSize: 16, color: 'var(--text2)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.72 }}>Platform is live. Start with Intelligence, explore the Exchange, or build your data room in Capital Readiness.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563EB', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open NestLens ↗</a>
              <Link href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Talk to the team</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
