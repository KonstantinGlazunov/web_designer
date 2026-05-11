import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const CANONICAL_HOST = 'erstellen-websiten.de'
const WWW_HOST = `www.${CANONICAL_HOST}`

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')

  if (host === WWW_HOST) {
    const redirectedUrl = request.nextUrl.clone()
    redirectedUrl.host = CANONICAL_HOST
    redirectedUrl.protocol = 'https'
    redirectedUrl.port = ''
    return NextResponse.redirect(redirectedUrl, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
