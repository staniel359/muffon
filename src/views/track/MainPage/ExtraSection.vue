<template>
  <div class="main-basic-segments-container">
    <SecondarySegment :trackData="trackData" />
    <VideoSegment :query="query" />
    <LyricsSegment :query="query" />

    <SimilarSegment
      :artistName="artistName"
      :trackTitle="trackTitle"
    />
  </div>
</template>

<script>
import SecondarySegment from './ExtraSection/SecondarySegment.vue'
import VideoSegment from './ExtraSection/VideoSegment.vue'
import LyricsSegment from './ExtraSection/LyricsSegment.vue'
import SimilarSegment from './ExtraSection/SimilarSegment.vue'

export default {
  name: 'ExtraSection',
  components: {
    SecondarySegment,
    VideoSegment,
    LyricsSegment,
    SimilarSegment
  },
  props: {
    trackData: Object,
    artistName: String,
    trackTitle: String
  },
  computed: {
    query () {
      return `${this.artistName} - ${this.trackTitle}`
    }
  }
}
</script>

<style lang="sass" scoped>
.main-basic-segments-container
  margin-left: calc(150px + 1em)
</style>
