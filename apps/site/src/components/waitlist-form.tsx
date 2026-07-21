'use client';

import type { Locale } from '@apprentice-atlas/content';
import { useState, type FormEvent } from 'react';
import { capture } from '@/lib/analytics';
import { Turnstile } from './turnstile';

export function WaitlistForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [started, setStarted] = useState(false);
  const t =
    locale === 'de'
      ? {
          email: 'E-Mail-Adresse',
          country: 'Markt',
          platform: 'Plattform',
          age: 'Ich bin mindestens 16 Jahre alt oder melde eine Person als Erziehungsberechtigte:r an.',
          submit: 'Vormerken',
          sending: 'Wird gesendet …',
          success: 'Fast geschafft: Bitte bestätige die E-Mail in deinem Postfach.',
          error: 'Die Anmeldung konnte nicht gespeichert werden. Bitte versuche es erneut.',
          de: 'Deutschland',
          uk: 'UK',
          ios: 'iPhone',
          android: 'Android',
          both: 'Beide',
        }
      : {
          email: 'Email address',
          country: 'Market',
          platform: 'Platform',
          age: 'I am at least 16, or I am signing up on behalf of a young person as their parent or carer.',
          submit: 'Join the waitlist',
          sending: 'Sending …',
          success: 'Nearly there: please confirm the email in your inbox.',
          error: 'We could not save the sign-up. Please try again.',
          de: 'Germany',
          uk: 'UK',
          ios: 'iPhone',
          android: 'Android',
          both: 'Both',
        };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const form = event.currentTarget;
    const response = await fetch('/api/forms/waitlist', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-requested-with': 'apprentice-atlas' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    setStatus(response.ok ? 'success' : 'error');
    if (response.ok) {
      capture('waitlist_confirmed', { locale, stage: 'confirmation_sent' });
      form.reset();
    }
  }
  const start = () => {
    if (!started) {
      setStarted(true);
      capture('waitlist_started', { locale });
    }
  };
  return (
    <form className="waitlist-form" onSubmit={submit} onFocus={start}>
      <label>
        <span>{t.email}</span>
        <input name="email" type="email" autoComplete="email" required maxLength={254} />
      </label>
      <label>
        <span>{t.country}</span>
        <select name="country" defaultValue="de">
          <option value="de">{t.de}</option>
          <option value="uk">{t.uk}</option>
        </select>
      </label>
      <label>
        <span>{t.platform}</span>
        <select name="platform" defaultValue="both">
          <option value="ios">{t.ios}</option>
          <option value="android">{t.android}</option>
          <option value="both">{t.both}</option>
        </select>
      </label>
      <label className="checkbox">
        <input name="ageConfirmed" type="checkbox" value="true" required />
        <span>{t.age}</span>
      </label>
      <label className="honeypot" aria-hidden="true">
        <span>Nickname</span>
        <input name="nickname" tabIndex={-1} autoComplete="off" />
      </label>
      <Turnstile />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="consentVersion" value="2026-07-21" />
      <button className="button button-primary" disabled={status === 'sending'}>
        {status === 'sending' ? t.sending : t.submit}
        <span>→</span>
      </button>
      <p className={`form-status ${status}`} role="status">
        {status === 'success' ? t.success : status === 'error' ? t.error : ''}
      </p>
    </form>
  );
}
