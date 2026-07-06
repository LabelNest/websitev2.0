'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const SHOW_ON = new Set([
  '/nestlens',
  '/nestlens/intelligence',
  '/nestlens/exchange',
  '/nestlens/capital',
  '/nesthr',
  '/contact',
])

const DISMISS_KEY = 'ln-diy-popup-dismissed-at'
const DISMISS_DAYS = 7

export default function DiyPromoPopup() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!SHOW_ON.has(pathname)) return
    try {
      const dismissedAt = localStorage.getItem(DISMISS_KEY)
      if (dismissedAt) {
        const daysSince = (Date.now() - Number(dismissedAt)) / 86400000
        if (daysSince < DISMISS_DAYS) return
      }
    } catch {}
    const t = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(t)
  }, [pathname])

  if (!visible) return null

  const dismiss = () => {
    setVisible(false)
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())) } catch {}
  }

  return (
    <div
      style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 300,
        maxWidth: 320, background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 14, boxShadow: '0 12px 32px rgba(0,0,0,.18)',
        padding: '16px 18px', animation: 'diy-pop-in .35s ease-out',
      }}
    >
      <style>{`@keyframes diy-pop-in { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{ position: 'absolute', top: 8, right: 10, background: 'none', border: 'none', color: 'var(--text3)', fontSize: 16, cursor: 'pointer', lineHeight: 1 }}
      >
        ✕
      </button>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#E91E8C', marginBottom: 6 }}>
        No sales call needed
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6, lineHeight: 1.4 }}>
        Every brochure, price, and FAQ — one page.
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.55, marginBottom: 12 }}>
        The NestLens Resource Hub has everything: Intelligence, Capital Readiness, Exchange, and NestHR pricing and brochures.
      </div>
      <a
        href="https://nestlens.labelnest.in/DIY"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600,
          color: '#fff', background: '#0D1B5E', padding: '8px 16px', borderRadius: 9, textDecoration: 'none',
        }}
      >
        Open the Resource Hub →
      </a>
    </div>
  )
}
