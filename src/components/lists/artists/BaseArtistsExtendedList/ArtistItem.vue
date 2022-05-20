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
                class="circular bordered artist-image"
                size="medium"
                :image-data="imageData"
                :artist-name="artistName"
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
                />

                <BaseOptionsDropdown
                  model="artist"
                  :artist-name="artistName"
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

              <BaseCounters
                :listeners-count="listenersCount"
                :plays-count="playsCount"
              />

              <BaseArtistTags
                :artist-data="responseData"
              />

              <template v-if="description">
                <BaseDivider />

                <BaseArtistDescription
                  :artist-data="responseData"
                />
              </template>

              <RecommendationSection
                v-if="isRecommendation"
                ref="recommendation"
                :artist-data="artistData"
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
  from '*/components/containers/artist/BaseArtistContainer.vue'
import BaseArtistHorizontalCardContainer
  from '*/components/containers/artist/BaseArtistHorizontalCardContainer.vue'
import BaseDeletedBlock from '*/components/BaseDeletedBlock.vue'
import BaseArtistImage from '*/components/models/artist/BaseArtistImage.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import HeaderSection from './ArtistItem/HeaderSection.vue'
import BaseCounters from '*/components/BaseCounters.vue'
import BaseArtistTags from '*/components/models/artist/BaseArtistTags.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import BaseArtistDescription
  from '*/components/models/artist/BaseArtistDescription.vue'
import RecommendationSection from './ArtistItem/RecommendationSection.vue'
import selfMixin from '*/mixins/selfMixin'
import {
  artist as formatArtistShareData
} from '*/helpers/formatters/share'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistContainer,
    BaseArtistHorizontalCardContainer,
    BaseDeletedBlock,
    BaseArtistImage,
    LibraryCountersSection,
    BaseSelfIcons,
    BaseOptionsDropdown,
    HeaderSection,
    BaseCounters,
    BaseArtistTags,
    BaseDivider,
    BaseArtistDescription,
    RecommendationSection
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
    responseData: Object,
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
    isRecommendation: Boolean
  },
  computed: {
    modelData () {
      return this.artistData
    },
    artistName () {
      return this.responseData.name
    },
    imageData () {
      return this.artistData.image
    },
    isDeleted () {
      return !!this.artistData.isDeleted
    },
    shareData () {
      return formatArtistShareData(
        this.responseData
      )
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
    listenersCount () {
      return this.responseData.listeners_count
    },
    playsCount () {
      return this.responseData.plays_count
    },
    description () {
      return this.responseData.description
    }
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
      this.showRecommendationDeleteModal()
    },
    showRecommendationDeleteModal () {
      this.$refs
        .recommendation
        .showDeleteModal()
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
