import type { LocalizedText, ResourceSection } from './types';

type Source = { label: string; url: string };

export type ResourceEditorial = {
  sections: ResourceSection[];
  sources: Source[];
};

const section = (
  heading: LocalizedText,
  paragraphs: Record<'de' | 'en', string[]>,
  bullets?: Record<'de' | 'en', string[]>,
): ResourceSection => ({ heading, paragraphs, bullets });

const baOrientation: Source = {
  label: 'Bundesagentur für Arbeit – meinBERUF',
  url: 'https://www.arbeitsagentur.de/bildung/schule',
};
const baApplication: Source = {
  label: 'Bundesagentur für Arbeit – Bewerbungsprozess Ausbildung',
  url: 'https://www.arbeitsagentur.de/bildung/bewerbung/bewerbungsprozess-ausbildung',
};
const berufenet: Source = {
  label: 'Bundesagentur für Arbeit – BERUFENET',
  url: 'https://web.arbeitsagentur.de/berufenet/',
};
const bibbFramework: Source = {
  label: 'BIBB – Rechtliche Grundlagen der Ausbildung',
  url: 'https://www.bibb.de/de/145848.php',
};
const bibbTraining: Source = {
  label: 'BIBB – Betriebliche Ausbildung',
  url: 'https://www.bibb.de/de/137890.php',
};
const govApprentice: Source = {
  label: 'GOV.UK – Become an apprentice',
  url: 'https://www.gov.uk/become-apprentice',
};
const govApply: Source = {
  label: 'GOV.UK – Apply for an apprenticeship',
  url: 'https://www.gov.uk/become-apprentice/apply-for-an-apprenticeship',
};
const offJob: Source = {
  label: 'Apprenticeships.gov.uk – Off-the-job training',
  url: 'https://www.apprenticeships.gov.uk/apprentices/off-the-job',
};
const nationalCareers: Source = {
  label: 'National Careers Service',
  url: 'https://nationalcareers.service.gov.uk/',
};
const ncsCover: Source = {
  label: 'National Careers Service – Covering letters',
  url: 'https://nationalcareers.service.gov.uk/careers-advice/covering-letter',
};

export const editorialByResource: Record<string, ResourceEditorial> = {
  'orientation-after-school': {
    sections: [
      section(
        { de: 'Vier Wege, fünf Vergleichsfragen', en: 'Four routes, five comparison questions' },
        {
          de: [
            'Ausbildung, schulische Ausbildung, Studium und ein bewusst geplantes Orientierungsjahr sind keine Rangliste. Sie unterscheiden sich darin, wo du lernst, wie schnell du Verantwortung übernimmst, wie du finanziell dastehst und welche Anschlusswege offenbleiben. Vergleiche deshalb nicht nur Berufsbezeichnungen, sondern jeweils eine konkrete Option: einen bestimmten Ausbildungsbetrieb, einen bestimmten Studiengang oder ein klar beschriebenes Zwischenjahr.',
            'Bewerte jede Option von 1 bis 5 bei Lernform, typischem Wochenablauf, Kosten und Einkommen, Zugangsvoraussetzungen sowie nächsten Schritten. Ein niedriger Wert ist kein Ausschlussgrund. Er zeigt, welche Frage du klären oder welche Unterstützung du organisieren musst.',
          ],
          en: [
            'An apprenticeship, college course, university and a deliberately planned gap year are not a league table. They differ in where you learn, how quickly you take responsibility, your financial position and the routes that remain open. Compare concrete options rather than labels: one actual employer, one course or one clearly structured year out.',
            'Score each option from 1 to 5 for learning style, normal week, cost and income, entry requirements and progression. A low score is not an automatic rejection. It identifies a question to answer or support to arrange.',
          ],
        },
      ),
      section(
        { de: 'Ein belastbarer Sieben-Tage-Test', en: 'A practical seven-day test' },
        {
          de: [
            'Beispiel: „Ich interessiere mich für Technik“ ist noch keine Entscheidung. Formuliere daraus drei prüfbare Möglichkeiten – etwa Elektronikerin im Handwerk, Mechatroniker in der Industrie und ein Elektrotechnikstudium. Sammle für jede Option eine Stellenanzeige oder Modulbeschreibung, einen echten Wochenablauf und eine Person, der du drei konkrete Fragen stellen kannst.',
          ],
          en: [
            'Example: “I am interested in technology” is not yet a decision. Turn it into three testable routes, such as an engineering technician apprenticeship, a maintenance apprenticeship and an engineering degree. For each route, collect a real vacancy or course description, a normal weekly schedule and one person who can answer three specific questions.',
          ],
        },
        {
          de: [
            'Tag 1: drei konkrete Optionen festlegen.',
            'Tag 2–3: Anforderungen und Alltag aus Primärquellen notieren.',
            'Tag 4–5: ein Gespräch, einen Besuch oder eine Hospitation organisieren.',
            'Tag 6: Kriterien bewerten und offene Annahmen markieren.',
            'Tag 7: einen nächsten Schritt mit Termin festlegen.',
          ],
          en: [
            'Day 1: define three concrete options.',
            'Days 2–3: record requirements and daily reality from primary sources.',
            'Days 4–5: arrange a conversation, visit or short placement.',
            'Day 6: score the criteria and mark untested assumptions.',
            'Day 7: choose one dated next action.',
          ],
        },
      ),
    ],
    sources: [baOrientation, govApprentice, nationalCareers],
  },
  'german-system': {
    sections: [
      section(
        { de: 'Wer wofür verantwortlich ist', en: 'Who is responsible for what' },
        {
          de: [
            'Der Betrieb vermittelt die im Berufsbild vorgesehenen praktischen Kompetenzen und erstellt dafür einen betrieblichen Ausbildungsplan. Die Berufsschule ergänzt fachtheoretische und allgemeinbildende Inhalte. Die zuständige Stelle – häufig IHK oder HWK – registriert den Vertrag, berät, überwacht die Durchführung und organisiert Prüfungen. Diese drei Rollen solltest du auseinanderhalten: Eine gute Schulnote ersetzt keine fehlende Anleitung im Betrieb, und ein spannender Betrieb ersetzt nicht die verbindlichen Ausbildungsinhalte.',
            'Lass dir vor dem Start Vertrag, Ausbildungsplan, Arbeitszeit, Vergütung, Probezeit, Urlaub, Lernorte und zuständige Ansprechpersonen erklären. Bei Minderjährigen gelten zusätzliche Schutzregeln. Bei Unsicherheit sind Kammer, Berufsschule oder Berufsberatung unabhängige Anlaufstellen.',
          ],
          en: [
            'The employer teaches the practical competence required by the occupation and turns the national framework into a company training plan. Vocational school adds technical theory and general education. The competent body, often a chamber, registers the contract, advises the parties, monitors delivery and organises examinations. Keep these roles separate: good school lessons do not compensate for missing workplace supervision, and an exciting employer does not replace the required curriculum.',
            'Before starting, ask to see the contract and training plan and clarify hours, pay, probation, leave, learning locations and named contacts. Additional protections apply to minors. The chamber, vocational school and careers service can provide independent help.',
          ],
        },
      ),
      section(
        { de: 'Woran du Ausbildungsqualität erkennst', en: 'How to recognise training quality' },
        {
          de: [
            'Ein gutes Signal ist nicht der Obstkorb, sondern ein erklärbarer Lernprozess: Wer zeigt eine Aufgabe? Wann darfst du sie begleitet und später selbstständig ausführen? Wie wird dokumentiert, was noch fehlt? Bitte im Gespräch um ein konkretes Beispiel aus dem ersten Ausbildungsjahr.',
          ],
          en: [
            'The strongest signal is not a perk but an explainable learning process: who demonstrates a task, when you practise with supervision, when you work independently and how missing competence is tracked. Ask for one concrete example from the first year.',
          ],
        },
        {
          de: [
            'Es gibt eine benannte Ausbilderin oder einen benannten Ausbilder.',
            'Der betriebliche Ausbildungsplan passt zur Ausbildungsordnung.',
            'Berichtsheft, Feedback und Prüfungsvorbereitung haben feste Zeiten.',
            'Fehler werden ausgewertet, nicht versteckt oder pauschal bestraft.',
            'Du weißt, an wen du dich bei Konflikten außerhalb des Teams wenden kannst.',
          ],
          en: [
            'A named trainer is accountable for your learning.',
            'The company plan maps to the national training regulation.',
            'Learning records, feedback and exam preparation have protected time.',
            'Mistakes are reviewed rather than hidden or punished indiscriminately.',
            'You know where to seek help outside the immediate team.',
          ],
        },
      ),
    ],
    sources: [bibbFramework, bibbTraining, baOrientation],
  },
  'uk-system': {
    sections: [
      section(
        { de: 'Der englische Dreiklang', en: 'The three-party model in England' },
        {
          de: [
            'In England schließen Arbeitgeber, Apprentice und Training Provider einen Trainingsplan. Der Arbeitgeber stellt dich an, bezahlt Arbeits- und Lernzeit und ermöglicht passende Aufgaben. Der Provider vermittelt und überprüft die Kenntnisse, Fähigkeiten und Verhaltensweisen des Apprenticeship Standard. Du selbst dokumentierst Lernen, holst Feedback ein und meldest früh, wenn geschützte Lernzeit oder Anleitung fehlen.',
            'Level bezeichnet das Qualifikationsniveau, nicht automatisch die Schwierigkeit des Arbeitsalltags oder die Qualität des Angebots. Prüfe zusätzlich den konkreten Standard, die Dauer, mögliche Zusatzqualifikationen, das Assessment und den realen Anschlussweg. Für Schottland, Wales und Nordirland gelten eigene Systeme; Inhalte für England dürfen nicht stillschweigend übertragen werden.',
          ],
          en: [
            'In England, the employer, apprentice and training provider agree a training plan. The employer hires you, pays for working and training time and provides suitable tasks. The provider teaches and reviews the knowledge, skills and behaviours in the apprenticeship standard. You record learning, seek feedback and raise concerns early if protected training time or supervision is missing.',
            'The level describes a qualification level; it does not by itself prove the quality of the vacancy or the difficulty of the daily job. Also check the actual standard, duration, any additional qualification, assessment and progression. Scotland, Wales and Northern Ireland run different systems, so England-specific guidance must not be silently generalised.',
          ],
        },
      ),
      section(
        { de: 'Eine Vacancy richtig lesen', en: 'How to read a vacancy properly' },
        {
          de: [
            'Zwei Anzeigen mit demselben Apprenticeship Standard können sehr unterschiedliche Erfahrungen bieten. Markiere deshalb getrennt, was gesetzter Bestandteil des Standards ist und was der konkrete Arbeitgeber verspricht. Vage Aussagen wie „viele Entwicklungsmöglichkeiten“ brauchen eine Nachfrage: Welche Aufgabe, welches Training und welcher nächste Job sind damit gemeint?',
          ],
          en: [
            'Two vacancies using the same apprenticeship standard can offer very different experiences. Separate what the standard requires from what this employer promises. A phrase such as “great progression” needs a follow-up: which task, training and next role does that mean in practice?',
          ],
        },
        {
          de: [
            'Arbeitgeber, Standort, Arbeitszeit und tatsächliche Vergütung prüfen.',
            'Standard, Level und Training Provider identifizieren.',
            'Modell und Ort des Off-the-job Training erklären lassen.',
            'Assessment und Unterstützung bei Englisch/Mathematik klären.',
            'Nach konkreten Aufgaben der ersten 90 Tage fragen.',
          ],
          en: [
            'Check the employer, location, hours and actual pay.',
            'Identify the standard, level and training provider.',
            'Ask how and where off-the-job training is delivered.',
            'Clarify assessment and any English or maths support.',
            'Ask for concrete tasks from the first 90 days.',
          ],
        },
      ),
    ],
    sources: [govApprentice, offJob, govApply],
  },
  'compare-routes': {
    sections: [
      section(
        { de: 'Vergleiche Erlebnisse, nicht Status', en: 'Compare experiences, not status' },
        {
          de: [
            '„Ausbildung oder Studium?“ ist zu abstrakt. Vergleiche beispielsweise eine Ausbildung als Fachinformatikerin in einem mittelständischen Betrieb mit einem konkreten Informatikstudiengang. Für beide Wege brauchst du den Wochenplan, reale Aufgaben, Prüfungsform, finanzielle Belastung, Unterstützung bei Schwierigkeiten und typische Optionen nach dem Abschluss.',
            'Beziehe Zeit mit ein. Ein Weg kann heute besser zu dir passen und später durch Meister, Fachwirt, höhere Berufsbildung, Fachschule oder Hochschule ergänzt werden. Umgekehrt kann ein Studienstart in einen praxisnäheren Weg wechseln. Anschlussfähigkeit ist wichtiger als die Vorstellung einer endgültigen Entscheidung.',
          ],
          en: [
            '“Apprenticeship or university?” is too abstract. Compare, for example, one software apprenticeship at a named employer with one computer science course. For both, investigate the weekly timetable, real tasks, assessment, financial pressure, support when things go wrong and common destinations after completion.',
            'Include time in the comparison. A route that fits now can lead to advanced professional qualifications or higher education later. A university start can also move towards a more practical route. Progression matters more than pretending the first choice is permanent.',
          ],
        },
      ),
      section(
        { de: 'Die Entscheidungsmatrix', en: 'The decision matrix' },
        {
          de: [
            'Gewichte zuerst, was für dich zählt, und bewerte erst danach. Sonst gewinnt unbemerkt die Option, über die du bereits mehr weißt. Ergänze zu jeder Bewertung einen Beleg oder schreibe „Annahme“.',
          ],
          en: [
            'Weight what matters before scoring the options. Otherwise the route you already know best will win by default. Add evidence beside every score or mark it clearly as an assumption.',
          ],
        },
        {
          de: [
            'Lernen: durch Anwendung, Unterricht, Selbststudium oder Mischung?',
            'Geld: Nettoeffekt aus Vergütung, Kosten, Fahrt und möglicher Unterstützung?',
            'Zugang: formale Anforderungen und tatsächliche Auswahlpraxis?',
            'Alltag: Arbeitsort, Stunden, Pendeln, Prüfungsdruck und Selbstorganisation?',
            'Danach: konkrete Rollen und weitere Qualifikationen?',
          ],
          en: [
            'Learning: application, teaching, independent study or a mixture?',
            'Money: net effect of pay, costs, travel and available support?',
            'Entry: formal requirements and the real selection process?',
            'Daily life: location, hours, travel, assessment pressure and self-management?',
            'Afterwards: concrete roles and further qualifications?',
          ],
        },
      ),
    ],
    sources: [baOrientation, govApprentice, nationalCareers],
  },
  'find-strengths': {
    sections: [
      section(
        { de: 'Stärken brauchen Belege', en: 'Strengths need evidence' },
        {
          de: [
            '„Ich bin teamfähig“ hilft wenig, solange unklar bleibt, was du tatsächlich getan hast. Eine belastbare Stärke verbindet Situation, beobachtbares Verhalten und Ergebnis: „Bei unserem Schulfest habe ich die Schichten von acht Helfenden koordiniert, zwei Ausfälle neu verteilt und den Aufbau pünktlich abgeschlossen.“ Daraus lassen sich Organisation, Kommunikation und ruhiges Priorisieren ableiten.',
            'Suche nicht nur nach Dingen, die leichtfallen. Eine Stärke kann auch darin liegen, schwierige Aufgaben verlässlich zu bewältigen. Bitte drei Menschen aus unterschiedlichen Kontexten um ein konkretes Beispiel, wann sie sich auf dich verlassen konnten.',
          ],
          en: [
            '“I am a team player” says little until it is linked to observable behaviour. A useful strength combines a situation, what you did and the result: “At our school event I coordinated eight volunteers, reallocated two absences and completed the setup on time.” That provides evidence of organisation, communication and calm prioritisation.',
            'Do not look only for things that feel easy. A strength can be the reliable way you handle something difficult. Ask three people from different parts of your life for a concrete example of when they could depend on you.',
          ],
        },
      ),
      section(
        { de: 'Vom Beleg zum Berufstest', en: 'From evidence to a career test' },
        {
          de: [
            'Übersetze eine Stärke nicht sofort in einen Beruf. Formuliere zuerst die zugrunde liegende Tätigkeit und teste sie in zwei Umgebungen. „Gern erklären“ kann im IT-Support, in der Pflegeanleitung oder im Verkauf ganz anders aussehen.',
          ],
          en: [
            'Do not translate a strength straight into one occupation. Name the underlying activity and test it in two environments. “Enjoys explaining” can feel very different in IT support, care or sales.',
          ],
        },
        {
          de: [
            'Drei konkrete Situationen aus Schule, Freizeit oder Verantwortung notieren.',
            'Je Situation Verhalten und Ergebnis getrennt beschreiben.',
            'Wiederkehrende Tätigkeiten markieren, nicht nur positive Adjektive.',
            'Eine Tätigkeit in zwei verschiedenen Berufsfeldern ausprobieren.',
            'Nach dem Test festhalten: Energie, Lernfortschritt und gewünschte Wiederholung.',
          ],
          en: [
            'Record three specific situations from school, interests or responsibilities.',
            'Describe behaviour and outcome separately.',
            'Mark recurring activities rather than flattering adjectives.',
            'Test one activity in two different career fields.',
            'Afterwards record energy, learning and whether you want to repeat it.',
          ],
        },
      ),
    ],
    sources: [baOrientation, nationalCareers],
  },
  'work-experience': {
    sections: [
      section(
        { de: 'Beobachten ist eine Methode', en: 'Observation is a method' },
        {
          de: [
            'Ein Praktikum beantwortet nicht automatisch, ob ein Beruf passt. Plane vorab drei Beobachtungsfragen: Welche Aufgaben wiederholen sich? Wann braucht jemand Hilfe? Woran erkennt das Team gute Arbeit? Notiere während des Tages Tätigkeiten, Umgebung, Zusammenarbeit und deine Reaktion getrennt. So unterscheidest du einen unruhigen ersten Tag von einer echten Abneigung gegen den Arbeitsalltag.',
            'Bitte um mindestens eine Aufgabe mit sichtbarem Ergebnis und um ein kurzes Abschlussgespräch. Vertrauliche Informationen, Sicherheitsregeln und Grenzen der eigenen Rolle gehen immer vor „möglichst viel ausprobieren“.',
          ],
          en: [
            'A placement does not automatically tell you whether a career fits. Set three observation questions first: which tasks repeat, when does someone need help and how does the team recognise good work? Record tasks, environment, collaboration and your own response separately. This distinguishes a difficult first day from a genuine mismatch with the work.',
            'Ask for at least one task with a visible outcome and a short closing conversation. Confidentiality, safety rules and the limits of your role always come before trying to do as much as possible.',
          ],
        },
      ),
      section(
        { de: 'Das 15-Minuten-Debrief', en: 'The 15-minute debrief' },
        {
          de: [
            'Führe die Auswertung innerhalb von 24 Stunden durch. Ein guter Bericht ist kein Tagebuch aller Ereignisse, sondern trennt Beobachtung, Interpretation und nächste Frage.',
          ],
          en: [
            'Complete the review within 24 hours. A useful record is not a diary of every event; it separates observation, interpretation and the next question.',
          ],
        },
        {
          de: [
            'Drei Aufgaben, die tatsächlich Zeit beansprucht haben.',
            'Ein Moment mit hoher und einer mit niedriger Energie.',
            'Eine Fähigkeit, die Fachkräfte sichtbar besser beherrschten.',
            'Eine Annahme, die sich bestätigt oder verändert hat.',
            'Ein nächster Test, der noch fehlende Informationen liefert.',
          ],
          en: [
            'Three tasks that genuinely occupied time.',
            'One high-energy and one low-energy moment.',
            'One skill experienced staff performed visibly better.',
            'One assumption that was confirmed or changed.',
            'One next test that fills the remaining information gap.',
          ],
        },
      ),
    ],
    sources: [baOrientation, nationalCareers],
  },
  'digital-tech': {
    sections: [
      section(
        { de: 'Vier sehr verschiedene Arbeitswelten', en: 'Four very different kinds of work' },
        {
          de: [
            'Softwareentwicklung zerlegt Anforderungen in Code, Tests und wartbare Änderungen. Systemintegration verbindet Geräte, Netze, Identitäten und Sicherheit. Datenrollen prüfen Qualität, strukturieren Informationen und erklären Ergebnisse. Support rekonstruiert Probleme, kommuniziert verständlich und dokumentiert Lösungen. In kleinen Teams können sich diese Bereiche mischen; in großen Organisationen sind sie oft klarer getrennt.',
            'Der gemeinsame Kern ist nicht „gut mit Computern“, sondern systematisch lernen: ein Problem reproduzieren, Annahmen prüfen, Änderungen dokumentieren und Hilfe rechtzeitig einholen. Frage bei Angeboten, wie viel Zeit auf Neubau, Wartung, Support, Meetings und eigenständiges Lernen entfällt.',
          ],
          en: [
            'Software development turns requirements into code, tests and maintainable change. Infrastructure connects devices, networks, identities and security. Data roles check quality, structure information and explain results. Support reconstructs problems, communicates clearly and documents solutions. These areas may blend in a small team and separate more clearly in a large organisation.',
            'The shared foundation is not simply being “good with computers” but learning systematically: reproduce a problem, test assumptions, document changes and ask for help at the right time. Ask how much of a role is new work, maintenance, support, meetings and independent learning.',
          ],
        },
      ),
      section(
        { de: 'Ein Portfolio, das etwas beweist', en: 'A portfolio that proves something' },
        {
          de: [
            'Ein fertiger Screenshot beweist weniger als ein nachvollziehbarer Prozess. Ein kleines Projekt reicht, wenn du Problem, Entscheidungen, Fehler, Tests und nächste Verbesserung erklären kannst. Entferne echte Zugangsdaten und personenbezogene Daten.',
          ],
          en: [
            'A finished screenshot proves less than a traceable process. A small project is enough if you can explain the problem, decisions, mistakes, tests and next improvement. Remove real credentials and personal data.',
          ],
        },
        {
          de: [
            'Ein konkretes Nutzerproblem in zwei Sätzen definieren.',
            'Annahmen und bewusst ausgelassene Funktionen dokumentieren.',
            'Mindestens einen Fehler mit Diagnose und Lösung zeigen.',
            'Installation oder Nutzung so erklären, dass jemand anderes sie wiederholen kann.',
            'Im Gespräch benennen, was du heute anders bauen würdest.',
          ],
          en: [
            'Define one user problem in two sentences.',
            'Document assumptions and deliberately omitted features.',
            'Show at least one fault, its diagnosis and resolution.',
            'Explain setup or use so somebody else can repeat it.',
            'Be ready to say what you would build differently now.',
          ],
        },
      ),
    ],
    sources: [berufenet, nationalCareers],
  },
  engineering: {
    sections: [
      section(
        {
          de: 'Nicht nur bauen: den ganzen Zyklus verstehen',
          en: 'Beyond making: understand the whole cycle',
        },
        {
          de: [
            'Technische Arbeit beginnt oft mit Zeichnung, Auftrag oder Störungsmeldung. Danach folgen Material- und Werkzeugwahl, sichere Einrichtung, Fertigung oder Montage, Messung, Dokumentation und Übergabe. In der Instandhaltung kommt die Diagnose hinzu: Symptome eingrenzen, Energiequellen sichern, Ursache bestätigen und erst dann reparieren. Präzision zeigt sich deshalb genauso in Vorbereitung und Prüfnachweis wie im fertigen Bauteil.',
            'Vergleiche Berufe nach dem Verhältnis von planbarer Produktion zu unvorhersehbarer Fehlersuche, von Werkstatt zu Außeneinsatz und von Handarbeit zu automatisierten Systemen. Diese Unterschiede prägen den Alltag stärker als das allgemeine Wort „Technik“.',
          ],
          en: [
            'Technical work often starts with a drawing, job instruction or fault report. It then moves through material and tool selection, safe setup, manufacture or installation, measurement, documentation and handover. Maintenance adds diagnosis: narrow the symptoms, isolate energy, confirm the cause and only then repair. Precision is visible in preparation and test evidence as much as in the finished component.',
            'Compare roles by planned production versus unpredictable fault-finding, workshop versus field work, and manual processes versus automated systems. These differences shape daily life more than the broad label “engineering”.',
          ],
        },
      ),
      section(
        {
          de: 'Arbeitsprobe statt Technik-Klischee',
          en: 'A practical test, not an engineering stereotype',
        },
        {
          de: [
            'Baue oder repariere etwas unter einer klaren Vorgabe und protokolliere Maße, Reihenfolge und Sicherheitsentscheidungen. Entscheidend ist nicht Perfektion beim ersten Versuch, sondern ob du Abweichungen bemerkst und kontrolliert korrigierst.',
          ],
          en: [
            'Make or repair something to a clear specification and record measurements, sequence and safety decisions. The key is not first-time perfection but whether you notice variation and correct it in a controlled way.',
          ],
        },
        {
          de: [
            'Vor Beginn Zeichnung oder Zielzustand in eigenen Worten erklären.',
            'Gefahren und notwendige Freigaben benennen.',
            'Messpunkte und Toleranzen festlegen.',
            'Eine Abweichung dokumentieren und Ursache prüfen.',
            'Ergebnis mit Prüfwert statt nur optischem Eindruck bewerten.',
          ],
          en: [
            'Explain the drawing or target condition in your own words.',
            'Identify hazards and required permissions.',
            'Set measurement points and tolerances.',
            'Document one deviation and investigate its cause.',
            'Judge the result with test evidence, not appearance alone.',
          ],
        },
      ),
    ],
    sources: [berufenet, nationalCareers],
  },
  'health-care': {
    sections: [
      section(
        { de: 'Fachlichkeit, Beziehung und Grenze', en: 'Expertise, relationships and boundaries' },
        {
          de: [
            'Gesundheits- und Pflegearbeit verbindet Beobachtung, standardisierte Abläufe, Dokumentation und Kommunikation. Eine Veränderung muss erkannt, korrekt weitergegeben und im eigenen Verantwortungsbereich bearbeitet werden. Gute Beziehung bedeutet dabei nicht, jede Belastung persönlich mitzunehmen, sondern Menschen respektvoll einzubeziehen und professionelle Grenzen zu halten.',
            'Berufsfelder unterscheiden sich stark: direkte Pflege, Therapie, Diagnostik, Labor, Verwaltung, Medizintechnik und Rettung haben andere Kontaktintensität, Schichtmodelle und Zugangsvoraussetzungen. Prüfe nicht „Gesundheit“ insgesamt, sondern mindestens zwei konkrete Rollen und Settings.',
          ],
          en: [
            'Health and care work combines observation, standard procedures, records and communication. A change must be noticed, handed over accurately and addressed within the limits of the role. A good relationship does not mean carrying every burden personally; it means involving people respectfully while maintaining professional boundaries.',
            'Direct care, therapy, diagnostics, laboratories, administration, medical technology and emergency work differ in contact, shift patterns and entry requirements. Do not test “healthcare” as one category; compare at least two roles and settings.',
          ],
        },
      ),
      section(
        { de: 'Qualität im Gespräch prüfen', en: 'Test quality in the conversation' },
        {
          de: [
            'Bitte nicht nur um Erfolgsgeschichten. Frage, was bei Überforderung, einem dokumentierten Fehler oder einer emotional schwierigen Situation konkret geschieht. Eine glaubwürdige Antwort nennt Zuständigkeit, Eskalationsweg und Lernunterstützung.',
          ],
          en: [
            'Do not ask only for success stories. Ask what actually happens after overload, a recorded error or an emotionally difficult event. A credible answer names responsibility, escalation and learning support.',
          ],
        },
        {
          de: [
            'Wie läuft Einarbeitung ab, bevor Aufgaben selbstständig übernommen werden?',
            'Wer ist in einer Schicht fachlich ansprechbar?',
            'Wie werden Übergaben, Datenschutz und Dokumentation gelernt?',
            'Welche Schutzkleidung, Impf- oder Gesundheitsanforderungen gelten?',
            'Welche Supervision und Unterstützung gibt es nach belastenden Ereignissen?',
          ],
          en: [
            'How does induction work before tasks are performed independently?',
            'Who provides professional support during a shift?',
            'How are handovers, confidentiality and record-keeping taught?',
            'Which protective equipment or health requirements apply?',
            'What supervision follows a distressing event?',
          ],
        },
      ),
    ],
    sources: [berufenet, nationalCareers],
  },
  'green-energy': {
    sections: [
      section(
        {
          de: 'Die Transformation steckt in konkreten Gewerken',
          en: 'The transition happens through concrete occupations',
        },
        {
          de: [
            'Viele sogenannte Green Jobs sind keine völlig neuen Berufe. Elektronikerinnen schließen Photovoltaik, Speicher und Ladeinfrastruktur an; Anlagenmechaniker arbeiten an Wärme- und Gebäudesystemen; Fachkräfte in Netzen, Bau, Planung und Service messen, installieren und warten. Suche deshalb nach Tätigkeiten und anerkannten Ausbildungswegen statt nach dem Schlagwort „Nachhaltigkeit“.',
            'Klimawirkung und Arbeitsalltag sind zwei getrennte Fragen. Eine sinnvolle Aufgabe kann körperlich, wetterabhängig, reisereich oder stark normengebunden sein. Kläre Einsatzort, Rufbereitschaft, Höhe, enge Räume, Führerscheinanforderungen und Weiterbildungsbedarf genauso sorgfältig wie den Zweck der Arbeit.',
          ],
          en: [
            'Many “green jobs” are established occupations applied to changing systems. Electricians connect solar, storage and charging infrastructure; building-services specialists work on heat and controls; people in grids, construction, planning and service measure, install and maintain. Search by tasks and recognised training routes rather than the word “sustainability”.',
            'Climate purpose and daily working conditions are separate questions. Meaningful work may be physical, weather-dependent, travel-heavy or tightly regulated. Check location, on-call duties, work at height or in confined spaces, driving requirements and continuing training as carefully as the mission.',
          ],
        },
      ),
      section(
        { de: 'Ein lokales System kartieren', en: 'Map one local system' },
        {
          de: [
            'Wähle ein sichtbares System in deiner Region – ein Gebäude, Wärmenetz, Umspannwerk oder eine Solaranlage – und verfolge, welche Berufe von Planung bis Wartung beteiligt sind. Dadurch entstehen realistische Suchbegriffe und Arbeitgebertypen.',
          ],
          en: [
            'Choose one visible local system—a building, heat network, substation or solar installation—and trace the occupations involved from planning to maintenance. This creates realistic search terms and employer types.',
          ],
        },
        {
          de: [
            'Wer plant, genehmigt, installiert, prüft und wartet?',
            'Welche etablierten Ausbildungsberufe führen in diese Aufgaben?',
            'Welche Arbeit geschieht vor Ort, im Büro oder remote?',
            'Welche Sicherheits- und Umweltnachweise sind notwendig?',
            'Welche Technik ändert sich, welche Grundkompetenz bleibt?',
          ],
          en: [
            'Who designs, approves, installs, tests and maintains it?',
            'Which established apprenticeships lead to those tasks?',
            'Which work happens on site, in an office or remotely?',
            'Which safety and environmental evidence is required?',
            'Which technology changes and which core competence remains?',
          ],
        },
      ),
    ],
    sources: [berufenet, nationalCareers],
  },
  'business-finance': {
    sections: [
      section(
        { de: 'Vier Arten kaufmännischer Arbeit', en: 'Four kinds of business work' },
        {
          de: [
            'Im Vertrieb geht es um Bedarf, Beziehung und Abschluss; im Einkauf um Anforderungen, Lieferanten und Konditionen; in Finance um korrekte Buchungen, Kontrollen und verständliche Auswertung; in Operations um verlässliche Abläufe zwischen Teams. Viele Einstiegsrollen enthalten Mischungen daraus. Frage deshalb nicht nur nach der Abteilung, sondern nach den drei häufigsten Vorgängen, den genutzten Systemen und den Entscheidungen, die Einsteigende treffen dürfen.',
            'Genauigkeit und Tempo stehen nicht einfach gegeneinander. Gute Teams definieren, wann eine schnelle Antwort genügt und wann Freigabe, Vier-Augen-Prinzip oder Dokumentation nötig sind. Das ist besonders wichtig, wenn Geld, Verträge oder personenbezogene Daten betroffen sind.',
          ],
          en: [
            'Sales focuses on need, relationships and agreement; procurement on requirements, suppliers and terms; finance on accurate records, controls and useful analysis; operations on reliable processes between teams. Entry roles often mix these. Ask for the three most common transactions, the systems used and the decisions a new starter may make.',
            'Accuracy and speed are not simple opposites. Good teams define when a quick answer is enough and when approval, a second check or a written record is required—especially around money, contracts or personal data.',
          ],
        },
      ),
      section(
        { de: 'Eine realistische Mini-Arbeitsprobe', en: 'A realistic mini work sample' },
        {
          de: [
            'Plane ein kleines Schul- oder Freizeitprojekt mit Budget. Dokumentiere nicht nur die Tabelle, sondern Annahmen, Freigaben, Abweichungen und eine kurze Empfehlung. So zeigst du, dass Zahlen zu einer Entscheidung führen.',
          ],
          en: [
            'Plan a small school or community project with a budget. Document not just the spreadsheet but assumptions, approvals, variances and a short recommendation. This shows how numbers support a decision.',
          ],
        },
        {
          de: [
            'Ziel, Budgetgrenze und Verantwortliche festhalten.',
            'Angebote oder Kosten auf gleicher Basis vergleichen.',
            'Änderungen mit Datum und Grund dokumentieren.',
            'Eine Kontrolle gegen Eingabefehler einbauen.',
            'Ergebnis in drei verständlichen Sätzen empfehlen.',
          ],
          en: [
            'Record the objective, budget limit and accountable person.',
            'Compare quotes or costs on the same basis.',
            'Log changes with date and reason.',
            'Add one check against input errors.',
            'Recommend an outcome in three clear sentences.',
          ],
        },
      ),
    ],
    sources: [berufenet, nationalCareers],
  },
  'creative-media': {
    sections: [
      section(
        { de: 'Kreativität unter Bedingungen', en: 'Creativity under constraints' },
        {
          de: [
            'Professionelle Gestaltung beginnt mit einem Briefing: Zielgruppe, Botschaft, Kanal, Format, Termin und Freigabe. Danach folgen Recherche, Entwürfe, Auswahl, Produktion, Qualitätskontrolle und Übergabe. Ein guter Einfall ist wertvoll, aber erst Versionierung, Rechteklärung, Feedback und zuverlässige Ausführung machen daraus ein nutzbares Ergebnis.',
            'Vergleiche Rollen nach ihrem Schwerpunkt. Design, Redaktion, Foto, Video, Audio, Animation, Produktion und Account-Arbeit verlangen unterschiedliche Mischungen aus Ideenarbeit, Technik und Abstimmung. Frage, welcher Anteil selbst gestaltet wird und welcher aus Organisation, Anpassung und wiederkehrender Produktion besteht.',
          ],
          en: [
            'Professional creative work starts with a brief: audience, message, channel, format, deadline and approval. Research, concepts, selection, production, quality control and handover follow. A strong idea matters, but version control, rights clearance, feedback and reliable delivery turn it into usable work.',
            'Compare roles by emphasis. Design, editorial, photography, video, audio, animation, production and account work combine ideas, technique and coordination differently. Ask how much time is original creation versus organisation, adaptation and repeat production.',
          ],
        },
      ),
      section(
        { de: 'Portfolio als Fallstudie', en: 'Portfolio as a case study' },
        {
          de: [
            'Zeige drei starke Projekte statt zwanzig ungeordneter Ergebnisse. Eine Fallstudie erklärt den Auftrag, deine Rolle, verworfene Richtung, Feedbackschleife, Rechte an Material und das ausgelieferte Format. Gruppenarbeit muss als solche erkennbar sein.',
          ],
          en: [
            'Show three strong projects rather than twenty unexplained outputs. A case study covers the brief, your role, a rejected direction, feedback, rights to source material and the delivered format. Group work must be labelled honestly.',
          ],
        },
        {
          de: [
            'Briefing und Erfolgskriterium in eigenen Worten.',
            'Zwei frühe Varianten und begründete Auswahl.',
            'Konkretes Feedback und sichtbare Änderung.',
            'Eigener Beitrag bei Teamprojekten.',
            'Dateiformate, Barrierefreiheit und Nutzungsrechte der Übergabe.',
          ],
          en: [
            'The brief and success criterion in your own words.',
            'Two early options and the reason for choosing one.',
            'Specific feedback and the visible change it produced.',
            'Your own contribution to group work.',
            'Delivery formats, accessibility and usage rights.',
          ],
        },
      ),
    ],
    sources: [berufenet, nationalCareers],
  },
  'application-cv': {
    sections: [
      section(
        {
          de: 'Jede Zeile muss eine Auswahlfrage beantworten',
          en: 'Every line should answer a selection question',
        },
        {
          de: [
            'Ein Lebenslauf ist keine vollständige Biografie. Er hilft der auswählenden Person schnell zu prüfen: Erfüllt die Person die Voraussetzungen? Gibt es Hinweise auf Motivation, Verlässlichkeit und passende Grundkompetenzen? Sind Verlauf und Kontaktdaten verständlich? Ordne deshalb antichronologisch, nutze klare Datumsangaben und beschreibe bei Praktika oder Projekten konkrete Tätigkeiten statt nur den Namen der Station.',
            'Fehlende bezahlte Erfahrung ist bei Einstiegsbewerbungen normal. Schulprojekte, Pflegeverantwortung, Verein, Nebenjob, Sprachen und selbst organisierte Vorhaben können relevant sein, wenn du Umfang und Beitrag ehrlich benennst. Foto, Geburtsdatum und weitere persönliche Angaben unterscheiden sich nach Markt und sind nicht überall erforderlich.',
          ],
          en: [
            'A CV is not a complete life story. It helps a selector answer quickly: does the applicant meet the requirements, is there evidence of motivation and reliability, and is the timeline clear? Use reverse chronological order, unambiguous dates and concrete tasks for placements or projects rather than naming the organisation alone.',
            'A lack of paid experience is normal in an entry application. School projects, caring responsibilities, community activity, part-time work, languages and self-directed projects may all be relevant when the scale and contribution are described honestly. Expectations about photographs and personal details differ by market and such information is not universally required.',
          ],
        },
      ),
      section(
        { de: 'Vom schwachen zum belegten Punkt', en: 'Turn a weak claim into evidence' },
        {
          de: [
            'Schwach: „Teamfähig und organisiert.“ Besser: „Schulfest mit acht Helfenden geplant; Schichtplan erstellt und Aufbau bis 9 Uhr koordiniert.“ Nutze Verb, Kontext, Umfang und Ergebnis – ohne Aufgaben größer darzustellen, als sie waren.',
          ],
          en: [
            'Weak: “Organised team player.” Better: “Planned a school event with eight volunteers; created the rota and coordinated setup by 9am.” Use an action, context, scale and result without inflating your responsibility.',
          ],
        },
        {
          de: [
            'Überschrift und Kontaktweg funktionieren.',
            'Daten sind lückenlos oder Lücken knapp und sachlich erklärt.',
            'Die wichtigsten Anforderungen der Stelle finden einen Beleg.',
            'Rechtschreibung, Dateiname und PDF-Darstellung sind geprüft.',
            'Eine zweite Person versteht in 30 Sekunden dein Profil.',
          ],
          en: [
            'The heading and contact route work.',
            'Dates are complete or gaps are explained briefly and factually.',
            'The vacancy’s main requirements each have relevant evidence.',
            'Spelling, filename and PDF rendering have been checked.',
            'A second person can understand your profile in 30 seconds.',
          ],
        },
      ),
    ],
    sources: [baApplication, govApply, nationalCareers],
  },
  'application-letter': {
    sections: [
      section(
        { de: 'Anforderung, Beleg, Verbindung', en: 'Requirement, evidence, connection' },
        {
          de: [
            'Ein Anschreiben wird stärker, wenn jeder Absatz eine Funktion hat. Erst nennst du die konkrete Stelle und einen nachvollziehbaren Grund für dieses Arbeitsfeld. Dann verbindest du zwei wichtige Anforderungen mit Belegen aus Schule, Praktikum, Arbeit oder eigenen Projekten. Zum Schluss erklärst du, warum gerade die Lernumgebung dieses Betriebs interessant ist und was du im Gespräch vertiefen möchtest.',
            'Unternehmenslob ohne Bezug ist austauschbar. Nutze nur Informationen, die eine echte Verbindung herstellen: Produkt, Kundengruppe, Ausbildungsstation, Standort oder ein beschriebenes Projekt. Kopiere keine Formulierungen, die du im Gespräch nicht selbst erklären könntest.',
          ],
          en: [
            'A covering letter is stronger when every paragraph has a job. Name the vacancy and a credible reason for the field. Connect two important requirements with evidence from education, a placement, work or your own project. Finally, explain why this employer’s learning environment is relevant and what you would like to explore at interview.',
            'Generic praise is interchangeable. Use only research that creates a real link: a product, customer group, training rotation, location or named project. Do not copy language you could not explain naturally in conversation.',
          ],
        },
      ),
      section(
        { de: 'Ein Absatz als Bauprobe', en: 'Build one evidence paragraph' },
        {
          de: [
            '„Ihre Anzeige nennt sorgfältige Dokumentation. Im Chemieprojekt habe ich Messwerte von vier Versuchsreihen nach einem gemeinsamen Schema erfasst, Abweichungen markiert und die Auswertung für die Gruppe vorbereitet. Diese Genauigkeit möchte ich in Ihrer Qualitätsprüfung weiterentwickeln.“ Der Absatz behauptet nicht nur eine Stärke, sondern verbindet sie mit Aufgabe und Lernziel.',
          ],
          en: [
            '“Your advert asks for careful record-keeping. In a science project I recorded four sets of results using one shared structure, flagged anomalies and prepared the group’s analysis. I want to develop that accuracy further in your quality team.” This links a strength to evidence and a learning goal.',
          ],
        },
        {
          de: [
            'Stellenbezeichnung und Unternehmen sind korrekt.',
            'Der Einstieg könnte nicht unverändert an zehn Betriebe gehen.',
            'Zwei Anforderungen haben jeweils einen überprüfbaren Beleg.',
            'Kein Satz wiederholt nur den Lebenslauf.',
            'Länge, Ton und Dateiformat passen zum Bewerbungsweg.',
          ],
          en: [
            'The vacancy title and employer are correct.',
            'The opening could not be sent unchanged to ten employers.',
            'Two requirements each have verifiable evidence.',
            'No sentence merely repeats the CV.',
            'Length, tone and file format suit the application route.',
          ],
        },
      ),
    ],
    sources: [baApplication, ncsCover, govApply],
  },
  interview: {
    sections: [
      section(
        { de: 'Vorbereitung in drei Spuren', en: 'Prepare in three tracks' },
        {
          de: [
            'Bereite erst die Rolle vor: Aufgaben, Anforderungen und zwei offene Fragen. Dann den Betrieb: Was stellt er her oder leistet er, für wen und an welchem Standort würdest du arbeiten? Schließlich dich selbst: je ein Beispiel für Lernen, Zusammenarbeit, einen Fehler und eine übernommene Verantwortung. So kannst du flexibel antworten, ohne Texte auswendig zu lernen.',
            'Bei einer unbekannten Frage darfst du kurz nachdenken, nachfragen oder eine Annahme benennen. Gute Antworten zeigen nicht ständige Sicherheit, sondern einen nachvollziehbaren Denkweg. Bei technischen Aufgaben zählt häufig, wie du Informationen strukturierst und Risiken erkennst.',
          ],
          en: [
            'Prepare in three tracks. First the role: tasks, requirements and two open questions. Then the employer: what it delivers, for whom and where you would work. Finally yourself: one example each of learning, collaboration, a mistake and responsibility. This lets you respond flexibly without memorising a script.',
            'For an unfamiliar question, pause, clarify or state an assumption. Strong answers do not require constant certainty; they show a traceable thought process. In technical exercises, how you structure information and notice risk may matter as much as the final answer.',
          ],
        },
      ),
      section(
        { de: 'STAR ohne Roboter-Sprache', en: 'Use STAR without sounding scripted' },
        {
          de: [
            'Situation und Aufgabe brauchen nur genug Kontext. Der größte Teil gehört deiner Handlung: Was hast du entschieden, gesagt, geprüft oder verändert? Beim Ergebnis darfst du auch nennen, was nicht gelungen ist und was du beim nächsten Mal anders machst.',
          ],
          en: [
            'Situation and task need only enough context. Spend most of the answer on your action: what did you decide, say, check or change? The result can include what did not work and what you would do differently next time.',
          ],
        },
        {
          de: [
            'Vier Beispiele als Stichpunkte, nicht als auswendig gelernte Rede.',
            'Anreise, Technik, Kleidung und notwendige Unterlagen am Vortag prüfen.',
            'Antworten laut mit einer Person oder Aufnahme üben.',
            'Drei eigene Fragen priorisieren; öffentlich auffindbare Fakten vermeiden.',
            'Nach dem Gespräch Fragen und eigene Antworten für die nächste Runde notieren.',
          ],
          en: [
            'Prepare four examples as prompts, not memorised speeches.',
            'Check travel, technology, clothing and documents the day before.',
            'Practise aloud with a person or recording.',
            'Prioritise three questions and avoid asking for obvious public facts.',
            'Afterwards, record the questions and your answers for next time.',
          ],
        },
      ),
    ],
    sources: [baApplication, govApply, nationalCareers],
  },
  assessment: {
    sections: [
      section(
        { de: 'Was Übungen tatsächlich sichtbar machen', en: 'What exercises actually reveal' },
        {
          de: [
            'Ein Online-Test kann Aufmerksamkeit, Sprache, Zahlenverständnis oder logisches Arbeiten unter Zeitdruck prüfen. Eine Gruppenaufgabe zeigt, wie du Informationen aufnimmst, Beiträge strukturierst, andere einbeziehst und auf ein Ergebnis hinarbeitest. Eine Präsentation prüft nicht nur Auftreten, sondern Auswahl, Aufbau und Umgang mit Rückfragen. Erfrage Format und Hilfsmittel, aber versuche nicht, eine angeblich perfekte Persönlichkeit zu spielen.',
            'Barrierefreiheit und angemessene Anpassungen sind Teil eines fairen Verfahrens. Wenn du aufgrund einer Behinderung, Neurodivergenz oder gesundheitlichen Situation eine Anpassung brauchst, frage früh und konkret nach dem Prozess. Du musst nicht mehr sensible Information teilen als für die Anpassung notwendig.',
          ],
          en: [
            'An online test may assess attention, language, numerical reasoning or logic under time pressure. A group exercise shows how you absorb information, structure contributions, include others and move towards an outcome. A presentation tests selection and structure as well as delivery and questions. Ask about format and permitted tools, but do not try to perform an imaginary perfect personality.',
            'Accessibility and reasonable adjustments are part of a fair process. If disability, neurodivergence or health means you need an adjustment, ask early and specifically about the process. You do not need to disclose more sensitive information than is needed to arrange it.',
          ],
        },
      ),
      section(
        { de: 'Taktik für eine Gruppenaufgabe', en: 'A group-exercise strategy' },
        {
          de: [
            'Das Ziel ist nicht, am meisten zu sprechen. Hilfreich ist, zu Beginn Auftrag und Zeit zu klären, Informationen sichtbar zu ordnen, stillere Beiträge einzuladen und vor Schluss Entscheidung sowie offene Risiken zusammenzufassen. Widersprich der Sache, nicht der Person.',
          ],
          en: [
            'The aim is not to speak most. Clarify the task and time, make information visible, invite quieter contributions and summarise the decision and remaining risks before the end. Challenge the idea rather than the person.',
          ],
        },
        {
          de: [
            'Einmal klar strukturieren, ohne automatisch die Leitung zu beanspruchen.',
            'Auf vorherige Beiträge Bezug nehmen.',
            'Zeit und Entscheidungskriterien im Blick behalten.',
            'Bei Unsicherheit laut nachvollziehbar prüfen.',
            'Nach Absage um konkretes, verwertbares Feedback bitten.',
          ],
          en: [
            'Offer structure without automatically claiming leadership.',
            'Build explicitly on previous contributions.',
            'Track time and decision criteria.',
            'When uncertain, check your reasoning visibly.',
            'After rejection, request specific feedback you can use.',
          ],
        },
      ),
    ],
    sources: [baApplication, govApply, nationalCareers],
  },
  'parent-listen': {
    sections: [
      section(
        {
          de: 'Unterstützen, ohne die Entscheidung zu übernehmen',
          en: 'Support without taking over',
        },
        {
          de: [
            'Eltern können Struktur, Kontakte und Ruhe geben, aber nicht stellvertretend herausfinden, welcher Alltag zum jungen Menschen passt. Beginnen Sie mit Beobachtungen und offenen Fragen: „Bei welchem Teil des Praktikums warst du besonders aufmerksam?“ ist hilfreicher als „Du bist doch gut mit Menschen, also …“. Halten Sie eigene Wünsche als eigene Perspektive erkennbar.',
            'Vereinbaren Sie, welche Hilfe erwünscht ist: gemeinsam Termine sortieren, eine Bewerbung gegenlesen, eine Fahrt organisieren oder ein Gespräch üben. Senden Sie nichts im Namen des jungen Menschen und kontaktieren Sie Betriebe nicht ohne Absprache; Selbstwirksamkeit ist Teil der Berufsorientierung.',
          ],
          en: [
            'Parents can provide structure, contacts and calm, but cannot discover on somebody else’s behalf which daily work fits. Start with observations and open questions: “Which part of the placement held your attention?” is more useful than “You are good with people, so you should…”. Keep your own preferences clearly labelled as your perspective.',
            'Agree what help is wanted: sorting deadlines, proofreading, arranging transport or practising a conversation. Do not submit work in the young person’s name or contact employers without agreement; agency is part of career development.',
          ],
        },
      ),
      section(
        { de: 'Ein 20-Minuten-Gespräch', en: 'A 20-minute conversation' },
        {
          de: [
            'Führen Sie lieber kurze, wiederkehrende Gespräche als einen großen Entscheidungsabend. Beenden Sie jedes Gespräch mit einer offenen Frage und einem kleinen nächsten Schritt, nicht mit einer erzwungenen endgültigen Wahl.',
          ],
          en: [
            'Prefer short recurring conversations to one high-pressure decision evening. End each conversation with an open question and a small next step rather than a forced final choice.',
          ],
        },
        {
          de: [
            '5 Minuten: Was ist seit dem letzten Gespräch passiert?',
            '5 Minuten: Was hat Energie gegeben oder genommen?',
            '5 Minuten: Welche Information fehlt wirklich?',
            '3 Minuten: Wer übernimmt welchen nächsten Schritt?',
            '2 Minuten: Termin für kurzes Nachfassen festlegen.',
          ],
          en: [
            '5 minutes: what has happened since the last conversation?',
            '5 minutes: what gave or drained energy?',
            '5 minutes: which information is genuinely missing?',
            '3 minutes: who owns which next step?',
            '2 minutes: set a brief follow-up date.',
          ],
        },
      ),
    ],
    sources: [baOrientation, govApprentice, nationalCareers],
  },
  'parent-contract': {
    sections: [
      section(
        {
          de: 'Den Vertrag in Lernfragen übersetzen',
          en: 'Turn the contract into learning questions',
        },
        {
          de: [
            'Prüfen Sie nicht nur Vergütung und Unterschriften. Legen Sie Vertrag, Stellenanzeige, Ausbildungsordnung oder Standard und betrieblichen Trainingsplan nebeneinander. Daraus muss erkennbar werden, welche Inhalte an welchem Lernort vermittelt werden, wer begleitet und wie Fortschritt sowie Prüfungen organisiert sind.',
            'Unklare Klauseln sollten vor der Unterschrift erklärt werden. In Deutschland können die zuständige Kammer und die Berufsberatung unterstützen; in England sind Training Provider und Apprenticeship Support zentrale Stellen. Bei individuellen Rechtsfragen braucht es qualifizierte Beratung – dieser Guide ersetzt sie nicht.',
          ],
          en: [
            'Do not check only pay and signatures. Put the contract, vacancy, occupation standard and training plan side by side. Together they should show what will be learned, where, who provides supervision and how progress and assessment are organised.',
            'Ask for unclear terms to be explained before signing. In Germany the competent chamber and careers service can help; in England the provider and apprenticeship support routes matter. Individual legal questions require qualified advice—this guide is not a substitute.',
          ],
        },
      ),
      section(
        { de: 'Die rote-Stift-Prüfung', en: 'The red-pen review' },
        {
          de: [
            'Markieren Sie jede Stelle, an der nur ein allgemeines Versprechen steht. „Training nach Bedarf“ reicht nicht, wenn unklar bleibt, welcher Standard, welche Zeit und welche verantwortliche Person gemeint sind. Notieren Sie Fragen direkt am Dokument.',
          ],
          en: [
            'Mark every general promise. “Training as required” is not enough if the standard, protected time and accountable person are unclear. Write questions directly beside the relevant clause.',
          ],
        },
        {
          de: [
            'Vertragsparteien, Berufsbezeichnung, Beginn und Dauer.',
            'Arbeits- und Lernzeit, Lernorte, Urlaub und Vergütung.',
            'Probezeit, Kündigung, Krankmeldung und Konfliktweg.',
            'Ausbildungsplan, Ansprechperson, Dokumentation und Prüfungen.',
            'Zusatzkosten für Fahrt, Kleidung, Geräte oder Unterkunft.',
          ],
          en: [
            'Parties, occupation, start date and duration.',
            'Working and training time, locations, leave and pay.',
            'Probation, termination, absence reporting and concerns route.',
            'Training plan, named support, records and assessment.',
            'Extra costs for travel, clothing, equipment or accommodation.',
          ],
        },
      ),
    ],
    sources: [bibbFramework, bibbTraining, govApprentice, offJob],
  },
  'parent-safeguarding': {
    sections: [
      section(
        {
          de: 'Warnsignal, Unbequemlichkeit oder Lernstress?',
          en: 'Warning sign, discomfort or learning pressure?',
        },
        {
          de: [
            'Ein neuer Arbeitsweg, frühe Zeiten und ungewohnte Aufgaben können anstrengend sein, ohne unsicher zu sein. Warnsignale betreffen dagegen fehlende Aufsicht bei riskanter Arbeit, Demütigung, sexualisierte oder diskriminierende Kommentare, Druck zur Geheimhaltung, regelmäßige unbezahlte Mehrarbeit oder das Ignorieren gemeldeter Gefahren. Nehmen Sie Schilderungen ernst, ohne sofort ein Verhör zu führen.',
            'Bei unmittelbarer Gefahr gilt: Sicherheit zuerst, dann dokumentieren und geeignete Hilfe einschalten. In anderen Fällen halten Sie Datum, Situation, beteiligte Rollen und bereits unternommene Schritte sachlich fest. Besprechen Sie mit dem jungen Menschen, wer als nächstes angesprochen wird, soweit der Schutz das zulässt.',
          ],
          en: [
            'A new commute, early starts and unfamiliar tasks can be demanding without being unsafe. Warning signs include unsupervised hazardous work, humiliation, sexualised or discriminatory comments, pressure to keep secrets, routine unpaid extra hours or ignored safety reports. Take an account seriously without turning the first conversation into an interrogation.',
            'For immediate danger, prioritise safety and then document and seek appropriate help. Otherwise record the date, situation, roles involved and steps already taken in factual language. Agree with the young person who to approach next whenever safeguarding allows.',
          ],
        },
      ),
      section(
        { de: 'Eskalation mit Augenmaß', en: 'Proportionate escalation' },
        {
          de: [
            'Beginnen Sie beim benannten betrieblichen oder schulischen Kontakt, sofern dieser nicht Teil des Problems ist. Nutzen Sie danach unabhängige Stellen des Ausbildungssystems. Bei Gewalt, Missbrauch, akuter Gefährdung oder Straftaten gelten die lokalen Notfall- und Schutzwege.',
          ],
          en: [
            'Start with the named workplace or education contact unless that person is part of the concern. Then use independent routes in the apprenticeship system. Violence, abuse, immediate danger or suspected crime require the relevant local emergency and safeguarding routes.',
          ],
        },
        {
          de: [
            'Zuhören und unmittelbare Sicherheit klären.',
            'Beobachtung, wörtliche Aussage und eigene Interpretation trennen.',
            'Vertragliche Ansprech- und Beschwerdewege prüfen.',
            'Keine Konfrontation versprechen, bevor der Schutzplan steht.',
            'Nach der Meldung aktiv nachfassen und Auswirkungen beobachten.',
          ],
          en: [
            'Listen and establish immediate safety.',
            'Separate observation, exact words and your interpretation.',
            'Check named support and complaint routes.',
            'Do not promise confrontation before a safeguarding plan exists.',
            'Follow up after reporting and monitor consequences.',
          ],
        },
      ),
    ],
    sources: [bibbTraining, govApprentice],
  },
  'parent-setbacks': {
    sections: [
      section(
        {
          de: 'Eine Absage ist ein Ereignis, kein Urteil',
          en: 'Rejection is an event, not a verdict',
        },
        {
          de: [
            'Auswahl hängt von Passung, Zeitpunkt, Konkurrenz, formalen Kriterien und manchmal internen Änderungen ab. Trennen Sie deshalb drei Fragen: Was wissen wir sicher? Was können wir aus Feedback oder Unterlagen lernen? Was bleibt unbekannt? So vermeiden Sie sowohl Selbstvorwürfe als auch die vorschnelle Behauptung, das Verfahren sei bedeutungslos.',
            'Nach mehreren erfolglosen Bewerbungen braucht es eine Diagnose statt nur mehr Volumen. Prüfen Sie Suchradius und Berufsalternativen, formale Voraussetzungen, Unterlagen, Belege, Gesprächspraxis und Bewerbungszeitpunkt getrennt. Eine Beratungsfachkraft kann helfen, blinde Flecken zu erkennen.',
          ],
          en: [
            'Selection depends on fit, timing, competition, formal criteria and sometimes internal changes. Separate three questions: what do we know, what can feedback or the application teach us, and what remains unknown? This avoids both self-blame and the claim that the process means nothing.',
            'After repeated unsuccessful applications, diagnose rather than simply increasing volume. Review search range, adjacent occupations, eligibility, evidence, interview practice and timing separately. A careers adviser can help expose blind spots.',
          ],
        },
      ),
      section(
        { de: '48 Stunden, dann neuer Versuch', en: '48 hours, then the next attempt' },
        {
          de: [
            'Geben Sie Enttäuschung Raum, aber setzen Sie einen Termin für die sachliche Auswertung. Eltern können dabei den Prozess stabilisieren: Feedback anfragen, Unterlagen sichern und einen kleinen nächsten Schritt unterstützen, ohne die Bewerbung zu übernehmen.',
          ],
          en: [
            'Allow disappointment, then set a time for a factual review. Parents can stabilise the process by helping request feedback, keeping records and supporting one small next step without taking over the application.',
          ],
        },
        {
          de: [
            'Absage und Gefühle anerkennen, nicht sofort optimieren.',
            'Feedback freundlich und konkret anfragen.',
            'Nur eine oder zwei Änderungen pro nächstem Versuch wählen.',
            'Paralleloption offenhalten, ohne das ursprüngliche Ziel abzuwerten.',
            'Bei anhaltender Belastung Unterstützung außerhalb der Familie suchen.',
          ],
          en: [
            'Acknowledge the rejection and feelings before optimising.',
            'Request feedback politely and specifically.',
            'Choose only one or two changes for the next attempt.',
            'Keep a parallel route open without belittling the original goal.',
            'Seek support beyond the family if distress persists.',
          ],
        },
      ),
    ],
    sources: [baApplication, govApply, nationalCareers],
  },
  'adviser-session': {
    sections: [
      section(
        {
          de: '45 Minuten mit einem sichtbaren Ergebnis',
          en: 'A 45-minute session with a visible outcome',
        },
        {
          de: [
            'Eine gute Orientierungseinheit produziert nicht zwingend eine Berufswahl. Sie kann ein klareres Kriterium, eine geprüfte Annahme oder einen verabredeten Praxistest hervorbringen. Beginnen Sie mit dem heutigen Entscheidungsstand und lassen Sie Jugendliche markieren, welche Aussagen Wissen, Vermutung oder Fremderwartung sind.',
            'Begrenzen Sie die Recherche auf wenige konkrete Optionen und lassen Sie Primärquellen gegeneinander prüfen. Das Ende gehört einem nächsten Schritt mit Verantwortlichkeit und Termin. Dokumentieren Sie nur, was für die Begleitung erforderlich ist, und machen Sie transparent, wer die Notiz sehen kann.',
          ],
          en: [
            'A useful guidance session does not have to produce an occupational choice. It may produce a clearer criterion, a tested assumption or an agreed real-world experiment. Start with the current decision and ask learners to label statements as evidence, assumptions or other people’s expectations.',
            'Limit research to a few concrete options and compare primary sources. End with an owned, dated next action. Record only what is needed for support and explain who can see the note.',
          ],
        },
      ),
      section(
        { de: 'Ablauf mit Zeitboxen', en: 'A time-boxed structure' },
        {
          de: [
            'Zeitboxen verhindern, dass die gesamte Stunde in ungerichteter Suche verschwindet. Sie dürfen angepasst werden, aber jede Phase braucht eine erkennbare Funktion.',
          ],
          en: [
            'Time boxes stop the session disappearing into open-ended searching. They can be adapted, but each phase should have a clear purpose.',
          ],
        },
        {
          de: [
            '0–5: Ziel und Entscheidungsstand klären.',
            '5–15: Erfahrungen und Kriterien sichtbar machen.',
            '15–28: zwei Optionen anhand offizieller Informationen vergleichen.',
            '28–38: Annahme durch Frage, Kontakt oder Praxistest übersetzen.',
            '38–45: nächster Schritt, Unterstützung und Nachverfolgung.',
          ],
          en: [
            '0–5: establish the objective and current decision.',
            '5–15: surface experience and criteria.',
            '15–28: compare two options using official information.',
            '28–38: turn one assumption into a question, contact or practical test.',
            '38–45: agree action, support and follow-up.',
          ],
        },
      ),
    ],
    sources: [baOrientation, nationalCareers],
  },
  'adviser-conversation': {
    sections: [
      section(
        { de: 'Fragen, die Denken öffnen', en: 'Questions that open up thinking' },
        {
          de: [
            'Fragen wie „Was willst du werden?“ verlangen früh eine fertige Identität. Produktiver sind Fragen nach beobachtbaren Erfahrungen: „Welche Aufgabe würdest du gern noch einmal machen – und welchen Teil davon?“ oder „Was müsste in einem Arbeitsalltag vorhanden sein, damit du nach einem schwierigen Tag trotzdem zurückkommen möchtest?“',
            'Vermeiden Sie, eine Antwort sofort in einen Beruf zu übersetzen. Spiegeln Sie das Kriterium, prüfen Sie Gegenbeispiele und suchen Sie mehrere Umgebungen, in denen es vorkommt. Das reduziert stereotype Zuordnung und hält überraschende Wege offen.',
          ],
          en: [
            '“What do you want to be?” asks for a finished identity too early. Questions about observed experience are more productive: “Which task would you choose to do again, and which part?” or “What would need to be present in a workplace for you to return after a difficult day?”',
            'Do not translate an answer immediately into an occupation. Reflect the criterion, test counterexamples and find several environments where it appears. This reduces stereotyped matching and keeps unexpected routes open.',
          ],
        },
      ),
      section(
        {
          de: 'Von „keine Ahnung“ zu einer prüfbaren Frage',
          en: 'From “no idea” to a testable question',
        },
        {
          de: [
            'Wenn jemand „keine Ahnung“ sagt, bieten Sie keine lange Berufsliste an. Wählen Sie eine konkrete Erfahrung und zerlegen Sie sie nach Tätigkeit, Menschen, Umgebung, Tempo und sichtbarem Ergebnis. Daraus entsteht ein kleiner Vergleichstest.',
          ],
          en: [
            'When someone says “no idea”, do not respond with a long list of jobs. Take one concrete experience and break it down by activity, people, environment, pace and visible outcome. Use that to create a small comparison test.',
          ],
        },
        {
          de: [
            'Was genau hast du getan – nicht nur in welchem Fach?',
            'Welcher Teil war interessant, welcher nur leicht?',
            'Arbeitest du lieber mit sichtbarem Ergebnis oder offenem Problem?',
            'Welche Bedingung würde dieselbe Aufgabe unangenehm machen?',
            'Wo könnten wir diese Tätigkeit in zwei Umgebungen beobachten?',
          ],
          en: [
            'What exactly did you do, not just which subject was it?',
            'Which part was interesting and which was merely easy?',
            'Do you prefer a visible output or an open problem?',
            'Which condition would make the same task unpleasant?',
            'Where could we observe this activity in two environments?',
          ],
        },
      ),
    ],
    sources: [baOrientation, nationalCareers],
  },
  'adviser-employer-visit': {
    sections: [
      section(
        { de: 'Vom Rundgang zum Lernformat', en: 'Turn a tour into a learning format' },
        {
          de: [
            'Ein Betriebsbesuch wird schwach, wenn Jugendliche nur Räume sehen und Imagebotschaften hören. Vereinbaren Sie vorab drei reale Arbeitsstationen, eine Aufgabe zum Beobachten und Gespräche mit Auszubildenden ohne ausschließliches Management-Framing. Klären Sie Foto-, Datenschutz-, Sicherheits- und Barrierefreiheitsregeln.',
            'Bereiten Sie Lernende auf Beobachtung vor: Welche Tätigkeit sehen sie, welches Werkzeug oder System wird genutzt, woran wird Qualität geprüft und welche Zusammenarbeit ist unsichtbar? Die Nachbereitung sollte Beobachtung und Werbeaussage ausdrücklich trennen.',
          ],
          en: [
            'An employer visit is weak when learners only see rooms and hear brand messages. Agree three real workstations, one observable task and conversations with apprentices rather than management alone. Clarify photography, confidentiality, safety and accessibility.',
            'Prepare learners to observe: what is being done, which tool or system is used, how quality is checked and which collaboration remains invisible? The debrief should distinguish observation from promotional claims.',
          ],
        },
      ),
      section(
        { de: 'Briefing für den Betrieb', en: 'A briefing for the employer' },
        {
          de: [
            'Geben Sie dem Betrieb ein kurzes schriftliches Briefing. Es benennt Zielgruppe, Lernziele, Zeit, Zugänglichkeit und unerwünschte Verkaufsrhetorik. So wird Qualität planbar und hängt nicht von einer spontanen Führung ab.',
          ],
          en: [
            'Give the employer a short written brief covering the audience, learning outcomes, timing, accessibility and the need to avoid a sales-only presentation. Quality then becomes planned rather than dependent on an improvised tour.',
          ],
        },
        {
          de: [
            'Eine typische und eine unerwartete Aufgabe zeigen.',
            'Auszubildende über Lernen und Schwierigkeiten sprechen lassen.',
            'Auswahlprozess und Anforderungen konkret erklären.',
            'Sicherheitsgrenzen sichtbar begründen.',
            'Kontaktweg und nächstmöglichen Praxisschritt nennen.',
          ],
          en: [
            'Show one typical and one unexpected task.',
            'Let apprentices discuss learning and difficulty.',
            'Explain selection and requirements concretely.',
            'Make safety boundaries visible and explain them.',
            'Provide a contact route and realistic next experience.',
          ],
        },
      ),
    ],
    sources: [bibbTraining, govApprentice, nationalCareers],
  },
  'adviser-quality': {
    sections: [
      section(
        { de: 'Ein Angebot in fünf Ebenen prüfen', en: 'Check an opportunity at five levels' },
        {
          de: [
            'Formale Gültigkeit ist nur die erste Ebene. Prüfen Sie danach Lernplan und Abdeckung, tatsächliche Anleitung, Arbeitsbedingungen und erreichbare Beschwerdewege. Ergänzen Sie Ergebnisqualität: Bleiben Lernende, bestehen sie, entwickeln sie Kompetenz und können sie sinnvoll anschließen? Einzelne Kennzahlen reichen nicht; sie müssen im Kontext von Zielgruppe, Beruf und Standort gelesen werden.',
            'Dokumentieren Sie, ob eine Aussage aus Vertrag, offizieller Quelle, Arbeitgebergespräch oder Erfahrung eines einzelnen Lernenden stammt. Dadurch bleiben starke Warnsignale sichtbar, ohne Einzelfälle unzulässig zu verallgemeinern.',
          ],
          en: [
            'Formal validity is only the first level. Then check curriculum coverage, real supervision, working conditions and accessible complaint routes. Add outcomes: do learners stay, complete, develop competence and progress meaningfully? No single metric is enough; interpret it in the context of the audience, occupation and location.',
            'Record whether each claim comes from a contract, official source, employer conversation or one learner’s experience. This preserves serious warning signs without generalising improperly from one case.',
          ],
        },
      ),
      section(
        { de: 'Qualitätsampel mit Begründung', en: 'A justified quality rating' },
        {
          de: [
            'Vergeben Sie nie nur Grün, Gelb oder Rot. Jede Einstufung braucht Beleg, offene Frage und nächste Prüfmethode. Ein fehlendes Dokument kann klärbar sein; widersprüchliche Aussagen oder fehlende sichere Aufsicht verlangen eine andere Reaktion.',
          ],
          en: [
            'Never assign red, amber or green alone. Every rating needs evidence, an open question and a next verification method. A missing document may be resolvable; contradictory accounts or missing safe supervision require a different response.',
          ],
        },
        {
          de: [
            'Standard, Vertrag und verantwortliche Stelle.',
            'Lernplan, geschützte Lernzeit und Aufgabenabdeckung.',
            'Qualifikation, Verfügbarkeit und Verhalten der Anleitung.',
            'Arbeitszeit, Sicherheit, Gleichbehandlung und Unterstützung.',
            'Feedback, Beschwerde, Abschluss und Anschlussweg.',
          ],
          en: [
            'Standard, contract and accountable body.',
            'Training plan, protected learning and task coverage.',
            'Qualification, availability and conduct of supervision.',
            'Hours, safety, equal treatment and support.',
            'Feedback, complaints, completion and progression.',
          ],
        },
      ),
    ],
    sources: [bibbTraining, bibbFramework, offJob, govApprentice],
  },
  'official-data': {
    sections: [
      section(
        {
          de: 'Vom Rohdatensatz zur sichtbaren Aussage',
          en: 'From source data to a visible claim',
        },
        {
          de: [
            'Apprentice Atlas trennt Quelle, Transformation und Darstellung. Zuerst speichern wir Herkunft, Markt, Abrufzeit und fachliche Bedeutung eines Feldes. Dann normalisieren wir nur, was vergleichbar ist – etwa Schreibweisen oder interne Kategorien. Schließlich zeigt die Oberfläche die verständliche Aussage zusammen mit Quelle, Stand und Einschränkung. Originaldaten bleiben für Korrekturen nachvollziehbar.',
            'Deutschland und das Vereinigte Königreich verwenden unterschiedliche Berufs-, Qualifikations- und Verwaltungssysteme. Wir erzeugen deshalb keine künstliche 1:1-Entsprechung. Eine Zuordnung kann thematische Nähe ausdrücken, darf aber weder Gleichwertigkeit eines Abschlusses noch persönliche Eignung behaupten.',
          ],
          en: [
            'Apprentice Atlas separates source, transformation and presentation. We record origin, market, retrieval time and the meaning of a field. We normalise only what is genuinely comparable, such as spelling or internal categories. The interface then presents plain-language information with its source, date and limitation. Original values remain traceable for correction.',
            'Germany and the UK use different occupational, qualification and administrative systems. We therefore do not invent one-to-one equivalence. A mapping may express thematic proximity; it must not claim equal qualification status or personal suitability.',
          ],
        },
      ),
      section(
        { de: 'Beispiel einer Datenentscheidung', en: 'An example data decision' },
        {
          de: [
            'Wenn eine Quelle einen Beruf aktualisiert und eine zweite noch den alten Namen führt, wählen wir nicht stillschweigend den attraktiveren Begriff. Wir markieren Geltungsbereich und Stand, prüfen die zuständige Primärquelle und dokumentieren Redirect oder Alias.',
          ],
          en: [
            'If one source updates an occupation while another retains an older title, we do not silently choose the more attractive wording. We label scope and date, check the accountable primary source and document any redirect or alias.',
          ],
        },
        {
          de: [
            'Quelleninhaber und Zuständigkeit festhalten.',
            'Abruf, letzte fachliche Prüfung und nächstes Review trennen.',
            'Transformationen reproduzierbar dokumentieren.',
            'Nicht vergleichbare Felder nicht künstlich zusammenführen.',
            'Korrekturen mit Auswirkung und Datum protokollieren.',
          ],
          en: [
            'Record source owner and authority.',
            'Separate retrieval, editorial review and next review dates.',
            'Document transformations reproducibly.',
            'Do not merge fields that are not genuinely comparable.',
            'Log corrections with impact and date.',
          ],
        },
      ),
    ],
    sources: [bibbTraining, baOrientation, govApprentice, nationalCareers],
  },
  'responsible-ai': {
    sections: [
      section(
        { de: 'Vier Grenzen im Produkt', en: 'Four product boundaries' },
        {
          de: [
            'Erstens bleibt AI-Ausgabe als Vorschlag erkennbar und wird nicht als amtliche Information ausgegeben. Zweitens müssen wichtige Tatsachen über verlinkte Quellen prüfbar sein. Drittens verlangen wir keine sensiblen Merkmale, um Berufswege zu ranken. Viertens automatisieren wir keine Entscheidung über Zugang, Eignung oder Schutzmaßnahmen. Bei Unsicherheit soll das System Fragen öffnen, nicht Sicherheit simulieren.',
            'Die Qualität einer Antwort hängt von Eingabe, Modell und Quellenkontext ab. Auch sprachlich überzeugende Antworten können falsch, veraltet oder unpassend sein. Deshalb protokollieren wir keine freie persönliche Beratung als Wahrheitsgrundlage und nutzen keine privaten Nachrichten als öffentliches Testmaterial.',
          ],
          en: [
            'First, AI output remains visibly a suggestion and is not presented as official information. Second, important factual claims must be checkable through linked sources. Third, we do not require sensitive characteristics to rank career routes. Fourth, we do not automate decisions about access, suitability or safeguarding. When uncertain, the system should open questions rather than simulate confidence.',
            'Answer quality depends on the prompt, model and source context. Persuasive language can still be wrong, stale or unsuitable. We therefore do not treat free-form personal advice as a truth source or use private messages as public test material.',
          ],
        },
      ),
      section(
        { de: 'So prüfst du eine AI-Antwort', en: 'How to check an AI answer' },
        {
          de: [
            'Beispiel: „Für diesen Beruf brauchst du Abitur“ ist eine überprüfbare Zugangsaussage. Frage nach Markt, konkretem Ausbildungsweg und Primärquelle. „Dieser Beruf passt zu dir“ ist dagegen eine Wertung; zerlege sie in genannte Tätigkeiten und teste diese selbst.',
          ],
          en: [
            'Example: “You need A levels for this role” is a checkable entry claim. Ask for the country, exact route and primary source. “This career suits you” is a judgement; break it into the activities named and test those yourself.',
          ],
        },
        {
          de: [
            'Ist es Tatsache, Interpretation oder Vorschlag?',
            'Für welchen Markt, Zeitpunkt und konkreten Weg gilt es?',
            'Führt der Quellenlink tatsächlich zur behaupteten Information?',
            'Welche wichtige Information über mich oder die Situation fehlt?',
            'Braucht diese Frage eine Beratungs-, Schutz- oder Rechtsfachkraft?',
          ],
          en: [
            'Is this a fact, interpretation or suggestion?',
            'Which market, date and exact route does it concern?',
            'Does the source actually support the claim?',
            'Which important information about me or the situation is missing?',
            'Does this require a careers, safeguarding or legal professional?',
          ],
        },
      ),
    ],
    sources: [
      {
        label: 'European Commission – Regulatory framework for AI',
        url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
      },
      {
        label: 'ICO – Guidance on AI and data protection',
        url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/',
      },
    ],
  },
  'impact-method': {
    sections: [
      section(
        { de: 'Von Aktivität zu Wirkung', en: 'From activity to impact' },
        {
          de: [
            'Wir unterscheiden Reichweite, Nutzung, unmittelbares Lernen, verändertes Verhalten und längerfristiges Ergebnis. Eine geöffnete Ressource ist Nutzung. Eine Person, die danach zwei Optionen anhand eigener Kriterien vergleichen kann, zeigt mögliches Lernen. Ein organisierter Betriebsbesuch ist Verhalten. Ein späterer Übergang kann relevant sein, wird aber von vielen Faktoren beeinflusst und darf nicht automatisch dem Produkt zugerechnet werden.',
            'Vor einem Pilot definieren wir wenige Lernfragen, erwartete Mechanismen und mögliche Schäden. Wir legen fest, welche Daten wirklich nötig sind, wie qualitative Stimmen einfließen und wann wir eine Aussage nicht treffen können. Untergruppen werden nur ausgewertet, wenn Schutz und Aussagekraft gewährleistet sind.',
          ],
          en: [
            'We separate reach, use, immediate learning, changed behaviour and longer-term outcomes. Opening a resource is use. Being able to compare two options using personal criteria may indicate learning. Arranging an employer visit is behaviour. A later transition may matter but is influenced by many factors and cannot automatically be attributed to the product.',
            'Before a pilot we define a small set of learning questions, expected mechanisms and possible harms. We state which data is genuinely necessary, how qualitative voices are included and when a claim cannot be made. Subgroups are analysed only when safety and meaningful interpretation are possible.',
          ],
        },
      ),
      section(
        { de: 'Ein ehrliches Pilot-Scorecard-Beispiel', en: 'An honest pilot scorecard example' },
        {
          de: [
            'Eine Schule könnte prüfen, ob Lernende nach zwei Einheiten mehr konkrete Optionen benennen, Quellen unterscheiden und einen nächsten Schritt festlegen können. Das ist noch kein Nachweis besserer Langzeitergebnisse. Ergänzende Interviews müssen auch Nichtnutzung, Verwirrung und unerwünschten Druck erfassen.',
          ],
          en: [
            'A school might test whether, after two sessions, learners can name more concrete options, distinguish sources and set a next action. That is not evidence of better long-term outcomes. Interviews should also capture non-use, confusion and unintended pressure.',
          ],
        },
        {
          de: [
            'Lernfrage und gewünschte Veränderung vor Start festlegen.',
            'Ausgangslage und Teilnahmeverzerrung beschreiben.',
            'Nutzung nicht mit Wirkung gleichsetzen.',
            'Negative, neutrale und uneindeutige Ergebnisse berichten.',
            'Entscheidung über Fortführung an vorab benannte Kriterien binden.',
          ],
          en: [
            'Define the learning question and intended change in advance.',
            'Describe baseline and participation bias.',
            'Do not equate usage with impact.',
            'Report negative, neutral and ambiguous findings.',
            'Tie continuation decisions to criteria named in advance.',
          ],
        },
      ),
    ],
    sources: [
      {
        label: 'OECD – Career readiness',
        url: 'https://www.oecd.org/en/topics/sub-issues/career-readiness.html',
      },
      {
        label: 'UK Government – Magenta Book evaluation guidance',
        url: 'https://www.gov.uk/government/publications/the-magenta-book',
      },
    ],
  },
  'building-in-public': {
    sections: [
      section(
        {
          de: 'Was sich nach dem Prototyp ändern musste',
          en: 'What had to change after the prototype',
        },
        {
          de: [
            'Ein Hackathon optimiert auf Lerngeschwindigkeit und eine verständliche Demonstration. Ein öffentlicher Dienst muss dagegen mit unvollständigen Daten, Ausfällen, Korrekturen, Missbrauch, Barrierefreiheit und unterschiedlichen Schutzbedürfnissen umgehen. Deshalb trennen wir Mobile-App, Marketingplattform und CMS, halten Formulardaten serverseitig und veröffentlichen Inhalte erst nach Quellen- und Reviewfeldern.',
            'Funktionsumfang ist kein Beweis für Reife. Reife zeigt sich auch an bewusst nicht gebauten Dingen: keine Live-Jobsuche ohne belastbare Datenpipeline, kein öffentliches Nutzerkonto ohne klaren Bedarf, keine erfundenen Wirkungszahlen und keine AI-Entscheidung über Lebenswege. Diese Grenzen werden erst nach Pilotbelegen neu bewertet.',
          ],
          en: [
            'A hackathon optimises for learning speed and a clear demonstration. A public service must handle incomplete data, outages, corrections, abuse, accessibility and different safeguarding needs. We therefore separate the mobile app, marketing platform and CMS, keep form data server-side and require source and review fields before publishing content.',
            'Feature volume is not evidence of maturity. Maturity is also visible in what we deliberately do not build: no live vacancy search without a reliable data pipeline, no public user account without a clear need, no invented impact figures and no AI decision about a life route. Pilot evidence, not excitement, will determine whether these boundaries move.',
          ],
        },
      ),
      section(
        { de: 'Unser Release-Gate', en: 'Our release gate' },
        {
          de: [
            'Eine Funktion kann technisch fertig und trotzdem nicht veröffentlichungsreif sein. Vor Freigabe braucht sie eine verantwortliche Person, belegte Inhalte, Datenschutz- und Schutzprüfung, barrierefreie Nutzung, Fehlerweg, Monitoring und eine Rücknahmeoption.',
          ],
          en: [
            'A feature can be technically complete without being ready to publish. Release requires an accountable owner, evidenced content, privacy and safeguarding review, accessible use, an error route, monitoring and a way to withdraw it.',
          ],
        },
        {
          de: [
            'Welche Nutzerentscheidung beeinflusst die Funktion?',
            'Welche Quelle, Annahme und Unsicherheit steckt darin?',
            'Was passiert bei Fehler, Missbrauch oder Systemausfall?',
            'Kann die Kernaufgabe per Tastatur und assistiver Technik erledigt werden?',
            'Wer entscheidet über Korrektur, Abschaltung und erneute Freigabe?',
          ],
          en: [
            'Which user decision can the feature influence?',
            'Which source, assumption and uncertainty does it contain?',
            'What happens after error, misuse or outage?',
            'Can the core task be completed by keyboard and assistive technology?',
            'Who decides correction, withdrawal and re-release?',
          ],
        },
      ),
    ],
    sources: [
      {
        label: 'W3C – Web Content Accessibility Guidelines 2.2',
        url: 'https://www.w3.org/TR/WCAG22/',
      },
      {
        label: 'ICO – Children and the UK GDPR',
        url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/',
      },
    ],
  },
};
