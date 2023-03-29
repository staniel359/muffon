<template>
  <BaseSegmentContainer
    class="main-profile-page-info"
  >
    <TrackSection
      :track-data="trackData"
    />

    <ArtistSection
      :track-data="trackData"
      :profile-id="profileId"
    />

    <AlbumSection
      :track-data="trackData"
      :profile-id="profileId"
    />

    <BaseSourceIcon
      v-if="isRenderSource"
      class="source-icon"
      :source="source"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import TrackSection from './InfoSegment/TrackSection.vue'
import ArtistSection from './InfoSegment/ArtistSection.vue'
import AlbumSection from './InfoSegment/AlbumSection.vue'
import BaseSourceIcon from '@/components/icons/BaseSourceIcon.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    TrackSection,
    ArtistSection,
    AlbumSection,
    BaseSourceIcon
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    profileId: String
  },
  computed: {
    isRenderSource () {
      return (
        this.source && (
          this.source !== 'lastfm'
        )
      )
    },
    source () {
      return this.sourceData?.name
    },
    sourceData () {
      return this.trackData.source
    }
  }
}
</script>

<style lang="sass" scoped>
.source-icon
  margin-top: 0.5em !important
</style>
