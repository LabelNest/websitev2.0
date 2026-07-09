'use client'
import { useRef, useCallback } from 'react'
import { imgFrameStyle } from '@/lib/image'

export function ImagePositioner({
  src, position, zoom, onChange, aspect = 1, defaultPosition = '50% 50%', defaultZoom = 1,
}: {
  src: string
  position: string
  zoom: number
  onChange: (position: string, zoom: number) => void
  aspect?: number
  defaultPosition?: string
  defaultZoom?: number
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const setFromPointer = useCallback((clientX: number, clientY: number) => {
    const el = frameRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    const y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100))
    onChange(`${x.toFixed(0)}% ${y.toFixed(0)}%`, zoom)
  }, [onChange, zoom])

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    setFromPointer(e.clientX, e.clientY)
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return
    setFromPointer(e.clientX, e.clientY)
  }
  function onPointerUp() { dragging.current = false }

  return (
    <div style={{ marginTop: 8 }}>
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        title="Drag to set focal point"
        style={{
          width: '100%', aspectRatio: String(aspect), borderRadius: 8, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,.14)', position: 'relative', cursor: 'crosshair',
          touchAction: 'none', background: 'rgba(255,255,255,.03)',
        }}
      >
        <img src={src} alt="" draggable={false} style={imgFrameStyle(position, zoom)} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', flexShrink: 0 }}>Zoom</span>
        <input
          type="range" min={1} max={2.5} step={0.05} value={zoom}
          onChange={e => onChange(position, Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <button
          type="button"
          onClick={() => onChange(defaultPosition, defaultZoom)}
          style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, textDecoration: 'underline' }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
