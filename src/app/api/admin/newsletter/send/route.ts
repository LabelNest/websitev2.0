import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromCookies } from '@/lib/auth'
import { sql } from '@/lib/db'

const BREVO_SEND_URL = 'https://api.brevo.com/v3/smtp/email'
const SENDER = { name: 'LabelNest', email: 'newsletter@labelnest.in' }
const PLACEHOLDER_TO = { email: 'newsletter@labelnest.in', name: 'LabelNest Subscribers' }
const BATCH_SIZE = 50

interface SendBody {
  subject?: string
  template?: string
  html_content?: string
  recipients?: string
  test_email?: string
  test?: boolean
}

async function recordCampaign(fields: {
  subject: string
  template: string | null
  html_content: string
  recipient_count: number
  recipient_filter: string
  brevo_message_id: string | null
  status: string
  error_message: string | null
  sent_by: string
}) {
  await sql`
    INSERT INTO website_newsletter_campaigns
      (subject, template_name, html_content, recipient_count, recipient_filter,
       brevo_message_id, status, error_message, sent_by, sent_at)
    VALUES (
      ${fields.subject}, ${fields.template}, ${fields.html_content},
      ${fields.recipient_count}, ${fields.recipient_filter},
      ${fields.brevo_message_id}, ${fields.status}, ${fields.error_message},
      ${fields.sent_by}, NOW()
    )
  `
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromCookies()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'BREVO_API_KEY is not configured' }, { status: 500 })
  }

  const body: SendBody = await req.json()
  const { subject, template, html_content, test_email, test } = body

  if (!subject || !html_content) {
    return NextResponse.json({ error: 'subject and html_content are required' }, { status: 400 })
  }

  let toEmails: string[] = []
  if (test) {
    toEmails = String(test_email || '')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean)
    if (!toEmails.length) {
      return NextResponse.json({ error: 'No test recipients provided' }, { status: 400 })
    }
  } else {
    const rows = await sql`SELECT email FROM website_newsletter_subscribers WHERE status = 'active'`
    toEmails = rows.map((r) => r.email as string)
    if (!toEmails.length) {
      return NextResponse.json({ error: 'No active subscribers to send to' }, { status: 400 })
    }
  }

  const messageIds: string[] = []
  let sentCount = 0

  for (let i = 0; i < toEmails.length; i += BATCH_SIZE) {
    const batch = toEmails.slice(i, i + BATCH_SIZE)
    let res: Response
    try {
      res = await fetch(BREVO_SEND_URL, {
        method: 'POST',
        headers: { 'api-key': apiKey, 'Content-Type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          sender: SENDER,
          to: [PLACEHOLDER_TO],
          bcc: batch.map((email) => ({ email })),
          subject,
          htmlContent: html_content,
        }),
      })
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Network error calling Brevo'
      if (!test) {
        await recordCampaign({
          subject, template: template ?? null, html_content, recipient_count: sentCount,
          recipient_filter: test ? 'test' : 'all', brevo_message_id: messageIds.join(',') || null,
          status: 'failed', error_message: message, sent_by: admin.email,
        })
      }
      return NextResponse.json({ error: 'Brevo send failed', detail: message }, { status: 502 })
    }

    if (!res.ok) {
      const errText = await res.text()
      if (!test) {
        await recordCampaign({
          subject, template: template ?? null, html_content, recipient_count: sentCount,
          recipient_filter: test ? 'test' : 'all', brevo_message_id: messageIds.join(',') || null,
          status: 'failed', error_message: errText, sent_by: admin.email,
        })
      }
      return NextResponse.json({ error: 'Brevo send failed', detail: errText }, { status: 502 })
    }

    const data = await res.json().catch(() => ({}))
    if (data.messageId) messageIds.push(data.messageId)
    sentCount += batch.length
  }

  if (!test) {
    await recordCampaign({
      subject, template: template ?? null, html_content, recipient_count: sentCount,
      recipient_filter: 'all', brevo_message_id: messageIds.join(',') || null,
      status: 'sent', error_message: null, sent_by: admin.email,
    })
  }

  return NextResponse.json({ ok: true, sent: sentCount, test: !!test })
}
