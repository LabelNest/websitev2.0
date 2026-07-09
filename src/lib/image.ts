import type { CSSProperties } from 'react'

export function imgFrameStyle(position: string, zoom: number): CSSProperties {
  return {
    width: '100%', height: '100%', objectFit: 'cover',
    objectPosition: position,
    transform: `scale(${zoom})`,
    transformOrigin: position,
  }
}
