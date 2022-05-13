<template>
  <BaseListContainer class="selection">
    <ArtistItem
      v-for="artistData in artistsCollection"
      :key="artistData.uuid"
      :artist-data="artistData"
      :is-with-listeners-count="isWithListenersCount"
      :top-tracks-count="topTracksCount"
      :top-albums-count="topAlbumsCount"
      :is-with-library="isWithLibrary"
      :is-link-to-library="isLinkToLibrary"
      :profile-id="profileId"
      :is-with-library-option="isWithLibraryOption"
      :is-with-favorite-option="isWithFavoriteOption"
      :is-with-bookmark-option="isWithBookmarkOption"
      :is-with-listened-option="isWithListenedOption"
      :is-with-share-option="isWithShareOption"
      :is-with-delete-option="isWithDeleteOption"
      :is-clearable="isClearable"
      :is-image-small="isImageSmall"
      :is-bookmark="isBookmark"
      :is-favorite="isFavorite"
      @link-click="handleLinkClick"
      @delete-option-click="handleDeleteOptionClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import ArtistItem from './BaseArtistsSimpleList/ArtistItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'BaseArtistsSimpleList',
  components: {
    BaseListContainer,
    ArtistItem
  },
  provide () {
    return {
      findListItem: this.findListItem
    }
  },
  props: {
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
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isClearable: Boolean,
    isImageSmall: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean
  },
  emits: [
    'linkClick',
    'deleteOptionClick'
  ],
  computed: {
    artistsCollection () {
      return formatCollection(
        this.artists
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleDeleteOptionClick (
      {
        uuid
      }
    ) {
      this.$emit(
        'deleteOptionClick',
        {
          uuid
        }
      )
    },
    findListItem (
      {
        uuid
      }
    ) {
      function isMatchedItem (
        itemData
      ) {
        return itemData.uuid === uuid
      }

      return this.artistsCollection.find(
        isMatchedItem
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
