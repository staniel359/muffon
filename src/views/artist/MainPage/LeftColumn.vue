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

    <div class="main-self-buttons">
      <BaseLibraryButton
        class="main-self-button"
        model="artist"
        :modelId="libraryId"
        :artistName="artistName"
      />

      <BaseListenedButton
        class="main-self-button"
        model="artist"
        :modelId="listenedId"
        :artistName="artistName"
      />
    </div>
  </div>
</template>

<script>
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseTransitionContainer from '@/containers/BaseTransitionContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseLibraryButton from '@/models/self/BaseLibraryButton.vue'
import BaseListenedButton from '@/models/self/BaseListenedButton.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseArtistImage,
    BaseTransitionContainer,
    BaseHeader,
    BaseLibraryButton,
    BaseListenedButton
  },
  props: {
    artistName: {
      type: String,
      required: true
    },
    scrollable: HTMLDivElement,
    libraryId: String,
    listenedId: String
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
</style>
