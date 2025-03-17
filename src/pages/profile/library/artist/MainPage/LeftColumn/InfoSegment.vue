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

    <SelfSection
      v-if="currentProfileId"
      :artist-data="artistData"
      :profile-id="profileId"
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseArtistImage from '@/components/models/artist/BaseArtistImage.vue'
import BaseArtistLinkContainer
  from '@/components/containers/links/artist/BaseArtistLinkContainer.vue'
import BaseHeader from '@/components/headers/BaseHeader.vue'
import SelfSection from './InfoSegment/SelfSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseArtistImage,
    BaseArtistLinkContainer,
    BaseHeader,
    SelfSection
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    profileId: String
  },
  computed: {
    ...mapState(
      profileStore,
      {
        currentProfileId: 'id'
      }
    ),
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
