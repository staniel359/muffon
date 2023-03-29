<template>
  <div class="main-profile-page-image-container">
    <BaseZoomableImage
      model="track"
      size="medium"
      :image-data="imageData"
    />
  </div>

  <BaseTrackLinkContainer
    class="main-link main-profile-page-info"
    :track-data="trackData"
  >
    <BaseHeader
      class="link"
      tag="h4"
      :text="trackTitle"
    />
  </BaseTrackLinkContainer>
</template>

<script>
import BaseTrackLinkContainer
  from '@/components/containers/links/track/BaseTrackLinkContainer.vue'
import BaseZoomableImage from '@/components/images/BaseZoomableImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'

export default {
  name: 'TrackSection',
  components: {
    BaseTrackLinkContainer,
    BaseZoomableImage,
    BaseHeader
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.trackData.image
    },
    trackTitle () {
      return this.trackData.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
