<template>
  <Component
    :is="listComponent"
    :artists="artists"
    :items-in-row="itemsInRow"
    :is-with-listeners-count="isWithListenersCount"
    :top-tracks-count="topTracksCount"
    :top-albums-count="topAlbumsCount"
    :is-with-library="isWithLibrary"
    :is-link-to-library="isLinkToLibrary"
    :profile-id="profileId"
    :is-with-created="isWithCreated"
    :is-with-page-option="isWithPageOption"
    :is-with-library-option="isWithLibraryOption"
    :is-with-listened-option="isWithListenedOption"
    :is-with-bookmark-option="isWithBookmarkOption"
    :is-with-favorite-option="isWithFavoriteOption"
    :is-with-share-option="isWithShareOption"
    :is-with-external-link-option="isWithExternalLinkOption"
    :is-with-delete-option="isWithDeleteOption"
    :is-bookmark="isBookmark"
    :is-favorite="isFavorite"
    :is-recommendation="isRecommendation"
  />
</template>

<script>
import BaseArtistsSimpleList from './BaseArtistsSimpleList.vue'
import BaseArtistsTableList from './BaseArtistsTableList.vue'
import BaseArtistsExtendedList from './BaseArtistsExtendedList.vue'

export default {
  name: 'BaseArtistsList',
  components: {
    BaseArtistsSimpleList,
    BaseArtistsTableList,
    BaseArtistsExtendedList
  },
  props: {
    viewId: {
      type: String,
      required: true
    },
    artists: Array,
    isWithListenersCount: Boolean,
    topTracksCount: Number,
    topAlbumsCount: Number,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithCreated: Boolean,
    isWithPageOption: Boolean,
    isWithLibraryOption: Boolean,
    isWithListenedOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isRecommendation: Boolean
  },
  data () {
    return {
      itemsInRow: 5,
      listComponentsData: {
        simple: 'BaseArtistsSimpleList',
        table: 'BaseArtistsTableList',
        extended: 'BaseArtistsExtendedList'
      }
    }
  },
  computed: {
    listComponent () {
      return this.listComponentsData[
        this.viewId
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
