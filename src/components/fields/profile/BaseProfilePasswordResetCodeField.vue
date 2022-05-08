<template>
  <div class="field">
    <input
      ref="input"
      type="text"
      name="password-reset-code"
      :placeholder="passwordResetCodeText"
    >
  </div>
</template>

<script>
export default {
  name: 'BaseProfilePasswordResetCodeField',
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
