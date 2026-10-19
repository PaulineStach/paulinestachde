<script setup lang="ts">
/*
 * "Formell oder informell?": sort e-mail openings and closings by tone in a small table.
 * Each row is answered once; the result shows whether it was right and what fits instead.
 */
const answers = ref<Record<string, Register>>({})

const answeredCount = computed(() => Object.keys(answers.value).length)
const correctCount = computed(
  () => registerPhrases.filter((item) => answers.value[item.text] === item.register).length,
)
const finished = computed(() => answeredCount.value === registerPhrases.length)

function choose(item: RegisterPhrase, register: Register) {
  if (answers.value[item.text]) return
  answers.value = { ...answers.value, [item.text]: register }
}

function reset() {
  answers.value = {}
}
</script>

<template>
  <section class="register" aria-labelledby="register-title">
    <header class="intro">
      <h2 id="register-title">Formell oder informell?</h2>
      <p>
        Mit Kunden schreibt man anders als im Team-Chat. Ordnen Sie die Begrüßungen und
        Verabschiedungen zu.
      </p>
    </header>

    <table class="table">
      <caption class="visually-hidden">
        Begrüßungen und Verabschiedungen nach formell und informell sortieren
      </caption>
      <thead>
        <tr>
          <th scope="col">Ausdruck</th>
          <th v-for="register in registers" :key="register" scope="col" class="col-choice">
            {{ register }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in registerPhrases"
          :key="item.text"
          :class="{
            'is-right': answers[item.text] && answers[item.text] === item.register,
            'is-wrong': answers[item.text] && answers[item.text] !== item.register,
          }"
        >
          <th scope="row" class="phrase">
            <span class="phrase-text" translate="no">{{ item.text }}</span>
            <span class="phrase-kind">{{ item.kind }}</span>
            <span v-if="answers[item.text]" class="phrase-feedback" role="status">
              {{ answers[item.text] === item.register ? 'Richtig.' : `Das ist ${item.register}.` }}
            </span>
          </th>
          <td v-for="register in registers" :key="register" class="col-choice">
            <button
              type="button"
              class="choice"
              :class="{
                'is-picked': answers[item.text] === register,
                'is-solution': answers[item.text] && item.register === register,
              }"
              :disabled="!!answers[item.text]"
              :aria-pressed="answers[item.text] === register"
              :aria-label="`„${item.text}“ ist ${register}`"
              @click="choose(item, register)"
            >
              <span aria-hidden="true">{{ register === 'formell' ? 'Sie' : 'du' }}</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <footer class="result" aria-live="polite">
      <p v-if="finished" class="score">
        {{ correctCount }} von {{ registerPhrases.length }} richtig zugeordnet.
      </p>
      <p v-else class="progress">{{ answeredCount }} von {{ registerPhrases.length }} zugeordnet</p>
      <button v-if="answeredCount > 0" type="button" class="restart" @click="reset">
        Noch einmal üben
      </button>
    </footer>
  </section>
</template>

<style scoped>
.register {
  display: grid;
  gap: var(--space-lg);
}

.intro {
  display: grid;
  gap: var(--space-xs);
  max-inline-size: var(--layout-measure);
}

.table {
  inline-size: 100%;
  max-inline-size: var(--layout-content);
  border-collapse: collapse;
}

th,
td {
  padding-block: var(--space-sm);
  border-block-end: 1px solid var(--color-border);
  text-align: start;
  vertical-align: middle;
}

thead th {
  padding-block-start: 0;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: var(--weight-strong);
}

.col-choice {
  inline-size: 1%;
  padding-inline-start: var(--space-xs);
  text-align: center;
  white-space: nowrap;
}

.phrase {
  display: grid;
  gap: var(--space-3xs);
  font-weight: var(--weight-body);
}

.phrase-text {
  font-size: var(--text-lg);
  font-weight: var(--weight-strong);
}

.phrase-kind,
.phrase-feedback {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}

/* The brand green: the status green is too light for small text on white */
.is-right .phrase-feedback {
  color: var(--color-accent);
  font-weight: var(--weight-strong);
}

.is-wrong .phrase-feedback {
  color: var(--color-danger);
  font-weight: var(--weight-strong);
}

.choice {
  min-inline-size: var(--size-control);
  min-block-size: var(--size-control);
  padding-inline: var(--space-xs);
  border: var(--stroke-rule) solid var(--color-accent);
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--color-accent);
  font-weight: var(--weight-strong);
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast),
    opacity var(--transition-fast);
}

.choice:hover:not(:disabled) {
  background: var(--color-bg-subtle);
}

.choice:disabled {
  cursor: default;
  opacity: 0.35;
}

.choice.is-solution {
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  opacity: 1;
}

.choice.is-picked:not(.is-solution) {
  border-color: var(--color-danger);
  color: var(--color-danger);
  opacity: 1;
  text-decoration: line-through;
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
</style>
