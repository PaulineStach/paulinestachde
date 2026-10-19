/** Contact details and prepared mailto links, shared by header, sections and footer. */
export function useContact() {
  const { owner } = useAppConfig()

  const mailto = (subject: string, body = '') => {
    const params = new URLSearchParams({ subject })
    if (body) params.set('body', body)
    // URLSearchParams encodes spaces as "+", which mail clients show literally
    return `mailto:${owner.email}?${params.toString().replaceAll('+', '%20')}`
  }

  const consultationLink = mailto(
    'Anfrage Erstgespräch Deutschtraining',
    [
      'Guten Tag Frau Stach,',
      '',
      'wir interessieren uns für ein Deutschtraining.',
      '',
      'Unternehmen / Branche:',
      'Anzahl Teilnehmende:',
      'Ungefähres Sprachniveau:',
      'Wofür brauchen sie Deutsch im Job?',
      'Gewünschter Start:',
      '',
      'Viele Grüße',
    ].join('\n'),
  )

  return {
    email: owner.email,
    name: owner.name,
    calendly: owner.calendly,
    mailto,
    consultationLink,
  }
}
