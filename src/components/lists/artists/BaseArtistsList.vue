<template>
  <Component
    :is="listComponent"
    :artists="artists"
    :itemsInRow="5"
    :isWithListenersCount="isWithListenersCount"
    :topTracksCount="topTracksCount"
    :topAlbumsCount="topAlbumsCount"
    :isWithLibrary="isWithLibrary"
    :isLinkToLibrary="isLinkToLibrary"
    :profileId="profileId"
    :isWithLibraryOption="isWithLibraryOption"
    :isWithListenedOption="isWithListenedOption"
    :isWithBookmarkOption="isWithBookmarkOption"
    :isWithFavoriteOption="isWithFavoriteOption"
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
