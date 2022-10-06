<template>
  <BaseScopesDropdown
    :scopes="scopes"
    :selected="scope"
    @select="handleSelect"
  />
</template>

<script>
import BaseScopesDropdown from '@/components/dropdowns/BaseScopesDropdown.vue'

export default {
  name: 'ScopeSelect',
  components: {
    BaseScopesDropdown
  },
  props: {
    scope: String
  },
  emits: [
    'select'
  ],
  data () {
    return {
      scopes: [
        'top',
        'tag',
        'artist'
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

<style lang="sass" scoped></style>
