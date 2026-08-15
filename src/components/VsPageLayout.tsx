import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

type Verdict = 'win' | 'mid' | 'no'
type VsCategory = 'intelligence' | 'capital-readiness' | 'fund-data-room' | 'exchange' | 'nesthr'
interface TableRow {
  feature: string
  competitor: { text: string; verdict: Verdict }
  labelnest: { text: string; verdict: Verdict }
}
interface Cta { href: string; label: string; external?: boolean }

export interface VsPageData {
  slug: string
  category: VsCategory
  competitorName: string
  ourName: string // 'LabelNest' or 'Capital Readiness'
  h1: string
  subhead: string
  primaryCta: Cta
  secondaryCta: Cta
  tldrHeading: string
  tldrLeftLabel: string
  tldrLeftPoints: string[]
  tldrRightLabel: string
  tldrRightPoints: string[]
  tableRows: TableRow[]
  calloutTitle: string
  calloutBody: string
  extra?: { tag: string; heading: string; body: string }
  finalTag: string
  finalHeading: string
  finalBody: string
  finalPrimaryCta: Cta
  finalSecondaryCta: Cta
}

// Single source of truth for cross-linking + sitemap category grouping. Every new
// /vs/[slug] page must add itself here, or it won't show up in "Also compare" on any
// page (including its own list of who links back to it).
export const ALL_VS_PAGES: { slug: string; label: string; category: VsCategory }[] = [
  { slug: 'preqin', label: 'LabelNest vs Preqin', category: 'intelligence' },
  { slug: 'pitchbook', label: 'LabelNest vs PitchBook', category: 'intelligence' },
  { slug: 'docsend', label: 'Capital Readiness vs DocSend', category: 'capital-readiness' },
  { slug: 'carta', label: 'Capital Readiness vs Carta', category: 'capital-readiness' },
  { slug: 'datarade', label: 'NestLens Exchange vs Datarade', category: 'exchange' },
  { slug: 'neudata', label: 'NestLens vs Neudata', category: 'exchange' },
  { slug: 'dakota', label: 'Capital Readiness vs Dakota', category: 'fund-data-room' },
  { slug: 'cb-insights', label: 'LabelNest vs CB Insights', category: 'intelligence' },
  { slug: 'crunchbase', label: 'LabelNest vs Crunchbase', category: 'intelligence' },
  { slug: 'dealroom', label: 'LabelNest vs Dealroom', category: 'intelligence' },
  { slug: 'capital-iq', label: 'LabelNest vs S&P Capital IQ', category: 'intelligence' },
  { slug: 'bloomberg', label: 'LabelNest vs Bloomberg Terminal', category: 'intelligence' },
  { slug: 'tracxn', label: 'LabelNest vs Tracxn', category: 'intelligence' },
  { slug: 'venture-intelligence', label: 'LabelNest vs Venture Intelligence', category: 'intelligence' },
  { slug: 'sourcescrub', label: 'LabelNest vs SourceScrub', category: 'intelligence' },
  { slug: 'grata', label: 'LabelNest vs Grata', category: 'intelligence' },
  { slug: 'factset', label: 'LabelNest vs FactSet', category: 'intelligence' },
]

const VERDICT_MARK: Record<Verdict, { symbol: string; color: string }> = {
  win: { symbol: '✓', color: '#10B981' },
  mid: { symbol: '~', color: '#F97316' },
  no: { symbol: '×', color: '#EF4444' },
}

function CtaButton({ cta, primary }: { cta: Cta; primary?: boolean }) {
  const style = primary
    ? { display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E91E8C', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11, textDecoration: 'none' }
    : { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)', textDecoration: 'none' }
  return cta.external
    ? <a href={cta.href} target="_blank" rel="noopener noreferrer" style={style}>{cta.label}</a>
    : <Link href={cta.href} style={style}>{cta.label}</Link>
}

const MAX_ALSO_COMPARE = 6

export default function VsPageLayout(d: VsPageData) {
  const rest = ALL_VS_PAGES.filter(p => p.slug !== d.slug)
  const sameCategory = rest.filter(p => p.category === d.category)
  const otherPages = sameCategory.length >= MAX_ALSO_COMPARE
    ? sameCategory.slice(0, MAX_ALSO_COMPARE)
    : [...sameCategory, ...rest.filter(p => p.category !== d.category)].slice(0, MAX_ALSO_COMPARE)

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Comparison · Updated July 2026</div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(34px,4.5vw,52px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.06, color: 'var(--text)', marginBottom: 16 }}>{d.h1}</h1>
            <p style={{ fontSize: 17, lineHeight: 1.72, color: 'var(--text2)', maxWidth: 640, marginBottom: 24 }}>{d.subhead}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <CtaButton cta={d.primaryCta} primary />
              <CtaButton cta={d.secondaryCta} />
            </div>
          </div>
        </section>

        {/* TL;DR */}
        <section style={{ padding: '56px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>TL;DR</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 20 }}>{d.tldrHeading}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 22 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 10 }}>{d.tldrLeftLabel}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {d.tldrLeftPoints.map((p, i) => (
                    <div key={i} style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.6, display: 'flex', gap: 8 }}>
                      <span style={{ color: '#2563EB', flexShrink: 0 }}>✓</span>{p}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'var(--surface)', border: '2px solid rgba(233,30,140,.3)', borderRadius: 14, padding: 22 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#E91E8C', marginBottom: 10 }}>{d.tldrRightLabel}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {d.tldrRightPoints.map((p, i) => (
                    <div key={i} style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.6, display: 'flex', gap: 8 }}>
                      <span style={{ color: '#E91E8C', flexShrink: 0 }}>✓</span>{p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section style={{ padding: '56px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Full comparison</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 20 }}>Feature by feature</h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: 560, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, borderCollapse: 'separate', borderSpacing: 0, overflow: 'hidden' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '16px 20px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', textAlign: 'left', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>Feature</th>
                    <th style={{ padding: '16px 20px', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 14.5, color: 'var(--text)', textAlign: 'left', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>{d.competitorName}</th>
                    <th style={{ padding: '16px 20px', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 14.5, color: '#E91E8C', textAlign: 'left', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>{d.ourName}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.tableRows.map((row, i) => (
                    <tr key={i}>
                      <td style={{ padding: '14px 20px', fontSize: 13.5, fontWeight: 600, color: 'var(--text)', borderBottom: i === d.tableRows.length - 1 ? 'none' : '1px solid var(--border)', verticalAlign: 'top' }}>{row.feature}</td>
                      <td style={{ padding: '14px 20px', fontSize: 13.5, color: row.competitor.verdict === 'win' ? 'var(--text)' : 'var(--text2)', lineHeight: 1.6, borderBottom: i === d.tableRows.length - 1 ? 'none' : '1px solid var(--border)', verticalAlign: 'top' }}>
                        <span style={{ color: VERDICT_MARK[row.competitor.verdict].color, fontWeight: 700, marginRight: 4 }}>{VERDICT_MARK[row.competitor.verdict].symbol}</span>{row.competitor.text}
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: 13.5, color: row.labelnest.verdict === 'win' ? 'var(--text)' : 'var(--text2)', lineHeight: 1.6, borderBottom: i === d.tableRows.length - 1 ? 'none' : '1px solid var(--border)', verticalAlign: 'top' }}>
                        <span style={{ color: VERDICT_MARK[row.labelnest.verdict].color, fontWeight: 700, marginRight: 4 }}>{VERDICT_MARK[row.labelnest.verdict].symbol}</span>{row.labelnest.text}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: 'linear-gradient(135deg,rgba(233,30,140,.06),rgba(124,58,237,.04))', border: '1px solid rgba(233,30,140,.14)', borderLeft: '3px solid #E91E8C', borderRadius: '0 12px 12px 0', padding: '20px 24px', margin: '24px 0 0' }}>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 15, color: 'var(--text)', marginBottom: 8 }}>{d.calloutTitle}</div>
              <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.65 }}>{d.calloutBody}</div>
            </div>
          </div>
        </section>

        {/* OPTIONAL EXTRA SECTION */}
        {d.extra && (
          <section style={{ padding: '56px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>{d.extra.tag}</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 12 }}>{d.extra.heading}</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.72, color: 'var(--text2)', maxWidth: 640 }}>{d.extra.body}</p>
            </div>
          </section>
        )}

        {/* FINAL CTA */}
        <section style={{ padding: '64px 48px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>{d.finalTag}</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', maxWidth: 520, margin: '0 auto 12px' }}>{d.finalHeading}</h2>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', maxWidth: 460, margin: '0 auto 24px', lineHeight: 1.72 }}>{d.finalBody}</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <CtaButton cta={d.finalPrimaryCta} primary />
              <CtaButton cta={d.finalSecondaryCta} />
            </div>
          </div>
        </section>

        {/* ALSO COMPARE — cross-links other /vs/ pages */}
        <section style={{ padding: '40px 48px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Also compare</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {otherPages.map(p => (
                <Link key={p.slug} href={`/vs/${p.slug}`}
                  style={{ fontSize: 13, color: 'var(--text2)', padding: '9px 16px', borderRadius: 9, border: '1px solid var(--border)', background: 'var(--surface)', textDecoration: 'none' }}>
                  {p.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
