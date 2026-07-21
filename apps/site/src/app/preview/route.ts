import { createHmac } from 'node:crypto';
import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { safeEqual } from '@/lib/server/security';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');
  const expires = request.nextUrl.searchParams.get('expires');
  const signature = request.nextUrl.searchParams.get('signature');
  const secret = process.env.PREVIEW_SECRET;
  if (!path?.startsWith('/') || !expires || !signature || !secret)
    return NextResponse.json({ error: 'invalid_preview' }, { status: 401 });
  const expected = createHmac('sha256', secret).update(`${path}|${expires}`).digest('hex');
  if (!safeEqual(signature, expected) || Date.now() > Number(expires))
    return NextResponse.json({ error: 'expired_preview' }, { status: 401 });
  (await draftMode()).enable();
  return NextResponse.redirect(new URL(path, request.url));
}
