<script setup lang="ts">
/*
 * A green chalkboard panel. Until there is a photo it is drawn in CSS and holds chalk
 * writing passed in the slot; once `image` is set, the photo fills the panel and the
 * slot is laid over it (e.g. a headline on a photo of a board or whiteboard).
 */
defineProps<{
  image?: string
  /** Required with `image`; use '' for a purely decorative photo */
  alt?: string
}>()
</script>

<template>
  <div class="board" :class="{ 'board--photo': image }">
    <img v-if="image" class="photo" :src="image" :alt="alt ?? ''" loading="lazy" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.board {
  position: relative;
  isolation: isolate;
  display: grid;
  overflow: hidden;
  border-radius: var(--radius-card);
  background-color: var(--color-board);
  /* Wiped chalk dust: two faint clouds, lighter where the board was cleaned last */
  background-image:
    radial-gradient(
      ellipse 70% 45% at 30% 25%,
      color-mix(in oklch, var(--color-chalk) 7%, transparent),
      transparent
    ),
    radial-gradient(
      ellipse 60% 40% at 75% 80%,
      color-mix(in oklch, var(--color-chalk) 5%, transparent),
      transparent
    );
  color: var(--color-chalk);
}

.photo {
  position: absolute;
  inset: 0;
  z-index: -1;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}

/* A photo gets a soft shade so text on top stays readable */
.board--photo::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to top,
    color-mix(in oklch, var(--color-board-deep) 85%, transparent),
    transparent 70%
  );
}

.content {
  display: grid;
  padding: var(--space-lg);
}
</style>
