<template>
  <BaseArtistPaginatedSegmentContainer
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :artists="slotProps[scope]"
        :items-in-row="itemsInRow"
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
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
      return formatArtistSimilarLink(
        {
          artistName: this.artistName
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
