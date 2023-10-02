<template>
  <div class="main-bottom-section">
    <InfoSection
      :track-data="trackData"
      :request-track-data="requestTrackData"
    />

    <BaseDivider />

    <VideoSection
      :track-data="trackData"
    />

    <BaseDivider />

    <LyricsSection
      :track-data="trackData"
    />
  </div>
</template>

<script>
import InfoSection from './ExtraSection/InfoSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import VideoSection from './ExtraSection/VideoSection.vue'
import LyricsSection from './ExtraSection/LyricsSection.vue'

export default {
  name: 'ExtraSection',
  components: {
    InfoSection,
    BaseDivider,
    VideoSection,
    LyricsSection
  },
  props: {
    trackData: Object,
    requestTrackData: Object
  }
}
</script>

<style lang="sass" scoped></style>
