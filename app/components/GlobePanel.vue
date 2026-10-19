<script setup lang="ts">
/*
 * A globe beside the Wittgenstein quote: arcs from five cities lead to Germany – people
 * from all over the world, working in German workplaces. Drawn once on load.
 * Geometry: app/utils/globe.ts.
 */
const label = `Globus mit Linien aus ${globeCities.map((city) => city.name).join(', ')} nach Deutschland`
</script>

<template>
  <figure class="globe-panel">
    <svg class="globe" viewBox="0 0 400 400" role="img" :aria-label="label">
      <circle class="sphere" cx="200" cy="200" r="170" />
      <path class="grid grid--back" :d="globeGraticuleBack" />
      <path class="grid grid--front" :d="globeGraticuleFront" />
      <circle class="rim" cx="200" cy="200" r="170" />
      <path
        v-for="(arc, index) in globeArcs"
        :key="arc.name"
        class="arc"
        :d="arc.d"
        :style="{ '--length': arc.length, '--index': index }"
      />
      <circle
        v-for="city in globeCities"
        :key="city.name"
        class="city"
        :cx="city.x"
        :cy="city.y"
        r="4"
      />
      <circle class="target-ring" :cx="globeTarget.x" :cy="globeTarget.y" r="12" />
      <circle class="target" :cx="globeTarget.x" :cy="globeTarget.y" r="6" />
    </svg>
    <figcaption class="caption">Aus aller Welt in Ihren Betrieb</figcaption>
  </figure>
</template>

<style scoped>
.globe-panel {
  display: grid;
  grid-template-rows: 1fr auto;
  justify-items: center;
  gap: var(--space-md);
  margin: 0;
  padding: var(--space-lg);
  border-radius: var(--radius-card);
  background: var(--color-globe-bg);
  color: var(--color-globe-text);
}

.globe {
  align-self: center;
  inline-size: 100%;
  max-inline-size: var(--size-globe);
  block-size: auto;
}

.sphere {
  fill: var(--color-globe-sphere);
}

.grid {
  fill: none;
  stroke: var(--color-globe-line);
  stroke-width: 1;
}

.grid--back {
  opacity: 0.25;
}

.rim {
  fill: none;
  stroke: var(--color-globe-line);
  stroke-width: 1.5;
}

/* Each arc is drawn from its city towards Germany, one after the other */
.arc {
  fill: none;
  stroke: var(--color-globe-arc);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-dasharray: calc(var(--length) * 1px);
  stroke-dashoffset: 0;
  animation: draw var(--transition-draw) both;
  animation-delay: calc(var(--index) * 160ms + 300ms);
}

.city {
  fill: var(--color-globe-text);
}

.target {
  fill: var(--color-globe-arc);
}

.target-ring {
  fill: none;
  stroke: var(--color-globe-arc);
  stroke-width: 2;
}

.caption {
  justify-self: start;
  font-size: var(--text-lg);
  font-weight: var(--weight-strong);
}

@keyframes draw {
  from {
    stroke-dashoffset: calc(var(--length) * 1px);
  }
}
</style>
