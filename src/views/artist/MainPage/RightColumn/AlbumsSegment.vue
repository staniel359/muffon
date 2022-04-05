<template>
  <BaseArtistPaginatedSegmentContainer
    scope="albums"
    :limit="limit"
    :artistName="artistName"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="3"
        :artistName="artistName"
        :albums="slotProps.albums"
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
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as formatArtistAlbumsLink
} from '*/helpers/formatters/links/artist'

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
      limit: 3
    }
  },
  computed: {
    headerLink () {
      return formatArtistAlbumsLink({
        artistName: this.artistName
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
