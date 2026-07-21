import { getDictionary, localPath, resources, type Locale } from '@apprentice-atlas/content';
import Link from 'next/link';
import { ButtonLink } from './button-link';
import { PartnerForm } from './partner-form';
import { WaitlistForm } from './waitlist-form';

export function HomePage({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const copy = locale === 'de' ? de : en;
  return (
    <>
      <section className="hero atlas-section">
        <div className="hero-coordinate">
          <span>FUTURE / 01</span>
          <span>53.4808° N — 13.4050° E</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>
            {copy.headlineLead}
            <em>{copy.headlineAccent}</em>
          </h1>
          <p className="hero-intro">{copy.intro}</p>
          <div className="button-row">
            <ButtonLink
              href={localPath(locale, locale === 'de' ? '/pilotpartner' : '/pilot-partners')}
            >
              {d.pilot}
            </ButtonLink>
            <ButtonLink
              href={localPath(locale, locale === 'de' ? '/produkt/app' : '/product/app')}
              variant="secondary"
            >
              {d.app}
            </ButtonLink>
          </div>
        </div>
        <div className="hero-map" aria-hidden="true">
          <svg viewBox="0 0 660 620" preserveAspectRatio="xMidYMid meet">
            <path
              className="map-contour contour-a"
              d="M42 416C92 335 179 355 224 277c51-88 2-159 89-206 103-55 135 83 226 82 54-1 75-33 99-66"
            />
            <path
              className="map-contour contour-b"
              d="M12 520c102-25 136 25 221-42 70-55 47-114 121-159 89-55 155 30 250-62"
            />
            <path
              className="route-path"
              d="M83 492C150 430 139 340 235 318s112-126 205-87c54 22 61-36 130-85"
            />
            <circle className="route-dot dot-one" cx="83" cy="492" r="8" />
            <circle className="route-dot dot-two" cx="235" cy="318" r="8" />
            <circle className="route-dot dot-three" cx="440" cy="231" r="8" />
            <circle className="route-pin" cx="570" cy="146" r="15" />
          </svg>
          <span className="map-label label-one">{copy.map1}</span>
          <span className="map-label label-two">{copy.map2}</span>
          <span className="map-label label-three">{copy.map3}</span>
        </div>
        <div className="hero-note">
          <span>AA—001</span>
          <p>{copy.note}</p>
        </div>
      </section>

      <section className="trust-strip" aria-label={copy.trustLabel}>
        {copy.trust.map((item, i) => (
          <div key={item}>
            <span>0{i + 1}</span>
            <p>{item}</p>
          </div>
        ))}
      </section>

      <section className="journey atlas-section">
        <div className="section-index">
          <span>02</span>
          <p>{copy.journeyEyebrow}</p>
        </div>
        <div className="section-heading">
          <h2>{copy.journeyTitle}</h2>
          <p>{copy.journeyIntro}</p>
        </div>
        <ol className="journey-steps">
          {copy.journey.map((item, i) => (
            <li key={item.title}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <div className={`journey-symbol symbol-${i + 1}`} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="product-window">
        <div className="product-copy">
          <p className="eyebrow">{copy.productEyebrow}</p>
          <h2>{copy.productTitle}</h2>
          <p>{copy.productBody}</p>
          <ButtonLink
            href={localPath(
              locale,
              locale === 'de' ? '/produkt/so-funktioniert-es' : '/product/how-it-works',
            )}
            variant="quiet"
          >
            {copy.productLink}
          </ButtonLink>
        </div>
        <div className="phone-stage" aria-label={copy.appPreviewLabel}>
          <div className="phone phone-back">
            <div className="phone-top" />
            <p className="screen-kicker">{copy.screen2Kicker}</p>
            <h3>{copy.screen2Title}</h3>
            <div className="screen-comparison">
              {copy.screen2Items.map((item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <p className="screen-source">↗ {copy.screen2Source}</p>
          </div>
          <div className="phone phone-front">
            <div className="phone-top" />
            <div className="screen-route">
              <span>YOUR ROUTE</span>
              <i />
            </div>
            <p className="screen-kicker">{copy.screen1Kicker}</p>
            <h3>{copy.screen1Title}</h3>
            <div className="screen-photo">
              <span>FIELD / 06</span>
            </div>
            <div className="screen-tags">
              <span>{copy.tag1}</span>
              <span>{copy.tag2}</span>
            </div>
            <button tabIndex={-1}>{copy.screenButton} →</button>
          </div>
          <p className="phone-disclaimer">{copy.previewNote}</p>
        </div>
        <div className="product-proof">
          {copy.proofs.map((proof, i) => (
            <div key={proof}>
              <span>0{i + 1}</span>
              <p>{proof}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="audiences atlas-section">
        <div className="section-index">
          <span>03</span>
          <p>{copy.audienceEyebrow}</p>
        </div>
        <div className="section-heading">
          <h2>{copy.audienceTitle}</h2>
        </div>
        <div className="audience-grid">
          {copy.audiences.map((item, i) => (
            <Link
              href={localPath(locale, item.href)}
              key={item.title}
              className={`audience-card card-${i + 1}`}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              <div className="audience-icon" aria-hidden="true">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <b>{copy.explore} ↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="principles atlas-section">
        <div className="principles-heading">
          <p className="eyebrow">{copy.principlesEyebrow}</p>
          <h2>{copy.principlesTitle}</h2>
        </div>
        <div className="principle-list">
          {copy.principles.map((item, i) => (
            <div key={item.title}>
              <span>0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <Link href={localPath(locale, item.href)} aria-label={item.title}>
                ↗
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="resource-feature atlas-section">
        <div className="section-index">
          <span>04</span>
          <p>{copy.libraryEyebrow}</p>
        </div>
        <div className="section-heading">
          <h2>{copy.libraryTitle}</h2>
          <ButtonLink
            href={localPath(locale, locale === 'de' ? '/ressourcen' : '/resources')}
            variant="secondary"
          >
            {d.allResources}
          </ButtonLink>
        </div>
        <div className="resource-grid">
          {resources.slice(0, 4).map((item, i) => (
            <Link
              key={item.id}
              href={localPath(
                locale,
                `${locale === 'de' ? '/ressourcen' : '/resources'}/${item.slug[locale]}`,
              )}
              className={`resource-card resource-${i + 1}`}
            >
              <span>
                {item.eyebrow[locale]} · {item.readMinutes} {d.minutes}
              </span>
              <h3>{item.title[locale]}</h3>
              <p>{item.description[locale]}</p>
              <b>{d.read} ↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="pilot-section atlas-section" id="pilot">
        <div className="pilot-copy">
          <p className="eyebrow">{copy.pilotEyebrow}</p>
          <h2>{copy.pilotTitle}</h2>
          <p>{copy.pilotBody}</p>
          <ul>
            {copy.pilotPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <PartnerForm locale={locale} />
      </section>

      <section className="waitlist-section atlas-section">
        <div>
          <p className="eyebrow">{copy.waitlistEyebrow}</p>
          <h2>{copy.waitlistTitle}</h2>
          <p>{copy.waitlistBody}</p>
        </div>
        <WaitlistForm locale={locale} />
      </section>
    </>
  );
}

const de = {
  eyebrow: 'Dein nächster Weg beginnt nicht mit einer perfekten Antwort.',
  headlineLead: 'Finde einen Weg, der ',
  headlineAccent: 'wirklich zu dir passt.',
  intro:
    'Apprentice Atlas macht Ausbildung und Apprenticeships verständlich – mit echten Tätigkeiten, offiziellen Quellen und AI, die dich unterstützt, nicht entscheidet.',
  note: 'Von Manchester nach Berlin. Für alle, die ihren nächsten Schritt noch nicht auf der Karte sehen.',
  map1: 'ENTDECKEN',
  map2: 'VERSTEHEN',
  map3: 'LOSLEGEN',
  trustLabel: 'Vertrauensmerkmale',
  trust: [
    'Offizielle Quellen',
    'Deutschland + UK',
    'Deutsch + Englisch',
    'Standort nur optional',
    'Verantwortungsvolle AI',
  ],
  journeyEyebrow: 'Eine Route, kein Orakel',
  journeyTitle: 'Orientierung wird leichter, wenn sie in Bewegung kommt.',
  journeyIntro:
    'Keine einzelne Antwort muss alles lösen. Der Atlas hilft, Spuren zu sammeln, die Realität zu prüfen und einen machbaren nächsten Schritt zu wählen.',
  journey: [
    {
      title: 'Bei dir anfangen',
      body: 'Erfahrungen und Interessen als echte Situationen sammeln – nicht als starres Persönlichkeitslabel.',
    },
    {
      title: 'Wege entdecken',
      body: 'Berufsfelder über Tätigkeiten, Lernformen und Arbeitsumgebungen vergleichen.',
    },
    {
      title: 'Realität verstehen',
      body: 'Anforderungen, Vergütung, Quellen und offene Fragen sichtbar prüfen.',
    },
    {
      title: 'Etwas ausprobieren',
      body: 'Gespräch, Besuch, Praktikum oder Bewerbung konkret vorbereiten.',
    },
  ],
  productEyebrow: 'Die App / ein Blick',
  productTitle: 'Nicht mehr scrollen. Eine Route bauen.',
  productBody:
    'Die App bewahrt Entdeckungen, erklärt Systeme und verwandelt vage Interessen in bessere Fragen für echte Gespräche.',
  productLink: 'So funktioniert Apprentice Atlas',
  appPreviewLabel: 'Vorschau der Apprentice Atlas App',
  screen1Kicker: 'Berufsfeld 06',
  screen1Title: 'Digital & IT',
  screen2Kicker: 'Dein Signal',
  screen2Title: 'Zwei Wege prüfen',
  screen2Items: ['Systemintegration', 'Softwareentwicklung', 'IT-Support'],
  screen2Source: 'Quellen & Unterschiede öffnen',
  previewNote: 'Prinzipdarstellung · kein Nutzerprofil und kein Match-Score',
  tag1: 'Probleme lösen',
  tag2: 'Im Team',
  screenButton: 'Berufsfeld erkunden',
  proofs: [
    'Kein öffentliches Profil',
    'Quellen an wichtigen Aussagen',
    'Empfehlungen bleiben erklärbar',
  ],
  audienceEyebrow: 'Für echte Orientierungsmomente',
  audienceTitle: 'Ein Atlas. Verschiedene Ausgangspunkte.',
  explore: 'Einstieg öffnen',
  audiences: [
    {
      title: 'Jugendliche',
      body: 'Entdecke ohne Druck, was einen genaueren Blick verdient.',
      href: '/fuer/jugendliche',
      icon: '↗',
    },
    {
      title: 'Schulen & Beratung',
      body: 'Stärke Gespräche mit Quellen, Struktur und guten Aufgaben.',
      href: '/fuer/schulen-beratung',
      icon: '⌁',
    },
    {
      title: 'Eltern',
      body: 'Verstehe neue Wege und stelle Fragen, die Selbstständigkeit fördern.',
      href: '/fuer/eltern',
      icon: '◎',
    },
  ],
  principlesEyebrow: 'Vertrauen ist eine Produktfunktion',
  principlesTitle: 'Klare Grenzen gehören auf die Karte.',
  principles: [
    {
      title: 'Privacy by design',
      body: 'Datensparsam, zustimmungsbasiert und ohne Datenwerbung.',
      href: '/vertrauen/datenschutz-sicherheit',
    },
    {
      title: 'AI mit Verantwortung',
      body: 'Vorschläge statt Urteile; Quellen und menschliche Beratung bleiben sichtbar.',
      href: '/vertrauen/verantwortungsvolle-ai',
    },
    {
      title: 'Offizielle Grundlage',
      body: 'Marktspezifische Primärquellen, Review-Daten und Korrekturwege.',
      href: '/vertrauen/datenprinzipien',
    },
  ],
  libraryEyebrow: 'Bibliothek / 28 Wege',
  libraryTitle: 'Wissen, das den nächsten Schritt besser macht.',
  pilotEyebrow: 'Pilotprogramm 2026/27',
  pilotTitle: 'Nicht an Schulen vorbei bauen. Mit ihnen.',
  pilotBody:
    'Wir suchen Schulen, Beratungsdienste und Ausbildungsnetzwerke in Deutschland und dem UK, die Apprentice Atlas in einem klar begrenzten Pilot erproben.',
  pilotPoints: [
    'Gemeinsam definierte Lernfragen',
    'Onboarding und feste Ansprechperson',
    'Geschützte Feedbackwege',
    'Ehrliche Auswertung ohne Scheinmetriken',
  ],
  waitlistEyebrow: 'App-Start',
  waitlistTitle: 'Sag Bescheid, wenn der Atlas startklar ist.',
  waitlistBody:
    'Ab 16 kannst du dich direkt vormerken. Bist du jünger, bitte eine erziehungsberechtigte Person um die Anmeldung.',
};

const en = {
  eyebrow: 'Your next route does not begin with a perfect answer.',
  headlineLead: 'Find a route that ',
  headlineAccent: 'actually fits you.',
  intro:
    'Apprentice Atlas makes apprenticeships easier to understand — with real activities, official sources and AI that supports rather than decides.',
  note: 'From Manchester to Berlin. For everyone whose next step is not yet on the map.',
  map1: 'DISCOVER',
  map2: 'UNDERSTAND',
  map3: 'MOVE',
  trustLabel: 'Trust features',
  trust: [
    'Official sources',
    'Germany + UK',
    'German + English',
    'Location is optional',
    'Responsible AI',
  ],
  journeyEyebrow: 'A route, not an oracle',
  journeyTitle: 'Exploration gets easier when it starts moving.',
  journeyIntro:
    'No single answer needs to solve everything. The Atlas helps you gather signals, check reality and choose one achievable next step.',
  journey: [
    {
      title: 'Start with you',
      body: 'Gather experiences and interests as real situations, not a fixed personality label.',
    },
    {
      title: 'Discover routes',
      body: 'Compare career fields through activities, learning styles and environments.',
    },
    {
      title: 'Understand reality',
      body: 'Check requirements, pay, sources and unanswered questions.',
    },
    { title: 'Try something', body: 'Prepare a conversation, visit, placement or application.' },
  ],
  productEyebrow: 'The app / a closer look',
  productTitle: 'Stop scrolling. Start building a route.',
  productBody:
    'The app keeps discoveries, explains systems and turns broad interests into better questions for real conversations.',
  productLink: 'How Apprentice Atlas works',
  appPreviewLabel: 'Preview of the Apprentice Atlas app',
  screen1Kicker: 'Career field 06',
  screen1Title: 'Digital & tech',
  screen2Kicker: 'Your signal',
  screen2Title: 'Check three routes',
  screen2Items: ['Infrastructure', 'Software development', 'IT support'],
  screen2Source: 'Open sources and differences',
  previewNote: 'Product principle · not a user profile or match score',
  tag1: 'Solve problems',
  tag2: 'Work in teams',
  screenButton: 'Explore this field',
  proofs: ['No public profile', 'Sources beside important claims', 'Suggestions stay explainable'],
  audienceEyebrow: 'For real exploration moments',
  audienceTitle: 'One atlas. Different starting points.',
  explore: 'Open this route',
  audiences: [
    {
      title: 'Young people',
      body: 'Explore without pressure and find what deserves a closer look.',
      href: '/for/young-people',
      icon: '↗',
    },
    {
      title: 'Schools & advisers',
      body: 'Strengthen conversations with sources, structure and useful activities.',
      href: '/for/schools-advisers',
      icon: '⌁',
    },
    {
      title: 'Parents & carers',
      body: 'Understand new routes and ask questions that build independence.',
      href: '/for/parents-carers',
      icon: '◎',
    },
  ],
  principlesEyebrow: 'Trust is a product feature',
  principlesTitle: 'Clear boundaries belong on the map.',
  principles: [
    {
      title: 'Privacy by design',
      body: 'Data-minimised, consent-led and never funded by personal-data advertising.',
      href: '/trust/privacy-safety',
    },
    {
      title: 'Responsible AI',
      body: 'Suggestions rather than judgements; sources and human guidance remain visible.',
      href: '/trust/responsible-ai',
    },
    {
      title: 'Official foundations',
      body: 'Market-specific primary sources, review dates and correction routes.',
      href: '/trust/data-principles',
    },
  ],
  libraryEyebrow: 'Library / 28 routes',
  libraryTitle: 'Knowledge that improves the next step.',
  pilotEyebrow: '2026/27 pilot programme',
  pilotTitle: 'Built with schools, not around them.',
  pilotBody:
    'We are looking for schools, careers services and apprenticeship networks in Germany and the UK to test Apprentice Atlas in a carefully bounded pilot.',
  pilotPoints: [
    'Shared learning questions',
    'Onboarding and a named contact',
    'Protected feedback routes',
    'Honest evaluation without vanity metrics',
  ],
  waitlistEyebrow: 'App launch',
  waitlistTitle: 'We’ll tell you when the Atlas is ready.',
  waitlistBody:
    'You can join directly from age 16. If you are younger, ask a parent or carer to sign up.',
};
