import { NextRequest, NextResponse } from 'next/server';

import { bypassLocaleRouting } from '@/lib/request-path';

const supported = ['de', 'en'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (bypassLocaleRouting(pathname)) {
    return NextResponse.next();
  }
  if (pathname === '/') {
    const language = request.headers.get('accept-language')?.toLowerCase() ?? '';
    return NextResponse.redirect(new URL(language.startsWith('de') ? '/de' : '/en', request.url));
  }
  const first = pathname.split('/')[1];
  if (
    !first ||
    (!supported.includes(first) &&
      !pathname.startsWith('/api/') &&
      !pathname.startsWith('/health/'))
  ) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-atlas-locale', supported.includes(first ?? '') ? first! : 'en');
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
