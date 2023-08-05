<template>
  <BaseDropdown
    class="scope-select"
    :options="options"
    :selected="selected"
    :header="header"
    :is-bordered="isBordered"
    :is-menu-left="isMenuLeft"
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
    isBordered: {
      type: Boolean,
      default: true
    },
    selected: String,
    header: String,
    isMenuLeft: Boolean
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
.scope-select
  &.selection
    min-width: 140px !important
</style>
