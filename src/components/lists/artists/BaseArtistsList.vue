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
    :is-with-library-option="isWithLibraryOption"
    :is-with-listened-option="isWithListenedOption"
    :is-with-bookmark-option="isWithBookmarkOption"
    :is-with-favorite-option="isWithFavoriteOption"
    :is-with-share-option="isWithShareOption"
    :is-with-delete-option="isWithDeleteOption"
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
    viewIndex: {
      type: Number,
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
    isWithLibraryOption: Boolean,
    isWithListenedOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean
  },
  data () {
    return {
      itemsInRow: 5,
      listComponents: [
        'BaseArtistsSimpleList',
        'BaseArtistsTableList',
        'BaseArtistsExtendedList'
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
