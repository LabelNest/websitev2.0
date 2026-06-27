import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { sql } from './db'

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'fallback-secret-change-in-prod'
)
const COOKIE_NAME = 'labelnest_admin_token'
const EXPIRY = '8h'

export interface AdminUser {
  id: string
  email: string
}

export async function signAdminToken(user: AdminUser): Promise<string> {
  return new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(SECRET)
}

export async function verifyAdminToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return { id: payload.id as string, email: payload.email as string }
  } catch {
    return null
  }
}

export async function getAdminFromCookies(): Promise<AdminUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyAdminToken(token)
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
