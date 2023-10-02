<template>
  <BaseSegmentsContainer
    class="main-sticky-container left-column width-25"
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
  </BaseSegmentsContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import ImageNameSegment from './LeftColumn/ImageNameSegment.vue'
import SelfSegment from './LeftColumn/SelfSegment.vue'
import RecommendedSegment from './LeftColumn/RecommendedSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseSegmentsContainer,
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
.left-column
  min-width: 210px
</style>
