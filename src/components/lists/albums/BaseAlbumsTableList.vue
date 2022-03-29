<template>
  <div :class="[
    'ui',
    columnWidth,
    'column grid'
  ]">
    <div
      v-for="albumData in albumsCollection"
      class="column"
      :key="albumData.uuid"
    >
      <AlbumItem
        :albumData="albumData"
        :artistName="artistName"
        :isWithArtistName="isWithArtistName"
        :isWithListenersCount="isWithListenersCount"
        :isWithLibrary="isWithLibrary"
        :isLinkToLibrary="isLinkToLibrary"
        :profileId="profileId"
        :isWithLibraryOption="isWithLibraryOption"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithBookmarkOption="isWithBookmarkOption"
        :isWithListenedOption="isWithListenedOption"
        :isWithDeleteOption="isWithDeleteOption"
      />
    </div>
  </div>
</template>

<script>
import AlbumItem from './BaseAlbumsTableList/AlbumItem.vue'
import { collection as formatCollection } from '*/helpers/formatters'
import { numberToColumnWidth } from '*/helpers/actions/plugins/semantic'

export default {
  name: 'BaseAlbumsTableList',
  components: {
    AlbumItem
  },
  props: {
    itemsInRow: {
      type: Number,
      required: true
    },
    albums: {
      type: Array,
      default () {
        return []
      }
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
    albumsCollection () {
      return formatCollection(
        this.albums
      )
    },
    columnWidth () {
      return numberToColumnWidth(
        this.itemsInRow
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
