<template>
  <BaseDropdown
    class="floating scrolling scope-select-container"
    menu-direction="left"
    :options="sources"
    :selected="selectedSource"
    :is-selection="false"
    is-only-icon
    @select="handleSelect"
  />
</template>

<script>
import BaseDropdown from '*/components/dropdowns/BaseDropdown.vue'
import audioSources from '*/helpers/data/audio/sources'

export default {
  name: 'SourceSelect',
  components: {
    BaseDropdown
  },
  props: {
    scope: {
      type: String,
      required: true
    }
  },
  emits: [
    'select'
  ],
  computed: {
    sources () {
      return audioSources.filter(
        this.isMatchedSource
      )
    },
    selectedSource () {
      return this.sources[0].id
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
    },
    isMatchedSource (
      sourceData
    ) {
      return sourceData.searchScopes.includes(
        this.scope
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.scope-select-container
  @extend .no-padding
  margin-left: 1em
</style>
