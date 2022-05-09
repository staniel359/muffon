<template>
  <div
    :class="tableClass"
  >
    <div
      v-for="artistData in artistsCollection"
      :key="artistData.uuid"
      class="column"
    >
      <ArtistItem
        :artist-data="artistData"
        :is-with-listeners-count="isWithListenersCount"
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
    </div>
  </div>
</template>

<script>
import ArtistItem from './BaseArtistsTableList/ArtistItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'
import {
  numberToColumnWidth
} from '*/helpers/actions/plugins/semantic'

export default {
  name: 'BaseArtistsTableList',
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
    itemsInRow: {
      type: Number,
      required: true
    },
    isWithListenersCount: Boolean,
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
  computed: {
    tableClass () {
      return `ui ${this.columnWidth} column grid`
    },
    columnWidth () {
      return numberToColumnWidth(
        this.itemsInRow
      )
    },
    artistsCollection () {
      return formatCollection(
        this.artists
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.card
  @extend .w-100
</style>
