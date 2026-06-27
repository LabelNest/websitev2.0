import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getLegalDocuments } from '@/lib/db'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Legal', description: 'Legal documents for LabelNest India Private Limited.' }
export const revalidate = 86400

const GROUPS: Record<string, string[]> = {
  'Core': ['privacy','terms','cookies','refunds'],
  'Security and Data': ['security','data-sources','security-incident-response','enterprise-dpa'],
  'Platform': ['ai-disclosure','acceptable-use','disclaimer','nestlens-annexure','nesthr-annexure'],
  'Support': ['contact-escalation','sla'],
}

export default async function LegalPage() {
  const docs = await getLegalDocuments()
  const bySlug = Object.fromEntries(docs.map((d) => [d.slug, d]))

  return (
    <>
      <Nav />
      <main className="max-w-[1240px] mx-auto px-8 py-24" style={{ paddingTop: '110px' }}>
        <div className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--text3)' }}>
          Legal · LabelNest India Private Limited
        </div>
        <h1 className="font-display font-extrabold tracking-tight leading-[1.03] mb-4" style={{ fontSize: 'clamp(36px,5vw,58px)', color: 'var(--text)' }}>
          Legal documents
        </h1>
        <p className="text-[16px] leading-relaxed max-w-[500px] mb-12" style={{ color: 'var(--text2)' }}>
          All policies, terms, and legal commitments governing LabelNest products and services. Version 1.0 — effective May–June 2026.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-12">
          {Object.entries(GROUPS).flatMap(([group, slugs]) =>
            slugs.map((slug) => {
              const doc = bySlug[slug]
              if (!doc) return null
              return (
                <Link
                  key={slug}
                  href={`/legal/${slug}`}
                  className="flex flex-col gap-2 p-5 rounded-[14px] transition-all duration-200"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--bord2)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  <div className="font-mono text-[9px] tracking-[.12em] uppercase" style={{ color: 'var(--text3)' }}>{group}</div>
                  <div className="font-display font-bold text-[15px] leading-[1.3]" style={{ color: 'var(--text)' }}>{doc.title}</div>
                  <div className="text-[12px]" style={{ color: 'var(--text3)' }}>{doc.version} · Effective {doc.effective_date}</div>
                  <div className="font-mono text-[10px] tracking-[.1em] uppercase mt-1" style={{ color: 'var(--blue)' }}>Read policy →</div>
                </Link>
              )
            })
          )}
        </div>

        <div className="rounded-[14px] p-6" style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
          <div className="font-mono text-[9px] tracking-[.12em] uppercase mb-2.5" style={{ color: 'var(--text3)' }}>Legal entity</div>
          <div className="font-display font-bold text-[15px] mb-1.5" style={{ color: 'var(--text)' }}>LabelNest India Private Limited</div>
          <div className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--text2)' }}>
            No. 33, 4th Floor, 1st Main, CBI Main Rd<br />
            HMT Layout, Ganganagar<br />
            Bengaluru, Karnataka, India 560032
          </div>
          <div className="flex flex-wrap gap-5 text-[13px]" style={{ color: 'var(--text2)' }}>
            <span>General: <a href="mailto:contact@labelnest.in" style={{ color: 'var(--blue)' }}>contact@labelnest.in</a></span>
            <span>Privacy: <a href="mailto:privacy@labelnest.in" style={{ color: 'var(--blue)' }}>privacy@labelnest.in</a></span>
            <span>Governing law: Laws of Karnataka, India</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
