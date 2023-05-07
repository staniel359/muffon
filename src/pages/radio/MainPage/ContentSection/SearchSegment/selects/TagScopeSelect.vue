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
  name: 'TagScopeSelect',
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
          id: 'artists',
          icon: 'artist'
        },
        {
          id: 'tracks',
          icon: 'track'
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
