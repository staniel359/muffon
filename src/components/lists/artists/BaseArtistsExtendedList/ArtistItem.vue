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
                :image="image"
                :artistName="artistName"
                @loadEnd="handleImageLoadEnd"
              />

              <BaseSelfIcons
                v-if="isWithSelfIcons"
                :libraryId="libraryId"
                :favoriteId="favoriteId"
                :bookmarkId="bookmarkId"
                :listenedId="listenedId"
              />

              <LibraryCountersSection
                v-if="isWithLibrary"
                :artistData="artistData"
                :isWithTracksCount="isWithTracksCount"
                :isWithAlbumsCount="isWithAlbumsCount"
                :profileId="profileId"
                :artistId="artistId"
              />

              <div class="main-options-dropdown-container-right">
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

            <InfoBlock
              :artistData="slotProps.artistData"
              :isLinkToLibrary="isLinkToLibrary"
              :profileId="profileId"
              :artistId="artistId"
              :isRecommendation="isRecommendation"
              :recommendationData="artistData"
            />

            <BaseRecommendationDeleteModal
              v-if="isRecommendation"
              ref="deleteModal"
              :recommendationData="artistData"
              @deleted="handleDeleted"
            />
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
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import InfoBlock from './ArtistItem/InfoBlock.vue'
import BaseRecommendationDeleteModal
  from '@/modals/recommendation/BaseRecommendationDeleteModal.vue'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistContainer,
    BaseArtistHorizontalCardContainer,
    BaseDeletedBlock,
    BaseArtistImage,
    BaseOptionsDropdown,
    LibraryCountersSection,
    BaseSelfIcons,
    InfoBlock,
    BaseRecommendationDeleteModal
  },
  provide () {
    return {
      setLibraryId: this.setLibraryId,
      setFavoriteId: this.setFavoriteId,
      setBookmarkId: this.setBookmarkId,
      setListenedId: this.setListenedId
    }
  },
  inject: [
    'findPaginationItem'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isWithSelfIcons: {
      type: Boolean,
      default: true
    },
    isWithTracksCount: Boolean,
    isWithAlbumsCount: Boolean,
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
    image () {
      return this.artistData.image
    },
    uuid () {
      return this.artistData.uuid
    },
    artistId () {
      return this.artistData.id?.toString()
    },
    deletedFormatted () {
      return this.$t(
        'shared.deleted.recommendation'
      )
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
      this.findPaginationItem({
        uuid: this.uuid
      }).image = value
    },
    handleDeleted () {
      this.findPaginationItem({
        uuid: this.uuid
      }).isDeleted = true
    },
    handleDeleteOptionClick () {
      this.$refs.deleteModal.show()
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
  @extend .d-flex, .flex-column, .align-items-center
  margin-right: 1em
  width: 150px

.artist-image
  @extend .w-100
  height: 150px

.main-simple-self-buttons
  margin-top: 1em
</style>
