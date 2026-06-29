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

const TRACKS = ['Data Research', 'HR', 'Marketing', 'Sales', 'Engineering & AI', 'Others'] as const

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [role, setRole] = useState('')
  const [aName, setAName] = useState('')
  const [aEmail, setAEmail] = useState('')
  const [aTrack, setATrack] = useState('')
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
    await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: aName,
        email: aEmail,
        track: aTrack || 'Others',
        linkedin_url: aLink,
        message: role ? `Applying for: ${role}\n\n${aMsg}` : aMsg,
        source: 'website',
      }),
    })
    setSent(true)
    setLoading(false)
  }

  const activeJobs = jobs.filter(j => j)

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
              <a href="#apply" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E91E8C', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Apply now</a>
              <a href="#fellowship" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Apply for Fellowship Cohort III</a>
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
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Hiring</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 8 }}>No open vacancies. Always open to the right person.</h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 36, maxWidth: 560, lineHeight: 1.65 }}>We do not wait for headcount approval to talk to someone exceptional. If you are willing to learn hard things and work on real problems, there is a place for you here.</p>

            {/* Always looking banner */}
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(233,30,140,.25)', borderLeft: '3px solid #E91E8C', borderRadius: 14, padding: '20px 24px', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>Rolling applications — always on</div>
                <div style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.6 }}>Tell us what you work on and what you want to build. We read every application personally.</div>
              </div>
              <button onClick={() => applyFor('Open Application')}
                style={{ background: '#E91E8C', color: '#fff', fontSize: 13.5, fontWeight: 600, padding: '10px 22px', borderRadius: 10, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>Apply now</button>
            </div>

            {/* Active DB jobs if any */}
            {activeJobs.map(job => (
              <div key={job.id}
                style={{ display: 'flex', alignItems: 'center', gap: 20, background: 'var(--surface)', border: '2px solid #E91E8C', borderRadius: 12, padding: '16px 20px', marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 4 }}>{job.department} · {job.location}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{job.title}</div>
                </div>
                <a href={job.apply_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: '#E91E8C' }}>Apply →</a>
              </div>
            ))}

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
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }} id="apply">
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Track</label>
                      <select required value={aTrack} onChange={e => setATrack(e.target.value)}
                        style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--bord2)', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: aTrack ? 'var(--text)' : 'var(--text3)', outline: 'none' }}>
                        <option value="">Select a track</option>
                        {TRACKS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Role you are applying for</label>
                      <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Data Engineer, or Open"
                        style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--bord2)', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none' }} />
                    </div>
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
                  <div style={{ fontSize: 11.5, color: 'var(--text3)', textAlign: 'center', marginTop: 10 }}>Goes directly to our hiring pipeline · We read every one</div>
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

        {/* FELLOWSHIP COHORT III */}
        <section style={{ padding: '64px 48px' }} id="fellowship">
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Nestling Fellowship · Cohort III</div>
                <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 14 }}>
                  Learn by doing real work.<br />
                  <span style={{ background: 'linear-gradient(100deg,#7C3AED,#2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Not simulated projects.</span>
                </h2>
                <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.72, marginBottom: 20 }}>
                  The Nestling Fellowship is a structured learning track for people early in their career who want to work on live data systems, real infrastructure, and problems that do not have textbook answers.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {[
                    { icon: '📅', label: 'Duration', val: '3 months · full-time' },
                    { icon: '📍', label: 'Location', val: 'Bengaluru, India — in-person' },
                    { icon: '🏷️', label: 'Tracks', val: 'NestLabs (data) · NestTech (engineering)' },
                    { icon: '🎓', label: 'Who it is for', val: 'Students and early-career builders — any background' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 13.5, color: 'var(--text2)' }}>
                      <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                      <span><strong style={{ color: 'var(--text)', fontWeight: 600 }}>{item.label}:</strong> {item.val}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '14px 18px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                  38 Nestling fellows have come through Cohorts I and II. Most are still building in the ecosystem.
                </div>
              </div>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: 32, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#7C3AED,#2563EB)' }} />
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, color: 'var(--text)', marginBottom: 6 }}>Apply for Cohort III</h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20, lineHeight: 1.6 }}>Tell us your track, what you are working on, and why you want to be a Nestling. No formal requirements.</p>
                <form onSubmit={async e => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const data = new FormData(form)
                  await fetch('/api/apply', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name: data.get('name'),
                      email: data.get('email'),
                      track: data.get('track'),
                      message: data.get('message'),
                      source: 'fellowship',
                      metadata: { cohort: 'III', institution: data.get('institution') },
                    }),
                  })
                  form.innerHTML = '<div style="text-align:center;padding:32px 0"><div style="font-size:38px;margin-bottom:14px">🎓</div><div style="font-family:Bricolage Grotesque,sans-serif;font-weight:800;font-size:18px;color:var(--text);margin-bottom:8px">Application received</div><div style="font-size:13.5px;color:var(--text2);line-height:1.65">We will review your application and reach out if it is a fit. Cohort III applications are reviewed on a rolling basis.</div></div>'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Your name</label>
                      <input name="name" type="text" required placeholder="Full name"
                        style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--bord2)', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Email</label>
                      <input name="email" type="email" required placeholder="you@email.com"
                        style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--bord2)', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none' }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Track</label>
                    <select name="track" required
                      style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--bord2)', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none' }}>
                      <option value="">Select a track</option>
                      {TRACKS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>College or institution (optional)</label>
                    <input name="institution" type="text" placeholder="e.g. RVCE, BITS, self-taught"
                      style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--bord2)', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none' }} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>What do you work on and why LabelNest?</label>
                    <textarea name="message" required rows={4} placeholder="Projects, side work, what you are learning — anything that shows how you think."
                      style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--bord2)', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none', resize: 'vertical', fontFamily: 'Inter, sans-serif' }} />
                  </div>
                  <button type="submit"
                    style={{ width: '100%', background: '#7C3AED', color: '#fff', border: 'none', borderRadius: 10, padding: 13, fontSize: 14.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    Apply for Fellowship Cohort III
                  </button>
                  <div style={{ fontSize: 11.5, color: 'var(--text3)', textAlign: 'center', marginTop: 10 }}>Goes to hr@labelnest.in · Rolling review</div>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
