<template>
  <BasePaginatedSegmentContainer
    headerTextKey="albums"
    scope="albums"
    :clientPageLimit="4"
    :responsePageLimit="20"
    :tagName="tagName"
    :formatHeaderLink="formatTagAlbumsLink"
  >
    <template #default="segmentSlotProps">
      <BaseAlbumsTableList
        :itemsInRow="4"
        :albums="segmentSlotProps.albums"
        :isSegmentLoading="segmentSlotProps.isLoading"
        isWithArtistName
      />
    </template>
  </BasePaginatedSegmentContainer>
</template>

<script>
import BasePaginatedSegmentContainer
  from '@/containers/pages/tag/BasePaginatedSegmentContainer.vue'
import BaseAlbumsTableList from '@/lists/albums/BaseAlbumsTableList.vue'
import { tagAlbums as formatTagAlbumsLink } from '#/formatters/links'

export default {
  name: 'AlbumsSegment',
  components: {
    BasePaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  props: {
    tagName: String
  },
  methods: {
    formatTagAlbumsLink
  }
}
</script>

<style lang="sass" scoped></style>
