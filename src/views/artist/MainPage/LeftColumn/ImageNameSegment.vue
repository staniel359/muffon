<template>
  <BaseSegmentContainer
    class="raised image-segment main-segment-container"
  >
    <div class="main-image-container">
      <BaseArtistImage
        class="rounded bordered image-content"
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
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseTransitionContainer from '@/containers/BaseTransitionContainer.vue'
import BaseHeader from '@/BaseHeader.vue'

export default {
  name: 'ImageNameSegment',
  components: {
    BaseSegmentContainer,
    BaseArtistImage,
    BaseTransitionContainer,
    BaseHeader
  },
  props: {
    artistName: String,
    scrollable: HTMLDivElement
  }
}
</script>

<style lang="sass" scoped>
.image-segment
  @extend .no-margin
  padding: 0.5em

.artist-name
  @extend .text-align-center
  margin-top: 0.5em
</style>
