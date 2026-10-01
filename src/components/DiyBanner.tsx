export default function DiyBanner() {
  return (
    <div className="px-5 md:px-12" style={{ padding: '14px 0', background: 'rgba(233,30,140,.08)', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
      <a
        href="https://nestlens.labelnest.in/DIY"
        className="flex-wrap"
        style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, rowGap: 4 }}
      >
        <span style={{ background: '#E91E8C', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, letterSpacing: '.04em', textTransform: 'uppercase', flexShrink: 0 }}>New</span>
        All brochures, pricing, and FAQs for every NestLens product — one page, no sales call
        <span style={{ color: '#E91E8C', flexShrink: 0 }}>→</span>
      </a>
    </div>
  )
}
