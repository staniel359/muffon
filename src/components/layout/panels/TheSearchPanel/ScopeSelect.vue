<template>
  <div class="main-right-large-section">
    <BaseScopeSelect
      :selected="scope"
      :scopes="scopes"
      :is-bordered="false"
      is-menu-left
      @select="handleSelect"
    />
  </div>
</template>

<script>
import BaseScopeSelect from '@/components/selects/BaseScopeSelect.vue'
import sources from '@/helpers/data/sources'
import sourceSelectMixin from '@/mixins/sourceSelectMixin'
import searchScopes from '@/helpers/data/searchScopes'

export default {
  name: 'ScopeSelect',
  components: {
    BaseScopeSelect
  },
  mixins: [
    sourceSelectMixin
  ],
  computed: {
    scopes () {
      return searchScopes
    },
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

<style lang="sass" scoped></style>
