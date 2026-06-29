'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

type State = 'loading' | 'invalid' | 'form' | 'success'

function AlumniUpdateForm() {
  const params   = useSearchParams()
  const token    = params.get('token') ?? ''

  const [state,      setState]      = useState<State>('loading')
  const [alumniName, setAlumniName] = useState('')
  const [existing,   setExisting]   = useState({ company: '', role: '' })
  const [nowType,    setNowType]    = useState('working')
  const [company,    setCompany]    = useState('')
  const [role,       setRole]       = useState('')
  const [url,        setUrl]        = useState('')
  const [photo,      setPhoto]      = useState('')
  const [saving,     setSaving]     = useState(false)
  const [error,      setError]      = useState('')

  const NOW_AT_TYPES = [
    { value: 'working',    label: 'Working at'    },
    { value: 'studying',   label: 'Studying at'   },
    { value: 'founding',   label: 'Founded'       },
    { value: 'consulting', label: 'Consulting at' },
    { value: 'freelance',  label: 'Freelancing'   },
  ]

  useEffect(() => {
    if (!token) { setState('invalid'); return }
    fetch(`/api/alumni/lookup?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) { setState('invalid'); return }
        setAlumniName(d.name)
        setExisting({ company: d.now_at_company ?? '', role: d.now_at_role ?? '' })
        setCompany(d.now_at_company ?? '')
        setRole(d.now_at_role ?? '')
        setState('form')
      })
      .catch(() => setState('invalid'))
  }, [token])

  async function submit() {
    if (!company.trim() || !role.trim()) { setError('Company and role are required'); return }
    setSaving(true); setError('')
    const res  = await fetch('/api/alumni/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, company: company.trim(), role: role.trim(), url: url.trim(), image_url: photo.trim() || undefined, now_at_type: nowType }),
    })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { setError(data.error ?? 'Something went wrong'); return }
    setState('success')
  }

  const inp: React.CSSProperties = {
    width: '100%', background: '#111113', border: '1px solid rgba(255,255,255,.1)',
    borderRadius: 10, padding: '12px 16px', fontSize: 15, color: '#f4f4f5',
    outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 20px' }}>
      {/* Header */}
      <Link href="/" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 22, color: '#f4f4f5', textDecoration: 'none', letterSpacing: '-.03em', marginBottom: 48 }}>
        Label<span style={{ color: '#E91E8C' }}>Nest</span>
      </Link>

      <div style={{ width: '100%', maxWidth: 480, background: '#111113', border: '1px solid rgba(255,255,255,.08)', borderRadius: 20, padding: 36, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#E91E8C,#2563EB)' }} />

        {state === 'loading' && (
          <div style={{ textAlign: 'center', color: '#71717a', fontSize: 14, padding: '24px 0' }}>Loading…</div>
        )}

        {state === 'invalid' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔗</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 22, color: '#f4f4f5', marginBottom: 10 }}>Link not recognised</div>
            <p style={{ fontSize: 14, color: '#a1a1aa', lineHeight: 1.65, marginBottom: 24 }}>
              This link may have expired or already been used. Reach out to the team and we'll send you a fresh one.
            </p>
            <a href="mailto:hr@labelnest.in" style={{ display: 'inline-block', background: '#E91E8C', color: '#fff', borderRadius: 9, padding: '10px 22px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              hr@labelnest.in
            </a>
          </div>
        )}

        {state === 'form' && (
          <>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: '#E91E8C', marginBottom: 10 }}>Alumni — Update</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 26, color: '#f4f4f5', letterSpacing: '-.03em', marginBottom: 6 }}>
              Hey, {alumniName.split(' ')[0]} 👋
            </div>
            <p style={{ fontSize: 14, color: '#a1a1aa', lineHeight: 1.65, marginBottom: 28 }}>
              {existing.company
                ? `You're currently listed as working at ${existing.company}. Update it below anytime.`
                : `Tell us where you landed. We'll show it on your alumni card at labelnest.in/team.`}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#a1a1aa', marginBottom: 5 }}>Status</label>
                <select style={{ ...inp, background: '#111113' }} value={nowType} onChange={e => setNowType(e.target.value)}>
                  {NOW_AT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#a1a1aa', marginBottom: 5 }}>
                  {nowType === 'studying' ? 'Institution *' : nowType === 'founding' ? 'Company / Startup *' : 'Company *'}
                </label>
                <input style={inp} placeholder={nowType === 'studying' ? 'e.g. IIM Bangalore, BITS Pilani' : 'e.g. Google, Accel, your startup name'} value={company} onChange={e => setCompany(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#a1a1aa', marginBottom: 5 }}>Role *</label>
                <input style={inp} placeholder="e.g. Senior Data Engineer" value={role} onChange={e => setRole(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#a1a1aa', marginBottom: 5 }}>Profile or company URL <span style={{ fontWeight: 400, color: '#52525b' }}>(optional)</span></label>
                <input style={inp} placeholder="https://linkedin.com/in/... or company website" value={url} onChange={e => setUrl(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#a1a1aa', marginBottom: 5 }}>Photo URL <span style={{ fontWeight: 400, color: '#52525b' }}>(optional — paste a link to your headshot)</span></label>
                <input style={inp} placeholder="https://..." value={photo} onChange={e => setPhoto(e.target.value)} />
              </div>

              {error && <div style={{ fontSize: 12.5, color: '#EF4444', padding: '8px 12px', background: 'rgba(239,68,68,.08)', borderRadius: 7 }}>{error}</div>}

              <button onClick={submit} disabled={saving}
                style={{ width: '100%', background: '#E91E8C', color: '#fff', border: 'none', borderRadius: 10, padding: '13px 0', fontSize: 14, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? .7 : 1, fontFamily: 'Inter, sans-serif', marginTop: 4 }}>
                {saving ? 'Saving…' : 'Update my card'}
              </button>
            </div>
          </>
        )}

        {state === 'success' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,.12)', border: '1px solid rgba(16,185,129,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 26 }}>✓</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 24, color: '#f4f4f5', marginBottom: 10 }}>Done, {alumniName.split(' ')[0]}!</div>
            <p style={{ fontSize: 14, color: '#a1a1aa', lineHeight: 1.65, marginBottom: 28 }}>
              Your card on the alumni wall has been updated. It&apos;ll show &quot;{NOW_AT_TYPES.find(t=>t.value===nowType)?.label} {company}&quot; to anyone who visits.
            </p>
            <Link href="/team" style={{ display: 'inline-block', background: 'rgba(255,255,255,.06)', color: '#f4f4f5', border: '1px solid rgba(255,255,255,.1)', borderRadius: 9, padding: '10px 22px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              View the team wall →
            </Link>
          </div>
        )}
      </div>

      <div style={{ marginTop: 24, fontSize: 12, color: '#3f3f46' }}>
        © 2026 LabelNest India Private Limited
      </div>
    </div>
  )
}

export default function AlumniUpdatePage() {
  return (
    <Suspense>
      <AlumniUpdateForm />
    </Suspense>
  )
}
