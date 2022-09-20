<template>
  <BaseScopesDropdown
    :scopes="scopes"
    :selected="selectedScope"
    @select="handleSelect"
  />
</template>

<script>
import BaseScopesDropdown from '@/components/dropdowns/BaseScopesDropdown.vue'

export default {
  name: 'TagScopeSelect',
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
        'tracks'
      ]
    }
  },
  computed: {
    selectedScope () {
      return this.scopes[0]
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
