<template>
  <BaseScopeSelect
    :scopes="scopes"
    :selected="scope"
    @select="handleSelect"
  />
</template>

<script>
import BaseScopeSelect from '@/components/selects/BaseScopeSelect.vue'

export default {
  name: 'ScopeSelect',
  components: {
    BaseScopeSelect
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
        {
          id: 'top',
          icon: 'top'
        },
        {
          id: 'tag',
          icon: 'tag'
        },
        {
          id: 'artist',
          icon: 'artist'
        }
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
