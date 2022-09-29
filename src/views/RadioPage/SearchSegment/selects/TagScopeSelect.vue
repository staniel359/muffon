<template>
  <BaseScopesDropdown
    :scopes="scopes"
    :selected="selected"
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
    selected () {
      return this.scopes[0]
    }
  },
  mounted () {
    this.select(
      this.selected
    )
  },
  methods: {
    handleSelect (
      value
    ) {
      this.select(
        value
      )
    },
    select (
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
