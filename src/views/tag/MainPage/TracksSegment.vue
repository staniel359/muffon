<template>
  <BaseTagPaginatedSegmentContainer
    headerTextKey="tracks"
    scope="tracks"
    :clientPageLimit="10"
    :responsePageLimit="50"
    :tagName="tagName"
    :formatHeaderLink="formatTagTracksLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        isWithArtistName
      />
    </template>
  </BaseTagPaginatedSegmentContainer>
</template>

<script>
import BaseTagPaginatedSegmentContainer
  from '@/containers/pages/tag/BaseTagPaginatedSegmentContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import { tagTracks as formatTagTracksLink } from '#/formatters/links'

export default {
  name: 'TracksSegment',
  components: {
    BaseTagPaginatedSegmentContainer,
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
