'use client'
import Image from 'next/image'
import { useState } from 'react'
import type { Alumni } from '@/lib/db'

const NOW_AT_TYPES = [
  { value: 'working',    label: 'Working at'    },
  { value: 'studying',   label: 'Studying at'   },
  { value: 'founding',   label: 'Founded'       },
  { value: 'consulting', label: 'Consulting at' },
  { value: 'freelance',  label: 'Freelancing'   },
]

function nowAtLabel(type: string | null) {
  return NOW_AT_TYPES.find(t => t.value === type)?.label ?? 'Now at'
}

export default function AlumniGrid({ initial }: { initial: Alumni[] }) {
  const [alumni, setAlumni]   = useState(initial)
  const [editing, setEditing] = useState<string | null>(null)
  const [nowType, setNowType] = useState('working')
  const [company, setCompany] = useState('')
  const [role, setRole]       = useState('')
  const [url, setUrl]         = useState('')
  const [token, setToken]     = useState('')
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')

  async function submit(id: string) {
    if (!token || !company || !role) { setError('Token, company and role are required'); return }
    setSaving(true); setError('')
    const res  = await fetch('/api/alumni/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, company, role, url, now_at_type: nowType }),
    })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { setError(data.error ?? 'Invalid token'); return }
    setAlumni(prev => prev.map(a => a.id === id
      ? { ...a, now_at_company: company, now_at_role: role, now_at_url: url || null, now_at_type: nowType }
      : a))
    setEditing(null)
    setToken(''); setCompany(''); setRole(''); setUrl(''); setError('')
  }

  const inp: React.CSSProperties = {
    width: '100%', background: 'var(--bg)', border: '1px solid rgba(255,255,255,.1)',
    borderRadius: 6, padding: '6px 9px', fontSize: 11.5, color: 'var(--text)', outline: 'none',
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" style={{ gap: 12 }}>
      {alumni.map(a => (
        <div key={a.id}
          className="transition-all duration-200 hover:-translate-y-1"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 14 }}>
          <div className="overflow-hidden relative flex-shrink-0" style={{ width: 40, height: 40, borderRadius: '50%', marginBottom: 10, background: 'linear-gradient(135deg,rgba(16,185,129,.12),rgba(37,99,235,.08))' }}>
            {a.image_url ? (
              <Image src={a.image_url} alt={a.name} fill className="object-cover object-top" sizes="40px" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-display font-bold" style={{ fontSize: 14, color: '#10B981' }}>
                {a.name[0]}
              </div>
            )}
          </div>
          <div className="font-display font-bold" style={{ fontSize: 12.5, letterSpacing: '-.01em', color: 'var(--text)', marginBottom: 2, lineHeight: 1.3 }}>{a.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text2)', marginBottom: 6, lineHeight: 1.4 }}>{a.role}</div>

          {a.now_at_company ? (
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.06em', textTransform: 'uppercase', color: '#10B981', lineHeight: 1.4 }}>
              {nowAtLabel(a.now_at_type)}{' '}
              {a.now_at_url
                ? <a href={a.now_at_url} target="_blank" rel="noopener noreferrer" style={{ color: '#10B981', textDecoration: 'none' }}>{a.now_at_company}</a>
                : a.now_at_company}
            </div>
          ) : editing === a.id ? (
            <div style={{ marginTop: 6 }}>
              <select style={{ ...inp, marginBottom: 4 }} value={nowType} onChange={e => setNowType(e.target.value)}>
                {NOW_AT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <input style={{ ...inp, marginBottom: 4 }} placeholder="Your token" value={token} onChange={e => setToken(e.target.value)} />
              <input style={{ ...inp, marginBottom: 4 }} placeholder={nowType === 'studying' ? 'Institution' : 'Company'} value={company} onChange={e => setCompany(e.target.value)} />
              <input style={{ ...inp, marginBottom: 4 }} placeholder="Your role / course" value={role} onChange={e => setRole(e.target.value)} />
              <input style={{ ...inp, marginBottom: 6 }} placeholder="URL (optional)" value={url} onChange={e => setUrl(e.target.value)} />
              {error && <div style={{ fontSize: 10, color: '#EF4444', marginBottom: 4 }}>{error}</div>}
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={() => submit(a.id)} disabled={saving}
                  style={{ flex: 1, background: '#10B981', color: '#fff', border: 'none', borderRadius: 5, padding: '5px 0', fontSize: 10, fontWeight: 600, cursor: 'pointer', opacity: saving ? .6 : 1 }}>
                  {saving ? '...' : 'Save'}
                </button>
                <button onClick={() => { setEditing(null); setError('') }}
                  style={{ background: 'none', border: '1px solid rgba(255,255,255,.1)', borderRadius: 5, padding: '5px 8px', fontSize: 10, color: 'var(--text3)', cursor: 'pointer' }}>
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => { setEditing(a.id); setToken(''); setCompany(''); setRole(''); setUrl(''); setNowType('working'); setError('') }}
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text3)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              Update now at →
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
