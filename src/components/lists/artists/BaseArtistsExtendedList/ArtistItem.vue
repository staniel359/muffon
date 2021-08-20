<template>
  <BaseArtistContainer :artistName="artistName">
    <template #default="slotProps">
      <BaseArtistHorizontalCardContainer
        :isLoading="slotProps.isLoading"
        :error="slotProps.error"
        @refresh="slotProps.handleRefresh"
      >
        <template v-if="slotProps.artistData">
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

            <div class="library-link-button">
              <BaseProfileLibraryLinkButton
                v-if="isShowLibraryLink"
                model="artist"
                :modelId="libraryId"
                :profileId="profileId"
              />
            </div>
          </div>

          <InfoBlock
            :artistData="slotProps.artistData"
            :isLinkToLibrary="isLinkToLibrary"
            :profileId="profileId"
            :artistId="artistId"
          />
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
import BaseProfileLibraryLinkButton from '@/BaseProfileLibraryLinkButton.vue'
import InfoBlock from './ArtistItem/InfoBlock.vue'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistContainer,
    BaseArtistHorizontalCardContainer,
    BaseArtistImage,
    LibraryCountersSection,
    BaseProfileLibraryLinkButton,
    InfoBlock
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
    isWithLibraryLink: Boolean
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
    }
  },
  methods: {
    handleImageLoadEnd (value) {
      this.findPaginationItem({
        uuid: this.uuid
      }).image = value
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-left-column
  @extend .d-flex, .flex-column, .align-items-center
  margin-right: 1em

.artist-image
  width: 150px
  height: 150px

.library-link-button
  margin-top: 1em
</style>
