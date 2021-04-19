<template>
  <BasePaginatedSegmentContainer
    headerTextKey="tracks"
    scope="tracks"
    :clientPageLimit="10"
    :responsePageLimit="50"
    :tagName="tagName"
    :formatHeaderLink="formatTagTracksLink"
  >
    <template #default="segmentSlotProps">
      <BaseTracksSimpleList
        :tracks="segmentSlotProps.tracks"
        isWithArtistName
      />
    </template>
  </BasePaginatedSegmentContainer>
</template>

<script>
import BasePaginatedSegmentContainer
  from '@/containers/pages/tag/BasePaginatedSegmentContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import { tagTracks as formatTagTracksLink } from '#/formatters/links'

export default {
  name: 'TracksSegment',
  components: {
    BasePaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    tagName: String
  },
  methods: {
    formatTagTracksLink
  }
}
</script>

<style lang="sass" scoped></style>
