import { waitlistConfirmation } from '@apprentice-atlas/email';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { database } from '@/lib/server/database';
import { mailer, mailFrom } from '@/lib/server/mailer';
import { allowRequest, validOrigin, verifyTurnstile } from '@/lib/server/security';

const schema = z.object({
  email: z
    .email()
    .max(254)
    .transform((v) => v.toLowerCase()),
  country: z.enum(['de', 'uk']),
  platform: z.enum(['ios', 'android', 'both']),
  ageConfirmed: z.literal('true'),
  consentVersion: z.string().min(1).max(40),
  locale: z.enum(['de', 'en']),
  nickname: z.string().max(0),
  turnstileToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  if (!validOrigin(request)) return NextResponse.json({ error: 'invalid_origin' }, { status: 403 });
  if (!allowRequest(request, 6))
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
  if (!(await verifyTurnstile(request, parsed.data.turnstileToken)))
    return NextResponse.json({ error: 'challenge_failed' }, { status: 403 });
  const token = randomBytes(32).toString('base64url');
  const tokenHash = createHash('sha256').update(token).digest('hex');
  const data = parsed.data;
  const sql = database();
  await sql`insert into public.waitlist_entries (id, email, country, platform, locale, consent_version, confirmation_token_hash, confirmation_expires_at) values (${randomUUID()}, ${data.email}, ${data.country}, ${data.platform}, ${data.locale}, ${data.consentVersion}, ${tokenHash}, now() + interval '24 hours') on conflict (email, country) do update set platform = excluded.platform, locale = excluded.locale, consent_version = excluded.consent_version, confirmation_token_hash = excluded.confirmation_token_hash, confirmation_expires_at = excluded.confirmation_expires_at, confirmed_at = null, created_at = now()`;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const href = `${base}/api/waitlist/confirm?token=${encodeURIComponent(token)}&locale=${data.locale}`;
  const message = waitlistConfirmation(data.locale, href);
  await mailer().sendMail({ from: mailFrom, to: data.email, ...message });
  return NextResponse.json({ ok: true }, { status: 201 });
}
