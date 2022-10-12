<template>
  <BaseSimpleCardContainer
    :class="{
      disabled: isDeleted
    }"
  >
    <BaseDeletedSection
      v-if="isDeleted"
      model="artist"
    />
    <template
      v-else
    >
      <BaseArtistOptionsDropdown
        :artist-data="artistData"
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
        @delete-option-click="handleDeleteOptionClick"
      />

      <BaseArtistLinkContainer
        class="card-link"
        :artist-data="artistData"
        :is-link-to-library="isLinkToLibrary"
        :profile-id="profileId"
      >
        <div class="main-image-container">
          <BaseArtistImage
            size="small"
            :image-data="imageData"
            :artist-name="artistName"
            @load-end="handleImageLoadEnd"
          />
        </div>

        <BaseHeader
          class="center aligned link"
          tag="h4"
          :text="artistName"
        />
      </BaseArtistLinkContainer>

      <div class="center aligned content">
        <BaseArtistListenersCount
          v-if="isWithListenersCount"
          class="description"
          :artist-name="artistName"
          :listeners-count="listenersCount"
          @load-end="handleListenersCountLoadEnd"
        />

        <LibraryCountersSection
          v-if="isWithLibrary"
          :artist-data="artistData"
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
        model="artist"
        :profile-id="profileId"
        :model-id="libraryArtistId"
        :model-name="artistName"
        @success="handleDeleted"
      />
    </template>
  </BaseSimpleCardContainer>
</template>

<script>
import BaseSimpleCardContainer
  from '@/components/containers/cards/BaseSimpleCardContainer.vue'
import BaseDeletedSection from '@/components/sections/BaseDeletedSection.vue'
import BaseArtistLinkContainer
  from '@/components/containers/links/artist/BaseArtistLinkContainer.vue'
import BaseArtistOptionsDropdown
  from '@/components/dropdowns/artist/BaseArtistOptionsDropdown.vue'
import BaseArtistImage from '@/components/models/artist/BaseArtistImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseArtistListenersCount
  from '@/components/models/artist/BaseArtistListenersCount.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseLibraryDeleteModal
  from '@/components/modals/library/BaseLibraryDeleteModal.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'ArtistItem',
  components: {
    BaseSimpleCardContainer,
    BaseDeletedSection,
    BaseArtistLinkContainer,
    BaseArtistOptionsDropdown,
    BaseArtistImage,
    BaseHeader,
    BaseArtistListenersCount,
    LibraryCountersSection,
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
    artistData: {
      type: Object,
      required: true
    },
    isWithSelfIcons: Boolean,
    isWithListenersCount: Boolean,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isFavorite: Boolean,
    isBookmark: Boolean
  },
  computed: {
    modelData () {
      return this.artistData
    },
    artistName () {
      return this.artistData.name
    },
    imageData () {
      return this.artistData.image
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.artistData.uuid
    },
    isDeleted () {
      return !!this.artistData.isDeleted
    },
    libraryArtistId () {
      return this.artistData.library.id.toString()
    }
  },
  methods: {
    handleImageLoadEnd (
      value
    ) {
      this.paginationItem
        .image = value
    },
    handleListenersCountLoadEnd (
      value
    ) {
      this.paginationItem
        .listeners_count = value
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
