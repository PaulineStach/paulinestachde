<script setup lang="ts">
const links = [
  { to: '/#angebot', label: 'Angebot' },
  { to: '/#ablauf', label: 'Ablauf' },
  { to: '/#ueber-mich', label: 'Über mich' },
  { to: '/material', label: 'Lernmaterial' },
  { to: '/#kontakt', label: 'Kontakt' },
]

const menuOpen = ref(false)
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')
const route = useRoute()

// Close the mobile menu after navigating (also covers same-page anchor links)
watch(
  () => route.fullPath,
  () => (menuOpen.value = false),
)

function closeOnEscape(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !menuOpen.value) return
  menuOpen.value = false
  menuButton.value?.focus()
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))
onBeforeUnmount(() => document.removeEventListener('keydown', closeOnEscape))
</script>

<template>
  <header class="site-header">
    <div class="inner">
      <NuxtLink to="/" class="wordmark">
        <LogoMark />
        <span class="wordmark-text">
          <span class="wordmark-name">Pauline Stach</span>
          <span class="wordmark-tagline">Deutsch für den Beruf</span>
        </span>
      </NuxtLink>

      <div class="controls">
        <ThemeToggle />
        <button
          ref="menuButton"
          type="button"
          class="menu-button"
          :aria-expanded="menuOpen"
          aria-controls="hauptnavigation"
          @click="menuOpen = !menuOpen"
        >
          <span class="visually-hidden">Menü</span>
          <span class="burger" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav
        id="hauptnavigation"
        class="nav"
        :class="{ 'is-open': menuOpen }"
        aria-label="Hauptnavigation"
      >
        <ul class="nav-list">
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to" class="nav-link" @click="menuOpen = false">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  border-block-end: 1px solid var(--color-border);
}

.inner {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    'brand controls'
    'nav nav';
  align-items: center;
  column-gap: var(--space-md);
  max-inline-size: var(--layout-wide);
  margin-inline: auto;
  padding: var(--space-sm) var(--layout-gutter);
}

.wordmark {
  grid-area: brand;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text);
  text-decoration: none;
  line-height: var(--leading-heading);
}

.wordmark:hover {
  color: var(--color-text);
}

.wordmark-text {
  display: grid;
}

.wordmark-name {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--weight-display);
  letter-spacing: var(--tracking-heading);
}

.wordmark-tagline {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.controls {
  grid-area: controls;
  display: flex;
  align-items: center;
  gap: var(--space-3xs);
}

/* Mobile: hamburger button, navigation as a drop-down list */
.menu-button {
  display: inline-grid;
  place-items: center;
  inline-size: var(--size-control);
  block-size: var(--size-control);
  padding: 0;
  border: 0;
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
}

.menu-button:hover {
  background: var(--color-bg-subtle);
}

.burger {
  display: grid;
  gap: var(--space-3xs);
  inline-size: var(--size-icon);
}

.burger span {
  display: block;
  block-size: var(--stroke-rule);
  border-radius: var(--radius-pill);
  background: currentColor;
  transition:
    transform var(--transition-base),
    opacity var(--transition-fast);
}

/* Open: the three lines fold into a cross */
.menu-button[aria-expanded='true'] .burger span:nth-child(1) {
  transform: translateY(calc(var(--space-3xs) + var(--stroke-rule))) rotate(45deg);
}

.menu-button[aria-expanded='true'] .burger span:nth-child(2) {
  opacity: 0;
}

.menu-button[aria-expanded='true'] .burger span:nth-child(3) {
  transform: translateY(calc(-1 * (var(--space-3xs) + var(--stroke-rule)))) rotate(-45deg);
}

.nav {
  grid-area: nav;
  display: none;
}

.nav.is-open {
  display: block;
}

.nav-list {
  display: grid;
  margin: 0;
  margin-block-start: var(--space-sm);
  padding: 0;
  list-style: none;
  border-block-start: 1px solid var(--color-border);
}

.nav-link {
  display: block;
  padding-block: var(--space-xs);
  border-block-end: 1px solid var(--color-border);
  color: var(--color-text);
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--weight-heading);
  text-decoration: none;
}

.nav-link:hover {
  color: var(--color-accent);
}

/* Desktop: inline navigation, no hamburger */
@media (min-width: 52rem) {
  .inner {
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'brand nav controls';
  }

  .menu-button {
    display: none;
  }

  .nav {
    display: block;
  }

  .nav-list {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-md);
    margin-block-start: 0;
    border: 0;
  }

  .nav-link {
    padding-block: var(--space-3xs);
    border: 0;
    color: var(--color-text-muted);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: var(--weight-strong);
    white-space: nowrap;
  }

  .nav-link:hover,
  .nav-link.router-link-exact-active:not([href*='#']) {
    color: var(--color-text);
    text-decoration: underline;
    text-decoration-thickness: var(--stroke-rule);
  }
}
</style>
