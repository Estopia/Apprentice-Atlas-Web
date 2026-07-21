import 'server-only';
import { createHash, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

const buckets = new Map<string, { count: number; resetAt: number }>();

const ipKey = (request: NextRequest) =>
  createHash('sha256')
    .update(
      request.headers.get('cf-connecting-ip') ??
        request.headers.get('x-forwarded-for')?.split(',')[0] ??
        'local',
    )
    .digest('hex');

export function allowRequest(request: NextRequest, limit = 8, windowMs = 10 * 60_000) {
  const now = Date.now();
  const key = `${request.nextUrl.pathname}:${ipKey(request)}`;
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

export function validOrigin(request: NextRequest) {
  if (request.headers.get('x-requested-with') !== 'apprentice-atlas') return false;
  const origin = request.headers.get('origin');
  if (!origin) return false;
  const allowed = new Set([
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    'http://localhost:3000',
  ]);
  return allowed.has(origin);
}

export async function verifyTurnstile(request: NextRequest, token?: string) {
  if (!process.env.TURNSTILE_SECRET_KEY) return process.env.NODE_ENV !== 'production';
  if (!token) return false;
  const form = new FormData();
  form.set('secret', process.env.TURNSTILE_SECRET_KEY);
  form.set('response', token);
  form.set('remoteip', request.headers.get('cf-connecting-ip') ?? '');
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
    cache: 'no-store',
  });
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
