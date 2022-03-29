<template>
  <BaseDropdown
    :options="options"
    :selected="selected"
    @change="handleChange"
  />
</template>

<script>
import BaseDropdown from '*/components/dropdowns/BaseDropdown.vue'

export default {
  name: 'BaseScopesDropdown',
  components: {
    BaseDropdown
  },
  props: {
    scopes: {
      type: Array,
      required: true
    },
    selected: String
  },
  computed: {
    options () {
      return this.scopes.map(
        this.formatOption
      )
    }
  },
  methods: {
    handleChange (value) {
      this.$emit(
        'change',
        value
      )
    },
    formatOption (scope) {
      return {
        id: scope,
        name: this.$t(
          `navigation.${scope}`
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
