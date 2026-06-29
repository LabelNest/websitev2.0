import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

// Public — returns only name and current now_at status for a given token.
// Used by the self-serve /alumni/update page to greet the alumni by name.
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })

  const rows = await sql`
    SELECT name, now_at_company, now_at_role
    FROM website_alumni
    WHERE update_token = ${token} AND is_active = true
    LIMIT 1
  `
  if (!rows.length) return NextResponse.json({ error: 'Invalid token' }, { status: 404 })

  return NextResponse.json({ name: rows[0].name, now_at_company: rows[0].now_at_company, now_at_role: rows[0].now_at_role })
}
