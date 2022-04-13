<template>
  <div
    :class="tableClass"
  >
    <div
      v-for="albumData in albumsCollection"
      :key="albumData.uuid"
      class="column"
    >
      <AlbumItem
        :album-data="albumData"
        :artist-name="artistName"
        :is-with-artist-name="isWithArtistName"
        :is-with-listeners-count="isWithListenersCount"
        :is-with-library="isWithLibrary"
        :is-link-to-library="isLinkToLibrary"
        :profile-id="profileId"
        :is-with-library-option="isWithLibraryOption"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-listened-option="isWithListenedOption"
        :is-with-delete-option="isWithDeleteOption"
      />
    </div>
  </div>
</template>

<script>
import AlbumItem from './BaseAlbumsTableList/AlbumItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'
import {
  numberToColumnWidth
} from '*/helpers/actions/plugins/semantic'

export default {
  name: 'BaseAlbumsTableList',
  components: {
    AlbumItem
  },
  props: {
    albums: {
      type: Array,
      default () {
        return []
      }
    },
    itemsInRow: {
      type: Number,
      required: true
    },
    artistName: String,
    isWithArtistName: Boolean,
    isWithListenersCount: Boolean,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithDeleteOption: Boolean
  },
  computed: {
    tableClass () {
      return `ui ${this.columnWidth} column grid`
    },
    columnWidth () {
      return numberToColumnWidth(
        this.itemsInRow
      )
    },
    albumsCollection () {
      return formatCollection(
        this.albums
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
