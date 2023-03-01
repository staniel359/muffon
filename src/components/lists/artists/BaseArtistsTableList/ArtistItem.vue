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
        :is-link-to-library="isLinkToLibrary"
        :is-with-page-option="isWithPageOption"
        :is-with-library-option="isWithLibraryOption"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-listened-option="isWithListenedOption"
        :is-with-share-option="isWithShareOption"
        :is-with-delete-option="isWithDeleteOption"
        @deleted="handleDeleted"
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
        <BaseCreatedSection
          v-if="isWithCreated"
          class="description"
          :model-data="artistData"
        />

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
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BaseArtistListenersCount
  from '@/components/models/artist/BaseArtistListenersCount.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
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
    BaseCreatedSection,
    BaseArtistListenersCount,
    LibraryCountersSection,
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
    artistData: {
      type: Object,
      required: true
    },
    isWithSelfIcons: Boolean,
    isWithListenersCount: Boolean,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
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
    handleDeleted () {
      this.paginationItem.isDeleted = true
    }
  }
}
</script>

<style lang="sass" scoped></style>
