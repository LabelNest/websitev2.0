import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromCookies } from '@/lib/auth'
import { sql } from '@/lib/db'

const BREVO_SEND_URL = 'https://api.brevo.com/v3/smtp/email'
const SENDER = { name: 'LabelNest', email: 'newsletter@labelnest.in' }
const BATCH_SIZE = 50

interface SendBody {
  subject?: string
  template?: string
  html_content?: string
  recipients?: string
  test_email?: string
  test?: boolean
}

interface Subscriber {
  id: string
  email: string
}

// Brevo messageId per recipient (via messageVersions, one recipient per
// version) is what open/click webhook events key off of. The previous
// approach BCC'd up to 50 subscribers per Brevo call with a single placeholder
// "to" — Brevo (or anyone) can only attribute an open/click to the addressed
// "to" recipient, so there was no way to know which of the 50 BCC'd people
// opened it. Each subscriber now gets their own version/messageId so the
// webhook receiver (/api/webhooks/brevo) can update the right recipient row.
async function sendBatch(apiKey: string, subject: string, htmlContent: string, batch: Subscriber[], campaignId: string) {
  const res = await fetch(BREVO_SEND_URL, {
    method: 'POST',
    headers: { 'api-key': apiKey, 'Content-Type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: SENDER,
      subject,
      htmlContent,
      tags: [campaignId],
      messageVersions: batch.map((s) => ({ to: [{ email: s.email }] })),
    }),
  })
  if (!res.ok) {
    const errText = await res.text()
    throw new Error(errText)
  }
  const data = await res.json().catch(() => ({}))
  const messageIds: string[] = Array.isArray(data.messageIds) ? data.messageIds : []
  return messageIds
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

  if (test) {
    const toEmails = String(test_email || '')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean)
    if (!toEmails.length) {
      return NextResponse.json({ error: 'No test recipients provided' }, { status: 400 })
    }
    try {
      // Test sends aren't tracked as a campaign — tag with a throwaway id so
      // the Brevo call shape matches production sends exactly.
      await sendBatch(apiKey, subject, html_content, toEmails.map((email) => ({ id: '', email })), 'test')
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Brevo send failed'
      return NextResponse.json({ error: 'Brevo send failed', detail: message }, { status: 502 })
    }
    return NextResponse.json({ ok: true, sent: toEmails.length, test: true })
  }

  const subscribers = await sql`
    SELECT id, email FROM website_newsletter_subscribers WHERE status = 'active'
  ` as Subscriber[]
  if (!subscribers.length) {
    return NextResponse.json({ error: 'No active subscribers to send to' }, { status: 400 })
  }

  const [campaign] = await sql`
    INSERT INTO website_newsletter_campaigns
      (subject, template_name, html_content, recipient_count, recipient_filter, status, sent_by, sent_at)
    VALUES (${subject}, ${template ?? null}, ${html_content}, ${subscribers.length}, 'all', 'sending', ${admin.email}, NOW())
    RETURNING id
  `
  const campaignId = campaign.id as string

  let sentCount = 0
  let failedBatch: string | null = null

  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE)
    let messageIds: string[]
    try {
      messageIds = await sendBatch(apiKey, subject, html_content, batch, campaignId)
    } catch (e) {
      failedBatch = e instanceof Error ? e.message : 'Network error calling Brevo'
      break
    }

    // messageIds is positional — same order as the messageVersions we sent.
    for (let j = 0; j < batch.length; j++) {
      const sub = batch[j]
      const messageId = messageIds[j] ?? null
      await sql`
        INSERT INTO website_newsletter_recipients (campaign_id, subscriber_id, email, message_id, status)
        VALUES (${campaignId}, ${sub.id}, ${sub.email}, ${messageId}, 'sent')
        ON CONFLICT (campaign_id, email) DO UPDATE SET message_id = EXCLUDED.message_id
      `
    }
    sentCount += batch.length
  }

  await sql`
    UPDATE website_newsletter_campaigns
    SET status = ${failedBatch ? 'failed' : 'sent'},
        recipient_count = ${sentCount},
        error_message = ${failedBatch},
        updated_at = NOW()
    WHERE id = ${campaignId}
  `

  if (failedBatch) {
    return NextResponse.json({ error: 'Brevo send failed', detail: failedBatch, sent: sentCount }, { status: 502 })
  }
  return NextResponse.json({ ok: true, sent: sentCount, campaign_id: campaignId, test: false })
}
