import { getAtlasStats, fillStats } from '@/lib/plans'
import { LLMS_TEMPLATE } from './template'

export const revalidate = 3600

export async function GET() {
  const body = fillStats(LLMS_TEMPLATE, await getAtlasStats())
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
