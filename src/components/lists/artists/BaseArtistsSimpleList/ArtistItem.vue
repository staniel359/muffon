<template>
  <BaseArtistLinkContainer
    class="item main-simple-list-item middle-aligned main-visibility-container"
    :class="{
      disabled: isDeleted
    }"
    :artist-data="artistData"
    :is-link-to-library="isLinkToLibrary"
    :profile-id="profileId"
    :is-link-active="isLinkActive"
    @link-click="handleLinkClick"
  >
    <BaseDeletedSection
      v-if="isDeleted"
      :model="model"
    />
    <template
      v-else
    >
      <BaseIcon
        v-if="isWithModelIcon"
        class="main-simple-list-item-model-icon"
        icon="artist"
      />

      <BaseArtistImage
        size="extrasmall"
        :class="imageClass"
        :image-data="imageData"
        :artist-name="artistName"
        @load-end="handleImageLoadEnd"
      />

      <div class="content">
        <BaseHeader
          tag="h4"
          :class="{
            link: isMainLinkActive
          }"
          :text="artistName"
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
          :top-tracks-count="topTracksCount"
          :top-albums-count="topAlbumsCount"
          @link-active-change="handleCounterLinkActiveChange"
          @link-click="handleLinkClick"
        />
      </div>

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

      <RecommendationArtistsSection
        v-if="isRecommendation"
        class="description right main-right-small-section"
        :recommendation-data="artistData"
        @active-change="handleCounterLinkActiveChange"
      />

      <BaseCreatedSection
        v-if="isWithCreated"
        class="description right"
        :model-data="artistData"
      />

      <BaseArtistOptionsPopup
        class="invisible-item"
        :artist-data="artistData"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
        :is-link-to-library="isLinkToLibrary"
        :is-bookmark="isBookmark"
        :is-favorite="isFavorite"
        :is-recommendation="isRecommendation"
        :is-with-page-option="isWithPageOption"
        :is-with-library-option="isWithLibraryOption"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-listened-option="isWithListenedOption"
        :is-with-share-option="isWithShareOption"
        :is-with-external-link-option="isWithExternalLinkOption"
        :is-with-delete-option="isWithDeleteOption"
        @active-change="handleOptionsActiveChange"
        @link-click="handleLinkClick"
        @deleted="handleDeleted"
      />

      <BaseClearButton
        v-if="isWithClearButton"
        @click="handleClearButtonClick"
        @active-change="handleClearButtonActiveChange"
      />
    </template>
  </BaseArtistLinkContainer>
</template>

<script>
import BaseArtistLinkContainer
  from '@/components/containers/links/artist/BaseArtistLinkContainer.vue'
import BaseDeletedSection from '@/components/sections/BaseDeletedSection.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseArtistImage from '@/components/models/artist/BaseArtistImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseArtistListenersCount
  from '@/components/models/artist/BaseArtistListenersCount.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import RecommendationArtistsSection
  from './ArtistItem/RecommendationArtistsSection.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BaseArtistOptionsPopup
  from '@/components/popups/artist/BaseArtistOptionsPopup.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistLinkContainer,
    BaseDeletedSection,
    BaseIcon,
    BaseArtistImage,
    BaseHeader,
    BaseArtistListenersCount,
    LibraryCountersSection,
    BaseSelfIcons,
    RecommendationArtistsSection,
    BaseCreatedSection,
    BaseArtistOptionsPopup,
    BaseClearButton
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
    topTracksCount: Number,
    topAlbumsCount: Number,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
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
    isPaginated: Boolean,
    isWithCreated: Boolean,
    isWithModelIcon: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
  data () {
    return {
      isCounterLinkActive: false,
      isOptionsActive: false,
      isClearButtonActive: false
    }
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
    isMainLinkActive () {
      return !this.isCounterLinkActive
    },
    isDeleted () {
      return !!this.artistData.isDeleted
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
    isLinkActive () {
      return !(
        this.isCounterLinkActive ||
          this.isOptionsActive ||
          this.isClearButtonActive
      )
    },
    model () {
      if (this.isRecommendation) {
        return 'recommendation'
      } else {
        return 'artist'
      }
    },
    imageClass () {
      if (this.isImageSmall) {
        return 'image-35'
      } else {
        return 'image-50'
      }
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleImageLoadEnd (
      value
    ) {
      if (this.isPaginated) {
        this.paginationItem.image = value
      }
    },
    handleListenersCountLoadEnd (
      value
    ) {
      if (this.isPaginated) {
        this.paginationItem.listeners_count = value
      }
    },
    handleCounterLinkActiveChange (
      value
    ) {
      this.isCounterLinkActive = value
    },
    handleClearButtonClick () {
      this.$emit(
        'clearButtonClick',
        {
          uuid: this.uuid
        }
      )
    },
    handleDeleted () {
      if (this.isPaginated) {
        this.paginationItem.isDeleted = true
      }
    },
    handleOptionsActiveChange (
      value
    ) {
      this.isOptionsActive = value
    },
    handleClearButtonActiveChange (
      value
    ) {
      this.isClearButtonActive = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
