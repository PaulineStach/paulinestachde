<script setup lang="ts">
const { consultationLink } = useContact()

useSeoMeta({
  title: 'Pauline Stach – Deutschtraining für Unternehmen',
  description:
    'Berufsbezogene Deutschkurse für Unternehmen und ihre internationalen Mitarbeitenden: Einzeltraining, Gruppenkurse und Prüfungsvorbereitung – vor Ort oder online.',
})

/* What a company can rely on – each with a line icon (24×24 paths) */
const promises = [
  {
    text: 'BAMF-zugelassene Lehrkraft mit Erfahrung als Prüferin',
    icon: 'M5.5 3h13A1.5 1.5 0 0 1 20 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5v-15A1.5 1.5 0 0 1 5.5 3ZM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-2 5.5L9 17l3-1.5 3 1.5-1-4.5',
  },
  {
    text: 'Geübt wird mit Material aus Ihrem Betrieb',
    icon: 'M6.5 4H5.5A1.5 1.5 0 0 0 4 5.5v14A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5v-14A1.5 1.5 0 0 0 18.5 4h-1M9 3h6v2.5H9V3Zm-1 8.5h8M8 15h8M8 18.5h4.5',
  },
  {
    text: 'Klarer Kursplan und ein verbindliches Angebot',
    icon: 'M5 5h14a1.5 1.5 0 0 1 1.5 1.5v12.5A1.5 1.5 0 0 1 19 20.5H5A1.5 1.5 0 0 1 3.5 19V6.5A1.5 1.5 0 0 1 5 5Zm-1.5 4.5h17M8 3v4M16 3v4m-8.5 6h2m2 0h2m2 0h2m-9 3.5h2m2 0h2',
  },
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
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="hero">
      <div class="wrap hero-inner">
        <div class="hero-text">
          <p class="hero-intro">
            Berufsbezogene Deutschkurse für Unternehmen und ihre internationalen Mitarbeitenden
          </p>
          <div class="hero-pitch">
            <h1 class="hero-title">
              <span class="hero-accent">Deutsch</span>, das im Betrieb ankommt
            </h1>
            <p class="lead">
              Auf Ihre Branche zugeschnitten – als Einzeltraining oder in der Gruppe, vor Ort oder
              online.
            </p>
            <div class="actions">
              <BaseButton :to="consultationLink">Erstgespräch anfragen</BaseButton>
            </div>
          </div>
        </div>

        <ChalkBoard class="hero-board">
          <figure class="chalk-quote">
            <blockquote>
              <p class="chalk-text">
                „Die Grenzen meiner <span class="chalk-mark">Sprache</span> bedeuten die Grenzen
                meiner <span class="chalk-mark">Welt</span>.“
              </p>
            </blockquote>
            <figcaption class="chalk-source">
              Ludwig Wittgenstein, <cite>Tractatus logico-philosophicus</cite> 5.6
            </figcaption>
          </figure>
        </ChalkBoard>
      </div>
    </section>

    <!-- What a company can rely on -->
    <section class="section section--promises" aria-labelledby="versprechen-title">
      <div class="wrap stack">
        <header class="section-head">
          <h2 id="versprechen-title" class="accent-title">
            Deutschtraining, das zu Ihrem Betrieb passt
          </h2>
          <p class="text-lg">
            Vom Einzeltraining bis zum Gruppenkurs – mit Wortschatz und Situationen aus Ihrem
            Arbeitsalltag.
          </p>
        </header>
        <ul class="cards">
          <li v-for="item in promises" :key="item.text" class="card">
            <svg
              class="card-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path :d="item.icon" />
            </svg>
            <p class="card-text">{{ item.text }}</p>
          </li>
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
    <section id="kontakt" class="section" aria-labelledby="kontakt-title">
      <div class="wrap">
        <ContactPanel />
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

/* Hero: text on the left, the chalkboard on the right */
.hero-inner {
  display: grid;
  gap: var(--space-lg) var(--space-xl);
  padding-block: var(--space-lg) var(--space-xl);
}

.hero-text {
  display: grid;
  align-content: space-between;
  gap: var(--space-xl);
}

.hero-intro {
  max-inline-size: 30ch;
  font-size: var(--text-sm);
}

.hero-pitch {
  display: grid;
  justify-items: start;
  gap: var(--space-md);
  max-inline-size: var(--layout-measure);
}

.hero-title {
  font-size: var(--text-display);
  line-height: var(--leading-display);
  letter-spacing: var(--tracking-display);
}

.hero-accent {
  color: var(--color-accent);
}

/* The quote, written on the board in chalk */
.chalk-quote {
  display: grid;
  align-content: center;
  gap: var(--space-md);
  margin: 0;
  font-family: var(--font-hand);
}

.chalk-quote blockquote {
  margin: 0;
}

.chalk-text {
  font-size: var(--text-chalk);
  font-weight: var(--weight-medium);
  line-height: var(--leading-snug);
}

.chalk-mark {
  text-decoration: underline var(--color-chalk-accent);
  text-decoration-thickness: var(--stroke-rule);
  text-underline-offset: 0.18em;
}

.chalk-source {
  color: var(--color-chalk-muted);
  font-size: var(--text-xl);
}

.hero-board {
  min-block-size: 24rem;
}

@media (min-width: 52rem) {
  .hero-inner {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .hero-board {
    min-block-size: 34rem;
  }
}

.lead {
  font-size: var(--text-xl);
  line-height: var(--leading-snug);
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

/* Promises: a green headline and three soft green cards */
.section--promises {
  padding-block-start: var(--space-xl);
}

.section--promises .section-head {
  max-inline-size: none;
}

.accent-title {
  color: var(--color-heading-accent);
  font-size: var(--text-h1);
  letter-spacing: var(--tracking-display);
}

.cards {
  display: grid;
  gap: var(--space-sm);
  margin: 0;
  padding: 0;
  list-style: none;
}

.card {
  display: grid;
  align-content: space-between;
  gap: var(--space-xl);
  min-block-size: var(--size-card);
  padding: var(--space-lg);
  border-radius: var(--radius-card);
  background: var(--color-card);
}

.card-icon {
  inline-size: var(--size-card-icon);
  block-size: var(--size-card-icon);
}

.card-text {
  max-inline-size: 22ch;
  font-size: var(--text-xl);
  line-height: var(--leading-snug);
}

@media (min-width: 52rem) {
  .cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
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
</style>
