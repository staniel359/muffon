<template>
  <BaseDropdown
    class="base-scope-select"
    :options="options"
    :selected="selected"
    :header="header"
    @select="handleSelect"
  />
</template>

<script>
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'

export default {
  name: 'BaseScopeSelect',
  components: {
    BaseDropdown
  },
  props: {
    scopes: {
      type: Array,
      required: true
    },
    selected: String,
    header: String
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
      scopeData
    ) {
      const {
        id,
        icon
      } = scopeData

      const name =
        this.$t(
          `navigation.${id}`
        )

      return {
        id,
        name,
        icon
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.base-scope-select
  min-width: 140px !important
</style>
