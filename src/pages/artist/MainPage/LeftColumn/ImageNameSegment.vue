<template>
  <BaseSegmentContainer
    class="image-segment no-margin"
  >
    <div class="main-image-container">
      <BaseArtistImage
        class="image-content height-100 width-100"
        size="medium"
        :artist-name="artistName"
        :is-circular="false"
        is-interactive
      />
    </div>

    <BaseTransitionContainer
      :scrollable="scrollable"
    >
      <div class="main-bottom-small-section">
        <BaseHeader
          class="text-align-center"
          tag="h3"
          :text="artistName"
        />
      </div>
    </BaseTransitionContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseArtistImage from '@/components/models/artist/BaseArtistImage.vue'
import BaseTransitionContainer
  from '@/components/containers/BaseTransitionContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'

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
  padding: 1rem !important
</style>
