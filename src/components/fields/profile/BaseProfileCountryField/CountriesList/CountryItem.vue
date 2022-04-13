<template>
  <div
    class="item"
    :data-value="code"
  >
    <i :class="icon" />

    {{ name }}
  </div>
</template>

<script>
export default {
  name: 'CountryItem',
  props: {
    countryData: {
      type: Object,
      required: true
    }
  },
  computed: {
    code () {
      return this.countryData[0].toLowerCase()
    },
    icon () {
      return `${this.code} flag`
    },
    name () {
      return this.countryData[1]
    }
  }
}
</script>

<style lang="sass" scoped></style>
