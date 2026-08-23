import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DiyBanner from '@/components/DiyBanner'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import HoverDiv from '@/components/HoverDiv'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens/intelligence/observatory', {
    title: 'Atlas Observatory — Research & Trends on Private Markets',
    description: 'Published research on real private market firms — browse free, unlock full reports individually. No module plan required. Part of NestLens Atlas.',
  })
}

const FEATURES = [
  { icon: '📰', badge: 'Browse free', badgeColor: '#2563EB', hoverColor: 'rgba(37,99,235,.4)', name: 'Open research library', desc: 'Every published report is browsable without a plan — headlines, summaries, and firm context are open to anyone.' },
  { icon: '🔓', badge: 'Per-report', badgeColor: '#F97316', hoverColor: 'rgba(249,115,22,.4)', name: 'Unlock individually', desc: 'Full reports unlock one at a time, on demand — no module subscription required to read the research you actually need.' },
  { icon: '📈', badge: 'Trends', badgeColor: '#10B981', hoverColor: 'rgba(16,185,129,.4)', name: 'Insights & trend layers', desc: 'Sector momentum, fund manager deep-dives, and market movement — the analytical layer sitting on top of Atlas\'s structured data.' },
]

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: 'NestLens', path: '/nestlens' },
  { name: 'Atlas', path: '/nestlens/intelligence' },
  { name: 'Observatory', path: '/nestlens/intelligence/observatory' },
])

const MODULE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Atlas Observatory',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Private Markets Research',
  description: 'Published research on real private market firms — browse free, unlock full reports individually. Part of NestLens Atlas.',
  url: 'https://labelnest.in/nestlens/intelligence/observatory',
  isPartOf: { '@id': 'https://labelnest.in/nestlens/intelligence#software' },
  featureList: FEATURES.map(f => `${f.name}: ${f.desc}`),
}

export default function ObservatoryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(MODULE_SCHEMA) }} />
      <Nav />
      <DiyBanner />
      <NestLensModuleNav />
      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, left: -80, width: 500, height: 500, borderRadius: '50%', background: 'rgba(124,58,237,.08)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, fontSize: 13, color: 'var(--text3)' }}>
              <Link href="/nestlens/intelligence" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Atlas</Link>
              <span>/</span>
              <span style={{ color: 'var(--text2)' }}>Observatory</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <img src="/logos/observatory-32.png" alt="" width={20} height={20} style={{ objectFit: 'contain' }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)' }}>Atlas Observatory · Part of NestLens Atlas</div>
            </div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(38px,5.2vw,62px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.04, color: 'var(--text)', marginBottom: 16, maxWidth: 760 }}>
              The insights & trends layer<br />
              <span style={{ background: 'linear-gradient(100deg,#2563EB,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>for private markets.</span>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.8vw,17.5px)', lineHeight: 1.74, color: 'var(--text2)', marginBottom: 28, maxWidth: 620 }}>
              Published research on real firms — <strong style={{ color: 'var(--text)', fontWeight: 600 }}>browse free, unlock full reports individually</strong>. No Atlas module plan required to start reading.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://atlas.labelnest.in/observatory" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#7C3AED', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Browse the Observatory ↗</a>
              <Link href="/nestlens/intelligence"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>See all of Atlas</Link>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>How it works</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 32 }}>Research that&apos;s open by default.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FEATURES.map(f => (
                <HoverDiv key={f.name}
                  hoverBorderColor={f.hoverColor}
                  style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 13, padding: 20, transition: 'border-color .2s' }}>
                  <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 4, background: `${f.badgeColor}1A`, color: f.badgeColor, display: 'inline-block', marginBottom: 6 }}>{f.badge}</div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 5 }}>{f.name}</div>
                    <div style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>{f.desc}</div>
                  </div>
                </HoverDiv>
              ))}
            </div>
          </div>
        </section>

        {/* SEE ALSO */}
        <section style={{ padding: '40px 48px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13.5, color: 'var(--text2)' }}>
            <span>See also:</span>
            <Link href="/nestlens/intelligence" style={{ color: '#2563EB' }}>The full Atlas platform →</Link>
            <Link href="/nestlens/exchange" style={{ color: '#E91E8C' }}>Buy specific datasets on the Exchange marketplace →</Link>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '64px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14, textAlign: 'center' }}>Ready to browse?</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', maxWidth: 520, margin: '0 auto 12px' }}>Free to browse. Pay only for what you unlock.</h2>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.7 }}>No sign-up required to start browsing the Observatory&apos;s research library.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://atlas.labelnest.in/observatory" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#7C3AED', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Browse the Observatory ↗</a>
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
