<template>
  <BaseArtistPaginatedSegmentContainer
    :artistName="artistName"
    :scope="scope"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :artists="slotProps[scope]"
        :profileId="slotProps.profileId"
        :itemsInRow="itemsInRow"
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
      limit: 4,
      itemsInRow: 4,
      scope: 'similar'
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
