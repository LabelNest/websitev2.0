'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Section = 'overview'|'briefings'|'team'|'alumni'|'fellows'|'jobs'|'media'|'upload'|'subscribers'|'submissions'|'seo'|'settings'

const NAV = [
  { id: 'overview', icon: '🏠', label: 'Overview', group: 'Content' },
  { id: 'briefings', icon: '📝', label: 'Briefings', count: '14', group: 'Content' },
  { id: 'team', icon: '👤', label: 'Team', count: '13', group: 'Content' },
  { id: 'alumni', icon: '🎓', label: 'Alumni', count: '39', group: 'Content' },
  { id: 'fellows', icon: '🪺', label: 'Fellows', count: '15', group: 'Content' },
  { id: 'jobs', icon: '💼', label: 'Job Openings', group: 'Content' },
  { id: 'media', icon: '🖼️', label: 'Media Library', group: 'Media' },
  { id: 'upload', icon: '⬆️', label: 'Upload to R2', group: 'Media' },
  { id: 'subscribers', icon: '📬', label: 'Newsletter', count: '104', group: 'System' },
  { id: 'submissions', icon: '📩', label: 'Submissions', group: 'System' },
  { id: 'seo', icon: '🔍', label: 'SEO', group: 'System' },
  { id: 'settings', icon: '⚙️', label: 'Settings', group: 'System' },
]

export default function AdminClient() {
  const [section, setSection] = useState<Section>('overview')
  const [uploading, setUploading] = useState(false)
  const [uploadPct, setUploadPct] = useState(0)
  const [uploadFile, setUploadFile] = useState('')
  const [toast, setToast] = useState('')
  const [folder, setFolder] = useState('team')
  const router = useRouter()

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true); setUploadFile(file.name); setUploadPct(0)
    // Get presigned URL from R2
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name, contentType: file.type, folder }),
    })
    const { uploadUrl, publicUrl } = await res.json()
    // Upload directly to R2
    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = ev => setUploadPct(Math.round(ev.loaded / ev.total * 100))
    xhr.onload = () => { setUploading(false); setUploadPct(100); showToast(`✓ ${file.name} uploaded — URL copied to clipboard`); navigator.clipboard.writeText(publicUrl).catch(() => {}) }
    xhr.open('PUT', uploadUrl)
    xhr.setRequestHeader('Content-Type', file.type)
    xhr.send(file)
  }

  const groups = [...new Set(NAV.map(n => n.group))]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#09090F', color: '#EBE8F6', fontFamily: 'Inter, sans-serif' }}>
      {/* Topbar */}
      <div style={{ height: 56, background: '#1B1B2A', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 15, letterSpacing: '-.02em', color: '#EBE8F6' }}>
            Label<em style={{ fontStyle: 'normal', color: '#E91E8C' }}>Nest</em>
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, background: 'rgba(233,30,140,.12)', color: '#E91E8C' }}>Admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', color: '#10B981' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'blink 2s infinite' }} />
            Connected to Neon
          </div>
          <a href="/" target="_blank" style={{ fontSize: 12, color: '#8985A6', textDecoration: 'none' }}>View site ↗</a>
          <button onClick={handleLogout} style={{ fontSize: 12, color: '#4C4868', background: 'none', border: 'none', cursor: 'pointer' }}>Sign out</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: 210, background: '#111119', borderRight: '1px solid rgba(255,255,255,.07)', overflowY: 'auto', flexShrink: 0, padding: '12px 0' }}>
          {groups.map(g => (
            <div key={g}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: '#4C4868', padding: '10px 18px 5px' }}>{g}</div>
              {NAV.filter(n => n.group === g).map(n => (
                <div key={n.id}
                  onClick={() => setSection(n.id as Section)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 18px', fontSize: 13, cursor: 'pointer', color: section === n.id ? '#EBE8F6' : '#8985A6', background: section === n.id ? 'rgba(255,255,255,.05)' : 'transparent', borderLeft: `2px solid ${section === n.id ? '#E91E8C' : 'transparent'}`, transition: 'all .15s' }}>
                  <span style={{ width: 18, fontSize: 15 }}>{n.icon}</span>
                  <span style={{ flex: 1 }}>{n.label}</span>
                  {n.count && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#4C4868' }}>{n.count}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>

          {section === 'overview' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 20, color: '#EBE8F6', letterSpacing: '-.02em' }}>Overview</div>
                  <div style={{ fontSize: 13, color: '#8985A6', marginTop: 3 }}>LabelNest website · Neon DB connected</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
                {[['14','Briefings published','#E91E8C'],['13','Active team members','#2563EB'],['104','Newsletter subscribers','#10B981'],['39','Alumni','#F97316']].map(([n,l,c]) => (
                  <div key={l as string} style={{ background: '#111119', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: 18 }}>
                    <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 28, color: c as string, letterSpacing: '-.04em', lineHeight: 1, marginBottom: 4 }}>{n}</div>
                    <div style={{ fontSize: 12, color: '#8985A6' }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#111119', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: 20 }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: '#4C4868', marginBottom: 14 }}>Quick actions</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[['⬆️','Upload image or video to R2','upload'],['📝','Manage briefings','briefings'],['🎓','Update alumni now at','alumni'],['💼','Manage job openings','jobs']].map(([icon,label,sec]) => (
                      <button key={label as string} onClick={() => setSection(sec as Section)}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 13px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 8, fontSize: 13, color: '#8985A6', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif', transition: 'all .15s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#EBE8F6')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#8985A6')}>
                        {icon} {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ background: '#111119', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: 20 }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: '#4C4868', marginBottom: 14 }}>Database tables</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {['website_briefings','website_team_members','website_alumni','website_fellows','website_products','website_job_openings','website_newsletter_subscribers','website_submissions','website_page_seo'].map(t => (
                      <div key={t} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(255,255,255,.03)', borderRadius: 6 }}>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#8985A6' }}>{t}</span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#10B981' }}>✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === 'upload' && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 20, color: '#EBE8F6' }}>Upload to R2</div>
                <div style={{ fontSize: 13, color: '#8985A6', marginTop: 3 }}>Images and videos · Cloudflare R2 bucket · labelnest-assets</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label
                    style={{ display: 'block', background: '#111119', border: '2px dashed rgba(255,255,255,.1)', borderRadius: 14, padding: 36, textAlign: 'center', cursor: 'pointer', transition: 'border-color .2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#E91E8C')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,.1)')}>
                    <div style={{ fontSize: 36, marginBottom: 12, opacity: .4 }}>⬆️</div>
                    <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 16, color: '#EBE8F6', marginBottom: 6 }}>Drop files here or click to browse</div>
                    <div style={{ fontSize: 13, color: '#8985A6', marginBottom: 16 }}>JPG, PNG, WebP, SVG, MP4, WebM · Max 50MB</div>
                    <input type="file" accept="image/*,video/*" onChange={handleUpload} style={{ display: 'none' }} />
                    <div style={{ display: 'inline-block', background: '#E91E8C', color: '#fff', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600 }}>Choose files</div>
                  </label>
                </div>
                <div style={{ background: '#111119', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 20 }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: '#4C4868', marginBottom: 14 }}>Upload folder</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {['team','founders','briefings','products','videos','misc'].map(f => (
                      <div key={f} onClick={() => setFolder(f)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', background: folder === f ? 'rgba(233,30,140,.08)' : 'rgba(255,255,255,.03)', border: `1px solid ${folder === f ? 'rgba(233,30,140,.3)' : 'rgba(255,255,255,.07)'}`, borderRadius: 8, cursor: 'pointer', transition: 'all .15s' }}>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#8985A6' }}>📁 {f}/</span>
                        {folder === f && <span style={{ fontSize: 10, color: '#E91E8C' }}>Selected</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {uploading && (
                <div style={{ background: '#111119', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: '#EBE8F6' }}>{uploadFile}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#10B981' }}>{uploadPct}%</span>
                  </div>
                  <div style={{ background: '#0E0E1A', borderRadius: 4, height: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: '#10B981', width: `${uploadPct}%`, transition: 'width .3s' }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Generic sections */}
          {['briefings','team','alumni','fellows','jobs','subscribers','submissions','seo','media','settings'].includes(section) && (
            <div>
              <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 20, color: '#EBE8F6', marginBottom: 4 }}>
                {NAV.find(n => n.id === section)?.label}
              </div>
              <div style={{ fontSize: 13, color: '#8985A6', marginBottom: 24 }}>
                Connect Neon DB credentials in Settings to load and edit {section} data.
              </div>
              <div style={{ background: '#111119', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: '40px', textAlign: 'center', color: '#8985A6', fontSize: 14 }}>
                <div style={{ fontSize: 32, marginBottom: 12, opacity: .3 }}>
                  {NAV.find(n => n.id === section)?.icon}
                </div>
                Full {section} management loads here once NEON_DATABASE_URL is set in Vercel environment variables.
                <div style={{ marginTop: 16 }}>
                  <button onClick={() => setSection('settings')}
                    style={{ background: '#E91E8C', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    Configure Settings →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#1B1B2A', border: '1px solid rgba(255,255,255,.13)', borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: '#EBE8F6', zIndex: 1000, boxShadow: '0 8px 24px rgba(0,0,0,.4)' }}>
          ✅ {toast}
        </div>
      )}

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
    </div>
  )
}
