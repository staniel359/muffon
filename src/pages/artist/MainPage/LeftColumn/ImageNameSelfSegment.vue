<template>
  <BaseSegmentContainer
    class="image-name-self-segment"
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

    <SelfSection
      v-if="profileId"
      :artist-data="artistData"
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
import BaseTransitionContainer
  from '@/components/containers/BaseTransitionContainer.vue'
import BaseHeader from '@/components/headers/BaseHeader.vue'
import SelfSection from './ImageNameSelfSegment/SelfSection.vue'

export default {
  name: 'ImageNameSelfSegment',
  components: {
    BaseSegmentContainer,
    BaseArtistImage,
    BaseTransitionContainer,
    BaseHeader,
    SelfSection
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    scrollable: HTMLDivElement
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    artistName () {
      return this.artistData.name
    }
  }
}
</script>

<style lang="sass" scoped>
.image-name-self-segment
  padding: 1rem !important
</style>
