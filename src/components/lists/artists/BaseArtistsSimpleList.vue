<template>
  <BaseListContainer
    class="selection"
  >
    <ArtistItem
      v-for="artistData in artistsCollection"
      :key="artistData.uuid"
      :artist-data="artistData"
      :is-with-listeners-count="isWithListenersCount"
      :top-tracks-count="topTracksCount"
      :top-albums-count="topAlbumsCount"
      :is-with-library="isWithLibrary"
      :is-link-to-library="isLinkToLibrary"
      :is-compatibility="isCompatibility"
      :profile-id="profileId"
      :is-with-self-icons="isWithSelfIcons"
      :is-with-page-option="isWithPageOption"
      :is-with-library-option="isWithLibraryOption"
      :is-with-favorite-option="isWithFavoriteOption"
      :is-with-bookmark-option="isWithBookmarkOption"
      :is-with-listened-option="isWithListenedOption"
      :is-with-share-option="isWithShareOption"
      :is-with-external-link-option="isWithExternalLinkOption"
      :is-with-delete-option="isWithDeleteOption"
      :is-with-clear-button="isWithClearButton"
      :is-image-small="isImageSmall"
      :is-bookmark="isBookmark"
      :is-favorite="isFavorite"
      :is-recommendation="isRecommendation"
      :is-paginated="isPaginated"
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
import ArtistItem from './BaseArtistsSimpleList/ArtistItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

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
    isWithSelfIcons: {
      type: Boolean,
      default: true
    },
    isPaginated: {
      type: Boolean,
      default: true
    },
    isWithListenersCount: Boolean,
    topTracksCount: Number,
    topAlbumsCount: Number,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    isCompatibility: Boolean,
    profileId: Number,
    isWithPageOption: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isImageSmall: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isRecommendation: Boolean,
    isWithCreated: Boolean,
    isWithModelIcon: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
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
