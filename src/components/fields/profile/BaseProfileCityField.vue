<template>
  <div class="field">
    <input
      type="text"
      name="city"
      :placeholder="cityText"
      :value="value"
    >
  </div>
</template>

<script>
export default {
  name: 'BaseProfileCityField',
  props: {
    value: String
  },
  computed: {
    cityText () {
      return this.$t(
        'shared.profile.form.fields.city'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
