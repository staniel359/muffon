<template>
  <BaseScopeSelect
    :scopes="scopes"
    :selected="selected"
    @select="handleSelect"
  />
</template>

<script>
import BaseScopeSelect from '@/components/selects/BaseScopeSelect.vue'

export default {
  name: 'ArtistScopeSelect',
  components: {
    BaseScopeSelect
  },
  emits: [
    'select'
  ],
  data () {
    return {
      scopes: [
        {
          id: 'tracks',
          icon: 'track'
        },
        {
          id: 'similar',
          icon: 'artist'
        }
      ]
    }
  },
  computed: {
    selected () {
      return this.scopes[0].id
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
