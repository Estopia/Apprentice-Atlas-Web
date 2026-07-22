import { getDictionary, localPath, type Locale, type NavGroup } from '@apprentice-atlas/content';
import Link from 'next/link';
import type { SiteFooterSettings } from '@/lib/cms/types';
import { AtlasMark } from './atlas-mark';

export function SiteFooter({
  footer,
  locale,
  navigation,
}: {
  footer: SiteFooterSettings;
  locale: Locale;
  navigation: NavGroup[];
}) {
  const d = getDictionary(locale);
  const legal: Array<{ label: string; path: string }> = footer.links.length
    ? footer.links.map((link) => ({ label: link.label, path: link.href }))
    : locale === 'de'
      ? [
          { label: 'Datenschutz', path: '/datenschutz' },
          { label: 'Nutzungsbedingungen', path: '/nutzungsbedingungen' },
          { label: 'Impressum', path: '/impressum' },
          { label: 'Barrierefreiheit', path: '/erklaerung-barrierefreiheit' },
        ]
      : [
          { label: 'Privacy', path: '/privacy' },
          { label: 'Terms', path: '/terms' },
          { label: 'Legal notice', path: '/legal-notice' },
          { label: 'Accessibility', path: '/accessibility-statement' },
        ];
  return (
    <footer className="site-footer">
      <div className="footer-route" aria-hidden="true">
        <span>53.4808° N</span>
        <i />
        <span>52.5200° N</span>
        <i />
        <span>51.5072° N</span>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <AtlasMark />
          <p>{d.footerClaim}</p>
          <a href={`mailto:${footer.generalEmail}`}>{footer.generalEmail}</a>
        </div>
        {navigation.slice(0, 3).map((group) => (
          <div className="footer-column" key={group.key}>
            <p>{group.label[locale]}</p>
            {group.items.slice(0, 4).map((item) => (
              <Link key={item.href[locale]} href={localPath(locale, item.href[locale])}>
                {item.label[locale]}
              </Link>
            ))}
          </div>
        ))}
        <div className="footer-column">
          <p>{d.legal}</p>
          {legal.map((item) => (
            <Link key={item.path} href={localPath(locale, item.path)}>
              {item.label}
            </Link>
          ))}
          <button className="link-button" type="button" data-consent-settings>
            {d.settings}
          </button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{footer.copyright}</p>
        <p>
          {locale === 'de'
            ? 'Gebaut zwischen Manchester, Berlin und dem nächsten Schritt.'
            : 'Built between Manchester, Berlin and the next step.'}
        </p>
      </div>
    </footer>
  );
}
