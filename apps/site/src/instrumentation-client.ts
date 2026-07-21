type Consent = 'essential' | 'analytics';

async function initialize(choice: Consent | null) {
  if (choice !== 'analytics' || !process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  const { default: posthog } = await import('posthog-js');
  if (posthog.__loaded) return;
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com',
    defaults: '2026-01-30',
    person_profiles: 'never',
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: true,
    disable_session_recording: true,
    mask_all_text: true,
    persistence: 'localStorage',
    opt_out_capturing_by_default: true,
    sanitize_properties: (properties) => {
      for (const key of ['email', 'name', 'message', 'search', 'query']) delete properties[key];
      return properties;
    },
  });
  posthog.opt_in_capturing();
}

if (typeof window !== 'undefined') {
  initialize(window.localStorage.getItem('aa-consent-v1') as Consent | null);
  window.addEventListener('aa:consent', (event) =>
    initialize((event as CustomEvent<Consent>).detail),
  );
}
