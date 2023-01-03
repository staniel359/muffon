<template>
  <div class="field">
    <input
      ref="input"
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
        'forms.fields.password'
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
