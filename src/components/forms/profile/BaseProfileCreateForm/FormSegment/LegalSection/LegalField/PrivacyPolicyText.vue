<template>
  <strong
    class="main-link"
    @click.stop="handleClick"
    v-text="privacyPolicyText"
  />

  <PrivacyPolicyModal
    ref="modal"
  />
</template>

<script>
import PrivacyPolicyModal from './PrivacyPolicyText/PrivacyPolicyModal.vue'

export default {
  name: 'PrivacyPolicyText',
  components: {
    PrivacyPolicyModal
  },
  computed: {
    privacyPolicyText () {
      return this.$t(
        'forms.fields.legal.privacyPolicy'
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
