import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NestLens Capital Readiness — Data Room, Investor Matching, Raise Preparation',
  description: 'A 10-section, 51-item data room with investor tier scoring, LP-GP matching, SP matching, and grant and competition discovery — all live.',
}

const DATA_ROOM_SECTIONS = [
  { icon: '🏢', name: 'Profile and Identity', desc: 'Company name, website, stage, business model, location' },
  { icon: '👥', name: 'Team and Governance', desc: 'Founders, contracts, ESOP, advisors, references' },
  { icon: '💰', name: 'Financials', desc: 'Revenue, burn rate, runway, projections' },
  { icon: '🤝', name: 'Clients', desc: 'Customer counts, key clients, pipeline, usage' },
  { icon: '📋', name: 'Company Documents', desc: 'Incorporation, org chart, shareholder agreements' },
  { icon: '⚖️', name: 'Legal', desc: 'NDA, MSA, privacy, security, IP status' },
  { icon: '📈', name: 'Investment Docs', desc: 'Cap table, SAFE, term sheet, use of funds' },
  { icon: '🚀', name: 'Product and Services', desc: 'Description, stage, features, tech stack' },
  { icon: '🎯', name: 'Investment Criteria', desc: 'Investor types, geography, check size' },
  { icon: '🔧', name: 'SP Criteria', desc: 'Service needs, existing providers, geography' },
]

const MATCHING = [
  { icon: '🏦', name: 'LP-GP Matching', border: '#2563EB', desc: 'Matched to limited partners and general partners whose investment criteria align with your stage, sector, geography, and check size.' },
  { icon: '🔧', name: 'SP Matching', border: '#7C3AED', desc: 'Matched to service providers based on what your company needs, where you are, and who has helped companies like yours before.' },
  { icon: '🏆', name: 'Grant and Competition Discovery', border: '#F97316', desc: 'Discover non-dilutive capital — government grants, accelerator programs, startup competitions, and innovation awards matched to your profile.' },
  { icon: '🤝', name: 'Acquisition and Referral Partners', border: '#10B981', desc: 'Connect with strategic acquisition partners, distribution channels, and referral networks matched to your product category.' },
]

export default function CapitalPage() {
  return (
    <>
      <Nav />
      <NestLensModuleNav />
      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, right: -80, width: 500, height: 500, borderRadius: '50%', background: 'rgba(16,185,129,.07)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>NestLens Capital Readiness · Live module</div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(40px,6vw,72px)', fontWeight: 800, letterSpacing: '-.045em', lineHeight: 1.03, color: 'var(--text)', marginBottom: 18, maxWidth: 700 }}>
              Build a data room investors<br />
              actually <span style={{ background: 'linear-gradient(100deg,#10B981,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>trust.</span>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.72, color: 'var(--text2)', maxWidth: 600, marginBottom: 28 }}>
              A <strong style={{ color: 'var(--text)', fontWeight: 600 }}>10-section, 51-item data room</strong> with investor tier scoring, LP-GP matching, SP matching, and grant and competition discovery — all in one place, all live.
            </p>

            {/* Tier pills */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
              {[
                { pct: '20%+', label: 'Angel Ready', color: '#F59E0B' },
                { pct: '35%+', label: 'Accelerator Ready', color: '#3B82F6' },
                { pct: '55%+', label: 'Seed VC Ready', color: '#10B981' },
                { pct: '75%+', label: 'Institutional Ready', color: '#7C3AED' },
              ].map(t => (
                <div key={t.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 11, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: t.color }}>{t.pct}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{t.label}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--text3)' }}>Score threshold</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#10B981', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open Capital Readiness ↗</a>
              <Link href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Talk to the team</Link>
            </div>
          </div>
        </section>

        {/* DATA ROOM SECTIONS */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>The data room</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 12 }}>10 sections. 51 items. Everything investors ask for.</h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 520, marginBottom: 36, lineHeight: 1.65 }}>A structured data room that covers every document, metric, and disclosure category investors expect — across all four investor tiers.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10 }}>
              {DATA_ROOM_SECTIONS.map(s => (
                <div key={s.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{s.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text3)' }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MATCHING */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Beyond the data room</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 12 }}>Matching and discovery. Find your capital.</h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 520, marginBottom: 36, lineHeight: 1.65 }}>Capital Readiness does not stop at the data room. It connects you to the right investors, service providers, grants, and strategic partners.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {MATCHING.map(m => (
                <div key={m.name}
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 26, position: 'relative', overflow: 'hidden', transition: 'border-color .2s' }}
                  onMouseOver={e => (e.currentTarget.style.borderColor = `${m.border}4D`)}
                  onMouseOut={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: m.border, opacity: 0.5 }} />
                  <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(16,185,129,.1)', color: '#10B981' }}>Live</div>
                  <div style={{ fontSize: 26, marginBottom: 12 }}>{m.icon}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 17, color: 'var(--text)', marginBottom: 6 }}>{m.name}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14, textAlign: 'center' }}>Start building</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', maxWidth: 520, margin: '0 auto 12px' }}>Start building your data room today</h2>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.7 }}>10 sections. 51 items. Investor tier scoring live. LP-GP matching live. All included.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#10B981', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open Capital Readiness ↗</a>
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
