<script setup lang="ts">
withDefaults(
  defineProps<{
    to: string
    variant?: 'primary' | 'quiet'
  }>(),
  { variant: 'primary' },
)
</script>

<template>
  <NuxtLink :to="to" class="button" :class="`button--${variant}`">
    <slot />
  </NuxtLink>
</template>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--size-control);
  padding: var(--space-2xs) var(--space-md);
  border: var(--stroke-rule) solid var(--color-accent);
  border-radius: var(--radius-control);
  font-weight: var(--weight-strong);
  text-decoration: none;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast);
}

.button--primary {
  background: var(--color-accent);
  color: var(--color-text-on-accent);
}

.button--primary:hover {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  color: var(--color-text-on-accent);
}

.button--quiet {
  background: transparent;
  color: var(--color-accent);
}

.button--quiet:hover {
  background: var(--color-accent-subtle);
  color: var(--color-accent-hover);
}
</style>
