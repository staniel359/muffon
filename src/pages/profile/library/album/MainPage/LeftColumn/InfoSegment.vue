<template>
  <BaseSegmentContainer
    class="main-profile-page-info"
  >
    <AlbumSection
      :album-data="albumData"
    />

    <ArtistSection
      :album-data="albumData"
      :profile-id="profileId"
    />

    <BaseSourceIcon
      v-if="isRenderSource"
      class="bottom"
      :source="source"
    />

    <SelfSection
      v-if="currentProfileId"
      :album-data="albumData"
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
import AlbumSection from './InfoSegment/AlbumSection.vue'
import ArtistSection from './InfoSegment/ArtistSection.vue'
import BaseSourceIcon from '@/components/icons/BaseSourceIcon.vue'
import SelfSection from './InfoSegment/SelfSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    AlbumSection,
    ArtistSection,
    BaseSourceIcon,
    SelfSection
  },
  props: {
    albumData: Object,
    profileId: Number
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
      return this.albumData.source
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
