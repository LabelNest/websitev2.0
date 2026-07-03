import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

// The contact page tells visitors submissions go to contact@labelnest.in —
// until this, that was only ever true of the mailto: link; form submissions
// just landed in the DB with no notification to anyone.
async function notifyContactSubmission(senderName: string, senderEmail: string, subject: string, message: string) {
  const url = process.env.EMAIL_SERVICE_URL
  const key = process.env.EMAIL_SERVICE_KEY
  if (!url || !key) {
    console.warn('[contact] EMAIL_SERVICE_URL/EMAIL_SERVICE_KEY not configured — notification not sent')
    return
  }
  try {
    const res = await fetch(`${url}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': key },
      body: JSON.stringify({
        app: 'website',
        template: 'contact_form',
        to: 'contact@labelnest.in',
        data: { senderName, senderEmail, subject, message },
      }),
    })
    if (!res.ok) console.error('[contact] notification email failed:', await res.text())
  } catch (err) {
    console.error('[contact] notification email error:', err)
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message, inquiry_type } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const subject = inquiry_type ? `[${inquiry_type}] ${company || ''}`.trim() : company || ''
    await sql`
      INSERT INTO website_submissions (name, email, subject, message, category, created_at)
      VALUES (
        ${name},
        ${email},
        ${subject},
        ${message},
        'contact',
        NOW()
      )
    `
    // Fire-and-forget — a notification failure shouldn't fail the submission
    // itself, which is already safely stored above.
    void notifyContactSubmission(name, email, subject, message)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
