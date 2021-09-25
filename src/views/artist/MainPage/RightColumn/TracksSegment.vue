<template>
  <BaseArtistPaginatedSegmentContainer
    headerTextKey="tracks"
    scope="tracks"
    :clientPageLimit="10"
    :responsePageLimit="10"
    :artistName="artistName"
    :formatHeaderLink="formatArtistTracksLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :artistName="artistName"
        :topTrackCount="slotProps.topTrackCount"
        :profileId="slotProps.profileId"
        isWithListenersCount
        isWithLibraryLink
        isWithListenedButton
        isWithBookmarkButton
        isWithFavoriteButton
      />
    </template>
  </BaseArtistPaginatedSegmentContainer>
</template>

<script>
import BaseArtistPaginatedSegmentContainer
  from '@/containers/pages/artist/BaseArtistPaginatedSegmentContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import { tracks as formatArtistTracksLink } from '#/formatters/links/artist'

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
