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
    :is-with-library-option="isWithLibraryOption"
    :is-with-listened-option="isWithListenedOption"
    :is-with-bookmark-option="isWithBookmarkOption"
    :is-with-favorite-option="isWithFavoriteOption"
    :is-with-share-option="isWithShareOption"
    :is-with-delete-option="isWithDeleteOption"
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
    viewIndex: {
      type: Number,
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
    isWithLibraryOption: Boolean,
    isWithListenedOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean
  },
  data () {
    return {
      itemsInRow: 4,
      listComponents: [
        'BaseAlbumsSimpleList',
        'BaseAlbumsTableList'
      ]
    }
  },
  computed: {
    listComponent () {
      return this.listComponents[
        this.viewIndex
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
