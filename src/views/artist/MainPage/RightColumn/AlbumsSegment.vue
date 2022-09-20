<template>
  <BaseArtistPaginatedSegmentContainer
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :artist-name="artistName"
        :items-in-row="itemsInRow"
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseArtistPaginatedSegmentContainer>
</template>

<script>
import BaseArtistPaginatedSegmentContainer
  from '@/components/containers/segments/artist/BaseArtistPaginatedSegmentContainer.vue'
import BaseAlbumsTableList
  from '@/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as formatArtistAlbumsLink
} from '@/helpers/formatters/links/artist'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseArtistPaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 3,
      itemsInRow: 3,
      scope: 'albums'
    }
  },
  computed: {
    headerLink () {
      return formatArtistAlbumsLink(
        {
          artistName: this.artistName
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
