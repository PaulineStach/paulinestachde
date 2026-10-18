<script setup lang="ts">
const { mailto } = useContact()

useSeoMeta({
  title: 'Lernmaterial – Pauline Stach',
  description:
    'Kostenlose Übungen für Deutsch am Arbeitsplatz: Artikeltraining mit Wörtern aus dem Berufsalltag, bald auch Wortschatzlisten und Grammatikübersichten.',
})

const planned = [
  {
    title: 'Wortschatz nach Branche',
    text: 'Die wichtigsten Wörter für Pflege, Logistik, Handwerk und Gastronomie – mit Artikel und Plural.',
  },
  {
    title: 'Grammatik auf einen Blick',
    text: 'Satzklammer, Perfekt und Nebensätze auf je einer Seite zum Ausdrucken.',
  },
  {
    title: 'Redemittel für Telefon und E-Mail',
    text: 'Fertige Sätze zum Nachfragen, Weiterleiten und höflichen Absagen.',
  },
  {
    title: 'Checklisten für die Prüfung',
    text: 'Was in der B1-Prüfung und im DTZ auf Sie zukommt – Teil für Teil.',
  },
]

const wishLink = mailto('Wunsch für Lernmaterial')
</script>

<template>
  <main class="page">
    <header class="page-head">
      <h1>Lernmaterial</h1>
      <p class="lead">
        Übungen und Übersichten für Deutsch am Arbeitsplatz. Frei nutzbar für Lernende und für
        Unternehmen, die ihr Team unterstützen wollen.
      </p>
    </header>

    <ArticleQuiz />

    <section class="planned" aria-labelledby="planned-title">
      <h2 id="planned-title">Weitere Materialien in Vorbereitung</h2>
      <ul class="planned-list">
        <li v-for="item in planned" :key="item.title">
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </li>
      </ul>
      <p class="wish">
        Sie wünschen sich ein bestimmtes Thema?
        <a :href="wishLink">Schreiben Sie mir</a>, dann kommt es auf die Liste.
      </p>
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

.wish {
  max-inline-size: var(--layout-measure);
}
</style>
