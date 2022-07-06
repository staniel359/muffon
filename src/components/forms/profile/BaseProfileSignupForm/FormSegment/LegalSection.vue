<template>
  <div class="legal-section">
    <LegalField />
  </div>
</template>

<script>
import LegalField from './LegalSection/LegalField.vue'

export default {
  name: 'LegalSection',
  components: {
    LegalField
  }
}
</script>

<style lang="sass" scoped>
.legal-section
  margin-bottom: 1em
</style>
