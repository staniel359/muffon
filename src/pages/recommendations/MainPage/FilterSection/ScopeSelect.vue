<template>
  <BaseScopeSelect
    class="scope-select-container"
    :scopes="scopes"
    :selected="selected"
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
        'tags'
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
  margin-right: 1em
</style>
