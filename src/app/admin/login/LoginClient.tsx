'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginClient() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      const data = await res.json()
      setError(data.error || 'Login failed')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#09090F', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#1B1B2A', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: 40, width: '100%', maxWidth: 360, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#E91E8C,#2563EB)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#E91E8C,#2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".95"/>
              <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".4"/>
              <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".4"/>
              <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".95"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 17, color: '#EBE8F6', letterSpacing: '-.02em' }}>
            Label<em style={{ fontStyle: 'normal', color: '#E91E8C' }}>Nest</em>
          </span>
        </div>

        <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 22, color: '#EBE8F6', marginBottom: 6 }}>Admin panel</div>
        <div style={{ fontSize: 13, color: '#8985A6', marginBottom: 24 }}>Sign in with your admin credentials</div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#EBE8F6', display: 'block', marginBottom: 5 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@labelnest.in"
              style={{ width: '100%', background: '#0E0E1A', border: '1px solid rgba(255,255,255,.13)', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: '#EBE8F6', outline: 'none', fontFamily: 'Inter, sans-serif' }}
              required
            />
          </div>
          <div style={{ marginBottom: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#EBE8F6', display: 'block', marginBottom: 5 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              style={{ width: '100%', background: '#0E0E1A', border: '1px solid rgba(255,255,255,.13)', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: '#EBE8F6', outline: 'none', fontFamily: 'Inter, sans-serif' }}
              required
            />
          </div>
          {error && <div style={{ fontSize: 12.5, color: '#EF4444', textAlign: 'center', marginBottom: 8 }}>{error}</div>}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: '#E91E8C', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14.5, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, fontFamily: 'Inter, sans-serif', marginTop: 8 }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div style={{ fontSize: 11.5, color: '#4C4868', textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
          Auth via Neon <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>website_admin_users</code>
        </div>
      </div>
    </div>
  )
}
