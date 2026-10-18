<script setup lang="ts">
/* Error page for 404s and every other error; it replaces app.vue, so it wraps itself in the layout. */
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const notFound = computed(() => props.error.status === 404)
const title = computed(() => (notFound.value ? 'Seite nicht gefunden' : 'Etwas ist schiefgelaufen'))

useSeoMeta({
  title: () => `${title.value} – Pauline Stach`,
  robots: 'noindex',
})
</script>

<template>
  <NuxtLayout>
    <main class="error-page">
      <p class="code">Fehler {{ error.status ?? 500 }}</p>
      <h1>{{ title }}</h1>
      <p v-if="notFound" class="lead">
        Diese Seite gibt es nicht oder nicht mehr. Vielleicht hat sich ein Tippfehler in die Adresse
        geschlichen.
      </p>
      <p v-else class="lead">
        Beim Laden der Seite ist ein Fehler aufgetreten. Bitte versuchen Sie es in einem Moment noch
        einmal.
      </p>
      <div class="actions">
        <BaseButton to="/">Zur Startseite</BaseButton>
        <BaseButton to="/material" variant="quiet">Zum Lernmaterial</BaseButton>
      </div>
    </main>
  </NuxtLayout>
</template>

<style scoped>
.error-page {
  display: grid;
  justify-items: start;
  gap: var(--space-sm);
  max-inline-size: var(--layout-content);
  margin-inline: auto;
  padding: var(--space-2xl) var(--layout-gutter) var(--space-section);
}

.code {
  color: var(--color-accent);
  font-weight: var(--weight-strong);
  font-variant-numeric: tabular-nums;
}

.lead {
  max-inline-size: var(--layout-measure);
  font-size: var(--text-xl);
  line-height: var(--leading-snug);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm);
  margin-block-start: var(--space-sm);
}
</style>
