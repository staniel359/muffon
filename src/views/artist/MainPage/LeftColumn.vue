<template>
  <div class="left-column">
    <div class="main-image-container">
      <BaseArtistImage
        class="rounded image-content"
        size="medium"
        :artistName="artistName"
        isInteractive
      />
    </div>

    <BaseTransitionContainer
      class="artist-name"
      :scrollable="scrollable"
    >
      <BaseHeader
        tag="h3"
        :text="artistName"
      />
    </BaseTransitionContainer>
  </div>
</template>

<script>
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseTransitionContainer from '@/containers/BaseTransitionContainer.vue'
import BaseHeader from '@/BaseHeader.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseArtistImage,
    BaseTransitionContainer,
    BaseHeader
  },
  props: {
    artistName: {
      type: String,
      required: true
    },
    scrollable: HTMLDivElement
  }
}
</script>

<style lang="sass" scoped>
.left-column
  @extend .sticky
  width: 200px
  margin-right: 20px
  align-self: flex-start
  top: $mainContainerTopPadding
  ::v-deep(.ui.image)
    height: 200px

.artist-name
  @extend .text-align-center
  margin: 10px 0
  .ui.header
    @extend .text-color-white
</style>
