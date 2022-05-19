<template>
  <BaseSimpleCardContainer>
    <BaseAlbumLinkContainer
      class="card-link"
      :album-data="albumData"
      :artist-name="artistNameComputed"
      :is-link-to-library="isLinkToLibrary"
      :profile-id="profileId"
      @link-click="handleLinkClick"
    >
      <BaseOptionsDropdown
        model="album"
        :artist-name="artistNameComputed"
        :album-title="albumTitle"
        :image-url="imageData?.original"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
        :share-data="shareData"
        :is-with-library-option="isWithLibraryOption"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-listened-option="isWithListenedOption"
        :is-with-share-option="isWithShareOption"
        :is-with-delete-option="isWithDeleteOption"
        :is-transparent="false"
        @link-click="handleLinkClick"
      />

      <div class="main-simple-card-image-container">
        <BaseImage
          class="rounded bordered"
          model="album"
          :image="imageData?.medium"
        />
      </div>

      <BaseHeader
        class="link"
        tag="h4"
        :text="albumTitle"
      />
    </BaseAlbumLinkContainer>

    <div class="content">
      <BaseAlbumArtistsSection
        v-if="isRenderArtistName"
        class="extra"
        :album-data="albumData"
        :is-link-to-library="isLinkToLibrary"
        :profile-id="profileId"
      />

      <div
        v-if="releaseDate"
        class="description"
        v-text="releaseDate"
      />

      <BaseAlbumListenersCount
        v-if="isWithListenersCount"
        class="description"
        :album-title="albumTitle"
        :artist-name="artistNameComputed"
        :listeners-count="listenersCount"
        @load-end="handleListenersCountLoadEnd"
      />

      <TracksSection
        v-if="isWithLibrary"
        :album-data="albumData"
        :profile-id="profileId"
      />

      <BaseSelfIcons
        v-if="isWithSelfIcons"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
      />
    </div>
  </BaseSimpleCardContainer>
</template>

<script>
import BaseSimpleCardContainer
  from '*/components/containers/cards/BaseSimpleCardContainer.vue'
import BaseAlbumLinkContainer
  from '*/components/containers/links/album/BaseAlbumLinkContainer.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseAlbumArtistsSection
  from '*/components/models/album/BaseAlbumArtistsSection.vue'
import BaseAlbumListenersCount
  from '*/components/models/album/BaseAlbumListenersCount.vue'
import TracksSection from './AlbumItem/TracksSection.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import selfMixin from '*/mixins/selfMixin'
import {
  album as formatAlbumShareData
} from '*/helpers/formatters/share'

export default {
  name: 'AlbumItem',
  components: {
    BaseSimpleCardContainer,
    BaseAlbumLinkContainer,
    BaseOptionsDropdown,
    BaseImage,
    BaseHeader,
    BaseAlbumArtistsSection,
    BaseAlbumListenersCount,
    TracksSection,
    BaseSelfIcons
  },
  mixins: [
    selfMixin
  ],
  inject: {
    findPaginationItem: {
      default: () => false
    }
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    artistName: String,
    isWithArtistName: Boolean,
    isWithMultipleArtistNames: Boolean,
    isWithListenersCount: Boolean,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithSelfIcons: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean
  },
  emits: [
    'linkClick'
  ],
  computed: {
    modelData () {
      return this.albumData
    },
    artistNameComputed () {
      return (
        this.albumData.artist?.name ||
          this.artistName
      )
    },
    albumTitle () {
      return this.albumData.title
    },
    imageData () {
      return this.albumData.image
    },
    releaseDate () {
      return this.albumData.release_date
    },
    listenersCount () {
      return this.albumData.listeners_count
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.albumData.uuid
    },
    isRenderArtistName () {
      return (
        this.isWithArtistName || (
          this.isWithMultipleArtistNames &&
            this.artists?.length > 1
        )
      )
    },
    artists () {
      return this.albumData.artists
    },
    shareData () {
      return formatAlbumShareData(
        this.albumData
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleListenersCountLoadEnd (
      value
    ) {
      this.paginationItem
        .listeners_count = value
    }
  }
}
</script>

<style lang="sass" scoped>
.content
  @extend .d-flex, .flex-column, .align-items-center
</style>
