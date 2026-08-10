'use client'

import { useEffect, useState } from 'react'

const SESSION_KEY = 'ln-intro-shown'
// This site has no real async loading gate (unlike NestLens's auth/data
// fetch) -- the underlying page is already server-rendered and visible
// immediately behind this overlay. So there's nothing real to race against;
// this is purely a brief decorative intro, capped short on purpose so it
// never delays a visitor from seeing actual content. Shows once per browser
// session (not on every client-side route change).
const MAX_MS = 1500

export default function IntroLoader() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // sessionStorage unavailable (private mode etc) -- skip the intro
      // rather than risk showing it on every navigation.
      return
    }
    setVisible(true)
    const t = setTimeout(() => setVisible(false), MAX_MS)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)',
      }}
    >
      <video
        src="/loading/labelnest-loading.mp4"
        autoPlay muted playsInline preload="auto"
        onEnded={() => setVisible(false)}
        style={{ width: '100%', height: '100%', maxWidth: 480, maxHeight: 480, objectFit: 'contain' }}
      />
    </div>
  )
}
