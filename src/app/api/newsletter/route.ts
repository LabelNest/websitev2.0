import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    // Upsert — don't error on duplicate
    await sql`
      INSERT INTO website_newsletter_subscribers (email, source, subscribed_at)
      VALUES (${email.toLowerCase()}, ${source || 'website'}, NOW())
      ON CONFLICT (email) DO NOTHING
    `
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
