<template>
  <div>
    <ArtistItem
      v-for="artistData in artistsCollection"
      :key="artistData.uuid"
      :artist-data="artistData"
      :is-with-library="isWithLibrary"
      :is-link-to-library="isLinkToLibrary"
      :profile-id="profileId"
      :is-with-self-icons="isWithSelfIcons"
      :is-with-page-option="isWithPageOption"
      :is-with-library-option="isWithLibraryOption"
      :is-with-favorite-option="isWithFavoriteOption"
      :is-with-bookmark-option="isWithBookmarkOption"
      :is-with-listened-option="isWithListenedOption"
      :is-with-share-option="isWithShareOption"
      :is-with-external-link-option="isWithExternalLinkOption"
      :is-with-delete-option="isWithDeleteOption"
      :is-recommendation="isRecommendation"
      :is-favorite="isFavorite"
      :is-bookmark="isBookmark"
      :is-with-created="isWithCreated"
    />
  </div>
</template>

<script>
import ArtistItem from './BaseArtistsExtendedList/ArtistItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

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
    isWithSelfIcons: {
      type: Boolean,
      default: true
    },
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: Number,
    isWithPageOption: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isRecommendation: Boolean,
    isFavorite: Boolean,
    isBookmark: Boolean,
    isWithCreated: Boolean
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
