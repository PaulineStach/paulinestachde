<script setup lang="ts">
/*
 * Vocabulary trainer: pick a topic, then practise the article (der, die, das), type the
 * plural, or read the word list. One word at a time, with a memory aid after each answer.
 * The order is shuffled in the browser only (after mount), so server and client render alike.
 */
import { vocabularyCategories, type VocabularyWord } from '~/data/vocabulary'

type Mode = 'artikel' | 'plural' | 'liste'

const modes: { id: Mode; label: string }[] = [
  { id: 'artikel', label: 'Artikel' },
  { id: 'plural', label: 'Plural' },
  { id: 'liste', label: 'Wortliste' },
]

const categoryId = ref(vocabularyCategories[0]!.id)
const mode = ref<Mode>('artikel')

const category = computed(
  () =>
    vocabularyCategories.find((item) => item.id === categoryId.value) ?? vocabularyCategories[0]!,
)

const order = ref<number[]>([])
const position = ref(0)
const right = ref(0)

const pickedArticle = ref<Article | null>(null)
const pluralInput = ref('')
const pluralResult = ref<'exact' | 'spelling' | 'wrong' | null>(null)

const nextButton = useTemplateRef<HTMLButtonElement>('nextButton')
const pluralField = useTemplateRef<HTMLInputElement>('pluralField')

const current = computed<VocabularyWord | undefined>(
  () => category.value.words[order.value[position.value] ?? -1],
)
const answered = computed(() =>
  mode.value === 'artikel' ? pickedArticle.value !== null : pluralResult.value !== null,
)
const finished = computed(() => order.value.length > 0 && position.value >= order.value.length)

function shuffled(length: number) {
  const items = Array.from({ length }, (_, index) => index)
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j]!, items[i]!]
  }
  return items
}

function resetAnswer() {
  pickedArticle.value = null
  pluralInput.value = ''
  pluralResult.value = null
}

function start(shuffle = true) {
  const count = category.value.words.length
  order.value = shuffle ? shuffled(count) : Array.from({ length: count }, (_, index) => index)
  position.value = 0
  right.value = 0
  resetAnswer()
}

onMounted(() => start())
watch([categoryId, mode], () => start())

function isArticleRight(word: VocabularyWord, article: Article) {
  return word.article === article || Boolean(word.altArticles?.includes(article))
}

async function chooseArticle(article: Article) {
  if (!current.value || pickedArticle.value) return
  pickedArticle.value = article
  if (isArticleRight(current.value, article)) right.value++
  await nextTick()
  nextButton.value?.focus()
}

/** Compares case-insensitively; ae/oe/ue/ss for ä/ö/ü/ß count, but are pointed out */
function fold(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/^die\s+/, '')
    .replaceAll('ä', 'ae')
    .replaceAll('ö', 'oe')
    .replaceAll('ü', 'ue')
    .replaceAll('ß', 'ss')
}

async function checkPlural() {
  const word = current.value
  if (!word?.plural || pluralResult.value) return
  const typed = pluralInput.value.trim().replace(/^die\s+/i, '')
  if (!typed) return
  if (word.plural.some((form) => form.toLowerCase() === typed.toLowerCase())) {
    pluralResult.value = 'exact'
    right.value++
  } else if (word.plural.some((form) => fold(form) === fold(typed))) {
    pluralResult.value = 'spelling'
    right.value++
  } else {
    pluralResult.value = 'wrong'
  }
  await nextTick()
  nextButton.value?.focus()
}

function insertLetter(letter: string) {
  const field = pluralField.value
  if (!field) return
  const from = field.selectionStart ?? pluralInput.value.length
  const to = field.selectionEnd ?? from
  pluralInput.value = pluralInput.value.slice(0, from) + letter + pluralInput.value.slice(to)
  nextTick(() => {
    field.focus()
    field.setSelectionRange(from + 1, from + 1)
  })
}

async function next() {
  position.value++
  resetAnswer()
  if (mode.value === 'plural') {
    await nextTick()
    pluralField.value?.focus()
  }
}

function pluralText(word: VocabularyWord) {
  return word.plural ? `die ${word.plural.join(' / ')}` : 'kein Plural'
}
</script>

<template>
  <section class="trainer" aria-labelledby="trainer-title">
    <h2 id="trainer-title" class="visually-hidden">Vokabeltrainer</h2>

    <div class="controls">
      <div class="control">
        <p id="topic-label" class="control-label">Thema</p>
        <div class="options" role="group" aria-labelledby="topic-label">
          <button
            v-for="item in vocabularyCategories"
            :key="item.id"
            type="button"
            class="option"
            :aria-pressed="categoryId === item.id"
            @click="categoryId = item.id"
          >
            {{ item.title }}
            <span class="option-count">{{ item.words.length }}</span>
          </button>
        </div>
      </div>
      <div class="control">
        <p id="mode-label" class="control-label">Üben</p>
        <div class="options" role="group" aria-labelledby="mode-label">
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
    </div>

    <!-- Word list -->
    <table v-if="mode === 'liste'" class="list">
      <caption class="visually-hidden">
        Wortliste
        {{
          category.title
        }}
        mit Artikel und Plural
      </caption>
      <thead>
        <tr>
          <th scope="col">Singular</th>
          <th scope="col">Plural</th>
        </tr>
      </thead>
      <tbody translate="no">
        <tr v-for="word in category.words" :key="word.word">
          <th scope="row">
            <span :class="`article article--${word.article}`">{{ word.article }}</span>
            {{ word.word }}
            <span v-if="word.altArticles" class="alt">
              (auch {{ word.altArticles.join(', ') }})
            </span>
          </th>
          <td>{{ pluralText(word) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Drill: one word at a time -->
    <div v-else class="card">
      <template v-if="finished">
        <p class="score">{{ right }} von {{ order.length }} richtig.</p>
        <p class="hint">
          Üben Sie dasselbe Thema noch einmal in neuer Reihenfolge oder wählen Sie oben ein anderes.
        </p>
        <button type="button" class="action" @click="start()">Noch einmal</button>
      </template>

      <template v-else-if="current">
        <p class="progress">Wort {{ position + 1 }} von {{ order.length }}, {{ right }} richtig</p>

        <!-- Article -->
        <template v-if="mode === 'artikel'">
          <p class="word" translate="no">
            <span v-if="pickedArticle" :class="`article article--${current.article}`">{{
              current.article
            }}</span>
            <span v-else class="gap" aria-hidden="true">___</span>
            {{ current.word }}
          </p>
          <div class="choices" role="group" :aria-label="`Artikel für ${current.word}`">
            <button
              v-for="article in articles"
              :key="article"
              type="button"
              class="choice"
              :class="[
                `choice--${article}`,
                {
                  'is-solution': pickedArticle && isArticleRight(current, article),
                  'is-picked': pickedArticle === article,
                },
              ]"
              :disabled="!!pickedArticle"
              :aria-pressed="pickedArticle === article"
              @click="chooseArticle(article)"
            >
              {{ article }}
            </button>
          </div>
        </template>

        <!-- Plural -->
        <form v-else class="plural" @submit.prevent="checkPlural">
          <label for="plural-field" class="word" translate="no">
            <span :class="`article article--${current.article}`">{{ current.article }}</span>
            {{ current.word }}
          </label>
          <div class="plural-row">
            <span class="plural-prefix" aria-hidden="true">die</span>
            <input
              id="plural-field"
              ref="pluralField"
              v-model="pluralInput"
              class="plural-field"
              name="plural"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              :aria-label="`Plural von ${current.article} ${current.word}`"
              :disabled="pluralResult !== null"
            />
            <button type="submit" class="action" :disabled="pluralResult !== null">Prüfen</button>
          </div>
          <div class="letters" role="group" aria-label="Sonderzeichen einfügen">
            <button
              v-for="letter in ['ä', 'ö', 'ü', 'ß']"
              :key="letter"
              type="button"
              class="letter"
              :disabled="pluralResult !== null"
              @click="insertLetter(letter)"
            >
              {{ letter }}
            </button>
          </div>
        </form>

        <div class="feedback" role="status">
          <template v-if="answered">
            <p v-if="mode === 'artikel'">
              <strong v-if="pickedArticle && isArticleRight(current, pickedArticle)"
                >Richtig.</strong
              >
              <strong v-else>Richtig ist: {{ current.article }} {{ current.word }}.</strong>
              Plural: {{ pluralText(current) }}.
              <template v-if="current.tip">{{ current.tip }}</template>
            </p>
            <p v-else>
              <strong v-if="pluralResult === 'exact'">Richtig: {{ pluralText(current) }}.</strong>
              <strong v-else-if="pluralResult === 'spelling'">
                Richtig – geschrieben: {{ pluralText(current) }}.
              </strong>
              <strong v-else>Richtig ist: {{ pluralText(current) }}.</strong>
              <template v-if="current.tip">{{ current.tip }}</template>
            </p>
            <button ref="nextButton" type="button" class="action" @click="next">
              {{ position + 1 < order.length ? 'Nächstes Wort' : 'Ergebnis anzeigen' }}
            </button>
          </template>
        </div>
      </template>
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
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs);
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

.option-count {
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
}

/* Drill card */
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

.word {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--weight-heading);
  line-height: var(--leading-heading);
}

.gap {
  color: var(--color-border-strong);
}

.article--der {
  color: var(--color-der);
}

.article--die {
  color: var(--color-die);
}

.article--das {
  color: var(--color-das);
}

.choices {
  display: flex;
  gap: var(--space-2xs);
}

.choice {
  --choice-color: var(--color-der);

  min-inline-size: var(--size-control);
  min-block-size: var(--size-control);
  padding-inline: var(--space-sm);
  border: var(--stroke-rule) solid var(--choice-color);
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--choice-color);
  font-weight: var(--weight-strong);
  cursor: pointer;
}

.choice--die {
  --choice-color: var(--color-die);
}

.choice--das {
  --choice-color: var(--color-das);
}

.choice:hover:not(:disabled) {
  background: var(--color-bg);
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
}

/* Plural */
.plural {
  display: grid;
  gap: var(--space-sm);
  inline-size: 100%;
}

.plural-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-xs);
}

.plural-prefix {
  color: var(--color-die);
  font-size: var(--text-xl);
  font-weight: var(--weight-strong);
}

.plural-field {
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

.action {
  min-block-size: var(--size-control);
  padding-inline: var(--space-md);
  border: 0;
  border-radius: var(--radius-control);
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  font-weight: var(--weight-strong);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.action:hover:not(:disabled) {
  background: var(--color-accent-hover);
}

.action:disabled {
  cursor: default;
  opacity: 0.5;
}

.score {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--weight-heading);
  font-variant-numeric: tabular-nums;
}

.hint {
  color: var(--color-text-muted);
}

/* Word list */
.list {
  inline-size: 100%;
  max-inline-size: var(--layout-content);
  border-collapse: collapse;
}

.list th,
.list td {
  padding-block: var(--space-xs);
  border-block-end: 1px solid var(--color-border);
  text-align: start;
}

.list thead th {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.list tbody th {
  font-size: var(--text-lg);
  font-weight: var(--weight-strong);
}

.list .article {
  margin-inline-end: var(--space-3xs);
}

.alt {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: var(--weight-body);
}
</style>
