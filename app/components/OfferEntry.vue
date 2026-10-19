<script setup lang="ts">
/*
 * A course format presented as a dictionary entry: article (in its gender colour),
 * headword with syllable breaks, grammar note, definition, details and an example sentence.
 */
const props = defineProps<{
  article: Article
  /** Headword with syllable breaks, e.g. "Ein·zel·trai·ning" */
  syllables: string
  details: string[]
  example: string
}>()

const gender = computed(() => articleGender[props.article])
const word = computed(() => props.syllables.replaceAll('·', ''))
const parts = computed(() => props.syllables.split('·'))
</script>

<template>
  <article class="entry" :class="`entry--${article}`">
    <header class="head">
      <h3 class="headword">
        <span class="article">{{ article }}</span>
        <span class="visually-hidden">{{ word }}</span>
        <span aria-hidden="true"
          ><template v-for="(part, index) in parts" :key="index"
            ><template v-if="index > 0">·<wbr /></template>{{ part }}</template
          ></span
        >
      </h3>
      <p class="grammar">Substantiv, {{ gender }}</p>
    </header>

    <div class="body">
      <div class="definition">
        <slot />
      </div>
      <ul class="details">
        <li v-for="detail in details" :key="detail">{{ detail }}</li>
      </ul>
      <p class="example">
        <span class="visually-hidden">Beispielsatz:</span>
        {{ example }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.entry {
  --entry-color: var(--color-der);
  --entry-subtle: var(--color-der-subtle);

  display: grid;
  gap: var(--space-sm) var(--space-xl);
  padding-block: var(--space-lg);
  padding-inline-start: var(--space-md);
  border-inline-start: var(--stroke-marker) solid var(--entry-color);
}

.entry--die {
  --entry-color: var(--color-die);
  --entry-subtle: var(--color-die-subtle);
}

.entry--das {
  --entry-color: var(--color-das);
  --entry-subtle: var(--color-das-subtle);
}

.headword {
  font-size: var(--text-h2);
  font-weight: var(--weight-display);
  hyphens: manual;
}

.article {
  margin-inline-end: 0.25em;
  color: var(--entry-color);
}

.grammar {
  margin-block-start: var(--space-3xs);
  color: var(--color-text-muted);
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-style: italic;
  font-weight: var(--weight-medium);
}

.body {
  display: grid;
  gap: var(--space-sm);
  max-inline-size: var(--layout-measure);
}

.definition {
  font-size: var(--text-lg);
  line-height: var(--leading-snug);
}

.details {
  display: grid;
  gap: var(--space-3xs);
  margin: 0;
  padding-inline-start: var(--space-md);
  list-style: square;
}

.details li::marker {
  color: var(--entry-color);
}

/* A card, not a pill: the quote runs over several lines and needs room on both sides */
.example {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-card);
  background: var(--entry-subtle);
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-style: italic;
  font-weight: var(--weight-medium);
}

@media (min-width: 52rem) {
  .entry {
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
    align-items: start;
  }
}
</style>
