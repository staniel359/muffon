<template>
  <div class="source-select-container">
    <BaseDropdown
      class="floating scrolling"
      menu-direction="left"
      :options="sources"
      :selected="source"
      :is-selection="false"
      is-colored
      @select="handleSelect"
    />
  </div>
</template>

<script>
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import sources from '@/helpers/data/sources'
import sourceSelectMixin from '@/mixins/sourceSelectMixin'

export default {
  name: 'SourceSelect',
  components: {
    BaseDropdown
  },
  mixins: [
    sourceSelectMixin
  ],
  computed: {
    sources () {
      return sources
    },
    firstSource () {
      return this.sourcesWithScope[0].id
    },
    sourcesWithScope () {
      return this.sources.filter(
        this.isSourceWithScope
      )
    }
  },
  watch: {
    scope: 'handleScopeChange'
  },
  methods: {
    isSourceWithScope (
      sourceData
    ) {
      return sourceData
        .searchScopes
        .includes(
          this.scope
        )
    }
  }
}
</script>

<style lang="sass" scoped>
.source-select-container
  margin-left: 1em
</style>
