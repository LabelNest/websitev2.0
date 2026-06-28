import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — LabelNest',
  description: 'LabelNest is not a passion project. It is a calculated response to structural gaps in how data is built, priced, and delivered.',
}

const TIMELINE = [
  { month: 'Apr 2025', event: 'Planning begins', desc: 'While still at BlackRock (Preqin), Ankit begins planning LabelNest\'s product architecture and market approach.', color: '#2563EB' },
  { month: 'Nov 2025', event: 'Left BlackRock. LabelNest goes full-time.', desc: 'Ankit leaves his VP role at BlackRock (post Preqin acquisition) to build LabelNest full-time. The public build begins.', color: '#E91E8C' },
  { month: 'Dec 2025', event: 'NestHR live', desc: 'People and operations OS for startups and colleges. PlacementOS included from day one.', color: '#E91E8C' },
  { month: 'Jan 2026', event: 'AnnoNest launches', desc: 'First annotation platform goes live.', color: '#E91E8C' },
  { month: 'Feb 2026', event: 'AnnoNest pivots — internal split', desc: 'Multi-tenant AnnoNest paused and broken into purpose-built internal applications. The right call, not the easy one.', color: '#E91E8C' },
  { month: 'Mar 2026', event: 'First Nestling cohort + all internal apps live', desc: 'Fellowship program launches. NestLabs and NestTech Cohort 1. All internal infrastructure fully operational.', color: '#10B981' },
  { month: 'Apr 2026', event: 'NestLens live — Exchange with 10+ sellers', desc: 'Private markets intelligence platform live. Exchange marketplace open with verified sellers from day one.', color: '#E91E8C' },
  { month: 'May 2026', event: 'Capital Readiness initiated', desc: 'Data room, investor tier scoring, and LP-GP matching begin development inside NestLens.', color: '#E91E8C' },
  { month: 'Jun 2026', event: 'NestLens completely live', desc: 'All three modules — Intelligence, Exchange, Capital Readiness — fully live. Team at 13. 39 alumni. Website v2 deployed.', color: '#10B981' },
  { month: 'Jul 2026', event: 'NestResolve multi-tenancy planned', desc: 'QA and governance platform architecture scoped. Early access target: October 2026.', color: '#2563EB' },
  { month: 'Aug 2026', event: 'Something exciting coming', desc: 'Details soon.', color: '#7C3AED', link: { href: '/signal', label: 'Get early signal →' } },
  { month: 'Sep 2026', event: 'AnnoNest reborn with a new brand', desc: 'The annotation platform returns — rebuilt, rebranded, and ready for the market.', color: '#F97316' },
]

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>

        {/* HERO */}
        <section style={{ padding: '80px 48px 72px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
          <div className="absolute pointer-events-none" style={{ top: -120, left: -80, width: 520, height: 520, borderRadius: '50%', background: 'rgba(233,30,140,.07)', filter: 'blur(90px)' }} />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: 1200, margin: '0 auto', gap: 72, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 20 }}>About LabelNest</div>
              <h1 className="font-display font-extrabold" style={{ fontSize: 'clamp(40px,5.5vw,64px)', letterSpacing: '-.04em', lineHeight: 1.02, color: 'var(--text)', marginBottom: 20 }}>
                Not a passion project.<br />
                <span style={{ fontWeight: 300, color: 'var(--text2)' }}>A calculated response.</span>
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.74, color: 'var(--text2)', marginBottom: 32 }}>
                LabelNest is built by someone who spent years inside the best data companies in the world — and saw exactly what was missing. Not a gap. A decision.{' '}
                <strong style={{ color: 'var(--text)', fontWeight: 600 }}>We decided to fix it.</strong>
              </p>
              <div className="flex flex-wrap" style={{ gap: 12 }}>
                <Link href="/team"
                  className="inline-flex items-center gap-2 font-semibold text-white transition-all hover:-translate-y-0.5"
                  style={{ fontSize: 14.5, padding: '13px 26px', borderRadius: 11, background: 'var(--pink)' }}>
                  Meet the team
                </Link>
                <Link href="/about/ankit"
                  className="inline-flex items-center gap-2 font-medium transition-all hover:-translate-y-0.5"
                  style={{ fontSize: 14.5, padding: '13px 26px', borderRadius: 11, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--bord2)' }}>
                  Meet the founder →
                </Link>
                <Link href="/briefings"
                  className="inline-flex items-center gap-2 font-medium transition-all hover:-translate-y-0.5"
                  style={{ fontSize: 14.5, padding: '13px 26px', borderRadius: 11, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--bord2)' }}>
                  Read our writing
                </Link>
              </div>
            </div>
            <div className="flex flex-col" style={{ gap: 12 }}>
              {[
                { num: 'Nov 2025', label: 'When Ankit left BlackRock to build this full-time', color: '#E91E8C' },
                { num: '13', label: 'Current team members', color: '#2563EB' },
                { num: '39', label: 'Alumni — on the wall forever', color: '#10B981' },
                { num: '1,000+', label: 'Hours of domain knowledge absorbed before writing a single line of code', color: '#F97316' },
              ].map(s => (
                <div key={s.num} className="flex items-center" style={{ gap: 16, padding: '16px 20px', borderRadius: 14, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="font-display font-extrabold" style={{ fontSize: 22, letterSpacing: '-.03em', lineHeight: 1, width: 112, flexShrink: 0, color: s.color }}>{s.num}</div>
                  <div style={{ fontSize: 14, color: 'var(--text2)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE + PRINCIPLES */}
        <section className="border-b" style={{ padding: '80px 48px', background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: 1200, margin: '0 auto', gap: 72 }}>

            {/* Timeline */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>The build — month by month</div>
              <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(22px,3vw,34px)', letterSpacing: '-.025em', lineHeight: 1.1, color: 'var(--text)', marginBottom: 32 }}>
                Started Apr 2025.<br />Moving fast.
              </h2>
              <div className="flex flex-col">
                {TIMELINE.map((t, i) => (
                  <div key={t.month} className="flex" style={{ gap: 16, paddingBottom: i < TIMELINE.length - 1 ? 24 : 0, position: 'relative' }}>
                    {i < TIMELINE.length - 1 && (
                      <div className="absolute" style={{ left: 11, top: 22, bottom: 0, width: 1, background: 'var(--border)' }} />
                    )}
                    <div className="flex flex-col items-center flex-shrink-0" style={{ width: 22 }}>
                      <div className="flex items-center justify-center z-10" style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid var(--border)', background: 'var(--bg)', flexShrink: 0 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.color }} />
                      </div>
                    </div>
                    <div style={{ paddingTop: 1 }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 4 }}>{t.month}</div>
                      <div className="font-display font-bold" style={{ fontSize: 14.5, color: 'var(--text)', marginBottom: 4 }}>{t.event}</div>
                      <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text2)' }}>
                        {t.desc}
                        {t.link && <> <a href={t.link.href} style={{ color: '#7C3AED' }}>{t.link.label}</a></>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Principles + Hours */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Built differently, by design</div>
              <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(22px,3vw,34px)', letterSpacing: '-.025em', lineHeight: 1.1, color: 'var(--text)', marginBottom: 24 }}>
                The same five decisions.<br />Every product.
              </h2>
              <div className="flex flex-col" style={{ gap: 12 }}>
                {[
                  ['Bootstrapped by choice', 'No VC-mandated growth at the expense of quality. Sustainable, piece-by-piece.'],
                  ['INR-first pricing', 'No forex tax on Indian teams buying intelligence about Indian markets.'],
                  ['Human verification at the core', 'Automation handles volume. People handle the decisions that actually matter.'],
                  ['Internal tools become external products', 'DataNest, NestIntel, NestAgent — built for ourselves first, sold externally second.'],
                  ['Potential over pedigree', 'We do not hire by institution. We hire for what people can do with hard problems.'],
                ].map(([title, desc]) => (
                  <div key={title} className="flex items-start" style={{ gap: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 11, padding: '16px 18px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', marginTop: 3, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>{title}</div>
                      <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text2)' }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours box */}
              <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg,rgba(37,99,235,.08),rgba(124,58,237,.06))', border: '1px solid rgba(37,99,235,.15)', borderRadius: 16, padding: 28, marginTop: 24 }}>
                <div className="absolute top-0 left-0 right-0" style={{ height: 2, background: 'linear-gradient(90deg,#2563EB,#7C3AED)' }} />
                <div className="font-display font-extrabold" style={{ fontSize: 48, letterSpacing: '-.05em', color: '#2563EB', lineHeight: 1, marginBottom: 8 }}>1,000+</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Hours of domain knowledge — absorbed before building</div>
                <div style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text2)' }}>Before writing a single line of code, Ankit spent years inside Preqin, BlackRock, Microsoft, and CIOReview — watching how the world's best data organisations actually work. What was missing. What was broken. What was being charged for what could have been free. LabelNest is built on that understanding, not around it.</div>
              </div>
            </div>

          </div>
        </section>

        {/* TEAM PREVIEW */}
        <section className="text-center" style={{ padding: '80px 48px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>The people</div>
            <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(24px,3.5vw,40px)', letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 14, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
              Built by people with the right potential.<br />Not the right degree.
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.72, color: 'var(--text2)', maxWidth: 480, margin: '0 auto 36px' }}>
              13 current team members. 39 alumni. 15 Nestling fellows. None hired because of where they studied.
            </p>
            <div className="flex justify-center flex-wrap" style={{ gap: 12 }}>
              <Link href="/team"
                className="inline-flex items-center gap-2 font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ fontSize: 14.5, padding: '13px 26px', borderRadius: 11, background: 'var(--pink)' }}>
                Meet the team
              </Link>
              <Link href="/about/ankit"
                className="inline-flex items-center gap-2 font-medium transition-all hover:-translate-y-0.5"
                style={{ fontSize: 14.5, padding: '13px 26px', borderRadius: 11, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--bord2)' }}>
                Meet the founder →
              </Link>
              <Link href="/careers"
                className="inline-flex items-center gap-2 font-medium transition-all hover:-translate-y-0.5"
                style={{ fontSize: 14.5, padding: '13px 26px', borderRadius: 11, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--bord2)' }}>
                We are hiring
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
