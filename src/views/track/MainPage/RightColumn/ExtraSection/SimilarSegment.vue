<template>
  <BaseTrackPaginatedSegmentContainer
    headerTextKey="similar"
    scope="similar"
    :clientPageLimit="5"
    :responsePageLimit="5"
    :artistName="artistName"
    :trackTitle="trackTitle"
    :formatHeaderLink="formatTrackSimilarLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.similar"
        :profileId="slotProps.profileId"
        isWithArtistName
        isWithDuration
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
        isWithPlaylistOption
      />
    </template>
  </BaseTrackPaginatedSegmentContainer>
</template>

<script>
import BaseTrackPaginatedSegmentContainer
  from '@/containers/pages/track/BaseTrackPaginatedSegmentContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import { similar as formatTrackSimilarLink } from '#/formatters/links/track'

export default {
  name: 'SimilarSegment',
  components: {
    BaseTrackPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    artistName: String,
    trackTitle: String
  },
  methods: {
    formatTrackSimilarLink
  }
}
</script>

<style lang="sass" scoped></style>
