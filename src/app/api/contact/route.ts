import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message, inquiry_type } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    await sql`
      INSERT INTO website_submissions (name, email, subject, message, category, created_at)
      VALUES (
        ${name},
        ${email},
        ${inquiry_type ? `[${inquiry_type}] ${company || ''}`.trim() : company || ''},
        ${message},
        'contact',
        NOW()
      )
    `
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
