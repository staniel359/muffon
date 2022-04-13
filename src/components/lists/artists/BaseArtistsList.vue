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
    :is-with-library-option="isWithLibraryOption"
    :is-with-listened-option="isWithListenedOption"
    :is-with-bookmark-option="isWithBookmarkOption"
    :is-with-favorite-option="isWithFavoriteOption"
  />
</template>

<script>
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'
import BaseArtistsTableList
  from '*/components/lists/artists/BaseArtistsTableList.vue'
import BaseArtistsExtendedList
  from '*/components/lists/artists/BaseArtistsExtendedList.vue'

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
    artists: {
      type: Array,
      default () {
        return []
      }
    },
    isWithListenersCount: Boolean,
    topTracksCount: Number,
    topAlbumsCount: Number,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryOption: Boolean,
    isWithListenedOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithFavoriteOption: Boolean
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
