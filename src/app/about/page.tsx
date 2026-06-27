import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'LabelNest is not a passion project. It is a calculated response to structural gaps in how data is built, priced, and delivered.',
}

const TIMELINE = [
  { month: 'Nov 2025', event: 'LabelNest public build begins', desc: 'Decision made to build the full product ecosystem publicly. DataNest and NestIntel already operational internally.' },
  { month: 'Dec 2025', event: 'NestLens Intelligence live', desc: 'First external module live. 40K+ entities, contact intelligence, live market signals.' },
  { month: 'Jan 2026', event: 'NestLens Exchange opens', desc: 'Universal data marketplace live. KYC verified sellers, escrow-protected transactions, QC scored datasets.' },
  { month: 'Feb 2026', event: 'First briefings published', desc: 'Writing goes public. INR-first manifesto, bootstrapping philosophy, NestHR launch piece.' },
  { month: 'Mar 2026', event: 'NestHR and PlacementOS live', desc: 'HRMS for startups and colleges. 7 OS modules including PlacementOS that learns from every selection.' },
  { month: 'Apr 2026', event: 'Capital Readiness live', desc: '10-section data room, 51-item checklist, investor tier scoring, LP-GP and SP matching — all live.' },
  { month: 'May 2026', event: 'Nestling fellows program — Cohort 1', desc: 'NestLabs and NestTech cohorts start. 15 fellows across research and engineering.' },
  { month: 'Jun 2026', event: 'Team at 13. 39 alumni.', desc: 'Website v2 deployed. Admin panel live. NestResolve scoped for October.' },
  { month: 'Oct 2026', event: 'NestResolve early access', desc: 'QA and governance platform for data operations teams.', highlight: true },
]

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>

        {/* HERO */}
        <section className="px-8 py-28 relative overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'rgba(233,30,140,0.07)', filter: 'blur(90px)' }} />
          <div className="max-w-[1240px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-5" style={{ color: 'var(--text3)' }}>About LabelNest</div>
              <h1 className="font-display font-extrabold tracking-tight leading-[1.02] mb-6"
                style={{ fontSize: 'clamp(38px,5.5vw,64px)', color: 'var(--text)' }}>
                Not a passion project.
                <br />
                <span style={{ fontWeight: 300, color: 'var(--text2)' }}>A calculated response.</span>
              </h1>
              <p className="text-[17px] leading-[1.74] mb-8" style={{ color: 'var(--text2)' }}>
                LabelNest was founded in 2022 after ten years of watching the same structural gaps persist across data operations. The tools existed for institutions that could afford them. Everyone else worked around the problem.{' '}
                <strong style={{ color: 'var(--text)', fontWeight: 600 }}>We decided to fix the problem.</strong>
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/team"
                  className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white transition-all hover:-translate-y-0.5"
                  style={{ background: 'var(--pink)' }}>
                  Meet the team
                </Link>
                <Link href="/briefings"
                  className="inline-flex items-center gap-2 font-medium text-[14.5px] px-6 py-3.5 rounded-[10px] border transition-all hover:-translate-y-0.5"
                  style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'var(--bord2)' }}>
                  Read our writing
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { num: 'Nov 2025', label: 'When the public build started', color: 'var(--pink)' },
                { num: '13', label: 'Current team members', color: 'var(--blue)' },
                { num: '39', label: 'Alumni — on the wall forever', color: 'var(--green)' },
                { num: '1,000+', label: 'Years of collective analysis', color: 'var(--orange)' },
              ].map(s => (
                <div key={s.num} className="flex items-center gap-5 px-5 py-4 rounded-[13px]"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="font-display font-extrabold text-[22px] tracking-tight leading-none w-28 flex-shrink-0" style={{ color: s.color }}>{s.num}</div>
                  <div className="text-[14px]" style={{ color: 'var(--text2)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STORY + TIMELINE */}
        <section className="px-8 py-20 border-t" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Left — timeline */}
            <div>
              <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--pink)' }}>The build — month by month</div>
              <h2 className="font-display font-extrabold tracking-tight leading-[1.06] mb-8"
                style={{ fontSize: 'clamp(24px,3vw,38px)', color: 'var(--text)' }}>
                Started Nov 2025.<br />Moving fast.
              </h2>
              <div className="flex flex-col gap-0">
                {TIMELINE.map((t, i) => (
                  <div key={t.month} className="flex gap-4 pb-5 relative">
                    {i < TIMELINE.length - 1 && (
                      <div className="absolute left-[11px] top-6 bottom-0 w-px" style={{ background: 'var(--border)' }} />
                    )}
                    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center z-10 mt-0.5"
                      style={{ background: 'var(--surface)', border: `2px solid ${t.highlight ? 'var(--orange)' : 'var(--border)'}` }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: t.highlight ? 'var(--orange)' : 'var(--pink)' }} />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[.1em] uppercase mb-0.5" style={{ color: 'var(--text3)' }}>{t.month}</div>
                      <div className="font-display font-bold text-[14px] mb-1" style={{ color: 'var(--text)' }}>{t.event}</div>
                      <div className="text-[13px] leading-[1.58]" style={{ color: 'var(--text2)' }}>{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — principles */}
            <div>
              <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--blue)' }}>Built differently, by design</div>
              <h2 className="font-display font-extrabold tracking-tight leading-[1.06] mb-5"
                style={{ fontSize: 'clamp(24px,3vw,38px)', color: 'var(--text)' }}>
                The same five decisions. Every product.
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  ['Bootstrapped by choice', 'No VC-mandated growth at the expense of quality. Sustainable, piece-by-piece.'],
                  ['INR-first pricing', 'No forex tax on Indian teams buying intelligence about Indian markets.'],
                  ['Human verification at the core', 'Automation handles volume. People handle the decisions that actually matter.'],
                  ['Internal tools become external products', 'DataNest, NestIntel, NestAgent — we built them for ourselves first.'],
                  ['Potential over pedigree', 'We do not hire by institution. We hire for what people can do with hard problems.'],
                ].map(([t, d]) => (
                  <div key={t} className="flex items-start gap-3 p-4 rounded-[10px]"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--blue)' }} />
                    <div>
                      <div className="font-semibold text-[14px] mb-1" style={{ color: 'var(--text)' }}>{t}</div>
                      <div className="text-[13px] leading-[1.58]" style={{ color: 'var(--text2)' }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* FOUNDER + TEAM */}
        <section className="px-8 py-20">
          <div className="max-w-[1240px] mx-auto text-center">
            <div className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--text3)' }}>The people</div>
            <h2 className="font-display font-extrabold tracking-tight leading-[1.06] mb-4 max-w-[560px] mx-auto"
              style={{ fontSize: 'clamp(26px,3.5vw,44px)', color: 'var(--text)' }}>
              Built by people with the right potential. Not the right degree.
            </h2>
            <p className="text-[15.5px] leading-[1.74] max-w-[480px] mx-auto mb-10" style={{ color: 'var(--text2)' }}>
              13 current team members. 39 alumni. 15 Nestling fellows. None of them were hired because of where they studied.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/team"
                className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--blue)' }}>
                Meet the team
              </Link>
              <Link href="/about/ankit"
                className="inline-flex items-center gap-2 font-medium text-[14.5px] px-6 py-3.5 rounded-[10px] border transition-all hover:-translate-y-0.5"
                style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'var(--bord2)' }}>
                Meet the founder →
              </Link>
              <Link href="/careers"
                className="inline-flex items-center gap-2 font-medium text-[14.5px] px-6 py-3.5 rounded-[10px] border transition-all hover:-translate-y-0.5"
                style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'var(--bord2)' }}>
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
