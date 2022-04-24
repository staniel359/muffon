<template>
  <div
    :class="[
      'ui segments',
      'artist-page-left-column',
      'main-sticky-container'
    ]"
  >
    <ImageNameSegment
      :artist-name="artistName"
      :scrollable="scrollable"
    />

    <SelfSegment
      :artist-name="artistName"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
    />

    <RecommendedSegment
      v-if="recommendationData"
      :recommendation-data="recommendationData"
    />
  </div>
</template>

<script>
import ImageNameSegment from './LeftColumn/ImageNameSegment.vue'
import SelfSegment from './LeftColumn/SelfSegment.vue'
import RecommendedSegment from './LeftColumn/RecommendedSegment.vue'
import selfMixin from '*/mixins/selfMixin'

export default {
  name: 'LeftColumn',
  components: {
    ImageNameSegment,
    SelfSegment,
    RecommendedSegment
  },
  mixins: [
    selfMixin
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    },
    scrollable: HTMLDivElement
  },
  computed: {
    modelData () {
      return this.artistData
    },
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
  width: 200px
</style>
