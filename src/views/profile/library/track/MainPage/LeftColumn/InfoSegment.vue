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
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import TrackSection from './InfoSegment/TrackSection.vue'
import ArtistSection from './InfoSegment/ArtistSection.vue'
import AlbumSection from './InfoSegment/AlbumSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    TrackSection,
    ArtistSection,
    AlbumSection
  },
  props: {
    profileId: String,
    trackData: Object
  }
}
</script>

<style lang="sass" scoped></style>
