import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/sentinel', {
    title: 'Sentinel — Risk Intelligence for Modern Capital (Coming Soon) | LabelNest',
    description: 'Sentinel is LabelNest\'s upcoming risk intelligence layer — portfolio, credit, liquidity, and concentration risk with early warning signals. In development, not yet live.',
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
          <div style={{ position: 'absolute', top: -120, right: -80, width: 520, height: 520, borderRadius: '50%', background: 'rgba(59,130,246,.08)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>

            <img src="/logos/sentinel.png" alt="Sentinel" width={72} height={72} style={{ objectFit: 'contain', margin: '0 auto 28px' }} />

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: '#B478FF', border: '1px solid rgba(180,120,255,.25)', background: 'rgba(180,120,255,.08)', padding: '6px 16px', borderRadius: 100, marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B478FF', display: 'inline-block' }} />
              In development — not yet live
            </div>

            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(36px,5.5vw,60px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.05, color: 'var(--text)', marginBottom: 18 }}>
              NestLens Sentinel
            </h1>
            <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(17px,2.4vw,24px)', fontWeight: 300, color: 'var(--text2)', marginBottom: 24, lineHeight: 1.35 }}>
              The risk intelligence layer for modern capital.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--text2)', maxWidth: 560, margin: '0 auto 32px' }}>
              Sentinel is where portfolio risk, credit risk, liquidity risk, and concentration risk come together with early-warning signals — built for funds and institutions already using NestLens Command. It's early: there's no product to demo yet, and no pricing. If risk intelligence is something you need today, tell us what you're solving for and we'll let you know as this takes shape.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#B478FF', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>
                Tell us what you need →
              </Link>
              <Link href="/nestlens"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>
                Explore NestLens today →
              </Link>
            </div>
          </div>
        </section>

        {/* WHAT'S LIVE TODAY */}
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
