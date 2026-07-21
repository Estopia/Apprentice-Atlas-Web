import config from '@payload-config';
import { getPayload } from 'payload';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const payload = await getPayload({ config });
    await payload.find({ collection: 'users', limit: 1, depth: 0, overrideAccess: true });
    return NextResponse.json({ status: 'ready', service: 'cms', database: 'reachable' });
  } catch {
    return NextResponse.json({ status: 'unavailable', service: 'cms' }, { status: 503 });
  }
}
