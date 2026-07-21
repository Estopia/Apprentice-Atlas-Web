import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  const started = Date.now();
  try {
    if (process.env.CMS_INTERNAL_URL) {
      const response = await fetch(`${process.env.CMS_INTERNAL_URL}/api/globals/contact?depth=0`, {
        signal: AbortSignal.timeout(1500),
        cache: 'no-store',
      });
      if (!response.ok && response.status !== 401) throw new Error('cms');
    }
    return NextResponse.json({
      status: 'ready',
      cms: process.env.CMS_INTERNAL_URL ? 'reachable' : 'fallback-content',
      durationMs: Date.now() - started,
    });
  } catch {
    return NextResponse.json({
      status: 'degraded',
      cms: 'unreachable',
      publishedFallback: true,
      durationMs: Date.now() - started,
    });
  }
}
