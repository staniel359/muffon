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
  withArtists as sourcesWithArtists,
  withAlbums as sourcesWithAlbums,
  withTracks as sourcesWithTracks
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
          return sourcesWithArtists
        case 'albums':
          return sourcesWithAlbums
        case 'tracks':
          return sourcesWithTracks
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
