<template>
  <BaseArtistPaginatedSegmentContainer
    headerTextKey="similar"
    scope="similar"
    :clientPageLimit="4"
    :responsePageLimit="4"
    :artistName="artistName"
    :formatHeaderLink="formatArtistSimilarLink"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :itemsInRow="4"
        :artists="slotProps.similar"
        :profileId="slotProps.profileId"
        isWithListenersCount
        isWithLibraryLink
        isWithListenedButton
        isWithBookmarkButton
      />
    </template>
  </BaseArtistPaginatedSegmentContainer>
</template>

<script>
import BaseArtistPaginatedSegmentContainer
  from '@/containers/pages/artist/BaseArtistPaginatedSegmentContainer.vue'
import BaseArtistsTableList from '@/lists/artists/BaseArtistsTableList.vue'
import { similar as formatArtistSimilarLink } from '#/formatters/links/artist'

export default {
  name: 'SimilarSegment',
  components: {
    BaseArtistPaginatedSegmentContainer,
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
