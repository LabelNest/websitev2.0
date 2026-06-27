import { NextResponse } from 'next/server'
import { getActiveJobs } from '@/lib/db'

export async function GET() {
  try {
    const jobs = await getActiveJobs()
    return NextResponse.json({ jobs })
  } catch {
    return NextResponse.json({ jobs: [] })
  }
}
