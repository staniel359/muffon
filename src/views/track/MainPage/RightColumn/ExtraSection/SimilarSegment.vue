<template>
  <BaseTrackPaginatedSegmentContainer
    headerTextKey="similar"
    scope="similar"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
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
  from '@/containers/segments/track/BaseTrackPaginatedSegmentContainer.vue'
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
  data () {
    return {
      limit: 5
    }
  },
  methods: {
    formatTrackSimilarLink
  }
}
</script>

<style lang="sass" scoped></style>
