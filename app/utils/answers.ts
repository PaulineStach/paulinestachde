/* Comparing typed answers in the exercises */

export type AnswerResult = 'exact' | 'spelling' | 'wrong'

/** Lower case, with ä/ö/ü/ß written as ae/oe/ue/ss – for keyboards without umlauts */
function foldUmlauts(text: string) {
  return text
    .toLowerCase()
    .replaceAll('ä', 'ae')
    .replaceAll('ö', 'oe')
    .replaceAll('ü', 'ue')
    .replaceAll('ß', 'ss')
}

/**
 * Compares a typed answer with the accepted forms, ignoring case and outer spaces.
 * "spelling" means right apart from ae/oe/ue/ss for an umlaut – it counts, but the
 * correct spelling should be shown.
 */
export function compareAnswer(typed: string, accepted: string[]): AnswerResult {
  const answer = typed.trim().replace(/\s+/g, ' ')
  if (accepted.some((form) => form.toLowerCase() === answer.toLowerCase())) return 'exact'
  if (accepted.some((form) => foldUmlauts(form) === foldUmlauts(answer))) return 'spelling'
  return 'wrong'
}
