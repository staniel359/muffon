<template>
  <BaseInputContainer
    class="fluid field"
  >
    <input
      ref="input"
      type="text"
      name="password-reset-code"
      :placeholder="passwordResetCodeText"
    >
  </BaseInputContainer>
</template>

<script>
import BaseInputContainer
  from '@/components/containers/inputs/BaseInputContainer.vue'

export default {
  name: 'BaseProfilePasswordResetCodeField',
  components: {
    BaseInputContainer
  },
  computed: {
    passwordResetCodeText () {
      return this.$t(
        'forms.fields.passwordResetCode'
      )
    }
  },
  methods: {
    focus () {
      this.$refs
        .input
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
