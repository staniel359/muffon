<template>
  <BaseArtistContainer
    ref="artist"
    :is-get-data="!responseData"
    :request-artist-data="artistData"
  >
    <template
      #default="slotProps"
    >
      <BaseSegmentContainer
        class="raised nested main-segment-container d-flex"
        :class="{
          disabled: isDeleted
        }"
        :is-loading="slotProps.isLoading"
        :error="slotProps.error"
        @refresh="handleRefresh"
      >
        <template
          v-if="responseData"
        >
          <BaseDeletedSection
            v-if="isDeleted"
            :model="model"
          />
          <template
            v-else
          >
            <div class="left-column">
              <BaseArtistImage
                class="artist-image"
                size="medium"
                :image-data="imageData"
                :artist-name="artistName"
                is-zoomable
                @load-end="handleImageLoadEnd"
              />

              <BaseCreatedSection
                class="text-align-center main-bottom-small-section"
                :model-data="artistData"
                :is-small="false"
              />

              <BaseLibraryArtistCountersSection
                v-if="isWithLibrary"
                class="main-bottom-small-section"
                :artist-data="artistData"
                :profile-id="profileId"
              />

              <div class="main-self-container main-bottom-small-section">
                <BaseSelfIcons
                  v-if="isWithSelfIcons"
                  class="self-icons centered"
                  :library-id="libraryId"
                  :favorite-id="favoriteId"
                  :bookmark-id="bookmarkId"
                  :listened-id="listenedId"
                  :is-with-library-icon="isWithLibraryIcon"
                  :is-with-favorite-icon="isWithFavoriteIcon"
                  :is-with-bookmark-icon="isWithBookmarkIcon"
                />

                <BaseArtistOptionsPopup
                  :artist-data="artistData"
                  :library-id="libraryId"
                  :favorite-id="favoriteId"
                  :bookmark-id="bookmarkId"
                  :listened-id="listenedId"
                  :is-link-to-library="isLinkToLibrary"
                  :is-recommendation="isRecommendation"
                  :is-with-page-option="isWithPageOption"
                  :is-with-library-option="isWithLibraryOption"
                  :is-with-favorite-option="isWithFavoriteOption"
                  :is-with-bookmark-option="isWithBookmarkOption"
                  :is-with-listened-option="isWithListenedOption"
                  :is-with-share-option="isWithShareOption"
                  :is-with-external-link-option="isWithExternalLinkOption"
                  :is-with-delete-option="isWithDeleteOption"
                  :is-bookmark="isBookmark"
                  :is-favorite="isFavorite"
                  @deleted="handleDeleted"
                />
              </div>
            </div>

            <div class="main-right-column">
              <HeaderSection
                :artist-data="artistData"
                :profile-id="profileId"
                :is-link-to-library="isLinkToLibrary"
              />

              <div>
                <BaseCounterLabelsSection
                  class="main-labels-section"
                  :counters="counters"
                />

                <BaseArtistInnerCounterLabelsSection
                  class="main-labels-section"
                  :artist-data="artistData"
                />

                <BaseArtistTags
                  class="main-labels-section"
                  :artist-data="responseData"
                />
              </div>

              <template
                v-if="description"
              >
                <BaseDivider />

                <BaseArtistDescription
                  :artist-data="responseData"
                />
              </template>

              <RecommendationArtistsSection
                v-if="isRecommendation"
                :recommendation-data="artistData"
              />
            </div>
          </template>
        </template>
      </BaseSegmentContainer>
    </template>
  </BaseArtistContainer>
</template>

<script>
import BaseArtistContainer
  from '@/components/containers/artist/BaseArtistContainer.vue'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseDeletedSection from '@/components/sections/BaseDeletedSection.vue'
import BaseArtistImage from '@/components/models/artist/BaseArtistImage.vue'
import BaseLibraryArtistCountersSection
  from '@/components/sections/library/artist/BaseLibraryArtistCountersSection.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseArtistOptionsPopup
  from '@/components/popups/artist/BaseArtistOptionsPopup.vue'
import HeaderSection from './ArtistItem/HeaderSection.vue'
import BaseCounterLabelsSection
  from '@/components/sections/BaseCounterLabelsSection.vue'
import BaseArtistInnerCounterLabelsSection
  from '@/components/sections/artist/BaseArtistInnerCounterLabelsSection.vue'
import BaseArtistTags from '@/components/models/artist/BaseArtistTags.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseArtistDescription
  from '@/components/models/artist/BaseArtistDescription.vue'
import RecommendationArtistsSection
  from './ArtistItem/RecommendationArtistsSection.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistContainer,
    BaseSegmentContainer,
    BaseDeletedSection,
    BaseArtistImage,
    BaseLibraryArtistCountersSection,
    BaseCreatedSection,
    BaseSelfIcons,
    BaseArtistOptionsPopup,
    HeaderSection,
    BaseCounterLabelsSection,
    BaseArtistInnerCounterLabelsSection,
    BaseArtistTags,
    BaseDivider,
    BaseArtistDescription,
    RecommendationArtistsSection
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
    isWithPageOption: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isRecommendation: Boolean,
    isFavorite: Boolean,
    isBookmark: Boolean,
    isWithCreated: Boolean
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
    model () {
      if (this.isRecommendation) {
        return 'recommendation'
      } else {
        return 'artist'
      }
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
    handleResponseDataChange (
      value
    ) {
      if (value) {
        this.resetInfiniteScrollObserver()
      }
    },
    handleDeleted () {
      this.paginationItem.isDeleted = true
    }
  }
}
</script>

<style lang="sass" scoped>
.left-column
  width: 135px

.self-icons
  max-width: 70px
</style>
