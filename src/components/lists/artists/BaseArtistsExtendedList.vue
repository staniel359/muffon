<template>
  <div class="ui horizontal cards">
    <ArtistItem
      v-for="artistData in artistsCollection"
      :key="artistData.uuid"
      :artist-data="artistData"
      :is-with-library="isWithLibrary"
      :is-link-to-library="isLinkToLibrary"
      :profile-id="profileId"
      :is-with-library-option="isWithLibraryOption"
      :is-with-favorite-option="isWithFavoriteOption"
      :is-with-bookmark-option="isWithBookmarkOption"
      :is-with-listened-option="isWithListenedOption"
      :is-with-delete-option="isWithDeleteOption"
      :is-recommendation="isRecommendation"
    />
  </div>
</template>

<script>
import ArtistItem from './BaseArtistsExtendedList/ArtistItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

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
