<template>
  <BaseArtistPaginatedSegmentContainer
    headerTextKey="albums"
    scope="albums"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :artistName="artistName"
    :formatHeaderLink="formatArtistAlbumsLink"
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
  from '@/containers/pages/artist/BaseArtistPaginatedSegmentContainer.vue'
import BaseAlbumsTableList from '@/lists/albums/BaseAlbumsTableList.vue'
import { albums as formatArtistAlbumsLink } from '#/formatters/links/artist'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseArtistPaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  props: {
    artistName: String
  },
  data () {
    return {
      limit: 3
    }
  },
  methods: {
    formatArtistAlbumsLink
  }
}
</script>

<style lang="sass" scoped></style>
