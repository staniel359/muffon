<template>
  <div class="main-basic-segments-container">
    <InfoSegment
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
import InfoSegment from './ExtraSection/InfoSegment.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import VideoSegment from './ExtraSection/VideoSegment.vue'
import LyricsSegment from './ExtraSection/LyricsSegment.vue'
import SimilarSegment from './ExtraSection/SimilarSegment.vue'
import {
  artistName as formatArtistName
} from '*/helpers/formatters'

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
    trackData: Object,
    requestTrackData: Object
  },
  computed: {
    artistName () {
      return formatArtistName(
        this.artists
      )
    },
    artists () {
      return this.trackData.artists
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
