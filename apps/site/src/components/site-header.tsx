import { getDictionary, navigation, localPath, type Locale } from '@apprentice-atlas/content';
import Link from 'next/link';
import { AtlasMark } from './atlas-mark';
import { ButtonLink } from './button-link';
import { LanguageLink } from './language-link';

export function SiteHeader({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href={`/${locale}`} className="home-link">
          <AtlasMark />
        </Link>
        <nav
          className="desktop-nav"
          aria-label={locale === 'de' ? 'Hauptnavigation' : 'Main navigation'}
        >
          {navigation.map((group) => (
            <details className="nav-group" key={group.key}>
              <summary>
                {group.label[locale]}
                <span aria-hidden="true">⌄</span>
              </summary>
              <div className="nav-panel">
                <p className="nav-index">
                  {String(navigation.indexOf(group) + 1).padStart(2, '0')} / 05
                </p>
                <div>
                  {group.items.map((item) => (
                    <Link key={item.href[locale]} href={localPath(locale, item.href[locale])}>
                      {item.label[locale]}
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageLink locale={locale} />
          <ButtonLink
            href={localPath(locale, locale === 'de' ? '/pilotpartner' : '/pilot-partners')}
            arrow={false}
          >
            {d.pilot}
          </ButtonLink>
        </div>
        <details className="mobile-menu">
          <summary aria-label={d.menu}>
            <span />
            <span />
            <span />
          </summary>
          <div className="mobile-panel">
            {navigation.map((group) => (
              <div key={group.key}>
                <p>{group.label[locale]}</p>
                {group.items.map((item) => (
                  <Link key={item.href[locale]} href={localPath(locale, item.href[locale])}>
                    {item.label[locale]}
                  </Link>
                ))}
              </div>
            ))}
            <LanguageLink locale={locale} />
          </div>
        </details>
      </div>
    </header>
  );
}
