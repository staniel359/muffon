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

    <ListenersSegment
      :artist-data="artistData"
    />
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import ImageNameSegment from './LeftColumn/ImageNameSegment.vue'
import SelfSegment from './LeftColumn/SelfSegment.vue'
import RecommendedSegment from './LeftColumn/RecommendedSegment.vue'
import ListenersSegment from './LeftColumn/ListenersSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    ImageNameSegment,
    SelfSegment,
    RecommendedSegment,
    ListenersSegment
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    scrollable: HTMLDivElement
  },
  computed: {
    ...mapGetters(
      'profile',
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
  width: 200px
</style>
