<template>
  <BaseArtistPaginatedSegmentContainer
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template
      #default="slotProps"
    >
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
import {
  albums as albumsLimits
} from '@/helpers/data/limits'

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
      limit:
        albumsLimits.table.extrasmall,
      itemsInRow:
        albumsLimits.table.extrasmall,
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
