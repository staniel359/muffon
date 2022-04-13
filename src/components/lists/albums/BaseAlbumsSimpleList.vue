<template>
  <BaseListContainer class="selection">
    <AlbumItem
      v-for="albumData in albumsCollection"
      :key="albumData.uuid"
      :album-data="albumData"
      :is-with-artist-name="isWithArtistName"
      :is-link-to-library="isLinkToLibrary"
      :is-with-listeners-count="isWithListenersCount"
      :is-with-library-option="isWithLibraryOption"
      :is-with-favorite-option="isWithFavoriteOption"
      :is-with-bookmark-option="isWithBookmarkOption"
      :is-with-listened-option="isWithListenedOption"
      :is-with-delete-option="isWithDeleteOption"
      :is-clearable="isClearable"
      :is-bookmark="isBookmark"
      :is-favorite="isFavorite"
      :profile-id="profileId"
      @link-click="handleLinkClick"
      @delete-button-click="handleDeleteButtonClick"
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
    isWithListenersCount: Boolean,
    isLinkToLibrary: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithDeleteOption: Boolean,
    isClearable: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    profileId: String
  },
  emits: [
    'linkClick',
    'deleteButtonClick'
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
    handleDeleteButtonClick (
      {
        uuid
      }
    ) {
      this.$emit(
        'deleteButtonClick',
        {
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
