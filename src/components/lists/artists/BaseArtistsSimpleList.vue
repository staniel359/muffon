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
      :is-with-delete-option="isWithDeleteOption"
      :is-clearable="isClearable"
      :is-image-small="isImageSmall"
      :is-bookmark="isBookmark"
      :is-favorite="isFavorite"
      @link-click="handleLinkClick"
      @delete-button-click="handleDeleteButtonClick"
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
    isWithDeleteOption: Boolean,
    isClearable: Boolean,
    isImageSmall: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean
  },
  emits: [
    'linkClick',
    'deleteButtonClick'
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
