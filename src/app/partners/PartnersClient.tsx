'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { COUNTRIES } from '@/lib/countries'
import { INDIA_STATES, STATE_NAMES, OTHER_CITY } from '@/lib/india-geo'

// Where the registration goes: Growth OS (the partner appears there as "applied"). Override with NEXT_PUBLIC_PARTNER_APPLY_URL.
const APPLY_URL = process.env.NEXT_PUBLIC_PARTNER_APPLY_URL || 'https://growth.labelnest.in/api/partner-network/apply'
// The rewards are set in Growth OS and read from there, so this page always shows what the agreement says.
const RATES_URL = APPLY_URL.replace(/apply$/, 'rates')
interface Rates { ascent: number; atlas: number; orbit: number; command: number; self_close_bonus: number }

// One link per product, no copy of our own: the product pages already explain them. All four are shown the same way.
const PRODUCTS = [
  { name: 'Ascent', href: '/nestlens/capital', who: 'Startup founders' },
  { name: 'Atlas', href: '/nestlens/intelligence', who: 'Fundraising startups and institutions' },
  { name: 'Orbit', href: '/nestlens/orbit', who: 'Incubators and institutions' },
  { name: 'Command', href: '/nestlens/command', who: 'VC funds and fund managers' },
]

const CATEGORIES = [
  { key: 'incubator', label: 'Incubator or accelerator', group: 'Institution' },
  { key: 'university', label: 'University or innovation cell', group: 'Institution' },
  { key: 'community', label: 'Startup community or studio', group: 'Institution' },
  { key: 'institution_other', label: 'Other institution', group: 'Institution' },
  { key: 'strategic', label: 'Venture, technology or data partner', group: 'Institution' },
  { key: 'angel', label: 'Active angel investor', group: 'Individual or firm' },
  { key: 'mentor', label: 'Startup mentor', group: 'Individual or firm' },
  { key: 'ca_cs', label: 'CA / CS firm', group: 'Individual or firm' },
  { key: 'consultant', label: 'Fundraising consultant', group: 'Individual or firm' },
  { key: 'growth', label: 'Independent growth partner', group: 'Individual or firm' },
  { key: 'customer', label: 'Existing LabelNest customer', group: 'Individual or firm' },
]

const STEPS = [
  { t: 'Register', d: 'Tell us who you are. Two minutes.' },
  { t: 'Get your links', d: 'Once approved, you receive a referral link and a private dashboard link.' },
  { t: 'Bring customers', d: 'Share your link or register a lead. The first valid registration owns the customer.' },
  { t: 'Earn on every invoice', d: 'Each time your customer pays, your share is calculated and paid to you.' },
]

const RULES = [
  'You earn on every invoice the customer pays, for as long as they remain a customer. When they leave, rewards stop.',
  'Rewards are paid only after we have received the payment and the refund period has passed.',
  'The first valid registration of a customer owns it. We protect it for 90 days. If we already know the customer, no new reward is created.',
  'Only paying customers count. Sign-ups and introductions on their own earn nothing.',
  'We do not promise funding or investor introductions to anyone, and you must not either.',
]

const inputStyle = { background: 'var(--bg2)', border: '1px solid var(--bord2)', color: 'var(--text)' } as const
const label = 'block text-[12px] font-semibold mb-1.5'

export default function PartnersClient() {
  const [f, setF] = useState({ name: '', organisation: '', email: '', mobile: '', category: '', mode: 'both', country: 'India', state: '', city: '', website: '', note: '', company_site: '' })
  const [products, setProducts] = useState<string[]>([])
  const [agree, setAgree] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rates, setRates] = useState<Rates | null>(null)
  useEffect(() => { fetch(RATES_URL).then((r) => (r.ok ? r.json() : null)).then((j) => { if (j && typeof j.ascent === 'number') setRates(j) }).catch(() => undefined) }, [])
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }))
  const india = f.country === 'India'
  const cityList = india && f.state ? INDIA_STATES[f.state] ?? [] : []
  const typedCity = india && f.state !== '' && (f.city === OTHER_CITY || (f.city !== '' && !cityList.includes(f.city)))

  function pick(category: string) {
    set('category', category)
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!f.category) { setError('Please choose how you are registering.'); return }
    if (!f.city.trim() || f.city === OTHER_CITY) { setError('Please enter your city.'); return }
    if (!agree) { setError('Please confirm you have read the rules.'); return }
    setLoading(true)
    try {
      const res = await fetch(APPLY_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, state: india ? f.state : '', products }) })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(j.error || 'failed')
      setSent(true)
    } catch (err) {
      setError(err instanceof Error && err.message !== 'failed' ? err.message : 'Something went wrong. Please try again, or write to partnership@labelnest.in.')
    } finally {
      setLoading(false)
    }
  }

  const card = { background: 'var(--surface)', border: '1px solid var(--border)' } as const
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 w-full">

          <section className="pt-16 pb-12 max-w-[780px]">
            <div className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-5" style={{ color: 'var(--text3)' }}>LabelNest Partner Network</div>
            <h1 className="font-display font-extrabold tracking-tight leading-[1.06] mb-5" style={{ fontSize: 'clamp(32px,5vw,52px)', color: 'var(--text)' }}>
              Bring founders, funds and institutions to LabelNest. <span style={{ fontWeight: 300, color: 'var(--text2)' }}>Earn on every payment they make.</span>
            </h1>
            <p className="text-[17px] leading-[1.7] mb-7 max-w-[640px]" style={{ color: 'var(--text2)' }}>
              The LabelNest Partner Network is for people and organisations who work with startups, funds and institutions. You introduce them to our products. When they pay, you earn a share of every invoice for as long as they remain a customer.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#register" className="font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white" style={{ background: 'var(--pink)' }}>Register as a partner</a>
              <span className="text-[13px]" style={{ color: 'var(--text3)' }}>Open to individuals and to institutions.</span>
            </div>
          </section>

          <section className="py-10" style={{ borderTop: '1px solid var(--border)' }}>
            <h2 className="font-display font-bold text-[26px] mb-5" style={{ color: 'var(--text)' }}>What you can introduce</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PRODUCTS.map((p) => (
                <Link key={p.name} href={p.href} className="rounded-[14px] p-5 flex flex-col gap-1.5" style={card}>
                  <div className="font-display font-bold text-[18px]" style={{ color: 'var(--text)' }}>{p.name}</div>
                  <div className="text-[13px]" style={{ color: 'var(--text3)' }}>For {p.who.toLowerCase()}</div>
                  <div className="text-[13px] font-semibold mt-2" style={{ color: 'var(--pink)' }}>See {p.name} →</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="py-10" style={{ borderTop: '1px solid var(--border)' }}>
            <h2 className="font-display font-bold text-[26px] mb-5" style={{ color: 'var(--text)' }}>Who can partner</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-[16px] p-6" style={card}>
                <div className="font-mono text-[10.5px] tracking-[.12em] uppercase mb-3" style={{ color: 'var(--text3)' }}>Individuals and firms</div>
                <div className="text-[15px] leading-[1.9]" style={{ color: 'var(--text)' }}>Startup mentors and advisers<br />CA and CS firms<br />Fundraising consultants<br />Independent growth partners<br />Existing LabelNest customers</div>
                <p className="text-[13.5px] leading-[1.6] mt-3" style={{ color: 'var(--text2)' }}>You bring your own clients. You do not need to sell: share your link, or register a lead and we follow up.</p>
                <button type="button" onClick={() => pick('customer')} className="mt-4 text-[13.5px] font-semibold" style={{ color: 'var(--pink)' }}>Already a LabelNest customer? Refer and earn →</button>
              </div>
              <div className="rounded-[16px] p-6" style={card}>
                <div className="font-mono text-[10.5px] tracking-[.12em] uppercase mb-3" style={{ color: 'var(--text3)' }}>Institutions</div>
                <div className="text-[15px] leading-[1.9]" style={{ color: 'var(--text)' }}>Incubators and accelerators<br />Universities and innovation cells<br />Startup communities and studios<br />Industry bodies and other institutions</div>
                <p className="text-[13.5px] leading-[1.6] mt-3" style={{ color: 'var(--text2)' }}>Your startups and members get access, and your institution is rewarded as they pay. Incubators can also run their programme on Orbit free for 18 months when their startups join Ascent. Terms are agreed in writing.</p>
                <button type="button" onClick={() => pick('incubator')} className="mt-4 text-[13.5px] font-semibold" style={{ color: 'var(--pink)' }}>Register your institution →</button>
              </div>
            </div>
            <div className="rounded-[16px] p-6 mt-5 flex flex-col md:flex-row md:items-center gap-4 justify-between" style={card}>
              <div>
                <div className="font-display font-bold text-[18px] mb-1" style={{ color: 'var(--text)' }}>Active angel investors: free</div>
                <p className="text-[14px] leading-[1.6] max-w-[640px]" style={{ color: 'var(--text2)' }}>If you invest actively, join the network at no cost and source deals from us. There is nothing to pay and nothing to sign.</p>
              </div>
              <button type="button" onClick={() => pick('angel')} className="font-semibold text-[14px] px-5 py-3 rounded-[10px] text-white shrink-0" style={{ background: 'var(--pink)' }}>Join as an angel investor</button>
            </div>
          </section>

          <section className="py-10" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="rounded-[16px] p-6 md:p-7" style={card}>
              <div className="font-mono text-[10.5px] tracking-[.12em] uppercase mb-3" style={{ color: 'var(--text3)' }}>Building something bigger?</div>
              <h2 className="font-display font-bold text-[22px] mb-2" style={{ color: 'var(--text)' }}>You bring the market. We bring the build.</h2>
              <p className="text-[14.5px] leading-[1.7] max-w-[720px] mb-4" style={{ color: 'var(--text2)' }}>
                LabelNest also partners as the technology, product and growth partner for ventures that have a sector, a vision and relationships. We build and run the technology, and help you sell and distribute it: product engineering, sales and commercial growth, channel distribution, and the LabelNest products where they fit. Commercial terms are agreed case by case in a written agreement.
              </p>
              <button type="button" onClick={() => pick('strategic')} className="text-[13.5px] font-semibold" style={{ color: 'var(--pink)' }}>Tell us about your venture, technology or data partnership →</button>
            </div>
          </section>

          <section className="py-10" style={{ borderTop: '1px solid var(--border)' }}>
            <h2 className="font-display font-bold text-[26px] mb-5" style={{ color: 'var(--text)' }}>How it works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STEPS.map((s, i) => (
                <div key={s.t} className="flex gap-3.5 items-start">
                  <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold" style={{ background: 'var(--bg2)', color: 'var(--pink)' }}>{i + 1}</div>
                  <div><div className="font-display font-bold text-[16px] mb-1" style={{ color: 'var(--text)' }}>{s.t}</div><div className="text-[14px] leading-[1.55]" style={{ color: 'var(--text2)' }}>{s.d}</div></div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="rounded-[14px] p-5" style={card}>
                <div className="font-mono text-[10.5px] tracking-[.12em] uppercase mb-2" style={{ color: 'var(--text3)' }}>Share your link</div>
                <p className="text-[14px] leading-[1.6]" style={{ color: 'var(--text2)' }}>The customer signs up on their own through your personal link and is recorded as yours.</p>
              </div>
              <div className="rounded-[14px] p-5" style={card}>
                <div className="font-mono text-[10.5px] tracking-[.12em] uppercase mb-2" style={{ color: 'var(--text3)' }}>Register a lead</div>
                <p className="text-[14px] leading-[1.6]" style={{ color: 'var(--text2)' }}>Enter the company, the contact and the product. Our team handles the demo and the sale. You can also sell yourself. Same reward either way.</p>
              </div>
            </div>
          </section>

          <section className="py-10" style={{ borderTop: '1px solid var(--border)' }}>
            <h2 className="font-display font-bold text-[26px] mb-3" style={{ color: 'var(--text)' }}>What you earn</h2>
            <p className="text-[15.5px] leading-[1.7] max-w-[680px]" style={{ color: 'var(--text2)' }}>
              You earn a percentage of every invoice the customer pays, for as long as they remain a customer. That includes renewals. It is worked out on what we collect, excluding GST, after discounts and refunds.
            </p>
            {rates && (
              <div className="mt-5 max-w-[680px] rounded-[14px] overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="grid grid-cols-3 text-[12px] font-semibold px-5 py-3" style={{ background: 'var(--bg2)', color: 'var(--text2)' }}><div>Product</div><div>When LabelNest closes the sale</div><div>When your own link brings the customer</div></div>
                {([['Ascent', rates.ascent], ['Atlas', rates.atlas], ['Orbit', rates.orbit], ['Command', rates.command]] as const).map(([n, r]) => (
                  <div key={n} className="grid grid-cols-3 px-5 py-3 text-[14.5px]" style={{ borderTop: '1px solid var(--border)', color: 'var(--text)' }}><div className="font-semibold">{n}</div><div>{r}%</div><div>{r + rates.self_close_bonus}%</div></div>
                ))}
              </div>
            )}
            <p className="text-[13.5px] leading-[1.65] mt-3 max-w-[680px]" style={{ color: 'var(--text3)' }}>
              {rates ? `When a customer signs up through your own referral link you earn ${rates.self_close_bonus} percentage points more. ` : 'The percentage is set per product, and is higher when the customer signs up through your own referral link. '}Everything happens online: you register, read and accept the agreement, and sign in to your own dashboard. No call is needed, and you can book time with us if you would rather talk.
            </p>
          </section>

          <section className="py-10" style={{ borderTop: '1px solid var(--border)' }}>
            <h2 className="font-display font-bold text-[26px] mb-5" style={{ color: 'var(--text)' }}>The rules</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 list-none p-0 m-0">
              {RULES.map((r) => (<li key={r} className="flex gap-3 text-[14.5px] leading-[1.6]" style={{ color: 'var(--text)' }}><span aria-hidden style={{ color: 'var(--pink)' }}>✓</span><span>{r}</span></li>))}
            </ul>
          </section>

          <section id="register" className="py-14 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 items-start" style={{ borderTop: '1px solid var(--border)' }}>
            <div>
              <h2 className="font-display font-extrabold tracking-tight leading-[1.1] mb-3" style={{ fontSize: 'clamp(26px,3.4vw,34px)', color: 'var(--text)' }}>Register as a partner</h2>
              <p className="text-[15px] leading-[1.7]" style={{ color: 'var(--text2)' }}>Individuals and institutions register here. We reply within two working days. When you are approved, we email two links: your referral link, and a private link to your own dashboard. There is no password and nothing to install.</p>
            </div>
            <div className="rounded-[20px] p-6 md:p-8 relative overflow-hidden" style={card}>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#7A5217,#5B3A6B,#1F3A5F)' }} />
              {sent ? (
                <div className="py-6">
                  <div className="font-display font-extrabold text-[22px] mb-2" style={{ color: 'var(--text)' }}>Application received</div>
                  <p className="text-[14.5px] leading-[1.7] max-w-[520px]" style={{ color: 'var(--text2)' }}>
                    Thank you. We will reply to <strong style={{ color: 'var(--text)' }}>{f.email}</strong> within two working days. When you are approved we email you your referral link and a private link to your dashboard, where you register leads and see your earnings. No password is needed. Keep the dashboard link to yourself.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div><label htmlFor="p-name" className={label} style={{ color: 'var(--text)' }}>Your name *</label><input id="p-name" required value={f.name} onChange={(e) => set('name', e.target.value)} className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>
                    <div><label htmlFor="p-org" className={label} style={{ color: 'var(--text)' }}>Organisation (if any)</label><input id="p-org" value={f.organisation} onChange={(e) => set('organisation', e.target.value)} className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>
                    <div><label htmlFor="p-email" className={label} style={{ color: 'var(--text)' }}>Email *</label><input id="p-email" required type="email" value={f.email} onChange={(e) => set('email', e.target.value)} className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>
                    <div><label htmlFor="p-mobile" className={label} style={{ color: 'var(--text)' }}>Mobile *</label><input id="p-mobile" required type="tel" value={f.mobile} onChange={(e) => set('mobile', e.target.value)} className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>
                    <div>
                      <label htmlFor="p-cat" className={label} style={{ color: 'var(--text)' }}>I am registering as *</label>
                      <select id="p-cat" required value={f.category} onChange={(e) => set('category', e.target.value)} className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle}>
                        <option value="">Choose one</option>
                        {['Institution', 'Individual or firm'].map((g) => (<optgroup key={g} label={g}>{CATEGORIES.filter((c) => c.group === g).map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}</optgroup>))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="p-mode" className={label} style={{ color: 'var(--text)' }}>How do you want to work? *</label>
                      <select id="p-mode" value={f.mode} onChange={(e) => set('mode', e.target.value)} className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle}>
                        <option value="refer">Refer: I introduce, LabelNest closes</option><option value="sell">Sell: I close the sale myself</option><option value="both">Both</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="p-country" className={label} style={{ color: 'var(--text)' }}>Country *</label>
                      <select id="p-country" value={f.country} onChange={(e) => setF((p) => ({ ...p, country: e.target.value, state: '', city: '' }))} className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle}>{COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}</select>
                    </div>
                    {india && (
                      <div>
                        <label htmlFor="p-state" className={label} style={{ color: 'var(--text)' }}>State *</label>
                        <select id="p-state" required value={f.state} onChange={(e) => setF((p) => ({ ...p, state: e.target.value, city: '' }))} className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle}>
                          <option value="">Choose a state</option>{STATE_NAMES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    )}
                    <div>
                      <label htmlFor="p-city" className={label} style={{ color: 'var(--text)' }}>City *</label>
                      {india ? (
                        <>
                          <select id="p-city" disabled={!f.state} value={typedCity ? OTHER_CITY : f.city} onChange={(e) => set('city', e.target.value)} className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle}>
                            <option value="">{f.state ? 'Choose a city' : 'Choose a state first'}</option>{cityList.map((c) => <option key={c} value={c}>{c}</option>)}<option value={OTHER_CITY}>{OTHER_CITY} (type it)</option>
                          </select>
                          {typedCity && <input aria-label="City name" placeholder="City name" value={f.city === OTHER_CITY ? '' : f.city} onChange={(e) => set('city', e.target.value || OTHER_CITY)} className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none mt-2" style={inputStyle} />}
                        </>
                      ) : <input id="p-city" required value={f.city} onChange={(e) => set('city', e.target.value)} className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle} />}
                    </div>
                    <div><label htmlFor="p-web" className={label} style={{ color: 'var(--text)' }}>Website or LinkedIn</label><input id="p-web" value={f.website} onChange={(e) => set('website', e.target.value)} className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>
                  </div>
                  <fieldset className="border-0 p-0 m-0">
                    <legend className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text)' }}>Products you may refer</legend>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {PRODUCTS.map((p) => (
                        <label key={p.name} className="flex items-center gap-2 text-[14px]" style={{ color: 'var(--text)' }}>
                          <input type="checkbox" checked={products.includes(p.name.toLowerCase())} onChange={(e) => setProducts((cur) => (e.target.checked ? [...cur, p.name.toLowerCase()] : cur.filter((x) => x !== p.name.toLowerCase())))} />{p.name}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div><label htmlFor="p-note" className={label} style={{ color: 'var(--text)' }}>Anything we should know (optional)</label><textarea id="p-note" rows={3} value={f.note} onChange={(e) => set('note', e.target.value)} className="w-full rounded-[9px] px-3.5 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>
                  {/* a hidden field real visitors never see: a script that fills it is ignored */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}><label>Company site<input tabIndex={-1} autoComplete="off" value={f.company_site} onChange={(e) => set('company_site', e.target.value)} /></label></div>
                  <label className="flex gap-3 items-start text-[13.5px] leading-[1.55]" style={{ color: 'var(--text)' }}>
                    <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
                    <span>I have read the rules above, including that rewards are paid only on collected payments and that every arrangement is confirmed in writing.</span>
                  </label>
                  {error && <div role="alert" className="text-[13px]" style={{ color: '#B3402F' }}>{error}</div>}
                  <button type="submit" disabled={loading} className="w-full font-semibold text-[14.5px] py-3.5 rounded-[10px] text-white" style={{ background: 'var(--pink)', opacity: loading ? 0.7 : 1 }}>{loading ? 'Sending...' : 'Send my application →'}</button>
                  <div className="text-[11.5px] text-center" style={{ color: 'var(--text3)' }}>Bank and tax details are asked later, when your first payout is due. Questions: partnership@labelnest.in</div>
                </form>
              )}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
