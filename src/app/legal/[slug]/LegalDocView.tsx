'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { LegalDocument } from '@/lib/db'

function parseTOC(html: string): { id: string; label: string }[] {
  const re = /<h2[^>]+id="([^"]+)"[^>]*>(.*?)<\/h2>/gi
  const matches = [...html.matchAll(re)]
  return matches.map(m => ({ id: m[1], label: m[2].replace(/<[^>]+>/g, '') }))
}

export default function LegalDocView({ doc }: { doc: LegalDocument }) {
  const [activeId, setActiveId] = useState('')
  const toc = parseTOC(doc.body_markdown)

  useEffect(() => {
    if (toc.length === 0) return
    const onScroll = () => {
      let current = ''
      for (const item of toc) {
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top < 120) current = item.id
      }
      setActiveId(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [toc])

  return (
    <>
      <style>{`
        .legal-body h2{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:19px;color:var(--text);margin:36px 0 10px;padding-top:8px;border-top:1px solid rgba(255,255,255,.07)}
        .legal-body h2:first-child{margin-top:0;border-top:none;padding-top:0}
        .legal-body h3{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:14.5px;color:var(--text);margin:18px 0 6px}
        .legal-body p{font-size:13.5px;color:var(--text2);line-height:1.74;margin-bottom:10px}
        .legal-body p strong{color:var(--text);font-weight:600}
        .legal-body ul{list-style:none;padding:0;margin:8px 0 14px;display:flex;flex-direction:column;gap:5px}
        .legal-body li{padding:8px 13px;background:var(--surface);border-radius:6px;border-left:2px solid rgba(255,255,255,.08);font-size:13.5px;color:var(--text2);line-height:1.6}
        .legal-body li strong{color:var(--text);font-weight:600}
        .legal-body a{color:#2563EB}
        .toc-link{font-size:12.5px;color:var(--text2);padding:6px 10px;border-radius:6px;border-left:2px solid transparent;transition:all .15s;line-height:1.4;display:block;text-decoration:none}
        .toc-link:hover{color:var(--text);border-left-color:#E91E8C;background:var(--surface)}
        .toc-link.active{color:var(--text);border-left-color:#E91E8C;background:var(--surface)}
      `}</style>
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '56px 48px 80px', display: 'grid', gridTemplateColumns: '210px 1fr', gap: 56, alignItems: 'start' }}>

          {/* TOC SIDEBAR */}
          <aside style={{ position: 'sticky', top: 88 }}>
            <Link href="/legal" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text2)', marginBottom: 20 }}>← All legal docs</Link>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 15, color: 'var(--text)', marginBottom: 6 }}>{doc.title}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, lineHeight: 1.65, color: 'var(--text3)', marginBottom: 18 }}>{doc.version} · Effective {doc.effective_date}<br />Last updated {doc.last_updated}</div>
            {toc.length > 0 && (
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {toc.map(item => (
                  <a key={item.id} href={`#${item.id}`} className={`toc-link${activeId === item.id ? ' active' : ''}`}>{item.label}</a>
                ))}
              </nav>
            )}
          </aside>

          {/* LEGAL BODY */}
          <div>
            {doc.intro && (
              <div style={{ fontSize: 14.5, lineHeight: 1.78, color: 'var(--text2)', padding: '16px 20px', borderLeft: '3px solid #E91E8C', background: 'var(--surface)', borderRadius: '0 10px 10px 0', marginBottom: 32 }}>
                {doc.intro}
              </div>
            )}
            <div className="legal-body" dangerouslySetInnerHTML={{ __html: doc.body_markdown }} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
