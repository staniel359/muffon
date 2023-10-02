<template>
  <div class="main-right-section">
    <BaseDropdown
      :options="sources"
      :selected="source"
      :is-bordered="false"
      is-only-icon
      is-icon-colored
      is-menu-left
      @select="handleSelect"
    />
  </div>
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

<style lang="sass" scoped></style>
