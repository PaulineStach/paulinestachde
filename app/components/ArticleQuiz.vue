<script setup lang="ts">
/* "Der, die oder das?" – a small exercise with workplace nouns and the article colour code. */
const answers = ref<Record<string, Article>>({})

const answeredCount = computed(() => Object.keys(answers.value).length)
const correctCount = computed(
  () => workplaceWords.filter((item) => answers.value[item.word] === item.article).length,
)
const finished = computed(() => answeredCount.value === workplaceWords.length)

function choose(item: ArticleWord, article: Article) {
  if (answers.value[item.word]) return
  answers.value = { ...answers.value, [item.word]: article }
}

function reset() {
  answers.value = {}
}
</script>

<template>
  <section class="quiz" aria-labelledby="quiz-title">
    <header class="intro">
      <h2 id="quiz-title">Der, die oder das?</h2>
      <p>
        Wählen Sie den richtigen Artikel. Die Farben helfen beim Merken:
        <span class="key key--der">blau für der</span>,
        <span class="key key--die">rot für die</span>,
        <span class="key key--das">grün für das</span>.
      </p>
    </header>

    <ol class="items">
      <li
        v-for="item in workplaceWords"
        :key="item.word"
        class="item"
        :class="answers[item.word] && `item--${item.article}`"
      >
        <p class="word">
          <span v-if="answers[item.word]" class="word-article">{{ item.article }}</span>
          <span v-else class="word-gap"
            ><span aria-hidden="true">___</span><span class="visually-hidden">Lücke</span></span
          >
          {{ item.word }}
        </p>

        <div class="choices" role="group" :aria-label="`Artikel für ${item.word}`">
          <button
            v-for="article in articles"
            :key="article"
            type="button"
            class="choice"
            :class="[
              `choice--${article}`,
              {
                'is-picked': answers[item.word] === article,
                'is-solution': answers[item.word] && item.article === article,
              },
            ]"
            :disabled="!!answers[item.word]"
            :aria-pressed="answers[item.word] === article"
            @click="choose(item, article)"
          >
            {{ article }}
          </button>
        </div>

        <p v-if="answers[item.word]" class="feedback" role="status">
          <strong v-if="answers[item.word] === item.article">Richtig.</strong>
          <strong v-else>Richtig ist: {{ item.article }} {{ item.word }}.</strong>
          {{ item.tip }}
        </p>
      </li>
    </ol>

    <footer class="result" aria-live="polite">
      <p v-if="finished" class="score">
        {{ correctCount }} von {{ workplaceWords.length }} Artikeln richtig.
      </p>
      <p v-else class="progress">{{ answeredCount }} von {{ workplaceWords.length }} beantwortet</p>
      <button v-if="answeredCount > 0" type="button" class="restart" @click="reset">
        Noch einmal üben
      </button>
    </footer>
  </section>
</template>

<style scoped>
.quiz {
  display: grid;
  gap: var(--space-lg);
}

.intro {
  display: grid;
  gap: var(--space-xs);
  max-inline-size: var(--layout-measure);
}

.key {
  font-weight: var(--weight-strong);
}

.key--der {
  color: var(--color-der);
}

.key--die {
  color: var(--color-die);
}

.key--das {
  color: var(--color-das);
}

.items {
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  border-block-start: 1px solid var(--color-border);
}

.item {
  --item-color: var(--color-text);

  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: var(--space-xs) var(--space-md);
  padding-block: var(--space-sm);
  border-block-end: 1px solid var(--color-border);
}

.item--der {
  --item-color: var(--color-der);
}

.item--die {
  --item-color: var(--color-die);
}

.item--das {
  --item-color: var(--color-das);
}

.word {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  font-weight: var(--weight-heading);
  line-height: var(--leading-heading);
}

.word-article {
  color: var(--item-color);
}

.word-gap {
  color: var(--color-border-strong);
}

.choices {
  display: flex;
  gap: var(--space-2xs);
}

.choice {
  --choice-color: var(--color-der);

  min-inline-size: var(--size-control);
  min-block-size: var(--size-control);
  padding-inline: var(--space-xs);
  border: var(--stroke-rule) solid var(--choice-color);
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--choice-color);
  font-weight: var(--weight-strong);
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast),
    opacity var(--transition-fast);
}

.choice--die {
  --choice-color: var(--color-die);
}

.choice--das {
  --choice-color: var(--color-das);
}

.choice:hover:not(:disabled) {
  background: var(--color-bg-subtle);
}

.choice:disabled {
  cursor: default;
  opacity: 0.35;
}

.choice.is-solution {
  background: var(--choice-color);
  color: var(--color-text-on-accent);
  opacity: 1;
}

.choice.is-picked:not(.is-solution) {
  opacity: 1;
  text-decoration: line-through;
  text-decoration-thickness: var(--stroke-rule);
}

.feedback {
  grid-column: 1 / -1;
  max-inline-size: var(--layout-measure);
  color: var(--color-text-muted);
  animation: appear var(--transition-base) both;
}

.feedback strong {
  color: var(--color-text);
}

.result {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm) var(--space-md);
}

.score {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--weight-heading);
}

.progress {
  color: var(--color-text-muted);
}

.restart {
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

@keyframes appear {
  from {
    opacity: 0;
  }
}
</style>
