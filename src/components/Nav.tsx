'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  { href: '/nestlens', label: 'NestLens' },
  { href: '/ecosystem', label: 'Ecosystem' },
  { href: '/services', label: 'Services' },
  { href: '/briefings', label: 'Briefings' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('ln-theme') as 'dark' | 'light' | null
    if (stored) setTheme(stored)
  }, [])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('ln-theme', next)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[300] border-b"
      style={{
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        background: 'var(--nav-bg)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-[1240px] mx-auto px-8 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#E91E8C,#2563EB)' }}
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".95" />
              <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".4" />
              <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".4" />
              <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".95" />
            </svg>
          </div>
          <span
            className="font-display font-extrabold text-[17px] tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            Label<em className="not-italic" style={{ color: 'var(--pink)' }}>Nest</em>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5 list-none">
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[13px] font-medium px-3 py-1.5 rounded-[7px] transition-colors duration-150"
                  style={{
                    color: active ? 'var(--pink)' : 'var(--text2)',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--text)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = active
                      ? 'var(--pink)'
                      : 'var(--text2)')
                  }
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-[34px] h-[34px] rounded-lg flex items-center justify-center transition-all duration-200"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--bord2)',
              color: 'var(--text2)',
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex text-[13px] font-semibold px-[18px] py-2 rounded-lg text-white transition-all duration-200 hover:opacity-90"
            style={{ background: 'var(--pink)' }}
          >
            Contact Us
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className="w-5 h-px block" style={{ background: 'var(--text2)' }} />
            <span className="w-5 h-px block" style={{ background: 'var(--text2)' }} />
            <span className="w-5 h-px block" style={{ background: 'var(--text2)' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t px-8 py-4 flex flex-col gap-2"
          style={{ borderColor: 'var(--border)', background: 'var(--nav-bg)' }}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[14px] font-medium py-2"
              style={{ color: 'var(--text2)' }}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-[14px] font-semibold py-2 text-white text-center rounded-lg mt-2"
            style={{ background: 'var(--pink)' }}
            onClick={() => setOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  )
}
