import { describe, expect, it } from 'vitest';

import { bypassLocaleRouting } from './request-path';

describe('bypassLocaleRouting', () => {
  it.each([
    '/images/app/dashboard.webp',
    '/icon.svg',
    '/rss.xml',
    '/_next/image',
    '/api/search',
    '/health/ready',
    '/opengraph-image',
  ])('keeps the non-localised route %s unchanged', (pathname) => {
    expect(bypassLocaleRouting(pathname)).toBe(true);
  });

  it.each(['/', '/de', '/en/product/app', '/ressourcen'])(
    'continues locale routing for %s',
    (pathname) => {
      expect(bypassLocaleRouting(pathname)).toBe(false);
    },
  );
});
