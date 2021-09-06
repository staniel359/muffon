<template>
  <div class="field">
    <input
      type="text"
      name="city"
      :placeholder="placeholderFormatted"
      :value="value"
    >
  </div>
</template>

<script>
export default {
  name: 'BaseCityField',
  props: {
    value: String
  },
  computed: {
    placeholderFormatted () {
      return this.$t(
        'shared.profile.form.fields.city'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
