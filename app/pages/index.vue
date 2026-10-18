<script setup lang="ts">
const { email, consultationLink } = useContact()

useSeoMeta({
  title: 'Pauline Stach – Deutschtraining für Unternehmen',
  description:
    'Berufsbezogene Deutschkurse für Unternehmen und ihre internationalen Mitarbeitenden: Einzeltraining, Gruppenkurse und Prüfungsvorbereitung – vor Ort oder online.',
})

const credentials = [
  'Master of Education',
  '3 Jahre Goethe-Institut Irland',
  'BAMF-zugelassene Lehrkraft für Integrationskurse',
  'Erfahrung als Prüferin',
]

const situations = [
  'Bei der Schichtübergabe gehen Informationen verloren.',
  'Sicherheitsunterweisungen werden unterschrieben, aber nicht verstanden.',
  'Am Telefon mit Kundschaft fehlen die passenden Worte.',
  'Für die Anerkennung oder den Aufenthaltstitel wird ein B1- oder B2-Nachweis gebraucht.',
  'Neue Kolleginnen und Kollegen bleiben in Pausen und Besprechungen lieber still.',
]

const steps = [
  {
    title: 'Erstgespräch',
    text: 'Sie erzählen mir, wer Deutsch lernen soll, wofür und bis wann. Unverbindlich, am Telefon oder per Video.',
  },
  {
    title: 'Einstufung',
    text: 'Ich ermittle das Sprachniveau jeder Person nach dem Europäischen Referenzrahmen – schriftlich und im Gespräch.',
  },
  {
    title: 'Kursplan und Angebot',
    text: 'Sie erhalten einen Plan mit Zielen, Umfang und Terminen und ein verbindliches Angebot.',
  },
  {
    title: 'Unterricht',
    text: 'Vor Ort, online oder gemischt. Geübt wird mit Material aus Ihrem Betrieb: Dienstpläne, Formulare, echte Gesprächssituationen.',
  },
  {
    title: 'Rückmeldung',
    text: 'Regelmäßige Lernstandsberichte zeigen Ihnen die Fortschritte. Auf Wunsch mit Abschlusstest oder Prüfung.',
  },
]

const contactHints = [
  'wie viele Mitarbeitende Deutsch lernen sollen',
  'welches Niveau sie ungefähr haben',
  'in welchen Situationen sie Deutsch im Job brauchen',
  'ab wann und wo der Unterricht stattfinden soll',
]
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="hero">
      <div class="wrap hero-inner">
        <HeroSentence>
          <div class="hero-pitch">
            <p class="lead">
              Deutschkurse für Unternehmen und ihre internationalen Mitarbeitenden. Berufsbezogen,
              auf Ihre Branche zugeschnitten – als Einzeltraining oder in der Gruppe, vor Ort oder
              online.
            </p>
            <div class="actions">
              <BaseButton :to="consultationLink">Erstgespräch anfragen</BaseButton>
              <BaseButton to="/#angebot" variant="quiet">Angebot ansehen</BaseButton>
            </div>
          </div>
        </HeroSentence>

        <ul class="credentials" aria-label="Qualifikationen">
          <li v-for="item in credentials" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <!-- Who it is for -->
    <section id="fuer-wen" class="section" aria-labelledby="fuer-wen-title">
      <div class="wrap split">
        <div class="split-intro">
          <h2 id="fuer-wen-title">Die Fachkräfte sind da. Die Sprache kommt noch.</h2>
          <p class="text-lg">
            Sie haben internationale Mitarbeitende eingestellt oder planen es. Fachlich passt alles
            – aber im Alltag hakt es an der Sprache. Vielleicht kennen Sie das:
          </p>
        </div>
        <div>
          <ul class="situations">
            <li v-for="item in situations" :key="item">{{ item }}</li>
          </ul>
          <p class="text-lg after-list">
            Ich unterrichte die Sprache, die Ihr Team bei der Arbeit wirklich braucht – ob in
            Pflege, Handwerk, Logistik, Gastronomie, Industrie oder IT.
          </p>
        </div>
      </div>
    </section>

    <!-- Offer -->
    <section id="angebot" class="section section--subtle" aria-labelledby="angebot-title">
      <div class="wrap stack">
        <header class="section-head">
          <h2 id="angebot-title">Das Angebot</h2>
          <p class="text-lg">
            Drei Formate, die sich kombinieren lassen. Jedes beginnt mit einer Einstufung und wird
            auf Ihr Unternehmen zugeschnitten.
          </p>
        </header>

        <div class="entries">
          <OfferEntry
            article="das"
            syllables="Ein·zel·trai·ning"
            :details="[
              'Termine nach Ihrem Kalender, auch kurzfristig',
              'vor Ort, online oder gemischt',
              'Schwerpunkte frei wählbar: Gespräche, E-Mails, Fachsprache',
            ]"
            example="„Im Einzeltraining übt sie das Kundengespräch, das morgen ansteht.“"
          >
            <p>
              Unterricht für eine Person, abgestimmt auf ihre Aufgaben und ihr Tempo. Für Fach- und
              Führungskräfte, die schnell sicher werden müssen – vor Kundenterminen, Präsentationen
              oder der ersten Teamleitung.
            </p>
          </OfferEntry>

          <OfferEntry
            article="der"
            syllables="Grup·pen·kurs"
            :details="[
              'kleine Gruppen mit ähnlichem Niveau, von A1 bis C1',
              'fester Wochenrhythmus, gern vor oder nach der Schicht',
              'Lernstandsberichte für Sie als Arbeitgeber',
            ]"
            example="„Der Gruppenkurs findet dienstags nach der Frühschicht statt.“"
          >
            <p>
              Gemeinsamer Unterricht für mehrere Mitarbeitende, direkt in Ihrem Unternehmen oder
              online. Wortschatz und Situationen stammen aus Ihrem Arbeitsalltag, nicht aus dem
              Lehrbuch.
            </p>
          </OfferEntry>

          <OfferEntry
            article="die"
            syllables="Prü·fungs·vor·be·rei·tung"
            :details="[
              'für telc, Goethe-Zertifikat und den Deutsch-Test für Zuwanderer (DTZ)',
              'Modellprüfungen unter echten Bedingungen',
              'gezieltes Training für den mündlichen Teil',
            ]"
            example="„Die Prüfungsvorbereitung beginnt acht Wochen vor dem Termin.“"
          >
            <p>
              Gezieltes Training für eine Sprachprüfung, etwa für die Anerkennung im Beruf oder den
              Aufenthaltstitel. Mit dem Blick einer erfahrenen Prüferin: Ich weiß, worauf es in der
              Prüfung ankommt.
            </p>
          </OfferEntry>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section id="ablauf" class="section" aria-labelledby="ablauf-title">
      <div class="wrap stack">
        <header class="section-head">
          <h2 id="ablauf-title">So beginnen wir</h2>
          <p class="text-lg">In fünf Schritten vom ersten Gespräch zum laufenden Kurs.</p>
        </header>

        <ol class="steps">
          <li v-for="(step, index) in steps" :key="step.title" class="step">
            <span class="step-number" aria-hidden="true">{{ index + 1 }}</span>
            <h3 class="step-title">{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- About -->
    <section id="ueber-mich" class="section section--subtle" aria-labelledby="ueber-mich-title">
      <div class="wrap about">
        <!-- TODO: replace with a portrait photo, e.g. <img src="/pauline-stach.jpg" alt="…"> -->
        <div class="portrait" role="img" aria-label="Platzhalter für ein Porträtfoto">
          <span aria-hidden="true">PS</span>
        </div>

        <div class="about-text">
          <h2 id="ueber-mich-title">Über mich</h2>
          <p class="text-lg">
            Ich bin Pauline Stach, Deutschlehrerin mit einem Master of Education. Drei Jahre lang
            habe ich am Goethe-Institut in Irland unterrichtet. Heute leite ich als vom BAMF
            zugelassene Lehrkraft Integrationskurse und habe als Prüferin Sprachprüfungen
            abgenommen.
          </p>
          <p>
            Aus dieser Arbeit weiß ich: Erwachsene lernen am schnellsten, wenn die Sprache sofort
            nützlich ist. Deshalb baue ich jeden Kurs um die Situationen herum, die Ihre
            Mitarbeitenden wirklich erleben – und ich weiß aus der Prüferperspektive, was am Ende
            zählt.
          </p>
        </div>
      </div>
    </section>

    <!-- Learning material teaser -->
    <section id="material" class="section" aria-labelledby="material-title">
      <div class="wrap material">
        <div class="material-text">
          <h2 id="material-title">Lernmaterial</h2>
          <p class="text-lg">
            Kostenlose Übungen für Ihre Mitarbeitenden: Wortschatz für den Arbeitsplatz, Grammatik
            auf einen Blick und Tipps für die Prüfung. Den Anfang macht ein kleines Artikeltraining.
          </p>
          <BaseButton to="/material" variant="quiet">Zum Lernmaterial</BaseButton>
        </div>

        <ul class="sample-words" aria-label="Beispielwörter mit Artikel">
          <li><span class="article article--der">der</span> Dienstplan</li>
          <li><span class="article article--die">die</span> Schicht</li>
          <li><span class="article article--das">das</span> Werkzeug</li>
        </ul>
      </div>
    </section>

    <!-- Contact -->
    <section id="kontakt" class="section contact" aria-labelledby="kontakt-title">
      <div class="wrap contact-inner">
        <h2 id="kontakt-title">Erzählen Sie mir von Ihrem Team.</h2>
        <div class="contact-body">
          <p class="text-lg">Für ein gutes Angebot hilft mir zu wissen,</p>
          <ul class="hints">
            <li v-for="hint in contactHints" :key="hint">{{ hint }}.</li>
          </ul>
          <p>Ich melde mich mit einem Terminvorschlag für das Erstgespräch.</p>
          <div class="actions">
            <BaseButton :to="consultationLink">E-Mail schreiben</BaseButton>
            <a :href="`mailto:${email}`" class="contact-mail">{{ email }}</a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.wrap {
  max-inline-size: var(--layout-wide);
  margin-inline: auto;
  padding-inline: var(--layout-gutter);
}

.text-lg {
  font-size: var(--text-lg);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm);
}

/* Hero */
.hero-inner {
  display: grid;
  gap: var(--space-xl);
  padding-block: var(--space-2xl) var(--space-xl);
}

.hero-pitch {
  display: grid;
  gap: var(--space-md);
  max-inline-size: var(--layout-measure);
}

.lead {
  font-size: var(--text-xl);
  line-height: var(--leading-snug);
}

.credentials {
  display: grid;
  gap: var(--space-xs);
  margin: 0;
  padding: var(--space-md) 0 0;
  border-block-start: 1px solid var(--color-border);
  list-style: none;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: var(--weight-strong);
}

@media (min-width: 40rem) {
  .credentials {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .credentials {
    grid-template-columns: repeat(4, 1fr);
  }

  .credentials li + li {
    padding-inline-start: var(--space-sm);
    border-inline-start: 1px solid var(--color-border);
  }
}

/* Sections */
.section {
  padding-block: var(--space-section);
}

.section--subtle {
  background: var(--color-bg-subtle);
}

.stack {
  display: grid;
  gap: var(--space-xl);
}

.section-head {
  display: grid;
  gap: var(--space-sm);
  max-inline-size: var(--layout-measure);
}

.split {
  display: grid;
  gap: var(--space-lg) var(--space-2xl);
}

.split-intro {
  display: grid;
  align-content: start;
  gap: var(--space-sm);
}

@media (min-width: 60rem) {
  .split {
    grid-template-columns: 5fr 6fr;
  }
}

.situations {
  margin: 0;
  padding: 0;
  list-style: none;
  border-block-start: 1px solid var(--color-border-strong);
}

.situations li {
  padding-block: var(--space-sm);
  border-block-end: 1px solid var(--color-border);
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--weight-medium);
  line-height: var(--leading-snug);
}

.after-list {
  margin-block-start: var(--space-md);
  max-inline-size: var(--layout-measure);
}

/* Offer */
.entries {
  display: grid;
  gap: var(--space-md);
}

/* Process */
.steps {
  display: grid;
  gap: var(--space-lg);
  margin: 0;
  padding: 0;
  list-style: none;
}

.step {
  display: grid;
  align-content: start;
  gap: var(--space-2xs);
  padding-block-start: var(--space-sm);
  border-block-start: var(--stroke-rule) solid var(--color-text);
}

.step-number {
  color: var(--color-accent);
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--weight-display);
  line-height: var(--leading-display);
}

.step-title {
  font-size: var(--text-xl);
}

.step p {
  color: var(--color-text-muted);
}

@media (min-width: 40rem) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .steps {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* About */
.about {
  display: grid;
  gap: var(--space-xl) var(--space-2xl);
  align-items: start;
}

.portrait {
  display: grid;
  place-items: center;
  max-inline-size: var(--size-portrait);
  aspect-ratio: 4 / 5;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  color: var(--color-border-strong);
  font-family: var(--font-heading);
  font-size: var(--text-display);
  font-weight: var(--weight-display);
}

.about-text {
  display: grid;
  gap: var(--space-sm);
  max-inline-size: var(--layout-content);
}

@media (min-width: 52rem) {
  .about {
    grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
  }
}

/* Material teaser */
.material {
  display: grid;
  gap: var(--space-xl) var(--space-2xl);
  align-items: center;
}

.material-text {
  display: grid;
  justify-items: start;
  gap: var(--space-sm);
  max-inline-size: var(--layout-measure);
}

.sample-words {
  display: grid;
  gap: var(--space-2xs);
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-heading);
  font-size: var(--text-h1);
  font-weight: var(--weight-display);
  line-height: var(--leading-heading);
}

.article--der {
  color: var(--color-der);
}

.article--die {
  color: var(--color-die);
}

.article--das {
  color: var(--color-das);
}

@media (min-width: 52rem) {
  .material {
    grid-template-columns: 1fr 1fr;
  }
}

/* Contact */
.contact {
  border-block-start: 1px solid var(--color-border);
}

.contact-inner {
  display: grid;
  gap: var(--space-lg) var(--space-2xl);
}

.contact-inner h2 {
  font-size: var(--text-h1);
  max-inline-size: var(--layout-measure);
}

.contact-body {
  display: grid;
  gap: var(--space-sm);
  max-inline-size: var(--layout-measure);
}

.hints {
  display: grid;
  gap: var(--space-3xs);
  margin: 0;
  padding-inline-start: var(--space-md);
  list-style: square;
}

.hints li::marker {
  color: var(--color-accent);
}

.contact-body .actions {
  margin-block-start: var(--space-sm);
}

.contact-mail {
  font-weight: var(--weight-strong);
}

@media (min-width: 60rem) {
  .contact-inner {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
