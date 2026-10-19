<script setup lang="ts">
/* Frame for one exercise module under /material: way back to the overview, title, intro. */
defineProps<{ title: string; lead: string }>()
</script>

<template>
  <main class="module">
    <header class="module-head">
      <NuxtLink to="/material" class="back">Alle Übungen</NuxtLink>
      <h1>{{ title }}</h1>
      <p class="lead">{{ lead }}</p>
    </header>
    <slot />
  </main>
</template>

<style scoped>
.module {
  display: grid;
  gap: var(--space-2xl);
  max-inline-size: var(--layout-wide);
  margin-inline: auto;
  padding: var(--space-xl) var(--layout-gutter) var(--space-section);
}

.module-head {
  display: grid;
  justify-items: start;
  gap: var(--space-sm);
  max-inline-size: var(--layout-measure);
}

.back {
  font-size: var(--text-sm);
  font-weight: var(--weight-strong);
}

.lead {
  font-size: var(--text-xl);
  line-height: var(--leading-snug);
}
</style>
