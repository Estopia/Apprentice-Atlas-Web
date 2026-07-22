'use client';

import { getDictionary, localPath, type Locale, type Resource } from '@apprentice-atlas/content';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { capture } from '@/lib/analytics';

const kinds = ['all', 'guide', 'career', 'application', 'parent', 'adviser', 'insight'] as const;

export function ResourceLibrary({ locale, resources }: { locale: Locale; resources: Resource[] }) {
  const d = getDictionary(locale);
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<(typeof kinds)[number]>('all');
  const labels =
    locale === 'de'
      ? {
          all: 'Alle',
          guide: 'Orientierung',
          career: 'Berufsfelder',
          application: 'Bewerbung',
          parent: 'Eltern',
          adviser: 'Beratung',
          insight: 'Einblicke',
        }
      : {
          all: 'All',
          guide: 'Orientation',
          career: 'Career fields',
          application: 'Applications',
          parent: 'Parents',
          adviser: 'Advisers',
          insight: 'Insights',
        };
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale);
    return resources.filter(
      (item) =>
        (kind === 'all' || item.kind === kind) &&
        (!needle ||
          `${item.title[locale]} ${item.description[locale]}`
            .toLocaleLowerCase(locale)
            .includes(needle)),
    );
  }, [query, kind, locale, resources]);
  return (
    <div className="library-shell">
      <div className="search-box">
        <label htmlFor="resource-search">{d.search}</label>
        <div>
          <span aria-hidden="true">⌕</span>
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() =>
              query &&
              capture('resource_search_performed', {
                locale,
                result_count: filtered.length,
                filter: kind,
              })
            }
            placeholder={d.searchPlaceholder}
          />
        </div>
      </div>
      <div className="filter-row" aria-label={d.filters}>
        {kinds.map((item) => (
          <button
            type="button"
            className={kind === item ? 'active' : ''}
            aria-pressed={kind === item}
            onClick={() => setKind(item)}
            key={item}
          >
            {labels[item]}
          </button>
        ))}
      </div>
      <p className="result-count">
        {filtered.length} {locale === 'de' ? 'Inhalte' : 'resources'} / {resources.length}
      </p>
      {filtered.length ? (
        <div className="library-grid">
          {filtered.map((item, i) => (
            <Link
              href={localPath(
                locale,
                `${locale === 'de' ? '/ressourcen' : '/resources'}/${item.slug[locale]}`,
              )}
              className="library-card"
              key={item.id}
            >
              <div className="library-card-top">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span>{item.country === 'both' ? 'DE / UK' : item.country.toUpperCase()}</span>
              </div>
              <p className="eyebrow">{item.eyebrow[locale]}</p>
              <h2>{item.title[locale]}</h2>
              <p>{item.description[locale]}</p>
              <div className="library-card-bottom">
                <span>
                  {item.readMinutes} {d.minutes}
                </span>
                <b>
                  {locale === 'de' ? 'Öffnen' : 'Open'} <span aria-hidden="true">↗</span>
                </b>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="no-results">{d.noResults}</p>
      )}
    </div>
  );
}
