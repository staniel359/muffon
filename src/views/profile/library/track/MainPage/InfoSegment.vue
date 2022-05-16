<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container'
    ]"
  >
    <BaseSegmentContainer>
      <div class="main-profile-page-info">
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
      </div>

      <SelfSection
        :track-data="trackData"
        :profile-id="profileId"
      />

      <BaseDivider />

      <SinceSection
        :track-data="trackData"
      />
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import TrackSection from './InfoSegment/TrackSection.vue'
import ArtistSection from './InfoSegment/ArtistSection.vue'
import AlbumSection from './InfoSegment/AlbumSection.vue'
import SelfSection from './InfoSegment/SelfSection.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import SinceSection from './InfoSegment/SinceSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    TrackSection,
    ArtistSection,
    AlbumSection,
    SelfSection,
    BaseDivider,
    SinceSection
  },
  props: {
    profileId: String,
    trackData: Object
  }
}
</script>

<style lang="sass" scoped></style>
