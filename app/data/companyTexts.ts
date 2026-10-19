/*
 * Texts for the preposition exercise at /material/firmentexte: everyday company texts from
 * IT and FinTech work. A text is a list of segments – plain text, or a gap with the right
 * preposition, the choices offered and a short explanation.
 */

export interface Gap {
  answer: string
  options: string[]
  explanation: string
}

export type Segment = string | Gap

export interface CompanyText {
  id: string
  title: string
  /** What kind of text it is, shown above it */
  kind: string
  segments: Segment[]
}

export const companyTexts: CompanyText[] = [
  {
    id: 'demo',
    title: 'Termin für eine Produktdemo',
    kind: 'E-Mail an eine Kundin',
    segments: [
      'Sehr geehrte Frau Schmidt,\n\nvielen Dank ',
      { answer: 'für', options: ['für', 'an', 'über'], explanation: 'Dank für + Akkusativ.' },
      ' Ihre Anfrage. Gern stelle ich Ihnen unser Produkt ',
      {
        answer: 'in',
        options: ['in', 'an', 'auf'],
        explanation: 'in einer Online-Demo – wie in einem Meeting.',
      },
      ' einer Online-Demo vor. Passt es Ihnen ',
      { answer: 'am', options: ['am', 'im', 'um'], explanation: 'Wochentage: am Dienstag.' },
      ' Dienstag ',
      { answer: 'um', options: ['um', 'am', 'im'], explanation: 'Uhrzeit: um 10 Uhr.' },
      ' 10 Uhr? Den Link ',
      {
        answer: 'zum',
        options: ['zum', 'zur', 'im'],
        explanation: 'das Meeting → zu dem Meeting = zum Meeting.',
      },
      ' Meeting schicke ich Ihnen ',
      {
        answer: 'nach',
        options: ['nach', 'seit', 'vor'],
        explanation: 'nach + Dativ: erst kommt Ihre Bestätigung, dann der Link.',
      },
      ' Ihrer Bestätigung.\n\nIch freue mich ',
      {
        answer: 'auf',
        options: ['auf', 'über', 'an'],
        explanation:
          'sich freuen auf – auf etwas, das noch kommt. (sich freuen über – über etwas, das schon da ist.)',
      },
      ' das Gespräch.\n\nMit freundlichen Grüßen\nPauline Stach',
    ],
  },
  {
    id: 'produkt',
    title: 'Alle Finanzen in einer App',
    kind: 'Produktbeschreibung',
    segments: [
      'Mit unserer App behalten Sie Ihre Finanzen ',
      {
        answer: 'im',
        options: ['im', 'am', 'auf'],
        explanation: 'etwas im Blick behalten – eine feste Wendung.',
      },
      ' Blick. Sie verbinden Ihre Konten ',
      {
        answer: 'mit',
        options: ['mit', 'von', 'bei'],
        explanation: 'mit wenigen Klicks – womit? mit + Dativ.',
      },
      ' wenigen Klicks und sehen alle Zahlungen ',
      {
        answer: 'auf',
        options: ['auf', 'in', 'mit'],
        explanation: 'auf einen Blick – eine feste Wendung.',
      },
      ' einen Blick. ',
      {
        answer: 'Bei',
        options: ['Bei', 'Mit', 'Zu'],
        explanation: 'Bei Fragen … = Wenn Sie Fragen haben, …',
      },
      ' Fragen hilft Ihnen unser Support-Team – ',
      {
        answer: 'von',
        options: ['von', 'seit', 'um'],
        explanation: 'von … bis: ein Zeitraum mit Anfang und Ende.',
      },
      ' Montag ',
      { answer: 'bis', options: ['bis', 'zu', 'nach'], explanation: 'von Montag bis Freitag.' },
      ' Freitag. Ihre Daten speichern wir ausschließlich ',
      {
        answer: 'in',
        options: ['in', 'auf', 'an'],
        explanation: 'Ort: in Rechenzentren in Deutschland (in + Dativ).',
      },
      ' Rechenzentren in Deutschland.',
    ],
  },
  {
    id: 'team',
    title: 'Neue Zeit fürs Daily',
    kind: 'Nachricht ans Team',
    segments: [
      'Hallo zusammen,\n\n',
      {
        answer: 'ab',
        options: ['ab', 'seit', 'bis'],
        explanation:
          'ab nächster Woche: von da an gilt es (Zukunft). seit: von der Vergangenheit bis jetzt.',
      },
      ' nächster Woche findet unser Daily ',
      { answer: 'um', options: ['um', 'am', 'in'], explanation: 'Uhrzeit: um 9:30 Uhr.' },
      ' 9:30 Uhr statt. Wir treffen uns ',
      {
        answer: 'im',
        options: ['im', 'am', 'ins'],
        explanation: 'Wo? in + Dativ: in dem Raum = im Raum. (Wohin? ins = in das)',
      },
      ' Besprechungsraum 2. Wer ',
      {
        answer: 'im',
        options: ['im', 'am', 'zum'],
        explanation: 'im Homeoffice sein – wo? in + Dativ.',
      },
      ' Homeoffice ist, wählt sich ',
      {
        answer: 'über',
        options: ['über', 'von', 'mit'],
        explanation: 'über den Link – auf diesem Weg.',
      },
      ' den Link im Kalender ein.\n\nBitte tragt euch ',
      {
        answer: 'bis',
        options: ['bis', 'um', 'seit'],
        explanation: 'bis Freitag: spätestens am Freitag.',
      },
      ' Freitag ',
      {
        answer: 'in',
        options: ['in', 'zu', 'an'],
        explanation: 'sich in eine Liste eintragen – wohin? in + Akkusativ.',
      },
      ' die Liste für die Retro ein. Danke ',
      { answer: 'für', options: ['für', 'an', 'zu'], explanation: 'Danke für + Akkusativ.' },
      ' eure Unterstützung!',
    ],
  },
  {
    id: 'support',
    title: 'Fehler in der App',
    kind: 'Antwort des Supports',
    segments: [
      'Guten Tag Herr Weber,\n\nvielen Dank ',
      { answer: 'für', options: ['für', 'von', 'an'], explanation: 'Dank für + Akkusativ.' },
      ' Ihre Nachricht. Wir arbeiten bereits ',
      {
        answer: 'an',
        options: ['an', 'auf', 'mit'],
        explanation: 'an etwas arbeiten – an + Dativ.',
      },
      ' einer Lösung ',
      { answer: 'für', options: ['für', 'zu', 'mit'], explanation: 'eine Lösung für ein Problem.' },
      ' das Problem. Das Update erscheint voraussichtlich ',
      {
        answer: 'in',
        options: ['in', 'vor', 'seit'],
        explanation: 'in zwei Wochen: von heute aus in der Zukunft.',
      },
      ' zwei Wochen. ',
      {
        answer: 'Bis',
        options: ['Bis', 'Ab', 'Seit'],
        explanation: 'Bis dahin: in der Zeit bis zum Update.',
      },
      ' dahin können Sie die Funktion ',
      {
        answer: 'über',
        options: ['über', 'mit', 'in'],
        explanation: 'über das Menü – auf diesem Weg.',
      },
      ' das Menü „Einstellungen“ ausschalten. Wir melden uns ',
      {
        answer: 'bei',
        options: ['bei', 'zu', 'an'],
        explanation: 'sich bei jemandem melden – bei + Dativ.',
      },
      ' Ihnen, sobald das Update verfügbar ist.\n\nFreundliche Grüße\nIhr Support-Team',
    ],
  },
]
