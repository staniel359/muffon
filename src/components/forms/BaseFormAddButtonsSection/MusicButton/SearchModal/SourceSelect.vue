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
import {
  allWithArtists as getSourcesWithArtists,
  allWithAlbums as getSourcesWithAlbums,
  allWithTracks as getSourcesWithTracks
} from '@/helpers/formatters/sources'
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
      switch (this.scope) {
        case 'artists':
          return getSourcesWithArtists()
        case 'albums':
          return getSourcesWithAlbums()
        case 'tracks':
          return getSourcesWithTracks()
        default:
          return []
      }
    },
    firstSource () {
      return this.sources[0].id
    }
  },
  watch: {
    scope: 'handleScopeChange'
  }
}
</script>

<style lang="sass" scoped>
.source-select-container
  @extend .no-padding
  margin-left: 1em
</style>
