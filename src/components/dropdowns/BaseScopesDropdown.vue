<template>
  <BaseDropdown
    :options="options"
    :selected="selected"
    @select="handleSelect"
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
  emits: [
    'select'
  ],
  computed: {
    options () {
      return this.scopes.map(
        this.formatOption
      )
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    },
    formatOption (
      scope
    ) {
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
