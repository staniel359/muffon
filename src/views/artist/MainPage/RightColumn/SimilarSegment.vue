<template>
  <BasePaginatedSegmentContainer
    headerTextKey="similar"
    scope="similar"
    :clientPageLimit="4"
    :responsePageLimit="10"
    :artistName="artistName"
    :formatHeaderLink="formatArtistSimilarLink"
  >
    <template #default="segmentSlotProps">
      <BaseArtistsTableList
        :itemsInRow="4"
        :artists="segmentSlotProps.similar"
        isSmall
      />
    </template>
  </BasePaginatedSegmentContainer>
</template>

<script>
import BasePaginatedSegmentContainer
  from '@/containers/pages/artist/BasePaginatedSegmentContainer.vue'
import BaseArtistsTableList from '@/lists/artists/BaseArtistsTableList.vue'
import { artistSimilar as formatArtistSimilarLink } from '#/formatters/links'

export default {
  name: 'SimilarSegment',
  components: {
    BasePaginatedSegmentContainer,
    BaseArtistsTableList
  },
  props: {
    artistName: String
  },
  methods: {
    formatArtistSimilarLink
  }
}
</script>

<style lang="sass" scoped></style>
