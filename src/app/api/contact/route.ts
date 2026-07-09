import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

// The contact page tells visitors submissions go to contact@labelnest.in —
// until this, that was only ever true of the mailto: link; form submissions
// just landed in the DB with no notification to anyone.
//
// Transport: Brevo (same account as the newsletter sender below), sending as
// LabelNest <newsletter@labelnest.in>. Previously routed through the shared
// email-service microservice (AWS SES), which was never deployed
// (EMAIL_SERVICE_URL unset) — migrated 2026-07-09 at the user's direction:
// pause AWS everywhere, use Brevo instead.
async function notifyContactSubmission(senderName: string, senderEmail: string, subject: string, message: string) {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    console.warn('[contact] BREVO_API_KEY not configured — notification not sent')
    return
  }
  const safeName = senderName.replace(/[<>&]/g, '')
  const safeEmail = senderEmail.replace(/[<>&]/g, '')
  const safeSubject = subject.replace(/[<>&]/g, '')
  const safeMessage = message.replace(/[<>&]/g, '').replace(/\n/g, '<br/>')
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        sender: { name: 'LabelNest Website', email: 'newsletter@labelnest.in' },
        to: [{ email: 'contact@labelnest.in' }],
        replyTo: { email: senderEmail, name: senderName },
        subject: `[Contact form] ${safeSubject || 'New submission'}`,
        htmlContent: `<p><strong>${safeName}</strong> (${safeEmail}) submitted the contact form.</p><p>${safeMessage}</p>`,
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
