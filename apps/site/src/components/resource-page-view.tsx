import { getDictionary, localPath, type Locale, type Resource } from '@apprentice-atlas/content';
import Link from 'next/link';
import { JsonLd } from './json-ld';
import { AnalyticsEvent } from './analytics-event';

export function ResourcePageView({ resource, locale }: { resource: Resource; locale: Locale }) {
  const d = getDictionary(locale);
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://apprenticeatlas.com'}${localPath(locale, `${locale === 'de' ? '/ressourcen' : '/resources'}/${resource.slug[locale]}`)}`;
  return (
    <article className="resource-page">
      <AnalyticsEvent
        event="resource_opened"
        properties={{
          locale,
          resource_id: resource.id,
          format: resource.kind,
          country: resource.country,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: resource.title[locale],
          description: resource.description[locale],
          dateModified: resource.reviewedAt,
          inLanguage: locale === 'de' ? 'de-DE' : 'en-GB',
          author: { '@type': 'Organization', name: 'Apprentice Atlas' },
          publisher: { '@type': 'Organization', name: 'Estopia Engineering Ltd' },
          mainEntityOfPage: url,
        }}
      />
      <header className="resource-hero">
        <Link
          href={localPath(locale, locale === 'de' ? '/ressourcen' : '/resources')}
          className="back-link"
        >
          ← {d.allResources}
        </Link>
        <div className="resource-meta">
          <span>{resource.eyebrow[locale]}</span>
          <span>{resource.country === 'both' ? 'DE / UK' : resource.country.toUpperCase()}</span>
          <span>
            {resource.readMinutes} {d.minutes}
          </span>
        </div>
        <h1>{resource.title[locale]}</h1>
        <p>{resource.description[locale]}</p>
        <div className="route-rule">
          <i />
          <b>AA—{resource.id.slice(0, 3).toUpperCase()}</b>
        </div>
      </header>
      <div className="resource-body">
        <aside>
          <p>{d.reviewed}</p>
          <strong>
            {new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
              dateStyle: 'long',
            }).format(new Date(resource.reviewedAt))}
          </strong>
          <p>{locale === 'de' ? 'Geprüft von' : 'Reviewed by'}</p>
          <strong>{resource.reviewer}</strong>
        </aside>
        <div className="article-copy">
          {resource.sections.map((section, i) => (
            <section key={section.heading[locale]}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h2>{section.heading[locale]}</h2>
              {section.paragraphs[locale].map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets[locale].map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
      <footer className="source-box">
        <p className="eyebrow">{d.sources}</p>
        <h2>
          {locale === 'de' ? 'Prüfe die Grundlage selbst.' : 'Check the foundations yourself.'}
        </h2>
        <ul>
          {resource.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} rel="noreferrer" target="_blank">
                {source.label}
                <span>↗</span>
              </a>
            </li>
          ))}
        </ul>
        <p>
          {locale === 'de'
            ? 'Einen Fehler gefunden? Schreib an corrections@apprenticeatlas.com.'
            : 'Found an error? Email corrections@apprenticeatlas.com.'}
        </p>
      </footer>
    </article>
  );
}
