import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DiyBanner from '@/components/DiyBanner'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import HoverDiv from '@/components/HoverDiv'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens/intelligence', {
    title: 'Private Markets Intelligence — Companies, Funds, Deals, Contacts',
    description: 'Structured intelligence on 40,000+ private market entities. Verified contacts, live signals, human-reviewed data. Track companies, funds, deals, and people. Credit-based.',
  })
}

const ENTITIES = [
  { icon: '🏢', name: 'Companies', desc: 'Portfolio companies, startups, and private firms with financials, stage, sector, and relationship mapping.' },
  { icon: '💼', name: 'Funds', desc: 'PE, VC, and alternative funds with AUM, vintage, strategy, and fund series tracking.' },
  { icon: '🤝', name: 'Deals', desc: 'Investment transactions with round details, investors, valuations, and historical tracking.' },
  { icon: '👤', name: 'People', desc: 'GPs, LPs, founders, board members, and advisors with career history and relationship graphs.' },
  { icon: '📋', name: 'Contacts', desc: 'Verified decision-maker contacts with health scores, email, LinkedIn, and tenure tracking.' },
  { icon: '🏛️', name: 'GPs and LPs', desc: 'General and limited partners with fund-level relationships and investment mandates.' },
]

const CAPABILITIES = [
  { icon: '🔍', badge: 'Core', badgeColor: '#2563EB', hoverColor: 'rgba(37,99,235,.4)', name: 'Intelligence Engine', desc: 'Central entity intelligence layer tracking companies, funds, deals, people, contacts, GPs, LPs, and service providers with full relationship mapping.' },
  { icon: '📡', badge: 'Real-time', badgeColor: '#F97316', hoverColor: 'rgba(249,115,22,.4)', name: 'Live Market Signals', desc: 'AI-detected events: funding rounds, leadership changes, deal activity, regulatory filings, and competitive moves. Daily signal cadence.' },
  { icon: '🌐', badge: 'Discovery', badgeColor: '#10B981', hoverColor: 'rgba(16,185,129,.4)', name: 'Global Search and Filters', desc: 'Unified search across all entity types with structured filtering by sector, stage, geography, fund size, deal type, and contact role.' },
  { icon: '📊', badge: 'Workflow', badgeColor: '#7C3AED', hoverColor: 'rgba(124,58,237,.4)', name: 'Exports and Workflow Tools', desc: 'Export structured data, track entities across sessions, set alerts for changes, and compare companies side-by-side.' },
  { icon: '📬', badge: 'Contacts', badgeColor: '#E91E8C', hoverColor: 'rgba(233,30,140,.4)', name: 'Contact Intelligence', desc: 'Verified contact profiles with health scores, email, LinkedIn, title taxonomy, firm history, and people-moves detection. 12K+ contacts and growing.' },
]

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: 'NestLens', path: '/nestlens' },
  { name: 'Atlas', path: '/nestlens/intelligence' },
])

const MODULE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'NestLens Atlas',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Private Markets Intelligence Platform',
  description: 'Structured intelligence on 40,000+ private market entities — companies, funds, deals, people, and contacts. Human-verified at the core, credit-based access.',
  url: 'https://labelnest.in/nestlens/intelligence',
  isPartOf: { '@id': 'https://labelnest.in/nestlens#software' },
  featureList: CAPABILITIES.map(c => `${c.name}: ${c.desc}`),
}

export default function IntelligencePage() {
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
          <div style={{ position: 'absolute', top: -100, left: -80, width: 500, height: 500, borderRadius: '50%', background: 'rgba(37,99,235,.08)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <img src="/logos/atlas-32.png" alt="" width={20} height={20} style={{ objectFit: 'contain' }} />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)' }}>NestLens Atlas · Live module</div>
              </div>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(38px,5.2vw,62px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.04, color: 'var(--text)', marginBottom: 16 }}>
                Private markets intelligence.<br />
                <span style={{ background: 'linear-gradient(100deg,#2563EB,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Structured, not scraped.</span>
              </h1>
              <p style={{ fontSize: 'clamp(15px,1.8vw,17.5px)', lineHeight: 1.74, color: 'var(--text2)', marginBottom: 28 }}>
                NestLens Atlas tracks <strong style={{ color: 'var(--text)', fontWeight: 600 }}>companies, funds, deals, people, and contacts</strong> across private markets. Human-verified at the core. Priced for teams that legacy vendors ignore.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://atlas.labelnest.in" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563EB', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open Atlas ↗</a>
                <Link href="/contact"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Request access</Link>
              </div>
            </div>

            {/* Stats panel */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>Platform numbers</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', color: '#10B981' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />Live data
                </div>
              </div>
              {[
                { label: 'Entities tracked', val: '40K+', color: '#2563EB' },
                { label: 'Verified contacts', val: '12K+', color: '#2563EB' },
                { label: 'Entity types', val: '7', color: '#2563EB' },
                { label: 'Signal cadence', val: 'Daily', mono: true, color: '#10B981' },
                { label: 'Access model', val: 'Credits · No lock-in', mono: true, color: 'var(--text2)' },
              ].map((row, i) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
                  <span style={{ fontSize: 13, color: 'var(--text2)' }}>{row.label}</span>
                  <span style={row.mono ? { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: row.color, textTransform: 'uppercase', letterSpacing: '.08em' } : { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, color: row.color }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENTITY TYPES */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>What NestLens Atlas tracks</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 12 }}>Seven entity types. One structured intelligence layer.</h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 520, marginBottom: 36, lineHeight: 1.65 }}>NestLens builds a complete picture of the private markets ecosystem — from fund managers and their portfolios to the contacts who drive decisions.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {ENTITIES.map(e => (
                <HoverDiv key={e.name}
                  hoverBorderColor="rgba(255,255,255,.15)"
                  hoverTransform="translateY(-3px)"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 22, transition: 'border-color .2s,transform .2s' }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{e.icon}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 5 }}>{e.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{e.desc}</div>
                </HoverDiv>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>What the module does</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 32 }}>Five intelligence capabilities</h2>
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

        {/* OBSERVATORY */}
        <section style={{ padding: '56px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}>
              <img src="/logos/observatory.png" alt="" width={56} height={56} style={{ objectFit: 'contain', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>Part of Atlas</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 19, color: 'var(--text)', marginBottom: 6 }}>Atlas Observatory — published research, free to browse</div>
                <div style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.6 }}>The insights &amp; trends layer for private markets. No Atlas plan required — unlock individual reports as you need them.</div>
              </div>
              <Link href="/nestlens/intelligence/observatory"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#7C3AED', color: '#fff', fontSize: 14, fontWeight: 600, padding: '11px 22px', borderRadius: 10, whiteSpace: 'nowrap' }}>Explore the Observatory →</Link>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section style={{ padding: '72px 48px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Pricing</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)' }}>Five tiers, priced by seats and credits.</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
              {[
                { name: 'Individual', price: '₹14,999', unit: '/mo', sub: '1 seat · 50 credits/mo · 250 firm unlocks/yr' },
                { name: 'Core', price: '₹54,999', unit: '/mo', sub: '2 seats · 100 credits/mo · 1,500 firm unlocks/yr' },
                { name: 'Growth', price: '₹1,04,999', unit: '/mo', sub: '3 seats · 200 credits/mo · 1 data room' },
                { name: 'Pro', price: '₹1,64,999', unit: '/mo', sub: '5 seats · 400 credits/mo · 2 data rooms · Priority support', popular: true },
                { name: 'Enterprise', price: 'Custom', unit: '', sub: 'Custom seats, credits & SLA' },
              ].map(t => (
                <div key={t.name} style={{ background: 'var(--surface)', border: `1px solid ${t.popular ? '#2563EB' : 'var(--border)'}`, borderRadius: 14, padding: 20, position: 'relative' }}>
                  {t.popular && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#2563EB', color: '#fff', fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14.5, color: 'var(--text)', marginBottom: 8 }}>{t.name}</div>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 800, color: t.popular ? '#2563EB' : 'var(--text)' }}>{t.price}</span>
                    <span style={{ fontSize: 11, color: 'var(--text3)' }}>{t.unit}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.5 }}>{t.sub}</div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--text3)', marginTop: 24 }}>Also available annually — see <a href="https://nestlens.labelnest.in/pricing" target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB' }}>full pricing ↗</a></p>
          </div>
        </section>

        {/* SEE ALSO */}
        <section style={{ padding: '40px 48px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13.5, color: 'var(--text2)' }}>
            <span>See also:</span>
            <Link href="/nestlens/exchange" style={{ color: '#E91E8C' }}>Buy specific datasets on the Exchange marketplace →</Link>
            <Link href="/nestlens/capital" style={{ color: '#10B981' }}>For founders raising capital, see Ascent →</Link>
          </div>
        </section>


        {/* CTA */}
        <section style={{ padding: '64px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14, textAlign: 'center' }}>Ready to open Atlas?</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', maxWidth: 520, margin: '0 auto 12px' }}>40K+ entities. 12K+ contacts. Live today.</h2>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.7 }}>Seat- and credit-based pricing. No hidden fees. Start today and scale as you need.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://atlas.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563EB', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open Atlas ↗</a>
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
