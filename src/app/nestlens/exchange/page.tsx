import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'NestLens Exchange — Buy, Sell, and License Any Structured Dataset', description: 'NestLens Exchange is a universal data marketplace. Buy, sell, or license any structured dataset. KYC verified sellers, escrow-protected transactions, QC scored.' }

const CATEGORIES = [
  ['📊','Datasets','Company firmographics, fund performance, deal flow, financial data, and market intelligence.'],
  ['📋','Research and Reports','Sector analysis, market research, ESG scores, and proprietary research from verified providers.'],
  ['🤖','AI Training Data','Labelled datasets, annotation outputs, and domain-specific training data for ML and AI.'],
  ['🎵','Audio Data','Speech datasets, audio classification data, and transcribed audio for model training.'],
  ['🎬','Video Data','Annotated video datasets, classification outputs, and structured video intelligence.'],
  ['📝','Text and NLP','Labelled text corpora, sentiment datasets, entity extraction outputs, and NLP training sets.'],
  ['📄','OCR and Documents','Extracted document data, scanned record outputs, and structured document intelligence.'],
  ['🌍','Financial and Geospatial','Financial data feeds, geospatial datasets, and location intelligence.'],
]

const FEATURED = [
  { seller: 'LabelNest', title: 'India PCVC Deal Flow — Q4 2025', tags: ['Company Intelligence','Data Asset','India'] },
  { seller: 'LabelNest', title: 'GP Intelligence Pack — Top 100 Indian PE Firms', tags: ['Company Intelligence','Data Asset','India'] },
  { seller: 'LabelNest', title: 'LP Directory — Indian Institutional Investors', tags: ['Company Intelligence','Data Asset','India'] },
  { seller: 'Verdant Research', title: 'ESG Scores — Indian Listed Companies 2025', tags: ['Research Reports','Data Asset','ESG'] },
]

const MODULE_NAV = [{href:'/nestlens/intelligence',label:'Intelligence'},{href:'/nestlens/exchange',label:'Exchange',active:true},{href:'/nestlens/capital',label:'Capital Readiness'}]

export default function NestLensExchangePage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>
        {/* Module nav */}
        <div className="border-b px-8" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="max-w-[1240px] mx-auto flex gap-1 py-2">
            {MODULE_NAV.map(t => (
              <Link key={t.href} href={t.href}
                className="font-medium text-[13px] px-4 py-2 rounded-lg transition-all"
                style={{ color: (t as any).active ? 'var(--pink)' : 'var(--text2)', background: (t as any).active ? 'var(--surface)' : 'transparent' }}>
                {t.label}
              </Link>
            ))}
          </div>
        </div>

        {/* HERO */}
        <section className="px-8 py-20 relative overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'rgba(233,30,140,0.08)', filter: 'blur(90px)' }} />
          <div className="max-w-[1240px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-5" style={{ color: 'var(--text3)' }}>NestLens Exchange · Live marketplace</div>
              <h1 className="font-display font-extrabold tracking-tight leading-[1.04] mb-5"
                style={{ fontSize: 'clamp(38px,5.2vw,62px)', color: 'var(--text)' }}>
                Buy. Sell. License.
                <br />
                <span style={{ background: 'linear-gradient(100deg,#E91E8C,#C026D3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Any structured data.
                </span>
              </h1>
              <p className="text-[clamp(15px,1.8vw,18px)] leading-[1.74] mb-8" style={{ color: 'var(--text2)' }}>
                A <strong style={{ color: 'var(--text)', fontWeight: 600 }}>universal data marketplace</strong> — not limited to private markets. Datasets, AI training data, research reports, annotation services, audio, video, financial data, geospatial data. If it is structured and has value, it belongs here.
              </p>
              <div className="flex gap-3 flex-wrap mb-6">
                <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white"
                  style={{ background: 'var(--pink)' }}>Browse the Exchange ↗</a>
                <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-[14.5px] px-6 py-3.5 rounded-[10px] border"
                  style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'var(--bord2)' }}>List your data</a>
              </div>
              <div className="flex gap-3 flex-wrap">
                {[['var(--green)','KYC Verified sellers'],['var(--blue)','Escrow Protected'],['var(--orange)','QC Scored datasets']].map(([c,t]) => (
                  <div key={t as string} className="inline-flex items-center gap-2 text-[12px] font-medium px-3.5 py-2 rounded-full border"
                    style={{ color: 'var(--text2)', background: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c as string }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Mini exchange mockup */}
            <div className="rounded-[18px] overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between px-4 py-3.5 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="font-display font-bold text-[13px]" style={{ color: 'var(--text)' }}>Exchange Home</div>
                <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[.08em] uppercase" style={{ color: 'var(--green)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green)' }} />Live
                </div>
              </div>
              <div className="p-3 flex flex-col gap-2">
                {FEATURED.map(f => (
                  <div key={f.title} className="flex items-start justify-between gap-3 p-3 rounded-[10px]"
                    style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                    <div>
                      <div className="font-mono text-[9px] tracking-[.08em] uppercase mb-1" style={{ color: 'var(--pink)' }}>{f.seller}</div>
                      <div className="font-medium text-[12.5px] mb-1.5" style={{ color: 'var(--text)' }}>{f.title}</div>
                      <div className="flex gap-1.5 flex-wrap">
                        {f.tags.map(t => <span key={t} className="font-mono text-[8.5px] tracking-[.06em] px-1.5 py-0.5 rounded" style={{ background: 'var(--bg3)', color: 'var(--text3)' }}>{t}</span>)}
                      </div>
                    </div>
                    <div className="font-display font-extrabold text-[13px] flex-shrink-0" style={{ color: 'var(--text)' }}>INR</div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t flex gap-4" style={{ borderColor: 'var(--border)' }}>
                {['✅ KYC Verified','🔒 Escrow','⭐ QC Scored'].map(t => (
                  <span key={t} className="font-mono text-[8.5px] tracking-[.07em] uppercase" style={{ color: 'var(--text3)' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="px-8 py-16 border-t" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--pink)' }}>What you can buy and sell</div>
            <h2 className="font-display font-extrabold tracking-tight mb-10" style={{ fontSize: 'clamp(24px,3.5vw,40px)', color: 'var(--text)' }}>Every structured data type. One marketplace.</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CATEGORIES.map(([icon,name,desc]) => (
                <div key={name as string} className="rounded-[13px] p-5 transition-all hover:-translate-y-1" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="text-[24px] mb-3">{icon}</div>
                  <div className="font-display font-bold text-[13.5px] mb-2" style={{ color: 'var(--text)' }}>{name}</div>
                  <div className="text-[12px] leading-[1.5]" style={{ color: 'var(--text2)' }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section className="px-8 py-16">
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--pink)' }}>The LabelNest Trust Layer</div>
            <h2 className="font-display font-extrabold tracking-tight mb-10" style={{ fontSize: 'clamp(24px,3.5vw,40px)', color: 'var(--text)' }}>Every dataset verified. Every transaction protected.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: '✅', color: '#10B981', name: 'KYC Verified Sellers', desc: 'Every seller has completed identity and business verification before any listing goes live. You know exactly who you are buying from.' },
                { icon: '🔒', color: '#2563EB', name: 'Escrow Protected Transactions', desc: 'Payment held in escrow until delivery is confirmed. No upfront risk for buyers, guaranteed payment for sellers on delivery.' },
                { icon: '⭐', color: '#F97316', name: 'QC Scored Datasets', desc: 'Every dataset carries a quality score based on completeness, recency, methodology transparency, and provenance documentation.' },
              ].map(t => (
                <div key={t.name} className="rounded-[16px] p-7 text-center transition-all hover:-translate-y-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="text-[36px] mb-4">{t.icon}</div>
                  <div className="font-display font-extrabold text-[16px] mb-3" style={{ color: 'var(--text)' }}>{t.name}</div>
                  <div className="text-[13px] leading-[1.65]" style={{ color: 'var(--text2)' }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 py-16 border-t text-center" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto">
            <h2 className="font-display font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(24px,3.5vw,40px)', color: 'var(--text)' }}>
              Browse all listings on Exchange
            </h2>
            <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white"
              style={{ background: 'var(--pink)' }}>Open Exchange ↗</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
