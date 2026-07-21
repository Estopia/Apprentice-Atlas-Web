'use client';

import { getDictionary, type Locale } from '@apprentice-atlas/content';
import { useEffect, useState, useSyncExternalStore } from 'react';

const key = 'aa-consent-v1';
type Choice = 'essential' | 'analytics';

export function Consent({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const choice = useSyncExternalStore(
    (notify) => {
      window.addEventListener('aa:consent', notify);
      window.addEventListener('storage', notify);
      return () => {
        window.removeEventListener('aa:consent', notify);
        window.removeEventListener('storage', notify);
      };
    },
    () => (window.localStorage.getItem(key) as Choice | null) ?? 'unset',
    () => 'loading',
  );
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => setOpen(true);
    document
      .querySelectorAll('[data-consent-settings]')
      .forEach((el) => el.addEventListener('click', handler));
    return () =>
      document
        .querySelectorAll('[data-consent-settings]')
        .forEach((el) => el.removeEventListener('click', handler));
  }, []);
  const decide = async (value: Choice) => {
    window.localStorage.setItem(key, value);
    setOpen(false);
    window.dispatchEvent(new CustomEvent('aa:consent', { detail: value }));
  };
  if ((!open && choice !== 'unset') || choice === 'loading') return null;
  return (
    <div className="consent" aria-label={d.consentTitle} role="dialog" aria-modal="false">
      <div>
        <p className="eyebrow">Privacy / 01</p>
        <h2>{d.consentTitle}</h2>
        <p>{d.consentBody}</p>
      </div>
      <div className="consent-actions">
        <button className="button button-secondary" onClick={() => decide('essential')}>
          {d.reject}
        </button>
        <button className="button button-primary" onClick={() => decide('analytics')}>
          {d.accept}
        </button>
      </div>
    </div>
  );
}
