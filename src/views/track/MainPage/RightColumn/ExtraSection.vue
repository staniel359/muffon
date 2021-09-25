<template>
  <div class="main-basic-segments-container">
    <InfoSegment :trackData="trackData" />

    <BaseDivider />

    <VideoSegment :query="query" />

    <BaseDivider />

    <LyricsSegment :query="query" />

    <BaseDivider />

    <SimilarSegment
      :artistName="artistName"
      :trackTitle="trackTitle"
    />
  </div>
</template>

<script>
import InfoSegment from './ExtraSection/InfoSegment.vue'
import BaseDivider from '@/BaseDivider.vue'
import VideoSegment from './ExtraSection/VideoSegment.vue'
import LyricsSegment from './ExtraSection/LyricsSegment.vue'
import SimilarSegment from './ExtraSection/SimilarSegment.vue'

export default {
  name: 'ExtraSection',
  components: {
    InfoSegment,
    BaseDivider,
    VideoSegment,
    LyricsSegment,
    SimilarSegment
  },
  props: {
    trackData: Object
  },
  computed: {
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    },
    query () {
      return [
        this.artistName,
        this.trackTitle
      ].join(' - ')
    }
  }
}
</script>

<style lang="sass" scoped></style>
