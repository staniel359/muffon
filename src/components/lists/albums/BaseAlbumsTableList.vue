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
        :is-with-artist-name="isWithArtistName"
        :is-with-multiple-artist-names="isWithMultipleArtistNames"
        :is-with-listeners-count="isWithListenersCount"
        :is-with-library="isWithLibrary"
        :is-link-to-library="isLinkToLibrary"
        :profile-id="profileId"
        :is-with-page-option="isWithPageOption"
        :is-with-library-option="isWithLibraryOption"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-listened-option="isWithListenedOption"
        :is-with-self-icons="isWithSelfIcons"
        :is-with-share-option="isWithShareOption"
        :is-with-external-link-option="isWithExternalLinkOption"
        :is-with-delete-option="isWithDeleteOption"
        :is-favorite="isFavorite"
        :is-bookmark="isBookmark"
        :is-with-created="isWithCreated"
        :is-with-source="isWithSource"
      />
    </div>
  </div>
</template>

<script>
import AlbumItem from './BaseAlbumsTableList/AlbumItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'
import {
  numberToColumnWidth
} from '@/helpers/actions/plugins/semantic'

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
    isWithSelfIcons: {
      type: Boolean,
      default: true
    },
    artistName: String,
    isWithArtistName: Boolean,
    isWithMultipleArtistNames: Boolean,
    isWithListenersCount: Boolean,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithPageOption: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isFavorite: Boolean,
    isBookmark: Boolean,
    isWithCreated: Boolean,
    isWithSource: Boolean
  },
  computed: {
    tableClass () {
      return `ui ${this.columnWidth} column relaxed grid`
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
  },
  beforeMount () {
    this.formatAlbums()
  },
  methods: {
    formatAlbums () {
      this.albums.forEach(
        this.formatAlbum
      )
    },
    formatAlbum (
      albumData
    ) {
      if (this.artistName) {
        albumData.artist = {
          name: this.artistName
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
