<template>
  <Component
    :is="listComponent"
    :albums="albums"
    :artist-name="artistName"
    :items-in-row="itemsInRow"
    :is-with-listeners-count="isWithListenersCount"
    :top-tracks-count="topTracksCount"
    :is-with-artist-name="isWithArtistName"
    :is-with-library="isWithLibrary"
    :is-link-to-library="isLinkToLibrary"
    :profile-id="profileId"
    :is-with-page-option="isWithPageOption"
    :is-with-library-option="isWithLibraryOption"
    :is-with-listened-option="isWithListenedOption"
    :is-with-bookmark-option="isWithBookmarkOption"
    :is-with-favorite-option="isWithFavoriteOption"
    :is-with-share-option="isWithShareOption"
    :is-with-external-link-option="isWithExternalLinkOption"
    :is-with-delete-option="isWithDeleteOption"
    :is-with-created="isWithCreated"
    :is-bookmark="isBookmark"
    :is-favorite="isFavorite"
  />
</template>

<script>
import BaseAlbumsSimpleList from './BaseAlbumsSimpleList.vue'
import BaseAlbumsTableList from './BaseAlbumsTableList.vue'

export default {
  name: 'BaseAlbumsList',
  components: {
    BaseAlbumsSimpleList,
    BaseAlbumsTableList
  },
  props: {
    viewId: {
      type: String,
      required: true
    },
    albums: Array,
    artistName: String,
    isWithListenersCount: Boolean,
    topTracksCount: Number,
    isWithArtistName: Boolean,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithPageOption: Boolean,
    isWithLibraryOption: Boolean,
    isWithListenedOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithCreated: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean
  },
  data () {
    return {
      itemsInRow: 4,
      listComponentsData: {
        simple: 'BaseAlbumsSimpleList',
        table: 'BaseAlbumsTableList'
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
