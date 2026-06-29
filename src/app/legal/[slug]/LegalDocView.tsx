'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { LegalDocument } from '@/lib/db'

// Minimal markdown → HTML (mirrors upload-legal-to-r2.mjs)
function mdInline(t: string): string {
  return t
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
}
function mdLine(l: string): string {
  if (!l.trim()) return ''
  if (l.startsWith('- ') || l.startsWith('* ')) return `<li>${mdInline(l.slice(2))}</li>`
  return mdInline(l)
}
function mdToHtml(md: string): string {
  if (!md) return ''
  if (md.trim().startsWith('<')) return md
  return md.replace(/\r\n/g, '\n').split('\n\n').map(block => {
    const lines = block.trim().split('\n')
    if (lines[0].startsWith('## ')) {
      const id = lines[0].slice(3).toLowerCase().replace(/[^a-z0-9]+/g, '-')
      return `<h2 id="${id}">${lines[0].slice(3)}</h2>${lines.slice(1).map(l => mdLine(l)).join('\n')}`
    }
    if (lines[0].startsWith('### ')) return `<h3>${lines[0].slice(4)}</h3>${lines.slice(1).map(l => mdLine(l)).join('\n')}`
    if (lines[0].startsWith('# ')) return `<h1>${lines[0].slice(2)}</h1>${lines.slice(1).map(l => mdLine(l)).join('\n')}`
    if (lines[0].match(/^---+$/)) return '<hr>'
    if (lines.every(l => l.startsWith('- ') || l.startsWith('* ')))
      return `<ul>${lines.map(l => `<li>${mdInline(l.slice(2))}</li>`).join('')}</ul>`
    if (lines.every(l => /^\d+\. /.test(l)))
      return `<ol>${lines.map(l => `<li>${mdInline(l.replace(/^\d+\. /, ''))}</li>`).join('')}</ol>`
    return `<p>${lines.map(l => mdInline(l)).join('<br>')}</p>`
  }).join('\n')
}

function parseTOC(html: string): { id: string; label: string }[] {
  const re = /<h2[^>]+id="([^"]+)"[^>]*>(.*?)<\/h2>/gi
  const matches = [...html.matchAll(re)]
  return matches.map(m => ({ id: m[1], label: m[2].replace(/<[^>]+>/g, '') }))
}

export default function LegalDocView({ doc }: { doc: LegalDocument }) {
  const [activeId, setActiveId] = useState('')
  const bodyHtml = mdToHtml(doc.body_markdown)
  const toc = parseTOC(bodyHtml)

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
        /* ── Body typography ── */
        .legal-body { font-family: Inter, sans-serif; }
        .legal-body h1 { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 26px; color: var(--text); margin: 40px 0 12px; letter-spacing: -.025em; }
        .legal-body h2 { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 18px; color: var(--text); margin: 40px 0 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,.07); letter-spacing: -.01em; position: relative; }
        .legal-body h2::before { content: ''; position: absolute; left: 0; top: -1px; width: 32px; height: 2px; background: linear-gradient(90deg,#E91E8C,#7C3AED); border-radius: 2px; }
        .legal-body h2:first-child { margin-top: 0; border-top: none; padding-top: 0; }
        .legal-body h2:first-child::before { display: none; }
        .legal-body h3 { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 14px; color: var(--text); margin: 22px 0 7px; text-transform: uppercase; letter-spacing: .05em; }
        .legal-body p { font-size: 14.5px; color: var(--text2); line-height: 1.78; margin-bottom: 12px; }
        .legal-body p strong { color: var(--text); font-weight: 600; }
        .legal-body p em { color: var(--text); font-style: italic; }
        .legal-body code { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; background: rgba(255,255,255,.06); padding: 2px 6px; border-radius: 4px; color: #E91E8C; }
        /* ── Lists ── */
        .legal-body ul, .legal-body ol { padding: 0; margin: 10px 0 18px; display: flex; flex-direction: column; gap: 6px; list-style: none; }
        .legal-body li { position: relative; padding: 10px 14px 10px 38px; background: var(--surface); border: 1px solid rgba(255,255,255,.05); border-radius: 8px; font-size: 14px; color: var(--text2); line-height: 1.6; }
        .legal-body ul li::before { content: ''; position: absolute; left: 14px; top: 19px; width: 6px; height: 6px; border-radius: 50%; background: #E91E8C; }
        .legal-body ol { counter-reset: li; }
        .legal-body ol li { counter-increment: li; }
        .legal-body ol li::before { content: counter(li); position: absolute; left: 10px; top: 9px; width: 20px; height: 20px; background: rgba(233,30,140,.15); color: #E91E8C; border-radius: 50%; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 20px; }
        .legal-body li strong { color: var(--text); font-weight: 600; }
        .legal-body a { color: #2563EB; text-decoration: none; }
        .legal-body a:hover { text-decoration: underline; }
        .legal-body hr { border: none; border-top: 1px solid rgba(255,255,255,.07); margin: 32px 0; }
        /* ── TOC ── */
        .toc-link { font-size: 12px; color: var(--text2); padding: 6px 10px; border-radius: 6px; border-left: 2px solid transparent; transition: all .15s; line-height: 1.4; display: block; text-decoration: none; }
        .toc-link:hover { color: var(--text); border-left-color: #E91E8C; background: var(--surface); }
        .toc-link.active { color: var(--text); border-left-color: #E91E8C; background: var(--surface); font-weight: 600; }
      `}</style>
      <Nav />
      <main style={{ paddingTop: 64 }}>

        {/* Page header */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,.06)', background: 'var(--bg)', padding: '32px 48px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <Link href="/legal" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--text2)', marginBottom: 14, textDecoration: 'none' }}>← All legal docs</Link>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Legal · LabelNest India Private Limited</div>
                <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,3vw,32px)', color: 'var(--text)', margin: 0, letterSpacing: '-.025em' }}>{doc.title}</h1>
                <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: 'var(--text3)' }}>{doc.version}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: 'var(--text3)' }}>Effective {doc.effective_date}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: 'var(--text3)' }}>Last updated {doc.last_updated}</span>
                </div>
              </div>
              {doc.r2_url && (
                <a href={doc.r2_url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--text2)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 9, padding: '9px 16px', textDecoration: 'none', flexShrink: 0 }}>
                  ↓ Download PDF
                </a>
              )}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 48px 80px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, alignItems: 'start' }}>

          {/* TOC SIDEBAR */}
          <aside style={{ position: 'sticky', top: 88 }}>
            {toc.length > 0 && (
              <>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>Contents</div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {toc.map(item => (
                    <a key={item.id} href={`#${item.id}`} className={`toc-link${activeId === item.id ? ' active' : ''}`}>{item.label}</a>
                  ))}
                </nav>
              </>
            )}
          </aside>

          {/* BODY */}
          <div>
            {doc.intro && (
              <div style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text2)', padding: '18px 22px', borderLeft: '3px solid #E91E8C', background: 'rgba(233,30,140,.05)', borderRadius: '0 12px 12px 0', marginBottom: 36 }}>
                {doc.intro}
              </div>
            )}
            <div className="legal-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

            {/* Footer notice */}
            <div style={{ marginTop: 48, padding: '18px 22px', background: 'var(--surface)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 12, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>⚖️</span>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 13.5, color: 'var(--text)', marginBottom: 4 }}>LabelNest India Private Limited</div>
                <div style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.65 }}>
                  No. 33, 4th Floor, 1st Main, CBI Main Rd, HMT Layout, Ganganagar, Bengaluru 560032 · Governing law: Karnataka, India<br />
                  Questions? <a href="mailto:contact@labelnest.in" style={{ color: '#2563EB' }}>contact@labelnest.in</a> · <a href="mailto:privacy@labelnest.in" style={{ color: '#2563EB' }}>privacy@labelnest.in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
