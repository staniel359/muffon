<template>
  <div class="main-basic-segments-container">
    <InfoSection
      :track-data="trackData"
      :request-track-data="requestTrackData"
    />

    <BaseDivider />

    <VideoSegment
      :query="query"
    />

    <BaseDivider />

    <LyricsSegment
      :query="query"
    />

    <BaseDivider />

    <SimilarSegment
      :artist-name="artistName"
      :track-title="trackTitle"
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
    trackData: Object,
    requestTrackData: Object
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
      ].join(
        ' - '
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
