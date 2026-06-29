import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import HoverDiv from '@/components/HoverDiv'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NestLens Exchange — Universal Data Marketplace',
  description: 'Buy, sell, and license any structured dataset. KYC verified sellers. Escrow-protected transactions. QC scored. Universal data marketplace.',
}

const CATEGORIES = [
  { icon: '📊', name: 'Datasets', desc: 'Company data, fund performance, deal flow, financials, market intelligence.' },
  { icon: '📋', name: 'Research and Reports', desc: 'Sector analysis, market research, ESG scores, proprietary research.' },
  { icon: '🤖', name: 'AI Training Data', desc: 'Labelled datasets, annotation outputs, domain-specific training data.' },
  { icon: '🎵', name: 'Audio Data', desc: 'Speech datasets, audio classification, transcribed audio for ML.' },
  { icon: '🎬', name: 'Video Data', desc: 'Annotated video datasets, classification outputs, structured video intelligence.' },
  { icon: '📝', name: 'Text and NLP', desc: 'Labelled text corpora, sentiment datasets, entity extraction outputs.' },
  { icon: '📄', name: 'OCR and Documents', desc: 'Extracted document data, scanned records, structured document intelligence.' },
  { icon: '🌍', name: 'Financial and Geospatial', desc: 'Financial data feeds, geospatial datasets, and location intelligence.' },
]

export default function ExchangePage() {
  return (
    <>
      <Nav />
      <NestLensModuleNav />
      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, left: -80, width: 500, height: 500, borderRadius: '50%', background: 'rgba(233,30,140,.08)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>NestLens Exchange · Live marketplace</div>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(38px,5.2vw,62px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.04, color: 'var(--text)', marginBottom: 16 }}>
                Buy. Sell. License.<br />
                <span style={{ background: 'linear-gradient(100deg,#E91E8C,#C026D3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Any structured data.</span>
              </h1>
              <p style={{ fontSize: 'clamp(15px,1.8vw,17.5px)', lineHeight: 1.74, color: 'var(--text2)', marginBottom: 20 }}>
                A <strong style={{ color: 'var(--text)', fontWeight: 600 }}>universal data marketplace</strong> — not limited to private markets. Datasets, AI training data, research reports, audio, video, financial data, geospatial. If it is structured and has value, it belongs here.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {[
                  { dot: '#10B981', bg: 'rgba(16,185,129,.08)', border: 'rgba(16,185,129,.15)', color: '#10B981', label: 'KYC Verified sellers' },
                  { dot: '#2563EB', bg: 'rgba(37,99,235,.08)', border: 'rgba(37,99,235,.15)', color: '#2563EB', label: 'Escrow Protected' },
                  { dot: '#F97316', bg: 'rgba(249,115,22,.08)', border: 'rgba(249,115,22,.15)', color: '#F97316', label: 'QC Scored' },
                ].map(b => (
                  <span key={b.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 500, padding: '6px 12px', borderRadius: 7, background: b.bg, border: `1px solid ${b.border}`, color: b.color }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: b.dot, display: 'inline-block' }} />{b.label}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E91E8C', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Browse Exchange ↗</a>
                <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>List your data</a>
              </div>
            </div>

            {/* Mini exchange mockup */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 13.5, color: 'var(--text)' }}>Exchange listings</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, textTransform: 'uppercase', letterSpacing: '.08em', color: '#10B981' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />Live
                </span>
              </div>
              <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { seller: 'LabelNest', sellerColor: '#E91E8C', title: 'India PCVC Deal Flow — Q4 2025', tag: 'Company Intelligence' },
                  { seller: 'LabelNest', sellerColor: '#E91E8C', title: 'GP Intelligence Pack — Top 100 Indian PE', tag: 'Fund Intelligence' },
                  { seller: 'Verified Seller', sellerColor: 'var(--text3)', title: 'ESG Scores — Indian Listed Companies 2025', tag: 'Research' },
                ].map(listing => (
                  <div key={listing.title} style={{ background: 'var(--bg2)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 10, padding: 14 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', color: listing.sellerColor, marginBottom: 4 }}>{listing.seller}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{listing.title}</div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, padding: '2px 7px', borderRadius: 4, background: 'rgba(255,255,255,.05)', color: 'var(--text2)' }}>{listing.tag}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, padding: '2px 7px', borderRadius: 4, background: 'rgba(16,185,129,.08)', color: '#10B981' }}>✓ KYC</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DATA CATEGORIES */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>What you can buy and sell</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 12 }}>Every structured data type. One marketplace.</h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 520, marginBottom: 36, lineHeight: 1.65 }}>Exchange is not limited to private markets data. Any structured dataset with provenance can be listed, licensed, or sold.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {CATEGORIES.map(c => (
                <HoverDiv key={c.name}
                  hoverBorderColor="rgba(233,30,140,.3)"
                  hoverTransform="translateY(-3px)"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 22, transition: 'border-color .2s,transform .2s' }}>
                  <div style={{ fontSize: 22, marginBottom: 10 }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{c.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.55 }}>{c.desc}</div>
                </HoverDiv>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST LAYER */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>The LabelNest trust layer</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 12 }}>Every dataset verified. Every transaction protected.</h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 520, marginBottom: 36, lineHeight: 1.65 }}>Three mechanisms that make Exchange safe for buyers and fair for sellers.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {[
                { icon: '✅', name: 'KYC Verified Sellers', color: 'rgba(16,185,129,.3)', desc: 'Every seller has completed identity and business verification before any listing goes live. You know exactly who you are buying from.' },
                { icon: '🔒', name: 'Escrow Protected', color: 'rgba(37,99,235,.3)', desc: 'Payment held in escrow until delivery is confirmed. No upfront risk for buyers. Guaranteed payment for sellers on delivery.' },
                { icon: '⭐', name: 'QC Scored Datasets', color: 'rgba(249,115,22,.3)', desc: 'Every dataset carries a quality score based on completeness, recency, methodology transparency, and provenance documentation.' },
              ].map(t => (
                <HoverDiv key={t.name}
                  hoverBorderColor={t.color}
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 28, textAlign: 'center', transition: 'border-color .2s' }}>
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{t.icon}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 17, color: 'var(--text)', marginBottom: 8 }}>{t.name}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>{t.desc}</div>
                </HoverDiv>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14, textAlign: 'center' }}>Buy or sell</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', maxWidth: 520, margin: '0 auto 12px' }}>Browse all listings on Exchange</h2>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.7 }}>Open to buyers and sellers. KYC verification for all sellers. List your dataset in minutes.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E91E8C', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Browse Exchange ↗</a>
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
