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
      de: 'Von der ersten Suche bis zur vorbereiteten Bewerbung.',
      en: 'From first search to a prepared application.',
    },
    description: {
      de: 'Apprentice Atlas verbindet verständliche Informationen, echte Tätigkeiten und sichere AI-Unterstützung.',
      en: 'Apprentice Atlas connects clear information, real activities and careful AI support.',
    },
    intro: {
      de: 'Apprentice Atlas verbindet offizielle Ausbildungsstellen, verständliche AI-Erklärungen, persönliche Favoriten und Bewerbungsplanung zu einem klaren Weg durch die Berufsorientierung.',
      en: 'Apprentice Atlas brings official apprenticeship opportunities, clear AI explanations, personal shortlists and application planning into one coherent careers journey.',
    },
    pillars: [
      {
        title: { de: 'Entdecken', en: 'Discover' },
        body: {
          de: 'Offizielle Ausbildungsstellen in deiner Region auf Karte oder Liste finden.',
          en: 'Find official apprenticeship opportunities in your area on a map or list.',
        },
      },
      {
        title: { de: 'Verstehen', en: 'Understand' },
        body: {
          de: 'Aufgaben, Anforderungen, Vergütung und Ausbildungsalltag in klarer Sprache verstehen.',
          en: 'Understand duties, requirements, pay and day-to-day training in clear language.',
        },
      },
      {
        title: { de: 'Handeln', en: 'Act' },
        body: {
          de: 'Favoriten speichern, Bewerbungen verfolgen und Interviews passend zur Stelle vorbereiten.',
          en: 'Save favourites, track applications and prepare for interviews around each vacancy.',
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
      de: 'Ein klarer Weg von der Suche bis zur Bewerbung.',
      en: 'A clear route from search to application.',
    },
    description: {
      de: 'Vier verständliche Schritte, die aus Interesse einen konkreten Bewerbungsplan machen.',
      en: 'Four clear steps that turn an interest into a practical application plan.',
    },
    intro: {
      de: 'Du entdeckst Ausbildungsstellen, verstehst den Alltag dahinter, baust eine persönliche Merkliste und bereitest den nächsten Bewerbungsschritt direkt in der App vor.',
      en: 'Discover opportunities, understand the daily reality, build a personal shortlist and prepare the next application step directly in the app.',
    },
    pillars: [
      {
        title: { de: '01 Chancen finden', en: '01 Find opportunities' },
        body: {
          de: 'Mit Ort, Interessen und Filtern offizielle Ausbildungsstellen auf Karte oder Liste entdecken.',
          en: 'Use location, interests and filters to discover official opportunities on a map or list.',
        },
      },
      {
        title: { de: '02 Stellen verstehen', en: '02 Understand vacancies' },
        body: {
          de: 'Dichte Ausschreibungstexte, Anforderungen und Arbeitsalltag verständlich aufbereiten.',
          en: 'Turn dense adverts, requirements and working life into clear information.',
        },
      },
      {
        title: { de: '03 Favoriten vergleichen', en: '03 Compare favourites' },
        body: {
          de: 'Interessante Stellen speichern und Unterschiede bei Aufgaben, Ort und Anforderungen prüfen.',
          en: 'Save interesting opportunities and compare duties, location and requirements.',
        },
      },
      {
        title: { de: '04 Bewerbung vorbereiten', en: '04 Prepare to apply' },
        body: {
          de: 'Fristen verfolgen, Interviewfragen üben und den Fortschritt bis zur offiziellen Bewerbung planen.',
          en: 'Track deadlines, practise interview questions and plan progress through to the official application.',
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
      de: 'Die App begleitet dich von der Suche auf der Karte über verständliche Stelleninfos und Favoriten bis zu Bewerbung, Interview und Fristen.',
      en: 'The app supports you from map-based discovery and clear vacancy information through to shortlists, applications, interviews and deadlines.',
    },
    pillars: [
      {
        title: { de: 'In deiner Nähe entdecken', en: 'Discover nearby' },
        body: {
          de: 'Offizielle Ausbildungsstellen auf der Karte oder in einer durchsuchbaren Liste finden.',
          en: 'Find official apprenticeship opportunities on a map or searchable list.',
        },
      },
      {
        title: { de: 'Stellen klar verstehen', en: 'Understand each vacancy' },
        body: {
          de: 'AI erklärt Ausschreibungen, beantwortet konkrete Fragen und zeigt die Originalquelle.',
          en: 'AI explains adverts, answers specific questions and keeps the original source visible.',
        },
      },
      {
        title: { de: 'Bewerbungen organisieren', en: 'Organise applications' },
        body: {
          de: 'Favoriten, Status, Interviews, Fristen, Kalender und Export an einem Ort verwalten.',
          en: 'Manage favourites, status, interviews, deadlines, calendar and exports in one place.',
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
      de: 'Klartext zur Stelle, konkrete Antworten und persönliche Vorbereitung mit sichtbarer Quelle.',
      en: 'Plain-language vacancy guidance, specific answers and personal preparation with visible sources.',
    },
    intro: {
      de: 'Unsere AI macht Ausschreibungen verständlicher, beantwortet Fragen zur konkreten Stelle und erstellt passende Interviewübungen sowie eine ehrliche Skill-Gap-Übersicht.',
      en: 'Our AI makes adverts easier to understand, answers questions about the specific vacancy and creates relevant interview practice and an honest skill-gap view.',
    },
    pillars: [
      {
        title: { de: 'Klar erklären', en: 'Explain clearly' },
        body: {
          de: 'Aufgaben, Anforderungen und Arbeitgebertexte in verständliche Sprache übersetzen.',
          en: 'Turn duties, requirements and employer language into clear explanations.',
        },
      },
      {
        title: { de: 'Konkrete Fragen beantworten', en: 'Answer specific questions' },
        body: {
          de: 'Fragen zu Alltag, Voraussetzungen und Bewerbung direkt auf Basis der Ausschreibung beantworten.',
          en: 'Answer questions about daily work, requirements and applying directly from the advert.',
        },
      },
      {
        title: { de: 'Persönlich vorbereiten', en: 'Prepare personally' },
        body: {
          de: 'Stellenspezifische Interviewfragen, Antworttipps und nächste Lernschritte erstellen.',
          en: 'Create vacancy-specific interview questions, answer tips and practical learning steps.',
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
      de: 'Entdecke, welcher Ausbildungsweg zu deinem Alltag passt.',
      en: 'Discover which apprenticeship route fits your life.',
    },
    description: {
      de: 'Finde heraus, welche Tätigkeiten und Wege einen genaueren Blick verdienen.',
      en: 'Find out which activities and routes deserve a closer look.',
    },
    intro: {
      de: 'Starte mit deinen Interessen, entdecke echte Stellen in deiner Nähe und finde Schritt für Schritt heraus, welche Aufgaben, Teams und Lernwege dich ansprechen.',
      en: 'Start with your interests, discover real opportunities nearby and find out which tasks, teams and ways of learning appeal to you.',
    },
    pillars: [
      {
        title: { de: 'Chancen entdecken', en: 'Discover opportunities' },
        body: {
          de: 'Finde offizielle Ausbildungsstellen passend zu Ort, Interessen und Arbeitsweise.',
          en: 'Find official apprenticeship opportunities by location, interests and ways of working.',
        },
      },
      {
        title: { de: 'Alltag verstehen', en: 'Understand daily work' },
        body: {
          de: 'Verstehe Aufgaben, Anforderungen, Vergütung und Lernform in klarer Sprache.',
          en: 'Understand duties, requirements, pay and learning in clear language.',
        },
      },
      {
        title: { de: 'Bewerbung starten', en: 'Start applying' },
        body: {
          de: 'Speichere Favoriten, übe Interviews und behalte Fristen und Fortschritt im Blick.',
          en: 'Save favourites, practise interviews and keep deadlines and progress in view.',
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
        title: { de: 'Nachvollziehbare Orientierung', en: 'Traceable guidance' },
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
      de: 'Ausbildungswege gemeinsam verstehen.',
      en: 'Understand apprenticeship routes together.',
    },
    description: {
      de: 'Verständliche Systeminformationen und bessere Fragen für ruhige Gespräche.',
      en: 'Clear system information and better questions for calmer conversations.',
    },
    intro: {
      de: 'Apprentice Atlas bereitet Stellen, Ausbildungsmodelle, Vergütung und Entwicklungsmöglichkeiten so auf, dass Familien konkrete Optionen gemeinsam besprechen können.',
      en: 'Apprentice Atlas presents vacancies, training models, pay and progression so families can discuss concrete options together.',
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
      de: 'Berufsorientierung mit Apprentice Atlas erproben.',
      en: 'Pilot careers exploration with Apprentice Atlas.',
    },
    description: {
      de: 'Für Schulen, Careers Services, Ausbildungsnetzwerke und gemeinnützige Partner in Deutschland und dem UK.',
      en: 'For schools, careers services, apprenticeship networks and non-profit partners in Germany and the UK.',
    },
    intro: {
      de: 'Gemeinsam erproben wir, wie offizielle Stellen, verständliche AI-Unterstützung und Bewerbungsplanung bestehende Beratung und Unterricht sinnvoll ergänzen.',
      en: 'Together we test how official opportunities, clear AI support and application planning can strengthen existing guidance and classroom practice.',
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
      de: 'Deine Orientierung bleibt privat – mit optionalem Standort, optionalen Analytics und geschützten persönlichen Angaben.',
      en: 'Your exploration stays private, with optional location, optional analytics and protected personal information.',
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
        title: { de: 'Daten nur für den gewählten Zweck', en: 'Data used for its stated purpose' },
        body: {
          de: 'Persönliche Angaben dienen deiner Nutzung von Apprentice Atlas und werden weder verkauft noch für personalisierte Anzeigen verwendet.',
          en: 'Personal information supports your use of Apprentice Atlas and is neither sold nor used for personalised advertising.',
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
        title: { de: 'Relevante Eingaben', en: 'Relevant inputs' },
        body: {
          de: 'Vorschläge beziehen sich auf konkrete Interessen und Fragen, statt aus wenigen Antworten eine feste Persönlichkeit abzuleiten.',
          en: 'Suggestions respond to specific interests and questions rather than inferring a fixed personality from a few answers.',
        },
      },
      {
        title: {
          de: 'Sensible Merkmale bleiben außen vor',
          en: 'Sensitive characteristics stay out',
        },
        body: {
          de: 'Berufsvorschläge konzentrieren sich auf Ziele und Interessen – nicht auf Gesundheit, Herkunft, Religion oder ähnliche Merkmale.',
          en: 'Career suggestions focus on goals and interests, not health, ethnicity, religion or similar characteristics.',
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
      de: 'Wir bauen einen Atlas, der offizielle Chancen sichtbar macht, komplizierte Informationen verständlich erklärt und Jugendliche vom ersten Interesse bis zur vorbereiteten Bewerbung begleitet.',
      en: 'We are building an atlas that makes official opportunities visible, explains complex information clearly and supports young people from first interest to a prepared application.',
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
      de: 'Aus einer Hackathon-Idee wurde eine echte App.',
      en: 'A hackathon idea became a real app.',
    },
    description: {
      de: 'Aus einem schnellen Prototyp wird eine verlässliche Plattform für echte Entscheidungen.',
      en: 'A fast prototype is becoming a dependable platform for real decisions.',
    },
    intro: {
      de: 'Heute verbindet Apprentice Atlas offizielle Ausbildungsstellen, Kartensuche, verständliche GPT-5.6-Erklärungen, Favoriten, Bewerbungstracking und Interviewvorbereitung in einer zweisprachigen iPhone-App. Jetzt entsteht daraus eine dauerhaft betreibbare Plattform für Schulen, Beratung und Jugendliche.',
      en: 'Today Apprentice Atlas combines official apprenticeships, map discovery, clear GPT-5.6 explanations, favourites, application tracking and interview preparation in a bilingual iPhone app. We are now turning it into a sustainable platform for schools, advisers and young people.',
    },
    pillars: [
      {
        title: { de: 'Build Week', en: 'Build Week' },
        body: {
          de: 'Die erste Version machte ortsbasierte Ausbildungssuche und verständliche AI-Unterstützung erlebbar.',
          en: 'The first version made location-based apprenticeship discovery and clear AI support tangible.',
        },
      },
      {
        title: { de: 'TestFlight-App', en: 'TestFlight app' },
        body: {
          de: 'Die App verbindet Suche, Klartext, AI-Fragen, Favoriten und Bewerbungsplanung in einem vollständigen mobilen Ablauf.',
          en: 'The app connects discovery, plain-language guidance, AI questions, favourites and application planning in one complete mobile journey.',
        },
      },
      {
        title: { de: 'Nächste Etappe', en: 'Next stage' },
        body: {
          de: 'Mit Schulen und Beratung erproben wir, wie Apprentice Atlas bestehende Berufsorientierung am besten ergänzt.',
          en: 'With schools and advisers, we are testing how Apprentice Atlas can best strengthen existing careers guidance.',
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
      de: 'Hier finden Medien und Partner ein geprüftes Kurzprofil, aktuelle Produktfakten, freigegebene Bilder und den direkten Kontakt für Rückfragen.',
      en: 'Media and partners can find a verified boilerplate, current product facts, approved imagery and a direct contact for questions.',
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
