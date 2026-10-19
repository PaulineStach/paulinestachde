<script setup lang="ts">
/*
 * "Satzbau": put the word blocks of a short work sentence in the right order. Each block
 * names its part of the sentence (Verb, Subjekt, Zeitangabe …); verbs are highlighted,
 * because their position is the point of the exercise. Answers are checked against the
 * word-order rules (checkSentenceOrder), so every grammatical order counts as right.
 */
const picked = ref<number[][]>(sentenceExercises.map(() => []))

function texts(exercise: SentenceExercise, order: number[]) {
  return order.map((index) => exercise.parts[index]!.text)
}

function isComplete(index: number) {
  return picked.value[index]!.length === sentenceExercises[index]!.parts.length
}

/** null when the order is right, otherwise a hint naming what is out of place */
function hint(index: number) {
  return checkSentenceOrder(sentenceExercises[index]!, picked.value[index]!)
}

function isCorrect(index: number) {
  return hint(index) === null
}

/** The built sentence with a capital first letter and its full stop or question mark */
/** The built sentence: capitalised (or after its main clause) with its end punctuation */
function sentence(index: number) {
  const exercise = sentenceExercises[index]!
  const words = texts(exercise, picked.value[index]!).join(' ')
  const body = exercise.prefix
    ? `${exercise.prefix} ${words}`
    : words.charAt(0).toUpperCase() + words.slice(1)
  return body + sentenceKinds[exercise.kind].end
}

/** Both parts of the verb are highlighted: the finite verb and the part that closes the bracket */
function isVerb(part: SentencePart) {
  return Boolean(part.finite || part.last)
}

/** A block's text in the answer line: the first one is capitalised unless a main clause precedes */
function display(index: number, position: number, text: string) {
  const capitalise = position === 0 && !sentenceExercises[index]!.prefix
  return capitalise ? text.charAt(0).toUpperCase() + text.slice(1) : text
}

function place(index: number, part: number) {
  if (isComplete(index)) return
  picked.value[index] = [...picked.value[index]!, part]
}

function remove(index: number, position: number) {
  if (isComplete(index) && isCorrect(index)) return
  picked.value[index] = picked.value[index]!.filter((_, i) => i !== position)
}

function restart(index: number) {
  picked.value[index] = []
}
</script>

<template>
  <section class="builder" aria-labelledby="builder-title">
    <header class="intro">
      <h2 id="builder-title">Wer steht wo?</h2>
      <p>
        Tippen Sie die Bausteine in der richtigen Reihenfolge an – als Aussage, Frage, Aufforderung
        oder Nebensatz, wie angegeben. Achten Sie auf das <strong class="verb-key">Verb</strong>.
      </p>
    </header>

    <ol class="items">
      <li v-for="(exercise, index) in sentenceExercises" :key="index" class="item">
        <p class="label">
          Satz {{ index + 1 }}: <span class="kind">{{ sentenceKinds[exercise.kind].label }}</span>
        </p>

        <ol class="answer" :aria-label="`Ihr Satz ${index + 1}`">
          <li v-if="exercise.prefix" class="answer-prefix" translate="no">{{ exercise.prefix }}</li>
          <li v-for="(part, position) in picked[index]" :key="part">
            <button
              type="button"
              class="block block--placed"
              :class="{ 'block--verb': isVerb(exercise.parts[part]!) }"
              :aria-label="`${exercise.parts[part]!.text} wieder entfernen`"
              :disabled="isComplete(index) && isCorrect(index)"
              @click="remove(index, position)"
            >
              <span class="block-text" translate="no">{{
                display(index, position, exercise.parts[part]!.text)
              }}</span>
              <span class="block-role">{{ exercise.parts[part]!.role }}</span>
            </button>
          </li>
          <li v-if="!isComplete(index)" class="answer-gap" aria-hidden="true" />
          <li class="answer-end" aria-hidden="true">{{ sentenceKinds[exercise.kind].end }}</li>
        </ol>

        <ul v-if="!isComplete(index)" class="pool" :aria-label="`Bausteine für Satz ${index + 1}`">
          <template v-for="(part, partIndex) in exercise.parts" :key="part.text">
            <li v-if="!picked[index]!.includes(partIndex)">
              <button
                type="button"
                class="block"
                :class="{ 'block--verb': isVerb(part) }"
                :aria-label="`${part.text} (${part.role}) einfügen`"
                @click="place(index, partIndex)"
              >
                <span class="block-text" translate="no">{{ part.text }}</span>
                <span class="block-role">{{ part.role }}</span>
              </button>
            </li>
          </template>
        </ul>

        <div class="feedback" role="status">
          <template v-if="isComplete(index)">
            <p v-if="isCorrect(index)">
              <strong>Richtig: {{ sentence(index) }}</strong> {{ exercise.tip }}
            </p>
            <p v-else>
              <strong>Noch nicht ganz.</strong> {{ hint(index) }}
              <button type="button" class="restart" @click="restart(index)">Neu sortieren</button>
            </p>
          </template>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.builder {
  display: grid;
  gap: var(--space-lg);
}

.intro {
  display: grid;
  gap: var(--space-xs);
  max-inline-size: var(--layout-measure);
}

.verb-key {
  color: var(--color-accent);
}

.items {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
  border-block-start: 1px solid var(--color-border);
}

.item {
  display: grid;
  gap: var(--space-sm);
  padding-block: var(--space-md);
  border-block-end: 1px solid var(--color-border);
}

.label {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: var(--weight-strong);
}

.kind {
  color: var(--color-text);
}

.answer,
.pool {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: var(--space-2xs);
  margin: 0;
  padding: 0;
  list-style: none;
}

/* The line the sentence is built on */
.answer {
  min-block-size: var(--size-control);
  padding-block-end: var(--space-2xs);
  border-block-end: var(--stroke-rule) dashed var(--color-border-strong);
}

.answer-gap {
  flex: 1;
}

/* The fixed main clause in front of a subordinate clause */
.answer-prefix {
  align-self: center;
  font-size: var(--text-lg);
  font-weight: var(--weight-strong);
}

/* The sentence's full stop or question mark, waiting at the end of the line */
.answer-end {
  align-self: end;
  color: var(--color-text-muted);
  font-size: var(--text-h3);
  font-weight: var(--weight-heading);
  line-height: var(--leading-heading);
}

.block {
  display: grid;
  justify-items: start;
  gap: var(--space-3xs);
  min-block-size: var(--size-control);
  padding: var(--space-2xs) var(--space-sm);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-field);
  background: var(--color-bg);
  color: var(--color-text);
  text-align: start;
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast);
}

.block:hover:not(:disabled) {
  background: var(--color-bg-subtle);
}

.block:disabled {
  cursor: default;
}

.block--placed {
  border-color: transparent;
  background: var(--color-card);
}

.block--verb {
  border-color: var(--color-accent);
}

.block-text {
  font-size: var(--text-lg);
  font-weight: var(--weight-strong);
  line-height: var(--leading-snug);
}

.block-role {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}

.block--verb .block-role {
  color: var(--color-accent);
  font-weight: var(--weight-strong);
}

.feedback {
  max-inline-size: var(--layout-measure);
  color: var(--color-text-muted);
}

.feedback strong {
  color: var(--color-text);
}

.restart {
  margin-inline-start: var(--space-2xs);
  padding: 0;
  border: 0;
  background: none;
  color: var(--color-accent);
  font-weight: var(--weight-strong);
  text-decoration: underline;
  text-underline-offset: 0.2em;
  cursor: pointer;
}

.restart:hover {
  color: var(--color-accent-hover);
}
</style>
