<template>
  <BaseScopesDropdown
    class="scope-select-container"
    selected="artists"
    :scopes="scopes"
    @change="handleChange"
  />
</template>

<script>
import BaseScopesDropdown from '@/dropdowns/BaseScopesDropdown.vue'

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
    handleChange (value) {
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
</style>
