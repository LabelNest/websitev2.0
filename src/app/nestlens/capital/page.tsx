import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'NestLens Capital Readiness — Data Room, Investor Matching, and Raise Preparation', description: 'NestLens Capital Readiness gives you a structured data room, investor tier scoring, LP-GP matching, SP matching, and grant and competition discovery — all live.' }

const TIERS = [
  { color: '#F59E0B', bg: 'rgba(245,158,11,.12)', label: 'Angel Ready', score: '20%+', items: ['Company name, website, and one-line description','Founder profiles with name, role, and equity percentage','Industry and company stage','Basic elevator pitch covering problem and solution','Rough revenue or traction number'] },
  { color: '#3B82F6', bg: 'rgba(59,130,246,.12)', label: 'Accelerator Ready', score: '35%+', items: ['All Angel requirements above','Full elevator pitch covering what, who, and why now','Financials — monthly revenue, burn rate, runway','Team headcount and full-time status','Pitch deck uploaded','Business model described'] },
  { color: '#10B981', bg: 'rgba(16,185,129,.12)', label: 'Seed VC Ready', score: '55%+', items: ['All Accelerator requirements above','Cap table with all shareholders','COI and incorporation documents uploaded','Shareholder agreement on file','Customer count and key clients','Use of funds breakdown','NDA and MSA templates ready','Product description and development stage'] },
  { color: '#7C3AED', bg: 'rgba(124,58,237,.12)', label: 'Institutional Ready', score: '75%+', items: ['All Seed VC requirements above','Financial model with 3-year projections uploaded','SAFE or Term Sheet on file','Privacy Policy and Security Policy published','ESOP and Contracts document uploaded','Organisation chart uploaded','Complete legal — NDA, MSA, no open litigation','Fundraising history documented','Previous investor list with amounts'] },
]

const DR_SECTIONS = [
  ['🏢','Profile and Identity','Company name and website, Industry and stage, Business model, Location'],
  ['👥','Team and Governance','Founders, Contracts and ESOP, Advisors, Reference list'],
  ['💰','Financials','Revenue (annual and monthly), Profitability and burn rate, Runway, Financial model and projections'],
  ['🤝','Clients','Customer counts, Key customers, Pipeline, Usage metrics'],
  ['📋','Company Documents','Incorporation docs, Organisation chart, Shareholder agreements, Fundraising history'],
  ['⚖️','Legal','Litigation and regulatory status, NDA and MSA, Privacy and security policies, IP — patents and trademarks'],
  ['📈','Investment Docs','Fundraising status, Cap table, Use of funds, SAFE or Term Sheet'],
  ['🚀','Product and Services','Product and service description, Development stage, Core features, Technology stack'],
  ['🎯','Investment Criteria','Investor types, Target geographies, Check size, Investor preferences'],
  ['🔧','SP Criteria','Areas needing help, Existing providers, Geography preference'],
]

const MODULE_NAV = [{href:'/nestlens/intelligence',label:'Intelligence'},{href:'/nestlens/exchange',label:'Exchange'},{href:'/nestlens/capital',label:'Capital Readiness',active:true}]

export default function NestLensCapitalPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>
        <div className="border-b px-8" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="max-w-[1240px] mx-auto flex gap-1 py-2">
            {MODULE_NAV.map(t => (
              <Link key={t.href} href={t.href}
                className="font-medium text-[13px] px-4 py-2 rounded-lg transition-all"
                style={{ color: (t as any).active ? 'var(--green)' : 'var(--text2)', background: (t as any).active ? 'var(--surface)' : 'transparent' }}>
                {t.label}
              </Link>
            ))}
          </div>
        </div>

        {/* HERO */}
        <section className="px-8 py-20 relative overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'rgba(16,185,129,0.08)', filter: 'blur(90px)' }} />
          <div className="max-w-[1240px] mx-auto relative z-10">
            <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-5" style={{ color: 'var(--text3)' }}>NestLens Capital Readiness · Live module</div>
            <h1 className="font-display font-extrabold tracking-tight leading-[1.03] mb-5 max-w-[680px]"
              style={{ fontSize: 'clamp(40px,6vw,72px)', color: 'var(--text)' }}>
              Build a data room investors
              <br />actually{' '}
              <span style={{ background: 'linear-gradient(100deg,#10B981,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>trust.</span>
            </h1>
            <p className="text-[clamp(15px,1.8vw,18px)] leading-[1.72] max-w-[600px] mb-10" style={{ color: 'var(--text2)' }}>
              A <strong style={{ color: 'var(--text)', fontWeight: 600 }}>10-section, 51-item data room</strong> with investor tier scoring, LP-GP matching, SP matching, and grant and competition discovery — all in one place, all live.
            </p>

            {/* Tier score pills */}
            <div className="flex gap-3 flex-wrap mb-8">
              {TIERS.map(t => (
                <div key={t.label} className="flex items-center gap-3 px-4 py-3 rounded-[12px] border"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                  <div className="font-display font-extrabold text-[22px] tracking-tight" style={{ color: t.color }}>{t.score}</div>
                  <div>
                    <div className="font-display font-bold text-[13px]" style={{ color: 'var(--text)' }}>{t.label}</div>
                    <div className="text-[11px]" style={{ color: 'var(--text3)' }}>threshold</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white"
                style={{ background: 'var(--green)' }}>Open Capital Readiness ↗</a>
              <Link href="/contact" className="inline-flex items-center gap-2 font-medium text-[14.5px] px-6 py-3.5 rounded-[10px] border"
                style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'var(--bord2)' }}>Talk to the team</Link>
            </div>
          </div>
        </section>

        {/* INVESTOR TIERS */}
        <section className="px-8 py-16 border-t" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--green)' }}>Investor tiers</div>
            <h2 className="font-display font-extrabold tracking-tight mb-3" style={{ fontSize: 'clamp(24px,3.5vw,40px)', color: 'var(--text)' }}>What score do you need to raise?</h2>
            <p className="text-[15px] leading-[1.74] max-w-[500px] mb-10" style={{ color: 'var(--text2)' }}>
              Each tier represents a threshold of completeness that aligns with investor expectations. Requirements are cumulative.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TIERS.map(t => (
                <div key={t.label} className="rounded-[16px] p-7 relative overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: t.color }} />
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-display font-extrabold text-[14px] px-3 py-1.5 rounded-[6px]" style={{ background: t.bg, color: t.color }}>{t.label}</span>
                    <span className="font-mono text-[12px]" style={{ color: 'var(--text3)' }}>Score {t.score}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {t.items.map(item => (
                      <div key={item} className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--text2)' }}>
                        <span className="flex-shrink-0 mt-0.5" style={{ color: t.color }}>✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DATA ROOM SECTIONS */}
        <section className="px-8 py-16">
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--green)' }}>The Data Room</div>
            <h2 className="font-display font-extrabold tracking-tight mb-3" style={{ fontSize: 'clamp(24px,3.5vw,40px)', color: 'var(--text)' }}>10 sections. 51 items. Everything investors ask for.</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-8">
              {DR_SECTIONS.map(([icon,name,items]) => (
                <div key={name as string} className="rounded-[13px] p-4 transition-all hover:-translate-y-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="text-[20px] mb-2.5">{icon}</div>
                  <div className="font-display font-bold text-[13px] mb-2" style={{ color: 'var(--text)' }}>{name}</div>
                  <div className="text-[11px] leading-[1.5]" style={{ color: 'var(--text3)' }}>{(items as string).split(', ').slice(0,3).join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MATCHING */}
        <section className="px-8 py-16 border-t" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--green)' }}>Matching and discovery</div>
            <h2 className="font-display font-extrabold tracking-tight mb-10" style={{ fontSize: 'clamp(24px,3.5vw,40px)', color: 'var(--text)' }}>Beyond the data room. Find your capital.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: '🏦', color: '#2563EB', name: 'LP-GP Matching', desc: 'Matched to limited partners and general partners whose investment criteria align with your stage, sector, geography, and check size.' },
                { icon: '🔧', color: '#7C3AED', name: 'SP Matching', desc: 'Matched to service providers based on what your company needs, where you are, and who has helped companies like yours.' },
                { icon: '🏆', color: '#F97316', name: 'Grant and Competition Discovery', desc: 'Discover non-dilutive capital opportunities — government grants, accelerator programs, startup competitions, and innovation awards.' },
                { icon: '🤝', color: '#10B981', name: 'Acquisition and Referral Partners', desc: 'Connect with strategic acquisition partners, distribution channels, and referral networks matched to your product category.' },
              ].map(m => (
                <div key={m.name} className="rounded-[16px] p-7 relative overflow-hidden transition-all hover:-translate-y-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="absolute top-3 right-3 font-mono text-[9px] tracking-[.08em] uppercase px-2 py-1 rounded"
                    style={{ background: 'rgba(16,185,129,.12)', color: 'var(--green)' }}>Live</div>
                  <div className="text-[28px] mb-4">{m.icon}</div>
                  <div className="font-display font-extrabold text-[17px] tracking-tight mb-2" style={{ color: 'var(--text)' }}>{m.name}</div>
                  <div className="text-[13.5px] leading-[1.65]" style={{ color: 'var(--text2)' }}>{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-8 py-16 text-center border-t" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto">
            <h2 className="font-display font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(24px,3.5vw,40px)', color: 'var(--text)' }}>Start building your data room today</h2>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white"
                style={{ background: 'var(--green)' }}>Open Capital Readiness ↗</a>
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
