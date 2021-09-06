<template>
  <div class="field">
    <input
      type="password"
      name="password"
      :placeholder="placeholderFormatted"
    >
  </div>
</template>

<script>
export default {
  name: 'BasePasswordField',
  computed: {
    placeholderFormatted () {
      return this.$t(
        'shared.profile.form.fields.password'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
