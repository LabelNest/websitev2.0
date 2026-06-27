'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/nestlens', label: 'Overview', exact: true },
  { href: '/nestlens/intelligence', label: 'Intelligence', exact: false },
  { href: '/nestlens/exchange', label: 'Exchange', exact: false },
  { href: '/nestlens/capital', label: 'Capital Readiness', exact: false },
]

export default function NestLensModuleNav() {
  const pathname = usePathname()
  return (
    <div style={{
      display: 'flex', gap: 4, padding: '12px 48px',
      background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 64, zIndex: 90,
    }}>
      {TABS.map(tab => {
        const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href)
        return (
          <Link key={tab.href} href={tab.href} style={{
            fontSize: 13, fontWeight: 500, padding: '7px 18px', borderRadius: 9,
            transition: 'all .15s', textDecoration: 'none',
            color: isActive ? 'var(--text)' : 'var(--text2)',
            background: isActive ? 'rgba(255,255,255,.07)' : 'transparent',
            border: isActive ? '1px solid rgba(255,255,255,.1)' : '1px solid transparent',
          }}>
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
