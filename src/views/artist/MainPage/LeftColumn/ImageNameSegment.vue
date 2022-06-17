<template>
  <BaseSegmentContainer
    :class="[
      'raised image-segment',
      'main-segment-container'
    ]"
  >
    <div class="main-image-container">
      <BaseArtistImage
        class="image-content"
        size="medium"
        :artist-name="artistName"
        :is-circular="false"
        is-interactive
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
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseArtistImage from '*/components/models/artist/BaseArtistImage.vue'
import BaseTransitionContainer
  from '*/components/containers/BaseTransitionContainer.vue'
import BaseHeader from '*/components/BaseHeader.vue'

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

::v-deep(.image-content)
  @extend .h-100, .w-100

.artist-name
  @extend .text-align-center
  margin-top: 0.5em
</style>
