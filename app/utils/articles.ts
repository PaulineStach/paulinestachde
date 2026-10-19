export type Article = 'der' | 'die' | 'das'

export const articles: readonly Article[] = ['der', 'die', 'das']

export const articleGender: Record<Article, string> = {
  der: 'maskulin',
  die: 'feminin',
  das: 'Neutrum',
}
