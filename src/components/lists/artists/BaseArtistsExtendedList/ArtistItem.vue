<template>
  <BaseArtistContainer
    :artistName="artistName"
  >
    <template #default="slotProps">
      <BaseArtistHorizontalCardContainer
        :class="{ disabled: isDeleted }"
        :isLoading="slotProps.isLoading"
        :error="slotProps.error"
        @refresh="slotProps.handleRefresh"
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
                :imageData="imageData"
                :artistName="artistName"
                @loadEnd="handleImageLoadEnd"
              />

              <LibraryCountersSection
                v-if="isWithLibrary"
                :artistData="artistData"
                :profileId="profileId"
              />

              <div class="main-self-container">
                <BaseSelfIcons
                  v-if="isWithSelfIcons"
                  :libraryId="libraryId"
                  :favoriteId="favoriteId"
                  :bookmarkId="bookmarkId"
                  :listenedId="listenedId"
                />

                <BaseOptionsDropdown
                  model="artist"
                  :artistName="artistName"
                  :libraryId="libraryId"
                  :favoriteId="favoriteId"
                  :bookmarkId="bookmarkId"
                  :listenedId="listenedId"
                  :isWithLibraryOption="isWithLibraryOption"
                  :isWithFavoriteOption="isWithFavoriteOption"
                  :isWithBookmarkOption="isWithBookmarkOption"
                  :isWithListenedOption="isWithListenedOption"
                  :isWithDeleteOption="isWithDeleteOption"
                  @delete="handleDeleteOptionClick"
                />
              </div>
            </div>

            <div class="artist-info">
              <HeaderSection
                :artistData="artistData"
                :profileId="profileId"
                :isLinkToLibrary="isLinkToLibrary"
              />

              <BaseCounters
                :listenersCount="slotProps.artistData.listeners_count"
                :playsCount="slotProps.artistData.plays_count"
              />

              <BaseArtistTags
                :artistData="slotProps.artistData"
              />

              <template v-if="slotProps.artistData.description">
                <BaseDivider />

                <BaseArtistDescription
                  :artistData="slotProps.artistData"
                />
              </template>

              <RecommendationSection
                v-if="isRecommendation"
                ref="recommendation"
                :artistData="artistData"
                :profileId="profileId"
              />
            </div>
          </template>
        </template>
      </BaseArtistHorizontalCardContainer>
    </template>
  </BaseArtistContainer>
</template>

<script>
import BaseArtistContainer from '@/containers/artist/BaseArtistContainer.vue'
import BaseArtistHorizontalCardContainer
  from '@/containers/artist/BaseArtistHorizontalCardContainer.vue'
import BaseDeletedBlock from '@/BaseDeletedBlock.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import HeaderSection from './ArtistItem/HeaderSection.vue'
import BaseCounters from '@/BaseCounters.vue'
import BaseArtistTags from '@/models/artist/BaseArtistTags.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseArtistDescription from '@/models/artist/BaseArtistDescription.vue'
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
    handleImageLoadEnd (value) {
      if (this.paginationItem) {
        this.paginationItem.image = value
      }
    },
    handleDeleteOptionClick () {
      this.$refs.recommendation.showDeleteModal()
    },
    setLibraryId (value) {
      this.libraryId = value
    },
    setFavoriteId (value) {
      this.favoriteId = value
    },
    setBookmarkId (value) {
      this.bookmarkId = value
    },
    setListenedId (value) {
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
