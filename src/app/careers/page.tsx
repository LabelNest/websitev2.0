'use client'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface Job { id: string; title: string; department: string; type: string; location: string; complexity: string; apply_url: string }

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
      body: JSON.stringify({ name: aName, email: aEmail, message: `Role: ${role}\nLinkedIn/Portfolio: ${aLink}\n\n${aMsg}`, inquiry_type: 'career' }),
    })
    setSent(true)
    setLoading(false)
  }

  const ROLLING = [
    { title: 'Data Engineer', dept: 'Data and AI Systems', loc: 'Bangalore' },
    { title: 'Data Research Analyst', dept: 'Data and AI Systems', loc: 'Bangalore' },
    { title: 'Project Management Analyst', dept: 'Delivery and Programs', loc: 'Bangalore' },
    { title: 'Frontend Engineer', dept: 'Data and AI Systems', loc: 'Remote — India' },
    { title: 'HR Analyst', dept: 'People and Culture', loc: 'Bangalore' },
  ]

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>

        {/* HERO */}
        <section className="px-8 py-28 relative overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[480px] h-[480px] rounded-full pointer-events-none"
            style={{ background: 'rgba(233,30,140,0.07)', filter: 'blur(90px)' }} />
          <div className="max-w-[1240px] mx-auto relative z-10">
            <div className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-5" style={{ color: 'var(--text3)' }}>Careers · LabelNest · Bangalore</div>
            <h1 className="font-display font-extrabold tracking-tight leading-[1.02] mb-6"
              style={{ fontSize: 'clamp(42px,6.5vw,76px)', color: 'var(--text)' }}>
              <span style={{ fontWeight: 300, color: 'var(--text2)' }}>Build systems</span>
              <br />others cannot{' '}
              <span style={{ background: 'linear-gradient(100deg,#E91E8C,#8B5CF6,#2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>imagine.</span>
            </h1>
            <p className="text-[clamp(15px,1.8vw,18.5px)] leading-[1.74] max-w-[560px] mb-10" style={{ color: 'var(--text2)' }}>
              We work on hard data problems at the intersection of private markets, automation, and human judgment.{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>We hire for potential, not pedigree.</strong> The right degree is not a requirement. The right thinking is.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="#roles" className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white"
                style={{ background: 'var(--pink)' }}>See open roles</a>
              <a href="#apply" className="inline-flex items-center gap-2 font-medium text-[14.5px] px-6 py-3.5 rounded-[10px] border"
                style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'var(--bord2)' }}>Open application</a>
            </div>
          </div>
        </section>

        {/* BELIEFS */}
        <section className="px-8 pb-16" style={{ background: 'var(--bg)' }}>
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['🧠', 'Potential over pedigree', 'We do not filter by institution or communication style. We care about what you can do with hard problems.'],
              ['🏗️', 'Real problems, not simulated ones', 'Everyone here works on the actual systems that power LabelNest products — not practice exercises.'],
              ['🌱', 'Built to grow, not just to perform', 'The environment is honest, the feedback is direct, and the trajectory is yours to define.'],
            ].map(([icon, title, desc]) => (
              <div key={title as string} className="rounded-[14px] p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="text-[22px] mb-3">{icon}</div>
                <div className="font-display font-bold text-[14.5px] mb-2" style={{ color: 'var(--text)' }}>{title}</div>
                <div className="text-[13px] leading-[1.6]" style={{ color: 'var(--text2)' }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* OPEN ROLES */}
        <section className="px-8 py-16 border-t" id="roles" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--pink)' }}>Open roles</div>
            <h2 className="font-display font-extrabold tracking-tight leading-[1.06] mb-3"
              style={{ fontSize: 'clamp(26px,3.5vw,44px)', color: 'var(--text)' }}>Where we need people right now</h2>
            <p className="text-[15.5px] leading-[1.74] max-w-[500px] mb-10" style={{ color: 'var(--text2)' }}>
              One publicly listed role and several positions we hire for on a rolling basis. Do not see your fit? Send an open application.
            </p>

            <div className="flex flex-col gap-3">
              {/* Live DB roles */}
              {jobs.map(job => (
                <div key={job.id} className="flex items-center gap-5 px-6 py-5 rounded-[14px]"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="flex-1">
                    <div className="font-mono text-[9.5px] tracking-[.1em] uppercase mb-1.5" style={{ color: 'var(--text3)' }}>{job.department}</div>
                    <div className="font-display font-bold text-[16px] mb-2" style={{ color: 'var(--text)' }}>{job.title}</div>
                    <div className="flex gap-2 flex-wrap">
                      {[job.location, job.type, job.complexity].map(t => (
                        <span key={t} className="font-mono text-[9.5px] tracking-[.08em] uppercase px-2.5 py-1 rounded"
                          style={{ background: 'var(--bg3)', color: 'var(--text3)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <a href={job.apply_url} target="_blank" rel="noopener noreferrer"
                    className="font-semibold text-[13px] px-5 py-2.5 rounded-[9px] text-white flex-shrink-0"
                    style={{ background: 'var(--pink)' }}>Apply via NestHR ↗</a>
                </div>
              ))}

              {/* Rolling */}
              {ROLLING.map(r => (
                <div key={r.title} className="flex items-center gap-5 px-6 py-5 rounded-[14px]"
                  style={{ background: 'var(--surface)', border: '1px dashed var(--bord2)' }}>
                  <div className="flex-1">
                    <div className="font-mono text-[9.5px] tracking-[.1em] uppercase mb-1.5" style={{ color: 'var(--text3)' }}>{r.dept}</div>
                    <div className="font-display font-bold text-[16px] mb-2" style={{ color: 'var(--text)' }}>{r.title}</div>
                    <span className="font-mono text-[9.5px] tracking-[.08em] uppercase px-2.5 py-1 rounded"
                      style={{ background: 'rgba(16,185,129,.1)', color: 'var(--green)' }}>{r.loc}</span>
                    <span className="ml-2 font-mono text-[9.5px] tracking-[.08em] uppercase px-2.5 py-1 rounded"
                      style={{ background: 'var(--bg3)', color: 'var(--text3)' }}>Rolling basis</span>
                  </div>
                  <button onClick={() => applyFor(r.title)}
                    className="font-semibold text-[13px] px-5 py-2.5 rounded-[9px] text-white flex-shrink-0"
                    style={{ background: 'var(--pink)' }}>Apply</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POTENTIAL STATEMENT */}
        <section className="px-8 py-20">
          <div className="max-w-[1240px] mx-auto">
            <div className="rounded-[20px] p-12 text-center relative overflow-hidden"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#E91E8C,#7C3AED,#2563EB)' }} />
              <h2 className="font-display font-extrabold tracking-tight leading-[1.06] mb-5"
                style={{ fontSize: 'clamp(28px,4vw,48px)', color: 'var(--text)' }}>
                Built by people with the{' '}
                <span style={{ background: 'linear-gradient(100deg,#E91E8C,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  right potential.
                </span>
                <br />Not the right degree.
              </h2>
              <p className="text-[16px] leading-[1.74] max-w-[560px] mx-auto mb-8" style={{ color: 'var(--text2)' }}>
                13 current team members. 39 alumni. 15 Nestling fellows.{' '}
                <strong style={{ color: 'var(--text)', fontWeight: 600 }}>None of them were hired because of where they studied or how polished their CV looked.</strong>{' '}
                That is still how we hire.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <a href="#apply" className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white"
                  style={{ background: 'var(--pink)' }}>Apply now</a>
                <Link href="/team" className="inline-flex items-center gap-2 font-medium text-[14.5px] px-6 py-3.5 rounded-[10px] border"
                  style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'var(--bord2)' }}>Meet the team</Link>
              </div>
            </div>
          </div>
        </section>

        {/* APPLICATION FORM */}
        <section className="px-8 py-16 border-t" id="apply" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--pink)' }}>Apply</div>
              <h2 className="font-display font-extrabold tracking-tight leading-[1.06] mb-4"
                style={{ fontSize: 'clamp(24px,3vw,38px)', color: 'var(--text)' }}>Tell us what you can do</h2>
              <p className="text-[15px] mb-8" style={{ color: 'var(--text2)' }}>
                Open applications welcome. No role listed? Apply anyway. Fill in the form and tell us what you work on, what you want to work on, and why LabelNest.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  ['✉️', 'Applications also go to contact@labelnest.in if you prefer email.'],
                  ['⏱️', 'We read every application and respond to every fit — typically within 3 to 5 business days.'],
                  ['🔗', 'External roles with formal JDs apply via NestHR directly.'],
                ].map(([icon, text]) => (
                  <div key={text as string} className="flex items-start gap-3 px-4 py-3.5 rounded-[10px]"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <span className="text-[16px] flex-shrink-0 mt-0.5">{icon}</span>
                    <div className="text-[13px] leading-[1.55]" style={{ color: 'var(--text2)' }}>{text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[18px] p-8 relative overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#E91E8C,#2563EB)' }} />
              {!sent ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <div className="font-display font-extrabold text-[18px] mb-1" style={{ color: 'var(--text)' }}>Send your application</div>
                  <div className="text-[13px] mb-2" style={{ color: 'var(--text2)' }}>Open applications welcome. No role listed? Apply anyway.</div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Your name', ph: 'Full name', val: aName, set: setAName, type: 'text', req: true },
                      { label: 'Your email', ph: 'you@email.com', val: aEmail, set: setAEmail, type: 'email', req: true },
                    ].map(f => (
                      <div key={f.label}>
                        <label className="block text-[12px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>{f.label}</label>
                        <input type={f.type} required={f.req} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                          className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none"
                          style={{ background: 'var(--bg2)', border: '1px solid var(--bord2)', color: 'var(--text)' }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Role you are applying for</label>
                    <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Data Engineer, or Open Application"
                      className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none"
                      style={{ background: 'var(--bg2)', border: '1px solid var(--bord2)', color: 'var(--text)' }} />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>LinkedIn or portfolio</label>
                    <input type="text" value={aLink} onChange={e => setALink(e.target.value)} placeholder="linkedin.com/in/your-handle"
                      className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none"
                      style={{ background: 'var(--bg2)', border: '1px solid var(--bord2)', color: 'var(--text)' }} />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Tell us about yourself</label>
                    <textarea required value={aMsg} onChange={e => setAMsg(e.target.value)} rows={4}
                      placeholder="What do you work on now, what do you want to work on, and why LabelNest?"
                      className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none resize-none"
                      style={{ background: 'var(--bg2)', border: '1px solid var(--bord2)', color: 'var(--text)' }} />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full font-semibold text-[14.5px] py-3.5 rounded-[10px] text-white"
                    style={{ background: 'var(--pink)', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Sending...' : 'Send application'}
                  </button>
                  <div className="text-[11.5px] text-center" style={{ color: 'var(--text3)' }}>Goes to contact@labelnest.in · We read every one</div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="text-[42px] mb-4">✅</div>
                  <div className="font-display font-extrabold text-[20px] mb-2" style={{ color: 'var(--text)' }}>Application received</div>
                  <div className="text-[14px] leading-[1.65]" style={{ color: 'var(--text2)' }}>
                    We have your application and will review it properly. If it is a fit, you will hear from us within 3 to 5 business days.
                  </div>
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
