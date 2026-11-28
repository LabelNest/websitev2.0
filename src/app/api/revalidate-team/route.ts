import { timingSafeEqual } from 'node:crypto'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Refreshes the team page now instead of waiting for the 5-minute cache. Called by NestHR (or by hand) with the shared secret.
export async function POST(req: Request) {
  const secret = process.env.TEAM_REVALIDATE_SECRET
  const given = req.headers.get('x-revalidate-key') ?? ''
  if (!secret || given.length !== secret.length || !timingSafeEqual(Buffer.from(given), Buffer.from(secret))) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  revalidateTag('team-feed', 'max')
  revalidatePath('/team')
  revalidatePath('/team/[slug]', 'page')
  return NextResponse.json({ ok: true })
}
