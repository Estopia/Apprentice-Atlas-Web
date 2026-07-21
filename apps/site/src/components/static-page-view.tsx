import type { Locale, StaticPage } from '@apprentice-atlas/content';
import { localPath } from '@apprentice-atlas/content';
import { ButtonLink } from './button-link';
import { PartnerForm } from './partner-form';

export function StaticPageView({ page, locale }: { page: StaticPage; locale: Locale }) {
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
        <div className="editorial-sections">
          {page.sections.map((section, index) => (
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
          ))}
        </div>
        <div className="editorial-cta">
          <p>{locale === 'de' ? 'Bereit für den nächsten Schritt?' : 'Ready for the next step?'}</p>
          <ButtonLink href={localPath(locale, cta)}>
            {locale === 'de' ? 'Route öffnen' : 'Open the route'}
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
