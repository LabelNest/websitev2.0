'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/nestlens', label: 'Overview', exact: true, icon: null },
  { href: '/nestlens/intelligence', label: 'Atlas', exact: false, icon: '/logos/atlas-32.png' },
  { href: '/nestlens/exchange', label: 'Exchange', exact: false, icon: '/logos/exchange-32.png' },
  { href: '/nestlens/orbit', label: 'Orbit', exact: false, icon: '/logos/orbit-32.png' },
  { href: '/nestlens/capital', label: 'Ascent', exact: false, icon: '/logos/ascent-32.png' },
  { href: '/nestlens/command', label: 'Command', exact: false, icon: '/logos/command-32.png' },
  { href: '/nestlens/connect', label: 'Connect', exact: false, icon: '/logos/connect-32.png' },
  { href: '/nestlens/pricing', label: 'Pricing', exact: false, icon: null },
  { href: '/access', label: 'Access', exact: false, icon: null },
]

// External -- NestLens's own app, not a page on this site -- rendered
// separately below so it never matches the internal isActive highlighting.
const MENTOR_APPLY_HREF = 'https://nestlens.labelnest.in/mentors/apply'

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
            display: 'flex', alignItems: 'center', gap: 7,
            fontSize: 13, fontWeight: 500, padding: '7px 18px', borderRadius: 9,
            transition: 'all .15s', textDecoration: 'none',
            color: isActive ? 'var(--text)' : 'var(--text2)',
            background: isActive ? 'rgba(255,255,255,.07)' : 'transparent',
            border: isActive ? '1px solid rgba(255,255,255,.1)' : '1px solid transparent',
          }}>
            {tab.icon && <img src={tab.icon} alt="" width={16} height={16} style={{ objectFit: 'contain' }} />}
            {tab.label}
          </Link>
        )
      })}
      <a href={MENTOR_APPLY_HREF} target="_blank" rel="noreferrer" style={{
        fontSize: 13, fontWeight: 500, padding: '7px 18px', borderRadius: 9,
        textDecoration: 'none', color: 'var(--text2)', border: '1px solid transparent',
        marginLeft: 'auto',
      }}>
        Become a mentor
      </a>
    </div>
  )
}
