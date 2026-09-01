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

const CONNECTIONS = [
  { from: 'Atlas', to: 'Deal Sourcing & Startup Search', desc: 'Same structured data layer Atlas tracks — no separate tool for finding your next deal.', c: '#0891B2' },
  { from: 'Ascent', to: 'Command Portfolio', desc: "A portfolio company's own metrics sync in once they accept your invite — headcount, revenue, burn, runway, valuation.", c: '#7C3AED' },
  { from: 'Valuation', to: 'NAV · TVPI · DPI · IRR', desc: 'Save a fair value on a portfolio company and the fund\'s returns recompute immediately — not on the next report cycle.', c: '#10B981' },
]

const STATS = [
  { v: '119', l: 'Vault fields', c: '#7C3AED' },
  { v: '10', l: 'Data room sections', c: '#2563EB' },
  { v: '8', l: 'Fund-ops capabilities', c: '#10B981' },
  { v: '3', l: 'Live automations', c: '#F97316' },
]

// Fills use var(--surface)/var(--text)/var(--text2) instead of hardcoded
// pastels so it stays correct in this site's dark-first theme. Three real
// sources, matching CONNECTIONS above -- Atlas feeds Deal Sourcing/Startup
// Search (the same claim this page's own Deal Sourcing capability copy
// already makes), Ascent feeds portfolio metrics, Valuation feeds NAV.
const CONNECTION_DIAGRAM_SVG = `<svg width="100%" viewBox="0 0 680 360" role="img">
<title>Command data flow</title>
<desc>Atlas, Ascent, and Valuation data flowing into Command</desc>
<defs>
  <marker id="cmdArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </marker>
  <style>
    .cdt { font: 600 13px/1 'Bricolage Grotesque',sans-serif; }
    .cds { font: 400 11px/1 system-ui,sans-serif; }
    .cring { fill:none; stroke:#7C3AED; stroke-width:1; opacity:0.18; }
    @keyframes cSpinA { to { transform: rotate(360deg); } }
    @keyframes cSpinB { to { transform: rotate(-360deg); } }
    @keyframes cDash  { to { stroke-dashoffset: -24; } }
    @keyframes cGlow  { 0%,100%{opacity:.25} 50%{opacity:.6} }
    .cr1 { transform-origin:340px 175px; animation:cSpinA 20s linear infinite; }
    .cr2 { transform-origin:340px 175px; animation:cSpinB 32s linear infinite; }
    .cf1 { stroke-dasharray:6 8; animation:cDash 1.4s linear infinite; }
    .cf2 { stroke-dasharray:6 8; animation:cDash 1.8s linear infinite; }
    .cf3 { stroke-dasharray:6 8; animation:cDash 2.0s linear infinite; }
    .cgw { animation:cGlow 3s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) { .cr1,.cr2,.cf1,.cf2,.cf3,.cgw { animation: none; } }
  </style>
</defs>
<circle class="cring cr1" cx="340" cy="175" r="120"/>
<circle class="cring cr2" cx="340" cy="175" r="95" stroke-dasharray="3 10"/>
<line x1="102" y1="90"  x2="294" y2="155" stroke="#0891B2" stroke-width="1.5" fill="none" class="cf1" marker-end="url(#cmdArr)"/>
<line x1="102" y1="175" x2="294" y2="175" stroke="#7C3AED" stroke-width="1.5" fill="none" class="cf2" marker-end="url(#cmdArr)"/>
<line x1="102" y1="260" x2="294" y2="195" stroke="#10B981" stroke-width="1.5" fill="none" class="cf3" marker-end="url(#cmdArr)"/>
<circle r="3.5" fill="#0891B2"><animateMotion dur="1.4s" repeatCount="indefinite"><mpath href="#cp1"/></animateMotion></circle>
<path id="cp1" d="M102,90 L294,155" fill="none" stroke="none"/>
<circle r="3.5" fill="#7C3AED"><animateMotion dur="1.8s" repeatCount="indefinite"><mpath href="#cp2"/></animateMotion></circle>
<path id="cp2" d="M102,175 L294,175" fill="none" stroke="none"/>
<circle r="3.5" fill="#10B981"><animateMotion dur="2.0s" repeatCount="indefinite"><mpath href="#cp3"/></animateMotion></circle>
<path id="cp3" d="M102,260 L294,195" fill="none" stroke="none"/>
<circle cx="340" cy="175" r="50" fill="var(--surface)" stroke="#7C3AED" stroke-width="1.5" class="cgw"/>
<circle cx="340" cy="175" r="38" fill="#7C3AED1A" stroke="#7C3AED" stroke-width="0.5"/>
<text x="340" y="170" class="cdt" text-anchor="middle" fill="#7C3AED" font-size="17">⌘</text>
<text x="340" y="187" class="cdt" text-anchor="middle" fill="#7C3AED">Command</text>
<rect x="22" y="66" width="80" height="48" rx="7" fill="var(--surface)" stroke="#0891B2" stroke-width="1"/>
<text x="62" y="87" class="cdt" text-anchor="middle" fill="var(--text)">Atlas</text>
<text x="62" y="104" class="cds" text-anchor="middle" fill="var(--text2)">Market data</text>
<rect x="22" y="151" width="80" height="48" rx="7" fill="var(--surface)" stroke="#7C3AED" stroke-width="1"/>
<text x="62" y="172" class="cdt" text-anchor="middle" fill="var(--text)">Ascent</text>
<text x="62" y="189" class="cds" text-anchor="middle" fill="var(--text2)">Startup metrics</text>
<rect x="22" y="236" width="80" height="48" rx="7" fill="var(--surface)" stroke="#10B981" stroke-width="1"/>
<text x="62" y="257" class="cdt" text-anchor="middle" fill="var(--text)">Valuation</text>
<text x="62" y="274" class="cds" text-anchor="middle" fill="var(--text2)">NAV · TVPI</text>
<text x="340" y="332" class="cds" text-anchor="middle" fill="var(--text3)">Deal sourcing · Cap table · NAV · TVPI/DPI/IRR · LP reports</text>
</svg>`

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
          <div style={{ position: 'absolute', top: -100, right: -80, width: 500, height: 500, borderRadius: '50%', background: 'rgba(124,58,237,.10)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <img src="/logos/command-32.png" alt="" width={20} height={20} style={{ objectFit: 'contain' }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)' }}>NestLens Command · Live module</div>
            </div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(40px,6vw,68px)', fontWeight: 800, letterSpacing: '-.045em', lineHeight: 1.03, color: 'var(--text)', marginBottom: 18, maxWidth: 720 }}>
              The operating system<br />
              your fund <span style={{ background: 'linear-gradient(100deg,#7C3AED,#E91E8C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>runs on.</span>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.72, color: 'var(--text2)', maxWidth: 620, marginBottom: 28 }}>
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Fund dashboard, LP management, portfolio tracking, deal sourcing, and IC voting</strong> — one workspace for a VC or PE fund, built on the same structured data layer Atlas tracks.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://command.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#7C3AED', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open Command ↗</a>
              <Link href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Talk to the team</Link>
            </div>
          </div>
        </section>

        {/* CONNECTIONS -- the three real automations, plus the diagram that
            ships inside Command itself */}
        <section style={{ padding: '56px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }} dangerouslySetInnerHTML={{ __html: CONNECTION_DIAGRAM_SVG }} />
          <div style={{ maxWidth: 680, margin: '40px auto 0' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', textAlign: 'center', marginBottom: 16 }}>Three live automations</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 10 }}>
              {CONNECTIONS.map(conn => (
                <div key={conn.from} style={{ padding: '14px 16px', background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)', borderLeft: `3px solid ${conn.c}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: conn.c }}>{conn.from}</span>
                    <span style={{ fontSize: 11, color: 'var(--text3)' }}>→</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: conn.c }}>{conn.to}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{conn.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', maxWidth: 680, margin: '40px auto 0', borderTop: '1px solid var(--border)', paddingTop: 28, justifyContent: 'center' }}>
            {STATS.map((s, i) => (
              <div key={s.l} style={{ flex: 1, textAlign: 'center', padding: '0 12px', borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 26, fontWeight: 800, color: s.c, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 5 }}>{s.l}</div>
              </div>
            ))}
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
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#7C3AED', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open Command ↗</a>
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
