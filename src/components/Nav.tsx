'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

// The menu bar. Two large dropdowns (Products, Who it is for) say what each product works with,
// because how they connect is the point of NestLens. Fixed 64px high, so page content keeps its 64px top padding.

type Menu = 'products' | 'who' | 'research' | 'company' | null

const PRODUCTS = [
  { name: 'Atlas', text: 'Reviewed data on funds, companies and people.', works: 'Feeds Command, Ascent, Orbit', href: '/nestlens/intelligence' },
  { name: 'Command', text: "The fund's workspace, from pipeline to LP reports.", works: 'Reads Ascent rooms · sourced from Atlas', href: '/nestlens/command' },
  { name: 'Ascent', text: "A founder's data room, and deal flow for programmes.", works: 'Syncs to Command · switched on by Orbit', href: '/nestlens/capital' },
  { name: 'Orbit', text: 'Run a programme from application to alumni.', works: 'Gives every startup an Ascent room', href: '/nestlens/orbit' },
  { name: 'Connect', text: 'Mentors, audit partners and fund scouting.', works: 'Reached from Ascent and Command', href: '/nestlens/connect' },
  { name: 'Exchange', text: 'Buy and sell structured datasets, with escrow.', works: 'Context from Atlas', href: '/nestlens/exchange' },
]

const PAIRS = [
  { name: 'Command + Ascent', text: 'Portfolio updates arrive on their own' },
  { name: 'Orbit + Ascent', text: 'Selected startups get a data room' },
  { name: 'Atlas + Command + Ascent', text: 'One record from sourcing to reporting' },
]

const WHO = [
  { name: 'I run a fund', text: 'Source, diligence, committee, LP reports.', uses: 'Command · Atlas · Ascent', href: '/who-we-serve/gp' },
  { name: 'I invest as an LP', text: 'Research managers, then follow your own portfolio.', uses: 'Atlas · Command', href: '/who-we-serve/lp' },
  { name: 'I am raising', text: 'One data room, shared only with consent.', uses: 'Ascent · Connect', href: '/who-we-serve/founder' },
  { name: 'I run a programme', text: 'Applications to alumni, with a room for every startup.', uses: 'Orbit · Ascent', href: '/who-we-serve/incubator' },
  { name: 'I advise founders and funds', text: 'Be found, or join as a vetted mentor.', uses: 'Atlas · Connect', href: '/who-we-serve/partner' },
  { name: 'I research private markets', text: 'Reviewed records with their sources.', uses: 'Atlas', href: '/who-we-serve/researcher' },
  { name: 'I buy or sell data', text: 'Verified sellers, escrow, quality scores.', uses: 'Exchange', href: '/who-we-serve/exchange' },
]

const RESEARCH = [
  { name: 'Briefings and newsletters', href: '/briefings' },
  { name: 'Research reports', href: '/reports' },
  { name: 'Observatory', href: '/nestlens/intelligence/observatory' },
]

const COMPANY = [
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Founder', href: '/about/ankit' },
  { name: 'Careers', href: '/careers' },
  { name: 'Managed services', href: '/services' },
  { name: 'Contact', href: '/contact' },
]

const CSS = `
.nv-wrap{position:fixed;top:0;left:0;right:0;z-index:300;background:var(--nav-bg);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--border)}
.nv-bar{max-width:1240px;margin:0 auto;padding:0 28px;height:64px;display:flex;align-items:center;justify-content:space-between;gap:20px}
.nv-links{display:flex;align-items:center;gap:26px;list-style:none;margin:0;padding:0}
.nv-btn,.nv-link{background:none;border:0;padding:0;font:500 14.5px var(--font-sans),system-ui,sans-serif;color:var(--text);cursor:pointer;display:inline-flex;align-items:center;gap:6px;text-decoration:none;white-space:nowrap}
.nv-btn:hover,.nv-link:hover{text-decoration:underline;text-decoration-color:var(--brass-line);text-underline-offset:7px;text-decoration-thickness:2px}
.nv-on{text-decoration:underline;text-decoration-color:var(--brass-line);text-underline-offset:7px;text-decoration-thickness:2px}
.nv-cta{display:inline-flex;align-items:center;min-height:42px;padding:0 20px;background:var(--text);color:var(--bg);font:600 14px var(--font-sans),system-ui,sans-serif;text-decoration:none;border-radius:2px}
.nv-cta:hover{opacity:.9}
.nv-panel{position:absolute;left:0;right:0;top:64px;background:var(--bg);border-bottom:1px solid var(--bord2);box-shadow:0 40px 60px -40px rgba(14,27,46,.35)}
.nv-in{max-width:1240px;margin:0 auto;padding:34px 28px 40px;display:grid;grid-template-columns:2.4fr 1fr;gap:56px}
.nv-eyebrow{font:600 12px var(--font-sans),sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--pink);margin:0 0 12px}
.nv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0 34px}
.nv-grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:0 40px}
.nv-item{display:block;padding:16px 0;border-top:1px solid var(--border);text-decoration:none;color:inherit}
.nv-item .t{font-family:var(--font-serif),Georgia,serif;font-size:25px;line-height:1.1;color:var(--text);letter-spacing:-.01em}
.nv-item .d{font-size:14.5px;margin-top:4px;color:var(--text2);line-height:1.45}
.nv-item .w{font-size:13px;margin-top:6px;color:var(--pink);font-weight:600}
.nv-item:hover .t{text-decoration:underline;text-decoration-color:var(--brass-line);text-underline-offset:6px;text-decoration-thickness:2px}
.nv-side{border-left:1px solid var(--border);padding-left:38px}
.nv-pair{display:block;padding:13px 0;border-top:1px solid var(--border);text-decoration:none;color:var(--text);font-family:var(--font-serif),Georgia,serif;font-size:21px;line-height:1.2}
.nv-pair small{display:block;font:400 13.5px var(--font-sans),sans-serif;color:var(--text3);margin-top:3px}
.nv-pair:hover{text-decoration:underline;text-decoration-color:var(--brass-line);text-underline-offset:6px}
.nv-drop{position:absolute;top:64px;background:var(--bg);border:1px solid var(--bord2);box-shadow:0 24px 40px -28px rgba(14,27,46,.4);min-width:230px;padding:8px 0}
.nv-drop a{display:block;padding:10px 20px;font:500 14.5px var(--font-sans),sans-serif;color:var(--text);text-decoration:none}
.nv-drop a:hover{background:var(--bg2)}
.nv-m{display:none}
@media (max-width:980px){
  .nv-links,.nv-desk{display:none!important}
  .nv-m{display:inline-flex}
  .nv-bar{padding:0 20px}
}
.nv-mobile{position:fixed;left:0;right:0;top:64px;bottom:0;background:var(--bg);overflow:auto;padding:8px 20px 40px}
.nv-mobile h4{font:600 12px var(--font-sans),sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--pink);margin:26px 0 6px}
.nv-mobile a.row{display:block;padding:14px 0;border-top:1px solid var(--border);text-decoration:none;color:var(--text);font-family:var(--font-serif),Georgia,serif;font-size:26px;line-height:1.1}
.nv-mobile a.row small{display:block;font:400 14px var(--font-sans),sans-serif;color:var(--text3);margin-top:3px}
`

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState<Menu>(null)
  const [mobile, setMobile] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setOpen(null); setMobile(false) }, [pathname])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(null)
    }
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') { setOpen(null); setMobile(false) } }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [])

  const toggle = (m: Exclude<Menu, null>) => setOpen((cur) => (cur === m ? null : m))
  const is = (p: string) => pathname === p || pathname.startsWith(p + '/')
  const chev = <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>

  return (
    <>
      <style>{CSS}</style>
      <div className="nv-wrap" ref={wrapRef}>
        <div className="nv-bar">
          <Link href="/" aria-label="LabelNest home" style={{ display: 'flex', alignItems: 'center', height: 40, flexShrink: 0 }}>
            <Image
              src="https://pub-a36a86a8b72a466f95980705b327476f.r2.dev/brand/labelnest-logo.png"
              alt="LabelNest"
              width={110}
              height={34}
              style={{ objectFit: 'contain', display: 'block', width: 'auto', height: 34 }}
              priority
            />
          </Link>

          <ul className="nv-links" aria-label="Main">
            <li><button className={`nv-btn ${open === 'products' || is('/nestlens') ? 'nv-on' : ''}`} onClick={() => toggle('products')} aria-expanded={open === 'products'}>Products {chev}</button></li>
            <li><button className={`nv-btn ${open === 'who' || is('/who-we-serve') ? 'nv-on' : ''}`} onClick={() => toggle('who')} aria-expanded={open === 'who'}>Who it is for {chev}</button></li>
            <li><Link href="/ecosystem" className={`nv-link ${is('/ecosystem') ? 'nv-on' : ''}`}>How it connects</Link></li>
            <li><Link href="/nestlens/pricing" className={`nv-link ${is('/nestlens/pricing') ? 'nv-on' : ''}`}>Pricing</Link></li>
            <li style={{ position: 'relative' }}>
              <button className={`nv-btn ${open === 'research' || is('/briefings') || is('/reports') ? 'nv-on' : ''}`} onClick={() => toggle('research')} aria-expanded={open === 'research'}>Research {chev}</button>
              {open === 'research' && <div className="nv-drop" style={{ top: 34, left: -20 }}>{RESEARCH.map((r) => <Link key={r.href} href={r.href}>{r.name}</Link>)}</div>}
            </li>
            <li style={{ position: 'relative' }}>
              <button className={`nv-btn ${open === 'company' || is('/about') || is('/team') || is('/careers') ? 'nv-on' : ''}`} onClick={() => toggle('company')} aria-expanded={open === 'company'}>Company {chev}</button>
              {open === 'company' && <div className="nv-drop" style={{ top: 34, left: -20 }}>{COMPANY.map((r) => <Link key={r.href} href={r.href}>{r.name}</Link>)}</div>}
            </li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a className="nv-link nv-desk" href="https://nestlens.labelnest.in" style={{ fontSize: 14.5 }}>Open NestLens</a>
            <Link className="nv-cta nv-desk" href="/contact">Talk to us</Link>
            <button className="nv-btn nv-m" onClick={() => setMobile((m) => !m)} aria-label={mobile ? 'Close menu' : 'Open menu'} aria-expanded={mobile} style={{ width: 44, height: 44, justifyContent: 'center', marginRight: -10 }}>
              {mobile
                ? <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M2 2l18 18M20 2L2 20" stroke="currentColor" strokeWidth="1.6" /></svg>
                : <svg width="26" height="14" viewBox="0 0 26 14" aria-hidden="true"><path d="M0 1h26M0 13h26" stroke="currentColor" strokeWidth="1.6" /></svg>}
            </button>
          </div>
        </div>

        {open === 'products' && (
          <div className="nv-panel">
            <div className="nv-in">
              <div>
                <p className="nv-eyebrow">Six products, one record</p>
                <div className="nv-grid">
                  {PRODUCTS.map((p) => (
                    <Link key={p.name} href={p.href} className="nv-item"><div className="t">{p.name}</div><div className="d">{p.text}</div><div className="w">{p.works}</div></Link>
                  ))}
                </div>
              </div>
              <div className="nv-side">
                <p className="nv-eyebrow">How they work together</p>
                {PAIRS.map((p) => <Link key={p.name} href="/ecosystem" className="nv-pair">{p.name}<small>{p.text}</small></Link>)}
                <p style={{ margin: '16px 0 0', fontSize: 13.5, color: 'var(--text3)' }}>Also: <Link href="/nesthr" style={{ color: 'inherit' }}>NestHR</Link>, <Link href="/sentinel" style={{ color: 'inherit' }}>Sentinel</Link> and <Link href="/services" style={{ color: 'inherit' }}>managed data services</Link>.</p>
              </div>
            </div>
          </div>
        )}

        {open === 'who' && (
          <div className="nv-panel">
            <div className="nv-in">
              <div>
                <p className="nv-eyebrow">Start from what you do</p>
                <div className="nv-grid2">
                  {WHO.map((w) => (
                    <Link key={w.name} href={w.href} className="nv-item"><div className="t">{w.name}</div><div className="d">{w.text}</div><div className="w">{w.uses}</div></Link>
                  ))}
                </div>
              </div>
              <div className="nv-side">
                <p className="nv-eyebrow">Not sure?</p>
                <p style={{ margin: '0 0 18px', fontSize: 16, color: 'var(--text2)' }}>See the whole ecosystem and where each product hands over to the next.</p>
                <Link href="/ecosystem" className="nv-cta">How it connects</Link>
              </div>
            </div>
          </div>
        )}

        {mobile && (
          <div className="nv-mobile">
            <h4>Products</h4>
            {PRODUCTS.map((p) => <Link key={p.name} href={p.href} className="row">{p.name}<small>{p.works}</small></Link>)}
            <h4>Who it is for</h4>
            {WHO.map((w) => <Link key={w.name} href={w.href} className="row">{w.name}<small>{w.uses}</small></Link>)}
            <h4>More</h4>
            <Link href="/ecosystem" className="row">How it connects</Link>
            <Link href="/nestlens/pricing" className="row">Pricing</Link>
            <Link href="/briefings" className="row">Research</Link>
            <Link href="/about" className="row">Company</Link>
            <Link href="/careers" className="row">Careers</Link>
            <div style={{ display: 'grid', gap: 12, marginTop: 28 }}>
              <Link href="/contact" className="nv-cta" style={{ justifyContent: 'center' }}>Talk to us</Link>
              <a href="https://nestlens.labelnest.in" className="nv-cta" style={{ justifyContent: 'center', background: 'transparent', color: 'var(--text)', border: '1px solid var(--text)' }}>Open NestLens</a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
