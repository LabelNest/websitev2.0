'use client'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

const BRIEFINGS = [
  { href: '/briefings/introducing-nestlens-intelligence-venture-platforms', emoji: '📊', scope: 'Private Market Intelligence', title: 'Introducing NestLens Intelligence: Mapping the Architecture of Venture Platforms', read: '8 min · May 2026' },
  { href: '/briefings/1-4-billion-blessings-nestlens-exchange', emoji: '🌏', scope: 'Manifesto', title: '1.4 Billion Blessings: Why NestLens is Rebuilding India\'s AI Supply Chain', read: '4 min · Apr 2026' },
  { href: '/briefings/inr-first-data-ecosystem', emoji: '🇮🇳', scope: 'Sovereignty', title: 'Sovereignty and Scale: Why LabelNest is Building an INR-First Data Ecosystem', read: '6 min · Feb 2026' },
  { href: '/briefings/built-to-last-bootstrapping', emoji: '🏗️', scope: 'Foundry', title: 'Built to Last: Why Bootstrapping LabelNest is a Choice for Logical Precision', read: '6 min · Feb 2026' },
  { href: '/briefings/forensic-refinery-extraction', emoji: '🔬', scope: 'Intelligence', title: 'Forensic Refinery: Institutional Extraction for Everyone, Powered by Credits', read: '5 min · Feb 2026' },
  { href: '/briefings/death-of-black-box-vendor-india-ai', emoji: '🔓', scope: 'Manifesto', title: 'The Death of the "Black Box" Vendor: Why Global Data Giants are Failing Indian AI', read: '2 min · Apr 2026' },
]

const CAREER = [
  {
    period: 'Nov 2025 — Present',
    title: 'Founder and Director',
    company: 'LabelNest India Private Limited · Bengaluru',
    desc: 'Building the full LabelNest product ecosystem — NestLens, NestHR, Managed Services, and the internal infrastructure that powers all of them.',
    color: '#E91E8C',
  },
  {
    period: 'Mar 2025 — Nov 2025 · 9 months',
    title: 'Vice President',
    company: 'BlackRock · Bengaluru, Hybrid',
    desc: "Following BlackRock's acquisition of Preqin, transitioned into a VP role. Led data quality and controls at institutional scale.",
    color: '#2563EB',
  },
  {
    period: 'Jan 2022 — Mar 2025 · 3 years 2 months',
    title: 'AVP, Lead, and Manager — Data Quality and Controls',
    company: 'Preqin · Bengaluru, Hybrid',
    desc: 'Three progressive roles across data management, data controls, and AVP-level quality governance. Led teams of 14–20 across critical data operations programs.',
    color: '#2563EB',
  },
  {
    period: 'Nov 2020 — Mar 2022 · 1 year 5 months',
    title: 'Senior Data Operations',
    company: 'Remote',
    desc: 'Senior data operations role. Remote. Led structured data programs across clients.',
    color: '#10B981',
  },
  {
    period: 'Oct 2018 — Jul 2020 · 1 year 10 months',
    title: 'Analyst',
    company: 'Microsoft · Bengaluru, India',
    desc: 'Worked with the Bing BI team on data cleaning and increasing the relevancy of Bing ads.',
    color: '#10B981',
  },
  {
    period: 'Aug 2016 — Oct 2018 · 2 years 3 months',
    title: 'Market Research Executive / Team Lead',
    company: 'CIOReview · Bengaluru, On-site',
    desc: 'Technology magazine focused on the US market. First professional role in data and research operations.',
    color: '#F97316',
    last: true,
  },
]

export default function FounderPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 48px 0', display: 'grid', gridTemplateColumns: '340px 1fr', gap: 64, alignItems: 'start' }}>

          {/* PORTRAIT CARD */}
          <div className="md:sticky" style={{ top: 88, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>
            <div className="relative" style={{ aspectRatio: '3/4', background: 'linear-gradient(135deg,rgba(233,30,140,.12),rgba(37,99,235,.08))' }}>
              <Image
                src="https://hdwfndjlgkjcjwxxciwn.supabase.co/storage/v1/object/public/site-assets/team/1775127976877.png"
                alt="Ankit Suman"
                fill
                className="object-cover object-center"
                sizes="340px"
              />
            </div>
            <div style={{ padding: 24 }}>
              <div className="font-display font-extrabold" style={{ fontSize: 22, letterSpacing: '-.02em', color: 'var(--text)', marginBottom: 4 }}>Ankit Suman</div>
              <div style={{ fontSize: 13.5, color: 'var(--text2)', marginBottom: 18 }}>Founder and Director · LabelNest India Pvt. Ltd.</div>
              <div className="flex flex-wrap" style={{ gap: 6, marginBottom: 20 }}>
                {['Data Systems', 'Intelligence', 'Governance', 'Ops'].map(t => (
                  <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 5, background: 'var(--bg3)', border: '1px solid var(--bord2)', color: 'var(--text3)' }}>{t}</span>
                ))}
              </div>
              <div className="flex flex-col" style={{ gap: 8 }}>
                <a href="https://www.linkedin.com/in/ankit-kumar-suman-29159b146/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center transition-all"
                  style={{ gap: 10, padding: '10px 14px', background: 'var(--bg3)', border: '1px solid var(--bord2)', borderRadius: 9, fontSize: 13, color: '#2563EB' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--bord2)')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  <span style={{ fontWeight: 500 }}>LinkedIn</span>
                  <span style={{ fontSize: 11, color: 'var(--text3)', marginLeft: 'auto' }}>↗</span>
                </a>
                <Link href="/briefings"
                  className="flex items-center transition-all"
                  style={{ gap: 10, padding: '10px 14px', background: 'var(--bg3)', border: '1px solid var(--bord2)', borderRadius: 9, fontSize: 13, color: 'var(--text)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--bord2)')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>
                  <span style={{ fontWeight: 500 }}>7 briefings published</span>
                </Link>
                <a href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7472967819387686913"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center transition-all"
                  style={{ gap: 10, padding: '10px 14px', background: 'var(--bg3)', border: '1px solid var(--bord2)', borderRadius: 9, fontSize: 13, color: '#F97316' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--bord2)')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  <span style={{ fontWeight: 500 }}>Operator to Founder</span>
                  <span style={{ fontSize: 11, color: 'var(--text3)', marginLeft: 'auto' }}>↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div style={{ paddingBottom: 80 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Founder · LabelNest India Pvt. Ltd.</div>
            <h1 className="font-display font-extrabold" style={{ fontSize: 'clamp(36px,5vw,58px)', letterSpacing: '-.04em', lineHeight: 1.04, color: 'var(--text)', marginBottom: 20 }}>
              <span style={{ fontWeight: 300, color: 'var(--text2)' }}>Engineer by education.</span><br />
              Data practitioner<br />
              <span style={{ fontWeight: 300, color: 'var(--text2)' }}>by necessity.</span>
            </h1>
            <p style={{ fontSize: 'clamp(16px,2vw,19px)', lineHeight: 1.72, color: 'var(--text2)', marginBottom: 36 }}>
              Ankit Suman founded LabelNest after a decade in data — across operations, quality, management, and governance at CIOReview, Microsoft, Preqin, and BlackRock.{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>The same structural gaps kept appearing. LabelNest is the calculated response.</strong>
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 10, marginBottom: 48 }}>
              {[
                { num: '9 yrs', label: 'In data before building this', color: '#E91E8C' },
                { num: 'Nov 2025', label: 'Left BlackRock to build full-time', color: '#2563EB' },
                { num: '7', label: 'Briefings published', color: '#10B981' },
                { num: '1,000+', label: 'Hours of absorbed domain knowledge', color: '#F97316' },
              ].map(s => (
                <div key={s.num} className="text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}>
                  <div className="font-display font-extrabold" style={{ fontSize: 24, letterSpacing: '-.04em', lineHeight: 1, marginBottom: 5, color: s.color }}>{s.num}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text2)', lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* QUOTE */}
            <div style={{ background: 'linear-gradient(135deg,rgba(233,30,140,.06),rgba(124,58,237,.04))', border: '1px solid rgba(233,30,140,.12)', borderLeft: '3px solid #E91E8C', borderRadius: '0 12px 12px 0', padding: '20px 24px', marginBottom: 48 }}>
              <div style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text)', fontStyle: 'italic', marginBottom: 10 }}>
                "I spent years watching the same problems persist before I decided the right response was to build. Not to complain about the gaps, not to work around them — to build the infrastructure that should have existed."
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)' }}>
                Ankit Suman · Founder, LabelNest
              </div>
            </div>

            {/* BEFORE THE FIRST LINE */}
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Before the first line of code</div>
              <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg,rgba(37,99,235,.08),rgba(124,58,237,.06))', border: '1px solid rgba(37,99,235,.15)', borderRadius: 16, padding: 28 }}>
                <div className="absolute top-0 left-0 right-0" style={{ height: 2, background: 'linear-gradient(90deg,#2563EB,#7C3AED)' }} />
                <div className="font-display font-extrabold" style={{ fontSize: 56, letterSpacing: '-.06em', color: '#2563EB', lineHeight: 1, marginBottom: 10 }}>1,000+</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Hours of domain knowledge — absorbed by watching the best in the world do it.</div>
                <div style={{ fontSize: 14, lineHeight: 1.72, color: 'var(--text2)', marginBottom: 16 }}>
                  Before LabelNest existed, Ankit spent years inside organisations that had solved the data problem at institutional scale. Watching what worked. What didn't. What was being charged for that should have been free. What was missing that nobody had thought to build. The 1,000+ hours is not a marketing number — it's the compounded observation time that produced the diagnosis LabelNest is built on.
                </div>
                <div className="flex flex-wrap" style={{ gap: 8 }}>
                  {['CIOReview', 'Microsoft', 'Preqin', 'BlackRock'].map(c => (
                    <span key={c} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 6, background: 'rgba(37,99,235,.1)', border: '1px solid rgba(37,99,235,.2)', color: '#2563EB' }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* CAREER */}
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Career</div>
              <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(18px,2.5vw,26px)', letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 20 }}>
                Nine years. Four organisations. One diagnosis.
              </h2>
              <div className="flex flex-col">
                {CAREER.map((c, i) => (
                  <div key={c.period} className="flex" style={{ gap: 16, paddingBottom: c.last ? 0 : 20, position: 'relative' }}>
                    {!c.last && (
                      <div className="absolute" style={{ left: 11, top: 22, bottom: 0, width: 1, background: 'var(--border)' }} />
                    )}
                    <div className="flex flex-col items-center flex-shrink-0" style={{ width: 22 }}>
                      <div className="flex items-center justify-center z-10" style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${i === 0 ? c.color : 'var(--border)'}`, background: 'var(--bg)', flexShrink: 0 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.color }} />
                      </div>
                    </div>
                    <div style={{ paddingTop: 1 }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 3 }}>{c.period}</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 1 }}>{c.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 4 }}>{c.company}</div>
                      <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--text3)' }}>{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="flex items-center" style={{ gap: 16, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px', marginTop: 20 }}>
                <div className="flex items-center justify-center flex-shrink-0" style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(37,99,235,.1)', border: '1px solid rgba(37,99,235,.15)', fontSize: 20 }}>🎓</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>BTech — Electronics and Communication Engineering</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text2)' }}>Maulana Abul Kalam Azad University of Technology, West Bengal (MAKAUT / WBUT)</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text3)', marginTop: 3 }}>Aug 2012 — Jun 2016</div>
                </div>
              </div>
            </div>

            {/* WRITING */}
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Writing</div>
              <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(18px,2.5vw,26px)', letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 20 }}>
                Briefings by Ankit
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 10 }}>
                {BRIEFINGS.map(b => (
                  <Link key={b.href} href={b.href}
                    className="flex items-start transition-all"
                    style={{ gap: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--pink)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                    <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{b.emoji}</div>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 4 }}>{b.scope}</div>
                      <div className="font-display font-bold" style={{ fontSize: 13, lineHeight: 1.35, color: 'var(--text)', marginBottom: 4 }}>{b.title}</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text3)' }}>{b.read}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* NEWSLETTER CTA */}
            <div className="flex items-center" style={{ gap: 24, background: 'linear-gradient(135deg,rgba(249,115,22,.06),rgba(233,30,140,.04))', border: '1px solid rgba(249,115,22,.15)', borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: 'linear-gradient(90deg,#F97316,#E91E8C)' }} />
              <div className="flex items-center justify-center flex-shrink-0 font-display font-extrabold text-white" style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#F97316,#E91E8C)', fontSize: 20 }}>A</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: '#F97316', marginBottom: 4 }}>Founder's Newsletter</div>
                <div className="font-display font-extrabold" style={{ fontSize: 18, letterSpacing: '-.02em', color: 'var(--text)', marginBottom: 4 }}>Operator to Founder</div>
                <div style={{ fontSize: 13.5, color: 'var(--text2)' }}>Building LabelNest from zero. Sharing the journey as it happens. 598 subscribers.</div>
              </div>
              <a href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7472967819387686913"
                target="_blank" rel="noopener noreferrer"
                className="font-semibold text-white flex-shrink-0"
                style={{ fontSize: 13.5, padding: '11px 22px', borderRadius: 9, background: '#F97316', whiteSpace: 'nowrap' }}>
                Follow on LinkedIn ↗
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
