<template>
  <BaseDropdown
    class="floating scrolling source-select-container"
    menu-direction="left"
    :options="sources"
    :selected="source"
    :is-selection="false"
    is-only-icon
    is-icon-colored
    @select="handleSelect"
  />
</template>

<script>
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import {
  withTracks as sourcesWithTracks
} from '@/helpers/formatters/sources'

export default {
  name: 'SourceSelect',
  components: {
    BaseDropdown
  },
  props: {
    source: String
  },
  emits: [
    'select'
  ],
  computed: {
    sources () {
      return sourcesWithTracks
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

<style lang="sass" scoped>
.source-select-container
  @extend .no-padding
  margin-left: 1em
</style>
