<template>
  <BasePaginatedSegmentContainer
    headerTextKey="tracks"
    scope="tracks"
    :clientPageLimit="10"
    :responsePageLimit="25"
    :artistName="artistName"
    :formatHeaderLink="formatArtistTracksLink"
  >
    <template #default="segmentSlotProps">
      <BaseTracksSimpleList
        :tracks="segmentSlotProps.tracks"
        :artistName="artistName"
        :topTrackCount="segmentSlotProps.topTrackCount"
        isWithListenersCount
      />
    </template>
  </BasePaginatedSegmentContainer>
</template>

<script>
import BasePaginatedSegmentContainer
  from '@/containers/pages/artist/BasePaginatedSegmentContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import { artistTracks as formatArtistTracksLink } from '#/formatters/links'

export default {
  name: 'TracksSegment',
  components: {
    BasePaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    artistName: String
  },
  methods: {
    formatArtistTracksLink
  }
}
</script>

<style lang="sass" scoped></style>
