<template>
  <BaseScopesDropdown
    selected="tag"
    :scopes="scopes"
    @change="handleChange"
  />
</template>

<script>
import BaseScopesDropdown from '@/dropdowns/BaseScopesDropdown.vue'

export default {
  name: 'ScopeSelect',
  components: {
    BaseScopesDropdown
  },
  emits: [
    'select'
  ],
  data () {
    return {
      scopes: [
        'tag',
        'artist'
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

<style lang="sass" scoped></style>
