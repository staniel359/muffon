<template>
  <div :class="[
    'ui',
    columnWidth,
    'column grid'
  ]">
    <div
      v-for="artistData in artistsFormatted"
      class="column"
      :key="artistData.uuid"
    >
      <ArtistItem
        :artistData="artistData"
        :isWithListenersCount="isWithListenersCount"
        :isWithTracksCount="isWithTracksCount"
        :isWithAlbumsCount="isWithAlbumsCount"
        :isWithLibrary="isWithLibrary"
        :isLinkToLibrary="isLinkToLibrary"
        :profileId="profileId"
        :isWithLibraryLink="isWithLibraryLink"
        :isWithListenedButton="isWithListenedButton"
        :isWithBookmarkButton="isWithBookmarkButton"
        :isWithFavoriteButton="isWithFavoriteButton"
      />
    </div>
  </div>
</template>

<script>
import ArtistItem from './BaseArtistsTableList/ArtistItem.vue'
import { collection as formatCollection } from '#/formatters'
import { numberToColumnWidth } from '#/actions/plugins/semantic'

export default {
  name: 'BaseArtistsTableList',
  components: {
    ArtistItem
  },
  props: {
    artists: {
      type: Array,
      default () {
        return []
      }
    },
    itemsInRow: Number,
    isWithListenersCount: Boolean,
    isWithTracksCount: Boolean,
    isWithAlbumsCount: Boolean,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryLink: Boolean,
    isWithListenedButton: Boolean,
    isWithBookmarkButton: Boolean,
    isWithFavoriteButton: Boolean
  },
  computed: {
    artistsFormatted () {
      return formatCollection(this.artists)
    },
    columnWidth () {
      return numberToColumnWidth(this.itemsInRow)
    }
  }
}
</script>

<style lang="sass" scoped>
.card
  @extend .w-100
</style>
