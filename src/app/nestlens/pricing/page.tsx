import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens/pricing', {
    title: 'NestLens Pricing — Atlas, Exchange, Capital Readiness',
    description: 'Full pricing for all three NestLens modules — Atlas, Exchange, and Capital Readiness — plus Enterprise and Bundle options.',
  })
}

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: 'NestLens', path: '/nestlens' },
  { name: 'Pricing', path: '/nestlens/pricing' },
])

// Fetched server-side from NestLens's own public, no-auth plans API — the
// same endpoint the in-app checkout modal uses (server/routes/public.ts).
// This page used to keep its own hand-typed copy of every tier's name and
// price, which is exactly how it drifted: "Individual"/"Core" were stale
// names from before a 2026-08-09 correction in the live catalog, and a
// 2026-08-20 pricing-model change (firm-count tiers, real discounts) would
// otherwise have needed a second manual edit here too. A Server Component
// fetch avoids CORS entirely (server-to-server, not a browser request) and
// revalidates hourly so a plan change in the admin panel reaches this page
// without a redeploy.
interface ApiPlan {
  name: string; priceINR?: number; priceUSD?: number | string;
  monthlyPriceINR?: number; monthlyPriceUSD?: number;
  originalPriceINR?: number | string | null; originalPriceUSD?: number | string | null;
  seats?: number; creditsPerMonth?: number; firmUnlocksPerYear?: number;
  observatoryArticlesIncluded?: number | null;
  description?: string; popular?: boolean;
}
interface ApiPlans { intelligence: Record<string, ApiPlan>; exchange: Record<string, ApiPlan>; cr: Record<string, ApiPlan> }

interface Tier {
  key: string; name: string; priceMo: string; priceYr: string; sub: string; popular?: boolean;
}

function fmtInr(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`
}
function fmtUsd(n: number): string {
  return `$${n.toLocaleString('en-US')}`
}

function tierFrom(key: string, p: ApiPlan | undefined, opts: { annualOnly?: boolean } = {}): Tier | null {
  if (!p) return null
  const useUsd = !p.priceINR && !!p.priceUSD
  const annual = useUsd ? Number(p.priceUSD) || 0 : Number(p.priceINR) || 0
  const monthly = useUsd ? Number(p.monthlyPriceUSD) || annual : Number(p.monthlyPriceINR) || annual
  const fmt = useUsd ? fmtUsd : fmtInr
  const original = useUsd
    ? (p.originalPriceUSD ? Number(p.originalPriceUSD) : null)
    : (p.originalPriceINR ? Number(p.originalPriceINR) : null)
  const discountNote = original && original > annual ? ` (was ${fmt(original)})` : ''
  return {
    key, name: p.name,
    priceMo: annual === 0 ? 'Free' : opts.annualOnly ? `${fmt(annual)}${discountNote}` : fmt(monthly),
    priceYr: annual === 0 || opts.annualOnly ? '' : `${fmt(annual)}/yr${discountNote}`,
    sub: (p.description ?? '').trim(),
    popular: !!p.popular,
  }
}

async function getPlans(): Promise<ApiPlans | null> {
  try {
    const res = await fetch('https://nestlens.labelnest.in/api/public/plans', { next: { revalidate: 3600 } })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function NestLensPricingPage() {
  const plans = await getPlans()

  const intelTiers = plans
    ? (['pre_starter', 'starter', 'growth'] as const)
        .map(k => tierFrom(k, plans.intelligence[k]))
        .filter((t): t is Tier => !!t)
    : []
  const exchangeBuyer = plans ? tierFrom('buyer', plans.exchange['buyer']) : null
  const exchangePriority = plans ? tierFrom('priority', plans.exchange['priority'], { annualOnly: true }) : null
  const crFounder = plans ? tierFrom('founder_paid_solo', plans.cr['founder_paid_solo'], { annualOnly: true }) : null
  const crFund = plans ? tierFrom('fund_paid', plans.cr['fund_paid'], { annualOnly: true }) : null
  const crCohort = plans ? tierFrom('founder_paid_cohort', plans.cr['founder_paid_cohort'], { annualOnly: true }) : null
  const crProgramme = plans ? tierFrom('programme_management', plans.cr['programme_management']) : null

  // Real published tiers only — Enterprise/Custom entries have no fixed price and are
  // intentionally excluded from structured Offer data (schema.org Offer expects a price).
  const offers = [
    ...intelTiers.map(t => ({ '@type': 'Offer', name: `Atlas — ${t.name}`, price: String(Math.round(Number((t.priceYr || t.priceMo).replace(/[^0-9.]/g, '')) || 0)), priceCurrency: 'INR', priceValidUntil: '2027-08-20', url: 'https://labelnest.in/nestlens/pricing', category: 'Atlas' })),
    exchangePriority ? { '@type': 'Offer', name: 'Exchange — Priority', price: '199', priceCurrency: 'USD', priceValidUntil: '2027-08-20', url: 'https://labelnest.in/nestlens/pricing', category: 'Exchange' } : null,
    crFounder ? { '@type': 'Offer', name: 'Capital Readiness — Founder Data Room', price: String(plans?.cr['founder_paid_solo']?.priceINR ?? ''), priceCurrency: 'INR', priceValidUntil: '2027-08-20', url: 'https://labelnest.in/nestlens/pricing', category: 'Capital Readiness' } : null,
    crFund ? { '@type': 'Offer', name: 'Capital Readiness — Fund Data Room', price: String(plans?.cr['fund_paid']?.priceUSD ?? ''), priceCurrency: 'USD', priceValidUntil: '2027-08-20', url: 'https://labelnest.in/nestlens/pricing', category: 'Capital Readiness' } : null,
  ].filter(Boolean)

  const PRICING_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    isPartOf: { '@id': 'https://labelnest.in/nestlens#software' },
    name: 'NestLens',
    offers,
  }

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
            <p style={{ fontSize: 15.5, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>Subscribe only to what you need — Atlas, Exchange, or Capital Readiness. Every plan is available monthly or annually where applicable. Enterprise and Bundle pricing on request.</p>
          </div>
        </section>

        {!plans && (
          <section style={{ padding: '24px 48px', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'var(--text3)' }}>Live pricing is temporarily unavailable — please check back shortly, or subscribe directly on NestLens.</p>
          </section>
        )}

        {/* INTELLIGENCE */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 800, color: 'var(--text)' }}>Atlas</h2>
              <Link href="/nestlens/intelligence" style={{ fontSize: 12.5, color: '#2563EB' }}>What it does →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
              {[
                ...intelTiers.map(t => ({ name: t.name, priceMo: t.priceMo, priceYr: t.priceYr, sub: t.sub, popular: t.popular })),
                { name: 'Enterprise', priceMo: 'Custom', priceYr: '', sub: '1,000+ firms · custom seats, credits & SLA · all Observatory reports included', popular: false },
              ].map(t => (
                <div key={t.name} style={{ background: 'var(--surface)', border: `1px solid ${t.popular ? '#2563EB' : 'var(--border)'}`, borderRadius: 14, padding: 20, position: 'relative' }}>
                  {t.popular && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#2563EB', color: '#fff', fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14.5, color: 'var(--text)', marginBottom: 8 }}>{t.name}</div>
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 800, color: t.popular ? '#2563EB' : 'var(--text)' }}>{t.priceMo}</span>
                    {t.priceMo !== 'Custom' && t.priceMo !== 'Free' && <span style={{ fontSize: 11, color: 'var(--text3)' }}>/mo</span>}
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
                { name: exchangeBuyer?.name ?? 'Free', price: exchangeBuyer?.priceMo ?? 'Free', unit: '', sub: exchangeBuyer?.sub || 'Browse all seller profiles and project briefs free. Pay per project via credits — no subscription needed.' },
                { name: exchangePriority?.name ?? 'Priority', price: exchangePriority?.priceMo ?? '$199', unit: '/yr', sub: exchangePriority?.sub || 'Active seller listing · 15 applications/mo included · quarterly rollover up to 45 credits', popular: true },
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
                { name: crProgramme?.name ?? 'Programme Management', price: crProgramme?.priceMo ?? '₹24,999', unit: '/mo', sub: crProgramme?.sub || '₹2,49,999/yr · up to 1,00,000 applications · full screening & review workflow' },
                { name: crFounder?.name ?? 'Founder Data Room', price: crFounder?.priceMo ?? '₹8,000', unit: '', sub: crFounder?.sub || 'All templates included · 1 complimentary strategy call · priority support', popular: true },
                { name: crFund?.name ?? 'Fund Data Room', price: crFund?.priceMo ?? '$599', unit: '', sub: crFund?.sub || '2 portfolio company data rooms complimentary' },
                { name: crCohort?.name ?? 'Cohort / Group', price: crCohort?.priceMo ?? '₹4,999', unit: '', sub: crCohort?.sub || 'Cohort of 25 · +₹4,999 per additional founder beyond 25' },
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
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 8 }}>Fund Bundle</div>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65 }}>1 Fund Data Room + 5 Portfolio Company Data Rooms + Atlas (2,000 data credits) + Exchange for every connected member, at a negotiated rate — best for VC funds running portfolio founder programmes.</p>
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
