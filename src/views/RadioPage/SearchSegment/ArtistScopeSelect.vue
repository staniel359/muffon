<template>
  <BaseScopesDropdown
    selected="tracks"
    :scopes="scopes"
    @change="handleChange"
  />
</template>

<script>
import BaseScopesDropdown from '@/dropdowns/BaseScopesDropdown.vue'

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
