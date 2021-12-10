<template>
  <BaseArtistPaginatedSegmentContainer
    headerTextKey="tracks"
    scope="tracks"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
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
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
        isWithPlaylistOption
      />
    </template>
  </BaseArtistPaginatedSegmentContainer>
</template>

<script>
import BaseArtistPaginatedSegmentContainer
  from '@/containers/segments/artist/BaseArtistPaginatedSegmentContainer.vue'
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
  data () {
    return {
      limit: 10
    }
  },
  methods: {
    formatArtistTracksLink
  }
}
</script>

<style lang="sass" scoped></style>
