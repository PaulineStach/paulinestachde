/* Data for the sentence-order and formal/informal exercises on the material page */

export interface SentencePart {
  /** As written mid-sentence; the first block of the built sentence is capitalised */
  text: string
  /** Part of the sentence, shown under the block */
  role: string
  verb?: boolean
}

export interface SentenceExercise {
  /** Blocks in the (shuffled) order they are offered */
  parts: SentencePart[]
  /** Every accepted order, as lists of block texts */
  solutions: string[][]
  end: '.' | '?'
  tip: string
}

export const sentenceExercises: SentenceExercise[] = [
  {
    parts: [
      { text: 'unser Daily', role: 'Objekt' },
      { text: 'haben', role: 'Verb', verb: true },
      { text: 'um 9 Uhr', role: 'Zeitangabe' },
      { text: 'wir', role: 'Subjekt' },
      { text: 'morgen', role: 'Zeitangabe' },
    ],
    solutions: [
      ['morgen', 'haben', 'wir', 'um 9 Uhr', 'unser Daily'],
      ['wir', 'haben', 'morgen', 'um 9 Uhr', 'unser Daily'],
      ['um 9 Uhr', 'haben', 'wir', 'morgen', 'unser Daily'],
    ],
    end: '.',
    tip: 'Das Verb steht an Position 2 – egal, ob der Satz mit dem Subjekt oder mit einer Zeitangabe beginnt.',
  },
  {
    parts: [
      { text: 'vor', role: 'Verb, Teil 2', verb: true },
      { text: 'das neue Feature', role: 'Objekt' },
      { text: 'stelle', role: 'Verb, Teil 1', verb: true },
      { text: 'heute', role: 'Zeitangabe' },
      { text: 'ich', role: 'Subjekt' },
    ],
    solutions: [
      ['heute', 'stelle', 'ich', 'das neue Feature', 'vor'],
      ['ich', 'stelle', 'heute', 'das neue Feature', 'vor'],
    ],
    end: '.',
    tip: 'Trennbare Verben bilden eine Klammer: vorstellen – ich stelle … vor. Der zweite Teil steht ganz am Ende.',
  },
  {
    parts: [
      { text: 'schicken', role: 'Infinitiv', verb: true },
      { text: 'du', role: 'Subjekt' },
      { text: 'das Ticket', role: 'Objekt (Akkusativ)' },
      { text: 'kannst', role: 'Modalverb', verb: true },
      { text: 'mir', role: 'Objekt (Dativ)' },
    ],
    solutions: [['kannst', 'du', 'mir', 'das Ticket', 'schicken']],
    end: '?',
    tip: 'In Ja-/Nein-Fragen steht das Verb an Position 1, der Infinitiv ganz am Ende.',
  },
]

export type Register = 'formell' | 'informell'

export interface RegisterPhrase {
  text: string
  kind: 'Begrüßung' | 'Verabschiedung'
  register: Register
}

export const registers: readonly Register[] = ['formell', 'informell']

/** Openings and closings for e-mails and messages, to sort by tone */
export const registerPhrases: RegisterPhrase[] = [
  { text: 'Sehr geehrte Frau Schmidt,', kind: 'Begrüßung', register: 'formell' },
  { text: 'Hallo Ana,', kind: 'Begrüßung', register: 'informell' },
  { text: 'Guten Tag, Herr Weber,', kind: 'Begrüßung', register: 'formell' },
  { text: 'Liebe Grüße', kind: 'Verabschiedung', register: 'informell' },
  { text: 'Mit freundlichen Grüßen', kind: 'Verabschiedung', register: 'formell' },
  { text: 'Bis später!', kind: 'Verabschiedung', register: 'informell' },
]
