import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Ecosystem', description: 'LabelNest builds operating systems for data-intensive industries. NestLens, NestHR, NestResolve, Bundle OS, and more — each purpose-built, all connected.' }

export default function EcosystemPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>

        {/* HERO */}
        <section className="px-8 py-28 relative overflow-hidden text-center">
          <div className="absolute -top-28 -left-20 w-[520px] h-[520px] rounded-full pointer-events-none"
            style={{ background: 'rgba(233,30,140,0.07)', filter: 'blur(90px)' }} />
          <div className="max-w-[800px] mx-auto relative z-10">
            <div className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-5" style={{ color: 'var(--text3)' }}>LabelNest Ecosystem</div>
            <h1 className="font-display font-extrabold tracking-tight leading-[1.02] mb-6"
              style={{ fontSize: 'clamp(42px,6.5vw,78px)', color: 'var(--text)' }}>
              <span style={{ fontWeight: 300, color: 'var(--text2)' }}>One company.</span>
              <br />
              <span style={{ background: 'linear-gradient(100deg,#E91E8C,#8B5CF6,#2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Multiple operating systems.
              </span>
            </h1>
            <p className="text-[clamp(15px,1.8vw,18px)] leading-[1.72] max-w-[560px] mx-auto mb-10" style={{ color: 'var(--text2)' }}>
              Each product is purpose-built for a specific kind of data problem. All connected by the same belief:{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>expert human reasoning makes every system smarter.</strong>
            </p>
            {/* Status counts */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {[['var(--green)','3 products live'],['var(--orange)','1 early access Oct 2026'],['var(--blue)','1 coming Q1 2027'],['var(--text3)','1 being built']].map(([c,l]) => (
                <div key={l as string} className="flex items-center gap-2 text-[14px]" style={{ color: 'var(--text2)' }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c as string }} />{l}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE PRODUCTS */}
        <section className="px-8 py-16 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--green)' }}>Live now</div>
            <h2 className="font-display font-extrabold tracking-tight mb-10" style={{ fontSize: 'clamp(26px,3.5vw,44px)', color: 'var(--text)' }}>Products you can use today</h2>

            {/* NestLens flagship */}
            <div className="rounded-[20px] overflow-hidden mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_300px]">
                <div className="p-9 relative border-l-[4px]" style={{ borderLeftColor: '#2563EB' }}>
                  <div className="font-mono text-[9.5px] tracking-[.1em] uppercase px-2.5 py-1 rounded inline-block mb-4"
                    style={{ background: 'rgba(37,99,235,.1)', color: '#2563EB' }}>Flagship Product · Live</div>
                  <div className="text-[28px] mb-3">🔭</div>
                  <h3 className="font-display font-extrabold text-[26px] tracking-tight mb-2" style={{ color: 'var(--text)' }}>NestLens</h3>
                  <p className="text-[14px] leading-[1.7] max-w-[520px] mb-5" style={{ color: 'var(--text2)' }}>
                    The private markets OS. Three modules covering the full lifecycle — Intelligence for entity and signal tracking, Exchange for buying and selling any structured dataset, and Capital Readiness for data rooms, investor matching, and raise preparation. All live. Credit-based access. No per-seat penalties.
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    <Link href="/nestlens" className="font-mono text-[10px] tracking-[.1em] uppercase" style={{ color: '#2563EB' }}>Overview →</Link>
                    <Link href="/nestlens/intelligence" className="font-mono text-[10px] tracking-[.1em] uppercase" style={{ color: '#2563EB' }}>Intelligence →</Link>
                    <Link href="/nestlens/exchange" className="font-mono text-[10px] tracking-[.1em] uppercase" style={{ color: '#2563EB' }}>Exchange →</Link>
                    <Link href="/nestlens/capital" className="font-mono text-[10px] tracking-[.1em] uppercase" style={{ color: '#2563EB' }}>Capital Readiness →</Link>
                    <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[.1em] uppercase" style={{ color: '#2563EB' }}>Open platform ↗</a>
                  </div>
                </div>
                <div className="border-l px-8 py-9 flex flex-col gap-5 justify-center" style={{ borderColor: 'var(--border)', background: 'var(--bg3)' }}>
                  {[['40K+','Entities tracked','var(--blue)'],['12K+','Verified contacts','var(--green)'],['3','Modules — all live','var(--pink)']].map(([v,l,c]) => (
                    <div key={l as string}>
                      <div className="font-display font-extrabold text-[22px] tracking-tight" style={{ color: c as string }}>{v}</div>
                      <div className="text-[12px]" style={{ color: 'var(--text3)' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* NestHR + Managed Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: '/nesthr', color: '#7C3AED', badge: 'Live', icon: '👥', name: 'NestHR', tag: 'People and operations intelligence', desc: 'A clean HRMS for startups and colleges. People OS, Talent OS, Performance OS, Expense OS, Learning OS, Analytics, and PlacementOS that learns from every selection and rejection.', items: ['7 OS modules','Starting at ₹799 per employee per year','PlacementOS learns from selection signals'] },
                { href: '/services', color: '#10B981', badge: 'Live', icon: '⚙️', name: 'Managed Services', tag: 'Expert human data operations', desc: 'Five service areas across data sourcing, enrichment, annotation, quality, and custom workflow design. Seven years of internal operations experience.', items: ['Data sourcing and enrichment','AI training data annotation','PDF and document intelligence','Ongoing data operations'] },
              ].map(p => (
                <Link key={p.href} href={p.href}
                  className="rounded-[16px] p-7 relative overflow-hidden transition-all hover:-translate-y-1 block"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: p.color }} />
                  <div className="font-mono text-[9.5px] tracking-[.1em] uppercase px-2.5 py-1 rounded inline-block mb-4"
                    style={{ background: `${p.color}12`, color: p.color }}>{p.badge}</div>
                  <div className="text-[26px] mb-3">{p.icon}</div>
                  <div className="font-display font-extrabold text-[19px] tracking-tight mb-1" style={{ color: 'var(--text)' }}>{p.name}</div>
                  <div className="font-mono text-[10px] tracking-[.04em] mb-3" style={{ color: 'var(--text3)' }}>{p.tag}</div>
                  <p className="text-[13.5px] leading-[1.65] mb-4" style={{ color: 'var(--text2)' }}>{p.desc}</p>
                  <div className="flex flex-col gap-1.5">
                    {p.items.map(i => (
                      <div key={i} className="flex items-center gap-2 text-[12.5px]" style={{ color: 'var(--text2)' }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />{i}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 font-mono text-[10px] tracking-[.1em] uppercase" style={{ color: p.color }}>Learn more →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* COMING SOON */}
        <section className="px-8 py-16 border-t" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--orange)' }}>Coming soon</div>
            <h2 className="font-display font-extrabold tracking-tight mb-10" style={{ fontSize: 'clamp(26px,3.5vw,44px)', color: 'var(--text)' }}>What is being built next</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-[16px] p-7 relative overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid rgba(249,115,22,.15)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-40" style={{ background: 'var(--orange)' }} />
                <div className="font-mono text-[9.5px] tracking-[.1em] uppercase px-2.5 py-1 rounded inline-block mb-4"
                  style={{ background: 'rgba(249,115,22,.12)', color: 'var(--orange)' }}>Early Access · October 2026</div>
                <div className="text-[24px] mb-3">🔧</div>
                <div className="font-display font-extrabold text-[17px] tracking-tight mb-2" style={{ color: 'var(--text)' }}>NestResolve</div>
                <p className="text-[13px] leading-[1.62] mb-4" style={{ color: 'var(--text2)' }}>A governance and resolution platform for data operations teams who have outgrown generic issue trackers. A Jira alternative built for teams whose problems are data problems.</p>
                <div className="flex items-center gap-2 font-mono text-[9.5px] tracking-[.08em] uppercase" style={{ color: 'var(--orange)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--orange)', boxShadow: '0 0 6px var(--orange)' }} />Request early access
                </div>
              </div>
              <div className="rounded-[16px] p-7 relative overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid rgba(233,30,140,.1)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-40" style={{ background: 'var(--pink)' }} />
                <div className="font-mono text-[9.5px] tracking-[.1em] uppercase px-2.5 py-1 rounded inline-block mb-4"
                  style={{ background: 'rgba(233,30,140,.1)', color: 'var(--pink)' }}>Coming · Q1 2027</div>
                <div className="text-[24px] mb-3">📦</div>
                <div className="font-display font-extrabold text-[17px] tracking-tight mb-2" style={{ color: 'var(--text)' }}>Bundle OS</div>
                <p className="text-[13px] leading-[1.62]" style={{ color: 'var(--text2)' }}>A full bundle of applications for data-intensive annotation, review, and workflow management. Details to be announced Q1 2027.</p>
              </div>
              <Link href="/signal" className="rounded-[16px] p-7 relative overflow-hidden block transition-all hover:-translate-y-1"
                style={{ background: 'var(--surface)', border: '1px dashed var(--bord2)' }}>
                <div className="font-mono text-[9.5px] tracking-[.1em] uppercase px-2.5 py-1 rounded inline-block mb-4"
                  style={{ background: 'var(--bg3)', color: 'var(--text3)' }}>Being built</div>
                <div className="text-[24px] mb-3 opacity-30">🔒</div>
                <div className="font-display font-extrabold text-[17px] tracking-tight mb-2" style={{ color: 'var(--text2)' }}>Something for private markets</div>
                <p className="text-[13px] leading-[1.62] mb-4" style={{ color: 'var(--text3)' }}>We are building something that does not exist yet. No name. No branding. If you are in the room when capital decisions get made — you will want to know first.</p>
                <div className="font-mono text-[9.5px] tracking-[.1em] uppercase" style={{ color: 'var(--pink)' }}>Get early signal →</div>
              </Link>
            </div>
          </div>
        </section>

        {/* INTERNAL ENGINES */}
        <section className="px-8 py-16 border-t border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg3)' }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-center mb-10">
              <div>
                <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--text3)' }}>Internal infrastructure</div>
                <div className="font-display font-extrabold tracking-tight" style={{ fontSize: 'clamp(20px,2.8vw,30px)', color: 'var(--text)' }}>The engines that power what you see</div>
              </div>
              <div className="text-[14.5px] leading-[1.7]" style={{ color: 'var(--text2)' }}>
                DataNest, NestIntel, and NestAgent are internal systems — not products we sell directly. They are the infrastructure layer that makes NestLens, Managed Services, and every other external product work. Mentioned here because they are real.
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { color: '#2563EB', name: 'DataNest', desc: 'Full-stack data intelligence operating system. Central entity registry tracking companies, funds, deals, contacts, GPs, LPs, and service providers.', powers: 'Powers NestLens Intelligence · Exchange' },
                { color: '#F97316', name: 'NestIntel', desc: 'Unified intelligence engine handling AI research agents, forensic document extraction, and news intelligence. Three-provider LLM fallback chain.', powers: 'Powers DataNest · NestLens Signals' },
                { color: '#E91E8C', name: 'NestAgent', desc: 'Seven-phase autonomous research and enrichment agent. Source discovery, extraction, signal detection, contact creation, and a learning system that improves from every QA review.', powers: 'Powers DataNest enrichment · Contact intelligence' },
              ].map(e => (
                <div key={e.name} className="rounded-[13px] p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="w-2.5 h-2.5 rounded-full mb-3" style={{ background: e.color }} />
                  <div className="font-display font-bold text-[15px] mb-2" style={{ color: 'var(--text)' }}>{e.name}</div>
                  <div className="text-[13px] leading-[1.58] mb-3" style={{ color: 'var(--text2)' }}>{e.desc}</div>
                  <div className="font-mono text-[9.5px] tracking-[.07em] uppercase" style={{ color: 'var(--text3)' }}>{e.powers}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
