<template>
  <div class="field">
    <input
      type="text"
      name="email"
      autofocus
      :placeholder="emailText"
      :value="value"
    >
  </div>
</template>

<script>
export default {
  name: 'BaseProfileEmailField',
  props: {
    value: String
  },
  computed: {
    emailText () {
      return this.$t(
        'shared.profile.form.fields.email'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
