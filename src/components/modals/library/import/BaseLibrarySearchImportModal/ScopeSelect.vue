<template>
  <BaseScopesDropdown
    class="scope-select-container"
    :scopes="scopes"
    :selected="selected"
    @select="handleSelect"
  />
</template>

<script>
import BaseScopesDropdown from '*/components/dropdowns/BaseScopesDropdown.vue'

export default {
  name: 'ScopeSelect',
  components: {
    BaseScopesDropdown
  },
  inject: [
    'setScope'
  ],
  props: {
    selected: {
      type: String,
      required: true
    }
  },
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
      this.setScope(
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
