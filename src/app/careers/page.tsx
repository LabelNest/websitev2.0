'use client'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface Job {
  id: string
  title: string
  department: string
  type: string
  location: string
  complexity: string
  apply_url: string
}

const ROLLING = [
  { title: 'Data Engineer', dept: 'Data and AI Systems', loc: 'Bangalore' },
  { title: 'Data Research Analyst', dept: 'Data and AI Systems', loc: 'Bangalore' },
  { title: 'Project Management Analyst', dept: 'Delivery and Programs', loc: 'Bangalore' },
  { title: 'Frontend Engineer', dept: 'Data and AI Systems', loc: 'Remote — India' },
  { title: 'HR Analyst', dept: 'People and Culture', loc: 'Bangalore' },
]

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [role, setRole] = useState('')
  const [aName, setAName] = useState('')
  const [aEmail, setAEmail] = useState('')
  const [aLink, setALink] = useState('')
  const [aMsg, setAMsg] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/jobs').then(r => r.json()).then(d => setJobs(d.jobs || [])).catch(() => {})
  }, [])

  function applyFor(title: string) {
    setRole(title)
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: aName,
        email: aEmail,
        message: `Role: ${role}\nLinkedIn/Portfolio: ${aLink}\n\n${aMsg}`,
        inquiry_type: 'career',
      }),
    })
    setSent(true)
    setLoading(false)
  }

  const featuredJob = jobs[0] ?? null
  const extraJobs = jobs.slice(1)

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section style={{ padding: '80px 48px 72px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, left: -80, width: 480, height: 480, borderRadius: '50%', background: 'rgba(233,30,140,.07)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Careers · LabelNest · Bangalore</div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(42px,6.5vw,76px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.02, color: 'var(--text)', marginBottom: 20 }}>
              <span style={{ fontWeight: 300, color: 'var(--text2)' }}>Build systems</span><br />
              others cannot{' '}
              <span style={{ background: 'linear-gradient(100deg,#E91E8C,#8B5CF6,#2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>imagine.</span>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.8vw,18.5px)', lineHeight: 1.74, color: 'var(--text2)', maxWidth: 560, marginBottom: 36 }}>
              We work on hard data problems at the intersection of private markets, automation, and human judgment.{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>We hire for potential, not pedigree.</strong> The right degree is not a requirement. The right thinking is.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#roles" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E91E8C', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>See open roles</a>
              <a href="#apply" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Open application</a>
            </div>
          </div>
        </section>

        {/* BELIEFS */}
        <section style={{ padding: '56px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {[
              { icon: '🧠', title: 'Potential over pedigree', desc: 'We do not filter by institution or communication style. We care about what you can do with hard problems.' },
              { icon: '🏗️', title: 'Real problems, not simulated ones', desc: 'Everyone here works on the actual systems that power LabelNest products — not practice exercises.' },
              { icon: '🌱', title: 'Built to grow, not just perform', desc: 'The environment is honest, the feedback is direct, and the trajectory is yours to define.' },
            ].map(b => (
              <div key={b.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{b.icon}</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 6 }}>{b.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* OPEN ROLES */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }} id="roles">
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Open roles</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 8 }}>Where we need people right now</h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 36, maxWidth: 520, lineHeight: 1.65 }}>One publicly listed role and several we hire for on a rolling basis. Do not see your fit? Send an open application below.</p>

            {/* Featured role — first DB job or hardcoded fallback */}
            {featuredJob ? (
              <div style={{ background: 'var(--surface)', border: '2px solid #E91E8C', borderRadius: 16, padding: '24px 28px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>{featuredJob.department} · {featuredJob.location}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 19, color: 'var(--text)', marginBottom: 8 }}>{featuredJob.title}</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 5, background: 'rgba(233,30,140,.1)', color: '#E91E8C' }}>Featured</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 5, background: 'rgba(255,255,255,.05)', color: 'var(--text2)' }}>{featuredJob.type}</span>
                    {featuredJob.complexity && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 5, background: 'rgba(255,255,255,.05)', color: 'var(--text2)' }}>{featuredJob.complexity}</span>}
                  </div>
                </div>
                <a href={featuredJob.apply_url} target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E91E8C', color: '#fff', fontSize: 13.5, fontWeight: 600, padding: '11px 22px', borderRadius: 10, whiteSpace: 'nowrap', flexShrink: 0 }}>Apply now</a>
              </div>
            ) : (
              <div style={{ background: 'var(--surface)', border: '2px solid #E91E8C', borderRadius: 16, padding: '24px 28px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>NestSales · Global · Remote</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 19, color: 'var(--text)', marginBottom: 8 }}>Strategic BD Partner, Data and Intelligence</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 5, background: 'rgba(233,30,140,.1)', color: '#E91E8C' }}>Featured</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 5, background: 'rgba(255,255,255,.05)', color: 'var(--text2)' }}>Remote</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 5, background: 'rgba(255,255,255,.05)', color: 'var(--text2)' }}>High complexity</span>
                  </div>
                </div>
                <button onClick={() => applyFor('Strategic BD Partner, Data and Intelligence')}
                  style={{ background: '#E91E8C', color: '#fff', fontSize: 13.5, fontWeight: 600, padding: '11px 22px', borderRadius: 10, whiteSpace: 'nowrap', flexShrink: 0, border: 'none', cursor: 'pointer' }}>Apply now</button>
              </div>
            )}

            {/* Additional DB jobs */}
            {extraJobs.map(job => (
              <div key={job.id}
                style={{ display: 'flex', alignItems: 'center', gap: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px', marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 4 }}>{job.department} · {job.location}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{job.title}</div>
                </div>
                <a href={job.apply_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: '#E91E8C' }}>Apply →</a>
              </div>
            ))}

            {/* Rolling roles */}
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', margin: '24px 0 12px', paddingTop: 20, borderTop: '1px solid var(--border)' }}>Rolling basis — always open</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ROLLING.map(r => (
                <div key={r.title}
                  style={{ display: 'flex', alignItems: 'center', gap: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px' }}
                  onMouseOver={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)')}
                  onMouseOut={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 4 }}>{r.dept} · {r.loc}</div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{r.title}</div>
                  </div>
                  <button onClick={() => applyFor(r.title)}
                    style={{ fontSize: 13, fontWeight: 600, color: '#E91E8C', background: 'none', border: 'none', cursor: 'pointer' }}>Apply →</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POTENTIAL STATEMENT */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 52, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#E91E8C,#7C3AED,#2563EB)' }} />
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-.035em', color: 'var(--text)', marginBottom: 16 }}>
                Built by people with the{' '}
                <span style={{ background: 'linear-gradient(100deg,#E91E8C,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>right potential.</span>
                <br />Not the right degree.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text2)', maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.72 }}>
                13 current team members. 39 alumni. 15 Nestling fellows.{' '}
                <strong style={{ color: 'var(--text)', fontWeight: 600 }}>None of them were hired because of where they studied.</strong> That is still how we hire.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="#apply" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E91E8C', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Apply now</a>
                <Link href="/team" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Meet the team</Link>
              </div>
            </div>
          </div>
        </section>

        {/* APPLICATION FORM */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)' }} id="apply">
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Apply</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 14 }}>Tell us what you can do</h2>
              <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.72, marginBottom: 28 }}>Open applications welcome. No role listed that fits? Apply anyway and tell us what you work on.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>✉️</span>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.55 }}>
                    Applications also go to <a href="mailto:contact@labelnest.in" style={{ color: '#2563EB' }}>contact@labelnest.in</a> if you prefer email.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>⏱️</span>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.55 }}>We read every application and respond to every fit — typically within 3 to 5 business days.</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: 32, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#E91E8C,#2563EB)' }} />
              {!sent ? (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, color: 'var(--text)', marginBottom: 20 }}>Send your application</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Your name</label>
                      <input type="text" required value={aName} onChange={e => setAName(e.target.value)} placeholder="Full name"
                        style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--bord2)', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Your email</label>
                      <input type="email" required value={aEmail} onChange={e => setAEmail(e.target.value)} placeholder="you@email.com"
                        style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--bord2)', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none' }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Role you are applying for</label>
                    <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Data Engineer, or Open Application"
                      style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--bord2)', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none' }} />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>LinkedIn or portfolio</label>
                    <input type="text" value={aLink} onChange={e => setALink(e.target.value)} placeholder="linkedin.com/in/your-handle"
                      style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--bord2)', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none' }} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Tell us about yourself</label>
                    <textarea required value={aMsg} onChange={e => setAMsg(e.target.value)} rows={4}
                      placeholder="What do you work on now, what do you want to work on, and why LabelNest?"
                      style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--bord2)', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none', resize: 'vertical', fontFamily: 'Inter, sans-serif' }} />
                  </div>
                  <button type="submit" disabled={loading}
                    style={{ width: '100%', background: '#E91E8C', color: '#fff', border: 'none', borderRadius: 10, padding: 13, fontSize: 14.5, fontWeight: 600, cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1, fontFamily: 'Inter, sans-serif' }}>
                    {loading ? 'Sending...' : 'Send application'}
                  </button>
                  <div style={{ fontSize: 11.5, color: 'var(--text3)', textAlign: 'center', marginTop: 10 }}>Goes to contact@labelnest.in · We read every one</div>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: 42, marginBottom: 16 }}>✅</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>Application received</div>
                  <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.65 }}>We have your application and will review it properly. If it is a fit, you will hear from us within 3 to 5 business days.</div>
                </div>
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
