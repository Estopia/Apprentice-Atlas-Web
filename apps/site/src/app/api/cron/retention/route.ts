import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/server/database';
import { safeEqual } from '@/lib/server/security';

export async function POST(request: NextRequest) {
  const provided = request.headers.get('authorization')?.replace(/^Bearer /, '');
  const secret = process.env.CRON_SECRET;
  if (!provided || !secret || !safeEqual(provided, secret))
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const rows = await database()`select * from public.apply_web_retention()`;
  return NextResponse.json({ ok: true, retention: rows[0] });
}
