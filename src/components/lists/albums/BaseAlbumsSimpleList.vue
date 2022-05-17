<template>
  <BaseListContainer class="selection">
    <AlbumItem
      v-for="albumData in albumsCollection"
      :key="albumData.uuid"
      :album-data="albumData"
      :is-with-artist-name="isWithArtistName"
      :is-with-source="isWithSource"
      :is-with-self-icons="isWithSelfIcons"
      :is-link-to-library="isLinkToLibrary"
      :is-with-listeners-count="isWithListenersCount"
      :is-with-library-option="isWithLibraryOption"
      :is-with-favorite-option="isWithFavoriteOption"
      :is-with-bookmark-option="isWithBookmarkOption"
      :is-with-listened-option="isWithListenedOption"
      :is-with-share-option="isWithShareOption"
      :is-with-delete-option="isWithDeleteOption"
      :is-with-clear-button="isWithClearButton"
      :is-bookmark="isBookmark"
      :is-favorite="isFavorite"
      :profile-id="profileId"
      @link-click="handleLinkClick"
      @clear-button-click="handleClearButtonClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import AlbumItem from './BaseAlbumsSimpleList/AlbumItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

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
    isWithArtistName: Boolean,
    isWithSource: Boolean,
    isWithSelfIcons: Boolean,
    isWithListenersCount: Boolean,
    isLinkToLibrary: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    profileId: String
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
