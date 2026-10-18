export type Article = 'der' | 'die' | 'das'

export const articles: readonly Article[] = ['der', 'die', 'das']

export const articleGender: Record<Article, string> = {
  der: 'maskulin',
  die: 'feminin',
  das: 'Neutrum',
}

export interface ArticleWord {
  word: string
  article: Article
  /** Short rule or memory aid shown after answering */
  tip: string
}

/** Workplace nouns for the "der, die oder das?" exercise on the material page */
export const workplaceWords: ArticleWord[] = [
  {
    word: 'Dienstplan',
    article: 'der',
    tip: 'Bei zusammengesetzten Wörtern entscheidet das letzte Wort: der Plan.',
  },
  {
    word: 'Besprechung',
    article: 'die',
    tip: 'Wörter auf -ung haben immer den Artikel die.',
  },
  {
    word: 'Werkzeug',
    article: 'das',
    tip: 'Das letzte Wort entscheidet: das Zeug.',
  },
  {
    word: 'Schicht',
    article: 'die',
    tip: 'Hier hilft keine Regel. Lernen Sie das Wort am besten gleich mit Artikel und Farbe.',
  },
  {
    word: 'Feierabend',
    article: 'der',
    tip: 'Tageszeiten sind maskulin: der Morgen, der Abend – also auch der Feierabend.',
  },
  {
    word: 'Gehalt',
    article: 'das',
    tip: 'Viele Wörter mit Ge- am Anfang sind neutral: das Gehalt, das Gespräch, das Gerät.',
  },
  {
    word: 'Pause',
    article: 'die',
    tip: 'Die meisten Wörter auf -e sind feminin: die Pause, die Woche, die Kasse.',
  },
  {
    word: 'Arbeitsvertrag',
    article: 'der',
    tip: 'Das letzte Wort entscheidet: der Vertrag.',
  },
]
