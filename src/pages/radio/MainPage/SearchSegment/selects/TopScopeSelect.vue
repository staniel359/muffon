<template>
  <BaseScopeSelect
    header="..."
    :scopes="scopes"
    @select="handleSelect"
  />
</template>

<script>
import BaseScopeSelect from '@/components/selects/BaseScopeSelect.vue'

export default {
  name: 'TopScopeSelect',
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
