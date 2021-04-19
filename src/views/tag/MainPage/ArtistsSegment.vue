<template>
  <BasePaginatedSegmentContainer
    headerTextKey="artists"
    scope="artists"
    :clientPageLimit="4"
    :responsePageLimit="21"
    :tagName="tagName"
    :formatHeaderLink="formatTagArtistsLink"
  >
    <template #default="segmentSlotProps">
      <BaseArtistsTableList
        :itemsInRow="4"
        :artists="segmentSlotProps.artists"
        isWithListenersCount
      />
    </template>
  </BasePaginatedSegmentContainer>
</template>

<script>
import BasePaginatedSegmentContainer
  from '@/containers/pages/tag/BasePaginatedSegmentContainer.vue'
import BaseArtistsTableList from '@/lists/artists/BaseArtistsTableList.vue'
import { tagArtists as formatTagArtistsLink } from '#/formatters/links'

export default {
  name: 'ArtistsSegment',
  components: {
    BasePaginatedSegmentContainer,
    BaseArtistsTableList
  },
  props: {
    tagName: String
  },
  methods: {
    formatTagArtistsLink
  }
}
</script>

<style lang="sass" scoped></style>
