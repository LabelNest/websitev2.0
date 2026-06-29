'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Briefing } from '@/lib/db'

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
    if (lines[0].startsWith('## ')) return `<h2>${lines[0].slice(3)}</h2>${lines.slice(1).map(l => mdLine(l)).join('\n')}`
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

function scopeColor(scope: string): string {
  const m: Record<string, string> = {
    Manifesto: '#E91E8C', Product: '#7C3AED', Intelligence: '#2563EB',
    Sovereignty: '#06B6D4', Foundry: '#10B981', 'Market Intelligence': '#F97316',
    Newsletter: '#F59E0B', Strategy: '#8B5CF6',
  }
  return m[scope] ?? '#F97316'
}

function scopeEmoji(scope: string): string {
  const m: Record<string, string> = {
    Manifesto: '🌏', Product: '⚡', Intelligence: '🔭', Sovereignty: '🇮🇳',
    Foundry: '🏗️', 'Market Intelligence': '🌐', Newsletter: '📬', Strategy: '🎯',
  }
  return m[scope] ?? '📊'
}

function authorGradient(name: string): string {
  if (name === 'Ankit Suman') return 'linear-gradient(135deg,#E91E8C,#7C3AED)'
  if (name === 'Shubham Singh') return 'linear-gradient(135deg,#2563EB,#7C3AED)'
  if (name === 'Sumedha Pandey') return 'linear-gradient(135deg,#10B981,#2563EB)'
  return 'rgba(255,255,255,.08)'
}

export default function BriefingView({ briefing, related }: { briefing: Briefing; related: Briefing[] }) {
  const [progress, setProgress] = useState(0)
  const contentHtml = mdToHtml(briefing.content)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      setProgress(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const color = scopeColor(briefing.scope)

  return (
    <>
      <style>{`
        /* ── Briefing body ── */
        .briefing-body { font-family: Inter, sans-serif; }
        .briefing-body h1 { font-family: 'Bricolage Grotesque',sans-serif; font-weight: 800; font-size: clamp(22px,3vw,32px); color: var(--text); letter-spacing: -.03em; margin: 44px 0 14px; }
        .briefing-body h2 { font-family: 'Bricolage Grotesque',sans-serif; font-weight: 800; font-size: clamp(18px,2.4vw,22px); color: var(--text); letter-spacing: -.022em; margin: 44px 0 14px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,.07); position: relative; }
        .briefing-body h2::before { content:''; position:absolute; left:0; top:-1px; width:40px; height:2px; background:linear-gradient(90deg,#F97316,#E91E8C); border-radius:2px; }
        .briefing-body h2:first-child { margin-top:0; border-top:none; padding-top:0; }
        .briefing-body h2:first-child::before { display:none; }
        .briefing-body h3 { font-family: 'Bricolage Grotesque',sans-serif; font-weight: 700; font-size: 16px; color: var(--text); margin: 28px 0 9px; }
        .briefing-body p { font-size: 16px; color: var(--text2); line-height: 1.82; margin-bottom: 18px; }
        .briefing-body p strong { color: var(--text); font-weight: 700; }
        .briefing-body p em { color: #F97316; font-style: normal; font-weight: 600; }
        .briefing-body code { font-family: 'JetBrains Mono',monospace; font-size: 13px; background: rgba(255,255,255,.06); padding: 2px 7px; border-radius: 4px; color: #F97316; }
        .briefing-body a { color: #2563EB; }
        /* ── Lists ── */
        .briefing-body ul, .briefing-body ol { list-style: none; padding: 0; margin: 14px 0 22px; display: flex; flex-direction: column; gap: 8px; }
        .briefing-body li { position: relative; padding: 12px 16px 12px 44px; background: var(--surface); border: 1px solid rgba(255,255,255,.06); border-radius: 10px; font-size: 15px; color: var(--text2); line-height: 1.65; }
        .briefing-body ul li::before { content:''; position:absolute; left:16px; top:21px; width:8px; height:8px; border-radius:50%; background:linear-gradient(135deg,#F97316,#E91E8C); }
        .briefing-body ol { counter-reset: li; }
        .briefing-body ol li { counter-increment: li; }
        .briefing-body ol li::before { content:counter(li); position:absolute; left:12px; top:11px; width:22px; height:22px; background:rgba(249,115,22,.15); color:#F97316; border-radius:50%; font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:700; display:flex; align-items:center; justify-content:center; line-height:22px; text-align:center; }
        .briefing-body li strong { color: var(--text); font-weight: 700; }
        .briefing-body hr { border:none; border-top:1px solid rgba(255,255,255,.07); margin:36px 0; }
        /* ── Callout: blockquote used inline ── */
        .briefing-body blockquote { border-left: 3px solid #F97316; background: rgba(249,115,22,.06); border-radius: 0 10px 10px 0; padding: 16px 20px; margin: 24px 0; }
        .briefing-body blockquote p { color: var(--text); font-size: 15.5px; font-style: italic; margin: 0; }
        /* ── Sidebar ── */
        .share-btn { display:flex; align-items:center; gap:10px; padding:10px 13px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); border-radius:8px; font-size:13px; color:var(--text2); transition:all .15s; margin-bottom:7px; text-decoration:none; }
        .share-btn:hover { color:var(--text); border-color:rgba(255,255,255,.14); }
        .related-item { display:flex; gap:10px; padding:10px; background:rgba(255,255,255,.03); border-radius:8px; margin-bottom:6px; transition:background .15s; text-decoration:none; }
        .related-item:hover { background:rgba(255,255,255,.06); }
      `}</style>

      {/* Reading progress */}
      <div style={{ position: 'fixed', top: 64, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,.06)', zIndex: 99 }}>
        <div style={{ height: '100%', background: '#F97316', width: `${progress}%`, transition: 'width .1s linear' }} />
      </div>

      <Nav />
      <main style={{ paddingTop: 64 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 48px 80px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 56, alignItems: 'start' }}>

          {/* ARTICLE */}
          <article>
            <Link href="/briefings" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13.5, color: 'var(--text2)', marginBottom: 24 }}>← Briefings</Link>

            <div style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100, background: `${color}1F`, color: color, display: 'inline-block', marginRight: 8 }}>{briefing.scope}</span>
              {briefing.is_featured && (
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100, background: 'rgba(16,185,129,.1)', color: '#10B981', display: 'inline-block' }}>Featured</span>
              )}
            </div>

            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(26px,4.2vw,48px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.06, color: 'var(--text)', marginBottom: 18 }}>{briefing.title}</h1>

            {briefing.summary && (
              <div style={{ fontSize: 'clamp(15px,1.8vw,17.5px)', lineHeight: 1.74, color: 'var(--text2)', padding: '16px 20px', borderLeft: '3px solid #F97316', background: 'var(--surface)', borderRadius: '0 10px 10px 0', marginBottom: 24 }}>
                {briefing.summary}
              </div>
            )}

            {/* Author strip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: '14px 18px', marginBottom: 28 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: authorGradient(briefing.author_name), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 16, color: '#fff', flexShrink: 0 }}>{briefing.author_name[0]}</div>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text)' }}>{briefing.author_name}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>{briefing.author_role ?? briefing.author_department}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
                <span style={{ fontSize: 12.5, color: 'var(--text2)' }}>{briefing.date}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: 'var(--text3)', letterSpacing: '.06em' }}>{briefing.read_time}</span>
              </div>
            </div>

            {/* Cover */}
            <div style={{ width: '100%', borderRadius: 14, background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', overflow: 'hidden', marginBottom: 36 }}>
              {briefing.hero_image || briefing.cover_image ? (
                <img src={briefing.hero_image ?? briefing.cover_image ?? ''} alt={briefing.title} style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ height: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ fontSize: 48, opacity: .2 }}>{scopeEmoji(briefing.scope)}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)' }}>Cover image · upload via admin panel</span>
                </div>
              )}
            </div>

            {/* Body */}
            {contentHtml ? (
              <div className="briefing-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            ) : (
              <div style={{ fontSize: 15.5, color: 'var(--text2)', lineHeight: 1.8 }}>Content coming soon.</div>
            )}
          </article>

          {/* SIDEBAR */}
          <aside style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Share */}
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 18 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>Share</div>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://labelnest.in/briefings/${briefing.slug}`} target="_blank" rel="noopener noreferrer" className="share-btn">💼 Share on LinkedIn</a>
              <a href={`https://twitter.com/intent/tweet?url=https://labelnest.in/briefings/${briefing.slug}`} target="_blank" rel="noopener noreferrer" className="share-btn">𝕏 Share on X</a>
            </div>

            {/* Newsletter */}
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 18, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#F97316,#E91E8C)' }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: '#F97316', marginBottom: 6 }}>Operator to Founder</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 14.5, color: 'var(--text)', marginBottom: 6 }}>Follow the newsletter</div>
              <div style={{ fontSize: 12.5, color: 'var(--text2)', marginBottom: 14, lineHeight: 1.5 }}>Building LabelNest from zero. Sharing the journey as it happens.</div>
              <a href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7472967819387686913" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', background: '#F97316', color: '#fff', fontSize: 13, fontWeight: 600, padding: 10, borderRadius: 8 }}>Follow on LinkedIn ↗</a>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 18 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>Related briefings</div>
                {related.map(r => (
                  <Link key={r.slug} href={`/briefings/${r.slug}`} className="related-item" style={{ display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{scopeEmoji(r.scope)}</span>
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text)', lineHeight: 1.35, marginBottom: 3 }}>{r.title}</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text3)' }}>{r.read_time} · {r.date}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Author */}
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 18 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>About the author</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: authorGradient(briefing.author_name), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 14, color: '#fff', flexShrink: 0 }}>{briefing.author_name[0]}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{briefing.author_name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text2)' }}>{briefing.author_role ?? 'LabelNest'}</div>
                </div>
              </div>
              <Link href="/about/ankit" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2563EB' }}>View profile →</Link>
            </div>
          </aside>
        </div>
      </main>
      <footer style={{ background: 'var(--bg)', borderTop: '1px solid rgba(255,255,255,.06)', padding: '32px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12.5, color: 'var(--text3)' }}>© 2026 LabelNest India Private Limited. All rights reserved.</span>
        <Link href="/briefings" style={{ fontSize: 12.5, color: 'var(--text3)' }}>← All briefings</Link>
      </footer>
    </>
  )
}
