import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'NestLens Intelligence — Private Markets Intelligence Layer', description: 'NestLens Intelligence tracks 40K+ entities, 12K+ verified contacts, fund activity, deal signals, and market intelligence across private markets.' }

const ENTITIES = [
  { icon: '🏢', name: 'Companies', desc: 'Portfolio companies, startups, and private firms with financials, stage, sector, and relationship mapping.' },
  { icon: '💼', name: 'Funds', desc: 'PE, VC, and alternative funds with AUM, vintage, strategy, and fund series tracking.' },
  { icon: '🤝', name: 'Deals', desc: 'Investment transactions with round details, investors, valuations, and historical tracking.' },
  { icon: '👤', name: 'People', desc: 'GPs, LPs, founders, board members, and advisors with career history and relationship graphs.' },
  { icon: '📋', name: 'Contacts', desc: 'Verified decision-maker contacts with health scores, email, LinkedIn, and tenure tracking.' },
  { icon: '🏛️', name: 'GPs and LPs', desc: 'General partners and limited partners with fund-level relationships and investment mandates.' },
]

const CAPABILITIES = [
  { icon: '🔍', badge: 'Core', badgeColor: '#2563EB', name: 'Intelligence Engine', desc: 'Central entity intelligence layer tracking companies, funds, deals, people, contacts, GPs, LPs, and service providers with full relationship mapping.' },
  { icon: '📡', badge: 'Real-Time', badgeColor: '#F97316', name: 'Live Market Signals', desc: 'AI-detected events: funding rounds, leadership changes, deal activity, regulatory filings, and competitive moves. Daily signal cadence.' },
  { icon: '🌐', badge: 'Discovery', badgeColor: '#10B981', name: 'Global Search and Filters', desc: 'Unified search across all entity types with structured filtering by sector, stage, geography, fund size, deal type, and contact role.' },
  { icon: '📊', badge: 'Workflow', badgeColor: '#7C3AED', name: 'Exports and Workflow Tools', desc: 'Export structured data, track entities across sessions, set alerts for changes, and compare companies side-by-side.' },
  { icon: '📬', badge: 'Contacts', badgeColor: '#E91E8C', name: 'Contact Intelligence', desc: 'Verified contact profiles with health scores, email, LinkedIn, title taxonomy, firm history, and people-moves detection. 12K+ contacts and growing.' },
]

export default function NestLensIntelligencePage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>
        {/* Module tab nav */}
        <div className="border-b px-8" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="max-w-[1240px] mx-auto flex gap-1 py-2">
            {[{href:'/nestlens/intelligence',label:'Intelligence',active:true},{href:'/nestlens/exchange',label:'Exchange',active:false},{href:'/nestlens/capital',label:'Capital Readiness',active:false}].map(t => (
              <Link key={t.href} href={t.href}
                className="font-medium text-[13px] px-4 py-2 rounded-lg transition-all"
                style={{ color: t.active ? 'var(--blue)' : 'var(--text2)', background: t.active ? 'var(--surface)' : 'transparent' }}>
                {t.label}
              </Link>
            ))}
          </div>
        </div>

        {/* HERO */}
        <section className="px-8 py-20 relative overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'rgba(37,99,235,0.09)', filter: 'blur(90px)' }} />
          <div className="max-w-[1240px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-5" style={{ color: 'var(--text3)' }}>NestLens Intelligence · Live module</div>
              <h1 className="font-display font-extrabold tracking-tight leading-[1.04] mb-5"
                style={{ fontSize: 'clamp(38px,5.2vw,62px)', color: 'var(--text)' }}>
                Private markets intelligence.
                <br />
                <span style={{ background: 'linear-gradient(100deg,#2563EB,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Structured, not scraped.
                </span>
              </h1>
              <p className="text-[clamp(15px,1.8vw,17.5px)] leading-[1.74] mb-8" style={{ color: 'var(--text2)' }}>
                NestLens Intelligence tracks <strong style={{ color: 'var(--text)', fontWeight: 600 }}>companies, funds, deals, people, and contacts</strong> across private markets. Built with human verification at the core, priced for the teams that legacy vendors ignore.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white"
                  style={{ background: 'var(--blue)' }}>Open Intelligence ↗</a>
                <Link href="/contact" className="inline-flex items-center gap-2 font-medium text-[14.5px] px-6 py-3.5 rounded-[10px] border"
                  style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'var(--bord2)' }}>Request access</Link>
              </div>
            </div>
            {/* Stats panel */}
            <div className="rounded-[16px] p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="font-display font-bold text-[13.5px]" style={{ color: 'var(--text)' }}>Platform numbers</div>
                <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[.08em] uppercase" style={{ color: 'var(--green)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green)' }} />Live data
                </div>
              </div>
              {[
                ['Entities tracked','40K+','var(--blue)','Growing'],
                ['Verified contacts','12K+','var(--green)','Verified'],
                ['Data health score','98%','var(--green)','High'],
                ['Signal cadence','Daily','var(--orange)','Feeds'],
                ['Entity types covered','7+ types','var(--text)',''],
                ['Access model','Credits','var(--purple)','No lock-in'],
              ].map(([label,val,color,badge]) => (
                <div key={label as string} className="flex items-center justify-between py-2.5 border-b last:border-0"
                  style={{ borderColor: 'var(--border)' }}>
                  <span className="text-[13px]" style={{ color: 'var(--text2)' }}>{label}</span>
                  <span className="font-display font-extrabold text-[16px] tracking-tight" style={{ color: color as string }}>
                    {val}
                    {badge && <span className="ml-2 font-mono text-[9px] tracking-[.08em] uppercase px-1.5 py-0.5 rounded"
                      style={{ background: `${color as string}18`, color: color as string }}>{badge}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENTITY TYPES */}
        <section className="px-8 py-16 border-t" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--blue)' }}>What NestLens tracks</div>
            <h2 className="font-display font-extrabold tracking-tight leading-[1.06] mb-3"
              style={{ fontSize: 'clamp(24px,3.5vw,40px)', color: 'var(--text)' }}>Seven entity types. One structured intelligence layer.</h2>
            <p className="text-[15px] leading-[1.74] max-w-[500px] mb-10" style={{ color: 'var(--text2)' }}>
              NestLens builds a complete picture of the private markets ecosystem — from fund managers and their portfolios to the contacts who drive decisions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ENTITIES.map(e => (
                <div key={e.name} className="rounded-[14px] p-5 transition-all hover:-translate-y-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="text-[24px] mb-3">{e.icon}</div>
                  <div className="font-display font-bold text-[15px] mb-2" style={{ color: 'var(--text)' }}>{e.name}</div>
                  <div className="text-[13px] leading-[1.6]" style={{ color: 'var(--text2)' }}>{e.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="px-8 py-16">
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--blue)' }}>What the module does</div>
            <h2 className="font-display font-extrabold tracking-tight leading-[1.06] mb-10"
              style={{ fontSize: 'clamp(24px,3.5vw,40px)', color: 'var(--text)' }}>Five intelligence capabilities</h2>
            <div className="flex flex-col gap-4">
              {CAPABILITIES.map(c => (
                <div key={c.name} className="flex gap-5 items-start p-5 rounded-[13px] transition-all hover:translate-x-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="text-[20px] flex-shrink-0 mt-0.5">{c.icon}</div>
                  <div>
                    <div className="mb-1">
                      <span className="font-mono text-[9px] tracking-[.08em] uppercase px-1.5 py-0.5 rounded mr-2"
                        style={{ background: `${c.badgeColor}12`, color: c.badgeColor }}>{c.badge}</span>
                      <span className="font-display font-bold text-[15px]" style={{ color: 'var(--text)' }}>{c.name}</span>
                    </div>
                    <div className="text-[13.5px] leading-[1.6]" style={{ color: 'var(--text2)' }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 py-16 border-t text-center" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto">
            <h2 className="font-display font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(24px,3.5vw,40px)', color: 'var(--text)' }}>
              Ready to open NestLens Intelligence?
            </h2>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white"
                style={{ background: 'var(--blue)' }}>Open Intelligence ↗</a>
              <Link href="/contact" className="inline-flex items-center gap-2 font-medium text-[14.5px] px-6 py-3.5 rounded-[10px] border"
                style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'var(--bord2)' }}>Talk to the team</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
