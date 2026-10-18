<script setup lang="ts">
/*
 * The hero headline, laid out as the German "Feldermodell" (topological field model):
 * the finite verb sits in position 2, its second part at the end of the sentence,
 * and the two form the "Satzklammer" (sentence bracket) that is drawn underneath.
 */
const sentence = 'Ihr Team kann im Betrieb sicher mitreden.'

const fields = [
  { label: 'Vorfeld', words: 'Ihr Team', verb: false },
  { label: 'linke Satzklammer', words: 'kann', verb: true },
  { label: 'Mittelfeld', words: 'im Betrieb sicher', verb: false },
  { label: 'rechte Satzklammer', words: 'mitreden.', verb: true },
]
</script>

<template>
  <div class="hero-sentence">
    <h1 class="sentence" :aria-label="sentence">
      <span
        v-for="field in fields"
        :key="field.label"
        class="field"
        :class="{ 'field--verb': field.verb }"
        aria-hidden="true"
      >
        <span class="label">{{ field.label }}</span>
        <span class="words">{{ field.words }}</span>
      </span>
      <span class="bracket" aria-hidden="true">
        <span class="bracket-start" />
        <span class="bracket-middle" />
        <span class="bracket-end" />
      </span>
    </h1>
    <div class="aside">
      <p class="note">
        Die Satzklammer: Das Verb steht an zweiter Stelle, sein zweiter Teil ganz am Ende. Für viele
        Lernende eine der ersten Hürden – und im Arbeitsalltag steckt sie in fast jedem Satz.
      </p>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.hero-sentence {
  display: grid;
  gap: var(--space-lg);
}

.aside {
  display: grid;
  gap: var(--space-lg);
}

/* Mobile: one field per line, the bracket runs vertically from "kann" to "mitreden" */
.sentence {
  display: grid;
  grid-template-columns: var(--space-sm) 1fr;
  column-gap: var(--space-sm);
  font-size: var(--text-display);
  font-weight: var(--weight-display);
  line-height: var(--leading-display);
}

.field {
  grid-column: 2;
  display: grid;
}

.field--verb .words {
  color: var(--color-accent);
}

.label {
  display: none;
}

.bracket {
  grid-column: 1;
  grid-row: 2 / 5;
  margin-block: 0.5em;
  border: var(--stroke-bracket) solid var(--color-accent);
  border-inline-end: 0;
  animation: draw-down var(--transition-draw) 300ms both;
}

.bracket > span {
  display: none;
}

/* Wide screens: the classic left-to-right field table with labels on top */
@media (min-width: 60rem) {
  /* Everything below the headline hangs from the left bracket ("kann") */
  .hero-sentence {
    grid-template-columns: repeat(4, auto);
    justify-content: start;
  }

  .aside {
    grid-column: 2 / -1;
  }

  .sentence {
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
    grid-template-rows: auto auto auto;
    justify-content: start;
    column-gap: 0;
  }

  .field {
    grid-column: auto;
    grid-row: 1 / 3;
    grid-template-rows: subgrid;
    padding-inline-end: 0.28em;
  }

  .field:nth-child(4) {
    padding-inline-end: 0;
  }

  .words {
    white-space: nowrap;
  }

  .label {
    display: block;
    padding-inline-start: var(--space-2xs);
    padding-block-end: var(--space-xs);
    border-inline-start: 1px dashed var(--color-border-strong);
    color: var(--color-text-muted);
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: var(--weight-body);
    letter-spacing: var(--tracking-label);
    line-height: var(--leading-snug);
  }

  .field--verb .label {
    color: var(--color-accent);
  }

  .bracket {
    grid-column: 2 / 5;
    grid-row: 3;
    display: grid;
    grid-template-columns: subgrid;
    margin-block: var(--space-2xs) 0;
    border: 0;
    animation-name: draw-across;
  }

  .bracket > span {
    display: block;
    block-size: var(--space-md);
    border-block-end: var(--stroke-bracket) solid var(--color-accent);
  }

  /* The bracket legs start under the middle of each verb */
  .bracket-start {
    margin-inline-start: 45%;
    border-inline-start: var(--stroke-bracket) solid var(--color-accent);
  }

  .bracket-end {
    margin-inline-end: 50%;
    border-inline-end: var(--stroke-bracket) solid var(--color-accent);
  }
}

.note {
  max-inline-size: var(--layout-measure);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

@keyframes draw-down {
  from {
    clip-path: inset(0 0 100% 0);
  }

  to {
    clip-path: inset(0);
  }
}

@keyframes draw-across {
  from {
    clip-path: inset(0 100% 0 0);
  }

  to {
    clip-path: inset(0);
  }
}
</style>
