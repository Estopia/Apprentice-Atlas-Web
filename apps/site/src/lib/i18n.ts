import { locales, type Locale } from '@apprentice-atlas/content';
import { notFound } from 'next/navigation';

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const requireLocale = (value: string): Locale => {
  if (!isLocale(value)) notFound();
  return value;
};

export const swapLocalePath = (pathname: string, locale: Locale) => {
  const parts = pathname.split('/');
  parts[1] = locale === 'de' ? 'en' : 'de';
  return parts.join('/') || `/${locale === 'de' ? 'en' : 'de'}`;
};
