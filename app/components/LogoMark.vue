<script setup lang="ts">
/*
 * The logo mark: the initials "PS" (Zilla Slab Bold, outlined) over a sentence bracket,
 * the same "Satzklammer" that is drawn under the hero headline. Same artwork as /favicon.svg.
 */
</script>

<template>
  <svg class="logo-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <rect class="logo-bg" width="64" height="64" rx="14" />
    <path
      class="logo-letters"
      d="M32.57 20.1Q32.57 24.77 29.53 27.05Q26.48 29.34 22.45 29.34H18.25V33.71H22.45V38.5H9.68V33.71H12.62V15.99H9.68V11.2H22.2Q27.28 11.2 29.93 13.59Q32.57 15.99 32.57 20.1ZM26.52 20.19Q26.52 18.17 25.41 17.08Q24.3 15.99 21.48 15.99H18.25V24.6H21.4Q24.3 24.6 25.41 23.38Q26.52 22.16 26.52 20.19ZM54.65 30.23Q54.65 34.47 51.8 36.69Q48.94 38.92 43.94 38.92Q41.17 38.92 38.42 38.21Q35.67 37.49 34.07 36.06L34.91 29.3L39.41 29.72L39.37 33.04Q40.79 33.8 41.8 33.94Q42.81 34.09 43.52 34.09Q45.75 34.09 47.18 33.52Q48.61 32.96 48.61 30.9Q48.61 28.63 46.93 27.85Q45.25 27.08 42.98 26.66Q41 26.32 39.01 25.67Q37.01 25.02 35.67 23.53Q34.33 22.04 34.33 19.1Q34.33 14.52 37.43 12.65Q40.54 10.78 44.24 10.78Q46.92 10.78 49.36 11.6Q51.8 12.42 53.1 13.8L53.35 19.73L48.86 20.15L48.48 16.95Q47.43 16.24 46.36 15.99Q45.29 15.74 44.28 15.74Q42.6 15.74 41.49 16.32Q40.37 16.91 40.37 18.38Q40.37 20.1 41.8 20.78Q43.23 21.45 45.08 21.87Q46.76 22.2 49 22.81Q51.25 23.42 52.95 25.08Q54.65 26.74 54.65 30.23Z"
    />
    <path class="logo-bracket" d="M18.13 43.50V50.50H44.36V43.50" />
  </svg>
</template>

<style scoped>
.logo-mark {
  inline-size: var(--size-control);
  block-size: var(--size-control);
  flex: none;
}

.logo-bg {
  fill: var(--color-logo-bg);
}

.logo-letters {
  fill: var(--color-logo-fg);
}

.logo-bracket {
  fill: none;
  stroke: var(--color-logo-accent);
  stroke-width: 4;
  stroke-linecap: square;
}
</style>
