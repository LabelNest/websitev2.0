import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import HoverLink from '@/components/HoverLink'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NestLens — Private Markets OS',
  description: 'Three modules. One platform. Built for analysts, fund managers, and operators who need structured intelligence, a live data marketplace, and a capital readiness system.',
}

export default function NestLensPage() {
  return (
    <>
      <Nav />
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

        {/* PRICING PHILOSOPHY */}
        <section style={{ padding: '72px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 48, position: 'relative', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#2563EB,#E91E8C,#7C3AED)' }} />
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Pricing philosophy</div>
                <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 14 }}>Credit-based. No lock-in. No per-seat penalties.</h2>
                <p style={{ fontSize: 15, lineHeight: 1.72, color: 'var(--text2)' }}>NestLens runs on credits that work across all three modules. You pay for what you use. Adding team members is encouraged, not billed. Same price for a two-person team and a global firm.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Same price for small teams and global firms',
                  'No per-seat penalties as you grow',
                  'No hidden tiers or feature gating',
                  'Credits work across all three modules',
                ].map(text => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'rgba(255,255,255,.03)', borderRadius: 9, border: '1px solid rgba(255,255,255,.06)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><polyline points="20,6 9,17 4,12" /></svg>
                    <span style={{ fontSize: 14, color: 'var(--text2)' }}>{text}</span>
                  </div>
                ))}
              </div>
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
