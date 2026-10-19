<script setup lang="ts">
/*
 * Contact as a split panel: a chalkboard with the invitation on the left, a green form on
 * the right. The site has no backend, so sending opens the visitor's mail program with the
 * message filled in – nothing is stored or transmitted by the website itself.
 */
const { email, mailto } = useContact()

const name = ref('')
const company = ref('')
const message = ref('')

function openDraft() {
  const subject = ['Anfrage Erstgespräch Deutschtraining', company.value.trim()]
    .filter(Boolean)
    .join(' – ')
  const body = [
    'Guten Tag Frau Stach,',
    '',
    message.value.trim(),
    '',
    'Viele Grüße',
    name.value.trim(),
    company.value.trim(),
  ].join('\n')
  window.location.href = mailto(subject, body)
}
</script>

<template>
  <div class="contact-panel">
    <ChalkBoard class="invite">
      <div class="invite-text">
        <h2 id="kontakt-title" class="invite-title">Erzählen Sie mir von Ihrem Team</h2>
        <p>Ich melde mich mit einem Terminvorschlag für das Erstgespräch.</p>
      </div>
    </ChalkBoard>

    <form class="form" @submit.prevent="openDraft">
      <div class="field">
        <label for="contact-name">Ihr Name</label>
        <input id="contact-name" v-model="name" name="name" autocomplete="name" required />
      </div>
      <div class="field">
        <label for="contact-company">Unternehmen</label>
        <input
          id="contact-company"
          v-model="company"
          name="organization"
          autocomplete="organization"
        />
      </div>
      <div class="field">
        <label for="contact-message">Worum geht es?</label>
        <textarea
          id="contact-message"
          v-model="message"
          name="message"
          rows="5"
          required
          aria-describedby="contact-message-hint"
          placeholder="z. B. 8 Mitarbeitende in der Logistik, Niveau A2…"
        />
        <p id="contact-message-hint" class="hint">
          Hilfreich sind: wie viele Mitarbeitende, welches Niveau, in welchen Situationen sie
          Deutsch brauchen und ab wann.
        </p>
      </div>
      <button type="submit" class="submit">E-Mail-Entwurf öffnen</button>
      <p class="note">
        Ihr E-Mail-Programm öffnet sich mit dieser Nachricht an
        <a :href="`mailto:${email}`">{{ email }}</a
        >. Auf dieser Website wird nichts gespeichert.
      </p>
    </form>
  </div>
</template>

<style scoped>
.contact-panel {
  display: grid;
  gap: var(--space-sm);
}

.invite {
  min-block-size: var(--size-card);
}

.invite-text {
  display: grid;
  align-content: center;
  justify-items: center;
  gap: var(--space-sm);
  text-align: center;
  color: var(--color-chalk-muted);
}

.invite-title {
  max-inline-size: 14ch;
  color: var(--color-chalk);
  font-size: var(--text-h1);
  letter-spacing: var(--tracking-display);
}

.form {
  display: grid;
  gap: var(--space-md);
  padding: var(--space-lg);
  border-radius: var(--radius-card);
  background: var(--color-panel);
  color: var(--color-text-on-panel);
}

.field {
  display: grid;
  gap: var(--space-2xs);
}

label {
  font-size: var(--text-sm);
  font-weight: var(--weight-strong);
}

input,
textarea {
  inline-size: 100%;
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid var(--color-field-border-on-panel);
  border-radius: var(--radius-field);
  background: var(--color-field-on-panel);
  color: var(--color-text-on-panel);
}

textarea {
  resize: vertical;
}

input::placeholder,
textarea::placeholder {
  color: var(--color-text-on-panel);
  opacity: 0.7;
}

/* The page's green focus ring would vanish on the green panel */
.form :focus-visible {
  outline-color: var(--color-text-on-panel);
}

.hint,
.note {
  font-size: var(--text-xs);
}

.note a {
  color: inherit;
  overflow-wrap: anywhere;
}

.submit {
  min-block-size: var(--size-control);
  padding-inline: var(--space-md);
  border: 0;
  border-radius: var(--radius-control);
  background: var(--color-text-on-panel);
  color: var(--color-panel);
  font-weight: var(--weight-strong);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.submit:hover {
  background: var(--color-button-on-panel-hover);
}

@media (min-width: 52rem) {
  .contact-panel {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .form {
    padding: var(--space-xl);
  }
}
</style>
