<template>
  <BaseSimpleCardContainer
    :class="{
      disabled: isDeleted
    }"
  >
    <BaseDeletedBlock
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
          :is-with-library-option="isWithLibraryOption"
          :is-with-favorite-option="isWithFavoriteOption"
          :is-with-bookmark-option="isWithBookmarkOption"
          :is-with-listened-option="isWithListenedOption"
          :is-with-share-option="isWithShareOption"
          :is-with-delete-option="isWithDeleteOption"
          @link-click="handleLinkClick"
          @delete-option-click="handleDeleteOptionClick"
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

        <BaseAlbumReleaseDateSection
          class="description"
          :album-data="albumData"
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

      <BaseLibraryDeleteModal
        v-if="isLinkToLibrary && isSelf"
        ref="deleteModal"
        model="album"
        :profile-id="profileId"
        :model-id="libraryAlbumId"
        :model-name="albumFullTitle"
        @success="handleDeleted"
      />
    </template>
  </BaseSimpleCardContainer>
</template>

<script>
import BaseSimpleCardContainer
  from '@/components/containers/cards/BaseSimpleCardContainer.vue'
import BaseDeletedBlock from '@/components/BaseDeletedBlock.vue'
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
import BaseAlbumListenersCount
  from '@/components/models/album/BaseAlbumListenersCount.vue'
import TracksSection from './AlbumItem/TracksSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseLibraryDeleteModal
  from '@/components/modals/library/BaseLibraryDeleteModal.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'AlbumItem',
  components: {
    BaseSimpleCardContainer,
    BaseDeletedBlock,
    BaseAlbumLinkContainer,
    BaseAlbumOptionsDropdown,
    BaseImage,
    BaseHeader,
    BaseAlbumArtistsSection,
    BaseAlbumReleaseDateSection,
    BaseAlbumListenersCount,
    TracksSection,
    BaseSelfIcons,
    BaseLibraryDeleteModal
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
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isFavorite: Boolean,
    isBookmark: Boolean
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
    },
    libraryAlbumId () {
      return this.albumData.library.id.toString()
    },
    albumFullTitle () {
      return [
        this.artistName,
        this.albumTitle
      ].join(
        ' - '
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

<style lang="sass" scoped>
.content
  @extend .d-flex, .flex-column, .align-items-center
</style>
