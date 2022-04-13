<template>
  <BaseScopesDropdown
    selected="artists"
    :scopes="scopes"
    @change="handleChange"
  />
</template>

<script>
import BaseScopesDropdown from '*/components/dropdowns/BaseScopesDropdown.vue'

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

<style lang="sass" scoped></style>
