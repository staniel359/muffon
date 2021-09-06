<template>
  <div class="field">
    <input
      type="text"
      name="email"
      autofocus
      :placeholder="placeholderFormatted"
      :value="value"
    >
  </div>
</template>

<script>
export default {
  name: 'BaseEmailField',
  props: {
    value: String
  },
  computed: {
    placeholderFormatted () {
      return this.$t(
        'shared.profile.form.fields.email'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
