import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'fallback-secret-change-in-prod'
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // www -> non-www canonical redirect. Found via real GSC field data
  // (2026-08-16): both hosts serve live, unredirected duplicate content —
  // GSC Coverage showed "Alternate page with proper canonical tag" and
  // "Duplicate without user-selected canonical" pages, and Performance
  // showed the same pages (e.g. "/") getting separate impressions under
  // labelnest.in and www.labelnest.in. layout.tsx/sitemap.ts/ORGANIZATION_SCHEMA
  // already treat non-www as canonical everywhere; nothing previously
  // enforced it at the host level. 308 (not 301/302) to preserve the
  // request method on redirect.
  const host = request.headers.get('host') ?? ''
  if (host === 'www.labelnest.in') {
    const url = request.nextUrl.clone()
    url.hostname = 'labelnest.in'
    url.port = ''
    return NextResponse.redirect(url, 308)
  }

  // Protect /admin routes (but not the login page itself or the login API)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('labelnest_admin_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      await jwtVerify(token, SECRET)
      return NextResponse.next()
    } catch {
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('labelnest_admin_token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  // Was '/admin/:path*' only -- too narrow for the www redirect above, which
  // needs to run on every page. Excludes API routes (unaffected either way,
  // kept out to match prior scope) and Next.js static/image assets.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
