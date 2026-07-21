import { getDictionary, type Locale } from '@apprentice-atlas/content';
import { Consent } from '@/components/consent';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { requireLocale } from '@/lib/i18n';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = requireLocale(raw) as Locale;
  const d = getDictionary(locale);
  return (
    <>
      <nav aria-label={locale === 'de' ? 'Sprunglinks' : 'Skip links'}>
        <a className="skip-link" href="#main">
          {d.skip}
        </a>
      </nav>
      <SiteHeader locale={locale} />
      <main id="main">{children}</main>
      <SiteFooter locale={locale} />
      <Consent locale={locale} />
    </>
  );
}
