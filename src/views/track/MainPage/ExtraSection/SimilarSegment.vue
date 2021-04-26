<template>
  <BaseTrackPaginatedSegmentContainer
    headerTextKey="similar"
    scope="similar"
    :clientPageLimit="5"
    :responsePageLimit="25"
    :artistName="artistName"
    :trackTitle="trackTitle"
    :formatHeaderLink="formatTrackSimilarLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.similar"
        isWithArtistName
        isWithLength
      />
    </template>
  </BaseTrackPaginatedSegmentContainer>
</template>

<script>
import BaseTrackPaginatedSegmentContainer
  from '@/containers/pages/track/BaseTrackPaginatedSegmentContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import { trackSimilar as formatTrackSimilarLink } from '#/formatters/links'

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
