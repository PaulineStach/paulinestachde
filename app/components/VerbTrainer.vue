<script setup lang="ts">
/*
 * Verb trainer: present tense endings, Perfekt (haben or sein + Partizip II), the case a
 * verb's object takes, and an overview table. Present and Perfekt run in rounds of ten
 * random tasks, filtered by verb type; tasks are drawn in the browser only (after mount).
 */
import { caseItems, persons, verbs, type Verb } from '~/data/verbs'

type Mode = 'praesens' | 'perfekt' | 'kasus' | 'uebersicht'
type Filter = 'alle' | 'regelmäßig' | 'unregelmäßig' | 'trennbar'

const modes: { id: Mode; label: string }[] = [
  { id: 'praesens', label: 'Präsens' },
  { id: 'perfekt', label: 'Perfekt' },
  { id: 'kasus', label: 'Akkusativ oder Dativ' },
  { id: 'uebersicht', label: 'Übersicht' },
]
const filters: Filter[] = ['alle', 'regelmäßig', 'unregelmäßig', 'trennbar']
const ROUND = 10

const mode = ref<Mode>('praesens')
const filter = ref<Filter>('alle')

const pool = computed(() =>
  verbs.filter((verb) => {
    if (filter.value === 'alle') return true
    if (filter.value === 'trennbar') return Boolean(verb.prefix)
    return verb.type === filter.value
  }),
)

interface Task {
  verb: Verb
  person: number
}

const tasks = ref<Task[]>([])
const position = ref(0)
const right = ref(0)

const typed = ref('')
const auxiliary = ref<'haben' | 'sein' | null>(null)
const result = ref<AnswerResult | null>(null)
const auxiliaryRight = ref(false)

const field = useTemplateRef<HTMLInputElement>('field')
const nextButton = useTemplateRef<HTMLButtonElement>('nextButton')

const task = computed(() => tasks.value[position.value])
const finished = computed(() => tasks.value.length > 0 && position.value >= tasks.value.length)

function draw() {
  const verbsToUse = pool.value
  tasks.value = Array.from({ length: Math.min(ROUND, verbsToUse.length * 2) }, () => ({
    verb: verbsToUse[Math.floor(Math.random() * verbsToUse.length)]!,
    person: Math.floor(Math.random() * persons.length),
  }))
  position.value = 0
  right.value = 0
  reset()
}

function reset() {
  typed.value = ''
  auxiliary.value = null
  result.value = null
  auxiliaryRight.value = false
}

onMounted(draw)
watch([mode, filter], () => {
  if (mode.value === 'praesens' || mode.value === 'perfekt') draw()
})

/** The present form as it reads in a main clause, e.g. "rufe … an" */
function presentPhrase(verb: Verb, person: number) {
  return verb.prefix ? `${verb.present[person]} … ${verb.prefix}` : verb.present[person]
}

function perfectPhrase(verb: Verb) {
  return `${verb.auxiliary === 'sein' ? 'ist' : 'hat'} ${verb.participle}`
}

async function check() {
  const current = task.value
  if (!current || result.value || !typed.value.trim()) return
  if (mode.value === 'praesens') {
    result.value = compareAnswer(typed.value, [current.verb.present[current.person]!])
    if (result.value !== 'wrong') right.value++
  } else {
    if (!auxiliary.value) return
    auxiliaryRight.value = auxiliary.value === current.verb.auxiliary
    result.value = compareAnswer(typed.value, [current.verb.participle])
    if (result.value !== 'wrong' && auxiliaryRight.value) right.value++
  }
  await nextTick()
  nextButton.value?.focus()
}

async function next() {
  position.value++
  reset()
  await nextTick()
  field.value?.focus()
}

function insertLetter(letter: string) {
  const input = field.value
  if (!input) return
  const from = input.selectionStart ?? typed.value.length
  const to = input.selectionEnd ?? from
  typed.value = typed.value.slice(0, from) + letter + typed.value.slice(to)
  nextTick(() => {
    input.focus()
    input.setSelectionRange(from + 1, from + 1)
  })
}

/** Why this verb takes haben or sein */
function auxiliaryRule(verb: Verb) {
  return verb.auxiliary === 'sein'
    ? 'Verben der Bewegung oder Veränderung (kommen, gehen, aufstehen) und sein und bleiben bilden das Perfekt mit sein.'
    : 'Die meisten Verben bilden das Perfekt mit haben.'
}

/** How this verb's Partizip II is built */
function participleRule(verb: Verb) {
  if (verb.infinitive.endsWith('ieren')) {
    return 'Verben auf -ieren bekommen kein ge-: programmiert, präsentiert.'
  }
  if (verb.prefix) {
    return `Bei trennbaren Verben steht ge- in der Mitte: ${verb.participle}.`
  }
  if (/^(be|er|ver|ge)/.test(verb.infinitive) && !verb.participle.startsWith('ge')) {
    return 'Verben mit be-, er-, ver- oder ge- am Anfang bekommen kein zusätzliches ge-.'
  }
  return verb.type === 'regelmäßig'
    ? 'Regelmäßige Verben: ge- + Stamm + -(e)t.'
    : 'Unregelmäßige Verben enden meist auf -en und ändern oft den Stamm.'
}

// Case exercise: all items at once, like a worksheet
const caseAnswers = ref<Record<number, string>>({})
const caseRight = computed(
  () => caseItems.filter((item, index) => caseAnswers.value[index] === item.answer).length,
)

function chooseCase(index: number, option: string) {
  if (caseAnswers.value[index]) return
  caseAnswers.value = { ...caseAnswers.value, [index]: option }
}

function caseSentence(index: number) {
  const item = caseItems[index]!
  return item.sentence.replace('___', caseAnswers.value[index] ?? '___')
}

function typeLabel(verb: Verb) {
  return verb.prefix ? `${verb.type}, trennbar` : verb.type
}
</script>

<template>
  <section class="trainer" aria-labelledby="verbs-title">
    <h2 id="verbs-title" class="visually-hidden">Verbtrainer</h2>

    <div class="controls">
      <div class="control">
        <p id="verb-mode-label" class="control-label">Üben</p>
        <div class="options" role="group" aria-labelledby="verb-mode-label">
          <button
            v-for="item in modes"
            :key="item.id"
            type="button"
            class="option"
            :aria-pressed="mode === item.id"
            @click="mode = item.id"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
      <div v-if="mode !== 'kasus'" class="control">
        <p id="verb-filter-label" class="control-label">Verben</p>
        <div class="options" role="group" aria-labelledby="verb-filter-label">
          <button
            v-for="item in filters"
            :key="item"
            type="button"
            class="option"
            :aria-pressed="filter === item"
            @click="filter = item"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </div>

    <!-- Present tense and Perfekt: one task at a time -->
    <div v-if="mode === 'praesens' || mode === 'perfekt'" class="card">
      <template v-if="finished">
        <p class="score">{{ right }} von {{ tasks.length }} richtig.</p>
        <button type="button" class="action" @click="draw">Neue Runde</button>
      </template>

      <template v-else-if="task">
        <p class="progress">
          Aufgabe {{ position + 1 }} von {{ tasks.length }}, {{ right }} richtig
        </p>
        <p class="verb" translate="no">
          {{ task.verb.infinitive }} <span class="verb-en">{{ task.verb.en }}</span>
        </p>

        <form class="answer" @submit.prevent="check">
          <!-- Präsens: ich ___ (an) -->
          <div v-if="mode === 'praesens'" class="answer-row" translate="no">
            <label for="verb-field" class="person">{{ persons[task.person] }}</label>
            <input
              id="verb-field"
              ref="field"
              v-model="typed"
              class="field"
              name="verb-form"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              :disabled="result !== null"
            />
            <span v-if="task.verb.prefix" class="person">… {{ task.verb.prefix }}</span>
          </div>

          <!-- Perfekt: er/sie/es [hat|ist] ___ -->
          <div v-else class="answer-row" translate="no">
            <span class="person">er/sie/es</span>
            <div class="aux" role="group" aria-label="Hilfsverb">
              <button
                v-for="item in ['haben', 'sein'] as const"
                :key="item"
                type="button"
                class="aux-choice"
                :aria-pressed="auxiliary === item"
                :disabled="result !== null"
                @click="auxiliary = item"
              >
                {{ item === 'haben' ? 'hat' : 'ist' }}
              </button>
            </div>
            <input
              id="verb-field"
              ref="field"
              v-model="typed"
              class="field"
              name="participle"
              aria-label="Partizip II"
              placeholder="Partizip II…"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              :disabled="result !== null"
            />
          </div>

          <div class="answer-actions">
            <div class="letters" role="group" aria-label="Sonderzeichen einfügen">
              <button
                v-for="letter in ['ä', 'ö', 'ü', 'ß']"
                :key="letter"
                type="button"
                class="letter"
                :disabled="result !== null"
                @click="insertLetter(letter)"
              >
                {{ letter }}
              </button>
            </div>
            <button
              type="submit"
              class="action"
              :disabled="result !== null || (mode === 'perfekt' && !auxiliary)"
            >
              Prüfen
            </button>
          </div>
        </form>

        <div class="feedback" role="status">
          <template v-if="result">
            <template v-if="mode === 'praesens'">
              <p>
                <strong v-if="result === 'exact'">Richtig.</strong>
                <strong v-else-if="result === 'spelling'">
                  Richtig – geschrieben: {{ persons[task.person] }}
                  {{ presentPhrase(task.verb, task.person) }}.
                </strong>
                <strong v-else>
                  Richtig ist: {{ persons[task.person] }}
                  {{ presentPhrase(task.verb, task.person) }}.
                </strong>
              </p>
              <ul class="paradigm" translate="no">
                <li v-for="(person, index) in persons" :key="person">
                  <span class="paradigm-person">{{ person }}</span>
                  {{ presentPhrase(task.verb, index) }}
                </li>
              </ul>
            </template>
            <template v-else>
              <p>
                <strong v-if="result !== 'wrong' && auxiliaryRight">
                  Richtig: er/sie/es {{ perfectPhrase(task.verb) }}.
                </strong>
                <strong v-else>Richtig ist: er/sie/es {{ perfectPhrase(task.verb) }}.</strong>
                <template v-if="!auxiliaryRight">{{ auxiliaryRule(task.verb) }}</template>
                {{ participleRule(task.verb) }}
              </p>
            </template>
            <button ref="nextButton" type="button" class="action" @click="next">
              {{ position + 1 < tasks.length ? 'Nächste Aufgabe' : 'Ergebnis anzeigen' }}
            </button>
          </template>
        </div>
      </template>
    </div>

    <!-- Case: which article does the verb's object need? -->
    <div v-else-if="mode === 'kasus'" class="cases">
      <p class="cases-intro">
        Manche Verben brauchen ein Objekt im Akkusativ (wen oder was?), andere im Dativ (wem?).
        Wählen Sie den richtigen Artikel.
      </p>
      <ol class="case-list">
        <li v-for="(item, index) in caseItems" :key="item.sentence" class="case-item">
          <p class="case-sentence" translate="no">{{ caseSentence(index) }}</p>
          <div class="case-choices" role="group" :aria-label="`Artikel für Satz ${index + 1}`">
            <button
              v-for="option in item.options"
              :key="option"
              type="button"
              class="aux-choice"
              :class="{
                'is-solution': caseAnswers[index] && option === item.answer,
                'is-picked': caseAnswers[index] === option,
              }"
              :disabled="!!caseAnswers[index]"
              :aria-pressed="caseAnswers[index] === option"
              @click="chooseCase(index, option)"
            >
              {{ option }}
            </button>
          </div>
          <p v-if="caseAnswers[index]" class="case-feedback" role="status">
            <strong>{{ caseAnswers[index] === item.answer ? 'Richtig.' : 'Nicht ganz.' }}</strong>
            {{ item.verb }} + {{ item.objectCase }}: {{ item.solution }}.
          </p>
        </li>
      </ol>
      <div class="cases-result" aria-live="polite">
        <p class="progress">{{ caseRight }} von {{ Object.keys(caseAnswers).length }} richtig</p>
        <button
          v-if="Object.keys(caseAnswers).length"
          type="button"
          class="link-button"
          @click="caseAnswers = {}"
        >
          Noch einmal üben
        </button>
      </div>
    </div>

    <!-- Overview table -->
    <div v-else class="table-wrap">
      <table class="overview">
        <caption class="visually-hidden">
          Verben mit Präsens, Perfekt, Typ und Objekt
        </caption>
        <thead>
          <tr>
            <th scope="col">Infinitiv</th>
            <th scope="col">er/sie/es</th>
            <th scope="col">Perfekt</th>
            <th scope="col">Typ</th>
            <th scope="col">Objekt</th>
          </tr>
        </thead>
        <tbody translate="no">
          <tr v-for="verb in pool" :key="verb.infinitive">
            <th scope="row">
              {{ verb.infinitive }}
              <span class="verb-en">{{ verb.en }}</span>
            </th>
            <td>{{ presentPhrase(verb, 2) }}</td>
            <td>{{ perfectPhrase(verb) }}</td>
            <td>{{ typeLabel(verb) }}</td>
            <td>{{ verb.objectCase ?? '–' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.trainer {
  display: grid;
  gap: var(--space-xl);
}

.controls {
  display: grid;
  gap: var(--space-md);
}

.control {
  display: grid;
  gap: var(--space-2xs);
}

.control-label {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: var(--weight-strong);
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2xs);
}

.option {
  min-block-size: var(--size-control);
  padding-inline: var(--space-sm);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--color-text);
  font-weight: var(--weight-strong);
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast);
}

.option:hover {
  background: var(--color-bg-subtle);
}

.option[aria-pressed='true'] {
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: var(--color-text-on-accent);
}

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

.verb {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--weight-heading);
  line-height: var(--leading-heading);
}

.verb-en {
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-body);
}

.answer {
  display: grid;
  gap: var(--space-sm);
  inline-size: 100%;
}

.answer-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-xs);
}

.person {
  font-size: var(--text-xl);
  font-weight: var(--weight-strong);
}

.field {
  flex: 1;
  min-inline-size: 0;
  min-block-size: var(--size-control);
  padding-inline: var(--space-sm);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-field);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: var(--text-xl);
}

.aux,
.case-choices {
  display: flex;
  gap: var(--space-2xs);
}

.aux-choice {
  min-inline-size: var(--size-control);
  min-block-size: var(--size-control);
  padding-inline: var(--space-sm);
  border: var(--stroke-rule) solid var(--color-accent);
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--color-accent);
  font-weight: var(--weight-strong);
  cursor: pointer;
}

.aux-choice:hover:not(:disabled) {
  background: var(--color-bg-subtle);
}

.aux-choice[aria-pressed='true'],
.aux-choice.is-solution {
  background: var(--color-accent);
  color: var(--color-text-on-accent);
}

.aux-choice:disabled {
  cursor: default;
}

.case-choices .aux-choice:disabled:not(.is-solution):not(.is-picked) {
  opacity: 0.35;
}

.aux-choice.is-picked:not(.is-solution) {
  border-color: var(--color-danger);
  background: transparent;
  color: var(--color-danger);
  text-decoration: line-through;
}

.answer-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-sm);
}

.letters {
  display: flex;
  gap: var(--space-2xs);
}

.letter {
  min-inline-size: var(--size-control);
  min-block-size: var(--size-control);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-field);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: var(--text-lg);
  cursor: pointer;
}

.letter:hover:not(:disabled) {
  background: var(--color-bg-subtle);
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

.action:hover:not(:disabled) {
  background: var(--color-accent-hover);
}

.action:disabled {
  cursor: default;
  opacity: 0.5;
}

.feedback {
  display: grid;
  justify-items: start;
  gap: var(--space-sm);
  max-inline-size: var(--layout-measure);
  color: var(--color-text-muted);
}

.feedback strong {
  color: var(--color-text);
}

.paradigm {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3xs) var(--space-lg);
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--color-text);
}

.paradigm-person {
  display: inline-block;
  min-inline-size: 5.5em;
  color: var(--color-text-muted);
}

.score {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--weight-heading);
  font-variant-numeric: tabular-nums;
}

/* Case worksheet */
.cases {
  display: grid;
  gap: var(--space-lg);
  max-inline-size: var(--layout-content);
}

.cases-intro {
  max-inline-size: var(--layout-measure);
}

.case-list {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
  border-block-start: 1px solid var(--color-border);
}

.case-item {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: var(--space-xs) var(--space-md);
  padding-block: var(--space-sm);
  border-block-end: 1px solid var(--color-border);
}

.case-sentence {
  font-size: var(--text-lg);
}

.case-feedback {
  grid-column: 1 / -1;
  color: var(--color-text-muted);
}

.case-feedback strong {
  color: var(--color-text);
}

.cases-result {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-md);
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

/* Overview */
.table-wrap {
  max-inline-size: 100%;
  overflow-x: auto;
}

.overview {
  inline-size: 100%;
  border-collapse: collapse;
}

.overview th,
.overview td {
  padding: var(--space-xs) var(--space-sm) var(--space-xs) 0;
  border-block-end: 1px solid var(--color-border);
  text-align: start;
  vertical-align: top;
  white-space: nowrap;
}

.overview thead th {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.overview tbody th {
  font-weight: var(--weight-strong);
}

.overview .verb-en {
  display: block;
}
</style>
