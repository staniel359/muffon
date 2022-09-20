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

    <BaseLinkContainer
      :link="artistMainLink"
    >
      <BaseHeader
        class="link"
        tag="h3"
        :text="artistName"
      />
    </BaseLinkContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseArtistImage from '@/components/models/artist/BaseArtistImage.vue'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import {
  main as formatArtistMainLink
} from '@/helpers/formatters/links/artist'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseArtistImage,
    BaseLinkContainer,
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
    },
    artistMainLink () {
      return formatArtistMainLink(
        {
          artistName: this.artistName
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
