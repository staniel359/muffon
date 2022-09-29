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
  name: 'ArtistScopeSelect',
  components: {
    BaseScopesDropdown
  },
  emits: [
    'select'
  ],
  data () {
    return {
      scopes: [
        'tracks',
        'similar'
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
