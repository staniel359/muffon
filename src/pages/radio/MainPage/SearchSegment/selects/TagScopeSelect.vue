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
