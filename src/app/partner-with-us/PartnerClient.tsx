'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const BRING = [
  { t: 'Technology and product', d: 'Architecture, UI/UX, web and mobile, backend, security, cloud, upgrades and support.' },
  { t: 'Sales and commercial growth', d: 'Go-to-market, sales enablement, CRM, pricing and subscriptions, channel alliances.' },
  { t: 'Channel distribution', d: 'Sales associates, city leads, training, lead and commission tracking.' },
  { t: 'The LabelNest ecosystem', d: 'Command, Ascent, Atlas and NestHR where they fit your venture.' },
]

const KINDS = [
  { id: 'venture', name: 'A venture to build together', desc: 'You have the sector and the vision' },
  { id: 'channel', name: 'Channel or sales partner', desc: 'You sell into institutions' },
  { id: 'technology', name: 'Technology or data partner', desc: 'Integration or data' },
  { id: 'other', name: 'Something else', desc: 'Tell us in your own words' },
]

const inputStyle = { background: 'var(--bg2)', border: '1px solid var(--bord2)', color: 'var(--text)' } as const

export default function PartnerClient() {
  const [kind, setKind] = useState('venture')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [sector, setSector] = useState('')
  const [where, setWhere] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const kindName = KINDS.find((k) => k.id === kind)?.name ?? kind
    const body = [
      `Partnership type: ${kindName}`,
      sector ? `Sector: ${sector}` : null,
      where ? `City / region: ${where}` : null,
      '',
      message,
    ].filter((l): l is string => l !== null).join('\n')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message: body, inquiry_type: 'Partner with us' }),
      })
      if (!res.ok) throw new Error('failed')
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again, or write to partnership@labelnest.in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-16 w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <div className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-5" style={{ color: 'var(--text3)' }}>Partner with us · LabelNest</div>
            <h1 className="font-display font-extrabold tracking-tight leading-[1.04] mb-5" style={{ fontSize: 'clamp(34px,5vw,56px)', color: 'var(--text)' }}>
              You bring the market.
              <br />
              <span style={{ fontWeight: 300, color: 'var(--text2)' }}>We bring the build.</span>
            </h1>
            <p className="text-[16px] leading-[1.74] mb-8 max-w-[460px]" style={{ color: 'var(--text2)' }}>
              LabelNest partners as the Strategic Technology, Product &amp; Growth Partner for ventures that have a sector, a vision and relationships. We build and run the technology, and help you sell and distribute it, on a shared-growth model.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {BRING.map((b) => (
                <div key={b.t} className="rounded-[13px] px-5 py-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="font-display font-bold text-[14.5px] mb-1" style={{ color: 'var(--text)' }}>{b.t}</div>
                  <div className="text-[13px] leading-[1.6]" style={{ color: 'var(--text2)' }}>{b.d}</div>
                </div>
              ))}
            </div>
            <p className="text-[13px] leading-[1.65]" style={{ color: 'var(--text3)' }}>
              Commercial terms are agreed case by case in definitive agreements. See our{' '}
              <Link href="/announcements" style={{ color: 'var(--text)', textDecoration: 'underline' }}>latest announcement</Link>{' '}
              for an example of how we work.
            </p>
          </div>

          <div className="rounded-[20px] p-6 md:p-9 relative overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#7A5217,#5B3A6B,#1F3A5F)' }} />
            {!sent ? (
              <form onSubmit={submit}>
                <div className="text-[12.5px] font-semibold mb-2.5" style={{ color: 'var(--text)' }}>What kind of partnership?</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {KINDS.map((k) => (
                    <button key={k.id} type="button" onClick={() => setKind(k.id)} className="text-left p-3.5 rounded-[10px]"
                      style={{ background: kind === k.id ? 'rgba(122,82,23,.08)' : 'var(--bg2)', border: `1px solid ${kind === k.id ? 'var(--pink)' : 'var(--border)'}` }}>
                      <div className="font-display font-bold text-[13px]" style={{ color: 'var(--text)' }}>{k.name}</div>
                      <div className="text-[11px]" style={{ color: 'var(--text3)' }}>{k.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Your name</label>
                      <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle} />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Your email</label>
                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Company or venture</label>
                      <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Optional" className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle} />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Sector</label>
                      <input value={sector} onChange={(e) => setSector(e.target.value)} placeholder="e.g. Education, Healthcare" className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>City or region</label>
                    <input value={where} onChange={(e) => setWhere(e.target.value)} placeholder="Where you operate" className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>What do you want to build or sell together?</label>
                    <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Your market, what you have in place, and what you need from us." className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none resize-none" style={inputStyle} />
                  </div>
                  {error && <div role="alert" className="text-[13px]" style={{ color: '#B3402F' }}>{error}</div>}
                  <button type="submit" disabled={loading} className="w-full font-semibold text-[14.5px] py-3.5 rounded-[10px] text-white" style={{ background: 'var(--pink)', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Sending...' : 'Send partnership enquiry →'}
                  </button>
                  <div className="text-[11.5px] text-center" style={{ color: 'var(--text3)' }}>
                    Goes to partnership@labelnest.in · Typically replied to within one business day
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="font-display font-extrabold text-[22px] mb-2" style={{ color: 'var(--text)' }}>Thank you, we have it</div>
                <div className="text-[14px] leading-[1.65]" style={{ color: 'var(--text2)' }}>
                  We will reply to <strong style={{ color: 'var(--text)' }}>{email}</strong> within one business day.
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
