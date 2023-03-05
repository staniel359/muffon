<template>
  <BaseScopeSelect
    class="scope-select-container"
    :selected="scope"
    :scopes="scopes"
    @select="handleSelect"
  />
</template>

<script>
import BaseScopeSelect from '@/components/selects/BaseScopeSelect.vue'
import sources from '@/helpers/data/sources'
import sourceSelectMixin from '@/mixins/sourceSelectMixin'

export default {
  name: 'ScopeSelect',
  components: {
    BaseScopeSelect
  },
  mixins: [
    sourceSelectMixin
  ],
  data () {
    return {
      scopes: [
        'artists',
        'albums',
        'albumGroups',
        'tracks',
        'tags',
        'videos'
      ]
    }
  },
  computed: {
    sources () {
      return sources
    },
    firstScope () {
      return this.sourceScopes[0]
    }
  },
  watch: {
    source: {
      immediate: true,
      handler: 'handleSourceChange'
    }
  },
  methods: {
    handleSourceChange () {
      if (!this.isSourceHasScope) {
        this.select(
          this.firstScope
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.scope-select-container
  margin-left: 1em !important
</style>
