import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DiyBanner from '@/components/DiyBanner'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import HoverDiv from '@/components/HoverDiv'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens/command', {
    title: 'Fund Operations Platform — Deal Sourcing, LP Reporting, IC Voting | NestLens Command',
    description: 'The fund-side operating system for VC and PE funds. Fund dashboard, LP management, portfolio company tracking, deal sourcing, IC voting, and investment committee reports — one fund data room per fund.',
  })
}

const CAPABILITIES = [
  { icon: '📊', badge: 'Overview', badgeColor: '#F97316', hoverColor: 'rgba(249,115,22,.4)', name: 'Fund Dashboard', desc: 'A live view of your fund — portfolio health, LP commitments, pipeline stage, and deal flow, in one place.' },
  { icon: '🗄️', badge: 'Data room', badgeColor: '#2563EB', hoverColor: 'rgba(37,99,235,.4)', name: 'Fund Data Room', desc: 'Your fund\'s own investor-facing data room — one included per fund, extra rooms available for co-investors or portfolio companies.' },
  { icon: '🏦', badge: 'LPs', badgeColor: '#10B981', hoverColor: 'rgba(16,185,129,.4)', name: 'LP Management', desc: 'Track commitments, capital calls, and reporting cadence across your limited partners — and discover new LP-side opportunities.' },
  { icon: '🚀', badge: 'Portfolio', badgeColor: '#7C3AED', hoverColor: 'rgba(124,58,237,.4)', name: 'Portfolio Company Tracking', desc: 'Every portfolio company\'s own data room, health, and metrics rolled up into one fund-level view.' },
  { icon: '🔍', badge: 'Sourcing', badgeColor: '#E91E8C', hoverColor: 'rgba(233,30,140,.4)', name: 'Deal Sourcing and Startup Search', desc: 'Search and pipeline new deals directly from the same structured data layer Atlas tracks — no separate tool needed.' },
  { icon: '📝', badge: 'Diligence', badgeColor: '#F97316', hoverColor: 'rgba(249,115,22,.4)', name: 'Diligence and Term Sheets', desc: 'Run diligence checklists and manage term sheets for deals in your pipeline, start to close.' },
  { icon: '✅', badge: 'IC', badgeColor: '#2563EB', hoverColor: 'rgba(37,99,235,.4)', name: 'IC Voting and Reports', desc: 'Investment committee voting on live deals, with structured IC reports generated from the same pipeline data.' },
  { icon: '📈', badge: 'Analysis', badgeColor: '#10B981', hoverColor: 'rgba(16,185,129,.4)', name: 'Comparable Deals and Reports', desc: 'Portfolio and LP reports plus comparable-deal analysis, without leaving the fund workspace.' },
]

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: 'NestLens', path: '/nestlens' },
  { name: 'Command', path: '/nestlens/command' },
])

const MODULE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'NestLens Command',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Fund Operations Platform',
  description: 'The institutional operating system for funds — fund dashboard, LP management, portfolio company tracking, deal sourcing, diligence, IC voting, and reports.',
  url: 'https://labelnest.in/nestlens/command',
  isPartOf: { '@id': 'https://labelnest.in/nestlens#software' },
  featureList: CAPABILITIES.map(c => `${c.name}: ${c.desc}`),
}

export default function CommandPage() {
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
          <div style={{ position: 'absolute', top: -100, right: -80, width: 500, height: 500, borderRadius: '50%', background: 'rgba(249,115,22,.08)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>NestLens Command · Live module</div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(40px,6vw,68px)', fontWeight: 800, letterSpacing: '-.045em', lineHeight: 1.03, color: 'var(--text)', marginBottom: 18, maxWidth: 720 }}>
              The operating system<br />
              your fund <span style={{ background: 'linear-gradient(100deg,#F97316,#E91E8C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>runs on.</span>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.72, color: 'var(--text2)', maxWidth: 620, marginBottom: 28 }}>
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Fund dashboard, LP management, portfolio tracking, deal sourcing, and IC voting</strong> — one workspace for a VC or PE fund, built on the same structured data layer Atlas tracks.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://command.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#F97316', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open Command ↗</a>
              <Link href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Talk to the team</Link>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>What Command does</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 32 }}>Eight fund-operations capabilities</h2>
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

        {/* PRICING */}
        <section style={{ padding: '72px 48px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Pricing</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)' }}>One fund data room included per fund.</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, maxWidth: 500, margin: '0 auto' }}>
              <div style={{ background: 'var(--surface)', border: '1px solid #F97316', borderRadius: 14, padding: 20, position: 'relative' }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 8 }}>Fund</div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: '#F97316' }}>$45</span>
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>/mo</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.5 }}>1 fund data room included · extra rooms $300/yr or $25/mo</div>
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 8 }}>Enterprise</div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>Custom</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.5 }}>Multiple funds, custom LP/portfolio room counts, and SLA</div>
              </div>
            </div>
            <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--text3)', marginTop: 24 }}>See <Link href="/nestlens/pricing" style={{ color: '#F97316' }}>full pricing ↗</Link></p>
          </div>
        </section>

        {/* SEE ALSO */}
        <section style={{ padding: '40px 48px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13.5, color: 'var(--text2)' }}>
            <span>See also:</span>
            <Link href="/nestlens/intelligence" style={{ color: '#2563EB' }}>Source new deals with Atlas →</Link>
            <Link href="/nestlens/capital" style={{ color: '#10B981' }}>Portfolio companies raise on Ascent →</Link>
            <Link href="/nestlens/connect" style={{ color: '#06B6D4' }}>Need diligence help? See Connect's audit partners →</Link>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '64px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14, textAlign: 'center' }}>Ready to run your fund on Command?</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', maxWidth: 520, margin: '0 auto 12px' }}>One workspace, from sourcing to IC vote.</h2>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.7 }}>Fund dashboard, LP management, and portfolio tracking — live today.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://command.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#F97316', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open Command ↗</a>
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
