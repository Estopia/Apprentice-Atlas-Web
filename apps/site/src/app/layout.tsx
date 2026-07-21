import type { Metadata } from 'next';
import { Newsreader, Spline_Sans } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
});
const spline = Spline_Sans({ subsets: ['latin'], variable: '--font-spline-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Apprentice Atlas', template: '%s · Apprentice Atlas' },
  description:
    'A bilingual atlas for apprenticeships and career pathways in Germany and the United Kingdom.',
  applicationName: 'Apprentice Atlas',
  icons: { icon: '/icon.svg' },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = (await headers()).get('x-atlas-locale') === 'de' ? 'de' : 'en';
  return (
    <html
      lang={locale === 'de' ? 'de-DE' : 'en-GB'}
      className={`${newsreader.variable} ${spline.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
