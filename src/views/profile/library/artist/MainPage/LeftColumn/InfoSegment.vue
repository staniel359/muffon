<template>
  <BaseSegmentContainer
    class="main-profile-page-info"
  >
    <div class="main-profile-page-image-container">
      <BaseArtistImage
        size="medium"
        :image-data="imageData"
        :artist-name="artistName"
        is-zoomable
      />
    </div>

    <BaseArtistLinkContainer
      :artist-data="artistData"
    >
      <BaseHeader
        class="link"
        tag="h3"
        :text="artistName"
      />
    </BaseArtistLinkContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseArtistImage from '@/components/models/artist/BaseArtistImage.vue'
import BaseArtistLinkContainer
  from '@/components/containers/links/artist/BaseArtistLinkContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseArtistImage,
    BaseArtistLinkContainer,
    BaseHeader
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.artistData.image
    },
    artistName () {
      return this.artistData.name
    }
  }
}
</script>

<style lang="sass" scoped></style>
