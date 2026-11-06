'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { submitSignup } from '@/lib/signupContext'

const LOGO_URL = 'https://pub-a36a86a8b72a466f95980705b327476f.r2.dev/brand/labelnest-logo.png'

const COLUMNS = [
  {
    title: 'Products',
    links: [
      { label: 'Atlas', href: '/nestlens/intelligence' },
      { label: 'Exchange', href: '/nestlens/exchange' },
      { label: 'Command', href: '/nestlens/command' },
      { label: 'Ascent', href: '/nestlens/capital' },
      { label: 'Orbit', href: '/nestlens/orbit' },
      { label: 'Connect', href: '/nestlens/connect' },
      { label: 'NestHR', href: '/nesthr' },
      { label: 'Sentinel', href: '/sentinel' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'How it connects', href: '/ecosystem' },
      { label: 'Pricing', href: '/nestlens/pricing' },
      { label: 'Who it is for', href: '/who-we-serve' },
      { label: 'Briefings', href: '/briefings' },
      { label: 'Research reports', href: '/reports' },
      { label: 'Resource hub', href: 'https://nestlens.labelnest.in/DIY' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Team', href: '/team' },
      { label: 'Founder', href: '/about/ankit' },
      { label: 'Careers', href: '/careers' },
      { label: 'Managed services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Cookies', href: '/legal/cookies' },
      { label: 'Security', href: '/legal/security' },
      { label: 'All legal documents', href: '/legal' },
    ],
  },
]

function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  async function submit() {
    if (!valid) { setState('error'); setMessage('Please enter a valid email address.'); return }
    setState('loading')
    try {
      if (!(await submitSignup(email, 'website_footer', 'general'))) throw new Error('server')
      setState('success'); setMessage("You're in. Watch your inbox for the next issue."); setEmail('')
    } catch {
      setState('error'); setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div style={{ maxWidth: 400, width: '100%' }}>
      <p style={{ font: '600 12px var(--font-sans),sans-serif', letterSpacing: '.14em', textTransform: 'uppercase', color: '#B58A3C', margin: '0 0 10px' }}>Subscribe</p>
      <p style={{ fontFamily: 'var(--font-serif),Georgia,serif', fontSize: 26, lineHeight: 1.15, color: 'var(--onnight)', margin: '0 0 8px', letterSpacing: '-.01em' }}>Field notes on private markets.</p>
      <p style={{ fontSize: 14.5, color: 'var(--mutenight)', lineHeight: 1.55, margin: '0 0 16px' }}>Data, product updates and the occasional note from the team. No spam.</p>
      {state === 'success' ? (
        <p style={{ margin: 0, fontSize: 15, color: 'var(--onnight)', borderTop: '1px solid #2a3b55', paddingTop: 14 }}>{message}</p>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="email" value={email} placeholder="you@company.com" aria-label="Email address"
              onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle') }}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              style={{ flex: 1, minWidth: 0, padding: '12px 14px', fontSize: 15, border: `1px solid ${state === 'error' ? '#C97B7B' : '#34475f'}`, borderRadius: 2, background: 'transparent', color: 'var(--onnight)', outline: 'none', fontFamily: 'inherit' }}
            />
            <button onClick={submit} disabled={state === 'loading'} style={{ padding: '0 20px', background: 'var(--onnight)', color: 'var(--night)', border: 0, borderRadius: 2, font: '600 14px var(--font-sans),sans-serif', cursor: 'pointer' }}>
              {state === 'loading' ? '…' : 'Subscribe'}
            </button>
          </div>
          {state === 'error' && <p style={{ margin: '8px 0 0', fontSize: 13, color: '#E3A3A3' }}>{message}</p>}
        </>
      )}
    </div>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--night)', color: 'var(--mutenight)', fontSize: 15 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '72px 28px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: '44px 40px' }}>
          <div style={{ gridColumn: 'span 2', minWidth: 0 }}>
            <Link href="/" aria-label="LabelNest home" style={{ display: 'inline-block', marginBottom: 22 }}>
              <Image src={LOGO_URL} alt="LabelNest" width={118} height={36} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.92, width: 'auto', height: 36 }} />
            </Link>
            <Newsletter />
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 style={{ font: '600 12px var(--font-sans),sans-serif', letterSpacing: '.14em', textTransform: 'uppercase', color: '#B58A3C', margin: '0 0 14px' }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 2 }}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith('http')
                      ? <a href={l.href} style={{ display: 'block', padding: '5px 0', color: 'var(--onnight)', textDecoration: 'none' }}>{l.label}</a>
                      : <Link href={l.href} style={{ display: 'block', padding: '5px 0', color: 'var(--onnight)', textDecoration: 'none' }}>{l.label}</Link>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid #1f3149', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px 24px', fontSize: 13.5 }}>
          <span>© 2026 LabelNest India Private Limited · CIN U63111KA2025PTC211812 · No. 33, 4th Floor, 1st Main, CBI Main Rd, HMT Layout, Ganganagar, Bengaluru 560032</span>
          <span>Data, done right.</span>
        </div>
      </div>
    </footer>
  )
}
