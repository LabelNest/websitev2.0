import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/ecosystem', {
    title: 'The LabelNest Ecosystem — NestLens, NestHR, Services, and More',
    description: 'One company. Multiple operating systems. NestLens for private markets. NestHR for people ops. Managed Services for data operations. Explore the full LabelNest product suite.',
  })
}

export default function EcosystemPage() {
  return (
    <>
      <style>{`
        .eco-card { transition: border-color .2s, transform .2s; }
        .eco-card:hover { transform: translateY(-4px); }
        .eco-nesthr:hover { border-color: #7C3AED !important; }
        .eco-services:hover { border-color: #10B981 !important; }
        .eco-signal:hover { border-color: rgba(124,58,237,.4) !important; }
      `}</style>
      <Nav />
      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid rgba(255,255,255,.06)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'rgba(233,30,140,.06)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>LabelNest Ecosystem</div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(42px,6.5vw,78px)', fontWeight: 800, letterSpacing: '-.045em', lineHeight: 1.02, color: 'var(--text)', marginBottom: 16 }}>
              <span style={{ fontWeight: 300, color: 'var(--text2)' }}>One company.</span><br />
              <span style={{ background: 'linear-gradient(100deg,#E91E8C,#8B5CF6,#2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Multiple operating systems.</span>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.72, color: 'var(--text2)', maxWidth: 560, margin: '0 auto 36px' }}>Each product is purpose-built for a specific kind of data problem. All connected by the same belief: expert human reasoning makes every system smarter.</p>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { dot: '#10B981', label: '3 products live' },
                { dot: '#F97316', label: '2 coming 2026' },
                { dot: '#4C4868', label: '1 being built' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: s.dot, display: 'inline-block', marginRight: 6 }} />
                  <span style={{ fontSize: 13.5, color: 'var(--text2)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE PRODUCTS */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Live now</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 32 }}>Products you can use today</h2>

            {/* NestLens flagship */}
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 20, overflow: 'hidden', marginBottom: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px' }}>
                <div style={{ padding: 36, borderLeft: '4px solid #2563EB' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(37,99,235,.1)', color: '#2563EB' }}>Flagship · Live</span>
                  </div>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>🔭</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 26, color: 'var(--text)', marginBottom: 8 }}>NestLens</div>
                  <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 520, marginBottom: 18 }}>The private markets OS. Three modules — Intelligence for entity and signal tracking, Exchange for buying and selling any structured dataset, and Capital Readiness for data rooms, investor matching, and raise preparation.</p>
                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    {[
                      { href: '/nestlens', label: 'Overview →' },
                      { href: '/nestlens/intelligence', label: 'Intelligence →' },
                      { href: '/nestlens/exchange', label: 'Exchange →' },
                      { href: '/nestlens/capital', label: 'Capital Readiness →' },
                    ].map(l => (
                      <Link key={l.href} href={l.href} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2563EB' }}>{l.label}</Link>
                    ))}
                  </div>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,.06)', background: 'var(--bg2)', padding: 32, display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
                  {[
                    { val: '40K+', label: 'Entities tracked' },
                    { val: '12K+', label: 'Verified contacts' },
                    { val: '3', label: 'Modules — all live' },
                  ].map(s => (
                    <div key={s.label}>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 24, color: '#2563EB' }}>{s.val}</div>
                      <div style={{ fontSize: 12, color: 'var(--text3)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* NestHR + Managed Services */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Link href="/nesthr" className="eco-card eco-nesthr" style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderTop: '3px solid #7C3AED', borderRadius: 16, padding: 28, display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(16,185,129,.1)', color: '#10B981' }}>Live</span>
                </div>
                <div style={{ fontSize: 26, marginBottom: 10 }}>👥</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 19, color: 'var(--text)', marginBottom: 6 }}>NestHR</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.06em', color: 'var(--text3)', marginBottom: 10 }}>People and operations OS</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 14 }}>7 OS modules for startups and colleges. People, Talent, PlacementOS, Performance, Expense, Learning, and Analytics — in one platform that learns from every signal.</p>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#7C3AED' }}>Explore NestHR →</div>
              </Link>
              <Link href="/services" className="eco-card eco-services" style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderTop: '3px solid #10B981', borderRadius: 16, padding: 28, display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(16,185,129,.1)', color: '#10B981' }}>Live</span>
                </div>
                <div style={{ fontSize: 26, marginBottom: 10 }}>⚙️</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 19, color: 'var(--text)', marginBottom: 6 }}>Managed Services</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.06em', color: 'var(--text3)', marginBottom: 10 }}>Expert human data operations</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 14 }}>Data sourcing, enrichment, annotation, quality, and custom workflow design. Seven years of internal ops experience. Human judgment at the edge cases where automation fails.</p>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#10B981' }}>Explore Services →</div>
              </Link>
            </div>
          </div>
        </section>

        {/* COMING SOON */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Coming soon</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 32 }}>What is being built next</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid rgba(249,115,22,.15)', borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#F97316', opacity: .5 }} />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(249,115,22,.1)', color: '#F97316', display: 'inline-block', marginBottom: 14 }}>Early access · Oct 2026</div>
                <div style={{ fontSize: 24, marginBottom: 10 }}>🔧</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 17, color: 'var(--text)', marginBottom: 8 }}>NestResolve</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>A QA and governance platform for data operations teams who have outgrown generic issue trackers. A Jira alternative built for teams whose problems are data problems.</p>
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid rgba(233,30,140,.1)', borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#E91E8C', opacity: .4 }} />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(233,30,140,.08)', color: '#E91E8C', display: 'inline-block', marginBottom: 14 }}>Sep 2026</div>
                <div style={{ fontSize: 24, marginBottom: 10 }}>📝</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 17, color: 'var(--text)', marginBottom: 8 }}>AnnoNest</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>The annotation platform — rebuilt and rebranded. Multi-tenant, purpose-built for structured annotation workflows at scale. Details announced September 2026.</p>
              </div>
              <Link href="/signal" className="eco-signal" style={{ background: 'var(--surface)', border: '1px dashed rgba(255,255,255,.1)', borderRadius: 16, padding: 28, display: 'block', transition: 'border-color .2s' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(255,255,255,.04)', color: 'var(--text3)', display: 'inline-block', marginBottom: 14 }}>Being built · Aug 2026</div>
                <div style={{ fontSize: 24, marginBottom: 10, opacity: .3 }}>🔒</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 17, color: 'var(--text2)', marginBottom: 8 }}>Something for private markets</div>
                <p style={{ fontSize: 13.5, color: 'var(--text3)', lineHeight: 1.65, marginBottom: 12 }}>No name. No branding. Not yet. If you are in the room when capital decisions get made, you will want to know about this first.</p>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#7C3AED' }}>Get early signal →</div>
              </Link>
            </div>
          </div>
        </section>

        {/* INTERNAL ENGINES */}
        <section style={{ padding: '64px 48px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'center', marginBottom: 32 }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Internal infrastructure</div>
                <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)' }}>The engines that power what you see</h2>
              </div>
              <p style={{ fontSize: 14.5, color: 'var(--text2)', lineHeight: 1.7 }}>DataNest, NestIntel, and NestAgent are internal systems — not products we sell directly. They are the infrastructure that makes NestLens, Managed Services, and every external product work. Mentioned here because they are real.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {[
                { dot: '#2563EB', name: 'DataNest', desc: 'Full-stack data intelligence OS. Central entity registry tracking companies, funds, deals, contacts, GPs, LPs, and service providers.', powers: 'Powers NestLens Intelligence' },
                { dot: '#F97316', name: 'NestIntel', desc: 'Unified intelligence engine. AI research agents, forensic document extraction, news intelligence. Three-provider LLM fallback chain.', powers: 'Powers DataNest · NestLens Signals' },
                { dot: '#E91E8C', name: 'NestAgent', desc: 'Seven-phase autonomous research and enrichment agent. Source discovery, extraction, signal detection, contact creation, and a learning system that improves from every QA review.', powers: 'Powers DataNest enrichment' },
              ].map(e => (
                <div key={e.name} style={{ background: 'var(--bg2)', border: '1px solid rgba(255,255,255,.06)', borderLeft: `3px solid ${e.dot}`, borderRadius: 13, padding: 20 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: e.dot, marginBottom: 10 }} />
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 5 }}>{e.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 8 }}>{e.desc}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--text3)' }}>{e.powers}</div>
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
