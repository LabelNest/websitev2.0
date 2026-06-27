'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('general')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const TYPES = [
    { id: 'general', icon: '💬', name: 'General', desc: 'Questions, ideas, anything else' },
    { id: 'nestlens', icon: '🔭', name: 'NestLens', desc: 'Platform access or demo' },
    { id: 'services', icon: '⚙️', name: 'Services', desc: 'Data project or ops work' },
    { id: 'partnership', icon: '🤝', name: 'Partnership', desc: 'Strategic or data partnership' },
  ]

  const CHANNELS = [
    { href: 'mailto:contact@labelnest.in', icon: '✉️', label: 'General', value: 'contact@labelnest.in', desc: 'For all general questions and everything else', color: 'var(--pink)' },
    { href: 'mailto:nestlens@labelnest.in', icon: '🔭', label: 'NestLens', value: 'nestlens@labelnest.in', desc: 'Platform access requests, demo requests', color: 'var(--blue)' },
    { href: 'mailto:hr@labelnest.in', icon: '👥', label: 'NestHR', value: 'hr@labelnest.in', desc: 'NestHR platform and PlacementOS questions', color: 'var(--purple)' },
    { href: 'mailto:ops@labelnest.in', icon: '⚙️', label: 'Managed Services', value: 'ops@labelnest.in', desc: 'Data operations, annotation, custom workflows', color: 'var(--green)' },
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, company, message, inquiry_type: type }),
    })
    setSent(true)
    setLoading(false)
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center" style={{ paddingTop: '60px' }}>
        <div className="max-w-[1240px] mx-auto px-8 py-16 w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-start">

          {/* Left */}
          <div>
            <div className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-5" style={{ color: 'var(--text3)' }}>Contact · LabelNest</div>
            <h1 className="font-display font-extrabold tracking-tight leading-[1.04] mb-5"
              style={{ fontSize: 'clamp(36px,5vw,58px)', color: 'var(--text)' }}>
              We respond
              <br />
              <span style={{ fontWeight: 300, color: 'var(--text2)' }}>directly and quickly.</span>
            </h1>
            <p className="text-[16px] leading-[1.74] mb-10 max-w-[420px]" style={{ color: 'var(--text2)' }}>
              No ticketing system, no form that disappears into a queue. Every message goes to someone who can actually help.{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Tell us what you are working on.</strong>
            </p>

            <div className="flex flex-col gap-3">
              {CHANNELS.map(ch => (
                <a key={ch.href} href={ch.href}
                  className="flex items-center gap-4 px-5 py-4 rounded-[13px] transition-all duration-200 hover:translate-x-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = ch.color)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <span className="text-[20px] flex-shrink-0">{ch.icon}</span>
                  <div className="flex-1">
                    <div className="font-mono text-[9px] tracking-[.12em] uppercase mb-0.5" style={{ color: 'var(--text3)' }}>{ch.label}</div>
                    <div className="font-medium text-[14px]" style={{ color: 'var(--text)' }}>{ch.value}</div>
                    <div className="text-[12px] mt-0.5" style={{ color: 'var(--text2)' }}>{ch.desc}</div>
                  </div>
                  <span style={{ color: 'var(--text3)' }}>→</span>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-[13px] p-5" style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
              <div className="font-mono text-[9px] tracking-[.12em] uppercase mb-2.5" style={{ color: 'var(--text3)' }}>Office</div>
              <div className="font-display font-bold text-[14px] mb-1.5" style={{ color: 'var(--text)' }}>LabelNest India Private Limited</div>
              <div className="text-[13px] leading-[1.65]" style={{ color: 'var(--text2)' }}>
                No. 33, 4th Floor, 1st Main, CBI Main Rd<br />
                HMT Layout, Ganganagar<br />
                Bengaluru, Karnataka, India 560032
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-[20px] p-9 relative overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#E91E8C,#7C3AED,#2563EB)' }} />

            {!sent ? (
              <form onSubmit={handleSubmit}>
                <div className="text-[12.5px] font-semibold mb-2.5" style={{ color: 'var(--text)' }}>What is this about?</div>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {TYPES.map(t => (
                    <button key={t.id} type="button" onClick={() => setType(t.id)}
                      className="text-left p-3.5 rounded-[10px] transition-all"
                      style={{
                        background: type === t.id ? 'rgba(233,30,140,.08)' : 'var(--bg2)',
                        border: `1px solid ${type === t.id ? 'var(--pink)' : 'var(--border)'}`,
                      }}>
                      <div className="text-[18px] mb-1.5">{t.icon}</div>
                      <div className="font-display font-bold text-[13px]" style={{ color: 'var(--text)' }}>{t.name}</div>
                      <div className="text-[11px]" style={{ color: 'var(--text3)' }}>{t.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Your name', placeholder: 'Full name', value: name, setter: setName, type: 'text', required: true },
                      { label: 'Your email', placeholder: 'you@company.com', value: email, setter: setEmail, type: 'email', required: true },
                    ].map(f => (
                      <div key={f.label}>
                        <label className="block text-[12px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>{f.label}</label>
                        <input type={f.type} required={f.required} value={f.value} onChange={e => f.setter(e.target.value)} placeholder={f.placeholder}
                          className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none transition-colors"
                          style={{ background: 'var(--bg2)', border: '1px solid var(--bord2)', color: 'var(--text)' }}
                          onFocus={e => (e.target.style.borderColor = 'var(--pink)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--bord2)')} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Company</label>
                    <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Where you work (optional)"
                      className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none transition-colors"
                      style={{ background: 'var(--bg2)', border: '1px solid var(--bord2)', color: 'var(--text)' }}
                      onFocus={e => (e.target.style.borderColor = 'var(--pink)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--bord2)')} />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Message</label>
                    <textarea required value={message} onChange={e => setMessage(e.target.value)} rows={4}
                      placeholder="Tell us what you are working on, what you need, or what you want to know..."
                      className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none transition-colors resize-none"
                      style={{ background: 'var(--bg2)', border: '1px solid var(--bord2)', color: 'var(--text)' }}
                      onFocus={e => (e.target.style.borderColor = 'var(--pink)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--bord2)')} />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full font-semibold text-[14.5px] py-3.5 rounded-[10px] text-white transition-opacity hover:opacity-90"
                    style={{ background: 'var(--pink)', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Sending...' : 'Send message →'}
                  </button>
                  <div className="text-[11.5px] text-center" style={{ color: 'var(--text3)' }}>
                    Sending to contact@labelnest.in · Typically replied to within one business day
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="text-[48px] mb-4">✅</div>
                <div className="font-display font-extrabold text-[20px] mb-2" style={{ color: 'var(--text)' }}>Message sent</div>
                <div className="text-[14px] leading-[1.65]" style={{ color: 'var(--text2)' }}>
                  We have received your message and will respond directly to{' '}
                  <strong style={{ color: 'var(--text)' }}>{email}</strong>{' '}
                  within one business day.
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
