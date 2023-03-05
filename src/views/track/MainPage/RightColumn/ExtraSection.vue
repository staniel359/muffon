<template>
  <div class="main-basic-segments-container">
    <InfoSection
      :track-data="trackData"
      :request-track-data="requestTrackData"
    />

    <BaseDivider />

    <VideoSegment
      :track-data="trackData"
    />

    <BaseDivider />

    <LyricsSegment
      :query="query"
    />

    <BaseDivider />

    <SimilarSegment
      :track-data="trackData"
    />
  </div>
</template>

<script>
import InfoSection from './ExtraSection/InfoSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import VideoSegment from './ExtraSection/VideoSegment.vue'
import LyricsSegment from './ExtraSection/LyricsSegment.vue'
import SimilarSegment from './ExtraSection/SimilarSegment.vue'

export default {
  name: 'ExtraSection',
  components: {
    InfoSection,
    BaseDivider,
    VideoSegment,
    LyricsSegment,
    SimilarSegment
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    requestTrackData: Object
  },
  computed: {
    query () {
      return [
        this.artistName,
        this.trackTitle
      ].join(
        ' - '
      )
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
