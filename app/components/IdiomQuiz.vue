<script setup lang="ts">
/*
 * Idioms, one at a time: pick the meaning from three, then see the idiom in a sentence from
 * everyday work.
 */
import { idioms } from '~/data/idioms'

const position = ref(0)
const picked = ref<number | null>(null)
const right = ref(0)

const nextButton = useTemplateRef<HTMLButtonElement>('nextButton')

const idiom = computed(() => idioms[position.value])
const finished = computed(() => position.value >= idioms.length)

async function choose(option: number) {
  if (picked.value !== null || !idiom.value) return
  picked.value = option
  if (option === idiom.value.answer) right.value++
  await nextTick()
  nextButton.value?.focus()
}

function next() {
  position.value++
  picked.value = null
}

function restart() {
  position.value = 0
  picked.value = null
  right.value = 0
}
</script>

<template>
  <section class="idioms" aria-labelledby="idioms-title">
    <h2 id="idioms-title" class="visually-hidden">Redewendungen</h2>

    <div class="card">
      <template v-if="finished">
        <p class="score">{{ right }} von {{ idioms.length }} richtig.</p>
        <button type="button" class="action" @click="restart">Noch einmal</button>
      </template>

      <template v-else-if="idiom">
        <p class="progress">Redewendung {{ position + 1 }} von {{ idioms.length }}</p>
        <p class="phrase" translate="no">„{{ idiom.phrase }}“</p>
        <p class="question">Was bedeutet das?</p>

        <div class="options" role="group" aria-label="Bedeutung wählen">
          <button
            v-for="(option, index) in idiom.options"
            :key="option"
            type="button"
            class="option"
            :class="{
              'is-solution': picked !== null && index === idiom.answer,
              'is-picked': picked === index,
            }"
            :disabled="picked !== null"
            :aria-pressed="picked === index"
            @click="choose(index)"
          >
            {{ option }}
          </button>
        </div>

        <div class="feedback" role="status">
          <template v-if="picked !== null">
            <p>
              <strong v-if="picked === idiom.answer">Richtig!</strong>
              <strong v-else>Nicht ganz – gemeint ist: {{ idiom.options[idiom.answer] }}</strong>
            </p>
            <figure class="example">
              <figcaption>So klingt es im Büro:</figcaption>
              <blockquote translate="no">„{{ idiom.example }}“</blockquote>
            </figure>
            <button ref="nextButton" type="button" class="action" @click="next">
              {{ position + 1 < idioms.length ? 'Nächste Redewendung' : 'Ergebnis anzeigen' }}
            </button>
          </template>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.card {
  display: grid;
  justify-items: start;
  gap: var(--space-md);
  max-inline-size: var(--layout-content);
  padding: var(--space-lg);
  border-radius: var(--radius-card);
  background: var(--color-card);
}

.progress {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-variant-numeric: tabular-nums;
}

.phrase {
  color: var(--color-heading-accent);
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--weight-heading);
  line-height: var(--leading-heading);
  text-wrap: balance;
}

.question {
  font-weight: var(--weight-strong);
}

.options {
  display: grid;
  gap: var(--space-2xs);
  inline-size: 100%;
}

.option {
  min-block-size: var(--size-control);
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-field);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: var(--text-lg);
  text-align: start;
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast);
}

.option:hover:not(:disabled) {
  border-color: var(--color-accent);
}

.option:disabled {
  cursor: default;
  opacity: 0.5;
}

.option.is-solution {
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  opacity: 1;
}

.option.is-picked:not(.is-solution) {
  border-color: var(--color-danger);
  color: var(--color-danger);
  text-decoration: line-through;
  opacity: 1;
}

.feedback {
  display: grid;
  justify-items: start;
  gap: var(--space-sm);
  max-inline-size: var(--layout-measure);
}

.example {
  display: grid;
  gap: var(--space-3xs);
  margin: 0;
  padding: var(--space-sm) var(--space-md);
  border-inline-start: var(--stroke-marker) solid var(--color-accent);
  background: var(--color-bg);
}

.example figcaption {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.example blockquote {
  margin: 0;
  font-size: var(--text-lg);
  font-style: italic;
}

.action {
  min-block-size: var(--size-control);
  padding-inline: var(--space-md);
  border: 0;
  border-radius: var(--radius-control);
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  font-weight: var(--weight-strong);
  cursor: pointer;
}

.action:hover {
  background: var(--color-accent-hover);
}

.score {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--weight-heading);
  font-variant-numeric: tabular-nums;
}
</style>
