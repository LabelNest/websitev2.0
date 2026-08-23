import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DiyBanner from '@/components/DiyBanner'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import HoverDiv from '@/components/HoverDiv'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens/connect', {
    title: 'Mentor Connect and Verified Audit Partners | NestLens Connect',
    description: 'The ecosystem and network layer of NestLens — mentor connect, verified audit requests, and dedicated dashboards for mentors, audit partners, and scouting partners.',
  })
}

const CAPABILITIES = [
  { icon: '🤝', badge: 'Mentors', badgeColor: '#06B6D4', hoverColor: 'rgba(6,182,212,.4)', name: 'Mentor Connect', desc: 'Founders request mentorship directly from Ascent or Command; mentors run their own dashboard to accept requests and track engagements.' },
  { icon: '✅', badge: 'Audit', badgeColor: '#7C3AED', hoverColor: 'rgba(124,58,237,.4)', name: 'Verified Audit Requests', desc: 'Request a verified audit on your data room from a vetted audit partner — built into the founder and fund workflow, not a separate tool.' },
  { icon: '📋', badge: 'Partners', badgeColor: '#F97316', hoverColor: 'rgba(249,115,22,.4)', name: 'Audit Partner Dashboard', desc: 'Audit partners get their own account and dashboard — never the founder-facing navigation, just their real request queue.' },
  { icon: '🔭', badge: 'Sourcing', badgeColor: '#10B981', hoverColor: 'rgba(16,185,129,.4)', name: 'Scouting Partner Dashboard', desc: 'Scouting partners get a dedicated workspace to track the founders and funds they refer into the ecosystem.' },
]

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: 'NestLens', path: '/nestlens' },
  { name: 'Connect', path: '/nestlens/connect' },
])

const MODULE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'NestLens Connect',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Ecosystem and Network Platform',
  description: 'The capital and expertise network — mentor connect, verified audit requests, and dedicated partner dashboards for mentors, audit partners, and scouting partners.',
  url: 'https://labelnest.in/nestlens/connect',
  isPartOf: { '@id': 'https://labelnest.in/nestlens#software' },
  featureList: CAPABILITIES.map(c => `${c.name}: ${c.desc}`),
}

export default function ConnectPage() {
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
          <div style={{ position: 'absolute', top: -100, left: -80, width: 500, height: 500, borderRadius: '50%', background: 'rgba(6,182,212,.08)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <img src="/logos/connect-32.png" alt="" width={20} height={20} style={{ objectFit: 'contain' }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)' }}>NestLens Connect · Live module</div>
            </div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(40px,6vw,68px)', fontWeight: 800, letterSpacing: '-.045em', lineHeight: 1.03, color: 'var(--text)', marginBottom: 18, maxWidth: 700 }}>
              The capital and expertise<br />
              <span style={{ background: 'linear-gradient(100deg,#06B6D4,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>network.</span>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.72, color: 'var(--text2)', maxWidth: 600, marginBottom: 28 }}>
              Mentors, audit partners, and scouting partners — <strong style={{ color: 'var(--text)', fontWeight: 600 }}>connected directly into the same rooms founders and funds already work in</strong>, not a separate directory to search.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://connect.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#06B6D4', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open Connect ↗</a>
              <a href="https://nestlens.labelnest.in/mentors/apply" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Become a mentor</a>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>What Connect does</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 32 }}>Four ways the network shows up in your workflow</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CAPABILITIES.map(c => (
                <HoverDiv key={c.name}
                  hoverBorderColor={c.hoverColor}
                  style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 13, padding: 20, transition: 'border-color .2s' }}>
                  <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 4, background: `${c.badgeColor}1A`, color: c.badgeColor, display: 'inline-block', marginBottom: 6 }}>{c.badge}</div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 5 }}>{c.name}</div>
                    <div style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>{c.desc}</div>
                  </div>
                </HoverDiv>
              ))}
            </div>
          </div>
        </section>

        {/* ACCESS */}
        <section style={{ padding: '72px 48px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Access</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)' }}>Included, not a separate subscription.</h2>
              <p style={{ fontSize: 14.5, color: 'var(--text2)', maxWidth: 560, margin: '14px auto 0', lineHeight: 1.7 }}>Mentor Connect and verified audit requests come with an active Ascent or Command plan. Mentors, audit partners, and scouting partners apply directly to join the network.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, maxWidth: 700, margin: '0 auto' }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 22, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14.5, color: 'var(--text)', marginBottom: 8 }}>Founders and funds</div>
                <div style={{ fontSize: 12.5, color: 'var(--text3)', lineHeight: 1.6 }}>Mentor Connect and audit requests are included with Ascent and Command.</div>
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 22, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14.5, color: 'var(--text)', marginBottom: 8 }}>Mentors and partners</div>
                <div style={{ fontSize: 12.5, color: 'var(--text3)', lineHeight: 1.6 }}>Free to apply — vetted before your dashboard goes live.</div>
              </div>
            </div>
          </div>
        </section>

        {/* SEE ALSO */}
        <section style={{ padding: '40px 48px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13.5, color: 'var(--text2)' }}>
            <span>See also:</span>
            <Link href="/nestlens/capital" style={{ color: '#10B981' }}>Founders raising capital, see Ascent →</Link>
            <Link href="/nestlens/command" style={{ color: '#F97316' }}>Funds running operations, see Command →</Link>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '64px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14, textAlign: 'center' }}>Join the network</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', maxWidth: 520, margin: '0 auto 12px' }}>Mentors and audit partners, apply today.</h2>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.7 }}>Get connected directly into the rooms where founders and funds are already working.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://nestlens.labelnest.in/mentors/apply" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#06B6D4', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Become a mentor ↗</a>
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
