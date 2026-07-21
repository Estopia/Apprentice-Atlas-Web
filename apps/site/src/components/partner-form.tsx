'use client';

import type { Locale } from '@apprentice-atlas/content';
import { useState, type FormEvent } from 'react';
import { capture } from '@/lib/analytics';
import { Turnstile } from './turnstile';

export function PartnerForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [started, setStarted] = useState(false);
  const t =
    locale === 'de'
      ? {
          title: 'Pilotinteresse senden',
          org: 'Organisation',
          name: 'Name',
          role: 'Rolle',
          email: 'Geschäftliche E-Mail',
          country: 'Land',
          area: 'Interesse',
          message: 'Was möchten Sie gemeinsam erproben?',
          privacy:
            'Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.',
          submit: 'Anfrage senden',
          sending: 'Wird gesendet …',
          success: 'Danke. Wir melden uns mit konkreten nächsten Schritten.',
          error:
            'Das hat nicht funktioniert. Bitte versuchen Sie es erneut oder schreiben Sie an hello@apprenticeatlas.com.',
          website: 'Website (optional)',
          choose: 'Bitte wählen',
          school: 'Schule',
          careers: 'Berufsberatung',
          network: 'Ausbildungsnetzwerk',
          research: 'Forschung / gemeinnützig',
          de: 'Deutschland',
          uk: 'Vereinigtes Königreich',
          other: 'Anderes Land',
        }
      : {
          title: 'Register pilot interest',
          org: 'Organisation',
          name: 'Name',
          role: 'Role',
          email: 'Work email',
          country: 'Country',
          area: 'Area of interest',
          message: 'What would you like to test together?',
          privacy:
            'I have read the privacy notice and agree to my details being processed to respond to this enquiry.',
          submit: 'Send enquiry',
          sending: 'Sending …',
          success: 'Thank you. We’ll reply with concrete next steps.',
          error: 'That did not work. Please try again or email hello@apprenticeatlas.com.',
          website: 'Website (optional)',
          choose: 'Choose one',
          school: 'School',
          careers: 'Careers service',
          network: 'Apprenticeship network',
          research: 'Research / non-profit',
          de: 'Germany',
          uk: 'United Kingdom',
          other: 'Other country',
        };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const form = event.currentTarget;
    const response = await fetch('/api/forms/partner', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-requested-with': 'apprentice-atlas' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    setStatus(response.ok ? 'success' : 'error');
    if (response.ok) {
      capture('partner_form_submitted', { locale });
      form.reset();
    }
  }
  const start = () => {
    if (!started) {
      setStarted(true);
      capture('partner_form_started', { locale });
    }
  };
  return (
    <form
      className="atlas-form"
      onSubmit={submit}
      onFocus={start}
      aria-labelledby="partner-form-title"
    >
      <div className="form-heading">
        <span>FORM / 01</span>
        <h3 id="partner-form-title">{t.title}</h3>
      </div>
      <div className="form-grid">
        <label>
          <span>{t.org}</span>
          <input name="organisation" autoComplete="organization" required maxLength={140} />
        </label>
        <label>
          <span>{t.name}</span>
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          <span>{t.role}</span>
          <input name="role" autoComplete="organization-title" required maxLength={100} />
        </label>
        <label>
          <span>{t.email}</span>
          <input name="email" type="email" autoComplete="work email" required maxLength={254} />
        </label>
        <label>
          <span>{t.country}</span>
          <select name="country" required defaultValue="">
            <option value="" disabled>
              {t.choose}
            </option>
            <option value="de">{t.de}</option>
            <option value="uk">{t.uk}</option>
            <option value="other">{t.other}</option>
          </select>
        </label>
        <label>
          <span>{t.website}</span>
          <input name="website" type="url" autoComplete="url" maxLength={300} />
        </label>
        <label className="full">
          <span>{t.area}</span>
          <select name="interest" required defaultValue="">
            <option value="" disabled>
              {t.choose}
            </option>
            <option value="school">{t.school}</option>
            <option value="careers">{t.careers}</option>
            <option value="network">{t.network}</option>
            <option value="research">{t.research}</option>
          </select>
        </label>
        <label className="full">
          <span>{t.message}</span>
          <textarea name="message" required maxLength={2500} rows={5} />
        </label>
        <label className="honeypot" aria-hidden="true">
          <span>Company fax</span>
          <input name="companyFax" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="checkbox full">
          <input name="privacyAccepted" type="checkbox" value="true" required />
          <span>{t.privacy}</span>
        </label>
      </div>
      <Turnstile />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="consentVersion" value="2026-07-21" />
      <button className="button button-primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t.sending : t.submit}
        <span aria-hidden="true">→</span>
      </button>
      <p className={`form-status ${status}`} role="status">
        {status === 'success' ? t.success : status === 'error' ? t.error : ''}
      </p>
    </form>
  );
}
