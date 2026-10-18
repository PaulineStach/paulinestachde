<script setup lang="ts">
const { email, name } = useContact()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="inner">
      <p class="owner">
        <span class="name">{{ name }}</span>
        Deutschtraining für Unternehmen und ihre internationalen Mitarbeitenden
      </p>
      <p>
        <a :href="`mailto:${email}`">{{ email }}</a>
      </p>
      <nav aria-label="Rechtliches">
        <ul class="legal">
          <li><NuxtLink to="/impressum">Impressum</NuxtLink></li>
          <li><NuxtLink to="/datenschutz">Datenschutz</NuxtLink></li>
        </ul>
      </nav>
      <p class="copyright">© {{ year }} {{ name }}</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--color-surface-inverse);
  color: var(--color-text-inverse-muted);
  font-size: var(--text-sm);
}

.inner {
  display: grid;
  gap: var(--space-sm) var(--space-xl);
  max-inline-size: var(--layout-wide);
  margin-inline: auto;
  padding: var(--space-xl) var(--layout-gutter);
}

.owner {
  max-inline-size: var(--layout-measure);
}

.name {
  display: block;
  color: var(--color-text-inverse);
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: var(--weight-display);
}

a {
  color: var(--color-text-inverse);
}

a:hover {
  color: var(--color-text-inverse);
  text-decoration-thickness: var(--stroke-rule);
}

.legal {
  display: flex;
  gap: var(--space-md);
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 52rem) {
  .inner {
    grid-template-columns: 1fr auto auto;
    align-items: end;
  }

  .copyright {
    grid-column: 1 / -1;
  }
}
</style>
