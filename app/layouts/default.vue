<template>
  <a href="#inhalt" class="skip-link">Zum Inhalt springen</a>
  <SiteHeader />
  <div id="inhalt" class="content">
    <slot />
  </div>
  <SiteFooter />
</template>

<style scoped>
.skip-link {
  position: absolute;
  inset-block-start: var(--space-2xs);
  inset-inline-start: var(--space-2xs);
  z-index: 10;
  padding: var(--space-2xs) var(--space-sm);
  border-radius: var(--radius-control);
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  font-weight: var(--weight-strong);
  transform: translateY(-200%);
}

.skip-link:focus-visible {
  transform: none;
}

.content {
  min-block-size: 60dvh;
}
</style>
