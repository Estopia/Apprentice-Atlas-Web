import { createHmac } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { safeEqual } from '@/lib/server/security';

const schema = z.object({
  paths: z.array(z.string().startsWith('/')).max(30),
  tags: z.array(z.string().min(1).max(150)).max(30),
  timestamp: z.number().int(),
});

export async function POST(request: NextRequest) {
  const raw = await request.text();
  const signature = request.headers.get('x-atlas-signature');
  const secret = process.env.REVALIDATION_SECRET;
  if (
    !signature ||
    !secret ||
    !safeEqual(signature, createHmac('sha256', secret).update(raw).digest('hex'))
  )
    return NextResponse.json({ error: 'invalid_signature' }, { status: 401 });
  const parsed = schema.safeParse(JSON.parse(raw));
  if (!parsed.success || Math.abs(Date.now() - parsed.data.timestamp) > 5 * 60_000)
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  for (const path of parsed.data.paths) revalidatePath(path);
  for (const tag of parsed.data.tags) revalidateTag(tag, 'max');
  return NextResponse.json({
    revalidated: true,
    paths: parsed.data.paths.length,
    tags: parsed.data.tags.length,
  });
}
