<script setup lang="ts">
const { email, name } = useContact()

useSeoMeta({
  title: 'Datenschutz – Pauline Stach',
  robots: 'noindex',
})
</script>

<template>
  <LegalPage title="Datenschutzerklärung">
    <!-- TODO: have this reviewed or generated for the final hosting setup before going live -->
    <p class="draft">
      Entwurf – vor der Veröffentlichung an Hosting und tatsächliche Datenverarbeitung anpassen.
    </p>

    <h2>Verantwortliche</h2>
    <p>
      {{ name }}, [Anschrift], E-Mail: <a :href="`mailto:${email}`">{{ email }}</a>
    </p>

    <h2>Hosting und Server-Logfiles</h2>
    <p>
      Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter [Name des Anbieters] technisch
      notwendige Daten wie IP-Adresse, Datum und Uhrzeit des Zugriffs und die aufgerufene Seite.
    </p>

    <h2>Kontakt per E-Mail</h2>
    <p>
      Wenn Sie mir eine E-Mail schreiben, verwende ich Ihre Angaben nur, um Ihre Anfrage zu
      bearbeiten (Art. 6 Abs. 1 lit. b DSGVO).
    </p>

    <h2>Schriftarten und Cookies</h2>
    <p>
      Die Schriftarten dieser Website werden lokal ausgeliefert; es werden keine Daten an Dritte
      übertragen. Diese Website setzt keine Tracking-Cookies. Ihre Wahl zwischen hellem und dunklem
      Design wird nur in Ihrem Browser gespeichert.
    </p>

    <h2>Ihre Rechte</h2>
    <p>
      Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung
      sowie auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde.
    </p>
  </LegalPage>
</template>

<style scoped>
.draft {
  padding: var(--space-xs) var(--space-sm);
  border-inline-start: var(--stroke-marker) solid var(--color-warning);
  background: var(--color-bg-subtle);
}
</style>
