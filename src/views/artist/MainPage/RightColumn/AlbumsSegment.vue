<template>
  <BasePaginatedSegmentContainer
    headerTextKey="albums"
    scope="albums"
    :clientPageLimit="3"
    :responsePageLimit="10"
    :artistName="artistName"
    :formatHeaderLink="formatArtistAlbumsLink"
  >
    <template #default="segmentSlotProps">
      <BaseAlbumsTableList
        :itemsInRow="3"
        :artistName="artistName"
        :albums="segmentSlotProps.albums"
        :isSegmentLoading="segmentSlotProps.isLoading"
      />
    </template>
  </BasePaginatedSegmentContainer>
</template>

<script>
import BasePaginatedSegmentContainer
  from '@/containers/pages/artist/BasePaginatedSegmentContainer.vue'
import BaseAlbumsTableList from '@/lists/albums/BaseAlbumsTableList.vue'
import { artistAlbums as formatArtistAlbumsLink } from '#/formatters/links'

export default {
  name: 'AlbumsSegment',
  components: {
    BasePaginatedSegmentContainer,
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
