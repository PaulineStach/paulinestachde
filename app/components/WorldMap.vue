<script setup lang="ts">
/*
 * A flat world map in light green; the countries where Pauline Stach has taught and studied
 * stand out in a stronger green and fade in once when the map is shown. No labels – the
 * country names are only in the accessible description. Geometry: app/data/worldMap.ts
 * (a plain data module outside the auto-imported folders, so it is imported explicitly).
 */
import { worldMapCountries, worldMapLand, worldMapSize } from '~/data/worldMap'

const label = `Weltkarte, hervorgehoben: ${worldMapCountries.map((country) => country.name).join(', ')}`
</script>

<template>
  <svg
    class="world-map"
    :viewBox="`0 0 ${worldMapSize.width} ${worldMapSize.height}`"
    role="img"
    :aria-label="label"
  >
    <path class="land" :d="worldMapLand" />
    <path
      v-for="(country, index) in worldMapCountries"
      :key="country.name"
      class="country"
      :d="country.d"
      :style="{ '--index': index }"
    />
  </svg>
</template>

<style scoped>
.world-map {
  inline-size: 100%;
  block-size: auto;
}

.land {
  fill: var(--color-map-land);
}

.country {
  fill: var(--color-map-marked);
  animation: mark var(--transition-slow) both;
  animation-delay: calc(var(--index) * 150ms + 200ms);
}

@keyframes mark {
  from {
    opacity: 0;
  }
}
</style>
