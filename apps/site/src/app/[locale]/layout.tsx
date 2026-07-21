import type { Metadata } from 'next';
import { Newsreader, Spline_Sans } from 'next/font/google';
import { getDictionary, type Locale } from '@apprentice-atlas/content';
import { Consent } from '@/components/consent';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { requireLocale } from '@/lib/i18n';
import '../globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
});

const spline = Spline_Sans({
  subsets: ['latin'],
  variable: '--font-spline-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Apprentice Atlas', template: '%s · Apprentice Atlas' },
  description:
    'A bilingual atlas for apprenticeships and career pathways in Germany and the United Kingdom.',
  applicationName: 'Apprentice Atlas',
  icons: { icon: '/icon.svg' },
};

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({ children, params }: Props) {
  const locale = requireLocale((await params).locale) as Locale;
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={locale === 'de' ? 'de-DE' : 'en-GB'}
      className={`${newsreader.variable} ${spline.variable}`}
      suppressHydrationWarning
    >
      <body>
        <nav aria-label={locale === 'de' ? 'Sprunglinks' : 'Skip links'}>
          <a className="skip-link" href="#main">
            {dictionary.skip}
          </a>
        </nav>
        <SiteHeader locale={locale} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} />
        <Consent locale={locale} />
      </body>
    </html>
  );
}
