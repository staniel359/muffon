<template>
  <BaseScopesDropdown
    class="scope-select-container"
    selected="artists"
    :scopes="scopes"
    @change="handleChange"
  />
</template>

<script>
import BaseScopesDropdown from '*/components/dropdowns/BaseScopesDropdown.vue'

export default {
  name: 'SearchScopeSelect',
  components: {
    BaseScopesDropdown
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
    handleChange (
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
