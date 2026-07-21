import type { Resource, ResourceKind, Country, Audience, LocalizedText } from './types';

const deSource = {
  label: 'Bundesagentur für Arbeit – Ausbildung',
  url: 'https://www.arbeitsagentur.de/bildung/ausbildung',
};
const ukSource = { label: 'GOV.UK – Apprenticeships', url: 'https://www.gov.uk/become-apprentice' };
const bibbSource = { label: 'BIBB – Ausbildung', url: 'https://www.bibb.de/de/40.php' };
const careersSource = {
  label: 'National Careers Service',
  url: 'https://nationalcareers.service.gov.uk/',
};

type Input = {
  id: string;
  kind: ResourceKind;
  country: Country;
  audiences: Audience[];
  slug: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  overview: LocalizedText;
  actions: Record<'de' | 'en', string[]>;
  questions: Record<'de' | 'en', string[]>;
  sources?: Resource['sources'];
  minutes?: number;
};

const makeResource = (input: Input): Resource => ({
  id: input.id,
  translationGroup: input.id,
  slug: input.slug,
  title: input.title,
  description: input.description,
  eyebrow: {
    de:
      input.kind === 'career'
        ? 'Berufsfeld'
        : input.kind === 'insight'
          ? 'Einblick'
          : 'Praxisguide',
    en:
      input.kind === 'career'
        ? 'Career field'
        : input.kind === 'insight'
          ? 'Insight'
          : 'Practical guide',
  },
  kind: input.kind,
  country: input.country,
  audiences: input.audiences,
  readMinutes: input.minutes ?? 6,
  reviewedAt: '2026-07-21',
  reviewer: 'Apprentice Atlas Editorial Team',
  sources:
    input.sources ??
    (input.country === 'de'
      ? [deSource, bibbSource]
      : input.country === 'uk'
        ? [ukSource, careersSource]
        : [deSource, ukSource]),
  sections: [
    {
      heading: { de: 'Worum es wirklich geht', en: 'What this is really about' },
      paragraphs: { de: [input.overview.de], en: [input.overview.en] },
    },
    {
      heading: { de: 'Deine nächsten Schritte', en: 'Your next steps' },
      paragraphs: {
        de: [
          'Arbeite die Schritte in deinem eigenen Tempo durch. Gute Orientierung entsteht nicht durch eine perfekte Entscheidung, sondern durch konkrete Vergleiche.',
        ],
        en: [
          'Work through these steps at your own pace. Good career decisions come from concrete comparisons, not from finding one perfect answer.',
        ],
      },
      bullets: input.actions,
    },
    {
      heading: { de: 'Fragen für ein gutes Gespräch', en: 'Questions for a useful conversation' },
      paragraphs: {
        de: [
          'Nimm diese Fragen zu einem Gespräch mit einer Beratungsfachkraft, einer Lehrkraft, deiner Familie oder einem Ausbildungsbetrieb mit.',
        ],
        en: [
          'Take these questions to a careers adviser, teacher, family member or apprenticeship employer.',
        ],
      },
      bullets: input.questions,
    },
  ],
});

export const resources: Resource[] = [
  makeResource({
    id: 'orientation-after-school',
    kind: 'guide',
    country: 'both',
    audiences: ['young-people', 'parents', 'schools'],
    slug: { de: 'was-kommt-nach-der-schule', en: 'what-comes-after-school' },
    title: { de: 'Was kommt nach der Schule?', en: 'What comes after school?' },
    description: {
      de: 'Ein ruhiger, praktischer Startpunkt für Ausbildung, Apprenticeship, Studium und Zwischenwege.',
      en: 'A calm, practical starting point for apprenticeships, university and the routes in between.',
    },
    overview: {
      de: 'Die erste Entscheidung nach der Schule legt nicht dein ganzes Leben fest. Entscheidend ist, Optionen nach Alltag, Lernform, Einkommen, Entwicklung und Zugangsvoraussetzungen zu vergleichen.',
      en: 'Your first choice after school does not determine your whole life. Compare routes by daily work, learning style, pay, progression and entry requirements.',
    },
    actions: {
      de: [
        'Notiere drei Tätigkeiten, die dir Energie geben.',
        'Vergleiche mindestens zwei unterschiedliche Lernwege.',
        'Plane eine echte Begegnung: Praktikum, Open Day oder Betriebsbesuch.',
      ],
      en: [
        'Write down three activities that give you energy.',
        'Compare at least two different learning routes.',
        'Plan one real encounter: a placement, open day or employer visit.',
      ],
    },
    questions: {
      de: [
        'Wie sieht eine normale Woche aus?',
        'Welche Abschlüsse oder nächsten Schritte sind danach möglich?',
        'Welche Kosten, Vergütung und Unterstützung gibt es?',
      ],
      en: [
        'What does a normal week look like?',
        'Which qualifications and next steps follow?',
        'What pay, costs and support are involved?',
      ],
    },
  }),
  makeResource({
    id: 'german-system',
    kind: 'guide',
    country: 'de',
    audiences: ['young-people', 'parents', 'schools'],
    slug: { de: 'duale-ausbildung-verstehen', en: 'understanding-german-dual-training' },
    title: { de: 'Die duale Ausbildung verstehen', en: 'Understanding German dual training' },
    description: {
      de: 'Betrieb, Berufsschule, Vergütung und Abschluss verständlich erklärt.',
      en: 'A clear guide to employers, vocational schools, pay and qualifications.',
    },
    overview: {
      de: 'In der dualen Ausbildung lernst du an zwei Orten: praktisch im Betrieb und fachlich in der Berufsschule. Ein Ausbildungsvertrag regelt Dauer, Vergütung, Urlaub und Pflichten.',
      en: 'German dual training combines practical learning with an employer and theory at a vocational school. A training contract sets out duration, pay, leave and responsibilities.',
    },
    actions: {
      de: [
        'Prüfe Ausbildungsdauer und zuständige Kammer.',
        'Vergleiche Ausbildungsvergütungen und Fahrtkosten.',
        'Frage nach Übernahmechancen und Prüfungsvorbereitung.',
      ],
      en: [
        'Check the duration and responsible chamber.',
        'Compare training pay and travel costs.',
        'Ask about progression and exam preparation.',
      ],
    },
    questions: {
      de: [
        'Wie wechseln sich Betrieb und Schule ab?',
        'Wer begleitet mich im Betrieb?',
        'Wie ist die Abschlussprüfung aufgebaut?',
      ],
      en: [
        'How do workplace and school phases alternate?',
        'Who supports me at work?',
        'How is the final examination structured?',
      ],
    },
  }),
  makeResource({
    id: 'uk-system',
    kind: 'guide',
    country: 'uk',
    audiences: ['young-people', 'parents', 'schools'],
    slug: { de: 'uk-apprenticeships-verstehen', en: 'understanding-uk-apprenticeships' },
    title: { de: 'UK Apprenticeships verstehen', en: 'Understanding UK apprenticeships' },
    description: {
      de: 'Level, Training Provider, Off-the-job Training und End-point Assessment im Überblick.',
      en: 'Levels, training providers, off-the-job learning and end-point assessment explained.',
    },
    overview: {
      de: 'Ein Apprenticeship ist eine bezahlte Stelle mit strukturierter Ausbildung. Die genaue Ausgestaltung unterscheidet sich zwischen England, Schottland, Wales und Nordirland; dieser Guide startet mit dem englischen System.',
      en: 'An apprenticeship is a paid job with structured training. Details differ across the UK nations; this guide starts with the English system.',
    },
    actions: {
      de: [
        'Vergleiche Level und spätere Anschlussmöglichkeiten.',
        'Prüfe Arbeitszeit, Vergütung und Trainingsanteil.',
        'Lies Standard und Assessment Plan des Berufs.',
      ],
      en: [
        'Compare the level and progression routes.',
        'Check hours, pay and the training allocation.',
        'Read the occupation standard and assessment plan.',
      ],
    },
    questions: {
      de: [
        'Welcher Training Provider ist beteiligt?',
        'Wie werden die Lernstunden geschützt?',
        'Was muss ich im End-point Assessment zeigen?',
      ],
      en: [
        'Which training provider is involved?',
        'How is off-the-job learning protected?',
        'What will I demonstrate at end-point assessment?',
      ],
    },
  }),
  makeResource({
    id: 'compare-routes',
    kind: 'guide',
    country: 'both',
    audiences: ['young-people', 'parents'],
    slug: {
      de: 'ausbildung-oder-studium-vergleichen',
      en: 'compare-apprenticeship-and-university',
    },
    title: {
      de: 'Ausbildung oder Studium vergleichen',
      en: 'Compare apprenticeships and university',
    },
    description: {
      de: 'Nicht entweder-oder denken, sondern Lernform, Geld, Zugang und Entwicklung prüfen.',
      en: 'Compare learning style, money, entry and progression without false either-or thinking.',
    },
    overview: {
      de: 'Beide Wege können zu anspruchsvollen Berufen und weiterer Qualifikation führen. Der bessere Weg ist der, dessen Lernalltag und Rahmenbedingungen zu deiner aktuellen Situation passen.',
      en: 'Both routes can lead to skilled careers and further qualifications. The better route is the one whose learning environment and conditions fit you now.',
    },
    actions: {
      de: [
        'Erstelle eine Vergleichstabelle mit fünf Kriterien.',
        'Sprich mit je einer Person aus beiden Wegen.',
        'Prüfe hybride Optionen wie duales Studium oder degree apprenticeship.',
      ],
      en: [
        'Build a five-criterion comparison.',
        'Speak to one person from each route.',
        'Explore hybrid routes such as degree apprenticeships.',
      ],
    },
    questions: {
      de: [
        'Wie lerne ich am besten?',
        'Wie wichtig ist mir frühes Einkommen?',
        'Welche Türen möchte ich mir offenhalten?',
      ],
      en: [
        'How do I learn best?',
        'How important is earning early?',
        'Which future options do I want to keep open?',
      ],
    },
  }),
  makeResource({
    id: 'find-strengths',
    kind: 'guide',
    country: 'both',
    audiences: ['young-people', 'schools'],
    slug: { de: 'staerken-ohne-test-entdecken', en: 'discover-strengths-without-a-test' },
    title: {
      de: 'Stärken entdecken – ohne perfekten Test',
      en: 'Discover your strengths without a perfect test',
    },
    description: {
      de: 'Beobachtungen aus Schule, Alltag, Hobbys und Nebenjobs in Berufsideen übersetzen.',
      en: 'Turn evidence from school, daily life, hobbies and part-time work into career ideas.',
    },
    overview: {
      de: 'Stärken zeigen sich in Situationen, nicht nur in Adjektiven. Sammle Beispiele dafür, wann du Probleme gelöst, etwas erklärt, organisiert, gebaut oder verbessert hast.',
      en: 'Strengths appear in situations, not just adjectives. Gather examples of times you solved, explained, organised, built or improved something.',
    },
    actions: {
      de: [
        'Führe eine Woche lang ein Energieprotokoll.',
        'Bitte zwei Menschen um konkrete Beobachtungen.',
        'Ordne Beispiele passenden Tätigkeiten statt Berufsbezeichnungen zu.',
      ],
      en: [
        'Keep an energy log for one week.',
        'Ask two people for specific observations.',
        'Map examples to activities before job titles.',
      ],
    },
    questions: {
      de: [
        'Wobei bitten andere mich um Hilfe?',
        'Welche schwierige Aufgabe habe ich freiwillig weitergemacht?',
        'Arbeite ich lieber mit Menschen, Ideen, Daten oder Dingen?',
      ],
      en: [
        'What do people ask me to help with?',
        'Which difficult task did I choose to continue?',
        'Do I prefer people, ideas, data or things?',
      ],
    },
  }),
  makeResource({
    id: 'work-experience',
    kind: 'guide',
    country: 'both',
    audiences: ['young-people', 'schools'],
    slug: { de: 'praktikum-richtig-nutzen', en: 'make-work-experience-count' },
    title: { de: 'Ein Praktikum richtig nutzen', en: 'Make work experience count' },
    description: {
      de: 'Vorbereiten, beobachten, nachfragen und echte Erkenntnisse festhalten.',
      en: 'Prepare, observe, ask better questions and capture useful evidence.',
    },
    overview: {
      de: 'Ein Praktikum muss deinen Traumberuf nicht bestätigen. Es ist wertvoll, wenn du danach genauer weißt, welche Aufgaben, Teams und Arbeitsbedingungen zu dir passen.',
      en: 'Work experience does not need to confirm a dream job. It is useful when it makes your preferences about tasks, teams and conditions more specific.',
    },
    actions: {
      de: [
        'Setze dir drei Beobachtungsfragen.',
        'Bitte um mindestens eine konkrete Aufgabe.',
        'Schreibe täglich zwei positive und eine schwierige Beobachtung auf.',
      ],
      en: [
        'Set three observation questions.',
        'Ask for at least one concrete task.',
        'Record two positives and one challenge each day.',
      ],
    },
    questions: {
      de: [
        'Welche Aufgabe nimmt überraschend viel Zeit ein?',
        'Was unterscheidet Einsteiger von erfahrenen Mitarbeitenden?',
        'Was sollte ich als Nächstes ausprobieren?',
      ],
      en: [
        'Which task takes surprisingly long?',
        'What separates beginners from experienced staff?',
        'What should I try next?',
      ],
    },
  }),
  makeResource({
    id: 'digital-tech',
    kind: 'career',
    country: 'both',
    audiences: ['young-people', 'schools'],
    slug: { de: 'berufsfeld-digital-it', en: 'career-field-digital-tech' },
    title: { de: 'Berufsfeld Digital & IT', en: 'Career field: digital and technology' },
    description: {
      de: 'Von Software und Daten bis Support und Infrastruktur – ohne Klischees.',
      en: 'Software, data, support and infrastructure roles without the stereotypes.',
    },
    overview: {
      de: 'Digitalberufe verbinden systematisches Denken mit Kommunikation und ständigem Lernen. Nicht jede Rolle verlangt tägliches Programmieren; Support, Produkt, Daten und Infrastruktur brauchen unterschiedliche Profile.',
      en: 'Digital careers combine structured thinking, communication and continuous learning. Not every role involves daily coding; support, product, data and infrastructure need different profiles.',
    },
    actions: {
      de: [
        'Teste ein kleines Projekt statt nur Videos zu schauen.',
        'Vergleiche Entwicklung, Systemintegration und Support.',
        'Sammle Ergebnisse in einem einfachen Portfolio.',
      ],
      en: [
        'Try a small project rather than only watching videos.',
        'Compare development, infrastructure and support.',
        'Collect outcomes in a simple portfolio.',
      ],
    },
    questions: {
      de: [
        'Wie viel Zeit verbringt das Team mit Menschen statt Technik?',
        'Wie werden Fehler behandelt?',
        'Welche Grundlagen sollte ich vor dem Start üben?',
      ],
      en: [
        'How much time does the team spend with people rather than technology?',
        'How are mistakes handled?',
        'Which fundamentals should I practise before starting?',
      ],
    },
  }),
  makeResource({
    id: 'engineering',
    kind: 'career',
    country: 'both',
    audiences: ['young-people', 'schools'],
    slug: { de: 'berufsfeld-technik-engineering', en: 'career-field-engineering' },
    title: { de: 'Berufsfeld Technik & Engineering', en: 'Career field: engineering' },
    description: {
      de: 'Planen, fertigen, prüfen und warten in modernen technischen Berufen.',
      en: 'Designing, making, testing and maintaining in modern engineering careers.',
    },
    overview: {
      de: 'Technische Berufe reichen von präziser Fertigung bis Automatisierung, Energie und Instandhaltung. Sicherheit, Dokumentation und Teamarbeit sind genauso wichtig wie handwerkliches Geschick.',
      en: 'Engineering routes span precision manufacturing, automation, energy and maintenance. Safety, documentation and teamwork matter as much as practical skill.',
    },
    actions: {
      de: [
        'Besuche Werkstatt oder Fertigungsbereich.',
        'Vergleiche mechanische, elektrische und mechatronische Aufgaben.',
        'Prüfe Schichtmodelle und körperliche Anforderungen.',
      ],
      en: [
        'Visit a workshop or production environment.',
        'Compare mechanical, electrical and mechatronic work.',
        'Check shift patterns and physical demands.',
      ],
    },
    questions: {
      de: [
        'Welche Messmittel und digitalen Systeme werden genutzt?',
        'Wie läuft ein typischer Wartungsfall?',
        'Welche Sicherheitsnachweise brauche ich?',
      ],
      en: [
        'Which measuring and digital systems are used?',
        'What happens during a typical maintenance case?',
        'Which safety qualifications will I need?',
      ],
    },
  }),
  makeResource({
    id: 'health-care',
    kind: 'career',
    country: 'both',
    audiences: ['young-people', 'schools'],
    slug: { de: 'berufsfeld-gesundheit-pflege', en: 'career-field-health-care' },
    title: { de: 'Berufsfeld Gesundheit & Pflege', en: 'Career field: health and care' },
    description: {
      de: 'Verantwortung, Beziehung und Fachwissen im realistischen Berufsalltag.',
      en: 'Responsibility, relationships and expertise in real working life.',
    },
    overview: {
      de: 'Gesundheits- und Pflegeberufe sind fachlich anspruchsvoll und nah am Menschen. Belastbarkeit bedeutet nicht, alles allein auszuhalten, sondern Standards zu kennen und Unterstützung zu nutzen.',
      en: 'Health and care roles are technically demanding and deeply human. Resilience means knowing standards and using support, not coping alone.',
    },
    actions: {
      de: [
        'Kläre Schicht- und Wochenendarbeit.',
        'Erkunde direkte Pflege sowie Labor, Verwaltung und Technik.',
        'Frage nach Supervision und Lernbegleitung.',
      ],
      en: [
        'Understand night and weekend work.',
        'Explore direct care alongside lab, administrative and technical roles.',
        'Ask about supervision and learning support.',
      ],
    },
    questions: {
      de: [
        'Wie schützt das Team Pausen und Gesundheit?',
        'Welche Situationen sind emotional schwierig?',
        'Welche Entwicklungsmöglichkeiten gibt es?',
      ],
      en: [
        'How does the team protect breaks and wellbeing?',
        'Which situations are emotionally difficult?',
        'What progression routes are available?',
      ],
    },
  }),
  makeResource({
    id: 'green-energy',
    kind: 'career',
    country: 'both',
    audiences: ['young-people', 'schools'],
    slug: { de: 'berufsfeld-klima-energie', en: 'career-field-green-energy' },
    title: { de: 'Berufsfeld Klima & Energie', en: 'Career field: green energy' },
    description: {
      de: 'Praktische Berufe hinter Netzen, Gebäuden, Wärme und erneuerbaren Energien.',
      en: 'Practical roles behind grids, buildings, heat and renewable power.',
    },
    overview: {
      de: 'Die Transformation passiert nicht nur im Labor: Fachkräfte installieren, messen, warten und beraten. Viele Wege beginnen in etablierten Elektro-, Bau- oder Anlagenberufen.',
      en: 'The transition does not happen only in laboratories: skilled people install, measure, maintain and advise. Many routes begin in established electrical, construction or plant occupations.',
    },
    actions: {
      de: [
        'Suche nach konkreten Tätigkeiten statt nur „Green Jobs“.',
        'Prüfe regionale Betriebe und Infrastrukturprojekte.',
        'Vergleiche Außenarbeit, Baustelle, Planung und Service.',
      ],
      en: [
        'Search for concrete tasks rather than only “green jobs”.',
        'Explore local employers and infrastructure projects.',
        'Compare outdoor work, sites, planning and service.',
      ],
    },
    questions: {
      de: [
        'Welcher Anteil der Arbeit findet draußen statt?',
        'Welche Normen verändern sich aktuell?',
        'Welche Zusatzqualifikationen werden wichtiger?',
      ],
      en: [
        'How much work takes place outdoors?',
        'Which standards are changing?',
        'Which additional qualifications are becoming important?',
      ],
    },
  }),
  makeResource({
    id: 'business-finance',
    kind: 'career',
    country: 'both',
    audiences: ['young-people', 'schools'],
    slug: { de: 'berufsfeld-wirtschaft-finanzen', en: 'career-field-business-finance' },
    title: { de: 'Berufsfeld Wirtschaft & Finanzen', en: 'Career field: business and finance' },
    description: {
      de: 'Kunden, Zahlen, Prozesse und Entscheidungen hinter kaufmännischen Berufen.',
      en: 'Customers, numbers, processes and decisions behind business careers.',
    },
    overview: {
      de: 'Kaufmännische Berufe unterscheiden sich stark: Manche sind kundenorientiert, andere analytisch oder organisatorisch. Genaues Arbeiten und verständliche Kommunikation verbinden viele Rollen.',
      en: 'Business roles vary widely: some are customer-facing, others analytical or operational. Accuracy and clear communication connect many of them.',
    },
    actions: {
      de: [
        'Vergleiche Vertrieb, Einkauf, Personal und Controlling.',
        'Übe Tabellenkalkulation an einem echten Mini-Projekt.',
        'Beobachte, ob du Tempo oder gründliche Analyse bevorzugst.',
      ],
      en: [
        'Compare sales, procurement, people operations and finance.',
        'Practise spreadsheets through a real mini-project.',
        'Notice whether you prefer pace or detailed analysis.',
      ],
    },
    questions: {
      de: [
        'Welche Entscheidungen darf ein Azubi treffen?',
        'Wie werden Ziele gemessen?',
        'Wie viel Kundenkontakt gehört zur Rolle?',
      ],
      en: [
        'Which decisions can an apprentice make?',
        'How is performance measured?',
        'How much customer contact is involved?',
      ],
    },
  }),
  makeResource({
    id: 'creative-media',
    kind: 'career',
    country: 'both',
    audiences: ['young-people', 'schools'],
    slug: { de: 'berufsfeld-kreativ-medien', en: 'career-field-creative-media' },
    title: { de: 'Berufsfeld Kreativ & Medien', en: 'Career field: creative and media' },
    description: {
      de: 'Ideen entwickeln, Feedback verarbeiten und zuverlässig produzieren.',
      en: 'Developing ideas, handling feedback and producing reliably.',
    },
    overview: {
      de: 'Kreativberufe bestehen nicht nur aus Inspiration. Briefings verstehen, Versionen verwalten, Feedback aufnehmen und Termine halten gehören zum professionellen Alltag.',
      en: 'Creative work is not only inspiration. Understanding briefs, managing versions, responding to feedback and meeting deadlines are central professional skills.',
    },
    actions: {
      de: [
        'Baue ein Portfolio mit Prozess und Ergebnis.',
        'Teste Gestaltung, Produktion und Kundenkontakt getrennt.',
        'Lerne ein branchenübliches Werkzeug gründlich.',
      ],
      en: [
        'Build a portfolio showing process and outcome.',
        'Test design, production and client contact separately.',
        'Learn one industry tool in depth.',
      ],
    },
    questions: {
      de: [
        'Wie wird ein gutes Briefing erstellt?',
        'Wer gibt Feedback und entscheidet?',
        'Welche Teile sind kreativ, welche wiederholbar?',
      ],
      en: [
        'How is a good brief created?',
        'Who gives feedback and decides?',
        'Which parts are creative and which repeatable?',
      ],
    },
  }),
  makeResource({
    id: 'application-cv',
    kind: 'application',
    country: 'both',
    audiences: ['young-people', 'schools'],
    slug: { de: 'lebenslauf-fuer-ausbildung', en: 'cv-for-an-apprenticeship' },
    title: { de: 'Lebenslauf für die Ausbildung', en: 'A CV for an apprenticeship' },
    description: {
      de: 'Klar zeigen, was du schon gemacht, gelernt und beigetragen hast.',
      en: 'Show clearly what you have done, learnt and contributed.',
    },
    overview: {
      de: 'Ein Einstiegslebenslauf muss keine lange Berufserfahrung vortäuschen. Gute Beispiele aus Schule, Projekten, Sport, Familie, Ehrenamt und Nebenjobs zeigen Zuverlässigkeit und Lernfähigkeit.',
      en: 'An entry-level CV does not need to imitate years of experience. Evidence from school, projects, sport, caring, volunteering and part-time work can show reliability and learning.',
    },
    actions: {
      de: [
        'Nutze klare Zeitangaben und aktive Verben.',
        'Erkläre Beiträge statt nur Stationen aufzulisten.',
        'Prüfe Kontaktangaben, Rechtschreibung und PDF-Datei.',
      ],
      en: [
        'Use clear dates and active verbs.',
        'Explain contributions rather than listing positions.',
        'Check contact details, spelling and the final PDF.',
      ],
    },
    questions: {
      de: [
        'Welches Beispiel beweist jede behauptete Stärke?',
        'Ist die wichtigste Information in zehn Sekunden sichtbar?',
        'Passt der Lebenslauf zur konkreten Stelle?',
      ],
      en: [
        'What evidence supports each claimed strength?',
        'Is the key information visible in ten seconds?',
        'Does the CV fit this particular vacancy?',
      ],
    },
  }),
  makeResource({
    id: 'application-letter',
    kind: 'application',
    country: 'both',
    audiences: ['young-people', 'schools'],
    slug: { de: 'motivationsschreiben-ohne-floskeln', en: 'application-letter-without-cliches' },
    title: {
      de: 'Motivationsschreiben ohne Floskeln',
      en: 'An application letter without clichés',
    },
    description: {
      de: 'Interesse mit konkreten Beobachtungen und Beispielen belegen.',
      en: 'Support your interest with specific observations and evidence.',
    },
    overview: {
      de: 'Ein gutes Anschreiben verbindet drei Dinge: Warum diese Tätigkeit, warum dieser Betrieb und welches Beispiel zeigt, dass du lernen und beitragen kannst.',
      en: 'A useful application letter connects three things: why this work, why this employer and what evidence shows you can learn and contribute.',
    },
    actions: {
      de: [
        'Markiere Anforderungen in der Stellenanzeige.',
        'Wähle zwei passende Beispiele aus deinem Alltag.',
        'Streiche austauschbare Sätze, die zu jedem Betrieb passen.',
      ],
      en: [
        'Highlight requirements in the vacancy.',
        'Choose two relevant examples from your life.',
        'Remove generic lines that could be sent anywhere.',
      ],
    },
    questions: {
      de: [
        'Welche Aufgabe des Berufs interessiert mich konkret?',
        'Was habe ich über den Betrieb herausgefunden?',
        'Welche Handlung zeigt meine Motivation?',
      ],
      en: [
        'Which task genuinely interests me?',
        'What have I learnt about the employer?',
        'Which action demonstrates my motivation?',
      ],
    },
  }),
  makeResource({
    id: 'interview',
    kind: 'application',
    country: 'both',
    audiences: ['young-people', 'schools'],
    slug: {
      de: 'vorstellungsgespraech-vorbereiten',
      en: 'prepare-for-an-apprenticeship-interview',
    },
    title: {
      de: 'Vorstellungsgespräch vorbereiten',
      en: 'Prepare for an apprenticeship interview',
    },
    description: {
      de: 'Antworten strukturieren, Nervosität einplanen und selbst gute Fragen stellen.',
      en: 'Structure answers, plan for nerves and ask useful questions of your own.',
    },
    overview: {
      de: 'Im Gespräch musst du nicht perfekt klingen. Arbeitgeber wollen nachvollziehen, warum du dich bewirbst, wie du lernst und wie du mit echten Situationen umgehst.',
      en: 'You do not need to sound perfect. Employers want to understand why you applied, how you learn and how you respond to real situations.',
    },
    actions: {
      de: [
        'Übe laut mit drei konkreten Beispielen.',
        'Plane Anreise, Technik, Kleidung und Unterlagen.',
        'Bereite zwei ehrliche Rückfragen vor.',
      ],
      en: [
        'Practise aloud using three concrete examples.',
        'Plan travel, technology, clothing and documents.',
        'Prepare two genuine questions.',
      ],
    },
    questions: {
      de: [
        'Wie erzähle ich eine Situation mit Ausgang, Handlung und Ergebnis?',
        'Was möchte ich über die Lernkultur wissen?',
        'Wie erkläre ich eine Lücke ehrlich und knapp?',
      ],
      en: [
        'Can I explain a situation, action and outcome?',
        'What do I want to know about the learning culture?',
        'How can I explain a gap honestly and briefly?',
      ],
    },
  }),
  makeResource({
    id: 'assessment',
    kind: 'application',
    country: 'both',
    audiences: ['young-people', 'schools'],
    slug: { de: 'einstellungstest-assessment', en: 'apprenticeship-assessments' },
    title: { de: 'Einstellungstest & Assessment', en: 'Apprenticeship tests and assessments' },
    description: {
      de: 'Verstehen, was geprüft wird, und fair vorbereitet antreten.',
      en: 'Understand what is being assessed and prepare fairly.',
    },
    overview: {
      de: 'Tests können Sprache, Zahlen, Logik, Aufmerksamkeit oder Zusammenarbeit prüfen. Vorbereitung heißt, Format und Zeitdruck kennenzulernen – nicht Antworten auswendig zu lernen.',
      en: 'Assessments may test language, numbers, logic, attention or teamwork. Preparation means understanding the format and time pressure, not memorising answers.',
    },
    actions: {
      de: [
        'Frage nach Format und benötigter Technik.',
        'Übe kurze Einheiten unter Zeitlimit.',
        'Beantrage nötige Barrierefreiheitsanpassungen frühzeitig.',
      ],
      en: [
        'Ask about format and required technology.',
        'Practise short sessions under a time limit.',
        'Request reasonable adjustments early.',
      ],
    },
    questions: {
      de: [
        'Welche Kompetenz soll die Aufgabe zeigen?',
        'Darf ich Notizen oder Hilfsmittel nutzen?',
        'Wen kontaktiere ich bei technischen Problemen?',
      ],
      en: [
        'Which capability is the task designed to show?',
        'Can I use notes or tools?',
        'Who do I contact about technical problems?',
      ],
    },
  }),
  makeResource({
    id: 'parent-listen',
    kind: 'parent',
    country: 'both',
    audiences: ['parents'],
    slug: { de: 'eltern-zuhoeren-ohne-druck', en: 'parents-listen-without-pressure' },
    title: {
      de: 'Begleiten, ohne die Entscheidung zu übernehmen',
      en: 'Support without taking over the decision',
    },
    description: {
      de: 'Wie Eltern Orientierung geben können, ohne zusätzlichen Druck aufzubauen.',
      en: 'How parents and carers can offer structure without adding pressure.',
    },
    overview: {
      de: 'Jugendliche brauchen oft zugleich Halt und Eigenständigkeit. Hilfreich sind offene Fragen, gemeinsam geprüfte Informationen und kleine nächste Schritte statt einer sofortigen Lebensentscheidung.',
      en: 'Young people often need stability and independence at the same time. Open questions, checked information and small next steps help more than demanding a life decision.',
    },
    actions: {
      de: [
        'Vereinbaren Sie Gespräche mit klarer Dauer.',
        'Trennen Sie eigene Sorgen von den Interessen des Kindes.',
        'Übergeben Sie Kontakt und Bewerbung schrittweise.',
      ],
      en: [
        'Agree a clear time for careers conversations.',
        'Separate your worries from the young person’s interests.',
        'Hand over contact and application tasks gradually.',
      ],
    },
    questions: {
      de: [
        'Was möchtest du als Nächstes herausfinden?',
        'Welche Option fühlt sich interessant, aber noch unklar an?',
        'Welche Unterstützung wünschst du dir von mir?',
      ],
      en: [
        'What would you like to find out next?',
        'Which option feels interesting but unclear?',
        'What support would you like from me?',
      ],
    },
  }),
  makeResource({
    id: 'parent-contract',
    kind: 'parent',
    country: 'de',
    audiences: ['parents'],
    slug: { de: 'ausbildungsvertrag-fuer-eltern', en: 'german-training-contract-for-parents' },
    title: {
      de: 'Der Ausbildungsvertrag für Eltern',
      en: 'The German training contract: a guide for parents',
    },
    description: {
      de: 'Vergütung, Probezeit, Urlaub, Berufsschule und Ansprechpartner prüfen.',
      en: 'Check pay, probation, leave, vocational school and support contacts.',
    },
    overview: {
      de: 'Vor der Unterschrift sollten Berufsbezeichnung, Ausbildungsdauer, Vergütung, Probezeit, Arbeitszeit, Urlaub und Ausbildungsmaßnahmen klar sein. Zuständige Kammern beraten bei Unklarheiten.',
      en: 'Before signing, check the occupation, duration, pay, probation, hours, leave and training arrangements. The responsible chamber can advise when details are unclear.',
    },
    actions: {
      de: [
        'Lesen Sie Vertrag und Ausbildungsplan gemeinsam.',
        'Klären Sie Fahrt, Arbeitskleidung und Zusatzkosten.',
        'Notieren Sie Kontakte in Betrieb, Schule und Kammer.',
      ],
      en: [
        'Read the contract and training plan together.',
        'Clarify travel, work clothing and extra costs.',
        'Record contacts at the employer, school and chamber.',
      ],
    },
    questions: {
      de: [
        'Ist der Vertrag bei der Kammer eingetragen?',
        'Wie wird die Ausbildungsvergütung angepasst?',
        'Wer hilft bei Konflikten?',
      ],
      en: [
        'Is the contract registered with the chamber?',
        'How does pay increase during training?',
        'Who helps if a conflict arises?',
      ],
    },
  }),
  makeResource({
    id: 'parent-safeguarding',
    kind: 'parent',
    country: 'uk',
    audiences: ['parents'],
    slug: { de: 'uk-apprenticeship-eltern-check', en: 'apprenticeship-checklist-for-parents' },
    title: {
      de: 'UK Apprenticeship: Checkliste für Eltern',
      en: 'Apprenticeship checklist for parents and carers',
    },
    description: {
      de: 'Arbeitgeber, Training Provider, Vergütung, Lernzeit und Schutz prüfen.',
      en: 'Check the employer, provider, pay, learning time and safeguarding.',
    },
    overview: {
      de: 'Ein seriöses Apprenticeship ist eine echte bezahlte Stelle mit Vertrag, Training und klarer Bewertung. Unter 18 gelten zusätzliche Schutzregeln zu Arbeitszeit und Betreuung.',
      en: 'A legitimate apprenticeship is a real paid job with a contract, training and clear assessment. Additional working-time and safeguarding duties apply to under-18s.',
    },
    actions: {
      de: [
        'Prüfen Sie Stellenbeschreibung und Apprenticeship Standard.',
        'Klären Sie Training Provider und geschützte Lernzeit.',
        'Besprechen Sie Reiseweg, Arbeitszeiten und Ansprechpersonen.',
      ],
      en: [
        'Check the job description and apprenticeship standard.',
        'Confirm the provider and protected learning time.',
        'Discuss travel, hours and named support contacts.',
      ],
    },
    questions: {
      de: [
        'Wie wird Fortschritt gemeinsam überprüft?',
        'Wer ist für Safeguarding zuständig?',
        'Welche Kosten übernimmt der Arbeitgeber?',
      ],
      en: [
        'How will progress reviews work?',
        'Who is responsible for safeguarding?',
        'Which costs will the employer cover?',
      ],
    },
  }),
  makeResource({
    id: 'parent-setbacks',
    kind: 'parent',
    country: 'both',
    audiences: ['parents'],
    slug: { de: 'absagen-und-umwege-begleiten', en: 'support-rejection-and-change' },
    title: {
      de: 'Absagen und Umwege gut begleiten',
      en: 'Support rejection and changes of direction',
    },
    description: {
      de: 'Selbstvertrauen schützen und aus Rückschlägen konkrete nächste Schritte machen.',
      en: 'Protect confidence and turn setbacks into concrete next steps.',
    },
    overview: {
      de: 'Absagen sind bei Einstiegsbewerbungen normal, können sich aber persönlich anfühlen. Erst zuhören, dann gemeinsam zwischen beeinflussbaren und nicht beeinflussbaren Gründen unterscheiden.',
      en: 'Rejection is common in early applications but can feel personal. Listen first, then separate what can be influenced from what cannot.',
    },
    actions: {
      de: [
        'Geben Sie Enttäuschung Raum, bevor Sie Lösungen anbieten.',
        'Fragen Sie höflich nach verwertbarem Feedback.',
        'Planen Sie eine kleine Verbesserung und die nächste Bewerbung.',
      ],
      en: [
        'Allow disappointment before offering solutions.',
        'Ask politely for actionable feedback.',
        'Plan one improvement and the next application.',
      ],
    },
    questions: {
      de: [
        'Was hat trotz Absage gut funktioniert?',
        'Brauchen wir mehr passende Stellen oder eine bessere Bewerbung?',
        'Welche Unterstützung ist jetzt hilfreich?',
      ],
      en: [
        'What went well despite the outcome?',
        'Do we need more suitable roles or a stronger application?',
        'What support would be useful now?',
      ],
    },
  }),
  makeResource({
    id: 'adviser-session',
    kind: 'adviser',
    country: 'both',
    audiences: ['schools'],
    slug: { de: 'unterrichtseinheit-wege-vergleichen', en: 'lesson-plan-compare-routes' },
    title: {
      de: 'Unterrichtseinheit: Wege fair vergleichen',
      en: 'Lesson plan: compare routes fairly',
    },
    description: {
      de: 'Eine 45-Minuten-Struktur für evidenzbasierte Berufsorientierung.',
      en: 'A 45-minute structure for evidence-based careers education.',
    },
    overview: {
      de: 'Die Einheit verschiebt den Fokus von Statusfragen zu Kriterien: Lernform, Alltag, Zugang, Geld und Entwicklung. Lernende vergleichen zwei Wege und markieren offene Recherchefragen.',
      en: 'This session shifts the focus from status to criteria: learning, daily work, entry, money and progression. Learners compare two routes and identify research gaps.',
    },
    actions: {
      de: [
        '5 Minuten: stille Kriterienwahl.',
        '20 Minuten: Quellenarbeit in Paaren.',
        '15 Minuten: Vergleich und Unsicherheiten.',
        '5 Minuten: persönlicher nächster Schritt.',
      ],
      en: [
        '5 minutes: choose criteria individually.',
        '20 minutes: paired source work.',
        '15 minutes: compare and identify uncertainty.',
        '5 minutes: record one personal next step.',
      ],
    },
    questions: {
      de: [
        'Welche Quelle belegt die Aussage?',
        'Für wen könnte derselbe Weg unpassend sein?',
        'Welche Information fehlt für eine Entscheidung?',
      ],
      en: [
        'Which source supports the claim?',
        'Who might find the same route unsuitable?',
        'What information is still missing?',
      ],
    },
  }),
  makeResource({
    id: 'adviser-conversation',
    kind: 'adviser',
    country: 'both',
    audiences: ['schools'],
    slug: { de: 'beratungsgespraech-leitfaden', en: 'careers-conversation-guide' },
    title: {
      de: 'Leitfaden für ein Orientierungsgespräch',
      en: 'A guide to careers conversations',
    },
    description: {
      de: 'Vom diffusen „keine Ahnung“ zu einer überprüfbaren nächsten Frage.',
      en: 'Move from “I have no idea” to one testable next question.',
    },
    overview: {
      de: 'Ein gutes Gespräch muss nicht mit einem Beruf enden. Es sollte Selbstverständnis erweitern, Optionen öffnen und einen realistischen Erkundungsschritt vereinbaren.',
      en: 'A good conversation does not need to end with a job title. It should deepen self-understanding, widen options and agree a realistic exploration step.',
    },
    actions: {
      de: [
        'Starten Sie mit einer konkreten Alltagssituation.',
        'Spiegeln Sie beobachtete Muster ohne Diagnose.',
        'Bieten Sie höchstens drei passende Optionen.',
        'Vereinbaren Sie Zeitpunkt und Nachweis des nächsten Schritts.',
      ],
      en: [
        'Start with a concrete everyday situation.',
        'Reflect observed patterns without diagnosing.',
        'Offer no more than three relevant options.',
        'Agree when and how the next step will be evidenced.',
      ],
    },
    questions: {
      de: [
        'Was möchtest du nicht den ganzen Tag tun?',
        'Wann hast du zuletzt etwas Schwieriges gelernt?',
        'Welche Option könnten wir gefahrlos testen?',
      ],
      en: [
        'What would you not want to do all day?',
        'When did you last learn something difficult?',
        'Which option could we test safely?',
      ],
    },
  }),
  makeResource({
    id: 'adviser-employer-visit',
    kind: 'adviser',
    country: 'both',
    audiences: ['schools', 'partners'],
    slug: { de: 'betriebsbesuch-planen', en: 'plan-an-employer-visit' },
    title: { de: 'Einen Betriebsbesuch planen', en: 'Plan an employer visit' },
    description: {
      de: 'Lernziele, Schutz, Zugänglichkeit und Nachbereitung zusammenbringen.',
      en: 'Bring learning goals, safeguarding, accessibility and reflection together.',
    },
    overview: {
      de: 'Ein Betriebsbesuch wirkt, wenn Jugendliche echte Aufgaben sehen, mit Auszubildenden sprechen und Beobachtungen anschließend auswerten. Reine Unternehmenspräsentationen reichen nicht.',
      en: 'Employer visits work when young people see real tasks, speak with apprentices and reflect afterwards. A corporate presentation alone is not enough.',
    },
    actions: {
      de: [
        'Legen Sie zwei Lernziele und Schutzregeln fest.',
        'Bitten Sie um echte Arbeitsstationen und Azubi-Gespräche.',
        'Klären Sie Barrieren, Fotoeinwilligung und Anreise.',
        'Planen Sie eine kurze Nachbereitung.',
      ],
      en: [
        'Set two learning goals and safeguarding rules.',
        'Ask for real workstations and apprentice conversations.',
        'Address accessibility, image consent and travel.',
        'Plan a short reflection activity.',
      ],
    },
    questions: {
      de: [
        'Welche Tätigkeiten dürfen Jugendliche beobachten?',
        'Wer begleitet die Gruppe?',
        'Wie vermeiden wir reine Werbung?',
      ],
      en: [
        'Which tasks can students observe?',
        'Who will supervise the group?',
        'How will we avoid a purely promotional visit?',
      ],
    },
  }),
  makeResource({
    id: 'adviser-quality',
    kind: 'adviser',
    country: 'both',
    audiences: ['schools'],
    slug: { de: 'qualitaet-von-berufsinfos-pruefen', en: 'check-quality-of-careers-information' },
    title: {
      de: 'Qualität von Berufsinformationen prüfen',
      en: 'Check the quality of careers information',
    },
    description: {
      de: 'Quelle, Aktualität, Interessen und fehlende Perspektiven sichtbar machen.',
      en: 'Make sources, freshness, incentives and missing perspectives visible.',
    },
    overview: {
      de: 'Berufsinformationen können korrekt und trotzdem unvollständig sein. Prüfen Sie Urheber, Datum, regionalen Geltungsbereich, kommerzielle Interessen und ob Alltag sowie Anforderungen konkret belegt werden.',
      en: 'Careers information can be accurate yet incomplete. Check authorship, date, regional scope, commercial interests and whether claims about daily work are evidenced.',
    },
    actions: {
      de: [
        'Bevorzugen Sie Primär- und offizielle Quellen.',
        'Vergleichen Sie mindestens zwei Perspektiven.',
        'Kennzeichnen Sie Unsicherheit und regionale Unterschiede.',
        'Dokumentieren Sie das nächste Review-Datum.',
      ],
      en: [
        'Prefer primary and official sources.',
        'Compare at least two perspectives.',
        'Mark uncertainty and regional differences.',
        'Record the next review date.',
      ],
    },
    questions: {
      de: [
        'Wer profitiert von dieser Darstellung?',
        'Für welchen Ort und Zeitpunkt gilt sie?',
        'Welche Stimme fehlt?',
      ],
      en: [
        'Who benefits from this framing?',
        'Where and when does it apply?',
        'Whose voice is missing?',
      ],
    },
  }),
  makeResource({
    id: 'official-data',
    kind: 'insight',
    country: 'both',
    audiences: ['schools', 'parents', 'partners'],
    slug: { de: 'wie-wir-offizielle-daten-nutzen', en: 'how-we-use-official-data' },
    title: {
      de: 'Wie Apprentice Atlas offizielle Daten nutzt',
      en: 'How Apprentice Atlas uses official data',
    },
    description: {
      de: 'Quellen, Aktualisierung, Grenzen und redaktionelle Verantwortung.',
      en: 'Sources, freshness, limitations and editorial accountability.',
    },
    overview: {
      de: 'Wir nutzen offizielle Berufs- und Ausbildungsinformationen als Fundament, normalisieren Begriffe für verständliche Vergleiche und zeigen Quellen sichtbar. Daten werden nicht als persönliche Garantie dargestellt.',
      en: 'We use official careers and apprenticeship information as a foundation, normalise terms for clearer comparison and display sources. Data is never presented as a personal guarantee.',
    },
    actions: {
      de: [
        'Quellenlink und Prüfdaten anzeigen.',
        'Markt- und Systemunterschiede nicht zusammenrechnen.',
        'Korrekturen nachvollziehbar dokumentieren.',
      ],
      en: [
        'Display source links and review dates.',
        'Do not collapse differences between systems.',
        'Document corrections transparently.',
      ],
    },
    questions: {
      de: [
        'Ist die Quelle für diesen Markt zuständig?',
        'Wie aktuell ist die Information?',
        'Welche Entscheidung darf daraus nicht automatisch folgen?',
      ],
      en: [
        'Is the source authoritative for this market?',
        'How current is the information?',
        'Which decision must not be automated from it?',
      ],
    },
  }),
  makeResource({
    id: 'responsible-ai',
    kind: 'insight',
    country: 'both',
    audiences: ['young-people', 'parents', 'schools', 'partners'],
    slug: { de: 'was-unsere-ai-kann-und-nicht-kann', en: 'what-our-ai-can-and-cannot-do' },
    title: { de: 'Was unsere AI kann – und nicht kann', en: 'What our AI can — and cannot — do' },
    description: {
      de: 'Unterstützung beim Verstehen, niemals eine automatische Lebensentscheidung.',
      en: 'Support for understanding, never an automated life decision.',
    },
    overview: {
      de: 'AI kann Informationen strukturieren, Begriffe erklären und Fragen vorschlagen. Sie kennt einen Menschen nicht vollständig, kann Fehler machen und darf Beratungsfachkräfte, Schutzprozesse oder eigenes Urteil nicht ersetzen.',
      en: 'AI can structure information, explain terms and suggest questions. It does not fully know a person, can be wrong and must not replace professional guidance, safeguarding or personal judgement.',
    },
    actions: {
      de: [
        'AI-Ausgaben als Vorschläge kennzeichnen.',
        'Quellen und Alternativen zugänglich machen.',
        'Keine sensiblen Daten für Empfehlungen verlangen.',
        'Menschliche Eskalation bei Schutzthemen vorsehen.',
      ],
      en: [
        'Label AI output as suggestions.',
        'Make sources and alternatives accessible.',
        'Do not require sensitive data for recommendations.',
        'Provide human escalation for safeguarding issues.',
      ],
    },
    questions: {
      de: [
        'Welche Information hat die AI nicht?',
        'Kann ich die Aussage an einer Quelle prüfen?',
        'Sollte hier ein Mensch einbezogen werden?',
      ],
      en: [
        'What information does the AI not have?',
        'Can I verify the claim against a source?',
        'Should a human be involved here?',
      ],
    },
  }),
  makeResource({
    id: 'impact-method',
    kind: 'insight',
    country: 'both',
    audiences: ['schools', 'partners'],
    slug: { de: 'wirkung-messen-ohne-scheinzahlen', en: 'measuring-impact-without-vanity-metrics' },
    title: {
      de: 'Wirkung messen – ohne Scheinzahlen',
      en: 'Measuring impact without vanity metrics',
    },
    description: {
      de: 'Ein transparenter Ansatz für Piloten, Lernen und verantwortbare Behauptungen.',
      en: 'A transparent approach to pilots, learning and defensible claims.',
    },
    overview: {
      de: 'Downloads und Klicks zeigen Nutzung, aber noch keine bessere Entscheidung. In Piloten trennen wir Reichweite, aktive Auseinandersetzung, Orientierungskompetenz und längerfristige Ergebnisse.',
      en: 'Downloads and clicks show usage, not better decisions. In pilots we separate reach, active engagement, career-management skills and longer-term outcomes.',
    },
    actions: {
      de: [
        'Vorab konkrete Lernfragen definieren.',
        'Quantitative Signale mit qualitativen Gesprächen verbinden.',
        'Negative und uneindeutige Ergebnisse berichten.',
        'Keine Kausalität ohne geeignetes Design behaupten.',
      ],
      en: [
        'Define learning questions in advance.',
        'Combine quantitative signals with qualitative conversations.',
        'Report negative and ambiguous findings.',
        'Do not claim causality without a suitable design.',
      ],
    },
    questions: {
      de: [
        'Welche Veränderung wäre für die Zielgruppe bedeutsam?',
        'Was können wir mit diesem Design wirklich folgern?',
        'Welche unerwünschten Effekte prüfen wir?',
      ],
      en: [
        'What change would matter to the audience?',
        'What can this design genuinely establish?',
        'Which unintended effects will we check?',
      ],
    },
  }),
  makeResource({
    id: 'building-in-public',
    kind: 'insight',
    country: 'both',
    audiences: ['partners', 'schools'],
    slug: {
      de: 'vom-hackathon-zum-verantwortungsvollen-produkt',
      en: 'from-hackathon-to-responsible-product',
    },
    title: {
      de: 'Vom Hackathon zum verantwortungsvollen Produkt',
      en: 'From hackathon to responsible product',
    },
    description: {
      de: 'Warum aus einem schnellen Prototyp ein langsamer geprüfter Dienst werden muss.',
      en: 'Why a fast prototype must become a carefully reviewed service.',
    },
    overview: {
      de: 'Der Hackathon bewies, dass die Idee verständlich und technisch möglich ist. Ein öffentliches Produkt braucht zusätzlich verlässliche Inhalte, Schutzkonzepte, Barrierefreiheit, Betrieb, Feedbackwege und klare Grenzen.',
      en: 'The hackathon showed that the idea was understandable and technically possible. A public product also needs reliable content, safeguarding, accessibility, operations, feedback routes and clear boundaries.',
    },
    actions: {
      de: [
        'Behauptungen und Datenquellen inventarisieren.',
        'Mit Schulen, Jugendlichen und Eltern getrennt testen.',
        'Fehler- und Beschwerdewege vor Veröffentlichung definieren.',
        'Pilotergebnisse vor Skalierung prüfen.',
      ],
      en: [
        'Inventory claims and data sources.',
        'Test separately with schools, young people and parents.',
        'Define error and complaint routes before release.',
        'Review pilot findings before scaling.',
      ],
    },
    questions: {
      de: [
        'Was war im Prototyp nur Annahme?',
        'Wer trägt bei einem Fehler Verantwortung?',
        'Welche Funktion sollte bewusst noch nicht erscheinen?',
      ],
      en: [
        'What was only an assumption in the prototype?',
        'Who is accountable when something goes wrong?',
        'Which feature should deliberately wait?',
      ],
    },
  }),
];

export const getResource = (locale: 'de' | 'en', slug: string) =>
  resources.find((resource) => resource.slug[locale] === slug);
export const getResourcesForLocale = (_locale: 'de' | 'en') => resources;
