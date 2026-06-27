import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'LabelNest is not a passion project. It is a calculated response to structural gaps in how data is built, priced, and delivered.',
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>

        {/* HERO */}
        <section className="px-8 py-28 relative overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'rgba(233,30,140,0.07)', filter: 'blur(90px)', animation: 'breathe 9s ease-in-out infinite' }} />
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
                { num: '2022', label: 'Founded in Bangalore', color: 'var(--pink)' },
                { num: '13', label: 'Current team members', color: 'var(--blue)' },
                { num: '39', label: 'Alumni — on the wall forever', color: 'var(--green)' },
                { num: '1,000+', label: 'Years of collective analysis', color: 'var(--orange)' },
              ].map(s => (
                <div key={s.num} className="flex items-center gap-5 px-5 py-4 rounded-[13px]"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="font-display font-extrabold text-[28px] tracking-tight leading-none w-24 flex-shrink-0" style={{ color: s.color }}>{s.num}</div>
                  <div className="text-[14px]" style={{ color: 'var(--text2)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STORY */}
        <section className="px-8 py-20 border-t" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--pink)' }}>The diagnosis</div>
              <h2 className="font-display font-extrabold tracking-tight leading-[1.06] mb-5"
                style={{ fontSize: 'clamp(24px,3vw,38px)', color: 'var(--text)' }}>
                Ten years. Same problem. Different companies.
              </h2>
              <p className="text-[15px] leading-[1.78] mb-4" style={{ color: 'var(--text2)' }}>
                Ankit Suman spent a decade in data — operations, quality management, governance, and systems design. Across enough contexts to see that the structural gaps were not specific to any one organisation. They were endemic to how the industry had been built.
              </p>
              <p className="text-[15px] leading-[1.78] mb-4" style={{ color: 'var(--text2)' }}>
                <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Data built exclusively for institutions that could afford it.</strong> Emerging players left working with fragmented, expensive, often outdated information. Pricing models designed to extract, not enable. Data that could be structured better, served better, trusted more.
              </p>
              <p className="text-[15px] leading-[1.78]" style={{ color: 'var(--text2)' }}>
                LabelNest India Private Limited was incorporated in Bangalore in 2022. It was not the product of a weekend insight or an accelerator cohort. It was the product of ten years of watching the same broken systems persist.
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--blue)' }}>The response</div>
              <h2 className="font-display font-extrabold tracking-tight leading-[1.06] mb-5"
                style={{ fontSize: 'clamp(24px,3vw,38px)', color: 'var(--text)' }}>
                Built differently, by design.
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

        {/* TEAM PREVIEW */}
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
              <Link href="/careers"
                className="inline-flex items-center gap-2 font-medium text-[14.5px] px-6 py-3.5 rounded-[10px] border transition-all hover:-translate-y-0.5"
                style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'var(--bord2)' }}>
                We are hiring
              </Link>
            </div>
          </div>
        </section>

        <style>{`@keyframes breathe{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.18);opacity:1}}`}</style>
      </main>
      <Footer />
    </>
  )
}
