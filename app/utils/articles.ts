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

/** Nouns from IT teams for the "der, die oder das?" exercise on the material page */
export const workplaceWords: ArticleWord[] = [
  {
    word: 'Ticket',
    article: 'das',
    tip: 'Englische Wörter bekommen im Deutschen einen Artikel – oft das: das Ticket, das Meeting, das Feature.',
  },
  {
    word: 'Kunde',
    article: 'der',
    tip: 'Viele männliche Personen auf -e sind maskulin: der Kunde, der Kollege, der Experte.',
  },
  {
    word: 'Schnittstelle',
    article: 'die',
    tip: 'Bei zusammengesetzten Wörtern entscheidet das letzte Wort: die Stelle.',
  },
]
