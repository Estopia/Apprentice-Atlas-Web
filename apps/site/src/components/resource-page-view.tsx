import { getDictionary, localPath, type Locale } from '@apprentice-atlas/content';
import Link from 'next/link';
import { lexicalHeadings } from '@/lib/cms/rich-text';
import type { SiteResource } from '@/lib/cms/types';
import { JsonLd } from './json-ld';
import { AnalyticsEvent } from './analytics-event';
import { RichText } from './rich-text';

export function ResourcePageView({ resource, locale }: { resource: SiteResource; locale: Locale }) {
  const d = getDictionary(locale);
  const headings = resource.cmsBody
    ? lexicalHeadings(resource.cmsBody)
    : resource.sections.map((section, index) => ({
        id: `chapter-${index + 1}`,
        text: section.heading[locale],
      }));
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
          <div className="resource-review">
            <p>{d.reviewed}</p>
            <strong>
              {new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
                dateStyle: 'long',
              }).format(new Date(resource.reviewedAt))}
            </strong>
            <p>{locale === 'de' ? 'Geprüft von' : 'Reviewed by'}</p>
            <strong>{resource.reviewer}</strong>
          </div>
          <nav aria-label={locale === 'de' ? 'Inhalt dieses Guides' : 'In this guide'}>
            <p>{locale === 'de' ? 'In diesem Guide' : 'In this guide'}</p>
            <ol>
              {headings.map((heading, index) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <div className="article-copy">
          {resource.cmsBody ? (
            <RichText document={resource.cmsBody} className="resource-rich-text" />
          ) : (
            resource.sections.map((section, i) => (
              <section
                className={i >= 3 ? 'article-deep-dive' : undefined}
                id={`chapter-${i + 1}`}
                key={section.heading[locale]}
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
                {i >= 3 && (
                  <p className="section-note">
                    {locale === 'de' ? 'Vertiefung / Praxis' : 'Depth / practice'}
                  </p>
                )}
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
            ))
          )}
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
            ? 'Quellen belegen die fachliche Grundlage, nicht deine individuelle Situation. Prüfe Markt, Datum und konkrete Ausbildungsordnung oder Standard. Einen Fehler gefunden? Schreib an corrections@apprenticeatlas.com.'
            : 'Sources support the factual foundation, not your individual situation. Check the market, date and exact regulation or standard. Found an error? Email corrections@apprenticeatlas.com.'}
        </p>
      </footer>
    </article>
  );
}
