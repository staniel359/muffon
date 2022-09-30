<template>
  <BaseArtistContainer
    ref="artist"
    :is-get-data="!responseData"
    :request-artist-data="artistData"
  >
    <template #default="slotProps">
      <BaseArtistHorizontalCardContainer
        :class="{
          disabled: isDeleted
        }"
        :is-loading="slotProps.isLoading"
        :error="slotProps.error"
        @refresh="handleRefresh"
      >
        <template v-if="responseData">
          <BaseDeletedBlock
            v-if="isDeleted"
            model="recommendation"
          />
          <template v-else>
            <div class="artist-left-column">
              <BaseArtistImage
                class="artist-image"
                size="medium"
                :image-data="imageData"
                :artist-name="artistName"
                is-zoomable
                @load-end="handleImageLoadEnd"
              />

              <LibraryCountersSection
                v-if="isWithLibrary"
                :artist-data="artistData"
                :profile-id="profileId"
              />

              <div class="main-self-container">
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
              </div>
            </div>

            <div class="artist-info">
              <HeaderSection
                :artist-data="artistData"
                :profile-id="profileId"
                :is-link-to-library="isLinkToLibrary"
              />

              <div>
                <div class="main-labels-section">
                  <BaseCounterLabels
                    :counters="counters"
                  />
                </div>

                <BaseArtistTags
                  class="main-labels-section"
                  :artist-data="responseData"
                />
              </div>

              <template v-if="description">
                <BaseDivider />

                <BaseArtistDescription
                  :artist-data="responseData"
                />
              </template>

              <RecommendationArtistsSection
                v-if="isRecommendation"
                :recommendation-data="artistData"
              />

              <BaseRecommendationDeleteModal
                v-if="isRecommendation"
                ref="deleteModal"
                :recommendation-data="artistData"
                @success="handleDeleted"
              />
              <BaseLibraryDeleteModal
                v-else-if="isLinkToLibrary && isSelf"
                ref="deleteModal"
                model="artist"
                :profile-id="profileId"
                :model-id="libraryArtistId"
                :model-name="artistName"
                @success="handleDeleted"
              />
            </div>
          </template>
        </template>
      </BaseArtistHorizontalCardContainer>
    </template>
  </BaseArtistContainer>
</template>

<script>
import BaseArtistContainer
  from '@/components/containers/artist/BaseArtistContainer.vue'
import BaseArtistHorizontalCardContainer
  from '@/components/containers/artist/BaseArtistHorizontalCardContainer.vue'
import BaseDeletedBlock from '@/components/BaseDeletedBlock.vue'
import BaseArtistImage from '@/components/models/artist/BaseArtistImage.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseArtistOptionsDropdown
  from '@/components/dropdowns/artist/BaseArtistOptionsDropdown.vue'
import HeaderSection from './ArtistItem/HeaderSection.vue'
import BaseCounterLabels from '@/components/labels/BaseCounterLabels.vue'
import BaseArtistTags from '@/components/models/artist/BaseArtistTags.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseArtistDescription
  from '@/components/models/artist/BaseArtistDescription.vue'
import RecommendationArtistsSection
  from './ArtistItem/RecommendationArtistsSection.vue'
import BaseRecommendationDeleteModal
  from '@/components/modals/recommendation/BaseRecommendationDeleteModal.vue'
import BaseLibraryDeleteModal
  from '@/components/modals/library/BaseLibraryDeleteModal.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistContainer,
    BaseArtistHorizontalCardContainer,
    BaseDeletedBlock,
    BaseArtistImage,
    LibraryCountersSection,
    BaseSelfIcons,
    BaseArtistOptionsDropdown,
    HeaderSection,
    BaseCounterLabels,
    BaseArtistTags,
    BaseDivider,
    BaseArtistDescription,
    RecommendationArtistsSection,
    BaseRecommendationDeleteModal,
    BaseLibraryDeleteModal
  },
  mixins: [
    selfMixin
  ],
  inject: {
    findPaginationItem: {
      default: () => false
    },
    resetInfiniteScrollObserver: {
      default: () => false
    }
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
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
    isRecommendation: Boolean,
    isFavorite: Boolean,
    isBookmark: Boolean
  },
  computed: {
    modelData () {
      return this.artistData
    },
    artistName () {
      return this.responseData.name
    },
    responseData () {
      return this.artistData.responseData
    },
    imageData () {
      return this.artistData.image
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
    counters () {
      return [
        {
          scope: 'listeners',
          count: this.listenersCount
        },
        {
          scope: 'plays',
          count: this.playsCount
        }
      ]
    },
    listenersCount () {
      return this.responseData.listeners_count
    },
    playsCount () {
      return this.responseData.plays_count
    },
    description () {
      return this.responseData.description
    },
    libraryArtistId () {
      return this.artistData.library.id.toString()
    }
  },
  watch: {
    responseData: 'handleResponseDataChange'
  },
  methods: {
    handleRefresh () {
      this.$refs
        .artist
        .getData()
    },
    handleImageLoadEnd (
      value
    ) {
      this.paginationItem.image = value
    },
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    handleResponseDataChange (
      value
    ) {
      if (value) {
        this.resetInfiniteScrollObserver()
      }
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
.artist-left-column
  margin-right: 1em

.artist-image
  width: 140px
  height: 140px

.main-self-icons
  @extend .text-align-center
  max-width: 80px

.artist-info
  @extend .flex-full
</style>
