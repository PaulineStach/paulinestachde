<script setup lang="ts">
/*
 * Company texts with preposition gaps: each gap is a small dropdown. "Text prüfen" marks every
 * gap right or wrong and lists the explanations, numbered like the gaps.
 */
import { companyTexts, type Gap, type Segment } from '~/data/companyTexts'

const answers = ref<Record<string, Record<number, string>>>({})
const checked = ref<Record<string, boolean>>({})

function isGap(segment: Segment): segment is Gap {
  return typeof segment !== 'string'
}

/** Gap number (1, 2, …) for each segment index of a text */
function gapNumbers(segments: Segment[]) {
  const numbers: Record<number, number> = {}
  let count = 0
  segments.forEach((segment, index) => {
    if (isGap(segment)) numbers[index] = ++count
  })
  return numbers
}

const numbering = Object.fromEntries(
  companyTexts.map((text) => [text.id, gapNumbers(text.segments)]),
)

/** The right answer is first in the data; offer the options in a neutral order */
function sortedOptions(gap: Gap) {
  return gap.options.toSorted((a, b) => a.localeCompare(b, 'de'))
}

function gapsOf(id: string) {
  const text = companyTexts.find((item) => item.id === id)!
  return text.segments
    .map((segment, index) => ({ segment, index }))
    .filter((entry): entry is { segment: Gap; index: number } => isGap(entry.segment))
}

function choose(id: string, index: number, value: string) {
  answers.value = { ...answers.value, [id]: { ...answers.value[id], [index]: value } }
}

function isRight(id: string, index: number, gap: Gap) {
  return answers.value[id]?.[index] === gap.answer
}

function score(id: string) {
  return gapsOf(id).filter(({ segment, index }) => isRight(id, index, segment)).length
}

function check(id: string) {
  checked.value = { ...checked.value, [id]: true }
}

function reset(id: string) {
  answers.value = { ...answers.value, [id]: {} }
  checked.value = { ...checked.value, [id]: false }
}
</script>

<template>
  <section class="gap-texts" aria-labelledby="gap-texts-title">
    <header class="intro">
      <h2 id="gap-texts-title">Welche Präposition passt?</h2>
      <p>
        Vier Texte aus dem Arbeitsalltag mit Lücken. Wählen Sie in jeder Lücke die richtige
        Präposition und prüfen Sie dann den ganzen Text.
      </p>
    </header>

    <article
      v-for="text in companyTexts"
      :key="text.id"
      class="text-card"
      :aria-labelledby="`text-${text.id}`"
    >
      <p class="kind">{{ text.kind }}</p>
      <h3 :id="`text-${text.id}`">{{ text.title }}</h3>

      <p class="text" translate="no">
        <template v-for="(segment, index) in text.segments" :key="index">
          <template v-if="!isGap(segment)">{{ segment }}</template>
          <span v-else class="gap">
            <sup class="gap-number" aria-hidden="true">{{ numbering[text.id]![index] }}</sup>
            <select
              class="gap-select"
              :class="{
                'is-right': checked[text.id] && isRight(text.id, index, segment),
                'is-wrong': checked[text.id] && !isRight(text.id, index, segment),
              }"
              :aria-label="`Lücke ${numbering[text.id]![index]}`"
              :value="answers[text.id]?.[index] ?? ''"
              :disabled="checked[text.id]"
              @change="choose(text.id, index, ($event.target as HTMLSelectElement).value)"
            >
              <option value="" disabled>…</option>
              <option v-for="option in sortedOptions(segment)" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </span>
        </template>
      </p>

      <div class="actions">
        <button v-if="!checked[text.id]" type="button" class="action" @click="check(text.id)">
          Text prüfen
        </button>
        <button v-else type="button" class="link-button" @click="reset(text.id)">
          Noch einmal
        </button>
      </div>

      <div v-if="checked[text.id]" class="result" role="status">
        <p class="score">{{ score(text.id) }} von {{ gapsOf(text.id).length }} richtig.</p>
        <ol class="explanations">
          <li
            v-for="{ segment, index } in gapsOf(text.id)"
            :key="index"
            :class="isRight(text.id, index, segment) ? 'is-right' : 'is-wrong'"
          >
            <strong>{{ segment.answer }}</strong> – {{ segment.explanation }}
          </li>
        </ol>
      </div>
    </article>
  </section>
</template>

<style scoped>
.gap-texts {
  display: grid;
  gap: var(--space-xl);
}

.intro {
  display: grid;
  gap: var(--space-xs);
  max-inline-size: var(--layout-measure);
}

.text-card {
  display: grid;
  justify-items: start;
  gap: var(--space-sm);
  max-inline-size: var(--layout-content);
  padding: var(--space-lg);
  border-radius: var(--radius-card);
  background: var(--color-card);
}

.kind {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: var(--weight-strong);
}

.text {
  font-size: var(--text-lg);
  line-height: 2;
  white-space: pre-line;
}

.gap {
  white-space: nowrap;
}

.gap-number {
  margin-inline-end: var(--space-3xs);
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}

.gap-select {
  min-block-size: var(--size-control);
  padding-inline: var(--space-2xs);
  border: 0;
  border-block-end: var(--stroke-rule) solid var(--color-accent);
  border-radius: var(--radius-field) var(--radius-field) 0 0;
  background: var(--color-bg);
  color: var(--color-text);
  font: inherit;
  font-weight: var(--weight-strong);
  cursor: pointer;
}

.gap-select:disabled {
  cursor: default;
  opacity: 1;
}

.gap-select.is-right {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.gap-select.is-wrong {
  border-color: var(--color-danger);
  color: var(--color-danger);
  text-decoration: line-through;
}

.actions {
  display: flex;
  gap: var(--space-sm);
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

.link-button {
  padding: 0;
  border: 0;
  background: none;
  color: var(--color-accent);
  font-weight: var(--weight-strong);
  text-decoration: underline;
  text-underline-offset: 0.2em;
  cursor: pointer;
}

.result {
  display: grid;
  gap: var(--space-xs);
}

.score {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--weight-heading);
  font-variant-numeric: tabular-nums;
}

.explanations {
  display: grid;
  gap: var(--space-3xs);
  margin: 0;
  padding-inline-start: var(--space-md);
  color: var(--color-text-muted);
}

.explanations .is-wrong strong {
  color: var(--color-danger);
}

.explanations .is-right strong {
  color: var(--color-accent);
}
</style>
