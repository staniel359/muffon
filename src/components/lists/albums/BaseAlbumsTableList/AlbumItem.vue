<template>
  <BaseSimpleCardContainer
    :class="{
      disabled: isDeleted
    }"
  >
    <BaseDeletedSection
      v-if="isDeleted"
      model="album"
    />
    <template
      v-else
    >
      <BaseAlbumLinkContainer
        class="card-link"
        :album-data="albumData"
        :artist-name="artistName"
        :is-link-to-library="isLinkToLibrary"
        :profile-id="profileId"
        @link-click="handleLinkClick"
      >
        <BaseAlbumOptionsDropdown
          :album-data="albumData"
          :library-id="libraryId"
          :favorite-id="favoriteId"
          :bookmark-id="bookmarkId"
          :listened-id="listenedId"
          :is-link-to-library="isLinkToLibrary"
          :is-with-page-option="isWithPageOption"
          :is-with-library-option="isWithLibraryOption"
          :is-with-favorite-option="isWithFavoriteOption"
          :is-with-bookmark-option="isWithBookmarkOption"
          :is-with-listened-option="isWithListenedOption"
          :is-with-share-option="isWithShareOption"
          :is-with-delete-option="isWithDeleteOption && isSelf"
          @link-click="handleLinkClick"
          @deleted="handleDeleted"
        />

        <div class="main-image-container">
          <BaseImage
            class="rounded bordered"
            model="album"
            :image="imageData?.medium"
          />
        </div>

        <BaseHeader
          class="center aligned link"
          tag="h4"
          :text="albumTitle"
        />
      </BaseAlbumLinkContainer>

      <div class="center aligned content">
        <BaseAlbumArtistsSection
          v-if="isRenderArtistName"
          class="extra"
          :album-data="albumData"
          :is-link-to-library="isLinkToLibrary"
          :profile-id="profileId"
        />

        <BaseAlbumReleaseDateSection
          class="description"
          :album-data="albumData"
        />

        <BaseCreatedSection
          v-if="isWithCreated"
          class="description"
          :model-data="albumData"
        />

        <BaseAlbumListenersCount
          v-if="isWithListenersCount"
          class="description"
          :album-title="albumTitle"
          :artist-name="artistName"
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
          :is-with-library-icon="isWithLibraryIcon"
          :is-with-favorite-icon="isWithFavoriteIcon"
          :is-with-bookmark-icon="isWithBookmarkIcon"
        />
      </div>
    </template>
  </BaseSimpleCardContainer>
</template>

<script>
import BaseSimpleCardContainer
  from '@/components/containers/cards/BaseSimpleCardContainer.vue'
import BaseDeletedSection from '@/components/sections/BaseDeletedSection.vue'
import BaseAlbumLinkContainer
  from '@/components/containers/links/album/BaseAlbumLinkContainer.vue'
import BaseAlbumOptionsDropdown
  from '@/components/dropdowns/album/BaseAlbumOptionsDropdown.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseAlbumArtistsSection
  from '@/components/models/album/BaseAlbumArtistsSection.vue'
import BaseAlbumReleaseDateSection
  from '@/components/models/album/BaseAlbumReleaseDateSection.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BaseAlbumListenersCount
  from '@/components/models/album/BaseAlbumListenersCount.vue'
import TracksSection from './AlbumItem/TracksSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'AlbumItem',
  components: {
    BaseSimpleCardContainer,
    BaseDeletedSection,
    BaseAlbumLinkContainer,
    BaseAlbumOptionsDropdown,
    BaseImage,
    BaseHeader,
    BaseAlbumArtistsSection,
    BaseAlbumReleaseDateSection,
    BaseCreatedSection,
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
    isWithArtistName: Boolean,
    isWithMultipleArtistNames: Boolean,
    isWithListenersCount: Boolean,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithSelfIcons: Boolean,
    isWithPageOption: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isFavorite: Boolean,
    isBookmark: Boolean,
    isWithCreated: Boolean
  },
  emits: [
    'linkClick'
  ],
  computed: {
    modelData () {
      return this.albumData
    },
    artistName () {
      return this.albumData.artist.name
    },
    albumTitle () {
      return this.albumData.title
    },
    imageData () {
      return this.albumData.image
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
    isDeleted () {
      return !!this.albumData.isDeleted
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
      this.paginationItem.listeners_count = value
    },
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    handleDeleted () {
      this.paginationItem.isDeleted = true
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
