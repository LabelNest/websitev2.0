'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '/about',     label: 'About'              },
  { href: '/nestlens',  label: 'NestLens'            },
  { href: '/ecosystem', label: 'Ecosystem'           },
  { href: '/services',  label: 'Services'            },
  { href: '/briefings', label: 'Blogs & Newsletters' },
  { href: '/team',      label: 'Team'                },
  { href: '/careers',   label: 'Careers'             },
  { href: '/contact',   label: 'Contact'             },
]

export default function Nav() {
  const pathname  = usePathname()
  const [theme, setTheme]     = useState<'dark'|'light'>('dark')
  const [open, setOpen]       = useState(false)
  const [hovered, setHovered] = useState<string|null>(null)
  const [pill, setPill]       = useState({ left: 0, width: 0, opacity: 0 })
  const listRef  = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<Record<string, HTMLLIElement|null>>({})

  useEffect(() => {
    const stored = localStorage.getItem('ln-theme') as 'dark'|'light'|null
    if (stored) setTheme(stored)
  }, [])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('ln-theme', next)
  }

  // Compute pill position relative to the <ul>
  function movePillTo(href: string | null) {
    if (!href || !listRef.current) { setPill(p => ({ ...p, opacity: 0 })); return }
    const li  = itemRefs.current[href]
    const ul  = listRef.current
    if (!li) return
    const liRect = li.getBoundingClientRect()
    const ulRect = ul.getBoundingClientRect()
    setPill({ left: liRect.left - ulRect.left, width: liRect.width, opacity: 1 })
  }

  // Pill follows hover; falls back to active on mouse-leave
  function onEnter(href: string) {
    setHovered(href)
    movePillTo(href)
  }
  function onLeave() {
    setHovered(null)
    const active = links.find(l => pathname === l.href || pathname.startsWith(l.href + '/'))
    movePillTo(active?.href ?? null)
  }

  // Initialise pill on active page
  useEffect(() => {
    const active = links.find(l => pathname === l.href || pathname.startsWith(l.href + '/'))
    movePillTo(active?.href ?? null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const activeHref = links.find(l => pathname === l.href || pathname.startsWith(l.href + '/'))?.href

  return (
    <>
      <style>{`
        @keyframes ln-hop {
          0%,100% { transform: translateY(0); }
          40%      { transform: translateY(-3px); }
        }
        .ln-nav-link:hover { animation: ln-hop 0.35s ease; }
      `}</style>

      <nav
        className="fixed top-0 left-0 right-0 z-[300] border-b"
        style={{ backdropFilter:'blur(22px)', WebkitBackdropFilter:'blur(22px)', background:'var(--nav-bg)', borderColor:'var(--border)' }}
      >
        <div className="max-w-[1300px] mx-auto px-6 h-[60px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0" style={{ height: 40 }}>
            <Image
              src="https://pub-a36a86a8b72a466f95980705b327476f.r2.dev/brand/labelnest-logo.png"
              alt="LabelNest"
              width={110}
              height={34}
              style={{
                objectFit: 'contain',
                display: 'block',
                filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none',
                transition: 'filter 0.2s',
              }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul ref={listRef} className="hidden md:flex items-center list-none relative" style={{ gap:2, padding:'4px 4px' }}>

            {/* Sliding pill */}
            <div
              aria-hidden
              style={{
                position:    'absolute',
                top:         0,
                left:        pill.left,
                width:       pill.width,
                height:      '100%',
                borderRadius: 8,
                background:  hovered
                  ? 'rgba(255,255,255,.07)'
                  : activeHref
                  ? 'rgba(233,30,140,.1)'
                  : 'transparent',
                border:      !hovered && activeHref ? '1px solid rgba(233,30,140,.2)' : '1px solid transparent',
                opacity:     pill.opacity,
                transition:  'left 0.22s cubic-bezier(.4,0,.2,1), width 0.22s cubic-bezier(.4,0,.2,1), opacity 0.15s, background 0.15s, border-color 0.15s',
                pointerEvents: 'none',
                zIndex:      0,
              }}
            />

            {links.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              const lit    = hovered === href || (!hovered && active)
              return (
                <li key={href} ref={el => { itemRefs.current[href] = el }} style={{ position:'relative', zIndex:1 }}>
                  <Link
                    href={href}
                    className="ln-nav-link"
                    onMouseEnter={() => onEnter(href)}
                    onMouseLeave={onLeave}
                    style={{
                      display:       'block',
                      fontSize:      13,
                      fontWeight:    lit ? 600 : 500,
                      padding:       '6px 11px',
                      borderRadius:  8,
                      color:         active ? 'var(--pink)' : hovered === href ? 'var(--text)' : 'var(--text2)',
                      textDecoration:'none',
                      transition:    'color 0.15s, font-weight 0.15s',
                      whiteSpace:    'nowrap',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="w-[34px] h-[34px] rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ background:'var(--surface)', border:'1px solid var(--bord2)', color:'var(--text2)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1"  x2="12" y2="3"  /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"  /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1"  y1="12" x2="3"  y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" /><line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <Link
              href="/contact"
              className="hidden md:inline-flex text-[13px] font-semibold px-[18px] py-2 rounded-lg text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
              style={{ background:'var(--pink)' }}
            >
              Contact Us
            </Link>

            <button className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5" onClick={() => setOpen(!open)} aria-label="Menu">
              <span className="w-5 h-px block transition-all duration-200" style={{ background:'var(--text2)', transform: open ? 'rotate(45deg) translate(2px,2px)' : '' }} />
              <span className="w-5 h-px block transition-all duration-200" style={{ background:'var(--text2)', opacity: open ? 0 : 1 }} />
              <span className="w-5 h-px block transition-all duration-200" style={{ background:'var(--text2)', transform: open ? 'rotate(-45deg) translate(2px,-2px)' : '' }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t px-6 py-4 flex flex-col gap-1" style={{ borderColor:'var(--border)', background:'var(--nav-bg)' }}>
            {links.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link key={href} href={href} onClick={() => setOpen(false)}
                  className="text-[14px] font-medium py-2.5 px-3 rounded-lg transition-colors"
                  style={{ color: active ? 'var(--pink)' : 'var(--text2)', background: active ? 'rgba(233,30,140,.07)' : 'transparent' }}>
                  {label}
                </Link>
              )
            })}
            <Link href="/contact" onClick={() => setOpen(false)}
              className="text-[14px] font-semibold py-2.5 text-white text-center rounded-lg mt-2"
              style={{ background:'var(--pink)' }}>
              Contact Us
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}
