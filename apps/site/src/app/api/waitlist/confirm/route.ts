import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/server/database';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const locale = request.nextUrl.searchParams.get('locale') === 'de' ? 'de' : 'en';
  if (!token || token.length > 100)
    return NextResponse.redirect(new URL(`/${locale}?waitlist=invalid`, request.url));
  const hash = createHash('sha256').update(token).digest('hex');
  const sql = database();
  const rows =
    await sql`update public.waitlist_entries set confirmed_at = now(), confirmation_token_hash = null, confirmation_expires_at = null where confirmation_token_hash = ${hash} and confirmation_expires_at > now() and confirmed_at is null returning id`;
  return NextResponse.redirect(
    new URL(`/${locale}?waitlist=${rows.length ? 'confirmed' : 'invalid'}`, request.url),
  );
}
