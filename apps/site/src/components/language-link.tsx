'use client';

import type { Locale } from '@apprentice-atlas/content';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { capture } from '@/lib/analytics';

export function LanguageLink({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const target = locale === 'de' ? 'en' : 'de';
  const path = pathname.replace(/^\/(de|en)/, `/${target}`);
  return (
    <Link
      className="language-link"
      href={path}
      hrefLang={target === 'de' ? 'de' : 'en-GB'}
      onClick={() => capture('language_changed', { from: locale, to: target })}
    >
      {target.toUpperCase()}
    </Link>
  );
}
