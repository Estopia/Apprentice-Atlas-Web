import { partnerNotification } from '@apprentice-atlas/email';
import { createHash, randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { database } from '@/lib/server/database';
import { mailer, mailFrom } from '@/lib/server/mailer';
import { allowRequest, validOrigin, verifyTurnstile } from '@/lib/server/security';

const schema = z.object({
  organisation: z.string().trim().min(2).max(140),
  name: z.string().trim().min(2).max(100),
  role: z.string().trim().min(2).max(100),
  email: z
    .email()
    .max(254)
    .transform((v) => v.toLowerCase()),
  country: z.enum(['de', 'uk', 'other']),
  website: z.union([z.literal(''), z.url().max(300)]).optional(),
  interest: z.enum(['school', 'careers', 'network', 'research']),
  message: z.string().trim().min(10).max(2500),
  privacyAccepted: z.literal('true'),
  consentVersion: z.string().min(1).max(40),
  locale: z.enum(['de', 'en']),
  companyFax: z.string().max(0),
  turnstileToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  if (!validOrigin(request)) return NextResponse.json({ error: 'invalid_origin' }, { status: 403 });
  if (!allowRequest(request, 5))
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
  if (!(await verifyTurnstile(request, parsed.data.turnstileToken)))
    return NextResponse.json({ error: 'challenge_failed' }, { status: 403 });
  const data = parsed.data;
  const sql = database();
  const digest = createHash('sha256')
    .update(`${data.email}|${data.organisation}|${data.message}`)
    .digest('hex');
  await sql`insert into public.partner_leads (id, organisation, contact_name, role, email, country, website, interest, message, privacy_version, locale, idempotency_key) values (${randomUUID()}, ${data.organisation}, ${data.name}, ${data.role}, ${data.email}, ${data.country}, ${data.website || null}, ${data.interest}, ${data.message}, ${data.consentVersion}, ${data.locale}, ${digest}) on conflict (idempotency_key) do nothing`;
  const notification = partnerNotification(data);
  await mailer().sendMail({
    from: mailFrom,
    to: process.env.PARTNER_INBOX ?? 'hello@apprenticeatlas.com',
    replyTo: data.email,
    ...notification,
  });
  return NextResponse.json({ ok: true }, { status: 201 });
}
