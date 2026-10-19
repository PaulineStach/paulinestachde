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

    <h2>Terminbuchung über Calendly</h2>
    <!-- TODO: check Calendly's address and Data Privacy Framework status at calendly.com/privacy before going live -->
    <p>
      Für die Buchung von Terminen nutze ich Calendly, einen Dienst der Calendly LLC, 115 E Main St,
      Ste A1B, Buford, GA 30518, USA. Der Buchungskalender wird erst geladen, wenn Sie auf „Termin
      im Kalender auswählen“ klicken oder ihn über den Link in einem neuen Tab öffnen. Vorher werden
      keine Daten an Calendly übertragen.
    </p>
    <p>
      Beim Laden erhält Calendly technische Daten wie Ihre IP-Adresse und kann Cookies setzen. Wenn
      Sie einen Termin buchen, verarbeitet Calendly Ihre Angaben aus dem Buchungsformular, etwa
      Name, E-Mail-Adresse und den gewählten Termin, und übermittelt sie an mich. Rechtsgrundlage
      ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO) und die Anbahnung eines
      Vertrags (Art. 6 Abs. 1 lit. b DSGVO). Dabei können Daten in die USA übermittelt werden;
      Calendly ist nach eigenen Angaben unter dem EU-US Data Privacy Framework zertifiziert. Mehr
      dazu unter
      <a href="https://calendly.com/privacy" rel="noopener">calendly.com/privacy</a>.
    </p>

    <h2>Schriftarten und Cookies</h2>
    <p>
      Die Schriftarten dieser Website werden lokal ausgeliefert; es werden keine Daten an Dritte
      übertragen. Diese Website selbst setzt keine Tracking-Cookies – Cookies von Calendly entstehen
      nur, wenn Sie den Buchungskalender laden. Ihre Wahl zwischen hellem und dunklem Design wird
      nur in Ihrem Browser gespeichert.
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
