import {
  getDictionary,
  localPath,
  resources as fallbackResources,
  staticPages,
  type Locale,
} from '@apprentice-atlas/content';
import { HomePage } from '@/components/home-page';
import { ResourceLibrary } from '@/components/resource-library';
import { ResourcePageView } from '@/components/resource-page-view';
import { StaticPageView } from '@/components/static-page-view';
import { JsonLd } from '@/components/json-ld';
import { requireLocale } from '@/lib/i18n';
import {
  getCmsRedirect,
  getCallsToAction,
  getGlossaryTerms,
  getSitePage,
  getSiteResource,
  getSiteResources,
} from '@/lib/cms/content';
import type { SiteResource } from '@/lib/cms/types';
import { pageMetadata, resourceMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound, permanentRedirect, redirect } from 'next/navigation';

type Props = { params: Promise<{ locale: string; slug?: string[] }> };

async function resolve(locale: Locale, parts: string[], draft = false) {
  const path = parts.join('/');
  const resourcePrefix = locale === 'de' ? 'ressourcen/' : 'resources/';
  if (path.startsWith(resourcePrefix))
    return {
      type: 'resource' as const,
      value: await getSiteResource(locale, path.slice(resourcePrefix.length), draft),
    };
  return { type: 'page' as const, value: await getSitePage(locale, path, draft) };
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
  if (path === (locale === 'de' ? 'ressourcen' : 'resources')) {
    const count = (await getSiteResources(locale)).length;
    return {
      title: locale === 'de' ? 'Ressourcen' : 'Resources',
      description:
        locale === 'de'
          ? `${count} geprüfte Guides für Orientierung, Berufsfelder und Bewerbung.`
          : `${count} reviewed guides for exploration, career fields and applications.`,
    };
  }
  const draft = (await draftMode()).isEnabled;
  const result = await resolve(locale, slug, draft);
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
    for (const item of fallbackResources)
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
  const draft = (await draftMode()).isEnabled;
  if (!path) {
    const [featuredResources, callsToAction] = await Promise.all([
      getSiteResources(locale, draft),
      getCallsToAction(locale),
    ]);
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
        <HomePage
          callsToAction={callsToAction}
          featuredResources={featuredResources.slice(0, 4)}
          locale={locale}
          resourceCount={featuredResources.length}
        />
      </>
    );
  }
  if (path === (locale === 'de' ? 'ressourcen' : 'resources'))
    return <LibraryPage locale={locale} resources={await getSiteResources(locale, draft)} />;
  if (
    ['deutschland', 'grossbritannien', 'glossar', 'germany', 'united-kingdom', 'glossary'].includes(
      path,
    )
  )
    return (
      <CountryOrGlossary
        glossaryTerms={await getGlossaryTerms(locale, draft)}
        locale={locale}
        path={path}
        resources={await getSiteResources(locale, draft)}
      />
    );
  const result = await resolve(locale, slug, draft);
  if (result.type === 'resource' && result.value)
    return <ResourcePageView resource={result.value} locale={locale} />;
  if (result.type === 'page' && result.value)
    return (
      <StaticPageView
        callsToAction={await getCallsToAction(locale)}
        page={result.value}
        locale={locale}
      />
    );
  const cmsRedirect = await getCmsRedirect(`/${locale}/${path}`);
  if (cmsRedirect?.permanent) permanentRedirect(cmsRedirect.to);
  if (cmsRedirect) redirect(cmsRedirect.to);
  notFound();
}

function LibraryPage({ locale, resources }: { locale: Locale; resources: SiteResource[] }) {
  return (
    <section className="library-page">
      <header>
        <p className="eyebrow">
          {locale === 'de'
            ? `Bibliothek / ${resources.length} Inhalte`
            : `Library / ${resources.length} resources`}
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
      'Anerkannter Ausbildungsberuf',
      'Ein in Deutschland durch Ausbildungsordnung geregelter Beruf. Die Ordnung definiert Berufsbild, Dauer, Rahmenplan und Prüfungsanforderungen.',
    ],
    en: [
      'Recognised training occupation',
      'A German occupation governed by a national training regulation defining its profile, duration, framework and assessment requirements.',
    ],
  },
  {
    de: [
      'Apprenticeship agreement',
      'Die Vereinbarung über die Beschäftigung als Apprentice in England. Sie steht neben dem Trainingsplan mit Arbeitgeber und Training Provider.',
    ],
    en: [
      'Apprenticeship agreement',
      'The agreement covering employment as an apprentice in England. It sits alongside the training plan with the employer and provider.',
    ],
  },
  {
    de: [
      'Apprenticeship Standard',
      'Der berufsspezifische Standard in England, der die für kompetente Berufsausübung erforderlichen Kenntnisse, Fähigkeiten und Verhaltensweisen beschreibt.',
    ],
    en: [
      'Apprenticeship standard',
      'The occupation-specific standard in England describing the knowledge, skills and behaviours required for occupational competence.',
    ],
  },
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
    de: [
      'Ausbildungsordnung',
      'Die verbindliche Grundlage eines anerkannten deutschen Ausbildungsberufs. Sie enthält unter anderem Berufsbild, Rahmenplan und Prüfungsanforderungen.',
    ],
    en: [
      'Training regulation',
      'The binding basis of a recognised German training occupation, including its occupational profile, framework and assessment requirements.',
    ],
  },
  {
    de: [
      'Ausbildungsplan',
      'Die betriebliche Übersetzung des Ausbildungsrahmenplans: Welche Inhalte werden wann, durch wen, mit welchen Aufgaben und an welchem Lernort vermittelt?',
    ],
    en: [
      'Company training plan',
      'The employer’s translation of the national framework into what will be taught, when, by whom, through which tasks and at which location.',
    ],
  },
  {
    de: [
      'Ausbildungsnachweis',
      'Die laufende Dokumentation der vermittelten Inhalte und Tätigkeiten, häufig Berichtsheft genannt. Sie unterstützt Reflexion und kann für die Prüfungszulassung relevant sein.',
    ],
    en: [
      'Training record',
      'The continuing record of German apprenticeship content and activities. It supports reflection and may be relevant to examination admission.',
    ],
  },
  {
    de: ['Berufsschule', 'Der schulische Lernort einer dualen Ausbildung in Deutschland.'],
    en: ['Vocational school', 'The school-based learning location in German dual training.'],
  },
  {
    de: [
      'Duale Ausbildung',
      'Eine Berufsausbildung an den Lernorten Betrieb und Berufsschule mit Ausbildungsvertrag, Ausbildungsordnung und Abschlussprüfung.',
    ],
    en: [
      'German dual training',
      'Vocational training across an employer and vocational school, governed by a contract, training regulation and final examination.',
    ],
  },
  {
    de: [
      'Duales Studium',
      'Ein Studium, das Hochschulphasen mit umfangreicher betrieblicher Praxis verbindet. Vertragsform, Vergütung und anerkannter Berufsabschluss unterscheiden sich je Modell.',
    ],
    en: [
      'Dual study programme',
      'A German higher-education route combining university phases with substantial employer practice. Contract, pay and any vocational qualification vary by model.',
    ],
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
      'Foundation Apprenticeship',
      'Ein englischer Einstiegsweg, der jungen Menschen den Zugang zu einem Berufsfeld und den Übergang in ein weiterführendes Apprenticeship erleichtern soll. Alters- und Förderregeln sind aktuell zu prüfen.',
    ],
    en: [
      'Foundation apprenticeship',
      'An English entry route intended to help young people enter a sector and progress to a further apprenticeship. Current age and funding rules must be checked.',
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
      'Level',
      'Das Qualifikationsniveau eines UK Apprenticeships. Das Level allein beschreibt weder konkrete Aufgaben noch Qualität, Vergütung oder persönliche Passung.',
    ],
    en: [
      'Level',
      'The qualification level of a UK apprenticeship. Level alone does not describe its tasks, quality, pay or personal fit.',
    ],
  },
  {
    de: [
      'Lernortkooperation',
      'Die abgestimmte Zusammenarbeit von Betrieb, Berufsschule und gegebenenfalls überbetrieblichen Lernorten in einer deutschen Ausbildung.',
    ],
    en: [
      'Learning-location cooperation',
      'Coordination between the employer, vocational school and any external training centre in German dual training.',
    ],
  },
  {
    de: [
      'Reasonable adjustments',
      'Angemessene Anpassungen, die Barrieren für behinderte oder gesundheitlich beeinträchtigte Bewerbende und Apprentices reduzieren sollen. Bedarf und Verfahren werden mit der zuständigen Stelle geklärt.',
    ],
    en: [
      'Reasonable adjustments',
      'Changes intended to remove barriers for disabled applicants and apprentices. The need and process are agreed with the responsible organisation.',
    ],
  },
  {
    de: [
      'Training Plan',
      'Die Vereinbarung in einem englischen Apprenticeship, die Lerninhalte, Zeitplan, Durchführung, Unterstützung und Verantwortlichkeiten von Apprentice, Arbeitgeber und Provider festhält.',
    ],
    en: [
      'Training plan',
      'The plan in an English apprenticeship recording content, schedule, delivery, support and responsibilities across apprentice, employer and provider.',
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
  {
    de: [
      'Überbetriebliche Ausbildung',
      'Ausbildungsabschnitte außerhalb des eigenen Betriebs, wenn Inhalte dort nicht vollständig vermittelt werden können. Sie bleiben Bestandteil der Ausbildungszeit und müssen geplant sein.',
    ],
    en: [
      'External vocational training',
      'Planned German training phases outside the main employer where required content cannot be covered internally. They remain part of training time.',
    ],
  },
];

function CountryOrGlossary({
  locale,
  path,
  resources,
  glossaryTerms,
}: {
  locale: Locale;
  path: string;
  resources: SiteResource[];
  glossaryTerms?: Array<{ term: string; definition: string }>;
}) {
  const isGlossary = path === 'glossar' || path === 'glossary';
  if (isGlossary) {
    const terms = glossary.map((term) => ({
      term: term[locale][0]!,
      definition: term[locale][1]!,
    }));
    for (const managed of glossaryTerms ?? []) {
      const index = terms.findIndex(
        (term) => term.term.toLocaleLowerCase(locale) === managed.term.toLocaleLowerCase(locale),
      );
      if (index >= 0) terms[index] = managed;
      else terms.push(managed);
    }
    terms.sort((a, b) => a.term.localeCompare(b.term, locale));
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
          {terms.map((term, i) => (
            <div key={term.term}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <dt>{term.term}</dt>
              <dd>{term.definition}</dd>
            </div>
          ))}
        </dl>
      </article>
    );
  }
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
              <span>PLAN</span>
              <p>
                {locale === 'de'
                  ? 'Ausbildungsordnung plus betrieblicher Ausbildungsplan'
                  : 'national regulation plus company training plan'}
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
      <div className="country-explainer">
        {(country === 'de'
          ? locale === 'de'
            ? [
                {
                  title: 'Vor der Unterschrift',
                  body: 'Vertrag, Ausbildungsplan, Vergütung, Arbeitszeit, Lernorte und zuständige Kammer gemeinsam prüfen.',
                },
                {
                  title: 'Während der Ausbildung',
                  body: 'Betrieb vermittelt Praxis, Berufsschule ergänzt Theorie; Berichtsheft und Feedback machen Fortschritt sichtbar.',
                },
                {
                  title: 'Wenn etwas fehlt',
                  body: 'Erst benannte Ausbildungsperson, dann Berufsschule oder unabhängige Ausbildungsberatung der Kammer einbeziehen.',
                },
              ]
            : [
                {
                  title: 'Before signing',
                  body: 'Check the contract, company plan, pay, hours, learning locations and responsible chamber together.',
                },
                {
                  title: 'During training',
                  body: 'The employer teaches practice and school adds theory; training records and feedback make progress visible.',
                },
                {
                  title: 'When something is missing',
                  body: 'Start with the named trainer, then involve vocational school or independent chamber advisers.',
                },
              ]
          : locale === 'de'
            ? [
                {
                  title: 'Zuerst die Nation klären',
                  body: 'England, Schottland, Wales und Nordirland haben eigene Regeln und Dienste. Dieser Hub markiert England-spezifische Aussagen.',
                },
                {
                  title: 'Vacancy und Standard',
                  body: 'Anzeige, Apprenticeship Standard, Level, Arbeitgeber, Provider und Trainingsplan getrennt prüfen.',
                },
                {
                  title: 'Geschützte Lernzeit',
                  body: 'Off-the-job Training findet in bezahlter Arbeitszeit statt und baut neue berufliche Kompetenz auf.',
                },
              ]
            : [
                {
                  title: 'Establish the nation first',
                  body: 'England, Scotland, Wales and Northern Ireland have distinct rules and services. This hub labels England-specific claims.',
                },
                {
                  title: 'Vacancy and standard',
                  body: 'Check the advert, apprenticeship standard, level, employer, provider and training plan separately.',
                },
                {
                  title: 'Protected learning time',
                  body: 'Off-the-job training takes place in paid working time and develops new occupational competence.',
                },
              ]
        ).map((item, index) => (
          <article key={item.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
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
