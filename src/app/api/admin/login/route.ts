import { NextRequest, NextResponse } from 'next/server'
import { gateAllows } from '@/lib/gate'
import { verifyAdminCredentials, signAdminToken, setAdminCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
    }
    const user = await verifyAdminCredentials(email, password)
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    if (!(await gateAllows(user.email))) {
      return NextResponse.json({ error: 'No access. Ask for access in Access Admin.' }, { status: 403 })
    }
    const token = await signAdminToken(user)
    const response = NextResponse.json({ ok: true, email: user.email })
    response.cookies.set(setAdminCookie(token))
    return response
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
