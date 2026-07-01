import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromCookies } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function POST(req: NextRequest) {
  const admin = await getAdminFromCookies()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { rows } = await req.json() as { rows: { email: string; name?: string; source?: string }[] }
  if (!Array.isArray(rows) || rows.length === 0)
    return NextResponse.json({ error: 'No rows provided' }, { status: 400 })

  let inserted = 0
  let skipped = 0

  for (const row of rows) {
    const email = row.email?.toLowerCase().trim()
    if (!email || !email.includes('@')) { skipped++; continue }
    try {
      const result = await sql`
        INSERT INTO website_newsletter_subscribers (email, name, source, status, subscribed_at)
        VALUES (
          ${email},
          ${row.name?.trim() || null},
          ${row.source?.trim() || 'import'},
          'active',
          NOW()
        )
        ON CONFLICT (email) DO NOTHING
      `
      if ((result as any).count === '1' || (result as any).rowCount === 1) inserted++
      else skipped++
    } catch { skipped++ }
  }

  return NextResponse.json({ inserted, skipped, total: rows.length })
}
