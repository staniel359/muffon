<template>
  <BaseArtistPaginatedSegmentContainer
    headerTextKey="similar"
    scope="similar"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :artistName="artistName"
    :formatHeaderLink="formatArtistSimilarLink"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :itemsInRow="4"
        :artists="slotProps.similar"
        :profileId="slotProps.profileId"
        isWithListenersCount
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
      />
    </template>
  </BaseArtistPaginatedSegmentContainer>
</template>

<script>
import BaseArtistPaginatedSegmentContainer
  from '@/containers/segments/artist/BaseArtistPaginatedSegmentContainer.vue'
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
  data () {
    return {
      limit: 4
    }
  },
  methods: {
    formatArtistSimilarLink
  }
}
</script>

<style lang="sass" scoped></style>
