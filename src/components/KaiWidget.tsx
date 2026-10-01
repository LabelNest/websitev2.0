'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type ChatMsg = { role: 'user' | 'assistant'; content: string }

// Kai's replies reference pages as bare paths ("/contact") or domains
// ("nestlens.labelnest.in") in plain prose per its system prompt -- this
// turns those into actual clickable links instead of inert text.
const LINK_PATTERN = /https?:\/\/[^\s)]+|(?<!@)(?:[a-z0-9-]+\.)*labelnest\.in(?:\/[^\s).,!?]*)?|(?<![\w/])\/[a-zA-Z][\w\-/]*/gi

function renderMessageContent(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let key = 0
  for (const match of text.matchAll(LINK_PATTERN)) {
    const raw = match[0]
    const start = match.index ?? 0
    const trimmed = raw.replace(/[.,!?;:]+$/, '')
    const trailing = raw.slice(trimmed.length)
    if (start > lastIndex) nodes.push(text.slice(lastIndex, start))
    const linkStyle: React.CSSProperties = { color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 2 }
    if (trimmed.startsWith('/')) {
      nodes.push(<Link key={key++} href={trimmed} style={linkStyle}>{trimmed}</Link>)
    } else {
      const href = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
      nodes.push(<a key={key++} href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{trimmed}</a>)
    }
    if (trailing) nodes.push(trailing)
    lastIndex = start + raw.length
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

// Same video-outside/static-inside-open-chat pattern as NestLens's KaiAvatar
// and NestHR's LumiAvatar: the looping video is Kai's idle/closed presence,
// the still poster is what shows once the chat panel is open so it isn't
// distracting next to text the visitor is reading.
function KaiAvatar({ size, staticImage = false, style }: { size: number; staticImage?: boolean; style?: React.CSSProperties }) {
  const [useStatic, setUseStatic] = useState(staticImage)

  useEffect(() => {
    if (staticImage) { setUseStatic(true); return }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setUseStatic(true)
  }, [staticImage])

  const wrapperStyle: React.CSSProperties = {
    width: size, height: size, borderRadius: '50%', overflow: 'hidden',
    flexShrink: 0, position: 'relative', background: '#fff', ...style,
  }
  const mediaStyle: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }

  return (
    <div style={wrapperStyle}>
      {useStatic ? (
        <img src="/kai/kai-poster.jpg" alt="Kai" draggable={false} style={mediaStyle} />
      ) : (
        <video
          src="/kai/kai-avatar.mp4"
          poster="/kai/kai-poster.jpg"
          autoPlay loop muted playsInline
          onError={() => setUseStatic(true)}
          style={mediaStyle}
        />
      )}
    </div>
  )
}

const SUGGESTIONS = [
  'What does LabelNest do?',
  'What is NestLens?',
  'What is NestHR pricing?',
  "What's LabelNest's vision?",
]

export default function KaiWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Drag-to-move: offset from the panel's default corner position. Reset
  // on every open so a panel dragged off-screen doesn't stay lost.
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)

  useEffect(() => {
    if (open) setDragOffset({ x: 0, y: 0 })
  }, [open])

  function onDragPointerDown(e: React.PointerEvent) {
    dragState.current = { startX: e.clientX, startY: e.clientY, origX: dragOffset.x, origY: dragOffset.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function onDragPointerMove(e: React.PointerEvent) {
    if (!dragState.current || !panelRef.current) return
    const { startX, startY, origX, origY } = dragState.current
    const rect = panelRef.current.getBoundingClientRect()
    const margin = 8
    // The panel's position with zero drag offset, so we can clamp the new
    // offset to keep it on-screen regardless of where dragging started.
    const baseLeft = rect.left - dragOffset.x
    const baseTop = rect.top - dragOffset.y
    const minX = margin - baseLeft
    const maxX = window.innerWidth - margin - rect.width - baseLeft
    const minY = margin - baseTop
    const maxY = window.innerHeight - margin - rect.height - baseTop
    const nextX = Math.min(Math.max(origX + (e.clientX - startX), minX), maxX)
    const nextY = Math.min(Math.max(origY + (e.clientY - startY), minY), maxY)
    setDragOffset({ x: nextX, y: nextY })
  }
  function onDragPointerUp(e: React.PointerEvent) {
    dragState.current = null
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || sending) return
    setError(null)
    setInput('')
    const nextMessages: ChatMsg[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(nextMessages)
    setSending(true)
    try {
      const res = await fetch('/api/kai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: messages }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Kai couldn't respond right now.")
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kai couldn't respond right now.")
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes kaiPop { from { opacity:0; transform:translateY(12px) scale(.96); } to { opacity:1; transform:translateY(0) scale(1); } }
        .kai-panel { animation: kaiPop .28s cubic-bezier(.34,1.56,.64,1); }
        .kai-suggestion:hover { border-color: var(--pink) !important; color: var(--text) !important; }
        .kai-launcher:hover { transform: scale(1.06); }
        .kai-send:disabled { opacity: .4; cursor: default; }
      `}</style>

      {open && (
        <div
          ref={panelRef}
          className="kai-panel"
          style={{
            position: 'fixed', zIndex: 350, left: 20, bottom: 92,
            width: 360, maxWidth: 'calc(100vw - 32px)', height: 480,
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20,
            boxShadow: '0 20px 48px rgba(0,0,0,.28)', display: 'flex', flexDirection: 'column', overflow: 'hidden',
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
          }}
        >
          <div
            onPointerDown={onDragPointerDown}
            onPointerMove={onDragPointerMove}
            onPointerUp={onDragPointerUp}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid var(--border)', flexShrink: 0, cursor: 'grab', touchAction: 'none' }}
          >
            <KaiAvatar size={34} staticImage />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)' }}>Kai</div>
              <div style={{ fontSize: 10.5, color: 'var(--text3)' }}>LabelNest assistant</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              onPointerDown={e => e.stopPropagation()}
              aria-label="Close"
              style={{ width: 26, height: 26, borderRadius: '50%', border: 'none', background: 'transparent', color: 'var(--text3)', fontSize: 15, cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', paddingTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                  <KaiAvatar size={56} staticImage />
                </div>
                <p style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Hi, I&apos;m Kai</p>
                <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.55, maxWidth: 260, margin: '0 auto 18px' }}>
                  Ask me about LabelNest, NestLens, NestHR, or what we&apos;re building. No account or private data needed.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      className="kai-suggestion"
                      onClick={() => send(s)}
                      style={{ fontSize: 12, textAlign: 'left', padding: '8px 12px', borderRadius: 9, border: '1px solid var(--border)', background: 'var(--bg2)', color: 'var(--text2)', cursor: 'pointer', transition: 'border-color .15s,color .15s' }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {m.role === 'assistant' && <KaiAvatar size={22} staticImage style={{ marginTop: 2 }} />}
                <div
                  style={{
                    maxWidth: '80%', fontSize: 13, lineHeight: 1.55, padding: '9px 13px', borderRadius: 14,
                    whiteSpace: 'pre-wrap',
                    background: m.role === 'user' ? 'var(--pink)' : 'var(--bg2)',
                    color: m.role === 'user' ? '#fff' : 'var(--text2)',
                  }}
                >
                  {renderMessageContent(m.content)}
                </div>
              </div>
            ))}
            {sending && (
              <div style={{ display: 'flex', gap: 8 }}>
                <KaiAvatar size={22} staticImage style={{ marginTop: 2 }} />
                <div style={{ padding: '9px 13px', borderRadius: 14, background: 'var(--bg2)', fontSize: 13, color: 'var(--text3)' }}>…</div>
              </div>
            )}
            {error && <p style={{ fontSize: 11.5, color: '#F97316' }}>{error}</p>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder="Ask Kai…"
              style={{ flex: 1, height: 36, fontSize: 13, padding: '0 13px', borderRadius: 100, border: '1px solid var(--border)', background: 'var(--bg2)', color: 'var(--text)', outline: 'none' }}
            />
            <button
              className="kai-send"
              onClick={() => send(input)}
              disabled={sending || !input.trim()}
              aria-label="Send"
              style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'var(--pink)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            >
              →
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: 9.5, color: 'var(--text3)', paddingBottom: 8 }}>Powered by Sarvam</p>
        </div>
      )}

      <button
        className="kai-launcher"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close Kai chat' : 'Open Kai chat'}
        style={{
          position: 'fixed', zIndex: 350, left: 20, bottom: 20,
          width: 64, height: 64, borderRadius: '50%', border: '1px solid var(--border)',
          background: 'var(--surface)', boxShadow: '0 8px 24px rgba(0,0,0,.24)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'transform .15s',
        }}
      >
        {open ? <span style={{ fontSize: 20, color: 'var(--text2)' }}>✕</span> : <KaiAvatar size={52} />}
      </button>
    </>
  )
}
