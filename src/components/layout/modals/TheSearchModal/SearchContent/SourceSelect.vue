<template>
  <BaseDropdown
    class="floating scrolling source-select-container"
    menu-direction="left"
    :options="sources"
    :selected="source"
    :is-selection="false"
    is-only-icon
    is-colored
    @select="handleSelect"
  />
</template>

<script>
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import audioSources from '@/helpers/data/audio/sources'
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
      return audioSources
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
  @extend .no-padding
  margin-left: 1em
  &.ui.dropdown
    ::v-deep(.menu)
      width: 175px !important
</style>
