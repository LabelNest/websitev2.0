import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Ankit Suman — Founder, LabelNest', description: 'Ankit Suman founded LabelNest after a decade in data, operations, quality, and governance. Engineer by education, practitioner by necessity.' }

const BRIEFINGS = [
  { href: '/briefings/introducing-nestlens-intelligence-venture-platforms', emoji: '📊', scope: 'Private Market Intelligence', title: 'Introducing NestLens Intelligence: Mapping the Architecture of Venture Platforms', read: '8 min · May 2026' },
  { href: '/briefings/1-4-billion-blessings-nestlens-exchange', emoji: '🌏', scope: 'Manifesto', title: '1.4 Billion Blessings: Why NestLens is Rebuilding India\'s AI Supply Chain', read: '4 min · Apr 2026' },
  { href: '/briefings/inr-first-data-ecosystem', emoji: '🇮🇳', scope: 'Sovereignty', title: 'Sovereignty and Scale: Why LabelNest is Building an INR-First Data Ecosystem', read: '6 min · Feb 2026' },
  { href: '/briefings/built-to-last-bootstrapping', emoji: '🏗️', scope: 'Foundry', title: 'Built to Last: Why Bootstrapping LabelNest is a Choice for Logical Precision', read: '6 min · Feb 2026' },
  { href: '/briefings/forensic-refinery-extraction', emoji: '🔬', scope: 'Intelligence', title: 'Forensic Refinery: Institutional Extraction for Everyone, Powered by Credits', read: '5 min · Feb 2026' },
  { href: '/briefings/death-of-black-box-vendor-india-ai', emoji: '🔓', scope: 'Manifesto', title: 'The Death of the "Black Box" Vendor: Why Global Data Giants are Failing Indian AI', read: '2 min · Apr 2026' },
]

const TIMELINE = [
  { year: '2012–2022', event: 'Ten years in data', desc: 'Operations, quality management, governance, and systems design across private market research and data-intensive organisations. The decade that produced the diagnosis.' },
  { year: '2022', event: 'LabelNest founded', desc: 'LabelNest India Private Limited incorporated in Bangalore. Built DataNest internally first — LabelNest was the first customer of its own platform.' },
  { year: '2023–2024', event: 'NestLens and NestHR launched', desc: 'First external products live. Intelligence and Exchange modules of NestLens. NestHR with PlacementOS for startups and colleges.' },
  { year: '2025–2026', event: 'Capital Readiness, Exchange, and team growth', desc: 'NestLens Capital Readiness module launched live. Exchange marketplace open. Team grows to 13. Nestling fellows program starts with Cohort 1.' },
  { year: 'Oct 2026', event: 'NestResolve early access', desc: 'QA and governance platform for data operations teams. Early access opens October 2026.', orange: true },
]

export default function FounderPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>

        {/* HERO */}
        <section className="px-8 pt-16 pb-0 relative overflow-hidden">
          <div className="absolute -top-20 -left-16 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'rgba(233,30,140,0.07)', filter: 'blur(90px)' }} />
          <div className="max-w-[1240px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-[360px_1fr] gap-16 items-end">

            {/* Portrait card */}
            <div className="rounded-[20px] overflow-hidden md:sticky md:top-20 self-start"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="relative" style={{ height: 380, background: 'linear-gradient(135deg,rgba(233,30,140,.15),rgba(124,58,237,.1))' }}>
                <Image
                  src="https://hdwfndjlgkjcjwxxciwn.supabase.co/storage/v1/object/public/site-assets/team/1775127976877.png"
                  alt="Ankit Suman" fill className="object-cover object-center"
                  sizes="360px"
                  onError={() => {}} />
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 font-mono text-[9px] tracking-[.1em] uppercase text-center"
                  style={{ background: 'rgba(0,0,0,.4)', backdropFilter: 'blur(4px)', color: 'rgba(255,255,255,.5)' }}>
                  Photo · update via admin
                </div>
              </div>
              <div className="p-6">
                <div className="font-display font-extrabold text-[22px] tracking-tight mb-1" style={{ color: 'var(--text)' }}>Ankit Suman</div>
                <div className="text-[13.5px] mb-4" style={{ color: 'var(--text2)' }}>Founder and Director · LabelNest India Pvt. Ltd.</div>
                <div className="flex gap-2 flex-wrap mb-5">
                  {['System Architecture','Intelligence Strategy','Data Ops','Governance'].map(t => (
                    <span key={t} className="font-mono text-[9.5px] tracking-[.08em] uppercase px-2 py-1 rounded"
                      style={{ background: 'var(--bg3)', color: 'var(--text3)' }}>{t}</span>
                  ))}
                </div>
                <div className="flex flex-col gap-2.5">
                  <a href="https://www.linkedin.com/in/ankit-kumar-suman-29159b146/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[9px] text-[13px] font-medium transition-all"
                    style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                  <Link href="/briefings" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[9px] text-[13px] font-medium transition-all"
                    style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                    7 briefings published
                  </Link>
                  <a href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7472967819387686913"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[9px] text-[13px] font-medium transition-all"
                    style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--orange)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Operator to Founder ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pb-16">
              <div className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-5" style={{ color: 'var(--text3)' }}>Founder · LabelNest India Pvt. Ltd.</div>
              <h1 className="font-display font-extrabold tracking-tight leading-[1.03] mb-5"
                style={{ fontSize: 'clamp(36px,5vw,62px)', color: 'var(--text)' }}>
                <span style={{ fontWeight: 300, color: 'var(--text2)' }}>Engineer by education.</span>
                <br />
                <span style={{ background: 'linear-gradient(100deg,#E91E8C,#8B5CF6,#2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Data practitioner</span>
                <br />
                <span style={{ fontWeight: 300, color: 'var(--text2)' }}>by necessity.</span>
              </h1>
              <p className="text-[clamp(16px,2vw,20px)] leading-[1.72] mb-8" style={{ color: 'var(--text2)' }}>
                Ankit Suman founded LabelNest after ten years working inside data — in operations, quality, management, and governance. The same structural gaps kept appearing.{' '}
                <strong style={{ color: 'var(--text)', fontWeight: 600 }}>LabelNest is the calculated response.</strong>
              </p>

              {/* Stats */}
              <div className="flex gap-3 flex-wrap mb-10">
                {[['10','Years in data before building this','var(--pink)'],['2022','LabelNest founded','var(--blue)'],['7','Briefings published','var(--green)'],['1,000+','Collective years of analysis','var(--orange)']].map(([n,l,c]) => (
                  <div key={l as string} className="rounded-[11px] px-4 py-3 flex flex-col gap-0.5"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="font-display font-extrabold text-[22px] tracking-tight leading-none" style={{ color: c as string }}>{n}</div>
                    <div className="text-[11px]" style={{ color: 'var(--text3)' }}>{l}</div>
                  </div>
                ))}
              </div>

              {/* Bio */}
              <div className="mb-8">
                <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--pink)' }}>Background</div>
                <h2 className="font-display font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(20px,2.5vw,28px)', color: 'var(--text)' }}>Ten years. Same problems. Different companies.</h2>
                <p className="text-[15px] leading-[1.78] mb-4" style={{ color: 'var(--text2)' }}>
                  Ankit's background before LabelNest was entirely inside data — across operations, quality management, governance, and systems design. Not in one company or one market. Across enough contexts to see that the structural gaps were not specific to any one organisation. They were endemic to how the industry had been built.
                </p>
                <div className="border-l-[3px] px-5 py-4 rounded-r-[12px] italic text-[15.5px] leading-[1.68]"
                  style={{ borderColor: 'var(--pink)', background: 'var(--surface)', color: 'var(--text)' }}>
                  "I spent ten years watching the same problems persist before I decided the right response was to build. Not to complain about the gaps, not to work around them — to build the infrastructure that should have existed."
                  <cite className="not-italic block mt-3 font-mono text-[9.5px] tracking-[.1em] uppercase" style={{ color: 'var(--text3)' }}>Ankit Suman · Founder</cite>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--blue)' }}>Timeline</div>
                <div className="flex flex-col gap-0">
                  {TIMELINE.map((t, i) => (
                    <div key={t.year} className="flex gap-4 pb-6 relative">
                      {i < TIMELINE.length - 1 && (
                        <div className="absolute left-[11px] top-6 bottom-0 w-px" style={{ background: 'var(--border)' }} />
                      )}
                      <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center z-10 mt-0.5"
                        style={{ background: 'var(--surface)', border: '2px solid var(--border)' }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: t.orange ? 'var(--orange)' : 'var(--pink)' }} />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] tracking-[.1em] uppercase mb-1" style={{ color: 'var(--text3)' }}>{t.year}</div>
                        <div className="font-display font-bold text-[14.5px] mb-1" style={{ color: 'var(--text)' }}>{t.event}</div>
                        <div className="text-[13px] leading-[1.58]" style={{ color: 'var(--text2)' }}>{t.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media slots */}
              <div className="mb-8">
                <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--text3)' }}>Videos, podcasts, and interviews</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[['▶️','Video interview'],['🎙️','Podcast episode'],['💼','LinkedIn post or talk']].map(([icon,label]) => (
                    <div key={label as string} className="rounded-[14px] overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <div className="flex items-center justify-center flex-col gap-2 py-8" style={{ background: 'var(--bg3)', aspectRatio: '16/9' }}>
                        <span className="text-[32px] opacity-25">{icon}</span>
                        <span className="font-mono text-[9px] tracking-[.12em] uppercase" style={{ color: 'var(--text3)' }}>Upload via admin</span>
                      </div>
                      <div className="p-4">
                        <div className="font-mono text-[9.5px] tracking-[.1em] uppercase mb-1" style={{ color: 'var(--text3)' }}>{label}</div>
                        <div className="text-[11.5px] italic" style={{ color: 'var(--text3)' }}>Add URL and thumbnail via admin panel</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Writing */}
              <div className="mb-8">
                <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--orange)' }}>Briefings by Ankit</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BRIEFINGS.map(b => (
                    <Link key={b.href} href={b.href}
                      className="flex gap-3 items-start p-4 rounded-[13px] transition-all hover:translate-x-1"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                      onMouseEnter={(e: any) => (e.currentTarget.style.borderColor = 'var(--pink)')}
                      onMouseLeave={(e: any) => (e.currentTarget.style.borderColor = 'var(--border)')}>
                      <span className="text-[22px] flex-shrink-0 mt-0.5">{b.emoji}</span>
                      <div>
                        <div className="font-mono text-[9.5px] tracking-[.1em] uppercase mb-1" style={{ color: 'var(--text3)' }}>{b.scope}</div>
                        <div className="font-display font-bold text-[14px] leading-[1.3] mb-1" style={{ color: 'var(--text)' }}>{b.title}</div>
                        <div className="font-mono text-[10px]" style={{ color: 'var(--text3)' }}>{b.read}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="rounded-[18px] p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
                style={{ background: 'linear-gradient(135deg,rgba(233,30,140,.08),rgba(124,58,237,.05))', border: '1px solid rgba(233,30,140,.15)' }}>
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#F97316,#E91E8C)' }} />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-display font-extrabold text-[20px] text-white"
                    style={{ background: 'linear-gradient(135deg,#F97316,#E91E8C)' }}>A</div>
                  <div>
                    <div className="font-mono text-[9.5px] tracking-[.12em] uppercase mb-1" style={{ color: 'var(--orange)' }}>Founder's Newsletter</div>
                    <div className="font-display font-extrabold text-[18px] tracking-tight mb-1" style={{ color: 'var(--text)' }}>Operator to Founder</div>
                    <div className="text-[13.5px]" style={{ color: 'var(--text2)' }}>Building LabelNest from zero. Sharing the journey as it happens.</div>
                  </div>
                </div>
                <a href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7472967819387686913"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-[14px] px-6 py-3 rounded-[10px] text-white flex-shrink-0"
                  style={{ background: 'var(--orange)' }}>
                  Follow on LinkedIn ↗
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
