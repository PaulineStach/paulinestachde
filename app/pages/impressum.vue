<script setup lang="ts">
const { email, name } = useContact()

useSeoMeta({
  title: 'Impressum – Pauline Stach',
  robots: 'noindex',
})
</script>

<template>
  <LegalPage title="Impressum">
    <!-- TODO: complete with the real details before going live (§ 5 DDG) -->
    <h2>Angaben gemäß § 5 DDG</h2>
    <p>
      {{ name }}<br />
      [Straße und Hausnummer]<br />
      [PLZ und Ort]
    </p>

    <h2>Kontakt</h2>
    <p>
      E-Mail: <a :href="`mailto:${email}`">{{ email }}</a
      ><br />
      Telefon: [Telefonnummer]
    </p>

    <h2>Umsatzsteuer</h2>
    <p>[Umsatzsteuer-Identifikationsnummer oder Hinweis auf Kleinunternehmerregelung]</p>

    <h2>Verantwortlich für den Inhalt</h2>
    <p>{{ name }}, Anschrift wie oben</p>
  </LegalPage>
</template>
