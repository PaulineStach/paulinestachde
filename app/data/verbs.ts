/*
 * Verbs for the trainer at /material/verben: common verbs from office and IT work with their
 * present tense, Perfekt (auxiliary + Partizip II), type and the case of their object.
 * Present forms of separable verbs hold only the conjugated part; the prefix is listed apart
 * and goes to the end of the sentence ("ich rufe … an").
 */

export const persons = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'] as const

export type VerbType = 'regelmäßig' | 'unregelmäßig'
export type ObjectCase = 'Akkusativ' | 'Dativ' | 'Akkusativ und Dativ'

export interface Verb {
  infinitive: string
  /** Short English meaning – many learners share English as a bridge language */
  en: string
  /** ich, du, er/sie/es, wir, ihr, sie/Sie */
  present: [string, string, string, string, string, string]
  /** Separable prefix, e.g. "an" for anrufen */
  prefix?: string
  auxiliary: 'haben' | 'sein'
  participle: string
  type: VerbType
  objectCase?: ObjectCase
}

export const verbs: Verb[] = [
  // Regular verbs
  {
    infinitive: 'arbeiten',
    en: 'to work',
    present: ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten', 'arbeitet', 'arbeiten'],
    auxiliary: 'haben',
    participle: 'gearbeitet',
    type: 'regelmäßig',
  },
  {
    infinitive: 'machen',
    en: 'to do, to make',
    present: ['mache', 'machst', 'macht', 'machen', 'macht', 'machen'],
    auxiliary: 'haben',
    participle: 'gemacht',
    type: 'regelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'testen',
    en: 'to test',
    present: ['teste', 'testest', 'testet', 'testen', 'testet', 'testen'],
    auxiliary: 'haben',
    participle: 'getestet',
    type: 'regelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'planen',
    en: 'to plan',
    present: ['plane', 'planst', 'plant', 'planen', 'plant', 'planen'],
    auxiliary: 'haben',
    participle: 'geplant',
    type: 'regelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'fragen',
    en: 'to ask',
    present: ['frage', 'fragst', 'fragt', 'fragen', 'fragt', 'fragen'],
    auxiliary: 'haben',
    participle: 'gefragt',
    type: 'regelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'antworten',
    en: 'to answer, to reply',
    present: ['antworte', 'antwortest', 'antwortet', 'antworten', 'antwortet', 'antworten'],
    auxiliary: 'haben',
    participle: 'geantwortet',
    type: 'regelmäßig',
    objectCase: 'Dativ',
  },
  {
    infinitive: 'danken',
    en: 'to thank',
    present: ['danke', 'dankst', 'dankt', 'danken', 'dankt', 'danken'],
    auxiliary: 'haben',
    participle: 'gedankt',
    type: 'regelmäßig',
    objectCase: 'Dativ',
  },
  {
    infinitive: 'brauchen',
    en: 'to need',
    present: ['brauche', 'brauchst', 'braucht', 'brauchen', 'braucht', 'brauchen'],
    auxiliary: 'haben',
    participle: 'gebraucht',
    type: 'regelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'programmieren',
    en: 'to program, to code',
    present: [
      'programmiere',
      'programmierst',
      'programmiert',
      'programmieren',
      'programmiert',
      'programmieren',
    ],
    auxiliary: 'haben',
    participle: 'programmiert',
    type: 'regelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'präsentieren',
    en: 'to present',
    present: [
      'präsentiere',
      'präsentierst',
      'präsentiert',
      'präsentieren',
      'präsentiert',
      'präsentieren',
    ],
    auxiliary: 'haben',
    participle: 'präsentiert',
    type: 'regelmäßig',
    objectCase: 'Akkusativ und Dativ',
  },
  {
    infinitive: 'zahlen',
    en: 'to pay',
    present: ['zahle', 'zahlst', 'zahlt', 'zahlen', 'zahlt', 'zahlen'],
    auxiliary: 'haben',
    participle: 'gezahlt',
    type: 'regelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'bestellen',
    en: 'to order',
    present: ['bestelle', 'bestellst', 'bestellt', 'bestellen', 'bestellt', 'bestellen'],
    auxiliary: 'haben',
    participle: 'bestellt',
    type: 'regelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'erklären',
    en: 'to explain',
    present: ['erkläre', 'erklärst', 'erklärt', 'erklären', 'erklärt', 'erklären'],
    auxiliary: 'haben',
    participle: 'erklärt',
    type: 'regelmäßig',
    objectCase: 'Akkusativ und Dativ',
  },
  {
    infinitive: 'vorstellen',
    en: 'to present, to introduce',
    present: ['stelle', 'stellst', 'stellt', 'stellen', 'stellt', 'stellen'],
    prefix: 'vor',
    auxiliary: 'haben',
    participle: 'vorgestellt',
    type: 'regelmäßig',
    objectCase: 'Akkusativ und Dativ',
  },
  // Irregular verbs
  {
    infinitive: 'sein',
    en: 'to be',
    present: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'],
    auxiliary: 'sein',
    participle: 'gewesen',
    type: 'unregelmäßig',
  },
  {
    infinitive: 'haben',
    en: 'to have',
    present: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'],
    auxiliary: 'haben',
    participle: 'gehabt',
    type: 'unregelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'sprechen',
    en: 'to speak',
    present: ['spreche', 'sprichst', 'spricht', 'sprechen', 'sprecht', 'sprechen'],
    auxiliary: 'haben',
    participle: 'gesprochen',
    type: 'unregelmäßig',
  },
  {
    infinitive: 'schreiben',
    en: 'to write',
    present: ['schreibe', 'schreibst', 'schreibt', 'schreiben', 'schreibt', 'schreiben'],
    auxiliary: 'haben',
    participle: 'geschrieben',
    type: 'unregelmäßig',
    objectCase: 'Akkusativ und Dativ',
  },
  {
    infinitive: 'lesen',
    en: 'to read',
    present: ['lese', 'liest', 'liest', 'lesen', 'lest', 'lesen'],
    auxiliary: 'haben',
    participle: 'gelesen',
    type: 'unregelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'geben',
    en: 'to give',
    present: ['gebe', 'gibst', 'gibt', 'geben', 'gebt', 'geben'],
    auxiliary: 'haben',
    participle: 'gegeben',
    type: 'unregelmäßig',
    objectCase: 'Akkusativ und Dativ',
  },
  {
    infinitive: 'helfen',
    en: 'to help',
    present: ['helfe', 'hilfst', 'hilft', 'helfen', 'helft', 'helfen'],
    auxiliary: 'haben',
    participle: 'geholfen',
    type: 'unregelmäßig',
    objectCase: 'Dativ',
  },
  {
    infinitive: 'nehmen',
    en: 'to take',
    present: ['nehme', 'nimmst', 'nimmt', 'nehmen', 'nehmt', 'nehmen'],
    auxiliary: 'haben',
    participle: 'genommen',
    type: 'unregelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'finden',
    en: 'to find',
    present: ['finde', 'findest', 'findet', 'finden', 'findet', 'finden'],
    auxiliary: 'haben',
    participle: 'gefunden',
    type: 'unregelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'wissen',
    en: 'to know',
    present: ['weiß', 'weißt', 'weiß', 'wissen', 'wisst', 'wissen'],
    auxiliary: 'haben',
    participle: 'gewusst',
    type: 'unregelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'gefallen',
    en: 'to please, to like',
    present: ['gefalle', 'gefällst', 'gefällt', 'gefallen', 'gefallt', 'gefallen'],
    auxiliary: 'haben',
    participle: 'gefallen',
    type: 'unregelmäßig',
    objectCase: 'Dativ',
  },
  {
    infinitive: 'kommen',
    en: 'to come',
    present: ['komme', 'kommst', 'kommt', 'kommen', 'kommt', 'kommen'],
    auxiliary: 'sein',
    participle: 'gekommen',
    type: 'unregelmäßig',
  },
  {
    infinitive: 'gehen',
    en: 'to go',
    present: ['gehe', 'gehst', 'geht', 'gehen', 'geht', 'gehen'],
    auxiliary: 'sein',
    participle: 'gegangen',
    type: 'unregelmäßig',
  },
  {
    infinitive: 'fahren',
    en: 'to drive, to travel',
    present: ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren'],
    auxiliary: 'sein',
    participle: 'gefahren',
    type: 'unregelmäßig',
  },
  {
    infinitive: 'bleiben',
    en: 'to stay',
    present: ['bleibe', 'bleibst', 'bleibt', 'bleiben', 'bleibt', 'bleiben'],
    auxiliary: 'sein',
    participle: 'geblieben',
    type: 'unregelmäßig',
  },
  {
    infinitive: 'anrufen',
    en: 'to call (on the phone)',
    present: ['rufe', 'rufst', 'ruft', 'rufen', 'ruft', 'rufen'],
    prefix: 'an',
    auxiliary: 'haben',
    participle: 'angerufen',
    type: 'unregelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'anfangen',
    en: 'to start, to begin',
    present: ['fange', 'fängst', 'fängt', 'fangen', 'fangt', 'fangen'],
    prefix: 'an',
    auxiliary: 'haben',
    participle: 'angefangen',
    type: 'unregelmäßig',
  },
  {
    infinitive: 'einladen',
    en: 'to invite',
    present: ['lade', 'lädst', 'lädt', 'laden', 'ladet', 'laden'],
    prefix: 'ein',
    auxiliary: 'haben',
    participle: 'eingeladen',
    type: 'unregelmäßig',
    objectCase: 'Akkusativ',
  },
  {
    infinitive: 'teilnehmen',
    en: 'to take part',
    present: ['nehme', 'nimmst', 'nimmt', 'nehmen', 'nehmt', 'nehmen'],
    prefix: 'teil',
    auxiliary: 'haben',
    participle: 'teilgenommen',
    type: 'unregelmäßig',
  },
  {
    infinitive: 'aufstehen',
    en: 'to get up',
    present: ['stehe', 'stehst', 'steht', 'stehen', 'steht', 'stehen'],
    prefix: 'auf',
    auxiliary: 'sein',
    participle: 'aufgestanden',
    type: 'unregelmäßig',
  },
]

/** Sentences for the case exercise: which article form does the verb's object need? */
export interface CaseItem {
  /** Sentence with ___ where the article goes */
  sentence: string
  verb: string
  objectCase: 'Akkusativ' | 'Dativ'
  options: string[]
  answer: string
  /** The object as it should read, for the explanation */
  solution: string
}

export const caseItems: CaseItem[] = [
  {
    sentence: 'Kannst du ___ Kollegin heute helfen?',
    verb: 'helfen',
    objectCase: 'Dativ',
    options: ['die', 'der'],
    answer: 'der',
    solution: 'der Kollegin',
  },
  {
    sentence: 'Wir danken ___ Team für die Hilfe.',
    verb: 'danken',
    objectCase: 'Dativ',
    options: ['das', 'dem'],
    answer: 'dem',
    solution: 'dem Team',
  },
  {
    sentence: 'Ich rufe ___ Kunden morgen an.',
    verb: 'anrufen',
    objectCase: 'Akkusativ',
    options: ['den', 'dem'],
    answer: 'den',
    solution: 'den Kunden',
  },
  {
    sentence: 'Frag doch ___ Teamleiter!',
    verb: 'fragen',
    objectCase: 'Akkusativ',
    options: ['den', 'dem'],
    answer: 'den',
    solution: 'den Teamleiter',
  },
  {
    sentence: 'Das neue Design gefällt ___ Chefin sehr.',
    verb: 'gefallen',
    objectCase: 'Dativ',
    options: ['die', 'der'],
    answer: 'der',
    solution: 'der Chefin',
  },
  {
    sentence: 'Bitte antworten Sie ___ Kundenservice bis Freitag.',
    verb: 'antworten',
    objectCase: 'Dativ',
    options: ['den', 'dem'],
    answer: 'dem',
    solution: 'dem Kundenservice',
  },
  {
    sentence: 'Wir brauchen ___ neuen Server.',
    verb: 'brauchen',
    objectCase: 'Akkusativ',
    options: ['einen', 'einem'],
    answer: 'einen',
    solution: 'einen neuen Server',
  },
  {
    sentence: 'Kannst du ___ Team die Zahlen erklären?',
    verb: 'erklären',
    objectCase: 'Dativ',
    options: ['das', 'dem'],
    answer: 'dem',
    solution: 'dem Team (Dativ) die Zahlen (Akkusativ)',
  },
  {
    sentence: 'Ich lade ___ ganze Team zur Retro ein.',
    verb: 'einladen',
    objectCase: 'Akkusativ',
    options: ['das', 'dem'],
    answer: 'das',
    solution: 'das ganze Team',
  },
  {
    sentence: 'Die Entwicklerin gibt ___ Kollegin einen Tipp.',
    verb: 'geben',
    objectCase: 'Dativ',
    options: ['die', 'der'],
    answer: 'der',
    solution: 'der Kollegin (Dativ) einen Tipp (Akkusativ)',
  },
]
