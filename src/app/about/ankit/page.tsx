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
              Ankit Suman founded LabelNest after almost a decade in data, across operations, quality, management, and governance at CIOReview, Microsoft, Preqin, and BlackRock.{' '}
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
              <style>{`
                .career-wrap .tag{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#4C4868;margin-bottom:8px}
                .career-wrap .sh{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:26px;letter-spacing:-.025em;color:#EBE8F6;margin-bottom:6px}
                .career-wrap .intro{font-size:13.5px;color:#8985A6;margin-bottom:36px}
                .career-wrap .chart{display:grid;grid-template-columns:130px 1fr;gap:16px;height:380px}
                .career-wrap .y-axis{position:relative;height:100%}
                .career-wrap .y-label{position:absolute;right:0;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:#4C4868;text-align:right;line-height:1.2;transform:translateY(-50%)}
                .career-wrap .y-label strong{display:block;color:#8985A6;font-weight:600;font-size:12px;letter-spacing:0;text-transform:none;font-family:'Inter',sans-serif}
                .career-wrap .plot{position:relative;background:linear-gradient(180deg,rgba(233,30,140,.03) 0%,transparent 60%);border-left:1px solid rgba(255,255,255,.07);border-bottom:1px solid rgba(255,255,255,.07);border-radius:0 0 0 4px}
                .career-wrap .grid-line{position:absolute;left:0;right:0;height:1px;background:rgba(255,255,255,.04)}
                .career-wrap svg.path{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
                .career-wrap .firm-label{position:absolute;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:11.5px;color:#A78BFA;white-space:nowrap;transform:translate(-50%,-100%);padding-bottom:6px;letter-spacing:-.005em}
                .career-wrap .firm-label span{display:block;font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;color:#4C4868;margin-top:1px;letter-spacing:.04em}
                .career-wrap .point{position:absolute;width:11px;height:11px;border-radius:50%;background:var(--c);transform:translate(-50%,-50%);box-shadow:0 0 0 3px #09090F,0 0 0 4px var(--c)}
                .career-wrap .point.current{box-shadow:0 0 0 3px #09090F,0 0 0 4px #E91E8C,0 0 20px #E91E8C}
                .career-wrap .point.current::after{content:'';position:absolute;inset:-10px;border-radius:50%;border:2px solid #E91E8C;opacity:.5;animation:career-ring 2s ease-in-out infinite}
                @keyframes career-ring{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:0;transform:scale(1.6)}}
                .career-wrap .x-axis{display:grid;grid-template-columns:130px 1fr;gap:16px;margin-top:8px}
                .career-wrap .x-line{position:relative;padding-top:4px}
                .career-wrap .x-tick{position:absolute;font-family:'JetBrains Mono',monospace;font-size:10px;color:#4C4868;transform:translateX(-50%)}
                .career-wrap .edu{display:flex;gap:14px;align-items:center;margin-top:42px;padding:14px 18px;background:#111119;border:1px solid rgba(255,255,255,.07);border-radius:11px;max-width:520px}
                .career-wrap .edu-icon{width:34px;height:34px;border-radius:9px;background:rgba(37,99,235,.1);border:1px solid rgba(37,99,235,.18);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
                .career-wrap .edu-degree{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:13px;color:#EBE8F6;margin-bottom:2px}
                .career-wrap .edu-school{font-size:11.5px;color:#8985A6;margin-bottom:2px}
                .career-wrap .edu-period{font-family:'JetBrains Mono',monospace;font-size:10px;color:#4C4868}
              `}</style>
              <div className="career-wrap" dangerouslySetInnerHTML={{ __html: `
                <div class="tag">Career</div>
                <div class="sh">Analyst to Founder.</div>
                <div class="intro">2016 → Present</div>
                <div class="chart">
                  <div class="y-axis">
                    <div class="y-label" style="top:8%"><strong>Founder</strong></div>
                    <div class="y-label" style="top:24%"><strong>VP</strong></div>
                    <div class="y-label" style="top:40%"><strong>AVP</strong></div>
                    <div class="y-label" style="top:56%"><strong>Lead</strong></div>
                    <div class="y-label" style="top:72%"><strong>Sr Associate</strong></div>
                    <div class="y-label" style="top:88%"><strong>Analyst</strong></div>
                  </div>
                  <div class="plot">
                    <div class="grid-line" style="top:8%"></div>
                    <div class="grid-line" style="top:24%"></div>
                    <div class="grid-line" style="top:40%"></div>
                    <div class="grid-line" style="top:56%"></div>
                    <div class="grid-line" style="top:72%"></div>
                    <div class="grid-line" style="top:88%"></div>
                    <div class="firm-label" style="left:20%;top:88%">CIOReview · Microsoft<span>2016 — 2020</span></div>
                    <div class="firm-label" style="left:50%;top:72%">Preqin<span>2020 — 2022</span></div>
                    <div class="firm-label" style="left:70%;top:56%">Preqin<span>2022 — 2024</span></div>
                    <div class="firm-label" style="left:85%;top:40%">Preqin<span>2024 — 2025</span></div>
                    <div class="firm-label" style="left:90.85%;top:24%">BlackRock<span>'25</span></div>
                    <div class="firm-label" style="left:95.85%;top:8%;color:#E91E8C">LabelNest<span style="color:#E91E8C">Now</span></div>
                    <svg class="path" viewBox="0 0 1000 380" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="stepGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stop-color="#06B6D4"/>
                          <stop offset="40%" stop-color="#10B981"/>
                          <stop offset="60%" stop-color="#2563EB"/>
                          <stop offset="80%" stop-color="#1E40AF"/>
                          <stop offset="90%" stop-color="#7C3AED"/>
                          <stop offset="100%" stop-color="#E91E8C"/>
                        </linearGradient>
                      </defs>
                      <path d="M 0 334 L 400 334 L 400 274 L 600 274 L 600 213 L 800 213 L 800 152 L 900 152 L 900 91 L 917 91 L 917 30 L 1000 30" fill="none" stroke="url(#stepGrad)" stroke-width="2.5" stroke-linejoin="miter" stroke-linecap="round"/>
                    </svg>
                    <div class="point" style="left:0%;top:88%;--c:#06B6D4"></div>
                    <div class="point" style="left:40%;top:72%;--c:#10B981"></div>
                    <div class="point" style="left:60%;top:56%;--c:#2563EB"></div>
                    <div class="point" style="left:80%;top:40%;--c:#1E40AF"></div>
                    <div class="point" style="left:90%;top:24%;--c:#7C3AED"></div>
                    <div class="point current" style="left:91.7%;top:8%;--c:#E91E8C"></div>
                  </div>
                </div>
                <div class="x-axis">
                  <div></div>
                  <div class="x-line">
                    <span class="x-tick" style="left:0%">'16</span>
                    <span class="x-tick" style="left:20%">'18</span>
                    <span class="x-tick" style="left:40%">'20</span>
                    <span class="x-tick" style="left:60%">'22</span>
                    <span class="x-tick" style="left:80%">'24</span>
                    <span class="x-tick" style="left:100%">'26</span>
                  </div>
                </div>
                <div class="edu">
                  <div class="edu-icon">🎓</div>
                  <div>
                    <div class="edu-degree">BTech — Electronics and Communication Engineering</div>
                    <div class="edu-school">MAKAUT (formerly WBUT), West Bengal</div>
                    <div class="edu-period">Aug 2012 — Jun 2016</div>
                  </div>
                </div>
              `}} />
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
