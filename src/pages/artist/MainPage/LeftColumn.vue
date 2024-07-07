<template>
  <BaseSegmentsContainer
    class="main-sticky-container left-column width-25"
  >
    <ImageNameSelfSegment
      :artist-data="artistData"
      :scrollable="scrollable"
    />

    <RecommendedSegment
      v-if="recommendationData"
      :recommendation-data="recommendationData"
    />
  </BaseSegmentsContainer>
</template>

<script>
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import ImageNameSelfSegment from './LeftColumn/ImageNameSelfSegment.vue'
import RecommendedSegment from './LeftColumn/RecommendedSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseSegmentsContainer,
    ImageNameSelfSegment,
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
