'use client'
import { useState } from 'react'
import Image from 'next/image'

// A video that costs nothing until it is played: a poster and a play button, and the player loads on click.
// Accepts a YouTube link, a Vimeo link, or a direct .mp4 / .webm file.

function embedFor(url: string): { kind: 'iframe' | 'file'; src: string } | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}?autoplay=1&rel=0` }
    if (host.endsWith('youtube.com')) {
      const id = u.searchParams.get('v') || u.pathname.split('/').pop()
      return id ? { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` } : null
    }
    if (host === 'vimeo.com') {
      const id = u.pathname.split('/').filter(Boolean).pop()
      return id ? { kind: 'iframe', src: `https://player.vimeo.com/video/${id}?autoplay=1` } : null
    }
    if (/\.(mp4|webm|mov)(\?|$)/i.test(u.pathname)) return { kind: 'file', src: url }
  } catch { /* not a URL */ }
  return null
}

export default function VideoBlock({ url, poster, title, cta }: { url: string; poster?: string; title: string; cta?: string }) {
  const [playing, setPlaying] = useState(false)
  const embed = embedFor(url)
  if (!embed) return null

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', background: 'var(--night)', overflow: 'hidden' }}>
      {playing ? (
        embed.kind === 'iframe'
          ? <iframe src={embed.src} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
          : <video src={embed.src} controls autoPlay playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      ) : (
        <>
          {poster && <Image src={poster} alt="" fill sizes="(max-width:900px) 100vw, 560px" style={{ objectFit: 'cover' }} />}
          <button
            onClick={() => setPlaying(true)}
            aria-label={cta || `Play: ${title}`}
            style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 76, height: 76, borderRadius: '50%', background: 'var(--onnight)', border: 0, display: 'grid', placeItems: 'center', cursor: 'pointer' }}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" style={{ marginLeft: 4 }}><path d="M5 2.5L22 13 5 23.5z" fill="#0B1626" /></svg>
          </button>
          {cta && <span style={{ position: 'absolute', left: 18, bottom: 14, color: 'var(--onnight)', fontSize: 13.5 }}>{cta}</span>}
        </>
      )}
    </div>
  )
}
