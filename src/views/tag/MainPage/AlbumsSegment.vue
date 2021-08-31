<template>
  <BaseTagPaginatedSegmentContainer
    headerTextKey="albums"
    scope="albums"
    :clientPageLimit="4"
    :responsePageLimit="20"
    :tagName="tagName"
    :formatHeaderLink="formatTagAlbumsLink"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="4"
        :albums="slotProps.albums"
        isWithArtistName
        isWithListenersCount
        isWithLibraryLink
        isWithListenedButton
      />
    </template>
  </BaseTagPaginatedSegmentContainer>
</template>

<script>
import BaseTagPaginatedSegmentContainer
  from '@/containers/pages/tag/BaseTagPaginatedSegmentContainer.vue'
import BaseAlbumsTableList from '@/lists/albums/BaseAlbumsTableList.vue'
import { albums as formatTagAlbumsLink } from '#/formatters/links/tag'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseTagPaginatedSegmentContainer,
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
