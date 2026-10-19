/*
 * German idioms for the exercise at /material/redewendungen: three possible meanings, one
 * right, and an example sentence from everyday office and IT work.
 */

export interface Idiom {
  phrase: string
  options: string[]
  /** Index of the right meaning in options */
  answer: number
  example: string
}

export const idioms: Idiom[] = [
  {
    phrase: 'Ich glaube, mein Schwein pfeift!',
    options: ['Ich bin sehr müde.', 'Das kann ich nicht glauben!', 'Ich habe ein Haustier.'],
    answer: 1,
    example: 'Der Kunde will das ganze Projekt bis morgen? Ich glaube, mein Schwein pfeift!',
  },
  {
    phrase: 'Ich verstehe nur Bahnhof.',
    options: [
      'Ich verstehe gar nichts.',
      'Ich muss gleich zum Zug.',
      'Ich spreche gern über Reisen.',
    ],
    answer: 0,
    example: 'Der Kollege erklärt die neue Architektur – und ich verstehe nur Bahnhof.',
  },
  {
    phrase: 'Das ist nicht mein Bier.',
    options: [
      'Das schmeckt mir nicht.',
      'Ich trinke keinen Alkohol.',
      'Dafür bin ich nicht zuständig.',
    ],
    answer: 2,
    example: 'Die Rechnungen? Das ist nicht mein Bier – frag am besten in der Buchhaltung.',
  },
  {
    phrase: 'Tomaten auf den Augen haben',
    options: ['sehr müde sein', 'etwas Offensichtliches nicht sehen', 'gerade verliebt sein'],
    answer: 1,
    example: 'Der Fehler steht doch in Zeile 3 – hast du Tomaten auf den Augen?',
  },
  {
    phrase: 'den Nagel auf den Kopf treffen',
    options: ['genau das Richtige sagen', 'einen großen Fehler machen', 'sehr hart arbeiten'],
    answer: 0,
    example: 'Mit deinem Vorschlag in der Retro hast du den Nagel auf den Kopf getroffen.',
  },
  {
    phrase: 'auf dem Schlauch stehen',
    options: ['lange warten müssen', 'früh Feierabend haben', 'etwas gerade nicht verstehen'],
    answer: 2,
    example: 'Sorry, ich stehe gerade auf dem Schlauch – welches Ticket meinst du?',
  },
  {
    phrase: 'um den heißen Brei herumreden',
    options: [
      'nicht direkt sagen, was man meint',
      'zu schnell sprechen',
      'in der Mittagspause zu viel essen',
    ],
    answer: 0,
    example: 'Bitte nicht um den heißen Brei herumreden: Schaffen wir das Release bis Freitag?',
  },
  {
    phrase: 'ins Fettnäpfchen treten',
    options: [
      'zu spät zum Meeting kommen',
      'aus Versehen etwas Unpassendes sagen',
      'in der Kantine stolpern',
    ],
    answer: 1,
    example:
      'Ich habe die neue Chefin für eine Praktikantin gehalten – da bin ich voll ins Fettnäpfchen getreten.',
  },
  {
    phrase: 'Alles in Butter!',
    options: ['Alles ist kaputt.', 'Alles ist zu teuer.', 'Alles ist in Ordnung.'],
    answer: 2,
    example: 'Der Server läuft wieder – alles in Butter!',
  },
  {
    phrase: 'jemandem auf den Keks gehen',
    options: ['jemanden nerven', 'jemandem etwas Süßes schenken', 'jemanden zu Hause besuchen'],
    answer: 0,
    example: 'Die ständigen Benachrichtigungen im Chat gehen mir echt auf den Keks.',
  },
  {
    phrase: 'die Kuh vom Eis holen',
    options: ['Urlaub machen', 'ein schwieriges Problem lösen', 'einen Fehler verstecken'],
    answer: 1,
    example: 'Das Support-Team hat die Kuh vom Eis geholt – der Kunde ist wieder zufrieden.',
  },
  {
    phrase: 'Da steppt der Bär!',
    options: ['Da ist es gefährlich.', 'Da ist es sehr ruhig.', 'Da ist richtig viel los.'],
    answer: 2,
    example: 'Auf der Weihnachtsfeier von unserem Team steppt jedes Jahr der Bär.',
  },
]
