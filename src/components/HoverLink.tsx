"use client"
import Link from 'next/link'
import { type CSSProperties, type ReactNode } from 'react'

interface Props {
  href: string
  style?: CSSProperties
  hoverTransform?: string
  children: ReactNode
}

export default function HoverLink({ href, style, hoverTransform = 'translateY(-5px)', children }: Props) {
  return (
    <Link
      href={href}
      style={style}
      onMouseOver={e => { e.currentTarget.style.transform = hoverTransform }}
      onMouseOut={e => { e.currentTarget.style.transform = '' }}
    >
      {children}
    </Link>
  )
}
