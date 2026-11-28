import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { sql } from './db'
import { gateAllows, jwtSecretBytes } from './gate'

const COOKIE_NAME = 'labelnest_admin_token'
const EXPIRY = '8h'

export interface AdminUser {
  id: string
  email: string
}

export async function signAdminToken(user: AdminUser): Promise<string> {
  const secret = jwtSecretBytes()
  if (!secret) {
    throw new Error('JWT_SECRET must be set when ACCESS_GATE_MODE=enforce')
  }
  return new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(secret)
}

export async function verifyAdminToken(token: string): Promise<AdminUser | null> {
  const secret = jwtSecretBytes()
  if (!secret) return null
  try {
    const { payload } = await jwtVerify(token, secret)
    return { id: payload.id as string, email: payload.email as string }
  } catch {
    return null
  }
}

export async function getAdminFromCookies(): Promise<AdminUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  const admin = await verifyAdminToken(token)
  if (!admin) return null
  // Access Admin gate: every admin API request re-asks (cached 60 s), so a
  // revoked person stops working within about a minute, not at 8 h expiry.
  // No-op when ACCESS_GATE_MODE is off.
  if (!(await gateAllows(admin.email))) return null
  return admin
}

export function setAdminCookie(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  }
}

export function clearAdminCookie() {
  return {
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 0,
    path: '/',
  }
}

// Verify credentials against website_admin_users table (bcrypt)
export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<AdminUser | null> {
  const bcrypt = await import('bcryptjs')
  const rows = await sql`
    SELECT id, email, password_hash
    FROM website_admin_users
    WHERE email = ${email.toLowerCase()} AND is_active = true
    LIMIT 1
  `
  if (!rows.length) return null
  const user = rows[0] as { id: string; email: string; password_hash: string }
  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) return null
  return { id: user.id, email: user.email }
}
