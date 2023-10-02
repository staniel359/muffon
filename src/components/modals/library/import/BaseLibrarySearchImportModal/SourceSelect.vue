<template>
  <div class="main-right-section">
    <BaseDropdown
      :key="key"
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

<style lang="sass" scoped></style>
