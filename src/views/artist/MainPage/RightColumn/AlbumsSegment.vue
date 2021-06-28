<template>
  <BaseArtistPaginatedSegmentContainer
    headerTextKey="albums"
    scope="albums"
    :clientPageLimit="3"
    :responsePageLimit="3"
    :artistName="artistName"
    :formatHeaderLink="formatArtistAlbumsLink"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="3"
        :artistName="artistName"
        :albums="slotProps.albums"
        isWithListenersCount
      />
    </template>
  </BaseArtistPaginatedSegmentContainer>
</template>

<script>
import BaseArtistPaginatedSegmentContainer
  from '@/containers/pages/artist/BaseArtistPaginatedSegmentContainer.vue'
import BaseAlbumsTableList from '@/lists/albums/BaseAlbumsTableList.vue'
import { artistAlbums as formatArtistAlbumsLink } from '#/formatters/links'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseArtistPaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  props: {
    artistName: String
  },
  methods: {
    formatArtistAlbumsLink
  }
}
</script>

<style lang="sass" scoped></style>
