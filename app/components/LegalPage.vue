<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <main class="legal">
    <h1>{{ title }}</h1>
    <slot />
  </main>
</template>

<style scoped>
.legal {
  display: grid;
  gap: var(--space-sm);
  max-inline-size: var(--layout-content);
  margin-inline: auto;
  padding: var(--space-2xl) var(--layout-gutter) var(--space-section);
}

.legal :slotted(h2) {
  margin-block-start: var(--space-md);
  font-size: var(--text-xl);
}
</style>
