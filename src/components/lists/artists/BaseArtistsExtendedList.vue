<template>
  <div class="ui horizontal cards">
    <ArtistItem
      v-for="artistData in artistsFormatted"
      :key="artistData.uuid"
      :artistData="artistData"
      :isWithTracksCount="isWithTracksCount"
      :isWithAlbumsCount="isWithAlbumsCount"
      :isWithLibrary="isWithLibrary"
      :isLinkToLibrary="isLinkToLibrary"
      :profileId="profileId"
      :isWithLibraryLink="isWithLibraryLink"
      :isWithListenedButton="isWithListenedButton"
      :isWithBookmarkButton="isWithBookmarkButton"
      :isRecommendation="isRecommendation"
    />
  </div>
</template>

<script>
import ArtistItem from './BaseArtistsExtendedList/ArtistItem.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseArtistsExtendedList',
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
    isWithTracksCount: Boolean,
    isWithAlbumsCount: Boolean,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryLink: Boolean,
    isWithListenedButton: Boolean,
    isWithBookmarkButton: Boolean,
    isRecommendation: Boolean
  },
  computed: {
    artistsFormatted () {
      return formatCollection(this.artists)
    }
  }
}
</script>

<style lang="sass" scoped></style>
