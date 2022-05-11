<template>
  <BaseScopesDropdown
    class="scope-select-container"
    :scopes="scopes"
    :selected="scope"
    @select="handleSelect"
  />
</template>

<script>
import BaseScopesDropdown from '*/components/dropdowns/BaseScopesDropdown.vue'

export default {
  name: 'SearchScopeSelect',
  components: {
    BaseScopesDropdown
  },
  props: {
    scope: {
      type: String,
      required: true
    }
  },
  emits: [
    'select'
  ],
  data () {
    return {
      scopes: [
        'artists',
        'albums',
        'tracks'
      ]
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
    }
  }
}
</script>

<style lang="sass" scoped>
.scope-select-container
  margin-left: 1em !important
</style>
