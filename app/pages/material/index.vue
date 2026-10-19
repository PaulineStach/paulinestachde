<script setup lang="ts">
const { mailto } = useContact()

useSeoMeta({
  title: 'Lernmaterial – Pauline Stach',
  description:
    'Kostenlose Übungen für Deutsch im IT-Arbeitsalltag: Vokabeln mit Artikel und Plural, Satzbau, Verben, Präpositionen in Firmentexten und Redewendungen.',
})

const wishLink = mailto('Wunsch für Lernmaterial')

/* The exercise modules, each on its own page */
const modules = [
  {
    to: '/material/vokabeln',
    title: 'Vokabeltrainer',
    text: 'Wörter aus Büro, Software, Meetings und Finanzen – mit Artikel und Plural.',
    meta: '95 Wörter in 7 Themen',
  },
  {
    to: '/material/satzbau',
    title: 'Satzbau',
    text: 'Aussagen, Fragen, Aufforderungen und Nebensätze aus Bausteinen bauen.',
    meta: '10 Sätze',
  },
  {
    to: '/material/verben',
    title: 'Verben',
    text: 'Präsens, Perfekt mit haben oder sein, trennbare Verben, Akkusativ und Dativ.',
    meta: '34 Verben',
  },
  {
    to: '/material/firmentexte',
    title: 'Firmentexte',
    text: 'Präpositionen in E-Mails und Produkttexten – und der richtige Ton: Sie oder du?',
    meta: '4 Texte, 29 Lücken',
  },
  {
    to: '/material/redewendungen',
    title: 'Redewendungen',
    text: '„Ich verstehe nur Bahnhof“ und andere Sätze, die man im Büro hört.',
    meta: '12 Redewendungen',
  },
]
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

    <section aria-labelledby="modules-title">
      <h2 id="modules-title" class="visually-hidden">Übungen</h2>
      <ul class="modules">
        <li v-for="item in modules" :key="item.to">
          <NuxtLink :to="item.to" class="module-card">
            <span class="module-title">{{ item.title }}</span>
            <span class="module-text">{{ item.text }}</span>
            <span class="module-meta">{{ item.meta }}</span>
          </NuxtLink>
        </li>
      </ul>
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

.modules {
  display: grid;
  gap: var(--space-sm);
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Each module is one big link */
.module-card {
  display: grid;
  align-content: start;
  gap: var(--space-xs);
  block-size: 100%;
  padding: var(--space-lg);
  border-radius: var(--radius-card);
  background: var(--color-card);
  color: var(--color-text);
  text-decoration: none;
  transition: background-color var(--transition-fast);
}

.module-card:hover {
  background: var(--color-accent-subtle);
  color: var(--color-text);
}

.module-title {
  color: var(--color-heading-accent);
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  font-weight: var(--weight-heading);
  line-height: var(--leading-heading);
}

.module-text {
  font-size: var(--text-lg);
  line-height: var(--leading-snug);
}

.module-meta {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

@media (min-width: 40rem) {
  .modules {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 64rem) {
  .modules {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.wish {
  max-inline-size: var(--layout-measure);
}
</style>
