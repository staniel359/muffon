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
