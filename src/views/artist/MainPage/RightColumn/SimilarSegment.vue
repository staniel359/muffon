<template>
  <BaseArtistPaginatedSegmentContainer
    scope="similar"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :artistName="artistName"
    :headerLink="headerLink"
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
  from '*/components/containers/segments/artist/BaseArtistPaginatedSegmentContainer.vue'
import BaseArtistsTableList
  from '*/components/lists/artists/BaseArtistsTableList.vue'
import {
  similar as formatArtistSimilarLink
} from '*/helpers/formatters/links/artist'

export default {
  name: 'SimilarSegment',
  components: {
    BaseArtistPaginatedSegmentContainer,
    BaseArtistsTableList
  },
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 4
    }
  },
  computed: {
    headerLink () {
      return formatArtistSimilarLink({
        artistName: this.artistName
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
