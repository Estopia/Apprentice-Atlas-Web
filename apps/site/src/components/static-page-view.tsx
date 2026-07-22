import type { Locale } from '@apprentice-atlas/content';
import { localPath } from '@apprentice-atlas/content';
import type { CallsToAction, SitePage } from '@/lib/cms/types';
import Image from 'next/image';
import { ButtonLink } from './button-link';
import { PartnerForm } from './partner-form';
import { RichText } from './rich-text';

export function StaticPageView({
  callsToAction,
  page,
  locale,
}: {
  callsToAction: CallsToAction;
  page: SitePage;
  locale: Locale;
}) {
  const isPreLaunchLegal = ['privacy', 'terms', 'imprint', 'accessibility-statement'].includes(
    page.key,
  );
  const cta =
    page.cta === 'partner'
      ? locale === 'de'
        ? '/pilotpartner#partner-form-title'
        : '/pilot-partners#partner-form-title'
      : page.cta === 'app'
        ? locale === 'de'
          ? '/produkt/app'
          : '/product/app'
        : page.cta === 'resources'
          ? locale === 'de'
            ? '/ressourcen'
            : '/resources'
          : locale === 'de'
            ? '/kontakt'
            : '/contact';
  const ctaCopy = {
    partner: {
      de: {
        heading: 'Interesse an einem Pilot mit Apprentice Atlas?',
        label: 'Pilotprogramm ansehen',
      },
      en: { heading: 'Interested in piloting Apprentice Atlas?', label: 'Explore the pilot' },
    },
    app: {
      de: { heading: 'Entdecke den vollständigen App-Ablauf.', label: 'App entdecken' },
      en: { heading: 'Explore the complete app journey.', label: 'Discover the app' },
    },
    resources: {
      de: {
        heading: 'Finde den passenden Guide für deinen nächsten Schritt.',
        label: 'Guides durchsuchen',
      },
      en: {
        heading: 'Find the right guide for your next step.',
        label: 'Browse the guides',
      },
    },
    contact: {
      de: { heading: 'Lass uns die nächste Etappe gemeinsam planen.', label: 'Kontakt aufnehmen' },
      en: { heading: 'Let’s plan the next stage together.', label: 'Contact us' },
    },
  }[page.cta ?? 'contact'][locale];
  const managedCta = callsToAction[page.cta ?? 'contact'];
  return (
    <>
      <article className="editorial-page">
        <header className="editorial-hero">
          <div className="route-stamp">
            <span>ATLAS / {String(page.key.length).padStart(2, '0')}</span>
            <i />
          </div>
          <p className="eyebrow">{page.eyebrow[locale]}</p>
          <h1>{page.title[locale]}</h1>
          <p className="editorial-lede">{page.intro[locale]}</p>
        </header>
        {isPreLaunchLegal && (
          <div className="legal-draft" role="note">
            <strong>{locale === 'de' ? 'Pre-Launch-Entwurf' : 'Pre-launch draft'}</strong>
            <p>
              {locale === 'de'
                ? 'Diese Seite ist bewusst nicht indexiert. Sie wird erst nach juristischer beziehungsweise abschließender Barrierefreiheitsprüfung für den öffentlichen Launch freigegeben.'
                : 'This page is deliberately not indexed. It will be approved for public launch only after legal or final accessibility review.'}
            </p>
          </div>
        )}
        {page.key === 'app' && (
          <section
            className="app-screen-gallery"
            aria-label={locale === 'de' ? 'Einblicke in die App' : 'Inside the app'}
          >
            <header>
              <p className="eyebrow">PRODUCT / REAL SCREENS</p>
              <h2>
                {locale === 'de'
                  ? 'So sieht der Atlas heute aus.'
                  : 'What the Atlas looks like today.'}
              </h2>
              <p>
                {locale === 'de'
                  ? 'Echte Screens aus dem aktuellen Entwicklungsstand: Chancen entdecken, Details nachvollziehen und den nächsten Schritt organisieren.'
                  : 'Real screens from the current build: discover opportunities, understand the detail and organise what comes next.'}
              </p>
            </header>
            <div>
              <figure>
                <Image
                  alt={
                    locale === 'de'
                      ? 'Startbereich mit Suche, Favoriten und Fristen.'
                      : 'Home view with search, saved opportunities and deadlines.'
                  }
                  height={1957}
                  src="/images/app/dashboard.webp"
                  width={900}
                />
              </figure>
              <figure>
                <Image
                  alt={
                    locale === 'de'
                      ? 'Kartensuche mit Ausbildungsstellen im gewählten Gebiet.'
                      : 'Map search with apprenticeship opportunities in the selected area.'
                  }
                  height={1957}
                  loading="lazy"
                  src="/images/app/map-search.webp"
                  width={900}
                />
              </figure>
              <figure>
                <Image
                  alt={
                    locale === 'de'
                      ? 'Detailansicht einer Ausbildungsstelle mit Frist und Originalquelle.'
                      : 'Opportunity detail with deadline and original source.'
                  }
                  height={1957}
                  loading="lazy"
                  src="/images/app/opportunity-detail.webp"
                  width={900}
                />
              </figure>
            </div>
          </section>
        )}
        <div className="editorial-sections">
          {page.cmsBody ? (
            <RichText document={page.cmsBody} className="editorial-rich-text" />
          ) : (
            page.sections.map((section, index) => (
              <section
                className={
                  page.sections.length >= 5 && index >= page.sections.length - 2
                    ? 'editorial-section--depth'
                    : undefined
                }
                key={section.title[locale]}
              >
                <span className="chapter">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  {page.sections.length >= 5 && index >= page.sections.length - 2 && (
                    <p className="section-note">
                      {locale === 'de' ? 'Vertiefung / Praxis' : 'Depth / practice'}
                    </p>
                  )}
                  <h2>{section.title[locale]}</h2>
                  <p>{section.body[locale]}</p>
                  {section.points && (
                    <ul>
                      {section.points[locale].map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))
          )}
        </div>
        <div className="editorial-cta">
          <p>{ctaCopy.heading}</p>
          <ButtonLink href={localPath(locale, managedCta?.href ?? cta)}>
            {managedCta?.label ?? ctaCopy.label}
          </ButtonLink>
        </div>
      </article>
      {page.key === 'pilot' && (
        <section className="standalone-form">
          <PartnerForm locale={locale} />
        </section>
      )}
    </>
  );
}
