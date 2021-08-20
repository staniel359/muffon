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

    <BaseTransitionContainer
      class="artist-name transition hidden"
      :scrollable="scrollable"
    >
      <BaseHeader
        tag="h3"
        :text="artistName"
      />
    </BaseTransitionContainer>

    <BaseProfileLibraryButton
      class="library-button"
      model="artist"
      :modelId="libraryId"
      :profileId="profileId"
      :artistName="artistName"
    />
  </div>
</template>

<script>
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseTransitionContainer from '@/containers/BaseTransitionContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseProfileLibraryButton from '@/BaseProfileLibraryButton.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseArtistImage,
    BaseTransitionContainer,
    BaseHeader,
    BaseProfileLibraryButton
  },
  props: {
    artistName: {
      type: String,
      required: true
    },
    scrollable: HTMLDivElement,
    libraryId: String,
    profileId: String
  }
}
</script>

<style lang="sass" scoped>
.artist-page-left-column
  width: 200px

.artist-name
  @extend .text-align-center
  margin: 0.5em 0
  .ui.header
    @extend .text-color-white

.library-button
  margin-top: 1em
</style>
