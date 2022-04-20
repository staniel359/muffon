<template>
  <BaseScopesDropdown
    class="scope-select-container"
    selected="artists"
    :scopes="scopes"
    @select="handleSelect"
  />
</template>

<script>
import BaseScopesDropdown from '*/components/dropdowns/BaseScopesDropdown.vue'

export default {
  name: 'FilterScopeSelect',
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
        'tags'
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
  margin-right: 1em
  width: 150px
</style>
