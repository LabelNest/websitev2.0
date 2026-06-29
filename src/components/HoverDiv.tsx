"use client"
import { type CSSProperties, type ReactNode } from 'react'

interface Props {
  style?: CSSProperties
  hoverBorderColor?: string
  hoverTransform?: string
  className?: string
  children: ReactNode
}

export default function HoverDiv({ style, hoverBorderColor, hoverTransform, className, children }: Props) {
  return (
    <div
      className={className}
      style={style}
      onMouseOver={e => {
        if (hoverBorderColor) e.currentTarget.style.borderColor = hoverBorderColor
        if (hoverTransform) e.currentTarget.style.transform = hoverTransform
      }}
      onMouseOut={e => {
        if (hoverBorderColor) e.currentTarget.style.borderColor = 'var(--border)'
        if (hoverTransform) e.currentTarget.style.transform = ''
      }}
    >
      {children}
    </div>
  )
}
