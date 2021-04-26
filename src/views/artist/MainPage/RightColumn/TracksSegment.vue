<template>
  <BaseArtistPaginatedSegmentContainer
    headerTextKey="tracks"
    scope="tracks"
    :clientPageLimit="10"
    :responsePageLimit="25"
    :artistName="artistName"
    :formatHeaderLink="formatArtistTracksLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :artistName="artistName"
        :topTrackCount="slotProps.topTrackCount"
        isWithListenersCount
      />
    </template>
  </BaseArtistPaginatedSegmentContainer>
</template>

<script>
import BaseArtistPaginatedSegmentContainer
  from '@/containers/pages/artist/BaseArtistPaginatedSegmentContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import { artistTracks as formatArtistTracksLink } from '#/formatters/links'

export default {
  name: 'TracksSegment',
  components: {
    BaseArtistPaginatedSegmentContainer,
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
