<template>
  <div class="main-basic-segments-container">
    <SecondarySection :trackData="trackData" />
    <VideoSection :query="query" />
    <LyricsSection :query="query" />

    <SimilarSection
      :artistName="artistName"
      :trackTitle="trackTitle"
    />
  </div>
</template>

<script>
import SecondarySection from './ExtraSection/SecondarySection.vue'
import VideoSection from './ExtraSection/VideoSection.vue'
import LyricsSection from './ExtraSection/LyricsSection.vue'
import SimilarSection from './ExtraSection/SimilarSection.vue'

export default {
  name: 'ExtraSection',
  components: {
    SecondarySection,
    VideoSection,
    LyricsSection,
    SimilarSection
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
  @extend .flex-full, .d-flex, .flex-column
  margin-left: calc(150px + 1em)
</style>
