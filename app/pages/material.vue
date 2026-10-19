<script setup lang="ts">
const { mailto } = useContact()

useSeoMeta({
  title: 'Lernmaterial – Pauline Stach',
  description:
    'Ein Ausschnitt aus dem Lernmaterial für Deutsch im IT-Arbeitsalltag: Übungen zu Artikeln, Satzbau und dem richtigen Ton. Das vollständige Material gibt es für Kundinnen und Kunden.',
})

/* What clients get beyond this preview */
const fullMaterial = [
  {
    title: 'Wortschatz für IT-Teams',
    text: 'Die wichtigsten Wörter aus Meetings, Tickets und Kundengesprächen – mit Artikel und Plural.',
  },
  {
    title: 'Grammatik auf einen Blick',
    text: 'Satzklammer, Perfekt und Nebensätze auf je einer Seite zum Ausdrucken.',
  },
  {
    title: 'Redemittel für Meetings und E-Mails',
    text: 'Fertige Sätze für Daily, Review und Retro – und für den Austausch mit Kunden.',
  },
  {
    title: 'Checklisten für die Prüfung',
    text: 'Was in der B1-Prüfung und im DTZ auf Sie zukommt – Teil für Teil.',
  },
]

const accessLink = mailto('Zugang zum Lernmaterial')
</script>

<template>
  <main class="page">
    <header class="page-head">
      <h1>Lernmaterial</h1>
      <p class="lead">
        Übungen und Übersichten für Deutsch im Arbeitsalltag – mit Beispielen aus Meetings, Tickets
        und Kundengesprächen.
      </p>
    </header>

    <section class="excerpt" aria-labelledby="excerpt-title">
      <header class="excerpt-head">
        <h2 id="excerpt-title">Ausschnitt</h2>
        <p>
          Hier können Sie einige Übungen ausprobieren. Das vollständige Material schalte ich für die
          Unternehmen frei, mit denen ich zusammenarbeite.
        </p>
      </header>

      <ArticleQuiz />
    </section>

    <section class="planned" aria-labelledby="planned-title">
      <h2 id="planned-title">Im vollständigen Material</h2>
      <ul class="planned-list">
        <li v-for="item in fullMaterial" :key="item.title">
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </li>
      </ul>
      <div class="access">
        <p>Ihr Team soll mit dem ganzen Material üben? Ich schalte den Zugang gern frei.</p>
        <BaseButton :to="accessLink">Zugang anfragen</BaseButton>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page {
  display: grid;
  gap: var(--space-2xl);
  max-inline-size: var(--layout-wide);
  margin-inline: auto;
  padding: var(--space-2xl) var(--layout-gutter) var(--space-section);
}

.page-head {
  display: grid;
  gap: var(--space-sm);
  max-inline-size: var(--layout-measure);
}

.lead {
  font-size: var(--text-xl);
  line-height: var(--leading-snug);
}

.excerpt {
  display: grid;
  gap: var(--space-2xl);
}

.excerpt-head {
  display: grid;
  gap: var(--space-xs);
  max-inline-size: var(--layout-measure);
}

.excerpt-head h2 {
  color: var(--color-heading-accent);
}

.planned {
  display: grid;
  gap: var(--space-lg);
  padding-block-start: var(--space-xl);
  border-block-start: var(--stroke-rule) solid var(--color-text);
}

.planned-list {
  display: grid;
  gap: var(--space-lg);
  margin: 0;
  padding: 0;
  list-style: none;
}

.planned-list li {
  display: grid;
  gap: var(--space-3xs);
}

.planned-list h3 {
  font-size: var(--text-xl);
}

.planned-list p {
  color: var(--color-text-muted);
}

@media (min-width: 52rem) {
  .planned-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

.access {
  display: grid;
  justify-items: start;
  gap: var(--space-sm);
  max-inline-size: var(--layout-measure);
}
</style>
