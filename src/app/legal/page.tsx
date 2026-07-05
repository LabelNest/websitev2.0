import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getLegalDocuments, LegalDocument } from '@/lib/db'
import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/legal', {
    title: 'Legal — LabelNest Policies, Terms, and Documentation',
    description: 'All LabelNest legal documents: privacy policy, terms of service, cookie policy, refund policy, security, and product annexures.',
  })
}

const GROUPS: { label: string; slugs: string[] }[] = [
  {
    label: 'Core',
    slugs: ['privacy', 'terms', 'cookies', 'refunds', 'disclaimer', 'acceptable-use'],
  },
  {
    label: 'Security and Data',
    slugs: ['security', 'data-sources', 'ai-disclosure', 'security-incident-response', 'enterprise-dpa', 'sla'],
  },
  {
    label: 'Support and Escalation',
    slugs: ['contact-escalation', 'nestlens-annexure', 'nesthr-annexure'],
  },
]

const SLUG_META: Record<string, { tag: string; title: string }> = {
  'privacy': { tag: 'Privacy', title: 'Privacy Policy' },
  'terms': { tag: 'Terms', title: 'Terms and Conditions' },
  'cookies': { tag: 'Cookies', title: 'Cookie Policy' },
  'refunds': { tag: 'Refunds', title: 'Refund Policy' },
  'disclaimer': { tag: 'Disclaimer', title: 'Disclaimer' },
  'acceptable-use': { tag: 'Platform', title: 'Acceptable Use Policy' },
  'security': { tag: 'Security', title: 'Security Policy' },
  'data-sources': { tag: 'Data', title: 'Data Sources Policy' },
  'ai-disclosure': { tag: 'AI', title: 'AI Disclosure' },
  'security-incident-response': { tag: 'Security', title: 'Security Incident Response' },
  'enterprise-dpa': { tag: 'Enterprise', title: 'Enterprise DPA' },
  'sla': { tag: 'SLA', title: 'Service Level Agreement' },
  'contact-escalation': { tag: 'Support', title: 'Contact and Escalation' },
  'nestlens-annexure': { tag: 'Platform', title: 'NestLens Annexure' },
  'nesthr-annexure': { tag: 'Platform', title: 'NestHR Annexure' },
}

export default async function LegalPage() {
  let docs: LegalDocument[] = []
  try {
    docs = await getLegalDocuments()
  } catch {
    // fallback to static slugs
  }
  const docMap = new Map(docs.map(d => [d.slug, d]))

  return (
    <>
      <style>{`
        .doc-card { background: var(--surface); border: 1px solid rgba(255,255,255,.07); border-radius: 14px; padding: 20px; transition: transform .2s, border-color .2s; display: block; }
        .doc-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,.15) !important; }
      `}</style>
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 48px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Legal · LabelNest India Private Limited</div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(36px,5vw,58px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.04, color: 'var(--text)', marginBottom: 12 }}>Legal documents</h1>
          <p style={{ fontSize: 16, color: 'var(--text2)', maxWidth: 500, marginBottom: 52, lineHeight: 1.72 }}>All policies, terms, and legal commitments governing LabelNest products and services. Version 1.0 — effective May–June 2026.</p>

          {GROUPS.map(group => (
            <div key={group.label} style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>{group.label}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                {group.slugs.map(slug => {
                  const db = docMap.get(slug)
                  const meta = SLUG_META[slug] ?? { tag: slug, title: slug }
                  return (
                    <Link key={slug} href={`/legal/${slug}`} className="doc-card">
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>{meta.tag}</div>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>{db?.title ?? meta.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 10 }}>{db?.version ?? 'v1.0'} · Effective {db?.effective_date ?? 'May 2026'}</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2563EB' }}>Read policy →</div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Entity info */}
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 24 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>Legal entity</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 6 }}>LabelNest India Private Limited</div>
            <div style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 16 }}>
              No. 33, 4th Floor, 1st Main, CBI Main Rd<br />
              HMT Layout, Ganganagar<br />
              Bengaluru, Karnataka, India 560032
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--text2)' }}>
              <span>General: <a href="mailto:contact@labelnest.in" style={{ color: '#2563EB' }}>contact@labelnest.in</a></span>
              <span>Privacy: <a href="mailto:privacy@labelnest.in" style={{ color: '#2563EB' }}>privacy@labelnest.in</a></span>
              <span>Governing law: Laws of Karnataka, India</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
