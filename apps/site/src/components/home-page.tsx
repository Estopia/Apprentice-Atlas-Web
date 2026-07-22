import { getDictionary, localPath, type Locale } from '@apprentice-atlas/content';
import Image from 'next/image';
import Link from 'next/link';
import type { CallsToAction, SiteResource } from '@/lib/cms/types';
import { ButtonLink } from './button-link';
import { PartnerForm } from './partner-form';
import { WaitlistForm } from './waitlist-form';

export function HomePage({
  locale,
  featuredResources,
  callsToAction,
  resourceCount,
}: {
  locale: Locale;
  featuredResources: SiteResource[];
  callsToAction: CallsToAction;
  resourceCount: number;
}) {
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
              href={localPath(
                locale,
                callsToAction.pilot?.href ??
                  (locale === 'de' ? '/pilotpartner' : '/pilot-partners'),
              )}
            >
              {callsToAction.pilot?.label ?? d.pilot}
            </ButtonLink>
            <ButtonLink
              href={localPath(
                locale,
                callsToAction.app?.href ?? (locale === 'de' ? '/produkt/app' : '/product/app'),
              )}
              variant="secondary"
            >
              {callsToAction.app?.label ?? d.app}
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
          <div className="phone phone-back" aria-hidden="true">
            <Image
              src="/images/app/opportunity-detail.webp"
              alt=""
              fill
              sizes="(max-width: 760px) 240px, 280px"
            />
          </div>
          <div className="phone phone-front">
            <Image
              src="/images/app/dashboard.webp"
              alt={
                locale === 'de'
                  ? 'App-Übersicht mit Suche, gespeicherten Stellen, Fristen und persönlichen Vorschlägen.'
                  : 'App dashboard with search, saved opportunities, deadlines and personal suggestions.'
              }
              fill
              sizes="(max-width: 760px) 240px, 280px"
            />
          </div>
          <p className="phone-disclaimer">{locale === 'de' ? 'APP / EINBLICK' : 'APP / PREVIEW'}</p>
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
          <p>
            {locale === 'de'
              ? `Bibliothek / ${resourceCount} Guides`
              : `Library / ${resourceCount} guides`}
          </p>
        </div>
        <div className="section-heading">
          <h2>{copy.libraryTitle}</h2>
          <ButtonLink
            href={localPath(
              locale,
              callsToAction.resources?.href ?? (locale === 'de' ? '/ressourcen' : '/resources'),
            )}
            variant="secondary"
          >
            {callsToAction.resources?.label ?? d.allResources}
          </ButtonLink>
        </div>
        <div className="resource-grid">
          {featuredResources.map((item, i) => (
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
  eyebrow: 'Ausbildungsplätze finden. Chancen verstehen. Loslegen.',
  headlineLead: 'Finde den Ausbildungsweg, ',
  headlineAccent: 'der zu deinem Leben passt.',
  intro:
    'Entdecke offizielle Ausbildungsstellen in Deutschland und im Vereinigten Königreich, verstehe Aufgaben und Anforderungen in klarer Sprache und plane deine Bewerbung an einem Ort.',
  note: 'Von Manchester bis Berlin: Entdecke Chancen in deiner Nähe und finde heraus, was wirklich dahintersteckt.',
  map1: 'ENTDECKEN',
  map2: 'VERSTEHEN',
  map3: 'LOSLEGEN',
  trustLabel: 'Produktvorteile',
  trust: [
    'Offizielle Ausbildungsstellen',
    'Chancen in deiner Nähe',
    'Klartext zu jeder Stelle',
    'Favoriten & Bewerbungen im Blick',
    'AI für Fragen & Vorbereitung',
  ],
  journeyEyebrow: 'Von der ersten Idee zur Bewerbung',
  journeyTitle: 'Aus Unsicherheit wird ein konkreter Plan.',
  journeyIntro:
    'Der Atlas führt dich von ersten Interessen zu echten Ausbildungsstellen – und von dort Schritt für Schritt zu einer gut vorbereiteten Bewerbung.',
  journey: [
    {
      title: 'Bei dir anfangen',
      body: 'Halte fest, welche Aufgaben, Themen und Arbeitsweisen dich wirklich interessieren.',
    },
    {
      title: 'Wege entdecken',
      body: 'Berufsfelder über Tätigkeiten, Lernformen und Arbeitsumgebungen vergleichen.',
    },
    {
      title: 'Realität verstehen',
      body: 'Verstehe Aufgaben, Anforderungen, Vergütung und Lernalltag in klarer Sprache.',
    },
    {
      title: 'Etwas ausprobieren',
      body: 'Speichere Chancen und bereite Gespräch, Praktikum, Interview oder Bewerbung vor.',
    },
  ],
  productEyebrow: 'Die App im Einsatz',
  productTitle: 'Finden. Verstehen. Bewerben.',
  productBody:
    'Finde offizielle Stellen auf Karte oder Liste, lass dir Ausschreibungen verständlich erklären und behalte Favoriten, Fristen und Bewerbungen an einem Ort im Blick.',
  productLink: 'So funktioniert Apprentice Atlas',
  appPreviewLabel: 'Vorschau der Apprentice Atlas App',
  screen1Kicker: 'Berufsfeld 06',
  screen1Title: 'Digital & IT',
  screen2Kicker: 'Dein Vergleich',
  screen2Title: 'Drei IT-Wege vergleichen',
  screen2Items: ['Systemintegration', 'Softwareentwicklung', 'IT-Support'],
  screen2Source: 'Quellen & Unterschiede öffnen',
  previewNote: 'Illustrative App-Ansicht · echte Stellen zeigen Quelle und Aktualität',
  tag1: 'Probleme lösen',
  tag2: 'Im Team',
  screenButton: 'Berufsfeld erkunden',
  proofs: [
    'Offizielle Stellen auf Karte & Liste',
    'Klartext zu Aufgaben & Anforderungen',
    'Favoriten, Fristen & Bewerbungen im Blick',
  ],
  audienceEyebrow: 'Für Jugendliche, Schulen und Eltern',
  audienceTitle: 'Ein Atlas. Verschiedene Ausgangspunkte.',
  explore: 'Einstieg öffnen',
  audiences: [
    {
      title: 'Jugendliche',
      body: 'Finde Ausbildungsstellen, verstehe den Alltag dahinter und plane deinen nächsten Schritt.',
      href: '/fuer/jugendliche',
      icon: '↗',
    },
    {
      title: 'Schulen & Beratung',
      body: 'Bereite Gespräche mit verlässlichen Quellen, Vergleichen und konkreten Fragen vor.',
      href: '/fuer/schulen-beratung',
      icon: '⌁',
    },
    {
      title: 'Eltern',
      body: 'Verstehe Ausbildungswege und begleite Entscheidungen mit den richtigen Fragen.',
      href: '/fuer/eltern',
      icon: '◎',
    },
  ],
  principlesEyebrow: 'Verlässlich orientieren',
  principlesTitle: 'Du siehst, worauf jede Antwort beruht.',
  principles: [
    {
      title: 'Du bestimmst über deine Daten',
      body: 'Standort und Analytics bleiben optional; persönliche Inhalte werden geschützt.',
      href: '/vertrauen/datenschutz-sicherheit',
    },
    {
      title: 'AI erklärt und bereitet vor',
      body: 'Klartext, Fragen und Interviewübungen bleiben mit der jeweiligen Stelle verknüpft.',
      href: '/vertrauen/verantwortungsvolle-ai',
    },
    {
      title: 'Jede Stelle führt zur Quelle',
      body: 'Offizielle Anbieter, Aktualität und Originalausschreibung bleiben direkt erreichbar.',
      href: '/vertrauen/datenprinzipien',
    },
  ],
  libraryEyebrow: 'Bibliothek / 28 Guides',
  libraryTitle: 'Wissen, das den nächsten Schritt besser macht.',
  pilotEyebrow: 'Pilotprogramm 2026/27',
  pilotTitle: 'Berufsorientierung gemeinsam besser machen.',
  pilotBody:
    'Wir suchen Schulen, Beratungsdienste und Ausbildungsnetzwerke in Deutschland und dem UK, die Apprentice Atlas in einem klar begrenzten Pilot erproben.',
  pilotPoints: [
    'Gemeinsam definierte Lernfragen',
    'Onboarding und feste Ansprechperson',
    'Geschützte Feedbackwege',
    'Auswertung entlang gemeinsamer Lernziele',
  ],
  waitlistEyebrow: 'App-Start',
  waitlistTitle: 'Erfahre, wenn der Atlas startklar ist.',
  waitlistBody:
    'Ab 16 kannst du dich direkt vormerken. Bist du jünger, bitte eine erziehungsberechtigte Person um die Anmeldung.',
};

const en = {
  eyebrow: 'Find apprenticeships. Understand opportunities. Take action.',
  headlineLead: 'Find the apprenticeship route ',
  headlineAccent: 'that fits your life.',
  intro:
    'Discover official apprenticeships in Germany and the United Kingdom, understand duties and requirements in plain language, and plan your application in one place.',
  note: 'From Manchester to Berlin: discover opportunities nearby and understand what each one could mean for you.',
  map1: 'DISCOVER',
  map2: 'UNDERSTAND',
  map3: 'MOVE',
  trustLabel: 'Product highlights',
  trust: [
    'Official apprenticeships',
    'Opportunities near you',
    'Every vacancy in plain language',
    'Shortlist & applications together',
    'AI questions & preparation',
  ],
  journeyEyebrow: 'From first idea to application',
  journeyTitle: 'Turn uncertainty into a practical plan.',
  journeyIntro:
    'The Atlas takes you from early interests to real apprenticeship opportunities, then guides you towards a well-prepared application.',
  journey: [
    {
      title: 'Start with you',
      body: 'Capture the tasks, subjects and ways of working that genuinely interest you.',
    },
    {
      title: 'Discover routes',
      body: 'Compare career fields through activities, learning styles and environments.',
    },
    {
      title: 'Understand reality',
      body: 'Understand duties, requirements, pay and learning in clear language.',
    },
    {
      title: 'Take action',
      body: 'Save opportunities and prepare a conversation, placement, interview or application.',
    },
  ],
  productEyebrow: 'See the app in action',
  productTitle: 'Find. Understand. Apply.',
  productBody:
    'Find official opportunities on a map or list, turn dense adverts into clear information, and keep your shortlist, deadlines and applications together.',
  productLink: 'How Apprentice Atlas works',
  appPreviewLabel: 'Preview of the Apprentice Atlas app',
  screen1Kicker: 'Career field 06',
  screen1Title: 'Digital & tech',
  screen2Kicker: 'Your comparison',
  screen2Title: 'Compare three tech routes',
  screen2Items: ['Infrastructure', 'Software development', 'IT support'],
  screen2Source: 'Open sources and differences',
  previewNote: 'Illustrative app view · live opportunities show source and freshness',
  tag1: 'Solve problems',
  tag2: 'Work in teams',
  screenButton: 'Explore this field',
  proofs: [
    'Official opportunities on a map & list',
    'Plain language for duties & requirements',
    'Shortlist, deadlines & applications together',
  ],
  audienceEyebrow: 'For young people, schools and families',
  audienceTitle: 'One atlas. Different starting points.',
  explore: 'Open this route',
  audiences: [
    {
      title: 'Young people',
      body: 'Find opportunities, understand daily work and plan your next step.',
      href: '/for/young-people',
      icon: '↗',
    },
    {
      title: 'Schools & advisers',
      body: 'Prepare conversations with reliable sources, comparisons and specific questions.',
      href: '/for/schools-advisers',
      icon: '⌁',
    },
    {
      title: 'Parents & carers',
      body: 'Understand apprenticeship routes and support decisions with useful questions.',
      href: '/for/parents-carers',
      icon: '◎',
    },
  ],
  principlesEyebrow: 'Explore with confidence',
  principlesTitle: 'See what every answer is built on.',
  principles: [
    {
      title: 'You control your data',
      body: 'Location and analytics stay optional, while personal content stays protected.',
      href: '/trust/privacy-safety',
    },
    {
      title: 'AI explains and prepares',
      body: 'Plain-language guidance, questions and interview practice stay tied to the vacancy.',
      href: '/trust/responsible-ai',
    },
    {
      title: 'Every vacancy links to its source',
      body: 'Official provider, freshness and original advert remain directly accessible.',
      href: '/trust/data-principles',
    },
  ],
  libraryEyebrow: 'Library / 28 guides',
  libraryTitle: 'Knowledge that improves the next step.',
  pilotEyebrow: '2026/27 pilot programme',
  pilotTitle: 'Make careers exploration better, together.',
  pilotBody:
    'We are looking for schools, careers services and apprenticeship networks in Germany and the UK to test Apprentice Atlas in a carefully bounded pilot.',
  pilotPoints: [
    'Shared learning questions',
    'Onboarding and a named contact',
    'Protected feedback routes',
    'Evaluation against shared learning goals',
  ],
  waitlistEyebrow: 'App launch',
  waitlistTitle: 'We’ll tell you when the Atlas is ready.',
  waitlistBody:
    'You can join directly from age 16. If you are younger, ask a parent or carer to sign up.',
};
