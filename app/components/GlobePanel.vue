<script setup lang="ts">
/*
 * A globe beside the Wittgenstein quote, in shades of green on white. The countries where
 * Pauline Stach has taught and studied stand out in a stronger green; they fade in once
 * on load. Geometry: app/utils/globe.ts.
 */
const label = `Globus, hervorgehoben: ${globeCountries.map((country) => country.name).join(', ')}`
</script>

<template>
  <figure class="globe-panel">
    <svg class="globe" viewBox="0 0 400 400" role="img" :aria-label="label">
      <circle class="ocean" cx="200" cy="200" r="190" />
      <path class="grid" :d="globeGraticule" />
      <path class="land" :d="globeLand" />
      <path
        v-for="(country, index) in globeCountries"
        :key="country.name"
        class="country"
        :d="country.d"
        :style="{ '--index': index }"
      />
      <circle class="rim" cx="200" cy="200" r="190" />
    </svg>
    <figcaption class="caption">Gelehrt und gelernt auf drei Kontinenten</figcaption>
  </figure>
</template>

<style scoped>
.globe-panel {
  display: grid;
  align-content: center;
  justify-items: center;
  gap: var(--space-md);
  margin: 0;
}

.globe {
  inline-size: 100%;
  max-inline-size: var(--size-globe);
  block-size: auto;
}

.ocean {
  fill: var(--color-globe-ocean);
}

.grid {
  fill: none;
  stroke: var(--color-globe-line);
  stroke-width: 0.8;
}

.land {
  fill: var(--color-globe-land);
}

.country {
  fill: var(--color-globe-marked);
  animation: mark var(--transition-slow) both;
  animation-delay: calc(var(--index) * 150ms + 300ms);
}

.rim {
  fill: none;
  stroke: var(--color-globe-land);
  stroke-width: 1.5;
}

.caption {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

/* The countries start in the land colour and settle into their stronger green */
@keyframes mark {
  from {
    opacity: 0;
  }
}
</style>
