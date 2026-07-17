import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JourneyMap from '@/components/JourneyMap'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/about', {
    title: "About LabelNest — Private Market Intelligence & Capital Infrastructure",
    description: 'LabelNest is a private market intelligence and capital infrastructure company for emerging managers globally. We operate NestLens — Intelligence, Capital Readiness, and Exchange — the data layer global players were never going to build for India.',
  })
}

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

        {/* WHAT WE DO — company explanation + vision + pillars */}
        <section className="border-b" style={{ padding: '80px 48px', background: 'var(--bg)', borderColor: 'var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>

            {/* About + Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 64, marginBottom: 64 }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>What we do</div>
                <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(22px,3vw,34px)', letterSpacing: '-.025em', lineHeight: 1.1, color: 'var(--text)', marginBottom: 20 }}>
                  Intelligence and capital<br />infrastructure for<br />emerging managers.
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text2)' }}>
                  LabelNest is a private market intelligence and capital infrastructure company built for emerging managers globally. We operate NestLens — a multi-product platform giving fund managers, founders, and institutional operators the data, tools, and infrastructure they need to raise capital, deploy it intelligently, and build with confidence. Founded in Bangalore in 2025, we are building the intelligence layer that global players were never going to build for India and the markets that look like India.
                </p>
              </div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Our vision</div>
                <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(22px,3vw,34px)', letterSpacing: '-.025em', lineHeight: 1.1, color: 'var(--text)', marginBottom: 20 }}>
                  The system of record<br />for private markets.
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text2)' }}>
                  Our vision is to become the system of record for private market intelligence and capital infrastructure for emerging managers globally. We believe every fund manager, founder, and operator — regardless of geography — deserves access to institutional-grade data at a price that does not exclude them. Data should be owned, structured, and explainable. Not rented forever from opaque global platforms that treat emerging markets as an afterthought.
                </p>
              </div>
            </div>

            {/* Five founding principles */}
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 20 }}>Five founding principles</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 16 }}>
              {[
                { title: 'Data That Teaches Machines Right', color: '#2563EB', desc: 'Every dataset we build is structured to be understood, not just consumed. We believe AI is only as trustworthy as the data behind it. We build data that can be explained to an auditor, a regulator, or an LP — not just a model.' },
                { title: 'Owned, Not Rented', color: '#E91E8C', desc: 'We build infrastructure that organisations can control. No black box vendors, no opaque pricing, no perpetual dependency on platforms that hold your data hostage. Data should belong to the people who generate it and the teams who use it.' },
                { title: 'Emerging First', color: '#10B981', desc: 'The markets that global platforms treat as afterthoughts are our primary focus. Emerging managers, emerging founders, emerging markets — not because they are second priority, but because they are the most underserved and the most overlooked opportunity in institutional intelligence.' },
                { title: 'Human Accountability at Every Layer', color: '#F97316', desc: 'Automation speeds up what humans have already figured out. Every workflow we run has a human review layer — not as a checkbox, but because accountability cannot be delegated to an algorithm. If something is wrong in our data, a person is responsible for fixing it.' },
                { title: 'Built to Last, Not to Flip', color: '#7C3AED', desc: 'We are not building for an exit. We are building for the long-term institutional trust that data companies require. The organisations that rely on our intelligence need to know we will be here in 10 years. That shapes every product decision, every partnership, and every line of code.' },
              ].map(p => (
                <div key={p.title} className="flex flex-col" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px 22px', position: 'relative', overflow: 'hidden' }}>
                  <div className="absolute top-0 left-0" style={{ width: 3, height: '100%', background: p.color }} />
                  <div className="font-display font-bold" style={{ fontSize: 16.5, letterSpacing: '-.02em', color: 'var(--text)', marginBottom: 8 }}>{p.title}</div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text2)' }}>{p.desc}</div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* THE JOURNEY — aerial road-map timeline */}
        <JourneyMap />

        {/* BEFORE WE BUILT — the hours story */}
        <section className="border-b" style={{ padding: '80px 48px', background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48, alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Before we built</div>
                <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(22px,3vw,34px)', letterSpacing: '-.025em', lineHeight: 1.1, color: 'var(--text)', marginBottom: 24 }}>
                  Built on understanding.<br />Not around it.
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.72, color: 'var(--text2)' }}>
                  Our five founding principles above are not a values page — they are the decisions that shaped every product, every partnership, and every line of code. They came from years spent inside the data organisations LabelNest was built to answer.
                </p>
              </div>

              {/* Hours box */}
              <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg,rgba(37,99,235,.08),rgba(124,58,237,.06))', border: '1px solid rgba(37,99,235,.15)', borderRadius: 16, padding: 28 }}>
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
