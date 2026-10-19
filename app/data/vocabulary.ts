/*
 * Vocabulary for the trainer at /material/vokabeln: nouns from IT and office work, sorted by
 * topic, each with article and plural. Where standard German allows two articles or plurals
 * (Duden), both are listed and both count as right; the first one is shown as the answer.
 */
import type { Article } from '~/utils/articles'

export interface VocabularyWord {
  word: string
  article: Article
  /** Also correct, e.g. das Laptop next to der Laptop */
  altArticles?: Article[]
  /** Plural without article; several forms if all are standard. null: no plural in use */
  plural: string[] | null
  /** A rule or memory aid shown after answering */
  tip?: string
}

export interface VocabularyCategory {
  id: string
  title: string
  words: VocabularyWord[]
}

export const vocabularyCategories: VocabularyCategory[] = [
  {
    id: 'arbeitsplatz',
    title: 'Arbeitsplatz',
    words: [
      {
        word: 'Laptop',
        article: 'der',
        altArticles: ['das'],
        plural: ['Laptops'],
        tip: 'Beides ist richtig: der Laptop und das Laptop. Üblicher ist der.',
      },
      { word: 'Maus', article: 'die', plural: ['Mäuse'] },
      {
        word: 'Bildschirm',
        article: 'der',
        plural: ['Bildschirme'],
        tip: 'Das letzte Wort entscheidet: der Schirm.',
      },
      {
        word: 'Tastatur',
        article: 'die',
        plural: ['Tastaturen'],
        tip: 'Wörter auf -ur sind meist feminin: die Tastatur, die Struktur, die Reparatur.',
      },
      { word: 'Schreibtisch', article: 'der', plural: ['Schreibtische'] },
      { word: 'Stuhl', article: 'der', plural: ['Stühle'] },
      {
        word: 'Ladekabel',
        article: 'das',
        plural: ['Ladekabel'],
        tip: 'Wörter auf -el bleiben im Plural oft gleich: das Kabel – die Kabel.',
      },
      {
        word: 'Drucker',
        article: 'der',
        plural: ['Drucker'],
        tip: 'Geräte auf -er sind oft maskulin und haben keine Pluralendung: der Drucker – die Drucker.',
      },
      { word: 'Headset', article: 'das', plural: ['Headsets'] },
      { word: 'Kopfhörer', article: 'der', plural: ['Kopfhörer'] },
      { word: 'Büro', article: 'das', plural: ['Büros'] },
      {
        word: 'Kaffeemaschine',
        article: 'die',
        plural: ['Kaffeemaschinen'],
        tip: 'Das letzte Wort entscheidet: die Maschine.',
      },
      { word: 'Besprechungsraum', article: 'der', plural: ['Besprechungsräume'] },
      { word: 'Fenster', article: 'das', plural: ['Fenster'] },
    ],
  },
  {
    id: 'software',
    title: 'Software & Entwicklung',
    words: [
      { word: 'Code', article: 'der', plural: ['Codes'] },
      { word: 'Programm', article: 'das', plural: ['Programme'] },
      {
        word: 'Datenbank',
        article: 'die',
        plural: ['Datenbanken'],
        tip: 'Das letzte Wort entscheidet: die Bank.',
      },
      { word: 'Server', article: 'der', plural: ['Server'] },
      {
        word: 'Schnittstelle',
        article: 'die',
        plural: ['Schnittstellen'],
        tip: 'Das letzte Wort entscheidet: die Stelle.',
      },
      { word: 'Fehler', article: 'der', plural: ['Fehler'] },
      {
        word: 'Update',
        article: 'das',
        altArticles: ['der'],
        plural: ['Updates'],
        tip: 'Englische Wörter bekommen oft das: das Update, das Feature, das Ticket.',
      },
      {
        word: 'Version',
        article: 'die',
        plural: ['Versionen'],
        tip: 'Wörter auf -ion sind immer feminin: die Version, die Funktion, die Option.',
      },
      { word: 'Test', article: 'der', plural: ['Tests'] },
      {
        word: 'Anwendung',
        article: 'die',
        plural: ['Anwendungen'],
        tip: 'Wörter auf -ung sind immer feminin.',
      },
      { word: 'Passwort', article: 'das', plural: ['Passwörter'] },
      { word: 'Datei', article: 'die', plural: ['Dateien'] },
      { word: 'Ordner', article: 'der', plural: ['Ordner'] },
      { word: 'Feature', article: 'das', plural: ['Features'] },
      { word: 'Bug', article: 'der', plural: ['Bugs'] },
    ],
  },
  {
    id: 'meetings',
    title: 'Meetings & agiles Arbeiten',
    words: [
      { word: 'Meeting', article: 'das', plural: ['Meetings'] },
      { word: 'Besprechung', article: 'die', plural: ['Besprechungen'] },
      { word: 'Sprint', article: 'der', plural: ['Sprints'] },
      { word: 'Ticket', article: 'das', plural: ['Tickets'] },
      {
        word: 'Aufgabe',
        article: 'die',
        plural: ['Aufgaben'],
        tip: 'Die meisten Wörter auf -e sind feminin: die Aufgabe, die Frage, die Pause.',
      },
      { word: 'Termin', article: 'der', plural: ['Termine'] },
      { word: 'Frist', article: 'die', plural: ['Fristen'] },
      { word: 'Ziel', article: 'das', plural: ['Ziele'] },
      { word: 'Präsentation', article: 'die', plural: ['Präsentationen'] },
      { word: 'Protokoll', article: 'das', plural: ['Protokolle'] },
      { word: 'Tagesordnung', article: 'die', plural: ['Tagesordnungen'] },
      { word: 'Vorschlag', article: 'der', plural: ['Vorschläge'] },
      { word: 'Entscheidung', article: 'die', plural: ['Entscheidungen'] },
      { word: 'Team', article: 'das', plural: ['Teams'] },
    ],
  },
  {
    id: 'kunden',
    title: 'Kunden & Vertrieb',
    words: [
      {
        word: 'Kunde',
        article: 'der',
        plural: ['Kunden'],
        tip: 'Männliche Personen auf -e sind maskulin: der Kunde, der Kollege.',
      },
      {
        word: 'Kundin',
        article: 'die',
        plural: ['Kundinnen'],
        tip: 'Die weibliche Form auf -in ist immer feminin, im Plural -innen.',
      },
      { word: 'Angebot', article: 'das', plural: ['Angebote'] },
      { word: 'Vertrag', article: 'der', plural: ['Verträge'] },
      { word: 'Anfrage', article: 'die', plural: ['Anfragen'] },
      { word: 'Rechnung', article: 'die', plural: ['Rechnungen'] },
      { word: 'Preis', article: 'der', plural: ['Preise'] },
      { word: 'Lieferung', article: 'die', plural: ['Lieferungen'] },
      { word: 'Produkt', article: 'das', plural: ['Produkte'] },
      { word: 'Beschwerde', article: 'die', plural: ['Beschwerden'] },
      { word: 'Rabatt', article: 'der', plural: ['Rabatte'] },
      { word: 'Bestellung', article: 'die', plural: ['Bestellungen'] },
    ],
  },
  {
    id: 'finanzen',
    title: 'Finanzen & FinTech',
    words: [
      { word: 'Konto', article: 'das', plural: ['Konten', 'Kontos'] },
      { word: 'Zahlung', article: 'die', plural: ['Zahlungen'] },
      { word: 'Überweisung', article: 'die', plural: ['Überweisungen'] },
      { word: 'Betrag', article: 'der', plural: ['Beträge'] },
      { word: 'Gebühr', article: 'die', plural: ['Gebühren'] },
      { word: 'Kredit', article: 'der', plural: ['Kredite'] },
      { word: 'Bank', article: 'die', plural: ['Banken'] },
      { word: 'Karte', article: 'die', plural: ['Karten'] },
      {
        word: 'Zins',
        article: 'der',
        plural: ['Zinsen'],
        tip: 'Meist hört man den Plural: die Zinsen.',
      },
      { word: 'Budget', article: 'das', plural: ['Budgets'] },
      { word: 'Steuer', article: 'die', plural: ['Steuern'] },
      { word: 'Umsatz', article: 'der', plural: ['Umsätze'] },
      { word: 'Transaktion', article: 'die', plural: ['Transaktionen'] },
      { word: 'Risiko', article: 'das', plural: ['Risiken', 'Risikos'] },
    ],
  },
  {
    id: 'personal',
    title: 'Personal & Arbeitsalltag',
    words: [
      { word: 'Urlaub', article: 'der', plural: ['Urlaube'] },
      { word: 'Krankmeldung', article: 'die', plural: ['Krankmeldungen'] },
      {
        word: 'Gehalt',
        article: 'das',
        plural: ['Gehälter'],
        tip: 'Viele Wörter mit Ge- am Anfang sind neutral: das Gehalt, das Gespräch, das Gerät.',
      },
      { word: 'Arbeitsvertrag', article: 'der', plural: ['Arbeitsverträge'] },
      { word: 'Überstunde', article: 'die', plural: ['Überstunden'] },
      {
        word: 'Feierabend',
        article: 'der',
        plural: ['Feierabende'],
        tip: 'Tageszeiten sind maskulin: der Morgen, der Abend – also auch der Feierabend.',
      },
      { word: 'Pause', article: 'die', plural: ['Pausen'] },
      { word: 'Kollege', article: 'der', plural: ['Kollegen'] },
      { word: 'Kollegin', article: 'die', plural: ['Kolleginnen'] },
      { word: 'Führungskraft', article: 'die', plural: ['Führungskräfte'] },
      { word: 'Homeoffice', article: 'das', plural: ['Homeoffices'] },
      { word: 'Schulung', article: 'die', plural: ['Schulungen'] },
      { word: 'Bewerbung', article: 'die', plural: ['Bewerbungen'] },
      { word: 'Vorstellungsgespräch', article: 'das', plural: ['Vorstellungsgespräche'] },
    ],
  },
  {
    id: 'kommunikation',
    title: 'Kommunikation',
    words: [
      { word: 'E-Mail', article: 'die', plural: ['E-Mails'] },
      { word: 'Anruf', article: 'der', plural: ['Anrufe'] },
      { word: 'Nachricht', article: 'die', plural: ['Nachrichten'] },
      { word: 'Anhang', article: 'der', plural: ['Anhänge'] },
      { word: 'Betreff', article: 'der', plural: ['Betreffe'] },
      { word: 'Antwort', article: 'die', plural: ['Antworten'] },
      { word: 'Frage', article: 'die', plural: ['Fragen'] },
      { word: 'Telefonat', article: 'das', plural: ['Telefonate'] },
      { word: 'Chat', article: 'der', plural: ['Chats'] },
      { word: 'Videokonferenz', article: 'die', plural: ['Videokonferenzen'] },
      { word: 'Link', article: 'der', altArticles: ['das'], plural: ['Links'] },
      { word: 'Rückmeldung', article: 'die', plural: ['Rückmeldungen'] },
    ],
  },
]
