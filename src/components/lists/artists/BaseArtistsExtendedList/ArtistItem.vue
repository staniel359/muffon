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
            class="deleted-container"
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

              <div class="main-simple-self-buttons">
                <BaseLibrarySimpleButton
                  v-if="isShowLibraryLink"
                  class="main-simple-self-button"
                  model="artist"
                  :modelId="libraryId"
                />

                <BaseListenedSimpleButton
                  v-if="isShowListenedButton"
                  class="main-simple-self-button"
                  model="artist"
                  :modelId="listenedId"
                />
              </div>

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
import BaseLibrarySimpleButton from '@/models/self/BaseLibrarySimpleButton.vue'
import BaseListenedSimpleButton
  from '@/models/self/BaseListenedSimpleButton.vue'
import RecommendationDeleteButton
  from './ArtistItem/RecommendationDeleteButton.vue'
import InfoBlock from './ArtistItem/InfoBlock.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistContainer,
    BaseArtistHorizontalCardContainer,
    BaseArtistImage,
    LibraryCountersSection,
    BaseListenedSimpleButton,
    BaseLibrarySimpleButton,
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
    isShowLibraryLink () {
      return (
        this.isWithLibraryLink &&
          !!this.libraryId
      )
    },
    libraryId () {
      return this.artistData.library_id?.toString()
    },
    deletedFormatted () {
      return localize(
        'shared.recommendation.deleted'
      )
    },
    isShowListenedButton () {
      return (
        this.isWithListenedButton &&
          !!this.listenedId
      )
    },
    listenedId () {
      return this.artistData.listened_id?.toString()
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

.deleted-container
  @extend .d-flex, .justify-content-center, .flex-full
</style>
