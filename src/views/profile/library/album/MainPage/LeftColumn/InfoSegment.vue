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
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import AlbumSection from './InfoSegment/AlbumSection.vue'
import ArtistSection from './InfoSegment/ArtistSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    AlbumSection,
    ArtistSection
  },
  props: {
    albumData: Object,
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
