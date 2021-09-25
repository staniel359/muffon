<template>
  <div class="artist-page-left-column main-sticky-container">
    <div class="main-image-container">
      <BaseArtistImage
        class="rounded image-content"
        size="medium"
        :artistName="artistName"
        isInteractive
      />
    </div>

    <div class="left-column-extra">
      <BaseTransitionContainer
        class="artist-name transition hidden"
        :scrollable="scrollable"
      >
        <BaseHeader
          tag="h3"
          :text="artistName"
        />
      </BaseTransitionContainer>

      <BaseSelfButtons
        model="artist"
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
        :artistName="artistName"
        isTextWhite
      />
    </div>
  </div>
</template>

<script>
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseTransitionContainer from '@/containers/BaseTransitionContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseSelfButtons from '@/models/self/BaseSelfButtons.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseArtistImage,
    BaseTransitionContainer,
    BaseHeader,
    BaseSelfButtons
  },
  props: {
    artistName: {
      type: String,
      required: true
    },
    scrollable: HTMLDivElement,
    libraryId: String,
    listenedId: String,
    bookmarkId: String,
    favoriteId: String
  }
}
</script>

<style lang="sass" scoped>
.artist-page-left-column
  width: 200px

.left-column-extra
  margin-top: 0.5em

.artist-name
  @extend .text-align-center
  .ui.header
    @extend .text-color-white
</style>
