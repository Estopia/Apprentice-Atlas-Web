'use client';

import { capture, type AtlasEvent } from '@/lib/analytics';
import { useEffect } from 'react';

export function AnalyticsEvent({
  event,
  properties,
}: {
  event: AtlasEvent;
  properties?: Record<string, string | number | boolean>;
}) {
  useEffect(() => {
    capture(event, properties);
  }, [event, properties]);
  return null;
}
