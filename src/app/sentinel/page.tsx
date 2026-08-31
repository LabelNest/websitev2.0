import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/sentinel', {
    title: 'NestLens Sentinel — Risk Intelligence for Private Markets & AI Systems (Early Access)',
    description: 'Sentinel Risk surfaces hidden concentration, valuation, and exit risk in private market portfolios. Sentinel AI audits hallucination, compliance, and dependency risk across deployed AI systems. Early access — join the waitlist.',
  })
}

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: 'Sentinel', path: '/sentinel' },
])

export default function SentinelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <Nav />
      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section style={{ padding: '80px 48px 96px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -120, right: -80, width: 520, height: 520, borderRadius: '50%', background: 'rgba(180,120,255,.08)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>

            <img src="/logos/sentinel.png" alt="Sentinel" width={72} height={72} style={{ objectFit: 'contain', margin: '0 auto 28px' }} />

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: '#B478FF', border: '1px solid rgba(180,120,255,.25)', background: 'rgba(180,120,255,.08)', padding: '6px 16px', borderRadius: 100, marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B478FF', display: 'inline-block' }} />
              Early access — join the waitlist
            </div>

            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(36px,5.5vw,60px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.05, color: 'var(--text)', marginBottom: 18 }}>
              NestLens Sentinel
            </h1>
            <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(17px,2.4vw,24px)', fontWeight: 300, color: 'var(--text2)', marginBottom: 24, lineHeight: 1.35 }}>
              See the risk others miss. Act before it&apos;s too late.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--text2)', maxWidth: 560, margin: '0 auto 32px' }}>
              Two products, one platform. <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Sentinel Risk</strong> surfaces hidden concentration, valuation, and exit risk in private market portfolios — built for GPs, LPs, and family offices. <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Sentinel AI</strong> audits hallucination, compliance, and dependency risk across every AI system you&apos;ve deployed — built for CTOs, CROs, and compliance teams.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://sentinel.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#B478FF', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>
                Join the waitlist ↗
              </a>
              <Link href="/nestlens"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>
                Explore NestLens today →
              </Link>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 16 }}>
              No credit card required. We&apos;ll reach out with your workspace details.
            </div>
          </div>
        </section>

        {/* TWO PRODUCTS */}
        <section style={{ padding: '64px 48px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, textAlign: 'center' }}>Two products, one waitlist</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20, marginTop: 32 }}>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #2563EB', borderRadius: 18, padding: 28 }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>📊</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>Sentinel Risk</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>Portfolio concentration, valuation integrity, exit risk, stress testing, and operational signals — continuously monitored across your entire private markets portfolio.</p>
              </div>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #B478FF', borderRadius: 18, padding: 28 }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>🤖</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>Sentinel AI</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>Hallucination risk, model dependency, regulatory compliance, cost prediction, data security, talent concentration, and wrong-AI-use — scored across every AI system you&apos;ve deployed.</p>
              </div>

            </div>
          </div>
        </section>

        {/* WHILE YOU WAIT */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>
              While you wait
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(20px,2.8vw,30px)', fontWeight: 800, letterSpacing: '-.02em', color: 'var(--text)', marginBottom: 12 }}>
              Six NestLens products are live today
            </h2>
            <p style={{ fontSize: 14.5, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 28 }}>
              Atlas, Exchange, Orbit, Ascent, Command, and Connect are built and in use now. Sentinel is the newest addition to the family — see the rest at the NestLens hub.
            </p>
            <Link href="/nestlens"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--pink)', color: '#fff', fontSize: 14, fontWeight: 600, padding: '12px 24px', borderRadius: 10 }}>
              Go to NestLens →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
