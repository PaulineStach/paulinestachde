/* Data for the sentence-order and formal/informal exercises on the material page */

export interface SentencePart {
  /** As written mid-sentence; the first block of the built sentence is capitalised */
  text: string
  /** Part of the sentence, shown under the block */
  role: string
  /** The finite verb – the block whose position the exercise is about */
  finite?: boolean
  /** The subject; as a pronoun it must follow the verb directly when it does not open the sentence */
  subject?: boolean
  /**
   * A time phrase, ranked from general (1) to exact (2): "morgen um 9 Uhr", not the other
   * way round. Two of them may share the first position.
   */
  time?: 1 | 2
  /** A pronoun object; it comes before noun objects ("mir das Ticket") */
  pronoun?: boolean
  /** Must close the sentence: the second part of a separable verb or an infinitive */
  last?: boolean
}

export interface SentenceExercise {
  kind: 'statement' | 'question'
  /** Blocks in the (shuffled) order they are offered */
  parts: SentencePart[]
  /** The rule, shown once the sentence is right */
  tip: string
}

export const sentenceKinds: Record<SentenceExercise['kind'], { label: string; end: string }> = {
  statement: { label: 'Aussage', end: '.' },
  question: { label: 'Ja-/Nein-Frage', end: '?' },
}

export const sentenceExercises: SentenceExercise[] = [
  {
    kind: 'statement',
    parts: [
      { text: 'unser Daily', role: 'Objekt' },
      { text: 'haben', role: 'Verb', finite: true },
      { text: 'um 9 Uhr', role: 'Zeitangabe', time: 2 },
      { text: 'wir', role: 'Subjekt', subject: true },
      { text: 'morgen', role: 'Zeitangabe', time: 1 },
    ],
    tip: 'Das Verb steht an Position 2 – egal, ob der Satz mit dem Subjekt, einer Zeitangabe oder dem Objekt beginnt.',
  },
  {
    kind: 'statement',
    parts: [
      { text: 'vor', role: 'Verb, Teil 2', last: true },
      { text: 'das neue Feature', role: 'Objekt' },
      { text: 'stelle', role: 'Verb, Teil 1', finite: true },
      { text: 'heute', role: 'Zeitangabe', time: 1 },
      { text: 'ich', role: 'Subjekt', subject: true },
    ],
    tip: 'Trennbare Verben bilden eine Klammer: vorstellen – ich stelle … vor. Der erste Teil steht an Position 2, der zweite ganz am Ende.',
  },
  {
    kind: 'question',
    parts: [
      { text: 'schicken', role: 'Infinitiv', last: true },
      { text: 'du', role: 'Subjekt', subject: true },
      { text: 'das Ticket', role: 'Objekt (Akkusativ)' },
      { text: 'kannst', role: 'Modalverb', finite: true },
      { text: 'mir', role: 'Objekt (Dativ)', pronoun: true },
    ],
    tip: 'In Ja-/Nein-Fragen steht das Verb ganz vorne, der Infinitiv ganz am Ende.',
  },
]

/**
 * Checks a built order against the word-order rules the exercise teaches, so every
 * grammatical order counts as right. Returns null when it is right, otherwise a hint
 * naming what is out of place.
 */
export function checkSentenceOrder(exercise: SentenceExercise, order: number[]): string | null {
  const parts = order.map((index) => exercise.parts[index]!)
  const finiteAt = parts.findIndex((part) => part.finite)
  const subjectAt = parts.findIndex((part) => part.subject)
  const finite = parts[finiteAt]!
  const subject = parts[subjectAt]!
  const lastPart = exercise.parts.find((part) => part.last)

  if (exercise.kind === 'question') {
    if (finiteAt !== 0) {
      return `In einer Ja-/Nein-Frage steht das Verb „${finite.text}“ ganz vorne.`
    }
    if (subjectAt !== 1) {
      return `In der Frage folgt das Subjekt „${subject.text}“ direkt auf das Verb.`
    }
  } else {
    // Two time phrases may open the sentence together ("Morgen um 9 Uhr haben wir …")
    const fieldSize = parts[0]!.time && parts[1]!.time ? 2 : 1
    if (finiteAt !== fieldSize) {
      return `Im Aussagesatz steht das Verb „${finite.text}“ an Position 2 – hier steht es an Position ${finiteAt + 1}.`
    }
    if (subjectAt !== 0 && subjectAt !== finiteAt + 1) {
      return `Beginnt der Satz nicht mit dem Subjekt, steht „${subject.text}“ direkt nach dem Verb.`
    }
  }
  if (lastPart && parts.at(-1) !== lastPart) {
    return `„${lastPart.text}“ steht ganz am Ende – das ist der zweite Teil der Satzklammer.`
  }
  // General before exact time ("morgen um 9 Uhr"). The exact time may open the sentence,
  // then the general one follows right after the subject ("Um 9 Uhr haben wir morgen …").
  const generalAt = parts.findIndex((part) => part.time === 1)
  const exactAt = parts.findIndex((part) => part.time === 2)
  if (generalAt > -1 && exactAt > -1 && generalAt > exactAt) {
    const fronted = exactAt === 0 && generalAt === subjectAt + 1
    if (!fronted) {
      return `Erst die allgemeine, dann die genaue Zeit: „${parts[generalAt]!.text} ${parts[exactAt]!.text}“.`
    }
  }
  const pronounAt = parts.findIndex((part) => part.pronoun)
  const nounObjectAt = parts.findIndex((part) => part.role.startsWith('Objekt') && !part.pronoun)
  if (pronounAt > -1 && nounObjectAt > -1 && pronounAt > nounObjectAt) {
    return `Kurze Pronomen kommen zuerst: „${parts[pronounAt]!.text}“ steht vor „${parts[nounObjectAt]!.text}“.`
  }
  return null
}

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
