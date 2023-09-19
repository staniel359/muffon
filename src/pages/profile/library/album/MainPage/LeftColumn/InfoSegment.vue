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
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import AlbumSection from './InfoSegment/AlbumSection.vue'
import ArtistSection from './InfoSegment/ArtistSection.vue'
import BaseSourceIcon from '@/components/icons/BaseSourceIcon.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    AlbumSection,
    ArtistSection,
    BaseSourceIcon
  },
  props: {
    albumData: Object,
    profileId: String
  },
  computed: {
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
