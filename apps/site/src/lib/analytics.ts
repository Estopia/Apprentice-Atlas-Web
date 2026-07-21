'use client';

import posthog from 'posthog-js';

export type AtlasEvent =
  | 'partner_form_started'
  | 'partner_form_submitted'
  | 'waitlist_started'
  | 'waitlist_confirmed'
  | 'store_link_clicked'
  | 'resource_search_performed'
  | 'resource_opened'
  | 'language_changed'
  | 'consent_updated';

export function capture(
  event: AtlasEvent,
  properties: Record<string, string | number | boolean> = {},
) {
  if (
    typeof window === 'undefined' ||
    window.localStorage.getItem('aa-consent-v1') !== 'analytics' ||
    !posthog.__loaded
  )
    return;
  const safe = Object.fromEntries(
    Object.entries(properties).filter(
      ([key]) => !['email', 'name', 'message', 'search', 'query'].includes(key),
    ),
  );
  posthog.capture(event, safe);
}
