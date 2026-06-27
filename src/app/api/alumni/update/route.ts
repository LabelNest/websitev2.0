import { NextRequest, NextResponse } from 'next/server'
import { getAlumniByToken, updateAlumniNowAt } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { token, company, role, url } = await req.json()
    if (!token || !company || !role) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    const alumni = await getAlumniByToken(token)
    if (!alumni) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 404 })
    }
    await updateAlumniNowAt(alumni.id, company, role, url || null)
    return NextResponse.json({ ok: true, name: alumni.name })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
