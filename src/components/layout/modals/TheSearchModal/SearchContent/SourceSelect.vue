<template>
  <BaseDropdown
    class="floating scrolling source-select-container"
    menu-direction="left"
    :options="sources"
    :selected="source"
    :is-selection="false"
    is-only-icon
    @select="handleSelect"
  />
</template>

<script>
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import audioSources from '@/helpers/data/audio/sources'

export default {
  name: 'SourceSelect',
  components: {
    BaseDropdown
  },
  props: {
    source: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    }
  },
  emits: [
    'select'
  ],
  computed: {
    isSourceHasScope () {
      return this.sourceScopes.includes(
        this.scope
      )
    },
    sourceScopes () {
      return this.sourceData.searchScopes
    },
    sourceData () {
      return this.sources.find(
        this.isMatchedSource
      )
    },
    sources () {
      return audioSources
    },
    firstSourceWithScope () {
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
    handleScopeChange () {
      if (!this.isSourceHasScope) {
        this.select(
          this.firstSourceWithScope
        )
      }
    },
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
    },
    isMatchedSource (
      sourceData
    ) {
      return (
        sourceData.id ===
          this.source
      )
    },
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
  @extend .no-padding
  margin-left: 1em
</style>
