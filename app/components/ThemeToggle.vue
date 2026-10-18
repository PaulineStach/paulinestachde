<script setup lang="ts">
/*
 * One button that cycles through the colour schemes: system → light → dark → system.
 * "System" removes data-theme so the prefers-color-scheme rules in semantic.css apply.
 */
type ThemeChoice = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'theme'
const order: ThemeChoice[] = ['system', 'light', 'dark']
const labels: Record<ThemeChoice, string> = {
  system: 'wie im System',
  light: 'hell',
  dark: 'dunkel',
}

const choice = ref<ThemeChoice>('system')
const next = computed(() => order[(order.indexOf(choice.value) + 1) % order.length]!)
const label = computed(
  () => `Farbschema: ${labels[choice.value]}. Wechseln zu ${labels[next.value]}.`,
)

function apply(value: ThemeChoice) {
  const root = document.documentElement
  if (value === 'system') delete root.dataset.theme
  else root.dataset.theme = value
  choice.value = value

  try {
    if (value === 'system') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Storage unavailable (e.g. private mode) – the choice simply isn't remembered
  }
}

onMounted(() => {
  const forced = document.documentElement.dataset.theme
  choice.value = forced === 'light' || forced === 'dark' ? forced : 'system'
})
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="label"
    :title="label"
    @click="apply(next)"
  >
    <!-- System: a screen -->
    <svg
      v-if="choice === 'system'"
      class="icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </svg>
    <!-- Light: a sun -->
    <svg
      v-else-if="choice === 'light'"
      class="icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
      />
    </svg>
    <!-- Dark: a crescent moon -->
    <svg v-else class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-grid;
  place-items: center;
  inline-size: var(--size-control);
  block-size: var(--size-control);
  padding: 0;
  border: 0;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.theme-toggle:hover {
  background: var(--color-bg-subtle);
  color: var(--color-text);
}

.icon {
  inline-size: var(--size-icon);
  block-size: var(--size-icon);
}
</style>
