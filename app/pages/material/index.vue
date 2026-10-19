<script setup lang="ts">
const { mailto } = useContact()

useSeoMeta({
  title: 'Lernmaterial – Pauline Stach',
  description:
    'Kostenlose Übungen für Deutsch im IT-Arbeitsalltag: Vokabeln mit Artikel und Plural, Satzbau, Verben, Präpositionen in Firmentexten und Redewendungen.',
})

const wishLink = mailto('Wunsch für Lernmaterial')
</script>

<template>
  <main class="page">
    <header class="page-head">
      <h1>Lernmaterial</h1>
      <p class="lead">
        Kostenlose Übungen für Deutsch im Arbeitsalltag – mit Beispielen aus Meetings, Tickets und
        Kundengesprächen. Frei nutzbar für Lernende und für Teams.
      </p>
    </header>

    <section class="excerpt" aria-labelledby="excerpt-title">
      <h2 id="excerpt-title" class="visually-hidden">Übungen</h2>

      <ArticleQuiz />
      <RegisterSort />
    </section>

    <p class="wish">
      Sie wünschen sich ein bestimmtes Thema?
      <a :href="wishLink">Schreiben Sie mir</a>, dann kommt es auf die Liste.
    </p>
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

.wish {
  max-inline-size: var(--layout-measure);
}
</style>
