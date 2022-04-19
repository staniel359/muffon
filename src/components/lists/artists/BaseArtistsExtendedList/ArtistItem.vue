<template>
  <BaseArtistContainer
    :artist-name="artistName"
  >
    <template #default="slotProps">
      <BaseArtistHorizontalCardContainer
        :class="{
          disabled: isDeleted
        }"
        :is-loading="slotProps.isLoading"
        :error="slotProps.error"
        @refresh="slotProps.refresh"
      >
        <template v-if="slotProps.artistData">
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
                  :is-with-library-option="isWithLibraryOption"
                  :is-with-favorite-option="isWithFavoriteOption"
                  :is-with-bookmark-option="isWithBookmarkOption"
                  :is-with-listened-option="isWithListenedOption"
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
                :listeners-count="slotProps.artistData.listeners_count"
                :plays-count="slotProps.artistData.plays_count"
              />

              <BaseArtistTags
                :artist-data="slotProps.artistData"
              />

              <template v-if="slotProps.artistData.description">
                <BaseDivider />

                <BaseArtistDescription
                  :artist-data="slotProps.artistData"
                />
              </template>

              <RecommendationSection
                v-if="isRecommendation"
                ref="recommendation"
                :artist-data="artistData"
                :profile-id="profileId"
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
  provide () {
    return {
      setLibraryId: this.setLibraryId,
      setFavoriteId: this.setFavoriteId,
      setBookmarkId: this.setBookmarkId,
      setListenedId: this.setListenedId
    }
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isWithSelfIcons: {
      type: Boolean,
      default: true
    },
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithDeleteOption: Boolean,
    isRecommendation: Boolean
  },
  data () {
    return {
      libraryId: null,
      favoriteId: null,
      bookmarkId: null,
      listenedId: null
    }
  },
  computed: {
    artistName () {
      return this.artistData.name
    },
    imageData () {
      return this.artistData.image
    },
    isDeleted () {
      return !!this.artistData.isDeleted
    }
  },
  mounted () {
    this.libraryId =
      this.artistData.library_id?.toString()
    this.favoriteId =
      this.artistData.favorite_id?.toString()
    this.bookmarkId =
      this.artistData.bookmark_id?.toString()
    this.listenedId =
      this.artistData.listened_id?.toString()
  },
  methods: {
    handleImageLoadEnd (
      value
    ) {
      if (this.paginationItem) {
        this.paginationItem.image = value
      }
    },
    handleDeleteOptionClick () {
      this.$refs
        .recommendation
        .showDeleteModal()
    },
    setLibraryId (
      value
    ) {
      this.libraryId = value
    },
    setFavoriteId (
      value
    ) {
      this.favoriteId = value
    },
    setBookmarkId (
      value
    ) {
      this.bookmarkId = value
    },
    setListenedId (
      value
    ) {
      this.listenedId = value
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-left-column
  margin-right: 1em

.artist-image
  width: 145px
  height: 145px

.main-self-icons
  @extend .text-align-center
  max-width: 80px

.artist-info
  @extend .flex-full
</style>
