<template>
  <BaseListContainer
    class="selection"
  >
    <AlbumItem
      v-for="albumData in albumsCollection"
      :key="albumData.uuid"
      :album-data="albumData"
      :is-with-artist-name="isWithArtistName"
      :artist-name="artistName"
      :is-with-source="isWithSource"
      :is-with-self-icons="isWithSelfIcons"
      :is-link-to-library="isLinkToLibrary"
      :is-compatibility="isCompatibility"
      :is-with-library="isWithLibrary"
      :top-tracks-count="topTracksCount"
      :is-with-listeners-count="isWithListenersCount"
      :is-with-page-option="isWithPageOption"
      :is-with-library-option="isWithLibraryOption"
      :is-with-favorite-option="isWithFavoriteOption"
      :is-with-bookmark-option="isWithBookmarkOption"
      :is-with-listened-option="isWithListenedOption"
      :is-with-share-option="isWithShareOption"
      :is-with-external-link-option="isWithExternalLinkOption"
      :is-with-delete-option="isWithDeleteOption"
      :is-with-clear-button="isWithClearButton"
      :is-bookmark="isBookmark"
      :is-favorite="isFavorite"
      :profile-id="profileId"
      :is-with-created="isWithCreated"
      :is-with-model-icon="isWithModelIcon"
      @link-click="handleLinkClick"
      @clear-button-click="handleClearButtonClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import AlbumItem from './BaseAlbumsSimpleList/AlbumItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BaseAlbumsSimpleList',
  components: {
    BaseListContainer,
    AlbumItem
  },
  props: {
    albums: {
      type: Array,
      default () {
        return []
      }
    },
    groups: {
      type: Array,
      default () {
        return []
      }
    },
    isWithSelfIcons: {
      type: Boolean,
      default: true
    },
    isWithArtistName: Boolean,
    artistName: String,
    isWithSource: Boolean,
    isWithListenersCount: Boolean,
    isLinkToLibrary: Boolean,
    isCompatibility: Boolean,
    isWithLibrary: Boolean,
    topTracksCount: Number,
    isWithPageOption: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    profileId: Number,
    isWithCreated: Boolean,
    isWithModelIcon: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
  computed: {
    albumsCollection () {
      return formatCollection(
        this.albumsOrGroups
      )
    },
    albumsOrGroups () {
      if (this.albums.length) {
        return this.albums
      } else {
        return this.groups
      }
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleClearButtonClick (
      {
        uuid
      }
    ) {
      this.$emit(
        'clearButtonClick',
        {
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
