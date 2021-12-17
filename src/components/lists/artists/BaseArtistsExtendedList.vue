<template>
  <div class="ui horizontal cards">
    <ArtistItem
      v-for="artistData in artistsCollection"
      :key="artistData.uuid"
      :artistData="artistData"
      :isWithLibrary="isWithLibrary"
      :isLinkToLibrary="isLinkToLibrary"
      :profileId="profileId"
      :isWithLibraryOption="isWithLibraryOption"
      :isWithFavoriteOption="isWithFavoriteOption"
      :isWithBookmarkOption="isWithBookmarkOption"
      :isWithListenedOption="isWithListenedOption"
      :isWithDeleteOption="isWithDeleteOption"
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
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithDeleteOption: Boolean,
    isRecommendation: Boolean
  },
  computed: {
    artistsCollection () {
      return formatCollection(
        this.artists
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
