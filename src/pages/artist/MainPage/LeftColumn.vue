<template>
  <div
    :class="[
      'ui raised segments',
      'artist-page-left-column',
      'main-segment-container',
      'main-sticky-container'
    ]"
  >
    <ImageNameSegment
      :artist-name="artistName"
      :scrollable="scrollable"
    />

    <SelfSegment
      v-if="profileId"
      :artist-data="artistData"
    />

    <RecommendedSegment
      v-if="recommendationData"
      :recommendation-data="recommendationData"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import ImageNameSegment from './LeftColumn/ImageNameSegment.vue'
import SelfSegment from './LeftColumn/SelfSegment.vue'
import RecommendedSegment from './LeftColumn/RecommendedSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    ImageNameSegment,
    SelfSegment,
    RecommendedSegment
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
    },
    recommendationData () {
      return this.artistData.recommendation
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-page-left-column
  @extend .no-margin
  width: 200px
</style>
