import {
  getDictionary,
  getResource,
  getStaticPage,
  localPath,
  resources,
  staticPages,
  type Locale,
} from '@apprentice-atlas/content';
import { HomePage } from '@/components/home-page';
import { ResourceLibrary } from '@/components/resource-library';
import { ResourcePageView } from '@/components/resource-page-view';
import { StaticPageView } from '@/components/static-page-view';
import { JsonLd } from '@/components/json-ld';
import { requireLocale } from '@/lib/i18n';
import { pageMetadata, resourceMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ locale: string; slug?: string[] }> };

function resolve(locale: Locale, parts: string[]) {
  const path = parts.join('/');
  const resourcePrefix = locale === 'de' ? 'ressourcen/' : 'resources/';
  if (path.startsWith(resourcePrefix))
    return {
      type: 'resource' as const,
      value: getResource(locale, path.slice(resourcePrefix.length)),
    };
  return { type: 'page' as const, value: getStaticPage(locale, path) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug = [] } = await params;
  const locale = requireLocale(raw);
  const path = slug.join('/');
  if (!path)
    return {
      title: locale === 'de' ? 'Dein nächster Weg' : 'Find your next route',
      description:
        locale === 'de'
          ? 'Berufliche Wege in Deutschland und dem UK entdecken, verstehen und angehen.'
          : 'Discover, understand and approach career routes in Germany and the UK.',
      alternates: {
        canonical: `/${locale}`,
        languages: { de: '/de', 'en-GB': '/en', 'x-default': '/en' },
      },
    };
  if (path === (locale === 'de' ? 'ressourcen' : 'resources'))
    return {
      title: locale === 'de' ? 'Ressourcen' : 'Resources',
      description:
        locale === 'de'
          ? '28 geprüfte Guides für Orientierung, Berufsfelder und Bewerbung.'
          : '28 reviewed guides for exploration, career fields and applications.',
    };
  const result = resolve(locale, slug);
  if (result.type === 'resource' && result.value) return resourceMetadata(result.value, locale);
  if (result.type === 'page' && result.value) return pageMetadata(result.value, locale);
  return {};
}

export function generateStaticParams() {
  const params: Array<{ locale: string; slug?: string[] }> = [];
  for (const locale of ['de', 'en'] as const) {
    params.push({ locale });
    params.push({ locale, slug: [locale === 'de' ? 'ressourcen' : 'resources'] });
    for (const item of staticPages) params.push({ locale, slug: item.slug[locale].split('/') });
    for (const item of resources)
      params.push({
        locale,
        slug: [locale === 'de' ? 'ressourcen' : 'resources', item.slug[locale]],
      });
    for (const path of locale === 'de'
      ? ['deutschland', 'grossbritannien', 'glossar']
      : ['germany', 'united-kingdom', 'glossary'])
      params.push({ locale, slug: [path] });
  }
  return params;
}

export default async function CatchAllPage({ params }: Props) {
  const { locale: raw, slug = [] } = await params;
  const locale = requireLocale(raw);
  const path = slug.join('/');
  if (!path)
    return (
      <>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Apprentice Atlas',
            url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://apprenticeatlas.com',
            inLanguage: ['de-DE', 'en-GB'],
            publisher: { '@type': 'Organization', name: 'Estopia Engineering Ltd' },
          }}
        />
        <HomePage locale={locale} />
      </>
    );
  if (path === (locale === 'de' ? 'ressourcen' : 'resources'))
    return <LibraryPage locale={locale} />;
  if (
    ['deutschland', 'grossbritannien', 'glossar', 'germany', 'united-kingdom', 'glossary'].includes(
      path,
    )
  )
    return <CountryOrGlossary locale={locale} path={path} />;
  const result = resolve(locale, slug);
  if (result.type === 'resource' && result.value)
    return <ResourcePageView resource={result.value} locale={locale} />;
  if (result.type === 'page' && result.value)
    return <StaticPageView page={result.value} locale={locale} />;
  notFound();
}

function LibraryPage({ locale }: { locale: Locale }) {
  return (
    <section className="library-page">
      <header>
        <p className="eyebrow">
          {locale === 'de' ? 'Bibliothek / 28 Inhalte' : 'Library / 28 resources'}
        </p>
        <h1>
          {locale === 'de'
            ? 'Ein guter nächster Schritt beginnt mit einer guten Frage.'
            : 'A useful next step starts with a useful question.'}
        </h1>
        <p>
          {locale === 'de'
            ? 'Geprüfte Guides für Jugendliche, Familien, Schulen und Beratung – getrennt nach Markt, aber gemeinsam gedacht.'
            : 'Reviewed guides for young people, families, schools and advisers — specific to each market, connected by one approach.'}
        </p>
      </header>
      <ResourceLibrary locale={locale} resources={resources} />
    </section>
  );
}

const glossary = [
  {
    de: [
      'Ausbildungsbetrieb',
      'Der Betrieb, mit dem ein Ausbildungsvertrag besteht und in dem der praktische Teil einer dualen Ausbildung stattfindet.',
    ],
    en: [
      'Apprenticeship employer',
      'The organisation that employs an apprentice and provides the workplace part of their training.',
    ],
  },
  {
    de: ['Berufsschule', 'Der schulische Lernort einer dualen Ausbildung in Deutschland.'],
    en: ['Vocational school', 'The school-based learning location in German dual training.'],
  },
  {
    de: [
      'Off-the-job training',
      'Geplante Lernzeit eines Apprenticeships in England, die neue Kenntnisse und Fähigkeiten außerhalb der normalen produktiven Tätigkeit aufbaut.',
    ],
    en: [
      'Off-the-job training',
      'Planned learning time in an English apprenticeship that develops new knowledge and skills away from normal productive duties.',
    ],
  },
  {
    de: [
      'End-point assessment',
      'Die abschließende, unabhängige Bewertung eines Apprenticeships in England.',
    ],
    en: [
      'End-point assessment',
      'The final independent assessment of an apprenticeship in England.',
    ],
  },
  {
    de: [
      'Kammer',
      'Zum Beispiel IHK oder HWK; sie überwacht viele Ausbildungsberufe, registriert Verträge und organisiert Prüfungen.',
    ],
    en: [
      'Chamber',
      'For example an IHK or HWK; it oversees many German training occupations, registers contracts and organises examinations.',
    ],
  },
  {
    de: [
      'Training Provider',
      'Die Bildungseinrichtung, die im UK mit dem Arbeitgeber die strukturierte Ausbildung durchführt.',
    ],
    en: [
      'Training provider',
      'The organisation that works with a UK employer to deliver structured apprenticeship training.',
    ],
  },
];

function CountryOrGlossary({ locale, path }: { locale: Locale; path: string }) {
  const isGlossary = path === 'glossar' || path === 'glossary';
  if (isGlossary)
    return (
      <article className="glossary-page">
        <header>
          <p className="eyebrow">GLOSSARY / A—Z</p>
          <h1>
            {locale === 'de' ? 'Die Begriffe hinter den Wegen.' : 'The terms behind the routes.'}
          </h1>
          <p>
            {locale === 'de'
              ? 'Kurze Erklärungen für zwei Ausbildungssysteme.'
              : 'Short explanations across two apprenticeship systems.'}
          </p>
        </header>
        <dl>
          {glossary.map((term, i) => (
            <div key={term[locale][0]}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <dt>{term[locale][0]}</dt>
              <dd>{term[locale][1]}</dd>
            </div>
          ))}
        </dl>
      </article>
    );
  const country = path === 'deutschland' || path === 'germany' ? 'de' : 'uk';
  const items = resources
    .filter((item) => item.country === country || item.country === 'both')
    .slice(0, 9);
  const d = getDictionary(locale);
  const title =
    country === 'de'
      ? locale === 'de'
        ? 'Ausbildung in Deutschland'
        : 'Apprenticeships in Germany'
      : locale === 'de'
        ? 'Apprenticeships im Vereinigten Königreich'
        : 'Apprenticeships in the United Kingdom';
  const intro =
    country === 'de'
      ? locale === 'de'
        ? 'Betrieb und Berufsschule, Vertrag und Prüfung: das duale System verständlich erkunden.'
        : 'Employer and vocational school, contract and examination: explore the German dual system clearly.'
      : locale === 'de'
        ? 'Die Systeme der vier UK-Nationen unterscheiden sich. Wir beginnen klar markiert mit England und erweitern redaktionell.'
        : 'Systems differ across the four UK nations. We begin with clearly labelled English guidance and expand through editorial review.';
  return (
    <section className="country-page">
      <header>
        <p className="eyebrow">COUNTRY HUB / {country.toUpperCase()}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <div className="country-facts">
        {country === 'de' ? (
          <>
            <div>
              <span>02</span>
              <p>
                {locale === 'de'
                  ? 'Lernorte: Betrieb und Berufsschule'
                  : 'Learning locations: employer and school'}
              </p>
            </div>
            <div>
              <span>300+</span>
              <p>
                {locale === 'de'
                  ? 'anerkannte Ausbildungsberufe'
                  : 'recognised training occupations'}
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <span>04</span>
              <p>
                {locale === 'de'
                  ? 'Nationen mit eigenen Systemen'
                  : 'nations with distinct systems'}
              </p>
            </div>
            <div>
              <span>JOB</span>
              <p>
                {locale === 'de'
                  ? 'bezahlt, mit strukturierter Ausbildung'
                  : 'paid, with structured training'}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="library-grid">
        {items.map((item) => (
          <Link
            className="library-card"
            key={item.id}
            href={localPath(
              locale,
              `${locale === 'de' ? '/ressourcen' : '/resources'}/${item.slug[locale]}`,
            )}
          >
            <p className="eyebrow">{item.eyebrow[locale]}</p>
            <h2>{item.title[locale]}</h2>
            <p>{item.description[locale]}</p>
            <div className="library-card-bottom">
              <span>
                {item.readMinutes} {d.minutes}
              </span>
              <b>↗</b>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
