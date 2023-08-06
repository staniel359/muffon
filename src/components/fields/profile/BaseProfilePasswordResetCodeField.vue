<template>
  <BaseFormInputContainer>
    <input
      ref="input"
      type="text"
      name="password-reset-code"
      :placeholder="passwordResetCodeText"
    >
  </BaseFormInputContainer>
</template>

<script>
import BaseFormInputContainer
  from '@/components/containers/inputs/form/BaseFormInputContainer.vue'

export default {
  name: 'BaseProfilePasswordResetCodeField',
  components: {
    BaseFormInputContainer
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
