import type { StaticPage, LocalizedText } from './types';
import { pageEditorial } from './page-editorial';

type PageInput = {
  key: string;
  slug: LocalizedText;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  intro: LocalizedText;
  pillars: Array<{
    title: LocalizedText;
    body: LocalizedText;
    points?: Record<'de' | 'en', string[]>;
  }>;
  cta?: StaticPage['cta'];
};

const page = (input: PageInput): StaticPage => ({
  ...input,
  sections: [...input.pillars, ...(pageEditorial[input.key] ?? [])],
});

export const staticPages: StaticPage[] = [
  page({
    key: 'product',
    slug: { de: 'produkt', en: 'product' },
    eyebrow: { de: 'Der Atlas für den nächsten Schritt', en: 'An atlas for the next step' },
    title: {
      de: 'Berufsorientierung, die aus Unsicherheit Bewegung macht.',
      en: 'Careers guidance that turns uncertainty into movement.',
    },
    description: {
      de: 'Apprentice Atlas verbindet verständliche Informationen, echte Tätigkeiten und sichere AI-Unterstützung.',
      en: 'Apprentice Atlas connects clear information, real activities and careful AI support.',
    },
    intro: {
      de: 'Jugendliche brauchen nicht noch mehr Listen. Sie brauchen einen Weg, Interessen in überprüfbare Optionen zu übersetzen – mit Quellen, Kontext und einem machbaren nächsten Schritt.',
      en: 'Young people do not need another list. They need a way to turn interests into testable options, with sources, context and one achievable next step.',
    },
    pillars: [
      {
        title: { de: 'Entdecken', en: 'Discover' },
        body: {
          de: 'Berufsfelder über Tätigkeiten, Arbeitsumgebungen und Lernformen erkunden.',
          en: 'Explore career fields through activities, environments and ways of learning.',
        },
      },
      {
        title: { de: 'Verstehen', en: 'Understand' },
        body: {
          de: 'Ausbildungswege in Deutschland und im Vereinigten Königreich verständlich vergleichen.',
          en: 'Understand apprenticeship routes in Germany and the United Kingdom.',
        },
      },
      {
        title: { de: 'Handeln', en: 'Act' },
        body: {
          de: 'Aus einer Idee werden Fragen, Gespräche, Besuche und gute Bewerbungen.',
          en: 'Turn an idea into questions, conversations, visits and stronger applications.',
        },
      },
    ],
    cta: 'app',
  }),
  page({
    key: 'how-it-works',
    slug: { de: 'produkt/so-funktioniert-es', en: 'product/how-it-works' },
    eyebrow: { de: 'Vier Kapitel', en: 'Four chapters' },
    title: {
      de: 'Von „keine Ahnung“ zu einem nächsten Schritt.',
      en: 'From “no idea” to a useful next step.',
    },
    description: {
      de: 'Ein nachvollziehbarer Orientierungsprozess statt einer Blackbox-Empfehlung.',
      en: 'A transparent exploration process, not a black-box recommendation.',
    },
    intro: {
      de: 'Der Atlas beginnt bei dir, erweitert den Blick, prüft Optionen und hilft beim Handeln. Jede Empfehlung bleibt erklärbar und veränderbar.',
      en: 'The Atlas starts with you, widens the view, tests options and helps you act. Every suggestion stays explainable and revisable.',
    },
    pillars: [
      {
        title: { de: '01 Signale sammeln', en: '01 Gather signals' },
        body: {
          de: 'Interessen, Erfahrungen, Stärken und Grenzen als konkrete Situationen erfassen.',
          en: 'Capture interests, experiences, strengths and constraints as concrete situations.',
        },
      },
      {
        title: { de: '02 Wege kartieren', en: '02 Map routes' },
        body: {
          de: 'Passende Tätigkeiten und Ausbildungswege nebeneinander ansehen.',
          en: 'See relevant activities and training routes side by side.',
        },
      },
      {
        title: { de: '03 Realität prüfen', en: '03 Check reality' },
        body: {
          de: 'Quellen, Anforderungen, Alltag und offene Fragen sichtbar machen.',
          en: 'Surface sources, requirements, daily reality and unanswered questions.',
        },
      },
      {
        title: { de: '04 Losgehen', en: '04 Take action' },
        body: {
          de: 'Einen Besuch, ein Gespräch, ein Praktikum oder eine Bewerbung vorbereiten.',
          en: 'Prepare a visit, conversation, placement or application.',
        },
      },
    ],
    cta: 'app',
  }),
  page({
    key: 'app',
    slug: { de: 'produkt/app', en: 'product/app' },
    eyebrow: { de: 'Mobile Begleitung', en: 'Mobile companion' },
    title: { de: 'Dein Atlas passt in die Hosentasche.', en: 'Your atlas fits in your pocket.' },
    description: {
      de: 'Entdecken, speichern, vergleichen und den nächsten Schritt planen.',
      en: 'Discover, save, compare and plan what comes next.',
    },
    intro: {
      de: 'Die App ist für kurze, wiederkehrende Orientierungsmomente gebaut. Sie ersetzt kein Beratungsgespräch, macht es aber konkreter und besser vorbereitet.',
      en: 'The app is built for short, repeatable moments of exploration. It does not replace careers conversations; it makes them more concrete and better prepared.',
    },
    pillars: [
      {
        title: { de: 'Persönliche Karte', en: 'A personal map' },
        body: {
          de: 'Gespeicherte Berufsfelder, Wege und Fragen an einem Ort.',
          en: 'Saved fields, routes and questions in one place.',
        },
      },
      {
        title: { de: 'Quellen sichtbar', en: 'Visible sources' },
        body: {
          de: 'Wichtige Aussagen führen zu ihrer offiziellen Grundlage.',
          en: 'Important claims link back to their official basis.',
        },
      },
      {
        title: { de: 'Standort optional', en: 'Location is optional' },
        body: {
          de: 'Regionale Relevanz ohne dauerhafte Standortfreigabe.',
          en: 'Regional relevance without requiring persistent location access.',
        },
      },
    ],
    cta: 'app',
  }),
  page({
    key: 'product-ai',
    slug: { de: 'produkt/ai', en: 'product/ai' },
    eyebrow: { de: 'Unterstützung mit Grenzen', en: 'Support with boundaries' },
    title: {
      de: 'AI erklärt und strukturiert. Du entscheidest.',
      en: 'AI explains and structures. You decide.',
    },
    description: {
      de: 'Keine automatische Berufswahl, kein Persönlichkeitsurteil, keine erfundene Gewissheit.',
      en: 'No automated career choice, personality judgement or invented certainty.',
    },
    intro: {
      de: 'Unsere AI hilft, unübersichtliche Informationen zu ordnen und bessere Fragen zu formulieren. Sie wird als Assistenz gestaltet, nicht als Autorität.',
      en: 'Our AI helps organise complex information and formulate better questions. It is designed as an assistant, not an authority.',
    },
    pillars: [
      {
        title: { de: 'Kann', en: 'Can' },
        body: {
          de: 'Begriffe erklären, Optionen gegenüberstellen und nächste Recherchefragen vorschlagen.',
          en: 'Explain terms, compare options and suggest further research questions.',
        },
      },
      {
        title: { de: 'Kann nicht', en: 'Cannot' },
        body: {
          de: 'Eignung feststellen, eine Stelle garantieren oder menschliche Beratung ersetzen.',
          en: 'Determine suitability, guarantee a role or replace human guidance.',
        },
      },
      {
        title: { de: 'Kontrolle', en: 'Control' },
        body: {
          de: 'Quellen, Feedbackwege und klare Eskalation bei Schutzthemen.',
          en: 'Sources, feedback routes and clear escalation for safeguarding concerns.',
        },
      },
    ],
    cta: 'resources',
  }),
  page({
    key: 'data-sources',
    slug: { de: 'produkt/datenquellen', en: 'product/data-sources' },
    eyebrow: { de: 'Nachvollziehbare Grundlage', en: 'Traceable foundations' },
    title: {
      de: 'Offizielle Daten, verständlich aufbereitet.',
      en: 'Official data, made understandable.',
    },
    description: {
      de: 'Wir trennen Quelle, redaktionelle Einordnung und AI-Unterstützung sichtbar voneinander.',
      en: 'We visibly separate source data, editorial context and AI assistance.',
    },
    intro: {
      de: 'Für Deutschland nutzen wir unter anderem Quellen von Bundesagentur für Arbeit und BIBB; für das UK offizielle Regierungs- und Berufsquellen der jeweiligen Nation.',
      en: 'For Germany we use sources including the Federal Employment Agency and BIBB; for the UK we use official government and careers sources for each nation.',
    },
    pillars: [
      {
        title: { de: 'Primärquellen zuerst', en: 'Primary sources first' },
        body: {
          de: 'Berufsstandards, Systemregeln und Zugangsinformationen stammen aus zuständigen Stellen.',
          en: 'Occupational standards, system rules and entry information come from responsible authorities.',
        },
      },
      {
        title: { de: 'Prüfdatum', en: 'Review dates' },
        body: {
          de: 'Redaktionelle Inhalte tragen Quellen und ein sichtbares Review-Datum.',
          en: 'Editorial content carries sources and a visible review date.',
        },
      },
      {
        title: { de: 'Korrekturen', en: 'Corrections' },
        body: {
          de: 'Hinweise werden geprüft, dokumentiert und bei Bedarf marktweise aktualisiert.',
          en: 'Reports are reviewed, documented and updated by market when needed.',
        },
      },
    ],
    cta: 'resources',
  }),
  page({
    key: 'young-people',
    slug: { de: 'fuer/jugendliche', en: 'for/young-people' },
    eyebrow: { de: 'Für Jugendliche', en: 'For young people' },
    title: {
      de: 'Du musst noch nicht wissen, was du werden willst.',
      en: 'You do not need to know what you want to become.',
    },
    description: {
      de: 'Finde heraus, welche Tätigkeiten und Wege einen genaueren Blick verdienen.',
      en: 'Find out which activities and routes deserve a closer look.',
    },
    intro: {
      de: 'Orientierung ist kein Test, den man bestehen muss. Beginne mit Neugier, prüfe echte Informationen und ändere deine Meinung, wenn du Neues lernst.',
      en: 'Career exploration is not a test to pass. Start with curiosity, check real information and change your mind as you learn.',
    },
    pillars: [
      {
        title: { de: 'Ohne Schubladen', en: 'No boxes' },
        body: {
          de: 'Interessen werden zu offenen Spuren, nicht zu einem endgültigen Etikett.',
          en: 'Interests become open trails, not permanent labels.',
        },
      },
      {
        title: { de: 'Ohne Verkaufsdruck', en: 'No sales pressure' },
        body: {
          de: 'Wir verkaufen keine Stellen und ranken Betriebe nicht nach Bezahlung.',
          en: 'We do not sell vacancies or rank employers by payment.',
        },
      },
      {
        title: { de: 'Mit echtem nächsten Schritt', en: 'A real next step' },
        body: {
          de: 'Jede Erkundung soll zu einer Frage oder Handlung führen, die du überprüfen kannst.',
          en: 'Every exploration should lead to a question or action you can test.',
        },
      },
    ],
    cta: 'app',
  }),
  page({
    key: 'schools',
    slug: { de: 'fuer/schulen-beratung', en: 'for/schools-advisers' },
    eyebrow: { de: 'Für Schulen & Beratung', en: 'For schools and advisers' },
    title: {
      de: 'Mehr Tiefe im Gespräch. Weniger Zeit für die Suche.',
      en: 'More depth in the conversation. Less time hunting for information.',
    },
    description: {
      de: 'Quellenbasierte Orientierung vor, während und nach Beratung und Unterricht.',
      en: 'Source-led exploration before, during and after careers sessions.',
    },
    intro: {
      de: 'Apprentice Atlas soll bestehende professionelle Arbeit stärken. Jugendliche kommen mit konkreteren Fragen; Beratende behalten Kontext, Grenzen und menschliches Urteil.',
      en: 'Apprentice Atlas is designed to strengthen existing professional practice. Young people arrive with more specific questions; advisers retain context, boundaries and human judgement.',
    },
    pillars: [
      {
        title: { de: 'Unterrichtsfähig', en: 'Ready for sessions' },
        body: {
          de: 'Klare Materialien, Quellen und kurze Aufgaben für Gruppen oder Einzelgespräche.',
          en: 'Clear materials, sources and short activities for groups or one-to-one work.',
        },
      },
      {
        title: { de: 'Keine Blackbox', en: 'No black box' },
        body: {
          de: 'Empfehlungen zeigen Begründung, Unsicherheit und Alternativen.',
          en: 'Suggestions show reasoning, uncertainty and alternatives.',
        },
      },
      {
        title: { de: 'Pilot mit Lernziel', en: 'Pilots with learning goals' },
        body: {
          de: 'Gemeinsam definierte Fragen, Feedbackkanäle und verantwortbare Auswertung.',
          en: 'Shared learning questions, feedback channels and proportionate evaluation.',
        },
      },
    ],
    cta: 'partner',
  }),
  page({
    key: 'parents',
    slug: { de: 'fuer/eltern', en: 'for/parents-carers' },
    eyebrow: { de: 'Für Eltern', en: 'For parents and carers' },
    title: {
      de: 'Orientierung geben, ohne den Weg vorzugeben.',
      en: 'Offer direction without choosing the route.',
    },
    description: {
      de: 'Verständliche Systeminformationen und bessere Fragen für ruhige Gespräche.',
      en: 'Clear system information and better questions for calmer conversations.',
    },
    intro: {
      de: 'Sie kennen Ihr Kind, aber nicht jede neue Berufsbezeichnung oder Ausbildungsregel. Wir bringen die Fakten in eine Form, die gemeinsames Prüfen möglich macht.',
      en: 'You know your young person, but not every new job title or apprenticeship rule. We make the facts easier to examine together.',
    },
    pillars: [
      {
        title: { de: 'Systeme verstehen', en: 'Understand the system' },
        body: {
          de: 'Vertrag, Vergütung, Lernorte, Level und Entwicklung ohne Fachjargon.',
          en: 'Contracts, pay, learning settings, levels and progression without jargon.',
        },
      },
      {
        title: { de: 'Risiken erkennen', en: 'Recognise risks' },
        body: {
          de: 'Seriosität, Arbeitsbedingungen, Schutz und verlässliche Ansprechpartner prüfen.',
          en: 'Check legitimacy, working conditions, safeguarding and named support.',
        },
      },
      {
        title: { de: 'Gespräche öffnen', en: 'Open conversations' },
        body: {
          de: 'Fragen, die Selbstständigkeit stärken statt Druck zu erhöhen.',
          en: 'Questions that build independence rather than pressure.',
        },
      },
    ],
    cta: 'resources',
  }),
  page({
    key: 'pilot',
    slug: { de: 'pilotpartner', en: 'pilot-partners' },
    eyebrow: { de: 'Pilotprogramm 2026/27', en: '2026/27 pilot programme' },
    title: {
      de: 'Apprentice Atlas gemeinsam verantwortungsvoll erproben.',
      en: 'Test Apprentice Atlas responsibly, together.',
    },
    description: {
      de: 'Für Schulen, Careers Services, Ausbildungsnetzwerke und gemeinnützige Partner in Deutschland und dem UK.',
      en: 'For schools, careers services, apprenticeship networks and non-profit partners in Germany and the UK.',
    },
    intro: {
      de: 'Wir suchen Partner, die nicht nur Zugang geben, sondern Lernfragen mitgestalten. Ein Pilot beginnt klein, schützt Teilnehmende und endet mit einer ehrlichen Entscheidung über den nächsten Schritt.',
      en: 'We are looking for partners who help shape the learning questions, not only provide access. A pilot starts small, protects participants and ends with an honest decision about what comes next.',
    },
    pillars: [
      {
        title: { de: 'Gemeinsam planen', en: 'Plan together' },
        body: {
          de: 'Zielgruppe, Einsatzkontext, Schutz, Einwilligung und Erfolgskriterien vorab festlegen.',
          en: 'Agree audience, context, safeguarding, consent and success criteria in advance.',
        },
      },
      {
        title: { de: 'Begleitet testen', en: 'Supported testing' },
        body: {
          de: 'Onboarding, feste Ansprechperson, Feedbackschleifen und dokumentierte Vorfälle.',
          en: 'Onboarding, a named contact, feedback loops and documented incidents.',
        },
      },
      {
        title: { de: 'Transparent lernen', en: 'Learn transparently' },
        body: {
          de: 'Nutzung, qualitative Erfahrungen und Grenzen getrennt auswerten.',
          en: 'Evaluate usage, qualitative experience and limitations separately.',
        },
      },
    ],
    cta: 'partner',
  }),
  page({
    key: 'privacy-safety',
    slug: { de: 'vertrauen/datenschutz-sicherheit', en: 'trust/privacy-safety' },
    eyebrow: { de: 'Privacy by design', en: 'Privacy by design' },
    title: {
      de: 'So wenig Daten wie möglich. So viel Schutz wie nötig.',
      en: 'As little data as possible. As much protection as needed.',
    },
    description: {
      de: 'Keine öffentlichen Profile, keine Werbetracker und keine sensiblen Daten für Berufsvorschläge.',
      en: 'No public profiles, advertising trackers or sensitive data required for career suggestions.',
    },
    intro: {
      de: 'Datensparsamkeit beginnt bei der Produktentscheidung. Standort ist optional; Analytics bleibt aus, bis ausdrücklich zugestimmt wird; Formulardaten werden getrennt und zeitlich begrenzt verarbeitet.',
      en: 'Data minimisation begins with product decisions. Location is optional; analytics stays off until explicit consent; form data is separated and retained for limited periods.',
    },
    pillars: [
      {
        title: { de: 'Minderjährige schützen', en: 'Protect young people' },
        body: {
          de: 'Direkte Vormerkung ab 16; jüngere Interessierte werden zu einer Anmeldung durch Erziehungsberechtigte geführt.',
          en: 'Direct waitlist sign-up from 16; younger users are directed to a parent or carer.',
        },
      },
      {
        title: { de: 'Keine Datenwerbung', en: 'No data advertising' },
        body: {
          de: 'Personenbezogene Daten werden nicht verkauft oder für personalisierte Anzeigen genutzt.',
          en: 'Personal data is not sold or used for personalised advertising.',
        },
      },
      {
        title: { de: 'Klare Fristen', en: 'Clear retention' },
        body: {
          de: 'Unbestätigte Vormerkungen nach sieben Tagen, Leads und bestätigte Einträge nach definierten Fristen löschen.',
          en: 'Delete unconfirmed sign-ups after seven days, and leads and confirmed entries on defined schedules.',
        },
      },
    ],
    cta: 'contact',
  }),
  page({
    key: 'responsible-ai',
    slug: { de: 'vertrauen/verantwortungsvolle-ai', en: 'trust/responsible-ai' },
    eyebrow: { de: 'Verantwortungsvolle AI', en: 'Responsible AI' },
    title: {
      de: 'Hilfreich, erklärbar und bewusst begrenzt.',
      en: 'Useful, explainable and deliberately limited.',
    },
    description: {
      de: 'AI unterstützt Orientierung, trifft aber keine Bildungs- oder Einstellungsentscheidung.',
      en: 'AI supports exploration but makes no education or hiring decision.',
    },
    intro: {
      de: 'Wir behandeln AI-Ausgaben als Vorschläge, nicht als Tatsachen. Quellen, alternative Wege, Feedback und menschliche Beratung bleiben sichtbar.',
      en: 'We treat AI output as suggestions, not facts. Sources, alternative routes, feedback and human guidance remain visible.',
    },
    pillars: [
      {
        title: { de: 'Keine Eignungsdiagnose', en: 'No suitability diagnosis' },
        body: {
          de: 'Wir leiten aus wenigen Antworten keine feste Persönlichkeit oder Berufseignung ab.',
          en: 'We do not infer a fixed personality or career suitability from a few answers.',
        },
      },
      {
        title: { de: 'Sensible Daten vermeiden', en: 'Avoid sensitive data' },
        body: {
          de: 'Gesundheit, Herkunft, Religion oder ähnliche Merkmale sind keine Empfehlungseingabe.',
          en: 'Health, ethnicity, religion and similar characteristics are not recommendation inputs.',
        },
      },
      {
        title: { de: 'Prüfen und verbessern', en: 'Test and improve' },
        body: {
          de: 'Qualität, Verzerrung, Schutzfälle und Beschwerden werden systematisch ausgewertet.',
          en: 'Quality, bias, safeguarding cases and complaints are reviewed systematically.',
        },
      },
    ],
    cta: 'resources',
  }),
  page({
    key: 'data-principles',
    slug: { de: 'vertrauen/datenprinzipien', en: 'trust/data-principles' },
    eyebrow: { de: 'Datenprinzipien', en: 'Data principles' },
    title: { de: 'Quelle vor Behauptung.', en: 'Source before claim.' },
    description: {
      de: 'Fünf Regeln für Daten, Redaktion und Produktentscheidungen.',
      en: 'Five rules for data, editorial work and product decisions.',
    },
    intro: {
      de: 'Berufsorientierung beeinflusst reale Entscheidungen. Deshalb müssen Herkunft, Aktualität, Geltungsbereich und Grenzen einer Information erkennbar bleiben.',
      en: 'Careers information influences real decisions. Origin, freshness, scope and limitations must therefore remain visible.',
    },
    pillars: [
      {
        title: { de: 'Zuständigkeit', en: 'Authority' },
        body: {
          de: 'Offizielle Primärquellen werden vor Zusammenfassungen und kommerziellen Verzeichnissen bevorzugt.',
          en: 'Official primary sources are preferred over summaries and commercial directories.',
        },
      },
      {
        title: { de: 'Kontext', en: 'Context' },
        body: {
          de: 'Deutschland und UK sowie die vier UK-Nationen werden nicht als identisches System behandelt.',
          en: 'Germany and the UK, including its four nations, are not treated as one identical system.',
        },
      },
      {
        title: { de: 'Korrigierbarkeit', en: 'Correctability' },
        body: {
          de: 'Jede wichtige Information hat Verantwortliche, Review-Datum und Korrekturweg.',
          en: 'Every material piece of information has an owner, review date and correction route.',
        },
      },
    ],
    cta: 'contact',
  }),
  page({
    key: 'accessibility',
    slug: { de: 'vertrauen/barrierefreiheit', en: 'trust/accessibility' },
    eyebrow: { de: 'Barrierefreiheit', en: 'Accessibility' },
    title: {
      de: 'Orientierung muss ohne Umwege erreichbar sein.',
      en: 'Careers guidance should be reachable without detours.',
    },
    description: {
      de: 'WCAG 2.2 AA als Mindeststandard für Website und Produkt.',
      en: 'WCAG 2.2 AA as the minimum standard for website and product.',
    },
    intro: {
      de: 'Wir gestalten für Tastatur, Screenreader, Vergrößerung, reduzierte Bewegung und verständliche Sprache. Barrierefreiheit wird getestet, nicht nur behauptet.',
      en: 'We design for keyboard, screen readers, zoom, reduced motion and understandable language. Accessibility is tested, not merely claimed.',
    },
    pillars: [
      {
        title: { de: 'Wahrnehmbar', en: 'Perceivable' },
        body: {
          de: 'Ausreichende Kontraste, echte Textalternativen und Inhalte ohne reine Farbcodierung.',
          en: 'Strong contrast, meaningful text alternatives and no colour-only information.',
        },
      },
      {
        title: { de: 'Bedienbar', en: 'Operable' },
        body: {
          de: 'Sichtbarer Fokus, große Ziele, keine Tastaturfallen und statische Motion-Alternative.',
          en: 'Visible focus, generous targets, no keyboard traps and static motion alternatives.',
        },
      },
      {
        title: { de: 'Rückmeldung', en: 'Feedback' },
        body: {
          de: 'Barrieren können direkt an accessibility@apprenticeatlas.com gemeldet werden.',
          en: 'Barriers can be reported directly to accessibility@apprenticeatlas.com.',
        },
      },
    ],
    cta: 'contact',
  }),
  page({
    key: 'impact',
    slug: { de: 'vertrauen/wirkung', en: 'trust/impact' },
    eyebrow: { de: 'Wirkungsansatz', en: 'Impact approach' },
    title: {
      de: 'Wir messen Lernen, nicht nur Klicks.',
      en: 'We measure learning, not just clicks.',
    },
    description: {
      de: 'Piloten prüfen, ob Orientierung klarer, gerechter und handlungsnäher wird.',
      en: 'Pilots examine whether exploration becomes clearer, fairer and more actionable.',
    },
    intro: {
      de: 'Vor jeder Erprobung formulieren wir konkrete Fragen. Reichweite, Nutzung, Orientierungskompetenz und langfristige Ergebnisse werden nicht miteinander verwechselt.',
      en: 'Before every pilot we define concrete questions. Reach, use, career-management skills and long-term outcomes are not conflated.',
    },
    pillars: [
      {
        title: { de: 'Vorab definieren', en: 'Define in advance' },
        body: {
          de: 'Erfolgskriterien, Risiken und Abbruchpunkte werden vor der Datensichtung festgelegt.',
          en: 'Success criteria, risks and stopping points are agreed before reviewing data.',
        },
      },
      {
        title: { de: 'Stimmen einbeziehen', en: 'Include lived experience' },
        body: {
          de: 'Jugendliche, Beratende und Eltern werden getrennt und geschützt gehört.',
          en: 'Young people, advisers and parents are heard separately and safely.',
        },
      },
      {
        title: { de: 'Ehrlich berichten', en: 'Report honestly' },
        body: {
          de: 'Unklare oder negative Ergebnisse sind Lernresultate, keine Störung.',
          en: 'Ambiguous or negative findings are learning outcomes, not inconveniences.',
        },
      },
    ],
    cta: 'partner',
  }),
  page({
    key: 'about',
    slug: { de: 'ueber-uns', en: 'about' },
    eyebrow: { de: 'Estopia Engineering Ltd', en: 'Estopia Engineering Ltd' },
    title: {
      de: 'Technologie für bessere erste Schritte.',
      en: 'Technology for better first steps.',
    },
    description: {
      de: 'Apprentice Atlas entsteht an der Schnittstelle von Produktentwicklung, Berufsorientierung und verantwortungsvoller AI.',
      en: 'Apprentice Atlas sits at the intersection of product development, careers guidance and responsible AI.',
    },
    intro: {
      de: 'Wir bauen keinen Automaten, der Jugendlichen sagt, wer sie sein sollen. Wir bauen einen Atlas, der Informationen ordnet, Fragen öffnet und professionelle Beratung stärkt.',
      en: 'We are not building a machine that tells young people who to be. We are building an atlas that organises information, opens questions and strengthens professional guidance.',
    },
    pillars: [
      {
        title: { de: 'Mission', en: 'Mission' },
        body: {
          de: 'Jeder junge Mensch soll berufliche Wege verstehen und einen selbstbestimmten nächsten Schritt finden können.',
          en: 'Every young person should be able to understand career routes and find a self-directed next step.',
        },
      },
      {
        title: { de: 'Arbeitsweise', en: 'How we work' },
        body: {
          de: 'Quellenbasiert, zweisprachig, barrierebewusst und in enger Erprobung mit den Menschen, die das Produkt nutzen.',
          en: 'Source-led, bilingual, accessibility-aware and tested closely with the people who use the product.',
        },
      },
      {
        title: { de: 'Unternehmen', en: 'Company' },
        body: {
          de: 'Apprentice Atlas ist ein Produkt von Estopia Engineering Ltd.',
          en: 'Apprentice Atlas is a product of Estopia Engineering Ltd.',
        },
      },
    ],
    cta: 'contact',
  }),
  page({
    key: 'story',
    slug: { de: 'ueber-uns/geschichte', en: 'about/story' },
    eyebrow: { de: 'Unsere Geschichte', en: 'Our story' },
    title: {
      de: 'Ein Hackathon war der Anfang, nicht das Ziel.',
      en: 'A hackathon was the beginning, not the destination.',
    },
    description: {
      de: 'Aus einem schnellen Prototyp wird eine verlässliche Plattform für echte Entscheidungen.',
      en: 'A fast prototype is becoming a dependable platform for real decisions.',
    },
    intro: {
      de: 'Die erste Version zeigte, wie verständliche Karten, offizielle Daten und AI-Unterstützung zusammenspielen können. Der nächste Schritt ist weniger spektakulär und wichtiger: prüfen, absichern, zuhören und dauerhaft betreiben.',
      en: 'The first version showed how clear maps, official data and AI support could work together. The next step is less flashy and more important: test, safeguard, listen and operate reliably.',
    },
    pillars: [
      {
        title: { de: 'Prototyp', en: 'Prototype' },
        body: {
          de: 'Eine ambitionierte Produktskizze machte die Idee erlebbar.',
          en: 'An ambitious product sketch made the idea tangible.',
        },
      },
      {
        title: { de: 'Produkt', en: 'Product' },
        body: {
          de: 'Inhalte, Datenschutz, Barrierefreiheit und Betrieb werden jetzt systematisch aufgebaut.',
          en: 'Content, privacy, accessibility and operations are now being built systematically.',
        },
      },
      {
        title: { de: 'Partnerschaft', en: 'Partnership' },
        body: {
          de: 'Schulen und Beratung helfen zu entscheiden, was wirklich nützlich und verantwortbar ist.',
          en: 'Schools and advisers help determine what is genuinely useful and responsible.',
        },
      },
    ],
    cta: 'partner',
  }),
  page({
    key: 'press',
    slug: { de: 'presse', en: 'press' },
    eyebrow: { de: 'Presse & Brand', en: 'Press and brand' },
    title: {
      de: 'Materialien für eine genaue Geschichte.',
      en: 'Materials for an accurate story.',
    },
    description: {
      de: 'Kurzprofil, Kontakt, Schreibweisen und verfügbare Brand Assets.',
      en: 'Company boilerplate, contact, naming and available brand assets.',
    },
    intro: {
      de: 'Wir stellen belegbare Produktinformationen und freigegebene Bildmaterialien bereit. Bitte keine Pilotpartner, Nutzerzahlen oder Wirkungsbehauptungen ohne schriftliche Bestätigung nennen.',
      en: 'We provide verified product information and approved imagery. Please do not name pilot partners, user numbers or impact claims without written confirmation.',
    },
    pillars: [
      {
        title: { de: 'Kurzprofil', en: 'Boilerplate' },
        body: {
          de: 'Apprentice Atlas ist eine zweisprachige Orientierungsplattform von Estopia Engineering Ltd für berufliche Wege in Deutschland und dem UK.',
          en: 'Apprentice Atlas is a bilingual careers exploration platform by Estopia Engineering Ltd for routes in Germany and the UK.',
        },
      },
      {
        title: { de: 'Schreibweise', en: 'Naming' },
        body: {
          de: 'Immer „Apprentice Atlas“; das Unternehmen heißt „Estopia Engineering Ltd“.',
          en: 'Always “Apprentice Atlas”; the company is “Estopia Engineering Ltd”.',
        },
      },
      {
        title: { de: 'Pressekontakt', en: 'Press contact' },
        body: { de: 'press@apprenticeatlas.com', en: 'press@apprenticeatlas.com' },
      },
    ],
    cta: 'contact',
  }),
  page({
    key: 'contact',
    slug: { de: 'kontakt', en: 'contact' },
    eyebrow: { de: 'Kontakt', en: 'Contact' },
    title: {
      de: 'Lass uns die nächste Route gemeinsam ansehen.',
      en: 'Let’s look at the next route together.',
    },
    description: {
      de: 'Für Pilotpartnerschaften, Presse, Barrierefreiheit, Datenschutz und allgemeine Fragen.',
      en: 'For pilots, press, accessibility, privacy and general enquiries.',
    },
    intro: {
      de: 'Schreiben Sie an hello@apprenticeatlas.com. Sicherheitsrelevante Hinweise senden Sie bitte an security@apprenticeatlas.com.',
      en: 'Email hello@apprenticeatlas.com. Please send security-related reports to security@apprenticeatlas.com.',
    },
    pillars: [
      {
        title: { de: 'Pilotpartnerschaften', en: 'Pilot partnerships' },
        body: {
          de: 'Nutzen Sie das Partnerformular für Schulen, Careers Services und Netzwerke.',
          en: 'Use the partner form for schools, careers services and networks.',
        },
      },
      {
        title: { de: 'Datenschutz', en: 'Privacy' },
        body: { de: 'privacy@apprenticeatlas.com', en: 'privacy@apprenticeatlas.com' },
      },
      {
        title: { de: 'Barrierefreiheit', en: 'Accessibility' },
        body: { de: 'accessibility@apprenticeatlas.com', en: 'accessibility@apprenticeatlas.com' },
      },
    ],
    cta: 'partner',
  }),
  page({
    key: 'privacy',
    slug: { de: 'datenschutz', en: 'privacy' },
    eyebrow: { de: 'Rechtliches', en: 'Legal' },
    title: { de: 'Datenschutzhinweise', en: 'Privacy notice' },
    description: {
      de: 'Welche Daten wir zu welchem Zweck und wie lange verarbeiten.',
      en: 'What data we process, why and for how long.',
    },
    intro: {
      de: 'Verantwortlicher ist Estopia Engineering Ltd. Diese Produktfassung beschreibt die geplanten Verarbeitungsvorgänge und muss vor dem öffentlichen Launch juristisch geprüft und um Register- und Kontaktangaben ergänzt werden.',
      en: 'The controller is Estopia Engineering Ltd. This product version describes intended processing and must receive legal review and complete registration and contact details before public launch.',
    },
    pillars: [
      {
        title: { de: 'Formulare', en: 'Forms' },
        body: {
          de: 'Partneranfragen verarbeiten wir zur Bearbeitung der Anfrage; Vormerkungen nur nach Double-Opt-in. Pflichtangaben und Einwilligungsversion werden protokolliert.',
          en: 'Partner enquiries are processed to respond; waitlist entries only become active after double opt-in. Required data and consent version are recorded.',
        },
      },
      {
        title: { de: 'Analytics', en: 'Analytics' },
        body: {
          de: 'PostHog EU wird erst nach ausdrücklicher Zustimmung geladen. IP-Erfassung und Session Replay sind deaktiviert; Formulareingaben werden nicht an Analytics gesendet.',
          en: 'PostHog EU loads only after explicit consent. IP capture and session replay are disabled; form contents are not sent to analytics.',
        },
      },
      {
        title: { de: 'Löschung & Rechte', en: 'Deletion and rights' },
        body: {
          de: 'Unbestätigte Vormerkungen werden nach 7 Tagen, Partner-Leads nach 12 Monaten und bestätigte Einträge 90 Tage nach Store-Launch gelöscht. Rechteanfragen an privacy@apprenticeatlas.com.',
          en: 'Unconfirmed entries are deleted after 7 days, partner leads after 12 months and confirmed entries 90 days after store launch. Rights requests: privacy@apprenticeatlas.com.',
        },
      },
    ],
    cta: 'contact',
  }),
  page({
    key: 'terms',
    slug: { de: 'nutzungsbedingungen', en: 'terms' },
    eyebrow: { de: 'Rechtliches', en: 'Legal' },
    title: { de: 'Nutzungsbedingungen', en: 'Terms of use' },
    description: {
      de: 'Regeln und Grenzen für die Nutzung der Informationsplattform.',
      en: 'Rules and limits for using the information platform.',
    },
    intro: {
      de: 'Apprentice Atlas bietet allgemeine Orientierung und keine individuelle Rechts-, Bildungs- oder Berufsberatung. Vor dem Launch wird diese Fassung juristisch geprüft.',
      en: 'Apprentice Atlas provides general information, not individual legal, educational or careers advice. This version will receive legal review before launch.',
    },
    pillars: [
      {
        title: { de: 'Eigene Prüfung', en: 'Verify information' },
        body: {
          de: 'Ausbildungsregeln, Fristen und Anforderungen können sich ändern. Maßgeblich sind verlinkte zuständige Stellen und konkrete Arbeitgeberangaben.',
          en: 'Apprenticeship rules, deadlines and requirements can change. Linked authorities and specific employer information remain decisive.',
        },
      },
      {
        title: { de: 'Verfügbarkeit', en: 'Availability' },
        body: {
          de: 'Wir betreiben den Dienst sorgfältig, garantieren aber keine ununterbrochene Verfügbarkeit oder Vollständigkeit.',
          en: 'We operate the service carefully but do not guarantee uninterrupted availability or completeness.',
        },
      },
      {
        title: { de: 'Urheberrecht', en: 'Copyright' },
        body: {
          de: 'Inhalte, Marke und Software sind geschützt. Gesetzlich erlaubte Nutzung bleibt unberührt.',
          en: 'Content, brand and software are protected. Statutory permitted use remains unaffected.',
        },
      },
    ],
    cta: 'contact',
  }),
  page({
    key: 'imprint',
    slug: { de: 'impressum', en: 'legal-notice' },
    eyebrow: { de: 'Rechtliches', en: 'Legal' },
    title: { de: 'Impressum', en: 'Legal notice' },
    description: {
      de: 'Anbieterkennzeichnung für Apprentice Atlas.',
      en: 'Provider information for Apprentice Atlas.',
    },
    intro: {
      de: 'Anbieter ist Estopia Engineering Ltd. Vollständige registrierte Anschrift, Company Number, vertretungsberechtigte Person und zuständige Kontaktangaben müssen vor öffentlichem Launch aus dem Unternehmensregister verifiziert und ergänzt werden.',
      en: 'The provider is Estopia Engineering Ltd. The registered address, company number, authorised representative and relevant contact details must be verified against the company register before public launch.',
    },
    pillars: [
      {
        title: { de: 'Kontakt', en: 'Contact' },
        body: { de: 'hello@apprenticeatlas.com', en: 'hello@apprenticeatlas.com' },
      },
      {
        title: { de: 'Presse', en: 'Press' },
        body: { de: 'press@apprenticeatlas.com', en: 'press@apprenticeatlas.com' },
      },
      {
        title: { de: 'Sicherheit', en: 'Security' },
        body: { de: 'security@apprenticeatlas.com', en: 'security@apprenticeatlas.com' },
      },
    ],
    cta: 'contact',
  }),
  page({
    key: 'accessibility-statement',
    slug: { de: 'erklaerung-barrierefreiheit', en: 'accessibility-statement' },
    eyebrow: { de: 'Rechtliches', en: 'Legal' },
    title: { de: 'Erklärung zur Barrierefreiheit', en: 'Accessibility statement' },
    description: {
      de: 'Unser Stand, Prüfverfahren und Kontakt bei Barrieren.',
      en: 'Our current status, testing approach and contact for barriers.',
    },
    intro: {
      de: 'Wir streben WCAG 2.2 AA an. Vor Launch prüfen wir zentrale Templates automatisiert und manuell mit Tastatur, Screenreader, Vergrößerung und reduzierter Bewegung.',
      en: 'We aim to meet WCAG 2.2 AA. Before launch, core templates are tested automatically and manually with keyboard, screen reader, zoom and reduced motion.',
    },
    pillars: [
      {
        title: { de: 'Status', en: 'Status' },
        body: {
          de: 'Die Plattform befindet sich vor dem öffentlichen Launch. Bekannte Abweichungen werden nach der vollständigen Prüfung hier konkret dokumentiert.',
          en: 'The platform is pre-launch. Known exceptions will be documented here specifically after the complete audit.',
        },
      },
      {
        title: { de: 'Feedback', en: 'Feedback' },
        body: {
          de: 'Melden Sie Barrieren an accessibility@apprenticeatlas.com mit Seite, Gerät und einer kurzen Beschreibung.',
          en: 'Report barriers to accessibility@apprenticeatlas.com with the page, device and a short description.',
        },
      },
      {
        title: { de: 'Antwort', en: 'Response' },
        body: {
          de: 'Wir bestätigen Meldungen und nennen nach Prüfung einen konkreten nächsten Schritt.',
          en: 'We acknowledge reports and provide a concrete next step after review.',
        },
      },
    ],
    cta: 'contact',
  }),
];

export const getStaticPage = (locale: 'de' | 'en', path: string) =>
  staticPages.find((item) => item.slug[locale] === path.replace(/^\//, '').replace(/\/$/, ''));
