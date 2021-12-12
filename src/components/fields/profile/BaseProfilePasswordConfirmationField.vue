<template>
  <div class="field">
    <input
      type="password"
      name="passwordConfirmation"
      :placeholder="passwordConfirmationText"
    >
  </div>
</template>

<script>
export default {
  name: 'BaseProfilePasswordConfirmationField',
  computed: {
    passwordConfirmationText () {
      return this.$t(
        'shared.profile.form.fields.passwordConfirmation'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
