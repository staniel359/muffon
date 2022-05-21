<template>
  <BaseTrackLinkContainer
    class="main-link main-profile-page-info"
    :track-data="trackData"
  >
    <BaseImage
      class="rounded bordered main-profile-page-image"
      model="track"
      size="small"
      :image="imageData?.medium"
    />

    <BaseHeader
      class="link"
      tag="h4"
      :text="trackTitle"
    />
  </BaseTrackLinkContainer>
</template>

<script>
import BaseTrackLinkContainer
  from '*/components/containers/links/track/BaseTrackLinkContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'

export default {
  name: 'TrackSection',
  components: {
    BaseTrackLinkContainer,
    BaseImage,
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
