/* Data for the sentence-order and formal/informal exercises on the material page */

export interface SentencePart {
  /** As written mid-sentence; the first block of the built sentence is capitalised */
  text: string
  /** Part of the sentence, shown under the block */
  role: string
  /** The finite verb – the block whose position the exercise is about */
  finite?: boolean
  /** The subject; as a pronoun it follows the verb directly when it does not open the sentence */
  subject?: boolean
  /**
   * A time phrase, ranked from general (1) to exact (2): "morgen um 9 Uhr", not the other
   * way round. Two of them may share the first position.
   */
  time?: 1 | 2
  /** A pronoun object; it comes before noun objects ("mir das Ticket") */
  pronoun?: boolean
  /** Closes the bracket: second part of a separable verb, infinitive or participle */
  last?: boolean
  /** The question word of a W-question */
  wword?: boolean
  /** The conjunction that opens a subordinate clause */
  conjunction?: boolean
}

export type SentenceKind = 'statement' | 'question' | 'wquestion' | 'imperative' | 'subordinate'

export interface SentenceExercise {
  kind: SentenceKind
  /** Fixed main clause in front of a subordinate clause, e.g. "Ich glaube," */
  prefix?: string
  /** Blocks in the (shuffled) order they are offered */
  parts: SentencePart[]
  /** The rule, shown once the sentence is right */
  tip: string
}

export const sentenceKinds: Record<SentenceKind, { label: string; end: string }> = {
  statement: { label: 'Aussage', end: '.' },
  question: { label: 'Ja-/Nein-Frage', end: '?' },
  wquestion: { label: 'W-Frage', end: '?' },
  imperative: { label: 'Aufforderung', end: '.' },
  subordinate: { label: 'Nebensatz', end: '.' },
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
    kind: 'statement',
    parts: [
      { text: 'behoben', role: 'Partizip II', last: true },
      { text: 'gestern', role: 'Zeitangabe', time: 1 },
      { text: 'den Bug', role: 'Objekt' },
      { text: 'wir', role: 'Subjekt', subject: true },
      { text: 'haben', role: 'Hilfsverb', finite: true },
    ],
    tip: 'Im Perfekt steht das Hilfsverb (haben oder sein) an Position 2, das Partizip ganz am Ende.',
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
  {
    kind: 'wquestion',
    parts: [
      { text: 'den Termin', role: 'Objekt' },
      { text: 'wir', role: 'Subjekt', subject: true },
      { text: 'verschieben', role: 'Infinitiv', last: true },
      { text: 'wann', role: 'Fragewort', wword: true },
      { text: 'können', role: 'Modalverb', finite: true },
    ],
    tip: 'W-Fragen beginnen mit dem Fragewort, das Verb steht an Position 2 – wie im Aussagesatz.',
  },
  {
    kind: 'wquestion',
    parts: [
      { text: 'das Protokoll', role: 'Objekt' },
      { text: 'übernimmt', role: 'Verb', finite: true },
      { text: 'heute', role: 'Zeitangabe', time: 1 },
      { text: 'wer', role: 'Fragewort (Subjekt)', wword: true },
    ],
    tip: 'Hier ist das Fragewort selbst das Subjekt: Wer …? Das Verb folgt direkt danach.',
  },
  {
    kind: 'imperative',
    parts: [
      { text: 'die Rechnung', role: 'Objekt (Akkusativ)' },
      { text: 'bitte', role: 'Höflichkeit' },
      { text: 'Sie', role: 'Subjekt', subject: true },
      { text: 'mir', role: 'Objekt (Dativ)', pronoun: true },
      { text: 'schicken', role: 'Verb', finite: true },
    ],
    tip: 'Die höfliche Aufforderung beginnt mit dem Verb, direkt danach steht „Sie“.',
  },
  {
    kind: 'imperative',
    parts: [
      { text: 'an', role: 'Verb, Teil 2', last: true },
      { text: 'morgen', role: 'Zeitangabe', time: 1 },
      { text: 'ruf', role: 'Verb, Teil 1', finite: true },
      { text: 'bitte', role: 'Höflichkeit' },
      { text: 'mich', role: 'Objekt (Akkusativ)', pronoun: true },
    ],
    tip: 'Mit du fällt das Pronomen weg: Ruf …! Trennbare Verben bilden auch hier eine Klammer.',
  },
  {
    kind: 'subordinate',
    prefix: 'Ich glaube,',
    parts: [
      { text: 'gefunden', role: 'Partizip II', last: true },
      { text: 'dass', role: 'Konjunktion', conjunction: true },
      { text: 'haben', role: 'Hilfsverb', finite: true },
      { text: 'den Fehler', role: 'Objekt' },
      { text: 'wir', role: 'Subjekt', subject: true },
    ],
    tip: 'Im Nebensatz steht das konjugierte Verb ganz am Ende – das Partizip direkt davor.',
  },
  {
    kind: 'subordinate',
    prefix: 'Das Release verschiebt sich,',
    parts: [
      { text: 'müssen', role: 'Modalverb', finite: true },
      { text: 'noch', role: 'Adverb' },
      { text: 'weil', role: 'Konjunktion', conjunction: true },
      { text: 'testen', role: 'Infinitiv', last: true },
      { text: 'wir', role: 'Subjekt', subject: true },
    ],
    tip: 'Nach weil, dass, wenn und ob wandert das konjugierte Verb ans Ende des Nebensatzes.',
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
  const subject = subjectAt > -1 ? parts[subjectAt]! : undefined
  const lastPart = exercise.parts.find((part) => part.last)

  switch (exercise.kind) {
    case 'question':
      if (finiteAt !== 0) {
        return `In einer Ja-/Nein-Frage steht das Verb „${finite.text}“ ganz vorne.`
      }
      if (subject && subjectAt !== 1) {
        return `In der Frage folgt das Subjekt „${subject.text}“ direkt auf das Verb.`
      }
      break
    case 'wquestion': {
      const wwordAt = parts.findIndex((part) => part.wword)
      if (wwordAt !== 0) {
        return `Die W-Frage beginnt mit dem Fragewort „${parts[wwordAt]!.text}“.`
      }
      if (finiteAt !== 1) {
        return `Nach dem Fragewort folgt direkt das Verb „${finite.text}“.`
      }
      if (subject && subjectAt !== 2) {
        return `Das Subjekt „${subject.text}“ steht direkt nach dem Verb.`
      }
      break
    }
    case 'imperative':
      if (finiteAt !== 0) {
        return `In der Aufforderung steht das Verb „${finite.text}“ ganz vorne.`
      }
      if (subject && subjectAt !== 1) {
        return `„${subject.text}“ folgt direkt auf das Verb.`
      }
      break
    case 'subordinate': {
      const conjunctionAt = parts.findIndex((part) => part.conjunction)
      if (conjunctionAt !== 0) {
        return `Der Nebensatz beginnt mit „${parts[conjunctionAt]!.text}“.`
      }
      if (finiteAt !== parts.length - 1) {
        return `Im Nebensatz steht das Verb „${finite.text}“ ganz am Ende.`
      }
      if (lastPart && parts.at(-2) !== lastPart) {
        return `„${lastPart.text}“ steht direkt vor „${finite.text}“ am Ende.`
      }
      if (subject && subjectAt !== 1) {
        return `Das Subjekt „${subject.text}“ folgt direkt auf „${parts[0]!.text}“.`
      }
      break
    }
    default: {
      // Statement: two time phrases may open it together ("Morgen um 9 Uhr haben wir …")
      const fieldSize = parts[0]!.time && parts[1]!.time ? 2 : 1
      if (finiteAt !== fieldSize) {
        return `Im Aussagesatz steht das Verb „${finite.text}“ an Position 2 – hier steht es an Position ${finiteAt + 1}.`
      }
      if (subject && subjectAt !== 0 && subjectAt !== finiteAt + 1) {
        return `Beginnt der Satz nicht mit dem Subjekt, steht „${subject.text}“ direkt nach dem Verb.`
      }
    }
  }

  if (exercise.kind !== 'subordinate' && lastPart && parts.at(-1) !== lastPart) {
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
  // Unstressed pronoun objects come as early as possible: right after the verb, or after the
  // subject when it follows the verb ("Schicken Sie mir …", "Kannst du mir …")
  const pronounAt = parts.findIndex((part) => part.pronoun)
  if (pronounAt > -1) {
    const anchor =
      exercise.kind === 'subordinate'
        ? Math.max(subjectAt, 0)
        : subjectAt > finiteAt
          ? subjectAt
          : finiteAt
    if (pronounAt !== anchor + 1) {
      return `Kurze Pronomen wie „${parts[pronounAt]!.text}“ stehen möglichst weit vorne – direkt nach „${parts[anchor]!.text}“.`
    }
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
