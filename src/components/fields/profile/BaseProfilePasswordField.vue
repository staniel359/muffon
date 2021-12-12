<template>
  <div class="field">
    <input
      type="password"
      name="password"
      :placeholder="passwordText"
    >
  </div>
</template>

<script>
export default {
  name: 'BaseProfilePasswordField',
  computed: {
    passwordText () {
      return this.$t(
        'shared.profile.form.fields.password'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
