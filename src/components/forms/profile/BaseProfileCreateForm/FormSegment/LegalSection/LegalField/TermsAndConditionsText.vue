<template>
  <strong
    class="main-link"
    @click.stop="handleClick"
    v-text="termsAndConditionsText"
  />

  <TermsAndConditionsModal
    ref="modal"
  />
</template>

<script>
import TermsAndConditionsModal
  from './TermsAndConditionsText/TermsAndConditionsModal.vue'

export default {
  name: 'TermsAndConditionsText',
  components: {
    TermsAndConditionsModal
  },
  computed: {
    termsAndConditionsText () {
      return this.$t(
        'forms.fields.legal.termsAndConditions'
      )
    }
  },
  methods: {
    handleClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
