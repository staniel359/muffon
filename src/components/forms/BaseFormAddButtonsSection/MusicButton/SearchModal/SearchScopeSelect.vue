<template>
  <BaseScopeSelect
    class="scope-select-container"
    :scopes="scopes"
    :selected="scope"
    @select="handleSelect"
  />
</template>

<script>
import BaseScopeSelect from '@/components/selects/BaseScopeSelect.vue'

export default {
  name: 'SearchScopeSelect',
  components: {
    BaseScopeSelect
  },
  props: {
    scope: {
      type: String,
      required: true
    }
  },
  emits: [
    'select'
  ],
  data () {
    return {
      scopes: [
        'artists',
        'albums',
        'tracks'
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

<style lang="sass" scoped>
.scope-select-container
  margin-left: 1em !important
</style>
