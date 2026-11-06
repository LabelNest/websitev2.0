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

  const field: React.CSSProperties = { width: '100%', background: '#FFFFFF', border: '1px solid rgba(14,27,46,.22)', borderRadius: 3, padding: '12px 14px', fontSize: 15, color: '#0E1B2E', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }
  return (
    <div style={{ minHeight: '100vh', background: '#F6F3EC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#FBF9F4', border: '1px solid rgba(14,27,46,.14)', borderRadius: 2, padding: 40, width: '100%', maxWidth: 400, boxShadow: '0 30px 60px -34px rgba(14,27,46,.3)' }}>
        <div style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 28, color: '#0E1B2E', letterSpacing: '-.02em', marginBottom: 4 }}>LabelNest</div>
        <div style={{ font: '600 12px var(--font-sans), sans-serif', letterSpacing: '.14em', textTransform: 'uppercase', color: '#7A5217', marginBottom: 28 }}>Website admin</div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="admin-email" style={{ fontSize: 13, fontWeight: 600, color: '#0E1B2E', display: 'block', marginBottom: 6 }}>Email</label>
            <input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@labelnest.in" style={field} required />
          </div>
          <div style={{ marginBottom: 6 }}>
            <label htmlFor="admin-password" style={{ fontSize: 13, fontWeight: 600, color: '#0E1B2E', display: 'block', marginBottom: 6 }}>Password</label>
            <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" style={field} required />
          </div>
          {error && <div style={{ fontSize: 13, color: '#9B2C2C', marginBottom: 8 }}>{error}</div>}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: '#0E1B2E', color: '#F6F3EC', border: 0, borderRadius: 2, padding: '14px', fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, fontFamily: 'inherit', marginTop: 14 }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
