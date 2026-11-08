'use client'
import { useState } from 'react'

// Copies text to the clipboard and shows "Copied" for two seconds.
export default function CopyLink({ text, label, copiedLabel = 'Copied', variant = 'solid' }: {
  text: string
  label: string
  copiedLabel?: string
  variant?: 'solid' | 'ghost'
}) {
  const [done, setDone] = useState(false)

  async function copy(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Older browsers / insecure context: fall back to a hidden textarea.
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setDone(true)
    setTimeout(() => setDone(false), 2000)
  }

  const solid = variant === 'solid'
  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      style={{
        font: '600 13px var(--font-sans),system-ui,sans-serif',
        padding: '9px 14px',
        borderRadius: 8,
        cursor: 'pointer',
        border: solid ? '1px solid transparent' : '1px solid var(--border)',
        background: solid ? 'var(--text)' : 'transparent',
        color: solid ? 'var(--bg)' : 'var(--text)',
        whiteSpace: 'nowrap',
      }}
    >
      {done ? `✓ ${copiedLabel}` : label}
    </button>
  )
}
