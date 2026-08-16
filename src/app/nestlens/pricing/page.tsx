import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens/pricing', {
    title: 'NestLens Pricing — Intelligence, Exchange, Capital Readiness',
    description: 'Full pricing for all three NestLens modules — Intelligence, Exchange, and Capital Readiness — plus Enterprise and Bundle options.',
  })
}

// Real published tiers only — Enterprise/Custom entries have no fixed price and are
// intentionally excluded from structured Offer data (schema.org Offer expects a price).
const PRICING_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  isPartOf: { '@id': 'https://labelnest.in/nestlens#software' },
  name: 'NestLens',
  offers: [
    { '@type': 'Offer', name: 'Intelligence — Individual', price: '14999', priceCurrency: 'INR', priceValidUntil: '2027-08-16', url: 'https://labelnest.in/nestlens/pricing', category: 'Intelligence' },
    { '@type': 'Offer', name: 'Intelligence — Core', price: '54999', priceCurrency: 'INR', priceValidUntil: '2027-08-16', url: 'https://labelnest.in/nestlens/pricing', category: 'Intelligence' },
    { '@type': 'Offer', name: 'Intelligence — Growth', price: '104999', priceCurrency: 'INR', priceValidUntil: '2027-08-16', url: 'https://labelnest.in/nestlens/pricing', category: 'Intelligence' },
    { '@type': 'Offer', name: 'Intelligence — Pro', price: '164999', priceCurrency: 'INR', priceValidUntil: '2027-08-16', url: 'https://labelnest.in/nestlens/pricing', category: 'Intelligence' },
    { '@type': 'Offer', name: 'Exchange — Buyer', price: '0', priceCurrency: 'USD', priceValidUntil: '2027-08-16', url: 'https://labelnest.in/nestlens/pricing', category: 'Exchange' },
    { '@type': 'Offer', name: 'Exchange — Seller', price: '199', priceCurrency: 'USD', priceValidUntil: '2027-08-16', url: 'https://labelnest.in/nestlens/pricing', category: 'Exchange' },
    { '@type': 'Offer', name: 'Capital Readiness — Founder (India)', price: '999', priceCurrency: 'INR', priceValidUntil: '2027-08-16', url: 'https://labelnest.in/nestlens/pricing', category: 'Capital Readiness' },
    { '@type': 'Offer', name: 'Capital Readiness — Founder (Global)', price: '30', priceCurrency: 'USD', priceValidUntil: '2027-08-16', url: 'https://labelnest.in/nestlens/pricing', category: 'Capital Readiness' },
    { '@type': 'Offer', name: 'Capital Readiness — Fund', price: '45', priceCurrency: 'USD', priceValidUntil: '2027-08-16', url: 'https://labelnest.in/nestlens/pricing', category: 'Capital Readiness' },
  ],
}

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: 'NestLens', path: '/nestlens' },
  { name: 'Pricing', path: '/nestlens/pricing' },
])

export default function NestLensPricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICING_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <Nav />
      <NestLensModuleNav />
      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section style={{ padding: '64px 48px 48px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Pricing</div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--text)', marginBottom: 16 }}>Three modules, priced independently.</h1>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>Subscribe only to what you need — Intelligence, Exchange, or Capital Readiness. Every plan is available monthly or annually where applicable. Enterprise and Bundle pricing on request.</p>
          </div>
        </section>

        {/* INTELLIGENCE */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 800, color: 'var(--text)' }}>Intelligence</h2>
              <Link href="/nestlens/intelligence" style={{ fontSize: 12.5, color: '#2563EB' }}>What it does →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
              {[
                { name: 'Individual', priceMo: '₹14,999', priceYr: '₹1,50,000/yr', sub: '1 seat · 50 credits/mo · 250 firm unlocks/yr' },
                { name: 'Core', priceMo: '₹54,999', priceYr: '₹6,00,000/yr', sub: '2 seats · 100 credits/mo · 1,500 firm unlocks/yr' },
                { name: 'Growth', priceMo: '₹1,04,999', priceYr: '₹12,00,000/yr', sub: '3 seats · 200 credits/mo · 1 data room' },
                { name: 'Pro', priceMo: '₹1,64,999', priceYr: '₹18,00,000/yr', sub: '5 seats · 400 credits/mo · 2 data rooms · Priority support', popular: true },
                { name: 'Enterprise', priceMo: 'Custom', priceYr: '', sub: 'Custom seats, credits & SLA' },
              ].map(t => (
                <div key={t.name} style={{ background: 'var(--surface)', border: `1px solid ${t.popular ? '#2563EB' : 'var(--border)'}`, borderRadius: 14, padding: 20, position: 'relative' }}>
                  {t.popular && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#2563EB', color: '#fff', fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14.5, color: 'var(--text)', marginBottom: 8 }}>{t.name}</div>
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 800, color: t.popular ? '#2563EB' : 'var(--text)' }}>{t.priceMo}</span>
                    {t.priceMo !== 'Custom' && <span style={{ fontSize: 11, color: 'var(--text3)' }}>/mo</span>}
                  </div>
                  {t.priceYr && <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8 }}>{t.priceYr}</div>}
                  <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.5 }}>{t.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXCHANGE */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 800, color: 'var(--text)' }}>Exchange</h2>
              <Link href="/nestlens/exchange" style={{ fontSize: 12.5, color: '#E91E8C' }}>What it does →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
              {[
                { name: 'Buyer', price: 'Free', unit: '', sub: 'Browse all seller profiles and project briefs free. Pay per project via credits — no subscription needed.' },
                { name: 'Seller', price: '$199', unit: '/yr', sub: 'Active seller listing · 15 applications/mo included · quarterly rollover up to 45 credits · INR equivalent: contact us', popular: true },
                { name: 'Enterprise', price: 'Custom', unit: '', sub: 'High-volume buyer or seller, custom credit arrangements' },
              ].map(t => (
                <div key={t.name} style={{ background: 'var(--surface)', border: `1px solid ${t.popular ? '#E91E8C' : 'var(--border)'}`, borderRadius: 14, padding: 22, position: 'relative' }}>
                  {t.popular && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#E91E8C', color: '#fff', fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 8 }}>{t.name}</div>
                  <div style={{ marginBottom: 10 }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 800, color: t.popular ? '#E91E8C' : 'var(--text)' }}>{t.price}</span>
                    <span style={{ fontSize: 12, color: 'var(--text3)' }}>{t.unit}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.55 }}>{t.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPITAL READINESS */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 800, color: 'var(--text)' }}>Capital Readiness</h2>
              <Link href="/nestlens/capital" style={{ fontSize: 12.5, color: '#10B981' }}>What it does →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
              {[
                { name: 'Founder — India', price: '₹999', unit: '/mo', sub: '₹9,999/yr · 1 data room · full legal checklist · investor fit scoring · templates included', popular: true },
                { name: 'Founder — Global', price: '$30', unit: '/mo', sub: '$299/yr · 1 data room · full legal checklist · investor fit scoring · templates included' },
                { name: 'Fund', price: '$45', unit: '/mo', sub: '$500/yr · 1 fund data room included · extra rooms $300/yr or $25/mo' },
                { name: 'Enterprise', price: 'Custom', unit: '', sub: 'Cohort access for accelerators and incubator programmes' },
              ].map(t => (
                <div key={t.name} style={{ background: 'var(--surface)', border: `1px solid ${t.popular ? '#10B981' : 'var(--border)'}`, borderRadius: 14, padding: 20, position: 'relative' }}>
                  {t.popular && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#10B981', color: '#fff', fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 8 }}>{t.name}</div>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: t.popular ? '#10B981' : 'var(--text)' }}>{t.price}</span>
                    <span style={{ fontSize: 11, color: 'var(--text3)' }}>{t.unit}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.5 }}>{t.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENTERPRISE & BUNDLE */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Enterprise & Bundle</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)' }}>Institutional and cross-module needs</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, marginBottom: 32 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 8 }}>Enterprise</div>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65 }}>Custom seats, credit volumes, entity access, and SLA agreements — best for institutional funds, research firms, and accelerators with large cohorts.</p>
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 8 }}>Bundle</div>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65 }}>Intelligence + Capital Readiness combined at a negotiated rate — best for ecosystem partners and VC funds running portfolio founder programmes.</p>
              </div>
            </div>
            <div style={{ textAlign: 'center', display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://nestlens.labelnest.in/enterprise-enquiry" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563EB', color: '#fff', fontSize: 14, fontWeight: 600, padding: '12px 26px', borderRadius: 10 }}>Enquire about Enterprise or Bundle ↗</a>
              <Link href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14, fontWeight: 500, padding: '12px 26px', borderRadius: 10, border: '1px solid rgba(255,255,255,.1)' }}>Talk to the team</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '64px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', maxWidth: 520, margin: '0 auto 12px' }}>Ready to open NestLens?</h2>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.7 }}>Subscribe from inside the app — pick your plan and pay in INR or USD depending on the module.</p>
            <a href="https://nestlens.labelnest.in/pricing" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563EB', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Subscribe on NestLens ↗</a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
