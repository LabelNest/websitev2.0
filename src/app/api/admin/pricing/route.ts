import { NextResponse } from 'next/server'
import { getAdminFromCookies } from '@/lib/auth'
import { getPlans, getAtlasStats } from '@/lib/plans'

// What the public site is showing for prices and headline numbers right now, read live from NestLens.
export async function GET() {
  const admin = await getAdminFromCookies()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const [{ plans, live }, stats] = await Promise.all([getPlans(), getAtlasStats()])
  return NextResponse.json({ plans, live, stats })
}
