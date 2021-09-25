<template>
  <BaseArtistContainer :artistName="artistName">
    <template #default="slotProps">
      <BaseArtistHorizontalCardContainer
        :isLoading="slotProps.isLoading"
        :error="slotProps.error"
        @refresh="slotProps.handleRefresh"
      >
        <template v-if="slotProps.artistData">
          <div
            v-if="isDeleted"
            class="main-deleted-container"
          >
            <span>
              {{ deletedFormatted }}
            </span>
          </div>
          <template v-else>
            <div class="artist-left-column">
              <BaseArtistImage
                class="circular bordered artist-image"
                :image="image"
                :artistName="artistName"
                @loadEnd="handleImageLoadEnd"
              />

              <LibraryCountersSection
                v-if="isWithLibrary"
                :artistData="artistData"
                :isWithTracksCount="isWithTracksCount"
                :isWithAlbumsCount="isWithAlbumsCount"
                :profileId="profileId"
                :artistId="artistId"
              />

              <BaseSelfSimpleButtons
                model="artist"
                :modelData="artistData"
                :isWithLibraryLink="isWithLibraryLink"
                :isWithListenedButton="isWithListenedButton"
                :isWithBookmarkButton="isWithBookmarkButton"
                :isWithFavoriteButton="isWithFavoriteButton"
              />

              <RecommendationDeleteButton
                v-if="isRecommendation"
                :recommendationData="artistData"
                @deleted="handleDeleted"
              />
            </div>

            <InfoBlock
              :artistData="slotProps.artistData"
              :isLinkToLibrary="isLinkToLibrary"
              :profileId="profileId"
              :artistId="artistId"
              :isRecommendation="isRecommendation"
              :recommendationData="artistData"
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
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfSimpleButtons from '@/models/self/BaseSelfSimpleButtons.vue'
import RecommendationDeleteButton
  from './ArtistItem/RecommendationDeleteButton.vue'
import InfoBlock from './ArtistItem/InfoBlock.vue'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistContainer,
    BaseArtistHorizontalCardContainer,
    BaseArtistImage,
    LibraryCountersSection,
    BaseSelfSimpleButtons,
    InfoBlock,
    RecommendationDeleteButton
  },
  inject: [
    'findPaginationItem'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isWithTracksCount: Boolean,
    isWithAlbumsCount: Boolean,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryLink: Boolean,
    isWithListenedButton: Boolean,
    isWithBookmarkButton: Boolean,
    isWithFavoriteButton: Boolean,
    isRecommendation: Boolean
  },
  data () {
    return {
      isDeleted: false
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
        'shared.recommendation.deleted'
      )
    }
  },
  methods: {
    handleImageLoadEnd (value) {
      this.findPaginationItem({
        uuid: this.uuid
      }).image = value
    },
    handleDeleted () {
      this.isDeleted = true
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
