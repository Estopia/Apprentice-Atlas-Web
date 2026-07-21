'use client';

import Script from 'next/script';
import { useId, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        selector: string,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback': () => void;
          theme: string;
        },
      ) => string;
    };
  }
}

export function Turnstile() {
  const rawId = useId();
  const id = `turnstile-${rawId.replace(/:/g, '')}`;
  const [token, setToken] = useState('');
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) return <input type="hidden" name="turnstileToken" value="local-development" />;
  const render = () =>
    window.turnstile?.render(`#${id}`, {
      sitekey: siteKey,
      callback: setToken,
      'expired-callback': () => setToken(''),
      theme: 'light',
    });
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onLoad={render}
      />
      <div id={id} className="turnstile-widget" />
      <input type="hidden" name="turnstileToken" value={token} />
    </>
  );
}
