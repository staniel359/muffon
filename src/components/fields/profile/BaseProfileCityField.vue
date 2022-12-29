<template>
  <div class="field">
    <input
      type="text"
      name="city"
      :placeholder="cityText"
      :value="city"
    >
  </div>
</template>

<script>
export default {
  name: 'BaseProfileCityField',
  props: {
    city: String
  },
  computed: {
    cityText () {
      return this.$t(
        'forms.fields.city'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
