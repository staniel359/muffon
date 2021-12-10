<template>
  <div class="field">
    <input
      type="password"
      name="passwordConfirmation"
      :placeholder="placeholderFormatted"
    >
  </div>
</template>

<script>
export default {
  name: 'BaseProfilePasswordConfirmationField',
  computed: {
    placeholderFormatted () {
      return this.$t(
        'shared.profile.form.fields.passwordConfirmation'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
