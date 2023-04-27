<template>
  <div class="source-select-container">
    <BaseDropdown
      :key="key"
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
    firstSource () {
      return this.sources[0].id
    },
    sources () {
      return sources.filter(
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
