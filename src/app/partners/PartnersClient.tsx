'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import HowYouBringThem from './HowYouBringThem'
import { COUNTRIES } from '@/lib/countries'
import { INDIA_STATES, STATE_NAMES, OTHER_CITY } from '@/lib/india-geo'

// Where the registration goes: Growth OS (the partner appears there as "applied"). Override with NEXT_PUBLIC_PARTNER_APPLY_URL.
const APPLY_URL = process.env.NEXT_PUBLIC_PARTNER_APPLY_URL || 'https://growth.labelnest.in/api/partner-network/apply'
// The rewards are set in Growth OS and read from there, so this page always shows what the agreement says.
const RATES_URL = APPLY_URL.replace(/apply$/, 'rates')
interface Rates { ascent: number; atlas: number; orbit: number; command: number; self_close_bonus: number }

// One link per product, no copy of our own: the product pages already explain them. All four are shown the same way.
const PRODUCTS = [
  { name: 'Ascent', href: '/nestlens/capital', who: 'startup founders' },
  { name: 'Atlas', href: '/nestlens/intelligence', who: 'fundraising startups and institutions' },
  { name: 'Orbit', href: '/nestlens/orbit', who: 'incubators and institutions' },
  { name: 'Command', href: '/nestlens/command', who: 'VC funds and fund managers' },
  { name: 'Connect', href: '/nestlens/connect', who: 'mentors, audit partners and fund scouting (included with Ascent and Command)' },
  { name: 'Exchange', href: '/nestlens/exchange', who: 'buyers of datasets and research' },
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
  { t: 'Introduce or sell', d: 'Once approved, you receive a referral link and a private dashboard link. Share your link or register a lead.' },
  { t: 'Customer pays', d: 'Your customer becomes a paying customer. The first valid registration owns the customer.' },
  { t: 'You are paid', d: 'Your reward is calculated on each payment and released after the 30 day refund period.' },
]

const RULES = [
  'Rewards are paid only on collected payments, after the 30 day refund period.',
  'Only paying customers earn rewards. Free trials, free evaluations and free seats earn nothing.',
  'The first valid registration owns a customer for 90 days. If the customer pays within 90 days, you own the customer for the 12 month reward period. If it does not, the registration lapses and anyone may register it again.',
  'A company already in our records, already in a conversation with us, or already a customer is not eligible. We tell you within 5 working days of your registration, and our decision is final.',
  'No self-referral. Your own company, your team and anyone you control do not count as referrals. If two partners register the same customer, the earlier registration wins.',
  'No promises of funding, returns or investor introductions. You must not suggest that LabelNest guarantees any of these.',
  'Tell the customer you are a LabelNest partner and may earn a reward when they buy.',
  'No spam. Contact only people you know or who have a reason to expect your message.',
  'Use LabelNest’s name and logo only as provided in the partner kit.',
  'We may change rates for new customers with 30 days’ notice. The rate for a customer stays as it was when that customer was registered.',
  'Either side may end the arrangement with 30 days’ notice. Rewards already earned for registered customers are still paid under the 12 month reward period.',
]

const FAQ = [
  { q: 'How much can I earn, and for how long?', a: 'You earn a percentage of each payment your customer makes, at the rates in the table above, for the first 12 months from the customer’s first payment. After 12 months the reward for that customer ends.' },
  { q: 'When is the reward paid, and what is the refund period?', a: 'A reward is released 30 days after the payment, if there has been no refund. Released rewards are paid once a month, around the 10th. Amounts under Rs 1,000 roll over to the next month.' },
  { q: 'What if my customer was already talking to LabelNest?', a: 'A company already in our records, in an active conversation with us, or already a customer is not eligible. We tell you within 5 working days of your registration, and our decision is final.' },
  { q: 'Can I sell directly, and does the rate change?', a: 'Yes. If you run the sales process and the customer signs up through your own link (Sell), the rate is higher than when you introduce and LabelNest closes (Refer). Both rates are in the table above.' },
  { q: 'Do you promise funding or investor introductions?', a: 'No. We sell software and data. Rewards relate only to product payments, and partners must not suggest that LabelNest guarantees funding, returns or investor introductions.' },
  { q: 'Do I need to be GST registered? How is TDS handled?', a: 'Indian partners give their PAN, and their GSTIN if registered. If you are GST registered you invoice us with GST. Tax is deducted at source where the Income Tax Act requires it. Please check your own position with your accountant.' },
  { q: 'Can overseas partners join and how are they paid?', a: 'Yes. Tell us your country when you register. Bank details, any tax form needed, the payout currency and fees are agreed when your first payout is due.' },
  { q: 'Can I run this alongside my professional rules or other commitments?', a: 'If your professional rules restrict referral fees, tell us and we will agree another arrangement. Advocates and others who cannot share fees under their rules, and valuers or auditors where independence rules apply, are not eligible for the standard rewards.' },
  { q: 'How do I end the arrangement?', a: 'Either side may end it with 30 days’ notice. Rewards already earned for registered customers are still paid within the 12 month reward period.' },
  { q: 'Who owns the customer relationship?', a: 'Your clients stay your clients. The first valid registration of a customer is recorded as yours for 90 days, and if the customer pays within that time, for the reward period.' },
]

const inputStyle = { background: 'var(--bg2)', border: '1px solid var(--bord2)', color: 'var(--text)' } as const
const label = 'block text-[12px] font-semibold mb-1.5'

export interface CalcPrices { ascent: PriceRow; atlas: PriceRow; orbit: PriceRow; command: PriceRow }
interface PriceRow { label: string; plan: string; yearly: number; from?: boolean }
const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')

/** Illustrative only: customers x the first-year list price (excluding GST) x the partner's rate. Both come live from our own systems. */
const MAXES: Record<string, number> = { ascent: 50, atlas: 20, orbit: 20, command: 10 }

export function EarningsCalculator({ rates, prices, n, setN }: { rates: Rates; prices: CalcPrices; n: Record<string, number>; setN: (f: (p: Record<string, number>) => Record<string, number>) => void }) {
  const keys = ['ascent', 'atlas', 'orbit', 'command'] as const
  const [own, setOwn] = useState(true)
  const per = (k: (typeof keys)[number]) => (n[k] || 0) * prices[k].yearly * ((rates[k] + (own ? rates.self_close_bonus : 0)) / 100)
  const total = keys.reduce((a, k) => a + per(k), 0)

  // the number counts up to its new value; with reduced motion it simply lands
  const [shown, setShown] = useState(total)
  const from = useRef(total)
  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    const a = from.current
    let raf = 0
    const step = (t: number) => {
      const p = reduce ? 1 : Math.min(1, (t - start) / 450)
      const v = a + (total - a) * (1 - Math.pow(1 - p, 3))
      from.current = v
      setShown(v)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [total])

  const setCount = (k: string, v: number) => setN((p) => ({ ...p, [k]: Math.max(0, Math.min(MAXES[k], v)) }))

  return (
    <section id="estimate" className="pb-10 scroll-mt-24" aria-labelledby="calc-h">
      <div className="rounded-[18px] p-6 md:p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
          <h2 id="calc-h" className="font-display font-bold text-[24px]" style={{ color: 'var(--text)' }}>Estimate your referral earnings</h2>
        </div>
        <p className="text-[13.5px] mb-6 max-w-[640px]" style={{ color: 'var(--text3)' }}>Slide to see what a year of referrals could look like. Example only: today&apos;s list prices for one year, excluding GST, with the rewards below. Each customer earns you a reward for 12 months from their first payment.</p>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          <div className="grid gap-5">
            {keys.map((k) => (
              <div key={k}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-[15.5px]" style={{ color: 'var(--text)' }}>{prices[k].label}</div>
                    <div className="text-[12.5px]" style={{ color: 'var(--text3)' }}>{prices[k].plan}, {prices[k].from ? 'starting at ' : ''}{prices[k].yearly ? inr(prices[k].yearly) + ' a year' : ''}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setCount(k, n[k] - 1)} aria-label={`One fewer ${prices[k].label} customer`} className="w-9 h-9 rounded-full text-[24px] font-semibold leading-none flex items-center justify-center pb-[3px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>−</button>
                    <span className="w-9 text-center font-display font-bold text-[20px]" style={{ color: 'var(--text)' }} aria-live="polite">{n[k]}</span>
                    <button type="button" onClick={() => setCount(k, n[k] + 1)} aria-label={`One more ${prices[k].label} customer`} className="w-9 h-9 rounded-full text-[22px] font-semibold leading-none flex items-center justify-center pb-[2px] text-white" style={{ background: 'var(--pink)' }}>+</button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <input type="range" min={0} max={MAXES[k]} value={n[k]} onChange={(e) => setCount(k, Number(e.target.value))} aria-label={`${prices[k].label} customers`} className="flex-1" style={{ accentColor: 'var(--pink)' }} />
                  <span className="min-w-[104px] text-right text-[14px] font-semibold" style={{ color: n[k] ? 'var(--text)' : 'var(--text3)' }}>{inr(per(k))}</span>
                </div>
              </div>
            ))}
            <button type="button" role="switch" aria-checked={own} onClick={() => setOwn(!own)} className="flex items-center gap-3 text-left text-[14px] rounded-[12px] px-4 py-3" style={{ border: '1px solid ' + (own ? 'var(--pink)' : 'var(--border)'), background: own ? 'var(--bg2)' : 'transparent', color: 'var(--text)' }}>
              <span aria-hidden className="relative inline-block w-10 h-6 rounded-full flex-none" style={{ background: own ? 'var(--pink)' : 'var(--border)' }}><span className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white" style={{ left: own ? 19 : 3, transition: 'left .15s' }} /></span>
              <span><b>Sell: they sign up through my own link</b><span className="block text-[12.5px]" style={{ color: 'var(--text3)' }}>+{rates.self_close_bonus} points on every product</span></span>
            </button>
          </div>

          <div className="rounded-[14px] p-6 lg:sticky lg:top-24" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <div className="text-[11.5px] font-semibold tracking-[.1em]" style={{ color: 'var(--text3)' }}>EXAMPLE PARTNER EARNINGS, FIRST YEAR</div>
            <div className="font-display font-extrabold text-[42px] leading-[1.1] mt-1" style={{ color: 'var(--text)' }}>{inr(shown)}</div>
            <p className="text-[12.5px] leading-[1.55] mt-3" style={{ color: 'var(--text3)' }}>Estimate only. Based on list prices, before discounts. Actual rewards are calculated on payments collected after discounts and refunds.</p>
            <a href="#register" className="block text-center font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white mt-5" style={{ background: 'var(--pink)' }}>Start earning: register</a>
          </div>
        </div>
        <p className="text-[12.5px] mt-5" style={{ color: 'var(--text3)' }}>This is an example, not a promise. For full pricing, see the <Link href="/nestlens/pricing" className="underline">pricing page</Link>.</p>
      </div>
    </section>
  )
}

export default function PartnersClient({ prices, initialRates }: { prices: CalcPrices; initialRates: Rates | null }) {
  const [f, setF] = useState({ name: '', organisation: '', email: '', mobile: '', category: '', mode: 'both', country: 'India', state: '', city: '', website: '', note: '', company_site: '' })
  const [products, setProducts] = useState<string[]>([])
  const [agree, setAgree] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rates, setRates] = useState<Rates | null>(initialRates)
  const [counts, setCounts] = useState<Record<string, number>>({ ascent: 10, atlas: 2, orbit: 1, command: 0 })
  useEffect(() => { if (initialRates) return; fetch(RATES_URL).then((r) => (r.ok ? r.json() : null)).then((j) => { if (j && typeof j.ascent === 'number') setRates(j) }).catch(() => undefined) }, [initialRates])
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }))
  const india = f.country === 'India'
  const cityList = india && f.state ? INDIA_STATES[f.state] ?? [] : []
  const typedCity = india && f.state !== '' && (f.city === OTHER_CITY || (f.city !== '' && !cityList.includes(f.city)))

  function pick(category: string, note?: string) {
    set('category', category)
    if (note) set('note', note)
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!f.category) { setError('Please choose how you are registering.'); return }
    if (!f.city.trim() || f.city === OTHER_CITY) { setError('Please enter your city.'); return }
    if (!agree) { setError('Please confirm you have read the rules.'); return }
    if (!privacy) { setError('Please agree to the privacy policy.'); return }
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

          <section className="pt-16 pb-12 grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-10 items-center">
            <div className="max-w-[780px]">
            <div className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-5" style={{ color: 'var(--text3)' }}>LabelNest Partner Network</div>
            <h1 className="font-display font-extrabold tracking-tight leading-[1.06] mb-5" style={{ fontSize: 'clamp(30px,3.9vw,46px)', color: 'var(--text)' }}>
              Bring founders, funds and institutions to LabelNest. <span style={{ fontWeight: 300, color: 'var(--text2)' }}>Earn on every payment they make.</span>
            </h1>
            <p className="text-[17px] leading-[1.7] mb-7 max-w-[640px]" style={{ color: 'var(--text2)' }}>
              The LabelNest Partner Network is for people and organisations who work with startups, funds and institutions. You introduce them to our products. When they pay, you earn a share of what they pay for the first 12 months.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#register" className="font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white" style={{ background: 'var(--pink)' }}>Register as a partner</a>
              <span className="text-[13px]" style={{ color: 'var(--text3)' }}>Open to individuals and to institutions.</span>
            </div>
            </div>
            {rates && (
              <aside className="rounded-[16px] p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }} aria-label="What you earn, at a glance">
                <div className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--text3)' }}>What you earn</div>
                <div className="grid gap-2.5">
                  {(['ascent', 'atlas', 'orbit', 'command'] as const).map((k) => (
                    <div key={k} className="flex items-baseline justify-between gap-3 text-[15px]" style={{ color: 'var(--text)' }}>
                      <span className="font-semibold">{prices[k].label}</span>
                      <span>{rates[k]}% <span style={{ color: 'var(--text3)' }}>&rarr;</span> <b>{rates[k] + rates.self_close_bonus}%</b> <span className="text-[12px]" style={{ color: 'var(--text3)' }}>when you sell</span></span>
                    </div>
                  ))}
                </div>
                <a href="#estimate" className="block text-center font-semibold text-[14.5px] px-5 py-3 rounded-[10px] mt-5" style={{ border: '1px solid var(--pink)', color: 'var(--pink)' }}>Estimate your earnings &darr;</a>
              </aside>
            )}
          </section>

          {rates && <EarningsCalculator rates={rates} prices={prices} n={counts} setN={setCounts} />}
          {rates && <HowYouBringThem onAdd={(k) => setCounts((p) => ({ ...p, [k]: Math.min(MAXES[k], (p[k] || 0) + 1) }))} />}

          <section className="py-10" style={{ borderTop: '1px solid var(--border)' }}>
            <h2 className="font-display font-bold text-[26px] mb-5" style={{ color: 'var(--text)' }}>What you can introduce</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRODUCTS.map((p) => (
                <Link key={p.name} href={p.href} className="rounded-[14px] p-5 flex flex-col gap-1.5" style={card}>
                  <div className="font-display font-bold text-[18px]" style={{ color: 'var(--text)' }}>{p.name}</div>
                  <div className="text-[13px]" style={{ color: 'var(--text3)' }}>For {p.who}</div>
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
                <div className="text-[15px] leading-[1.9]" style={{ color: 'var(--text)' }}>Startup mentors and advisers<br />CA and CS firms<br />Fund administrators and fund setup consultants<br />Fundraising consultants<br />Independent growth partners<br />Existing LabelNest customers</div>
                <p className="text-[13.5px] leading-[1.6] mt-3" style={{ color: 'var(--text2)' }}>You bring your own clients. You do not need to sell: share your link, or register a lead and we follow up.</p>
                <button type="button" onClick={() => pick('customer')} className="mt-4 text-[13.5px] font-semibold" style={{ color: 'var(--pink)' }}>Already a LabelNest customer? Refer and earn →</button>
              </div>
              <div className="rounded-[16px] p-6" style={card}>
                <div className="font-mono text-[10.5px] tracking-[.12em] uppercase mb-3" style={{ color: 'var(--text3)' }}>Institutions</div>
                <div className="text-[15px] leading-[1.9]" style={{ color: 'var(--text)' }}>Incubators and accelerators<br />Universities and innovation cells<br />Startup communities and studios<br />Industry bodies and other institutions</div>
                <p className="text-[13.5px] leading-[1.6] mt-3" style={{ color: 'var(--text2)' }}>Your startups and members get access, and your institution earns the Ascent reward rate on each payment from the startups it brings. Incubators can also run their programme on Orbit free for 18 months when their startups join Ascent. Terms are agreed in writing.</p>
                <button type="button" onClick={() => pick('incubator')} className="mt-4 text-[13.5px] font-semibold" style={{ color: 'var(--pink)' }}>Register your institution →</button>
              </div>
            </div>
            <div className="rounded-[16px] p-6 mt-5 flex flex-col md:flex-row md:items-center gap-4 justify-between" style={card}>
              <div>
                <div className="font-display font-bold text-[18px] mb-1" style={{ color: 'var(--text)' }}>Active angel investors: free</div>
                <p className="text-[14px] leading-[1.6] max-w-[640px]" style={{ color: 'var(--text2)' }}>If you invest actively, join the network at no cost and source deals from us. Free to join. No fee and no obligation. We email you one short agreement to accept.</p>
              </div>
              <button type="button" onClick={() => pick('angel')} className="font-semibold text-[14px] px-5 py-3 rounded-[10px] text-white shrink-0" style={{ background: 'var(--pink)' }}>Join as an angel investor</button>
            </div>
          </section>

          <section className="py-10" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="rounded-[16px] p-6 md:p-7" style={card}>
              <div className="font-mono text-[10.5px] tracking-[.12em] uppercase mb-3" style={{ color: 'var(--text3)' }}>Fund services partners</div>
              <h2 className="font-display font-bold text-[22px] mb-2" style={{ color: 'var(--text)' }}>Work with funds? Earn when they run on NestLens.</h2>
              <p className="text-[14.5px] leading-[1.7] max-w-[720px] mb-3" style={{ color: 'var(--text2)' }}>
                If you serve fund managers as an administrator, setup consultant, fundraising advisor or network, your clients already ask for better portfolio reporting and LP updates. Introduce them to Command, and add Ascent so their portfolio companies send updates straight in. You earn a share of every payment they make.
              </p>
              <ul className="list-none p-0 m-0 mb-4 grid gap-1.5 text-[14px]" style={{ color: 'var(--text)' }}>
                <li className="flex gap-3"><span aria-hidden style={{ color: 'var(--pink)' }}>✓</span><span>Works for funds in India, GIFT City, Singapore, Mauritius, Dubai and beyond.</span></li>
                <li className="flex gap-3"><span aria-hidden style={{ color: 'var(--pink)' }}>✓</span><span>Standard rates, with custom terms for larger partners.</span></li>
                <li className="flex gap-3"><span aria-hidden style={{ color: 'var(--pink)' }}>✓</span><span>Clear ownership: your clients stay your clients.</span></li>
              </ul>
              <button type="button" onClick={() => pick('consultant', 'Fund services partner (administrator, setup consultant, fundraising advisor or network).')} className="font-semibold text-[14px] px-5 py-3 rounded-[10px] text-white" style={{ background: 'var(--pink)' }}>Register as a fund services partner</button>
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
                <div className="font-mono text-[10.5px] tracking-[.12em] uppercase mb-2" style={{ color: 'var(--text3)' }}>Sell: you run the sale, using your link</div>
                <p className="text-[14px] leading-[1.6]" style={{ color: 'var(--text2)' }}>You run the sales process and close. The customer signs up through your personal link and is recorded as yours. You earn the higher rate in the table below.</p>
              </div>
              <div className="rounded-[14px] p-5" style={card}>
                <div className="font-mono text-[10.5px] tracking-[.12em] uppercase mb-2" style={{ color: 'var(--text3)' }}>Refer: you introduce, we close</div>
                <p className="text-[14px] leading-[1.6]" style={{ color: 'var(--text2)' }}>Register a lead with the company, the contact and the product. LabelNest runs the demo and the sale and closes. You earn the base rate in the table below.</p>
              </div>
            </div>
          </section>

          <section className="py-10" style={{ borderTop: '1px solid var(--border)' }}>
            <h2 className="font-display font-bold text-[26px] mb-3" style={{ color: 'var(--text)' }}>What you earn</h2>
            <p className="text-[15.5px] leading-[1.7] max-w-[680px]" style={{ color: 'var(--text2)' }}>
              You earn a percentage of every payment the customer makes during the first 12 months from their first payment, including renewals in that period. After 12 months the reward for that customer ends. It is worked out on payments we actually collect, excluding GST, after discounts and refunds. A reward is released only after the 30 day refund period ends without a refund. Only paying customers earn a reward: a customer whose first invoice is paid.
            </p>
            {rates && (
              <div className="mt-5 max-w-[680px] rounded-[14px] overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="grid grid-cols-3 text-[12px] font-semibold px-5 py-3" style={{ background: 'var(--bg2)', color: 'var(--text2)' }}><div>Product</div><div>Refer: LabelNest closes the sale</div><div>Sell: you close with your own link</div></div>
                {([['Ascent', rates.ascent], ['Atlas', rates.atlas], ['Orbit', rates.orbit], ['Command', rates.command]] as const).map(([n, r]) => (
                  <div key={n} className="grid grid-cols-3 px-5 py-3 text-[14.5px]" style={{ borderTop: '1px solid var(--border)', color: 'var(--text)' }}><div className="font-semibold">{n}</div><div>{r}%</div><div>{r + rates.self_close_bonus}%</div></div>
                ))}
              </div>
            )}
            {rates && (
              <p className="text-[14px] leading-[1.65] mt-4 max-w-[680px] rounded-[12px] px-4 py-3" style={{ background: 'var(--bg2)', color: 'var(--text)' }}>
                <b>Worked example.</b> A customer pays {inr(24999)} for Ascent, before GST. After a 10% discount we collect {inr(22499)}. If LabelNest closes the sale (Refer), your {rates.ascent}% reward is {inr(22499 * rates.ascent / 100)}. It is released 30 days after the payment, if there has been no refund, and paid in the next monthly payout.
              </p>
            )}
            <p className="text-[13.5px] leading-[1.65] mt-3 max-w-[680px]" style={{ color: 'var(--text3)' }}>
              {rates ? `When you sell and the customer signs up through your own referral link, you earn ${rates.self_close_bonus} percentage points more. ` : 'The percentage is set per product, and is higher when you sell and the customer signs up through your own referral link. '}Payouts are made once a month, around the 10th, for rewards released in the previous month. Anything under Rs 1,000 rolls over to the next month. Indian partners give their PAN, and GSTIN if registered; tax is deducted at source where the law requires it. Everything happens online: you register, read and accept the agreement, and sign in to your own dashboard. No call is needed, and you can book time with us if you would rather talk.
            </p>
          </section>

          <section className="py-10" style={{ borderTop: '1px solid var(--border)' }}>
            <h2 className="font-display font-bold text-[26px] mb-5" style={{ color: 'var(--text)' }}>The rules</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 list-none p-0 m-0">
              {RULES.map((r) => (<li key={r} className="flex gap-3 text-[14.5px] leading-[1.6]" style={{ color: 'var(--text)' }}><span aria-hidden style={{ color: 'var(--pink)' }}>✓</span><span>{r}</span></li>))}
            </ul>
            <p className="text-[13.5px] leading-[1.65] mt-4 max-w-[680px]" style={{ color: 'var(--text3)' }}>If your professional rules restrict referral fees, tell us and we will agree another arrangement. Questions about the programme: partnership@labelnest.in. You read the full partner agreement before you accept it, and it is sent to you when you are approved.</p>
          </section>

          <section className="py-10" style={{ borderTop: '1px solid var(--border)' }} aria-labelledby="faq-h">
            <h2 id="faq-h" className="font-display font-bold text-[26px] mb-5" style={{ color: 'var(--text)' }}>Questions partners ask</h2>
            <div className="grid gap-3 max-w-[820px]">
              {FAQ.map((q) => (
                <details key={q.q} className="rounded-[12px] px-5 py-4" style={card}>
                  <summary className="cursor-pointer font-semibold text-[15px]" style={{ color: 'var(--text)' }}>{q.q}</summary>
                  <p className="text-[14px] leading-[1.65] mt-2" style={{ color: 'var(--text2)' }}>{q.a}</p>
                </details>
              ))}
            </div>
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
                    <span>I have read the rules above, including that rewards are paid only on collected payments after the refund period and that every arrangement is confirmed in writing.</span>
                  </label>
                  <label className="flex gap-3 items-start text-[13.5px] leading-[1.55]" style={{ color: 'var(--text)' }}>
                    <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} className="mt-1" />
                    <span>I agree to LabelNest using these details to review my application, as described in the <Link href="/legal/privacy" className="underline">privacy policy</Link>.</span>
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
