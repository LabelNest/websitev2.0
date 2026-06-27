import Link from 'next/link'

const cols = [
  {
    label: 'Products',
    links: [
      { href: '/nestlens', label: 'NestLens' },
      { href: '/nestlens/intelligence', label: 'Intelligence' },
      { href: '/nestlens/exchange', label: 'Exchange' },
      { href: '/nestlens/capital', label: 'Capital Readiness' },
      { href: '/nesthr', label: 'NestHR' },
      { href: '/ecosystem', label: 'All products' },
    ],
  },
  {
    label: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/team', label: 'Team' },
      { href: '/about/ankit', label: 'Founder' },
      { href: '/careers', label: 'Careers' },
      { href: '/briefings', label: 'Briefings' },
    ],
  },
  {
    label: 'Services',
    links: [
      { href: '/services', label: 'Managed Services' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { href: '/legal/privacy', label: 'Privacy Policy' },
      { href: '/legal/terms', label: 'Terms and Conditions' },
      { href: '/legal/cookies', label: 'Cookie Policy' },
      { href: '/legal/security', label: 'Security Policy' },
      { href: '/legal', label: 'All legal docs' },
    ],
  },
]

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
    >
      <div className="max-w-[1240px] mx-auto px-8 pt-14 pb-8">
        {/* Top: logo + newsletter */}
        <div className="flex flex-col md:flex-row gap-12 justify-between mb-12">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
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
            <p className="text-[13px] leading-relaxed mb-1" style={{ color: 'var(--text2)' }}>
              Data Done, Right.
            </p>
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text3)' }}>
              Bengaluru, Karnataka, India
            </p>
          </div>

          {/* Operator to Founder newsletter */}
          <div className="max-w-sm">
            <div
              className="font-mono text-[9.5px] tracking-widest uppercase mb-3"
              style={{ color: 'var(--text3)' }}
            >
              Founder's Newsletter
            </div>
            <div
              className="font-display font-bold text-[16px] tracking-tight mb-1"
              style={{ color: 'var(--text)' }}
            >
              Operator to Founder
            </div>
            <p className="text-[13px] mb-3" style={{ color: 'var(--text2)' }}>
              Building LabelNest from zero. Sharing the journey as it happens.
            </p>
            <a
              href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7472967819387686913"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-semibold px-4 py-2.5 rounded-lg text-white transition-opacity hover:opacity-88"
              style={{ background: 'var(--orange)' }}
            >
              Follow on LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b" style={{ borderColor: 'var(--border)' }}>
          {cols.map((col) => (
            <div key={col.label}>
              <div
                className="font-mono text-[9.5px] tracking-widest uppercase mb-4"
                style={{ color: 'var(--text3)' }}
              >
                {col.label}
              </div>
              <ul className="flex flex-col gap-2 list-none">
                {col.links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[13px] transition-colors duration-150"
                      style={{ color: 'var(--text2)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text2)')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-[12px]" style={{ color: 'var(--text3)' }}>
            © 2026 LabelNest India Private Limited. All rights reserved.
          </span>
          <span
            className="font-mono text-[10.5px] tracking-wide"
            style={{ color: 'var(--text3)' }}
          >
            Built by people with the right potential.
          </span>
        </div>
      </div>
    </footer>
  )
}
