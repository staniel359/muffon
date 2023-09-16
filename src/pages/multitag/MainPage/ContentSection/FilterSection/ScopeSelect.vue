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
        {
          id: 'artists',
          icon: 'artist'
        },
        {
          id: 'albums',
          icon: 'album'
        }
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
[dir="ltr"]
  .scope-select-container
    margin-left: 1em
[dir="rtl"]
  .scope-select-container
    margin-right: 1em
</style>
