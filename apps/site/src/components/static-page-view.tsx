import type { Locale, StaticPage } from '@apprentice-atlas/content';
import { localPath } from '@apprentice-atlas/content';
import { ButtonLink } from './button-link';
import { PartnerForm } from './partner-form';

export function StaticPageView({ page, locale }: { page: StaticPage; locale: Locale }) {
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
        <div className="editorial-sections">
          {page.sections.map((section, index) => (
            <section key={section.title[locale]}>
              <span className="chapter">{String(index + 1).padStart(2, '0')}</span>
              <div>
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
