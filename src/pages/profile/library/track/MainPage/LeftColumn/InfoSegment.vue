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
      class="bottom"
      :source="source"
    />

    <SelfSection
      v-if="currentProfileId"
      :track-data="trackData"
      :profile-id="profileId"
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import TrackSection from './InfoSegment/TrackSection.vue'
import ArtistSection from './InfoSegment/ArtistSection.vue'
import AlbumSection from './InfoSegment/AlbumSection.vue'
import BaseSourceIcon from '@/components/icons/BaseSourceIcon.vue'
import SelfSection from './InfoSegment/SelfSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    TrackSection,
    ArtistSection,
    AlbumSection,
    BaseSourceIcon,
    SelfSection
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    profileId: String
  },
  computed: {
    ...mapState(
      profileStore,
      {
        currentProfileId: 'id'
      }
    ),
    isRenderSource () {
      return (
        this.source &&
          !this.isLastfmSource
      )
    },
    source () {
      return this.sourceData?.name
    },
    sourceData () {
      return this.trackData.source
    },
    isLastfmSource () {
      return (
        this.source === 'lastfm'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
